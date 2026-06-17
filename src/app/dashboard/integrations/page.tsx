import IntegrationCard from "@/components/dashboard/integrations/IntegrationCard";
import { getTenantId } from "@/server/utils/tenant";
import { isConnected } from "@/server/utils/integration";
const integrations = [
	{
		id: "gmail",
		name: "Gmail",
		description: "Read and send emails.",
	},
	{
		id: "googlecalendar",
		name: "Google Calendar",
		description: "Manage meetings and events.",
	},
];
export default async function IntegrationsPage() {
	const tenantId = await getTenantId();
	if (!tenantId) {
		return (
			<div className="p-8">
				<h1 className="text-2xl font-bold">
					Unauthorized
				</h1>
			</div>
		);
	}
	const connectionStatus =
		await Promise.all(
			integrations.map(
				async integration => ({
					...integration,
					connected:
						await isConnected(
							tenantId,
							integration.id
						),
				})
			)
		);
	return (
		<div className="max-w-5xl mx-auto px-8 py-10">
			{/* Header */}
			<div className="mb-10">
				<h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
					Integrations
				</h1>
				<p className="mt-3 text-[var(--text-secondary)]">
					Connect Gmail and Google Calendar to let ConvertIQ manage your emails and meetings.
				</p>
			</div>
			{/* Cards */}
			<div className="space-y-6">
				{
					connectionStatus.map(
						integration => (
							<IntegrationCard
								key={
									integration.id
								}
								id={
									integration.id
								}
								name={
									integration.name
								}
								description={
									integration.description
								}
								connected={
									integration.connected
								}
								connectUrl={`/api/connect?plugin=${integration.id}`}
								disconnectUrl={`/api/disconnect?plugin=${integration.id}`}
							/>
						)
					)
				}
			</div>
		</div>
	);
}
