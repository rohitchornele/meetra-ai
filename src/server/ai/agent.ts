import { OpenAIAgentsProvider } from '@corsair-dev/mcp';

import { Agent, run, tool, type AgentInputItem } from '@openai/agents';

import { corsair } from '@/server/corsair';

import { SYSTEM_PROMPT } from './systemPrompt';

type ChatMessage = {
  role: 'user' | 'assistant' | 'tool';
  content: string;
};

/*
Create provider once
*/

const provider = new OpenAIAgentsProvider();

export async function chat(
  tenantId: string,

  messages: ChatMessage[]
) {
  console.log('TENANT =', tenantId);

  console.log('MESSAGES =', messages);

  /*
  Limit context window

  Keep everything in DB

  Send only recent messages to AI
  */

  const recentMessages = messages.slice(-20);

  const tenant = corsair.withTenant(tenantId);

  const tools = provider.build({
    corsair: tenant,

    tool,
  });

  const agent = new Agent({
    name: 'convertiq-agent',

    model: 'gpt-4.1-mini',

    instructions: SYSTEM_PROMPT,

    tools,
  });

  const history: AgentInputItem[] = [];

  for (const message of recentMessages) {
    if (message.role === 'tool') {
      continue;
    }

    if (message.role === 'user') {
      history.push({
        role: 'user',

        content: [
          {
            type: 'input_text',

            text: message.content,
          },
        ],
      });
    }

    if (message.role === 'assistant') {
      history.push({
        role: 'assistant',

        status: 'completed',

        content: [
          {
            type: 'output_text',

            text: message.content,
          },
        ],
      });
    }
  }

  /*
  Return StreamedRunResult

  Route will:

  - stream chunks
  - await completion
  - save assistant message
  */

  return run( agent, history, { stream: true, });
}
