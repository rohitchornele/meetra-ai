import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import {
  corsairAccounts,
  corsairIntegrations,
  db,
} from "@/server/db";
import { getTenantId }
  from "@/server/utils/tenant";


export async function GET( request: NextRequest) {
  console.log("DISCONNECT API CALLED");
  const tenantId = await getTenantId();
  if (!tenantId) {
    return NextResponse.json(
      {
        error:
          "Unauthorized"
      },
      {
        status:
          401
      }
    );
  }
  const plugin = new URL(request.url).searchParams.get("plugin");
  if (!plugin) {
    return NextResponse.json(
      {
        error:
          "Missing plugin"
      },
      {
        status:
          400
      }
    );
  }
  const integration = await db.query.corsairIntegrations.findFirst({
    where:
      eq(corsairIntegrations.name, plugin)
  });

  if (!integration) {
    return NextResponse.json(
      {
        error:
          "Integration not found"
      },
      {
        status:
          404
      }
    );
  }
  await db.delete(corsairAccounts)
    .where(
      and(
        eq(corsairAccounts.tenantId, tenantId),
        eq(corsairAccounts.integrationId, integration.id)
      )
    );
  return NextResponse.redirect(
    new URL("/dashboard/integrations", request.url)
  );
}