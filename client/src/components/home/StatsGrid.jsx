import React from "react";
import { Database, Server, CheckCircle2, GraduationCap } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { profileData } from "../../data/profileData";

const StatsGrid = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const stats = [
    {
      id: "entities",
      number: "20+",
      label: isEn ? "PostgreSQL Entities" : "Thực Thể PostgreSQL",
      description: isEn
        ? "Clothy e-commerce platform relational model"
        : "Mô hình quan hệ nền tảng Clothy E-Commerce",
      icon: Database,
      iconBg: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      glowColor: "group-hover:border-blue-500/40",
    },
    {
      id: "apis",
      number: "5",
      label: isEn ? "REST API Domains" : "Phân Hệ REST API",
      description: isEn
        ? "Product, Category, Inventory, Order, Review"
        : "Product, Category, Inventory, Order, Review",
      icon: Server,
      iconBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
      glowColor: "group-hover:border-indigo-500/40",
    },
    {
      id: "qa-cycles",
      number: "10+",
      label: isEn ? "QA Test Cycles" : "Chu Kỳ Test Thực Tế",
      description: isEn
        ? "Commercial crowdtesting on Test IO platform"
        : "Kiểm thử thực tế tại nền tảng Test IO",
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      glowColor: "group-hover:border-emerald-500/40",
    },
    {
      id: "education",
      number: "HCMUTE",
      label: isEn ? "Software Engineering" : "Kỹ Thuật Phần Mềm",
      description: isEn
        ? `4th Year Student • GPA ${profileData.gpa}`
        : `Sinh viên năm 4 • GPA ${profileData.gpa}`,
      icon: GraduationCap,
      iconBg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      glowColor: "group-hover:border-purple-500/40",
    },
  ];

  return (
    <section
      aria-label={isEn ? "Key Technical Metrics" : "Số liệu kỹ thuật nổi bật"}
      className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`group relative p-5 sm:p-6 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/90 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/30 ${item.glowColor}`}
            >
              {/* Subtle top inner glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />

              <div className="flex items-start gap-4">
                {/* Squircle Icon Container */}
                <div
                  className={`p-3 rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Metric Content */}
                <div className="space-y-1 min-w-0">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    {item.number}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                    {item.label}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsGrid;

