"use client";
import { useRouter } from "next/navigation";
import { Sparkles, CalendarPlus, MailPlus, ListTodo } from "lucide-react";
const actions = [
	{
		title: "Summarize Inbox",
		description: "Get a quick overview of unread emails",
		icon: Sparkles,
		prompt: "Summarize my unread emails",
	},
	{
		title: "Schedule Meeting",
		description: "Find a slot and create an event",
		icon: CalendarPlus,
		prompt: "Schedule a meeting tomorrow",
	},
	{
		title: "Draft Email",
		description: "Generate a professional email",
		icon: MailPlus,
		prompt: "Draft an email",
	},
	{
		title: "Plan My Day",
		description: "Organize meetings and tasks",
		icon: ListTodo,
		prompt: "Help me plan my day",
	},
];
export default function SuggestedActions() {
	const router = useRouter();
	const handleClick = (prompt: string) => {
		// later:
		// store prompt in context
		// navigate to chat
		router.push(`/dashboard/chat?prompt=${encodeURIComponent(prompt)}`);
	};
	return (
		<div className="space-y-5">
			<div>
				<h2 className="text-xl font-semibold">Suggested Actions</h2>
				<p className="text-sm text-[var(--text-secondary)] mt-1">
					Popular things you can ask ConvertIQ
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
			>
				{actions.map((action) => {
					const Icon = action.icon;
					return (
						<button className="text-left p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl transition-all duration-200 hover:border-white/15 hover:bg-white/[0.02] hover:-translate-y-[2px] group"
							key={action.title}
							onClick={() => handleClick(action.prompt)}
						>
							<div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-5 group-hover:scale-105 transition"
							>
								<Icon size={22} />
							</div>
							<h3 className="font-semibold text-lg mb-2"
							>
								{action.title}
							</h3>
							<p className="text-sm text-[var(--text-secondary)] leading-relaxed "
							>
								{action.description}
							</p>
						</button>
					);
				})}
			</div>
		</div>
	);
}
