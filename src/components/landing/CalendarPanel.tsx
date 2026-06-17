interface CalendarPanelProps {
	className?: string;
}
const calendarData = [
	{
		day: "Today",
		events: [
			{
				time: "2:00 PM",
				title: "Product Review",
				green: false,
			},
			{
				time: "4:00 PM",
				title: "Team Meeting",
				green: true,
			},
		],
	},
	{
		day: "Tomorrow",
		events: [
			{
				time: "11:00 AM",
				title: "Rahul · Sync",
				green: true,
			},
		],
	},
];
export default function CalendarPanel({ className = "" }: CalendarPanelProps) {
	return (
		<div className={`${className} hidden lg:block bg-card border border-border rounded-[16px] overflow-hidden shadow-[var(--shadow-float)]`}
		>
			{/* Header */}
			<div className="px-4 py-3 border-b border-border uppercase tracking-[0.06em] text-[0.72rem] font-bold text-text2"
			>
				Calendar
			</div>
			{/* Body */}
			<div className="p-3">
				{calendarData.map((section) => (
					<div key={section.day} className="mb-4 last:mb-0"
					>
						{/* Day Label */}
						<div className="text-[0.67rem] uppercase tracking-[0.06em] font-bold text-accent2 mb-2">
							{section.day}
						</div>
						{/* Events */}
						{section.events.map((event) => (
							<div className={`rounded-md px-3 py-2 mb-2 border-l-2 ${ event.green ? `bg-glow2 border-accent2` : `bg-glow1 border-accent`}`} key={`${section.day}-${event.time}`}
							>
								<div className="text-[0.66rem] text-text2 mb-[2px]"
								>
									{event.time}
								</div>
								<div className="text-[0.73rem] font-semibold text-text"
								>
									{event.title}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
