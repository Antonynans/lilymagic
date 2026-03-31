import { useEffect, useRef, useState } from 'react';

/**
 * Hook that detects when an element enters the viewport
 * Used for scroll-reveal animations throughout the site
 */
export function useScrollReveal(options = { threshold: 0.2 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Optional: stop observing after first intersection
        // observer.unobserve(entry.target);
      } else {
        setInView(false);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, inView };
}