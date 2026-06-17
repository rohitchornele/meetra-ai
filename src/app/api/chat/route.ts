import { NextRequest, NextResponse } from 'next/server';

import { chat } from '@/server/ai/agent';

import { getTenantId } from '@/server/utils/tenant';

import { createMessage, getMessages } from '@/server/services/conversation';

export async function POST(request: NextRequest) {
  console.log('CHAT API CALLED');

  try {
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

    const {
      conversationId,

      message,
    } = body;

    if (!conversationId) {
      return NextResponse.json(
        {
          error: 'Conversation ID is required',
        },

        {
          status: 400,
        }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          error: 'Message is required',
        },

        {
          status: 400,
        }
      );
    }

    /*
    Save user message
    */

    await createMessage(
      conversationId,

      'user',

      message
    );

    /*
    Load history
    */

    const messages = await getMessages(conversationId);

    /*
    Run agent
    */

    const result = await chat(
      tenantId,

      messages
    );

    // for await (const event of result) {
    //   console.log('STREAM EVENT ----------------');

    //   console.dir(
    //     event,

    //     {
    //       depth: null,
    //     }
    //   );
    // }

    const encoder = new TextEncoder();

    let assistantText = '';

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.toTextStream()) {
            assistantText += chunk;

            controller.enqueue(encoder.encode(chunk));
          }

          /*
            Wait until
            agent finishes
            */

          await result.completed;

          /*
            Save assistant
            */

          if (assistantText) {
            await createMessage(
              conversationId,

              'assistant',

              assistantText
            );
          }

          controller.close();
        } catch (error) {
          console.error(error);

          controller.error(error);
        }
      },
    });

    return new Response(
      stream,

      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',

          'Cache-Control': 'no-cache',

          Connection: 'keep-alive',
        },
      }
    );
  } catch (error) {
    console.error(
      'CHAT API ERROR',

      error
    );

    return NextResponse.json(
      {
        error: 'Something went wrong',
      },

      {
        status: 500,
      }
    );
  }
}
