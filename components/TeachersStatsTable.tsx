"use client";

import React, { useState } from "react";
import { staffStatsTable, staffSummary } from "@/lib/faculty-staff";
import { ChevronDownIcon } from "./Icons";

export default function TeachersStatsTable() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      <div className="mx-auto max-w-content border-l border-r border-[#111111]">
        
        {/* En-tête dépliable du tableau statistique */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 sm:p-8 flex items-center justify-between gap-4 bg-[#FAFAFA] hover:bg-white text-left transition-colors border-b border-[#111111]"
          aria-expanded={isOpen}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Statistiques Officielles · Répartition Chiffrée
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0a0a0a]">
              Tableau Récapitulatif par Département et par Grade (318 Enseignants)
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs font-bold text-[#5A2CA8]">
              {isOpen ? "Masquer le tableau" : "Afficher les statistiques détaillées"}
            </span>
            <div className={`w-7 h-7 border border-[#111111] flex items-center justify-center transition-transform ${
              isOpen ? "bg-[#5A2CA8] text-white rotate-180" : "bg-white text-[#0a0a0a]"
            }`}>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="p-6 sm:p-10 bg-white overflow-x-auto">
            <table className="w-full text-left border border-[#111111] border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-[#18181b] text-white uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3 px-4 border border-[#111111]">Département</th>
                  <th className="py-3 px-4 border border-[#111111] text-center">Professeurs</th>
                  <th className="py-3 px-4 border border-[#111111] text-center">Maîtres de Conf.</th>
                  <th className="py-3 px-4 border border-[#111111] text-center">Chargés de Cours</th>
                  <th className="py-3 px-4 border border-[#111111] text-center">Assistants</th>
                  <th className="py-3 px-4 border border-[#111111] text-center bg-[#5A2CA8]">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111111]">
                {staffStatsTable.map((row) => (
                  <tr key={row.code} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3 px-4 border border-[#111111] font-bold">
                      <span className="text-[#5A2CA8] mr-2">[{row.code}]</span>
                      <span>{row.name}</span>
                    </td>
                    <td className="py-3 px-4 border border-[#111111] text-center">{row.prof}</td>
                    <td className="py-3 px-4 border border-[#111111] text-center">{row.mc}</td>
                    <td className="py-3 px-4 border border-[#111111] text-center">{row.cc}</td>
                    <td className="py-3 px-4 border border-[#111111] text-center">{row.asst}</td>
                    <td className="py-3 px-4 border border-[#111111] text-center font-black bg-[#F4F0FC] text-[#5A2CA8]">
                      {row.total}
                    </td>
                  </tr>
                ))}
                {/* Ligne de totalisation */}
                <tr className="bg-[#FAFAFA] font-black text-sm border-t-2 border-[#111111]">
                  <td className="py-4 px-4 border border-[#111111] text-[#0a0a0a]">
                    TOTAL GÉNÉRAL
                  </td>
                  <td className="py-4 px-4 border border-[#111111] text-center text-[#5A2CA8]">
                    {staffSummary.prof.count} ({staffSummary.prof.women})
                  </td>
                  <td className="py-4 px-4 border border-[#111111] text-center text-[#5A2CA8]">
                    {staffSummary.mc.count} ({staffSummary.mc.women})
                  </td>
                  <td className="py-4 px-4 border border-[#111111] text-center text-[#5A2CA8]">
                    {staffSummary.cc.count} ({staffSummary.cc.women})
                  </td>
                  <td className="py-4 px-4 border border-[#111111] text-center text-[#5A2CA8]">
                    {staffSummary.asst.count} ({staffSummary.asst.women})
                  </td>
                  <td className="py-4 px-4 border border-[#111111] text-center bg-[#5A2CA8] text-white">
                    {staffSummary.total} ({staffSummary.totalWomen})
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#0a0a0a]/60">
              <span>( ) = Nombre de femmes parmi les enseignants de la catégorie.</span>
              <span className="font-bold text-[#5A2CA8]">Total : 318 enseignants dont 75 femmes</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
