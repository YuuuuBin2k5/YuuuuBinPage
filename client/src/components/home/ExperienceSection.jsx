import React from "react";
import { Briefcase, CheckCircle2, Shield, Bug, Terminal, Globe } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { experienceData } from "../../data/experienceData";

const ExperienceSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  // Sourced from verified experienceData
  const exp = experienceData[0];
  if (!exp) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/90 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/3 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-500/30 text-blue-300 font-mono text-xs uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isEn ? "Work Experience & Quality Discipline" : "Kinh Nghiệm Thực Tế & Kỷ Luật Chất Lượng"}</span>
          </div>

          <h2
            id="experience-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
          >
            {isEn ? "Professional Experience" : "Kinh Nghiệm Làm Việc"}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {isEn
              ? "Hands-on software testing experience in structured international testing cycles, fostering defensive coding practices and attention to edge cases for backend engineering."
              : "Kinh nghiệm kiểm thử phần mềm trong các chu kỳ quốc tế có cấu trúc, rèn luyện tư duy lập trình phòng thủ và kiểm soát lỗi biên cho phát triển backend."}
          </p>
        </div>

        {/* Experience Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-8">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {exp.company}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  {exp.period}
                </span>
              </div>

              <div className="text-sm sm:text-base font-medium text-blue-400">
                {isEn ? exp.role.en : exp.role.vi}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Globe className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                <span>{isEn ? exp.engagementType.en : exp.engagementType.vi}</span>
              </div>
            </div>

            {/* Quality Badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono self-start sm:self-center">
              <Terminal className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              <span>{isEn ? "Transferable Mindset: Defensive Quality" : "Tư Duy Bổ Trợ: Chất Lượng Phòng Thủ"}</span>
            </div>
          </div>

          {/* Two-Column Grid: Execution Scope vs Transferable Backend Value */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Verified Execution Scope */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                <Bug className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <span>{isEn ? "Verified Execution Scope (CV)" : "Trách Nhiệm Thực Thi Đã Xác Minh (CV)"}</span>
              </div>

              <ul className="space-y-3">
                {(isEn ? exp.verifiedResponsibilities.en : exp.verifiedResponsibilities.vi).map(
                  (item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Column 2: Transferable Value to Backend Engineering */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                <Shield className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                <span>{isEn ? "Transferable Value to Backend" : "Giá Trị Bổ Trợ Cho Kỹ Thuật Backend"}</span>
              </div>

              <div className="space-y-3">
                {(isEn ? exp.transferableBackendValue.en : exp.transferableBackendValue.vi).map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="text-indigo-300 font-medium">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
