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
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useParallax } from "../../hooks/useParallax";
import FeaturedProjects from "./FeaturedProjects";

const FloatingStats = () => {
  const { t } = useTranslation();
  const [activeTimeline, setActiveTimeline] = useState(0);

  // Scroll reveal refs
  const introReveal = useScrollReveal({ threshold: 0.2, rootMargin: "50px" });
  const timelineReveal = useScrollReveal({
    threshold: 0.15,
    rootMargin: "50px",
  });

  // Parallax for background
  const parallax = useParallax(0.4);

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

      {/* Grid Background with Parallax */}
      <div
        className="absolute inset-0 opacity-20 transition-transform duration-0"
        style={{ transform: `translateY(${parallax * 0.5}px)` }}
      >
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

        {/* Personal Introduction */}
        <div
          ref={introReveal.ref}
          className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 ease-out ${
            introReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative group">
            {/* Subtle Elevation Shadow */}
            <div className="absolute -inset-1 bg-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Main content card */}
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group-hover:-translate-y-1 transition-all duration-500">
              {/* Quote icon */}
              <div className="absolute top-8 left-8 text-purple-500/20 text-6xl font-serif">
                "
              </div>

              <div className="relative space-y-6">
                {/* Opening */}
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                  {(localStorage.getItem("language") || "en") === "vi" ? (
                    <>
                      Xin chào! Tôi là{" "}
                      <span className="font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Đào Nguyễn Nhật Anh
                      </span>
                      , một sinh viên năm 3 ngành Công nghệ Phần mềm tại{" "}
                      <span className="text-emerald-400">
                        Đại học Sư Phạm Kỹ Thuật TP.HCM
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Hello! I'm{" "}
                      <span className="font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Dao Nguyen Nhat Anh
                      </span>
                      , a 3rd-year Software Engineering student at{" "}
                      <span className="text-emerald-400">
                        Ho Chi Minh City University of Technology
                      </span>
                      .
                    </>
                  )}
                </p>

                {/* Philosophy */}
                <p className="text-lg text-slate-400 leading-relaxed pl-6 border-l-4 border-purple-500/30">
                  {(localStorage.getItem("language") || "en") === "vi" ? (
                    <>
                      Với tôi, lập trình không chỉ là công việc - đó là{" "}
                      <span className="text-indigo-300 font-semibold">
                        nghệ thuật biến ý tưởng thành hiện thực
                      </span>
                      . Mỗi dòng code là một bước tiến, mỗi dự án là một hành
                      trình khám phá.
                    </>
                  ) : (
                    <>
                      For me, programming is not just work - it's the{" "}
                      <span className="text-indigo-300 font-semibold">
                        art of turning ideas into reality
                      </span>
                      . Every line of code is a step forward, every project is a
                      journey of discovery.
                    </>
                  )}
                </p>

                {/* Passion */}
                <p className="text-lg text-slate-400 leading-relaxed">
                  {(localStorage.getItem("language") || "en") === "vi" ? (
                    <>
                      Tôi đam mê xây dựng những ứng dụng web hiện đại với{" "}
                      <span className="text-violet-400">React</span>,{" "}
                      <span className="text-emerald-400">Spring Boot</span>, và
                      luôn háo hức học hỏi những công nghệ mới. Mục tiêu của tôi
                      là tạo ra những sản phẩm không chỉ đẹp mắt mà còn mang lại
                      <span className="text-purple-300 font-semibold">
                        {" "}
                        trải nghiệm tuyệt vời cho người dùng
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      I'm passionate about building modern web applications with{" "}
                      <span className="text-violet-400">React</span>,{" "}
                      <span className="text-emerald-400">Spring Boot</span>, and
                      always eager to learn new technologies. My goal is to
                      create products that are not only beautiful but also
                      deliver
                      <span className="text-purple-300 font-semibold">
                        {" "}
                        exceptional user experiences
                      </span>
                      .
                    </>
                  )}
                </p>

                {/* Closing quote */}
                <div className="flex items-center gap-3 pt-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                  <p className="text-sm text-slate-500 italic">
                    {(localStorage.getItem("language") || "en") === "vi"
                      ? '"Code với đam mê, sáng tạo không giới hạn"'
                      : '"Code with passion, create without limits"'}
                  </p>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-8 right-8 text-purple-500/20 text-6xl font-serif rotate-180">
                "
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-600/10 to-transparent rounded-full translate-y-12 -translate-x-12" />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div
          ref={timelineReveal.ref}
          className={`mb-20 transition-all duration-1000 ease-out delay-200 ${
            timelineReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
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

        {/* Featured Projects Showcase */}
        <FeaturedProjects />

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
