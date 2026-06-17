"use client";
import { useEffect, useState } from "react";
import {
	Search,
	Bell,
	Moon,
	Plus,
	Menu,
} from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import SearchModal from "../search/SearchModal";
import {
	SearchResult,
} from "../search/types";
import {
	useDashboard,
} from "../context/DashboardProvider";
const mockResults: SearchResult[] = [
	{
		id: "1",
		category: "email",
		title: "Proposal Approved",
		description: "Rahul • 2h ago",
		url: "/dashboard/inbox",
	},
	{
		id: "2",
		category: "meeting",
		title: "Product Review",
		description: "Tomorrow • 11 AM",
		url: "/dashboard/calendar",
	},
	{
		id: "3",
		category: "contact",
		title: "Rahul Sharma",
		description: "OpenAI",
		url: "/dashboard/contacts",
	},
	{
		id: "4",
		category: "chat",
		title: "Summarize Inbox",
		description: "AI Conversation",
		url: "/dashboard/chat",
	},
];
export default function DashboardNavbar({
	user,
}: {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}) {
	const {
		mobileDrawerOpen,
		openMobileDrawer,
		closeMobileDrawer,
	} = useDashboard();
	const [
		searchOpen,
		setSearchOpen,
	] = useState(false);
	useEffect(() => {
		const handleKeyDown = (
			e: KeyboardEvent
		) => {
			if (
				(e.ctrlKey ||
					e.metaKey)
				&&
				e.key.toLowerCase() ===
				"k"
			) {
				e.preventDefault();
				setSearchOpen(
					true
				);
			}
		};
		window.addEventListener(
			"keydown",
			handleKeyDown
		);
		return () => {
			window.removeEventListener(
				"keydown",
				handleKeyDown
			);
		};
	}, []);
	return (
		<>
			<header className="h-[var(--navbar-height)] sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)] backdrop-blur-xl px-4 md:px-6 flex items-center justify-between">
				{/* Left */}
				<div className="flex items-center gap-4">
					<button
						onClick={openMobileDrawer}
						className="md:hidden w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition"
					>
						<Menu size={20} />
					</button>
					<div className="text-xl font-bold tracking-tight cursor-pointer select-none">
						Convert
						<span className="text-[var(--accent)]">
							IQ
						</span>
					</div>
				</div>
				{/* Center Search */}
				<div className="hidden md:flex flex-1 justify-center px-10">
					<button
						onClick={() =>
							setSearchOpen(
								true
							)
						}
						className="w-full max-w-[620px] h-11 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 flex items-center justify-between text-[var(--text-secondary)] hover:border-white/15 hover:bg-white/[0.02] transition-all"
					>
						<div className="flex items-center gap-3">
							<Search size={18} />
							<span>
								Search emails, meetings...
							</span>
						</div>
						<div className="text-xs px-2 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-md">
							Ctrl K
						</div>
					</button>
				</div>
				{/* Right */}
				<div className="flex items-center gap-3">
					{/* Mobile Search */}
					<button
						onClick={() =>
							setSearchOpen(
								true
							)
						}
						className="md:hidden w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition"
					>
						<Search size={18} />
					</button>
					{/* New Chat */}
					<button className="hidden md:flex items-center gap-2 h-11 px-4 rounded-xl bg-[var(--accent)] text-white font-medium text-sm hover:opacity-90 transition">
						<Plus size={16} />
						New Chat
					</button>
					{/* Notifications */}
					<button className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition">
						<Bell size={18} />
					</button>
					{/* Theme */}
					<button className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition">
						<Moon size={18} />
					</button>
					{/* Avatar */}
					<button className="w-10 h-10 rounded-full bg-[var(--accent)] text-white font-semibold text-sm flex items-center justify-center hover:opacity-90 transition">
						{user?.name?.[0] ?? "R"}
					</button>
				</div>
			</header>
			<MobileDrawer
				open={mobileDrawerOpen}
				onClose={closeMobileDrawer}
				user={user}
			/>
			<SearchModal
				open={searchOpen}
				onClose={() =>
					setSearchOpen(
						false
					)
				}
				results={mockResults}
			/>
		</>
	);
}