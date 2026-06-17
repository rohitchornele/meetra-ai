"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import {
	SearchResult,
} from "./types";
interface SearchModalProps {
	open: boolean;
	onClose: () => void;
	results: SearchResult[];
}
export default function SearchModal({
	open,
	onClose,
	results,
}: SearchModalProps) {
	const [
		query,
		setQuery,
	] = useState("");
	useEffect(() => {
		const handleKeyDown = (
			e: KeyboardEvent
		) => {
			if (
				e.key === "Escape"
			) {
				onClose();
			}
		};
		if (open) {
			window.addEventListener(
				"keydown",
				handleKeyDown
			);
		}
		return () => {
			window.removeEventListener(
				"keydown",
				handleKeyDown
			);
		};
	},
	[
		open,
		onClose,
	]);
	if (!open) {
		return null;
	}
	const filteredResults =
		results.filter(
			result =>
				result.title
					.toLowerCase()
					.includes(
						query.toLowerCase()
					)
				||
				result
					.description
					?.toLowerCase()
					.includes(
						query.toLowerCase()
					)
		);
	return (
		<div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]">
			{/* Overlay */}
			<div
				onClick={onClose}
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
			/>
			{/* Modal */}
			<div className="relative w-full max-w-2xl mx-4 bg-[var(--bg)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
					<h2 className="text-lg font-semibold text-[var(--text-primary)]">
						Search
					</h2>
					<button
						onClick={onClose}
						className="w-9 h-9 rounded-xl hover:bg-white/[0.03] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
					>
						<X size={18} />
					</button>
				</div>
				{/* Search Input */}
				<div className="px-4 py-3 border-b border-[var(--border)]">
					<SearchInput
						value={query}
						onChange={setQuery}
					/>
				</div>
				{/* Results */}
				<div className="max-h-[60vh] overflow-y-auto px-2 py-3">
					<SearchResults
						results={filteredResults}
					/>
				</div>
			</div>
		</div>
	);
}