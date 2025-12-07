import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter effect
 * @param {Array<string>} texts - Array of texts to cycle through
 * @param {number} typingSpeed - Speed of typing in ms (default: 100)
 * @param {number} deletingSpeed - Speed of deleting in ms (default: 50)
 * @param {number} pauseDuration - Pause duration after typing complete (default: 2000)
 * @returns {string} - Current displayed text
 */
export const useTypewriter = (
  texts = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    const handleTyping = () => {
      if (isPaused) {
        // Wait during pause
        const pauseTimeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(pauseTimeout);
      }

      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          const timeout = setTimeout(() => {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          }, typingSpeed);
          return () => clearTimeout(timeout);
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          const timeout = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, deletingSpeed);
          return () => clearTimeout(timeout);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    return handleTyping();
  }, [
    displayText,
    currentIndex,
    isDeleting,
    isPaused,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return displayText;
};
