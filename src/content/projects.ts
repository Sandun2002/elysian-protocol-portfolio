// src/content/projects.ts

export const projects = [
  {
    id: 1,
    slug: "ceylon-gems-ecommerce", // Add this line
    title: "E-commerce Platform for 'Ceylon Gems'",
    summary: "A modern, high-performance online store built with Next.js, designed to drive sales and reflect brand luxury.",
    challenge: "Ceylon Gems, a luxury jeweler, needed a digital storefront that matched the quality of their products. Their previous site was slow, outdated, and not mobile-friendly, resulting in low online sales.",
    solution: "We developed a custom, headless e-commerce solution using Next.js for the frontend and Shopify for backend management. This provided lightning-fast page loads and a fully bespoke, luxurious user interface.",
    outcome: "The new platform led to a 40% increase in online sales within the first quarter. Page load times were reduced by 75%, and the mobile conversion rate tripled.",
    tags: ["Next.js", "TypeScript", "Shopify", "Stripe"],
    coverImage: "/images/projects/image1.jpg",
    media: [
      "/images/projects/image2.jpg",
      "/images/projects/image2.jpg",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    slug: "kandy-escapes-booking", // Add this line
    title: "Booking System for 'Kandy Escapes'",
    summary: "A streamlined reservation app for a boutique hotel that increased direct bookings by 30%.",
    challenge: "The hotel relied on third-party booking sites which took large commissions. They needed a simple, beautiful, and reliable direct booking engine on their own website.",
    solution: "We built a custom reservation system with a real-time availability calendar and secure payment integration using Stripe. The user interface was designed to be simple and quick, allowing a booking in under 60 seconds.",
    outcome: "Direct bookings increased by 30% in the first six months, saving the hotel thousands of dollars in commission fees. Staff reported a 50% reduction in time spent managing phone and email bookings.",
    tags: ["React", "Node.js", "Framer Motion"],
    coverImage: "/images/projects/image3.jpg",
    media: ["/images/projects/image4.jpg",
            "/images/projects/image4.jpg",],
    liveUrl: "#",
    githubUrl: "#",
  },
  // Add your other projects here, making sure each one has a unique 'slug'
];