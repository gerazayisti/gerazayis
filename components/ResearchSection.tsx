"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { researchAxes } from "@/lib/content";
import { ArrowUpRightIcon, MicroscopeIcon } from "./Icons";

export default function ResearchSection() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête éditorial avec ligne 1px ── */}
      <div className="py-14 border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Pôle d&apos;Innovation &amp; Impact
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
              Recherche &amp; <span className="text-[#5A2CA8]">Publications</span>
            </h2>
          </div>

          <Link
            href="/recherches"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0a0a0a] hover:text-[#5A2CA8] transition"
          >
            <span>Consulter tous les axes de recherche</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#5A2CA8]" />
          </Link>
        </div>
      </div>

      {/* ── Grille Bento asymétrique continue (gap: 0, bordures partagées 1px solid #111111) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 lg:grid-cols-12 bg-white">
        
        {/* ── Grande carte vedette à gauche (7 cols) ── */}
        <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#111111] bg-white">
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#111111] bg-neutral-100">
              <Image
                src="/research_lab.jpg"
                alt="Laboratoire de recherche de la Faculté des Sciences"
                fill
                className="object-cover grayscale contrast-125"
                sizes="(min-width: 1024px) 680px, 100vw"
              />
              <div className="absolute top-4 left-4 bg-[#5A2CA8] text-white px-3.5 py-1 text-xs font-mono font-bold">
                AXE PRIORITAIRE
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5A2CA8] font-bold block mb-2">
                01 / RECHERCHE FONDAMENTALE &amp; APPLIQUÉE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0a0a0a] leading-tight">
                {researchAxes[0]} &amp; {researchAxes[1]}
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/70 leading-relaxed">
                Les équipes scientifiques de la Faculté des Sciences contribuent activement
                au développement durable, à la transition énergétique et aux biotechnologies
                en Afrique centrale à travers des publications dans des revues internationales de premier rang.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10 border-t border-[#111111] bg-[#FAFAFA] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <span className="flex items-center gap-2 font-bold text-[#0a0a0a]">
              <MicroscopeIcon className="w-4 h-4 text-[#5A2CA8]" />
              Laboratoires accrédités UY1
            </span>
            <Link
              href="/recherches/axes"
              className="inline-flex items-center gap-1.5 font-bold text-[#5A2CA8] hover:underline"
            >
              <span>En savoir plus</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Colonne droite (5 cols) avec bordures partagées ── */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white">
          
          {/* Carte 1 : Laboratoires & Unités */}
          <div className="p-8 sm:p-10 border-b border-[#111111] flex-1 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#111111] mb-6 bg-neutral-100">
                <Image
                  src="/campus_facade.jpg"
                  alt="Laboratoires & Unités de Recherche"
                  fill
                  className="object-cover grayscale contrast-125"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-[#5A2CA8] font-bold block mb-2">
                02 / UNITÉS DE RECHERCHE
              </span>
              <h4 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                {researchAxes[2]}
              </h4>
              <p className="mt-3 text-xs text-[#0a0a0a]/65 leading-relaxed">
                Unités de recherche multidisciplinaires : biochimie appliquée, géosciences,
                modélisation informatique et physique des matériaux.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10">
              <Link
                href="/recherches/laboratoires"
                className="inline-flex items-center justify-between w-full border border-[#111111] bg-white px-4 py-2.5 text-xs font-mono font-bold text-[#0a0a0a] hover:border-[#5A2CA8] hover:bg-[#5A2CA8] hover:text-white transition"
              >
                <span>Voir la liste des laboratoires</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Carte 2 : Bloc sombre gris #18181b avec CTA violet */}
          <div className="bg-[#18181b] p-8 sm:p-10 text-white flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA] font-bold block mb-2">
                03 / PRODUCTION SCIENTIFIQUE
              </span>
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
                Consulter les publications, thèses et brevets de la Faculté
              </h4>
              <p className="mt-3 text-xs text-white/70 leading-relaxed">
                Revues indexées, communications internationales et résultats de recherche
                département par département.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/recherches/resultats"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#6E3FC4] hover:bg-[#5A2CA8] text-white px-6 py-3.5 text-xs font-mono font-bold transition shadow-sm"
              >
                <span>Explorer les publications</span>
                <ArrowUpRightIcon className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
