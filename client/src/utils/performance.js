// Performance monitoring utilities

export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isProduction = process.env.NODE_ENV === "production";
    this.isEnabled = false; // Disable all monitoring for now
  }

  // Start timing a operation
  startTiming(label) {
    if (this.isProduction || !this.isEnabled) return;
    this.metrics.set(label, performance.now());
  }

  // End timing and log result
  endTiming(label) {
    if (this.isProduction || !this.isEnabled) return;
    const startTime = this.metrics.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      this.metrics.delete(label);
      return duration;
    }
  }

  // Monitor component render times
  measureComponent(componentName, renderFn) {
    if (this.isProduction) return renderFn();

    this.startTiming(`${componentName} render`);
    const result = renderFn();
    this.endTiming(`${componentName} render`);
    return result;
  }

  // Monitor API call performance
  async measureAPI(apiName, apiCall) {
    this.startTiming(`API: ${apiName}`);
    try {
      const result = await apiCall();
      this.endTiming(`API: ${apiName}`);
      return result;
    } catch (error) {
      this.endTiming(`API: ${apiName}`);
      throw error;
    }
  }

  // Setup performance observer for Core Web Vitals
  setupWebVitals() {
    if (this.isProduction || !this.isEnabled || !window.PerformanceObserver)
      return;

    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`🎯 LCP: ${entry.startTime.toFixed(2)}ms`);
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`⚡ FID: ${entry.processingStart - entry.startTime}ms`);
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        if (clsValue > 0) {
          console.log(`📐 CLS: ${clsValue.toFixed(4)}`);
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      console.warn("Performance Observer not supported");
    }
  }

  // Memory usage monitoring
  logMemoryUsage() {
    if (this.isProduction || !this.isEnabled || !performance.memory) return;

    const { usedJSHeapSize, totalJSHeapSize } = performance.memory;
    const usedMB = (usedJSHeapSize / 1024 / 1024).toFixed(2);
    const totalMB = (totalJSHeapSize / 1024 / 1024).toFixed(2);
    console.log(`🧠 Memory: ${usedMB}MB / ${totalMB}MB`);
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();
