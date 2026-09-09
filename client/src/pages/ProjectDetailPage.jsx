import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { projectsData } from "../data/projectsData";
import ProjectDetailHeader from "../components/projects/ProjectDetailHeader";
import ProjectMetricGrid from "../components/projects/ProjectMetricGrid";
import ProjectTechStack from "../components/projects/ProjectTechStack";
import ClothyTechnicalDetails from "../components/projects/ClothyTechnicalDetails";
import PortfolioPlatformTechnicalDetails from "../components/projects/PortfolioPlatformTechnicalDetails";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isEn = language === "en";

  const project = projectsData.find((p) => p.slug === slug);

  // Safe Fallback if project slug is unknown
  if (!project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {isEn ? "Project Case Study Not Found" : "Không Tìm Thấy Hồ Sơ Dự Án"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {isEn
                ? "The requested engineering case study does not exist or has been relocated."
                : "Hồ sơ kỹ thuật dự án bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển."}
            </p>
          </div>

          <div>
            <Link
              to="/myproject"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs font-mono transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "Back to Projects Catalog" : "Quay Lại Danh Sách Dự Án"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isClothy = project.slug === "clothy-ecommerce";

  return (
    <div className="w-full bg-slate-950/90 text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Project Header with Breadcrumb & Primary Actions */}
        <ProjectDetailHeader project={project} />

        {/* Key Indicators Grid */}
        <ProjectMetricGrid keyMetrics={project.keyMetrics} />

        {/* Categorized Tech Stack */}
        <ProjectTechStack techStack={project.techStack} />

        {/* Deep Dive Engineering Implementation */}
        {isClothy ? (
          <ClothyTechnicalDetails project={project} />
        ) : (
          <PortfolioPlatformTechnicalDetails project={project} />
        )}
      </main>
    </div>
  );
};

export default ProjectDetailPage;
