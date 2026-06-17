// app/api/integration/gmail/route.ts

import { NextResponse } from "next/server";

import { getCurrentUser }

    from "@/server/utils/user";

import { getMessages }

    from "@/server/integrations/gmail";

export async function GET() {

    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json(
            {
                error: "Unauthorized"
            },
            {
                status: 401
            }
        );

    }

    const messages = await getMessages( user.id );

    return NextResponse.json( messages );

}