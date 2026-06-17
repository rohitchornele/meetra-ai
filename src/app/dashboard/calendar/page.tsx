import CalendarPage from '@/components/dashboard/calendar/CalendarPage';

import ConnectIntegration from '@/components/dashboard/integrations/ConnectIntegration';

import { getTenantId } from '@/server/utils/tenant';

import { isConnected } from '@/server/utils/integration';
import { getEvents } from '@/server/integrations/googleCalendar';

export default async function Page() {
  const tenantId = await getTenantId();

  if (!tenantId) {
    return <div className="p-8">Unauthorized</div>;
  }

  /* CHECK CONNECTION FIRST */

  const connected = await isConnected(tenantId, 'googlecalendar');

  if (!connected) {
    return (
      <ConnectIntegration
        title="Google Calendar is not connected"
        description="Connect Google Calendar to schedule meetings and manage your events."
        plugin="googlecalendar"
      />
    );
  }

  /* ONLY HERE CALENDAR API IS CALLED */

  const events = await getEvents(tenantId);

  return <CalendarPage events={events} />;
}
