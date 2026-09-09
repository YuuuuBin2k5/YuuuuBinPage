import React, { useState, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  Server,
  Database,
  Layers,
  Terminal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { profileData } from "../../data/profileData";
import avatarImg from "../../images/avatar.webp";

const HeroSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  // Ambient interactive lighting for engineering diagram (pure non-essential enhancement)
  const diagramRef = useRef(null);
  const [activeStage, setActiveStage] = useState(null);

  const handleMouseMove = useCallback((e) => {
    if (!diagramRef.current) return;
    const rect = diagramRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    diagramRef.current.style.setProperty("--mouse-x", `${x}px`);
    diagramRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  // Verified backend request flow stages (safe abstraction level)
  const architectureStages = [
    {
      id: "client",
      step: "01",
      layer: "CLIENT",
      role: isEn ? "Client Request" : "Yêu cầu từ Client",
      summary: isEn ? "HTTP request communications" : "Giao tiếp yêu cầu qua HTTP",
      badge: "HTTP",
      icon: Terminal,
    },
    {
      id: "rest-api",
      step: "02",
      layer: "REST API",
      role: isEn ? "API Processing" : "Xử lý API",
      summary: isEn ? "RESTful endpoints and request routing" : "Định tuyến endpoint RESTful",
      badge: "REST",
      icon: Server,
    },
    {
      id: "spring-boot",
      step: "03",
      layer: "SPRING BOOT",
      role: isEn ? "Application Logic" : "Nghiệp vụ ứng dụng",
      summary: isEn ? "Application logic and processing" : "Xử lý nghiệp vụ ứng dụng",
      badge: "Logic",
      icon: Cpu,
    },
    {
      id: "jpa-hibernate",
      step: "04",
      layer: "JPA / HIBERNATE",
      role: isEn ? "Persistence" : "Tầng lưu trữ",
      summary: isEn ? "Object-relational mapping and persistence" : "Ánh xạ đối tượng quan hệ và lưu trữ",
      badge: "ORM",
      icon: Layers,
    },
    {
      id: "postgresql",
      step: "05",
      layer: "POSTGRESQL",
      role: isEn ? "Relational Data" : "Dữ liệu quan hệ",
      summary: isEn ? "Structured relational database storage" : "Lưu trữ cơ sở dữ liệu quan hệ",
      badge: "SQL",
      icon: Database,
    },
  ];

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#07090e] overflow-hidden text-slate-100"
      aria-label={isEn ? "Candidate Introduction & Technical Architecture" : "Giới thiệu ứng viên & Kiến trúc kỹ thuật"}
    >
      {/* Precision Engineering Grid Background (Static & Hairline) */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Subtle Localized Lighting (Non-animated, zero neon bloat) */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ============================================================
              LEFT COLUMN (7 cols): Editorial Typography & Technical Profile
              ============================================================ */}
          <div className="lg:col-span-7 text-left space-y-7">
            
            {/* 1. Technical Eyebrow & Availability Status */}
            <div className="animate-reveal-up-1 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-slate-800 bg-slate-900/90 text-xs font-mono">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 motion-reduce:hidden" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold text-emerald-400 tracking-wider uppercase text-[11px]">
                  {isEn ? profileData.availabilityStatus.en : profileData.availabilityStatus.vi}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-slate-800/80 bg-slate-950/60 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                <span>{isEn ? "BACKEND ENGINEERING / HCMUTE" : "KỸ THUẬT BACKEND / HCMUTE"}</span>
                <span className="text-slate-600" aria-hidden="true">•</span>
                <span>{isEn ? profileData.location.en : profileData.location.vi}</span>
              </div>
            </div>

            {/* 2. Editorial Typography Candidate Name (Graphic Scale) */}
            <div className="animate-reveal-up-2 space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95]">
                <span className="block text-slate-300">Đào Nguyễn</span>
                <span className="block text-white">Nhật Anh</span>
              </h1>

              {/* Career Role (Clear Recruiter Positioning) */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-[2px] w-8 bg-indigo-500 rounded-full" aria-hidden="true" />
                <span className="text-lg sm:text-xl lg:text-2xl font-mono font-semibold text-indigo-400 tracking-wide">
                  {isEn ? profileData.professionalTitle.en : profileData.professionalTitle.vi}
                </span>
              </div>

              {/* Education & Academic Spec */}
              <p className="text-xs sm:text-sm font-mono text-slate-400 pt-1">
                {isEn ? profileData.studentStatus.en : profileData.studentStatus.vi} • {profileData.university.short} ({isEn ? "Software Engineering" : "Kỹ Thuật Phần Mềm"}) • GPA {profileData.gpa} / 4.0
              </p>
            </div>

            {/* 3. Core Backend Stack: Editorial Inline Stack Treatment */}
            <div className="animate-reveal-up-3 space-y-2 pt-1 font-mono text-xs">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  {isEn ? "Core Stack:" : "Công Nghệ Chính:"}
                </span>
                <span className="text-slate-100 font-medium text-sm">
                  Java <span className="text-slate-600 mx-1.5">•</span> Spring Boot <span className="text-slate-600 mx-1.5">•</span> PostgreSQL <span className="text-slate-600 mx-1.5">•</span> RESTful APIs
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 text-slate-400 text-xs">
                <span className="uppercase tracking-wider text-[11px] text-slate-400">
                  {isEn ? "Persistence:" : "Truy Vấn:"}
                </span>
                <span className="text-slate-300">
                  Spring Data JPA, Hibernate
                </span>
              </div>
            </div>

            {/* 4. Value Proposition / Summary Description */}
            <div className="animate-reveal-up-4 border-l-2 border-slate-800 pl-4 py-0.5 max-w-2xl">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {isEn ? profileData.summary.en : profileData.summary.vi}
              </p>
            </div>

            {/* 5. Precision Buttons (120-180ms subtle feedback, no bounce) */}
            <div className="animate-reveal-up-5 flex flex-wrap items-center gap-4 pt-2">
              <a
                href={profileData.cvPath}
                download="Dao-Nguyen-Nhat-Anh-Backend-Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-precision inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-950/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#07090e]"
                aria-label={isEn ? "Download Dao Nguyen Nhat Anh's CV in PDF format" : "Tải hồ sơ CV của Đào Nguyễn Nhật Anh định dạng PDF"}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? "Download CV (PDF)" : "Tải CV (PDF)"}</span>
              </a>

              <a
                href="#clothy"
                className="btn-precision inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-800 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#07090e]"
              >
                <span>{isEn ? "Inspect Clothy Architecture" : "Xem Kiến Trúc Clothy"}</span>
                <ArrowRight className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              </a>
            </div>

            {/* 6. Identity Spec & Quick Channels */}
            <div className="animate-reveal-up-6 flex flex-wrap items-center gap-4 pt-2 border-t border-slate-900">
              <div className="flex items-center gap-3">
                <img
                  src={avatarImg}
                  width="72"
                  height="72"
                  alt={isEn ? "Dao Nguyen Nhat Anh - Verification Photo" : "Đào Nguyễn Nhật Anh - Ảnh đại diện"}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-800 bg-slate-900 shadow-sm"
                />
                <div className="text-xs font-mono space-y-0.5">
                  <div className="font-semibold text-slate-200">
                    {isEn ? profileData.fullName.en : profileData.fullName.vi}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {profileData.email}
                  </div>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-800 hidden sm:block" aria-hidden="true" />

              <div className="flex items-center gap-2">
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-precision p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-precision p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${profileData.email}`}
                  className="btn-precision p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Send Direct Email"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN (5 cols): Backend Request-Flow Engineering Diagram
              (Safe abstraction level, pure semantic DOM/CSS, readable without JS)
              ============================================================ */}
          <div className="lg:col-span-5 w-full">
            <div
              ref={diagramRef}
              onMouseMove={handleMouseMove}
              className="relative rounded-xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden"
              style={{
                background: `radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.08), transparent 75%), #090d14`,
              }}
              aria-label={isEn ? "Backend Request Processing Flow Diagram" : "Sơ đồ luồng xử lý yêu cầu Backend"}
            >
              {/* Technical Documentation Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/90">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="text-xs font-mono font-semibold tracking-wide text-slate-200">
                    {isEn ? "Backend Architecture Flow" : "Luồng Kiến Trúc Backend"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Spring Boot & PostgreSQL
                </span>
              </div>

              {/* Diagram Body: 5-Stage Safe Abstraction Pipeline */}
              <div className="p-4 sm:p-5 space-y-3 font-mono">
                <div className="text-[11px] text-slate-400 flex items-center justify-between pb-1 border-b border-slate-900">
                  <span>{isEn ? "// CLIENT-TO-DATABASE FLOW" : "// LUỒNG TỪ CLIENT ĐẾN CƠ SỞ DỮ LIỆU"}</span>
                  <span className="text-[10px] text-slate-400">3-TIER ARCHITECTURE</span>
                </div>

                <div className="space-y-2">
                  {architectureStages.map((stage, idx) => {
                    const isHovered = activeStage === stage.id;
                    const StageIcon = stage.icon;

                    return (
                      <div key={stage.id} className="space-y-1.5">
                        <div
                          onMouseEnter={() => setActiveStage(stage.id)}
                          onMouseLeave={() => setActiveStage(null)}
                          className={`p-3 rounded-lg border transition-colors duration-150 ${
                            isHovered
                              ? "bg-indigo-950/30 border-indigo-500/50 text-white"
                              : "bg-slate-900/70 border-slate-800/80 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-indigo-400">
                                {stage.step}
                              </span>
                              <StageIcon className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                              <span className="font-semibold text-slate-200 tracking-wide text-xs">
                                {stage.layer}
                              </span>
                            </div>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-300 font-mono">
                              {stage.badge}
                            </span>
                          </div>

                          <div className="text-[11px] text-indigo-300 font-semibold pt-1.5">
                            {stage.role}
                          </div>

                          <div className="text-[11px] text-slate-400 pt-0.5 font-sans">
                            {stage.summary}
                          </div>
                        </div>

                        {/* Visual Connector (except last item) */}
                        {idx < architectureStages.length - 1 && (
                          <div className="flex items-center justify-center py-0.5" aria-hidden="true">
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              <span className="h-2.5 w-px bg-slate-800" />
                              <span>↓</span>
                              <span className="h-2.5 w-px bg-slate-800" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer Status Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{isEn ? "Standard Multi-Tier Architecture" : "Kiến trúc phân tầng tiêu chuẩn"}</span>
                  <span className="text-indigo-400 font-mono">Backend System</span>
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
