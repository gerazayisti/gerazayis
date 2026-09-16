"use client";

import React, { useState } from "react";
import {
  MapPinIcon,
  ClockIcon,
  BuildingIcon,
  ArrowUpRightIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  CopyIcon,
  CheckIcon,
} from "@/components/Icons";
import { generalContactInfo } from "@/lib/contacts-data";

export default function ContactLocationMap() {
  const [copiedCoord, setCopiedCoord] = useState(false);

  const coordinates = "3.8592° N, 11.5034° E";

  const handleCopyCoord = () => {
    navigator.clipboard.writeText("3.8592, 11.5034");
    setCopiedCoord(true);
    setTimeout(() => setCopiedCoord(false), 2000);
  };

  return (
    <section id="localisation" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
              Accès &amp; Localisation
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight leading-none">
            Implantation &amp; <span className="font-serif italic text-[#5A2CA8]">Horaires des Guichets</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/70 leading-relaxed">
            La Faculté des Sciences est implantée sur deux sites au cœur de la cité universitaire de Yaoundé (Plateau Atemengue et Annexe Historique).
          </p>
        </div>

        {/* ── Cartes des Deux Campus ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-[#111111] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#111111] mb-12">
          
          {/* Campus 01 : Campus Principal */}
          <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black uppercase tracking-wider bg-[#5A2CA8] text-white px-2.5 py-1">
                  Campus 01 — Principal
                </span>
                <span className="font-mono text-xs font-bold text-[#0a0a0a]/50">
                  Site Inauguré en 1967
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a] tracking-tight">
                Plateau Atemengue (Ouest du Rectorat)
              </h3>
              <p className="text-xs font-mono text-[#5A2CA8] font-bold mt-1">
                Ngoa-Ekellé · Arrondissement de Yaoundé III
              </p>

              <p className="mt-4 text-xs text-[#0a0a0a]/75 leading-relaxed">
                Le campus principal est situé sur le versant nord-ouest du plateau Atemengue. Il regroupe l&apos;intégralité des instances délibératives et de décision de la Faculté, ainsi que les plus grands amphithéâtres et laboratoires d&apos;expérimentation.
              </p>

              <div className="mt-6 space-y-2 font-mono text-xs border-t border-black/10 pt-4">
                <p className="text-[10px] text-[#0a0a0a]/50 uppercase font-black">
                  Infrastructures &amp; Services hébergés :
                </p>
                <ul className="space-y-1.5 text-[#0a0a0a]/80">
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Cabinet du Doyen &amp; Secrétariat de Faculté</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Division des Affaires Académiques, Scolarité (DAARS)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Division Administrative et Financière (DAF)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Grands Amphithéâtres 1001, 500, 350 et 250</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Laboratoires de Chimie, Physique, Biologie et Géosciences</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-[#0a0a0a]/60">Accès : Entrée Ouest Rectorat UY1</span>
              <a
                href="https://maps.google.com/?q=Universite+de+Yaounde+I+Faculte+des+Sciences"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#5A2CA8] hover:underline inline-flex items-center gap-1"
              >
                <span>Itinéraire Google Maps</span>
                <ArrowUpRightIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Campus 02 : Extension / Annexe Historique */}
          <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black uppercase tracking-wider bg-[#111111] text-white px-2.5 py-1">
                  Campus 02 — Extension / Annexe
                </span>
                <span className="font-mono text-xs font-bold text-[#0a0a0a]/50">
                  Site Historique de 1962
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a] tracking-tight">
                Bâtisses Historiques de la Faculté
              </h3>
              <p className="text-xs font-mono text-[#5A2CA8] font-bold mt-1">
                Quartier Universitaire · Yaoundé
              </p>

              <p className="mt-4 text-xs text-[#0a0a0a]/75 leading-relaxed">
                Couramment appelé « Extension » ou « Annexe », ce campus abrite les bâtisses d&apos;origine où se sont déroulés les tout premiers cours de l&apos;Université Fédérale du Cameroun dès juillet 1962 (décret n°62/DF/289). Il complète aujourd&apos;hui les capacités d&apos;accueil d&apos;enseignement.
              </p>

              <div className="mt-6 space-y-2 font-mono text-xs border-t border-black/10 pt-4">
                <p className="text-[10px] text-[#0a0a0a]/50 uppercase font-black">
                  Infrastructures hébergées :
                </p>
                <ul className="space-y-1.5 text-[#0a0a0a]/80">
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Salles de Travaux Dirigés (TD) et Cours Magistraux</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Espaces d&apos;études et vie associative étudiante</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Bureaux d&apos;enseignants et ateliers techniques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A2CA8] font-bold">▪</span>
                    <span>Annexe de reprographie et ressources documentaires</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-[#0a0a0a]/60">Accès : À proximité de l&apos;amphi 700 / UY1</span>
              <span className="font-bold text-[#0a0a0a]">Site Pédagogique Associé</span>
            </div>
          </div>

        </div>

        {/* ── Grille Horaires & Carte Intégrée ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#111111] bg-white">
          
          {/* Panneau Horaires & Guichets (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#111111] space-y-6">
            <div className="border-b border-[#111111] pb-3">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                Horaires d&apos;Ouverture
              </span>
              <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                Accueil du Public &amp; Guichets
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs">
              
              {/* Horaires 1 : Décanat */}
              <div className="p-3.5 border border-[#111111] bg-[#FAFAFA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-[#0a0a0a] uppercase">Services Administratifs</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                    Ouvert
                  </span>
                </div>
                <p className="text-[11px] text-[#5A2CA8] font-bold">Lundi au Vendredi · 07h30 – 15h30</p>
                <p className="text-[10px] text-[#0a0a0a]/60 mt-1 font-sans">
                  Décanat, Secrétariat général, Division Administrative et Financière.
                </p>
              </div>

              {/* Horaires 2 : Guichets Étudiants */}
              <div className="p-3.5 border border-[#111111] bg-[#FAFAFA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-[#0a0a0a] uppercase">Guichets Scolarité &amp; Diplômes</span>
                  <span className="text-[10px] text-[#5A2CA8] font-bold bg-[#5A2CA8]/10 px-1.5 py-0.5 border border-[#5A2CA8]/20">
                    Étudiants
                  </span>
                </div>
                <p className="text-[11px] text-[#5A2CA8] font-bold">Lundi au Vendredi · 08h30 – 14h00</p>
                <p className="text-[10px] text-[#0a0a0a]/60 mt-1 font-sans">
                  Délivrance des relevés de notes, attestations, cartes d&apos;étudiant et traitement des dossiers de diplomation.
                </p>
              </div>

              {/* Horaires 3 : Support Informatique */}
              <div className="p-3.5 border border-[#111111] bg-[#FAFAFA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-[#0a0a0a] uppercase">Cellule Informatique (CI)</span>
                  <span className="text-[10px] text-[#0a0a0a]/70 font-bold bg-gray-200 px-1.5 py-0.5">
                    Assistance
                  </span>
                </div>
                <p className="text-[11px] text-[#5A2CA8] font-bold">Lundi au Vendredi · 08h00 – 16h00</p>
                <p className="text-[10px] text-[#0a0a0a]/60 mt-1 font-sans">
                  Assistance numérique, requêtes de connexion, plateformes pédagogiques.
                </p>
              </div>

            </div>

            {/* Coordonnées GPS */}
            <div className="p-3.5 border border-[#111111] bg-white flex items-center justify-between text-xs font-mono">
              <div>
                <p className="text-[10px] text-[#0a0a0a]/50 uppercase font-bold">Coordonnées GPS :</p>
                <p className="font-bold text-[#0a0a0a]">{coordinates}</p>
              </div>
              <button
                type="button"
                onClick={handleCopyCoord}
                className="px-2 py-1 border border-[#111111] bg-[#FAFAFA] hover:bg-black hover:text-white transition text-[11px]"
              >
                {copiedCoord ? (
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

          {/* Carte Visuelle OpenStreetMap / Repères d'Accès (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4 text-[#5A2CA8]" />
                  Plan de Situation · Plateau Atemengue UY1
                </span>
                <span className="font-mono text-[10px] bg-[#111111] text-white px-2 py-0.5">
                  YAOUNDÉ · CAMEROUN
                </span>
              </div>

              {/* Iframe OpenStreetMap avec cadrage précis sur l'Université de Yaoundé I */}
              <div className="border border-[#111111] bg-[#EEEEEE] overflow-hidden relative aspect-[16/9] w-full">
                <iframe
                  title="Plan d'accès Faculté des Sciences - Université de Yaoundé I"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=11.4950%2C3.8520%2C11.5150%2C3.8680&amp;layer=mapnik&amp;marker=3.8592%2C11.5034"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </div>

            {/* Repères d'accès pratiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10 font-mono text-xs">
              <div className="p-3 border border-[#111111] bg-[#FAFAFA]">
                <p className="font-black text-[#0a0a0a] uppercase mb-1">
                  🚆 En venant de Poste Centrale
                </p>
                <p className="text-[11px] text-[#0a0a0a]/70 font-sans leading-relaxed">
                  Emprunter l&apos;axe Ngoa-Ekellé via le Carrefour EMIA. Bifurquer vers l&apos;entrée principale de l&apos;Université de Yaoundé I (Rectorat).
                </p>
              </div>

              <div className="p-3 border border-[#111111] bg-[#FAFAFA]">
                <p className="font-black text-[#0a0a0a] uppercase mb-1">
                  🚕 En venant de Melen / CHU
                </p>
                <p className="text-[11px] text-[#0a0a0a]/70 font-sans leading-relaxed">
                  Passer par le carrefour de l&apos;École Polytechnique / Cradat pour rejoindre directement le plateau Atemengue et les amphithéâtres.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
