"use client";

import React from "react";
import { facultyPresentation } from "@/lib/content";

export default function PresentationTimeline() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête de la section chronologique ── */}
      <div className="py-12 border-b border-[#111111] bg-[#FAFAFA]">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Chronologie &amp; Cadre Réglementaire
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a0a0a]">
              Les grandes dates de <span className="text-[#5A2CA8]">notre histoire</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-md">
            De l&apos;Université Fédérale de 1962 à la grande réforme de 1993 érigeant la Faculté des Sciences en établissement autonome de l&apos;UY1.
          </p>
        </div>
      </div>

      {/* ── Grille Bento continue 4 colonnes (1 ligne par jalon historique) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#111111] bg-white">
        {facultyPresentation.milestones.map((m, index) => (
          <div
            key={m.year}
            className="group flex flex-col justify-between p-8 hover:bg-[#FAFAFA] transition-colors relative"
          >
            <div>
              {/* Numérotation et Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-7 h-7 bg-[#5A2CA8] text-white text-xs font-mono font-bold flex items-center justify-center">
                  0{index + 1}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A2CA8] bg-[#F4F0FC] border border-[#5A2CA8]/20 px-2 py-0.5">
                  {m.badge}
                </span>
              </div>

              {/* Date principale en gros caractère mono */}
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#0a0a0a] tracking-tight group-hover:text-[#5A2CA8] transition-colors">
                {m.year}
              </div>

              {/* Titre de l'étape */}
              <h3 className="mt-3 text-base sm:text-lg font-black text-[#0a0a0a] leading-snug">
                {m.title}
              </h3>

              {/* Description détaillée */}
              <p className="mt-3 text-xs text-[#0a0a0a]/75 leading-relaxed">
                {m.desc}
              </p>
            </div>

            {/* Puce d'ancrage en bas */}
            <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-[11px] font-mono font-bold text-[#0a0a0a]/50">
              <span>Étape historique</span>
              <span className="text-[#5A2CA8]">✦</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
