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
  Terminal,
  Lightbulb,
  Calendar,
  Eye,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import { useViewedExercises } from "../../hooks/useViewedExercises";
import ImageCarousel from "../common/ImageCarousel";

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

  // Memoize colors - MUST be before early return
  const categoryClass = React.useMemo(() => {
    if (!exercise) return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    const colors = {
      HTML: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      CSS: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      JAVASCRIPT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      REACT: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      BACKEND: "bg-green-500/20 text-green-400 border-green-500/30",
      FULLSTACK: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return (
      colors[exercise.category?.toUpperCase()] ||
      "bg-slate-500/20 text-slate-400 border-slate-500/30"
    );
  }, [exercise]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-fade-in">
      {/* Backdrop - Reduced blur for performance */}
      <div
        className="absolute inset-0 bg-slate-950/95"
        onClick={onClose}
      ></div>

      {/* Modal - Reduced blur for performance */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden bg-slate-900/98 rounded-2xl shadow-2xl border border-slate-800/50 modal-slide-up will-change-transform">
        {/* Scrollable Content - Hardware accelerated */}
        <div className="overflow-y-auto max-h-[92vh] custom-scrollbar transform-gpu">
          {/* Close Button - Minimal */}
          <button
            onClick={onClose}
            className="sticky top-4 left-full -ml-12 z-20 w-10 h-10 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-slate-400 hover:text-white rounded-full transition-all duration-200 border border-slate-700/50 flex items-center justify-center group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Content Container */}
          <div className="px-8 pb-8 -mt-6">
            {/* Header Section - Terminal Style */}
            <div className="mb-6">
              {/* Terminal Header */}
              <div className="bg-gradient-to-r from-slate-950 to-slate-900 rounded-t-lg border border-slate-700/50 border-b-0 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider ml-2">
                  exercise.details
                </span>
              </div>

              {/* Terminal Content */}
              <div className="bg-black/40 rounded-b-lg border border-slate-700/50 border-t-0 p-6">
                {/* Title with prompt */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-emerald-400 font-mono text-sm mt-1">$</span>
                  <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight flex-1">
                    {exercise.title}
                  </h1>
                </div>

                {/* Meta Info Grid - Developer Style */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Category</span>
                    </div>
                    <span className={`text-xs font-semibold ${categoryClass.split(' ')[1]}`}>
                      {exercise.category}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Level</span>
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {exercise.difficulty}
                    </span>
                  </div>

                  {exercise.estimatedTime && (
                    <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Duration</span>
                      </div>
                      <span className="text-xs font-semibold text-white">
                        {exercise.estimatedTime} min
                      </span>
                    </div>
                  )}

                  {exercise.weekTitle && (
                    <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Week</span>
                      </div>
                      <span className="text-xs font-semibold text-white truncate block">
                        {exercise.weekTitle}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Images Section */}
            {exercise.images && exercise.images.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                  <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
                    <ImageIcon className="w-4 h-4 inline mr-2 text-cyan-400" />
                    Screenshots
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    ({exercise.images.length})
                  </span>
                </div>
                <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/40">
                  <div className="h-64 rounded-lg overflow-hidden">
                    <ImageCarousel images={exercise.images} alt={exercise.title} />
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 inline mr-2 text-blue-400" />
                  Description
                </h3>
              </div>
              <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/40">
                <div className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-mono">
                    {exercise.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            {exercise.instructions && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                  <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
                    <Layers className="w-4 h-4 inline mr-2 text-amber-400" />
                    Implementation Steps
                  </h3>
                </div>
                <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/40">
                  <div className="space-y-3">
                    {exercise.instructions
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, index) => {
                        const isNumbered = /^\d+\./.test(line.trim());
                        const cleanLine = line.trim().replace(/^\d+\.\s*/, "");

                        return (
                          <div key={index} className="flex gap-3 items-start group hover:bg-slate-800/30 p-2 rounded-lg transition-colors">
                            {isNumbered ? (
                              <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center text-amber-400 text-xs font-mono font-bold border border-amber-500/30 group-hover:border-amber-500/50 transition-colors">
                                {line.match(/^\d+/)[0]}
                              </div>
                            ) : (
                              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50"></div>
                              </div>
                            )}
                            <p className="flex-1 text-slate-300 text-sm leading-relaxed font-mono">
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
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 inline mr-2 text-emerald-400" />
                    Hints & Tips
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    ({exercise.hints.length})
                  </span>
                </div>
                <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/40">
                  <div className="space-y-3">
                    {exercise.hints.map((hint, index) => (
                      <div key={index} className="flex gap-3 items-start group hover:bg-slate-800/30 p-3 rounded-lg transition-colors border border-transparent hover:border-emerald-500/20">
                        <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors">
                          <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-emerald-400 uppercase">Hint #{index + 1}</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed font-mono">
                            {hint}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons - Terminal Style */}
            <div className="pt-6 border-t border-slate-700/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
                  <Terminal className="w-4 h-4 inline mr-2 text-purple-400" />
                  Quick Actions
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exercise.demoUrl && (
                  <a
                    href={exercise.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-blue-400/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Globe className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">LIVE DEMO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  </a>
                )}

                {exercise.githubUrl && (
                  <a
                    href={exercise.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-mono font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-slate-500/30 hover:border-slate-400/50 hover:shadow-lg hover:shadow-slate-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Github className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">SOURCE CODE</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform relative z-10" />
                  </a>
                )}
              </div>

              {/* Additional Info Footer */}
              {exercise.createdAt && (
                <div className="mt-4 pt-4 border-t border-slate-700/30">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Created: {new Date(exercise.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5" />
                      <span>ID: #{exercise.id}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default React.memo(ExerciseDetailModal);
