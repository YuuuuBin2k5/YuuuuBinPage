// Legacy API file - now re-exports from organized service files
// This file is kept for backward compatibility

// Re-export all services
export { projectAPI } from "./projectService";
export { weeksAPI } from "./weekService";
export { exercisesAPI } from "./exerciseService";
export { techStackAPI } from "./techStackService";

// Export cache utilities for advanced usage
export {
  getCachedData,
  setCachedData,
  clearCache,
  clearCacheByPattern,
} from "./cacheUtils";

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "https://server-portfolio-dymu.onrender.com",
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};
