import { Brain, Calendar, CheckSquare, CreditCard, HelpCircle, Inbox, Mail, MessageSquare, NotebookPen, Settings, ShieldAlert, Trash2, Users, } from "lucide-react";

export const SIDEBAR_SECTIONS = [
	{
		title: "AI",

		items: [
			{
				label: "Chat",

				icon: MessageSquare,

				href: "/dashboard/chat",
			},

			
		],
	},

	{
		title: "Communication",

		items: [
			{
				label: "Inbox",

				icon: Inbox,

				href: "/dashboard/inbox",
			},
		],
	},

	{
		title: "Calendar",

		items: [
			{
				label: "Calendar",

				icon: Calendar,

				href: "/dashboard/calendar",
			},
		],
	},

	{
		title: "People",

		items: [
			{
				label: "Contacts",

				icon: Users,

				href: "/dashboard/contacts",
			},
		],
	},
	{
		title: "System",

		items: [
			{
				label: "Settings",

				icon: Settings,

				href: "/dashboard/settings",
			},

			{
				label: "Billing",

				icon: CreditCard,

				href: "/dashboard/billing",
			},

			{
				label: "Help",

				icon: HelpCircle,

				href: "/dashboard/help",
			},
		],
	},
];