import React, { useEffect } from "react";
import {
  X,
  Clock,
  Globe,
  Github,
  Code2,
  Star,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useViewedExercises } from "../../hooks/useViewedExercises";

const ExerciseDetailModal = ({ exercise, isOpen, onClose }) => {
  const { markAsViewed } = useViewedExercises();

  // Mark as viewed when modal opens
  useEffect(() => {
    if (isOpen && exercise?.id) {
      markAsViewed(exercise.id);
    }
  }, [isOpen, exercise?.id, markAsViewed]);

  // Handler for link clicks - also marks as viewed
  const handleLinkClick = () => {
    if (exercise?.id) {
      markAsViewed(exercise.id);
    }
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !exercise) return null;

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    const colors = {
      EASY: "from-emerald-500 to-green-500",
      MEDIUM: "from-amber-500 to-orange-500",
      HARD: "from-red-500 to-rose-500",
    };
    return colors[difficulty?.toUpperCase()] || colors.MEDIUM;
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      HTML: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      CSS: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      JAVASCRIPT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      REACT: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      BACKEND: "bg-green-500/20 text-green-400 border-green-500/30",
      FULLSTACK: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return (
      colors[category?.toUpperCase()] ||
      "bg-slate-500/20 text-slate-400 border-slate-500/30"
    );
  };

  const difficultyGradient = getDifficultyColor(exercise.difficulty);
  const categoryClass = getCategoryColor(exercise.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-800/50 animate-slideUp">
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[92vh] custom-scrollbar">
          {/* Close Button - Minimal */}
          <button
            onClick={onClose}
            className="sticky top-4 left-full -ml-12 z-20 w-10 h-10 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-slate-400 hover:text-white rounded-full transition-all duration-200 border border-slate-700/50 flex items-center justify-center group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Content Container */}
          <div className="px-8 pb-8 -mt-6">
            {/* Header Section */}
            <div className="mb-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {exercise.title}
              </h1>

              {/* Meta Pills - Horizontal */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${categoryClass}`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  {exercise.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${difficultyGradient} text-white text-xs font-semibold`}
                >
                  <Star className="w-3.5 h-3.5" />
                  {exercise.difficulty}
                </span>
                {exercise.estimatedTime && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {exercise.estimatedTime} phút
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-3">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Mô Tả
              </h3>
              <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/40">
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {exercise.description}
                </p>
              </div>
            </div>

            {/* Instructions */}
            {exercise.instructions && (
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Hướng Dẫn Thực Hiện
                </h3>
                <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/40">
                  <div className="space-y-3">
                    {exercise.instructions
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, index) => {
                        const isNumbered = /^\d+\./.test(line.trim());
                        const cleanLine = line.trim().replace(/^\d+\.\s*/, "");

                        return (
                          <div key={index} className="flex gap-3 items-start">
                            {isNumbered && (
                              <div className="flex-shrink-0 w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 text-xs font-semibold border border-amber-500/30">
                                {line.match(/^\d+/)[0]}
                              </div>
                            )}
                            <p
                              className={`text-slate-300 text-sm leading-relaxed ${
                                isNumbered ? "flex-1" : "ml-9"
                              }`}
                            >
                              {cleanLine}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* Hints */}
            {exercise.hints && exercise.hints.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-3">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Gợi Ý
                </h3>
                <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/40">
                  <div className="space-y-3">
                    {exercise.hints.map((hint, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                        </div>
                        <p className="flex-1 text-slate-300 text-sm leading-relaxed">
                          {hint}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700/30">
              {exercise.demoUrl && (
                <a
                  href={exercise.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="group flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Xem Demo Live</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              {exercise.githubUrl && (
                <a
                  href={exercise.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="group flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Xem Source Code</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7 0%, #ec4899 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9333ea 0%, #db2777 100%);
        }
      `,
        }}
      />
    </div>
  );
};

export default ExerciseDetailModal;
