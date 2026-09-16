"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "./AdminAuthProvider";
import {
  UsersIcon,
  ChevronDownIcon,
  ArrowUpRightIcon,
  CheckIcon,
  BuildingIcon,
  LockIcon,
} from "./Icons";

export default function AdminNavHeader() {
  const pathname = usePathname();
  const { currentUser, allAdminUsers, switchUser } = useAdminAuth();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const adminTabs = [
    { label: "Hub Administration", href: "/admin", code: "00" },
    { label: "Vue Décanat (Le Doyen)", href: "/admin/doyen", code: "01", badge: "Panoramique" },
    { label: "Espace Enseignant", href: "/admin/enseignant", code: "02", badge: "Requêtes & Notes" },
    { label: "Scolarité & DAARS", href: "/admin/scolarite", code: "03", badge: "Quittances" },
    { label: "Webmaster CMS", href: "/admin/webmaster", code: "04", badge: "Édition Live" },
  ];

  return (
    <div className="w-full bg-[#18181b] text-white border-b border-[#111111]">
      <div className="mx-auto max-w-content px-6 border-l border-r border-white/10">
        
        {/* Ligne 1 : Utilisateur actif & bascule rapide de rôle */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-amber-400 inline-block animate-pulse"></span>
            <span className="text-white/60 uppercase tracking-widest text-[11px] font-bold">
              PORTAIL D&apos;ADMINISTRATION :
            </span>
            <span className="font-bold text-white flex items-center gap-2">
              <span className="text-[#A78BFA]">[{currentUser.matriculeOrCode}]</span>
              <span>{currentUser.prenom} {currentUser.nom}</span>
              <span className="text-[10px] bg-[#5A2CA8] px-2 py-0.5 font-bold uppercase tracking-wider text-white">
                {currentUser.titre}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSwitchModal(true)}
              className="px-3 py-1.5 border border-white/20 bg-white/10 hover:bg-[#5A2CA8] text-white transition text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <UsersIcon className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Changer de rôle ({currentUser.role})</span>
              <ChevronDownIcon className="w-3 h-3 text-white/50" />
            </button>

            <Link
              href="/espace-etudiant"
              className="px-3 py-1.5 border border-white/20 bg-black/40 hover:bg-white/10 text-white/80 hover:text-white transition text-xs font-mono flex items-center gap-1.5"
            >
              <span>Voir Espace Étudiant</span>
              <ArrowUpRightIcon className="w-3 h-3 text-white/60" />
            </Link>
          </div>
        </div>

        {/* Ligne 2 : Navigation tabulaire entre les modules de gestion */}
        <div className="flex flex-wrap items-center gap-0 overflow-x-auto scrollbar-none font-mono text-xs">
          {adminTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-3 border-r border-white/10 font-bold transition flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-[#5A2CA8] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] text-white/40">[{tab.code}]</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 font-black uppercase ${
                      isActive ? "bg-white text-[#5A2CA8]" : "bg-[#A78BFA]/20 text-[#A78BFA]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

      </div>

      {/* Modal de sélection de profil administratif en 1 clic */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-2xl border border-[#111111] bg-white text-[#0a0a0a] p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-[#111111] pb-4">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Sélection Rapide de Profil
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0a0a0a] mt-1">
                  Changer de rôle administratif
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="text-black/40 hover:text-black font-mono text-xl p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {allAdminUsers.map((user) => {
                const isSelected = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => {
                      switchUser(user.id);
                      setShowSwitchModal(false);
                    }}
                    className={`w-full text-left p-4 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? "border-[#5A2CA8] bg-[#5A2CA8] text-white shadow-md"
                        : "border-[#111111] bg-white text-[#0a0a0a] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={isSelected ? "text-white/80 font-bold" : "text-[#5A2CA8] font-bold"}>
                          [{user.matriculeOrCode}]
                        </span>
                        <span className="font-bold text-sm">
                          {user.prenom} {user.nom}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 font-bold uppercase ${
                          isSelected ? "bg-white text-[#5A2CA8]" : "bg-black/10 text-[#0a0a0a]"
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <p className={`text-[11px] ${isSelected ? "text-white/80" : "text-[#0a0a0a]/60"}`}>
                        {user.titre} — {user.descriptionRole}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <span className="px-2.5 py-1 bg-white text-[#5A2CA8] font-bold text-[10px] uppercase">
                          Profil Actif
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 border border-[#111111] bg-[#FAFAFA] font-bold text-[10px] uppercase hover:bg-black hover:text-white">
                          Basculer
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-black/10 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="px-5 py-2.5 bg-[#0a0a0a] text-white hover:bg-[#5A2CA8] font-mono text-xs font-bold transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
