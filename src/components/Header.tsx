// src/components/Header.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLenis } from '@/components/utils/LenisProvider';
import Image from 'next/image'; // 1. Import the Image component

const navLinks = [
  { title: 'About Us', href: '#about' },
  { title: 'Our Team', href: '#collective' },
  { title: 'Our Process', href: '#craft' },
  { title: 'Our Projects', href: '#proof' },
  { title: 'Contact', href: '#overture' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    lenis?.scrollTo(targetId, { lerp: 0.1, duration: 2 });
  };

  // 2. A reusable logo component for consistency
  const Logo = () => (
    <Image 
      src="/logo.png" 
      alt="Team Logo" 
      width={120} // Adjust width as needed
      height={40} // Adjust height as needed
      className='w-auto h-30' // Tailwind classes for responsive sizing
    />
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/50 backdrop-blur-lg border-b border-text-primary/10">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-8">
        <div>
          <a href="#hook" onClick={(e) => handleScroll(e, '#hook')} data-cursor="pointer">
            <Logo />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-text-primary/70 hover:text-accent transition-colors font-medium" data-cursor="pointer">
              {link.title}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} data-cursor="pointer">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="md:hidden absolute top-0 left-0 w-full bg-background border-b border-text-primary/10"
          >
            <div className="flex justify-between items-center h-16 px-8">
               <a href="#hook" onClick={(e) => handleScroll(e, '#hook')} data-cursor="pointer">
                 <Logo />
               </a>
               <button onClick={() => setIsOpen(false)} data-cursor="pointer">
                 <X size={24} />
               </button>
            </div>
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-xl text-text-primary/80 hover:text-accent transition-colors font-medium" data-cursor="pointer">
                  {link.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}