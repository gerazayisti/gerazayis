"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  FileTextIcon,
  CheckIcon,
  ArrowUpRightIcon,
  SearchIcon,
  InfoIcon,
} from "@/components/Icons";

const PAGE_TABS = [
  { id: "all", label: "Toutes les pages", code: "ALL", path: "/" },
  { id: "accueil", label: "Page d'Accueil", code: "01", path: "/" },
  { id: "la-faculte", label: "La Faculté (Présentation & Contacts)", code: "02", path: "/la-faculte/presentation" },
  { id: "formations", label: "Formations & Départements", code: "03", path: "/formations" },
  { id: "espace-etudiant", label: "Espace Étudiant & Scolarité", code: "04", path: "/espace-etudiant" },
  { id: "recherches", label: "Recherches & Laboratoires", code: "05", path: "/recherches/axes" },
  { id: "actualites", label: "Actualités & Babillard", code: "06", path: "/actualites" },
];

export default function WebmasterCmsPage() {
  const {
    cmsItems,
    updateItemValue,
    saveAllChanges,
    resetToDefaults,
    lastSavedTime,
    hasUnsavedChanges,
  } = useSiteContent();

  const [activePageFilter, setActivePageFilter] = useState<string>("accueil");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<boolean>(false);

  const filteredItems = cmsItems.filter((item) => {
    if (activePageFilter !== "all" && item.pageId !== activePageFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.titreChamp.toLowerCase().includes(q) ||
        item.valeurParDefaut.toLowerCase().includes(q) ||
        item.cle.toLowerCase().includes(q) ||
        item.sectionLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSave = () => {
    saveAllChanges();
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 4000);
  };

  const currentTab = PAGE_TABS.find((t) => t.id === activePageFilter) || PAGE_TABS[0];

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DU CMS WEBMASTER ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  CMS Centralisé · Direction de la Communication &amp; Informatique
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Webmaster <span className="text-[#5A2CA8]">CMS Live</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Gestionnaire de contenu éditorial en temps réel pour <strong>toutes les pages du site web</strong> de la Faculté des Sciences.
                Modifiez les textes, slogans, contacts, présentations des départements et arrêtés sans toucher au code source.
              </p>
            </div>

            {/* Actions de sauvegarde globales */}
            <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={handleSave}
                className="w-full py-3.5 px-6 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckIcon className="w-4 h-4" />
                <span>Enregistrer les modifications</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#0a0a0a]/60 pt-1">
                <span>
                  {hasUnsavedChanges ? (
                    <strong className="text-amber-700 animate-pulse font-bold">● Modifications non enregistrées</strong>
                  ) : (
                    <span className="text-emerald-700 font-bold">✓ À jour</span>
                  )}
                </span>
                {lastSavedTime && <span>Dernière sauvegarde : {lastSavedTime}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDEAU CONFIRMATION DE SAUVEGARDE ── */}
      {saveSuccessMsg && (
        <div className="border-b border-emerald-600 bg-emerald-50 text-emerald-950 py-4 font-mono text-xs">
          <div className="mx-auto max-w-content px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">
                Toutes les modifications ont été enregistrées avec succès et déployées en direct sur le site.
              </span>
            </div>
            {currentTab.path && (
              <Link
                href={currentTab.path}
                className="font-bold text-[#5A2CA8] hover:underline flex items-center gap-1"
              >
                <span>Voir le rendu sur {currentTab.label}</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── BARRE DE SÉLECTION DES PAGES DU SITE ── */}
      <section className="border-b border-[#111111] bg-white sticky top-[68px] z-40 shadow-xs">
        <div className="mx-auto max-w-content border-l border-r border-[#111111]">
          <div className="flex flex-wrap items-center gap-0 overflow-x-auto scrollbar-none font-mono text-xs">
            {PAGE_TABS.map((tab) => {
              const isSelected = activePageFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePageFilter(tab.id)}
                  className={`px-4 py-3.5 border-r border-[#111111] font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[#18181b] text-white"
                      : "bg-white text-[#0a0a0a] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <span className={`text-[10px] ${isSelected ? "text-white/50" : "text-[#5A2CA8]"}`}>
                    [{tab.code}]
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CATALOGUE DES CHAMPS ÉDITABLES PAR SECTION ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          {/* Entête de filtrage et recherche rapide de champ */}
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono text-xs">
            <div>
              <p className="font-bold uppercase text-[#5A2CA8]">
                Édition du contenu : {currentTab.label}
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Champs textuels modifiables ({filteredItems.length})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un texte…"
                  className="w-full pl-9 pr-3 py-2 border border-[#111111] bg-[#FAFAFA] text-xs focus:outline-none focus:border-[#5A2CA8]"
                />
              </div>

              {currentTab.path && (
                <Link
                  href={currentTab.path}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#111111] bg-white hover:bg-black/5 text-[#0a0a0a] font-bold transition shrink-0"
                >
                  <span>Prévisualiser</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Formulaire des champs */}
          {filteredItems.length === 0 ? (
            <div className="p-8 border border-[#111111] bg-[#FAFAFA] font-mono text-xs text-center text-[#0a0a0a]/60">
              Aucun champ ne correspond à votre filtre. Sélectionnez une autre page ci-dessus.
            </div>
          ) : (
            <div className="space-y-6 font-mono text-xs">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#111111] bg-white p-6 sm:p-8 space-y-3 hover:border-[#5A2CA8] transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#5A2CA8] text-white px-2 py-0.5 font-bold text-[10px]">
                        {item.pageTitre}
                      </span>
                      <span className="font-bold text-[#0a0a0a]">{item.sectionLabel}</span>
                    </div>
                    <span className="text-[#0a0a0a]/40 text-[10px] font-mono">
                      Clé : {item.cle}
                    </span>
                  </div>

                  <label className="block font-black text-sm uppercase text-[#0a0a0a]">
                    {item.titreChamp} :
                  </label>

                  {item.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={item.valeurParDefaut}
                      onChange={(e) => updateItemValue(item.id, e.target.value)}
                      className="w-full border border-[#111111] bg-[#FAFAFA] p-3 text-xs focus:outline-none focus:border-[#5A2CA8] font-sans leading-relaxed text-[#0a0a0a]"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item.valeurParDefaut}
                      onChange={(e) => updateItemValue(item.id, e.target.value)}
                      className="w-full border border-[#111111] bg-[#FAFAFA] p-3 text-xs focus:outline-none focus:border-[#5A2CA8] font-sans font-bold text-[#0a0a0a]"
                    />
                  )}

                  <div className="flex justify-between items-center text-[10px] text-[#0a0a0a]/50 pt-1">
                    <span>Type : {item.type}</span>
                    <span>Modifié en direct · Pensez à enregistrer vos changements</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Barre d'action basse */}
          <div className="mt-12 p-6 border border-[#111111] bg-[#FAFAFA] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="text-[#0a0a0a]/70">
              <span>Besoin de restaurer les textes originaux du site ? </span>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Voulez-vous vraiment restaurer tous les textes d'origine du site ?")) {
                    resetToDefaults();
                    alert("Textes par défaut restaurés.");
                  }
                }}
                className="text-rose-700 hover:underline font-bold ml-1 cursor-pointer"
              >
                Rétablir les valeurs par défaut
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="px-8 py-3 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-bold transition shadow-sm cursor-pointer"
            >
              Enregistrer toutes les modifications
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
