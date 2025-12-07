import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Calendar,
  Link,
  Github,
  Image as ImageIcon,
  Copy,
} from "lucide-react";
import LazyImage from "../layout/LazyImage";
import MultiImageUploader from "../common/MultiImageUploader";

const SimpleProjectForm = ({ isOpen, onClose, onSubmit, project = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    status: "In Progress",
    startDate: "",
    endDate: "",
    demoUrl: "",
    githubUrl: "",
    coverImage: "",
    images: [],
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Validate URL lengths
      if (formData.coverImage && formData.coverImage.length > 2000) {
        alert(
          "URL hình ảnh quá dài (tối đa 2000 ký tự). Hiện tại: " +
            formData.coverImage.length +
            " ký tự"
        );
        return;
      }
      if (formData.demoUrl && formData.demoUrl.length > 2000) {
        alert(
          "URL demo quá dài (tối đa 2000 ký tự). Hiện tại: " +
            formData.demoUrl.length +
            " ký tự"
        );
        return;
      }
      if (formData.githubUrl && formData.githubUrl.length > 2000) {
        alert(
          "URL GitHub quá dài (tối đa 2000 ký tự). Hiện tại: " +
            formData.githubUrl.length +
            " ký tự"
        );
        return;
      }

      console.log("=== SUBMITTING PROJECT FORM ===");
      console.log("Form data:", formData);
      console.log("Images:", formData.images);
      console.log("Images count:", formData.images?.length || 0);
      
      onSubmit(formData);
    },
    [formData, onSubmit]
  );

  const handleChange = useCallback((e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleClose = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      category: "",
      status: "In Progress",
      startDate: "",
      endDate: "",
      demoUrl: "",
      githubUrl: "",
      coverImage: "",
    });
    onClose();
  }, [onClose]);

  // Reset form when modal opens/closes or project changes
  useEffect(() => {
    if (isOpen) {
      if (project) {
        console.log("=== LOADING PROJECT FOR EDIT ===");
        console.log("Project:", project);
        console.log("Project images:", project.images);
        console.log("Images count:", project.images?.length || 0);
        
        setFormData({
          name: project.title || project.name || "",
          description: project.description || "",
          category: project.category || "",
          status: project.status || "In Progress",
          startDate: project.startDate || "",
          endDate: project.endDate || "",
          demoUrl: project.demoUrl || "",
          githubUrl: project.githubUrl || "",
          coverImage: project.coverImage || "",
          images: project.images || [],
        });
      } else {
        setFormData({
          name: "",
          description: "",
          category: "",
          status: "IN_PROGRESS",
          startDate: "",
          endDate: "",
          demoUrl: "",
          githubUrl: "",
          coverImage: "",
          images: [],
        });
      }
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-modal p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-slate-900/95 border border-purple-500/30 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter project description"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select category</option>
                <option value="Web App">Web App</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Backend API">Backend API</option>
                <option value="Game">Game</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Link size={16} />
                Demo URL
              </label>
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://your-demo.com"
                maxLength={2000}
              />
              {formData.demoUrl && formData.demoUrl.length > 1500 && (
                <div className="text-xs text-gray-400 mt-1">
                  {formData.demoUrl.length}/2000 ký tự
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Github size={16} />
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://github.com/username/repo"
                maxLength={2000}
              />
              {formData.githubUrl && formData.githubUrl.length > 1500 && (
                <div className="text-xs text-gray-400 mt-1">
                  {formData.githubUrl.length}/2000 ký tự
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <ImageIcon size={16} />
                Ảnh dự án (nhiều ảnh)
              </label>
              <MultiImageUploader
                images={formData.images}
                onChange={(images) =>
                  setFormData((prev) => ({ ...prev, images }))
                }
                maxImages={15}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              {project ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleProjectForm;
