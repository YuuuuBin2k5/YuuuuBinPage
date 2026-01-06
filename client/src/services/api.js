// API file - Chế độ dữ liệu cứng (không cần backend)

// Re-export all services
export { projectAPI } from "./projectService";
export { weeksAPI } from "./weekService";
export { exercisesAPI } from "./exerciseService";
export { techStackAPI } from "./techStackService";

// Export cache utilities (giữ lại để tương thích)
export {
  getCachedData,
  setCachedData,
  clearCache,
  clearCacheByPattern,
} from "./cacheUtils";

// API Configuration (không sử dụng trong chế độ hardcoded)
export const API_CONFIG = {
  BASE_URL: "", // Không cần backend
  CACHE_DURATION: 5 * 60 * 1000,
  MODE: "HARDCODED", // Đánh dấu đang dùng dữ liệu cứng
};
