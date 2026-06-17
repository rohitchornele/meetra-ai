export default function CTA() {
  return (
    <section
      className="
      relative
      overflow-hidden
      py-32
      text-center
    "
    >
      {/* Glow Background */}
      <div
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[700px]
        h-[400px]
        pointer-events-none
        rounded-full
        blur-[80px]
        opacity-60
        bg-glow1
      "
      />
      {/* Content */}
      <div className="relative z-10 px-6">
        {/* Heading */}
        <h2
          className="
          font-serif
          text-[clamp(2.4rem,5vw,4.5rem)]
          leading-[1.05]
          tracking-[-0.03em]
          text-text
          max-w-[700px]
          mx-auto
          mb-5
        "
        >
          Your inbox shouldn't feel like{" "}
          <em className="italic text-accent">
            work
          </em>
        </h2>
        {/* Subtitle */}
        <p
          className="
          max-w-[420px]
          mx-auto
          text-[1.05rem]
          leading-8
          text-text2
          mb-10
        "
        >
          Let AI organize emails and calendars
          while you focus on what matters.
        </p>
        {/* CTA Button */}
        <button
          className="
          px-10
          py-4
          rounded-xl
          bg-accent
          text-white
          font-bold
          text-base
          shadow-[var(--shadow-float)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:opacity-90
        "
        >
          Start for Free
        </button>
        {/* Note */}
        <p
          className="
          mt-4
          text-sm
          text-text2
        "
        >
          No credit card required · Gmail & Calendar in 60 seconds
        </p>
      </div>
    </section>
  );
}