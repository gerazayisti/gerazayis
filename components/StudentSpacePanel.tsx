"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, GraduationCapIcon } from "./Icons";

const cycleTabs = [
  { label: "Licence (L1-L3)", desc: "Sciences fondamentales et appliquées" },
  { label: "Master (M1-M2)", desc: "Spécialisation et initiation à la recherche" },
  { label: "Doctorat (Ph.D)", desc: "Recherche doctorale et thèses" },
  { label: "Certifiants", desc: "Énergie solaire photovoltaïque et métiers" },
];

const services = [
  { code: "01", title: "Le Babillard (Notes & Résultats)", href: "/espace-etudiant/notes", desc: "Consultation officielle des procès-verbaux de notes semestrielles (2025/2026 en priorité) et MGP." },
  { code: "02", title: "Guichet des Requêtes Académiques", href: "/espace-etudiant/requetes", desc: "Dépôt et suivi des requêtes de notes, corrections de matricule/nom et demandes de certificats." },
  { code: "03", title: "Service de la scolarité", href: "/espace-etudiant/scolarite", desc: "Retrait des cartes biométriques, attestations de réussite et dossiers DAARS." },
  { code: "04", title: "Calendrier académique", href: "/espace-etudiant/calendrier", desc: "Chronogramme des semestres, contrôles continus, sessions d'examens et rattrapages." },
  { code: "05", title: "Système LMD & Crédits", href: "/espace-etudiant/lmd", desc: "Règles de capitalisation des crédits ECTS, compensation semestrielle et barème officiel." },
  { code: "06", title: "Bourses d'étude & Aides", href: "/espace-etudiant/bourses", desc: "Prime d'excellence MINESUP (50 000 FCFA), mobilités AUF/DAAD et aides d'urgence." },
];

export default function StudentSpacePanel() {
  const [activeCycle, setActiveCycle] = useState(0);

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">

      {/* ── En-tête éditorial pleine largeur sur fond gris-noir #18181b ── */}
      <div className="bg-[#4C1D95] text-white border-b border-[#111111]">
        <div className="mx-auto max-w-content px-6 py-16 grid lg:grid-cols-12 gap-10 items-end border-l border-r border-white/10">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 bg-[#A78BFA] inline-block"></span>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#A78BFA]">
                Accompagnement Pédagogique
              </p>
            </div>
            
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95]">
              Espace <br />
              <span className="text-[#A78BFA]">Étudiant</span> <br />
              &amp; Scolarité
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Toutes les ressources numériques, formulaires administratifs et démarches officielles
              pour accompagner votre parcours d&apos;excellence à la Faculté des Sciences.
            </p>

            {/* Onglets de cycles - Rectangles stricts 1px sans arrondis */}
            <div className="flex flex-wrap gap-0 border border-white/20">
              {cycleTabs.map((c, i) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setActiveCycle(i)}
                  className={`px-4 py-3 text-xs font-mono font-bold transition-all border-r border-white/20 last:border-r-0 ${
                    activeCycle === i
                      ? "bg-[#6E3FC4] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Description du cycle sélectionné */}
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span className="text-[#A78BFA] font-bold">▪</span>
              <span>{cycleTabs[activeCycle].desc} — Année académique 2024-2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grille Bento continue 3×2 sur fond blanc (gap: 0, bordures partagées 1px solid #111111) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white">
        {services.map((s, i) => (
          <Link
            key={s.title}
            href={s.href}
            className={`group flex flex-col justify-between p-8 transition-all bg-white hover:bg-[#18181b] hover:text-white border-r border-b border-[#111111] ${
              i % 3 === 2 ? "lg:border-r-0" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                  {s.code} / SERVICES
                </span>
                <span className="w-2 h-2 bg-black/10 group-hover:bg-[#A78BFA] transition-colors"></span>
              </div>

              <h4 className="text-lg font-black text-[#0a0a0a] group-hover:text-white leading-snug transition-colors">
                {s.title}
              </h4>
              <p className="mt-3 text-xs text-[#0a0a0a]/65 group-hover:text-white/70 leading-relaxed transition-colors">
                {s.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-black/10 group-hover:border-white/10 flex items-center justify-between transition-colors">
              <span className="text-xs font-mono font-bold text-[#0a0a0a] group-hover:text-[#A78BFA] transition-colors">
                Accéder au service
              </span>
              <ArrowUpRightIcon className="w-4 h-4 text-[#0a0a0a]/40 group-hover:text-[#A78BFA] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bandeau de repère signalétique bas ── */}
      <div className="border-t border-[#111111] bg-[#FAFAFA] py-4">
        <div className="mx-auto max-w-content px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#0a0a0a]/60 flex items-center gap-2">
            <GraduationCapIcon className="w-4 h-4 text-[#5A2CA8]" />
            <span>Cursus Universitaire UY1 — Inscriptions et Préinscriptions académiques</span>
          </p>
          <Link
            href="/espace-etudiant/admission"
            className="font-bold text-[#5A2CA8] hover:underline flex items-center gap-1"
          >
            <span>Portail Admission en ligne</span>
            <span>→</span>
          </Link>
        </div>
      </div>

    </section>
  );
}
