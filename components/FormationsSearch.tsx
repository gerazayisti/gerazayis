"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon, ArrowUpRightIcon } from "./Icons";

const filterLevels = ["Toutes", "Licence", "Master", "Formation certifiante"];

const courses = [
  {
    code: "INF",
    name: "Informatique Fondamentale & Génie Logiciel",
    dept: "Département d'Informatique",
    tag: "Licence · Master",
    image: "/courses/computer.jpg",
    slug: "informatique",
  },
  {
    code: "CO",
    name: "Chimie Organique & Substances Naturelles",
    dept: "Département de Chimie Organique",
    tag: "Licence · Master",
    image: "/courses/chemistry.jpg",
    slug: "chimie-organique",
  },
  {
    code: "ENR",
    name: "Énergie Renouvelable — Production Photovoltaïque",
    dept: "Formation Professionnalisante",
    tag: "Formation certifiante",
    image: "/courses/solar.jpg",
    slug: "energie-renouvelable",
  },
  {
    code: "MATH",
    name: "Mathématiques & Modélisation Numérique",
    dept: "Département de Mathématiques",
    tag: "Licence · Master",
    image: "/hero_campus.jpg",
    slug: "mathematiques",
  },
  {
    code: "BCH",
    name: "Biochimie & Biologie Moléculaire",
    dept: "Département de Biochimie",
    tag: "Licence · Master",
    image: "/research_lab.jpg",
    slug: "biochimie",
  },
  {
    code: "STU",
    name: "Sciences de la Terre et de l'univers",
    dept: "Département des Sciences de la Terre",
    tag: "Licence · Master",
    image: "/campus_facade.jpg",
    slug: "sciences-de-la-terre",
  },
];

export default function FormationsSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Toutes");

  const filteredCourses = courses.filter((c) => {
    const matchesFilter =
      selectedFilter === "Toutes" ||
      (selectedFilter === "Licence" && c.tag.includes("Licence")) ||
      (selectedFilter === "Master" && c.tag.includes("Master")) ||
      (selectedFilter === "Formation certifiante" && c.tag.includes("certifiante"));

    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dept.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section className="w-full bg-white border-b border-[#111111] overflow-hidden">
      
      {/* ── En-tête de section avec ligne 1px ── */}
      <div className="py-14 border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Offre Académique
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
              Rechercher une <span className="text-[#5A2CA8]">Formation</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-md">
            Découvrez l&apos;ensemble de nos cursus en sciences fondamentales, ingénierie logicielle,
            biotechnologies et filières professionnalisantes.
          </p>
        </div>
      </div>

      {/* ── Barre de recherche intégrée pleine largeur avec bordures 1px ── */}
      <div className="border-b border-[#111111] bg-[#FAFAFA] py-6">
        <div className="mx-auto max-w-content px-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col lg:flex-row lg:items-center gap-4"
          >
            {/* Champ texte */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]/40" />
              <input
                type="text"
                placeholder="Rechercher un cursus, une spécialité, un département…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-[#111111] bg-white py-3 pl-11 pr-4 text-xs sm:text-sm font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none"
              />
            </div>

            {/* Filtres de niveaux - boutons rectangulaires */}
            <div className="flex flex-wrap items-center gap-1.5">
              {filterLevels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedFilter(lvl)}
                  className={`px-4 py-3 text-xs font-mono font-bold transition-colors border ${
                    selectedFilter === lvl
                      ? "bg-[#18181b] text-white border-[#18181b]"
                      : "bg-white text-[#0a0a0a]/70 border-[#111111] hover:border-[#5A2CA8] hover:text-[#5A2CA8]"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Bouton de recherche violet */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 bg-[#5A2CA8] hover:bg-[#431C82] px-7 py-3 text-xs font-mono font-bold text-white transition shadow-sm shrink-0"
            >
              <span>Filtrer</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Grille Bento continue 3 colonnes (gap: 0, bordures partagées 1px solid #111111) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white">
        {filteredCourses.map((c, idx) => (
          <Link
            key={c.name}
            href={`/formations/${c.slug}`}
            className="group flex flex-col justify-between border-r border-b border-[#111111] bg-white hover:bg-[#FAFAFA] transition-all"
          >
            <div>
              {/* Photo avec cadre 1px strict */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#111111] bg-neutral-100">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  sizes="(min-width: 1024px) 380px, 100vw"
                />
                <div className="absolute top-3 left-3 bg-[#18181b] text-white px-3 py-1 text-xs font-mono font-bold">
                  {c.code}
                </div>
                <div className="absolute top-3 right-3 bg-[#5A2CA8] text-white px-2 py-0.5 text-[10px] font-mono font-bold">
                  #{String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-7">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A2CA8] block mb-2">
                  ▪ {c.tag}
                </span>
                <h3 className="text-lg font-black text-[#0a0a0a] leading-snug group-hover:text-[#5A2CA8] transition-colors line-clamp-2">
                  {c.name}
                </h3>
                <p className="mt-2 text-xs text-[#0a0a0a]/60">
                  {c.dept}
                </p>
              </div>
            </div>

            {/* Pied de carte avec lien net */}
            <div className="px-7 py-4 border-t border-[#111111] flex items-center justify-between text-xs font-mono font-bold text-[#0a0a0a] group-hover:text-[#5A2CA8] bg-white">
              <span>Détails de la formation</span>
              <span className="text-base leading-none text-[#5A2CA8] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
