"use client";

import MeetingCard from "./MeetingCard";

interface Meeting {
	id: number;
	title: string;
	time: string;
	date: string;
	attendees?: string[];
}

interface AgendaViewProps {
	meetings: Meeting[];
}


export default function AgendaView({
	meetings,
}: AgendaViewProps) {

	const sortedMeetings = [...meetings].sort(
		(a, b) =>
			new Date(b.date).getTime() -
			new Date(a.date).getTime()
	);

	return (
		<div className="space-y-4">
			{sortedMeetings.map((meeting) => (
				<MeetingCard
					key={meeting.id}
					meeting={meeting}
				/>
			))}
		</div>
	);
}