import { exercisesData, getAllBaiTapData } from "../data/baitapData";

// Combined Bai Tap API - Dữ liệu cứng
export const baiTapAPI = {
  // Get all weeks and exercises
  getAllData: async () => {
    // Simulate async behavior
    return Promise.resolve(getAllBaiTapData());
  },

  // Clear cache (không cần thiết với dữ liệu cứng, giữ lại để tương thích)
  clearAllCache: () => {
    console.log("Cache cleared (hardcoded data - no actual cache)");
  },
};

// Exercises API Functions - Dữ liệu cứng
export const exercisesAPI = {
  // Get all exercises
  getAll: async () => {
    return Promise.resolve([...exercisesData]);
  },

  // Get exercise by ID
  getById: async (id) => {
    const exercise = exercisesData.find((ex) => ex.id === id);
    if (!exercise) throw new Error("Exercise not found");
    return Promise.resolve({ ...exercise });
  },

  // Get exercises by week ID
  getByWeekId: async (weekId) => {
    const filtered = exercisesData.filter((ex) => ex.weekId === weekId);
    return Promise.resolve([...filtered]);
  },

  // Get exercises by category
  getByCategory: async (category) => {
    const filtered = exercisesData.filter((ex) => ex.category === category);
    return Promise.resolve([...filtered]);
  },

  // Get exercise count by week
  getCountByWeek: async (weekId) => {
    const count = exercisesData.filter((ex) => ex.weekId === weekId).length;
    return Promise.resolve(count);
  },

  // Create new exercise (chỉ log, không thực sự thêm vào dữ liệu cứng)
  create: async (exerciseData) => {
    console.log("Create exercise (hardcoded mode):", exerciseData);
    alert("Chế độ dữ liệu cứng - Không thể thêm bài tập mới. Vui lòng bật backend để sử dụng tính năng này.");
    throw new Error("Hardcoded mode - Cannot create exercise");
  },

  // Update exercise (chỉ log)
  update: async (id, exerciseData) => {
    console.log("Update exercise (hardcoded mode):", id, exerciseData);
    alert("Chế độ dữ liệu cứng - Không thể cập nhật bài tập. Vui lòng bật backend để sử dụng tính năng này.");
    throw new Error("Hardcoded mode - Cannot update exercise");
  },

  // Delete exercise (chỉ log)
  delete: async (id) => {
    console.log("Delete exercise (hardcoded mode):", id);
    alert("Chế độ dữ liệu cứng - Không thể xóa bài tập. Vui lòng bật backend để sử dụng tính năng này.");
    throw new Error("Hardcoded mode - Cannot delete exercise");
  },
};
