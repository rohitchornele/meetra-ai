import { db } from '@/server/db';

import { messagesTable } from '@/server/db/schema';
import { updateConversation } from './updateConversation';

export async function createMessage(
  conversationId: string,
  role: 'user' | 'assistant' | 'tool',
  content: string
) {
  const [message] = await db
    .insert(messagesTable)
    .values({ conversationId, role, content })
    .returning();

  await updateConversation(conversationId);

  return message;
}
