import { getCachedData, setCachedData, clearCache } from "./cacheUtils";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://server-portfolio-dymu.onrender.com";

// Project API Functions
export const projectAPI = {
  // Get all projects with caching
  getAll: async () => {
    const cacheKey = "projects_all";
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Get project by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch project");
      return await response.json();
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  // Get projects by category
  getByCategory: async (category) => {
    const cacheKey = `projects_category_${category}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/category/${category}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch projects by category");

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching projects by category:", error);
      throw error;
    }
  },

  // Create new project
  create: async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error("Failed to create project");

      // Clear cache after successful create
      clearCache("projects_all");

      return await response.json();
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  // Update project
  update: async (id, projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error("Failed to update project");

      // Clear cache after successful update
      clearCache("projects_all");

      return await response.json();
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete project");

      // Clear cache after successful delete
      clearCache("projects_all");

      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },
};
