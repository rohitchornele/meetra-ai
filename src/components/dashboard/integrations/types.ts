export interface Integration {

	id: string;

	name: string;

	description: string;

	connected: boolean;

	email?: string;

	lastSynced?: string;

	connectUrl: string;

	disconnectUrl: string;

}