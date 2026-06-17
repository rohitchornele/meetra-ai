"use client";
import { useState } from "react";
import ContactList from "./list/ContactList";
import ContactPreview from "./preview/ContactPreview";
import { Contact } from "./types";
interface ContactsPageProps {
	contacts: Contact[];
}
export default function ContactsPage({
	contacts,
}: ContactsPageProps) {
	const [
		selectedContact,
		setSelectedContact,
	] = useState<Contact | null>(
		contacts[0] ?? null
	);
	return (
		<div className="h-full grid grid-cols-2 overflow-hidden">
			{/* Left */}
			<ContactList
				contacts={contacts}
				onSelect={setSelectedContact}
			/>
			{/* Right */}
			<ContactPreview
				contact={selectedContact}
			/>
		</div>
	);
}