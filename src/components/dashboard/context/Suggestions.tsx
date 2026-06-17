import {
	Sparkles,
} from "lucide-react";
const suggestions = [
	"Summarize Inbox",
	"Schedule Meeting",
	"Reply to Rahul",
	"Plan My Day",
];
export default function Suggestions() {
	return (
		<div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 "
		>
			<div className="flex items-center gap-2 mb-5 " >
				<Sparkles
					size={18}
				/>
				<h3 className="font-semibold">
					Suggestions
				</h3>
			</div>
			<div className="space-y-3">
				{
					suggestions.map(
						item => (
							<button
								key={item} className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-sm hover:border-[var(--accent)] transition"
							>
								{
									item
								}
							</button>
						)
					)
				}
			</div>
		</div>
	);
}