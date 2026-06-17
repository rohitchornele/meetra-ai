import { NextRequest, NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { conversationsTable } from '@/server/db/schema';
import { getTenantId } from '@/server/utils/tenant';
import { createConversation } from '@/server/services/conversation';

export async function GET() {
  const tenantId = await getTenantId();

  if (!tenantId) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const conversations = await db.query.conversationsTable.findMany({
    where: eq(conversationsTable.tenantId, tenantId),

    orderBy: desc(conversationsTable.updatedAt),
  });

  return NextResponse.json(conversations);
}

export async function POST(request: NextRequest) {
  const tenantId = await getTenantId();

  if (!tenantId) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const { title } = body;

  const conversation = await createConversation(
    tenantId,

    title ?? 'New Chat'
  );

  return NextResponse.json(conversation);
}
