import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getMessages } from "@/server/integrations/gmail";
// import { getEvents } from "@/server/integrations/calendar";
export async function getDashboardStats(
    email: string
) {
    const dbUser =
        await db.query.users.findFirst({
            where: eq(
                users.email,
                email
            ),
        });
    if (!dbUser) {
        throw new Error(
            "User not found"
        );
    }
    /* Gmail */
    const messages = await getMessages( dbUser.tenantId );
    if(!messages) {
        return " No email available"
    }
    // console.log("messages in dashboard = ", messages)
    // const unreadEmails = messages?.filter( (msg) => msg.labelIds?.includes(  "UNREAD" )
    //     ).length ?? 0;
    /* Calendar */
    // const events =
    // await getEvents(
    // dbUser.tenantId
    // );
    const todaysMeetings = 4;
    /* Tasks */
    const pendingTasks = 3;
    /* AI Usage */
    const aiUsage = 48;
    return {
        // unreadEmails,
        todaysMeetings,
        pendingTasks,
        aiUsage,
    };
}