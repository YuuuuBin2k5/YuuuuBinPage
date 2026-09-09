import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 2026 Bulletproof Zero-Fail Scroll Reveal Engine
 * Multi-layer resilience:
 * 1. Immediate rect check on mount
 * 2. Native IntersectionObserver with 0 threshold + 100px bottom lookahead
 * 3. MutationObserver for dynamic/lazy components
 * 4. Passive scroll & resize listeners for real-time viewport tracking
 * 5. 1.2s failsafe timeout guaranteeing 0% blank screen under any circumstances
 */
export default function ScrollObserver() {
  const location = useLocation();

  useEffect(() => {
    const revealElement = (el) => {
      el.classList.add("is-revealed");
    };

    // If IntersectionObserver is not supported, reveal everything immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".scroll-reveal").forEach(revealElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 100px 0px",
      }
    );

    const scan = () => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.is-revealed)");
      const viewportBottom = window.innerHeight + 100;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already within or near viewport, reveal immediately!
        if (rect.top <= viewportBottom && rect.bottom >= -100) {
          revealElement(el);
          observer.unobserve(el);
        } else {
          observer.observe(el);
        }
      });
    };

    // 1. Initial scan immediately
    scan();

    // 2. Scan on DOM mutations (catches route transitions and async mounts)
    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 3. Scan on window scroll and resize (passive for 60fps performance)
    window.addEventListener("scroll", scan, { passive: true });
    window.addEventListener("resize", scan, { passive: true });

    // 4. Staggered backup ticks
    const t1 = setTimeout(scan, 50);
    const t2 = setTimeout(scan, 150);
    const t3 = setTimeout(scan, 400);

    // 5. Ultimate Failsafe: After 1.2s, reveal ALL remaining elements
    const failsafe = setTimeout(() => {
      document.querySelectorAll(".scroll-reveal:not(.is-revealed)").forEach(revealElement);
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(failsafe);
      window.removeEventListener("scroll", scan);
      window.removeEventListener("resize", scan);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}



