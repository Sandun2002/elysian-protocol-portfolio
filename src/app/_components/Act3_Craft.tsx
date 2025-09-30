// src/app/_components/Act3_Craft.tsx
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const processSteps = [
  {
    icon: <Search size={40} className="text-accent" />,
    title: "Discover & Define",
    description: "We begin with a deep dive into your vision, understanding your goals, audience, and success metrics to create a strategic roadmap.",
  },
  {
    icon: <PenTool size={40} className="text-accent" />,
    title: "Design & Prototype",
    description: "We craft intuitive user experiences (UX) and beautiful interfaces (UI), delivering interactive prototypes for your feedback before development.",
  },
  {
    icon: <Code size={40} className="text-accent" />,
    title: "Develop & Engineer",
    description: "Our team brings the designs to life with clean, scalable code using modern frameworks, ensuring transparent progress with regular updates.",
  },
  {
    icon: <Rocket size={40} className="text-accent" />,
    title: "Deploy & Optimize",
    description: "We conduct rigorous testing for performance and security, handling the entire deployment process for a seamless launch and providing ongoing support.",
  },
];

export default function Act3_Craft() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          {step.icon}
          <h3 className="mt-6 font-satoshi text-xl font-bold">{step.title}</h3>
          <p className="mt-2 text-text-primary/80">{step.description}</p>
        </div>
      ))}
    </div>
  );
}