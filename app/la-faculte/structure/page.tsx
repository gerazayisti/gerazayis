import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import PresentationGovernance from "@/components/PresentationGovernance";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { ArrowUpRightIcon, UniversitySealIcon, UsersIcon } from "@/components/Icons";
import { administrativeStructure, departments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Structure Administrative — Faculté des Sciences | Université de Yaoundé I",
  description:
    "Organigramme et structure administrative officielle de la Faculté des Sciences de l'Université de Yaoundé I : Doyen Pr OWONO OWONO Luc Calvin, les 3 Vice-Doyens et les Divisions administratives.",
};

export default function StructurePage() {
  const { doyen, viceDoyens, divisions, deliberativeBodies } = administrativeStructure;

  return (
    <>
      <SiteHeader />
      <main>
        {/* ── En-tête de la page Structure Administrative ── */}
        <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-14">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Organisation &amp; Gouvernance
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0a0a0a]">
              Structure <span className="text-[#5A2CA8] italic font-serif">Administrative</span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
              La structure administrative de la Faculté des Sciences comprend, outre le Doyen qui en assure la direction et la coordination de l’ensemble des Services : une Assemblée de Faculté, un Conseil de Faculté et des Services administratifs.
            </p>
          </div>
        </section>

        {/* ── Composant détaillé de la Gouvernance ── */}
        <PresentationGovernance />

        {/* ── Collège des Départements rattachés à la Division académique ── */}
        <section className="w-full bg-white border-b border-[#111111] py-14">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8] block mb-2">
                  Unités Pédagogiques Opérationnelles
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                  Les 10 Départements &amp; Chefs de Départements
                </h2>
              </div>
              <p className="text-xs font-mono text-[#0a0a0a]/60 max-w-md">
                Placés sous la coordination académique du Décanat et de la Division de la Programmation et du Suivi des Enseignements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 border border-[#111111] bg-white">
              {departments.map((d, index) => (
                <div
                  key={d.code}
                  className="p-6 border-r border-b border-[#111111] hover:bg-[#FAFAFA] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-6 h-6 bg-[#5A2CA8] text-white text-[11px] font-mono font-bold flex items-center justify-center">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#0a0a0a]/50">
                        [{d.code}]
                      </span>
                    </div>

                    <h3 className="text-base font-black text-[#0a0a0a]">
                      {d.fullName}
                    </h3>
                    <p className="text-[11px] text-[#5A2CA8] font-mono font-bold mt-1">
                      {d.category}
                    </p>
                    <p className="text-xs text-[#0a0a0a]/70 mt-3 line-clamp-2">
                      {d.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/10">
                    <Link
                      href={`/departements/${d.slug}`}
                      className="inline-flex items-center justify-between w-full text-xs font-mono font-bold text-[#0a0a0a] hover:text-[#5A2CA8]"
                    >
                      <span>Fiche du département</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
