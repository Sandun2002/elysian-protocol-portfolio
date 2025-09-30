// src/app/project/[slug]/page.tsx
import { projects } from "@/content/projects";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/#proof" className="flex items-center gap-2 text-accent hover:underline mb-8" data-cursor="pointer">
          <ArrowLeft size={20} />
          Back to All Projects
        </Link>

        <h1 className="font-satoshi text-4xl md:text-6xl font-bold">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">{tag}</span>
          ))}
        </div>

        <div className="w-full h-96 relative my-8">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover rounded-lg" />
        </div>

        <div className="mt-6 text-text-primary/90 space-y-4">
          <h3 className='font-bold text-lg text-text-primary'>The Challenge</h3>
          <p className="text-sm">{project.challenge}</p>
          <h3 className='font-bold text-lg text-text-primary'>Our Solution</h3>
          <p className="text-sm">{project.solution}</p>
          <h3 className='font-bold text-lg text-text-primary'>The Outcome</h3>
          <p className="text-sm">{project.outcome}</p>
        </div>
        
        {/* === NEW GALLERY SECTION STARTS HERE === */}
        {project.media && project.media.length > 0 && (
          <div className="mt-12">
            <h3 className='font-bold text-lg text-text-primary mb-4'>Project Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.media.map((imageSrc, index) => (
                <div key={index} className="w-full h-64 relative">
                  <Image 
                    src={imageSrc} 
                    alt={`${project.title} gallery image ${index + 1}`} 
                    fill 
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* === GALLERY SECTION ENDS HERE === */}
        
        <div className="mt-8 flex items-center gap-6">
          <Link href={project.liveUrl} target="_blank" className="flex items-center gap-2 text-accent hover:underline" data-cursor="pointer">
            <ExternalLink size={20} />
            View Live Project
          </Link>
          <Link href={project.githubUrl} target="_blank" className="flex items-center gap-2 text-accent hover:underline" data-cursor="pointer">
            <Github size={20} />
            See the Code
          </Link>
        </div>
      </div>
    </main>
  );
}