"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import ContextPanel from "./ContextPanel";
import { useDashboard } from "../context/DashboardProvider";
export default function DashboardLayout({
	children,
	user,
}: {
	children: React.ReactNode;
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}) {
	const {
		sidebarCollapsed,
		toggleSidebar,
	} = useDashboard();
	const pathname = usePathname();
	const showContextPanel =
		pathname === "/dashboard"
		||
		pathname.startsWith(
			"/dashboard/chat"
		);
	const gridTemplate = useMemo(() => {
		if (showContextPanel) {
			return sidebarCollapsed
				? "72px minmax(0,1fr) 340px"
				: "260px minmax(0,1fr) 340px";
		}
		return sidebarCollapsed
			? "72px minmax(0,1fr)"
			: "260px minmax(0,1fr)";
	},
		[
			sidebarCollapsed,
			showContextPanel,
		]);
	return (
		<div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] overflow-hidden">
			{/* Navbar */}
			<DashboardNavbar
				user={user}
			/>
			{/* Content */}
			<div
				className="h-[calc(100vh-var(--navbar-height))] grid transition-all duration-300 ease-in-out"
				style={{
					gridTemplateColumns:
						gridTemplate,
				}}
			>
				{/* Sidebar */}
				<Sidebar collapsed={ sidebarCollapsed } onToggle={ toggleSidebar }
				/>
				{/* Main */}
				<main className="h-full overflow-y-auto border-l border-[var(--border)]">
					{children}
				</main>
				{/* Context Panel */}
				{
					showContextPanel && (
						<ContextPanel />
					)
				}
			</div>
		</div>
	);
}