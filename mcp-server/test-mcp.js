import { McpClient } from '@modelcontextprotocol/sdk/client/mcp.js';

async function test() {
  const client = new McpClient({ stdio: true });
  await client.connect();
  const result = await client.call('get_folder_tree', {});
  console.log(result);
  await client.disconnect();
}

test();