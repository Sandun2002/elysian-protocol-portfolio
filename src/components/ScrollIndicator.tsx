// src/components/ScrollIndicator.tsx
'use client';

import { motion } from 'framer-motion';
import { Mouse } from 'lucide-react';

export default function ScrollIndicator() {
  return (
    // This outer div will fade in the whole icon
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <div className="relative text-text-primary/50">
        <Mouse size={32} />
        {/* This inner div is the animated scroll wheel */}
        <motion.div
          className="absolute top-2 left-1/2 w-1 h-2 -translate-x-1/2 bg-accent rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}