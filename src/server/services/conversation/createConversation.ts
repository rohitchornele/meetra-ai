import { db } from '@/server/db';
import { conversationsTable } from '@/server/db/schema';

export async function createConversation(tenantId: string, title = 'New Chat') {
  const [conversation] = await db
    .insert(conversationsTable)
    .values({
      tenantId,
      title,
    })
    .returning();

  return conversation;
}
