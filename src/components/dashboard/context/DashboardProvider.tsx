"use client";
import {
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
type DashboardContextType = {
	/* Sidebar */
	sidebarCollapsed: boolean;
	toggleSidebar: () => void;
	setSidebarCollapsed:
	React.Dispatch<
		React.SetStateAction<boolean>
	>;
	/* Mobile Drawer */
	mobileDrawerOpen: boolean;
	openMobileDrawer: () => void;
	closeMobileDrawer: () => void;
	/* Command Palette */
	commandPaletteOpen: boolean;
	openCommandPalette: () => void;
	closeCommandPalette: () => void;
};
const DashboardContext =
	createContext<DashboardContextType | null>(
		null
	);
export function DashboardProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	/* Sidebar */
	const [
		sidebarCollapsed,
		setSidebarCollapsed,
	] = useState(false);
	const toggleSidebar = () => {
		setSidebarCollapsed(prev => !prev);
	};
	/* Mobile Drawer */
	const [
		mobileDrawerOpen,
		setMobileDrawerOpen,
	] = useState(false);
	const openMobileDrawer = () => {
		setMobileDrawerOpen(true);
	};
	const closeMobileDrawer = () => {
		setMobileDrawerOpen(false);
	};
	/* Command Palette */
	const [
		commandPaletteOpen,
		setCommandPaletteOpen,
	] = useState(false);
	const openCommandPalette = () => {
		setCommandPaletteOpen(true);
	};
	const closeCommandPalette = () => {
		setCommandPaletteOpen(false);
	};
	const value = useMemo(() => ({
		sidebarCollapsed,
		toggleSidebar,
		setSidebarCollapsed,
		mobileDrawerOpen,
		openMobileDrawer,
		closeMobileDrawer,
		commandPaletteOpen,
		openCommandPalette,
		closeCommandPalette,
	}), [
		sidebarCollapsed,
		mobileDrawerOpen,
		commandPaletteOpen,
	]);
	return (
		<DashboardContext.Provider
			value={value}
		>
			{children}
		</DashboardContext.Provider>
	);
}
export function useDashboard() {
	const context =
		useContext(DashboardContext);
	if (!context) {
		throw new Error(
			"useDashboard must be used inside DashboardProvider"
		);
	}
	return context;
}