"use client";

import React, { useState } from "react";
import { administrationStaff } from "@/lib/faculty-staff";
import { ChevronDownIcon } from "./Icons";

export default function TeachersAdminTeam() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      <div className="mx-auto max-w-content border-l border-r border-[#111111]">
        
        {/* En-tête dépliable pour ne pas surcharger la page */}
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
                Équipe Décanale &amp; Chefs de Départements
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0a0a0a]">
              Direction Administrative &amp; Responsables Pédagogiques
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs font-bold text-[#5A2CA8]">
              {isOpen ? "Masquer les détails" : "Afficher l'équipe (Décanat, DAF, DAARS, Chefs de Dép.)"}
            </span>
            <div className={`w-7 h-7 border border-[#111111] flex items-center justify-center transition-transform ${
              isOpen ? "bg-[#5A2CA8] text-white rotate-180" : "bg-white text-[#0a0a0a]"
            }`}>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>
        </button>

        {/* Contenu affiché au clic */}
        {isOpen && (
          <div className="p-8 sm:p-12 space-y-12 bg-white">
            
            {/* 1. Décanat */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-[#111111] pb-2">
                <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                  Décanat
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {administrationStaff.decanat.map((member) => (
                  <div key={member.name} className="p-4 border border-[#111111] bg-[#FAFAFA]">
                    <span className="text-[10px] font-mono font-bold text-[#5A2CA8] uppercase block">
                      {member.title}
                    </span>
                    <h4 className="font-black text-sm text-[#0a0a0a] mt-1">{member.name}</h4>
                    <p className="text-[11px] font-mono text-[#0a0a0a]/60 mt-0.5">{member.rank}</p>
                    {member.roleDesc && (
                      <p className="text-[10px] text-[#0a0a0a]/70 mt-2 pt-2 border-t border-black/10">
                        {member.roleDesc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Divisions administratives (DAF & DAARS) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* DAF */}
              <div className="p-6 border border-[#111111] bg-white">
                <div className="flex items-center justify-between border-b border-[#111111] pb-3 mb-4">
                  <h4 className="font-black text-sm text-[#0a0a0a]">
                    Division Administrative et Financière (DAF)
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-[#5A2CA8] uppercase">
                    6 Responsables
                  </span>
                </div>
                <div className="space-y-3">
                  {administrationStaff.daf.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 text-xs">
                      <div>
                        <p className="font-bold text-[#0a0a0a]">{item.name}</p>
                        <p className="text-[11px] text-[#0a0a0a]/60">{item.role}</p>
                      </div>
                      <span className="font-mono text-[10px] text-[#5A2CA8] font-bold shrink-0">
                        {item.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DAARS */}
              <div className="p-6 border border-[#111111] bg-white">
                <div className="flex items-center justify-between border-b border-[#111111] pb-3 mb-4">
                  <h4 className="font-black text-sm text-[#0a0a0a]">
                    Affaires Académiques, Scolarité &amp; Recherche (DAARS)
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-[#5A2CA8] uppercase">
                    5 Responsables
                  </span>
                </div>
                <div className="space-y-3">
                  {administrationStaff.daars.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 text-xs">
                      <div>
                        <p className="font-bold text-[#0a0a0a]">{item.name}</p>
                        <p className="text-[11px] text-[#0a0a0a]/60">{item.role}</p>
                      </div>
                      <span className="font-mono text-[10px] text-[#5A2CA8] font-bold shrink-0">
                        {item.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. Chefs de Départements */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-[#111111] pb-2">
                <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                  Chefs de Départements &amp; de Services
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {administrationStaff.departmentHeads.map((dept) => (
                  <div key={dept.dept} className="p-4 border border-[#111111] bg-[#FAFAFA] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#5A2CA8] uppercase block">
                        {dept.dept}
                      </span>
                      <h4 className="font-black text-sm text-[#0a0a0a] mt-1">{dept.head}</h4>
                    </div>
                    <span className="font-mono text-[11px] text-[#0a0a0a]/60 mt-2 pt-2 border-t border-black/10">
                      Rang : {dept.rank}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
