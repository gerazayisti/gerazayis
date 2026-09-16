"use client";

import React, { useState } from "react";
import { lmdCycles } from "@/lib/formations-data";
import { CheckIcon, ArrowUpRightIcon, BookOpenIcon, AwardIcon } from "@/components/Icons";
import Link from "next/link";

export default function FormationsLmdOverview() {
  const [activeCycleCode, setActiveCycleCode] = useState<string>("L");

  const selectedCycle = lmdCycles.find((c) => c.code === activeCycleCode) || lmdCycles[0];

  return (
    <section id="schema-lmd" className="w-full bg-white border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Comprendre le Schéma LMD
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight">
              Le Cursus Universitaire <span className="font-serif italic text-[#5A2CA8]">en 3 Étapes</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md">
            La Faculté des Sciences applique le système Licence – Master – Doctorat (LMD) conforme aux directives CEMAC et aux standards internationaux.
          </p>
        </div>

        {/* ── Sélecteur des 3 Cycles en Onglets Brutalistes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#111111] bg-[#FAFAFA] mb-6">
          {lmdCycles.map((cycle) => {
            const isActive = activeCycleCode === cycle.code;
            return (
              <button
                key={cycle.code}
                type="button"
                onClick={() => setActiveCycleCode(cycle.code)}
                className={`p-5 text-left transition-all border-b sm:border-b-0 sm:border-r border-[#111111] last:border-r-0 cursor-pointer ${
                  isActive
                    ? "bg-[#5A2CA8] text-white"
                    : "bg-white text-[#0a0a0a] hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 ${
                      isActive
                        ? "bg-white text-[#5A2CA8]"
                        : "bg-[#111111]/10 text-[#0a0a0a]"
                    }`}
                  >
                    {cycle.badge}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-white/70" : "text-[#0a0a0a]/40"
                    }`}
                  >
                    [{cycle.code}]
                  </span>
                </div>

                <h3 className="text-lg font-black tracking-tight mt-2">
                  {cycle.name}
                </h3>
                <p
                  className={`text-xs font-mono mt-1 ${
                    isActive ? "text-white/85" : "text-[#0a0a0a]/60"
                  }`}
                >
                  {cycle.duration} · {cycle.credits}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Fiche Détaillée Simplifiée du Cycle Sélectionné ── */}
        <div className="border border-[#111111] bg-white grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
          
          {/* Colonne Gauche : Présentation et Voies (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#5A2CA8] uppercase">
                  {selectedCycle.badge}
                </span>
                <span className="text-[#0a0a0a]/30 font-mono">/</span>
                <span className="font-mono text-xs text-[#0a0a0a]/60 font-bold">
                  {selectedCycle.duration}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                {selectedCycle.shortName}
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
                {selectedCycle.description}
              </p>
            </div>

            {/* Condition d'entrée */}
            <div className="p-4 border border-[#111111] bg-[#FAFAFA]">
              <span className="font-mono text-[10px] font-black uppercase text-[#5A2CA8] block mb-1">
                Profil &amp; Diplôme d&apos;entrée requis :
              </span>
              <p className="text-xs font-mono font-bold text-[#0a0a0a]">
                {selectedCycle.entryLevel}
              </p>
            </div>

            {/* Les 2 Filières / Voies */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] border-b border-black/10 pb-2">
                Les Voies de Formation dans ce Cycle :
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCycle.tracks.map((track) => (
                  <div
                    key={track.title}
                    className="p-4 border border-[#111111] bg-white flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-[#5A2CA8] bg-[#5A2CA8]/10 px-2 py-0.5 inline-block mb-2">
                        {track.badge}
                      </span>
                      <h5 className="font-black text-sm text-[#0a0a0a]">
                        {track.title}
                      </h5>
                      <p className="text-xs text-[#0a0a0a]/70 mt-2 leading-relaxed">
                        {track.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Colonne Droite : Modalités & Acquis (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAFAFA] flex flex-col justify-between space-y-8">
            
            {/* Format pédagogique (CM / TD / TP) */}
            <div>
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] border-b border-[#111111] pb-3 mb-4">
                Comment se déroulent les cours ?
              </h4>
              <ul className="space-y-3 text-xs text-[#0a0a0a]/80 font-mono">
                {selectedCycle.pedagogicalFormat.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 bg-[#5A2CA8] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compétences acquises */}
            <div>
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] border-b border-[#111111] pb-3 mb-4">
                Compétences &amp; Débouchés clés :
              </h4>
              <ul className="space-y-2.5 text-xs text-[#0a0a0a]/80">
                {selectedCycle.keyOutcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accès rapide scolarité */}
            <div className="pt-4 border-t border-black/10">
              <Link
                href="/espace-etudiant/lmd"
                className="inline-flex items-center justify-between w-full p-3 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition font-mono text-xs font-bold"
              >
                <span>En savoir plus sur le Système LMD</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
