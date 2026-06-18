import { and, eq } from 'drizzle-orm';

import { db } from '@/server/db';

import { emailReplies } from '@/server/db/schema';

export async function getEmailReply(
  tenantId: string,

  messageId: string
) {
  return db.query.emailReplies.findFirst({
    where: and(
      eq(
        emailReplies.tenantId,

        tenantId
      ),

      eq(
        emailReplies.messageId,

        messageId
      )
    ),
  });
}

export async function createEmailReply(data: typeof emailReplies.$inferInsert) {
  return db.insert(emailReplies).values(data);
}
