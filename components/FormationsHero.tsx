"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon, BookOpenIcon, AwardIcon, GraduationCapIcon } from "./Icons";

export default function FormationsHero() {
  return (
    <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-14">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* Fil d'ariane & Badge de section */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
              Offre Académique Officielle
            </span>
          </div>
          <span className="text-[#0a0a0a]/30 font-mono">/</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A2CA8] font-bold bg-[#5A2CA8]/10 px-2 py-0.5">
            Architecture LMD &amp; Certifications
          </span>
        </div>

        {/* Titre éditorial principal */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0a0a0a] leading-none">
            Guide Simplifié <br />
            <span className="text-[#5A2CA8] italic font-serif">des Formations</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-[#0a0a0a]/75 max-w-3xl leading-relaxed">
            Comprendre facilement l&apos;ensemble des cursus scientifiques de la Faculté des Sciences de l’Université de Yaoundé I : cycles <strong>Licence – Master – Doctorat (LMD)</strong>, spécialités des <strong>10 départements</strong> et <strong>formations certifiantes professionnalisantes</strong>.
          </p>
        </div>

        {/* ── Bandeau de Métriques Rapides ── */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-[#111111] bg-white divide-x divide-y lg:divide-y-0 divide-[#111111]">
          
          <div className="p-5 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
            <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider">
              Architecture
            </span>
            <p className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight mt-2">
              3 Cycles
            </p>
            <p className="text-[11px] text-[#0a0a0a]/60 mt-1 font-mono">
              Licence · Master · Doctorat
            </p>
          </div>

          <div className="p-5 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
            <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider">
              Départements
            </span>
            <p className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight mt-2">
              10 Pôles
            </p>
            <p className="text-[11px] text-[#0a0a0a]/60 mt-1 font-mono">
              Sciences exactes, vie et terre
            </p>
          </div>

          <div className="p-5 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
            <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider">
              Validation
            </span>
            <p className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight mt-2">
              Système LMD
            </p>
            <p className="text-[11px] text-[#0a0a0a]/60 mt-1 font-mono">
              Crédits semestriels capitalisables
            </p>
          </div>

          <div className="p-5 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
            <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider">
              Insertion Pro
            </span>
            <p className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight mt-2">
              Certifiantes
            </p>
            <p className="text-[11px] text-[#0a0a0a]/60 mt-1 font-mono">
              Énergie photovoltaïque &amp; métiers
            </p>
          </div>

        </div>

        {/* ── Navigation Rapide Interne (Boutons d'ancrage nets) ── */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
          <a
            href="#trois-branches"
            className="px-4 py-2 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition flex items-center gap-1.5 font-bold"
          >
            <span>[01] Les 3 Branches</span>
            <span className="text-[#5A2CA8]">↓</span>
          </a>
          <a
            href="#schema-lmd"
            className="px-4 py-2 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition flex items-center gap-1.5 font-bold"
          >
            <span>[02] Cursus LMD</span>
            <span className="text-[#5A2CA8]">↓</span>
          </a>
          <a
            href="#formations-professionnelles"
            className="px-4 py-2 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition flex items-center gap-1.5 font-bold"
          >
            <span>[03] Formations Pro &amp; Certificats</span>
            <span className="text-[#5A2CA8]">↓</span>
          </a>
          <a
            href="#poles-scientifiques"
            className="px-4 py-2 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition flex items-center gap-1.5 font-bold"
          >
            <span>[04] Les 10 Départements</span>
            <span className="text-[#5A2CA8]">↓</span>
          </a>
          <a
            href="#admission-guide"
            className="px-4 py-2 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition flex items-center gap-1.5 font-bold"
          >
            <span>[05] Admission</span>
            <span className="text-[#5A2CA8]">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}
