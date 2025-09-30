// src/app/_components/HeroTextAnimation.tsx
'use client';

import { motion } from 'framer-motion';

export default function HeroTextAnimation() {
  const line1part1 = "We Build ";
  const line1colored = "Digital ";
  const line2 = "Experiences";
  const subtext = "A collective of software engineers dedicated to bringing your digital vision to life with clean code and user-centric design.";

  // Split into words and then characters, preserving spaces
  const line1Words = line1part1.trim().split(" ").concat(line1colored.trim().split(" "));
  const line2Chars = line2.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
    }),
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <h1 className="font-satoshi text-5xl font-bold md:text-7xl h-40 md:h-52 flex flex-col items-center justify-center text-center overflow-hidden space-y-2" style={{ wordSpacing: '0.25em' }}>
        {/* First Line */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={line1part1 + line1colored}
          className="flex gap-1"  // Added gap-1 for spacing between words
        >
          {line1Words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              variants={wordVariants}
              className={word === "Digital" ? "text-accent" : ""}
            >
              {word.split("").map((char, charIndex) => (
                <motion.span key={charIndex} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.div>

        {/* Second Line */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={line1Words.join(" ").length}
          aria-label={line2}
          className="flex items-center"
        >
          {line2Chars.map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))}
          {/* The Blinking Cursor */}
          <motion.span
            className="inline-block w-1 h-12 md:h-16 bg-accent ml-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: (line1Words.join(" ").length + line2Chars.length) * 0.05 + 0.2 }}  // Slight delay tweak for sync
            aria-hidden="true"
          />
        </motion.div>
      </h1>

      <p className="mt-4 text-lg text-text-primary/80 md:text-xl">
        {subtext}
      </p>
    </>
  );
}