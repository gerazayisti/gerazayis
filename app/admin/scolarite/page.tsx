"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/components/AdminAuthProvider";
import {
  BuildingIcon,
  CheckIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  ClockIcon,
  SearchIcon,
  InfoIcon,
} from "@/components/Icons";

export default function ScolariteDaarsDashboardPage() {
  const { allRequests, resolveDaarsClaim, allQuittances, validateQuittance } = useAdminAuth();

  // Filtres requêtes
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal d'instruction DAARS
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [daarsResponse, setDaarsResponse] = useState<string>("");
  const [daarsStatus, setDaarsStatus] = useState<"Favorable / Résolue" | "En instruction" | "Rejetée">("Favorable / Résolue");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Délibérations
  const [isBabillardPublished, setIsBabillardPublished] = useState<boolean>(true);

  // Import massif PV Départemental DAARS
  const [isPvModalOpen, setIsPvModalOpen] = useState<boolean>(false);
  const [selectedDeptPv, setSelectedDeptPv] = useState<string>("CHM");
  const [pvRawText, setPvRawText] = useState<string>("");
  const [pvList, setPvList] = useState<{ dept: string; filiere: string; ueCount: number; studentCount: number; statut: string; dateImport: string }[]>([
    { dept: "Biochimie (BCH)", filiere: "Biochimie Fondamentale", ueCount: 12, studentCount: 420, statut: "Validé · Publié", dateImport: "15/02/2026 10:14" },
    { dept: "Informatique (INF)", filiere: "Génie Logiciel & Systèmes", ueCount: 16, studentCount: 780, statut: "Validé · Publié", dateImport: "16/02/2026 14:32" },
    { dept: "Mathématiques (MAT)", filiere: "Mathématiques Pures", ueCount: 10, studentCount: 310, statut: "Levée d'anonymat en cours", dateImport: "18/02/2026 09:05" },
    { dept: "Physique (PHY)", filiere: "Physique du Solide", ueCount: 14, studentCount: 450, statut: "Bordereau reçu · Délibération", dateImport: "18/02/2026 11:20" },
  ]);

  const handleSimulatePvImport = () => {
    const newEntry = {
      dept: "Chimie Inorganique (CIn)",
      filiere: "Chimie Générale & Appliquée",
      ueCount: 8,
      studentCount: 380,
      statut: "Validé · Publié",
      dateImport: "À l'instant",
    };
    setPvList((prev) => [newEntry, ...prev]);
    setIsPvModalOpen(false);
    setActionSuccess("Le Procès-Verbal de Chimie Inorganique (380 étudiants, 8 UEs) a été importé et certifié avec succès.");
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const filteredRequests = allRequests.filter((req) => {
    if (filterType !== "all" && req.type !== filterType) return false;
    if (filterStatus !== "all" && req.statut !== filterStatus) return false;
    return true;
  });

  const selectedRequest = allRequests.find((r) => r.id === selectedReqId);

  const handleResolveDaars = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReqId || !daarsResponse.trim()) return;

    resolveDaarsClaim(selectedReqId, daarsStatus, daarsResponse);
    setActionSuccess(`La décision DAARS sur le ticket ${selectedReqId} a été enregistrée.`);
    setSelectedReqId(null);
    setDaarsResponse("");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleValidateQuittance = (numero: string) => {
    validateQuittance(numero);
    setActionSuccess(`Quittance bancaire ${numero} validée. L'étudiant est à jour des droits universitaires.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DE LA DAARS ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Scolarité Centrale · Division DAARS &amp; DAF
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Gestion <span className="text-[#5A2CA8]">Scolarité &amp; Quittances</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Supervision centrale des inscriptions, validation des droits universitaires (50 000 FCFA),
                traitement des requêtes administratives et publication officielle des procès-verbaux sur le Babillard.
              </p>
            </div>

            <div className="lg:col-span-4 border border-[#111111] bg-white p-6 font-mono text-xs space-y-2">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Service DAARS Central :</span>
              <p className="text-base font-black text-[#0a0a0a]">Guichet Central &amp; Examens</p>
              <p className="text-[#0a0a0a]/60 text-[11px]">Pavillon DAARS · Rez-de-chaussée Décanat</p>
              <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px]">
                <span className="text-[#0a0a0a]/50">Droits État</span>
                <span className="font-black text-[#5A2CA8]">50 000 FCFA / étudiant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU MESSAGE DE SUCCÈS ── */}
      {actionSuccess && (
        <div className="border-b border-emerald-600 bg-emerald-50 text-emerald-950 py-4 font-mono text-xs">
          <div className="mx-auto max-w-content px-6 flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">{actionSuccess}</span>
          </div>
        </div>
      )}

      {/* ── SECTION 1 : VALIDATION DES QUITTANCES BANCAIRES (50 000 FCFA) ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">
                Contrôle Financier &amp; Intendance DAF
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Validation des Quittances des Droits Universitaires
              </h2>
            </div>
            <p className="font-mono text-xs text-[#0a0a0a]/60">
              {allQuittances.filter((q) => q.statut === "Validé").length} validées sur {allQuittances.length} reçus
            </p>
          </div>

          <div className="overflow-x-auto border border-[#111111] bg-white font-mono text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#18181b] text-white border-b border-[#111111]">
                  <th className="p-3.5 font-bold">N° Quittance</th>
                  <th className="p-3.5 font-bold">Matricule</th>
                  <th className="p-3.5 font-bold">Nom de l&apos;Étudiant</th>
                  <th className="p-3.5 font-bold">Filière / Niveau</th>
                  <th className="p-3.5 font-bold">Montant</th>
                  <th className="p-3.5 font-bold">Banque / Agence</th>
                  <th className="p-3.5 font-bold">Date Versement</th>
                  <th className="p-3.5 font-bold text-center">Statut</th>
                  <th className="p-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-[#0a0a0a]">
                {allQuittances.map((q) => {
                  const isValid = q.statut === "Validé";
                  return (
                    <tr key={q.numeroQuittance} className="hover:bg-[#FAFAFA]">
                      <td className="p-3.5 font-bold text-[#5A2CA8]">{q.numeroQuittance}</td>
                      <td className="p-3.5 font-bold">[{q.matricule}]</td>
                      <td className="p-3.5 font-bold">{q.nomEtudiant}</td>
                      <td className="p-3.5">{q.filiere} · {q.niveau}</td>
                      <td className="p-3.5 font-bold text-[#5A2CA8]">{q.montant}</td>
                      <td className="p-3.5 text-[#0a0a0a]/70">{q.banque} ({q.agence})</td>
                      <td className="p-3.5 text-[#0a0a0a]/60">{q.datePaiement}</td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                          isValid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800 animate-pulse"
                        }`}>
                          {q.statut}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        {!isValid ? (
                          <button
                            type="button"
                            onClick={() => handleValidateQuittance(q.numeroQuittance)}
                            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] cursor-pointer transition shadow-sm"
                          >
                            Valider la quittance
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold text-[11px]">
                            ✓ Conforme
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : GESTIONNAIRE GLOBAL DES REQUÊTES ── */}
      <section className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">
                Guichet Central des Réclamations
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Registre Général des Requêtes ({allRequests.length})
              </h2>
            </div>

            {/* Filtres de sélection */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-[#111111] bg-white p-2 text-xs focus:outline-none focus:border-[#5A2CA8]"
              >
                <option value="all">Tous les types</option>
                <option value="certificat_scolarite">Certificats de scolarité</option>
                <option value="probleme_note">Problèmes de note</option>
                <option value="correction_matricule">Correction de matricule</option>
                <option value="correction_nom">Correction de nom</option>
                <option value="probleme_paiement">Problème paiement</option>
                <option value="autre">Autre</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-[#111111] bg-white p-2 text-xs focus:outline-none focus:border-[#5A2CA8]"
              >
                <option value="all">Tous les statuts</option>
                <option value="Enregistrée">Enregistrée</option>
                <option value="Transmise à l'autorité">Transmise à l&apos;autorité</option>
                <option value="Favorable / Résolue">Favorable / Résolue</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {filteredRequests.map((req) => (
              <div key={req.id} className="border border-[#111111] bg-white p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-[#5A2CA8] text-sm">[{req.id}]</span>
                    <span className="font-bold text-[#0a0a0a]">{req.objet}</span>
                    <span className="text-[#0a0a0a]/50 text-[11px]">{req.anneeAcademique}</span>
                  </div>
                  <span className={`px-2 py-0.5 font-bold ${
                    req.statut === "Favorable / Résolue"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {req.statut}
                  </span>
                </div>

                <p className="text-[#0a0a0a]/75 text-xs">
                  {req.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-[11px] text-[#0a0a0a]/60">
                  <div>
                    <span>Quittance jointe : <strong className="text-[#0a0a0a]">{req.numeroQuittanceJoint}</strong></span>
                    <span className="mx-2">·</span>
                    <span>Date : {req.dateDepot}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReqId(req.id);
                      setDaarsResponse("Certificats de scolarité officiels édités, timbrés et disponibles au Guichet N°3 DAARS.");
                    }}
                    className="px-4 py-1.5 bg-[#0a0a0a] hover:bg-[#5A2CA8] text-white font-bold transition cursor-pointer"
                  >
                    Traiter le ticket DAARS
                  </button>
                </div>

                {req.reponseOfficielle && (
                  <div className="p-3 border border-emerald-600 bg-emerald-50 text-emerald-950 text-xs">
                    <strong>Réponse transmise :</strong> {req.reponseOfficielle}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL TRAITEMENT DAARS ── */}
      {selectedReqId && selectedRequest && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg border border-[#111111] bg-white text-[#0a0a0a] p-6 sm:p-8 space-y-4 font-mono text-xs">
            <div className="flex items-start justify-between border-b border-[#111111] pb-3">
              <div>
                <span className="text-[#5A2CA8] font-bold uppercase text-[10px]">Traitement Scolarité DAARS</span>
                <h3 className="text-xl font-black uppercase text-[#0a0a0a] mt-1">Ticket {selectedRequest.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReqId(null)}
                className="text-black/40 hover:text-black text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleResolveDaars} className="space-y-4">
              <div>
                <label className="block font-bold uppercase mb-1">Statut accordé :</label>
                <select
                  value={daarsStatus}
                  onChange={(e) => setDaarsStatus(e.target.value as any)}
                  className="w-full border border-[#111111] bg-white p-2 font-bold"
                >
                  <option value="Favorable / Résolue">Favorable / Résolue (Document prêt / anomalie corrigée)</option>
                  <option value="En instruction">En cours d&apos;instruction complémentaire</option>
                  <option value="Rejetée">Rejetée (Dossier incomplet / droits non payés)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Notification à l&apos;attention de l&apos;étudiant :</label>
                <textarea
                  rows={4}
                  value={daarsResponse}
                  onChange={(e) => setDaarsResponse(e.target.value)}
                  className="w-full border border-[#111111] bg-[#FAFAFA] p-3 text-xs focus:outline-none focus:border-[#5A2CA8]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReqId(null)}
                  className="px-4 py-2 border border-[#111111] bg-white font-bold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-bold transition shadow-sm cursor-pointer"
                >
                  Valider et Notifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SECTION 3 : IMPORTATION MASSIVE & CENTRALISATION DES PV DE JURYS (DAARS) ── */}
      <section className="border-t border-[#111111] bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono text-xs">
            <div>
              <p className="font-bold uppercase text-[#5A2CA8]">
                Centralisation Pédagogique &amp; Levée d&apos;Anonymat
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a] font-sans">
                Procès-Verbaux de Jurys par Département
              </h2>
              <p className="mt-1 text-[#0a0a0a]/60">
                Réception, déchiffrement et validation des bordereaux de notes consolidés pour les 10 départements
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPvModalOpen(true)}
                className="bg-[#5A2CA8] hover:bg-[#431C82] text-white border border-[#111111] px-4 py-2.5 font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>⚡ Importer un PV Départemental (.xlsx / .csv)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-[#111111] bg-white font-mono text-xs mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#18181b] text-white border-b border-[#111111]">
                  <th className="p-3.5 font-bold">Département</th>
                  <th className="p-3.5 font-bold">Filière d&apos;Enseignement</th>
                  <th className="p-3.5 font-bold text-center">UEs Associées</th>
                  <th className="p-3.5 font-bold text-center">Effectif Étudiants</th>
                  <th className="p-3.5 font-bold">Dernière Ingestion</th>
                  <th className="p-3.5 font-bold text-center">Statut Jury</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-[#0a0a0a]">
                {pvList.map((pv, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA]">
                    <td className="p-3.5 font-bold text-[#5A2CA8]">{pv.dept}</td>
                    <td className="p-3.5 font-bold">{pv.filiere}</td>
                    <td className="p-3.5 text-center font-mono">{pv.ueCount} UEs</td>
                    <td className="p-3.5 text-center font-bold text-[#0a0a0a]">{pv.studentCount} inscrits</td>
                    <td className="p-3.5 text-[#0a0a0a]/60">{pv.dateImport}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                        pv.statut.includes("Validé")
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-purple-100 text-purple-900 animate-pulse"
                      }`}>
                        {pv.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── MODALE IMPORT PV DAARS ── */}
      {isPvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl border border-[#111111] bg-white p-6 md:p-8 space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#111111] pb-4">
              <div>
                <span className="font-black uppercase tracking-widest text-[#5A2CA8] block">
                  Service Central des Examens · UY1
                </span>
                <h3 className="text-xl font-black uppercase text-[#0a0a0a] font-sans">
                  Importation Massive d&apos;un PV de Jury
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPvModalOpen(false)}
                className="w-8 h-8 border border-[#111111] bg-white font-bold hover:bg-black hover:text-white transition flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-bold uppercase mb-1">Département émetteur :</label>
                <select
                  value={selectedDeptPv}
                  onChange={(e) => setSelectedDeptPv(e.target.value)}
                  className="w-full border border-[#111111] bg-[#FAFAFA] p-2.5 text-xs font-mono"
                >
                  <option value="CHM">Chimie Inorganique (CIn) / Chimie Organique (COr)</option>
                  <option value="BOV">Biologie et Physiologie Végétales (BPV)</option>
                  <option value="BOA">Biologie et Physiologie Animales (BPA)</option>
                  <option value="STU">Sciences de la Terre et de l&apos;Univers (STU)</option>
                  <option value="MIB">Microbiologie (MIB)</option>
                </select>
              </div>

              <div className="p-3 border border-[#111111] bg-[#FAFAFA] space-y-1 text-[#0a0a0a]/80">
                <p className="font-bold text-[#0a0a0a] uppercase">Contrôle de validation automatique :</p>
                <p className="text-[11px]">✓ Levée d&apos;anonymat cryptographique par clé asymétrique</p>
                <p className="text-[11px]">✓ Rapprochement automatique des 50 000 FCFA de quittances</p>
                <p className="text-[11px]">✓ Calcul direct des MGP et application du barème à 12 échelons</p>
              </div>

              <div className="border-2 border-dashed border-[#111111] p-6 text-center bg-[#FAFAFA] space-y-2">
                <p className="font-bold uppercase text-[11px]">Glisser-déposer le classeur Excel officiel (.xlsx) ou CSV</p>
                <p className="text-[10px] text-[#0a0a0a]/50">Format UY1 certifié par le Chef de Département</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#111111]">
              <button
                type="button"
                onClick={() => setIsPvModalOpen(false)}
                className="px-4 py-2 border border-[#111111] bg-white font-bold hover:bg-gray-100 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSimulatePvImport}
                className="px-6 py-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-bold transition shadow-sm cursor-pointer"
              >
                ✦ Lancer l&apos;Ingestion &amp; Délibération
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION 4 : PUBLICATION OFFICIELLE DU BABILLARD ── */}
      <section className="border-t border-[#111111] bg-white py-12">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="border border-[#111111] bg-[#FAFAFA] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[#5A2CA8] font-bold uppercase">Délibérations &amp; Jurys</span>
              <h3 className="text-xl font-black uppercase text-[#0a0a0a]">
                Statut de Publication du Babillard Numérique 2025/2026
              </h3>
              <p className="text-[#0a0a0a]/70">
                Les procès-verbaux délibérés du Semestre 1 sont actuellement en ligne et visibles par les étudiants.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 font-bold uppercase">
                Babillard Actif &amp; Publié
              </span>
              <Link
                href="/espace-etudiant/notes"
                className="bg-[#0a0a0a] hover:bg-[#5A2CA8] text-white px-5 py-2 font-bold transition inline-flex items-center gap-1.5"
              >
                <span>Vérifier en ligne</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
