import BackgroundCanvas from "./BackgroundCanvas";
import Dashboard from "./Dashboard";
export default function Hero() {
	return (
		<section className="relative min-h-screen overflow-hidden px-[5vw] pt-16 flex items-center">
			<BackgroundCanvas />
			<div className="relative z-10 max-w-[1280px] mx-auto w-full">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left */}
					<div className="max-w-[560px]">
						{/* Eyebrow */}
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-xs uppercase tracking-[0.1em] font-semibold text-accent2 mb-7"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-accent2" />
							AI-Powered Productivity
						</div>
						{/* Heading */}
						<h1 className="text-text font-serif text-[clamp(2.6rem,5vw,4rem)] leading-[1.08] tracking-[-0.02em] mb-5"
						>
							Talk to your Email & Calendar{" "}
							<em className="italic text-accent">naturally</em>
						</h1>
						{/* Subtitle */}
						<p className="text-text2 text-[1.05rem] leading-8 max-w-[440px] mb-9"
						>
							Read emails, summarize conversations, schedule meetings, reply
							instantly, and manage your day — all from a single AI chat.
						</p>
						{/* Buttons */}
						<div className="flex flex-wrap gap-4 mb-8">
							{/* Primary */}
							<button className=" px-7 py-3 rounded-xl bg-accent text-white font-bold hover:opacity-90 hover:-translate-y-[2px] transition-all"
							>
								Get Started
							</button>
							{/* Secondary */}
							<button className="flex items-center gap-3 px-7 py-3 rounded-xl border border-border text-text font-bold hover:border-text2 hover:-translate-y-[1px] transition-all"
							>
								{/* Play Circle */}
								<div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
								>
									<svg viewBox="0 0 10 10" className="w-2 fill-white"
									>
										<polygon points="2,1 9,5 2,9" />
									</svg>
								</div>
								Watch Demo
							</button>
						</div>
						{/* Labels */}
						<div className="flex flex-wrap gap-5">
							{["Gmail", "Google Calendar", "Secure OAuth", "AI Powered"].map(
								(item) => (
									<div key={item} className="flex items-center gap-2 text-sm font-medium text-text2"
									>
										<span className="text-accent2 font-bold">✓</span>
										{item}
									</div>
								),
							)}
						</div>
					</div>
					{/* Right */}
					<Dashboard />
				</div>
			</div>
		</section>
	);
}
