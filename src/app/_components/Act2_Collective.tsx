// src/app/_components/Act2_Collective.tsx
'use client';

import { useState } from 'react';
import { teamMembers } from "@/content/members";
import MemberCard from './MemberCard';
import { StaggeredGrid, StaggeredGridItem } from '@/components/utils/StaggeredGrid';


export default function Act2_Collective() {
  const [allExpanded, setAllExpanded] = useState(false);

  const handleToggleExpandAll = () => {
    setAllExpanded(!allExpanded);
  };

  return (
    <>
      <div className="flex justify-end mb-8">
        <button 
          onClick={handleToggleExpandAll} 
          className="px-4 py-2 font-satoshi font-medium text-text-primary/70 hover:text-accent transition-colors border border-text-primary/10 rounded-lg"
          data-cursor="pointer"
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      <StaggeredGrid className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <StaggeredGridItem key={member.id}>
            <MemberCard 
              member={member}
              isExpanded={allExpanded}
              onClick={handleToggleExpandAll}
            />
          </StaggeredGridItem>
        ))}
      </StaggeredGrid>
    </>
  );
}