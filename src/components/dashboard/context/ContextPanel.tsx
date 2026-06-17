"use client";
import { usePathname } from "next/navigation";
import ImportantEmails from "./ImportantEmails";
import TodayAgenda from "./TodayAgenda";
import Suggestions from "./Suggestions";
export default function ContextPanel() {
	const pathname = usePathname();
	return (
		<aside className="hidden xl:flex flex-col gap-6 p-6 bg-[var(--bg)] border-l border-[var(--border)] overflow-y-auto"
		>
			{pathname.startsWith("/dashboard") && (
				<>
					<ImportantEmails />
					<TodayAgenda />
					<Suggestions />
				</>
			)}
		</aside>
	);
}
