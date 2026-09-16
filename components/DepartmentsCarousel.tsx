"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { departments, professionalPrograms } from "@/lib/content";
import { ArrowUpRightIcon } from "./Icons";

const categories = [
  "Tous les départements",
  "Sciences Exactes",
  "Sciences de la Vie",
  "Sciences Appliquées & Métiers",
];

export default function DepartmentsCarousel() {
  const [activeCategory, setActiveCategory] = useState(0);

  const filteredDepartments = departments.filter((d) => {
    if (activeCategory === 0) return true;
    if (activeCategory === 1) return ["MA", "PH", "IN"].includes(d.code);
    if (activeCategory === 2) return ["BC", "BPA", "BPV", "MIB"].includes(d.code);
    if (activeCategory === 3) return ["CO", "CI", "ST"].includes(d.code);
    return true;
  });

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête éditorial style "The Craft of Distinction" ── */}
      <div className="py-14 border-b border-[#111111]">
        <div className="mx-auto max-w-content px-6 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
              Orientation &amp; Départements
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
            L&apos;Art de la <span className="text-[#5A2CA8]">Distinction</span>
          </h2>
          
          <p className="mt-3 text-xs sm:text-sm text-[#0a0a0a]/70 max-w-xl mx-auto leading-relaxed">
            10 départements d&apos;enseignement supérieur et de recherche d&apos;élite,
            forgeant les cadres scientifiques et technologiques de demain.
          </p>

          {/* Bouton CTA violet d'en-tête comme dans la maquette */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-6 py-3 text-xs font-mono font-bold transition shadow-sm"
            >
              <span>Consulter l&apos;offre académique complète</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Filtres de catégories - Boutons rectangulaires stricts */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(idx)}
                className={`px-4 py-2 text-xs font-mono font-bold transition-colors border ${
                  activeCategory === idx
                    ? "bg-[#18181b] text-white border-[#18181b]"
                    : "bg-white text-[#0a0a0a]/70 border-[#111111] hover:border-[#5A2CA8] hover:text-[#5A2CA8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grille Bento continue 3 colonnes (gap: 0, bordures partagées 1px solid #111111) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white">
        {filteredDepartments.map((dept, index) => (
          <div
            key={dept.code}
            className="group relative flex flex-col justify-between p-8 border-r border-b border-[#111111] hover:bg-[#FAFAFA] transition-colors"
          >
            <div>
              {/* Badge d'indexation violet carré comme dans le mockup */}
              <div className="flex items-center justify-between mb-5">
                <span className="w-7 h-7 bg-[#5A2CA8] text-white text-xs font-mono font-bold flex items-center justify-center">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-mono font-bold text-[#0a0a0a]/40 uppercase">
                  DÉP. {dept.code}
                </span>
              </div>

              {/* Titre du département en typographie grasse éditoriale */}
              <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight group-hover:text-[#5A2CA8] transition-colors line-clamp-1">
                {dept.name}
              </h3>

              {/* Vignette photo rectangulaire avec bordure 1px #111111 */}
              <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden border border-[#111111] bg-[#FAFAFA]">
                {dept.image ? (
                  <Image
                    src={dept.image}
                    alt={`Département de ${dept.name}`}
                    fill
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    sizes="(min-width: 1024px) 360px, 100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#18181b] text-white font-mono font-black text-2xl tracking-wider">
                    {dept.code}
                  </div>
                )}
              </div>

              {/* Description synthétique */}
              <p className="mt-4 text-xs text-[#0a0a0a]/70 leading-relaxed">
                Cursus de Licence, Master et Doctorat avec accès aux laboratoires
                spécialisés et programmes de recherche appliquée.
              </p>
            </div>

            {/* Bouton rectangulaire avec bordure nette style mockup [ Read More + ] */}
            <div className="mt-6 pt-4 border-t border-black/10">
              <Link
                href={`/departements/${dept.slug}`}
                className="inline-flex items-center justify-between w-full border border-[#111111] bg-white px-4 py-2.5 text-xs font-mono font-bold text-[#0a0a0a] hover:border-[#5A2CA8] hover:bg-[#5A2CA8] hover:text-white transition-colors"
              >
                <span>Découvrir le département</span>
                <span className="text-base leading-none text-[#5A2CA8] group-hover:text-white transition-colors">+</span>
              </Link>
            </div>
          </div>
        ))}

        {/* ── Carte spéciale Highlight "Discover all of the best" comme dans le mockup ── */}
        <div className="relative flex flex-col justify-between p-8 border-r border-b border-[#111111] bg-[#F4F0FC] text-[#0a0a0a]">
          <div>
            <div className="w-12 h-12 bg-[#5A2CA8]/10 border border-[#5A2CA8]/30 flex items-center justify-center text-[#5A2CA8] mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-[#0a0a0a] tracking-tight leading-tight">
              Découvrez le <span className="text-[#5A2CA8]">meilleur</span> de nos formations professionnelles
            </h3>
            <p className="mt-3 text-xs text-[#0a0a0a]/75 leading-relaxed">
              Formations certifiantes en énergie solaire photovoltaïque, bio-industries et informatique appliquée.
            </p>

            {professionalPrograms.map((p) => (
              <div key={p.code} className="mt-5 p-3.5 bg-white border border-[#111111] text-xs">
                <span className="font-mono font-bold text-[10px] uppercase text-[#5A2CA8] tracking-wider block">
                  {p.type}
                </span>
                <p className="font-black text-[#0a0a0a] mt-1">{p.name}</p>
                <p className="text-[11px] text-[#0a0a0a]/60 mt-1">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/formations"
              className="inline-flex items-center justify-center w-full bg-[#5A2CA8] hover:bg-[#431C82] text-white px-5 py-3.5 text-xs font-mono font-bold transition-colors shadow-sm"
            >
              <span>Accéder aux préinscriptions</span>
              <ArrowUpRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
