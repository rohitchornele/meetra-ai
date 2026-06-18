// server/integration/gmail.ts

import { corsair } from '@/server/corsair';

export async function getMessages(tenantId: string, maxResults = 10) {
  console.log('GET MESSAGES CALLED');
  const tenant = corsair.withTenant(tenantId);
  return tenant.gmail.api.messages.list({ maxResults });
}

export async function getMessage(tenantId: string, messageId: string) {
  const tenant = corsair.withTenant(tenantId);
  return tenant.gmail.api.messages.get({ id: messageId });
}

export async function sendMessage(tenantId: string, raw: string) {
  const tenant = corsair.withTenant(tenantId);
  return tenant.gmail.api.messages.send({ raw });
}


export function mapEmail(email: any) {
  const headers = email.payload?.headers ?? [];

  const getHeader = (name: string) =>
    headers.find((h : any) => h.name === name)?.value ?? '';

  return {
    id: email.id,

    threadId: email.threadId,

    subject: getHeader('Subject'),

    from: getHeader('From'),

    date: getHeader('Date'),

    snippet: email.snippet,
  };
}
