"use client";

import React from "react";
import Link from "next/link";
import { certifiantePrograms } from "@/lib/formations-data";
import { ArrowUpRightIcon, CheckIcon, AwardIcon } from "@/components/Icons";

export default function FormationsCertifiantes() {
  const solarProgram = certifiantePrograms[0];

  return (
    <section id="formations-certifiantes" className="w-full bg-white border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Formations Courtes &amp; Pratiques
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight">
              Cursus Certifiants &amp; <span className="font-serif italic text-[#5A2CA8]">Métiers d&apos;Avenir</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md">
            Des programmes intensifs à forte employabilité répondant aux besoins urgents de l&apos;économie nationale et de la transition énergétique.
          </p>
        </div>

        {/* ── Cartouche Vedette : Formation Photovoltaïque Solaire ── */}
        <div className="border border-[#111111] bg-white grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
          
          {/* Colonne Gauche : Descriptif & Objectifs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-black uppercase tracking-wider bg-[#5A2CA8] text-white px-2.5 py-1">
                Formation Phare
              </span>
              <span className="font-mono text-xs font-bold text-[#0a0a0a]/50">
                [{solarProgram.code}]
              </span>
              <span className="font-mono text-xs text-emerald-700 bg-emerald-50 border border-emerald-300 font-bold px-2 py-0.5">
                {solarProgram.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight leading-tight">
              {solarProgram.title}
            </h3>

            <p className="text-xs font-mono text-[#5A2CA8] font-bold">
              {solarProgram.accreditation}
            </p>

            <p className="text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
              {solarProgram.objective}
            </p>

            {/* Public cible */}
            <div className="p-4 border border-[#111111] bg-[#FAFAFA] font-mono text-xs">
              <span className="font-black uppercase text-[#0a0a0a] block mb-1">
                Public Éligible :
              </span>
              <p className="text-[#0a0a0a]/70">
                {solarProgram.target}
              </p>
            </div>

            {/* Modules du cursus */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a]">
                Compétences &amp; Modules enseignés :
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                {solarProgram.modules.map((mod, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 border border-black/10 bg-[#FAFAFA]">
                    <CheckIcon className="w-3.5 h-3.5 text-[#5A2CA8] shrink-0 mt-0.5" />
                    <span className="text-[#0a0a0a]/80 text-[11px] leading-snug">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Colonne Droite : Modalités & Inscription (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAFAFA] flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <div className="border-b border-[#111111] pb-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                  Modalités Pratiques
                </span>
                <h4 className="text-xl font-black text-[#0a0a0a]">
                  Détails de la Session
                </h4>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 border border-[#111111] bg-white">
                  <span className="text-[10px] text-[#0a0a0a]/50 uppercase font-bold block">
                    Durée &amp; Format :
                  </span>
                  <p className="font-bold text-[#0a0a0a] mt-0.5">
                    {solarProgram.duration}
                  </p>
                </div>

                <div className="p-3 border border-[#111111] bg-white">
                  <span className="text-[10px] text-[#0a0a0a]/50 uppercase font-bold block">
                    Diplôme / Titre Sanctionné :
                  </span>
                  <p className="font-bold text-[#5A2CA8] mt-0.5">
                    {solarProgram.diplomaIssued}
                  </p>
                </div>

                <div className="p-3 border border-[#111111] bg-white">
                  <span className="text-[10px] text-[#0a0a0a]/50 uppercase font-bold block">
                    Lieu des Enseignements :
                  </span>
                  <p className="font-bold text-[#0a0a0a] mt-0.5">
                    Plateau Atemengue — Ateliers de Physique Appliquée
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton d'accès vers la page dédiée */}
            <div className="pt-6 border-t border-black/10 space-y-3">
              <Link
                href={solarProgram.href}
                className="w-full py-4 px-6 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-mono text-xs font-black uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Consulter le programme détaillé</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
              
              <p className="text-[11px] text-center text-[#0a0a0a]/60 font-mono">
                Préinscriptions ouvertes auprès du Département de Physique.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
