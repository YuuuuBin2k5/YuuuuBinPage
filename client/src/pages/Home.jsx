import React, { useState, useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import FloatingStats from "../components/home/FloatingStats";
import SkillsShowcase from "../components/home/SkillsShowcase";
import IntroLoader from "../components/common/IntroLoader";
import { projectAPI } from "../services/projectService";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Preload critical data
    const preloadData = async () => {
      try {
        // Load projects to ensure database is ready
        await projectAPI.getAll();

        // Minimum loading time for smooth experience (1.5s)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading data:", error);
        setIsLoading(false);
      }
    };

    preloadData();
  }, []);

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
        <IntroLoader isLoading={isLoading} onComplete={handleIntroComplete} />
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

        {/* Skills Showcase */}
        <SkillsShowcase />
      </div>
    </>
  );
}

export default Home;
