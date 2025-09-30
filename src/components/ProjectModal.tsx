// src/components/ProjectModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ProjectModal({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            // Add "overscroll-contain" to this line:
            className="bg-glass border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] relative overflow-y-auto overscroll-contain"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-text-primary/50 hover:text-accent transition-colors z-10"
              data-cursor="pointer"
            >
              <X size={24} />
            </button>
            
            {children}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}