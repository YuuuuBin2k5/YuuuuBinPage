import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { projectAPI } from "../services/api";
import { useDebounce } from "../hooks/usePerformance";
import { useTypewriter } from "../hooks/useTypewriter";
import {
  Plus,
  Code,
  Sparkles,
} from "lucide-react";
import ProjectForm from "../components/admin/SimpleProjectForm";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectDetailModal from "../components/projects/ProjectDetailModal";

function MyProject() {
  const { isAdmin } = useAuth();
  const {
    projects: cachedProjects,
    loading: dataLoading,
    refreshData,
  } = useData();
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

  // Typewriter effect for dynamic text - Real project technologies from course
  const typewriterTexts = [
    "Full-Stack Web Apps với Java & React",
    "Servlet/JSP - JavaServer Pages Development",
    "JSTL & Expression Language (EL) Integration",
    "JPA/Hibernate - O/R Mapping & EntityManager",
    "JDBC - PreparedStatement & Connection Pooling",
    "Session Management - Cookies & URL Rewriting",
    "JavaMail API - Email với SMTP Protocol",
    "HTML5 Semantic Elements & CSS3 Styling",
    "MySQL Database Design & SQL Queries",
    "RESTful API với Spring Boot Framework",
    "Responsive UI - Mobile-First Design",
    "Security - SQL Injection Prevention"
  ];
  
  const typedText = useTypewriter(typewriterTexts, 70, 30, 2000);

  // Use cached projects from context
  useEffect(() => {
    setProjects(cachedProjects);
    setLoading(dataLoading);
  }, [cachedProjects, dataLoading]);

  const handleCreateProject = useCallback(
    async (projectData) => {
      try {
        await projectAPI.create(projectData);
        setShowForm(false);
        setEditingProject(null);
        // Refresh cache after creating
        await refreshData();
      } catch (error) {
        console.error("Error creating project:", error);
        alert("Error creating project. Please try again.");
      }
    },
    [refreshData]
  );

  const handleEditProject = useCallback((project) => {
    console.log("=== EDIT PROJECT CLICKED ===");
    console.log("Project:", project);
    console.log("Project images:", project.images);
    console.log("Images count:", project.images?.length || 0);
    
    setEditingProject(project);
    setShowForm(true);
  }, []);

  const handleUpdateProject = useCallback(
    async (projectData) => {
      try {
        if (!editingProject?.id) return;

        await projectAPI.update(editingProject.id, projectData);
        setShowForm(false);
        setEditingProject(null);
        // Refresh cache after updating
        await refreshData();
      } catch (error) {
        console.error("Error updating project:", error);
        alert("Error updating project. Please try again.");
      }
    },
    [editingProject, refreshData]
  );

  const handleDeleteProject = useCallback(
    async (id) => {
      if (!confirm("⚠️ Bạn có chắc chắn muốn xóa dự án này không?")) return;

      try {
        await projectAPI.delete(id);
        // Refresh cache after deleting
        await refreshData();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project. Please try again.");
        // Refresh cache on error
        await refreshData();
      }
    },
    [refreshData]
  );

  const handleViewProject = useCallback((project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 -mt-24 pt-24">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="relative text-center mb-6">
          {/* Animated Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Compact Terminal-Style Header */}
          <div className="relative max-w-4xl mx-auto">
            {/* Terminal Top Bar with Glow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-950/80 to-slate-950/80 border border-blue-500/40 rounded-t mb-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" style={{ animationDuration: '2s' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.3s' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.6s' }}></div>
              </div>
              <span className="text-[9px] font-mono text-blue-400/60 uppercase tracking-wider ml-2 animate-pulse">
                projects.sh
              </span>
            </div>

            {/* Terminal Content with Scan Line */}
            <div className="relative bg-gradient-to-br from-slate-950/90 to-blue-950/50 border-x border-b border-blue-500/40 rounded-b p-4 overflow-hidden shadow-2xl shadow-blue-500/10">
              {/* Scan Line Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/5 to-transparent h-full animate-scan-slow"></div>
              </div>
              
              {/* Content Wrapper */}
              <div className="relative z-10">
              {/* Top Row: Command Line + Stats */}
              <div className="flex items-center justify-between gap-4 mb-3 animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Command Line */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-blue-400 font-mono text-sm">$</span>
                  <div className="w-1 h-4 bg-blue-400 animate-pulse"></div>
                  <span className="text-blue-300 font-mono text-sm">
                    <span className="text-cyan-400">cd</span> my-portfolio-projects
                  </span>
                </div>
                
                {/* Stats - Right Side */}
                <div className="hidden md:flex items-center gap-3">
                  <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-sm">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wide">
                      {filteredProjects.length} Dự Án
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-sm">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wide">
                      {projects.filter(p => p.status === 'Completed').length} Hoàn Thành
                    </span>
                  </div>
                </div>
              </div>

              {/* Title with Glitch Effect on Hover */}
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-mono text-left group cursor-default animate-in fade-in slide-in-from-left-4 duration-700" style={{ animationDelay: '0.2s' }}>
                <span className="text-white group-hover:animate-pulse">Dự Án</span>
                <span className="relative inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  <span className="relative z-10"> Của Tôi</span>
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                </span>
              </h1>

              {/* Description - Typewriter Effect with Glow */}
              <div className="text-sm text-slate-400 font-mono mb-3 leading-relaxed text-left h-6 animate-in fade-in duration-700" style={{ animationDelay: '0.4s' }}>
                <span className="text-slate-600"># </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {typedText}
                  {/* Text glow */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-sm"></span>
                </span>
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse shadow-lg shadow-cyan-400/50"></span>
              </div>

              {/* Tech Categories with Stagger Animation */}
              <div className="flex items-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0.6s' }}>
                <Code className="w-3 h-3 text-blue-400" />
                {["Web App", "Mobile", "API", "Landing", "Game"].map((cat, index) => (
                  <span
                    key={cat}
                    className="px-2 py-0.5 bg-teal-600/20 border border-teal-500/50 rounded-sm text-[10px] font-mono font-bold text-teal-300 uppercase tracking-wide hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default animate-in fade-in zoom-in-50"
                    style={{ animationDelay: `${0.7 + index * 0.05}s`, animationDuration: '300ms' }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
              </div>
            </div>
            
            {/* Decorative Divider */}
            <div className="relative mt-6 h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-shimmer"></div>
              
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="w-1 h-1 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-0.5 h-0.5 rounded-full bg-blue-300/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <div className="w-0.5 h-0.5 rounded-full bg-cyan-300/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-1 h-1 rounded-full bg-cyan-400/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              </div>
            </div>
            
            {/* Terminal-style separator text */}
            <div className="flex items-center justify-center gap-3 mt-4 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700/50"></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 py-1 bg-slate-900/50 border border-slate-700/30 rounded-sm">
                ─── My Portfolio ───
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-700/50"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="mb-8 backdrop-blur-sm bg-slate-800/30 rounded p-6 border-2 border-blue-600/25 hover:border-blue-500/50 transition-all duration-300">
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
                  className={`px-4 py-2 rounded font-mono font-semibold transition-all duration-300 border-2 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 border-blue-400/60"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border-slate-700/30 hover:border-blue-500/60"
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
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-semibold rounded transition-all duration-300 shadow-lg shadow-emerald-500/25 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Tạo Dự Án Mới
              </button>
            )}
          </div>
        </div>

          {/* Projects Grid - With Animation */}
          <div 
            key={`${selectedCategory}-${debouncedSearchTerm}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <ProjectCard
                project={project}
                isAdmin={isAdmin}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onView={handleViewProject}
                formatDate={formatDate}
              />
            </div>
          ))}
        </div>

          {/* Empty State - With Animation */}
          {filteredProjects.length === 0 && (
          <div className="text-center py-16 animate-in fade-in zoom-in-50 duration-500">
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
