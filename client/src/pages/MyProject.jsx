import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FONT_COINY } from "../utils/fonts";
import { useAuth } from "../contexts/AuthContext";
import { projectAPI } from "../services/api";
import { useDebounce } from "../hooks/usePerformance";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Calendar,
  User,
  Code,
  Sparkles,
  Eye,
  Clock,
  Star,
  Zap,
  Layers,
  Award,
  Target,
  BookOpen,
  Briefcase,
} from "lucide-react";
import ProjectForm from "../components/admin/SimpleProjectForm";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectDetailModal from "../components/projects/ProjectDetailModal";

function MyProject() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Load projects from API
  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await projectAPI.getAll();
      console.log("Loaded projects:", data); // Debug log
      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
      // Set empty array if backend fails
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleCreateProject = useCallback(async (projectData) => {
    try {
      const newProject = await projectAPI.create(projectData);
      setShowForm(false);
      setEditingProject(null);
      // Optimistically add to state instead of reloading
      setProjects((prev) => [...prev, newProject]);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  }, []);

  const handleEditProject = useCallback((project) => {
    setEditingProject(project);
    setShowForm(true);
  }, []);

  const handleUpdateProject = useCallback(
    async (projectData) => {
      try {
        if (!editingProject?.id) return;

        const updatedProject = await projectAPI.update(
          editingProject.id,
          projectData
        );
        setShowForm(false);
        setEditingProject(null);
        // Optimistically update in state
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? updatedProject : p))
        );
      } catch (error) {
        console.error("Error updating project:", error);
        alert("Error updating project. Please try again.");
      }
    },
    [editingProject]
  );

  const handleDeleteProject = useCallback(
    async (id) => {
      if (!confirm("⚠️ Bạn có chắc chắn muốn xóa dự án này không?")) return;

      try {
        await projectAPI.delete(id);
        // Optimistically remove from state
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project. Please try again.");
        // Reload on error
        await loadProjects();
      }
    },
    [loadProjects]
  );

  const handleViewProject = useCallback((project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      PLANNING:
        "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-400/40",
      IN_PROGRESS:
        "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-400/40",
      COMPLETED:
        "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-emerald-300 border-emerald-400/40",
      ON_HOLD:
        "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-slate-300 border-slate-400/40",
    };
    return colors[status] || colors["IN_PROGRESS"];
  };

  const getStatusIcon = (status) => {
    const icons = {
      PLANNING: <Target className="w-4 h-4" />,
      IN_PROGRESS: <Zap className="w-4 h-4" />,
      COMPLETED: <Award className="w-4 h-4" />,
      ON_HOLD: <Clock className="w-4 h-4" />,
    };
    return icons[status] || icons["IN_PROGRESS"];
  };

  const getCategoryIcon = (category) => {
    const icons = {
      WEB: <Code className="w-5 h-5" />,
      FRONTEND: <Layers className="w-5 h-5" />,
      BACKEND: <Briefcase className="w-5 h-5" />,
      ALGORITHM: <BookOpen className="w-5 h-5" />,
      AI: <Sparkles className="w-5 h-5" />,
      RESEARCH: <Star className="w-5 h-5" />,
    };
    return icons[category] || <Code className="w-5 h-5" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "ALL" || project.category === selectedCategory;
      const projectTitle = project.title || project.name || "";
      const projectDescription = project.description || "";
      const matchesSearch =
        projectTitle
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        projectDescription
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, debouncedSearchTerm]);

  // Memoized categories for better performance
  const categories = useMemo(
    () => [
      "ALL",
      "Web App",
      "Mobile App",
      "Landing Page",
      "Backend API",
      "Game",
      "Other",
    ],
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-32 h-32 border-4 border-cyan-500/30 border-b-cyan-400 rounded-full animate-spin"
            style={{ animationDelay: "150ms" }}
          ></div>
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-purple-400 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 px-6 py-8">
      {/* Header với hiệu ứng mystical */}
      <div className="max-w-7xl mx-auto">
        <div className="relative text-center mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-purple-600/10 via-cyan-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative">
            <h1
              className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4 animate-pulse"
              style={FONT_COINY}
            >
              ✨ MY PROJECTS ✨
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Khám phá những dự án huyền bí và sáng tạo trong hành trình coding
              của tôi
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 backdrop-blur-sm bg-slate-800/30 rounded-2xl p-6 border border-purple-500/20">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowForm(true);
                }}
                className="group relative px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tạo Dự Án Mới
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isAdmin={isAdmin}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onView={handleViewProject}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
              <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-lg"></div>
            </div>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">
              Không tìm thấy dự án
            </h3>
            <p className="text-slate-400">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}

        {/* Project Form Modal */}
        <ProjectForm
          isOpen={showForm}
          project={editingProject}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />

        {/* Project Detail Modal */}
        <ProjectDetailModal
          isOpen={showDetailModal}
          project={selectedProject}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProject(null);
          }}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/3 to-cyan-500/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2000ms" }}
        ></div>
      </div>
    </div>
  );
}

export default MyProject;
