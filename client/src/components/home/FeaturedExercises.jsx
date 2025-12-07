import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Zap,
  Star,
  Calendar,
  ArrowRight,
  Sparkles,
  Brain,
  Trophy,
  Target,
  ChevronRight,
  Globe,
  Github,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { exercisesAPI, weeksAPI } from "../../services";
import { Link } from "react-router-dom";
import { useViewedExercises } from "../../hooks/useViewedExercises";

const FeaturedExercises = () => {
  const { t } = useTranslation();
  const [exercises, setExercises] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredExercise, setHoveredExercise] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [, forceUpdate] = useState(0);
  const cardRefs = useRef([]);
  const { isViewed, getViewCount, markAsViewed } = useViewedExercises();

  // Handler để mark as viewed khi click vào links
  const handleLinkClick = (e, exerciseId) => {
    e.preventDefault();
    e.stopPropagation();
    markAsViewed(exerciseId);
    // Force re-render để cập nhật UI ngay lập tức
    forceUpdate((n) => n + 1);
    // Open link in new tab
    if (e.currentTarget.href) {
      window.open(e.currentTarget.href, "_blank", "noopener,noreferrer");
    }
  };

  // Listen for tab visibility changes to update UI when user returns
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // User returned to tab, force update to show latest viewed state
        forceUpdate((n) => n + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exercisesData, weeksData] = await Promise.all([
          exercisesAPI.getAll(),
          weeksAPI.getAll(),
        ]);

        if (!exercisesData || exercisesData.length === 0) {
          console.warn("No exercises returned from API");
          return;
        }

        // Get featured exercises (latest 6)
        const featuredExercises = exercisesData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setExercises(featuredExercises);
        setWeeks(weeksData || []);
      } catch (error) {
        console.error("❌ Error loading featured exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [exercises, visibleCards]);

  // Get difficulty color
  const getDifficultyConfig = (difficulty) => {
    const configs = {
      EASY: {
        gradient: "from-emerald-500 to-green-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
      },
      MEDIUM: {
        gradient: "from-amber-500 to-orange-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        text: "text-amber-400",
      },
      HARD: {
        gradient: "from-red-500 to-rose-500",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
      },
    };
    return configs[difficulty?.toUpperCase()] || configs.MEDIUM;
  };

  // Get week info
  const getWeekInfo = (weekId) => {
    return weeks.find((w) => w.id === weekId);
  };

  if (loading) {
    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <p className="text-slate-400">
            {(localStorage.getItem("language") || "en") === "vi"
              ? "Đang tải bài tập..."
              : "Loading exercises..."}
          </p>
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return null;
  }

  return (
    <section className="relative mb-32 px-6 md:px-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto mb-16 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-6">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">
            {(localStorage.getItem("language") || "en") === "vi"
              ? "LẬP TRÌNH WEB - THỰC HÀNH"
              : "WEB PROGRAMMING - PRACTICE"}
          </span>
          <Brain className="w-4 h-4 text-cyan-400" />
        </div>

        {/* Title */}
        <h3 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-200">
          {(localStorage.getItem("language") || "en") === "vi"
            ? "Bài Tập Môn Học"
            : "Course Exercises"}
        </h3>

        {/* Description */}
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-4">
          {(localStorage.getItem("language") || "en") === "vi"
            ? "Tổng hợp các bài tập thực hành môn Lập Trình Web, từ HTML/CSS cơ bản đến JavaScript nâng cao và React Framework."
            : "Collection of Web Programming course exercises, from basic HTML/CSS to advanced JavaScript and React Framework."}
        </p>

        {/* Course Info Badge */}
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">
              {(localStorage.getItem("language") || "en") === "vi"
                ? "Đang học tập"
                : "Currently Learning"}
            </span>
          </div>
          <div className="w-px h-4 bg-slate-700"></div>
          <span className="text-sm text-slate-400">
            {exercises.length}{" "}
            {(localStorage.getItem("language") || "en") === "vi"
              ? "bài tập"
              : "exercises"}
          </span>
        </div>

        {/* View All Button */}
        <Link
          to="/baitap"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-blue-500/30 group"
        >
          <Target className="w-5 h-5" />
          <span>
            {(localStorage.getItem("language") || "en") === "vi"
              ? "Xem Toàn Bộ Bài Tập"
              : "View All Exercises"}
          </span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Exercises Grid */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => {
            const difficultyConfig = getDifficultyConfig(exercise.difficulty);
            const weekInfo = getWeekInfo(exercise.weekId);
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredExercise === exercise.id;
            const exerciseViewed = isViewed(exercise.id);
            const viewCount = getViewCount(exercise.id);

            return (
              <Link
                key={exercise.id}
                to="/baitap"
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={() => setHoveredExercise(exercise.id)}
                onMouseLeave={() => setHoveredExercise(null)}
                className={`group relative bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 backdrop-blur-2xl rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl ${
                  exerciseViewed
                    ? "opacity-90 hover:opacity-100 border-2 border-slate-600/40 hover:border-slate-500/50"
                    : "border-2 border-slate-700/30 hover:border-cyan-500/40 hover:shadow-cyan-500/20"
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-600/0 to-blue-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                {/* Progress Bar on Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/50 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${difficultyConfig.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000`}
                  ></div>
                </div>

                {/* Card Content */}
                <div className="relative p-6">
                  {/* Viewed Indicator - Top Left */}
                  {exerciseViewed && (
                    <div className="absolute -top-1 -left-1 z-10">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-br-xl rounded-tl-xl border-r border-b border-blue-400/30 shadow-lg animate-in slide-in-from-left duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-100" />
                        <span className="text-xs font-semibold text-blue-50">
                          {viewCount > 1 ? `${viewCount}x` : "Đã xem"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Week Badge - Academic Style */}
                    {weekInfo && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-300">
                          {weekInfo.title}
                        </span>
                      </div>
                    )}

                    {/* Difficulty Badge - Styled */}
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${difficultyConfig.bg} border ${difficultyConfig.border} backdrop-blur-sm shadow-lg`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${difficultyConfig.text.replace(
                          "text-",
                          "bg-"
                        )} animate-pulse`}
                      ></div>
                      <span
                        className={`text-sm font-bold uppercase tracking-wide ${difficultyConfig.text}`}
                      >
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Category Tag with Icon */}
                  <div className="mb-4">
                    {exercise.category && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/30 rounded-lg">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-300">
                          {exercise.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Number Badge - Academic */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div
                      className={`text-6xl font-black ${difficultyConfig.text}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                    {exercise.title}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {exercise.description}
                  </p>

                  {/* Footer with Learning Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-4">
                    <div className="flex items-center gap-4">
                      {/* Estimated Time */}
                      {exercise.estimatedTime && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 font-medium">
                              {(localStorage.getItem("language") || "en") ===
                              "vi"
                                ? "Thời gian"
                                : "Duration"}
                            </span>
                            <span className="text-sm font-bold text-slate-300">
                              {exercise.estimatedTime}{" "}
                              {(localStorage.getItem("language") || "en") ===
                              "vi"
                                ? "phút"
                                : "mins"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Quick Links - Only show if available */}
                      {(exercise.demoUrl || exercise.githubUrl) && (
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {exercise.demoUrl && (
                            <a
                              href={exercise.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => handleLinkClick(e, exercise.id)}
                              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 rounded-lg text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                              title="Demo"
                            >
                              <Globe className="w-4 h-4" />
                            </a>
                          )}
                          {exercise.githubUrl && (
                            <a
                              href={exercise.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => handleLinkClick(e, exercise.id)}
                              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                              title="GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* View Detail Button */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-xs font-bold text-blue-400">
                          {(localStorage.getItem("language") || "en") === "vi"
                            ? "Xem Chi Tiết"
                            : "View Details"}
                        </span>
                        <ArrowRight className="w-4 h-4 text-blue-400 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA with Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            {/* Stats Row */}
            <div className="flex items-center gap-6 px-6 py-3 bg-slate-800/30 border border-slate-700/30 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-500">
                    {(localStorage.getItem("language") || "en") === "vi"
                      ? "Tổng số"
                      : "Total"}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {exercises.length}+
                  </div>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-500">
                    {(localStorage.getItem("language") || "en") === "vi"
                      ? "Chủ đề"
                      : "Topics"}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {weeks.length}+
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/baitap"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all duration-300 group shadow-xl hover:shadow-blue-500/30"
            >
              <Target className="w-5 h-5" />
              <span>
                {(localStorage.getItem("language") || "en") === "vi"
                  ? "Khám Phá Tất Cả Bài Tập"
                  : "Explore All Exercises"}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping"></div>
        <div
          className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-400/30 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  );
};

export default FeaturedExercises;
