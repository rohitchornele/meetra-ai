import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/server/utils/user';

import { getMessage } from '@/server/integrations/gmail';

import { summarizeEmail } from '@/server/ai/emailSummary';

import {
  getEmailSummary,
  createEmailSummary,
} from '@/server/services/ai/emailSummary';
import { getEmailBody } from '@/server/utils/getEmailBody';

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

    /*
    Check cache first
    */

    const cached = await getEmailSummary(messageId);

    if (cached) {
      return NextResponse.json(cached);
    }

    /*
    Fetch Gmail message
    */

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
      return NextResponse.json(
        {
          error: 'Unable to extract email body',
        },

        {
          status: 400,
        }
      );
    }

    /*
    Ask AI
    */

    const result = await summarizeEmail(content);

    /*
    Save cache
    */

    await createEmailSummary({
      tenantId: user.id,

      messageId,

      summary: result.summary,

      actionItems: result.actionItems,

      priority: result.priority,
      
      suggestedReplies: result.suggestedReplies,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      'EMAIL SUMMARY ERROR',

      error
    );

    return NextResponse.json(
      {
        error: 'Failed to generate summary',
      },

      {
        status: 500,
      }
    );
  }
}
