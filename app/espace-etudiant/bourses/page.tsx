"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCapIcon,
  CheckIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  GlobeIcon,
  UsersIcon,
  InfoIcon,
} from "@/components/Icons";
import { useStudentAuth } from "@/components/StudentAuthProvider";

interface Scholarship {
  id: string;
  code: string;
  titre: string;
  organisme: string;
  montant: string;
  cible: string;
  dateLimite: string;
  description: string;
  criteres: string[];
  pieces: string[];
}

const scholarships: Scholarship[] = [
  {
    id: "minesup",
    code: "BOURSE-01",
    titre: "Prime d'Excellence Académique du Chef de l'État (MINESUP)",
    organisme: "Ministère de l'Enseignement Supérieur du Cameroun",
    montant: "50 000 FCFA / étudiant méritant",
    cible: "Étudiants de Licence (L1, L2, L3) et Master ayant validé 60 crédits",
    dateLimite: "Paiement annuel régulier (Novembre — Décembre)",
    description: "Allocation financière spéciale allouée aux étudiants les plus assidus ayant capitalisé l'ensemble de leurs 60 crédits annuels avec une Moyenne Générale Pondérée (MGP) exemplaire.",
    criteres: [
      "Être régulièrement inscrit à la Faculté des Sciences - UY1 pour l'année en cours",
      "Avoir validé 100% des crédits de l'année académique précédente (60 ECTS)",
      "Moyenne Générale Pondérée (MGP) supérieure ou égale à 2.80 / 4.00 (Mention Assez Bien minimum)",
      "Être à jour des droits universitaires (50 000 FCFA)",
    ],
    pieces: [
      "Photocopie de la Carte d'Étudiant en cours de validité",
      "Relevés de notes officiels des deux semestres certifiés par le Doyen",
      "Photocopie certifiée conforme de la CNI",
      "Quittance de paiement des droits universitaires",
    ],
  },
  {
    id: "auf",
    code: "BOURSE-02",
    titre: "Bourses de Mobilité Académique & Recherche AUF",
    organisme: "Agence Universitaire de la Francophonie (Direction Afrique Centrale)",
    montant: "Prise en charge intégrale du billet d'avion + Indemnité mensuelle (800 à 1 200 €)",
    cible: "Étudiants de Master 2 Recherche et Doctorants Ph.D",
    dateLimite: "30 Juin 2026",
    description: "Soutien aux mobilités de recherche en cotutelle ou en codirection vers des laboratoires membres du réseau AUF pour la réalisation de stages scientifiques.",
    criteres: [
      "Être inscrit en Master 2 ou Doctorat à l'École Doctorale des Sciences Fondamentales et Appliquées",
      "Projet de recherche innovant en adéquation avec les axes stratégiques régionaux",
      "Lettre d'invitation d'un laboratoire étranger d'accueil partenaire",
      "Avis favorable du Directeur de thèse et du Doyen de la FS",
    ],
    pieces: [
      "Curriculum Vitae détaillé et liste des publications ou communications",
      "Projet de recherche de 5 pages maximum",
      "Attestation d'inscription en thèse à l'UY1",
      "Lettre d'engagement du laboratoire d'accueil",
    ],
  },
  {
    id: "daad",
    code: "BOURSE-03",
    titre: "Bourses de Recherche Doctorale & Post-Doc DAAD",
    organisme: "Office Allemand d'Échanges Universitaires (DAAD)",
    montant: "Allocation mensuelle complète + Assurance maladie + Frais de laboratoire",
    cible: "Doctorants en Sciences Dures, Informatique, Physique et Chimie",
    dateLimite: "15 Octobre 2026",
    description: "Financement d'études doctorales complètes ou de séjours de recherche de 6 à 12 mois dans une université d'excellence en Allemagne.",
    criteres: [
      "Master en Sciences avec mention Très Bien ou Bien (MGP ≥ 3.50/4.00)",
      "Excellent niveau d'anglais scientifique (TOEFL ou attestation institutionnelle UY1)",
      "Projet de recherche pertinent pour le développement technologique",
    ],
    pieces: [
      "Diplôme de Master et relevés de notes traduits en anglais",
      "Proposition de recherche détaillée et calendrier de travail",
      "Deux lettres de recommandation de professeurs de rang magistral de l'UY1",
    ],
  },
  {
    id: "sociale",
    code: "BOURSE-04",
    titre: "Fonds de Solidarité & Aide d'Urgence DOU - UY1",
    organisme: "Direction des Œuvres Universitaires (DOU / Rectorat UY1)",
    montant: "Exonération, hébergement en cité U et bons de restauration",
    cible: "Étudiants en situation de grande précarité sociale ou handicap",
    dateLimite: "Dépôt permanent au Centre Médico-Social",
    description: "Dispositif d'aide sociale destiné à soutenir les étudiants orphelins, en situation de handicap moteur/visuel ou confrontés à des difficultés majeures.",
    criteres: [
      "Étudiant régulièrement inscrit à la Faculté des Sciences",
      "Justification de la vulnérabilité socio-économique par les services sociaux",
      "Avis de l'assistante sociale du Centre Médico-Social de Ngoa-Ekellé",
    ],
    pieces: [
      "Lettre de demande d'aide sociale adressée à Monsieur le Recteur",
      "Certificat d'indigence délivré par les autorités municipales",
      "Certificat médical d'invalidité le cas échéant",
      "Certificat de scolarité de l'année en cours",
    ],
  },
];

export default function BoursesPage() {
  const { currentStudent } = useStudentAuth();
  const [activeTab, setActiveTab] = useState<string>("minesup");

  // Simulateur d'éligibilité
  const [simCredits, setSimCredits] = useState<number>(60);
  const [simMgp, setSimMgp] = useState<number>(3.2);
  const [simPaid, setSimPaid] = useState<boolean>(true);

  const isEligibleMinesup = simCredits === 60 && simMgp >= 2.8 && simPaid;

  const currentBourse = scholarships.find((b) => b.id === activeTab) || scholarships[0];

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DES BOURSES ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Excellence &amp; Accompagnement Social
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Bourses d&apos;Étude <span className="text-[#5A2CA8]">&amp; Aides</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Allocations d&apos;excellence académique MINESUP, bourses de mobilité internationale (AUF, DAAD, Erasmus+)
                et fonds de solidarité étudiante pour accompagner vos études à la Faculté des Sciences.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#simulateur"
                className="inline-flex items-center justify-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-5 py-3.5 text-xs font-mono font-bold transition shadow-sm"
              >
                <span>Tester mon éligibilité MINESUP</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
              <Link
                href="/espace-etudiant/scolarite"
                className="inline-flex items-center justify-center gap-2 border border-[#111111] bg-white hover:bg-black/5 text-[#0a0a0a] px-5 py-3.5 text-xs font-mono font-bold transition"
              >
                <span>Obtenir mon relevé pour dossier</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU CHIFFRES CLÉS DES BOURSES ── */}
      <section className="border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content border-l border-r border-[#111111]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#111111] font-mono text-xs">
            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Prime d&apos;Excellence</span>
              <p className="text-2xl font-black text-[#5A2CA8]">50 000 FCFA</p>
              <p className="text-[#0a0a0a]/60">Allouée par le Chef de l&apos;État par étudiant méritant</p>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Critère MINESUP</span>
              <p className="text-2xl font-black text-[#0a0a0a]">60 ECTS &amp; MGP ≥ 2.80</p>
              <p className="text-[#0a0a0a]/60">Validation intégrale des semestres sans dette</p>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Mobilités Internationales</span>
              <p className="text-2xl font-black text-[#5A2CA8]">AUF · DAAD · TWAS</p>
              <p className="text-[#0a0a0a]/60">Stages de recherche et cotutelles de doctorat</p>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Centre Médico-Social</span>
              <p className="text-2xl font-black text-[#0a0a0a]">Gratuit / Subventionné</p>
              <p className="text-[#0a0a0a]/60">Soins de santé et aide sociale d&apos;urgence UY1</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOGUE DÉTAILLÉ DES DISPOSITIFS DE FINANCEMENT ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111]">
            <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">Programmes Disponibles</p>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
              Dispositifs de bourses et soutiens financiers
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Colonne gauche : liste des bourses */}
            <div className="lg:col-span-5 space-y-3">
              {scholarships.map((bourse) => {
                const isSelected = bourse.id === activeTab;
                return (
                  <button
                    key={bourse.id}
                    type="button"
                    onClick={() => setActiveTab(bourse.id)}
                    className={`w-full text-left p-6 border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#5A2CA8] bg-[#5A2CA8] text-white shadow-md"
                        : "border-[#111111] bg-white text-[#0a0a0a] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-xs mb-1.5">
                      <span className={isSelected ? "text-white/80 font-bold" : "text-[#5A2CA8] font-bold"}>
                        [{bourse.code}]
                      </span>
                      <span className={isSelected ? "bg-white/20 text-white px-2 py-0.5 font-bold" : "bg-black/5 text-[#0a0a0a]/70 px-2 py-0.5"}>
                        {bourse.montant.split("/")[0]}
                      </span>
                    </div>

                    <h3 className="font-bold text-base leading-snug">
                      {bourse.titre}
                    </h3>
                    <p className={`text-xs mt-2 ${isSelected ? "text-white/80" : "text-[#0a0a0a]/60"}`}>
                      {bourse.organisme}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Colonne droite : Détail de la bourse */}
            <div className="lg:col-span-7 border border-[#111111] bg-white p-6 sm:p-8 space-y-8">
              <div className="border-b border-[#111111] pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-2">
                  <span className="bg-[#5A2CA8] text-white px-2.5 py-1 font-bold">
                    {currentBourse.code}
                  </span>
                  <span className="border border-[#111111] px-2.5 py-1 font-bold bg-[#FAFAFA]">
                    Échéance : {currentBourse.dateLimite}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0a0a0a] tracking-tight mt-3">
                  {currentBourse.titre}
                </h3>
                <p className="font-mono text-xs text-[#5A2CA8] font-bold mt-1">
                  Organisme : {currentBourse.organisme}
                </p>
                <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
                  {currentBourse.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-black/10 font-mono text-xs">
                  <div>
                    <span className="text-[#0a0a0a]/50 uppercase font-bold block">Montant / Avantages :</span>
                    <span className="font-bold text-[#5A2CA8] mt-0.5 block">{currentBourse.montant}</span>
                  </div>
                  <div>
                    <span className="text-[#0a0a0a]/50 uppercase font-bold block">Public cible :</span>
                    <span className="font-bold text-[#0a0a0a] mt-0.5 block">{currentBourse.cible}</span>
                  </div>
                </div>
              </div>

              {/* Critères d'éligibilité */}
              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-4 flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-[#5A2CA8]" />
                  <span>Critères d&apos;éligibilité impératifs :</span>
                </h4>
                <ul className="space-y-2 font-mono text-xs text-[#0a0a0a]/80">
                  {currentBourse.criteres.map((critere, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 border border-black/10 bg-[#FAFAFA]">
                      <span className="text-[#5A2CA8] font-black shrink-0">✓</span>
                      <span>{critere}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pièces à constituer */}
              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-4 flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4 text-[#5A2CA8]" />
                  <span>Constitution du dossier de candidature :</span>
                </h4>
                <ul className="space-y-2 font-mono text-xs text-[#0a0a0a]/80">
                  {currentBourse.pieces.map((piece, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-black/40 font-bold shrink-0">•</span>
                      <span>{piece}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULATEUR D'ÉLIGIBILITÉ PRIME MINESUP ── */}
      <section id="simulateur" className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-xs font-black uppercase text-[#5A2CA8]">Outil Numérique</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0a0a0a] mt-1">
              Simulateur d&apos;éligibilité — Prime MINESUP (50 000 FCFA)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#0a0a0a]/70">
              Vérifiez en quelques clics si vos résultats annuels vous qualifient pour la prime d&apos;excellence
              académique allouée par le Ministère de l&apos;Enseignement Supérieur.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-4xl">
            {/* Formulaire simulateur */}
            <div className="lg:col-span-7 border border-[#111111] bg-white p-6 sm:p-8 space-y-6">
              {/* Paramètre 1 : Crédits validés */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#0a0a0a] uppercase">
                    Crédits ECTS validés sur l&apos;année :
                  </label>
                  <span className="font-black text-sm text-[#5A2CA8]">{simCredits} / 60</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={60}
                  step={3}
                  value={simCredits}
                  onChange={(e) => setSimCredits(Number(e.target.value))}
                  className="w-full accent-[#5A2CA8] cursor-pointer"
                />
                <p className="text-[11px] text-[#0a0a0a]/50">
                  Exigence légale : 60 crédits (100% des UEs obligatoires et optionnelles).
                </p>
              </div>

              {/* Paramètre 2 : MGP */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#0a0a0a] uppercase">
                    Moyenne Générale Pondérée (MGP) :
                  </label>
                  <span className="font-black text-sm text-[#5A2CA8]">{simMgp.toFixed(2)} / 4.00</span>
                </div>
                <input
                  type="range"
                  min={1.5}
                  max={4.0}
                  step={0.05}
                  value={simMgp}
                  onChange={(e) => setSimMgp(Number(e.target.value))}
                  className="w-full accent-[#5A2CA8] cursor-pointer"
                />
                <p className="text-[11px] text-[#0a0a0a]/50">
                  Seuil minimal d&apos;excellence : MGP ≥ 2.80 (Mention Assez Bien).
                </p>
              </div>

              {/* Paramètre 3 : Quittance */}
              <div className="flex items-center gap-3 pt-2 font-mono text-xs">
                <input
                  type="checkbox"
                  id="chkPaid"
                  checked={simPaid}
                  onChange={(e) => setSimPaid(e.target.checked)}
                  className="w-4 h-4 accent-[#5A2CA8] cursor-pointer"
                />
                <label htmlFor="chkPaid" className="cursor-pointer font-bold text-[#0a0a0a]">
                  Droits universitaires de 50 000 FCFA payés et validés par l&apos;Intendance
                </label>
              </div>
            </div>

            {/* Résultat du simulateur */}
            <div className={`lg:col-span-5 border p-6 sm:p-8 flex flex-col justify-between font-mono ${
              isEligibleMinesup
                ? "border-emerald-600 bg-emerald-50/70 text-emerald-950"
                : "border-rose-600 bg-rose-50/70 text-rose-950"
            }`}>
              <div className="space-y-3">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 inline-block ${
                  isEligibleMinesup ? "bg-emerald-700 text-white" : "bg-rose-700 text-white"
                }`}>
                  {isEligibleMinesup ? "PROFIL ÉLIGIBLE" : "CONDITIONS NON REMPLIES"}
                </span>

                <h4 className="text-xl font-black uppercase">
                  {isEligibleMinesup
                    ? "Félicitations ! Vous êtes éligible à la prime MINESUP"
                    : "Critères insuffisants pour la prime"}
                </h4>

                <p className="text-xs leading-relaxed">
                  {isEligibleMinesup
                    ? "Vos 60 crédits validés combinés à une MGP de " + simMgp.toFixed(2) + " vous positionnent favorablement sur les listes de paiement de l'Université de Yaoundé I."
                    : "Pour être retenu, vous devez impérativement totaliser les 60 crédits annuels (actuel : " + simCredits + "/60) et obtenir une MGP d'au moins 2.80."}
                </p>
              </div>

              <div className="pt-6 border-t border-black/10 text-xs space-y-2">
                <Link
                  href="/espace-etudiant/notes"
                  className="block w-full text-center py-2.5 bg-[#0a0a0a] text-white hover:bg-[#5A2CA8] font-bold transition cursor-pointer"
                >
                  Vérifier mes notes officielles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
