"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  GlobeIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
} from "@/components/Icons";
import { generalContactInfo } from "@/lib/contacts-data";

export default function ContactHero() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-14">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* Fil d'ariane & Badge de section */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
              [04] Contacts &amp; Localisation
            </span>
          </div>
          <span className="text-[#0a0a0a]/30 font-mono">/</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A2CA8] font-bold bg-[#5A2CA8]/10 px-2 py-0.5">
            Annuaire Officiel 2024
          </span>
        </div>

        {/* Titre éditorial principal */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0a0a0a] leading-none">
            Prendre Contact &amp;{" "}
            <span className="text-[#5A2CA8] italic font-serif">Nous Localiser</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-[#0a0a0a]/75 max-w-3xl leading-relaxed">
            Coordonnées officielles, guichets d&apos;accueil des usagers et annuaire des adresses électroniques professionnelles de la Faculté des Sciences de l’Université de Yaoundé I (Plateau Atemengue &amp; Campus Annexe).
          </p>
        </div>

        {/* ── 4 Cartouches brutaux de coordonnées principales ── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#111111] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#111111]">
          
          {/* 1. Téléphone Direct */}
          <div className="p-6 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider flex items-center gap-1.5">
                  <PhoneIcon className="w-3.5 h-3.5" />
                  Standard Téléphonique
                </span>
                <span className="text-[10px] font-mono text-[#0a0a0a]/40 font-bold">
                  [TEL-01]
                </span>
              </div>
              <p className="font-mono text-base font-black text-[#0a0a0a] tracking-tight">
                {generalContactInfo.phone}
              </p>
              <p className="text-[11px] text-[#0a0a0a]/60 mt-1">
                Lundi – Vendredi · 07h30 à 15h30
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
              <a
                href={`tel:${generalContactInfo.phoneRaw}`}
                className="font-bold text-[#5A2CA8] hover:underline inline-flex items-center gap-1"
              >
                <span>Composer</span>
                <ArrowUpRightIcon className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(generalContactInfo.phone, "tel")}
                className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] flex items-center gap-1"
                title="Copier le numéro"
              >
                {copiedField === "tel" ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckIcon className="w-3 h-3" /> Copié
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CopyIcon className="w-3 h-3" /> Copier
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 2. Boîte Postale */}
          <div className="p-6 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider flex items-center gap-1.5">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  Boîte Postale
                </span>
                <span className="text-[10px] font-mono text-[#0a0a0a]/40 font-bold">
                  [BP-812]
                </span>
              </div>
              <p className="font-mono text-base font-black text-[#0a0a0a] tracking-tight">
                {generalContactInfo.bp}
              </p>
              <p className="text-[11px] text-[#0a0a0a]/60 mt-1">
                Plateau Atemengue, Yaoundé
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[11px] text-[#0a0a0a]/70">Courrier officiel</span>
              <button
                type="button"
                onClick={() => copyToClipboard(generalContactInfo.bp, "bp")}
                className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] flex items-center gap-1"
                title="Copier l'adresse postale"
              >
                {copiedField === "bp" ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckIcon className="w-3 h-3" /> Copié
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CopyIcon className="w-3 h-3" /> Copier
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 3. Site Internet Officiel */}
          <div className="p-6 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider flex items-center gap-1.5">
                  <GlobeIcon className="w-3.5 h-3.5" />
                  Portail Web
                </span>
                <span className="text-[10px] font-mono text-[#0a0a0a]/40 font-bold">
                  [WEB]
                </span>
              </div>
              <p className="font-mono text-base font-black text-[#0a0a0a] tracking-tight break-all">
                {generalContactInfo.siteDisplay}
              </p>
              <p className="text-[11px] text-[#0a0a0a]/60 mt-1">
                Portail institutionnel sécurisé HTTPS
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
              <a
                href={generalContactInfo.site}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#5A2CA8] hover:underline inline-flex items-center gap-1"
              >
                <span>Visiter</span>
                <ArrowUpRightIcon className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(generalContactInfo.site, "site")}
                className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] flex items-center gap-1"
                title="Copier l'URL"
              >
                {copiedField === "site" ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckIcon className="w-3 h-3" /> Copié
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CopyIcon className="w-3 h-3" /> Copier
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 4. Guichet Unique & Accueil */}
          <div className="p-6 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-[#5A2CA8] tracking-wider flex items-center gap-1.5">
                  <MailIcon className="w-3.5 h-3.5" />
                  Secrétariat Général
                </span>
                <span className="text-[10px] font-mono text-[#0a0a0a]/40 font-bold">
                  [COURRIEL]
                </span>
              </div>
              <p className="font-mono text-sm font-black text-[#0a0a0a] tracking-tight break-all">
                secretariat@facsciences.uy1.cm
              </p>
              <p className="text-[11px] text-[#0a0a0a]/60 mt-1">
                Réception administrative centrale
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
              <a
                href="mailto:secretariat@facsciences.uy1.cm"
                className="font-bold text-[#5A2CA8] hover:underline inline-flex items-center gap-1"
              >
                <span>Écrire</span>
                <ArrowUpRightIcon className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard("secretariat@facsciences.uy1.cm", "sec-mail")}
                className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] flex items-center gap-1"
                title="Copier le courriel"
              >
                {copiedField === "sec-mail" ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckIcon className="w-3 h-3" /> Copié
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CopyIcon className="w-3 h-3" /> Copier
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
