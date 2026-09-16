import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import PresentationHero from "@/components/PresentationHero";
import PresentationTimeline from "@/components/PresentationTimeline";
import PresentationCampuses from "@/components/PresentationCampuses";
import PresentationMissions from "@/components/PresentationMissions";
import PresentationGovernance from "@/components/PresentationGovernance";
import PresentationPedagogy from "@/components/PresentationPedagogy";
import PresentationDepartments from "@/components/PresentationDepartments";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Présentation — Faculté des Sciences | Université de Yaoundé I",
  description:
    "Présentation officielle de la Faculté des Sciences de l'Université de Yaoundé I : historique fondateur de 1962, décrets de 1993, campus Atemengue et Annexe, gouvernance décanale (Doyen Pr OWONO OWONO Luc Calvin), 3 missions, CM/TD/TP, thèses PhD et répertoire des 10 départements.",
};

export default function PresentationPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PresentationHero />
        <PresentationTimeline />
        <PresentationCampuses />
        <PresentationMissions />
        <PresentationGovernance />
        <PresentationPedagogy />
        <PresentationDepartments />

        {/* ── Bandeau d'exploration des autres volets du dossier La Faculté ── */}
        <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-14">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8] block mb-2">
                  Dossier Institutionnel
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight">
                  Poursuivre la découverte de <span className="text-[#5A2CA8]">la Faculté</span>
                </h2>
              </div>
              <p className="text-xs font-mono text-[#0a0a0a]/60">
                Organisation administrative, collèges d&apos;enseignants et coordonnées officielles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#111111] border border-[#111111] bg-white">
              <Link
                href="/la-faculte/structure"
                className="group p-8 hover:bg-[#FAFAFA] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#5A2CA8] block mb-1">
                    VOLET 02
                  </span>
                  <h3 className="text-lg font-black text-[#0a0a0a] group-hover:text-[#5A2CA8] transition-colors">
                    Structure Administrative
                  </h3>
                  <p className="mt-2 text-xs text-[#0a0a0a]/70">
                    Décanat, 3 Vice-décanats, Division des enseignements et collège des chefs de départements.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold text-[#0a0a0a] group-hover:text-[#5A2CA8]">
                  <span>Consulter l&apos;organigramme</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                href="/la-faculte/enseignants"
                className="group p-8 hover:bg-[#FAFAFA] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#5A2CA8] block mb-1">
                    VOLET 03
                  </span>
                  <h3 className="text-lg font-black text-[#0a0a0a] group-hover:text-[#5A2CA8] transition-colors">
                    Enseignants Permanents
                  </h3>
                  <p className="mt-2 text-xs text-[#0a0a0a]/70">
                    Professeurs titulaires, maîtres de conférences et chargés de cours de rang magistral.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold text-[#0a0a0a] group-hover:text-[#5A2CA8]">
                  <span>Voir le corps professoral</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                href="/la-faculte/contacts"
                className="group p-8 hover:bg-[#FAFAFA] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#5A2CA8] block mb-1">
                    VOLET 04
                  </span>
                  <h3 className="text-lg font-black text-[#0a0a0a] group-hover:text-[#5A2CA8] transition-colors">
                    Contacts &amp; Localisation
                  </h3>
                  <p className="mt-2 text-xs text-[#0a0a0a]/70">
                    Plateau Atemengue, BP 812 Yaoundé, téléphones officiels et adresses des services décanaux.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold text-[#0a0a0a] group-hover:text-[#5A2CA8]">
                  <span>Accéder aux coordonnées</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
