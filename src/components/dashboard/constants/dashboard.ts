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

			{
				label: "AI Memory",

				icon: Brain,

				href: "/dashboard/memory",
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

			{
				label: "Sent",

				icon: Mail,

				href: "/dashboard/sent",
			},

			{
				label: "Drafts",

				icon: NotebookPen,

				href: "/dashboard/drafts",
			},

			{
				label: "Spam",

				icon: ShieldAlert,

				href: "/dashboard/spam",
			},

			{
				label: "Trash",

				icon: Trash2,

				href: "/dashboard/trash",
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
		title: "Productivity",

		items: [
			{
				label: "Tasks",

				icon: CheckSquare,

				href: "/dashboard/tasks",
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