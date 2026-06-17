import { Mail } from "lucide-react";
const emails = [
	{
		name: "Arjun",
		subject: "Proposal approved ✓",
	},
	{
		name: "Rahul",
		subject: "Tomorrow's sync",
	},
	{
		name: "Finance",
		subject: "Invoice received",
	},
];
export default function ImportantEmails() {
	return (
		<div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
		>
			<div className="flex items-center gap-2 mb-5"
			>
				<Mail size={18} />
				<h3 className="font-semibold">Important Emails</h3>
			</div>
			<div className="space-y-4">
				{emails.map((email) => (
					<div key={email.subject} className="space-y-1"
					>
						<p className="text-sm font-medium"
						>
							{email.name}
						</p>
						<p className="text-sm text-[var(--text-secondary)]"
						>
							{email.subject}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
