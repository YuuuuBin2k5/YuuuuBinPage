import React from "react";
import {
  Server,
  Database,
  Zap,
  Box,
  Cloud,
  Layout,
  CheckCircle2,
  Github,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const PortfolioPlatformTechnicalDetails = ({ project }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!project || !project.technicalDetails) return null;
  const content = isEn ? project.i18n.en : project.i18n.vi;
  const details = project.technicalDetails;

  return (
    <div className="space-y-12">
      {/* 1. Backend Architecture */}
      <section aria-labelledby="portfolio-backend-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
          <Server className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Backend Architecture" : "Kiến Trúc Backend"}</span>
        </div>

        <h2 id="portfolio-backend-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "Spring Boot 3.2 & Layered REST API Services" : "Spring Boot 3.2 & Kiến Trúc Phân Tầng REST API"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {isEn ? details.backendArchitecture.description.en : details.backendArchitecture.description.vi}
        </p>
      </section>

      {/* 2. PostgreSQL / Supabase Connectivity */}
      <section aria-labelledby="portfolio-db-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Database className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Database Connectivity" : "Kết Nối Cơ Sở Dữ Liệu"}</span>
        </div>

        <h2 id="portfolio-db-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "Supabase Cloud PostgreSQL & PgBouncer Compatibility" : "PostgreSQL Supabase Cloud & Tương Thích PgBouncer"}
        </h2>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            {isEn ? details.databaseConnectivity.description.en : details.databaseConnectivity.description.vi}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 font-mono space-y-1">
            <span className="text-cyan-400 font-bold block">{isEn ? "Technical Note:" : "Ghi chú kỹ thuật:"}</span>
            <span>
              {isEn ? details.databaseConnectivity.technicalNote.en : details.databaseConnectivity.technicalNote.vi}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Application-Level In-Memory Caching */}
      <section aria-labelledby="portfolio-cache-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <Zap className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Application Caching" : "Bộ Nhớ Đệm Ứng Dụng"}</span>
        </div>

        <h2 id="portfolio-cache-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "Application-Level In-Memory Caching (Spring Cache + Caffeine)" : "Bộ Nhớ Đệm Ứng Dụng In-Memory (Spring Cache + Caffeine)"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {isEn ? details.caching.description.en : details.caching.description.vi}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-slate-400">{isEn ? "Cache Expiration (TTL)" : "Thời gian sống (TTL)"}</div>
            <div className="text-lg font-bold text-white font-mono">{isEn ? details.caching.ttl.en : details.caching.ttl.vi}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-slate-400">{isEn ? "Maximum Capacity" : "Dung lượng tối đa"}</div>
            <div className="text-lg font-bold text-white font-mono">{details.caching.maxSize} {isEn ? "Items" : "Mục"}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-slate-400">{isEn ? "Active Cache Groups" : "Nhóm Cache"}</div>
            <div className="flex items-center gap-1.5 pt-1">
              {details.caching.groups.map((grp) => (
                <span key={grp} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 border border-slate-800 text-amber-300">
                  {grp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Multi-Stage Docker Packaging & Deployment Flow */}
      <section aria-labelledby="portfolio-docker-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          <Box className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Container Packaging" : "Đóng Gói Container"}</span>
        </div>

        <h2 id="portfolio-docker-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "Multi-Stage Docker Packaging Flow" : "Quy Trình Đóng Gói Docker Multi-Stage"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {isEn ? details.dockerPackaging.summary.en : details.dockerPackaging.summary.vi}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {details.dockerPackaging.flow.map((step) => (
            <div
              key={step.step}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">{step.step}</span>
                <span className="text-xs font-mono font-bold text-white truncate">{step.name}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isEn ? step.desc.en : step.desc.vi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Cloud Deployment & Supporting Frontend */}
      <section aria-labelledby="portfolio-deploy-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          <Cloud className="w-4 h-4 text-blue-400" aria-hidden="true" />
          <span>{isEn ? "Deployment & Supporting Client" : "Triển Khai & Giao Diện Bổ Trợ"}</span>
        </div>

        <h2 id="portfolio-deploy-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "Decoupled Hosting & Supporting Client-Side Interface" : "Lưu Trữ Tách Biệt & Giao Diện Client Bổ Trợ"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span>{isEn ? "Decoupled Cloud Hosting" : "Lưu Trữ Đám Mây Tách Biệt"}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn ? details.hostingAndClient.backend.en : details.hostingAndClient.backend.vi}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn ? details.hostingAndClient.frontend.en : details.hostingAndClient.frontend.vi}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Layout className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>{isEn ? "Supporting Frontend" : "Giao Diện Bổ Trợ"}</span>
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {isEn ? "Secondary" : "Bổ trợ"}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn ? details.hostingAndClient.clientDetails.en : details.hostingAndClient.clientDetails.vi}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Verified Responsibilities */}
      <section aria-labelledby="portfolio-resp-heading" className="space-y-4">
        <h2 id="portfolio-resp-heading" className="text-base font-mono font-bold text-slate-300 uppercase tracking-wider">
          {isEn ? "Verified Implementation Responsibilities" : "Hạng Mục Kỹ Thuật Đã Thực Hiện"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.responsibilities.map((resp, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{resp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. External Technical Evidence Links */}
      <section aria-labelledby="portfolio-evidence-heading" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 id="portfolio-evidence-heading" className="text-sm font-mono font-bold text-white uppercase tracking-wider">
          {isEn ? "Technical Evidence & Artifacts" : "Bằng Chứng Kỹ Thuật & Tài Liệu"}
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={isEn ? "View repository on GitHub" : "Xem mã nguồn dự án trên GitHub"}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? "Inspect GitHub Repository" : "Kiểm Tra Mã Nguồn GitHub"}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={isEn ? "Open live platform" : "Mở hệ thống trực tiếp"}
          >
            <span>{isEn ? "Open Live Platform" : "Xem Trang Web Trực Tiếp"}</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPlatformTechnicalDetails;
