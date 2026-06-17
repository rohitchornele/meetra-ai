"use client";
import { formatDate } from "../utils/formatDate";
import { getAvatarColor } from "../utils/getAvatarColor";
import { getInitials } from "../utils/getInitials";
import { getHeader } from "../utils/getHeader";
interface EmailItemProps {
	email: any;
	selected?: boolean;
	onClick?: () => void;
}
export default function EmailItem({
	email,
	selected = false,
	onClick,
}: EmailItemProps) {
	const headers = email.payload?.headers ?? [];
	const from = getHeader(headers, "From") ?? "Unknown";
	const subject = getHeader(headers, "Subject") ?? "(No Subject)";
	const date = getHeader(headers, "Date") ?? "";
	const snippet = email.snippet ?? "";
	const isUnread =
		email.labelIds?.includes("UNREAD")
		?? false;
	const initials =
		getInitials(from);
	const avatarColor =
		getAvatarColor(from);
	const formattedDate =
		formatDate(date);
	return (
		<button
			onClick={onClick}
			className={`w-full grid grid-cols-[12px_40px_1fr_auto] items-center gap-4 px-5 py-4 border-b border-[var(--border)] text-left transition ${
				selected
					? "bg-white/[0.04]"
					: "hover:bg-white/[0.02]"
			}`}
		>
			{/* Unread */}
			<div className="flex justify-center">
				{
					isUnread
						? (
							<div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
						)
						: (
							<div className="w-2 h-2" />
						)
				}
			</div>
			{/* Avatar */}
			<div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarColor.bg} ${avatarColor.text}`}>
				{initials}
			</div>
			{/* Content */}
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<span
						className={`truncate text-sm ${
							isUnread
								? "font-semibold text-[var(--text-primary)]"
								: "text-[var(--text-secondary)]"
						}`}
					>
						{from}
					</span>
				</div>
				<p
					className={`mt-1 truncate text-sm ${
						isUnread
							? "font-medium text-[var(--text-primary)]"
							: "text-[var(--text-secondary)]"
					}`}
				>
					{subject}
				</p>
				<p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
					{snippet}
				</p>
			</div>
			{/* Date */}
			<div>
				<span
					className={`text-xs ${
						isUnread
							? "text-[var(--accent)] font-medium"
							: "text-[var(--text-secondary)]"
					}`}
				>
					{formattedDate}
				</span>
			</div>
		</button>
	);
}