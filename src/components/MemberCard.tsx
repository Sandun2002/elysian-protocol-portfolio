// src/app/_components/MemberCard.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from "@/components/GlassCard";
import { teamMembers } from "@/content/members";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

type Member = (typeof teamMembers)[0];

interface Props {
  member: Member;
  isExpanded: boolean;
  onClick: () => void;
}

export default function MemberCard({ member, isExpanded, onClick }: Props) {
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer h-full"
      layout
      whileHover={{ y: -8, transition: { duration: 0.3 } }} // Add this line
    >
      <GlassCard className="p-6 md:p-8 grid grid-rows-[auto_1fr_auto] justify-items-center text-center h-full">
        {/* --- CARD HEADER (ROW 1) --- */}
        <div className="w-full">
          <Image
            src={member.photo}
            alt={member.name}
            width={120}
            height={120}
            className="rounded-full border-2 border-accent/50 mx-auto"
          />
          <h3 className="mt-6 font-satoshi text-2xl font-bold">{member.name}</h3>
          <p className="mt-1 text-accent">{member.role}</p>
        </div>

        {/* --- CARD BODY (ROW 2 - EXPANDABLE & FLEXIBLE) --- */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="w-full text-left text-sm text-text-primary/80 overflow-hidden pt-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <p className="mb-4">{member.fullBio}</p>
              <h4 className="font-bold text-text-primary">Education</h4>
              <ul className="list-disc pl-5 mt-2">
                {member.educations.map((edu, i) => (
                  <li key={i}>{edu}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- CARD FOOTER (ROW 3) --- */}
        <div className="mt-4 flex items-center gap-4">
          <Link href={member.linkedinUrl} target="_blank" className="text-text-primary/50 hover:text-accent transition-colors z-10" data-cursor="pointer" onClick={(e) => e.stopPropagation()}>
            <Linkedin size={24} />
          </Link>
          <Link href={member.githubUrl} target="_blank" className="text-text-primary/50 hover:text-accent transition-colors z-10" data-cursor="pointer" onClick={(e) => e.stopPropagation()}>
            <Github size={24} />
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
}