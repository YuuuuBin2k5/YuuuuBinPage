import React from "react";
import { FolderGit2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { projectsData } from "../data/projectsData";
import ProjectCaseStudyCard from "../components/projects/ProjectCaseStudyCard";

const MyProject = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  // Filter and prioritize projects: Clothy 1st, Portfolio Platform 2nd
  const catalogProjects = [...projectsData].sort((a, b) => {
    if (a.slug === "clothy-ecommerce") return -1;
    if (b.slug === "clothy-ecommerce") return 1;
    return a.id - b.id;
  });

  return (
    <div className="w-full bg-slate-950/90 text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Catalog Header */}
        <header className="space-y-4 text-left max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isEn ? "Engineering Projects" : "Dự Án Kỹ Thuật"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isEn ? "Backend Projects & Case Studies" : "Dự Án Backend & Hồ Sơ Kỹ Thuật"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isEn
              ? "A focused collection of backend-oriented systems demonstrating REST API development, relational data modeling, persistence, application caching, and deployment."
              : "Bộ dự án tập trung vào phát triển backend, thể hiện quá trình xây dựng REST API, mô hình dữ liệu quan hệ, persistence, application caching và triển khai hệ thống."}
          </p>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>{isEn ? "Strictly verified technical artifacts" : "Tài liệu & mã nguồn đã xác thực"}</span>
            </span>
          </div>
        </header>

        {/* Projects List */}
        <section aria-label={isEn ? "Projects Directory" : "Danh Mục Dự Án"} className="space-y-8">
          {catalogProjects.map((project) => (
            <ProjectCaseStudyCard key={project.id} project={project} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default MyProject;
