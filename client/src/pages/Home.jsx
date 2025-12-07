import React, { useState, useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import FloatingStats from "../components/home/FloatingStats";
import FeaturedExercises from "../components/home/FeaturedExercises";
import SkillsShowcase from "../components/home/SkillsShowcase";
import IntroLoader from "../components/common/IntroLoader";
import { useData } from "../contexts/DataContext";

function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const { loading } = useData();

  useEffect(() => {
    // Wait for data to be ready (either from cache or API)
    const checkDataReady = async () => {
      // Minimum loading time for smooth experience (1s if data is cached)
      const minLoadTime = loading ? 1500 : 500;
      await new Promise((resolve) => setTimeout(resolve, minLoadTime));
    };

    checkDataReady();
  }, [loading]);

  const handleIntroComplete = () => {
    // Ensure page stays at top
    window.scrollTo(0, 0);
    setShowIntro(false);
    // Trigger content animation after intro fades out
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <>
      {/* Intro Loader */}
      {showIntro && (
        <IntroLoader isLoading={loading} onComplete={handleIntroComplete} />
      )}

      {/* Main Content - Hidden during loading to prevent animations */}
      <div
        className={`bg-slate-900 -mt-24 transition-all duration-1000 ${
          showIntro ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ visibility: showIntro ? "hidden" : "visible" }}
      >
        {/* Hero Section - First Impression with fade in animation */}
        <div
          className={`transition-all duration-1000 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <HeroSection />
        </div>

        {/* Stats Section */}
        <FloatingStats />

        {/* Featured Exercises Section */}
        <FeaturedExercises />

        {/* Skills Showcase */}
        <SkillsShowcase />
      </div>
    </>
  );
}

export default Home;
