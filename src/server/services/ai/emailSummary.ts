import { eq } from 'drizzle-orm';

import { db, emailSummaries } from '@/server/db';

export async function getEmailSummary(messageId: string) {
  const result = await db.query.emailSummaries.findFirst({
    where: eq(emailSummaries.messageId, messageId),
  });

  return result;
}

export async function createEmailSummary(
  data: typeof emailSummaries.$inferInsert
) {
  return db.insert(emailSummaries).values(data);
}
