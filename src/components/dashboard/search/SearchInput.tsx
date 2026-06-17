"use client";
import { Search } from "lucide-react";
interface SearchInputProps {
	value: string;
	onChange: (
		value: string
	) => void;
}
export default function SearchInput({
	value,
	onChange,
}: SearchInputProps) {
	return (
		<div className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
			<Search
				size={18}
				className="text-[var(--text-secondary)]"
			/>
			<input
				autoFocus
				value={value}
				onChange={e =>
					onChange(
						e.target.value
					)
				}
				placeholder="Search emails, meetings, contacts..."
				className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
			/>
			<div className="hidden sm:flex items-center gap-1 text-xs text-[var(--text-secondary)]">
				<span className="px-2 py-1 rounded-md border border-[var(--border)]">
					ESC
				</span>
			</div>
		</div>
	);
}