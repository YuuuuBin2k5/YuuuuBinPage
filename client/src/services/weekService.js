import { getCachedData, setCachedData, clearCache } from "./cacheUtils";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://server-portfolio-dymu.onrender.com";

// Weeks API Functions
export const weeksAPI = {
  // Get all weeks
  getAll: async () => {
    const cacheKey = "weeks_all";
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/weeks`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch weeks");

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching weeks:", error);
      throw error;
    }
  },

  // Get week by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weeks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch week");
      return await response.json();
    } catch (error) {
      console.error("Error fetching week:", error);
      throw error;
    }
  },

  // Get current weeks
  getCurrent: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/weeks/current`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch current weeks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching current weeks:", error);
      throw error;
    }
  },

  // Get upcoming weeks
  getUpcoming: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/weeks/upcoming`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch upcoming weeks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching upcoming weeks:", error);
      throw error;
    }
  },

  // Create new week
  create: async (weekData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weeks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weekData),
      });
      if (!response.ok) throw new Error("Failed to create week");

      // Clear cache after successful create
      clearCache("weeks_all");
      clearCache("baitap_all_data");

      return await response.json();
    } catch (error) {
      console.error("Error creating week:", error);
      throw error;
    }
  },

  // Update week
  update: async (id, weekData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weeks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weekData),
      });
      if (!response.ok) throw new Error("Failed to update week");

      // Clear cache after successful update
      clearCache("weeks_all");
      clearCache("baitap_all_data");

      return await response.json();
    } catch (error) {
      console.error("Error updating week:", error);
      throw error;
    }
  },

  // Delete week
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weeks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete week");

      // Clear cache after successful delete
      clearCache("weeks_all");
      clearCache("baitap_all_data");

      return true;
    } catch (error) {
      console.error("Error deleting week:", error);
      throw error;
    }
  },
};
