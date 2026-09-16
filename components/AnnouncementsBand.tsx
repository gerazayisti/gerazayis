"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/lib/content";
import { ArrowUpRightIcon, CalendarIcon } from "./Icons";

const tabs = ["Communiqués officiels", "Actualités académiques", "Concours & bourses"];

export default function AnnouncementsBand() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeItem, setActiveItem] = useState(1);

  return (
    <section className="w-full bg-[#18181b] text-white overflow-hidden border-b border-[#111111]">

      {/* ── Ticker défilant géant avec ligne de séparation 1px solid #111111 ── */}
      <div className="border-b border-white/10 py-6 overflow-hidden select-none bg-[#18181b]">
        <div
          className="flex whitespace-nowrap gap-12 animate-marquee text-2xl sm:text-4xl font-black tracking-tight uppercase"
          aria-hidden
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className={i % 2 === 0 ? "text-white" : "text-[#A78BFA]"}>
                Restez informés
              </span>
              <span className="text-white/20 text-xl self-center font-mono">✦</span>
              <span className="text-white/40">
                Université de Yaoundé I
              </span>
              <span className="text-white/20 text-xl self-center font-mono">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Grille continue 2 colonnes avec bordure verticale 1px ── */}
      <div className="mx-auto max-w-content border-l border-r border-white/10 grid lg:grid-cols-12">

        {/* ── GAUCHE (7 colonnes) : Liste des communiqués ── */}
        <div className="lg:col-span-7 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#A78BFA] inline-block"></span>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#A78BFA]">
              Tableau d&apos;affichage officiel
            </p>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
            Derniers communiqués &amp; notes de service
          </h3>

          {/* Onglets de catégories - Bordures nettes 1px */}
          <div className="flex gap-0 border-b border-white/10 mb-8 overflow-x-auto">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-3 text-xs font-mono font-bold transition-all border-b-2 -mb-px shrink-0 ${
                  activeTab === idx
                    ? "border-[#8B5CF6] text-white bg-white/5"
                    : "border-transparent text-white/40 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Liste des communiqués avec bordures partagées (gap: 0) */}
          <div className="space-y-0 divide-y divide-white/10 border-t border-b border-white/10">
            {newsItems.slice(0, 4).map((item, idx) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveItem(idx)}
                className={`group w-full flex items-start gap-6 p-5 text-left transition-all ${
                  activeItem === idx
                    ? "bg-white/[0.06] border-l-4 border-[#8B5CF6] -ml-px"
                    : "hover:bg-white/[0.02] border-l-4 border-transparent -ml-px"
                }`}
              >
                {/* Badge date */}
                <div className="shrink-0 w-14 text-center pt-0.5">
                  <span className="block text-2xl font-black font-mono leading-none text-white">
                    {item.date.split(" ")[0]}
                  </span>
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-[#A78BFA] mt-1 font-bold">
                    {item.date.split(" ").slice(1).join(" ") || "2024"}
                  </span>
                </div>

                {/* Titre */}
                <span className="flex-1 text-sm sm:text-base font-bold text-white/85 leading-snug group-hover:text-white transition-colors">
                  {item.title}
                </span>

                <ArrowUpRightIcon className={`w-4 h-4 shrink-0 mt-1 transition-colors ${
                  activeItem === idx ? "text-[#A78BFA]" : "text-white/20 group-hover:text-white"
                }`} />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/actualites/babillard"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-mono font-bold text-white hover:border-[#8B5CF6] hover:bg-[#6E3FC4] transition"
            >
              <span>Consulter l&apos;intégralité du babillard</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── DROITE (5 colonnes) : Carte événement vedette ── */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#18181b]">
          <div>
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-white/10 bg-neutral-900">
              <Image
                src="/hero_campus.jpg"
                alt="Journées Scientifiques de l'étudiant"
                fill
                className="object-cover grayscale contrast-125"
                sizes="(min-width: 1024px) 450px, 100vw"
              />
              {/* Overlay chevron décoratif */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="ann-chevron-neo" x="0" y="0" width="40" height="26" patternUnits="userSpaceOnUse">
                      <polyline points="0,0 20,13 40,0" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                      <polyline points="0,13 20,26 40,13" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#ann-chevron-neo)" />
                </svg>
              </div>

              {/* Badge date écarlate */}
              <div className="absolute top-4 left-4 bg-[#6E3FC4] px-3.5 py-1 text-xs font-mono font-bold text-white">
                ÉVÉNEMENT MAJEUR
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 text-xs text-[#A78BFA] font-mono mb-2 font-bold">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Faculté des Sciences — UY1</span>
              </div>
              <h4 className="text-xl font-black text-white leading-tight">
                15e édition des Journées Scientifiques de l&apos;étudiant
              </h4>
              <p className="mt-3 text-xs text-white/60 leading-relaxed">
                Expositions des travaux de recherche, soutenances publiques et rencontres entreprises-étudiants au campus principal de Ngoa-Ekellé.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/actualites/evenements"
              className="inline-flex items-center justify-between w-full border border-white/20 bg-white/5 px-4 py-3 text-xs font-mono font-bold text-white hover:border-[#8B5CF6] hover:bg-[#6E3FC4] transition"
            >
              <span>Participer aux Journées Scientifiques</span>
              <span className="text-base leading-none text-[#A78BFA] hover:text-white">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
