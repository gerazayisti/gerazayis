"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCapIcon,
  MicroscopeIcon,
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  ArrowUpRightIcon,
} from "./Icons";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-[560px] sm:min-h-[620px] overflow-hidden border-b border-[#111111] bg-white">

      {/* ══════════════════════════════════════════════════════════════
          COLONNE GAUCHE — Zone texte + actions (52%)
          Style Swiss Editorial : Fond blanc pur, repère violet académique
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center w-full md:w-[52%] px-8 sm:px-12 lg:px-16 py-16 bg-white">
        
        {/* Kicker avec puce violette */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#0a0a0a]">
            Excellence &amp; Recherche depuis 1962
          </p>
        </div>

        {/* Titre principal — Grotesk bold à fort impact avec accent violet */}
        <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black leading-[1.02] tracking-tight text-[#0a0a0a] max-w-[500px]">
          Faculté des Sciences <br />
         <span className="text-[#5A2CA8] italic font-serif"> Université de Yaoundé&nbsp;I.</span>
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/70 max-w-[440px] leading-relaxed">
          Pôle d&apos;excellence académique et d&apos;innovation scientifique au cœur de l&apos;Afrique centrale.
        </p>

        {/* Grille 2×2 des boutons — Style Neo-Brutalist sans arrondis */}
        <div className="mt-10 grid grid-cols-2 gap-3 max-w-[400px]">

          {/* Admission — bouton primaire violet */}
          <Link
            href="/espace-etudiant/admission"
            className="group flex items-center justify-between bg-[#5A2CA8] hover:bg-[#431C82] px-5 py-4 text-white font-mono font-bold transition border border-[#5A2CA8]"
          >
            <div className="flex items-center gap-2.5">
              <GraduationCapIcon className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Admission</span>
            </div>
            <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Recherche — fond blanc, tracé 1px #111111 */}
          <Link
            href="/recherches"
            className="group flex items-center justify-between border border-[#111111] bg-white px-5 py-4 text-[#0a0a0a] font-mono font-bold transition hover:border-[#5A2CA8] hover:text-[#5A2CA8]"
          >
            <div className="flex items-center gap-2.5">
              <MicroscopeIcon className="w-4 h-4 text-[#0a0a0a]/50 group-hover:text-[#5A2CA8]" />
              <span className="text-xs sm:text-sm">Recherche</span>
            </div>
            <span className="text-xs text-[#0a0a0a]/40 group-hover:text-[#5A2CA8]">+</span>
          </Link>

          {/* Départements — fond blanc, tracé 1px #111111 */}
          <Link
            href="/departements"
            className="group flex items-center justify-between border border-[#111111] bg-white px-5 py-4 text-[#0a0a0a] font-mono font-bold transition hover:border-[#5A2CA8] hover:text-[#5A2CA8]"
          >
            <div className="flex items-center gap-2.5">
              <UsersIcon className="w-4 h-4 text-[#0a0a0a]/50 group-hover:text-[#5A2CA8]" />
              <span className="text-xs sm:text-sm">Départements</span>
            </div>
            <span className="text-xs text-[#0a0a0a]/40 group-hover:text-[#5A2CA8]">+</span>
          </Link>

          {/* Événements — fond blanc, tracé 1px #111111 */}
          <Link
            href="/actualites/evenements"
            className="group flex items-center justify-between border border-[#111111] bg-white px-5 py-4 text-[#0a0a0a] font-mono font-bold transition hover:border-[#5A2CA8] hover:text-[#5A2CA8]"
          >
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="w-4 h-4 text-[#0a0a0a]/50 group-hover:text-[#5A2CA8]" />
              <span className="text-xs sm:text-sm">Événements</span>
            </div>
            <span className="text-xs text-[#0a0a0a]/40 group-hover:text-[#5A2CA8]">+</span>
          </Link>
        </div>

        {/* Légende adresse — inclinée -20°, bas gauche */}
        <div
          className="absolute bottom-6 left-8 flex items-center gap-2 text-xs font-mono font-semibold text-[#0a0a0a]/60 origin-left"
          aria-label="Adresse du campus"
        >
          <MapPinIcon className="w-4 h-4 shrink-0 text-[#5A2CA8]" />
          <span>Plateau Atemengué, Yaoundé — Cameroun</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          COLONNE DROITE — Image architecturale + overlay chevrons (48%)
          Séparateur vertical 1px solid #111111
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full md:w-[48%] min-h-[360px] md:min-h-0 overflow-hidden border-t md:border-t-0 md:border-l border-[#111111]">

        {/* Photo du campus en fond plein */}
        <Image
          src="/hero_campus.jpg"
          alt="Bâtiment de la Faculté des Sciences"
          fill
          priority
          className="object-cover object-center grayscale contrast-125"
          sizes="(min-width: 768px) 48vw, 100vw"
        />

        {/* ── Overlay : motif chevrons en "V" répétitifs ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="chevron-pattern-brutalist"
                x="0"
                y="0"
                width="60"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <polyline
                  points="0,0 30,20 60,0"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <polyline
                  points="0,20 30,40 60,20"
                  fill="none"
                  stroke="rgba(167,139,250,0.25)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chevron-pattern-brutalist)" />
          </svg>
        </div>

        {/* Voile sombre pour lisibilité et contraste */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#18181b]/80 via-[#18181b]/20 to-transparent"
          aria-hidden="true"
        />

        {/* Indicateurs de carrousel stricts — bas droit */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Diapositive ${idx + 1}`}
              className={`h-2 transition-all ${
                activeSlide === idx
                  ? "w-8 bg-[#5A2CA8]"
                  : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
