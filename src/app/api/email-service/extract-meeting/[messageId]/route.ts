import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/server/utils/user';

import { getMessage } from '@/server/integrations/gmail';

import { getEmailBody } from '@/server/utils/getEmailBody';
import { extractMeeting } from '@/server/ai/extractMeeting';

interface RouteParams {
  params: Promise<{
    messageId: string;
  }>;
}

export async function GET(
  req: Request,

  { params }: RouteParams
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

    const email = await getMessage(
      user.id,

      messageId
    );

    const {
      text,

      html,
    } = getEmailBody(email.payload);

    const content = text || html;

    if (!content) {
      return NextResponse.json(null);
    }

    const meeting = await extractMeeting(content);

    return NextResponse.json(meeting);
  } catch (error) {
    console.error(
      'MEETING ERROR',

      error
    );

    return NextResponse.json(
      {
        error: 'Failed to extract meeting',
      },

      {
        status: 500,
      }
    );
  }
}
