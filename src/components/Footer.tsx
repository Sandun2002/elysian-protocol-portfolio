// src/components/Footer.tsx
import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-text-primary/10 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-8 text-center text-sm text-text-primary/50 md:flex-row md:justify-between">
        <p>&copy; {currentYear} Elysian Protocol. All Rights Reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <Link href="#" target="_blank" className="hover:text-accent transition-colors" data-cursor="pointer">
            <Linkedin size={20} />
          </Link>
          <Link href="#" target="_blank" className="hover:text-accent transition-colors" data-cursor="pointer">
            <Github size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}