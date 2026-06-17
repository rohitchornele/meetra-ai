import { desc, eq } from 'drizzle-orm';

import { db } from '@/server/db';

import { messagesTable } from '@/server/db/schema';

export async function getMessages(conversationId: string, limit = 10) {
  const messages = await db.query.messagesTable.findMany({
    where: eq( messagesTable.conversationId, conversationId ),
    orderBy: desc(messagesTable.createdAt), 
    limit,
  });

  return messages.reverse();
}
