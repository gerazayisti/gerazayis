"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  InfoIcon,
} from "@/components/Icons";

interface CalendarEvent {
  id: string;
  dateDebut: string;
  dateFin?: string;
  titre: string;
  semestre: "S1" | "S2" | "Annuel";
  categorie: "cours" | "examens" | "inscriptions" | "feries" | "soutenances";
  statut: "termine" | "en_cours" | "a_venir";
  description: string;
  concerne: string;
}

const events: CalendarEvent[] = [
  // SEMESTRE 1 (HARMATTAN)
  {
    id: "evt-01",
    dateDebut: "01 Septembre 2025",
    dateFin: "15 Octobre 2025",
    titre: "Préinscriptions en ligne & Paiement des droits universitaires",
    semestre: "S1",
    categorie: "inscriptions",
    statut: "termine",
    description: "Enrôlement biométrique pour les nouveaux bacheliers (L1) et renouvellement d'inscription pour les anciens étudiants (50 000 FCFA).",
    concerne: "Tous les cycles (L1, L2, L3, M1, M2, Doctorat)",
  },
  {
    id: "evt-02",
    dateDebut: "06 Octobre 2025",
    titre: "Rentrée solennelle & Début des enseignements du Semestre 1",
    semestre: "S1",
    categorie: "cours",
    statut: "termine",
    description: "Ouverture solennelle des amphithéâtres pour les cours magistraux et travaux dirigés (TD).",
    concerne: "Tous les départements de la Faculté des Sciences",
  },
  {
    id: "evt-03",
    dateDebut: "03 Novembre 2025",
    dateFin: "20 Décembre 2025",
    titre: "Démarrage des Travaux Pratiques (TP) en Laboratoires",
    semestre: "S1",
    categorie: "cours",
    statut: "termine",
    description: "Séances obligatoires en laboratoires de Chimie, Biochimie, Physique, Biologie Animale, Biologie Végétale et Salles Machines d'Informatique.",
    concerne: "Étudiants de Licence 1, 2 et 3",
  },
  {
    id: "evt-04",
    dateDebut: "01 Décembre 2025",
    dateFin: "13 Décembre 2025",
    titre: "Période des Contrôles Continus (CC) - Semestre 1",
    semestre: "S1",
    categorie: "examens",
    statut: "termine",
    description: "Évaluations sommatives comptant pour 30% de la note finale de chaque Unité d'Enseignement.",
    concerne: "Tous les étudiants inscrits au Semestre 1",
  },
  {
    id: "evt-05",
    dateDebut: "22 Décembre 2025",
    dateFin: "04 Janvier 2026",
    titre: "Congés de fin d'année et de Noël",
    semestre: "S1",
    categorie: "feries",
    statut: "termine",
    description: "Interruption des cours magistraux et reprise le lundi 05 janvier 2026.",
    concerne: "Communauté universitaire",
  },
  {
    id: "evt-06",
    dateDebut: "19 Janvier 2026",
    dateFin: "07 Février 2026",
    titre: "Examens de Fin de Semestre 1 (Session Normale)",
    semestre: "S1",
    categorie: "examens",
    statut: "termine",
    description: "Épreuves terminales anonymes (comptant pour 70% de la note finale / 100).",
    concerne: "Toutes les filières scientifiques",
  },
  {
    id: "evt-07",
    dateDebut: "16 Février 2026",
    dateFin: "20 Février 2026",
    titre: "Délibérations du jury S1 & Affichage sur le Babillard",
    semestre: "S1",
    categorie: "examens",
    statut: "termine",
    description: "Publication des procès-verbaux officiels et ouverture de la période de 72 heures pour les requêtes de notes.",
    concerne: "Tous les étudiants ayant composé au S1",
  },

  // SEMESTRE 2 (MOUSSON)
  {
    id: "evt-08",
    dateDebut: "23 Février 2026",
    titre: "Reprise des cours magistraux du Semestre 2",
    semestre: "S2",
    categorie: "cours",
    statut: "termine",
    description: "Lancement des enseignements théoriques et travaux dirigés du second semestre académique.",
    concerne: "Tous les cycles de formation",
  },
  {
    id: "evt-09",
    dateDebut: "23 Mars 2026",
    dateFin: "10 Avril 2026",
    titre: "Travaux Pratiques S2 & Sorties de terrain géologiques",
    semestre: "S2",
    categorie: "cours",
    statut: "termine",
    description: "Missions d'études de terrain pour les départements des Sciences de la Terre et de Biologie.",
    concerne: "Filières Géologie, Botanique et Écologie",
  },
  {
    id: "evt-10",
    dateDebut: "04 Mai 2026",
    dateFin: "16 Mai 2026",
    titre: "Semaine des Contrôles Continus (CC) - Semestre 2",
    semestre: "S2",
    categorie: "examens",
    statut: "termine",
    description: "Évaluations de mi-parcours pour toutes les unités d'enseignement du semestre 2.",
    concerne: "Tous les niveaux de Licence et Master",
  },
  {
    id: "evt-11",
    dateDebut: "08 Juin 2026",
    dateFin: "27 Juin 2026",
    titre: "Examens Terminaux de Fin de Semestre 2 (Session Normale)",
    semestre: "S2",
    categorie: "examens",
    statut: "en_cours",
    description: "Sessions terminales écrites dans les grands amphithéâtres (Amphi 1001, 501, 350, 250).",
    concerne: "Tous les inscrits de la Faculté des Sciences",
  },
  {
    id: "evt-12",
    dateDebut: "06 Juillet 2026",
    dateFin: "10 Juillet 2026",
    titre: "Publication des résultats annuels & Listes des admissibles au rattrapage",
    semestre: "S2",
    categorie: "examens",
    statut: "a_venir",
    description: "Mise en ligne sur le Babillard numérique et affichage aux tableaux des départements.",
    concerne: "Tous les étudiants",
  },
  {
    id: "evt-13",
    dateDebut: "15 Juillet 2026",
    dateFin: "25 Juillet 2026",
    titre: "Session Spéciale de Rattrapage (Semestre 1 & Semestre 2)",
    semestre: "S2",
    categorie: "examens",
    statut: "a_venir",
    description: "Épreuves de rattrapage pour les UEs non compensées (note inférieure à 50/100).",
    concerne: "Étudiants ajournés en session normale",
  },
  {
    id: "evt-14",
    dateDebut: "03 Août 2026",
    dateFin: "14 Août 2026",
    titre: "Soutenances des Mémoires de Master et Thèses de Doctorat",
    semestre: "Annuel",
    categorie: "soutenances",
    statut: "a_venir",
    description: "Présentation publique des travaux de recherche devant les jurys académiques accrédités.",
    concerne: "Candidats Master Recherche, Master Pro et Doctorat Ph.D",
  },
  {
    id: "evt-15",
    dateDebut: "28 Août 2026",
    titre: "Clôture officielle de l'Année Académique 2025/2026",
    semestre: "Annuel",
    categorie: "feries",
    statut: "a_venir",
    description: "Arrêt des registres et transmission des procès-verbaux définitifs au Rectorat de l'UY1.",
    concerne: "Décanat et ensemble des départements",
  },
];

export default function CalendrierPage() {
  const [filterSemester, setFilterSemester] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredEvents = events.filter((evt) => {
    if (filterSemester !== "all" && evt.semestre !== filterSemester && evt.semestre !== "Annuel") {
      return false;
    }
    if (filterCategory !== "all" && evt.categorie !== filterCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── HÉRO DU CALENDRIER ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Chronométrie Académique Officielle
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Calendrier <span className="text-[#5A2CA8]">Académique</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Année Académique 2025/2026 — Arrêté Décanal portant découpage officiel des semestres,
                contrôles continus, sessions d&apos;examens, rattrapages et soutenances publiques.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#timeline"
                className="inline-flex items-center justify-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-5 py-3.5 text-xs font-mono font-bold transition shadow-sm"
              >
                <span>Consulter le chronogramme</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => alert("Le téléchargement du chronogramme officiel 2025/2026 au format PDF certifié débutera automatiquement.")}
                className="inline-flex items-center justify-center gap-2 border border-[#111111] bg-white hover:bg-black/5 text-[#0a0a0a] px-5 py-3.5 text-xs font-mono font-bold transition"
              >
                <FileTextIcon className="w-4 h-4 text-[#5A2CA8]" />
                <span>Télécharger le PDF (Arrêté UY1)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU SYNOPTIQUE DES 2 SEMESTRES ── */}
      <section className="border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content border-l border-r border-[#111111]">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#111111] font-mono text-xs">
            <div className="p-6 sm:p-8 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="bg-[#5A2CA8] text-white px-2 py-0.5 font-bold">SEMESTRE 1</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                  CLÔTURÉ · DÉLIBÉRÉ
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-[#0a0a0a]">Semestre Harmattan</h3>
              <p className="text-[#0a0a0a]/70">Période : 06 Octobre 2025 — 20 Février 2026</p>
              <ul className="space-y-1 text-[#0a0a0a]/80 text-[11px] pt-2 border-t border-black/10">
                <li>• 12 semaines d&apos;enseignements théoriques et TD</li>
                <li>• Examens normaux : 19 Janvier au 07 Février 2026</li>
                <li>• Notes publiées et requêtes traitées</li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 space-y-3 bg-[#FAFAFA]">
              <div className="flex items-center justify-between">
                <span className="bg-[#18181b] text-white px-2 py-0.5 font-bold">SEMESTRE 2</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 border border-amber-300 animate-pulse">
                  EN COURS · SESSION NORMALE
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-[#0a0a0a]">Semestre Mousson</h3>
              <p className="text-[#0a0a0a]/70">Période : 23 Février 2026 — 28 Août 2026</p>
              <ul className="space-y-1 text-[#0a0a0a]/80 text-[11px] pt-2 border-t border-black/10">
                <li>• Examens de fin de semestre en cours</li>
                <li>• Rattrapages prévus du 15 au 25 Juillet 2026</li>
                <li>• Soutenances Master &amp; Thèses en Août 2026</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BARRE DE FILTRES ── */}
      <section id="timeline" className="py-8 bg-[#FAFAFA] border-b border-[#111111]">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Filtre Semestre */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
              <span className="text-[#0a0a0a]/50 uppercase font-bold mr-2">Semestre :</span>
              {[
                { id: "all", label: "Tous" },
                { id: "S1", label: "Semestre 1" },
                { id: "S2", label: "Semestre 2" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterSemester(tab.id)}
                  className={`px-3 py-1.5 border transition cursor-pointer font-bold ${
                    filterSemester === tab.id
                      ? "border-[#5A2CA8] bg-[#5A2CA8] text-white"
                      : "border-[#111111] bg-white text-[#0a0a0a] hover:bg-black/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filtre Catégorie */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
              <span className="text-[#0a0a0a]/50 uppercase font-bold mr-2">Nature :</span>
              {[
                { id: "all", label: "Toutes" },
                { id: "examens", label: "Examens & CC" },
                { id: "cours", label: "Cours & TP" },
                { id: "inscriptions", label: "Inscriptions" },
                { id: "soutenances", label: "Soutenances" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-3 py-1.5 border transition cursor-pointer font-bold ${
                    filterCategory === tab.id
                      ? "border-[#18181b] bg-[#18181b] text-white"
                      : "border-[#111111] bg-white text-[#0a0a0a] hover:bg-black/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LISTE CHRONOLOGIQUE DES JALONS ACADÉMIQUES ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="space-y-4">
            {filteredEvents.map((evt, idx) => {
              const isTermine = evt.statut === "termine";
              const isEnCours = evt.statut === "en_cours";
              const isAVenir = evt.statut === "a_venir";

              return (
                <div
                  key={evt.id}
                  className={`border p-6 sm:p-8 transition-all ${
                    isEnCours
                      ? "border-[#5A2CA8] bg-[#5A2CA8]/5 shadow-md"
                      : "border-[#111111] bg-white"
                  }`}
                >
                  <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Bloc Dates */}
                    <div className="lg:col-span-3 font-mono">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#18181b] text-white text-[10px] font-black px-2 py-0.5">
                          {evt.semestre}
                        </span>
                        {isEnCours && (
                          <span className="bg-[#5A2CA8] text-white text-[10px] font-black px-2 py-0.5 animate-pulse">
                            EN COURS
                          </span>
                        )}
                        {isTermine && (
                          <span className="bg-black/10 text-[#0a0a0a]/60 text-[10px] font-bold px-2 py-0.5">
                            TERMINÉ
                          </span>
                        )}
                        {isAVenir && (
                          <span className="border border-black/20 text-[#0a0a0a]/70 text-[10px] font-bold px-2 py-0.5">
                            À VENIR
                          </span>
                        )}
                      </div>

                      <div className="text-sm sm:text-base font-black text-[#0a0a0a] uppercase">
                        {evt.dateDebut}
                      </div>
                      {evt.dateFin && (
                        <div className="text-xs text-[#0a0a0a]/60 font-medium">
                          au {evt.dateFin}
                        </div>
                      )}
                    </div>

                    {/* Bloc Détails */}
                    <div className="lg:col-span-7 space-y-2">
                      <h3 className="text-base sm:text-lg font-black uppercase text-[#0a0a0a] tracking-tight">
                        {evt.titre}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
                        {evt.description}
                      </p>
                      <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-[#0a0a0a]/60">
                        <span className="text-[#5A2CA8] font-bold">Public ciblé :</span>
                        <span>{evt.concerne}</span>
                      </div>
                    </div>

                    {/* Bloc Action / Badge Catégorie */}
                    <div className="lg:col-span-2 flex lg:justify-end items-center font-mono text-xs">
                      <span className="border border-[#111111] bg-[#FAFAFA] px-2.5 py-1 text-[11px] font-bold uppercase text-[#0a0a0a]/80">
                        {evt.categorie}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Note de bas de page décanale */}
          <div className="mt-12 p-6 border border-[#111111] bg-[#FAFAFA] font-mono text-xs text-[#0a0a0a]/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#5A2CA8] uppercase">
              <InfoIcon className="w-4 h-4" />
              <span>Avis important de la Direction des Études (DPSAA) :</span>
            </div>
            <p className="leading-relaxed">
              Les dates des sessions d&apos;examens sont impératives. Aucun rattrapage exceptionnel ne sera accordé en dehors
              des sessions prévues par le présent chronogramme. Tout chevauchement d&apos;épreuves doit être signalé à la DAARS
              au minimum 48 heures avant le début de la composition via le Guichet des Requêtes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
