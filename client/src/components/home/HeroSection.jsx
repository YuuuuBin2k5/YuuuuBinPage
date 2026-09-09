import React from "react";
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { profileData } from "../../data/profileData";
import avatarImg from "../../images/avatar.webp";

const HeroSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      aria-label={isEn ? "Candidate Introduction" : "Giới thiệu ứng viên"}
    >
      {/* Subtle Static Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Column (~60% desktop): Identity, Stack, Copy & CTAs */}
          <div className="w-full lg:w-7/12 text-left space-y-6">
            {/* Availability Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-sm">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 motion-reduce:hidden" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 font-mono">
                {isEn ? profileData.availabilityStatus.en : profileData.availabilityStatus.vi}
              </span>
              <span className="text-slate-600 font-mono" aria-hidden="true">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {isEn ? profileData.location.en : profileData.location.vi}
              </span>
            </div>

            {/* Page-level Primary H1 */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {isEn ? profileData.fullName.en : profileData.fullName.vi}
                <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold text-indigo-400 mt-2 font-mono">
                  {isEn ? profileData.professionalTitle.en : profileData.professionalTitle.vi}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {isEn ? profileData.studentStatus.en : profileData.studentStatus.vi} • {isEn ? profileData.university.en : profileData.university.vi} (GPA: {profileData.gpa})
              </p>
            </div>

            {/* Primary Backend Stack Badges */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  {isEn ? "Core Stack:" : "Stack Chính:"}
                </span>
                {["Java", "Spring Boot", "PostgreSQL", "RESTful APIs"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-950/70 text-indigo-300 border border-indigo-500/30 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                <span className="text-slate-500">Supporting:</span>
                <span className="px-2 py-0.5 rounded text-xs bg-slate-800/60 text-slate-300 border border-slate-700/40">
                  Spring Data JPA
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-slate-800/60 text-slate-300 border border-slate-700/40">
                  Hibernate
                </span>
              </div>
            </div>

            {/* Value Proposition Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {isEn ? profileData.summary.en : profileData.summary.vi}
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={profileData.cvPath}
                download="Dao-Nguyen-Nhat-Anh-Backend-Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label={isEn ? "Download Dao Nguyen Nhat Anh's CV in PDF format" : "Tải hồ sơ CV của Đào Nguyễn Nhật Anh định dạng PDF"}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? "Download CV (PDF)" : "Tải CV (PDF)"}</span>
              </a>

              <a
                href="#clothy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/60 hover:border-slate-500 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <span>{isEn ? "View Clothy Project" : "Xem dự án Clothy"}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Social Links & Direct Email */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
              <span className="text-xs text-slate-500 font-mono ml-2 hidden sm:inline">
                {profileData.email}
              </span>
            </div>
          </div>

          {/* Right Column (~40% desktop): System Spec Technical Card */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-indigo-950/20 overflow-hidden">
              {/* Terminal / Panel Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                  candidate-spec.json
                </span>
                <div className="w-10" aria-hidden="true" />
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Profile Header Row */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/60">
                  <img
                    src={avatarImg}
                    width="72"
                    height="72"
                    alt={isEn ? "Dao Nguyen Nhat Anh - Avatar" : "Đào Nguyễn Nhật Anh - Ảnh đại diện"}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border border-indigo-500/30 shadow-md"
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">
                      {isEn ? profileData.fullName.en : profileData.fullName.vi}
                    </div>
                    <div className="text-xs text-indigo-300 font-mono">
                      {profileData.studentStatus[isEn ? "en" : "vi"]}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {profileData.university.short} • GPA {profileData.gpa}
                    </div>
                  </div>
                </div>

                {/* JSON Spec Display */}
                <div 
                  className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/60 font-mono text-xs leading-relaxed space-y-1 text-slate-300 overflow-x-auto"
                  aria-label={isEn ? "Candidate specification summary" : "Thông số tóm tắt ứng viên"}
                >
                  <div>
                    <span className="text-slate-500">&#123;</span>
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-400">"focus"</span>:{" "}
                    <span className="text-emerald-300">"Java Backend"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-400">"education"</span>:{" "}
                    <span className="text-emerald-300">"HCMUTE (2023 - 2027)"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-400">"gpa"</span>:{" "}
                    <span className="text-amber-300">3.17</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-400">"primary_stack"</span>: [
                    <span className="text-indigo-300">"Java"</span>,{" "}
                    <span className="text-indigo-300">"Spring Boot"</span>,{" "}
                    <span className="text-indigo-300">"PostgreSQL"</span>],
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-400">"clothy.database"</span>:{" "}
                    <span className="text-emerald-300">"20+ entities"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-400">"clothy.query"</span>:{" "}
                    <span className="text-emerald-300">"JPA Specifications"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-cyan-400">"experience"</span>:{" "}
                    <span className="text-slate-300">"Test IO (Freelance Tester)"</span>
                  </div>
                  <div>
                    <span className="text-slate-500">&#125;</span>
                  </div>
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
