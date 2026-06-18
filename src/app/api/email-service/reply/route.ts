import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/server/utils/user';

import { sendMessage } from '@/server/integrations/gmail';

import { createReplyMessage } from '@/server/utils/createReplyMessage';

export async function POST(req: Request) {
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

    const {
      to,

      subject,

      body,
    } = await req.json();

    const raw = createReplyMessage({
      to,

      subject,

      body,
    });

    await sendMessage(
      user.id,

      raw
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      'SEND REPLY ERROR',

      error
    );

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },

      {
        status: 500,
      }
    );
  }
}
