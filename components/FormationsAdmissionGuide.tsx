"use client";

import React, { useState } from "react";
import Link from "next/link";
import { admissionRequirementsSummary } from "@/lib/formations-data";
import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon, PhoneIcon, MailIcon } from "@/components/Icons";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Qu'est-ce qu'un crédit dans le système LMD ?",
    answer:
      "Un crédit est l'unité de mesure du travail de l'étudiant (cours, TD, TP, travail personnel). Un semestre équivaut à 30 crédits. Une Licence se valide avec 180 crédits (6 semestres), et un Master avec 120 crédits (4 semestres). Les crédits validés sont capitalisables et transférables.",
  },
  {
    question: "Quels sont les diplômes requis pour entrer en Licence 1 ?",
    answer:
      "L'accès est ouvert aux titulaires d'un Baccalauréat scientifique (séries C, D, E, ou F selon la spécialité), d'un GCE Advanced Level avec au moins 2 matières scientifiques, ou de tout diplôme équivalent reconnu par le Ministère de l'Enseignement Supérieur.",
  },
  {
    question: "Quelle est la différence entre une Licence Fondamentale et une Licence Professionnelle ?",
    answer:
      "La Licence Fondamentale dispense un enseignement théorique et conceptuel destiné principalement à la poursuite d'études en Master et Doctorat. La Licence Professionnelle intègre des projets d'application et un stage obligatoire en entreprise pour préparer à une intégration immédiate sur le marché de l'emploi.",
  },
  {
    question: "Comment se déroulent les contrôles et examens ?",
    answer:
      "Chaque unité d'enseignement (UE) est évaluée par le Contrôle Continu (CC, représentant en général 30% de la note finale) et l'Examen Semestriel (SN, représentant 70%). Une session de rattrapage est organisée pour les étudiants n'ayant pas obtenu la moyenne requise lors de la première session.",
  },
];

export default function FormationsAdmissionGuide() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="admission-guide" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Guide d&apos;Intégration
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight">
              Comment Rejoindre <span className="font-serif italic text-[#5A2CA8]">la Faculté des Sciences ?</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md">
            Procédure d&apos;admission transparente, pièces requises et organisation concrète de votre scolarité.
          </p>
        </div>

        {/* ── Les 4 Étapes d'Admission ── */}
        <div className="mb-14">
          <h3 className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span>Procédure d&apos;inscription en 4 étapes simples :</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#111111] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#111111]">
            {admissionRequirementsSummary.steps.map((step) => (
              <div
                key={step.step}
                className="p-6 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors"
              >
                <div>
                  <span className="w-8 h-8 bg-[#5A2CA8] text-white text-xs font-mono font-black flex items-center justify-center mb-4">
                    {step.step}
                  </span>
                  <h4 className="font-black text-base text-[#0a0a0a]">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#0a0a0a]/70 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Deux Colonnes : Diplômes acceptés & FAQ Accordéon ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#111111] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
          
          {/* Colonne Gauche : Diplômes & Formats de Cours (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FAFAFA] space-y-6">
            <div>
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                Conditions Générales
              </span>
              <h4 className="text-xl font-black text-[#0a0a0a]">
                Diplômes Éligibles
              </h4>
              <p className="mt-2 text-xs text-[#0a0a0a]/75 leading-relaxed">
                {admissionRequirementsSummary.general}
              </p>
            </div>

            <div className="space-y-2">
              {admissionRequirementsSummary.diplomasAccepted.map((dip, idx) => (
                <div key={idx} className="p-3 border border-[#111111] bg-white flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 text-[#5A2CA8] shrink-0 mt-0.5" />
                  <span className="font-mono text-xs text-[#0a0a0a]">{dip}</span>
                </div>
              ))}
            </div>

            {/* Assistance Scolarité */}
            <div className="p-4 border border-[#111111] bg-white space-y-2 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-[#5A2CA8] block">
                Besoin d&apos;orientation ?
              </span>
              <p className="text-[#0a0a0a]/70 text-[11px]">
                Le Service de la Scolarité et des Diplômes vous accueille au Campus Principal :
              </p>
              <div className="pt-2 border-t border-black/10 flex flex-col gap-1 text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  <MailIcon className="w-3 h-3 text-[#5A2CA8]" />
                  scolarite@facsciences.uy1.cm
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneIcon className="w-3 h-3 text-[#5A2CA8]" />
                  (+237) 222 23 44 96
                </span>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Questions Fréquentes / FAQ (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="border-b border-[#111111] pb-3 mb-4">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                Foire Aux Questions
              </span>
              <h4 className="text-xl font-black text-[#0a0a0a]">
                Questions Fréquentes sur les Formations
              </h4>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#111111] bg-white transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-black text-xs sm:text-sm text-[#0a0a0a] hover:bg-[#FAFAFA] transition"
                    >
                      <span>{faq.question}</span>
                      <ChevronDownIcon
                        className={`w-4 h-4 text-[#5A2CA8] shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-black/10 bg-[#FAFAFA] text-xs text-[#0a0a0a]/75 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Redirection vers l'espace étudiant */}
            <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#0a0a0a]/60">
                Vous êtes déjà étudiant inscrit à l&apos;UY1 ?
              </span>
              <Link
                href="/espace-etudiant/admission"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-[#5A2CA8] hover:underline"
              >
                <span>Consulter le guide complet d&apos;admission</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
