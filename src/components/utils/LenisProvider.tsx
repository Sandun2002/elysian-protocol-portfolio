// src/components/utils/LenisProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'; // Import useState
import Lenis from '@studio-freight/lenis';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: ReactNode }) {
  // Use useState to hold the Lenis instance
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const newLenisInstance = new Lenis();

    // Update the state. This will trigger a re-render and provide the instance to children.
    setLenis(newLenisInstance);

    function raf(time: number) {
      newLenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      newLenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}