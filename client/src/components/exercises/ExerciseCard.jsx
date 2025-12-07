import React, { useState, useEffect } from "react";
import {
  Clock,
  Globe,
  Github,
  Code2,
  Star,
  Image as ImageIcon,
  ArrowRight,
  Eye,
  CheckCircle2,
  Edit,
} from "lucide-react";
import { useViewedExercises } from "../../hooks/useViewedExercises";
import ImageCarousel from "../common/ImageCarousel";

const ExerciseCard = ({ exercise, index, onClick, onEdit, isAdmin }) => {
  const [imageError, setImageError] = useState(false);
  const { isViewed, getViewCount, markAsViewed } = useViewedExercises();

  const exerciseViewed = isViewed(exercise.id);
  const viewCount = getViewCount(exercise.id);

  // Handler để mark as viewed khi click vào links
  const handleLinkClick = (e) => {
    e.stopPropagation();
    markAsViewed(exercise.id);
  };

  // Handler cho nút Chi Tiết
  const handleDetailClick = () => {
    markAsViewed(exercise.id);
    onClick();
  };

  // Unified color scheme for all badges - teal/emerald theme
  const categoryClass = "bg-teal-600/30 text-teal-200 border-teal-500/50";

  return (
    <div
      className={`stagger-item group relative rounded overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform-gpu border-2 ${
        exerciseViewed
          ? "opacity-90 hover:opacity-100 border-cyan-700/30 hover:border-cyan-500/70"
          : "border-cyan-800/25 hover:border-cyan-600/60"
      }`}
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6, 182, 212, 0.15), rgba(8, 145, 178, 0.08) 40%, rgba(15, 23, 42, 1) 70%)'
      }}
    >
      {/* Diagonal gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-cyan-950/60"></div>
      
      {/* Animated shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

      <div className="relative flex flex-col gap-4 p-6">
        {/* Exercise Image */}
        <div className="relative w-full h-48 flex-shrink-0 rounded-sm overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 group-hover:shadow-lg transition-all duration-500 group/imagearea">
          {exercise.images && exercise.images.length > 0 ? (
            <>
              <ImageCarousel images={exercise.images} alt={exercise.title} />
            </>
          ) : exercise.imageUrl && !imageError ? (
            <>
              <img
                src={exercise.imageUrl}
                alt={exercise.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover/imagearea:scale-105"
                onError={() => setImageError(true)}
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover/imagearea:opacity-40 transition-opacity"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No preview</p>
              </div>
            </div>
          )}

          {/* Viewed Badge - Developer Style: Bottom right corner - Fades ONLY on image hover */}
          {exerciseViewed && (
            <div className="absolute bottom-2 right-2 z-20 group-hover/imagearea:opacity-0 group-hover/imagearea:translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600/90 rounded shadow-lg border border-emerald-500/70 animate-in slide-in-from-bottom duration-300">
                <div className="w-1.5 h-1.5 bg-emerald-200 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono font-bold text-white tracking-wide">
                  {viewCount > 1 ? `VIEWED×${viewCount}` : "COMPLETED"}
                </span>
              </div>
            </div>
          )}

          {/* Time Badge - Bottom left - Fades ONLY on image hover to show caption */}
          {exercise.estimatedTime && (
            <div className="absolute bottom-2 left-2 z-20 group-hover/imagearea:opacity-0 group-hover/imagearea:translate-y-2 transition-all duration-300">
              <div className="px-2.5 py-1 rounded bg-slate-800/95 backdrop-blur-sm border border-slate-600/70 text-slate-100 text-[10px] font-mono font-semibold flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {exercise.estimatedTime}p
              </div>
            </div>
          )}
        </div>

        {/* Exercise Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Header */}
          <div>
            {/* Category Badge */}
            <div className="mb-3">
              <span
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold border ${categoryClass} backdrop-blur-sm inline-flex items-center gap-1.5`}
              >
                <Code2 className="w-3.5 h-3.5" />
                {exercise.category}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 line-clamp-2">
              {exercise.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
              {exercise.description}
            </p>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
              {/* View Details Button */}
              <button
                onClick={handleDetailClick}
                className="flex-1 px-4 py-2.5 bg-slate-700/60 hover:bg-slate-600/70 border border-slate-600/70 hover:border-slate-500/80 text-slate-200 hover:text-slate-100 rounded transition-all duration-300 flex items-center justify-center gap-2 text-sm font-mono font-semibold group/detail"
              >
                <ArrowRight className="w-4 h-4 group-hover/detail:translate-x-0.5 transition-transform" />
                <span>Chi Tiết</span>
              </button>

              {/* Edit Button - Admin Only */}
              {isAdmin && onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(exercise);
                  }}
                  className="p-2.5 bg-slate-700/60 hover:bg-slate-600/70 border border-slate-600/70 hover:border-slate-500/80 text-slate-200 hover:text-slate-100 rounded transition-all duration-300 hover:scale-110"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}

              {/* Quick Action Buttons */}
              {(exercise.demoUrl || exercise.githubUrl) && (
                <div className="flex items-center gap-2">
                  {exercise.demoUrl && (
                    <a
                      href={exercise.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="group/link p-2.5 bg-slate-700/60 hover:bg-slate-600/70 border border-slate-600/70 hover:border-slate-500/80 text-slate-200 hover:text-slate-100 rounded transition-all duration-300 hover:scale-110"
                      title="Xem Demo"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {exercise.githubUrl && (
                    <a
                      href={exercise.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="group/link p-2.5 bg-slate-700/60 hover:bg-slate-600/70 border border-slate-600/70 hover:border-slate-500/80 text-slate-200 hover:text-slate-100 rounded transition-all duration-300 hover:scale-110"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExerciseCard);
