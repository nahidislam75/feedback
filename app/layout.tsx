import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mokadderul's Feedback App",
  description:
    "Share your thoughts and help us build something extraordinary together.",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}

