import SignIn from "@/components/sign-in";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-bg)] px-6 text-[var(--color-text)]">
      {/* Glow Background */}

      <div className="absolute left-1/2 top-1/2 h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-glow1)] opacity-70 blur-[100px]" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-md rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center shadow-[var(--shadow-float)]">
        {/* Logo */}

        <h1 className="mb-3 text-4xl font-extrabold tracking-[-0.03em]">
          Convert
          <span className="text-[var(--color-accent)]">
            IQ
          </span>
        </h1>

        {/* Subtitle */}

        <p className="mb-2 text-lg font-medium text-[var(--color-text)]">
          AI Email & Calendar Assistant
        </p>

        <p className="mb-10 text-sm leading-7 text-[var(--color-text2)]">
          Talk to your Email & Calendar naturally. Read emails, schedule
          meetings, and manage your day — all from a single AI chat.
        </p>

        {/* Google Sign In */}

        <SignIn />

        {/* Footer */}

        <p className="mt-8 text-xs text-[var(--color-text2)]">
          Secure OAuth • Gmail • Google Calendar
        </p>
      </div>
    </div>
  );
}