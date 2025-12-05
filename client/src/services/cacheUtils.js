// Shared cache utility for all services
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes - backend cache is also 5 minutes

// Cache helper functions
export const getCachedData = (key) => {
  const item = cache.get(key);
  if (item && Date.now() - item.timestamp < CACHE_DURATION) {
    return item.data;
  }
  cache.delete(key); // Remove expired cache
  return null;
};

export const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const clearCache = (key) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};

export const clearCacheByPattern = (pattern) => {
  const keysToDelete = [];
  for (const [key] of cache.entries()) {
    if (key.includes(pattern)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach((key) => cache.delete(key));
};
