// Service cho Weeks - Sử dụng dữ liệu cứng (không cần backend)
import { weeksData } from "../data/baitapData";

// Weeks API Functions - Dữ liệu cứng
export const weeksAPI = {
  // Get all weeks
  getAll: async () => {
    return Promise.resolve([...weeksData]);
  },

  // Get week by ID
  getById: async (id) => {
    const week = weeksData.find((w) => w.id === id);
    if (!week) throw new Error("Week not found");
    return Promise.resolve({ ...week });
  },

  // Get current weeks (weeks that are currently active based on date)
  getCurrent: async () => {
    const now = new Date();
    const current = weeksData.filter((w) => {
      const start = new Date(w.startDate);
      const end = new Date(w.endDate);
      return now >= start && now <= end;
    });
    return Promise.resolve([...current]);
  },

  // Get upcoming weeks
  getUpcoming: async () => {
    const now = new Date();
    const upcoming = weeksData.filter((w) => {
      const start = new Date(w.startDate);
      return start > now;
    });
    return Promise.resolve([...upcoming]);
  },

  // Create new week (chỉ log, không thực sự thêm)
  create: async (weekData) => {
    console.log("Create week (hardcoded mode):", weekData);
    alert("Chế độ dữ liệu cứng - Không thể thêm tuần mới. Vui lòng bật backend để sử dụng tính năng này.");
    throw new Error("Hardcoded mode - Cannot create week");
  },

  // Update week (chỉ log)
  update: async (id, weekData) => {
    console.log("Update week (hardcoded mode):", id, weekData);
    alert("Chế độ dữ liệu cứng - Không thể cập nhật tuần. Vui lòng bật backend để sử dụng tính năng này.");
    throw new Error("Hardcoded mode - Cannot update week");
  },

  // Delete week (chỉ log)
  delete: async (id) => {
    console.log("Delete week (hardcoded mode):", id);
    alert("Chế độ dữ liệu cứng - Không thể xóa tuần. Vui lòng bật backend để sử dụng tính năng này.");
    throw new Error("Hardcoded mode - Cannot delete week");
  },
};
