"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStudentAuth } from "@/components/StudentAuthProvider";
import {
  REQUEST_TYPES_LIST,
  RECIPIENTS_LIST,
  RequestType,
  StudentRequest,
} from "@/lib/student-data";
import {
  ArrowUpRightIcon,
  CheckIcon,
  BookOpenIcon,
  AwardIcon,
  UsersIcon,
  ChevronDownIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
} from "@/components/Icons";

function StudentRequestsContent() {
  const searchParams = useSearchParams();
  const { currentStudent, requests, submitRequest } = useStudentAuth();

  // Onglet actif : "form" (Déposer une requête) ou "tracking" (Suivi de mes requêtes)
  const [activeTab, setActiveTab] = useState<"form" | "tracking">("form");

  // Champs du formulaire
  const [type, setType] = useState<RequestType>("probleme_note");
  const [recipientId, setRecipientId] = useState<string>("ens-bch");
  const [anneeAcademique, setAnneeAcademique] = useState<string>("2025/2026");
  const [codeUE, setCodeUE] = useState<string>("");
  const [autreTypeDetail, setAutreTypeDetail] = useState<string>("");
  const [objet, setObjet] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numeroQuittanceJoint, setNumeroQuittanceJoint] = useState<string>("");
  const [nomFichier, setNomFichier] = useState<string>("");
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Pré-remplissage depuis URL search params (ex: venu du babillard)
  useEffect(() => {
    const urlCodeUE = searchParams.get("codeUE");
    const urlType = searchParams.get("type");
    const urlIntitule = searchParams.get("intitule");

    if (urlCodeUE) {
      setCodeUE(urlCodeUE);
      setType("probleme_note");
      setObjet(`Réclamation sur la note de l'UE [${urlCodeUE}] ${urlIntitule || ""}`);
      setDescription(`Je sollicite la vérification de ma note pour l'Unité d'Enseignement ${urlCodeUE} (${urlIntitule || ""}). J'ai régulièrement composé lors de la session...`);
    }
    if (urlType === "probleme_note") {
      setType("probleme_note");
    }
  }, [searchParams]);

  // Initialisation du numéro de quittance de l'étudiant actif
  useEffect(() => {
    if (currentStudent?.quittancePaiement?.numeroQuittance) {
      setNumeroQuittanceJoint(currentStudent.quittancePaiement.numeroQuittance);
    }
  }, [currentStudent]);

  const selectedTypeObj = REQUEST_TYPES_LIST.find((t) => t.value === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalObjet = type === "autre" && autreTypeDetail
      ? `[${autreTypeDetail}] ${objet}`
      : objet;

    const ticketId = submitRequest({
      type,
      recipientId,
      anneeAcademique,
      codeUE: type === "probleme_note" ? codeUE : undefined,
      objet: finalObjet,
      description,
      nomPieceJointe: nomFichier || "quittance_droits_universitaires.pdf",
      numeroQuittanceJoint: numeroQuittanceJoint || currentStudent?.quittancePaiement.numeroQuittance || "QUIT-2025-084920",
    });

    setSubmittedTicket(ticketId);
    setActiveTab("tracking");

    // Réinitialisation partielle
    setObjet("");
    setDescription("");
    setNomFichier("");
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNomFichier(e.target.files[0].name);
    }
  };

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* Fil d'Ariane & Nav */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#0a0a0a]/60 font-bold">
            <Link href="/espace-etudiant" className="hover:text-[#5A2CA8] transition">
              Espace Étudiant
            </Link>
            <span>/</span>
            <span className="text-[#5A2CA8]">Guichet des Requêtes</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`px-3 py-1.5 border border-[#111111] font-mono text-xs font-bold transition ${
                activeTab === "form"
                  ? "bg-[#5A2CA8] text-white"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              + Déposer une Requête
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tracking")}
              className={`px-3 py-1.5 border border-[#111111] font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "tracking"
                  ? "bg-[#111111] text-white"
                  : "bg-white text-[#0a0a0a] hover:bg-gray-100"
              }`}
            >
              <span>Mes Requêtes</span>
              <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 font-black">
                {requests.length}
              </span>
            </button>
          </div>
        </div>

        {/* ── En-tête de la Page ── */}
        <div className="max-w-4xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
              Guichet Numérique Dématérialisé
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
            Requêtes Académiques &amp; <span className="text-[#5A2CA8] italic font-serif">Administratives</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed font-sans max-w-2xl">
            Système dématérialisé d&apos;enregistrement et de transmission des réclamations : contestation de note CC/SN, rectification d&apos;état civil ou de matricule, demande de certificats et régularisation de quittances.
          </p>
        </div>

        {/* Confirmation de soumission récente */}
        {submittedTicket && (
          <div className="mb-8 p-6 border border-emerald-700 bg-emerald-50 font-mono text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-black text-sm text-emerald-950">
                <CheckIcon className="w-5 h-5 text-emerald-700" />
                <span>Requête enregistrée avec succès !</span>
              </div>
              <p>
                Votre numéro de ticket officiel est : <strong className="text-[#5A2CA8] bg-white px-2 py-0.5 border border-emerald-300">[{submittedTicket}]</strong>
              </p>
              <p className="text-[11px] text-emerald-800">
                Votre dossier a été transmis pour instruction auprès de l&apos;autorité compétente. Vous pouvez suivre son évolution dans l&apos;onglet ci-dessous.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmittedTicket(null)}
              className="px-3 py-1.5 border border-emerald-700 bg-white font-bold hover:bg-emerald-700 hover:text-white transition self-start sm:self-auto"
            >
              Fermer
            </button>
          </div>
        )}

        {/* ── Onglet 1 : Formulaire de Déclaration de Requête ── */}
        {activeTab === "form" && (
          <div className="border border-[#111111] bg-white">
            
            <div className="bg-[#18181b] text-white p-5 border-b border-[#111111] font-mono">
              <span className="text-[10px] font-black uppercase text-[#A78BFA] block mb-1">
                Formulaire Officiel de Réclamation
              </span>
              <h2 className="text-xl font-black">
                Introduction d&apos;une Requête Universitaire
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8 font-mono text-xs">
              
              {/* Section 1 : Identification de l'Étudiant */}
              <div className="space-y-4">
                <div className="border-b border-black/10 pb-2">
                  <span className="font-bold text-[#5A2CA8] uppercase text-[11px] tracking-wider">
                    I. Identification de l&apos;Étudiant Requérant
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Nom &amp; Prénom :
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`${currentStudent?.nom || "KAMGA"} ${currentStudent?.prenom || "Alain"}`}
                      className="w-full p-2.5 border border-[#111111] bg-[#FAFAFA] text-[#0a0a0a] font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Numéro Matricule :
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={currentStudent?.matricule || "22S14890"}
                      className="w-full p-2.5 border border-[#111111] bg-[#FAFAFA] text-[#5A2CA8] font-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Email Académique :
                    </label>
                    <input
                      type="email"
                      readOnly
                      value={currentStudent?.email || "alain.kamga@facsciences-uy1.cm"}
                      className="w-full p-2.5 border border-[#111111] bg-[#FAFAFA] text-[#0a0a0a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px]">
                  <div>
                    <span className="text-[#0a0a0a]/50 block">Faculté :</span>
                    <strong className="text-[#0a0a0a]">Faculté des Sciences · UY1</strong>
                  </div>
                  <div>
                    <span className="text-[#0a0a0a]/50 block">Filière d&apos;attache :</span>
                    <strong className="text-[#5A2CA8]">{currentStudent?.filiere}</strong>
                  </div>
                  <div>
                    <span className="text-[#0a0a0a]/50 block">Niveau d&apos;étude :</span>
                    <strong className="text-[#0a0a0a]">{currentStudent?.niveau}</strong>
                  </div>
                </div>
              </div>

              {/* Section 2 : Caractérisation de la Requête */}
              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="border-b border-black/10 pb-2">
                  <span className="font-bold text-[#5A2CA8] uppercase text-[11px] tracking-wider">
                    II. Nature &amp; Destinataire de la Requête
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Type de requête */}
                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Type de Requête : <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as RequestType)}
                      className="w-full p-3 border border-[#111111] bg-white text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none font-bold"
                    >
                      {REQUEST_TYPES_LIST.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {/* Explication du type sélectionné */}
                    {selectedTypeObj && (
                      <div className="mt-2 p-2.5 bg-[#5A2CA8]/5 border border-[#5A2CA8]/20 text-[11px]">
                        <p className="text-[#0a0a0a]/80">
                          {selectedTypeObj.description}
                        </p>
                        <p className="mt-1 font-bold text-[#5A2CA8]">
                          📄 Pièce requise : {selectedTypeObj.pieceRequise}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Destinataire / Administration */}
                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Entité / Destinataire concerné : <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={recipientId}
                      onChange={(e) => setRecipientId(e.target.value)}
                      className="w-full p-3 border border-[#111111] bg-white text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none font-bold"
                    >
                      {RECIPIENTS_LIST.map((rec) => (
                        <option key={rec.id} value={rec.id}>
                          [{rec.category.toUpperCase()}] {rec.label}
                        </option>
                      ))}
                    </select>

                    <div className="mt-2 text-[11px] text-[#0a0a0a]/50">
                      Rôle institutionnel : {RECIPIENTS_LIST.find((r) => r.id === recipientId)?.role}
                    </div>
                  </div>

                </div>

                {/* Si 'autre', champ libre */}
                {type === "autre" && (
                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Précisez la nature personnalisée de la requête : <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Demande de transfert de filière, réclamation sur statut boursier..."
                      value={autreTypeDetail}
                      onChange={(e) => setAutreTypeDetail(e.target.value)}
                      className="w-full p-2.5 border border-[#111111] bg-white text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Année Académique */}
                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Année Académique concernée : <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={anneeAcademique}
                      onChange={(e) => setAnneeAcademique(e.target.value)}
                      className="w-full p-2.5 border border-[#111111] bg-white text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none"
                    >
                      <option value="2025/2026">2025/2026 (Année en cours)</option>
                      <option value="2024/2025">2024/2025</option>
                      <option value="2023/2024">2023/2024</option>
                    </select>
                  </div>

                  {/* Code UE si problème de note */}
                  {type === "probleme_note" && (
                    <div>
                      <label className="block font-bold text-[#0a0a0a] mb-1">
                        Code de l&apos;Unité d&apos;Enseignement (UE) : <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex : BCH 301, INF 202, ENR 401..."
                        value={codeUE}
                        onChange={(e) => setCodeUE(e.target.value)}
                        className="w-full p-2.5 border border-[#111111] bg-white text-[#0a0a0a] font-bold focus:border-[#5A2CA8] focus:outline-none uppercase"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3 : Objet et Description Détaillée */}
              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="border-b border-black/10 pb-2">
                  <span className="font-bold text-[#5A2CA8] uppercase text-[11px] tracking-wider">
                    III. Exposé des Motifs &amp; Objet de la Réclamation
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#0a0a0a] mb-1">
                    Objet de la Requête : <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Omission de note de CC en salle S03 / Demande de rectification d'orthographe patronyme"
                    value={objet}
                    onChange={(e) => setObjet(e.target.value)}
                    className="w-full p-3 border border-[#111111] bg-white text-[#0a0a0a] font-bold focus:border-[#5A2CA8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0a0a0a] mb-1">
                    Exposé Détaillé des Faits &amp; Circonstances : <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Détaillez avec exactitude les éléments utiles : date d'examen, numéro d'émargement, salle, motif précis, démarches déjà effectuées..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-[#111111] bg-white text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none font-sans text-xs leading-relaxed"
                  ></textarea>
                </div>
              </div>

              {/* Section 4 : Justificatif et Reçu d'Inscription */}
              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="border-b border-black/10 pb-2 flex items-center justify-between">
                  <span className="font-bold text-[#5A2CA8] uppercase text-[11px] tracking-wider">
                    IV. Reçu d&apos;Inscription &amp; Pièces Justificatives Obligatoires
                  </span>
                  <span className="text-[10px] text-red-600 font-bold">
                    Quittance 50 000 FCFA Obligatoire
                  </span>
                </div>

                <div className="p-4 bg-[#FAFAFA] border border-[#111111] space-y-3">
                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Numéro de Quittance d&apos;Inscription Académique (Droits 50 000 FCFA) : <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : QUIT-2025-084920"
                      value={numeroQuittanceJoint}
                      onChange={(e) => setNumeroQuittanceJoint(e.target.value)}
                      className="w-full p-2.5 border border-[#111111] bg-white text-[#0a0a0a] font-bold"
                    />
                    <span className="text-[10px] text-[#0a0a0a]/50 mt-1 block">
                      Vérifié par la Division Administrative et Financière (DAF) lors du traitement.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-[#0a0a0a] mb-1">
                      Téléverser le Reçu d&apos;Inscription ou Document Justificatif (PDF, JPG, PNG) :
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        onChange={handleSimulatedFileUpload}
                        className="text-xs font-mono file:mr-4 file:py-2 file:px-4 file:border file:border-[#111111] file:bg-[#111111] file:text-white file:font-bold file:cursor-pointer hover:file:bg-[#5A2CA8]"
                      />
                    </div>
                    {nomFichier ? (
                      <p className="text-xs text-emerald-700 font-bold mt-1">
                        ✓ Fichier joint : {nomFichier}
                      </p>
                    ) : (
                      <p className="text-[10px] text-[#0a0a0a]/50 mt-1">
                        Document par défaut attaché : <code>quittance_droits_universitaires_50000.pdf</code>
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Bouton de Soumission */}
              <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[11px] text-[#0a0a0a]/60">
                  ⚠️ En soumettant ce formulaire, vous attestez sur l&apos;honneur l&apos;exactitude des pièces et déclarations fournies.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#5A2CA8] text-white font-bold hover:bg-[#431C82] transition inline-flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
                >
                  <span>Enregistrer et Transmettre la Requête</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </div>

            </form>

          </div>
        )}

        {/* ── Onglet 2 : Suivi des Requêtes en Cours ── */}
        {activeTab === "tracking" && (
          <div className="space-y-6">
            
            <div className="p-5 border border-[#111111] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5A2CA8] block">
                  Dossiers du Compte [{currentStudent?.matricule}]
                </span>
                <h3 className="text-xl font-black text-[#0a0a0a]">
                  Historique &amp; État d&apos;Avancement des Requêtes ({requests.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className="px-4 py-2 bg-[#5A2CA8] text-white font-bold hover:bg-[#431C82] transition inline-flex items-center gap-1.5"
              >
                <span>+ Déposer une nouvelle requête</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="border border-[#111111] bg-white divide-y divide-[#111111]">
              {requests.length === 0 ? (
                <div className="p-12 text-center font-mono text-xs text-[#0a0a0a]/50">
                  Aucune requête enregistrée pour ce compte étudiant.
                </div>
              ) : (
                requests.map((req) => {
                  const recipient = RECIPIENTS_LIST.find((r) => r.id === req.recipientId);
                  return (
                    <div
                      key={req.id}
                      className="p-6 sm:p-8 space-y-4 hover:bg-[#FAFAFA] transition-colors"
                    >
                      {/* En-tête de ticket */}
                      <div className="flex flex-wrap items-center justify-between gap-3 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-[#111111] text-white font-black text-xs">
                            [{req.id}]
                          </span>
                          <span className="text-xs font-bold text-[#5A2CA8]">
                            Session {req.anneeAcademique}
                          </span>
                          {req.codeUE && (
                            <span className="px-2 py-0.5 border border-[#5A2CA8] text-[#5A2CA8] text-[10px] font-bold">
                              UE {req.codeUE}
                            </span>
                          )}
                        </div>

                        {/* Badge de Statut */}
                        <div>
                          <span className={`px-2.5 py-1 text-xs font-bold ${
                            req.statut === "Favorable / Résolue"
                              ? "bg-emerald-700 text-white"
                              : req.statut === "Transmise à l'autorité"
                              ? "bg-[#5A2CA8] text-white"
                              : req.statut === "En cours d'instruction"
                              ? "bg-amber-700 text-white"
                              : req.statut === "Rejetée"
                              ? "bg-red-700 text-white"
                              : "bg-[#111111] text-white"
                          }`}>
                            {req.statut}
                          </span>
                        </div>
                      </div>

                      {/* Titre et description */}
                      <div>
                        <h4 className="text-lg font-black text-[#0a0a0a]">
                          {req.objet}
                        </h4>
                        <p className="mt-2 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                          {req.description}
                        </p>
                      </div>

                      {/* Métadonnées */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px] text-[#0a0a0a]/70 border-t border-black/10">
                        <div>
                          <span className="text-[#0a0a0a]/40 block">Destinataire :</span>
                          <strong className="text-[#0a0a0a]">{recipient?.label || "Administration UY1"}</strong>
                        </div>
                        <div>
                          <span className="text-[#0a0a0a]/40 block">Date de dépôt :</span>
                          <strong>{req.dateDepot}</strong>
                        </div>
                        <div>
                          <span className="text-[#0a0a0a]/40 block">Pièce jointe &amp; Quittance :</span>
                          <span className="truncate block text-[#5A2CA8] font-bold">
                            {req.nomPieceJointe} ({req.numeroQuittanceJoint})
                          </span>
                        </div>
                      </div>

                      {/* Réponse officielle si présente */}
                      {req.reponseOfficielle && (
                        <div className="p-4 bg-[#FAFAFA] border-l-2 border-[#5A2CA8] font-mono text-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-[#5A2CA8] font-black uppercase">
                            <span>Réponse Officielle de l&apos;Administration :</span>
                            <span>{req.dateReponse || req.dateDepot}</span>
                          </div>
                          <p className="text-[#0a0a0a] font-bold">
                            {req.reponseOfficielle}
                          </p>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function StudentRequestsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Chargement du Guichet des Requêtes...</div>}>
      <StudentRequestsContent />
    </Suspense>
  );
}
