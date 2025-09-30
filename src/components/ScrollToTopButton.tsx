// src/components/ScrollToTopButton.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from '@/components/utils/LenisProvider'; // Import our hook

export default function ScrollToTopButton() {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => lenis?.scrollTo(0, { duration: 2 });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-glass backdrop-blur-lg"
          data-cursor="pointer"
        >
          <ArrowUp className="text-accent" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}