import React, { useState, useEffect } from "react";
import {
  Code,
  Briefcase,
  Star,
  Coffee,
  Award,
  Users,
  GraduationCap,
  Rocket,
  Trophy,
  Target,
  Zap,
  Heart,
} from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

const FloatingStats = () => {
  const { t } = useTranslation();
  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    coffee: 0,
  });

  const [activeTimeline, setActiveTimeline] = useState(0);

  const stats = [
    {
      icon: Briefcase,
      label: t("stats.projectsCompleted"),
      value: 10,
      suffix: "+",
      color: "from-purple-600 to-purple-400",
      description: t("stats.projectsDesc"),
    },
    {
      icon: Code,
      label: t("stats.yearsCoding"),
      value: 2,
      suffix: "+",
      color: "from-emerald-600 to-emerald-400",
      description: t("stats.yearsCodingDesc"),
    },
    {
      icon: GraduationCap,
      label: t("stats.gpaScore"),
      value: 3.5,
      suffix: "/4.0",
      color: "from-blue-600 to-blue-400",
      description: t("stats.gpaDesc"),
    },
    {
      icon: Coffee,
      label: t("stats.cupsOfCoffee"),
      value: 156,
      suffix: "",
      color: "from-orange-600 to-orange-400",
      description: t("stats.cupsDesc"),
    },
  ];

  const timeline = [
    {
      year: t("timeline.currentStudent.year"),
      title: t("timeline.currentStudent.title"),
      company: t("timeline.currentStudent.company"),
      type: "education",
      icon: Code,
      color: "purple",
      description: t("timeline.currentStudent.description"),
      achievements: t("timeline.currentStudent.achievements"),
    },
    {
      year: t("timeline.webDev.year"),
      title: t("timeline.webDev.title"),
      company: t("timeline.webDev.company"),
      type: "work",
      icon: Rocket,
      color: "emerald",
      description: t("timeline.webDev.description"),
      achievements: t("timeline.webDev.achievements"),
    },
    {
      year: t("timeline.university.year"),
      title: t("timeline.university.title"),
      company: t("timeline.university.company"),
      type: "education",
      icon: GraduationCap,
      color: "blue",
      description: t("timeline.university.description"),
      achievements: t("timeline.university.achievements"),
    },
    {
      year: t("timeline.highSchool.year"),
      title: t("timeline.highSchool.title"),
      company: t("timeline.highSchool.company"),
      type: "milestone",
      icon: Zap,
      color: "yellow",
      description: t("timeline.highSchool.description"),
      achievements: t("timeline.highSchool.achievements"),
    },
  ];

  const achievements = [
    {
      icon: Trophy,
      label: t("achievements.academic.label"),
      items: t("achievements.academic.items"),
    },
    {
      icon: Target,
      label: t("achievements.technical.label"),
      items: t("achievements.technical.items"),
    },
    {
      icon: Heart,
      label: t("achievements.projects.label"),
      items: t("achievements.projects.items"),
    },
  ];

  // Counter animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters((prev) => ({
        projects: Math.min(prev.projects + 1, stats[0].value),
        experience: Math.min(prev.experience + 1, stats[1].value),
        clients: Math.min(prev.clients + 1, stats[2].value),
        coffee: Math.min(prev.coffee + 4, stats[3].value),
      }));
    }, interval);

    setTimeout(() => clearInterval(timer), duration);

    return () => clearInterval(timer);
  }, [stats]);

  // Auto-rotate timeline
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % timeline.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [timeline.length]);

  return (
    <div className="relative py-20 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              {t("stats.title")}
            </span>
          </h2>
          <p className="text-slate-400 text-lg">{t("stats.subtitle")}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const counterKey = Object.keys(counters)[index];
            const currentValue = counters[counterKey];

            return (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: stat.delay }}
              >
                {/* Card */}
                <div className="relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-purple-500/30">
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} blur-xl opacity-50`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    {/* Icon */}
                    <div
                      className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={32} className="text-white" />
                    </div>

                    {/* Number */}
                    <div>
                      <div className="text-5xl font-black text-white mb-2">
                        {currentValue}
                        {currentValue === stat.value && (
                          <span
                            className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                          >
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-1">
                        {stat.label}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {stat.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full -translate-y-10 translate-x-10" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tl from-emerald-600/10 to-transparent rounded-full translate-y-8 -translate-x-8" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">
              {t("timeline.title")}
            </h3>
            <p className="text-slate-400">{t("timeline.subtitle")}</p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 via-emerald-600 to-blue-600 opacity-30" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;
                const isActive = activeTimeline === index;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isLeft ? "flex-row" : "flex-row-reverse"
                    }`}
                    onMouseEnter={() => setActiveTimeline(index)}
                  >
                    {/* Content Card */}
                    <div
                      className={`w-5/12 ${
                        isLeft ? "pr-12 text-right" : "pl-12 text-left"
                      }`}
                    >
                      <div
                        className={`group relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border transition-all duration-500 ${
                          isActive
                            ? "border-purple-500/50 scale-105 shadow-2xl shadow-purple-500/20"
                            : "border-white/5 hover:border-purple-500/30"
                        }`}
                      >
                        {/* Year Badge */}
                        <div
                          className={`inline-flex px-4 py-1 rounded-full text-sm font-bold mb-3 ${
                            item.color === "purple"
                              ? "bg-purple-600/20 text-purple-400"
                              : item.color === "emerald"
                              ? "bg-emerald-600/20 text-emerald-400"
                              : item.color === "blue"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-yellow-600/20 text-yellow-400"
                          }`}
                        >
                          {item.year}
                        </div>

                        <h4 className="text-xl font-bold text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-purple-400 font-semibold mb-3">
                          {item.company}
                        </p>
                        <p className="text-slate-400 text-sm mb-4">
                          {item.description}
                        </p>

                        {/* Achievements */}
                        <div className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs text-slate-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div
                        className={`p-4 rounded-full transition-all duration-500 ${
                          item.color === "purple"
                            ? "bg-gradient-to-br from-purple-600 to-purple-400"
                            : item.color === "emerald"
                            ? "bg-gradient-to-br from-emerald-600 to-emerald-400"
                            : item.color === "blue"
                            ? "bg-gradient-to-br from-blue-600 to-blue-400"
                            : "bg-gradient-to-br from-yellow-600 to-yellow-400"
                        } ${isActive ? "scale-125 shadow-2xl" : "scale-100"}`}
                      >
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>

                    {/* Empty Space */}
                    <div className="w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">
              {t("achievements.title")}
            </h3>
            <p className="text-slate-400">{t("achievements.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-xl">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      {achievement.label}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {achievement.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <Star
                          size={16}
                          className="text-yellow-400 flex-shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-r from-purple-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/30">
            <div className="flex items-center gap-3">
              <Award size={32} className="text-emerald-400 animate-bounce" />
              <h4 className="text-2xl font-bold text-white">
                {t("cta.title")}
              </h4>
            </div>
            <p className="text-slate-300 max-w-2xl">{t("cta.description")}</p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold rounded-full overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <Rocket size={20} />
                {t("cta.button")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingStats;
