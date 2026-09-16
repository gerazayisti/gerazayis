"use client";

import React from "react";
import Link from "next/link";
import { protocolDocument, staffSummary } from "@/lib/faculty-staff";
import { ArrowUpRightIcon, BookOpenIcon, UsersIcon } from "./Icons";

export default function TeachersHeader() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── Fil d'Ariane ── */}
      <div className="border-b border-[#111111] bg-[#FAFAFA] py-3.5">
        <div className="mx-auto max-w-content px-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#0a0a0a]/60">
            <Link href="/" className="hover:text-[#5A2CA8] transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/la-faculte/presentation" className="hover:text-[#5A2CA8] transition-colors">
              La Faculté
            </Link>
            <span>/</span>
            <span className="text-[#5A2CA8] font-bold">Enseignants permanents</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="font-bold text-[#0a0a0a] uppercase tracking-wider text-[11px]">
              Actualisation officielle : {protocolDocument.date}
            </span>
          </div>
        </div>
      </div>

      {/* ── En-tête principal avec Titre et Compteurs clés ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111]">
        <div className="p-8 sm:p-12 lg:p-16 border-b border-[#111111] bg-white">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-3 bg-[#F4F0FC] border border-[#5A2CA8]/30 px-3 py-1">
                <UsersIcon className="w-4 h-4 text-[#5A2CA8]" />
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Année Académique {protocolDocument.academicYear} · Par Département et par Grade
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0a0a0a] leading-[1.02]">
                Liste des <br />
                <span className="text-[#5A2CA8] italic font-serif">Enseignants Permanents</span>
              </h1>

              <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 max-w-2xl leading-relaxed">
                Répertoire officiel des <strong>318 enseignants-chercheurs</strong> permanents de la Faculté des Sciences de l&apos;Université de Yaoundé I,
                répartis par département disciplinaire et par rang magistral (Professeurs, Maîtres de Conférences, Chargés de Cours et Assistants).
              </p>
            </div>

            {/* Bouton de téléchargement de la Liste Protocolaire PDF */}
            <div className="shrink-0">
              <a
                href={protocolDocument.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#18181b] hover:bg-[#5A2CA8] text-white px-6 py-4 text-xs font-mono font-bold transition shadow-sm border border-[#18181b]"
              >
                <BookOpenIcon className="w-4 h-4 text-[#A78BFA]" />
                <span>Télécharger la liste protocolaire (PDF)</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bandeau des 4 Chiffres Clés par Grade ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#111111] bg-[#FAFAFA]">
          <div className="p-6 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A2CA8] font-bold block mb-1">
              01 / Rang Magistral
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#0a0a0a]">
                {staffSummary.prof.count}
              </span>
              <span className="text-xs font-mono text-[#0a0a0a]/50">
                ({staffSummary.prof.women} femmes)
              </span>
            </div>
            <p className="text-xs font-bold text-[#0a0a0a] mt-1">Professeurs Titulaires</p>
          </div>

          <div className="p-6 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A2CA8] font-bold block mb-1">
              02 / Rang Magistral
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#0a0a0a]">
                {staffSummary.mc.count}
              </span>
              <span className="text-xs font-mono text-[#0a0a0a]/50">
                ({staffSummary.mc.women} femmes)
              </span>
            </div>
            <p className="text-xs font-bold text-[#0a0a0a] mt-1">Maîtres de Conférences</p>
          </div>

          <div className="p-6 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A2CA8] font-bold block mb-1">
              03 / Enseignants-Chercheurs
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#0a0a0a]">
                {staffSummary.cc.count}
              </span>
              <span className="text-xs font-mono text-[#0a0a0a]/50">
                ({staffSummary.cc.women} femmes)
              </span>
            </div>
            <p className="text-xs font-bold text-[#0a0a0a] mt-1">Chargés de Cours</p>
          </div>

          <div className="p-6 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A2CA8] font-bold block mb-1">
              04 / Corps Pédagogique
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#0a0a0a]">
                {staffSummary.asst.count}
              </span>
              <span className="text-xs font-mono text-[#0a0a0a]/50">
                ({staffSummary.asst.women} femmes)
              </span>
            </div>
            <p className="text-xs font-bold text-[#0a0a0a] mt-1">Assistants</p>
          </div>
        </div>
      </div>

    </section>
  );
}
