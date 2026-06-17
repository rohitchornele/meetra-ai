import { eq, and } from 'drizzle-orm';

import { db } from '@/server/db';

import { conversationsTable } from '@/server/db/schema';

export async function getConversation(
  id: string,

  tenantId: string
) {
  return db.query.conversationsTable.findFirst({
    where: and(
      eq(
        conversationsTable.id,

        id
      ),

      eq(
        conversationsTable.tenantId,

        tenantId
      )
    ),
  });
}
