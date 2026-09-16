"use client";

import React from "react";
import Link from "next/link";
import { facultyPresentation } from "@/lib/content";
import { ArrowUpRightIcon } from "./Icons";

export default function PresentationMissions() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête de section ── */}
      <div className="py-12 border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Vocation &amp; Responsabilités Statutaires
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a0a0a]">
              Les 3 Missions Spécifiques de la <span className="text-[#5A2CA8]">Faculté</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-md">
            Un mandat académique, technologique et républicain au service de l&apos;émancipation citoyenne et du développement du Cameroun.
          </p>
        </div>
      </div>

      {/* ── Énoncé officiel ── */}
      <div className="border-b border-[#111111] bg-[#18181b] text-white py-6">
        <div className="mx-auto max-w-content px-6">
          <div className="border-l-4 border-[#A78BFA] pl-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#A78BFA] font-bold block mb-1">
              Dispositions statutaires de l&apos;Université de Yaoundé I
            </span>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-4xl font-medium">
              {facultyPresentation.missionsP}
            </p>
          </div>
        </div>
      </div>

      {/* ── Grille continue 3 colonnes pour les 3 missions (gap: 0) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#111111] bg-white">
        {facultyPresentation.missions.map((mission) => (
          <div
            key={mission.number}
            className="group flex flex-col justify-between p-8 sm:p-10 hover:bg-[#FAFAFA] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#5A2CA8]">
                  {mission.number}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0a0a0a]/50 bg-black/5 px-2.5 py-1">
                  {mission.tag}
                </span>
              </div>

              <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight group-hover:text-[#5A2CA8] transition-colors leading-snug">
                {mission.title}
              </h3>

              <p className="mt-4 text-xs text-[#0a0a0a]/75 leading-relaxed">
                {mission.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-black/10 space-y-2">
                {mission.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-xs text-[#0a0a0a]/80">
                    <span className="text-[#5A2CA8] font-bold mt-0.5">▪</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-black/10">
              <Link
                href="/formations"
                className="inline-flex items-center justify-between w-full text-xs font-mono font-bold text-[#0a0a0a] hover:text-[#5A2CA8] transition-colors"
              >
                <span>Découvrir les formations associées</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
