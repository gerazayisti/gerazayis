"use client";

import React, { useState, useEffect } from "react";
import {
  SendIcon,
  CheckIcon,
  RefreshCwIcon,
  LockIcon,
  ClockIcon,
  BuildingIcon,
  MailIcon,
} from "@/components/Icons";
import { officialContactsDirectory } from "@/lib/contacts-data";

interface CaptchaProblem {
  num1: number;
  num2: number;
  operator: "+" | "-";
  answer: number;
}

export default function ContactForm() {
  const [noms, setNoms] = useState("");
  const [email, setEmail] = useState("");
  const [recipient, setRecipient] = useState("secretariat@facsciences.uy1.cm");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaProblem, setCaptchaProblem] = useState<CaptchaProblem>({
    num1: 7,
    num2: 5,
    operator: "+",
    answer: 12,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  // Générer un défi mathématique simple et anti-robot
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 15) + 5; // 5 à 19
    const n2 = Math.floor(Math.random() * 10) + 1; // 1 à 10
    const op = Math.random() > 0.4 ? "+" : "-";
    const ans = op === "+" ? n1 + n2 : n1 - n2;
    setCaptchaProblem({ num1: n1, num2: n2, operator: op, answer: ans });
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation champs requis
    if (!noms.trim()) {
      setErrorMessage("Veuillez renseigner vos Noms.");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Veuillez renseigner une adresse email valide.");
      return;
    }
    if (!sujet.trim()) {
      setErrorMessage("Le sujet de votre mail est obligatoire.");
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage("Votre message doit comporter au moins 10 caractères.");
      return;
    }

    // Validation Captcha
    const parsedCaptcha = parseInt(captchaInput.trim(), 10);
    if (isNaN(parsedCaptcha) || parsedCaptcha !== captchaProblem.answer) {
      setErrorMessage(
        `Le résultat du Captcha est incorrect (${captchaProblem.num1} ${captchaProblem.operator} ${captchaProblem.num2}). Veuillez réessayer.`
      );
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);

    // Simulation envoi sécurisé
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomRef =
        "FS-REQ-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(100000 + Math.random() * 900000);
      setReferenceCode(randomRef);
    }, 800);
  };

  const handleReset = () => {
    setNoms("");
    setEmail("");
    setSujet("");
    setMessage("");
    setCaptchaInput("");
    setErrorMessage(null);
    setIsSubmitted(false);
    generateCaptcha();
  };

  return (
    <section id="formulaire-contact" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16">
      <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
        
        {/* Titre & En-tête */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
              Transmission Directe
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight leading-none">
            Formulaire Officiel <span className="font-serif italic text-[#5A2CA8]">de Contact</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#0a0a0a]/70 leading-relaxed">
            Transmettez vos requêtes administratives, demandes de renseignements ou doléances académiques directement au Secrétariat ou au service compétent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#111111] bg-white">
          
          {/* Colonne Formulaire (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#111111]">
            
            {isSubmitted ? (
              <div className="p-8 border border-[#111111] bg-[#FAFAFA] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-600 text-white flex items-center justify-center">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-black text-[#0a0a0a] uppercase tracking-wider">
                      Message Transmis avec Succès
                    </h3>
                    <p className="text-xs text-[#0a0a0a]/70">
                      Réf. d&apos;enregistrement :{" "}
                      <span className="font-mono font-bold text-[#5A2CA8]">{referenceCode}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-black/10 bg-white text-xs space-y-2 font-mono">
                  <p>
                    <span className="text-[#0a0a0a]/50 uppercase font-bold">Émetteur :</span>{" "}
                    <span className="font-bold text-[#0a0a0a]">{noms}</span> ({email})
                  </p>
                  <p>
                    <span className="text-[#0a0a0a]/50 uppercase font-bold">Destinataire :</span>{" "}
                    <span className="font-bold text-[#5A2CA8]">{recipient}</span>
                  </p>
                  <p>
                    <span className="text-[#0a0a0a]/50 uppercase font-bold">Objet :</span>{" "}
                    <span className="text-[#0a0a0a]">{sujet}</span>
                  </p>
                </div>

                <p className="text-xs text-[#0a0a0a]/80 leading-relaxed">
                  Votre demande a été acheminée au service destinataire. Une notification a été simulée vers votre adresse email. Pour le suivi physique d&apos;un dossier, conservez la référence ci-dessus.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-[#111111] bg-[#5A2CA8] text-white text-xs font-mono font-bold hover:bg-[#431C82] transition"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Alerte d'erreur éventuelle */}
                {errorMessage && (
                  <div className="p-4 border border-red-600 bg-red-50 text-red-800 text-xs font-mono font-bold flex items-start gap-2">
                    <span className="text-base leading-none">⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Champ 1 : Noms * */}
                <div>
                  <label
                    htmlFor="contact-noms"
                    className="block font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-2"
                  >
                    Noms <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    id="contact-noms"
                    type="text"
                    required
                    value={noms}
                    onChange={(e) => setNoms(e.target.value)}
                    placeholder="Ex. OWONA Martin Paul ou NGUEMO Jeanne"
                    className="w-full border border-[#111111] bg-white px-4 py-3 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none focus:ring-1 focus:ring-[#5A2CA8]"
                  />
                </div>

                {/* Champ 2 : Votre Email * */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-2"
                  >
                    Votre Email <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex. votre.nom@univ-yaounde1.cm ou adresse@domaine.com"
                    className="w-full border border-[#111111] bg-white px-4 py-3 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none focus:ring-1 focus:ring-[#5A2CA8]"
                  />
                </div>

                {/* Champ d'aiguillage : Service Destinataire */}
                <div>
                  <label
                    htmlFor="contact-recipient"
                    className="block font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-2"
                  >
                    Service Destinataire Souhaité
                  </label>
                  <select
                    id="contact-recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full border border-[#111111] bg-white px-4 py-3 text-xs font-mono text-[#0a0a0a] focus:border-[#5A2CA8] focus:outline-none focus:ring-1 focus:ring-[#5A2CA8]"
                  >
                    <option value="secretariat@facsciences.uy1.cm">
                      [02] Secrétariat de la Faculté (secretariat@facsciences.uy1.cm)
                    </option>
                    <option value="doyen@facsciences.uy1.cm">
                      [01] Le Doyen (doyen@facsciences.uy1.cm)
                    </option>
                    <option value="scolarite@facsciences.uy1.cm">
                      [15] Service de Scolarité (scolarite@facsciences.uy1.cm)
                    </option>
                    <option value="diplome@facsciences.uy1.cm">
                      [13] Service des Diplômes (diplome@facsciences.uy1.cm)
                    </option>
                    <option value="ci@facsciences.uy1.cm">
                      [19] Cellule Informatique (ci@facsciences.uy1.cm)
                    </option>
                    <option value="support@facsciences.uy1.cm">
                      [20] Support Technique (support@facsciences.uy1.cm)
                    </option>
                    <optgroup label="Départements Académiques">
                      {officialContactsDirectory
                        .filter((c) => c.category === "departement")
                        .map((dept) => (
                          <option key={dept.id} value={dept.emails[0]}>
                            [{dept.code}] {dept.name} ({dept.emails[0]})
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Autres Services Centraux">
                      {officialContactsDirectory
                        .filter((c) => c.category === "service" && !["diplome@facsciences.uy1.cm", "scolarite@facsciences.uy1.cm"].includes(c.emails[0]))
                        .map((serv) => (
                          <option key={serv.id} value={serv.emails[0]}>
                            {serv.name} ({serv.emails[0]})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

                {/* Champ 3 : Le sujet de votre mail * */}
                <div>
                  <label
                    htmlFor="contact-sujet"
                    className="block font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-2"
                  >
                    Le sujet de votre mail <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    id="contact-sujet"
                    type="text"
                    required
                    value={sujet}
                    onChange={(e) => setSujet(e.target.value)}
                    placeholder="Ex. Demande de duplicata de relevé de notes / Renseignement admission Master"
                    className="w-full border border-[#111111] bg-white px-4 py-3 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none focus:ring-1 focus:ring-[#5A2CA8]"
                  />
                </div>

                {/* Champ 4 : Message * */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] mb-2"
                  >
                    Message <span className="text-red-600 font-bold">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Rédigez votre requête détaillée en précisant le cas échéant votre matricule, filière et niveau d'études..."
                    className="w-full border border-[#111111] bg-white p-4 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none focus:ring-1 focus:ring-[#5A2CA8] leading-relaxed resize-y"
                  ></textarea>
                </div>

                {/* Champ 5 : Captcha * */}
                <div className="p-4 border border-[#111111] bg-[#FAFAFA]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <label
                      htmlFor="contact-captcha"
                      className="font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] flex items-center gap-2"
                    >
                      <LockIcon className="w-3.5 h-3.5 text-[#5A2CA8]" />
                      <span>Captcha de Sécurité <span className="text-red-600 font-bold">*</span></span>
                    </label>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-[#111111] text-white font-mono text-sm font-black tracking-widest select-none">
                        {captchaProblem.num1} {captchaProblem.operator} {captchaProblem.num2} = ?
                      </div>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-1.5 border border-[#111111] bg-white hover:bg-gray-100 text-[#0a0a0a] transition"
                        title="Générer une nouvelle question"
                        aria-label="Recharger le captcha"
                      >
                        <RefreshCwIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#0a0a0a]/65 mb-2 font-mono">
                    Résolvez l&apos;opération arithmétique pour vérifier que vous n&apos;êtes pas un robot.
                  </p>

                  <input
                    id="contact-captcha"
                    type="number"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Entrez le résultat numérique ici..."
                    className="w-full border border-[#111111] bg-white px-4 py-2.5 text-xs font-mono text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#5A2CA8] focus:outline-none"
                  />
                </div>

                {/* Bouton d'envoi néo-brutaliste */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#5A2CA8] hover:bg-[#431C82] text-white font-mono text-xs font-black uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCwIcon className="w-4 h-4 animate-spin" />
                        <span>Transmission en cours...</span>
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Colonne latérale informative (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAFAFA] flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <div className="border-b border-[#111111] pb-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                  Recommandations Administratives
                </span>
                <h3 className="text-xl font-black text-[#0a0a0a] tracking-tight">
                  Traitement des requêtes
                </h3>
              </div>

              {/* Point 1 : Délais */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-[#0a0a0a]">
                  <ClockIcon className="w-4 h-4 text-[#5A2CA8]" />
                  <span>Délais indicatifs de réponse</span>
                </div>
                <p className="text-xs text-[#0a0a0a]/75 leading-relaxed pl-6">
                  Les courriels envoyés via ce formulaire sont acheminés sous 24h ouvrables. Le délai de réponse varie de 48h à 72h selon la nature de la demande (relevé de notes, attestation, avis pédagogique).
                </p>
              </div>

              {/* Point 2 : Pièces physiques */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-[#0a0a0a]">
                  <BuildingIcon className="w-4 h-4 text-[#5A2CA8]" />
                  <span>Dépôt physique sur site</span>
                </div>
                <p className="text-xs text-[#0a0a0a]/75 leading-relaxed pl-6">
                  Pour toute démarche nécessitant des pièces timbrées (demande manuscrite timbrée à 1 500 FCFA, photocopies certifiées), veuillez vous présenter au guichet physique de la Scolarité ou des Diplômes au Campus Principal (08h30 – 14h00).
                </p>
              </div>

              {/* Point 3 : Étudiants & Matricule */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-[#0a0a0a]">
                  <MailIcon className="w-4 h-4 text-[#5A2CA8]" />
                  <span>Précision du Matricule</span>
                </div>
                <p className="text-xs text-[#0a0a0a]/75 leading-relaxed pl-6">
                  Si vous êtes déjà étudiant inscrit à la Faculté des Sciences, veillez à toujours mentionner votre <strong>Matricule étudiant</strong> (ex. 21S12345), votre Département et votre Niveau d&apos;études (L1, L2, L3, M1, M2, D) dans le corps du message.
                </p>
              </div>
            </div>

            {/* Note de bas de panneau */}
            <div className="p-4 border border-[#111111] bg-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-emerald-600"></span>
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#0a0a0a]">
                  Plateforme Sécurisée UY1
                </span>
              </div>
              <p className="text-[11px] text-[#0a0a0a]/70 font-mono">
                Vos coordonnées sont strictement réservées au traitement administratif interne conformément aux dispositions de l&apos;Université de Yaoundé I.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
