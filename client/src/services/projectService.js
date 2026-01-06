// Service cho Projects - Sử dụng dữ liệu cứng (không cần backend)
import { projectsData } from "../data/projectsData";

// Project API Functions - Dữ liệu cứng
export const projectAPI = {
  // Get all projects
  getAll: async () => {
    return Promise.resolve([...projectsData]);
  },

  // Get project by ID
  getById: async (id) => {
    const project = projectsData.find((p) => p.id === id);
    if (!project) throw new Error("Project not found");
    return Promise.resolve({ ...project });
  },

  // Get projects by category
  getByCategory: async (category) => {
    const filtered = projectsData.filter((p) => p.category === category);
    return Promise.resolve([...filtered]);
  },

  // Get featured projects
  getFeatured: async () => {
    const featured = projectsData.filter((p) => p.featured);
    return Promise.resolve([...featured]);
  },

  // Create (disabled in hardcoded mode)
  create: async (projectData) => {
    console.log("Create project (hardcoded mode):", projectData);
    alert("Chế độ dữ liệu cứng - Không thể thêm project. Vui lòng bật backend.");
    throw new Error("Hardcoded mode - Cannot create project");
  },

  // Update (disabled)
  update: async (id, projectData) => {
    console.log("Update project (hardcoded mode):", id, projectData);
    alert("Chế độ dữ liệu cứng - Không thể cập nhật project. Vui lòng bật backend.");
    throw new Error("Hardcoded mode - Cannot update project");
  },

  // Delete (disabled)
  delete: async (id) => {
    console.log("Delete project (hardcoded mode):", id);
    alert("Chế độ dữ liệu cứng - Không thể xóa project. Vui lòng bật backend.");
    throw new Error("Hardcoded mode - Cannot delete project");
  },
};
