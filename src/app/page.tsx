import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import Stats from "@/components/landing/Stats";
import React from "react";

const Homepage = () => {
	return (
		<main className="bg-bg text-text overflow-x-hidden min-h-screen">
			{/* Navigation */}
			<Navbar />

			{/* Hero Section */}
			<Hero />

			{/* Stats */}
			<Stats />

			{/* Features */}
			<Features />

			{/* How It Works */}
			<HowItWorks />

			{/* Call To Action */}
			<CTA />

			{/* Footer */}
			<Footer />
		</main>
	);
};

export default Homepage;
