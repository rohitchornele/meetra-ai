const AVATAR_COLORS = [
	{
		bg: "bg-indigo-100",
		text: "text-indigo-700",
	},
	{
		bg: "bg-teal-100",
		text: "text-teal-700",
	},
	{
		bg: "bg-orange-100",
		text: "text-orange-700",
	},
	{
		bg: "bg-amber-100",
		text: "text-amber-700",
	},
	{
		bg: "bg-pink-100",
		text: "text-pink-700",
	},
];
export function getAvatarColor(
	from: string
) {
	let hash = 0;
	for (
		let i = 0;
		i < from.length;
		i++
	) {
		hash =
			from.charCodeAt(i)
			+
			(
				(hash << 5)
				-
				hash
			);
	}
	return AVATAR_COLORS[
		Math.abs(hash)
		%
		AVATAR_COLORS.length
	];
}