import React, { useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUpRight,
  Server,
  Database,
  Layers,
  Cpu,
  Code2,
  GitBranch,
  Box,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { profileData } from "../../data/profileData";
import avatarImg from "../../images/avatar.webp";

const HeroSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const heroVisualRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!heroVisualRef.current) return;
    const rect = heroVisualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroVisualRef.current.style.setProperty("--mouse-x", `${x}px`);
    heroVisualRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  // Technologies row (matching reference layout)
  const techStack = [
    { name: "Java", icon: Code2, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { name: "Spring Boot", icon: Cpu, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { name: "PostgreSQL", icon: Database, color: "text-sky-400 bg-sky-500/10 border-sky-500/30" },
    { name: "Hibernate", icon: Layers, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30" },
    { name: "REST API", icon: Server, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
    { name: "Git", icon: GitBranch, color: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
    { name: "Docker", icon: Box, color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  ];

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#07090e] overflow-hidden text-slate-100"
      aria-label={isEn ? "Candidate Introduction & Technical Identity" : "Giới thiệu ứng viên & Nhận diện kỹ thuật"}
    >
      {/* Background Subtle Tech Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Top Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ============================================================
              LEFT COLUMN (7 cols): Editorial Typography, CTAs & Tech Strip
              ============================================================ */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* 1. Pill Badge */}
            <div className="animate-reveal-up-1">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-purple-800/40 bg-[#191530] text-xs font-mono font-semibold text-purple-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
                <span>{isEn ? "I'M A JAVA BACKEND DEVELOPER" : "LẬP TRÌNH VIÊN BACKEND JAVA"}</span>
              </span>
            </div>

            {/* 2. Bold Headline (Matching reference form: Hi, I'm Alex / I build things for the web.) */}
            <div className="animate-reveal-up-2 space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                {isEn ? (
                  <>
                    Hi, I'm{" "}
                    <span className="text-[#8B7CF8]">
                      Nhat Anh
                    </span>
                    <span className="block text-white text-3xl sm:text-5xl lg:text-6xl pt-2 font-bold">
                      I build things for the web.
                    </span>
                  </>
                ) : (
                  <>
                    Xin chào, mình là{" "}
                    <span className="text-[#8B7CF8]">
                      Nhật Anh
                    </span>
                    <span className="block text-white text-3xl sm:text-5xl lg:text-6xl pt-2 font-bold">
                      Chuyên xây dựng hệ thống Backend.
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* 3. Bio Paragraph (Using verified profileData, NO double / 4.0) */}
            <div className="animate-reveal-up-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              <p>
                {isEn ? (
                  <>
                    Fourth-year Software Engineering student at {profileData.university.short} (GPA {profileData.gpa}). Focused on developing backend applications with Java, Spring Boot, PostgreSQL, and RESTful APIs, backed by quality mindset from Test IO.
                  </>
                ) : (
                  <>
                    Sinh viên năm 4 ngành Kỹ thuật Phần mềm tại {profileData.university.short} (GPA {profileData.gpa}). Chuyên phát triển hệ thống backend với Java, Spring Boot, PostgreSQL và RESTful APIs; kết hợp tư duy kiểm thử từ Test IO.
                  </>
                )}
              </p>
            </div>

            {/* 4. Action Buttons (Matching reference image: View My Work ↗ & Download CV 📥) */}
            <div className="animate-reveal-up-4 flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#clothy"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#5B50E6] hover:bg-[#4E43D8] text-white font-semibold text-sm shadow-lg shadow-indigo-900/30 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <span>{isEn ? "View My Work" : "Xem Dự Án"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>

              <a
                href={profileData.cvPath}
                download="Dao-Nguyen-Nhat-Anh-Backend-Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B0F19] hover:bg-[#13192B] text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={isEn ? "Download Dao Nguyen Nhat Anh's CV in PDF format" : "Tải hồ sơ CV của Đào Nguyễn Nhật Anh định dạng PDF"}
              >
                <Download className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <span>{isEn ? "Download CV" : "Tải CV (PDF)"}</span>
              </a>

              {/* Social links */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-950/20 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-950/20 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${profileData.email}`}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-950/20 transition-colors"
                  aria-label="Send Direct Email"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* 5. Technologies I Work With (Horizontal strip matching reference image) */}
            <div className="animate-reveal-up-5 pt-3 space-y-2.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                {isEn ? "TECHNOLOGIES I WORK WITH" : "CÔNG NGHỆ CHUYÊN SÂU"}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all duration-200 hover:scale-105 ${tech.color}`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ============================================================
              RIGHT COLUMN (5 cols): Avatar with Large Purple Circle & Floating Code Card
              (Form matched exactly to reference image: Avatar un-obscured, Code Card shifted right)
              ============================================================ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative pt-4 lg:pt-0">
            <div
              ref={heroVisualRef}
              onMouseMove={handleMouseMove}
              className="relative w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center"
            >
              {/* 1. Large Vibrant Purple Gradient Circle (Backdrop Halo Disc) */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#3b2d99] via-[#6c5ce7] to-[#8b7cf8] shadow-2xl shadow-purple-950/70"
                aria-hidden="true"
              />

              {/* 2. Top-Right Decorative Dot Matrix (Matching reference image) */}
              <div
                className="absolute -top-3 -right-3 w-16 h-16 grid grid-cols-4 gap-2 opacity-30 pointer-events-none"
                aria-hidden="true"
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-200" />
                ))}
              </div>

              {/* 3. Bottom-Left Playful Curved Vector Arrow (Matching reference image) */}
              <div
                className="absolute -bottom-2 -left-6 hidden sm:block pointer-events-none text-purple-300/50"
                aria-hidden="true"
              >
                <svg className="w-10 h-10 -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M 10 35 C 20 45, 35 40, 40 20" />
                  <path d="M 33 18 L 41 20 L 40 28" />
                </svg>
              </div>

              {/* 4. Prominent Avatar (Centered on candidate's face & upper body, clearly visible) */}
              <div className="relative z-10 w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] lg:w-[370px] lg:h-[370px] rounded-full overflow-hidden border-2 border-purple-300/40 shadow-2xl bg-slate-950">
                <img
                  src={avatarImg}
                  alt={isEn ? profileData.fullName.en : profileData.fullName.vi}
                  width="400"
                  height="400"
                  className="w-full h-full object-cover object-[50%_36%] scale-110 transition-transform duration-500 hover:scale-115"
                />
              </div>

              {/* 5. Floating Code Card (Positioned to the right of the person, NOT covering the face/body) */}
              <div className="absolute -bottom-4 right-0 sm:-right-8 lg:-right-12 z-20 w-56 sm:w-64 p-4 rounded-2xl bg-[#0c101d]/95 backdrop-blur-md border border-slate-700/80 shadow-2xl shadow-black/80 font-mono text-[11px] text-slate-300">
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px]">
                  <div className="flex items-center gap-1 text-slate-400 font-semibold">
                    <span className="text-purple-400 font-bold">&lt;/&gt;</span>
                    <span>Code</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    <span className="text-emerald-400 text-[10px] font-semibold">Active</span>
                  </div>
                </div>

                {/* Code Snippet (Matching reference form: const developer = { ... }) */}
                <div className="space-y-1 text-slate-400 leading-relaxed">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-indigo-300">developer</span> = &#123;
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">name:</span>{" "}
                    <span className="text-amber-300">"Nhat Anh"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">role:</span>{" "}
                    <span className="text-emerald-300">"Java Backend"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">skills:</span>{" "}
                    <span className="text-amber-300">["Java", "Spring",</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-amber-300">"PostgreSQL", "JPA"]</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">status:</span>{" "}
                    <span className="text-emerald-400">"Ready for Intern"</span>
                  </div>
                  <div>&#125;;</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
