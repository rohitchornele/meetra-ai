import { and, eq } from "drizzle-orm";

import { corsairAccounts, corsairIntegrations, db } from "../db";

export async function isConnected(tenantId: string, integrationName: string) {

    const integration = await db.query.corsairIntegrations.findFirst({
        where:
            eq(corsairIntegrations.name, integrationName)
    });

    if (!integration) {
        return false;
    }

    const account = await db.query.corsairAccounts.findFirst({

        where:
            and(
                eq(corsairAccounts.tenantId, tenantId),
                eq(corsairAccounts.integrationId, integration.id)
            )
    });

    return !!account;

}