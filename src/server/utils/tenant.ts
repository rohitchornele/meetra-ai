import { corsair } from "@/server/corsair";

import { getCurrentUser } from "./user";

export async function getTenantId() {

    const user = await getCurrentUser();
    return user?.tenantId ?? null;
}

export async function getTenantClient() {

    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    return corsair.withTenant(
        user.id
    );

}