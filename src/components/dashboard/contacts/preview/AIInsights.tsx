"use client";
import { Sparkles } from "lucide-react";
interface AIInsightsProps {
	insights?: string[];
}
export default function AIInsights({
	insights = [],
}: AIInsightsProps) {
	if (insights.length === 0) {
		return (
			<div className="mt-8">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-9 h-9 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center">
						<Sparkles size={16} className="text-[var(--accent)]" />
					</div>
					<div>
						<h2 className="text-lg font-semibold text-[var(--text-primary)]">
							AI Insights
						</h2>
						<p className="text-sm text-[var(--text-secondary)]">
							No insights available yet
						</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="mt-8">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-9 h-9 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center">
					<Sparkles size={16} className="text-[var(--accent)]" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-[var(--text-primary)]">
						AI Insights
					</h2>
					<p className="text-sm text-[var(--text-secondary)]">
						What ConvertIQ remembers
					</p>
				</div>
			</div>
			<div className="space-y-3">
				{
					insights.map(
						(
							insight,
							index
						) => (
							<div
								key={index}
								className="flex items-start gap-3"
							>
								<div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
								<p className="text-[15px] leading-7 text-[var(--text-primary)]">
									{insight}
								</p>
							</div>
						)
					)
				}
			</div>
		</div>
	);
}