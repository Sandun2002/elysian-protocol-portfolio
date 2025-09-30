'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

// Faster, more dynamic 3D-style entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.05, // Faster stagger
    },
  },
};

// Item animation with a 3D flip and bounce effect
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9, rotateY: -90 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  },
};

export function StaggeredGrid({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export const StaggeredGridItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};