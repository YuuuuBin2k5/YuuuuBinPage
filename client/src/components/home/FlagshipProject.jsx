import React from "react";
import {
  Github,
  ExternalLink,
  Database,
  Layers,
  CheckCircle2,
  Filter,
  Shield,
  BarChart3,
  Boxes,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { projectsData } from "../../data/projectsData";

const FlagshipProject = ({ project }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  // Sourced from centralized verified projectsData if not passed as prop
  const clothy = project || projectsData.find((p) => p.slug === "clothy-ecommerce") || projectsData[0];
  const content = clothy?.i18n ? (isEn ? clothy.i18n.en : clothy.i18n.vi) : {};

  return (
    <section
      id="clothy"
      aria-labelledby="flagship-clothy-title"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/80 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Subtle Static Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-400" aria-hidden="true" />
            <span>{isEn ? "Featured Backend Project" : "Dự Án Backend Tiêu Biểu"}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
            <h2
              id="flagship-clothy-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            >
              {content.title || clothy.title}
            </h2>
            <div className="text-sm font-mono text-slate-400">
              <span className="text-indigo-300 font-semibold">{content.role || clothy.role}</span>
              <span className="mx-2 text-slate-600" aria-hidden="true">•</span>
              <span>{clothy.period}</span>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {content.summary || clothy.description}
          </p>
        </div>

        {/* Technical Metrics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono">
              <Database className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "Database Scale" : "Quy mô DB"}</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">20+</div>
            <div className="text-xs text-slate-400">
              {isEn ? "PostgreSQL Entities" : "Thực thể PostgreSQL"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Filter className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "Dynamic Query" : "Truy vấn động"}</span>
            </div>
            <div className="text-xl font-bold text-white font-mono tracking-tight">JPA Specs</div>
            <div className="text-xs text-slate-400">
              {isEn ? "Multi-criteria filtering" : "Bộ lọc đa tiêu chí động"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "REST API Scope" : "Phạm vi REST API"}</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">5</div>
            <div className="text-xs text-slate-400">
              {isEn ? "Core API Domains" : "Phân hệ API cốt lõi"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
              <Boxes className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "Variant Model" : "Mô hình biến thể"}</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">SKU / Stock</div>
            <div className="text-xs text-slate-400">
              {isEn ? "Size, Color, Inventory" : "Size, Màu sắc, Tồn kho"}
            </div>
          </div>
        </div>

        {/* Core Architecture & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7 cols): Tech Stack, API Scope & Backend Responsibilities */}
          <div className="lg:col-span-7 space-y-6">
            {/* Backend Tech Stack Badges */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
                {isEn ? "Verified Backend Stack" : "Công Nghệ Backend Xác Thực"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "PostgreSQL"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-indigo-300 border border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* REST API Domains */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
                {isEn ? "5 Core REST API Domains" : "5 Phân Hệ REST API Cốt Lõi"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {["Product", "Category", "Inventory", "Order", "Review"].map((domain) => (
                  <div
                    key={domain}
                    className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2 text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                    <span>{domain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Responsibilities */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
                {isEn ? "Backend Responsibilities" : "Trách Nhiệm Kỹ Thuật Backend"}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {content.responsibilities?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (5 cols): Variant Model, Dynamic Filtering & Operations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Product Variant Model Structure */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Boxes className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>{isEn ? "Product Variant Model" : "Mô Hình Biến Thể Sản Phẩm"}</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="p-2 rounded bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 font-semibold text-center">
                  Product
                </div>
                <div className="text-center text-slate-500" aria-hidden="true">↓</div>
                <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-amber-300 font-semibold">Product Variant</div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-400 pt-1">
                    <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">SKU</span>
                    <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">Size</span>
                    <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">Color</span>
                    <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">Stock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Filtering Specification */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>
                  {isEn
                    ? "Dynamic Multi-Criteria Filtering with Spring Data JPA Specifications"
                    : "Lọc Đa Tiêu Chí Động với Spring Data JPA Specifications"}
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? "Dynamic multi-criteria product filtering implemented using Spring Data JPA Specifications, enabling flexible multi-parameter querying."
                  : "Triển khai bộ lọc sản phẩm động đa tiêu chí thông qua Spring Data JPA Specifications, cho phép kết hợp linh hoạt nhiều tham số truy vấn."}
              </p>
            </div>

            {/* Administration & Analytics */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>{isEn ? "Operations & Reporting" : "Quản Trị & Báo Cáo"}</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span>{isEn ? "Automated Review Moderation" : "Tự động kiểm duyệt đánh giá"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span>{isEn ? "Role-Based Administration" : "Phân quyền quản trị theo vai trò"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>{isEn ? "Revenue tracking & Bestseller reporting" : "Theo dõi doanh thu & Thống kê sản phẩm bán chạy"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Evidence CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href={clothy.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-500 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={isEn ? "View Clothy backend source code on GitHub" : "Xem mã nguồn backend Clothy trên GitHub"}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? "View Backend Source" : "Mã Nguồn Backend (GitHub)"}</span>
          </a>

          <a
            href={clothy.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={isEn ? "Watch Clothy video demonstration on YouTube" : "Xem video demo Clothy trên YouTube"}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? "Watch Demonstration Video" : "Xem Video Demo (YouTube)"}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FlagshipProject;

