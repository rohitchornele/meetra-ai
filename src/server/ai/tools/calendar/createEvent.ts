import { z } from "zod";
import { createEvent } from "@/server/integrations/googleCalendar";
export const createEventInput = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	location: z.string().optional(),
	start: z.string(),
	end: z.string(),
	attendees: z.array(z.string()).optional()
});
export type CreateEventInput = z.infer<typeof createEventInput>;
export async function calendarCreateEvent(tenantId: string, input: CreateEventInput) {
	const validatedInput = createEventInput.parse(input);
	const event = await createEvent(tenantId, validatedInput);
	return {
		success: true,
		message: "Event created successfully.",
		event
	};
}
