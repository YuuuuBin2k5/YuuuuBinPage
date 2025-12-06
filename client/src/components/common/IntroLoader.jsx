import React, { useState, useEffect } from "react";
import { Database, Sparkles } from "lucide-react";
import logo from "../../assets/logo.svg";

const IntroLoader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Crafting Digital Magic ✨",
    "Building Tomorrow's Web 🚀",
    "Brewing Fresh Code ☕",
    "Almost There... 🎨",
  ];

  useEffect(() => {
    if (isLoading) {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 300);

      // Change text every 1s
      const textInterval = setInterval(() => {
        setCurrentText((prev) => (prev + 1) % loadingTexts.length);
      }, 1000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(textInterval);
      };
    } else {
      // When loading completes, fill to 100%
      setProgress(100);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  }, [isLoading]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center transition-all duration-1000 ${
        !isLoading && progress === 100
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Logo Animation */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            {/* Outer Rotating Ring */}
            <div className="absolute -inset-4 animate-spin-slow">
              <div className="w-32 h-32 border-2 border-transparent border-t-purple-500 border-r-emerald-500 border-b-cyan-500 rounded-full" />
            </div>

            {/* Inner Rotating Ring - Opposite direction */}
            <div className="absolute -inset-2 animate-spin-reverse">
              <div className="w-28 h-28 border-2 border-transparent border-l-purple-400 border-b-emerald-400 rounded-full opacity-50" />
            </div>

            {/* Center Logo with gradient background */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-emerald-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <div className="absolute inset-0.5 bg-slate-900 rounded-full" />
              <img
                src={logo}
                alt="Logo"
                className="relative z-10 w-14 h-14 object-contain filter brightness-0 invert drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"
              />
            </div>

            {/* Orbiting Particles */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 animate-bounce">
              <Sparkles size={18} className="text-purple-400 drop-shadow-lg" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 animate-bounce delay-300">
              <Database size={18} className="text-emerald-400 drop-shadow-lg" />
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 animate-bounce delay-150">
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 animate-bounce delay-500">
              <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
            </div>
          </div>
        </div>

        {/* Brand Name with subtitle */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              YUUUUBIN
            </span>
          </h1>
          <p className="text-slate-500 text-sm font-medium tracking-wider">
            Full-Stack Developer
          </p>
        </div>

        {/* Loading Text with icon */}
        <div className="h-8 mb-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-slate-300 text-base font-medium transition-all duration-500">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full max-w-md mx-auto h-3 bg-slate-800/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-slate-700/50">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-emerald-600/20 to-cyan-600/20" />

          {/* Progress Fill */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-emerald-500 to-cyan-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-emerald-500/50"
            style={{ width: `${progress}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>

          {/* Progress indicator dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50 transition-all duration-500 ease-out"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="text-slate-400 text-sm font-medium">Loading</div>
          <div className="text-white font-black text-2xl">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Tech Stack Icons Preview */}
        <div className="mt-12 flex justify-center items-center gap-4 opacity-50">
          <div className="text-2xl animate-bounce delay-100">⚛️</div>
          <div className="text-2xl animate-bounce delay-200">☕</div>
          <div className="text-2xl animate-bounce delay-300">🐍</div>
          <div className="text-2xl animate-bounce delay-400">🐬</div>
          <div className="text-2xl animate-bounce delay-500">🐳</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default IntroLoader;
