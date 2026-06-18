import { corsair } from "../corsair";
export async function getEvents(tenantId: string) {
	console.log( "GET EVENTS CALLED");
	
	const tenant = corsair.withTenant(tenantId);
	const response = await tenant.googlecalendar.api.events.getMany({
		maxResults: 10,
		timeMin:  new Date().toISOString(),
	});
	return (response.items ?? []).map(mapEvent);
}
export async function getEvent(tenantId: string, eventId: string) {
	const tenant = corsair.withTenant(tenantId);
	const response = await tenant.googlecalendar.api.events.get({
		id: eventId
	});
	// console.log("calendar response = ", response);
	return mapEvent(response);
}
export async function createEvent(tenantId: string, event: {
	title: string;
	description?: string;
	location?: string;
	start: string;
	end: string;
	attendees?: string[];
}) {
	const tenant = corsair.withTenant(tenantId);
	const response = await tenant.googlecalendar.api.events.create({
		event: {
			summary: event.title,
			description: event.description,
			location: event.location,
			start: {
				dateTime: event.start
			},
			end: {
				dateTime: event.end
			},
			attendees: event.attendees?.map(email => ({
				email
			})) ?? []
		}
	});
	return mapEvent(response);
}
export async function updateEvent(tenantId: string, eventId: string, event: {
	title?: string;
	description?: string;
	location?: string;
	start?: string;
	end?: string;
	attendees?: string[];
}) {
	const tenant = corsair.withTenant(tenantId);
	const response = await tenant.googlecalendar.api.events.update({
		id: eventId,
		event: {
			summary: event.title,
			description: event.description,
			location: event.location,
			start: event.start ? {
				dateTime: event.start
			} : undefined,
			end: event.end ? {
				dateTime: event.end
			} : undefined,
			attendees: event.attendees?.map(email => ({
				email
			}))
		}
	});
	return mapEvent(response);
}
export async function deleteEvent(tenantId: string, eventId: string) {
	const tenant = corsair.withTenant(tenantId);
	return await tenant.googlecalendar.api.events.delete({
		id: eventId
	});
}
function mapEvent(event: any) {
	return {
		id: event.id,
		title: event.summary ?? "No Title",
		description: event.description ?? "",
		location: event.location ?? "",
		start: event.start?.dateTime ?? event.start?.date,
		end: event.end?.dateTime ?? event.end?.date,
		date: event.start?.dateTime ? new Date(event.start.dateTime).toLocaleDateString([], {
			day: "numeric",
			month: "short",
			year: "numeric"
		}) : event.start?.date ?? "",
		time: event.start?.dateTime ? new Date(event.start.dateTime).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		}) : "All Day",
		createdAt: event.created ? new Date(event.created).toLocaleDateString([], {
			day: "numeric",
			month: "short",
			year: "numeric"
		}) : "",
		updatedAt: event.updated ? new Date(event.updated).toLocaleDateString([], {
			day: "numeric",
			month: "short",
			year: "numeric"
		}) : "",
		attendees: event.attendees?.map((attendee: any) => attendee.displayName ?? attendee.email) ?? []
	};
}
