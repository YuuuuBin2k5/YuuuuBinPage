import React, { useState } from "react";
import { Code2, Database, Globe, Server, Palette, Wrench } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

const SkillsShowcase = () => {
  const { t } = useTranslation();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      title: t("skills.frontend"),
      icon: Globe,
      color: "from-blue-600 to-cyan-600",
      skills: [
        { name: "React", level: 90, color: "bg-blue-500" },
        { name: "Tailwind CSS", level: 95, color: "bg-cyan-500" },
        { name: "JavaScript", level: 85, color: "bg-yellow-500" },
        { name: "HTML/CSS", level: 90, color: "bg-orange-500" },
      ],
    },
    {
      title: t("skills.backend"),
      icon: Server,
      color: "from-emerald-600 to-green-600",
      skills: [
        { name: "Java", level: 88, color: "bg-red-500" },
        { name: "Spring Boot", level: 85, color: "bg-emerald-500" },
        { name: "REST APIs", level: 90, color: "bg-green-500" },
        { name: "Python", level: 75, color: "bg-blue-600" },
      ],
    },
    {
      title: t("skills.database"),
      icon: Database,
      color: "from-purple-600 to-pink-600",
      skills: [
        { name: "MySQL", level: 85, color: "bg-blue-500" },
        { name: "PostgreSQL", level: 80, color: "bg-indigo-500" },
        { name: "MongoDB", level: 70, color: "bg-green-600" },
      ],
    },
    {
      title: t("skills.tools"),
      icon: Wrench,
      color: "from-orange-600 to-red-600",
      skills: [
        { name: "Git", level: 90, color: "bg-orange-500" },
        { name: "Docker", level: 75, color: "bg-blue-600" },
        { name: "VS Code", level: 95, color: "bg-blue-500" },
      ],
    },
  ];

  return (
    <div className="relative py-20 px-6 overflow-hidden bg-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6">
            <Code2 size={20} className="text-purple-400" />
            <span className="text-purple-300 font-semibold">
              {t("skills.techStack")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("skills.title").split(" & ")[0]} &{" "}
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              {t("skills.title").split(" & ")[1]}
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <div key={categoryIndex} className="group relative">
                {/* Card */}
                <div className="relative h-full p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-purple-500/30">
                  {/* Hover Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Header */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="relative space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        onMouseEnter={() =>
                          setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                        }
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group/skill"
                      >
                        {/* Skill Name */}
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-300 group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span
                            className={`text-xs font-bold transition-colors ${
                              hoveredSkill === `${categoryIndex}-${skillIndex}`
                                ? "text-white"
                                : "text-slate-500"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          {/* Background Track */}
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600" />

                          {/* Progress Fill */}
                          <div
                            className={`absolute inset-y-0 left-0 ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width:
                                hoveredSkill ===
                                `${categoryIndex}-${skillIndex}`
                                  ? `${skill.level}%`
                                  : "0%",
                            }}
                          >
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Download CV Button */}
        <div className="mt-16 flex justify-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold rounded-full overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">
              <Palette size={20} />
              Download Resume
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SkillsShowcase;
