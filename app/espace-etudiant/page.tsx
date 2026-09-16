"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStudentAuth } from "@/components/StudentAuthProvider";
import {
  ArrowUpRightIcon,
  GraduationCapIcon,
  CheckIcon,
  BookOpenIcon,
  AwardIcon,
  UsersIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
} from "@/components/Icons";

export default function StudentSpaceDashboard() {
  const { currentStudent, allDemoStudents, switchDemoStudent, login } = useStudentAuth();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginFeedback, setLoginFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(inputEmail, inputPassword);
    if (res.success) {
      setLoginFeedback({ type: "success", message: res.message });
      setInputEmail("");
      setInputPassword("");
    } else {
      setLoginFeedback({ type: "error", message: res.message });
    }
  };

  return (
    <div className="w-full">
      
      {/* ── En-tête / Hero de l'Espace Étudiant ── */}
      <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-12">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
              Université de Yaoundé I · Faculté des Sciences
            </span>
            <span className="font-mono text-[10px] bg-[#5A2CA8] text-white px-2 py-0.5 font-bold">
              Espace Numérique de Travail (ENT)
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0a0a0a] leading-tight">
            Espace Étudiant &amp; <span className="font-serif italic text-[#5A2CA8]">Scolarité</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/75 max-w-3xl leading-relaxed">
            Plateforme officielle de consultation des résultats académiques, babillard des notes, guichet numérique des requêtes, gestion des démarches de scolarité et suivi des bourses d&apos;étude.
          </p>

          {/* Fiche d'identité numérique de l'étudiant connecté */}
          {currentStudent && (
            <div className="mt-8 border border-[#111111] bg-white p-6 sm:p-8 font-mono">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/10 pb-6 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#5A2CA8] block mb-1">
                    Compte Académique Actif
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                    {currentStudent.prenom} {currentStudent.nom}
                  </h2>
                  <p className="text-xs text-[#0a0a0a]/70 mt-1">
                    Email institutionnel : <span className="text-[#5A2CA8] font-bold">{currentStudent.email}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-[#111111] text-white font-bold text-xs">
                    MATRICULE : [{currentStudent.matricule}]
                  </span>
                  <span className="px-3 py-1 bg-emerald-700 text-white font-bold text-xs">
                    {currentStudent.statutInscription}
                  </span>
                </div>
              </div>

              {/* Grille des caractéristiques académiques */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs divide-x-0 sm:divide-x divide-black/10">
                <div className="pr-2">
                  <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Faculté</span>
                  <p className="font-bold text-[#0a0a0a] mt-1 truncate">Faculté des Sciences</p>
                </div>
                <div className="sm:pl-4 pr-2">
                  <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Filière / Spécialité</span>
                  <p className="font-bold text-[#5A2CA8] mt-1 truncate">{currentStudent.filiere}</p>
                </div>
                <div className="sm:pl-4 pr-2">
                  <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Niveau &amp; Cycle</span>
                  <p className="font-bold text-[#0a0a0a] mt-1">{currentStudent.niveau}</p>
                </div>
                <div className="sm:pl-4">
                  <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Quittance 50 000 FCFA</span>
                  <p className="font-bold text-[#0a0a0a] mt-1 text-[11px] truncate">
                    N° {currentStudent.quittancePaiement.numeroQuittance}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Grille Bento des Services de l'Espace Étudiant ── */}
      <section className="w-full bg-white border-b border-[#111111] py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#5A2CA8]"></span>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                Services Numériques
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
              Portail Universitaire des Démarches
            </h2>
            <p className="mt-2 text-xs font-mono text-[#0a0a0a]/60">
              Accédez directement à vos relevés de notes, déposez vos requêtes officielles ou consultez les procédures de scolarité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#111111] bg-white divide-y md:divide-y-0 divide-[#111111]">
            
            {/* Service 1 : Babillard & Notes */}
            <div className="p-8 border-r border-b border-[#111111] flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                    01 / RÉSULTATS
                  </span>
                  <span className="px-2 py-0.5 bg-[#5A2CA8] text-white font-mono text-[9px] font-black uppercase">
                    2025/2026 en direct
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Le Babillard &amp; Relevé de Notes
                </h3>
                <p className="mt-3 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                  Consultez les notes de contrôle continu (CC /30) et d&apos;examens de session normale (SN /70) par semestre et unité d&apos;enseignement. L&apos;année en cours <strong>2025/2026</strong> est affichée en premier avec accès à l&apos;historique complet.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10">
                <Link
                  href="/espace-etudiant/notes"
                  className="font-mono text-xs font-bold text-[#5A2CA8] hover:underline flex items-center justify-between"
                >
                  <span>Consulter le Babillard</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Service 2 : Requêtes Académiques */}
            <div className="p-8 border-r border-b border-[#111111] flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                    02 / RÉCLAMATIONS
                  </span>
                  <span className="px-2 py-0.5 bg-[#111111] text-white font-mono text-[9px] font-black uppercase">
                    Guichet Dématérialisé
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Guichet des Requêtes
                </h3>
                <p className="mt-3 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                  Dépôt et suivi en ligne des requêtes pour omission de note, contestation CC/SN, correction de matricule ou d&apos;état civil, demande de certificat de scolarité ou anomalie de paiement avec téléversement du reçu.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10">
                <Link
                  href="/espace-etudiant/requetes"
                  className="font-mono text-xs font-bold text-[#5A2CA8] hover:underline flex items-center justify-between"
                >
                  <span>Déposer une requête</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Service 3 : Service Scolarité */}
            <div className="p-8 border-b border-[#111111] flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                    03 / ADMINISTRATION
                  </span>
                  <span className="px-2 py-0.5 bg-black/5 text-[#0a0a0a] font-mono text-[9px] font-black uppercase">
                    Division DAARS
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Service de la Scolarité
                </h3>
                <p className="mt-3 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                  Inscriptions académiques, retrait des cartes d&apos;étudiant officielles, délivrance des attestations de réussite, certificats de scolarité et retrait des diplômes signés du Recteur.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10">
                <Link
                  href="/espace-etudiant/scolarite"
                  className="font-mono text-xs font-bold text-[#0a0a0a] hover:text-[#5A2CA8] flex items-center justify-between"
                >
                  <span>Guide de la Scolarité</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Service 4 : Calendrier Académique */}
            <div className="p-8 border-r border-b lg:border-b-0 border-[#111111] flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                    04 / CHRONOGRAMME
                  </span>
                  <span className="px-2 py-0.5 bg-black/5 text-[#0a0a0a] font-mono text-[9px] font-black uppercase">
                    Session 2025/2026
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Calendrier Académique
                </h3>
                <p className="mt-3 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                  Consultez les dates clés : rentrée solennelle, cours magistraux, travaux pratiques obligatoires, examens semestriels, sessions de rattrapage et périodes de soutenances de mémoires.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10">
                <Link
                  href="/espace-etudiant/calendrier"
                  className="font-mono text-xs font-bold text-[#0a0a0a] hover:text-[#5A2CA8] flex items-center justify-between"
                >
                  <span>Voir le calendrier complet</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Service 5 : Bourses d'étude */}
            <div className="p-8 border-r border-b lg:border-b-0 border-[#111111] flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                    05 / SOUTIEN &amp; MOBILITÉ
                  </span>
                  <span className="px-2 py-0.5 bg-black/5 text-[#0a0a0a] font-mono text-[9px] font-black uppercase">
                    Aides &amp; Allocations
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Bourses d&apos;Étude &amp; Aides
                </h3>
                <p className="mt-3 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                  Prime d&apos;excellence académique du MINESUP, bourses de recherche et mobilités scientifiques internationales (AUF, DAAD, Erasmus+, SOILGUARD), conditions d&apos;éligibilité et dossiers.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10">
                <Link
                  href="/espace-etudiant/bourses"
                  className="font-mono text-xs font-bold text-[#0a0a0a] hover:text-[#5A2CA8] flex items-center justify-between"
                >
                  <span>Modalités &amp; Candidatures</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Service 6 : Système LMD & Admission */}
            <div className="p-8 flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#5A2CA8]">
                    06 / PÉDAGOGIE
                  </span>
                  <span className="px-2 py-0.5 bg-black/5 text-[#0a0a0a] font-mono text-[9px] font-black uppercase">
                    Normes LMD
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Système LMD &amp; Admission
                </h3>
                <p className="mt-3 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                  Comprendre les crédits ECTS, la compensation semestrielle, la capitalisation des unités d&apos;enseignement et les conditions d&apos;admission en Licence ou Master à la Faculté des Sciences.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between">
                <Link
                  href="/espace-etudiant/lmd"
                  className="font-mono text-xs font-bold text-[#0a0a0a] hover:text-[#5A2CA8]"
                >
                  Guide LMD
                </Link>
                <span className="text-black/20">·</span>
                <Link
                  href="/espace-etudiant/admission"
                  className="font-mono text-xs font-bold text-[#5A2CA8] hover:underline inline-flex items-center gap-1"
                >
                  <span>Admissions</span>
                  <ArrowUpRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Section Connexion & Configuration du Compte Académique ── */}
      <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16">
        <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#111111] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
            
            {/* Colonne 1 : Règles du Compte Académique (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-6">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                  Format Institutionnel du Compte
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                  Authentification Étudiante
                </h3>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#0a0a0a]/80">
                <div className="p-4 border border-[#111111] bg-[#FAFAFA]">
                  <span className="font-bold text-[#0a0a0a] block text-sm mb-1">
                    1. Identifiant académique :
                  </span>
                  <p>
                    Format unique : <code className="bg-white px-2 py-0.5 border border-black/10 font-bold text-[#5A2CA8]">prenom.nom@facsciences-uy1.cm</code>
                  </p>
                </div>

                <div className="p-4 border border-[#111111] bg-[#FAFAFA]">
                  <span className="font-bold text-[#0a0a0a] block text-sm mb-1">
                    2. Mot de passe initial par défaut :
                  </span>
                  <p>
                    Votre <strong>numéro matricule officiel</strong> attribué lors de l&apos;inscription (ex : <code className="bg-white px-2 py-0.5 border border-black/10 font-bold text-[#0a0a0a]">22S14890</code>).
                  </p>
                </div>

                <div className="p-4 border border-[#111111] bg-[#FAFAFA]">
                  <span className="font-bold text-[#0a0a0a] block text-sm mb-1">
                    3. Droits et quittance obligatoire :
                  </span>
                  <p>
                    L&apos;accès au babillard des notes et au dépôt des requêtes exige d&apos;être en règle de ses droits universitaires (50 000 FCFA).
                  </p>
                </div>
              </div>

              {/* Boutons de bascule rapide des 3 étudiants types */}
              <div className="pt-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#0a0a0a]/50 block mb-2">
                  Bascule rapide vers un profil type (Démonstration) :
                </span>
                <div className="flex flex-wrap gap-2">
                  {allDemoStudents.map((std) => (
                    <button
                      key={std.id}
                      type="button"
                      onClick={() => switchDemoStudent(std.id)}
                      className={`px-3 py-1.5 border border-[#111111] font-mono text-xs font-bold transition cursor-pointer ${
                        currentStudent?.id === std.id
                          ? "bg-[#5A2CA8] text-white"
                          : "bg-[#FAFAFA] hover:bg-black hover:text-white"
                      }`}
                    >
                      <span>{std.prenom} {std.nom} [{std.departementCode}]</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne 2 : Formulaire de Connexion Directe (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 bg-[#FAFAFA]">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                  Connexion Sécurisée
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                  Se connecter à son compte
                </h3>
              </div>

              <form onSubmit={handleCustomLogin} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block font-bold text-[#0a0a0a] mb-1">
                    Email Académique :
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alain.kamga@facsciences-uy1.cm"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full p-3 border border-[#111111] bg-white text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#0a0a0a]/50 mt-1 block">
                    Ex : alain.kamga@facsciences-uy1.cm ou marie.fouda@facsciences-uy1.cm
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#0a0a0a] mb-1">
                    Mot de passe (Matricule par défaut) :
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="22S14890"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="w-full p-3 border border-[#111111] bg-white text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#0a0a0a]/50 mt-1 block">
                    Saisir le matricule complet (ex : 22S14890, 23S08412, 21S04892)
                  </span>
                </div>

                {loginFeedback && (
                  <div className={`p-3 border text-xs font-mono font-bold ${
                    loginFeedback.type === "success"
                      ? "bg-emerald-50 border-emerald-700 text-emerald-800"
                      : "bg-red-50 border-red-700 text-red-800"
                  }`}>
                    {loginFeedback.message}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#5A2CA8] text-white font-mono text-xs font-bold hover:bg-[#431C82] transition inline-flex items-center justify-center gap-2"
                  >
                    <span>Valider l&apos;authentification</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              <div className="pt-4 border-t border-black/10 font-mono text-[11px] text-[#0a0a0a]/60 space-y-1">
                <p>Besoin d&apos;assistance pour activer votre email académique ?</p>
                <p>
                  Contactez le Centre Informatique : <a href="mailto:ci@facsciences.uy1.cm" className="text-[#5A2CA8] font-bold hover:underline">ci@facsciences.uy1.cm</a>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
