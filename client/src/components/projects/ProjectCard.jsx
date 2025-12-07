import React from "react";
import LazyImage from "../layout/LazyImage";
import ImageCarousel from "../common/ImageCarousel";
import {
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Code,
  Layers,
  Briefcase,
  BookOpen,
  Sparkles,
  Star,
  Calendar,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

const ProjectCard = React.memo(
  ({ project, isAdmin, onEdit, onDelete, onView, formatDate }) => {
    // Safety checks for project data
    if (!project) return null;
    const getCategoryIcon = (category) => {
      const icons = {
        "Web App": <Code className="w-5 h-5" />,
        "Mobile App": <Layers className="w-5 h-5" />,
        "Landing Page": <Briefcase className="w-5 h-5" />,
        "Backend API": <BookOpen className="w-5 h-5" />,
        Game: <Star className="w-5 h-5" />,
        Other: <Sparkles className="w-5 h-5" />,
      };
      return icons[category] || <Code className="w-5 h-5" />;
    };

    const getStatusColor = (status) => {
      const colors = {
        Planning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
        Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        "On Hold": "bg-gray-500/20 text-gray-400 border-gray-500/30",
      };
      return colors[status] || colors["In Progress"];
    };

    const getStatusText = (status) => {
      const texts = {
        Planning: "Đang lập kế hoạch",
        "In Progress": "Đang thực hiện",
        Completed: "Hoàn thành",
        "On Hold": "Tạm dừng",
      };
      return texts[status] || status;
    };

    return (
      <div 
        className="group relative rounded overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform-gpu border-2 border-cyan-800/25 hover:border-cyan-600/60"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6, 182, 212, 0.15), rgba(8, 145, 178, 0.08) 40%, rgba(15, 23, 42, 1) 70%)'
        }}
      >
        {/* Diagonal gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-cyan-950/60"></div>
        
        {/* Animated shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

        <div className="relative p-6">
          {/* Cover Image */}
          {(project.images && project.images.length > 0) || project.coverImage ? (
            <div className="relative mb-4 overflow-hidden rounded-sm group/image h-48">
              {project.images && project.images.length > 0 ? (
                <ImageCarousel 
                  images={project.images} 
                  alt={project.title || project.name || "Project image"} 
                />
              ) : (
                <>
                  <LazyImage
                    src={project.coverImage}
                    alt={project.title || project.name || "Project image"}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholderClassName="w-full h-48 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </>
              )}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onView?.(project);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600/90 hover:bg-cyan-600 text-white text-[10px] font-mono font-semibold rounded backdrop-blur-sm transition-all duration-300"
                >
                  <Eye className="w-3 h-3" />
                  XEM CHI TIẾT
                </button>
              </div>
            </div>
          ) : null}
          
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="flex items-center gap-3 flex-1 cursor-pointer"
              onClick={() => onView?.(project)}
            >
              <div className="p-2 bg-teal-600/30 border border-teal-500/50 rounded">
                {getCategoryIcon(project.category)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 line-clamp-1">
                  {project.title || project.name || "Unnamed Project"}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-sm text-[10px] font-mono font-bold border mt-1 ${getStatusColor(
                    project.status
                  )}`}
                >
                  {getStatusText(project.status).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => onEdit(project)}
                  className="p-2 text-blue-300 hover:text-blue-200 bg-slate-700/60 hover:bg-slate-600/70 border-2 border-slate-600/70 hover:border-slate-500/80 rounded transition-all duration-300"
                  title="Edit Project"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-2 text-red-300 hover:text-red-200 bg-slate-700/60 hover:bg-slate-600/70 border-2 border-slate-600/70 hover:border-slate-500/80 rounded transition-all duration-300"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {project.description || "No description available"}
          </p>

          {/* Dates */}
          {(project.startDate || project.endDate) && (
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
              {project.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Start: {formatDate(project.startDate)}</span>
                </div>
              )}
              {project.endDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>End: {formatDate(project.endDate)}</span>
                </div>
              )}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView?.(project);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700/60 hover:bg-slate-600/70 text-slate-200 hover:text-slate-100 border-2 border-slate-700/30 hover:border-blue-500/60 rounded transition-all duration-300 text-sm font-mono font-semibold"
            >
              <Eye className="w-4 h-4" />
              Chi Tiết
            </button>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-700/60 hover:bg-slate-600/70 text-slate-200 hover:text-slate-100 border-2 border-slate-700/30 hover:border-blue-500/60 rounded transition-all duration-300 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
                title="Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-700/60 hover:bg-slate-600/70 text-slate-200 hover:text-slate-100 border-2 border-slate-700/30 hover:border-blue-500/60 rounded transition-all duration-300 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
