"use client";

import {
	Mail,
	CalendarPlus,
	FilePenLine,
	ListTodo,
} from "lucide-react";

interface SuggestedPromptsProps {
	onSelect?: (prompt: string) => void;
}

const prompts = [
	{
		title: "Summarize Inbox",

		description: "Get a quick overview of unread emails",

		prompt: "Summarize my unread emails",

		icon: Mail,
	},

	{
		title: "Schedule Meeting",

		description: "Find free slots and create an event",

		prompt: "Schedule a meeting tomorrow",

		icon: CalendarPlus,
	},

	{
		title: "Draft Email",

		description: "Write a professional email",

		prompt: "Draft an email to Rahul",

		icon: FilePenLine,
	},

	{
		title: "Plan My Day",

		description: "Organize meetings and tasks",

		prompt: "Help me plan my day",

		icon: ListTodo,
	},
];

export default function SuggestedPrompts({
	onSelect,
}: SuggestedPromptsProps) {
	return (
		<div className="flex flex-wrap gap-4">
			{prompts.map((item) => {
				const Icon = item.icon;

				return (
					<button
						key={item.title}
						onClick={() => onSelect?.(item.prompt)}
						className="group w-[280px] text-left bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-200"
					>
						<div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4 group-hover:scale-105 transition">
							<Icon size={20} />
						</div>

						<h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">
							{item.title}
						</h3>

						<p className="text-sm text-[var(--text-secondary)] leading-6">
							{item.description}
						</p>
					</button>
				);
			})}
		</div>
	);
}