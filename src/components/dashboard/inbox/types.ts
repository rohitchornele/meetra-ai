export interface InboxEmail {

	id: string;

	threadId?: string;

	snippet?: string;

	labelIds?: string[];

	payload?: {

		headers?: {

			name: string;

			value: string;

		}[];

	};

}