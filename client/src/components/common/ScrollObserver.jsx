import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 2026 High-Performance Scroll Reveal Observer
 * Hardware-accelerated IntersectionObserver that automatically triggers
 * silky-smooth reveal animations on any element with the `.scroll-reveal` class.
 * 2026 High-Performance Bulletproof Scroll Reveal Observer
 * Features:
 * 1. Native IntersectionObserver with generous bottom margin (80px)
 * 2. MutationObserver that dynamically binds to newly mounted/lazy-loaded nodes
 * 3. Pre-check for elements already in or near viewport upon mount
 * 4. Passive scroll listener as active fallback
 * 5. Failsafe timeout to guarantee no content ever stays invisible (>2.5s)
 */
export default function ScrollObserver() {
  const location = useLocation();

  useEffect(() => {
    // If IntersectionObserver is not supported, reveal immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.01,
        rootMargin: "0px 0px 80px 0px",
      }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.is-revealed)");
      elements.forEach((el) => observer.observe(el));
    }, 60);
    const checkAndObserve = () => {
      const pendingElements = document.querySelectorAll(".scroll-reveal:not(.is-revealed)");
      const viewportHeight = window.innerHeight;

      pendingElements.forEach((el) => {
        // If element is already in or near viewport upon mount, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight + 100 && rect.bottom > -50) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    // 1. Immediate scan on mount / route transition
    checkAndObserve();

    // 2. MutationObserver captures dynamically mounted or lazy-loaded components
    const mutationObserver = new MutationObserver(() => {
      checkAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 3. Staggered timers to catch delayed render passes
    const timers = [50, 150, 300, 600, 1200].map((delay) =>
      setTimeout(checkAndObserve, delay)
    );

    // 4. Passive scroll listener as immediate fallback during active user scrolling
    const onScroll = () => {
      checkAndObserve();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 5. Ultimate failsafe: ensure all content is visible after 2.5s regardless of conditions
    const failsafeTimer = setTimeout(() => {
      document.querySelectorAll(".scroll-reveal:not(.is-revealed)").forEach((el) => {
        el.classList.add("is-revealed");
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      timers.forEach(clearTimeout);
      clearTimeout(failsafeTimer);
      window.removeEventListener("scroll", onScroll);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}


