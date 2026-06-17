const steps = [
  {
    number: "1",
    title: "Connect your accounts",
    description:
      "Authorize Gmail and Google Calendar via secure OAuth. ConvertIQ never stores credentials.",
  },
  {
    number: "2",
    title: "Ask in plain English",
    description:
      'Type naturally. "Summarize today\'s emails" or "Move my 3 PM to Thursday" — it just works.',
  },
  {
    number: "3",
    title: "AI handles the rest",
    description:
      "ConvertIQ reads, writes, schedules, and summarizes — then confirms every action before committing.",
  },
];
export default function HowItWorks() {
  return (
    <section
      id="how"
      className="
      py-28
      bg-card
      border-y
      border-border
    "
    >
      <div className="max-w-[1200px] mx-auto px-[5vw]">
        {/* Label */}
        <span className="inline-block text-xs uppercase tracking-[0.1em] font-semibold text-accent2 mb-4"
        >
          How it works
        </span>
        {/* Heading */}
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-text mb-12"
        >
          Up and running
          <br />
          in minutes
        </h2>
        {/* Timeline */}
        <div className="relative">
          {/* Horizontal Line */}
          <div className="hidden lg:block absolute top-7 left-[16.66%] right-[16.66%] h-px bg-border"
          />
          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            {steps.map((step) => (
              <div key={step.number} className="relative text-center px-4"
              >
                {/* Circle */}
                <div className="relative z-10 mx-auto mb-5 w-14 h-14 rounded-full border border-border bg-card flex items-center justify-center text-xl font-bold text-accent"
                >
                  {step.number}
                </div>
                {/* Title */}
                <h3 className="text-lg font-bold text-text mb-2"
                >
                  {step.title}
                </h3>
                {/* Description */}
                <p className="text-sm leading-7 text-text2"
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}