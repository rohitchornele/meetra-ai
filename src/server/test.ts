import { corsair } from "./corsair"
import "dotenv/config"

const main = async () => {
    const res = await corsair.withTenant("11f11ba5-2200-41e3-8292-4cf10d19a9fc").googlecalendar.api.events.create({
        calendarId: "primary",
        event: {
            summary: "Test Event",
            description: "This is a test event created via Corsair.",
            start: {
                dateTime: "2026-06-18T15:00:00+05:30",
                timeZone: "Asia/Kolkata",
            },
            end: {
                dateTime: "2026-06-18T16:00:00+05:30",
                timeZone: "Asia/Kolkata",
            },
        },

    })

    // console.log(res)
}

main();