"use client";

import React, { useState, useMemo } from "react";
import { departmentsTeachingStaff, DepartmentStaff, Teacher } from "@/lib/faculty-staff";
import { SearchIcon, ChevronDownIcon } from "./Icons";

const rankFilters = [
  "Tous les grades",
  "Professeur",
  "Maître de Conférences",
  "Chargé(e) de Cours",
  "Assistant(e)",
];

export default function TeachersAccordion() {
  // Par défaut, le 1er département est ouvert pour ne pas surcharger le DOM
  const [openDepts, setOpenDepts] = useState<Record<string, boolean>>({
    biochimie: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRank, setSelectedRank] = useState("Tous les grades");

  const toggleDept = (deptId: string) => {
    setOpenDepts((prev) => ({
      ...prev,
      [deptId]: !prev[deptId],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    departmentsTeachingStaff.forEach((d) => {
      allOpen[d.id] = true;
    });
    setOpenDepts(allOpen);
  };

  const collapseAll = () => {
    setOpenDepts({});
  };

  // Filtrage intelligent
  const filteredData = useMemo(() => {
    return departmentsTeachingStaff.map((dept) => {
      const matchingTeachers = dept.teachers.filter((t) => {
        const matchesName =
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.observation.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesRank = true;
        if (selectedRank === "Professeur") {
          matchesRank = t.rank.includes("Professeur");
        } else if (selectedRank === "Maître de Conférences") {
          matchesRank = t.rank.includes("Maître de Conférences");
        } else if (selectedRank === "Chargé(e) de Cours") {
          matchesRank = t.rank.includes("Chargé");
        } else if (selectedRank === "Assistant(e)") {
          matchesRank = t.rank.includes("Assistant");
        }

        return matchesName && matchesRank;
      });

      return {
        ...dept,
        matchingTeachers,
      };
    });
  }, [searchQuery, selectedRank]);

  // Si l'utilisateur fait une recherche, on ouvre automatiquement les départements qui ont des résultats
  const isFiltering = searchQuery.trim().length > 0 || selectedRank !== "Tous les grades";

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── Barre de contrôle : Recherche instantanée + Filtres + Actions Déplier/Replier ── */}
      <div className="sticky top-0 z-30 bg-[#FAFAFA] border-b border-[#111111] py-4 shadow-sm">
        <div className="mx-auto max-w-content px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Champ de recherche par enseignant */}
          <div className="relative w-full lg:w-96">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]/40" />
            <input
              type="text"
              placeholder="Rechercher un enseignant par nom, mot-clé…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#111111] bg-white py-2.5 pl-10 pr-3 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none"
            />
          </div>

          {/* Filtres par Grade */}
          <div className="flex flex-wrap items-center gap-1.5">
            {rankFilters.map((rank) => (
              <button
                key={rank}
                type="button"
                onClick={() => setSelectedRank(rank)}
                className={`px-3 py-2 text-xs font-mono font-bold transition-colors border ${
                  selectedRank === rank
                    ? "bg-[#18181b] text-white border-[#18181b]"
                    : "bg-white text-[#0a0a0a]/70 border-[#111111] hover:border-[#5A2CA8] hover:text-[#5A2CA8]"
                }`}
              >
                {rank}
              </button>
            ))}
          </div>

          {/* Boutons d'action globale Tout déplier / Tout replier */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={expandAll}
              className="border border-[#111111] bg-white px-3 py-2 font-bold text-[#0a0a0a] hover:bg-[#FAFAFA] hover:text-[#5A2CA8] transition"
            >
              + Tout déplier
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="border border-[#111111] bg-white px-3 py-2 font-bold text-[#0a0a0a] hover:bg-[#FAFAFA] hover:text-[#5A2CA8] transition"
            >
              − Tout replier
            </button>
          </div>

        </div>
      </div>

      {/* ── Liste Accordéon par Département ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] bg-white divide-y divide-[#111111]">
        {filteredData.map((dept, index) => {
          const isOpen = isFiltering ? dept.matchingTeachers.length > 0 : !!openDepts[dept.id];
          const hasTeachers = dept.matchingTeachers.length > 0;

          return (
            <div key={dept.id} className="w-full bg-white transition-colors">
              {/* ── En-tête cliquable de l'accordéon départemental ── */}
              <button
                type="button"
                onClick={() => toggleDept(dept.id)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#FAFAFA] transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="w-8 h-8 bg-[#18181b] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#5A2CA8] bg-[#F4F0FC] border border-[#5A2CA8]/20 px-2 py-0.5">
                        DÉP. {dept.code}
                      </span>
                      <span className="font-mono text-xs text-[#0a0a0a]/50">
                        ({dept.count} enseignants officiels)
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0a0a0a] tracking-tight mt-1 truncate">
                      {dept.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-block font-mono text-xs font-bold text-[#0a0a0a]/60">
                    {dept.matchingTeachers.length} affiché{dept.matchingTeachers.length > 1 ? "s" : ""}
                  </span>
                  <div className={`w-7 h-7 border border-[#111111] flex items-center justify-center transition-transform ${
                    isOpen ? "bg-[#5A2CA8] text-white rotate-180" : "bg-white text-[#0a0a0a]"
                  }`}>
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* ── Contenu déroulant (Tableau des Enseignants du Département) ── */}
              {isOpen && (
                <div className="border-t border-[#111111] bg-white overflow-x-auto">
                  {hasTeachers ? (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#111111] bg-[#FAFAFA] text-[#0a0a0a] font-mono font-bold uppercase tracking-wider text-[11px]">
                          <th className="py-3 px-4 w-16 border-r border-[#111111] text-center">N°</th>
                          <th className="py-3 px-6 border-r border-[#111111]">Noms et Prénoms</th>
                          <th className="py-3 px-6 w-56 border-r border-[#111111]">Grade Universitaire</th>
                          <th className="py-3 px-6 w-64">Observations &amp; Fonctions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#111111]">
                        {dept.matchingTeachers.map((teacher: Teacher) => {
                          const isProf = teacher.rank.includes("Professeur");
                          const isMC = teacher.rank.includes("Maître de Conférences");
                          const isSpecial = teacher.observation !== "En poste" && teacher.observation !== "En Poste";

                          return (
                            <tr
                              key={`${dept.id}-${teacher.num}-${teacher.name}`}
                              className="hover:bg-[#FAFAFA] transition-colors"
                            >
                              <td className="py-3 px-4 font-mono font-bold text-center border-r border-[#111111] text-[#0a0a0a]/60">
                                {String(teacher.num).padStart(2, "0")}
                              </td>
                              <td className="py-3 px-6 border-r border-[#111111]">
                                <span className="font-bold text-sm text-[#0a0a0a]">
                                  {teacher.name}
                                </span>
                              </td>
                              <td className="py-3 px-6 border-r border-[#111111] font-mono">
                                <span className={`inline-block px-2.5 py-1 text-[11px] font-bold border ${
                                  isProf
                                    ? "bg-[#F4F0FC] text-[#5A2CA8] border-[#5A2CA8]/30"
                                    : isMC
                                    ? "bg-[#18181b] text-white border-[#18181b]"
                                    : "bg-white text-[#0a0a0a] border-[#111111]"
                                }`}>
                                  {teacher.rank}
                                </span>
                              </td>
                              <td className="py-3 px-6 font-mono text-xs">
                                <span className={isSpecial ? "font-bold text-[#5A2CA8]" : "text-[#0a0a0a]/60"}>
                                  {teacher.observation}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-xs font-mono text-[#0a0a0a]/50">
                      Aucun enseignant ne correspond aux critères de recherche dans ce département.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
