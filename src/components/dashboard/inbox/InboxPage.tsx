"use client";
import { useMemo, useState } from "react";
import EmailList from "./list/EmailList";
import EmailPreview from "./preview/EmailPreview";
interface InboxPageProps {
	emails: any[];
}
export default function InboxPage({
	emails,
}: InboxPageProps) {
	const [
		selectedEmail,
		setSelectedEmail,
	] = useState<any>(
		null
	);
	const gridTemplate = useMemo(() => {
		return selectedEmail
			? "minmax(0,1fr) minmax(0,1fr)"
			: "minmax(0,1fr)";
	},
		[
			selectedEmail,
		]);
	return (
		<div
			className="h-full grid overflow-hidden transition-all duration-300"
			style={{
				gridTemplateColumns:
					gridTemplate,
			}}
		>
			{/* Email List */}
			<EmailList
				emails={emails}
				onSelect={
					setSelectedEmail
				}
			/>
			{/* Preview */}
			{
				selectedEmail && (
					<EmailPreview
						email={
							selectedEmail
						}
					/>
				)
			}
		</div>
	);
}