"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PaperclipIcon, ArrowRightIcon, UniversitySealIcon } from "./Icons";

const links = [
  { label: "Historique de la Faculté & Héritage", href: "/la-faculte/presentation" },
  { label: "Vision, Mission & Valeurs", href: "/la-faculte/presentation" },
  { label: "Structure administrative & Vice-décanats", href: "/la-faculte/structure" },
  { label: "Corps Enseignant & Chercheurs permanents", href: "/la-faculte/enseignants" },
  { label: "Contacts, BP 812 & Plan d'accès", href: "/la-faculte/contacts" },
];

export default function AboutCard() {
  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── Conteneur principal avec photo architecturale et carte superposée stricte ── */}
      <div className="relative min-h-[620px] w-full overflow-hidden bg-[#18181b]">
        
        {/* Photo panoramique du campus en noir & blanc contrasté */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/campus_facade.jpg"
            alt="Campus de la Faculté des Sciences de l'Université de Yaoundé I"
            fill
            className="object-cover object-center grayscale contrast-125 brightness-50"
            sizes="(min-width: 1280px) 1240px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18181b]/95 via-[#18181b]/60 to-transparent" />
        </div>

        {/* Carte blanche superposée sur la gauche - Style Swiss Neo-Brutalist 1px solid #111111 */}
        <div className="relative z-10 mx-auto max-w-content px-6 py-16 sm:py-20 flex items-center">
          <div className="border border-[#111111] bg-white p-8 sm:p-12 shadow-2xl max-w-xl">
            
            {/* En-tête de la carte avec label mono et badge violet */}
            <div className="flex items-center justify-between border-b border-[#111111] pb-5">
              <div className="inline-flex items-center gap-2">
                <PaperclipIcon className="w-4 h-4 text-[#5A2CA8]" />
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                  DEPUIS 1962
                </span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center bg-[#5A2CA8] text-white">
                <UniversitySealIcon className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Titre et description éditoriaux */}
            <div className="mt-6">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#0a0a0a] leading-tight">
                En savoir plus sur la <br />
                <span className="text-[#5A2CA8]">Faculté des Sciences</span>
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/70 leading-relaxed">
                Institution doyenne de l&apos;Université de Yaoundé I, la Faculté des Sciences
                conjugue rigueur académique, excellence dans la recherche et appui au développement
                national et sous-régional.
              </p>
            </div>

            {/* Liste de liens interactifs avec bordures 1px */}
            <ul className="mt-8 divide-y divide-[#111111] border-t border-b border-[#111111]">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between py-3.5 text-xs sm:text-sm font-black text-[#0a0a0a] hover:text-[#5A2CA8] hover:pl-2 transition-all"
                  >
                    <span>{l.label}</span>
                    <ArrowRightIcon className="w-4 h-4 text-[#0a0a0a]/40 group-hover:text-[#5A2CA8] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Note sur les campus avec typographie mono */}
            <div className="mt-6 flex items-center justify-between text-[11px] text-[#0a0a0a]/50 font-mono font-bold">
              <span>Campus principal &amp; Extension</span>
              <span className="text-[#5A2CA8]">Yaoundé, Cameroun</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
