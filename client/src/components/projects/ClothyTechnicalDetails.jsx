import React from "react";
import {
  Database,
  Layers,
  Filter,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  Boxes,
  Github,
  ExternalLink,
  Server
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const domains = [
  { name: "Product", desc: { en: "Product catalog and metadata management", vi: "Quản lý danh mục và thông tin sản phẩm" } },
  { name: "Category", desc: { en: "Hierarchical category classification", vi: "Phân loại danh mục đa cấp" } },
  { name: "Inventory", desc: { en: "Stock tracking and variant inventory control", vi: "Kiểm soát tồn kho và biến thể sản phẩm" } },
  { name: "Order", desc: { en: "Order processing and order item records", vi: "Xử lý đơn hàng và chi tiết mục hàng" } },
  { name: "Review", desc: { en: "Customer feedback and automated moderation", vi: "Phản hồi khách hàng và kiểm duyệt tự động" } },
];

const ClothyTechnicalDetails = ({ project }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!project) return null;
  const content = isEn ? project.i18n.en : project.i18n.vi;

  return (
    <div className="space-y-12">
      {/* 1. Database Scope & Schema Modeling */}
      <section aria-labelledby="clothy-db-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
          <Database className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Relational Data Modeling" : "Mô Hình Dữ Liệu Quan Hệ"}</span>
        </div>

        <h2 id="clothy-db-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "PostgreSQL Schema & Persistence Scope" : "Quy Mô Schema PostgreSQL & Tầng Persistence"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {isEn
            ? "The platform manages over 20 relational entities in PostgreSQL, mapped via Spring Data JPA and Hibernate. Relational constraints and foreign keys maintain strict referential integrity across the catalog, order history, and inventory domains."
            : "Hệ thống quản lý hơn 20 thực thể quan hệ trên PostgreSQL, được ánh xạ thông qua Spring Data JPA và Hibernate. Các ràng buộc quan hệ và khóa ngoại đảm bảo tính toàn vẹn tham chiếu chặt chẽ trên toàn bộ danh mục sản phẩm, đơn hàng và tồn kho."}
        </p>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            {isEn ? "Persistence Scope Representation" : "Phạm Vi Tầng Dữ Liệu"}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-xl font-bold text-indigo-400 block">20+</span>
              <span className="text-slate-400">{isEn ? "PostgreSQL Entities" : "Thực thể PostgreSQL"}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-xl font-bold text-cyan-400 block">ORM</span>
              <span className="text-slate-400">Spring Data JPA</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-xl font-bold text-emerald-400 block">JPA</span>
              <span className="text-slate-400">Specifications</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-xl font-bold text-amber-400 block">RDBMS</span>
              <span className="text-slate-400">PostgreSQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core REST API Domains */}
      <section aria-labelledby="clothy-api-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Server className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "REST API Architecture" : "Kiến Trúc REST API"}</span>
        </div>

        <h2 id="clothy-api-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "5 Core REST API Domains" : "5 Phân Hệ REST API Cốt Lõi"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {isEn
            ? "Server endpoints are structured across five primary domains, encapsulating business rules for e-commerce transactions, inventory integrity, and customer interactions."
            : "Hệ thống endpoint được cấu trúc theo năm phân hệ chính, đóng gói các quy tắc nghiệp vụ cho giao dịch thương mại điện tử, kiểm soát tồn kho và tương tác khách hàng."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {domains.map((dom) => (
            <div
              key={dom.name}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-cyan-400" aria-hidden="true" />
                <span>{dom.name}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isEn ? dom.desc.en : dom.desc.vi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Product Variant Management */}
      <section aria-labelledby="clothy-variant-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <Boxes className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Product Variant Architecture" : "Kiến Trúc Biến Thể Sản Phẩm"}</span>
        </div>

        <h2 id="clothy-variant-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "SKU, Size, Color & Stock Hierarchy" : "Phân Cấp SKU, Kích Cỡ, Màu Sắc & Tồn Kho"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {isEn
            ? "To support fashion merchandising requirements, the data model separates parent products from discrete purchasable variants. Each variant maintains its own SKU code, size, color attributes, and dedicated stock count."
            : "Để đáp ứng yêu cầu kinh doanh ngành thời trang, mô hình dữ liệu tách biệt sản phẩm cha và các biến thể thương mại độc lập. Mỗi biến thể sở hữu mã SKU riêng, thuộc tính kích cỡ, màu sắc và số lượng tồn kho chuyên biệt."}
        </p>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="max-w-md mx-auto space-y-2">
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 font-mono font-bold text-center text-sm">
              Product (Parent Entity)
            </div>
            <div className="text-center text-slate-500 font-mono" aria-hidden="true">↓</div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-amber-300 font-mono font-bold text-center text-xs">
                Product Variant (Purchasable Unit)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <span className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">SKU</span>
                <span className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Size</span>
                <span className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Color</span>
                <span className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dynamic Multi-Criteria Filtering */}
      <section aria-labelledby="clothy-filter-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Filter className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Dynamic Querying" : "Truy Vấn Động"}</span>
        </div>

        <h2 id="clothy-filter-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn
            ? "Dynamic Multi-Criteria Product Filtering with Spring Data JPA Specifications"
            : "Lọc Sản Phẩm Đa Tiêu Chí Động với Spring Data JPA Specifications"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {isEn
            ? "Implemented dynamic multi-criteria product filtering using Spring Data JPA Specifications. This approach avoids brittle string concatenation or rigid query methods, allowing flexible combinations of search filters at runtime."
            : "Hiện thực bộ lọc sản phẩm động đa tiêu chí sử dụng Spring Data JPA Specifications. Giải pháp này loại bỏ việc nối chuỗi truy vấn thủ công hoặc các method cứng nhắc, cho phép kết hợp linh hoạt các tham số tìm kiếm tại thời điểm thực thi."}
        </p>
      </section>

      {/* 5. Administration, Moderation & Reporting */}
      <section aria-labelledby="clothy-ops-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          <span>{isEn ? "Operations & Analytics" : "Vận Hành & Báo Cáo"}</span>
        </div>

        <h2 id="clothy-ops-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEn ? "Review Moderation, Administration & Reporting" : "Kiểm Duyệt Đánh Giá, Phân Quyền Quản Trị & Báo Cáo"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>{isEn ? "Administration & Moderation" : "Quản Trị & Kiểm Duyệt"}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>{isEn ? "Automated Review Moderation" : "Tự động kiểm duyệt đánh giá"}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>{isEn ? "Role-Based Administration" : "Phân quyền quản trị theo vai trò"}</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>{isEn ? "Analytics & Reporting" : "Thống Kê & Báo Cáo"}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                <span>{isEn ? "Revenue tracking" : "Theo dõi doanh thu"}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                <span>{isEn ? "Bestseller product reporting" : "Báo cáo sản phẩm bán chạy"}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Verified Responsibilities */}
      <section aria-labelledby="clothy-resp-heading" className="space-y-4">
        <h2 id="clothy-resp-heading" className="text-base font-mono font-bold text-slate-300 uppercase tracking-wider">
          {isEn ? "Verified Backend Responsibilities" : "Trách Nhiệm Kỹ Thuật Backend Đã Thực Hiện"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.responsibilities.map((resp, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{resp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. External Technical Evidence Links */}
      <section aria-labelledby="clothy-evidence-heading" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 id="clothy-evidence-heading" className="text-sm font-mono font-bold text-white uppercase tracking-wider">
          {isEn ? "Technical Evidence & Artifacts" : "Bằng Chứng Kỹ Thuật & Tài Liệu"}
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={isEn ? "View Clothy backend repository on GitHub" : "Xem repository backend Clothy trên GitHub"}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? "Inspect GitHub Repository" : "Kiểm Tra Mã Nguồn GitHub"}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={isEn ? "Watch Clothy video walkthrough on YouTube" : "Xem video walkthrough Clothy trên YouTube"}
          >
            <span>{isEn ? "Watch YouTube Walkthrough" : "Xem Video Demo (YouTube)"}</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ClothyTechnicalDetails;
