import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowRight,
  Terminal,
  Cpu,
  Server,
  Code2,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { projectsData } from "../../data/projectsData";
import { startSafeViewTransition } from "../../utils/viewTransition";

const FlagshipProject = ({ project }) => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const navigate = useNavigate();

  const [activeFlowStep, setActiveFlowStep] = useState(0);

  // Sourced from centralized verified projectsData if not passed as prop
  const clothy = project || projectsData.find((p) => p.slug === "clothy-ecommerce") || projectsData[0];
  const content = clothy?.i18n ? (isEn ? clothy.i18n.en : clothy.i18n.vi) : {};

  // Verified Clothy request flow (safe conceptual stages based on verified evidence)
  const filterFlowSteps = [
    {
      id: "rest-api",
      step: "01",
      layer: "REST API",
      domain: isEn ? "Product Domain" : "Phân hệ Sản phẩm",
      tech: "REST API",
      description: isEn
        ? "REST APIs for the Product domain."
        : "REST APIs cho phân hệ Sản phẩm.",
      responsibility: isEn
        ? "Implemented REST APIs for the Product domain."
        : "Triển khai REST APIs cho phân hệ Sản phẩm.",
      icon: Terminal,
    },
    {
      id: "product-filtering",
      step: "02",
      layer: isEn ? "PRODUCT FILTERING" : "LỌC SẢN PHẨM",
      domain: isEn ? "Product Filtering" : "Lọc sản phẩm",
      tech: "Spring Boot",
      description: isEn
        ? "Processing logic for product filtering."
        : "Xử lý logic lọc sản phẩm.",
      responsibility: isEn
        ? "Implemented product filtering logic."
        : "Triển khai logic lọc sản phẩm.",
      icon: Server,
    },
    {
      id: "jpa-spec",
      step: "03",
      layer: "JPA SPECIFICATIONS",
      domain: isEn ? "Dynamic Multi-Criteria Filtering" : "Lọc đa tiêu chí động",
      tech: "Spring Data JPA Specifications",
      description: isEn
        ? "Dynamic multi-criteria filtering using Spring Data JPA Specifications."
        : "Lọc đa tiêu chí động sử dụng Spring Data JPA Specifications.",
      responsibility: isEn
        ? "Implemented dynamic product filtering using Spring Data JPA Specifications."
        : "Triển khai lọc sản phẩm động sử dụng Spring Data JPA Specifications.",
      icon: Cpu,
    },
    {
      id: "jpa-hibernate",
      step: "04",
      layer: "JPA / HIBERNATE",
      domain: isEn ? "Entity Relationships & Persistence" : "Quan hệ thực thể & Lưu trữ",
      tech: "Spring Data JPA / Hibernate",
      description: isEn
        ? "Entity relationships and persistence using JPA / Hibernate."
        : "Quan hệ thực thể và lưu trữ sử dụng JPA / Hibernate.",
      responsibility: isEn
        ? "Worked with entity relationships using JPA / Hibernate."
        : "Làm việc với các quan hệ thực thể sử dụng JPA / Hibernate.",
      icon: Code2,
    },
    {
      id: "postgresql",
      step: "05",
      layer: "POSTGRESQL",
      domain: isEn ? "20+ Project Entities" : "20+ Thực thể dự án",
      tech: "PostgreSQL",
      description: isEn
        ? "PostgreSQL database containing 20+ project entities."
        : "Cơ sở dữ liệu PostgreSQL gồm hơn 20 thực thể dự án.",
      responsibility: isEn
        ? "Worked with a PostgreSQL model containing 20+ project entities."
        : "Làm việc với mô hình PostgreSQL gồm hơn 20 thực thể dự án.",
      icon: Database,
    },
  ];

  const handleCaseStudyNavigation = (e) => {
    e.preventDefault();
    startSafeViewTransition(() => {
      navigate(`/projects/${clothy.slug}`);
    });
  };

  return (
    <section
      id="clothy"
      aria-labelledby="flagship-clothy-title"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090d14] border-t border-slate-800/80 overflow-hidden text-slate-100"
    >
      {/* Precision Engineering Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        
        {/* ============================================================
            1. TOP STORYTELLING HIERARCHY (Precision Editorial Style)
            ============================================================ */}
        <div className="scroll-reveal space-y-6 text-left max-w-5xl">
          {/* Eyebrow Index */}
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 uppercase tracking-wider">
            <span className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/30 font-semibold">
              01 // FLAGSHIP SYSTEM
            </span>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span className="text-slate-400">
              {isEn ? "CORE BACKEND ARCHITECTURE" : "KIẾN TRÚC BACKEND TRỌNG TÂM"}
            </span>
          </div>

          {/* Editorial Title Block */}
          <div className="space-y-1">
            <h2
              id="flagship-clothy-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.05]"
            >
              CLOTHY
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300 font-mono tracking-normal normal-case pt-2">
                {isEn ? "E-Commerce Backend System" : "Hệ Thống Backend Thương Mại Điện Tử"}
              </span>
            </h2>

            {/* Candidate Role & Metadata */}
            <div className="flex flex-wrap items-center gap-3 pt-3 text-xs sm:text-sm font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-semibold">
                {content.role || clothy.role}
              </span>
              <span className="text-slate-600" aria-hidden="true">•</span>
              <span>{clothy.period}</span>
              <span className="text-slate-600" aria-hidden="true">•</span>
              <span className="text-emerald-400 font-medium">
                {isEn ? "Production Model Architecture" : "Mô Hình Dữ Liệu Thực Tế"}
              </span>
            </div>
          </div>

          {/* Narrative Summary */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl border-l-2 border-indigo-500/60 pl-4 py-1">
            {content.summary || clothy.description}
          </p>
        </div>

        {/* ============================================================
            2. SPATIAL TYPOGRAPHY & TECHNICAL TELEMETRY BAND
            (Verified facts only, open columns with hairline dividers)
            ============================================================ */}
        <div className="scroll-reveal delay-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 p-6 rounded-xl bg-slate-950 border border-slate-800/80 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          
          {/* Column 1: Database Scale */}
          <div className="lg:px-6 py-2 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-[11px] font-mono uppercase tracking-wider">
              <Database className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "POSTGRESQL ENTITIES" : "THỰC THỂ POSTGRESQL"}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
              20+
            </div>
            <div className="text-xs font-mono text-slate-300">
              {isEn ? "Relational Data Model" : "Mô hình dữ liệu quan hệ"}
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              {isEn
                ? "Database schema supporting core e-commerce workflows."
                : "Lược đồ cơ sở dữ liệu quan hệ cho hệ thống e-commerce."}
            </p>
          </div>

          {/* Column 2: REST Scope */}
          <div className="lg:px-6 py-2 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-mono uppercase tracking-wider">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "REST API DOMAINS" : "PHÂN HỆ REST API"}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-indigo-400 tracking-tight">
              5
            </div>
            <div className="text-xs font-mono text-slate-300">
              {isEn ? "Core API Modules" : "Phân hệ API cốt lõi"}
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Product • Category • Inventory • Order • Review
            </p>
          </div>

          {/* Column 3: Query Architecture */}
          <div className="lg:px-6 py-2 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-mono uppercase tracking-wider">
              <Filter className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "DYNAMIC FILTERING" : "BỘ LỌC ĐA TIÊU CHÍ"}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300 tracking-tight pt-1.5">
              JPA Specs
            </div>
            <div className="text-xs font-mono text-slate-300">
              {isEn ? "Spring Data JPA Specifications" : "Spring Data JPA Specifications"}
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              {isEn
                ? "Multi-criteria product search without brittle static queries."
                : "Tìm kiếm sản phẩm đa tiêu chí bằng JPA Specifications."}
            </p>
          </div>

          {/* Column 4: Variant Model */}
          <div className="lg:px-6 py-2 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-[11px] font-mono uppercase tracking-wider">
              <Boxes className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "PRODUCT VARIANTS" : "BIẾN THỂ SẢN PHẨM"}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 tracking-tight pt-1.5">
              SKU / Stock
            </div>
            <div className="text-xs font-mono text-slate-300">
              {isEn ? "Variant Attributes & Stock" : "Thuộc tính & Tồn kho"}
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              {isEn
                ? "Size, color, SKU management with inventory tracking."
                : "Thuộc tính kích cỡ, màu sắc, mã SKU và theo dõi tồn kho."}
            </p>
          </div>

        </div>

        {/* ============================================================
            3. CLOTHY TECHNICAL REQUEST-FLOW VISUALIZATION
            (Safe conceptual stages: REST API -> Application Logic -> JPA Specs -> ORM -> PostgreSQL)
            ============================================================ */}
        <div className="scroll-reveal delay-150 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60 gap-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-400" aria-hidden="true" />
              <span className="font-semibold text-slate-200 uppercase tracking-wider">
                {isEn
                  ? "CLOTHY_FILTER_FLOW // REQUEST FLOW"
                  : "LUỒNG XỬ LÝ CLOTHY // QUY TRÌNH LỌC SẢN PHẨM"}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {isEn ? "Verified Request Flow" : "Luồng xử lý xác thực"}
            </span>
          </div>

          {/* Interactive Step Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-slate-800 bg-slate-950/80 font-mono text-xs divide-x divide-slate-800">
            {filterFlowSteps.map((s, idx) => {
              const isSelected = activeFlowStep === idx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveFlowStep(idx)}
                  className={`p-3 text-left transition-colors flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
                    isSelected
                      ? "bg-indigo-950/40 text-white font-semibold border-b-2 border-b-indigo-400"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                  }`}
                  aria-label={`${s.layer} details`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[10px] text-indigo-400 font-bold">{s.step}</span>
                    <span className="text-[11px] truncate">{s.layer}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Visual Details (Safe factual descriptions without pseudo-code) */}
          <div className="p-6 bg-slate-950 font-mono text-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-900">
              <div className="flex items-center gap-2 text-indigo-300">
                <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-[10px] font-bold">
                  STEP {filterFlowSteps[activeFlowStep].step}
                </span>
                <span className="text-sm font-bold text-white tracking-wide">
                  {filterFlowSteps[activeFlowStep].layer}
                </span>
              </div>
              <span className="text-[11px] text-emerald-400">
                {filterFlowSteps[activeFlowStep].tech}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                  {isEn ? "Functional Area:" : "Phân Vùng Chức Năng:"}
                </span>
                <span className="text-emerald-300 font-semibold">{filterFlowSteps[activeFlowStep].domain}</span>
              </div>
              <div className="text-[11px] text-indigo-300 font-mono">
                {filterFlowSteps[activeFlowStep].responsibility}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {filterFlowSteps[activeFlowStep].description}
            </p>
          </div>
        </div>

        {/* ============================================================
            4. CORE ARCHITECTURE & DETAILS GRID
            ============================================================ */}
        <div className="scroll-reveal delay-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7 cols): Tech Stack, API Scope & Backend Responsibilities */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Backend Tech Stack Badges */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
                {isEn ? "Verified Backend Stack" : "Công Nghệ Backend Xác Thực"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "PostgreSQL"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-slate-900 text-indigo-300 border border-slate-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* REST API Domains */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
                {isEn ? "5 Core REST API Domains" : "5 Phân Hệ REST API Cốt Lõi"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {["Product", "Category", "Inventory", "Order", "Review"].map((domain) => (
                  <div
                    key={domain}
                    className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                    <span>{domain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Responsibilities */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
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
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Product Variant Model Structure */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Boxes className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>{isEn ? "Product Variant Model" : "Mô Hình Biến Thể Sản Phẩm"}</span>
              </h3>

              <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="p-2 rounded bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 font-semibold text-center">
                  Product (Base Attributes)
                </div>
                <div className="text-center text-slate-500" aria-hidden="true">↓ 1:N Relation</div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="text-amber-300 font-semibold">Product Variant & Inventory</div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-400 pt-1">
                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">SKU Code</span>
                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Size (S, M, L)</span>
                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Color Variant</span>
                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Stock Units</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Filtering Specification */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>
                  {isEn
                    ? "Dynamic Multi-Criteria Filtering with JPA Specifications"
                    : "Lọc Đa Tiêu Chí Động với JPA Specifications"}
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? "Dynamic multi-criteria product filtering implemented using Spring Data JPA Specifications, enabling flexible multi-parameter querying."
                  : "Triển khai bộ lọc sản phẩm động đa tiêu chí thông qua Spring Data JPA Specifications, cho phép kết hợp linh hoạt nhiều tham số truy vấn."}
              </p>
            </div>

            {/* Administration & Analytics */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
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

        {/* ============================================================
            5. TECHNICAL EVIDENCE CTAs (With Precision Motion Feedback)
            ============================================================ */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href={clothy.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-precision inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 hover:border-slate-700 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={isEn ? "View Clothy backend source code on GitHub" : "Xem mã nguồn backend Clothy trên GitHub"}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? "View Backend Source" : "Mã Nguồn Backend (GitHub)"}</span>
          </a>

          <a
            href={clothy.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-precision inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-950/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={isEn ? "Watch Clothy video demonstration on YouTube" : "Xem video demo Clothy trên YouTube"}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? "Watch Demonstration Video" : "Xem Video Demo (YouTube)"}</span>
          </a>

          <a
            href={`/projects/${clothy.slug}`}
            onClick={handleCaseStudyNavigation}
            className="btn-precision inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-indigo-500/60 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <span>{isEn ? "Read Detailed Case Study" : "Đọc Hồ Sơ Kỹ Thuật Chi Tiết"}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FlagshipProject;

