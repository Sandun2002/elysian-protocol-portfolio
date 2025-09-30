// src/app/page.tsx

import Act2_Collective from "./_components/Act2_Collective";
import Act3_Craft from "./_components/Act3_Craft";
import Act4_Proof from "./_components/Act4_Proof";
import Act5_Overture from "./_components/Act5_Overture";
import ScrollIndicator from "@/components/ScrollIndicator";
import HeroTextAnimation from "./_components/HeroTextAnimation"; // 1. Import the new animation component

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Act I: The Hook */}
      <section
        id="hook"
        className="relative flex min-h-screen w-full flex-col items-center justify-center text-center"
      >
        <div className="w-full max-w-5xl px-8">
          {/* 2. Replace the static text with our new animated component */}
          <HeroTextAnimation />
        </div>
        <ScrollIndicator />
      </section>

      {/* Act II: The Collective */}
      <section
        id="collective"
        className="flex w-full items-center justify-center py-24"
      >
        <div className="w-full max-w-5xl px-8">
          <div className="mb-16 text-center">
            <h2 className="font-satoshi text-4xl font-bold md:text-5xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-text-primary/80">
              Meet the minds behind the magic.
            </p>
          </div>
          <Act2_Collective />
        </div>
      </section>

      {/* Act III: The Craft */}
      <section
        id="craft"
        className="flex w-full items-center justify-center py-24"
      >
        <div className="w-full max-w-5xl px-8">
          <div className="mb-16 text-center">
            <h2 className="font-satoshi text-4xl font-bold md:text-5xl">
              Our Proven Process
            </h2>
            <p className="mt-4 text-lg text-text-primary/80">
              We transform complex ideas into exceptional digital products
              through a structured and transparent workflow.
            </p>
          </div>
          <Act3_Craft />
        </div>
      </section>

      {/* Act IV: The Proof */}
      <section
        id="proof"
        className="flex w-full items-center justify-center py-24"
      >
        <div className="w-full max-w-5xl px-8">
          <div className="text-center mb-16">
            <h2 className="font-satoshi text-4xl font-bold md:text-5xl">
              Selected Works
            </h2>
            <p className="mt-4 text-lg text-text-primary/80">
              A look into the solutions we've engineered. Each project is a
              story of a challenge met and a goal exceeded.
            </p>
          </div>
          <Act4_Proof />
        </div>
      </section>

      {/* Act V: The Overture */}
      <section
        id="overture"
        className="flex min-h-screen w-full items-center justify-center py-24"
      >
        <div className="w-full max-w-5xl px-8 text-center flex flex-col items-center">
          <h2 className="font-satoshi text-4xl font-bold md:text-5xl">
            Let's Build Together
          </h2>
          <p className="mt-4 mb-12 text-lg text-text-primary/80">
            Have an idea for a project, or just want to connect? We'd love
            to hear from you.
          </p>
          <Act5_Overture />
        </div>
      </section>
    </main>
  );
}