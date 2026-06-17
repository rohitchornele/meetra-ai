import InboxPage from '@/components/dashboard/inbox/InboxPage';

import ConnectIntegration from '@/components/dashboard/integrations/ConnectIntegration';

import { getMessages, getMessage } from '@/server/integrations/gmail';

import { getTenantId } from '@/server/utils/tenant';

import { isConnected } from '@/server/utils/integration';

export default async function Page() {
  const tenantId = await getTenantId();

  if (!tenantId) {
    return <div className="p-8">Unauthorized</div>;
  }

  /* CHECK FIRST */

  const connected = await isConnected(
    tenantId,

    'gmail'
  );

  if (!connected) {
    return (
      <ConnectIntegration
        title="Gmail is not connected"
        description="Connect Gmail to view and manage your inbox with AI."
        plugin="gmail"
      />
    );
  }

  /* ONLY HERE GMAIL API IS CALLED */

  const result = await getMessages(tenantId);

  if (!result?.messages) {
    return <InboxPage emails={[]} />;
  }

  const emails = await Promise.all(
    result.messages.map((message) =>
      getMessage(
        tenantId,
        message.id!
      )
    )
  );

  return <InboxPage emails={emails} />;
}
