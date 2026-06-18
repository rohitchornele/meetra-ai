import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/server/utils/user';

import { createEvent } from '@/server/integrations/googleCalendar';

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

    const event = await req.json();

    const result = await createEvent(
      user.id,

      event
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      'CREATE EVENT ERROR',

      error
    );

    return NextResponse.json(
      {
        error: 'Failed to create event',
      },

      {
        status: 500,
      }
    );
  }
}
