"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { formationsDomains } from "@/lib/formations-data";
import { SearchIcon, ArrowUpRightIcon, CheckIcon } from "@/components/Icons";

export default function FormationsPolesGrid() {
  const [activeDomainId, setActiveDomainId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Rassemblement et filtrage de tous les départements
  const allDepartments = useMemo(() => {
    return formationsDomains.flatMap((domain) =>
      domain.departments.map((dept) => ({
        ...dept,
        domainId: domain.id,
        domainName: domain.name,
      }))
    );
  }, []);

  const filteredDepartments = useMemo(() => {
    return allDepartments.filter((dept) => {
      const matchDomain =
        activeDomainId === "all" ? true : dept.domainId === activeDomainId;

      if (!matchDomain) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inName = dept.name.toLowerCase().includes(q);
      const inCode = dept.code.toLowerCase().includes(q);
      const inSummary = dept.summary.toLowerCase().includes(q);
      const inSpecialties = dept.specialties.some((s) => s.toLowerCase().includes(q));
      const inCareers = dept.careers.some((c) => c.toLowerCase().includes(q));

      return inName || inCode || inSummary || inSpecialties || inCareers;
    });
  }, [allDepartments, activeDomainId, searchQuery]);

  return (
    <section id="poles-scientifiques" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Les 10 Pôles Disciplinaires
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight">
              Départements &amp; <span className="font-serif italic text-[#5A2CA8]">Filières Scientifiques</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md">
            Trouvez rapidement votre filière parmi nos 10 départements d&apos;enseignement classés en 3 grands domaines scientifiques.
          </p>
        </div>

        {/* ── Barre de Filtrage & Recherche ── */}
        <div className="border border-[#111111] bg-white p-4 mb-8 space-y-4">
          
          {/* Recherche texte */}
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-[#0a0a0a]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une spécialité (IA, Solaire, Phytochimie, Géologie...), un code ou un métier..."
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

          {/* Onglets de Domaines */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10">
            <button
              type="button"
              onClick={() => setActiveDomainId("all")}
              className={`px-3.5 py-1.5 text-xs font-mono font-bold border border-[#111111] transition cursor-pointer ${
                activeDomainId === "all"
                  ? "bg-[#111111] text-white"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              Tous les 10 Départements
            </button>

            {formationsDomains.map((domain) => {
              const isActive = activeDomainId === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setActiveDomainId(domain.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold border border-[#111111] transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                      : "bg-white text-[#0a0a0a] hover:bg-gray-100"
                  }`}
                >
                  <span>{domain.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 ${
                      isActive ? "bg-white/20 text-white" : "bg-[#111111]/10 text-[#0a0a0a]"
                    }`}
                  >
                    {domain.departments.length}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ── Grille Bento des Départements ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#111111] bg-white divide-y md:divide-y-0 divide-[#111111]">
          {filteredDepartments.length === 0 ? (
            <div className="col-span-full p-12 text-center text-xs font-mono text-[#0a0a0a]/60 bg-white">
              Aucun département ne correspond à votre recherche « {searchQuery} ».
            </div>
          ) : (
            filteredDepartments.map((dept, idx) => (
              <div
                key={dept.code}
                className={`p-6 sm:p-7 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors border-b border-[#111111] ${
                  (idx + 1) % 3 !== 0 ? "lg:border-r" : ""
                } ${(idx + 1) % 2 !== 0 ? "md:max-lg:border-r" : ""}`}
              >
                <div>
                  
                  {/* Badge & Code */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#5A2CA8] text-white">
                      [{dept.code}]
                    </span>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#0a0a0a]/50">
                      L · M · D
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight leading-snug">
                    {dept.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#0a0a0a]/70 leading-relaxed min-h-[3rem]">
                    {dept.summary}
                  </p>

                  {/* Diplômes préparés */}
                  <div className="mt-4 pt-3 border-t border-black/10">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#5A2CA8] block mb-1.5">
                      Diplômes préparés :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dept.degrees.map((deg) => (
                        <span
                          key={deg}
                          className="text-[10px] font-mono bg-[#111111]/5 border border-[#111111]/15 px-1.5 py-0.5 text-[#0a0a0a]"
                        >
                          {deg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spécialités clés */}
                  <div className="mt-4">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0a0a0a]/60 block mb-1.5">
                      Spécialités majeures :
                    </span>
                    <ul className="space-y-1 text-xs text-[#0a0a0a]/80 font-mono">
                      {dept.specialties.slice(0, 3).map((spec) => (
                        <li key={spec} className="flex items-center gap-1.5">
                          <span className="text-[#5A2CA8] font-bold">▪</span>
                          <span className="truncate">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Débouchés métiers */}
                  <div className="mt-4 pt-3 border-t border-black/10">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0a0a0a]/60 block mb-1">
                      Débouchés professionnels :
                    </span>
                    <p className="text-[11px] text-[#0a0a0a]/75 font-sans line-clamp-2">
                      {dept.careers.join(" · ")}
                    </p>
                  </div>

                </div>

                {/* Bouton vers la page département */}
                <div className="mt-6 pt-3 border-t border-black/10">
                  <Link
                    href={`/departements/${dept.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-mono font-bold text-[#0a0a0a] hover:text-[#5A2CA8] transition group/link"
                  >
                    <span>Fiche complète du département</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
