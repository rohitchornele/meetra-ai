"use client";
import { useMemo } from "react";
interface GreetingProps {
	user?: {
		name?: string | null;
	};
}
export default function Greeting({ user }: GreetingProps) {
	const greeting = useMemo(() => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good Morning";
		if (hour < 18) return "Good Afternoon";
		return "Good Evening";
	}, []);
	return (
		<div className="space-y-3">
			<h1 className="text-3xl md:text-4xl font-bold tracking-tight "
			>
				{greeting} {user?.name?.split(" ")[0] ?? "there"} 👋
			</h1>
			<p className="text-[var(--text-secondary)] text-lg "
			>
				You have{" "}
				<span className="text-[var(--text-primary)]">23 unread emails</span>,{" "}
				<span className="text-[var(--text-primary)]">4 meetings</span> today and{" "}
				<span className="text-[var(--text-primary)]">3 pending tasks</span>.
			</p>
		</div>
	);
}
