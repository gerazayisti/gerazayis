"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStudentAuth } from "./StudentAuthProvider";
import {
  ArrowUpRightIcon,
  GraduationCapIcon,
  UsersIcon,
  CheckIcon,
  ChevronDownIcon,
  LockIcon,
} from "./Icons";

export default function StudentNavHeader() {
  const pathname = usePathname();
  const { currentStudent, allDemoStudents, switchDemoStudent, logout } = useStudentAuth();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const navLinks = [
    { label: "Vue d'ensemble", href: "/espace-etudiant", code: "01" },
    { label: "Babillard & Notes", href: "/espace-etudiant/notes", code: "02", badge: "Résultats" },
    { label: "Requêtes Académiques", href: "/espace-etudiant/requetes", code: "03", badge: "Guichet" },
    { label: "Service Scolarité", href: "/espace-etudiant/scolarite", code: "04" },
    { label: "Calendrier Académique", href: "/espace-etudiant/calendrier", code: "05" },
    { label: "Bourses & Aides", href: "/espace-etudiant/bourses", code: "06" },
  ];

  return (
    <div className="w-full bg-[#18181b] text-white border-b border-[#111111]">
      <div className="mx-auto max-w-content px-6 border-l border-r border-white/10">
        
        {/* Ligne 1 : Statut du compte étudiant connecté */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 font-mono text-xs">
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-400 inline-block animate-pulse"></span>
            <span className="text-white/60">PORTAIL ÉTUDIANT :</span>
            {currentStudent ? (
              <span className="font-bold text-white flex items-center gap-2">
                <span className="text-[#A78BFA]">[{currentStudent.matricule}]</span>
                <span>{currentStudent.prenom} {currentStudent.nom}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 text-white/80">
                  {currentStudent.niveau} · {currentStudent.departementCode}
                </span>
              </span>
            ) : (
              <span className="text-white/50 italic">Non connecté</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSwitchModal(true)}
              className="px-2.5 py-1 border border-white/20 bg-white/5 hover:bg-[#5A2CA8] text-white transition text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <UsersIcon className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Changer de compte ({currentStudent?.prenom})</span>
              <ChevronDownIcon className="w-3 h-3 text-white/50" />
            </button>
          </div>

        </div>

        {/* Ligne 2 : Navigation tabulaire entre sous-pages */}
        <div className="flex flex-wrap items-center gap-0 overflow-x-auto scrollbar-none font-mono text-xs">
          {navLinks.map((tab) => {
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
                  <span className={`text-[9px] px-1 py-0.2 font-black uppercase ${
                    isActive ? "bg-white text-[#5A2CA8]" : "bg-[#A78BFA]/20 text-[#A78BFA]"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

      </div>

      {/* Modal / Tiroir de sélection de profil de démonstration */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-lg border border-[#111111] bg-white text-[#0a0a0a] p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#111111] pb-4">
              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                  Comptes Académiques Étudiants · UY1
                </span>
                <h3 className="text-xl font-black text-[#0a0a0a]">
                  Sélectionner un Profil Étudiant
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="w-8 h-8 border border-[#111111] bg-[#FAFAFA] font-mono font-bold hover:bg-black hover:text-white transition flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-[#5A2CA8]/5 border border-[#5A2CA8]/20 font-mono text-xs text-[#0a0a0a]/80 space-y-1">
              <p>
                <strong>Format officiel de compte :</strong> Email académique (<code>prenom.nom@facsciences-uy1.cm</code>)
              </p>
              <p>
                <strong>Mot de passe par défaut :</strong> Le numéro matricule de l&apos;étudiant.
              </p>
            </div>

            <div className="space-y-3">
              {allDemoStudents.map((std) => {
                const isSelected = currentStudent?.id === std.id;
                return (
                  <div
                    key={std.id}
                    onClick={() => {
                      switchDemoStudent(std.id);
                      setShowSwitchModal(false);
                    }}
                    className={`p-4 border border-[#111111] cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? "bg-[#5A2CA8] text-white"
                        : "bg-[#FAFAFA] hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-mono text-[10px] font-black px-1.5 py-0.5 ${
                          isSelected ? "bg-white text-[#5A2CA8]" : "bg-[#111111] text-white"
                        }`}>
                          [{std.matricule}]
                        </span>
                        <span className="font-black text-sm">
                          {std.prenom} {std.nom}
                        </span>
                      </div>
                      <p className={`text-xs font-mono truncate ${
                        isSelected ? "text-white/80" : "text-[#0a0a0a]/60"
                      }`}>
                        {std.email}
                      </p>
                      <p className={`text-[11px] mt-1 ${
                        isSelected ? "text-white/90" : "text-[#0a0a0a]/75"
                      }`}>
                        {std.filiere} — {std.niveau}
                      </p>
                    </div>

                    <div className="text-right">
                      {isSelected ? (
                        <span className="px-2 py-1 bg-white text-[#5A2CA8] font-mono text-[10px] font-bold">
                          Actif
                        </span>
                      ) : (
                        <span className="px-2 py-1 border border-[#111111] bg-white font-mono text-[10px] font-bold">
                          Choisir
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="px-4 py-2 border border-[#111111] bg-white font-mono text-xs font-bold hover:bg-[#111111] hover:text-white transition"
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
