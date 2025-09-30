// src/components/utils/LenisProvider.tsx
'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

// 1. Create a context to hold the Lenis instance
const LenisContext = createContext<Lenis | null>(null);

// 2. Create a custom hook to easily access the context
export const useLenis = () => useContext(LenisContext);

// 3. Create the provider component
export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}