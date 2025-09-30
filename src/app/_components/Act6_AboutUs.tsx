// src/app/_components/Act6_AboutUs.tsx
'use client';

export default function Act6_AboutUs() {
  return (
    <div className="w-full max-w-5xl px-8">
      <div className="mb-16 text-center">
        <h2 className="font-satoshi text-4xl font-bold md:text-5xl">
          About Us
        </h2>
        <p className="mt-4 text-lg text-text-primary/80">
          Here's a little bit about our journey and what we stand for.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Logo Placeholder */}
        <div className="w-48 h-48 bg-gray-700/50 rounded-full flex items-center justify-center border-2 border-gray-500/50 flex-shrink-0">
          <span className="text-xl font-bold text-text-primary/70">LOGO</span>
        </div>

        {/* About Us Text */}
        <div className="text-left text-text-primary/80 space-y-4">
          <p>
            Founded on the principles of innovation and craftsmanship, our team is dedicated to building exceptional digital experiences. We believe in the power of technology to solve complex problems and create meaningful connections.
          </p>
          <p>
            Our mission is to partner with visionaries and bring their ideas to life. We are a collective of designers, developers, and strategists who are passionate about pushing the boundaries of what's possible on the web.
          </p>
        </div>
      </div>
    </div>
  );
}