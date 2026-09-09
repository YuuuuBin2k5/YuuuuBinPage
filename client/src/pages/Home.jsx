import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsGrid from "../components/home/StatsGrid";
import FlagshipProject from "../components/home/FlagshipProject";
import CapabilitiesMatrix from "../components/home/CapabilitiesMatrix";
import ExperienceSection from "../components/home/ExperienceSection";
import SecondaryProjects from "../components/home/SecondaryProjects";
import EducationSection from "../components/home/EducationSection";
import LabSummarySection from "../components/home/LabSummarySection";

function Home() {
  return (
    <div className="bg-slate-900 -mt-24 w-full">
      {/* 1. Hero Section - Identity, Visual Halo & Immediate Positioning */}
      <HeroSection />

      {/* 2. Key Metrics Grid - High-Impact Proof Points */}
      <StatsGrid />

      {/* 3. Flagship Project - Clothy Backend Showcase */}
      <FlagshipProject />

      {/* 3. Capabilities Matrix - Verified Technical Competencies */}
      <CapabilitiesMatrix />

      {/* 4. Work Experience & Software Quality - Test IO Crowdtesting Mindset */}
      <ExperienceSection />

      {/* 5. Secondary Backend Architecture - Personal Portfolio Platform */}
      <SecondaryProjects />

      {/* 6. Education - Academic Foundation at HCMUTE */}
      <EducationSection />

      {/* 7. Engineering Lab - Enterprise Java Fundamentals Teaser */}
      <LabSummarySection />
    </div>
  );
}

export default Home;
