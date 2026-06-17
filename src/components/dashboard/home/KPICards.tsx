"use client";
import { Mail, Calendar, CheckSquare, Sparkles } from "lucide-react";
const stats = [
	{
		title: "Unread Emails",
		value: 23,
		icon: Mail,
	},
	{
		title: "Today's Meetings",
		value: 4,
		icon: Calendar,
	},
	{
		title: "Tasks Due",
		value: 3,
		icon: CheckSquare,
	},
	{
		title: "AI Usage",
		value: "48",
		suffix: "prompts",
		icon: Sparkles,
	},
];
export default function KPICards() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
		>
			{stats.map((stat) => {
				const Icon = stat.icon;
				return (
					<div
						key={stat.title} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-200 hover:border-white/15 hover:-translate-y-[2px] "
					>
						<div className="flex items-center justify-between mb-8"
						>
							<p className="text-sm text-[var(--text-secondary)]"
							>
								{stat.title}
							</p>
							<div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
								<Icon size={18} />
							</div>
						</div>
						<div className="flex items-end gap-2">
							<h2 className="text-4xl font-bold tracking-tight"
							>
								{stat.value}
							</h2>
							{stat.suffix && (
								<span className="mb-1 text-sm text-[var(--text-secondary)] "
								>
									{stat.suffix}
								</span>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
