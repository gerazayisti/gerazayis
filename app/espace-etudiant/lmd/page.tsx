"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCapIcon,
  CheckIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  InfoIcon,
  ChevronDownIcon,
  AwardIcon,
} from "@/components/Icons";
import { GRADING_SCALE, STUDENT_ATTITUDE_SYMBOLS } from "@/lib/student-data";

interface LexiqueItem {
  terme: string;
  definition: string;
  badge?: string;
  detail?: string;
}

const lexiqueLMD: LexiqueItem[] = [
  {
    terme: "Domaine",
    badge: "Sciences et Technologie",
    definition: "Regroupe plusieurs disciplines de formation. La Faculté des Sciences de l’Université de Yaoundé I (FS/UYI) offre des formations dans le grand domaine « Sciences et Technologie ».",
  },
  {
    terme: "Sous-domaine",
    badge: "3 Sous-domaines",
    definition: "Regroupe des disciplines de formations liées entre elles par des affinités scientifiques. En FS/UYI, le domaine comporte : Sciences mathématiques et informatiques, Sciences de la matière, et Sciences de la Nature et de la Vie.",
  },
  {
    terme: "Filière (Mentions)",
    badge: "8 Filières officielles",
    definition: "Les formations sont regroupées en filières ou mentions : Biochimie (BCH), Biologie Animale (BOA), Biologie Végétale (BOV), Chimie (CHM), Informatique (INF), Mathématique (MAT), Physique (PHY) et Sciences de la Terre et de l’Univers (STU).",
  },
  {
    terme: "Parcours type",
    badge: "Académique ou Professionnel",
    definition: "Progression au sein d’un ensemble cohérent de matières adapté au projet personnel et professionnel de l’étudiant. Il peut être mono-disciplinaire (concentration sur une discipline) ou poly-disciplinaire.",
  },
  {
    terme: "Unité d’Enseignement (UE)",
    badge: "4 Catégories",
    definition: "Ensemble d’enseignements organisés de manière pédagogique cohérente en vue de l'acquisition de compétences précises. 4 catégories : Fondamentales (obligatoires pour un parcours), Complémentaires/Optionnelles (enrichissement), Transversales obligatoires (langues pour tous les établissements UY1), et Non obligatoires (humanités, informatique, bonne gouvernance, culture, sport, etc.).",
    detail: "Modalités : Cours magistraux (CM), travaux dirigés (TD), travaux pratiques (TP), Séminaires (SM), stages (ST), projets (PR), travaux personnels de l’étudiant (TPE), mémoires et thèses.",
  },
  {
    terme: "Crédits ECTS & Équivalence Horaire",
    badge: "1 à 6 Crédits / UE",
    definition: "Valeur numérique d’unités capitalisables et transférables affectée à chaque UE. Fonction du volume de travail. Règle d'équivalence horaire : 1 heure de CM = 1,5 heure de TD = 3 heures de TP.",
    detail: "Exemple : 1 UE ayant 3h de CM et 1,5h de TD par semaine équivaut à 4h de CM par semaine, soit 60 heures de CM par semestre = 6 crédits.",
  },
  {
    terme: "Capitalisation & Transférabilité",
    badge: "Acquis Définitif",
    definition: "L’acquisition d’une UE obtenue avec une note égale ou supérieure à la moyenne exigée confère des crédits capitalisés. Ils sont définitivement acquis et transférables d’un parcours à l'autre, d’une université à l'autre et d’un pays à l'autre. Les crédits avec note inférieure à la moyenne exigée ne sont pas transférables.",
  },
  {
    terme: "Relevé de Notes et Crédits",
    badge: "Document officiel",
    definition: "Document officiel contenant la description sommaire des résultats scolaires d'un étudiant. Il indique le nombre de crédits récoltés par l'étudiant, ses notes et son rang.",
  },
  {
    terme: "Diplôme & Supplément au Diplôme",
    badge: "Sanction de Grade",
    definition: "Le diplôme sanctionne la fin d’un grade de formation (Licence, Master, Doctorat). Le supplément au diplôme sanctionne les UEs non obligatoires validées par l'étudiant pendant sa formation.",
  },
  {
    terme: "Chevauchement ou Enjambement",
    badge: "Poursuite conditionnelle",
    definition: "Autorisation accordée à un étudiant ayant partiellement validé un niveau de formation à s’inscrire l’année suivante à toutes les UEs non validées du niveau inférieur et aux UEs du niveau supérieur sous conditions réglementaires strictes.",
  },
  {
    terme: "Moyenne Générale Pondérée (MGP)",
    badge: "Indicateur Clé sur 4.00",
    definition: "Indicateur de réussite pondéré par les crédits de chaque UE selon la formule officielle : MGP = ∑ (xi · ni) / ∑ ni, où xi est la qualité de points de l'UE i, ni son nombre de crédits, et ∑ ni la somme des crédits.",
  },
];

export default function LmdSystemPage() {
  const [openLexique, setOpenLexique] = useState<number | null>(null);
  const [activeCycleTab, setActiveCycleTab] = useState<"licence" | "master" | "doctorat">("licence");

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DU LMD ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Faculté des Sciences · Université de Yaoundé I
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Présentation du Système <span className="text-[#5A2CA8]">LMD</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/75 max-w-3xl leading-relaxed">
                La formation à la Faculté des Sciences se fait suivant le système <strong>Licence – Master – Doctorat (LMD)</strong>.
                Retrouvez ici la présentation officielle : lexique réglementaire, équivalences horaires, conditions d&apos;enjambement,
                calcul de la MGP et grille complète de notation sur 100.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/espace-etudiant/notes"
                className="inline-flex items-center justify-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-5 py-3.5 text-xs font-mono font-bold transition shadow-sm"
              >
                <span>Consulter mes notes et crédits</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/espace-etudiant/admission"
                className="inline-flex items-center justify-center gap-2 border border-[#111111] bg-white hover:bg-black/5 text-[#0a0a0a] px-5 py-3.5 text-xs font-mono font-bold transition"
              >
                <span>Conditions d&apos;admission L1</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU SYNOPTIQUE : LES 3 CYCLES DU LMD ── */}
      <section className="border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content border-l border-r border-[#111111]">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#111111] font-mono text-xs">
            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#5A2CA8] text-white px-2 py-0.5 font-bold">CYCLE 1</span>
                <span className="font-bold text-[#0a0a0a]/60">BAC + 3</span>
              </div>
              <h3 className="text-xl font-black text-[#0a0a0a]">LICENCE</h3>
              <p className="text-[#5A2CA8] font-bold">6 Semestres (3 ans) · 180 Crédits</p>
              <p className="text-[#0a0a0a]/70 pt-1">
                Licence académique ou professionnelle. 60 crédits par an (24 à 36 crédits/semestre).
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#18181b] text-white px-2 py-0.5 font-bold">CYCLE 2</span>
                <span className="font-bold text-[#0a0a0a]/60">BAC + 5</span>
              </div>
              <h3 className="text-xl font-black text-[#0a0a0a]">MASTER</h3>
              <p className="text-[#5A2CA8] font-bold">4 Semestres (2 ans) · 120 Crédits</p>
              <p className="text-[#0a0a0a]/70 pt-1">
                M1 approfondissement (60 crédits) + M2 spécialisation et mémoire (60 crédits).
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-700 text-white px-2 py-0.5 font-bold">CYCLE 3</span>
                <span className="font-bold text-[#0a0a0a]/60">BAC + 8</span>
              </div>
              <h3 className="text-xl font-black text-[#0a0a0a]">DOCTORAT / Ph.D</h3>
              <p className="text-[#5A2CA8] font-bold">6 Semestres (3 ans) · Min 180 Crédits</p>
              <p className="text-[#0a0a0a]/70 pt-1">
                École Doctorale, recherche en laboratoires accrédités et soutenance de thèse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1 : LEXIQUE COMPLET DU LMD À LA FS/UYI ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111]">
            <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">Terminologie Universitaire</p>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
              Lexique Officiel du LMD (FS / UYI)
            </h2>
            <p className="text-xs sm:text-sm text-[#0a0a0a]/70 mt-1">
              Les définitions normatives qui régissent les études, crédits, filières et parcours de formation.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {lexiqueLMD.map((item, index) => {
              const isOpen = openLexique === index;
              return (
                <div key={item.terme} className="border border-[#111111] bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenLexique(isOpen ? null : index)}
                    className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#FAFAFA] transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-[10px]">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="font-black text-sm sm:text-base text-[#0a0a0a]">
                        {item.terme}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-[#5A2CA8]/10 text-[#5A2CA8] font-bold text-[11px]">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDownIcon
                        className={`w-4 h-4 text-[#5A2CA8] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-black/10 bg-[#FAFAFA] space-y-3">
                      <p className="text-[#0a0a0a]/80 text-xs sm:text-sm leading-relaxed">
                        {item.definition}
                      </p>
                      {item.detail && (
                        <div className="p-3 border border-black/10 bg-white text-[#5A2CA8] font-bold text-[11px]">
                          <strong>Précision :</strong> {item.detail}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : FORMULE ET CALCUL DE LA MGP ── */}
      <section className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 font-mono text-xs">
              <span className="font-black uppercase text-[#5A2CA8]">Pondération Académique</span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Calcul de la Moyenne Générale Pondérée (MGP)
              </h2>
              <p className="text-[#0a0a0a]/75 text-sm leading-relaxed">
                La MGP est l&apos;indicateur synthèse de la performance académique de l&apos;étudiant sur une échelle de <strong>4.00 points</strong>.
                Chaque note d&apos;Unité d&apos;Enseignement est convertie en une « qualité de points » selon la grille de notation officielle UY1, puis pondérée par le nombre de crédits.
              </p>

              <div className="p-6 border border-[#111111] bg-white space-y-3">
                <p className="font-black uppercase text-sm text-[#0a0a0a]">Formule Mathématique Officielle :</p>
                <div className="p-4 bg-[#18181b] text-white text-center text-base sm:text-lg font-black tracking-widest">
                  MGP = ∑ (xi · ni) / ∑ ni
                </div>
                <ul className="space-y-1.5 text-[#0a0a0a]/75 pt-2 text-[11px]">
                  <li>• <strong>xi</strong> : Qualité de points associée à l&apos;Unité d&apos;Enseignement numéro i (de 0.00 à 4.00)</li>
                  <li>• <strong>ni</strong> : Nombre de crédits ECTS affectés à l&apos;UE numéro i (de 1 à 6 crédits)</li>
                  <li>• <strong>∑ ni</strong> : Somme totale des crédits des UEs inscrites sur le semestre ou l&apos;année (ex: 30 ou 60)</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 border border-[#111111] bg-white p-6 sm:p-8 space-y-4 font-mono text-xs">
              <h3 className="text-base font-black uppercase text-[#0a0a0a]">
                Équivalence Horaire d&apos;un Crédit ECTS
              </h3>
              <p className="text-[#0a0a0a]/75 text-xs leading-relaxed">
                Le crédit est fonction du volume de travail engendré et de l&apos;importance de l&apos;UE dans le parcours :
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAFAFA] border border-black/10 text-center font-bold">
                <div>1h CM</div>
                <div className="text-[#5A2CA8]">= 1,5h TD</div>
                <div className="text-emerald-700">= 3h TP</div>
              </div>

              <div className="p-4 border border-[#5A2CA8] bg-[#5A2CA8]/5 space-y-2">
                <span className="font-bold text-[#5A2CA8] uppercase block">Exemple concret :</span>
                <p className="text-[#0a0a0a]/80 text-[11px] leading-relaxed">
                  Une UE comportant <strong>3 heures de Cours Magistraux (CM)</strong> et <strong>1,5 heure de Travaux Dirigés (TD)</strong> par semaine a un volume hebdomadaire équivalent à <strong>4 heures de CM</strong>, soit <strong>60 heures de CM par semestre</strong>, ce qui correspond exactement à <strong>6 crédits ECTS</strong>.
                </p>
              </div>

              <div className="pt-2 border-t border-black/10 text-[11px] text-[#0a0a0a]/60">
                <span>Réglementation CEMAC · Arrêtés rectoraux Université de Yaoundé I</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 : CYCLES DE FORMATION, DURÉES ET PROGRESSION ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111]">
            <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">Organisation du Cursus</p>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
              Cycles, Durées et Conditions de Progression
            </h2>
          </div>

          {/* Onglets des 3 cycles */}
          <div className="grid grid-cols-3 border border-[#111111] bg-[#FAFAFA] mb-8 font-mono text-xs">
            {[
              { id: "licence", label: "Cycle de Licence (180 crédits)" },
              { id: "master", label: "Cycle de Master (120 crédits)" },
              { id: "doctorat", label: "Cycle de Doctorat (min 180 crédits)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCycleTab(tab.id as any)}
                className={`p-4 text-center font-black transition cursor-pointer border-r last:border-r-0 border-[#111111] ${
                  activeCycleTab === tab.id
                    ? "bg-[#5A2CA8] text-white"
                    : "bg-white text-[#0a0a0a] hover:bg-black/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu spécifique au cycle sélectionné */}
          {activeCycleTab === "licence" && (
            <div className="border border-[#111111] bg-white p-6 sm:p-10 space-y-8 font-mono text-xs">
              <div>
                <span className="bg-[#5A2CA8] text-white px-2 py-0.5 font-bold uppercase">Bac + 3</span>
                <h3 className="text-2xl font-black uppercase text-[#0a0a0a] mt-2">
                  Cycle de Licence — 6 Semestres (180 Crédits)
                </h3>
                <p className="text-sm text-[#0a0a0a]/75 mt-2 leading-relaxed">
                  Après le Baccalauréat, l’étudiant s’inscrit à temps plein ou à temps partiel dans un parcours de formation qui le conduit au diplôme de Licence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-black/10 bg-[#FAFAFA] space-y-3">
                  <h4 className="font-bold text-sm text-[#0a0a0a] uppercase">Licence Académique</h4>
                  <p className="text-[#0a0a0a]/75 text-[11px] leading-relaxed">
                    Justifier du Baccalauréat scientifique (C, D, E, F, TI) ou du GCE Advanced Level avec 2 matières scientifiques. Les titulaires de DUT, BTS ou issus de classes préparatoires peuvent intégrer sous réserve de validation de dispense.
                  </p>
                </div>

                <div className="p-6 border border-black/10 bg-[#FAFAFA] space-y-3">
                  <h4 className="font-bold text-sm text-[#0a0a0a] uppercase">Licence Professionnelle</h4>
                  <p className="text-[#0a0a0a]/75 text-[11px] leading-relaxed">
                    Nécessite au préalable d&apos;avoir capitalisé <strong>120 crédits</strong> (4 semestres de Licence validés, BTS ou DUT). Soumise à sélection. Capitalisation de <strong>60 nouveaux crédits</strong> pour obtenir le diplôme avec moyenne ≥ 50/100.
                  </p>
                </div>
              </div>

              {/* Rythme et durées */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-black/10">
                <div className="p-4 border border-black/10 bg-white">
                  <strong className="text-[#5A2CA8] block mb-1 uppercase">Étudiant régulier (Temps plein) :</strong>
                  <p className="text-[#0a0a0a]/75 text-[11px]">
                    Durée minimale : <strong>3 ans (6 semestres)</strong> · Durée maximale : <strong>5 ans (10 semestres)</strong>. Inscription de 24 à 36 crédits/semestre (moyenne recommandée : 30 crédits répartis en 3-4 fondamentales de 4-6 crédits, UEs optionnelles de 2-4 crédits et 1-2 transversales de 2-3 crédits).
                  </p>
                </div>

                <div className="p-4 border border-black/10 bg-white">
                  <strong className="text-[#18181b] block mb-1 uppercase">Étudiant travailleur (Temps partiel) :</strong>
                  <p className="text-[#0a0a0a]/75 text-[11px]">
                    Durée minimale : <strong>5 ans (10 semestres)</strong> · Durée maximale : <strong>8 ans (16 semestres)</strong>.
                  </p>
                </div>
              </div>

              {/* Règles de progression Licence */}
              <div className="p-6 border border-[#5A2CA8] bg-[#5A2CA8]/5 space-y-3">
                <h4 className="font-bold text-sm text-[#5A2CA8] uppercase">
                  Règles Réglementaires de Progression en Licence :
                </h4>
                <div className="space-y-2 text-[#0a0a0a]/80 text-xs">
                  <p>
                    • <strong>Passage L1 ➔ L2 :</strong> L’étudiant passe au niveau L2 s’il capitalise <strong>100% des crédits de L1 (60 crédits)</strong>. Toutefois, la poursuite en L2 est autorisée s’il a capitalisé au moins <strong>75% des crédits de L1 (45 crédits)</strong> avec une <strong>MGP d’au moins 2.00/4.00</strong>.
                  </p>
                  <p>
                    • <strong>Passage L2 ➔ L3 :</strong> Accordé à tout étudiant ayant capitalisé <strong>tous les crédits de L1 et L2 (120 crédits)</strong>. Le passage conditionnel peut être accordé par jury si l’étudiant justifie de tous les crédits de L1 (60 crédits), d’au moins <strong>75% des crédits de L2 (45 crédits)</strong> et d’une <strong>MGP de L2 ≥ 2.00/4.00</strong>.
                  </p>
                  <p>
                    • <strong>Obtention de la Licence :</strong> Capitalisation totale des <strong>180 crédits</strong> (60 crédits/niveau) avec moyenne au moins égale à <strong>50/100</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCycleTab === "master" && (
            <div className="border border-[#111111] bg-white p-6 sm:p-10 space-y-6 font-mono text-xs">
              <div>
                <span className="bg-[#18181b] text-white px-2 py-0.5 font-bold uppercase">Bac + 5</span>
                <h3 className="text-2xl font-black uppercase text-[#0a0a0a] mt-2">
                  Cycle de Master — 4 Semestres (120 Crédits)
                </h3>
                <p className="text-sm text-[#0a0a0a]/75 mt-2 leading-relaxed">
                  Le Master peut être à finalité recherche ou à finalité professionnelle. Le choix du parcours s&apos;effectue généralement à l&apos;issue du second semestre de M1 (S7).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-black/10 bg-[#FAFAFA] space-y-2">
                  <h4 className="font-bold text-sm text-[#0a0a0a] uppercase">Niveau M1 (Approfondissement · 60 crédits)</h4>
                  <p className="text-[#0a0a0a]/75 text-[11px] leading-relaxed">
                    Enseignements théoriques et méthodologiques approfondis dans les laboratoires accrédités.
                  </p>
                </div>

                <div className="p-6 border border-black/10 bg-[#FAFAFA] space-y-2">
                  <h4 className="font-bold text-sm text-[#0a0a0a] uppercase">Niveau M2 (Spécialisation · 60 crédits)</h4>
                  <p className="text-[#0a0a0a]/75 text-[11px] leading-relaxed">
                    Niveau d&apos;expertise de pointe comportant un stage scientifique et la soutenance publique d&apos;un mémoire.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-black/10 text-xs text-[#0a0a0a]/80">
                <p>
                  • <strong>Admission en M1 :</strong> Titulaires d&apos;une Licence académique ou professionnelle (180 crédits validés). Entrée sur sélection en fonction des résultats et de la capacité d&apos;accueil. Mise à niveau possible.
                </p>
                <p>
                  • <strong>Passage M1 ➔ M2 :</strong> Sélectif. Obligation de capitaliser <strong>100% des crédits de M1 (60 crédits)</strong> avec une <strong>MGP d’au moins 2.70 / 4.00</strong>.
                </p>
                <p>
                  • <strong>Durée :</strong> Max 3 ans (temps plein), 4 ans (temps partiel). Dérogation pour 2 semestres supplémentaires (1 an) accordable par le Recteur sur avis motivé du Doyen.
                </p>
              </div>
            </div>
          )}

          {activeCycleTab === "doctorat" && (
            <div className="border border-[#111111] bg-white p-6 sm:p-10 space-y-6 font-mono text-xs">
              <div>
                <span className="bg-emerald-700 text-white px-2 py-0.5 font-bold uppercase">Bac + 8</span>
                <h3 className="text-2xl font-black uppercase text-[#0a0a0a] mt-2">
                  Cycle de Doctorat / Ph.D — 6 Semestres (Min 180 Crédits)
                </h3>
                <p className="text-sm text-[#0a0a0a]/75 mt-2 leading-relaxed">
                  Le Doctorat est un diplôme de niveau Bac + 8 accessible aux titulaires d’un Master, orientation recherche. Il est délivré après la soutenance publique d’une thèse originale.
                </p>
              </div>

              <div className="p-6 border border-black/10 bg-[#FAFAFA] space-y-3">
                <h4 className="font-bold text-sm text-[#0a0a0a] uppercase">Conditions d&apos;Admission &amp; Durée Maximale</h4>
                <p className="text-[#0a0a0a]/75 leading-relaxed">
                  L&apos;admission en Doctorat se fait en fonction des résultats au cycle de Master (mention Bien ou Très Bien requise) et de la capacité d&apos;accueil des unités de recherche de l&apos;École Doctorale des Sciences Fondamentales et Appliquées.
                </p>
                <p className="font-bold text-[#5A2CA8]">
                  La durée maximale pour l’obtention du diplôme de Doctorat est de 5 ans (10 semestres).
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4 : MODALITÉS D'ÉVALUATION ET RATIOS CC / EF / TPE ── */}
      <section className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 font-mono text-xs">
              <span className="font-black uppercase text-[#5A2CA8]">Évaluations Pédagogiques</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Modalités de Validation des UEs
              </h2>
              <p className="text-[#0a0a0a]/75 leading-relaxed">
                Il est prévu une session d&apos;examen à la fin de chaque semestre. Chaque UE comporte un examen final (EF), en plus des contrôles continus (CC) et de l&apos;évaluation du travail personnel de l&apos;étudiant (TPE).
              </p>

              <div className="space-y-3">
                <div className="p-4 border border-[#111111] bg-white">
                  <p className="font-black uppercase text-sm text-[#5A2CA8]">Formule Standard en Licence :</p>
                  <p className="text-base font-bold text-[#0a0a0a] mt-1">CC = 30% · EF = 70%</p>
                  <p className="text-[11px] text-[#0a0a0a]/60 mt-1">
                    Évaluation sommative de mi-parcours (30 points) + Examen anonyme terminal (70 points).
                  </p>
                </div>

                <div className="p-4 border border-[#111111] bg-white">
                  <p className="font-black uppercase text-sm text-[#18181b]">Formule avec Travail Personnel (TPE) :</p>
                  <p className="text-base font-bold text-[#0a0a0a] mt-1">CC = 20% · TPE = 20% · EF = 60%</p>
                  <p className="text-[11px] text-[#0a0a0a]/60 mt-1">
                    Lorsque le TPE intervient (travaux pratiques, exposés, recherche documentaire).
                  </p>
                </div>

                <div className="p-4 border border-black/10 bg-white">
                  <p className="font-bold text-[#0a0a0a] uppercase">Séminaires, Projets, Mémoires et Thèses :</p>
                  <p className="text-[11px] text-[#0a0a0a]/75 mt-1">
                    Ne comportent pas de contrôles continus, mais plutôt la soutenance / défense d&apos;un travail scientifique qui tient lieu d&apos;examen unique.
                  </p>
                </div>
              </div>
            </div>

            {/* Règle de reprise d'UE */}
            <div className="lg:col-span-6 border border-[#111111] bg-white p-6 sm:p-8 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#5A2CA8] font-bold uppercase">
                <InfoIcon className="w-4 h-4" />
                <span>Règle Officielle de Reprise d&apos;UE</span>
              </div>
              <h3 className="text-xl font-black uppercase text-[#0a0a0a]">
                Modalités de Reprise &amp; Calcul MGP
              </h3>
              <div className="p-4 border border-amber-600 bg-amber-50 text-amber-950 space-y-2">
                <p className="leading-relaxed">
                  L’étudiant qui obtient dans une UE une <strong>note inférieure ou égale à 50/100</strong> peut choisir de reprendre l’UE lors d&apos;une session ultérieure.
                </p>
                <p className="leading-relaxed font-bold">
                  Dans ce cas, les deux notes obtenues vont apparaître sur son relevé de notes officiel, et <u>la dernière note obtenue est obligatoirement utilisée</u> pour calculer la Moyenne Générale Pondérée (MGP).
                </p>
              </div>

              <div className="space-y-2 text-[#0a0a0a]/75 pt-2 text-[11px]">
                <p>• Les crédits relatifs à une UE obtenue avec note ≥ 50/100 sont définitivement capitalisés.</p>
                <p>• Une UE validée ne peut plus faire l&apos;objet d&apos;une reprise ultérieure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 : GRILLE OFFICIELLE DE NOTATION SUR 100 (12 PALIERS UY1) ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111]">
            <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">Système d&apos;Évaluation</p>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
              Grille Officielle de Notation et d&apos;Appréciation (0 — 100)
            </h2>
            <p className="text-xs sm:text-sm text-[#0a0a0a]/70 mt-1">
              Chaque Unité d&apos;Enseignement est notée de 0 à 100 selon le barème officiel arrêté par l&apos;Université de Yaoundé I.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#111111] bg-white mb-10">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-[#18181b] text-white border-b border-[#111111]">
                  <th className="p-3.5 font-bold">Note / 100</th>
                  <th className="p-3.5 font-bold text-center">Côte (Grade)</th>
                  <th className="p-3.5 font-bold text-center">Points (xi)</th>
                  <th className="p-3.5 font-bold">Mention</th>
                  <th className="p-3.5 font-bold">Statut de Capitalisation des Crédits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-[#0a0a0a]">
                {GRADING_SCALE.map((item) => {
                  const isSuccess = item.points >= 2.0;
                  const isCompensable = item.points > 0 && item.points < 2.0;

                  return (
                    <tr key={item.grade} className="hover:bg-[#FAFAFA]">
                      <td className="p-3.5 font-black text-sm text-[#0a0a0a]">{item.range}</td>
                      <td className="p-3.5 text-center">
                        <span className="font-black text-base bg-[#5A2CA8]/10 text-[#5A2CA8] px-2.5 py-0.5 inline-block min-w-8">
                          {item.grade}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-sm">
                        {item.points.toFixed(2)}
                      </td>
                      <td className="p-3.5 font-bold text-xs">{item.mention}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 text-[11px] font-bold ${
                          isSuccess
                            ? "bg-emerald-100 text-emerald-900"
                            : isCompensable
                            ? "bg-amber-100 text-amber-900"
                            : "bg-rose-100 text-rose-900"
                        }`}>
                          {item.decision}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── SECTION 6 : SYMBOLES D'ATTITUDE DE L'ÉTUDIANT ── */}
          <div className="border border-[#111111] bg-[#FAFAFA] p-6 sm:p-8 space-y-4 font-mono text-xs">
            <div className="border-b border-black/10 pb-3">
              <span className="text-[#5A2CA8] font-bold uppercase text-[10px]">Mention Particulière</span>
              <h3 className="text-lg font-black uppercase text-[#0a0a0a] mt-1">
                Symboles d&apos;Attitude de l&apos;Étudiant vis-à-vis de l&apos;UE
              </h3>
              <p className="text-[#0a0a0a]/70 text-[11px] mt-0.5">
                Sur les relevés de notes et procès-verbaux d&apos;examen, les situations d&apos;absence ou de régime dérogatoire sont codifiées par les symboles suivants :
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STUDENT_ATTITUDE_SYMBOLS.map((symb) => (
                <div key={symb.code} className="border border-black/10 bg-white p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 bg-[#18181b] text-white flex items-center justify-center font-black text-xs">
                      {symb.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-[#5A2CA8]">
                      {symb.signification}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#0a0a0a]/75 pt-1 leading-relaxed">
                    {symb.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
