const features = [
	{
		icon: "✉️",
		number: "01",
		title: "AI Email Assistant",
		items: [
			"Summarize emails instantly",
			"Natural language search",
			"Smart replies",
		],
	},
	{
		icon: "📅",
		number: "02",
		title: "Smart Calendar",
		items: [
			"Create events from chat",
			"Reschedule meetings",
			"Find free time automatically",
		],
	},
	{
		icon: "⚡",
		number: "04",
		title: "Real-time Sync",
		items: ["Gmail sync", "Calendar sync", "Background updates"],
	},
];
export default function Features() {
	return (
		<section id="features" className="py-28"
		>
			<div className="max-w-[1200px] mx-auto px-[5vw]">
				{/* Heading */}
				<span className="
          inline-block
          text-xs
          uppercase
          tracking-[0.1em]
          font-semibold
          text-accent2
          mb-4
        "
				>
					What it does
				</span>
				<h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-text mb-4"
				>
					Everything your inbox
					<br />
					needs to work for you
				</h2>
				<p className="text-text2 max-w-[480px] leading-7"
				>
					Six focused capabilities. One interface. Zero context switching.
				</p>
				{/* Grid */}
				<div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
        "
				>
					{features.map((feature) => (
						<div key={feature.number} className="group relative overflow-hidden bg-card border border-border rounded-[16px] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-float)]"
						>
							{/* Top Gradient Line */}
							<div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-accent to-transparent"
							/>
							{/* Icon */}
							<div className="w-10 h-10 rounded-xl border border-border bg-glow1 flex items-center justify-center text-lg mb-5"
							>
								{feature.icon}
							</div>
							{/* Number */}
							<div className="text-[0.7rem] tracking-[0.08em] font-bold text-text2 mb-3"
							>
								{feature.number}
							</div>
							{/* Title */}
							<h3 className="font-bold text-lg tracking-[-0.01em] text-text mb-4"
							>
								{feature.title}
							</h3>
							{/* Items */}
							<ul>
								{feature.items.map((item) => (
									<li key={item} className="py-3 flex gap-2 items-start text-sm text-text2 border-b border-border last:border-none"
									>
										<span className="text-accent2 mt-[1px] text-xs"
										>
											→
										</span>
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
