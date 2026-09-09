import React from "react";
import {
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
import avatarPersonImg from "../../images/avatar_person.webp";

const HeroSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  // Square colorful brand-like badges matching reference image
  const techLogos = [
    { name: "Java", icon: Code2, bg: "bg-[#E76F00]/15 text-[#FF7800] border-[#FF7800]/30" },
    { name: "Spring", icon: Cpu, bg: "bg-[#6DB33F]/15 text-[#6DB33F] border-[#6DB33F]/30" },
    { name: "PostgreSQL", icon: Database, bg: "bg-[#336791]/20 text-[#4183C4] border-[#4183C4]/30" },
    { name: "Hibernate", icon: Layers, bg: "bg-[#59666C]/20 text-[#BCAE79] border-[#BCAE79]/30" },
    { name: "REST API", icon: Server, bg: "bg-[#7C3AED]/20 text-[#A78BFA] border-[#A78BFA]/30" },
    { name: "Docker", icon: Box, bg: "bg-[#2496ED]/20 text-[#2496ED] border-[#2496ED]/30" },
    { name: "Git", icon: GitBranch, bg: "bg-[#F05032]/20 text-[#F05032] border-[#F05032]/30" },
  ];

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#080811] overflow-hidden text-slate-100"
      aria-label={isEn ? "Candidate Introduction & Technical Identity" : "Giới thiệu ứng viên & Nhận diện kỹ thuật"}
    >
      {/* Subtle deep ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ============================================================
              LEFT COLUMN (6-7 cols): Exact form matching reference image
              ============================================================ */}
          <div className="lg:col-span-6 xl:col-span-7 text-left space-y-6">
            
            {/* 1. Eyebrow Tag Pill (Reference: I'M A WEB DEVELOPER) */}
            <div>
              <span className="inline-block px-3.5 py-1.5 rounded-md bg-[#181332] text-[#9D8DF9] font-mono text-xs font-semibold tracking-wider uppercase">
                {isEn ? "I'M A JAVA BACKEND DEVELOPER" : "LẬP TRÌNH VIÊN BACKEND JAVA"}
              </span>
            </div>

            {/* 2. Bold Headline (Reference: Hi, I'm Alex / I build things for the web.) */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                {isEn ? (
                  <>
                    Hi, I'm{" "}
                    <span className="text-[#8B7CF8]">
                      Nhat Anh
                    </span>
                    <span className="block text-white font-bold pt-1">
                      I build things for the web.
                    </span>
                  </>
                ) : (
                  <>
                    Xin chào, mình là{" "}
                    <span className="text-[#8B7CF8]">
                      Nhật Anh
                    </span>
                    <span className="block text-white font-bold pt-1">
                      Chuyên xây dựng hệ thống Backend.
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* 3. Bio Paragraph (Clean, accurate, NO duplicate / 4.0) */}
            <div className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              <p>
                {isEn ? (
                  <>
                    Fourth-year Software Engineering student at {profileData.university.short} (GPA {profileData.gpa}). Focused on developing backend applications with Java, Spring Boot, PostgreSQL, and RESTful APIs.
                  </>
                ) : (
                  <>
                    Sinh viên năm 4 ngành Kỹ thuật Phần mềm tại {profileData.university.short} (GPA {profileData.gpa}). Chuyên phát triển hệ thống backend với Java, Spring Boot, PostgreSQL và RESTful APIs.
                  </>
                )}
              </p>
            </div>

            {/* 4. Action Buttons (Exact form: View My Work ↗ & Download CV 📥) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#clothy"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#5A4FE6] hover:bg-[#4C40DB] text-white font-semibold text-sm shadow-lg shadow-indigo-950/40 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <span>{isEn ? "View My Work" : "Xem Dự Án"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>

              <a
                href={profileData.cvPath}
                download="Dao-Nguyen-Nhat-Anh-Backend-Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#0B0F19] hover:bg-[#141A29] text-slate-100 font-semibold text-sm border border-slate-700/90 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={isEn ? "Download Dao Nguyen Nhat Anh's CV in PDF format" : "Tải hồ sơ CV của Đào Nguyễn Nhật Anh định dạng PDF"}
              >
                <Download className="w-4 h-4 text-purple-300" aria-hidden="true" />
                <span>{isEn ? "Download CV" : "Tải CV (PDF)"}</span>
              </a>
            </div>

            {/* 5. Horizontal Technologies Strip (Exact form from reference image) */}
            <div className="pt-4 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                {isEn ? "TECHNOLOGIES I WORK WITH" : "CÔNG NGHỆ CHUYÊN SÂU"}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {techLogos.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      title={tech.name}
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm ${tech.bg}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ============================================================
              RIGHT COLUMN (5-6 cols): Transparent Cutout in Front of Purple Circle
              (100% Faithful to Reference: Head & Torso Un-obscured, Code Card Shifted to Right)
              ============================================================ */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            <div className="relative w-full max-w-[480px] h-[440px] sm:h-[500px] lg:h-[540px] flex items-end justify-center">

              {/* 1. Large Purple Gradient Circle (Positioned BEHIND the person) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] lg:w-[440px] lg:h-[440px] rounded-full bg-gradient-to-tr from-[#3b2d99] via-[#6548e6] to-[#8a70f2] shadow-2xl shadow-purple-950/80 -z-0"
                aria-hidden="true"
              />

              {/* 2. Top-Right Decorative Dot Matrix (Exact match from reference) */}
              <div
                className="absolute top-4 right-4 sm:right-2 w-16 h-16 grid grid-cols-4 gap-2 opacity-35 pointer-events-none -z-0"
                aria-hidden="true"
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-200" />
                ))}
              </div>

              {/* 3. Bottom-Left Curved Hand-Drawn Arrow (Exact match from reference) */}
              <div
                className="absolute bottom-20 -left-6 hidden sm:block pointer-events-none text-purple-300/60 -z-0"
                aria-hidden="true"
              >
                <svg className="w-12 h-12 -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M 8 36 C 18 46, 36 42, 42 18" />
                  <path d="M 34 16 L 43 18 L 42 27" />
                </svg>
              </div>

              {/* 4. Transparent Persona Cutout (Standing in front of the circle, face & body 100% visible) */}
              <img
                src={avatarPersonImg}
                alt={isEn ? profileData.fullName.en : profileData.fullName.vi}
                width="537"
                height="954"
                className="relative z-10 max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] select-none pointer-events-none"
              />

              {/* 5. Floating Code Window (Shifted to the right, only slightly overlapping sleeve) */}
              <div className="absolute right-0 sm:-right-4 lg:-right-6 bottom-10 sm:bottom-14 z-20 w-56 sm:w-64 p-4 rounded-2xl bg-[#0d111d]/95 backdrop-blur-md border border-slate-700/80 shadow-2xl shadow-black/90 font-mono text-[11px] sm:text-xs text-slate-300">
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px]">
                  <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                    <span className="text-purple-400 font-bold">&lt;/&gt;</span>
                    <span>Code</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  </div>
                </div>

                {/* Syntax-highlighted code matching reference form */}
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
                    <span className="text-slate-400">skills:</span>{" "}
                    <span className="text-amber-300">["Java", "Spring",</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-amber-300">"PostgreSQL", "JPA"]</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-slate-400">passion:</span>{" "}
                    <span className="text-amber-300">"Building backend</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-amber-300">for the web"</span>
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
