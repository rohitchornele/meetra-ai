import { auth } from '@/server/auth';

import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';

import { DashboardProvider } from '@/components/dashboard/context/DashboardProvider';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <DashboardProvider>
      <DashboardLayout user={session?.user}>{children}</DashboardLayout>
    </DashboardProvider>
  );
}
