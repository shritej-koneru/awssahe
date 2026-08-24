import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import BackgroundGraphics from "./components/BackgroundGraphics";
import CustomCursor from "./components/CustomCursor";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AWS Student Builder Club — SAHE",
  description:
    "The AWS Student Builder Club at Siddhartha Academy of Higher Education, Vijayawada. Building the future, one cloud at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full bg-black text-white relative" suppressHydrationWarning>
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />
        <BackgroundGraphics />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
