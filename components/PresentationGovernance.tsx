"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { administrativeStructure } from "@/lib/content";
import { UniversitySealIcon, ArrowUpRightIcon } from "./Icons";

export default function PresentationGovernance() {
  const { doyen, viceDoyens, divisions, deliberativeBodies } = administrativeStructure;

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête de section ── */}
      <div className="py-12 border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Direction &amp; Gouvernance
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a0a0a]">
              Structure Administrative &amp; <span className="text-[#5A2CA8]">Décanat</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-md">
            Une équipe décanale et des divisions opérationnelles dédiées au bon fonctionnement académique, scientifique et financier de l&apos;établissement.
          </p>
        </div>
      </div>

      {/* ── Grille 12 colonnes : Doyen & Organes (5 cols) + Vice-Doyens & Divisions (7 cols) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 lg:grid-cols-12 bg-white">
        
        {/* ── GAUCHE (5 colonnes) : Carte Doyen avec PHOTO OFFICIELLE + Organes Délibérants ── */}
        <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#111111] flex flex-col justify-between bg-[#FAFAFA]">
          <div>
            {/* Badge Doyen */}
            <div className="flex items-center justify-between mb-6">
              <span className="inline-block bg-[#18181b] text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
                DIRECTION GÉNÉRALE
              </span>
              <div className="w-8 h-8 bg-[#5A2CA8] text-white flex items-center justify-center">
                <UniversitySealIcon className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* ── CADRE PHOTO DU DOYEN ── */}
            <div className="relative w-full aspect-[4/5] sm:h-80 border-2 border-[#111111] bg-white mb-6 overflow-hidden shadow-sm group">
              {doyen.image ? (
                <Image
                  src={doyen.image}
                  alt={`Portrait officiel - ${doyen.name}`}
                  fill
                  className="object-cover object-top grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full p-6">
                  <div className="relative w-20 h-24 mb-3">
                    <Image
                      src="/logo/LOGO.svg"
                      alt="Logo Université de Yaoundé I"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-mono text-xs uppercase font-bold text-[#5A2CA8] tracking-widest mt-1">
                    Faculté des Sciences
                  </span>
                  <span className="font-mono text-[10px] text-[#0a0a0a]/50 uppercase mt-0.5">
                    Université de Yaoundé I
                  </span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-[#18181b] text-white px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider">
                DOYEN · FS UY1
              </div>
            </div>

            {/* Titre & Identité du Doyen */}
            <span className="font-mono text-xs font-bold text-[#5A2CA8] uppercase tracking-wider block mb-1">
              {doyen.title}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight">
              {doyen.name}
            </h3>
            <span className="inline-block mt-2 font-mono text-xs font-bold bg-white border border-[#111111] px-2.5 py-1 text-[#0a0a0a]">
              Rang : {doyen.rank}
            </span>

            <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
              {doyen.description}
            </p>

            {/* Organes délibérants */}
            <div className="mt-8 pt-6 border-t border-black/10">
              <p className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#0a0a0a]/50 mb-3">
                Organes consultatifs et délibérants :
              </p>
              <div className="space-y-2">
                {deliberativeBodies.map((body) => (
                  <div key={body.name} className="p-3 bg-white border border-[#111111]">
                    <span className="font-bold text-xs text-[#0a0a0a] block">{body.name}</span>
                    <span className="text-[11px] text-[#0a0a0a]/65 leading-tight block mt-0.5">{body.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#111111]">
            <Link
              href="/la-faculte/structure"
              className="inline-flex items-center justify-between w-full border border-[#111111] bg-white px-5 py-3 text-xs font-mono font-bold text-[#0a0a0a] hover:border-[#5A2CA8] hover:bg-[#5A2CA8] hover:text-white transition"
            >
              <span>Consulter l&apos;organigramme complet</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── DROITE (7 colonnes) : Les 3 Vice-Doyens + Les 2 Divisions avec PHOTOS & LOGO ── */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white">
          
          {/* Section Vice-Doyens */}
          <div className="p-8 sm:p-10 border-b border-[#111111]">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Les Trois Vice-Doyens
              </h4>
            </div>

            <div className="space-y-5">
              {viceDoyens.map((vd) => (
                <div
                  key={vd.code}
                  className="p-5 border border-[#111111] bg-white hover:bg-[#FAFAFA] transition-colors flex flex-col sm:flex-row gap-5 items-start group"
                >
                  {/* ── PHOTO OU LOGO UY1 PAR DÉFAUT DU VICE-DOYEN ── */}
                  <div className="relative w-full sm:w-28 h-36 shrink-0 border border-[#111111] bg-[#FAFAFA] flex flex-col items-center justify-center text-center p-2 overflow-hidden">
                    {vd.image ? (
                      <Image
                        src={vd.image}
                        alt={`Portrait officiel - ${vd.name}`}
                        fill
                        className="object-cover object-top grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                        sizes="140px"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full p-2">
                        <div className="relative w-12 h-16 mb-1">
                          <Image
                            src="/logo/LOGO.svg"
                            alt="Logo Université de Yaoundé I"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-mono text-[8px] uppercase font-bold text-[#5A2CA8] tracking-widest text-center leading-tight">
                          UY1 · FS
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 font-mono text-[8px] font-bold text-[#0a0a0a]/50 bg-white/90 px-1 border border-black/20">
                      {vd.code}
                    </span>
                  </div>

                  {/* Informations du Vice-Doyen */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[10px] font-bold text-[#5A2CA8] bg-[#F4F0FC] px-2 py-0.5 border border-[#5A2CA8]/20">
                        {vd.code}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#0a0a0a]/50">
                        Rang : {vd.rank}
                      </span>
                    </div>
                    <h5 className="text-base sm:text-lg font-black text-[#0a0a0a] group-hover:text-[#5A2CA8] transition-colors">
                      {vd.name}
                    </h5>
                    <p className="text-xs font-bold text-[#5A2CA8] mt-0.5">
                      {vd.role}
                    </p>
                    <p className="text-xs text-[#0a0a0a]/70 mt-2 leading-relaxed">
                      {vd.scope}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Divisions Administratives avec PHOTO / LOGO pour les Chefs de Division */}
          <div className="p-8 sm:p-10 bg-[#FAFAFA]">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[#18181b]"></span>
              <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Divisions des Services Administratifs
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {divisions.map((div) => (
                <div
                  key={div.code}
                  className="p-5 bg-white border border-[#111111] flex flex-col justify-between group"
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#0a0a0a]/50 block mb-2">
                      {div.code}
                    </span>
                    <h5 className="text-sm font-black text-[#0a0a0a] leading-snug">
                      {div.name}
                    </h5>

                    {/* Bloc Chef de Division avec PHOTO ou LOGO UY1 */}
                    <div className="mt-4 pt-4 border-t border-black/10 flex items-start gap-3">
                      {/* Photo chef de division ou Logo UY1 par défaut */}
                      <div className="relative w-16 h-20 shrink-0 border border-[#111111] bg-[#FAFAFA] flex flex-col items-center justify-center text-center p-1 overflow-hidden">
                        {div.image ? (
                          <Image
                            src={div.image}
                            alt={`Portrait - ${div.head}`}
                            fill
                            className="object-cover object-top grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                            sizes="90px"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full w-full p-1">
                            <div className="relative w-8 h-10 mb-0.5">
                              <Image
                                src="/logo/LOGO.svg"
                                alt="Logo Université de Yaoundé I"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="font-mono text-[7px] uppercase font-bold text-[#5A2CA8] leading-none">
                              UY1
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Identité chef de division */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-mono uppercase text-[#0a0a0a]/50 font-bold">Chef de Division :</p>
                        <p className="text-xs font-black text-[#5A2CA8] mt-0.5 leading-snug">{div.head}</p>
                        <p className="text-[11px] text-[#0a0a0a]/60 font-mono mt-0.5">{div.rank}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#0a0a0a]/70 mt-4 pt-3 border-t border-black/5 leading-relaxed">
                    {div.scope}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
