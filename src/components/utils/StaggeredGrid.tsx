'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

// Container animation with scale and opacity for a smoother entrance
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1, // Stagger effect for children
    },
  },
};

// Item animation with slight rotation and bounce
const itemVariants = {
  hidden: { opacity: 0, y: 20, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 100,
      damping: 10,
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