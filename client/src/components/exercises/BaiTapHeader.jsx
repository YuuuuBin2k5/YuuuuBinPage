import React from "react";
import { ChevronRight } from "lucide-react";

const BaiTapHeader = ({ totalWeeks = 0, totalExercises = 0 }) => {
  const techStack = [
    { name: "HTML5", bg: "bg-orange-500/20", border: "border-orange-500/50", text: "text-orange-300" },
    { name: "CSS3", bg: "bg-blue-500/20", border: "border-blue-500/50", text: "text-blue-300" },
    { name: "JS", bg: "bg-yellow-500/20", border: "border-yellow-500/50", text: "text-yellow-300" },
    { name: "Java", bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-300" },
    { name: "JSP", bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-300" },
    { name: "JSTL", bg: "bg-pink-500/20", border: "border-pink-500/50", text: "text-pink-300" },
    { name: "JPA", bg: "bg-green-500/20", border: "border-green-500/50", text: "text-green-300" },
    { name: "SQL", bg: "bg-cyan-500/20", border: "border-cyan-500/50", text: "text-cyan-300" },
  ];

  return (
    <div className="relative text-center mb-6">
      {/* Compact Terminal-Style Header */}
      <div className="relative max-w-4xl mx-auto">
        {/* Terminal Top Bar - Blue/Cyan Theme */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-950/80 to-slate-950/80 border border-blue-500/40 rounded-t mb-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80"></div>
          </div>
          <span className="text-[9px] font-mono text-blue-400/60 uppercase tracking-wider ml-2">
            exercises.sh
          </span>
        </div>

        {/* Terminal Content - Blue/Cyan Theme */}
        <div className="bg-gradient-to-br from-slate-950/90 to-blue-950/50 border-x border-b border-blue-500/40 rounded-b p-4">
          {/* Top Row: Command Line + Stats */}
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Command Line */}
            <div className="flex items-center gap-2 flex-1">
              <span className="text-blue-400 font-mono text-sm">$</span>
              <div className="w-1 h-4 bg-blue-400 animate-pulse"></div>
              <span className="text-blue-300 font-mono text-sm">
                <span className="text-cyan-400">cd</span> web-programming-exercises
              </span>
            </div>
            
            {/* Stats - Right Side */}
            <div className="hidden md:flex items-center gap-3">
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-sm">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wide">
                  {totalWeeks} Tuần
                </span>
              </div>
              <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-sm">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wide">
                  {totalExercises} Bài Tập
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-mono text-left">
            <span className="text-white">Bài Tập</span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Thực Hành</span>
          </h1>

          {/* Description - Compact */}
          <p className="text-sm text-slate-400 font-mono mb-3 leading-relaxed text-left">
            <span className="text-slate-600"># </span>
            <span className="text-slate-300">HTML/CSS</span>
            <span className="text-blue-400 mx-1">→</span>
            <span className="text-slate-300">JavaScript</span>
            <span className="text-cyan-400 mx-1">→</span>
            <span className="text-slate-300">React Framework</span>
          </p>

          {/* Tech Stack - Compact Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <ChevronRight className="w-3 h-3 text-blue-400" />
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`px-2 py-0.5 ${tech.bg} border ${tech.border} rounded-sm text-[10px] font-mono font-bold ${tech.text} uppercase tracking-wide hover:scale-105 transition-transform`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Decorative Divider - Animated Gradient Line */}
        <div className="relative mt-6 h-px overflow-hidden">
          {/* Base gradient line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-shimmer"></div>
          
          {/* Dots decoration */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-0.5 h-0.5 rounded-full bg-blue-300/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <div className="w-0.5 h-0.5 rounded-full bg-cyan-300/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-1 h-1 rounded-full bg-cyan-400/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
          </div>
        </div>
        
        {/* Terminal-style separator text */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700/50"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 py-1 bg-slate-900/50 border border-slate-700/30 rounded-sm">
            ─── Start Learning ───
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-700/50"></div>
        </div>
      </div>
    </div>
  );
};

export default BaiTapHeader;
