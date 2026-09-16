import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Suspense } from "react";
import ParticleLoader from "@/components/ParticleLoader";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faculté des Sciences — Université de Yaoundé I",
  description:
    "Faculté des Sciences de l'Université de Yaoundé I : départements, formations, recherche et vie académique.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-sans">
        <Suspense fallback={null}>
          <ParticleLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
