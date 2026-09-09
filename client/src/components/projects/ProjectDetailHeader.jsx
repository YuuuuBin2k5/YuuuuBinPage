import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, Terminal } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const ProjectDetailHeader = ({ project }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!project) return null;

  const content = isEn ? project.i18n.en : project.i18n.vi;
  const isFlagship = project.slug === "clothy-ecommerce";

  return (
    <header className="space-y-6 pb-8 border-b border-slate-800/80">
      {/* Back Link */}
      <div>
        <Link
          to="/myproject"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors focus:outline-none focus:underline"
          aria-label={isEn ? "Back to engineering projects catalog" : "Quay lại danh sách dự án kỹ thuật"}
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isEn ? "Back to Projects Catalog" : "Quay Lại Danh Sách Dự Án"}</span>
        </Link>
      </div>

      {/* Main Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          {isFlagship ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              {isEn ? "Flagship Backend Project" : "Dự Án Backend Tiêu Biểu"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-800 border border-slate-700 text-slate-300">
              <Terminal className="w-3 h-3 text-blue-400" aria-hidden="true" />
              {isEn ? "Secondary Backend Architecture" : "Kiến Trúc Backend Thứ Hai"}
            </span>
          )}

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span>{project.period}</span>
          </div>

          <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/20">
            {content.role}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          {content.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
          {content.subtitle || content.summary}
        </p>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 pt-2 flex-wrap">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label={isEn ? "View source repository on GitHub" : "Xem mã nguồn dự án trên GitHub"}
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "Source Repository" : "Mã Nguồn (GitHub)"}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label={
                isFlagship
                  ? (isEn ? "Watch Clothy video demonstration on YouTube" : "Xem video demo Clothy trên YouTube")
                  : (isEn ? "Open live portfolio platform" : "Mở hệ thống portfolio trực tiếp")
              }
            >
              <span>
                {isFlagship
                  ? (isEn ? "Watch Video Demo" : "Xem Video Demo (YouTube)")
                  : (isEn ? "Live System" : "Trang Web Trực Tiếp")}
              </span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProjectDetailHeader;
