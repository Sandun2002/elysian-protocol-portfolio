import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/utils/LenisProvider";
import IntelligentCursor from "@/components/utils/IntelligentCursor";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AnimatedBackground from "@/components/AnimatedBackground";

// This is your new, SEO-rich metadata
export const metadata: Metadata = {
  title: "Elysian Protocol | Cutting-Edge Digital Solutions in Colombo",
  description: "Elysian Protocol is a premier collective of software engineers in Colombo, crafting high-performance, modern websites and applications tailored to your needs.",
  keywords: ["Elysian Protocol", "software development Colombo", "web development Sri Lanka", "modern websites", "high-performance applications", "digital solutions", "software engineers"],
  authors: [{ name: "Elysian Protocol", url: "https://www.elysianprotocol.co" }],
  openGraph: {
    title: "Elysian Protocol | Innovative Digital Experiences",
    description: "Discover Elysian Protocol, Colombo's leading software engineering team, delivering bespoke websites and applications with unmatched performance.",
    url: "https://www.elysianprotocol.co",
    siteName: "Elysian Protocol",
    images: [
      {
        url: "https://www.elysianprotocol.com/og-image.jpg", // Make sure to create and place this image in your /public folder
        width: 1200,
        height: 630,
        alt: "Elysian Protocol - Digital Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elysian Protocol | Digital Solutions in Colombo",
    description: "Elysian Protocol: Colombo-based software engineers creating high-performance websites and apps for global clients.",
    images: ["https://www.elysianprotocol.com/twitter-image.jpg"], // Also place this image in your /public folder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.elysianprotocol.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-inter text-text-primary antialiased">
        <AnimatedBackground />
        <LenisProvider>
          <IntelligentCursor />
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
        </LenisProvider>
      </body>
    </html>
  );
}