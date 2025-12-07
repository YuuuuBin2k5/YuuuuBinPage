import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "viewed_exercises";

/**
 * Hook để track và quản lý các bài tập đã xem
 * Lưu trữ trong localStorage với format:
 * {
 *   exerciseId: {
 *     viewCount: number,
 *     lastViewed: timestamp,
 *     firstViewed: timestamp
 *   }
 * }
 */
export const useViewedExercises = () => {
  const [viewedData, setViewedData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Error loading viewed exercises:", error);
      return {};
    }
  });

  // Lưu vào localStorage khi viewedData thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedData));
    } catch (error) {
      console.error("Error saving viewed exercises:", error);
    }
  }, [viewedData]);

  // Mark bài tập là đã xem
  const markAsViewed = useCallback((exerciseId) => {
    setViewedData((prev) => {
      const existing = prev[exerciseId];
      const now = Date.now();

      return {
        ...prev,
        [exerciseId]: {
          viewCount: existing ? existing.viewCount + 1 : 1,
          lastViewed: now,
          firstViewed: existing?.firstViewed || now,
        },
      };
    });
  }, []);

  // Kiểm tra bài tập đã xem chưa
  const isViewed = useCallback(
    (exerciseId) => {
      return !!viewedData[exerciseId];
    },
    [viewedData]
  );

  // Lấy số lần xem
  const getViewCount = useCallback(
    (exerciseId) => {
      return viewedData[exerciseId]?.viewCount || 0;
    },
    [viewedData]
  );

  // Lấy thời gian xem lần đầu
  const getFirstViewedTime = useCallback(
    (exerciseId) => {
      return viewedData[exerciseId]?.firstViewed;
    },
    [viewedData]
  );

  // Lấy thời gian xem gần nhất
  const getLastViewedTime = useCallback(
    (exerciseId) => {
      return viewedData[exerciseId]?.lastViewed;
    },
    [viewedData]
  );

  // Reset tất cả (dùng cho testing hoặc clear data)
  const resetAll = useCallback(() => {
    setViewedData({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Reset một bài tập cụ thể
  const resetExercise = useCallback((exerciseId) => {
    setViewedData((prev) => {
      const newData = { ...prev };
      delete newData[exerciseId];
      return newData;
    });
  }, []);

  return {
    markAsViewed,
    isViewed,
    getViewCount,
    getFirstViewedTime,
    getLastViewedTime,
    resetAll,
    resetExercise,
    viewedData,
  };
};
