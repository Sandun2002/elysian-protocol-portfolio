// src/components/utils/AnimatedElement.tsx
'use client';

import { motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function AnimatedElement({ children, className, delay = 0, threshold = 0.1 }: Props) {
  const ref = useRef(null);
  const isInView = useIntersectionObserver(ref, { threshold });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}