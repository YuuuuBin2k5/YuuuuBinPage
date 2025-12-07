import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { projectAPI } from "../services/projectService";

const DataContext = createContext(null);

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEY = "app_data_cache";

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState(null);
  const [error, setError] = useState(null);

  // Load cache from localStorage
  const loadFromCache = useCallback(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - timestamp < CACHE_DURATION) {
          console.log("✅ Loading from cache");
          setProjects(data);
          setLastFetch(timestamp);
          setLoading(false);
          return true;
        } else {
          console.log("⏰ Cache expired");
          localStorage.removeItem(CACHE_KEY);
        }
      }
    } catch (err) {
      console.error("Error loading cache:", err);
    }
    return false;
  }, []);

  // Save to cache
  const saveToCache = useCallback((data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      console.log("💾 Data saved to cache");
    } catch (err) {
      console.error("Error saving cache:", err);
    }
  }, []);

  // Fetch projects from API
  const fetchProjects = useCallback(
    async (force = false) => {
      // If not forcing and cache is valid, skip fetch
      if (!force && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
        console.log("⚡ Using cached data, skipping fetch");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("🌐 Fetching projects from API...");
        const data = await projectAPI.getAll();

        if (!data || data.length === 0) {
          console.warn("No projects returned from API");
          setProjects([]);
          return;
        }

        // Map API response
        const mappedProjects = data.map((project) => ({
          ...project,
          imageUrl: project.coverImage || project.imageUrl || "",
          liveUrl: project.demoUrl || project.liveUrl,
        }));

        console.log(`✅ Loaded ${mappedProjects.length} projects`);
        setProjects(mappedProjects);
        setLastFetch(Date.now());

        // Save to cache
        saveToCache(mappedProjects);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
        setError(err.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    },
    [lastFetch, saveToCache]
  );

  // Initial load - try cache first
  useEffect(() => {
    const hasCache = loadFromCache();

    // If no cache or cache expired, fetch from API
    if (!hasCache) {
      fetchProjects();
    }
  }, []);

  // Refresh data manually
  const refreshData = useCallback(() => {
    console.log("🔄 Manual refresh requested");
    return fetchProjects(true);
  }, [fetchProjects]);

  // Clear cache
  const clearCache = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    setProjects([]);
    setLastFetch(null);
    console.log("🗑️ Cache cleared");
  }, []);

  const value = {
    projects,
    loading,
    error,
    lastFetch,
    refreshData,
    clearCache,
    fetchProjects,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};
