import { NextResponse } from 'next/server';

import { getTenantId } from '@/server/utils/tenant';

import { getContextData } from '@/server/dashboard/context';

export async function GET() {
  try {
    const tenantId = await getTenantId();

    if (!tenantId) {
      return NextResponse.json({
        importantEmails: [],

        todaysAgenda: [],

        suggestions: [],
      });
    }

    const data = await getContextData(tenantId);

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      'CONTEXT PANEL ERROR',

      error
    );

    return NextResponse.json(
      {
        importantEmails: [],

        todaysAgenda: [],

        suggestions: [],
      },

      {
        status: 500,
      }
    );
  }
}
