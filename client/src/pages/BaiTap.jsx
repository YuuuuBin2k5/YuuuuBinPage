import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Layers,
  ExternalLink,
  Github,
  Calendar,
  ChevronRight,
  Code2,
  Database,
  Server,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  ArrowLeft,
  X,
  Maximize2,
  Globe,
  Tag
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { labSummaryData } from "../data/labSummaryData";
import { weeksData, exercisesData } from "../data/baitapData";

// Icon mapping per module chapter
const getModuleIcon = (moduleId) => {
  switch (moduleId) {
    case 1:
      return Server;
    case 2:
      return Code2;
    case 3:
      return Terminal;
    case 4:
      return Layers;
    case 5:
      return ShieldCheck;
    case 6:
      return Code2;
    case 7:
      return BookOpen;
    case 8:
    case 9:
      return Database;
    case 10:
      return Layers;
    case 11:
      return Mail;
    default:
      return Terminal;
  }
};

// Parse module syllabus content from raw text
const parseModuleContent = (content) => {
  if (!content) return { objective: "", topics: [], outcome: "" };
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);

  let section = "objective";
  let objective = "";
  const topics = [];
  let outcome = "";

  for (const line of lines) {
    if (line.includes("Mục tiêu")) {
      section = "objective";
      const text = line.replace(/^.*Mục tiêu[:\s]*/i, "").trim();
      if (text) objective += (objective ? " " : "") + text;
    } else if (line.includes("Nội dung")) {
      section = "topics";
    } else if (line.includes("Kết quả")) {
      section = "outcome";
      const text = line.replace(/^.*Kết quả( đạt được)?[:\s]*/i, "").trim();
      if (text) outcome += (outcome ? " " : "") + text;
    } else {
      if (section === "objective") {
        objective += " " + line;
      } else if (section === "topics") {
        const cleaned = line
          .replace(/^[•\-*\s\d.]+/, "")
          .replace(/^\d*️⃣?\s*/u, "")
          .trim();
        if (cleaned) topics.push(cleaned);
      } else if (section === "outcome") {
        outcome += " " + line;
      }
    }
  }

  return { objective, topics, outcome };
};

const BaiTap = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [selectedModuleId, setSelectedModuleId] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const lightboxRef = useRef(null);
  const triggerThumbRef = useRef(null);

  // Focus trap, initial focus, and focus restoration for lightbox dialog
  useEffect(() => {
    if (!previewImage) return;

    const timer = setTimeout(() => {
      const focusable = lightboxRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      } else if (e.key === "Tab" && lightboxRef.current) {
        const focusables = Array.from(
          lightboxRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      triggerThumbRef.current?.focus();
    };
  }, [previewImage]);

  // Exercise counts indexed by module ID
  const exerciseCountsByWeek = useMemo(() => {
    const counts = {};
    exercisesData.forEach((ex) => {
      counts[ex.weekId] = (counts[ex.weekId] || 0) + 1;
    });
    return counts;
  }, []);

  // Active module resolved from weeksData
  const activeModule = useMemo(() => {
    return weeksData.find((w) => w.id === selectedModuleId) || weeksData[0];
  }, [selectedModuleId]);

  // Summary module info for bilingual chapter/title/topic
  const activeSummaryModule = useMemo(() => {
    return labSummaryData.modules.find((m) => m.id === activeModule?.id);
  }, [activeModule]);

  // Parsed syllabus content
  const parsedContent = useMemo(() => {
    return parseModuleContent(activeModule?.content || "");
  }, [activeModule]);

  // Exercises belonging to active module
  const activeExercises = useMemo(() => {
    if (!activeModule) return [];
    return exercisesData.filter((ex) => ex.weekId === activeModule.id);
  }, [activeModule]);

  const handleSelectModule = useCallback((id) => {
    setSelectedModuleId(id);
  }, []);

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <Link
            to="/"
            className="hover:text-indigo-400 transition-colors flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isEn ? "Home" : "Trang Chủ"}</span>
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            to="/myproject"
            className="hover:text-indigo-400 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded"
          >
            <span>{isEn ? "Projects Catalog" : "Danh Mục Dự Án"}</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-semibold">
            {isEn ? "Engineering Lab" : "Phòng Thí Nghiệm Kỹ Thuật"}
          </span>
        </div>

        {/* Hero & Rationale Header */}
        <header className="space-y-6">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {isEn ? labSummaryData.badge.en : labSummaryData.badge.vi}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isEn ? "Enterprise Java Fundamentals" : "Nền Tảng Java Web Doanh Nghiệp"}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-400 pt-1">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {labSummaryData.totalModules} {isEn ? "Curriculum Modules" : "Module Học Thuật"}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {labSummaryData.chapterCoverage}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                HCMUTE Software Engineering
              </span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
              {isEn
                ? "These exercises build a foundational understanding of Java Web mechanisms that are later abstracted by frameworks such as Spring Boot."
                : "Các bài thực hành giúp xây dựng hiểu biết nền tảng về những cơ chế Java Web mà các framework như Spring Boot sau này trừu tượng hóa."}
            </p>
          </div>

          {/* Strategic Rationale Callout Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? "Strategic Engineering Rationale" : "Định Hướng Kiến Trúc & Giá Trị Kỹ Thuật"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? labSummaryData.strategicRationale.en
                : labSummaryData.strategicRationale.vi}
            </p>
          </div>
        </header>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mobile Module Selector (< lg screens) */}
          <div className="lg:hidden col-span-1 space-y-2">
            <label
              htmlFor="mobile-module-selector"
              className="block text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider"
            >
              {isEn ? "Select Curriculum Module" : "Chọn Module Học Thuật"}
            </label>
            <select
              id="mobile-module-selector"
              value={selectedModuleId}
              onChange={(e) => handleSelectModule(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {weeksData.map((week) => {
                const summaryMod = labSummaryData.modules.find((m) => m.id === week.id);
                const titleText = summaryMod ? (isEn ? summaryMod.title.en : summaryMod.title.vi) : week.title;
                const count = exerciseCountsByWeek[week.id] || 0;
                return (
                  <option key={week.id} value={week.id}>
                    {summaryMod?.chapter || `Module ${week.id}`} - {titleText} ({count} {isEn ? "artifacts" : "bài tập"})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Left Column: Desktop Curriculum Modules Sidebar (lg:col-span-4) */}
          <nav
            aria-label={isEn ? "Curriculum Modules" : "Danh Sách Module"}
            className="hidden lg:block lg:col-span-4 space-y-3 sticky top-6 self-start max-h-[calc(100vh-4rem)] overflow-y-auto pr-1"
          >
            <div className="px-2 py-1 flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                {isEn ? "Curriculum Modules" : "Danh Sách Module"} ({weeksData.length})
              </h2>
              <span className="text-[11px] font-mono text-slate-500">
                11 {isEn ? "Total Modules" : "Module"}
              </span>
            </div>

            <div className="space-y-2">
              {weeksData.map((week) => {
                const isActive = week.id === selectedModuleId;
                const summaryMod = labSummaryData.modules.find((m) => m.id === week.id);
                const ModuleIcon = getModuleIcon(week.id);
                const count = exerciseCountsByWeek[week.id] || 0;
                const titleText = summaryMod ? (isEn ? summaryMod.title.en : summaryMod.title.vi) : week.title;

                return (
                  <button
                    key={week.id}
                    onClick={() => handleSelectModule(week.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      isActive
                        ? "bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/50"
                        : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <ModuleIcon className="w-4 h-4" aria-hidden="true" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wide">
                          {summaryMod?.chapter || `Module ${week.id}`}
                        </span>
                        {count > 0 ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                            {count} {isEn ? "artifacts" : "minh chứng"}
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500">
                            {isEn ? "Curriculum Topic" : "Chủ đề học thuật"}
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-xs font-bold leading-snug line-clamp-1 ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {titleText}
                      </h3>

                      {summaryMod && (
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {isEn ? summaryMod.topic.en : summaryMod.topic.vi}
                        </p>
                      )}
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                        isActive ? "text-indigo-400 translate-x-0.5" : "text-slate-600"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right Column: Active Module Details & Exercises (lg:col-span-8) */}
          <section
            aria-label={isEn ? "Selected Module Content" : "Chi Tiết Module"}
            className="lg:col-span-8 space-y-6"
          >
            {/* Active Module Header Card */}
            <article className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
              {/* Module Metadata Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-semibold">
                    {activeSummaryModule?.chapter || `Module ${activeModule.id}`}
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-md font-mono text-xs font-semibold border ${
                      activeModule.difficulty === "HARD"
                        ? "bg-purple-950/60 text-purple-300 border-purple-500/40"
                        : activeModule.difficulty === "MEDIUM"
                        ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {activeModule.difficulty}
                  </span>
                </div>

                {activeModule.startDate && activeModule.endDate && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                    <span>
                      {activeModule.startDate} → {activeModule.endDate}
                    </span>
                  </div>
                )}
              </div>

              {/* Module Title & Core Topic */}
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeSummaryModule
                    ? (isEn ? activeSummaryModule.title.en : activeSummaryModule.title.vi)
                    : activeModule.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeSummaryModule
                    ? (isEn ? activeSummaryModule.topic.en : activeSummaryModule.topic.vi)
                    : activeModule.description}
                </p>
              </div>

              {/* Syllabus Breakdown: Objective, Topics, Outcome */}
              <div className="space-y-4 pt-2">
                {/* Objective */}
                {parsedContent.objective && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                      <span>{isEn ? "Core Objective" : "Mục Tiêu Trọng Tâm"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {parsedContent.objective}
                    </p>
                  </div>
                )}

                {/* Topics & Key Concepts */}
                {parsedContent.topics.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      {isEn ? "Syllabus Topics & Technical Concepts" : "Nội Dung & Kiến Thức Kỹ Thuật"}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {parsedContent.topics.map((topic, idx) => (
                        <li
                          key={idx}
                          className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-300 flex items-start gap-2.5 font-mono"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span className="break-words leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Outcome */}
                {parsedContent.outcome && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>{isEn ? "Verified Outcome" : "Kết Quả Đạt Được"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {parsedContent.outcome}
                    </p>
                  </div>
                )}
              </div>
            </article>

            {/* Exercises Section */}
            <section
              aria-label={isEn ? "Module Exercises and Artifacts" : "Bài Tập và Minh Chứng"}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span>
                    {isEn ? "Hands-on Exercises & Artifacts" : "Bài Tập Thực Hành & Minh Chứng"}
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    ({activeExercises.length})
                  </span>
                </h3>
              </div>

              {activeExercises.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {activeExercises.map((exercise) => (
                    <article
                      key={exercise.id}
                      className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold">
                              {exercise.category}
                            </span>
                            {exercise.completedDate && (
                              <span className="text-[11px] font-mono text-slate-400">
                                {isEn ? "Completed:" : "Hoàn thành:"} {exercise.completedDate}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-white tracking-tight">
                            {exercise.title}
                          </h4>
                        </div>

                        {/* Action Links */}
                        <div className="flex items-center gap-2 shrink-0">
                          {exercise.demoUrl && (
                            <a
                              href={exercise.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                              aria-label={`${isEn ? "Open live demo for" : "Mở demo trực tiếp cho"} ${exercise.title}`}
                            >
                              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{isEn ? "Live Demo" : "Xem Demo"}</span>
                              <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
                            </a>
                          )}

                          {exercise.githubUrl && (
                            <a
                              href={exercise.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                              aria-label={`${isEn ? "Open source code repository for" : "Mở mã nguồn cho"} ${exercise.title}`}
                            >
                              <Github className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{isEn ? "Source Code" : "Mã Nguồn"}</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                        {exercise.description}
                      </p>

                      {/* Screenshot Previews */}
                      {exercise.images && exercise.images.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-800/80">
                          <span className="text-[11px] font-mono text-slate-400 block">
                            {isEn ? "Screenshots & Execution Proof:" : "Minh chứng thực thi & Giao diện:"}
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {exercise.images.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                type="button"
                                onClick={(e) => {
                                  triggerThumbRef.current = e.currentTarget;
                                  setPreviewImage({
                                    url: img.imageUrl,
                                    caption: img.caption || exercise.title,
                                  });
                                }}
                                className="group relative rounded-lg overflow-hidden border border-slate-800 hover:border-indigo-500/60 bg-slate-950 aspect-video flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                aria-label={`${isEn ? "Enlarge image" : "Phóng to hình ảnh"} ${img.caption || ""}`}
                              >
                                <img
                                  src={img.imageUrl}
                                  alt={img.caption || exercise.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-mono">
                                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                                  <span>{isEn ? "Preview" : "Xem"}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                /* Informational Panel when no standalone homework exists */
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {isEn
                        ? "No standalone demo artifact is linked for this module. The module focuses on the curriculum topics shown above."
                        : "Module này không có demo độc lập được liên kết. Nội dung tập trung vào các chủ đề học tập được trình bày phía trên."}
                    </p>
                  </div>
                </div>
              )}
            </section>
          </section>
        </div>
      </main>

      {/* Accessible Screenshot Lightbox Modal */}
      {previewImage && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={previewImage.caption || "Screenshot Preview"}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
              <span className="text-xs font-mono font-medium text-slate-300 truncate">
                {previewImage.caption}
              </span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={isEn ? "Close preview modal" : "Đóng xem trước"}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/60">
              <img
                src={previewImage.url}
                alt={previewImage.caption}
                className="max-h-[75vh] w-auto object-contain rounded-lg border border-slate-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaiTap;
