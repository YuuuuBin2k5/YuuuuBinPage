import React, { useState, useEffect } from "react";
import { Code } from "lucide-react";
import logoSvg from "../assets/logo.svg";

const Intro = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Logo appears
    setTimeout(() => setShowLogo(true), 300);
    
    // Text appears
    setTimeout(() => setShowText(true), 800);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    // Fade out and complete
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => onComplete(), 3000);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Subtle background orb */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo */}
        <div
          className={`transition-all duration-700 ${
            showLogo
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50"
          }`}
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-indigo-600/30 blur-2xl rounded-full scale-150" />
            
            {/* Logo circle */}
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50 p-6">
              <img 
                src={logoSvg} 
                alt="Eagle Logo" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div
          className={`transition-all duration-700 delay-300 ${
            showText
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-5xl font-black tracking-wider mb-2">
            <span className="bg-gradient-to-r from-slate-100 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              YUUUUBIN
            </span>
          </h1>
          <p className="text-slate-400 text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Code size={14} />
            <span>DEVELOPER</span>
          </p>
        </div>

        {/* Loading bar */}
        <div
          className={`transition-all duration-500 delay-500 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-64 mx-auto">
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-slate-500 text-xs mt-2 font-mono">{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
