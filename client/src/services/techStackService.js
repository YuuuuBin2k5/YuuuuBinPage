import { getCachedData, setCachedData, clearCache } from "./cacheUtils";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://server-portfolio-dymu.onrender.com";

// Tech Stack API Functions
export const techStackAPI = {
  // Get all tech stacks
  getAll: async () => {
    const cacheKey = "tech_stacks_all";
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/tech-stacks`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch tech stacks");

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching tech stacks:", error);
      throw error;
    }
  },

  // Get tech stack by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tech-stacks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch tech stack");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tech stack:", error);
      throw error;
    }
  },

  // Create new tech stack
  create: async (techStackData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tech-stacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(techStackData),
      });
      if (!response.ok) throw new Error("Failed to create tech stack");

      // Clear cache after successful create
      clearCache("tech_stacks_all");

      return await response.json();
    } catch (error) {
      console.error("Error creating tech stack:", error);
      throw error;
    }
  },

  // Update tech stack
  update: async (id, techStackData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tech-stacks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(techStackData),
      });
      if (!response.ok) throw new Error("Failed to update tech stack");

      // Clear cache after successful update
      clearCache("tech_stacks_all");

      return await response.json();
    } catch (error) {
      console.error("Error updating tech stack:", error);
      throw error;
    }
  },

  // Delete tech stack
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tech-stacks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete tech stack");

      // Clear cache after successful delete
      clearCache("tech_stacks_all");

      return true;
    } catch (error) {
      console.error("Error deleting tech stack:", error);
      throw error;
    }
  },
};
