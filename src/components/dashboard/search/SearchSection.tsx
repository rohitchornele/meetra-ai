"use client";
import SearchItem from "./SearchItem";
import {
	SearchResult,
} from "./types";
interface SearchSectionProps {
	title: string;
	items: SearchResult[];
	selectedId?: string;
	onSelect?: (
		item: SearchResult
	) => void;
}
export default function SearchSection({
	title,
	items,
	selectedId,
	onSelect,
}: SearchSectionProps) {
	if (
		items.length === 0
	) {
		return null;
	}
	return (
		<div className="mb-6">
			{/* Section Header */}
			<div className="px-4 mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
				{title}
			</div>
			{/* Items */}
			<div className="space-y-1">
				{
					items.map(
						item => (
							<SearchItem
								key={item.id}
								item={item}
								selected={
									selectedId ===
									item.id
								}
								onClick={() =>
									onSelect?.(
										item
									)
								}
							/>
						)
					)
				}
			</div>
		</div>
	);
}