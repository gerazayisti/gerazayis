"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { distinctions } from "@/lib/content";
import { AwardIcon, ArrowUpRightIcon } from "./Icons";

export default function DistinctionsStrip() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── 1. Section Lauréats - Style exact "Meet the Curators" du mockup ── */}
      <div className="py-14 border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Corps Professoral &amp; Distinctions
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
              Figures de <span className="text-[#5A2CA8]">Proue &amp; Lauréats</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#0a0a0a]/70 max-w-xl">
              Enseignants-chercheurs d&apos;exception et lauréats de prix scientifiques internationaux
              contribuant au rayonnement mondial de l&apos;Université de Yaoundé I.
            </p>
          </div>

          {/* Repère ruban géométrique comme dans le mockup */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-8 h-8 bg-[#18181b]"></div>
            <div className="w-12 h-8 bg-[#5A2CA8]"></div>
          </div>
        </div>
      </div>

      {/* ── Grille Bento continue 3 colonnes (gap: 0, bordures partagées 1px solid #111111) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 sm:grid-cols-3 bg-white">
        {distinctions.map((d, index) => (
          <div
            key={d.title}
            className="group flex flex-col justify-between border-r border-b border-[#111111] bg-white p-8 hover:bg-[#FAFAFA] transition-all"
          >
            <div>
              {/* Badge d'indexation violet carré */}
              <div className="flex items-center justify-between mb-6">
                <span className="w-7 h-7 bg-[#5A2CA8] text-white text-xs font-mono font-bold flex items-center justify-center">
                  0{index + 1}
                </span>
                <span className="font-mono text-xs font-bold text-[#0a0a0a]/40">
                  DISTINCTION UY1
                </span>
              </div>

              <span className="inline-block font-mono text-xs font-black uppercase tracking-wider text-[#5A2CA8] mb-2">
                {d.person}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0a0a0a] leading-snug group-hover:text-[#5A2CA8] transition-colors">
                {d.title}
              </h3>
            </div>

            <div className="mt-8 pt-4 border-t border-[#111111] flex items-center justify-between text-xs font-mono font-bold text-[#0a0a0a] group-hover:text-[#5A2CA8]">
              <span>Palmarès académique</span>
              <span className="text-base leading-none text-[#5A2CA8]">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. Bandeau plein écran iconique violet style "intention_al · refined" du mockup ── */}
      <div className="w-full bg-[#5A2CA8] py-14 px-6 text-white overflow-hidden relative border-t border-[#111111]">
        <div className="mx-auto max-w-content flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase text-white leading-none text-center lg:text-left">
            science · rigueur <span className="text-white/40 font-normal not-italic">✦</span> excellence
          </div>
          
          <Link
            href="/recherches/resultats"
            className="inline-flex items-center gap-3 border-2 border-[#18181b] bg-[#18181b] px-8 py-4 text-xs font-mono font-bold text-white hover:bg-white hover:text-[#18181b] hover:border-white transition shadow-2xl shrink-0"
          >
            <span>Explorer tous les travaux primés</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </section>
  );
}
