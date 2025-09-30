// src/hooks/useIntersectionObserver.tsx
'use client';

import { useState, useEffect, RefObject } from 'react';

export default function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.1 }
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      // This is the key change: we now set the state based on whether
      // the element is intersecting or not, allowing it to change back and forth.
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);

    // Disconnect the observer on cleanup
    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isInView;
}