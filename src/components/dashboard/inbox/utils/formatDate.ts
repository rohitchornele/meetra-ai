export function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	if (isNaN(date.getTime())) {
		return dateStr;
	}
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	if (diffDays === 0) {
		return new Intl.DateTimeFormat(
	"en-US",
	{
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}
).format(date)
	}
	if (diffDays === 1) {
		return "Yesterday";
	}
	if (diffDays < 7) {
		return date.toLocaleDateString([], {
			weekday: "short"
		});
	}
	return date.toLocaleDateString([], {
		month: "short",
		day: "numeric"
	});
}
