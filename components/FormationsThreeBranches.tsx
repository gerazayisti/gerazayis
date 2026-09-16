"use client";

import React, { useState } from "react";
import { threeBranches, FormationBranch } from "@/lib/formations-data";
import { ArrowUpRightIcon, CheckIcon, BookOpenIcon, AwardIcon, GraduationCapIcon } from "./Icons";

export default function FormationsThreeBranches() {
  const [activeBranchId, setActiveBranchId] = useState<string>("all");

  const displayedBranches =
    activeBranchId === "all"
      ? threeBranches
      : threeBranches.filter((b) => b.id === activeBranchId);

  return (
    <section id="trois-branches" className="w-full bg-white border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Architecture Globale de l&apos;Offre
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight">
              Les 3 Grandes Branches <br />
              <span className="font-serif italic text-[#5A2CA8]">de Formation</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md leading-relaxed">
            Pour répondre à la diversité des ambitions des étudiants et aux besoins du marché, l&apos;offre de la Faculté des Sciences s&apos;articule en 3 piliers complémentaires : <strong>Académique</strong>, <strong>Professionnel</strong> et <strong>Certifiant</strong>.
          </p>
        </div>

        {/* ── Sélecteur / Filtre rapide par Branche ── */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border border-[#111111] bg-[#FAFAFA] p-3 font-mono text-xs">
          <span className="font-black uppercase text-[#0a0a0a]/60 mr-2">
            Vue d&apos;ensemble :
          </span>
          <button
            type="button"
            onClick={() => setActiveBranchId("all")}
            className={`px-3.5 py-1.5 font-bold border border-[#111111] transition cursor-pointer ${
              activeBranchId === "all"
                ? "bg-[#111111] text-white"
                : "bg-white text-[#0a0a0a] hover:bg-gray-100"
            }`}
          >
            Les 3 Branches Réunies
          </button>
          {threeBranches.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBranchId(b.id)}
              className={`px-3.5 py-1.5 font-bold border border-[#111111] transition cursor-pointer flex items-center gap-1.5 ${
                activeBranchId === b.id
                  ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              <span>[{b.code}] {b.name.replace("Branche ", "")}</span>
            </button>
          ))}
        </div>

        {/* ── 3 Grandes Cartes Piliers (Layout Bento Néo-Brutaliste) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[#111111] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
          {displayedBranches.map((branch) => (
            <div
              key={branch.id}
              className="p-6 sm:p-8 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors group"
            >
              <div>
                
                {/* Numéro & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 bg-[#111111] text-white font-mono text-xs font-black flex items-center justify-center group-hover:bg-[#5A2CA8] transition-colors">
                    {branch.code}
                  </span>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#5A2CA8]/10 text-[#5A2CA8] border border-[#5A2CA8]/30">
                    {branch.targetCount}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase text-[#5A2CA8] block mb-1">
                  {branch.badge}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a] tracking-tight leading-snug">
                  {branch.name}
                </h3>

                <p className="text-xs font-mono text-[#0a0a0a]/60 mt-1">
                  {branch.subtitle}
                </p>

                <p className="mt-4 text-xs text-[#0a0a0a]/75 leading-relaxed font-sans">
                  {branch.description}
                </p>

                {/* Programmes représentatifs */}
                <div className="mt-6 pt-4 border-t border-black/10 space-y-2">
                  <span className="font-mono text-[10px] font-black uppercase text-[#0a0a0a]/60 block">
                    Cursus &amp; Déclinaisons :
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#0a0a0a]/80 font-mono">
                    {branch.programsList.map((prog, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#5A2CA8] font-bold mt-0.5">▪</span>
                        <span className="text-[11px] leading-snug">{prog}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Points forts */}
                <div className="mt-6 pt-4 border-t border-black/10 space-y-2">
                  <span className="font-mono text-[10px] font-black uppercase text-[#0a0a0a]/60 block">
                    Points Forts :
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#0a0a0a]/80 font-sans">
                    {branch.keyStrengths.map((str, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bouton de saut direct */}
              <div className="mt-8 pt-4 border-t border-black/10">
                <a
                  href={branch.anchorHref}
                  className="w-full py-3 px-4 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white font-mono text-xs font-bold transition flex items-center justify-between group/link"
                >
                  <span>Explorer le catalogue {branch.name.replace("Branche ", "")}</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#5A2CA8] group-hover/link:text-white transition-colors" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
