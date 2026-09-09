import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Server,
  Layers,
  Database,
  ShieldCheck,
  Cpu,
  Boxes
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { labSummaryData } from "../../data/labSummaryData";

const topicIcons = {
  servlet: Server,
  "mvc-jsp": Layers,
  state: ShieldCheck,
  jdbc: Database,
  jpa: Boxes,
  tomcat: Cpu,
};

const LabSummarySection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section
      id="engineering-lab"
      aria-labelledby="engineering-lab-title"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/80 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="space-y-2.5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono text-xs uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>{isEn ? labSummaryData.badge.en : labSummaryData.badge.vi}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
            <h2
              id="engineering-lab-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            >
              {isEn ? labSummaryData.title.en : labSummaryData.title.vi}
            </h2>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-blue-300 font-bold">
                {labSummaryData.totalModules} {isEn ? "Curriculum Modules" : "Chương Thực Hành"}
              </span>
              <span>{labSummaryData.chapterCoverage}</span>
            </div>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {isEn ? labSummaryData.summary.en : labSummaryData.summary.vi}
          </p>
        </div>

        {/* Representative Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {labSummaryData.representativeTopics.map((topic) => {
            const Icon = topicIcons[topic.id] || Server;
            return (
              <div
                key={topic.name}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start gap-3.5"
              >
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-blue-400 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-white font-mono">
                    {topic.name}
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {isEn ? topic.desc.en : topic.desc.vi}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Rationale & CTA Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              {isEn ? "Academic Foundation Value" : "Giá Trị Nền Tảng Học Thuật"}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {isEn ? labSummaryData.strategicRationale.en : labSummaryData.strategicRationale.vi}
            </p>
          </div>

          <Link
            to={labSummaryData.labRoute || "/baitap"}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0"
            aria-label={
              isEn
                ? "Navigate to full Engineering Lab curriculum and coursework on /baitap"
                : "Xem toàn bộ giáo trình và bài tập thực hành trên trang /baitap"
            }
          >
            <span>{isEn ? "Explore Engineering Lab" : "Xem Chi Tiết Lab Kỹ Thuật"}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LabSummarySection;
