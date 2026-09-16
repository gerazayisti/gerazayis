"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav } from "@/lib/content";
import {
  SearchIcon,
  LockIcon,
  ChevronDownIcon,
  ArrowUpRightIcon,
} from "./Icons";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#111111]">
      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP : Grille 2 colonnes × 2 rangées style Swiss Neo-Brutalist
          ┌──────────────┬──────────────────────────────────────────────┐
          │              │  Rangée 1 — Top Bar (nav secondaire, CTA)   │
          │  LOGO        ├──────────────────────────────────────────────┤
          │  (span 2)    │  Rangée 2 — Main Nav (navigation thématique)│
          └──────────────┴──────────────────────────────────────────────┘
         ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-[auto,1fr] mx-auto max-w-content border-l border-r border-[#111111]">

        {/* ── COLONNE GAUCHE : Logo + Raison sociale (span 2 rangées) ── */}
        <div className="row-span-2 flex items-center gap-4 px-6 py-3 border-r border-[#111111] bg-white">
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <Image
              src="/logo/LOGO.svg"
              alt="Logo Faculté des Sciences UY1"
              width={46}
              height={58}
              className="object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <div className="leading-tight">
              <span className="block text-xs font-black uppercase tracking-tight text-ink">
                Faculté des Sciences
              </span>
              <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-ink/50">
                Université de Yaoundé I
              </span>
            </div>
          </Link>
        </div>

        {/* ── COLONNE DROITE — Rangée 1 : Top Bar ── */}
        <div className="flex items-center justify-between gap-3 px-6 py-2 border-b border-[#111111] bg-[#FAFAFA]">
          {/* Liens utilitaires (profilage d'audience) */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <Link
              href="/bibliotheque"
              className="px-3 py-1 font-bold text-ink/70 hover:text-[#5A2CA8] transition-colors"
            >
              Bibliothèque
            </Link>
            <span className="text-ink/20">/</span>
            <Link
              href="/la-faculte/enseignants"
              className="px-3 py-1 font-bold text-ink/70 hover:text-[#5A2CA8] transition-colors"
            >
              Enseignants
            </Link>
            <span className="text-ink/20">/</span>
            <Link
              href="/alumni"
              className="px-3 py-1 font-bold text-ink/70 hover:text-[#5A2CA8] transition-colors"
            >
              Alumni
            </Link>
          </div>

          {/* Badges d'accès + Recherche + CTA Écarlate */}
          <div className="flex items-center gap-2.5">
            {/* Badge Personnel */}
            <Link
              href="/portail-personnel"
              className="inline-flex items-center gap-2 border border-[#111111] bg-white px-3.5 py-1.5 text-xs font-mono font-bold text-ink hover:border-[#5A2CA8] hover:text-[#5A2CA8] transition"
            >
              <span>Personnel</span>
              <LockIcon className="w-3.5 h-3.5 text-ink/50" />
            </Link>

            {/* Badge Espace Étudiant */}
            <button
              type="button"
              className="inline-flex items-center gap-2 border border-[#111111] bg-white px-3.5 py-1.5 text-xs font-mono font-bold text-ink hover:border-[#5A2CA8] hover:text-[#5A2CA8] transition"
            >
              <span>Scolarité</span>
              <ChevronDownIcon className="w-3 h-3 text-ink/50" />
            </button>

            {/* Séparateur vertical 1px */}
            <span className="h-5 w-px bg-[#111111]" aria-hidden="true" />

            {/* Barre de recherche */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
              <input
                type="text"
                placeholder="Rechercher…"
                className="w-44 border border-[#111111] bg-white py-1.5 pl-9 pr-3 text-xs font-mono text-ink placeholder:text-ink/40 focus:border-[#5A2CA8] focus:outline-none transition"
              />
            </div>

            {/* CTA Violet (#5A2CA8) */}
            <Link
              href="/espace-etudiant/admission"
              className="inline-flex items-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] px-5 py-2 text-xs font-mono font-bold text-white transition-colors shadow-sm"
            >
              <span>Inscription en ligne</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── COLONNE DROITE — Rangée 2 : Navigation principale ── */}
        <div className="bg-[#18181b]">
          <nav className="flex items-center">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white/90 uppercase tracking-wider transition-colors hover:bg-white/10 hover:text-[#A78BFA] border-r border-white/10"
                >
                  <span>{item.label}</span>
                  <ChevronDownIcon className="w-3 h-3 text-white/40 group-hover:text-white transition-transform group-hover:rotate-180" />
                </Link>

                {/* Menu déroulant strict avec bordure 1px */}
                <div className="invisible absolute left-0 top-full w-64 border border-[#111111] bg-white p-2 opacity-0 shadow-2xl transition-all duration-150 group-hover:visible group-hover:opacity-100 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-3 py-2 text-xs font-bold text-ink/85 hover:bg-neutral-100 hover:text-[#5A2CA8] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE : Barre compacte + menu hamburger
         ═══════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between px-4 py-2.5 lg:hidden bg-white">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo/LOGO.svg"
            alt="Logo Faculté des Sciences UY1"
            width={36}
            height={46}
            className="object-contain"
            priority
          />
          <div className="leading-tight">
            <span className="block text-[11px] font-black uppercase tracking-tight text-ink">
              Fac. des Sciences
            </span>
            <span className="block text-[9px] font-mono text-ink/50">UY1</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/espace-etudiant/admission"
            className="inline-flex items-center gap-1.5 bg-[#5A2CA8] px-3.5 py-1.5 text-xs font-mono font-bold text-white"
          >
            <span>Scolarité</span>
            <ArrowUpRightIcon className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink hover:bg-neutral-100 border border-[#111111]"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      {mobileMenuOpen && (
        <div className="border-t border-[#111111] bg-white p-4 lg:hidden max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
            <input
              type="text"
              placeholder="Rechercher…"
              className="w-full border border-[#111111] bg-[#FAFAFA] py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-[#5A2CA8] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-black/10 pb-2">
                <Link
                  href={item.href}
                  className="block font-black text-sm text-ink py-1 hover:text-[#5A2CA8]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                <div className="pl-3 space-y-0.5">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block text-xs font-mono text-ink/70 py-1.5 hover:text-[#5A2CA8]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-black/10 flex flex-wrap gap-3 font-mono text-xs">
            <Link href="/bibliotheque" className="text-ink/70 hover:text-[#5A2CA8]" onClick={() => setMobileMenuOpen(false)}>Bibliothèque</Link>
            <Link href="/la-faculte/enseignants" className="text-ink/70 hover:text-[#5A2CA8]" onClick={() => setMobileMenuOpen(false)}>Enseignants</Link>
            <Link href="/alumni" className="text-ink/70 hover:text-[#5A2CA8]" onClick={() => setMobileMenuOpen(false)}>Alumni</Link>
          </div>
        </div>
      )}
    </header>
  );
}
