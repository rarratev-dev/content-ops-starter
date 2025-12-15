#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';

const N8N_API_KEY = process.env.N8N_API_KEY;
const N8N_BASE_URL = process.env.N8N_BASE_URL || 'https://n8n-n8n.nzlp7o.easypanel.host';

if (!N8N_API_KEY) {
  console.error('Error: N8N_API_KEY environment variable is required');
  process.exit(1);
}

class N8nServer {
  constructor() {
    this.server = new Server(
      {
        name: 'n8n-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async makeN8nRequest(endpoint, options = {}) {
    const url = `${N8N_BASE_URL}${endpoint}`;
    const headers = {
      'X-N8N-API-KEY': N8N_API_KEY,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`n8n API error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to connect to n8n: ${error.message}`);
    }
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'list_workflows',
          description: 'List all workflows in n8n. Returns workflow names, IDs, and active status.',
          inputSchema: {
            type: 'object',
            properties: {
              active: {
                type: 'boolean',
                description: 'Filter by active status (optional)',
              },
            },
          },
        },
        {
          name: 'execute_workflow',
          description: 'Execute a workflow in n8n by ID or name. Can pass custom input data.',
          inputSchema: {
            type: 'object',
            properties: {
              workflowId: {
                type: 'string',
                description: 'The workflow ID or name to execute',
              },
              data: {
                type: 'object',
                description: 'Optional input data to pass to the workflow',
              },
            },
            required: ['workflowId'],
          },
        },
        {
          name: 'get_executions',
          description: 'Get recent workflow executions with their status and results.',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'number',
                description: 'Number of executions to retrieve (default: 10)',
              },
              workflowId: {
                type: 'string',
                description: 'Filter by specific workflow ID (optional)',
              },
            },
          },
        },
        {
          name: 'get_workflow',
          description: 'Get detailed information about a specific workflow.',
          inputSchema: {
            type: 'object',
            properties: {
              workflowId: {
                type: 'string',
                description: 'The workflow ID to retrieve',
              },
            },
            required: ['workflowId'],
          },
        },
        {
          name: 'activate_workflow',
          description: 'Activate a workflow to make it run automatically on triggers.',
          inputSchema: {
            type: 'object',
            properties: {
              workflowId: {
                type: 'string',
                description: 'The workflow ID to activate',
              },
            },
            required: ['workflowId'],
          },
        },
        {
          name: 'deactivate_workflow',
          description: 'Deactivate a workflow to stop it from running automatically.',
          inputSchema: {
            type: 'object',
            properties: {
              workflowId: {
                type: 'string',
                description: 'The workflow ID to deactivate',
              },
            },
            required: ['workflowId'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'list_workflows': {
            const data = await this.makeN8nRequest('/api/v1/workflows');
            const workflows = data.data || [];

            let filtered = workflows;
            if (args.active !== undefined) {
              filtered = workflows.filter(w => w.active === args.active);
            }

            const summary = filtered.map(w => ({
              id: w.id,
              name: w.name,
              active: w.active,
              tags: w.tags || [],
              createdAt: w.createdAt,
              updatedAt: w.updatedAt,
            }));

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(summary, null, 2),
                },
              ],
            };
          }

          case 'execute_workflow': {
            const { workflowId, data: inputData } = args;

            // First, get all workflows to find by name if needed
            const allWorkflows = await this.makeN8nRequest('/api/v1/workflows');
            const workflows = allWorkflows.data || [];

            // Try to find workflow by ID or name
            let workflow = workflows.find(w => w.id === workflowId);
            if (!workflow) {
              workflow = workflows.find(w => w.name.toLowerCase() === workflowId.toLowerCase());
            }

            if (!workflow) {
              throw new Error(`Workflow not found: ${workflowId}`);
            }

            const result = await this.makeN8nRequest(`/api/v1/workflows/${workflow.id}/execute`, {
              method: 'POST',
              body: JSON.stringify(inputData || {}),
            });

            return {
              content: [
                {
                  type: 'text',
                  text: `Workflow "${workflow.name}" executed successfully!\n\n${JSON.stringify(result, null, 2)}`,
                },
              ],
            };
          }

          case 'get_executions': {
            const limit = args.limit || 10;
            const params = new URLSearchParams({
              limit: limit.toString(),
            });

            if (args.workflowId) {
              params.append('workflowId', args.workflowId);
            }

            const data = await this.makeN8nRequest(`/api/v1/executions?${params}`);
            const executions = data.data || [];

            const summary = executions.map(e => ({
              id: e.id,
              workflowId: e.workflowId,
              status: e.status,
              mode: e.mode,
              startedAt: e.startedAt,
              stoppedAt: e.stoppedAt,
              finished: e.finished,
            }));

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(summary, null, 2),
                },
              ],
            };
          }

          case 'get_workflow': {
            const { workflowId } = args;
            const workflow = await this.makeN8nRequest(`/api/v1/workflows/${workflowId}`);

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(workflow, null, 2),
                },
              ],
            };
          }

          case 'activate_workflow': {
            const { workflowId } = args;
            const result = await this.makeN8nRequest(`/api/v1/workflows/${workflowId}`, {
              method: 'PATCH',
              body: JSON.stringify({ active: true }),
            });

            return {
              content: [
                {
                  type: 'text',
                  text: `Workflow activated successfully!\n\n${JSON.stringify(result, null, 2)}`,
                },
              ],
            };
          }

          case 'deactivate_workflow': {
            const { workflowId } = args;
            const result = await this.makeN8nRequest(`/api/v1/workflows/${workflowId}`, {
              method: 'PATCH',
              body: JSON.stringify({ active: false }),
            });

            return {
              content: [
                {
                  type: 'text',
                  text: `Workflow deactivated successfully!\n\n${JSON.stringify(result, null, 2)}`,
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('n8n MCP server running on stdio');
  }
}

const server = new N8nServer();
server.run().catch(console.error);
