"use client";
import { useState } from "react";
import EmailItem from "./EmailItem";
interface EmailListProps {
	emails: any[];
	onSelect?: (email: any) => void;
}
export default function EmailList({
	emails,
	onSelect,
}: EmailListProps) {
	const [
		selectedId,
		setSelectedId,
	] = useState<string | null>(
		emails[0]?.id ?? null
	);
	if (emails.length === 0) {
		return (
			<div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
				No emails found
			</div>
		);
	}
	return (
		<div className="h-full overflow-y-auto border-r border-[var(--border)] bg-[var(--bg)]">
			{
				emails.map(email => (
					<EmailItem
						key={email.id}
						email={email}
						selected={
							selectedId ===
							email.id
						}
						onClick={() => {
							setSelectedId(
								email.id
							);
							onSelect?.(
								email
							);
						}}
					/>
				))
			}
		</div>
	);
}