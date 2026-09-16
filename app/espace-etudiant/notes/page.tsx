"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useStudentAuth } from "@/components/StudentAuthProvider";
import {
  ArrowUpRightIcon,
  CheckIcon,
  BookOpenIcon,
  AwardIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@/components/Icons";

export default function StudentNotesBoardPage() {
  const { currentStudent, getStudentGrades } = useStudentAuth();

  const allYearGrades = useMemo(() => {
    return getStudentGrades(currentStudent?.id || "std-01");
  }, [currentStudent, getStudentGrades]);

  // L'année en cours (2025/2026) est toujours sélectionnée et affichée EN PREMIER
  const [selectedYear, setSelectedYear] = useState<string>(
    allYearGrades[0]?.anneeAcademique || "2025/2026"
  );

  const activeYearData = useMemo(() => {
    return (
      allYearGrades.find((y) => y.anneeAcademique === selectedYear) ||
      allYearGrades[0]
    );
  }, [allYearGrades, selectedYear]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* Fil d'Ariane & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#0a0a0a]/60 font-bold">
            <Link href="/espace-etudiant" className="hover:text-[#5A2CA8] transition">
              Espace Étudiant
            </Link>
            <span>/</span>
            <span className="text-[#5A2CA8]">Le Babillard des Notes</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition font-mono text-xs font-bold flex items-center gap-1.5"
            >
              <span>Imprimer / Télécharger Relevé PDF</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── En-tête de la Page ── */}
        <div className="max-w-4xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
              Délibérations &amp; Résultats Académiques Officiels
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
            Le Babillard Numérique <span className="text-[#5A2CA8] italic font-serif">des Notes</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed font-sans max-w-2xl">
            Consultation certifiée des notes de contrôle continu (CC) et de session normale (SN) par semestre et unité d&apos;enseignement. Les notes de l&apos;année en cours <strong>2025/2026</strong> sont affichées en priorité.
          </p>
        </div>

        {/* ── Sélecteur d'Année Académique (2025/2026 en Premier !) ── */}
        <div className="border border-[#111111] bg-white p-5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#0a0a0a] uppercase tracking-wider text-[11px] mr-2">
                Sélectionner l&apos;Année :
              </span>
              {allYearGrades.map((yr, idx) => (
                <button
                  key={yr.anneeAcademique}
                  type="button"
                  onClick={() => setSelectedYear(yr.anneeAcademique)}
                  className={`px-4 py-2 border border-[#111111] font-bold transition flex items-center gap-2 ${
                    selectedYear === yr.anneeAcademique
                      ? "bg-[#5A2CA8] text-white"
                      : "bg-[#FAFAFA] text-[#0a0a0a] hover:bg-gray-200"
                  }`}
                >
                  <span>{yr.anneeAcademique}</span>
                  {idx === 0 && (
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 ${
                      selectedYear === yr.anneeAcademique
                        ? "bg-white text-[#5A2CA8]"
                        : "bg-emerald-700 text-white"
                    }`}>
                      En Cours
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-[#0a0a0a]/60">
              Année active : <strong className="text-[#5A2CA8]">{activeYearData.anneeAcademique}</strong> ({activeYearData.niveau})
            </div>

          </div>
        </div>

        {/* ── Fiche Signalétique de l'Étudiant & Synthèse du Jury ── */}
        <div className="border border-[#111111] bg-white p-6 sm:p-8 mb-8 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#0a0a0a]/50 block">Étudiant</span>
              <p className="text-base font-black text-[#0a0a0a]">
                {currentStudent?.nom} {currentStudent?.prenom}
              </p>
              <p className="text-xs text-[#5A2CA8] font-bold">
                MATRICULE : [{currentStudent?.matricule}]
              </p>
              <p className="text-[11px] text-[#0a0a0a]/60">
                {currentStudent?.email}
              </p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-6">
              <span className="text-[10px] uppercase font-bold text-[#0a0a0a]/50 block">Faculté &amp; Filière</span>
              <p className="text-sm font-black text-[#0a0a0a]">
                Faculté des Sciences · UY1
              </p>
              <p className="text-xs text-[#5A2CA8] font-bold">
                {activeYearData.filiere}
              </p>
              <p className="text-[11px] text-[#0a0a0a]/60">
                Niveau : {activeYearData.niveau}
              </p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-6">
              <span className="text-[10px] uppercase font-bold text-[#0a0a0a]/50 block">Crédits &amp; Moyenne</span>
              <p className="text-2xl font-black text-[#0a0a0a]">
                {activeYearData.mgpAnnuelle > 0 ? `${activeYearData.mgpAnnuelle.toFixed(2)} / 4.00` : "En attente S2"}
              </p>
              <p className="text-xs text-[#0a0a0a]/75 font-bold">
                Crédits validés : {activeYearData.creditsValidesTotal} / {activeYearData.creditsInscritsTotal} ECTS
              </p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-6">
              <span className="text-[10px] uppercase font-bold text-[#0a0a0a]/50 block">Décision du Jury</span>
              <p className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 p-2 leading-relaxed">
                {activeYearData.decisionJury}
              </p>
              <p className="text-[10px] text-[#0a0a0a]/50 pt-1">
                Délibération officielle du : {activeYearData.dateDeliberation}
              </p>
            </div>

          </div>
        </div>

        {/* ── Tableaux des Notes par Semestre ── */}
        <div className="space-y-10">
          {activeYearData.semestres.map((sem) => (
            <div key={sem.semestreCode} className="border border-[#111111] bg-white">
              
              {/* Bandeau d'en-tête du semestre */}
              <div className="bg-[#18181b] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#A78BFA] block mb-1">
                    {sem.periode}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    {sem.semestreLabel} — {activeYearData.niveau}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-white/50 block">Crédits validés</span>
                    <span className="font-bold text-emerald-400">
                      {sem.totalCreditsValides} / {sem.totalCreditsInscrits} ECTS
                    </span>
                  </div>
                  {sem.mgpSemestre > 0 && (
                    <div className="text-right pl-4 border-l border-white/20">
                      <span className="text-[10px] text-white/50 block">MGP Semestre</span>
                      <span className="font-black text-[#A78BFA] text-base">
                        {sem.mgpSemestre.toFixed(2)} / 4.00
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tableau Responsif des Notes */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#111111] text-[10px] uppercase font-black tracking-wider text-[#0a0a0a]/70">
                      <th className="p-3.5 border-r border-black/10">Code UE</th>
                      <th className="p-3.5 border-r border-black/10 min-w-[220px]">Intitulé de la Matière</th>
                      <th className="p-3.5 border-r border-black/10 text-center">Crédits</th>
                      <th className="p-3.5 border-r border-black/10 text-center">CC (/30)</th>
                      <th className="p-3.5 border-r border-black/10 text-center">SN (/70)</th>
                      <th className="p-3.5 border-r border-black/10 text-center">Total (/100)</th>
                      <th className="p-3.5 border-r border-black/10 text-center">Grade</th>
                      <th className="p-3.5 border-r border-black/10 text-center">Statut</th>
                      <th className="p-3.5 min-w-[180px]">Enseignant Responsable</th>
                      <th className="p-3.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 text-xs">
                    {sem.unitesEnseignement.map((ue) => {
                      const isPending = ue.noteFinale === ue.noteCC && ue.noteSN === 0;
                      return (
                        <tr
                          key={ue.codeUE}
                          className="hover:bg-[#FAFAFA] transition-colors"
                        >
                          {/* Code UE */}
                          <td className="p-3.5 font-bold text-[#5A2CA8] border-r border-black/10 whitespace-nowrap">
                            [{ue.codeUE}]
                          </td>

                          {/* Intitulé */}
                          <td className="p-3.5 font-bold text-[#0a0a0a] border-r border-black/10">
                            {ue.intitule}
                          </td>

                          {/* Crédits */}
                          <td className="p-3.5 text-center font-bold border-r border-black/10">
                            {ue.credits}
                          </td>

                          {/* Note CC /30 */}
                          <td className="p-3.5 text-center font-bold text-[#0a0a0a] border-r border-black/10">
                            {ue.noteCC > 0 ? ue.noteCC.toFixed(1) : "—"}
                          </td>

                          {/* Note SN /70 */}
                          <td className="p-3.5 text-center font-bold text-[#0a0a0a] border-r border-black/10">
                            {isPending ? (
                              <span className="text-[#0a0a0a]/40 italic">En attente</span>
                            ) : ue.noteSN > 0 ? (
                              ue.noteSN.toFixed(1)
                            ) : (
                              "0.0"
                            )}
                          </td>

                          {/* Note Finale /100 */}
                          <td className="p-3.5 text-center font-black text-sm border-r border-black/10">
                            {isPending ? (
                              <span className="text-[#0a0a0a]/40 text-xs italic">CC seul</span>
                            ) : (
                              <span className={ue.noteFinale >= 70 ? "text-emerald-700" : ue.noteFinale >= 50 ? "text-[#5A2CA8]" : "text-red-600"}>
                                {ue.noteFinale.toFixed(1)}
                              </span>
                            )}
                          </td>

                          {/* Grade / Cote */}
                          <td className="p-3.5 text-center font-black border-r border-black/10">
                            <span className={`px-2 py-0.5 inline-block text-[11px] ${
                              ue.grade === "A"
                                ? "bg-emerald-700 text-white"
                                : ue.grade === "B+" || ue.grade === "B"
                                ? "bg-[#5A2CA8] text-white"
                                : ue.grade === "C+" || ue.grade === "C"
                                ? "bg-[#111111] text-white"
                                : "bg-red-700 text-white"
                            }`}>
                              {isPending ? "—" : ue.grade}
                            </span>
                          </td>

                          {/* Statut de validation */}
                          <td className="p-3.5 text-center border-r border-black/10">
                            <span className={`font-bold text-[11px] ${
                              ue.statut === "Validé"
                                ? "text-emerald-700"
                                : ue.statut === "Rattrapage"
                                ? "text-amber-700"
                                : "text-red-600"
                            }`}>
                              {isPending ? "En cours" : ue.statut}
                            </span>
                          </td>

                          {/* Enseignant Responsable */}
                          <td className="p-3.5 text-[11px] text-[#0a0a0a]/75 border-r border-black/10">
                            {ue.enseignantResponsable}
                          </td>

                          {/* Action Requête */}
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <Link
                              href={`/espace-etudiant/requetes?codeUE=${encodeURIComponent(ue.codeUE)}&type=probleme_note&intitule=${encodeURIComponent(ue.intitule)}`}
                              className="px-2.5 py-1 border border-[#111111] bg-[#FAFAFA] hover:bg-[#5A2CA8] hover:text-white transition font-mono text-[10px] font-bold inline-flex items-center gap-1"
                              title="Déposer une réclamation sur cette note"
                            >
                              <span>Requête</span>
                              <ArrowUpRightIcon className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          ))}
        </div>

        {/* ── Légende et Système de Notation LMD UY1 ── */}
        <div className="mt-10 p-6 border border-[#111111] bg-white font-mono text-xs space-y-4">
          <div className="border-b border-black/10 pb-2 flex items-center justify-between">
            <span className="font-bold text-[#0a0a0a] uppercase tracking-wider text-[11px]">
              Grille Officielle des Cotes LMD · Faculté des Sciences UY1
            </span>
            <span className="text-[#0a0a0a]/50 text-[10px]">
              Décret 93/027 &amp; Réforme LMD
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-[10px]">
            <div className="p-2 border border-black/10 bg-[#FAFAFA]">
              <span className="font-black block text-[#5A2CA8]">A (80-100)</span>
              <span className="text-[#0a0a0a]/60">Excellent (4.00)</span>
            </div>
            <div className="p-2 border border-black/10 bg-[#FAFAFA]">
              <span className="font-black block text-[#5A2CA8]">B+ (75-79)</span>
              <span className="text-[#0a0a0a]/60">Très Bien (3.50)</span>
            </div>
            <div className="p-2 border border-black/10 bg-[#FAFAFA]">
              <span className="font-black block text-[#5A2CA8]">B (70-74)</span>
              <span className="text-[#0a0a0a]/60">Bien (3.00)</span>
            </div>
            <div className="p-2 border border-black/10 bg-[#FAFAFA]">
              <span className="font-black block text-[#0a0a0a]">C+ (65-69)</span>
              <span className="text-[#0a0a0a]/60">Assez Bien (2.50)</span>
            </div>
            <div className="p-2 border border-black/10 bg-[#FAFAFA]">
              <span className="font-black block text-[#0a0a0a]">C (60-64)</span>
              <span className="text-[#0a0a0a]/60">Passable (2.00)</span>
            </div>
            <div className="p-2 border border-black/10 bg-[#FAFAFA]">
              <span className="font-black block text-amber-700">D (50-59)</span>
              <span className="text-[#0a0a0a]/60">Compensable (1.00)</span>
            </div>
            <div className="p-2 border border-black/10 bg-[#FAFAFA]">
              <span className="font-black block text-red-700">E (&lt;50)</span>
              <span className="text-[#0a0a0a]/60">Échec (0.00)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#0a0a0a]/70">
            <p>
              Une note vous semble erronée ou omise ? Vous disposez de <strong>15 jours calendaires</strong> après la publication des résultats pour introduire une requête.
            </p>
            <Link
              href="/espace-etudiant/requetes"
              className="px-4 py-2 bg-[#5A2CA8] text-white font-bold hover:bg-[#431C82] transition inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Accéder au Guichet des Requêtes</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
