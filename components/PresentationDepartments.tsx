"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { departments, Department } from "@/lib/content";
import { SearchIcon, ArrowRightIcon } from "./Icons";

const filterCategories = [
  "Tous les départements",
  "Sciences Exactes",
  "Sciences de la Vie",
  "Sciences de la Matière & Terre",
];

export default function PresentationDepartments() {
  const [selectedCategory, setSelectedCategory] = useState("Tous les départements");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepts = departments.filter((dept) => {
    const matchesCategory =
      selectedCategory === "Tous les départements" || dept.category === selectedCategory;

    const matchesSearch =
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="departements" className="w-full bg-white border-b border-[#111111] overflow-hidden scroll-mt-16">
      
      {/* ── En-tête de section ── */}
      <div className="py-14 border-b border-[#111111] bg-white">
        <div className="mx-auto max-w-content px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                Organisation Académique · 10 Départements
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
              Départements <span className="text-[#5A2CA8]">d&apos;Enseignement</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-lg leading-relaxed">
            Placés sous l&apos;égide de la <strong>Division de la Programmation et du Suivi des Enseignements</strong>,
            ces 10 départements constituent l&apos;armature scientifique et pédagogique de la Faculté des Sciences.
          </p>
        </div>
      </div>

      {/* ── Barre de filtre et de recherche interactive ── */}
      <div className="border-b border-[#111111] bg-[#FAFAFA] py-5">
        <div className="mx-auto max-w-content px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Boutons de catégories rectangulaires 1px */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 text-xs font-mono font-bold transition-colors border ${
                  selectedCategory === cat
                    ? "bg-[#18181b] text-white border-[#18181b]"
                    : "bg-white text-[#0a0a0a]/70 border-[#111111] hover:border-[#5A2CA8] hover:text-[#5A2CA8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Champ de recherche rapide */}
          <div className="relative w-full lg:w-80">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]/30" />
            <input
              type="text"
              placeholder="Rechercher un département, discipline…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#111111] bg-white py-2.5 pl-10 pr-3 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none"
            />
          </div>

        </div>
      </div>

      {/* ── Grille continue 2 colonnes (Bento dense avec 1px solid #111111) ── */}
      <div className="mx-auto max-w-content border-l border-r border-[#111111] grid grid-cols-1 lg:grid-cols-2 divide-y divide-[#111111] bg-white">
        {filteredDepts.map((dept: Department, idx: number) => (
          <article
            key={dept.code}
            className={`group flex flex-col justify-between p-8 sm:p-10 hover:bg-[#FAFAFA] transition-colors border-r border-[#111111] ${
              idx % 2 === 1 ? "lg:border-r-0" : ""
            }`}
          >
            <div>
              {/* En-tête de carte : Index + Code + Catégorie */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#5A2CA8] text-white text-xs font-mono font-bold flex items-center justify-center">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0a0a0a] bg-[#F4F0FC] border border-[#5A2CA8]/30 px-2 py-0.5">
                    DÉP. {dept.code}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0a0a0a]/50">
                  {dept.category}
                </span>
              </div>

              {/* Titre officiel du département */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a] tracking-tight group-hover:text-[#5A2CA8] transition-colors">
                {dept.fullName}
              </h3>

              {/* Mention institutionnelle obligatoire */}
              <div className="mt-3 inline-block bg-[#18181b] text-white px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider">
                {dept.institution}
              </div>

              <div className="mt-2 text-[11px] font-mono font-bold text-[#5A2CA8] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#5A2CA8]"></span>
                <span>{dept.division}</span>
              </div>

              {/* Vignette photographique */}
              <div className="relative mt-4 aspect-[16/8] w-full overflow-hidden border border-[#111111] bg-neutral-100">
                {dept.image ? (
                  <Image
                    src={dept.image}
                    alt={`Département de ${dept.name}`}
                    fill
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#18181b] text-white font-mono font-black text-2xl tracking-widest">
                    {dept.code} · UY1
                  </div>
                )}
              </div>

              {/* Courte description institutionnelle du département */}
              <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed">
                {dept.summary}
              </p>

              {/* Spécialités disciplinaires sous forme de badges stricts */}
              <div className="mt-5 pt-4 border-t border-black/10">
                <p className="text-[10px] font-mono uppercase font-bold text-[#0a0a0a]/50 mb-2">
                  Axes d&apos;enseignement &amp; spécialités :
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {dept.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="border border-[#111111] bg-white px-2 py-0.5 text-[10px] font-mono font-bold text-[#0a0a0a]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bouton rectangulaire strict : Lire plus */}
            <div className="mt-8 pt-4 border-t border-[#111111]">
              <Link
                href={`/departements/${dept.slug}`}
                className="inline-flex items-center justify-between w-full border border-[#111111] bg-white px-5 py-3 text-xs font-mono font-bold text-[#0a0a0a] hover:border-[#5A2CA8] hover:bg-[#5A2CA8] hover:text-white transition-colors group/btn shadow-sm"
              >
                <span>Lire plus</span>
                <span className="flex items-center gap-1.5 text-[#5A2CA8] group-hover/btn:text-white transition-colors">
                  <span>Découvrir le cursus</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
