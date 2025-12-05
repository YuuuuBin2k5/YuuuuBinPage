// Main API configuration and shared utilities
export const API_CONFIG = {
  BASE_URL: "http://localhost:8081/api",
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// Re-export all services
export { projectAPI } from "./projectService";
export { weeksAPI } from "./weekService";
export { exercisesAPI, baiTapAPI } from "./exerciseService";
export { techStackAPI } from "./techStackService";
