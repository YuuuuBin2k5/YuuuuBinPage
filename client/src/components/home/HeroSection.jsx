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
  Terminal,
  Cpu,
  ShieldCheck,
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

  // Tech stack icons strip
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
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#07090e] overflow-hidden text-slate-100"
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
          <div className="lg:col-span-7 text-left space-y-7">
            
            {/* 1. Pill Badge */}
            <div className="animate-reveal-up-1 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-xs font-mono backdrop-blur-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                <span className="font-semibold text-purple-300 tracking-wider uppercase text-[11px]">
                  {isEn ? "I'M A JAVA BACKEND DEVELOPER" : "LẬP TRÌNH VIÊN BACKEND JAVA"}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                <span>HCMUTE • VIETNAM</span>
              </div>
            </div>

            {/* 2. Bold Headline with Gradient Accent */}
            <div className="animate-reveal-up-2 space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                {isEn ? (
                  <>
                    Hi, I'm{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                      Nhat Anh
                    </span>
                  </>
                ) : (
                  <>
                    Xin chào, mình là{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                      Nhật Ánh
                    </span>
                  </>
                )}
              </h1>

              {/* Positioning Subtitle */}
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-200">
                {isEn ? "I build robust backend systems for the web." : "Xây dựng hệ thống Backend và RESTful APIs."}
              </div>

              {/* Education & Academic Spec */}
              <p className="text-xs sm:text-sm font-mono text-slate-400 pt-1">
                {isEn ? profileData.studentStatus.en : profileData.studentStatus.vi} • {profileData.university.short} ({isEn ? "Software Engineering" : "Kỹ Thuật Phần Mềm"}) • GPA {profileData.gpa} / 4.0
              </p>
            </div>

            {/* 3. Value Proposition / Summary Description */}
            <div className="animate-reveal-up-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              <p>
                {isEn
                  ? "Specializing in Java, Spring Boot, and PostgreSQL. Focused on architectural clarity, database entity modeling, and clean RESTful API integration."
                  : "Chuyên sâu về Java, Spring Boot và PostgreSQL. Tập trung vào kiến trúc hệ thống rõ ràng, mô hình hóa dữ liệu quan hệ và tích hợp RESTful API hiệu quả."}
              </p>
            </div>

            {/* 4. Modern Action CTAs (Reference Design Style) */}
            <div className="animate-reveal-up-4 flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#clothy"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-indigo-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <span>{isEn ? "View My Work" : "Xem Dự Án"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>

              <a
                href={profileData.cvPath}
                download="Dao-Nguyen-Nhat-Anh-Backend-Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={isEn ? "Download Dao Nguyen Nhat Anh's CV in PDF format" : "Tải hồ sơ CV của Đào Nguyễn Nhật Anh định dạng PDF"}
              >
                <Download className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <span>{isEn ? "Download CV" : "Tải CV (PDF)"}</span>
              </a>

              {/* Social links */}
              <div className="flex items-center gap-2 pl-2">
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

            {/* 5. Horizontal Technologies Strip (Matching Reference Image) */}
            <div className="animate-reveal-up-5 pt-4 space-y-2.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {isEn ? "TECHNOLOGIES I WORK WITH" : "CÔNG NGHỆ LÀM VIỆC CHUYÊN SÂU"}
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
              RIGHT COLUMN (5 cols): Avatar with Radial Purple Halo & Floating Code Card
              ============================================================ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div
              ref={heroVisualRef}
              onMouseMove={handleMouseMove}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* 1. Large Vibrant Radial Purple Halo */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/40 via-indigo-600/35 to-blue-500/20 blur-3xl -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* 2. Solid Decorative Disc (Matching Reference Image) */}
              <div
                className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-b from-purple-600/30 to-indigo-950/60 border border-purple-500/30 -z-0"
                aria-hidden="true"
              />

              {/* 3. Cutout / Portrait Avatar */}
              <div className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-purple-400/40 shadow-2xl shadow-purple-950/50 bg-slate-950">
                <img
                  src={avatarImg}
                  alt={isEn ? "Dao Nguyen Nhat Anh - Java Backend Developer" : "Đào Nguyễn Nhật Ánh - Lập trình viên Backend Java"}
                  width="400"
                  height="400"
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* 4. Overlaid Floating Code Card (Matching Reference Image `</> Code`) */}
              <div className="absolute -bottom-4 right-0 sm:-right-4 z-20 w-64 sm:w-72 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-2xl space-y-2 font-mono text-[11px] text-slate-300">
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px]">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                    <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>backend_spec.json</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    <span className="text-emerald-400 text-[10px] font-semibold">Ready</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="space-y-1 text-slate-400 pt-0.5">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-indigo-300">developer</span> = &#123;
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">role:</span>{" "}
                    <span className="text-emerald-300">"Java Backend"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">core:</span>{" "}
                    <span className="text-amber-300">["Spring Boot", "JPA"]</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">database:</span>{" "}
                    <span className="text-sky-300">"PostgreSQL 20+"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">status:</span>{" "}
                    <span className="text-emerald-300">"Available for Intern"</span>
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
