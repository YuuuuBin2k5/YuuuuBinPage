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
  BASE_URL: "http://localhost:8081/api",
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};
