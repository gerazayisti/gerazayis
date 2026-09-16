"use client";

import React from "react";
import Link from "next/link";
import { academicPolicies, contact } from "@/lib/content";
import { BookOpenIcon, ArrowUpRightIcon, PhoneIcon, MailIcon, MapPinIcon } from "./Icons";

export default function PresentationPedagogy() {
  const { admission, pedagogy, thesesDoc } = academicPolicies;

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête de section ── */}
      <div className="py-12 border-b border-[#111111] bg-[#FAFAFA]">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Pédagogie, Admission &amp; Thèses
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a0a0a]">
              Modalités d&apos;Études &amp; <span className="text-[#5A2CA8]">Recherche Doctorale</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-md">
            Des conditions d&apos;accès ouvertes à tous, une triple modalité d&apos;enseignement et un répertoire de thèses de doctorat accessible.
          </p>
        </div>
      </div>

      {/* ── Bloc 1 : Politique d'admission républicaine et inclusive ── */}
      <div className="border-b border-[#111111] bg-white py-8">
        <div className="mx-auto max-w-content px-6">
          <div className="border border-[#111111] bg-[#F4F0FC] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2 h-2 bg-[#5A2CA8]"></span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5A2CA8]">
                  Principe Fondamental d&apos;Admission en Première Année
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0a0a0a] leading-relaxed">
                « {admission} »
              </p>
            </div>

            <Link
              href="/espace-etudiant/admission"
              className="inline-flex items-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] text-white px-6 py-3.5 text-xs font-mono font-bold transition shrink-0 shadow-sm"
            >
              <span>Procédure de préinscription</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bloc 2 : Les 3 Formes d'Enseignement (CM, TD, TP) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111]">
        <div className="p-8 border-b border-[#111111] bg-white">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/50 block mb-1">
            Cadre Didactique Universitaire
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a]">
            Les enseignements se donnent sous <span className="text-[#5A2CA8]">trois formes</span> :
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#111111] bg-white border-b border-[#111111]">
          {pedagogy.map((item) => (
            <div key={item.code} className="p-8 hover:bg-[#FAFAFA] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 bg-[#18181b] text-white font-mono font-black text-lg flex items-center justify-center">
                    {item.code}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A2CA8] bg-[#F4F0FC] border border-[#5A2CA8]/20 px-2 py-0.5">
                    MODALITÉ OBLIGATOIRE
                  </span>
                </div>

                <h4 className="text-lg font-black text-[#0a0a0a]">
                  {item.name} ({item.short})
                </h4>

                <p className="mt-3 text-xs text-[#0a0a0a]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-[11px] font-mono font-bold text-[#0a0a0a]/50">
                <span>Contrôle continu &amp; examens</span>
                <span className="text-[#5A2CA8]">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bloc 3 : Thèses de Doctorat PhD & Contact Institutionnel ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 lg:grid-cols-12 bg-white">
        
        {/* Colonne Gauche (7 cols) : Carte Thèses de Doctorat PhD avec lien de téléchargement PDF */}
        <div className="lg:col-span-7 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#111111] flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Mémoires &amp; Thèses de Doctorat
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight">
              Production Scientifique &amp; Thèses PhD
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
              Consultez l&apos;archive officielle des thèses de Doctorat PhD soutenues avec succès à la Faculté des Sciences, recensant les contributions majeures des chercheurs et laboratoires de l&apos;établissement.
            </p>

            {/* Carte de téléchargement officiel style Swiss Neo-Brutalist */}
            <div className="mt-6 p-6 border-2 border-[#111111] bg-[#FAFAFA] hover:bg-[#F4F0FC] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#5A2CA8] text-white flex items-center justify-center shrink-0">
                  <BookOpenIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#5A2CA8] tracking-wider block">
                    {thesesDoc.format} · Période {thesesDoc.period}
                  </span>
                  <h4 className="text-sm font-black text-[#0a0a0a] mt-1 leading-snug">
                    {thesesDoc.title}
                  </h4>
                  <p className="text-[11px] text-[#0a0a0a]/60 mt-1">
                    Répertoire complet publié sur le portail universitaire de l&apos;Université de Yaoundé I.
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#111111]/20 flex items-center justify-between">
                <a
                  href={thesesDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-[#5A2CA8] text-white px-5 py-2.5 text-xs font-mono font-bold transition shadow-sm"
                >
                  <span>Télécharger le fichier des thèses (PDF)</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </a>
                <span className="font-mono text-[10px] text-[#0a0a0a]/50 uppercase font-bold">
                  uy1.uninet.cm
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-black/10">
            <Link
              href="/recherches/resultats"
              className="text-xs font-mono font-bold text-[#5A2CA8] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Accéder aux autres publications &amp; revues de la faculté</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Colonne Droite (5 cols) : Coordonnées Officielles de la Faculté */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#18181b] text-white">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#A78BFA]"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A78BFA]">
                Coordonnées Officielles
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Faculté des Sciences · UY1
            </h3>

            <p className="mt-2 text-xs text-white/70">
              Pour toute correspondance officielle, renseignements académiques ou partenariats :
            </p>

            <div className="mt-6 space-y-4 font-mono text-xs text-white/90">
              <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10">
                <MapPinIcon className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-white/50 block font-bold">Boîte Postale :</span>
                  <span className="font-bold">{contact.bp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10">
                <PhoneIcon className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-white/50 block font-bold">Téléphone Standard :</span>
                  <span className="font-bold">{contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10">
                <MailIcon className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-white/50 block font-bold">Email Institutionnel :</span>
                  <span className="font-bold text-[#A78BFA]">{contact.emails.official}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-[11px] font-mono text-white/50 flex items-center justify-between">
            <span>Plateau Atemengue, Yaoundé</span>
            <span className="text-[#A78BFA]">Cameroun</span>
          </div>
        </div>

      </div>

    </section>
  );
}
