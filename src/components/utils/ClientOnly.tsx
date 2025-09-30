// src/components/utils/ClientOnly.tsx
'use client';
import { useState, useEffect, ReactNode } from 'react';

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
}