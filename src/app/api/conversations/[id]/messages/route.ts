import { NextRequest, NextResponse } from 'next/server';

import { getTenantId } from '@/server/utils/tenant';

import {
  getConversation,
  getMessages,
} from '@/server/services/conversation';

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const tenantId =
      await getTenantId();

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

    const { id } =
      await params;

    /*
      Verify ownership
    */

    const conversation =
      await getConversation(
        id,
        tenantId
      );

    if (!conversation) {
      return NextResponse.json(
        {
          error:
            'Conversation not found',
        },
        {
          status: 404,
        }
      );
    }

    /*
      Load messages
    */

    const messages =
      await getMessages(
        id,
        100
      );

    return NextResponse.json(
      messages
    );

  } catch (error) {

    console.error(
      'GET MESSAGES ERROR',
      error
    );

    return NextResponse.json(
      {
        error:
          'Something went wrong',
      },
      {
        status: 500,
      }
    );

  }
}