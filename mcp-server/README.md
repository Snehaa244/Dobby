# Drive MCP Server — Optional Bonus Feature

This MCP (Model Context Protocol) server exposes all backend Drive APIs as tools that AI assistants (like Claude Desktop, Cursor, or any MCP-compatible client) can call via **natural language**.

## Tools Available

| Tool | Description |
|------|-------------|
| `signup` | Register a new user |
| `login` | Login and store JWT for the session |
| `create_folder` | Create a folder (supports nested via `parentFolderName`) |
| `list_folders` | List all folders and images in a directory |
| `get_folder_tree` | View the full recursive folder tree |
| `upload_image` | Upload a local image file to a folder |

## Setup

1. Make sure the **backend is running** first: `cd backend && npm run dev`
2. Install MCP server dependencies:
   ```bash
   cd mcp-server
   npm install
   ```
3. Create a `.env` file in `mcp-server/`:
   ```env
   BACKEND_URL=http://localhost:5000/api
   ```

## Running

```bash
cd mcp-server
npm start
```

## Usage with Claude Desktop

Add the following to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "drive": {
      "command": "node",
      "args": ["C:/Users/HP/Desktop/DobbyAdsAssignment/mcp-server/index.js"],
      "env": {
        "BACKEND_URL": "http://localhost:5000/api"
      }
    }
  }
}
```

## Example Prompts (Natural Language → API Calls)

- **"Login as test@dobby.com with password password123"** → Calls `login` tool
- **"Create a folder called Projects"** → Calls `create_folder`
- **"Create a nested folder called React inside Projects"** → Calls `create_folder` with `parentFolderName`
- **"Show me all my folders"** → Calls `list_folders`
- **"Upload the file at C:/Users/photo.jpg to root"** → Calls `upload_image`
- **"Upload an image named Banner into Campaigns folder"** → Calls `upload_image` with `folderName`
