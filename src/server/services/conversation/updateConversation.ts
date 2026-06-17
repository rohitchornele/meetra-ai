import { eq } from 'drizzle-orm';

import { db } from '@/server/db';

import { conversationsTable } from '@/server/db/schema';

export async function updateConversation(conversationId: string) {
  const [conversation] = await db
    .update(conversationsTable)
    .set({ updatedAt: new Date() })
    .where(eq(conversationsTable.id, conversationId))
    .returning();

  return conversation;
}
