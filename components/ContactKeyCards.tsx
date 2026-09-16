"use client";

import React, { useState } from "react";
import { MailIcon, CopyIcon, CheckIcon, ArrowUpRightIcon } from "@/components/Icons";

interface PriorityCard {
  number: string;
  badge: string;
  title: string;
  scope: string;
  emails: { label: string; address: string }[];
  location: string;
}

const PRIORITY_CARDS: PriorityCard[] = [
  {
    number: "01",
    badge: "Direction Générale",
    title: "Cabinet du Doyen",
    scope: "Audience, affaires réservées, coopération interuniversitaire et direction exécutive de la Faculté.",
    emails: [
      { label: "Doyen", address: "doyen@facsciences.uy1.cm" },
      { label: "Secrétariat Doyen", address: "Secretariat.doyen@facsciences.uy1.cm" },
    ],
    location: "Bâtiment Décanat — Niveau 1",
  },
  {
    number: "02",
    badge: "Courrier & Relations Publiques",
    title: "Secrétariat de la Faculté",
    scope: "Dépôt des courriers officiels, transmission des dossiers institutionnels et requêtes administratives.",
    emails: [
      { label: "Courrier Central", address: "secretariat@facsciences.uy1.cm" },
    ],
    location: "Bâtiment Administratif — Rez-de-chaussée",
  },
  {
    number: "03",
    badge: "Étudiants & Cursus",
    title: "Service de la Scolarité",
    scope: "Inscriptions annuelles, réinscriptions, cartes d'étudiants, transferts et attestations de scolarité.",
    emails: [
      { label: "Scolarité Centrale", address: "scolarite@facsciences.uy1.cm" },
    ],
    location: "Hall Central Scolarité — Guichets 1 à 6",
  },
  {
    number: "04",
    badge: "Diplomation & Grades",
    title: "Service des Diplômes",
    scope: "Délivrance des attestations de réussite, vérification d'authenticité, relevés de notes et parchemins.",
    emails: [
      { label: "Guichet Diplômes", address: "diplome@facsciences.uy1.cm" },
    ],
    location: "Bâtiment DAARS — Bureau des Diplômes",
  },
  {
    number: "05",
    badge: "Systèmes & Réseaux",
    title: "Cellule Informatique",
    scope: "Infrastructures numériques, serveurs, portail de gestion des notes et connectivité des laboratoires.",
    emails: [
      { label: "Cellule IT", address: "ci@facsciences.uy1.cm" },
    ],
    location: "Centre de Télé-Enseignement / Salle CI",
  },
  {
    number: "06",
    badge: "Assistance & Comptes",
    title: "Support Technique & Admin",
    scope: "Aide à la connexion, réinitialisation des accès étudiants, assistance technique aux enseignants et usagers.",
    emails: [
      { label: "Support", address: "support@facsciences.uy1.cm" },
      { label: "Administration IT", address: "admin@facsciences.uy1.cm" },
    ],
    location: "Assistance en ligne & Guichet Support",
  },
];

export default function ContactKeyCards() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyEmail = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => {
      setCopiedAddress(null);
    }, 2000);
  };

  return (
    <section className="w-full bg-white border-b border-[#111111] py-14">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Points de Contact Prioritaires
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
              Services Clés &amp; <span className="font-serif italic text-[#5A2CA8]">Lignes Directes</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md">
            Adresses dédiées aux démarches fréquentes des étudiants, partenaires institutionnels et usagers de la faculté.
          </p>
        </div>

        {/* Grille des 6 services prioritaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#111111] bg-white divide-y md:divide-y-0 divide-[#111111]">
          {PRIORITY_CARDS.map((card, idx) => (
            <div
              key={card.number}
              className={`p-6 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors border-b border-[#111111] ${
                (idx + 1) % 3 !== 0 ? "lg:border-r" : ""
              } ${(idx + 1) % 2 !== 0 ? "md:max-lg:border-r" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#5A2CA8] text-white px-2 py-0.5">
                    {card.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0a0a0a]/40">
                    [{card.number}]
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0a0a0a] tracking-tight">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs text-[#0a0a0a]/70 leading-relaxed min-h-[3rem]">
                  {card.scope}
                </p>

                <div className="mt-3 text-[11px] font-mono text-[#0a0a0a]/50 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#5A2CA8]"></span>
                  <span>{card.location}</span>
                </div>
              </div>

              {/* Lignes emails avec bouton copier et mailto */}
              <div className="mt-6 pt-4 border-t border-black/10 space-y-2">
                {card.emails.map((e) => (
                  <div
                    key={e.address}
                    className="p-2.5 border border-[#111111] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#5A2CA8] block">
                        {e.label}
                      </span>
                      <a
                        href={`mailto:${e.address}`}
                        className="font-mono text-xs font-bold text-[#0a0a0a] hover:text-[#5A2CA8] truncate block"
                        title={e.address}
                      >
                        {e.address}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => copyEmail(e.address)}
                        className="px-2 py-1 text-[11px] font-mono border border-[#111111] bg-[#FAFAFA] hover:bg-black hover:text-white transition flex items-center gap-1"
                        title="Copier l'adresse"
                      >
                        {copiedAddress === e.address ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckIcon className="w-3 h-3" />
                            <span>Copié</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <CopyIcon className="w-3 h-3" />
                            <span>Copier</span>
                          </span>
                        )}
                      </button>

                      <a
                        href={`mailto:${e.address}`}
                        className="p-1 text-[#0a0a0a] hover:text-[#5A2CA8] transition"
                        title="Envoyer un email"
                      >
                        <ArrowUpRightIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
