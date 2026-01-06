// Main services - Chế độ dữ liệu cứng (không cần backend)

export const API_CONFIG = {
  BASE_URL: "", // Không cần backend
  CACHE_DURATION: 5 * 60 * 1000,
  MODE: "HARDCODED",
};

// Re-export all services
export { projectAPI } from "./projectService";
export { weeksAPI } from "./weekService";
export { exercisesAPI, baiTapAPI } from "./exerciseService";
export { techStackAPI } from "./techStackService";
