import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  ExternalLink,
  ArrowRight,
  Database,
  Server,
  Layers,
  Zap,
  Box,
  Cloud,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const metricIconMap = {
  "Database Scale": Database,
  "Quy mô cơ sở dữ liệu": Database,
  "Dynamic Querying": Layers,
  "Công nghệ truy vấn động": Layers,
  "Variant Attributes": Layers,
  "Mô hình biến thể": Layers,
  "REST API Domains": Server,
  "Phạm vi REST APIs": Server,
  "In-Memory Cache": Zap,
  "Bộ nhớ đệm": Zap,
  "Database Host": Database,
  "Cơ sở dữ liệu": Database,
  "Container Build": Box,
  "Đóng gói container": Box,
  Deployment: Cloud,
  "Triển khai": Cloud,
};

const ProjectCaseStudyCard = ({ project }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!project) return null;

  const content = isEn ? project.i18n.en : project.i18n.vi;
  const isFlagship = project.slug === "clothy-ecommerce";

  return (
    <article
      className={`rounded-2xl transition-all duration-200 overflow-hidden ${
        isFlagship
          ? "bg-slate-900/90 border-2 border-indigo-500/40 shadow-xl shadow-indigo-950/20"
          : "bg-slate-900/70 border border-slate-800 hover:border-slate-700 shadow-lg"
      }`}
    >
      <div className="p-6 sm:p-8 space-y-6">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              {isFlagship ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                  {isEn ? "Flagship Backend Project" : "Dự Án Backend Tiêu Biểu"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-800 border border-slate-700 text-slate-300">
                  <Server className="w-3 h-3 text-blue-400" aria-hidden="true" />
                  {isEn ? "Secondary Backend Architecture" : "Kiến Trúc Backend Thứ Hai"}
                </span>
              )}
              <span className="text-xs font-mono text-slate-400">
                {project.period}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {content.title}
            </h2>

            <div className="text-xs sm:text-sm font-medium text-indigo-400 font-mono">
              {content.role}
            </div>
          </div>

          {/* Direct Code / Demo Links */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label={isEn ? `View ${content.title} source code on GitHub` : `Xem mã nguồn ${content.title} trên GitHub`}
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label={isEn ? `View ${content.title} demonstration` : `Xem demo ${content.title}`}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {content.summary}
        </p>

        {/* Evidence Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {project.keyMetrics.map((metric, idx) => {
            const labelStr = isEn ? metric.label.en : metric.label.vi;
            const MetricIcon = metricIconMap[labelStr] || Layers;

            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MetricIcon className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="truncate">{labelStr}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                  {metric.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Tech Stack */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            {isEn ? "Core Verified Technologies" : "Công Nghệ Cốt Lõi Đã Xác Thực"}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.backend.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-950/60 border border-indigo-500/30 text-indigo-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.database.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.devops?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.frontend?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: CTA Action */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>{isEn ? "Verified project evidence" : "Bằng chứng dự án đã đối soát"}</span>
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
              isFlagship
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 focus:ring-indigo-400"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:ring-blue-400"
            }`}
            aria-label={
              isEn
                ? `View in-depth engineering case study for ${content.title}`
                : `Xem hồ sơ kỹ thuật chi tiết của ${content.title}`
            }
          >
            <span>{isEn ? "View Engineering Case Study" : "Xem Hồ Sơ Kỹ Thuật Chi Tiết"}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCaseStudyCard;
