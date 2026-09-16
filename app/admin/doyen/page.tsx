"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/components/AdminAuthProvider";
import {
  BuildingIcon,
  UsersIcon,
  CheckIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  ClockIcon,
  GraduationCapIcon,
  InfoIcon,
} from "@/components/Icons";

export default function DoyenDashboardPage() {
  const { decanatStats, departmentsMetrics } = useAdminAuth();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>("all");
  const [newDecanatNotice, setNewDecanatNotice] = useState<string>("");
  const [broadcastAlertSuccess, setBroadcastAlertSuccess] = useState<boolean>(false);

  const filteredDepts = departmentsMetrics.filter((dept) => {
    if (selectedDeptFilter === "all") return true;
    if (selectedDeptFilter === "high_recouvrement") return dept.tauxRecouvrement >= 94;
    if (selectedDeptFilter === "pending_claims") return dept.requetesOuvertes - dept.requetesTraitees > 1;
    return true;
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecanatNotice.trim()) return;
    try {
      localStorage.setItem("fs_decanat_broadcast_alert", newDecanatNotice);
      setBroadcastAlertSuccess(true);
      setTimeout(() => setBroadcastAlertSuccess(false), 4000);
      setNewDecanatNotice("");
    } catch {}
  };

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DU DÉCANAT ── */}
      <section className="border-b border-[#111111] bg-[#18181b] text-white py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-white/10">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-amber-400 inline-block animate-pulse"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#A78BFA]">
                  Haute Direction Facultaire · Bureau de Monsieur le Doyen
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Vue Panoramique <span className="text-[#A78BFA]">Décanale</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed">
                Tableau de bord exécutif de supervision intégrale de la Faculté des Sciences (UY1).
                Pilotage des 10 départements, suivi du recouvrement des droits universitaires,
                régulation des jurys de délibération et décrets académiques.
              </p>
            </div>

            <div className="lg:col-span-4 border border-white/20 bg-white/5 p-6 font-mono text-xs space-y-2">
              <span className="text-[#A78BFA] uppercase font-bold block">Autorité Décanale :</span>
              <p className="text-base font-black text-white">Le Doyen de la Faculté</p>
              <p className="text-white/60 text-[11px]">Campus Principal · Pavillon Décanat</p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-white/50">Mandat Académique</span>
                <span className="text-emerald-400 font-bold">Session 2025/2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU 5 GRANDES MÉTRIQUES EXÉCUTIVES ── */}
      <section className="border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content border-l border-r border-[#111111]">
          <div className="grid grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#111111] font-mono text-xs">
            <div className="p-6 space-y-1">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Effectif Global</span>
              <p className="text-2xl sm:text-3xl font-black text-[#5A2CA8]">
                {decanatStats.effectifTotalEtudiants.toLocaleString("fr-FR")}
              </p>
              <p className="text-[#0a0a0a]/60 text-[11px]">Étudiants inscrits (L, M, D)</p>
            </div>

            <div className="p-6 space-y-1">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Recouvrement Droits</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-700">
                {decanatStats.tauxPaiementGlobal}
              </p>
              <p className="text-[#0a0a0a]/60 text-[11px]">{decanatStats.recettesTotalFCFA}</p>
            </div>

            <div className="p-6 space-y-1">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Corps Professoral</span>
              <p className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                {decanatStats.corpsProfessoralTotal}
              </p>
              <p className="text-[#0a0a0a]/60 text-[11px]">Enseignants permanents UY1</p>
            </div>

            <div className="p-6 space-y-1">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Taux Réussite S1</span>
              <p className="text-2xl sm:text-3xl font-black text-[#5A2CA8]">
                {decanatStats.tauxReussiteSemestre1}
              </p>
              <p className="text-[#0a0a0a]/60 text-[11px]">Moyenne globale des 10 dépts</p>
            </div>

            <div className="p-6 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[#0a0a0a]/50 uppercase font-bold block">Requêtes Traitées</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-700">
                {decanatStats.tauxResolutionRequetes}
              </p>
              <p className="text-[#0a0a0a]/60 text-[11px]">
                {decanatStats.requetesTraitees} / {decanatStats.requetesTotalDeposees} tickets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABLEAU PANORAMIQUE DES 10 DÉPARTEMENTS ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">
                Performance Pédagogique &amp; Administrative
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                État synoptique des 10 Départements
              </h2>
            </div>

            {/* Filtres de tri pour le Doyen */}
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="text-[#0a0a0a]/50 uppercase font-bold mr-2">Filtre :</span>
              {[
                { id: "all", label: "Tous les 10 départements" },
                { id: "high_recouvrement", label: "Recouvrement ≥ 94%" },
                { id: "pending_claims", label: "Réclamations en suspens" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedDeptFilter(f.id)}
                  className={`px-3 py-1.5 border transition cursor-pointer font-bold ${
                    selectedDeptFilter === f.id
                      ? "border-[#5A2CA8] bg-[#5A2CA8] text-white"
                      : "border-[#111111] bg-white text-[#0a0a0a] hover:bg-black/5"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille tableau brutaliste */}
          <div className="overflow-x-auto border border-[#111111] bg-white">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-[#18181b] text-white border-b border-[#111111]">
                  <th className="p-4 font-bold">Code</th>
                  <th className="p-4 font-bold">Département</th>
                  <th className="p-4 font-bold">Chef de Département</th>
                  <th className="p-4 font-bold text-right">Inscrits</th>
                  <th className="p-4 font-bold text-right">Quittances (50k)</th>
                  <th className="p-4 font-bold text-right">Recouvrement</th>
                  <th className="p-4 font-bold text-right">MGP Moy.</th>
                  <th className="p-4 font-bold text-center">Requêtes</th>
                  <th className="p-4 font-bold text-right">Corps Ens.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-[#0a0a0a]">
                {filteredDepts.map((dept) => {
                  const pending = dept.requetesOuvertes - dept.requetesTraitees;
                  return (
                    <tr key={dept.code} className="hover:bg-[#FAFAFA] transition">
                      <td className="p-4 font-bold text-[#5A2CA8]">[{dept.code}]</td>
                      <td className="p-4 font-bold text-sm text-[#0a0a0a]">{dept.nom}</td>
                      <td className="p-4 text-[#0a0a0a]/75">{dept.chefDepartement}</td>
                      <td className="p-4 text-right font-bold">{dept.etudiantsInscrits.toLocaleString("fr-FR")}</td>
                      <td className="p-4 text-right">{dept.quittancesValidees.toLocaleString("fr-FR")}</td>
                      <td className="p-4 text-right">
                        <span className={`px-2 py-0.5 font-bold ${
                          dept.tauxRecouvrement >= 94
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {dept.tauxRecouvrement.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-4 text-right font-black text-[#5A2CA8]">
                        {dept.mgpMoyenne.toFixed(2)} / 4.00
                      </td>
                      <td className="p-4 text-center">
                        {pending === 0 ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                            Toutes traitées
                          </span>
                        ) : (
                          <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 border border-rose-200">
                            {pending} en attente
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right font-bold">{dept.enseignantsPermanents}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── MODULE DIFFUSION D'ALERTE DÉCANALE OFFICIELLE EN DIRECT ── */}
      <section className="border-t border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Formulaire de publication d'alerte */}
            <div className="lg:col-span-7 border border-[#111111] bg-white p-6 sm:p-8 space-y-6">
              <div>
                <span className="font-mono text-xs font-black uppercase text-[#5A2CA8]">
                  Communication Décanale d&apos;Urgence
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0a0a0a] mt-1">
                  Diffuser une note de service ou un arrêté décanal
                </h3>
                <p className="text-xs text-[#0a0a0a]/65 mt-1 font-mono">
                  Ce message sera affiché instantanément en bandeau prioritaire sur la page d&apos;accueil pour tous les étudiants et enseignants.
                </p>
              </div>

              {broadcastAlertSuccess && (
                <div className="p-4 border border-emerald-600 bg-emerald-50 text-emerald-950 font-mono text-xs flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Le communiqué décanal a été publié et déployé sur le portail universitaire.</span>
                </div>
              )}

              <form onSubmit={handleBroadcast} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block font-bold text-[#0a0a0a] uppercase mb-1">
                    Texte officiel du communiqué / Arrêté :
                  </label>
                  <textarea
                    rows={4}
                    value={newDecanatNotice}
                    onChange={(e) => setNewDecanatNotice(e.target.value)}
                    placeholder="Ex: ARRÊTÉ DÉCANAL N°2026/048 : Démarrage impératif des épreuves de session normale le 08 Juin 2026 dans les amphithéâtres 1001 et 501. Présentation de la quittance obligatoire."
                    className="w-full border border-[#111111] bg-[#FAFAFA] p-3 text-xs focus:outline-none focus:border-[#5A2CA8]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#0a0a0a]/50">
                    Visa protocolaire du Doyen requis.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-6 py-3 font-bold transition shadow-sm cursor-pointer"
                  >
                    <span>Signer &amp; Diffuser le communiqué</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Fiche des prérogatives décanales */}
            <div className="lg:col-span-5 border border-[#111111] bg-white p-6 sm:p-8 space-y-4 font-mono text-xs">
              <h4 className="font-black text-sm uppercase text-[#0a0a0a] flex items-center gap-2">
                <FileTextIcon className="w-4 h-4 text-[#5A2CA8]" />
                <span>Actes &amp; Arrêtés Décanaux en Vigueur :</span>
              </h4>

              <div className="space-y-3">
                <div className="p-3 border border-black/10 bg-[#FAFAFA]">
                  <p className="font-bold text-[#5A2CA8]">Arrêté Décanal N°2025/112</p>
                  <p className="text-[#0a0a0a]/75 text-[11px] mt-1">
                    Portant calendrier académique et découpage des semestres Harmattan et Mousson 2025/2026.
                  </p>
                </div>

                <div className="p-3 border border-black/10 bg-[#FAFAFA]">
                  <p className="font-bold text-[#5A2CA8]">Décision N°2026/019</p>
                  <p className="text-[#0a0a0a]/75 text-[11px] mt-1">
                    Constitution des jurys semestriels de délibération des notes de Licence 1, 2 et 3.
                  </p>
                </div>

                <div className="p-3 border border-black/10 bg-[#FAFAFA]">
                  <p className="font-bold text-[#5A2CA8]">Circulaire Rectorale Conjointe</p>
                  <p className="text-[#0a0a0a]/75 text-[11px] mt-1">
                    Réglementation stricte sur le paiement des droits de 50 000 FCFA avant tout examen terminal.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-[11px] text-[#0a0a0a]/60">
                <span>Bureau Central des Diplômes</span>
                <Link href="/admin/scolarite" className="text-[#5A2CA8] font-bold hover:underline">
                  Voir DAARS →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
