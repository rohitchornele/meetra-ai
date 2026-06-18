import { Agent, run } from '@openai/agents';

export interface MeetingSuggestion {
  title: string;

  description?: string;

  location?: string;

  start: string;

  end: string;

  attendees: string[];
}

export async function extractMeeting(
  emailBody: string
): Promise<MeetingSuggestion | null> {
  const agent = new Agent({
    name: 'meeting-extractor',

    model: 'gpt-4.1-mini',

    instructions: `

You are ConvertIQ.

Analyze the email.

Your task:

- Detect whether the email is asking to schedule a meeting.
- If yes, extract meeting details.

Return ONLY valid JSON.

If NO meeting exists:

null


If meeting exists:

{

"title":

"Project Review",

"description":

"Discuss sprint progress",

"location":

"Google Meet",

"start":

"2026-06-25T15:00:00",

"end":

"2026-06-25T15:30:00",

"attendees":

[

"rahul@example.com"

]

}

Rules:

- Return null if no meeting intent exists.

- start and end must be ISO datetime strings.

- If end time is not present,
  assume 30 minutes duration.

- attendees must contain only email addresses.

- Return JSON only.

`,
  });

  const result = await run(
    agent,

    emailBody
  );

  const output = String(result.finalOutput).trim();

  // console.log(
  //   'MEETING OUTPUT =',

  //   output
  // );

  if (output.toLowerCase() === 'null') {
    return null;
  }

  try {
    return JSON.parse(output);
  } catch {
    console.error(
      'INVALID MEETING JSON',

      output
    );

    return null;
  }
}
