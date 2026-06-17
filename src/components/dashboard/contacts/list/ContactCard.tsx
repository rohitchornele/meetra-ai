"use client";
import { Mail, Building2 } from "lucide-react";
import { Contact } from "../types";
interface ContactCardProps {
	contact: Contact;
	selected?: boolean;
	onClick?: () => void;
}
function getInitials(
	name: string
) {
	const parts =
		name
			.split(" ")
			.filter(Boolean);
	if (
		parts.length === 0
	) {
		return "?";
	}
	if (
		parts.length === 1
	) {
		return parts[0][0]
			.toUpperCase();
	}
	return (
		parts[0][0] +
		parts[
			parts.length - 1
		][0]
	).toUpperCase();
}
export default function ContactCard({
	contact,
	selected = false,
	onClick,
}: ContactCardProps) {
	return (
		<button
			onClick={onClick}
			className={`w-full flex items-start gap-4 px-5 py-4 rounded-2xl text-left transition ${
				selected
					? "bg-white/[0.05]"
					: "hover:bg-white/[0.03]"
			}`}
		>
			{/* Avatar */}
			<div className="w-11 h-11 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-semibold shrink-0">
				{
					contact.avatar
						? (
							<img
								src={contact.avatar}
								alt={contact.name}
								className="w-full h-full rounded-full object-cover"
							/>
						)
						: (
							getInitials(
								contact.name
							)
						)
				}
			</div>
			{/* Content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between gap-3">
					<h3 className="truncate text-[15px] font-semibold text-[var(--text-primary)]">
						{contact.name}
					</h3>
					{
						contact.lastInteraction && (
							<span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
								{
									contact.lastInteraction
								}
							</span>
						)
					}
				</div>
				<div className="mt-2 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
					<Mail size={14} />
					<span className="truncate">
						{contact.email}
					</span>
				</div>
				{
					contact.organization && (
						<div className="mt-2 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
							<Building2 size={14} />
							<span className="truncate">
								{
									contact.organization
								}
							</span>
						</div>
					)
				}
			</div>
		</button>
	);
}