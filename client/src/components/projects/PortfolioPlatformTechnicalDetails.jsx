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
  ExternalLink,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const dockerFlow = [
  { step: "01", name: "Maven Build Stage", desc: { en: "Multi-stage Maven compilation and package step", vi: "Biên dịch và đóng gói Maven multi-stage" } },
  { step: "02", name: "Temurin 17 JRE", desc: { en: "Lightweight Eclipse Temurin Java 17 runtime", vi: "Runtime Eclipse Temurin Java 17 tinh gọn" } },
  { step: "03", name: "Alpine Runtime", desc: { en: "Minimal Alpine base image reducing attack surface", vi: "Base image Alpine tối giản bề mặt tấn công" } },
  { step: "04", name: "Non-Root User", desc: { en: "Least privilege execution under appuser", vi: "Thực thi với đặc quyền tối thiểu qua appuser" } },
  { step: "05", name: "Actuator Health Check", desc: { en: "Spring Boot Actuator /health probes", vi: "Đầu dò trạng thái Spring Boot Actuator /health" } },
  { step: "06", name: "Render Cloud Hosting", desc: { en: "Automated containerized deployment on Render", vi: "Triển khai container tự động trên Render" } },
];

const cacheGroups = ["projects", "weeks", "exercises"];

const PortfolioPlatformTechnicalDetails = ({ project }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!project) return null;
  const content = isEn ? project.i18n.en : project.i18n.vi;

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
          {isEn
            ? "The platform operates a standalone Spring Boot 3.2 server structured into standard Controller, Service, and Repository layers. HikariCP connection pooling and Spring Data JPA provide persistence operations against PostgreSQL."
            : "Hệ thống vận hành máy chủ Spring Boot 3.2 độc lập được tổ chức theo kiến trúc phân tầng chuẩn Controller, Service và Repository. HikariCP connection pool cùng Spring Data JPA đảm nhiệm các thao tác dữ liệu với PostgreSQL."}
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
            {isEn
              ? "PostgreSQL hosted on Supabase Cloud with JDBC configuration compatible with PgBouncer transaction pooling."
              : "Cơ sở dữ liệu PostgreSQL được lưu trữ trên nền tảng đám mây Supabase với cấu hình JDBC tương thích cơ chế pooling giao dịch của PgBouncer."}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 font-mono space-y-1">
            <span className="text-cyan-400 font-bold block">{isEn ? "Technical Note:" : "Ghi chú kỹ thuật:"}</span>
            <span>
              {isEn
                ? "Prepared-statement caching is disabled in JDBC configuration for transaction-pooler compatibility."
                : "Bộ đệm prepared-statement được vô hiệu hóa trong cấu hình JDBC để đảm bảo tương thích hoàn toàn với transaction pooler."}
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
          {isEn
            ? "To minimize redundant database round-trips for read-heavy portfolio resources, in-memory caching is implemented using Spring Cache integrated with Caffeine."
            : "Để giảm thiểu các truy vấn cơ sở dữ liệu dư thừa cho các tài nguyên đọc thường xuyên, hệ thống tích hợp bộ nhớ đệm in-memory thông qua Spring Cache và thư viện Caffeine."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-slate-400">{isEn ? "Cache Expiration (TTL)" : "Thời gian sống (TTL)"}</div>
            <div className="text-lg font-bold text-white font-mono">{isEn ? "5 Minutes" : "5 Phút"}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-slate-400">{isEn ? "Maximum Capacity" : "Dung lượng tối đa"}</div>
            <div className="text-lg font-bold text-white font-mono">{isEn ? "1,000 Items" : "1.000 Mục"}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-slate-400">{isEn ? "Active Cache Groups" : "Nhóm Cache"}</div>
            <div className="flex items-center gap-1.5 pt-1">
              {cacheGroups.map((grp) => (
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
          {isEn
            ? "Container packaging follows security and size minimization practices, splitting the build and runtime environments."
            : "Đóng gói container tuân thủ các quy tắc bảo mật và tối ưu kích thước, phân tách môi trường build và runtime."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dockerFlow.map((step) => (
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
              {isEn
                ? "Backend container hosted on Render connected to Supabase PostgreSQL. Static frontend build deployed globally on Vercel."
                : "Container backend được lưu trữ trên Render kết nối PostgreSQL Supabase. Bản build frontend tĩnh được phân phối trên Vercel."}
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
              {isEn
                ? "React 19, Vite, Tailwind CSS, EmailJS integration, and bilingual Vietnamese/English localization."
                : "React 19, Vite, Tailwind CSS, tích hợp EmailJS và hỗ trợ đa ngôn ngữ Tiếng Việt/Tiếng Anh."}
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
