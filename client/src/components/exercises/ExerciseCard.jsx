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
  const [, forceUpdate] = useState(0);
  const { isViewed, getViewCount, markAsViewed } = useViewedExercises();

  const exerciseViewed = isViewed(exercise.id);
  const viewCount = getViewCount(exercise.id);

  // Handler để mark as viewed khi click vào links
  const handleLinkClick = (e) => {
    e.stopPropagation();
    markAsViewed(exercise.id);
    // Force re-render để cập nhật UI ngay lập tức
    forceUpdate((n) => n + 1);
  };

  // Handler cho nút Chi Tiết
  const handleDetailClick = () => {
    markAsViewed(exercise.id);
    forceUpdate((n) => n + 1);
    onClick();
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
    <div
      className={`group relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
        exerciseViewed
          ? "opacity-90 hover:opacity-100 border-2 border-slate-600/40 hover:border-slate-500/50"
          : "border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 bg-clip-padding hover:border-blue-500/40 hover:shadow-blue-500/20"
      }`}
      style={{
        animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-600/0 to-blue-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

      <div className="relative flex flex-col gap-4 p-6">
        {/* Exercise Image */}
        <div className="relative w-full h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 group-hover:shadow-lg transition-all duration-500">
          {exercise.images && exercise.images.length > 0 ? (
            <>
              <ImageCarousel images={exercise.images} alt={exercise.title} />
              {/* Checkmark for Viewed */}
              {exerciseViewed && (
                <div className="absolute bottom-3 right-3 bg-emerald-500/90 backdrop-blur-sm p-2 rounded-full shadow-lg animate-in fade-in zoom-in duration-300 z-20">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
            </>
          ) : exercise.imageUrl && !imageError ? (
            <>
              <img
                src={exercise.imageUrl}
                alt={exercise.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

              {/* Checkmark for Viewed */}
              {exerciseViewed && (
                <div className="absolute bottom-3 right-3 bg-emerald-500/90 backdrop-blur-sm p-2 rounded-full shadow-lg animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No preview</p>
              </div>
            </div>
          )}

          {/* Viewed Badge */}
          {exerciseViewed && (
            <div className="absolute top-3 right-3 z-10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full border border-blue-400/30 shadow-lg animate-in slide-in-from-right duration-300">
                <Eye className="w-3.5 h-3.5 text-blue-100" />
                <span className="text-xs font-semibold text-blue-50">
                  {viewCount > 1 ? `Xem ${viewCount} lần` : "Đã xem"}
                </span>
              </div>
            </div>
          )}

          {/* Difficulty Badge on Image */}
          <div className="absolute top-3 left-3">
            <div
              className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${difficultyGradient} font-semibold text-white text-xs shadow-lg backdrop-blur-sm flex items-center gap-1.5`}
            >
              <Star className="w-3.5 h-3.5" />
              {exercise.difficulty}
            </div>
          </div>

          {/* Time Badge */}
          {exercise.estimatedTime && (
            <div className="absolute top-3 right-3">
              <div className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${categoryClass} backdrop-blur-sm inline-flex items-center gap-1`}
              >
                <Code2 className="w-3 h-3" />
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
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 hover:text-blue-200 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold group/detail"
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
                  className="p-2.5 bg-gradient-to-r from-amber-600/20 to-orange-600/20 hover:from-amber-600/30 hover:to-orange-600/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 rounded-lg transition-all duration-300 hover:scale-110"
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
                      className="group/link p-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-300 hover:scale-110"
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
                      className="group/link p-2.5 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-400 hover:text-white rounded-lg transition-all duration-300 hover:scale-110"
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

// Add animation keyframes
const style = document.createElement("style");
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

export default React.memo(ExerciseCard);
