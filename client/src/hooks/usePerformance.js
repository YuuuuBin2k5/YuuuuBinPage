import { useState, useEffect, useRef } from "react";

// Performance monitoring hooks
export const useRenderTracker = (componentName) => {
  const renderStartTime = useRef(Date.now());
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
    const renderTime = Date.now() - renderStartTime.current;

    if (process.env.NODE_ENV === "development") {
      console.log(
        `🔍 [${componentName}] Render #${renderCount.current} - ${renderTime}ms`
      );

      if (renderTime > 16) {
        console.warn(
          `⚠️  [${componentName}] Slow render detected: ${renderTime}ms (>16ms)`
        );
      }
    }

    renderStartTime.current = Date.now();
  });

  return renderCount.current;
};

export const useRenderOptimization = (componentName, dependencies = []) => {
  const lastRender = useRef(Date.now());
  const renderTimes = useRef([]);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRender = now - lastRender.current;
    renderTimes.current.push(timeSinceLastRender);

    // Keep only last 10 render times
    if (renderTimes.current.length > 10) {
      renderTimes.current.shift();
    }

    const avgRenderTime =
      renderTimes.current.reduce((a, b) => a + b, 0) /
      renderTimes.current.length;

    if (process.env.NODE_ENV === "development") {
      console.log(
        `📊 [${componentName}] Avg render interval: ${avgRenderTime.toFixed(
          2
        )}ms`
      );
    }

    lastRender.current = now;
  }, dependencies);
};

// Custom hook for debounced values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for API caching
export const useCache = () => {
  const cache = new Map();

  const get = (key) => {
    const item = cache.get(key);
    if (item && Date.now() - item.timestamp < 300000) {
      // 5 minutes cache
      return item.data;
    }
    return null;
  };

  const set = (key, data) => {
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  };

  const clear = () => {
    cache.clear();
  };

  return { get, set, clear };
};

// Custom hook for intersection observer (lazy loading)
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [target, options]);

  return [setTarget, isIntersecting];
};
