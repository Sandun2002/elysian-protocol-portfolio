// src/components/GlassCard.tsx
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: Props) {
  return (
    // We combine the base glass styles with any additional classes passed in
    <div
      className={`
        bg-glass border border-white/10 rounded-xl backdrop-blur-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}