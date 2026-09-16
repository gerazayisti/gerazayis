"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { facultyPresentation } from "@/lib/content";
import { MapPinIcon, ArrowUpRightIcon } from "./Icons";

export default function PresentationCampuses() {
  return (
    <section id="campus" className="w-full bg-white border-b border-[#111111] overflow-hidden scroll-mt-16">
      
      {/* ── En-tête de section ── */}
      <div className="py-12 border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Implantation &amp; Infrastructures
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a0a0a]">
              Deux Campus au cœur de <span className="text-[#5A2CA8]">Yaoundé</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-md">
            Un pôle universitaire structuré en deux sites complémentaires alliant mémoire patrimoniale et infrastructures de recherche de pointe.
          </p>
        </div>
      </div>

      {/* ── Encart introductif reprenant la formulation officielle ── */}
      <div className="border-b border-[#111111] bg-[#FAFAFA] py-5">
        <div className="mx-auto max-w-content px-6">
          <div className="border-l-4 border-[#5A2CA8] pl-5 py-1">
            <p className="text-xs sm:text-sm font-medium text-[#0a0a0a] leading-relaxed">
              {facultyPresentation.campusesP}
            </p>
          </div>
        </div>
      </div>

      {/* ── Grille Bento continue 2 colonnes (Campus 1 & Campus 2) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#111111] bg-white">
        
        {/* ── CAMPUS 1 : Campus Principal (Plateau Atemengue) ── */}
        <div className="p-8 sm:p-12 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block bg-[#18181b] text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider">
                SITE MAJEUR · DEPUIS 1967
              </span>
              <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                {facultyPresentation.campuses[0].code}
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#111111] mb-6 bg-neutral-100">
              <Image
                src="/hero_campus.jpg"
                alt="Campus Principal de la Faculté des Sciences sur le plateau Atemengue"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                sizes="(min-width: 1024px) 600px, 100vw"
              />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight">
              {facultyPresentation.campuses[0].name}
            </h3>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A2CA8] mt-1">
              {facultyPresentation.campuses[0].subtitle}
            </p>

            <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
              {facultyPresentation.campuses[0].desc}
            </p>

            {/* Points d'intérêt */}
            <div className="mt-6 pt-6 border-t border-black/10">
              <p className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#0a0a0a]/50 mb-3">
                Éléments clés de l&apos;infrastructure :
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#0a0a0a]">
                {facultyPresentation.campuses[0].highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5A2CA8] shrink-0"></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#111111] flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-[#0a0a0a]/70">
              <MapPinIcon className="w-4 h-4 text-[#5A2CA8]" />
              {facultyPresentation.campuses[0].location}
            </span>
            <Link
              href="/la-faculte/contacts"
              className="font-bold text-[#5A2CA8] hover:underline flex items-center gap-1"
            >
              <span>Localisation</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── CAMPUS 2 : Deuxième Campus (Extension / Annexe) ── */}
        <div className="p-8 sm:p-12 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block bg-[#5A2CA8] text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider">
                SITE HISTORIQUE · DEPUIS 1962
              </span>
              <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                {facultyPresentation.campuses[1].code}
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#111111] mb-6 bg-neutral-100">
              <Image
                src="/campus_facade.jpg"
                alt="Deuxième Campus Extension Annexe de la Faculté des Sciences"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                sizes="(min-width: 1024px) 600px, 100vw"
              />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight">
              {facultyPresentation.campuses[1].name}
            </h3>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A2CA8] mt-1">
              {facultyPresentation.campuses[1].subtitle}
            </p>

            <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
              {facultyPresentation.campuses[1].desc}
            </p>

            {/* Points d'intérêt */}
            <div className="mt-6 pt-6 border-t border-black/10">
              <p className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#0a0a0a]/50 mb-3">
                Éléments clés de l&apos;infrastructure :
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#0a0a0a]">
                {facultyPresentation.campuses[1].highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5A2CA8] shrink-0"></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#111111] flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-[#0a0a0a]/70">
              <MapPinIcon className="w-4 h-4 text-[#5A2CA8]" />
              {facultyPresentation.campuses[1].location}
            </span>
            <Link
              href="/la-faculte/contacts"
              className="font-bold text-[#5A2CA8] hover:underline flex items-center gap-1"
            >
              <span>Localisation</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
