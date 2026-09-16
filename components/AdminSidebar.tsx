"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "./AdminAuthProvider";
import {
  UsersIcon,
  ChevronDownIcon,
  ArrowUpRightIcon,
  CheckIcon,
  BuildingIcon,
  FileTextIcon,
  GraduationCapIcon,
  LockIcon,
  GlobeIcon,
} from "./Icons";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { currentUser, allAdminUsers, switchUser } = useAdminAuth();
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Hub d'Administration", href: "/admin", code: "00", iconBadge: "HUB" },
    { label: "Vue Décanat (Le Doyen)", href: "/admin/doyen", code: "01", iconBadge: "DY", badge: "Panoramique" },
    { label: "Espace Enseignant", href: "/admin/enseignant", code: "02", iconBadge: "ENS", badge: "Requêtes & Notes" },
    { label: "Scolarité & DAARS", href: "/admin/scolarite", code: "03", iconBadge: "DAARS", badge: "Quittances" },
    { label: "Webmaster CMS Live", href: "/admin/webmaster", code: "04", iconBadge: "CMS", badge: "Édition" },
  ];

  return (
    <>
      {/* ── BARRE MOBILE (visible uniquement sur écran < lg) ── */}
      <div className="lg:hidden w-full bg-[#18181b] text-white border-b border-[#111111] px-4 py-3 flex items-center justify-between z-40 sticky top-0">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image
            src="/logo/LOGO.svg"
            alt="Logo FS"
            width={28}
            height={36}
            className="object-contain"
          />
          <div>
            <span className="block text-xs font-black uppercase text-white leading-tight">
              Faculté des Sciences
            </span>
            <span className="block text-[10px] font-mono text-white/50 uppercase">
              Portail d&apos;Administration
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 border border-white/20 bg-white/5 text-white font-mono text-xs font-bold"
        >
          {isMobileOpen ? "FERMER ✕" : "MENU ☰"}
        </button>
      </div>

      {/* ── SIDEBAR DESKTOP & TIROIR MOBILE ── */}
      <aside
        className={`w-72 shrink-0 bg-[#18181b] text-white border-r border-[#111111] flex flex-col justify-between z-50 transition-all ${
          isMobileOpen ? "fixed inset-y-0 left-0 flex shadow-2xl" : "hidden lg:flex"
        } lg:sticky lg:top-0 lg:h-screen`}
      >
        {/* En-tête de la Sidebar */}
        <div className="flex flex-col">
          {/* Logo officiel & Raison sociale */}
          <div className="p-6 border-b border-white/10 bg-[#111111]">
            <Link href="/" className="flex items-center gap-3.5 group">
              <Image
                src="/logo/LOGO.svg"
                alt="Logo Faculté des Sciences"
                width={36}
                height={46}
                className="object-contain group-hover:scale-105 transition-transform"
              />
              <div className="leading-tight">
                <span className="block text-xs font-black uppercase tracking-tight text-white">
                  Faculté des Sciences
                </span>
                <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#A78BFA]">
                  Université de Yaoundé I
                </span>
                <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest bg-[#5A2CA8] px-1.5 py-0.2 mt-1 text-white">
                  Back-Office Intégré
                </span>
              </div>
            </Link>
          </div>

          {/* Fiche Utilisateur Actif & Sélecteur */}
          <div className="p-4 border-b border-white/10 bg-white/5 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 inline-block animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold text-white/50">Profil en cours :</span>
              </div>
              <span className="text-[10px] bg-[#5A2CA8] px-2 py-0.5 font-bold uppercase text-white">
                {currentUser.role}
              </span>
            </div>

            <div className="pt-1">
              <p className="font-bold text-sm text-white">
                {currentUser.prenom} {currentUser.nom}
              </p>
              <p className="text-[11px] text-[#A78BFA] font-medium line-clamp-1">
                {currentUser.titre}
              </p>
              <p className="text-[10px] text-white/50 mt-0.5">
                Identifiant : [{currentUser.matriculeOrCode}]
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSwitchModal(true)}
              className="w-full mt-2 py-1.5 px-2.5 border border-white/20 bg-white/10 hover:bg-[#5A2CA8] text-white font-bold text-[11px] flex items-center justify-between transition cursor-pointer shadow-sm"
            >
              <span className="flex items-center gap-1.5">
                <UsersIcon className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Changer de compte</span>
              </span>
              <ChevronDownIcon className="w-3 h-3 text-white/50" />
            </button>
          </div>

          {/* Menu de Navigation */}
          <nav className="p-3 space-y-1 font-mono text-xs">
            <p className="px-3 py-2 text-[10px] uppercase font-bold text-white/40 tracking-wider">
              Modules de Gestion :
            </p>

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between p-3 border transition ${
                    isActive
                      ? "border-[#5A2CA8] bg-[#5A2CA8] text-white font-bold shadow-md"
                      : "border-transparent text-white/75 hover:text-white hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-bold ${isActive ? "text-white/70" : "text-[#A78BFA]"}`}>
                      [{item.code}]
                    </span>
                    <span className="text-xs">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 uppercase font-black ${
                        isActive ? "bg-white text-[#5A2CA8]" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pied de la Sidebar : Liens vers le portail public */}
        <div className="p-4 border-t border-white/10 bg-[#111111] font-mono text-xs space-y-2">
          <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
            Accès Extérieur :
          </p>

          <Link
            href="/espace-etudiant"
            className="w-full flex items-center justify-between p-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition text-[11px]"
          >
            <span className="flex items-center gap-2">
              <GraduationCapIcon className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Espace Étudiant</span>
            </span>
            <ArrowUpRightIcon className="w-3 h-3 text-white/50" />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-between p-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition text-[11px]"
          >
            <span className="flex items-center gap-2">
              <GlobeIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Retour au Site Public</span>
            </span>
            <ArrowUpRightIcon className="w-3 h-3 text-white/50" />
          </Link>
        </div>
      </aside>

      {/* Modal de sélection de profil administratif en 1 clic */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 font-mono text-xs">
          <div className="w-full max-w-2xl border border-[#111111] bg-white text-[#0a0a0a] p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-[#111111] pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Sélection Rapide de Profil
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0a0a0a] mt-1">
                  Changer de rôle administratif
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="text-black/40 hover:text-black text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
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
                className="px-5 py-2.5 bg-[#0a0a0a] text-white hover:bg-[#5A2CA8] font-bold transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
