// src/app/_components/Act4_Proof.tsx
'use client';

import GlassCard from "@/components/GlassCard";
import { projects } from "@/content/projects";
import Image from "next/image";
import Link from 'next/link';
import { StaggeredGrid, StaggeredGridItem } from '@/components/utils/StaggeredGrid';

export default function Act4_Proof() {
  return (
    <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {projects.map((project) => (
        <StaggeredGridItem key={project.id}>
          <Link href={`/project/${project.slug}`}>
            <GlassCard 
              className="flex flex-col overflow-hidden h-full group hover:-translate-y-2 transition-transform duration-300"
              data-cursor="pointer"
            >
              <div className="w-full h-56 relative">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-satoshi text-2xl font-bold">{project.title}</h3>
                <p className="mt-2 text-sm text-text-primary/80 flex-grow">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Link>
        </StaggeredGridItem>
      ))}
    </StaggeredGrid>
  );
}