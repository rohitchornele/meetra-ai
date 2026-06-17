"use client";
import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import { Contact } from "../types";
interface ContactListProps {
	contacts: Contact[];
	onSelect?: (
		contact: Contact
	) => void;
}
export default function ContactList({
	contacts,
	onSelect,
}: ContactListProps) {
	const [
		selectedId,
		setSelectedId,
	] = useState<string | null>(
		contacts[0]?.id ?? null
	);
	useEffect(() => {
		if (
			contacts.length > 0 &&
			!selectedId
		) {
			setSelectedId(
				contacts[0].id
			);
		}
	}, [
		contacts,
		selectedId,
	]);
	if (
		contacts.length === 0
	) {
		return (
			<div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
				No contacts found
			</div>
		);
	}
	return (
		<div className="h-full overflow-y-auto border-r border-[var(--border)]">
			{/* Header */}
			<div className="sticky top-0 z-10 bg-[var(--bg)] px-6 py-5 border-b border-[var(--border)]">
				<h1 className="text-xl font-semibold text-[var(--text-primary)]">
					Contacts
				</h1>
				<p className="mt-1 text-sm text-[var(--text-secondary)]">
					{contacts.length} contacts
				</p>
			</div>
			{/* List */}
			<div className="p-3 space-y-1">
				{
					contacts.map(
						contact => (
							<ContactCard
								key={contact.id}
								contact={contact}
								selected={
									selectedId ===
									contact.id
								}
								onClick={() => {
									setSelectedId(
										contact.id
									);
									onSelect?.(
										contact
									);
								}}
							/>
						)
					)
				}
			</div>
		</div>
	);
}