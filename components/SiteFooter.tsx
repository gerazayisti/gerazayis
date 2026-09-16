"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { contact, departments } from "@/lib/content";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  GlobeIcon,
  ArrowUpRightIcon,
} from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-white text-[#0a0a0a] border-t border-[#111111]">
      
      {/* ── 1. Bandeau d'appel à l'action style exact "Let's build right away" du mockup ── */}
      <div className="border-b border-[#111111] bg-[#FAFAFA] py-16">
        <div className="mx-auto max-w-content px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Portail Universitaire
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-[#0a0a0a] leading-none">
              Restez connecté aux<br /> 
              <span className="text-[#5A2CA8] italic font-serif">communiqués officiels</span>
            </h2>
            
            <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/70 max-w-xl">
              Calendrier des examens, programmes de bourses
              et opportunités académiques de la Faculté des Sciences.
            </p>
          </div>

          {/* Formulaire d'inscription rectangulaire strict 1px */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md w-full">
            <input
              type="email"
              placeholder="Votre email institutionnel…"
              className="flex-1 border border-[#111111] bg-white px-4 py-3.5 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none"
            />
            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] px-7 py-3.5 text-xs font-mono font-bold text-white transition shadow-sm"
            >
              <span>S&apos;abonner</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Colonnes de navigation éditoriales avec séparateurs 1px solid #111111 ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#111111] bg-white">
          
          {/* Colonne 1 : coordonnées */}
          <div className="p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#5A2CA8] inline-block"></span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#0a0a0a] font-black">
                coordonnées
              </p>
            </div>
            
            <div className="space-y-3 text-xs text-[#0a0a0a]/75 pt-2">
              <p className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 text-[#5A2CA8] shrink-0 mt-0.5" />
                <span>{contact.bp} — Plateau Atemengué, Yaoundé</span>
              </p>
              <p className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-[#5A2CA8] shrink-0" />
                <span>{contact.phone}</span>
              </p>
              <p className="flex items-center gap-3">
                <MailIcon className="w-4 h-4 text-[#5A2CA8] shrink-0" />
                <span>{contact.emails.official}</span>
              </p>
              <p className="flex items-center gap-3">
                <GlobeIcon className="w-4 h-4 text-[#5A2CA8] shrink-0" />
                <span>{contact.site}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 text-xs font-mono">
              <p className="text-[10px] text-[#0a0a0a]/40 uppercase font-bold">Services décanat :</p>
              <p className="text-[#0a0a0a] font-bold mt-1">{contact.emails.doyen}</p>
              <p className="text-[#0a0a0a] font-bold">{contact.emails.scolarite}</p>
            </div>
          </div>

          {/* Colonne 2 : nos départements */}
          <div className="p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#5A2CA8] inline-block"></span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#0a0a0a] font-black">
                nos départements
              </p>
            </div>

            <ul className="space-y-2 text-xs text-[#0a0a0a]/75 pt-2 font-mono">
              {departments.slice(0, 6).map((d) => (
                <li key={d.code}>
                  <Link
                    href={`/departements/${d.slug}`}
                    className="hover:text-[#5A2CA8] transition-colors flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#5A2CA8] font-bold">▪</span>
                      <span className="group-hover:translate-x-1 transition-transform">{d.name}</span>
                    </span>
                    <span className="text-[10px] text-[#0a0a0a]/40 font-bold">{d.code}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/departements"
                  className="text-[#5A2CA8] hover:underline font-bold inline-flex items-center gap-1.5"
                >
                  <span>Tous les départements</span>
                  <ArrowUpRightIcon className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : accès rapide */}
          <div className="p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#5A2CA8] inline-block"></span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#0a0a0a] font-black">
                accès rapide
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-[#0a0a0a]/75 pt-2 font-mono">
              <li>
                <Link href="/espace-etudiant/notes" className="hover:text-[#5A2CA8] transition flex items-center gap-2 font-bold text-[#5A2CA8]">
                  <span>▪</span>
                  <span>Le Babillard (Notes &amp; Résultats)</span>
                </Link>
              </li>
              <li>
                <Link href="/espace-etudiant/requetes" className="hover:text-[#5A2CA8] transition flex items-center gap-2 font-bold text-[#5A2CA8]">
                  <span>▪</span>
                  <span>Guichet des Requêtes en ligne</span>
                </Link>
              </li>
              <li>
                <Link href="/espace-etudiant/scolarite" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Service de la scolarité</span>
                </Link>
              </li>
              <li>
                <Link href="/espace-etudiant/calendrier" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Calendrier académique</span>
                </Link>
              </li>
              <li>
                <Link href="/espace-etudiant/admission" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Conditions d&apos;admission</span>
                </Link>
              </li>
              <li>
                <Link href="/espace-etudiant/lmd" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Système LMD</span>
                </Link>
              </li>
              <li>
                <Link href="/espace-etudiant/bourses" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Bourses &amp; Aides d&apos;étude</span>
                </Link>
              </li>
              <li>
                <Link href="/formations/energie-renouvelable" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Formation Photovoltaïque</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : recherche & réseaux */}
          <div className="p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#5A2CA8] inline-block"></span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#0a0a0a] font-black">
                recherche &amp; réseaux
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-[#0a0a0a]/75 pt-2 font-mono">
              <li>
                <Link href="/recherches/axes" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Axes prioritaires</span>
                </Link>
              </li>
              <li>
                <Link href="/recherches/laboratoires" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Laboratoires accrédités</span>
                </Link>
              </li>
              <li>
                <Link href="/recherches/resultats" className="hover:text-[#5A2CA8] transition flex items-center gap-2">
                  <span className="text-[#5A2CA8] font-bold">▪</span>
                  <span>Publications &amp; thèses</span>
                </Link>
              </li>
            </ul>

            <div className="pt-6 border-t border-black/10">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#0a0a0a]/50 mb-3 font-bold">
                Réseaux Sociaux
              </p>
              <div className="flex gap-2 font-mono text-xs font-bold">
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#111111] bg-white px-3 py-1.5 hover:bg-[#5A2CA8] hover:border-[#5A2CA8] hover:text-white transition"
                >
                  Facebook
                </a>
                <a
                  href={contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#111111] bg-white px-3 py-1.5 hover:bg-[#5A2CA8] hover:border-[#5A2CA8] hover:text-white transition"
                >
                  Twitter / X
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Ligne inférieure : Logo officiel et Copyright style mockup ── */}
        <div className="border-t border-[#111111] p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-[#FAFAFA] text-xs font-mono">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/LOGO.svg"
              alt="Logo Faculté des Sciences"
              width={34}
              height={42}
              className="object-contain"
            />
            <div>
              <p className="font-black text-[#0a0a0a]">Faculté des Sciences</p>
              <p className="text-[10px] text-[#0a0a0a]/50 uppercase">Université de Yaoundé I</p>
            </div>
          </div>

          <p className="text-[#0a0a0a]/60">
            © {new Date().getFullYear()} UY1 — Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[#0a0a0a]/70">
            <Link href="/admin" className="hover:text-[#5A2CA8] font-bold text-[#5A2CA8] transition">
              Portail Administration &amp; Décanat
            </Link>
            <span>/</span>
            <Link href="/mentions-legales" className="hover:text-[#5A2CA8] transition">
              Mentions légales
            </Link>
            <span>/</span>
            <Link href="/confidentialite" className="hover:text-[#5A2CA8] transition">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
