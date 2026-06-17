import {
	CalendarDays,
} from "lucide-react";
const meetings = [
	{
		time: "2 PM",
		title:
			"Product Review",
	},
	{
		time: "4 PM",
		title:
			"Team Meeting",
	},
];
export default function TodayAgenda() {
	return (
		<div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
		>
			<div className="flex items-center gap-2 mb-5"
			>
				<CalendarDays
					size={18}
				/>
				<h3 className="font-semibold">
					Today's Agenda
				</h3>
			</div>
			<div className="space-y-5">
				{
					meetings.map(
						meeting => (
							<div
								key={
									meeting.title
								}
							>
								<p className="text-xs text-[var(--text-secondary)] mb-1"
								>
									{
										meeting.time
									}
								</p>
								<p>
									{
										meeting.title
									}
								</p>
							</div>
						)
					)
				}
			</div>
		</div>
	);
}