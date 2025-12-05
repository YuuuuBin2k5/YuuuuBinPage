import React from "react";
import HeroSection from "../components/home/HeroSection";
import FloatingStats from "../components/home/FloatingStats";
import SkillsShowcase from "../components/home/SkillsShowcase";

function Home() {
  return (
    <div className="bg-slate-900 -mt-24">
      {/* Hero Section - First Impression */}
      <HeroSection />

      {/* Stats Section */}
      <FloatingStats />

      {/* Skills Showcase */}
      <SkillsShowcase />
    </div>
  );
}

export default Home;
