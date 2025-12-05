import React, { useState, useEffect } from "react";
import LazyImage from "../layout/LazyImage";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Code,
  Layers,
  Briefcase,
  BookOpen,
  Sparkles,
  Star,
  Target,
  Zap,
  Award,
  Clock,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

const ProjectDetailModal = ({ isOpen, project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const getCategoryIcon = (category) => {
    const icons = {
      "Web App": <Code className="w-6 h-6" />,
      "Mobile App": <Layers className="w-6 h-6" />,
      "Landing Page": <Briefcase className="w-6 h-6" />,
      "Backend API": <BookOpen className="w-6 h-6" />,
      Game: <Star className="w-6 h-6" />,
      Other: <Sparkles className="w-6 h-6" />,
    };
    return icons[category] || <Code className="w-6 h-6" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      Planning:
        "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-400/40",
      "In Progress":
        "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-400/40",
      Completed:
        "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-emerald-300 border-emerald-400/40",
      "On Hold":
        "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-slate-300 border-slate-400/40",
    };
    return colors[status] || colors["In Progress"];
  };

  const getStatusIcon = (status) => {
    const icons = {
      Planning: <Target className="w-5 h-5" />,
      "In Progress": <Zap className="w-5 h-5" />,
      Completed: <Award className="w-5 h-5" />,
      "On Hold": <Clock className="w-5 h-5" />,
    };
    return icons[status] || icons["In Progress"];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl my-4 sm:my-8 bg-gradient-to-br from-slate-900/95 to-purple-900/20 border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-500/20 backdrop-blur-sm">
        {/* Glow Effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 rounded-3xl blur-sm"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative">
          {/* Header */}
          <div className="sticky top-0 z-[10] bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 p-4 sm:p-6 rounded-t-3xl">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl flex-shrink-0">
                  {getCategoryIcon(project.category)}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent break-words">
                    {project.title || project.name || "Unnamed Project"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                    <span
                      className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs sm:text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="group p-3 text-slate-400 hover:text-white hover:bg-red-500/20 border border-slate-600/50 hover:border-red-500/50 rounded-xl transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
            {/* Project Image */}
            {project.coverImage && (
              <div className="relative group">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  Hình ảnh dự án
                </h3>
                <div className="relative overflow-hidden rounded-2xl border border-purple-500/20">
                  <LazyImage
                    src={project.coverImage}
                    alt={project.title || project.name || "Project image"}
                    className="w-full h-auto max-h-96 object-cover"
                    placeholderClassName="w-full h-64 rounded-2xl"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Mô tả chi tiết
              </h3>
              <div className="bg-slate-800/30 border border-purple-500/20 rounded-2xl p-6">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {project.description ||
                    "Chưa có mô tả chi tiết cho dự án này."}
                </p>
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  Công nghệ sử dụng
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 rounded-xl text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {(project.startDate || project.endDate) && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Thời gian thực hiện
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.startDate && (
                    <div className="bg-slate-800/30 border border-green-500/20 rounded-xl p-4">
                      <div className="text-sm text-green-400 font-medium mb-1">
                        Bắt đầu
                      </div>
                      <div className="text-white font-semibold">
                        {formatDate(project.startDate)}
                      </div>
                    </div>
                  )}
                  {project.endDate && (
                    <div className="bg-slate-800/30 border border-red-500/20 rounded-xl p-4">
                      <div className="text-sm text-red-400 font-medium mb-1">
                        Kết thúc
                      </div>
                      <div className="text-white font-semibold">
                        {formatDate(project.endDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Links */}
            {(project.demoUrl || project.githubUrl) && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-purple-400" />
                  Liên kết
                </h3>
                <div className="flex flex-wrap gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/40 text-emerald-300 rounded-xl hover:from-emerald-600/30 hover:to-teal-600/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="relative flex items-center gap-3">
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-medium">Xem Demo</span>
                      </div>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-600/20 to-gray-600/20 border border-slate-500/40 text-slate-300 rounded-xl hover:from-slate-600/30 hover:to-gray-600/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-slate-400/20 to-gray-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="relative flex items-center gap-3">
                        <Github className="w-5 h-5" />
                        <span className="font-medium">Xem Source Code</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
