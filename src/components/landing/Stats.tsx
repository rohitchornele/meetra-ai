const stats = [
	{
		value: "2",
		suffix: "hrs",
		label: "saved per user, per day",
	},
	{
		value: "98",
		suffix: "%",
		label: "email accuracy rate",
	},
	{
		value: "0",
		suffix: "s",
		label: "context-switch time",
	},
	{
		value: "1",
		suffix: "chat",
		label: "for everything",
	},
];
export default function Stats() {
	return (
		<section className
	="
      py-12
      border-y
      border-border
      bg-card
    "
		>
			<div className="
        max-w-[1200px]
        mx-auto
        px-[5vw]
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-8
        text-center
      "
			>
				{stats.map((stat) => (
					<div key={stat.label}>
						{/* Value */}
						<div className=" text-[2.5rem] md:text-[3rem] font-serif leading-none tracking-[-0.03em] text-text"
						>
							{stat.value}
							<span className="text-accent">{stat.suffix}</span>
						</div>
						{/* Label */}
						<p className=" mt-2 text-sm text-text2"
						>
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
