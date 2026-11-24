import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sankalp (સંકલ્પ) | Next-Gen GPSC & UPSC Learning Platform",
  description: "A complete learning ecosystem for GPSC and UPSC aspirants in Gujarati and English. Intelligent journey management, knowledge graphs, PYQ analysis, and syllabus-anchored learning.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sankalp",
  },
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu" className="scroll-smooth bg-[#edf3ee]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen text-stone-900"
      >
        {children}
      </body>
    </html>
  );
}
