#!/usr/bin/env node
/**
 * MCP Server for Drive App
 * Exposes backend actions as MCP-compatible tools so AI agents
 * can interact with the Drive API via natural language.
 *
 * Tools Exposed:
 *  - signup        : Register a new user
 *  - login         : Authenticate and get a JWT token
 *  - create_folder : Create a folder (optionally nested via parentId)
 *  - list_folders  : List folders and images in a directory
 *  - get_folder_tree : Get the full sidebar folder tree
 *  - upload_image  : Upload an image file to a folder
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000/api';

// In-memory token store (per session)
let authToken = null;

// Helper: build axios instance with current token
const apiCall = (method, endpoint, data = null, extraHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...extraHeaders,
  };
  return axios({ method, url: `${BASE_URL}${endpoint}`, data, headers });
};

// Helper: find folder ID by name (assumes unique names across user's folders)
const findFolderIdByName = async (folderName) => {
  try {
    const { data } = await apiCall('get', '/folders/tree');
    const findInTree = (nodes) => {
      for (const node of nodes) {
        if (node.name === folderName) return node._id;
        if (node.children && node.children.length > 0) {
          const found = findInTree(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInTree(data);
  } catch (err) {
    return null;
  }
};

// Create the MCP Server
const server = new McpServer({
  name: 'drive-mcp-server',
  version: '1.0.0',
});

// ─── TOOL: signup ───────────────────────────────────────────────────────────
server.tool(
  'signup',
  'Register a new user account on the Drive app',
  {
    name: z.string().describe('Full name of the user'),
    email: z.string().email().describe('Email address'),
    password: z.string().min(6).describe('Password (min 6 characters)'),
  },
  async ({ name, email, password }) => {
    try {
      const { data } = await apiCall('post', '/auth/signup', { name, email, password });
      authToken = data.token;
      return {
        content: [{ type: 'text', text: `✅ Signup successful! Welcome, ${data.name}. Token stored for this session.` }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `❌ Signup failed: ${err.response?.data?.message || err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── TOOL: login ────────────────────────────────────────────────────────────
server.tool(
  'login',
  'Login with email and password to get an auth token',
  {
    email: z.string().email().describe('Email address'),
    password: z.string().describe('Password'),
  },
  async ({ email, password }) => {
    try {
      const { data } = await apiCall('post', '/auth/login', { email, password });
      authToken = data.token;
      return {
        content: [{ type: 'text', text: `✅ Login successful! Welcome back, ${data.name}. Token stored for this session.` }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `❌ Login failed: ${err.response?.data?.message || err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── TOOL: create_folder ────────────────────────────────────────────────────
server.tool(
  'create_folder',
  'Create a new folder. Supports nested folders by providing a parent folder name.',
  {
    name: z.string().describe('Name of the folder to create'),
    parentFolderName: z.string().optional().describe('Name of the parent folder (leave empty for root-level folder)'),
  },
  async ({ name, parentFolderName }) => {
    if (!authToken) {
      return { content: [{ type: 'text', text: '❌ Not authenticated. Please login first.' }], isError: true };
    }
    try {
      let parentId = null;
      if (parentFolderName) {
        parentId = await findFolderIdByName(parentFolderName);
        if (!parentId) {
          return { content: [{ type: 'text', text: `❌ Parent folder "${parentFolderName}" not found.` }], isError: true };
        }
      }
      const { data } = await apiCall('post', '/folders', { name, parentId });
      return {
        content: [{ type: 'text', text: `✅ Folder "${data.name}" created successfully! Folder ID: ${data._id}` }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `❌ Create folder failed: ${err.response?.data?.message || err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── TOOL: list_folders ─────────────────────────────────────────────────────
server.tool(
  'list_folders',
  'List all folders and images in a directory. Leave parentId empty for root.',
  {
    parentId: z.string().optional().describe('ID of the folder to list contents of (empty = root)'),
  },
  async ({ parentId }) => {
    if (!authToken) {
      return { content: [{ type: 'text', text: '❌ Not authenticated. Please login first.' }], isError: true };
    }
    try {
      const endpoint = parentId ? `/folders?parentId=${parentId}` : '/folders';
      const { data } = await apiCall('get', endpoint);

      const folderLines = data.folders.map(
        (f) => `📁 ${f.name} (ID: ${f._id}) — Size: ${formatBytes(f.size || 0)}`
      );
      const imageLines = data.images.map(
        (img) => `🖼  ${img.name} (ID: ${img._id}) — Size: ${formatBytes(img.size)}`
      );

      const output = [
        data.breadcrumbs?.length ? `📍 Path: ${data.breadcrumbs.map((b) => b.name).join(' > ')}` : '📍 Path: Root',
        '',
        folderLines.length ? `Folders:\n${folderLines.join('\n')}` : 'No folders.',
        imageLines.length ? `\nImages:\n${imageLines.join('\n')}` : 'No images.',
      ].join('\n');

      return { content: [{ type: 'text', text: output }] };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `❌ List failed: ${err.response?.data?.message || err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── TOOL: get_folder_tree ──────────────────────────────────────────────────
server.tool(
  'get_folder_tree',
  'Get the complete nested folder tree structure for the logged-in user',
  {},
  async () => {
    if (!authToken) {
      return { content: [{ type: 'text', text: '❌ Not authenticated. Please login first.' }], isError: true };
    }
    try {
      const { data } = await apiCall('get', '/folders/tree');

      const renderTree = (nodes, indent = 0) =>
        nodes
          .map((n) => {
            const prefix = '  '.repeat(indent) + (indent > 0 ? '└─ ' : '');
            const line = `${prefix}📁 ${n.name} (${n._id})`;
            const children = n.children?.length ? renderTree(n.children, indent + 1) : '';
            return children ? `${line}\n${children}` : line;
          })
          .join('\n');

      const tree = data.length ? renderTree(data) : 'No folders yet.';
      return { content: [{ type: 'text', text: `Folder Tree:\n\n${tree}` }] };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `❌ Tree fetch failed: ${err.response?.data?.message || err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── TOOL: upload_image ─────────────────────────────────────────────────────
server.tool(
  'upload_image',
  'Upload a local image file to a folder in Drive',
  {
    filePath: z.string().describe('Absolute path to the local image file to upload'),
    name: z.string().optional().describe('Display name for the image (defaults to filename)'),
    folderName: z.string().optional().describe('Name of the folder to upload into (leave empty for root)'),
  },
  async ({ filePath, name, folderName }) => {
    if (!authToken) {
      return { content: [{ type: 'text', text: '❌ Not authenticated. Please login first.' }], isError: true };
    }
    if (!fs.existsSync(filePath)) {
      return { content: [{ type: 'text', text: `❌ File not found: ${filePath}` }], isError: true };
    }

    try {
      let folderId = null;
      if (folderName) {
        folderId = await findFolderIdByName(folderName);
        if (!folderId) {
          return { content: [{ type: 'text', text: `❌ Folder "${folderName}" not found.` }], isError: true };
        }
      }

      const form = new FormData();
      form.append('image', fs.createReadStream(filePath));
      form.append('name', name || path.basename(filePath));
      if (folderId) form.append('folderId', folderId);

      const { data } = await axios.post(`${BASE_URL}/images`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      });

      return {
        content: [{
          type: 'text',
          text: `✅ Image "${data.name}" uploaded successfully!\n  ID: ${data._id}\n  Size: ${formatBytes(data.size)}\n  Folder: ${data.folder || 'Root'}`,
        }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `❌ Upload failed: ${err.response?.data?.message || err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── Helper ─────────────────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// ─── Start Server ────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('🚀 Drive MCP Server running via stdio');
