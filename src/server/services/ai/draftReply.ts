import { Agent, run } from '@openai/agents';

export async function draftReply(emailBody: string) {
  const agent = new Agent({
    name: 'draft-reply',

    model: 'gpt-4.1-mini',

    instructions: `

You are ConvertIQ.

Draft a professional reply.

Keep it concise.

Do not include:

- Subject

- Markdown

- Explanations

Only return the reply text.

      `,
  });

  const result = await run(
    agent,

    emailBody
  );

  return String(result.finalOutput);
}
