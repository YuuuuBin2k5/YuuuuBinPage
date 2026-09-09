/**
 * Safe View Transition Wrapper (Phase 8.5A Progressive Enhancement Foundation)
 * Safely invokes document.startViewTransition if supported by the browser,
 * falling back gracefully to immediate callback execution in unsupported environments.
 */
export const startSafeViewTransition = (callback) => {
  if (
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function"
  ) {
    return document.startViewTransition(callback);
  }
  return callback();
};

