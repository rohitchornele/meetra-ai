import { auth } from "@/server/auth";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

import { DashboardProvider } from "@/components/dashboard/context/DashboardProvider";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	return (
		<DashboardProvider>
			<DashboardLayout user={session?.user}>{children}</DashboardLayout>
		</DashboardProvider>
	);
}
