"use client";
import {
	Mail,
	Calendar,
	User,
	MessageSquare,
	ChevronRight,
} from "lucide-react";
import {
	SearchResult,
} from "./types";
interface SearchItemProps {
	item: SearchResult;
	selected?: boolean;
	onClick?: () => void;
}
export default function SearchItem({
	item,
	selected = false,
	onClick,
}: SearchItemProps) {
	const Icon =
		item.category === "email"
			? Mail
			: item.category === "meeting"
			? Calendar
			: item.category === "contact"
			? User
			: MessageSquare;
	return (
		<button
			onClick={onClick}
			className={`group w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all ${selected ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}
		>
			{/* Icon */}
			<div className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
				<Icon size={18} />
			</div>
			{/* Content */}
			<div className="flex-1 min-w-0">
				<div className="truncate text-[15px] font-medium text-[var(--text-primary)]">
					{item.title}
				</div>
				{
					item.description && (
						<div className="truncate text-sm text-[var(--text-secondary)] mt-1">
							{item.description}
						</div>
					)
				}
			</div>
			{/* Arrow */}
			<div className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition">
				<ChevronRight size={16} />
			</div>
		</button>
	);
}