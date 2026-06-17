"use client";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar() {
	const router = useRouter();
	const [theme, setTheme] = useState<"dark" | "light">("dark");
	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);
	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 h-16 px-[5vw] flex items-center justify-between backdrop-blur-xl border-b border-border bg-[var(--nav-blur)] transition-all duration-300"
		>
			{/* Logo */}
			<div className="font-extrabold text-[1.15rem] tracking-[-0.02em]">
				Convert
				<span className="text-[var(--accent)]">IQ</span>
			</div>
			{/* Nav Links */}
			<div className="hidden md:flex items-center gap-8">
				<a href="#features" className="text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] transition">
					Features
				</a>
				<a href="#how" className="text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] transition"
				>
					How it works
				</a>
				<a href="#pricing" className="text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] transition">
					Pricing
				</a>
				<a href="#" className="text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] transition"
				>
					Docs
				</a>
			</div>
			{/* Actions */}
			<div className="flex items-center gap-3">
				{/* Theme Toggle */}
				<button onClick={toggleTheme} className="border border-border rounded-lg p-2 text-[var(--text2)] hover:text-[var(--text)] transition"
				>
					{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
				</button>
				{/* Sign In */}
				<button onClick={() => router.push("/login")} className="hidden sm:block not-last:px-4 py-2 rounded-lg border border-border text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] hover:border-[var(--text2)] transition"
				>
					Sign In
				</button>
				{/* Get Started */}
				<button className="px-5 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-[1px] transition-all"
				>
					Get Started
				</button>
			</div>
		</nav>
	);
}
