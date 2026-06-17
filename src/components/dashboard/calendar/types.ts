export interface Meeting {

	id: number;

	title: string;

	time: string;

	date: string;

	attendees?: string[];

	location?: string;

	hasAINotes?: boolean;

}