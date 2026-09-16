"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/components/AdminAuthProvider";
import {
  FileTextIcon,
  CheckIcon,
  ArrowUpRightIcon,
  ClockIcon,
  UsersIcon,
  InfoIcon,
} from "@/components/Icons";

interface GradeEntry {
  matricule: string;
  nom: string;
  prenom: string;
  noteCC: number;
  noteSN: number;
}

const INITIAL_COURSE_STUDENTS: GradeEntry[] = [
  { matricule: "22S14890", nom: "KAMGA", prenom: "Alain", noteCC: 23.0, noteSN: 52.0 },
  { matricule: "22S11402", nom: "FOKOU", prenom: "Stéphane", noteCC: 19.5, noteSN: 44.0 },
  { matricule: "22S09811", nom: "BIKIE", prenom: "Sandrine", noteCC: 26.0, noteSN: 58.0 },
  { matricule: "22S04192", nom: "NDZIE", prenom: "Patrick", noteCC: 14.0, noteSN: 31.0 },
  { matricule: "22S16704", nom: "TALLA", prenom: "Hervé", noteCC: 22.0, noteSN: 48.0 },
];

export default function EnseignantDashboardPage() {
  const { currentUser, getTeacherRequests, resolveTeacherClaim, switchUser, allAdminUsers } = useAdminAuth();

  // Liste des requêtes assignées
  const teacherRequests = getTeacherRequests(currentUser.departementCode);

  // État de la modal d'instruction d'une requête
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"Favorable / Résolue" | "Défavorable / Rejetée">("Favorable / Résolue");
  const [teacherStatement, setTeacherStatement] = useState<string>("");
  const [newCC, setNewCC] = useState<string>("23.0");
  const [newSN, setNewSN] = useState<string>("");
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);

  // État du tableau de saisie de notes
  const [courseStudents, setCourseStudents] = useState<GradeEntry[]>(INITIAL_COURSE_STUDENTS);
  const [activeUeCode, setActiveUeCode] = useState<string>(
    currentUser.departementCode === "ENR" ? "ENR 401" : "BCH 302"
  );
  const [saveNotesSuccess, setSaveNotesSuccess] = useState<boolean>(false);

  // État du modal d'import en masse de notes (CSV / Excel)
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importRawText, setImportRawText] = useState<string>("");
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);
  const [importErrors, setImportErrors] = useState<string[]>([]);

  const selectedRequest = teacherRequests.find((r) => r.id === selectedReqId);

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReqId || !teacherStatement.trim()) return;

    resolveTeacherClaim(
      selectedReqId,
      verdict,
      teacherStatement,
      newCC ? parseFloat(newCC) : undefined,
      newSN ? parseFloat(newSN) : undefined
    );

    setSuccessFeedback(`La requête ${selectedReqId} a été instruite avec succès. Notification transmise à l'étudiant.`);
    setSelectedReqId(null);
    setTeacherStatement("");
    setTimeout(() => setSuccessFeedback(null), 5000);
  };

  const handleStudentGradeChange = (matricule: string, field: "noteCC" | "noteSN", val: string) => {
    const num = parseFloat(val) || 0;
    setCourseStudents((prev) =>
      prev.map((s) => (s.matricule === matricule ? { ...s, [field]: num } : s))
    );
  };

  const handleSaveGrades = () => {
    setSaveNotesSuccess(true);
    setTimeout(() => setSaveNotesSuccess(false), 4000);
  };

  const handleLoadSampleData = () => {
    const sample = `MATRICULE;NOM;PRENOM;NOTE_CC;NOTE_SN
22S14890;KAMGA;Alain;24.5;55.0
22S11402;FOKOU;Stéphane;21.0;48.0
22S09811;BIKIE;Sandrine;27.5;61.0
22S04192;NDZIE;Patrick;18.0;38.5
22S16704;TALLA;Hervé;23.0;50.0
22S02194;MBALLA;Carine;25.0;52.0
22S18321;ONANA;Fabrice;19.0;44.5
22S07654;EYENGA;Raïssa;28.0;63.0
22S15902;KENFACK;Donald;16.5;35.0
22S12049;DJOU;Mélanie;22.5;49.0`;
    setImportRawText(sample);
    setImportErrors([]);
  };

  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,MATRICULE;NOM;PRENOM;NOTE_CC;NOTE_SN\n22S00001;EXEMPLE;Etudiant;20.0;50.0";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gabarit_notes_uy1_${activeUeCode.replace(/\\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPV = () => {
    let csv = "MATRICULE;NOM;PRENOM;NOTE_CC;NOTE_SN;TOTAL;GRADE;STATUT\\n";
    courseStudents.forEach((st) => {
      const tot = st.noteCC + st.noteSN;
      let gr = "E";
      if (tot >= 80) gr = "A";
      else if (tot >= 75) gr = "B+";
      else if (tot >= 70) gr = "B";
      else if (tot >= 65) gr = "C+";
      else if (tot >= 50) gr = "C";
      else if (tot >= 45) gr = "D";
      csv += `${st.matricule};${st.nom};${st.prenom};${st.noteCC};${st.noteSN};${tot};${gr};${tot >= 50 ? "VALIDE" : "RATTRAPAGE"}\\n`;
    });
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PV_NOTES_${activeUeCode.replace(/\\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProcessImport = () => {
    if (!importRawText.trim()) {
      setImportErrors(["Le contenu est vide. Collez des lignes de notes ou chargez un exemple."]);
      return;
    }

    const lines = importRawText.trim().split("\n");
    const errors: string[] = [];
    const parsedEntries: GradeEntry[] = [];

    const startIdx = lines[0].toUpperCase().includes("MATRICULE") ? 1 : 0;

    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const delimiter = line.includes(";") ? ";" : line.includes("\t") ? "\t" : ",";
      const parts = line.split(delimiter).map((p) => p.trim());

      if (parts.length < 3) {
        errors.push(`Ligne ${i + 1} invalide (Matricule, Note CC, Note SN requis)`);
        continue;
      }

      let mat = "";
      let nom = "ÉTUDIANT";
      let prenom = "UY1";
      let cc = 0;
      let sn = 0;

      if (parts.length >= 5) {
        mat = parts[0];
        nom = parts[1] || "ÉTUDIANT";
        prenom = parts[2] || "";
        cc = parseFloat(parts[3]) || 0;
        sn = parseFloat(parts[4]) || 0;
      } else {
        mat = parts[0];
        cc = parseFloat(parts[1]) || 0;
        sn = parseFloat(parts[2]) || 0;
      }

      if (!mat) {
        errors.push(`Ligne ${i + 1} : Matricule manquant.`);
        continue;
      }
      if (cc < 0 || cc > 30) {
        errors.push(`Ligne ${i + 1} [${mat}] : La note CC doit être entre 0 et 30.`);
        continue;
      }
      if (sn < 0 || sn > 70) {
        errors.push(`Ligne ${i + 1} [${mat}] : La note SN doit être entre 0 et 70.`);
        continue;
      }

      parsedEntries.push({
        matricule: mat,
        nom,
        prenom,
        noteCC: cc,
        noteSN: sn,
      });
    }

    if (errors.length > 0 && parsedEntries.length === 0) {
      setImportErrors(errors);
      return;
    }

    setCourseStudents((prev) => {
      const existingMap = new Map(prev.map((s) => [s.matricule, s]));
      parsedEntries.forEach((p) => {
        const existing = existingMap.get(p.matricule);
        if (existing) {
          existingMap.set(p.matricule, {
            ...existing,
            noteCC: p.noteCC,
            noteSN: p.noteSN,
          });
        } else {
          existingMap.set(p.matricule, p);
        }
      });
      return Array.from(existingMap.values());
    });

    setImportStatusMessage(`${parsedEntries.length} notes chargées en masse avec succès dans le procès-verbal.`);
    setIsImportModalOpen(false);
    setImportRawText("");
    setImportErrors([]);
    setTimeout(() => setImportStatusMessage(null), 6000);
  };

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DE L'ENSEIGNANT ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Espace Pédagogique &amp; Jurys de Contrôle
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Espace <span className="text-[#5A2CA8]">Enseignant</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Gestion des réclamations d&apos;étudiants assignées, vérification des émargements de composition,
                rectification des notes de CC/SN et validation des procès-verbaux d&apos;examen.
              </p>
            </div>

            {/* Switcher enseignant rapide */}
            <div className="lg:col-span-4 border border-[#111111] bg-white p-6 space-y-3 font-mono text-xs">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Enseignant Connecté :</span>
              <div className="space-y-1">
                <p className="font-black text-base text-[#0a0a0a]">
                  {currentUser.prenom} {currentUser.nom}
                </p>
                <p className="text-[#5A2CA8] font-bold">{currentUser.titre}</p>
                <p className="text-[#0a0a0a]/60 text-[11px]">Département : {currentUser.departementNom}</p>
              </div>

              {/* Bouton pour alterner entre Pr NYEGUE et Dr NDJAKA */}
              <div className="pt-2 border-t border-black/10 flex gap-2">
                <button
                  type="button"
                  onClick={() => switchUser("user-enseignant-bch")}
                  className={`flex-1 py-1.5 px-2 border text-[10px] font-bold uppercase transition cursor-pointer ${
                    currentUser.matriculeOrCode === "ENS-BCH-042"
                      ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                      : "bg-[#FAFAFA] border-[#111111] hover:bg-black/5"
                  }`}
                >
                  Pr NYEGUE (BCH)
                </button>
                <button
                  type="button"
                  onClick={() => switchUser("user-enseignant-enr")}
                  className={`flex-1 py-1.5 px-2 border text-[10px] font-bold uppercase transition cursor-pointer ${
                    currentUser.matriculeOrCode === "ENS-ENR-018"
                      ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                      : "bg-[#FAFAFA] border-[#111111] hover:bg-black/5"
                  }`}
                >
                  Dr NDJAKA (ENR)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU NOTIFICATION DE SUCCÈS ── */}
      {successFeedback && (
        <div className="border-b border-emerald-600 bg-emerald-50 text-emerald-950 py-4 font-mono text-xs">
          <div className="mx-auto max-w-content px-6 flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">{successFeedback}</span>
          </div>
        </div>
      )}

      {/* ── SECTION 1 : REQUÊTES D'ÉTUDIANTS ASSIGNÉES À L'ENSEIGNANT ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">
                Contentieux Académique &amp; Réclamations
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Requêtes transmises pour instruction ({teacherRequests.length})
              </h2>
            </div>
            <p className="font-mono text-xs text-[#0a0a0a]/60">
              Délai réglementaire de réponse : 72 heures ouvrées.
            </p>
          </div>

          {teacherRequests.length === 0 ? (
            <div className="p-8 border border-[#111111] bg-[#FAFAFA] font-mono text-xs text-center text-[#0a0a0a]/60">
              Aucune réclamation étudiante en attente pour vos unités d&apos;enseignement.
            </div>
          ) : (
            <div className="space-y-4 font-mono text-xs">
              {teacherRequests.map((req) => {
                const isPending = req.statut === "Enregistrée" || req.statut === "Transmise à l'autorité";
                return (
                  <div
                    key={req.id}
                    className={`border p-6 sm:p-8 transition-all ${
                      isPending ? "border-[#5A2CA8] bg-white shadow-sm" : "border-[#111111] bg-[#FAFAFA]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#5A2CA8] text-white px-2.5 py-1 font-black text-sm">
                          {req.id}
                        </span>
                        <span className="border border-[#111111] px-2 py-0.5 bg-white font-bold">
                          UE : {req.codeUE}
                        </span>
                        <span className="text-[#0a0a0a]/60 text-[11px]">{req.anneeAcademique}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 font-bold ${
                          isPending ? "bg-amber-100 text-amber-900 animate-pulse" : "bg-emerald-100 text-emerald-900"
                        }`}>
                          {req.statut}
                        </span>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-8 space-y-3">
                        <h4 className="font-bold text-sm sm:text-base text-[#0a0a0a]">
                          {req.objet}
                        </h4>
                        <p className="text-xs text-[#0a0a0a]/75 leading-relaxed bg-black/5 p-3 border border-black/5">
                          « {req.description} »
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#0a0a0a]/60 pt-1">
                          <span>Quittance : <strong className="text-[#0a0a0a]">{req.numeroQuittanceJoint}</strong></span>
                          <span>Pièce jointe : <strong className="text-[#5A2CA8]">{req.nomPieceJointe}</strong></span>
                          <span>Date dépôt : {req.dateDepot}</span>
                        </div>

                        {req.reponseOfficielle && (
                          <div className="p-3 border border-emerald-600 bg-emerald-50 text-emerald-950 text-xs mt-3">
                            <strong>Réponse officielle émise :</strong> {req.reponseOfficielle}
                            <span className="block text-[10px] text-emerald-700 mt-1">
                              Date : {req.dateReponse}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="lg:col-span-4 flex flex-col gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReqId(req.id);
                            setTeacherStatement(
                              `Après vérification du cahier d'émargement de l'examen en salle et confrontation avec le double de copie, la requête de l'étudiant est acceptée.`
                            );
                          }}
                          className="w-full py-3 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-bold text-xs transition text-center cursor-pointer shadow-sm"
                        >
                          Instruire cette requête
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL D'INSTRUCTION DE REQUÊTE ── */}
      {selectedReqId && selectedRequest && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-xl border border-[#111111] bg-white text-[#0a0a0a] p-6 sm:p-8 space-y-6 font-mono text-xs">
            <div className="flex items-start justify-between border-b border-[#111111] pb-4">
              <div>
                <span className="text-[#5A2CA8] font-bold uppercase text-[10px]">
                  Instruction Enseignant · {selectedRequest.codeUE}
                </span>
                <h3 className="text-xl font-black uppercase text-[#0a0a0a] mt-1">
                  Décision sur le ticket {selectedRequest.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReqId(null)}
                className="text-black/40 hover:text-black text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-4">
              {/* Choix du verdict */}
              <div className="space-y-1">
                <label className="block font-bold uppercase">Décision Officielle :</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVerdict("Favorable / Résolue")}
                    className={`py-2 px-3 border text-center font-bold cursor-pointer ${
                      verdict === "Favorable / Résolue"
                        ? "bg-emerald-700 text-white border-emerald-700"
                        : "bg-white border-[#111111] hover:bg-black/5"
                    }`}
                  >
                    ✓ Favorable (Rectifier la note)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerdict("Défavorable / Rejetée")}
                    className={`py-2 px-3 border text-center font-bold cursor-pointer ${
                      verdict === "Défavorable / Rejetée"
                        ? "bg-rose-700 text-white border-rose-700"
                        : "bg-white border-[#111111] hover:bg-black/5"
                    }`}
                  >
                    ✕ Défavorable (Maintenir la note)
                  </button>
                </div>
              </div>

              {/* Note rectifiée si favorable */}
              {verdict === "Favorable / Résolue" && (
                <div className="grid grid-cols-2 gap-3 p-3 border border-black/10 bg-[#FAFAFA]">
                  <div>
                    <label className="block text-[11px] text-[#0a0a0a]/60 uppercase mb-1">
                      Nouvelle Note CC (/30) :
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="30"
                      value={newCC}
                      onChange={(e) => setNewCC(e.target.value)}
                      className="w-full p-2 border border-[#111111] bg-white text-xs font-bold"
                      placeholder="Ex: 23.0"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#0a0a0a]/60 uppercase mb-1">
                      Nouvelle Note SN (/70) :
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="70"
                      value={newSN}
                      onChange={(e) => setNewSN(e.target.value)}
                      className="w-full p-2 border border-[#111111] bg-white text-xs font-bold"
                      placeholder="Laisser vide si inchangée"
                    />
                  </div>
                </div>
              )}

              {/* Exposé des motifs de l'enseignant */}
              <div className="space-y-1">
                <label className="block font-bold uppercase">Motivation de la décision :</label>
                <textarea
                  rows={4}
                  value={teacherStatement}
                  onChange={(e) => setTeacherStatement(e.target.value)}
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
                  Enregistrer &amp; Notifier l&apos;étudiant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SECTION 2 : SAISIE & PROCÈS-VERBAL DES NOTES D'UE ── */}
      <section className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col xl:flex-row xl:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">
                Bordereau Pédagogique &amp; Saisie Collective
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Procès-Verbal de Notes — {activeUeCode}
              </h2>
              <p className="mt-1 font-mono text-xs text-[#0a0a0a]/60">
                {courseStudents.length} étudiants inscrits · Saisie individuelle ou chargement groupé par tableur
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="bg-white hover:bg-gray-100 text-[#0a0a0a] border border-[#111111] px-3.5 py-2.5 font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Télécharger le modèle de fichier CSV officiel UY1"
              >
                <span>Modèle CSV UY1</span>
              </button>

              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="bg-[#5A2CA8] hover:bg-[#431C82] text-white border border-[#111111] px-4 py-2.5 font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>⚡ Charger en Masse (CSV/Excel)</span>
              </button>

              <button
                type="button"
                onClick={handleExportPV}
                className="bg-white hover:bg-gray-100 text-[#0a0a0a] border border-[#111111] px-3.5 py-2.5 font-bold transition cursor-pointer"
              >
                Exporter PV (.csv)
              </button>

              <button
                type="button"
                onClick={handleSaveGrades}
                className="bg-[#0a0a0a] hover:bg-[#5A2CA8] text-white px-5 py-2.5 font-bold transition shadow-sm cursor-pointer"
              >
                Sauvegarder le PV
              </button>
            </div>
          </div>

          {importStatusMessage && (
            <div className="mb-6 p-4 border border-emerald-600 bg-emerald-50 text-emerald-950 font-mono text-xs flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">{importStatusMessage}</span>
            </div>
          )}

          {saveNotesSuccess && (
            <div className="mb-6 p-4 border border-emerald-600 bg-emerald-50 text-emerald-950 font-mono text-xs flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-600" />
              <span>Les notes de l&apos;Unité d&apos;Enseignement {activeUeCode} ont été sauvegardées et transmises au jury de délibération.</span>
            </div>
          )}

          {/* ── MODALE D'IMPORT EN MASSE DES NOTES (CSV / EXCEL) ── */}
          {isImportModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-2xl border border-[#111111] bg-white p-6 md:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#111111] pb-4">
                  <div>
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8] block">
                      Chargement par Lot (Batch)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0a0a0a]">
                      Importation Massive des Notes — {activeUeCode}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsImportModalOpen(false);
                      setImportErrors([]);
                    }}
                    className="w-8 h-8 border border-[#111111] bg-white font-mono text-sm font-bold hover:bg-black hover:text-white transition flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-3 border border-[#111111] bg-[#FAFAFA] space-y-1 text-[#0a0a0a]/80">
                    <p className="font-bold text-[#0a0a0a] uppercase">Format attendu des colonnes :</p>
                    <p className="text-[11px] text-[#5A2CA8]">
                      <code>MATRICULE;NOM;PRENOM;NOTE_CC;NOTE_SN</code> ou <code>MATRICULE;NOTE_CC;NOTE_SN</code>
                    </p>
                    <p className="text-[11px]">
                      Délimiteurs acceptés : point-virgule (;), virgule (,) ou tabulation (copier-coller direct depuis Microsoft Excel).
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleLoadSampleData}
                      className="px-3 py-1.5 border border-[#5A2CA8] bg-purple-50 text-[#5A2CA8] hover:bg-[#5A2CA8] hover:text-white font-bold transition cursor-pointer"
                    >
                      ✦ Charger l&apos;Exemple UY1 (Promotion de 10 étudiants)
                    </button>

                    <label className="px-3 py-1.5 border border-[#111111] bg-white hover:bg-gray-100 font-bold cursor-pointer inline-flex items-center gap-1.5">
                      <span>Téléverser fichier .csv / .txt</span>
                      <input
                        type="file"
                        accept=".csv,.txt"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const content = event.target?.result as string;
                              if (content) setImportRawText(content);
                            };
                            reader.readAsText(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-[11px] mb-1">
                      Données tabulaires brutes (Coller ici depuis Excel ou CSV) :
                    </label>
                    <textarea
                      rows={8}
                      value={importRawText}
                      onChange={(e) => setImportRawText(e.target.value)}
                      placeholder="MATRICULE;NOM;PRENOM;NOTE_CC;NOTE_SN&#10;22S14890;KAMGA;Alain;24.5;55.0&#10;22S11402;FOKOU;Stéphane;21.0;48.0"
                      className="w-full border border-[#111111] bg-[#FAFAFA] p-3 font-mono text-xs focus:outline-none focus:border-[#5A2CA8]"
                    />
                  </div>

                  {importErrors.length > 0 && (
                    <div className="p-3 border border-red-600 bg-red-50 text-red-950 space-y-1">
                      <p className="font-bold uppercase text-[11px]">Erreurs détectées lors de l&apos;analyse :</p>
                      <ul className="list-disc list-inside text-[11px] space-y-0.5">
                        {importErrors.slice(0, 4).map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                        {importErrors.length > 4 && (
                          <li>... et {importErrors.length - 4} autre(s) anomalie(s).</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#111111] font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsImportModalOpen(false);
                      setImportErrors([]);
                    }}
                    className="px-4 py-2.5 border border-[#111111] bg-white font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleProcessImport}
                    className="px-6 py-2.5 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-bold transition shadow-sm cursor-pointer"
                  >
                    Analyser &amp; Injecter dans le Procès-Verbal
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto border border-[#111111] bg-white font-mono text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#18181b] text-white border-b border-[#111111]">
                  <th className="p-3.5 font-bold">Matricule</th>
                  <th className="p-3.5 font-bold">Nom &amp; Prénom</th>
                  <th className="p-3.5 font-bold text-center">CC (/30)</th>
                  <th className="p-3.5 font-bold text-center">SN (/70)</th>
                  <th className="p-3.5 font-bold text-center">Total (/100)</th>
                  <th className="p-3.5 font-bold text-center">Grade</th>
                  <th className="p-3.5 font-bold text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-[#0a0a0a]">
                {courseStudents.map((st) => {
                  const total = st.noteCC + st.noteSN;
                  let grade = "E";
                  if (total >= 80) grade = "A";
                  else if (total >= 75) grade = "B+";
                  else if (total >= 70) grade = "B";
                  else if (total >= 65) grade = "C+";
                  else if (total >= 50) grade = "C";
                  else if (total >= 45) grade = "D";

                  const isValide = total >= 50;

                  return (
                    <tr key={st.matricule} className="hover:bg-[#FAFAFA]">
                      <td className="p-3.5 font-bold text-[#5A2CA8]">[{st.matricule}]</td>
                      <td className="p-3.5 font-bold">{st.nom} {st.prenom}</td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="30"
                          value={st.noteCC}
                          onChange={(e) => handleStudentGradeChange(st.matricule, "noteCC", e.target.value)}
                          className="w-16 p-1 text-center border border-black/20 font-bold bg-[#FAFAFA] focus:border-[#5A2CA8]"
                        />
                      </td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="70"
                          value={st.noteSN}
                          onChange={(e) => handleStudentGradeChange(st.matricule, "noteSN", e.target.value)}
                          className="w-16 p-1 text-center border border-black/20 font-bold bg-[#FAFAFA] focus:border-[#5A2CA8]"
                        />
                      </td>
                      <td className="p-3.5 text-center font-black text-sm">
                        {total.toFixed(1)}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="font-bold bg-[#5A2CA8]/10 text-[#5A2CA8] px-2 py-0.5">
                          {grade}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                          isValide ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}>
                          {isValide ? "Validé" : "Rattrapage"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
