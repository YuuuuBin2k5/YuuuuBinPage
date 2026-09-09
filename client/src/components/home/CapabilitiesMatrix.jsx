import React from "react";
import { Server, Database, CheckCircle, Wrench, Layout } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { capabilitiesData } from "../../data/capabilitiesData";

const categoryIcons = {
  "backend-core": Server,
  "database-persistence": Database,
  "quality-testing": CheckCircle,
  "tools-delivery": Wrench,
  "supporting-client": Layout,
};

const CapabilitiesMatrix = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/90 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Subtle Static Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="scroll-reveal space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-400" aria-hidden="true" />
            <span>{isEn ? "Backend Engineering Capabilities" : "Năng Lực Kỹ Thuật Backend"}</span>
          </div>

          <h2
            id="capabilities-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
          >
            {isEn ? "Technical Skills & Competencies" : "Kỹ Năng & Năng Lực Chuyên Môn"}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {isEn
              ? "Categorized engineering capabilities grounded in Java, relational databases, software quality practices, and client-server integration."
              : "Năng lực chuyên môn có hệ thống dựa trên nền tảng Java, cơ sở dữ liệu quan hệ, tư duy chất lượng phần mềm và tích hợp client-server."}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesData.map((group, idx) => {
            const IconComponent = categoryIcons[group.id] || Server;
            const isSupporting = group.id === "supporting-client";
            const delayClass = idx === 0 ? "delay-100" : idx === 1 ? "delay-150" : idx === 2 ? "delay-200" : idx === 3 ? "delay-250" : "delay-300";

            return (
              <div
                key={group.id}
                className={`scroll-reveal ${delayClass} p-6 rounded-2xl flex flex-col justify-between transition-colors duration-200 ${
                  isSupporting
                    ? "bg-slate-900/60 border border-slate-800/60 lg:col-span-2"
                    : "bg-slate-900/90 border border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isSupporting
                          ? "bg-slate-800 text-slate-400"
                          : "bg-indigo-950/80 text-indigo-400 border border-indigo-500/30"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {isEn ? group.category.en : group.category.vi}
                      </h3>
                      {isSupporting && (
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          {isEn ? "Supporting Client-Side" : "Kỹ năng bổ trợ"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category Purpose Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isEn ? group.description.en : group.description.vi}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2.5 pt-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/60 space-y-1"
                      >
                        <div className="text-xs font-mono font-bold text-slate-200">
                          {skill.name}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {isEn ? skill.details.en : skill.details.vi}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesMatrix;

