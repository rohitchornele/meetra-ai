import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/server/utils/user';

import { getMessage } from '@/server/integrations/gmail';

import { draftReply } from '@/server/ai/draftReply';

import {
  getEmailReply,
  createEmailReply,
} from '@/server/services/ai/emailReply';
import { getEmailBody } from '@/server/utils/getEmailBody';

export async function GET(
  req: Request,

  {
    params,
  }: {
    params: Promise<{
      messageId: string;
    }>;
  }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },

        {
          status: 401,
        }
      );
    }

    const { messageId } = await params;

    const cached = await getEmailReply(
      user.id,

      messageId
    );

    if (cached) {
      return NextResponse.json({
        reply: cached.reply,
      });
    }

    const email = await getMessage(
      user.id,

      messageId
    );

    const { text } = getEmailBody(email.payload);

    const reply = await draftReply(text);

    await createEmailReply({
      tenantId: user.id,

      messageId,

      reply,
    });

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error(
      'DRAFT REPLY ERROR',

      error
    );

    return NextResponse.json(
      {
        error: 'Failed to draft reply',
      },

      {
        status: 500,
      }
    );
  }
}
