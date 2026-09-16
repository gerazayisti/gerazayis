"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "./Icons";

export default function StatsStrip() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête éditorial style "The wall of fame" du mockup ── */}
      <div className="border-b border-[#111111] py-10">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Héritage &amp; Impact
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
              Le palmarès de la <span className="text-[#5A2CA8]">distinction</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#0a0a0a]/70 max-w-xl">
              Fondée en 1962, la Faculté des Sciences de l&apos;Université de Yaoundé I forme l&apos;élite
              scientifique, médicale et technologique du Cameroun et de la zone CEMAC.
            </p>
          </div>

          <Link
            href="/la-faculte/presentation"
            className="inline-flex items-center justify-between gap-4 border border-[#111111] bg-white px-5 py-3 text-xs font-mono font-bold text-[#0a0a0a] hover:border-[#5A2CA8] hover:bg-[#5A2CA8] hover:text-white transition shrink-0"
          >
            <span>Explorer notre histoire</span>
            <span className="text-base leading-none">+</span>
          </Link>
        </div>
      </div>

      {/* ── Bento Grid asymétrique continue (gap: 0, bordures partagées 1px solid #111111) ── */}
      <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-12 border-l border-r border-[#111111]">

        {/* ── COLONNE GAUCHE (4 cols) : Bloc vertical massif style bannière "Hinkai" du mockup ── */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#111111] p-8 sm:p-10 flex flex-col justify-between bg-white relative overflow-hidden">
          
          {/* Logo / Monogramme brutaliste rouge */}
          <div>
            <div className="w-16 h-16 bg-[#5A2CA8] text-white flex items-center justify-center font-black text-2xl font-mono">
              FS
            </div>
            
            {/* Grand texte vertical éditorial */}
            <div className="mt-8">
              <span className="inline-block bg-[#18181b] text-white text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider mb-4">
                UY1 • CAMEROUN
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#0a0a0a] leading-[0.9]">
                FACULTÉ <br />
                <span className="text-[#5A2CA8]">DES SCIENCES</span>
              </h3>
            </div>
          </div>

          {/* Photo ou illustration architecturale de fond */}
          <div className="mt-10 pt-8 border-t border-[#111111]">
            <p className="text-xs font-mono text-[#0a0a0a]/60 leading-relaxed">
              Institution doyenne de l&apos;enseignement supérieur scientifique camerounais.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-black text-[#5A2CA8] font-mono">1962</span>
              <span className="text-[11px] font-mono uppercase text-[#0a0a0a]/50">
                Année de fondation
              </span>
            </div>
          </div>
        </div>

        {/* ── COLONNE DROITE (8 cols) : 3 colonnes de texte avec lignes verticales traversantes ── */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          
          {/* Rangée supérieure : 3 colonnes éditoriales (Why us? / Who are we? / The vision) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#111111] border-b border-[#111111]">
            
            {/* Colonne 1 : Why us? */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#5A2CA8] block mb-2">
                  01 / DISCIPLINE
                </span>
                <h4 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Pourquoi l&apos;UY1 ? <br />
                  <span className="text-[#5A2CA8]">/ distinction</span>
                </h4>
                <p className="mt-4 text-xs text-[#0a0a0a]/70 leading-relaxed">
                  Des laboratoires de pointe, des enseignants-chercheurs de rang magistral et une reconnaissance académique panafricaine.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/10">
                <span className="text-3xl font-black font-mono text-[#0a0a0a]">10</span>
                <p className="text-[10px] font-mono uppercase text-[#0a0a0a]/50 mt-0.5">
                  Départements d&apos;enseignement
                </p>
              </div>
            </div>

            {/* Colonne 2 : Who are we? */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#5A2CA8] block mb-2">
                  02 / CORPS ENSEIGNANT
                </span>
                <h4 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Qui sommes-nous ? <br />
                  <span className="text-[#5A2CA8]">/ chercheurs</span>
                </h4>
                <p className="mt-4 text-xs text-[#0a0a0a]/70 leading-relaxed">
                  Plus de 400 professeurs, maîtres de conférences et chargés de cours dédiés à la transmission des savoirs et à l&apos;encadrement doctoral.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/10">
                <span className="text-3xl font-black font-mono text-[#0a0a0a]">400+</span>
                <p className="text-[10px] font-mono uppercase text-[#0a0a0a]/50 mt-0.5">
                  Enseignants &amp; Chercheurs
                </p>
              </div>
            </div>

            {/* Colonne 3 : The vision */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#5A2CA8] block mb-2">
                  03 / AMBITION
                </span>
                <h4 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  La vision. <br />
                  <span className="text-[#5A2CA8]">Normes Internationales</span>
                </h4>
                <p className="mt-4 text-xs text-[#0a0a0a]/70 leading-relaxed">
                  Élever la recherche fondamentale et appliquée aux standards internationaux pour répondre aux défis climatiques, sanitaires et technologiques.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/10">
                <span className="text-3xl font-black font-mono text-[#0a0a0a]">25 000+</span>
                <p className="text-[10px] font-mono uppercase text-[#0a0a0a]/50 mt-0.5">
                  Étudiants inscrits
                </p>
              </div>
            </div>

          </div>

          {/* Rangée inférieure : Déclaration de mission pleine largeur */}
          <div className="p-8 bg-[#FAFAFA] flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs sm:text-sm font-medium text-[#0a0a0a]/80 max-w-xl">
              <strong className="text-[#0a0a0a] font-bold font-mono uppercase mr-2 text-xs">Engagement UY1 :</strong>
              Promouvoir la rigueur scientifique, l&apos;intégrité académique et le rayonnement du Cameroun dans le concert mondial des nations scientifiques.
            </p>
            <Link
              href="/espace-etudiant/admission"
              className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-[#5A2CA8] text-white px-5 py-3 text-xs font-mono font-bold transition shrink-0"
            >
              <span>Rejoindre la Faculté</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}
