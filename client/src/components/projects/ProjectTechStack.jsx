import React from "react";
import { Server, Database, Box, Layout } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const ProjectTechStack = ({ techStack }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!techStack) return null;

  return (
    <section aria-label={isEn ? "Technology Stack" : "Ngăn Xếp Công Nghệ"} className="space-y-4">
      <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
        {isEn ? "Verified Technology Stack" : "Ngăn Xếp Công Nghệ Đã Xác Thực"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Backend Stack */}
        {techStack.backend && techStack.backend.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300">
              <Server className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              <span>{isEn ? "Backend Core & Persistence" : "Backend & Persistence"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.backend.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-950/60 border border-indigo-500/30 text-indigo-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Database */}
        {techStack.database && techStack.database.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
              <Database className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>{isEn ? "Database & Connection Management" : "Cơ Sở Dữ Liệu & Kết Nối"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.database.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* DevOps / Infrastructure */}
        {techStack.devops && techStack.devops.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300">
              <Box className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>{isEn ? "Packaging & Deployment" : "Đóng Gói & Triển Khai"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.devops.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Supporting Frontend */}
        {techStack.frontend && techStack.frontend.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                <Layout className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>{isEn ? "Supporting Client-Side" : "Kỹ Năng Bổ Trợ Client-Side"}</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {isEn ? "Secondary" : "Bổ trợ"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.frontend.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectTechStack;
