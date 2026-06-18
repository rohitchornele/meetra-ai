import { Agent, run } from '@openai/agents';

export async function draftReply(emailBody: string) {
  const agent = new Agent({
    name: 'draft-reply',

    model: 'gpt-4.1-mini',

    instructions: `
You are ConvertIQ.

Draft a professional reply to the email.

Rules:

- Return only the reply body.
- Do NOT include Subject.
- Do NOT include markdown.
- Keep it concise.
- Maintain a friendly and professional tone.
- End naturally.

Example:

Hi Rahul,

Thanks for sharing this.

The proposal looks good to me. Let's schedule a review meeting next week.

Best,
Rohit

Only output the email body.
      `,
  });

  const result = await run(
    agent,

    emailBody
  );

  return String(result.finalOutput);
}
