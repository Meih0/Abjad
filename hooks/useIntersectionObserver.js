import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for Intersection Observer API
 * @param {Object} options - Intersection Observer options
 * @returns {[React.RefObject, boolean]} Ref to observe and visibility state
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

export default useIntersectionObserver;
