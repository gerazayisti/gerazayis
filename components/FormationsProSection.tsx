"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  professionalProgramsList,
  allOfficialDepartmentsList,
  biochimieDepartmentDetails,
  ProfessionalProgramItem,
} from "@/lib/formations-data";
import { SearchIcon, ArrowUpRightIcon, CheckIcon, AwardIcon } from "@/components/Icons";

type TypeFilter = "all" | "Master Professionnel" | "Licence Professionnelle" | "Certificat";

export default function FormationsProSection() {
  const [activeType, setActiveType] = useState<TypeFilter>("all");
  const [activeDept, setActiveDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Liste complète de TOUS les départements officiels pour le filtre
  const departmentsList = useMemo(() => {
    return allOfficialDepartmentsList.map((d) => {
      const count = professionalProgramsList.filter((p) => p.departmentCode === d.code).length;
      return {
        code: d.code,
        name: d.name,
        fullName: d.fullName,
        count,
      };
    });
  }, []);

  const filteredPrograms = useMemo(() => {
    return professionalProgramsList.filter((item) => {
      const matchType = activeType === "all" ? true : item.type === activeType;
      const matchDept = activeDept === "all" ? true : item.departmentCode === activeDept;

      if (!matchType || !matchDept) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = item.title.toLowerCase().includes(q);
      const inOption = item.option ? item.option.toLowerCase().includes(q) : false;
      const inDept = item.department.toLowerCase().includes(q);
      const inSummary = item.summary.toLowerCase().includes(q);
      const inCareers = item.careers.some((c) => c.toLowerCase().includes(q));

      return inTitle || inOption || inDept || inSummary || inCareers;
    });
  }, [activeType, activeDept, searchQuery]);

  const selectedDeptObj = useMemo(() => {
    return allOfficialDepartmentsList.find((d) => d.code === activeDept);
  }, [activeDept]);

  const countMasters = professionalProgramsList.filter((p) => p.type === "Master Professionnel").length;
  const countLicences = professionalProgramsList.filter((p) => p.type === "Licence Professionnelle").length;
  const countCertificats = professionalProgramsList.filter((p) => p.type === "Certificat").length;

  return (
    <section id="formations-professionnelles" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Section III · Catalogue Professionnel &amp; Certificats
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight">
              Formations Professionnelles &amp; <span className="font-serif italic text-[#5A2CA8]">Certificats</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md">
            L&apos;offre professionnalisante complète de la Faculté des Sciences : <strong>{countMasters} Masters Professionnels</strong>, <strong>{countLicences} Licences Professionnelles</strong> et <strong>{countCertificats} Certificats d&apos;État</strong>.
          </p>
        </div>

        {/* ── Bannière Page de Définition & Présentation de Département (Fiche Exemplaire) ── */}
        <div className="border border-[#111111] bg-white p-6 sm:p-7 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                {activeDept === "all" || activeDept === "BCH"
                  ? "Fiche Exemplaire de Département · UY1"
                  : `Département Sélectionné · [${activeDept}]`}
              </span>
              {activeDept === "BCH" || activeDept === "all" ? (
                <span className="font-mono text-[10px] bg-[#111111] text-white px-2 py-0.5 font-bold">
                  Biochimie (Fondé en 1964)
                </span>
              ) : (
                <span className="font-mono text-[10px] bg-[#111111] text-white px-2 py-0.5 font-bold">
                  {selectedDeptObj?.name}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a] tracking-tight">
              {activeDept === "all" || activeDept === "BCH"
                ? "Page de Définition & Présentation du Département de Biochimie"
                : `Page de Définition & Présentation : ${selectedDeptObj?.fullName}`}
            </h3>

            <p className="text-xs text-[#0a0a0a]/75 max-w-2xl font-sans leading-relaxed">
              {activeDept === "all" || activeDept === "BCH"
                ? "Chaque département dispose de sa propre page officielle : missions statutaires, débouchés professionnels, galerie photographique des laboratoires, événements et séminaires scientifiques, projet SOILGUARD, grilles LMD à télécharger et contacts administratifs directs."
                : `Consultez les missions statutaires, perspectives professionnelles, galerie d'images des laboratoires, agenda scientifique, grilles de cours et contacts du ${selectedDeptObj?.fullName}.`}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/departements/${activeDept === "all" ? "biochimie" : selectedDeptObj?.slug || "biochimie"}`}
              className="px-5 py-3 bg-[#5A2CA8] text-white font-mono text-xs font-bold hover:bg-[#431C82] transition inline-flex items-center gap-2"
            >
              <span>
                {activeDept === "all" || activeDept === "BCH"
                  ? "Consulter la Page Biochimie [BCH]"
                  : `Consulter la Page [${selectedDeptObj?.code}]`}
              </span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Barre de Contrôles & Filtres (Tous les départements) ── */}
        <div className="border border-[#111111] bg-white p-5 mb-8 space-y-4">
          
          {/* Champ de recherche */}
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-[#0a0a0a]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une formation (forensique, solaire, semences, mines, SIGL, environnement, One Health...)"
              className="w-full border border-[#111111] bg-[#FAFAFA] pl-10 pr-4 py-3 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#0a0a0a]/50 hover:text-[#0a0a0a]"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Filtres par Niveau */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#0a0a0a]/60 mr-1">
              Niveau :
            </span>
            <button
              type="button"
              onClick={() => setActiveType("all")}
              className={`px-3 py-1.5 text-xs font-mono font-bold border border-[#111111] transition cursor-pointer ${
                activeType === "all"
                  ? "bg-[#111111] text-white"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              Toutes les formations ({professionalProgramsList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveType("Master Professionnel")}
              className={`px-3 py-1.5 text-xs font-mono font-bold border border-[#111111] transition cursor-pointer flex items-center gap-1.5 ${
                activeType === "Master Professionnel"
                  ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              <span>Masters Professionnels</span>
              <span className="text-[10px] bg-white/20 px-1 font-black">{countMasters}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveType("Licence Professionnelle")}
              className={`px-3 py-1.5 text-xs font-mono font-bold border border-[#111111] transition cursor-pointer flex items-center gap-1.5 ${
                activeType === "Licence Professionnelle"
                  ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              <span>Licences Professionnelles</span>
              <span className="text-[10px] bg-white/20 px-1 font-black">{countLicences}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveType("Certificat")}
              className={`px-3 py-1.5 text-xs font-mono font-bold border border-[#111111] transition cursor-pointer flex items-center gap-1.5 ${
                activeType === "Certificat"
                  ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              <span>Certificats &amp; Certifications</span>
              <span className="text-[10px] bg-white/20 px-1 font-black">{countCertificats}</span>
            </button>
          </div>

          {/* Filtres par Département : TOUS LES DÉPARTEMENTS */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/10">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#0a0a0a]/60 mr-1">
              Département (11) :
            </span>
            <button
              type="button"
              onClick={() => setActiveDept("all")}
              className={`px-2.5 py-1 text-[11px] font-mono font-bold border border-[#111111] transition cursor-pointer ${
                activeDept === "all"
                  ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                  : "bg-[#FAFAFA] text-[#0a0a0a] hover:bg-gray-200"
              }`}
            >
              Tous les départements
            </button>
            {departmentsList.map((d) => (
              <button
                key={d.code}
                type="button"
                onClick={() => setActiveDept(d.code)}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold border border-[#111111] transition cursor-pointer flex items-center gap-1 ${
                  activeDept === d.code
                    ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                    : "bg-[#FAFAFA] text-[#0a0a0a] hover:bg-gray-200"
                }`}
              >
                <span>[{d.code}] {d.name}</span>
                {d.count > 0 ? (
                  <span className="text-[9px] bg-black/10 px-1 font-black">({d.count})</span>
                ) : (
                  <span className="text-[9px] text-[#0a0a0a]/40">(LMD)</span>
                )}
              </button>
            ))}
          </div>

        </div>

        {/* ── Grille Bento des Formations Professionnelles ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#111111] bg-white divide-y md:divide-y-0 divide-[#111111]">
          {filteredPrograms.length === 0 ? (
            <div className="col-span-full p-10 bg-white text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5A2CA8]/10 text-[#5A2CA8] font-mono text-xs font-bold border border-[#5A2CA8]/30">
                <span>▪</span>
                <span>Filière Académique Spécialisée</span>
              </div>
              <h3 className="text-xl font-black text-[#0a0a0a]">
                {selectedDeptObj ? selectedDeptObj.fullName : "Ce Département"}
              </h3>
              <p className="text-xs text-[#0a0a0a]/75 max-w-xl mx-auto font-sans leading-relaxed">
                Ce département consacre prioritairement ses enseignements aux <strong>Cursus Académiques Fondamentaux &amp; de Recherche</strong> (Licence Fondamentale L1-L3, Master Recherche M1-M2 et Doctorat / Ph.D).
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3 font-mono text-xs">
                <a
                  href="#poles-scientifiques"
                  className="px-4 py-2 bg-[#5A2CA8] text-white font-bold hover:bg-[#431C82] transition inline-flex items-center gap-1.5"
                >
                  <span>Explorer les cursus fondamentaux LMD</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveDept("all")}
                  className="px-4 py-2 border border-[#111111] bg-[#FAFAFA] font-bold hover:bg-black hover:text-white transition"
                >
                  Voir toutes les formations pro ({professionalProgramsList.length})
                </button>
              </div>
            </div>
          ) : (
            filteredPrograms.map((prog, idx) => (
              <div
                key={prog.id}
                className={`p-6 sm:p-7 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors border-b border-[#111111] ${
                  (idx + 1) % 3 !== 0 ? "lg:border-r" : ""
                } ${(idx + 1) % 2 !== 0 ? "md:max-lg:border-r" : ""}`}
              >
                <div>
                  
                  {/* Badge de Type & Département */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 ${
                        prog.type === "Master Professionnel"
                          ? "bg-[#5A2CA8] text-white"
                          : prog.type === "Licence Professionnelle"
                          ? "bg-[#111111] text-white"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {prog.levelBadge}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#0a0a0a]/50">
                      [{prog.departmentCode}]
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase text-[#5A2CA8] block mb-1">
                    {prog.department}
                  </span>

                  <h3 className="text-lg font-black text-[#0a0a0a] tracking-tight leading-snug">
                    {prog.title}
                  </h3>

                  {prog.option && (
                    <div className="mt-2 p-2 bg-[#5A2CA8]/5 border border-[#5A2CA8]/20 text-xs font-mono font-bold text-[#5A2CA8]">
                      {prog.option}
                    </div>
                  )}

                  <p className="mt-3 text-xs text-[#0a0a0a]/75 leading-relaxed font-sans min-h-[3rem]">
                    {prog.summary}
                  </p>

                  {/* Débouchés métiers */}
                  <div className="mt-4 pt-3 border-t border-black/10">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0a0a0a]/50 block mb-1">
                      Métiers ciblés :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {prog.careers.map((career, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[10px] font-mono bg-[#111111]/5 px-1.5 py-0.5 text-[#0a0a0a]/80"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Pied de carte */}
                <div className="mt-6 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-[11px] text-[#0a0a0a]/50">
                    {prog.duration}
                  </span>
                  {(() => {
                    const deptObj = allOfficialDepartmentsList.find((d) => d.code === prog.departmentCode);
                    const deptSlug = deptObj?.slug || "biochimie";
                    return (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/departements/${deptSlug}`}
                          className="text-[#5A2CA8] hover:underline inline-flex items-center gap-1 font-bold"
                          title={`Consulter la page officielle du département ${prog.department}`}
                        >
                          <span>Dépt [{prog.departmentCode}]</span>
                          <ArrowUpRightIcon className="w-3 h-3" />
                        </Link>
                        <span className="text-[#0a0a0a]/20">·</span>
                        <Link
                          href="/espace-etudiant/admission"
                          className="text-[#0a0a0a] hover:text-[#5A2CA8] inline-flex items-center gap-1"
                        >
                          <span>Postuler</span>
                          <ArrowUpRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    );
                  })()}
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
