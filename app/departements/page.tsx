import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { ArrowUpRightIcon, CheckIcon } from "@/components/Icons";
import { allOfficialDepartmentsList, formationsDomains } from "@/lib/formations-data";

export const metadata: Metadata = {
  title: "Départements d'Enseignement & de Recherche — Faculté des Sciences | UY1",
  description:
    "Répertoire officiel des départements de la Faculté des Sciences de l'Université de Yaoundé I : Informatique, Mathématiques, Physique, Énergie Renouvelable, Biochimie, Biologie Animale, Biologie Végétale, Microbiologie, Chimie et Sciences de la Terre.",
};

export default function DepartementsIndexPage() {
  return (
    <>
      <SiteHeader />
      <main>
        
        {/* En-tête */}
        <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-14">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Unités Pédagogiques &amp; de Recherche
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0a0a0a] leading-none">
              Les Départements <span className="text-[#5A2CA8] italic font-serif">de la Faculté</span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 max-w-3xl leading-relaxed">
              La Faculté des Sciences de l’Université de Yaoundé I compte 10 départements fondamentaux et le pôle Énergie Renouvelable, couvrant l&apos;intégralité du spectre des sciences exactes, des sciences du vivant et des géosciences.
            </p>
          </div>
        </section>

        {/* Grille des 11 Départements */}
        <section className="w-full bg-white border-b border-[#111111] py-16">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#111111] bg-white divide-y md:divide-y-0 divide-[#111111]">
              {allOfficialDepartmentsList.map((d, idx) => {
                const domain = formationsDomains.find((dom) => dom.id === d.domain);
                const isBCH = d.code === "BCH";
                const isENR = d.code === "ENR";

                return (
                  <div
                    key={d.code}
                    className={`p-6 sm:p-8 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors border-b border-[#111111] ${
                      (idx + 1) % 3 !== 0 ? "lg:border-r" : ""
                    } ${(idx + 1) % 2 !== 0 ? "md:max-lg:border-r" : ""}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#5A2CA8] text-white">
                          [{d.code}]
                        </span>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#0a0a0a]/50">
                          {isBCH ? "Fondé en 1964" : isENR ? "Filière Pro & Solaire" : "L · M · D"}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                        {d.fullName}
                      </h3>

                      <p className="text-[11px] font-mono text-[#5A2CA8] font-bold mt-1">
                        {domain?.name || "Sciences"}
                      </p>

                      <p className="mt-3 text-xs text-[#0a0a0a]/70 leading-relaxed font-sans min-h-[3rem]">
                        {isBCH
                          ? "Ouvert en 1964. Formation fondamentale et appliquée, recherche de pointe, appui au développement, Projet SOILGUARD et filières en sécurité alimentaire et biotechnologie médicale."
                          : isENR
                          ? "Formation appliquée en ingénierie photovoltaïque, conversion d'énergie, dimensionnement solaire et transition énergétique durable."
                          : `Enseignements académiques LMD, formation théorique et expérimentale, et filières de recherche spécialisées.`}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/10">
                      <Link
                        href={`/departements/${d.slug}`}
                        className="inline-flex items-center justify-between w-full font-mono text-xs font-bold text-[#0a0a0a] hover:text-[#5A2CA8] transition group"
                      >
                        <span>Page de Présentation &amp; Définition</span>
                        <ArrowUpRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
