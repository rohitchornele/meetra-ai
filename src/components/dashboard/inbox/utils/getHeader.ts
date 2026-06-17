export function getHeader(
	headers: any[],
	name: string
) {
	return headers.find(
		header =>
			header.name ===
			name
	)?.value;
}