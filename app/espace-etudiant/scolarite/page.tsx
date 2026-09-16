"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileTextIcon,
  CheckIcon,
  ArrowUpRightIcon,
  ClockIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  BuildingIcon,
  GraduationCapIcon,
  InfoIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@/components/Icons";
import { useStudentAuth } from "@/components/StudentAuthProvider";

interface Procedure {
  id: string;
  code: string;
  titre: string;
  delai: string;
  cout: string;
  guichet: string;
  description: string;
  pieces: string[];
  etapes: string[];
}

const procedures: Procedure[] = [
  {
    id: "carte",
    code: "PROC-01",
    titre: "Retrait de la Carte d'Étudiant Biométrique",
    delai: "Immédiat (selon planning d'affichage)",
    cout: "Inclus dans les droits universitaires (50 000 FCFA)",
    guichet: "Guichet N°1 & N°2 — Pavillon DAARS",
    description: "La carte d'étudiant biométrique est indispensable pour accéder aux amphithéâtres, aux salles d'examens, aux laboratoires de TP et à la Bibliothèque Centrale.",
    pieces: [
      "Quittance originale de paiement des droits universitaires de l'année en cours",
      "Récépissé de préinscription en ligne avec photo d'identité récente",
      "Photocopie de l'Acte de Naissance certifiée conforme",
      "Ancienne carte d'étudiant (pour les réinscriptions en L2, L3, M1, M2)",
    ],
    etapes: [
      "Vérification du statut d'enrôlement biométrique auprès de la DAARS",
      "Contrôle de conformité de la quittance bancaire (50 000 FCFA)",
      "Émargement sur le registre officiel de décharge des cartes",
      "Remise en main propre de la carte plastifiée sécurisée",
    ],
  },
  {
    id: "certificat",
    code: "PROC-02",
    titre: "Certificat de Scolarité & Attestation d'Inscription",
    delai: "48 heures ouvrées",
    cout: "1 500 FCFA (Timbre fiscal) + Gratuit administratif",
    guichet: "Guichet N°3 — Service de la Scolarité",
    description: "Document officiel attestant de l'inscription régulière d'un étudiant pour l'année académique. Nécessaire pour les dossiers d'allocations familiales, visas d'études et concours.",
    pieces: [
      "Formulaire de demande de certificat de scolarité dûment renseigné",
      "Quittance bancaire des droits universitaires (50 000 FCFA)",
      "Timbre fiscal communal ou fiscal de 1 500 FCFA",
      "Photocopie de la carte d'étudiant ou de la CNI",
    ],
    etapes: [
      "Soumission en ligne via le Guichet des Requêtes ou dépôt physique au guichet 3",
      "Contrôle de validation académique par le chef de département",
      "Signature du Chef de Division DAARS et visa du Vice-Doyen chargé de la Scolarité",
      "Retrait physique au guichet contre décharge",
    ],
  },
  {
    id: "releves",
    code: "PROC-03",
    titre: "Relevés de Notes Officiels (Semestriels & Annuels)",
    delai: "72 heures ouvrées",
    cout: "Gratuit (1ère délivrance) · 2 000 FCFA / relevé historique",
    guichet: "Guichet N°4 — Division des Examens & Relevés",
    description: "Relevé détaillé certifié comportant les notes de CC (/30), de SN (/70), le total pondéré, les crédits ECTS capitalisés et la MGP (Moyenne Générale Pondérée / 4.00).",
    pieces: [
      "Fiche de demande précisant le niveau et l'année académique concernée",
      "Quittance d'inscription de l'année demandée",
      "Photocopie de la carte d'étudiant",
    ],
    etapes: [
      "Extraction informatisée depuis la base de données centrale des délibérations",
      "Contrôle de concordance avec le Procès-Verbal officiel signé du jury",
      "Apposition du timbre sec facultaire et signature du Doyen",
      "Délivrance sous pli sécurisé",
    ],
  },
  {
    id: "attestation",
    code: "PROC-04",
    titre: "Attestation de Réussite au Diplôme (Licence / Master)",
    delai: "5 à 10 jours ouvrables après publication des résultats",
    cout: "Gratuit",
    guichet: "Guichet Spécial Diplômes & Parchemins — Décanat",
    description: "Attestation provisoire ayant valeur juridique de diplôme en attendant l'impression et la signature du parchemin officiel par Monsieur le Recteur de l'UY1.",
    pieces: [
      "Tous les relevés de notes originaux des 6 semestres (pour la Licence) ou 4 semestres (Master)",
      "Copie certifiée de l'Acte de Naissance de moins de 3 mois",
      "Photocopie certifiée du Baccalauréat ou GCE A-Level",
      "Quittances d'inscription de toutes les années du cycle",
      "Quitus de la Bibliothèque Centrale",
    ],
    etapes: [
      "Dépôt et vérification rigoureuse du dossier d'apurement des crédits (180 ECTS en Licence, 120 ECTS en Master)",
      "Contrôle d'absence de dettes auprès de la bibliothèque et des laboratoires",
      "Génération de l'attestation sécurisée avec QR-code d'authenticité",
      "Signature manuscrite exclusive du Doyen de la Faculté",
    ],
  },
  {
    id: "diplome",
    code: "PROC-05",
    titre: "Retrait du Parchemin Définitif (Signé du Recteur)",
    delai: "Sur convocation officielle / Cérémonie de remise",
    cout: "Gratuit",
    guichet: "Bureau Central des Diplômes — Rectorat UY1 / Décanat FS",
    description: "Diplôme d'État définitif co-signé par le Doyen de la Faculté des Sciences et Monsieur le Recteur de l'Université de Yaoundé I, visé par le MINESUP.",
    pieces: [
      "Attestation de réussite originale (qui sera reprise et archivée)",
      "Pièce d'identité nationale (CNI ou Passeport en cours de validité)",
      "Quitus global délivré par la DAARS",
    ],
    etapes: [
      "Vérification d'inscription sur la liste des parchemins disponibles",
      "Présentation de la CNI originale (aucune procuration n'est admise pour le parchemin)",
      "Signature du grand livre d'immatriculation des diplômés de l'UY1",
      "Remise solennelle du parchemin",
    ],
  },
  {
    id: "transfert",
    code: "PROC-06",
    titre: "Transfert d'Université & Équivalence de Diplômes",
    delai: "15 jours ouvrables",
    cout: "5 000 FCFA (Frais d'étude de dossier)",
    guichet: "Secrétariat de la DAARS",
    description: "Procédure réservée aux étudiants venant d'autres universités camerounaises ou étrangères souhaitant intégrer la Faculté des Sciences en équivalence de crédits.",
    pieces: [
      "Lettre de motivation adressée à Monsieur le Doyen",
      "Relevés de notes officiels de toutes les années universitaires antérieures",
      "Descriptif certifié des programmes d'enseignements suivis (syllabi)",
      "Certificat de non-exclusion de l'établissement d'origine",
    ],
    etapes: [
      "Dépôt du dossier physique complet au secrétariat DAARS",
      "Examen par la commission pédagogique du département sollicité",
      "Délibération sur les dispenses d'Unités d'Enseignement (UE)",
      "Notification de la décision d'admission par équivalence",
    ],
  },
];

const faqs = [
  {
    q: "Que faire si ma quittance de paiement bancaire (50 000 FCFA) n'est pas reconnue en ligne ?",
    a: "Présentez-vous à l'Intendance / Division Administrative et Financière (DAF) munie du bordereau bancaire original. Vous pouvez également ouvrir un ticket immédiatement sur le 'Guichet des Requêtes' de votre Espace Étudiant avec le scan du reçu.",
  },
  {
    q: "Combien de crédits ECTS faut-il valider pour obtenir le certificat de scolarité de L3 ?",
    a: "Pour être inscrit régulièrement en L3, vous devez avoir validé l'intégralité des 60 crédits de L1 et au moins 70% des crédits de L2 (minimum 42 crédits), conformément au règlement des études LMD de l'UY1.",
  },
  {
    q: "Une tierce personne peut-elle retirer un certificat de scolarité ou un relevé de notes à ma place ?",
    a: "Pour un certificat de scolarité ou un relevé semestriel, une procuration manuscrite légalisée accompagnée des photocopies certifiées des CNI des deux parties est acceptée. Pour l'Attestation de Réussite et le Parchemin de diplôme, la présence physique du titulaire est strictement obligatoire.",
  },
  {
    q: "Quels sont les délais d'instruction pour une requête de contestation de note d'examen ?",
    a: "Les requêtes de notes doivent être soumises au plus tard 72 heures après la publication du procès-verbal sur le Babillard. Les réponses des enseignants et jurys sont transmises sous 5 jours ouvrés.",
  },
];

export default function ScolaritePage() {
  const { currentStudent } = useStudentAuth();
  const [activeProcedure, setActiveProcedure] = useState<string>("carte");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredProcedures = procedures.filter(
    (p) =>
      p.titre.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const selectedProc = procedures.find((p) => p.id === activeProcedure) || procedures[0];

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DU SERVICE DE LA SCOLARITÉ ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Administration Académique · DAARS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Service de la <span className="text-[#5A2CA8]">Scolarité</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Division des Affaires Académiques, de la Recherche et de la Scolarité (DAARS).
                Retrouvez ici toutes les démarches officielles, pièces exigées, formulaires et
                modalités de délivrance des actes administratifs universitaires.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/espace-etudiant/requetes"
                className="inline-flex items-center justify-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-5 py-3.5 text-xs font-mono font-bold transition shadow-sm"
              >
                <span>Déposer une requête en ligne</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/espace-etudiant/notes"
                className="inline-flex items-center justify-center gap-2 border border-[#111111] bg-white hover:bg-black/5 text-[#0a0a0a] px-5 py-3.5 text-xs font-mono font-bold transition"
              >
                <span>Consulter le Babillard des notes</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU INFOS PRATIQUES & HORAIRES GUICHETS ── */}
      <section className="border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content border-l border-r border-[#111111]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#111111] font-mono text-xs">
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#5A2CA8] font-bold">
                <ClockIcon className="w-4 h-4" />
                <span className="uppercase tracking-wider">Horaires Guichets</span>
              </div>
              <p className="text-sm font-bold text-[#0a0a0a]">08h00 — 15h30</p>
              <p className="text-[#0a0a0a]/60">Lundi au Vendredi ouvrés (Plateau Atemengué)</p>
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#5A2CA8] font-bold">
                <MapPinIcon className="w-4 h-4" />
                <span className="uppercase tracking-wider">Localisation</span>
              </div>
              <p className="text-sm font-bold text-[#0a0a0a]">Bâtiment Décanat FS</p>
              <p className="text-[#0a0a0a]/60">Campus de Ngoa-Ekellé, Pavillon DAARS Rez-de-chaussée</p>
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#5A2CA8] font-bold">
                <MailIcon className="w-4 h-4" />
                <span className="uppercase tracking-wider">Courriel Officiel</span>
              </div>
              <p className="text-sm font-bold text-[#0a0a0a]">scolarite@facsciences.uy1.cm</p>
              <p className="text-[#0a0a0a]/60">diplome@facsciences.uy1.cm pour les attestations</p>
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#5A2CA8] font-bold">
                <PhoneIcon className="w-4 h-4" />
                <span className="uppercase tracking-wider">Standard Téléphonique</span>
              </div>
              <p className="text-sm font-bold text-[#0a0a0a]">(+237) 222 23 44 96</p>
              <p className="text-[#0a0a0a]/60">BP 812 Yaoundé, République du Cameroun</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOGUE INTERACTIF DES DÉMARCHES & PIÈCES ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#111111]">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">
                Démarches Administratives &amp; Actes
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Guide des formalités officielles
              </h2>
            </div>

            <div className="relative max-w-xs w-full">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Rechercher une formalité…"
                className="w-full pl-9 pr-3 py-2 border border-[#111111] bg-[#FAFAFA] font-mono text-xs focus:outline-none focus:border-[#5A2CA8]"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Colonne gauche : liste des démarches */}
            <div className="lg:col-span-5 space-y-2">
              {filteredProcedures.map((proc) => {
                const isSelected = proc.id === activeProcedure;
                return (
                  <button
                    key={proc.id}
                    type="button"
                    onClick={() => setActiveProcedure(proc.id)}
                    className={`w-full text-left p-5 border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#5A2CA8] bg-[#5A2CA8] text-white shadow-md"
                        : "border-[#111111] bg-white text-[#0a0a0a] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-xs mb-1">
                      <span className={isSelected ? "text-white/80 font-bold" : "text-[#5A2CA8] font-bold"}>
                        [{proc.code}]
                      </span>
                      <span className={isSelected ? "bg-white/20 text-white px-2 py-0.5" : "bg-black/5 text-[#0a0a0a]/70 px-2 py-0.5"}>
                        {proc.delai}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base leading-snug">
                      {proc.titre}
                    </h3>
                    <p className={`text-xs mt-2 line-clamp-2 ${isSelected ? "text-white/80" : "text-[#0a0a0a]/60"}`}>
                      {proc.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Colonne droite : Fiche détaillée de la procédure sélectionnée */}
            <div className="lg:col-span-7 border border-[#111111] bg-white p-6 sm:p-8 space-y-8">
              <div className="border-b border-[#111111] pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-2">
                  <span className="bg-[#5A2CA8] text-white px-2.5 py-1 font-bold">
                    {selectedProc.code}
                  </span>
                  <span className="border border-[#111111] px-2.5 py-1 font-bold bg-[#FAFAFA]">
                    Guichet : {selectedProc.guichet}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0a0a0a] tracking-tight mt-3">
                  {selectedProc.titre}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
                  {selectedProc.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-black/10 font-mono text-xs">
                  <div>
                    <span className="text-[#0a0a0a]/50 uppercase font-bold block">Délai estimé :</span>
                    <span className="font-bold text-[#0a0a0a] mt-0.5 block">{selectedProc.delai}</span>
                  </div>
                  <div>
                    <span className="text-[#0a0a0a]/50 uppercase font-bold block">Frais / Coût :</span>
                    <span className="font-bold text-[#5A2CA8] mt-0.5 block">{selectedProc.cout}</span>
                  </div>
                </div>
              </div>

              {/* Pièces à fournir */}
              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-4 flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4 text-[#5A2CA8]" />
                  <span>Dossier physique &amp; Pièces requises :</span>
                </h4>
                <ul className="space-y-2.5 font-mono text-xs text-[#0a0a0a]/80">
                  {selectedProc.pieces.map((piece, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 border border-black/10 bg-[#FAFAFA]">
                      <span className="text-[#5A2CA8] font-black shrink-0 mt-0.5">✓</span>
                      <span>{piece}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Étapes du circuit de délivrance */}
              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-4 flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-[#5A2CA8]" />
                  <span>Circuit de traitement &amp; Étapes :</span>
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  {selectedProc.etapes.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 shrink-0 bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-[11px]">
                        0{idx + 1}
                      </span>
                      <p className="text-[#0a0a0a]/85 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action contextuelle */}
              <div className="p-4 border border-[#5A2CA8] bg-[#5A2CA8]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-bold text-[#5A2CA8] uppercase">
                    Besoin de cette pièce sans faire la file ?
                  </p>
                  <p className="text-xs text-[#0a0a0a]/70">
                    Déposez votre demande dématérialisée avec votre quittance bancaire.
                  </p>
                </div>
                <Link
                  href={`/espace-etudiant/requetes?type=${selectedProc.id === "certificat" ? "certificat_scolarite" : "autre"}`}
                  className="inline-flex items-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-4 py-2 text-xs font-mono font-bold shrink-0 transition"
                >
                  <span>Demander en ligne</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCORDÉON FAQ SCOLARITÉ ── */}
      <section className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-xs font-black uppercase text-[#5A2CA8]">Questions Fréquentes</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0a0a0a] mt-1">
              Foire aux questions de la scolarité
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-[#111111] bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0a0a0a] cursor-pointer hover:text-[#5A2CA8] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#5A2CA8] transition-transform shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-black/10 font-mono text-xs text-[#0a0a0a]/75 leading-relaxed bg-[#FAFAFA]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
