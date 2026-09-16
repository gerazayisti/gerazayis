"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileTextIcon,
  CheckIcon,
  ArrowUpRightIcon,
  InfoIcon,
  GraduationCapIcon,
  BuildingIcon,
  ChevronDownIcon,
} from "@/components/Icons";

interface AdmissionLevel {
  id: string;
  niveau: string;
  titre: string;
  diplomeRequis: string;
  droits: string;
  selection: string;
  description: string;
  filieres: { nom: string; prerequis: string }[];
  pieces: string[];
}

const admissionLevels: AdmissionLevel[] = [
  {
    id: "l1",
    niveau: "Licence 1 (L1)",
    titre: "Entrée en Première Année de Licence Fondamentale",
    diplomeRequis: "Baccalauréat C, D, E, F, TI ou GCE A-Level (avec 2 matières scientifiques)",
    droits: "50 000 FCFA / an (Droits universitaires fixés par l'État)",
    selection: "Admission sur titre d'après conformité du diplôme du secondaire",
    description: "Accessible à tous les titulaires d'un baccalauréat scientifique ou technique homologué. Les filières sont attribuées en fonction des matières dominantes du diplôme d'accès.",
    filieres: [
      { nom: "Mathématiques (MA)", prerequis: "Bac C, E ou GCE A-Level avec Pure Maths" },
      { nom: "Informatique (IN)", prerequis: "Bac C, D, E, TI ou GCE A-Level avec Maths/Physique" },
      { nom: "Physique (PH)", prerequis: "Bac C, D, E, F ou GCE A-Level avec Physics & Maths" },
      { nom: "Chimie (CH)", prerequis: "Bac C, D ou GCE A-Level avec Chemistry" },
      { nom: "Biochimie (BC)", prerequis: "Bac C, D ou GCE A-Level avec Biology & Chemistry" },
      { nom: "Biologie Animale (BPA)", prerequis: "Bac C, D ou GCE A-Level avec Biology" },
      { nom: "Biologie Végétale (BPV)", prerequis: "Bac C, D ou GCE A-Level avec Biology" },
      { nom: "Sciences de la Terre (ST)", prerequis: "Bac C, D ou GCE A-Level avec Geology / Geography" },
    ],
    pieces: [
      "Fiche de préinscription en ligne imprimée et signée",
      "Copie certifiée conforme de l'Acte de Naissance datant de moins de 3 mois",
      "Copie certifiée conforme du Baccalauréat ou du GCE A-Level (ou relevé de notes officiel)",
      "Quittance originale de versement des droits universitaires de 50 000 FCFA",
      "Certificat médical d'aptitude délivré par le Centre Médico-Social (CMS) de l'UY1",
      "4 photos d'identité couleur 4x4 récentes",
    ],
  },
  {
    id: "lpro",
    niveau: "Licence Pro & Certificats",
    titre: "Licences Professionnelles & Certifications Spécialisées",
    diplomeRequis: "Bac+2 validé (DEUG, BTS, DUT, L2 scientifique validée) ou Bac pour certifiant",
    droits: "50 000 FCFA (Base État) + Frais pédagogiques spécifiques selon filière",
    selection: "Sélection sur dossier de candidature académique et entretien technique",
    description: "Formations professionnalisantes de haut niveau orientées vers l'insertion immédiate et l'entrepreneuriat technologique : SIGL, ICT4D, Énergie Solaire Photovoltaïque, Sciences Forensiques.",
    filieres: [
      { nom: "Systèmes d'Information et Génie Logiciel (SIGL)", prerequis: "L2 Informatique, BTS GL/DSI, DUT Informatique" },
      { nom: "ICT4D (Technologies pour le Développement)", prerequis: "L2 Sciences, BTS Réseaux & Télécoms" },
      { nom: "Énergie Renouvelable (Solaire PV)", prerequis: "L2 Physique, BTS Électrotechnique ou équivalent" },
      { nom: "Certification Forensic & Scène de Crime", prerequis: "Baccalauréat scientifique ou L1 Biologie/Chimie" },
    ],
    pieces: [
      "Lettre de motivation argumentée adressée à Monsieur le Doyen",
      "Curriculum Vitae détaillé avec justificatifs de stages",
      "Relevés de notes certifiés de L1 et L2 (ou BTS/DUT)",
      "Copies certifiées du Baccalauréat et de l'Acte de Naissance",
      "Reçu de paiement des frais de traitement de dossier (10 000 FCFA)",
    ],
  },
  {
    id: "master",
    niveau: "Master (M1 / M2)",
    titre: "Cycles de Master Recherche & Master Professionnel",
    diplomeRequis: "Licence en Sciences dans la discipline ou diplôme étranger équivalent",
    droits: "50 000 FCFA / an (Recherche) · Frais spécifiques (Master Pro)",
    selection: "Examen du dossier par la commission scientifique du département",
    description: "Approfondissement théorique, initiation aux méthodes de recherche avancées, modélisation et préparation aux thèses de doctorat dans les laboratoires de l'UY1.",
    filieres: [
      { nom: "Master Recherche dans les 10 Départements", prerequis: "Licence scientifique avec MGP ≥ 2.40/4.00" },
      { nom: "Master Pro Sciences de l'Environnement", prerequis: "Licence Biologie, Chimie, Sciences de la Terre" },
      { nom: "Master Pro Audit & Certification Forestière", prerequis: "Licence Biologie Végétale, Agronomie, Eaux et Forêts" },
      { nom: "Master Pro Énergie Renouvelable & Efficacité", prerequis: "Licence Physique, Chimie ou Génie Énergétique" },
    ],
    pieces: [
      "Dossier complet comprenant les 6 relevés de notes de Licence",
      "Attestation de réussite ou diplôme de Licence en Sciences",
      "Projet d'étude ou esquisse de recherche (pour le Master Recherche)",
      "Lettre de recommandation d'un enseignant-chercheur de rang magistral",
      "Quittance de paiement des frais de dossier",
    ],
  },
  {
    id: "phd",
    niveau: "Doctorat (Ph.D)",
    titre: "Formation Doctorale à l'École Doctorale UY1",
    diplomeRequis: "Master Recherche en Sciences (avec MGP ≥ 3.00/4.00 ou mention Bien)",
    droits: "50 000 FCFA / an",
    selection: "Agrément du Directeur de thèse habilité et avis du Conseil Scientifique",
    description: "Cursus d'excellence de 3 années minimum sanctionné par la rédaction et la soutenance d'une thèse de Doctorat originale devant un jury international.",
    filieres: [
      { nom: "Unité de Recherche Mathématiques & Informatique", prerequis: "Master Mathématiques Pures/Appliquées, Master Informatique" },
      { nom: "Unité de Recherche Sciences Physiques & Chimiques", prerequis: "Master Physique Fondamentale, Master Chimie Organique/Inorganique" },
      { nom: "Unité de Recherche Biosciences & Géosciences", prerequis: "Master Biologie Animale, Biologie Végétale, Biochimie, Géologie" },
    ],
    pieces: [
      "Diplôme et relevés de notes du Master Recherche (original et copies certifiées)",
      "Projet de thèse détaillé (10 à 15 pages) validé par le Directeur de recherche",
      "Lettre d'engagement formelle du Directeur de thèse (Professeur titulaire ou Maître de Conférences)",
      "Curriculum Vitae scientifique",
      "Avis motivé du Chef de Département concerné",
    ],
  },
];

const registrationSteps = [
  {
    num: "01",
    titre: "Préinscription sur le Portail Numérique",
    desc: "Remplissez le formulaire en ligne sur le portail universitaire et imprimez la fiche de préinscription officielle munie de votre identifiant unique.",
  },
  {
    num: "02",
    titre: "Paiement Bancaire des Droits (50 000 FCFA)",
    desc: "Effectuez le versement des droits universitaires auprès des agences bancaires partenaires agréées par l'UY1. Conservez précieusement le bordereau original.",
  },
  {
    num: "03",
    titre: "Visite Médicale au CMS de Ngoa-Ekellé",
    desc: "Présentez-vous au Centre Médico-Social du campus principal pour les examens d'aptitude physique (radiographie pulmonaire, groupe sanguin, acuité visuelle).",
  },
  {
    num: "04",
    titre: "Dépôt du Dossier Physique & Enrôlement Biométrique",
    desc: "Déposez votre dossier complet au Pavillon DAARS de la Faculté des Sciences pour la prise d'empreintes biométriques et l'attribution définitive de votre matricule.",
  },
];

export default function AdmissionPage() {
  const [activeLevel, setActiveLevel] = useState<string>("l1");

  const selectedLevel = admissionLevels.find((lvl) => lvl.id === activeLevel) || admissionLevels[0];

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DE L'ADMISSION ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Campagne d&apos;Admission 2025/2026
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Conditions d&apos;<span className="text-[#5A2CA8]">Admission</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Rejoignez le premier pôle scientifique universitaire d&apos;Afrique Centrale. Consultez les prérequis
                par filière, les démarches d&apos;inscription et la constitution des dossiers officiels pour la Faculté des Sciences.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#etapes"
                className="inline-flex items-center justify-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-5 py-3.5 text-xs font-mono font-bold transition shadow-sm"
              >
                <span>Circuit d&apos;inscription pas-à-pas</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
              <Link
                href="/espace-etudiant/scolarite"
                className="inline-flex items-center justify-center gap-2 border border-[#111111] bg-white hover:bg-black/5 text-[#0a0a0a] px-5 py-3.5 text-xs font-mono font-bold transition"
              >
                <span>Contacter le service scolarité</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU SYNOPTIQUE DROITS & RÉGIME ── */}
      <section className="border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content border-l border-r border-[#111111]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#111111] font-mono text-xs">
            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Droits Universitaires</span>
              <p className="text-2xl font-black text-[#5A2CA8]">50 000 FCFA</p>
              <p className="text-[#0a0a0a]/60">Tarif unique fixé par le Décret Présidentiel</p>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Baccalauréats Éligibles</span>
              <p className="text-2xl font-black text-[#0a0a0a]">C · D · E · F · TI</p>
              <p className="text-[#0a0a0a]/60">GCE A-Level avec 2 matières scientifiques</p>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Pôles Scientifiques</span>
              <p className="text-2xl font-black text-[#5A2CA8]">10 Départements</p>
              <p className="text-[#0a0a0a]/60">Sciences fondamentales et sciences appliquées</p>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Campus Universitaire</span>
              <p className="text-2xl font-black text-[#0a0a0a]">Ngoa-Ekellé</p>
              <p className="text-[#0a0a0a]/60">Plateau Atemengué, Yaoundé I</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SÉLECTEUR DE NIVEAU D'ADMISSION ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111]">
            <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">Exigences Académiques</p>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
              Conditions d&apos;entrée par niveau d&apos;études
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#111111] bg-[#FAFAFA] mb-8 font-mono text-xs">
            {admissionLevels.map((lvl) => {
              const isSelected = activeLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setActiveLevel(lvl.id)}
                  className={`p-4 text-center font-black transition cursor-pointer border-b sm:border-b-0 border-r last:border-r-0 border-[#111111] ${
                    isSelected
                      ? "bg-[#5A2CA8] text-white"
                      : "bg-white text-[#0a0a0a] hover:bg-black/5"
                  }`}
                >
                  {lvl.niveau}
                </button>
              );
            })}
          </div>

          <div className="border border-[#111111] bg-white p-6 sm:p-10 space-y-8">
            <div className="border-b border-[#111111] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-2">
                <span className="bg-[#5A2CA8] text-white px-2.5 py-1 font-bold">
                  {selectedLevel.niveau}
                </span>
                <span className="border border-[#111111] px-2.5 py-1 font-bold bg-[#FAFAFA]">
                  {selectedLevel.selection}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#0a0a0a] mt-3">
                {selectedLevel.titre}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
                {selectedLevel.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-black/10 font-mono text-xs">
                <div>
                  <span className="text-[#0a0a0a]/50 uppercase font-bold block">Diplôme d&apos;accès requis :</span>
                  <span className="font-bold text-[#0a0a0a] mt-0.5 block">{selectedLevel.diplomeRequis}</span>
                </div>
                <div>
                  <span className="text-[#0a0a0a]/50 uppercase font-bold block">Droits universitaires :</span>
                  <span className="font-bold text-[#5A2CA8] mt-0.5 block">{selectedLevel.droits}</span>
                </div>
              </div>
            </div>

            {/* Grille des filières et prérequis */}
            <div>
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-4">
                Filières et Profils Admissibles :
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 font-mono text-xs">
                {selectedLevel.filieres.map((f, i) => (
                  <div key={i} className="p-4 border border-black/10 bg-[#FAFAFA]">
                    <p className="font-bold text-[#5A2CA8] text-sm">{f.nom}</p>
                    <p className="text-[#0a0a0a]/70 text-[11px] mt-1">{f.prerequis}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dossier physique */}
            <div>
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-4 flex items-center gap-2">
                <FileTextIcon className="w-4 h-4 text-[#5A2CA8]" />
                <span>Composition du dossier physique à déposer :</span>
              </h4>
              <ul className="space-y-2 font-mono text-xs text-[#0a0a0a]/80">
                {selectedLevel.pieces.map((piece, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 border border-black/5 bg-[#FAFAFA]">
                    <span className="text-[#5A2CA8] font-bold shrink-0">✓</span>
                    <span>{piece}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CIRCUIT D'INSCRIPTION PAS-À-PAS ── */}
      <section id="etapes" className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111]">
            <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">Processus Réglementaire</p>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
              Les 4 étapes pour finaliser votre inscription
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            {registrationSteps.map((step) => (
              <div key={step.num} className="border border-[#111111] bg-white p-6 space-y-4">
                <div className="w-10 h-10 bg-[#5A2CA8] text-white flex items-center justify-center font-black text-base">
                  {step.num}
                </div>
                <h3 className="font-black text-sm uppercase text-[#0a0a0a] leading-snug">
                  {step.titre}
                </h3>
                <p className="text-[#0a0a0a]/70 leading-relaxed text-[11px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
