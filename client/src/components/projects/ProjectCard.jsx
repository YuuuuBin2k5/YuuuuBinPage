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
      <div className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 backdrop-blur-sm">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

        <div className="relative">
          {/* Cover Image */}
          {(project.images && project.images.length > 0) || project.coverImage ? (
            <div className="relative mb-4 overflow-hidden rounded-xl group/image h-48">
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
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onView?.(project);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-sm rounded-lg backdrop-blur-sm transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  Xem chi tiết
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
              <div className="p-2 bg-purple-500/20 rounded-lg">
                {getCategoryIcon(project.category)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {project.title || project.name || "Unnamed Project"}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(
                    project.status
                  )}`}
                >
                  {getStatusText(project.status)}
                </span>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => onEdit(project)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
                  title="Edit Project"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
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
          <div className="flex flex-wrap gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView?.(project);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all duration-300 text-sm"
            >
              <Eye className="w-4 h-4" />
              Chi tiết
            </button>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 transition-all duration-300 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-600/20 text-gray-400 border border-gray-500/30 rounded-lg hover:bg-gray-600/30 transition-all duration-300 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                Code
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
