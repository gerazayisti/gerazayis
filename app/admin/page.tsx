"use client";

import React from "react";
import Link from "next/link";
import { useAdminAuth } from "@/components/AdminAuthProvider";
import {
  BuildingIcon,
  UsersIcon,
  CheckIcon,
  ArrowUpRightIcon,
  LockIcon,
  ClockIcon,
  MapPinIcon,
  GraduationCapIcon,
  SearchIcon,
} from "@/components/Icons";

export default function AdminHubPage() {
  const { currentUser, switchRole, allAdminUsers } = useAdminAuth();

  const roleGateways = [
    {
      id: "doyen",
      titre: "Direction Facultaire · Le Doyen",
      roleBadge: "Doyen / Direction",
      href: "/admin/doyen",
      code: "ROLE-01",
      desc: "Vue panoramique de l'établissement : effectifs des 10 départements, suivi du recouvrement des quittances (696 000 000 FCFA), taux de réussite et décrets.",
      iconBadge: "DY",
      color: "border-[#5A2CA8]",
      statsHighlight: "14 850 Étudiants · 10 Départements",
    },
    {
      id: "enseignant",
      titre: "Espace Enseignant & Pédagogie",
      roleBadge: "Enseignant / Jury",
      href: "/admin/enseignant",
      code: "ROLE-02",
      desc: "Instruction des réclamations d'étudiants assignées, consultation des émargements, rectification de notes CC/SN et saisie des procès-verbaux.",
      iconBadge: "ENS",
      color: "border-blue-600",
      statsHighlight: "Requêtes assignées par UE",
    },
    {
      id: "administrateur",
      titre: "Scolarité Centrale & DAARS / DAF",
      roleBadge: "Administration Centrale",
      href: "/admin/scolarite",
      code: "ROLE-03",
      desc: "Contrôle des quittances de droits universitaires (50 000 FCFA), traitement global des réclamations, arrêt des listes d'examen et publication du Babillard.",
      iconBadge: "DAARS",
      color: "border-emerald-600",
      statsHighlight: "Validation des quittances & Actes",
    },
    {
      id: "webmaster",
      titre: "Webmaster & CMS Live",
      roleBadge: "Direction Communication",
      href: "/admin/webmaster",
      code: "ROLE-04",
      desc: "Gestionnaire de contenu en direct pour TOUTES les pages du site : titres, sous-titres, annonces décanales, coordonnées et fiches des départements.",
      iconBadge: "CMS",
      color: "border-amber-600",
      statsHighlight: "Édition de tout le site web",
    },
  ];

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ── BANDEAU HÉRO DE L'ADMINISTRATION ── */}
      <section className="border-b border-[#111111] bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8] inline-block"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Portail Universitaire de Gestion Intégrée
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0a0a0a] leading-tight">
                Plateforme d&apos;<span className="text-[#5A2CA8]">Administration</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/70 max-w-3xl leading-relaxed">
                Système d&apos;information et de gouvernance académique de la Faculté des Sciences (UY1).
                Accès compartimenté par profil : Le Doyen, Enseignants, DAARS / Scolarité et Webmaster CMS.
              </p>
            </div>

            {/* Carte de statut du compte connecté */}
            <div className="lg:col-span-4 border border-[#111111] bg-white p-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="text-[#0a0a0a]/50 uppercase font-bold">Session Active :</span>
                <span className="bg-[#5A2CA8] text-white px-2 py-0.5 font-bold uppercase text-[10px]">
                  {currentUser.role}
                </span>
              </div>
              <div className="space-y-1">
                <p className="font-black text-base text-[#0a0a0a]">
                  {currentUser.prenom} {currentUser.nom}
                </p>
                <p className="text-[#5A2CA8] font-bold">{currentUser.titre}</p>
                <p className="text-[#0a0a0a]/60 text-[11px]">{currentUser.email}</p>
              </div>
              <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                <span className="text-[11px] text-[#0a0a0a]/50">Code : {currentUser.matriculeOrCode}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 inline-block animate-ping"></span>
                  En ligne
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LES 4 GRANDS PÔLES D'ADMINISTRATION ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          <div className="mb-8 pb-4 border-b border-[#111111] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#5A2CA8]">Modules de Gouvernance</p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
                Sélectionnez votre espace de gestion
              </h2>
            </div>
            <p className="font-mono text-xs text-[#0a0a0a]/60">
              Chaque espace est strictement sécurisé selon vos habilitations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {roleGateways.map((gate) => (
              <div
                key={gate.id}
                className={`border border-[#111111] bg-white p-8 flex flex-col justify-between hover:border-[#5A2CA8] transition-all group ${
                  currentUser.role === gate.id ? "ring-2 ring-[#5A2CA8] bg-[#FAFAFA]" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-4">
                    <span className="bg-[#18181b] text-white px-2.5 py-1 font-bold text-[10px]">
                      {gate.code}
                    </span>
                    <span className="text-[#5A2CA8] font-bold text-[11px]">
                      {gate.statsHighlight}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0a0a0a] group-hover:text-[#5A2CA8] transition">
                    {gate.titre}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#0a0a0a]/70 leading-relaxed">
                    {gate.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#0a0a0a]/60">
                    Accès réservé : <strong className="text-[#0a0a0a]">{gate.roleBadge}</strong>
                  </span>
                  <Link
                    href={gate.href}
                    className="inline-flex items-center gap-2 bg-[#0a0a0a] group-hover:bg-[#5A2CA8] text-white px-5 py-2.5 font-mono text-xs font-bold transition shadow-sm"
                  >
                    <span>Ouvrir l&apos;espace</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ── BASCULE RAPIDE DE COMPTE DÉMO DIRECTEMENT SUR LA PAGE ── */}
          <div className="mt-12 p-8 border border-[#111111] bg-[#FAFAFA] space-y-6 font-mono">
            <div className="border-b border-black/10 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Bascule Rapide de Démonstration
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#0a0a0a] mt-1">
                Tester immédiatement avec un compte pré-configuré
              </h3>
              <p className="text-xs text-[#0a0a0a]/65 mt-1">
                Sélectionnez l&apos;un des 5 profils types pour voir instantanément l&apos;interface adaptée :
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {allAdminUsers.map((user) => {
                const isSelected = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => switchRole(user.role)}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#5A2CA8] bg-[#5A2CA8] text-white shadow-md font-bold"
                        : "border-[#111111] bg-white text-[#0a0a0a] hover:bg-black/5"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1 text-[10px]">
                      <span className={isSelected ? "text-white/80" : "text-[#5A2CA8] font-bold"}>
                        [{user.matriculeOrCode}]
                      </span>
                      <span className={`px-1.5 py-0.2 uppercase font-black ${
                        isSelected ? "bg-white text-[#5A2CA8]" : "bg-black/10 text-[#0a0a0a]"
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <p className="font-black text-sm">{user.prenom} {user.nom}</p>
                    <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? "text-white/80" : "text-[#0a0a0a]/60"}`}>
                      {user.titre}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
