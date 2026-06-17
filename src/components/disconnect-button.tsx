"use client";
import { useRouter } from "next/navigation";
export default function DisconnectButton({
	plugin,
}: {
	plugin: string;
}) {
	const router = useRouter();
	async function handleDisconnect() {
		const res = await fetch(
			`/api/disconnect?plugin=${plugin}`
		);
		if (!res.ok) {
			alert("Failed to disconnect");
			return;
		}
		router.refresh();
	}
	return (
		<button onClick={handleDisconnect} className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
		>
			Disconnect
		</button>
	);
}