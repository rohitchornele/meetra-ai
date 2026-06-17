"use client";

import {
	CheckCircle2,
	Loader2,
	XCircle,
} from "lucide-react";

interface ToolExecutionProps {
	title: string;

	status:
		| "running"
		| "completed"
		| "failed";

	description?: string;
}

export default function ToolExecution({
	title,
	status,
	description,
}: ToolExecutionProps) {
	return (
		<div className="
				bg-[var(--card)]
				border
				border-[var(--border)]
				rounded-2xl
				p-4
				flex
				items-start
				gap-4
				animate-in
				fade-in
				duration-300
			"
		>
			{/* Icon */}

			<div className="mt-0.5 shrink-0">
				{status === "running" && (
					<Loader2
						size={20}
						className="
							text-[var(--accent)]
							animate-spin
						"
					/>
				)}

				{status === "completed" && (
					<CheckCircle2
						size={20}
						className="
							text-green-400
						"
					/>
				)}

				{status === "failed" && (
					<XCircle
						size={20}
						className="
							text-red-400
						"
					/>
				)}
			</div>

			{/* Content */}

			<div className="flex-1">
				<h4 className="
						text-sm
						font-semibold
						text-[var(--text-primary)]
					"
				>
					{title}
				</h4>

				{description && (
					<p
						className="
							mt-1
							text-sm
							text-[var(--text-secondary)]
							leading-6
						"
					>
						{description}
					</p>
				)}
			</div>
		</div>
	);
}