import React from "react";
import {
  Server,
  Database,
  Layers,
  ExternalLink,
  Github,
  Zap,
  CheckCircle2,
  Box,
  Cloud
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { projectsData } from "../../data/projectsData";

const metricIcons = {
  0: Zap,
  1: Database,
  2: Box,
  3: Cloud,
};

const SecondaryProjects = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const project = projectsData.find((p) => p.slug === "portfolio-platform");
  if (!project) return null;

  const content = isEn ? project.i18n.en : project.i18n.vi;

  return (
    <section
      id="secondary-projects"
      aria-labelledby="secondary-projects-title"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/80 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="scroll-reveal space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono text-xs uppercase tracking-wider">
            <Server className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>{isEn ? "Secondary Backend Architecture" : "Kiến Trúc Backend Thứ Hai"}</span>
          </div>

          <h2
            id="secondary-projects-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
          >
            {content.title}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {content.subtitle}
          </p>
        </div>

        {/* Project Card */}
        <div className="scroll-reveal delay-100 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-8">
          {/* Card Top: Title, Role & Links */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-lg font-bold text-white tracking-tight">
                  {content.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-500/30 text-blue-300">
                  {content.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300">
                  {project.period}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                {content.summary}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium border border-slate-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isEn ? "Source Code" : "Mã Nguồn"}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-mono font-medium border border-blue-500/30 transition-colors"
                >
                  <span>{isEn ? "Live System" : "Trang Web Trực Tiếp"}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Key Metrics / Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.keyMetrics.map((metric, idx) => {
              const MetricIcon = metricIcons[idx] || Layers;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <MetricIcon className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                    <span>{isEn ? metric.label.en : metric.label.vi}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white font-mono">
                    {metric.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Engineering Implementation Scope */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              {isEn ? "Verified Backend Implementations" : "Hạng Mục Kỹ Thuật Đã Thực Hiện"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs sm:text-sm text-slate-300 leading-relaxed"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="text-xs font-mono text-slate-400">
              {isEn ? "Technology Stack:" : "Ngăn xếp công nghệ:"}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.backend.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-950/50 border border-blue-500/20 text-blue-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.database.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-950/50 border border-indigo-500/20 text-indigo-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.devops.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-950/50 border border-emerald-500/20 text-emerald-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.frontend.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700/60 text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondaryProjects;
