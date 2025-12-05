import { getCachedData, setCachedData, clearCache } from "./cacheUtils";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://server-portfolio-dymu.onrender.com";

// Combined Bai Tap API for better performance
export const baiTapAPI = {
  // Get all weeks and exercises in one request
  getAllData: async () => {
    const cacheKey = "baitap_all_data";
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/baitap/all`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch bai tap data");

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching bai tap data:", error);
      throw error;
    }
  },

  // Clear all baitap cache
  clearAllCache: () => {
    clearCache("baitap_all_data");
    clearCache("weeks_all");
    clearCache("exercises_all");
  },
};

// Exercises API Functions
export const exercisesAPI = {
  // Get all exercises
  getAll: async () => {
    const cacheKey = "exercises_all";
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/exercises`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch exercises");

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
    }
  },

  // Get exercise by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch exercise");
      return await response.json();
    } catch (error) {
      console.error("Error fetching exercise:", error);
      throw error;
    }
  },

  // Get exercises by week ID
  getByWeekId: async (weekId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/week/${weekId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch exercises for week");
      return await response.json();
    } catch (error) {
      console.error("Error fetching exercises for week:", error);
      throw error;
    }
  },

  // Get exercises by category
  getByCategory: async (category) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/exercises/category/${category}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok)
        throw new Error("Failed to fetch exercises by category");
      return await response.json();
    } catch (error) {
      console.error("Error fetching exercises by category:", error);
      throw error;
    }
  },

  // Get exercise count by week
  getCountByWeek: async (weekId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/exercises/week/${weekId}/count`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch exercise count");
      return await response.json();
    } catch (error) {
      console.error("Error fetching exercise count:", error);
      throw error;
    }
  },

  // Create new exercise
  create: async (exerciseData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });
      if (!response.ok) throw new Error("Failed to create exercise");

      // Clear cache after successful create
      clearCache("exercises_all");
      clearCache("baitap_all_data");

      return await response.json();
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
  },

  // Update exercise
  update: async (id, exerciseData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });
      if (!response.ok) throw new Error("Failed to update exercise");

      // Clear cache after successful update
      clearCache("exercises_all");
      clearCache("baitap_all_data");

      return await response.json();
    } catch (error) {
      console.error("Error updating exercise:", error);
      throw error;
    }
  },

  // Delete exercise
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete exercise");

      // Clear cache after successful delete
      clearCache("exercises_all");
      clearCache("baitap_all_data");

      return true;
    } catch (error) {
      console.error("Error deleting exercise:", error);
      throw error;
    }
  },
};
