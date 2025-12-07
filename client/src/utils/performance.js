/**
 * PRO PERFORMANCE UTILITIES
 * Advanced optimization techniques for smooth 60fps
 */

// Debounce function - Prevents excessive function calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function - Limits function execution rate
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// RAF-based throttle - More accurate for animations
export const rafThrottle = (func) => {
  let rafId = null;
  return function executedFunction(...args) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      func.apply(this, args);
      rafId = null;
    });
  };
};

// Intersection Observer for lazy loading
export const createLazyObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Detect if device is low-end
export const isLowEndDevice = () => {
  // Check for mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Check for low memory (if available)
  const hasLowMemory = navigator.deviceMemory ? navigator.deviceMemory < 4 : false;

  // Check for slow connection
  const hasSlowConnection = navigator.connection
    ? navigator.connection.effectiveType === 'slow-2g' ||
      navigator.connection.effectiveType === '2g' ||
      navigator.connection.effectiveType === '3g'
    : false;

  return isMobile || hasLowMemory || hasSlowConnection;
};

// Optimize images
export const optimizeImage = (src, width = 800, quality = 80) => {
  // If using a CDN, add optimization parameters
  if (src.includes('cloudinary') || src.includes('imgix')) {
    return `${src}?w=${width}&q=${quality}&auto=format`;
  }
  return src;
};

// Preload critical resources
export const preloadResource = (href, as = 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
};

// Remove will-change after animation
export const removeWillChange = (element, delay = 1000) => {
  setTimeout(() => {
    if (element) {
      element.style.willChange = 'auto';
    }
  }, delay);
};

// Batch DOM updates
export const batchDOMUpdates = (updates) => {
  requestAnimationFrame(() => {
    updates.forEach((update) => update());
  });
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize scroll performance
export const optimizeScroll = () => {
  let ticking = false;
  
  return (callback) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Memory cleanup
export const cleanupMemory = () => {
  // Remove unused event listeners
  // Clear caches
  // Force garbage collection (if available)
  if (window.gc) {
    window.gc();
  }
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
  return result;
};

// Async component loader with timeout
export const loadComponentWithTimeout = (loader, timeout = 5000) => {
  return Promise.race([
    loader(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Component load timeout')), timeout)
    ),
  ]);
};

// Optimize CSS animations
export const optimizeAnimations = () => {
  const isLowEnd = isLowEndDevice();
  const reducedMotion = prefersReducedMotion();

  if (isLowEnd || reducedMotion) {
    // Disable heavy animations
    document.documentElement.classList.add('reduce-animations');
  }
};

// Optimize navbar scroll performance
export const optimizeNavbarScroll = () => {
  let scrollTicking = false;
  let lastScrollY = 0;
  
  const handleScroll = () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const nav = document.querySelector('nav');
        const currentScrollY = window.scrollY;
        
        if (nav) {
          // Add scrolling class during scroll
          if (currentScrollY !== lastScrollY) {
            nav.classList.add('scrolling');
            
            // Remove after scroll ends
            setTimeout(() => {
              nav.classList.remove('scrolling');
            }, 150);
          }
        }
        
        lastScrollY = currentScrollY;
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Optimize animations based on device
  optimizeAnimations();

  // Optimize navbar scroll
  optimizeNavbarScroll();

  // Add passive event listeners hint
  if ('passive' in document.createElement('div')) {
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
  }

  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnectDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Log performance metrics
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
      }, 0);
    });
  }
};

export default {
  debounce,
  throttle,
  rafThrottle,
  createLazyObserver,
  isLowEndDevice,
  optimizeImage,
  preloadResource,
  removeWillChange,
  batchDOMUpdates,
  prefersReducedMotion,
  optimizeScroll,
  cleanupMemory,
  measurePerformance,
  loadComponentWithTimeout,
  optimizeAnimations,
  initPerformanceOptimizations,
};
