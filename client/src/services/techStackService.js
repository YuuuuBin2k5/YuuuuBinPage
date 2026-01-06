// Service cho Tech Stack - Sử dụng dữ liệu cứng (không cần backend)
import { techStacksData } from "../data/projectsData";

// Tech Stack API Functions - Dữ liệu cứng
export const techStackAPI = {
  // Get all tech stacks
  getAll: async () => {
    return Promise.resolve([...techStacksData]);
  },

  // Get tech stack by ID
  getById: async (id) => {
    const tech = techStacksData.find((t) => t.id === id);
    if (!tech) throw new Error("Tech stack not found");
    return Promise.resolve({ ...tech });
  },

  // Get by category
  getByCategory: async (category) => {
    const filtered = techStacksData.filter((t) => t.category === category);
    return Promise.resolve([...filtered]);
  },

  // Create (disabled)
  create: async (techStackData) => {
    console.log("Create tech stack (hardcoded mode):", techStackData);
    alert("Chế độ dữ liệu cứng - Không thể thêm tech stack. Vui lòng bật backend.");
    throw new Error("Hardcoded mode - Cannot create tech stack");
  },

  // Update (disabled)
  update: async (id, techStackData) => {
    console.log("Update tech stack (hardcoded mode):", id, techStackData);
    alert("Chế độ dữ liệu cứng - Không thể cập nhật tech stack. Vui lòng bật backend.");
    throw new Error("Hardcoded mode - Cannot update tech stack");
  },

  // Delete (disabled)
  delete: async (id) => {
    console.log("Delete tech stack (hardcoded mode):", id);
    alert("Chế độ dữ liệu cứng - Không thể xóa tech stack. Vui lòng bật backend.");
    throw new Error("Hardcoded mode - Cannot delete tech stack");
  },
};
