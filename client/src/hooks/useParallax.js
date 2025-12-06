import { useEffect, useState } from "react";

/**
 * Custom hook for parallax scroll effects
 * @param {number} speed - Parallax speed multiplier (0.1 = slow, 1 = fast)
 * @returns {number} - Current parallax offset
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setOffset(scrolled * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
};
