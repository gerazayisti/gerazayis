"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { facultyPresentation, stats } from "@/lib/content";
import { UniversitySealIcon, ArrowUpRightIcon, MapPinIcon } from "./Icons";

export default function PresentationHero() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── Fil d'Ariane & Kicker éditorial ── */}
      <div className="border-b border-[#111111] bg-[#FAFAFA] py-3.5">
        <div className="mx-auto max-w-content px-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#0a0a0a]/60">
            <Link href="/" className="hover:text-[#5A2CA8] transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-[#0a0a0a]/40">La Faculté</span>
            <span>/</span>
            <span className="text-[#5A2CA8] font-bold">Présentation</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="font-bold text-[#0a0a0a] uppercase tracking-wider text-[11px]">
              Document de Référence Officiel
            </span>
          </div>
        </div>
      </div>

      {/* ── Grand En-tête avec disposition 2 colonnes asymétrique ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 lg:grid-cols-12 bg-white">
        
        {/* Colonne gauche (7 cols) : Titre, Kicker, Paragraphe Historique Fondateur */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#111111] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 bg-[#F4F0FC] border border-[#5A2CA8]/30 px-3 py-1">
              <UniversitySealIcon className="w-4 h-4 text-[#5A2CA8]" />
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                DEPUIS JUILLET 1962 · INSTITUTION DOYENNE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0a0a0a] leading-[1.02]">
              Présentation de la <br />
              <span className="text-[#5A2CA8] italic font-serif">Faculté des Sciences</span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0a0a0a]/60">
              Université de Yaoundé I · République du Cameroun
            </p>

            {/* Texte historique officiel fourni par l'institution */}
            <div className="mt-8 border-l-4 border-[#5A2CA8] pl-6 py-2 bg-[#FAFAFA] border-t border-b border-r border-[#111111]/10">
              <p className="text-sm sm:text-base leading-relaxed text-[#0a0a0a] font-medium">
                {facultyPresentation.historyP1}
              </p>
            </div>

            {/* Badges des décrets juridiques fondateurs */}
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="border border-[#111111] bg-white px-3 py-1.5 font-bold text-[#0a0a0a]">
                Décret N° 62/DF/289 du 26 juillet 1962
              </span>
              <span className="border border-[#111111] bg-white px-3 py-1.5 font-bold text-[#0a0a0a]">
                Décrets N° 93/027 &amp; 93/036 du 19 janvier 1993
              </span>
            </div>
          </div>

          {/* Bande inférieure avec CTA vers les départements */}
          <div className="mt-10 pt-6 border-t border-[#111111] flex flex-wrap items-center justify-between gap-4">
            <a
              href="#departements"
              className="inline-flex items-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-6 py-3.5 text-xs font-mono font-bold transition shadow-sm"
            >
              <span>Consulter les 10 départements</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </a>

            <a
              href="#campus"
              className="inline-flex items-center gap-2 border border-[#111111] bg-white hover:bg-[#FAFAFA] text-[#0a0a0a] px-5 py-3.5 text-xs font-mono font-bold transition"
            >
              <MapPinIcon className="w-3.5 h-3.5 text-[#5A2CA8]" />
              <span>Voir les 2 campus</span>
            </a>
          </div>
        </div>

        {/* Colonne droite (5 cols) : Visuel architectural, Chiffres Clés & Sceau */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#18181b] text-white">
          
          {/* Photo du campus historique en noir & blanc contrasté */}
          <div className="relative aspect-[16/10] lg:aspect-auto lg:h-72 w-full overflow-hidden border-b border-[#111111]">
            <Image
              src="/campus_facade.jpg"
              alt="Bâtiment historique de la Faculté des Sciences"
              fill
              className="object-cover grayscale contrast-125 brightness-90"
              sizes="(min-width: 1024px) 500px, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent" />
            <div className="absolute top-4 right-4 bg-[#5A2CA8] text-white px-3 py-1 text-xs font-mono font-bold">
              PLATEAU ATEMENGUE
            </div>
          </div>

          {/* Grille de statistiques clés 2x2 */}
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border-b border-white/10 bg-[#18181b]">
            {stats.map((st) => (
              <div key={st.label} className="p-6">
                <span className="block font-mono text-3xl sm:text-4xl font-black text-white">
                  {st.value}
                </span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-[#A78BFA] mt-1 font-bold">
                  {st.label}
                </span>
              </div>
            ))}
          </div>

          {/* Citation / Signature de la Faculté */}
          <div className="p-8 bg-[#18181b] text-xs font-mono text-white/70">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-[#A78BFA]"></span>
              <span className="font-bold uppercase text-white tracking-widest text-[11px]">
                Rigueur · Science · Innovation
              </span>
            </div>
            <p className="leading-relaxed">
              Plus de six décennies au service de la formation supérieure, de la recherche scientifique et du progrès économique du Cameroun.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
