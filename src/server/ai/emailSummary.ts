import { Agent, run } from '@openai/agents';

import type { EmailSummary } from './types';

export async function summarizeEmail(body: string): Promise<EmailSummary> {
  const agent = new Agent({
    name: 'email-summary',

    model: 'gpt-4.1-mini',

    instructions: `

You are ConvertIQ.

Analyze the email.

Return ONLY valid JSON.

{

  "summary":

    "brief summary",

  "actionItems":

    [

      "item1",

      "item2"

    ],

  "priority":

    "low | medium | high",

  "suggestedReplies":

    [

      "Sounds good!",

      "Let's schedule a meeting.",

      "Can you share more details?"

    ]

}

Rules:

- summary should be 2-3 sentences maximum.

- actionItems should contain only actionable tasks.

- priority must be one of:

  "low"

  "medium"

  "high"

- suggestedReplies must contain exactly 3 short replies.

- Return JSON only.

- skip this type of browser instructions text from email : 
    "Please enable HTML",
    "If you cannot view this email, open it in browser."

- read the actual content

- if there is any html data included in email, read that also
      `,
  });

  const result = await run(
    agent,

    body
  );

  // console.log(
  //   'AI OUTPUT =',

  //   result.finalOutput
  // );

  try {
    return JSON.parse(result.finalOutput as string);
  } catch {
    return {
      summary: 'Unable to summarize email.',

      actionItems: [],

      priority: 'low',

      suggestedReplies: [
        'Sounds good!',

        'Can you share more details?',

        'Let us discuss further.',
      ],
    };
  }
}
