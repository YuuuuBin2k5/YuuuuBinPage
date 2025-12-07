import React from "react";
import { ChevronRight } from "lucide-react";
import { useTypewriter } from "../../hooks/useTypewriter";

const BaiTapHeader = ({ totalWeeks = 0, totalExercises = 0 }) => {
  // Typewriter effect for dynamic text - Real learning content from course
  const typewriterTexts = [
    "Tuần 1 (06/11): Hosting - Triển khai ứng dụng với FTP",
    "Tuần 2 (11/11): HTML5 & CSS3 - Semantic Elements",
    "Tuần 2 (18/11): JavaServer Pages - JSP & JavaBeans",
    "Tuần 3 (20/11): Sessions & Cookies - HTTP Stateless",
    "Tuần 3 (25/11): Expression Language & JSTL Core",
    "Tuần 4 (02/12): JDBC - PreparedStatement & SQL Injection",
    "Tuần 5 (04/12): JPA - O/R Mapping với EntityManager",
    "Tuần 5: JavaMail API - Gửi Email với SMTP",
    "Chương 4: HTML Forms & CSS3 External Stylesheets",
    "Chương 6: JSP - Expression Language ${attribute}",
    "Chương 7: URL Rewriting & Hidden Fields",
    "Chương 8: EL với Arrays, Lists, Maps & Operators",
    "Chương 9: JSTL - <c:forEach>, <c:if>, <c:choose>",
    "Chương 12: Connection Pooling với context.xml",
    "Chương 13: persistence.xml & Hibernate/EclipseLink",
    "Chương 14: MimeMessage & Transport - Gmail SMTP"
  ];
  
  const typedText = useTypewriter(typewriterTexts, 70, 30, 2000);
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
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Compact Terminal-Style Header */}
      <div className="relative max-w-4xl mx-auto">
        {/* Terminal Top Bar - Blue/Cyan Theme with Glow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-950/80 to-slate-950/80 border border-blue-500/40 rounded-t mb-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" style={{ animationDuration: '2s' }}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.3s' }}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.6s' }}></div>
          </div>
          <span className="text-[9px] font-mono text-blue-400/60 uppercase tracking-wider ml-2 animate-pulse">
            exercises.sh
          </span>
        </div>

        {/* Terminal Content - Blue/Cyan Theme with Scan Line */}
        <div className="relative bg-gradient-to-br from-slate-950/90 to-blue-950/50 border-x border-b border-blue-500/40 rounded-b p-4 overflow-hidden shadow-2xl shadow-blue-500/10">
          {/* Scan Line Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent h-full animate-scan-slow"></div>
          </div>
          
          {/* Content Wrapper */}
          <div className="relative z-10">
          {/* Top Row: Command Line + Stats */}
          <div className="flex items-center justify-between gap-4 mb-3 animate-in fade-in slide-in-from-top-4 duration-500">
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

          {/* Title with Glitch Effect on Hover */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-mono text-left group cursor-default animate-in fade-in slide-in-from-left-4 duration-700" style={{ animationDelay: '0.2s' }}>
            <span className="text-white group-hover:animate-pulse">Bài Tập</span>
            <span className="relative inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              <span className="relative z-10"> Thực Hành</span>
              {/* Glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </span>
          </h1>

          {/* Description - Typewriter Effect with Glow */}
          <div className="text-sm text-slate-400 font-mono mb-3 leading-relaxed text-left h-6 animate-in fade-in duration-700" style={{ animationDelay: '0.4s' }}>
            <span className="text-slate-600"># </span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {typedText}
              {/* Text glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-sm"></span>
            </span>
            <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse shadow-lg shadow-cyan-400/50"></span>
          </div>

          {/* Tech Stack - Compact Pills with Stagger Animation */}
          <div className="flex items-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0.6s' }}>
            <ChevronRight className="w-3 h-3 text-blue-400" />
            {techStack.map((tech, index) => (
              <span
                key={tech.name}
                className={`px-2 py-0.5 ${tech.bg} border ${tech.border} rounded-sm text-[10px] font-mono font-bold ${tech.text} uppercase tracking-wide hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default animate-in fade-in zoom-in-50`}
                style={{ animationDelay: `${0.7 + index * 0.05}s`, animationDuration: '300ms' }}
              >
                {tech.name}
              </span>
            ))}
          </div>
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
