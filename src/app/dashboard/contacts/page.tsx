import ContactsPage from "@/components/dashboard/contacts/ContactsPage";
import { Contact } from "@/components/dashboard/contacts/types";
const contacts: Contact[] = [
	{
		id: "1",
		name: "Rahul Sharma",
		email: "rahul@gmail.com",
		organization: "OpenAI",
		lastInteraction: "2 days ago",
		insights: [
			"Prefers evening meetings",
			"Interested in AI startups",
			"Last discussed hiring",
		],
	},
	{
		id: "2",
		name: "Arjun Patel",
		email: "arjun@gmail.com",
		organization: "Microsoft",
		lastInteraction: "1 week ago",
		insights: [
			"Product review pending",
			"Likes concise emails",
		],
	},
];
export default function Page() {
	return (
		<ContactsPage
			contacts={contacts}
		/>
	);
}