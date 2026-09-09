import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 2026 High-Performance Scroll Reveal Observer
 * Hardware-accelerated IntersectionObserver that automatically triggers
 * silky-smooth reveal animations on any element with the `.scroll-reveal` class.
 */
export default function ScrollObserver() {
  const location = useLocation();

  useEffect(() => {
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
      }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.is-revealed)");
      elements.forEach((el) => observer.observe(el));
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}
