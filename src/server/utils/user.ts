import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {

    const session = await auth();

    if (!session?.user?.email) {

        return null;

    }

    return db.query.users.findFirst({

        where: eq(

            users.email,

            session.user.email

        )

    });

}