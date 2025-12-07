/**
 * Tab Visibility Manager
 * Optimizes performance when tab is not visible
 */

let isTabVisible = true;

// Handle visibility change
const handleVisibilityChange = () => {
  isTabVisible = !document.hidden;
  
  if (isTabVisible) {
    document.body.classList.add('tab-visible');
  } else {
    document.body.classList.remove('tab-visible');
  }
};

// Initialize
export const initTabVisibility = () => {
  // Set initial state
  document.body.classList.add('tab-visible');
  
  // Listen for visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};

// Get current visibility state
export const getTabVisibility = () => isTabVisible;
