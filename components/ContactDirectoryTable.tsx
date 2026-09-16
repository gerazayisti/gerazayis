"use client";

import React, { useState, useMemo } from "react";
import {
  SearchIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
  MailIcon,
} from "@/components/Icons";
import { officialContactsDirectory, OfficialContact } from "@/lib/contacts-data";

type CategoryFilter = "all" | "decanat" | "departement" | "service" | "technique";

export default function ContactDirectoryTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  // Filtrage combiné par recherche et par catégorie
  const filteredContacts = useMemo(() => {
    return officialContactsDirectory.filter((item) => {
      const matchCategory =
        activeCategory === "all" ? true : item.category === activeCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inName = item.name.toLowerCase().includes(q);
      const inCode = item.code ? item.code.toLowerCase().includes(q) : false;
      const inEmails = item.emails.some((e) => e.toLowerCase().includes(q));
      const inRole = item.role.toLowerCase().includes(q);

      return inName || inCode || inEmails || inRole;
    });
  }, [searchQuery, activeCategory]);

  const categories = [
    { key: "all" as CategoryFilter, label: "Tous", count: 20 },
    { key: "decanat" as CategoryFilter, label: "Décanat & Secrétariat", count: 2 },
    { key: "departement" as CategoryFilter, label: "Départements Académiques", count: 10 },
    { key: "service" as CategoryFilter, label: "Services Centraux", count: 6 },
    { key: "technique" as CategoryFilter, label: "Pôle Technique & IT", count: 2 },
  ];

  return (
    <section id="annuaire-officiel" className="w-full bg-white border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de la section Annuaire */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Annuaire Institutionnel
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight">
              Logins &amp; E-mails <span className="font-serif italic text-[#5A2CA8]">Professionnels</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/70 max-w-md">
            Répertoire des 20 adresses officielles sous le domaine universitaire sécurisé <code>@facsciences.uy1.cm</code>.
          </p>
        </div>

        {/* Barre d'outils : Recherche et Filtres par onglets */}
        <div className="border border-[#111111] bg-[#FAFAFA] p-4 mb-6 space-y-4">
          
          {/* Champ de recherche */}
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-[#0a0a0a]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par département (MA, IN, PH...), service, login ou adresse email..."
              className="w-full border border-[#111111] bg-white pl-10 pr-4 py-3 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none"
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

          {/* Onglets de catégories */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-black/10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 text-xs font-mono font-bold transition flex items-center gap-1.5 border border-[#111111] cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-[#5A2CA8] text-white border-[#5A2CA8]"
                    : "bg-white text-[#0a0a0a] hover:bg-gray-100"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 font-black ${
                    activeCategory === cat.key
                      ? "bg-white/20 text-white"
                      : "bg-[#111111]/10 text-[#0a0a0a]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* ── Tableau Haute Densité (Desktop & Tablettes) ── */}
        <div className="hidden md:block border border-[#111111] overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111111] text-white font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 border-r border-white/20 w-16 text-center">N°</th>
                <th className="py-3.5 px-6 border-r border-white/20">Nom du Service / Département</th>
                <th className="py-3.5 px-4 border-r border-white/20 w-24 text-center">Code</th>
                <th className="py-3.5 px-6 border-r border-white/20">Login &amp; E-mail Professionnel</th>
                <th className="py-3.5 px-6 w-52 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111] font-mono text-xs">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-[#0a0a0a]/60 bg-[#FAFAFA]">
                    Aucun service ne correspond à votre recherche « {searchQuery} ».
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-[#FAFAFA] transition-colors group"
                  >
                    {/* Colonne 1 : N° */}
                    <td className="py-4 px-4 border-r border-[#111111] text-center font-black text-[#5A2CA8] bg-[#FAFAFA]/50 group-hover:bg-[#5A2CA8] group-hover:text-white transition-colors">
                      {String(contact.id).padStart(2, "0")}
                    </td>

                    {/* Colonne 2 : Nom & Scope */}
                    <td className="py-4 px-6 border-r border-[#111111]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0a0a0a] text-sm">
                          {contact.name}
                        </span>
                        {contact.priority && (
                          <span className="bg-[#5A2CA8]/10 text-[#5A2CA8] text-[9px] font-black uppercase px-1.5 py-0.5 border border-[#5A2CA8]/30">
                            Prioritaire
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#0a0a0a]/65 mt-1 font-sans line-clamp-1">
                        {contact.role}
                      </p>
                      <p className="text-[10px] text-[#0a0a0a]/45 mt-0.5">
                        📍 {contact.location}
                      </p>
                    </td>

                    {/* Colonne 3 : Code */}
                    <td className="py-4 px-4 border-r border-[#111111] text-center">
                      <span className="px-2 py-1 bg-[#111111]/5 border border-[#111111]/20 text-[11px] font-bold text-[#0a0a0a]">
                        {contact.code || "—"}
                      </span>
                    </td>

                    {/* Colonne 4 : Emails */}
                    <td className="py-4 px-6 border-r border-[#111111]">
                      <div className="space-y-1.5">
                        {contact.emails.map((email, idx) => (
                          <div
                            key={email}
                            className="flex items-center justify-between gap-3 group/item"
                          >
                            <a
                              href={`mailto:${email}`}
                              className="font-bold text-[#0a0a0a] hover:text-[#5A2CA8] transition-colors flex items-center gap-1.5"
                            >
                              <span className="text-[#5A2CA8] text-xs">▪</span>
                              <span className="break-all">{email}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(email)}
                              className="shrink-0 p-1 text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition"
                              title={`Copier ${email}`}
                            >
                              {copiedEmail === email ? (
                                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[10px]">
                                  <CheckIcon className="w-3 h-3" />
                                </span>
                              ) : (
                                <CopyIcon className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Colonne 5 : Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(contact.emails[0])}
                          className="px-2.5 py-1.5 border border-[#111111] bg-[#FAFAFA] hover:bg-black hover:text-white text-[11px] font-bold transition flex items-center gap-1"
                        >
                          {copiedEmail === contact.emails[0] ? (
                            <>
                              <CheckIcon className="w-3 h-3 text-emerald-600" />
                              <span>Copié</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="w-3 h-3" />
                              <span>Copier</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`mailto:${contact.emails[0]}`}
                          className="p-1.5 bg-[#5A2CA8] hover:bg-[#431C82] text-white transition flex items-center justify-center"
                          title="Envoyer un email directement"
                        >
                          <ArrowUpRightIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Version Cartes pour Mobiles (< md) ── */}
        <div className="md:hidden space-y-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-5 border border-[#111111] bg-white space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 bg-[#5A2CA8] text-white text-xs font-mono font-bold flex items-center justify-center">
                  {String(contact.id).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#111111]/5 border border-[#111111]/20">
                  {contact.code || "—"}
                </span>
              </div>

              <div>
                <h3 className="font-black text-sm text-[#0a0a0a]">
                  {contact.name}
                </h3>
                <p className="text-xs text-[#0a0a0a]/70 mt-1">
                  {contact.role}
                </p>
                <p className="text-[10px] text-[#0a0a0a]/50 font-mono mt-1">
                  📍 {contact.location}
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 space-y-2">
                {contact.emails.map((email) => (
                  <div
                    key={email}
                    className="p-2 border border-[#111111] bg-[#FAFAFA] flex items-center justify-between gap-2"
                  >
                    <a
                      href={`mailto:${email}`}
                      className="font-mono text-xs font-bold text-[#0a0a0a] hover:text-[#5A2CA8] truncate"
                    >
                      {email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(email)}
                      className="p-1 border border-[#111111] bg-white text-xs"
                      title="Copier"
                    >
                      {copiedEmail === email ? (
                        <CheckIcon className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <CopyIcon className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note officielle de bas de tableau */}
        <div className="mt-8 p-4 border border-[#111111] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="text-[#0a0a0a]/70">
              Serveurs de messagerie gérés par la <strong>Cellule Informatique (CI)</strong> de la Faculté des Sciences.
            </span>
          </div>
          <a
            href="#formulaire-contact"
            className="text-[#5A2CA8] font-black hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Utiliser le formulaire rapide</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
