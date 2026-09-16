"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  StudentAccount,
  DEMO_STUDENTS,
  StudentRequest,
  INITIAL_STUDENT_REQUESTS,
  GRADES_KAMGA,
  AcademicYearGrades,
} from "@/lib/student-data";

interface StudentAuthContextType {
  currentStudent: StudentAccount | null;
  allDemoStudents: StudentAccount[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  switchDemoStudent: (studentId: string) => void;
  requests: StudentRequest[];
  submitRequest: (data: {
    type: StudentRequest["type"];
    recipientId: string;
    anneeAcademique: string;
    codeUE?: string;
    objet: string;
    description: string;
    nomPieceJointe: string;
    numeroQuittanceJoint: string;
  }) => string;
  getStudentGrades: (studentId: string) => AcademicYearGrades[];
}

const StudentAuthContext = createContext<StudentAuthContextType | undefined>(undefined);

export function StudentAuthProvider({ children }: { children: ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<StudentAccount | null>(DEMO_STUDENTS[0]);
  const [requests, setRequests] = useState<StudentRequest[]>(INITIAL_STUDENT_REQUESTS);
  const [isClient, setIsClient] = useState(false);

  // Initialisation côté client (localStorage)
  useEffect(() => {
    setIsClient(true);
    try {
      const savedStudentId = localStorage.getItem("facsciences_current_student_id");
      if (savedStudentId) {
        const found = DEMO_STUDENTS.find((s) => s.id === savedStudentId);
        if (found) setCurrentStudent(found);
      }
      const savedRequests = localStorage.getItem("facsciences_student_requests");
      if (savedRequests) {
        setRequests(JSON.parse(savedRequests));
      }
    } catch {
      // Ignorer erreurs de lecture de storage
    }
  }, []);

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const student = DEMO_STUDENTS.find(
      (s) => s.email.toLowerCase() === cleanEmail
    );

    if (!student) {
      return {
        success: false,
        message: "Aucun compte étudiant trouvé pour cet email académique.",
      };
    }

    // Le mot de passe par défaut est le matricule officiel
    if (student.passwordDefault !== cleanPass && student.matricule !== cleanPass) {
      return {
        success: false,
        message: "Mot de passe incorrect. Le mot de passe par défaut est votre numéro matricule (ex: " + student.matricule + ").",
      };
    }

    setCurrentStudent(student);
    try {
      localStorage.setItem("facsciences_current_student_id", student.id);
    } catch {}

    return {
      success: true,
      message: `Connexion réussie. Bienvenue, ${student.prenom} ${student.nom} !`,
    };
  };

  const logout = () => {
    setCurrentStudent(null);
    try {
      localStorage.removeItem("facsciences_current_student_id");
    } catch {}
  };

  const switchDemoStudent = (studentId: string) => {
    const target = DEMO_STUDENTS.find((s) => s.id === studentId);
    if (target) {
      setCurrentStudent(target);
      try {
        localStorage.setItem("facsciences_current_student_id", target.id);
      } catch {}
    }
  };

  const submitRequest = (data: {
    type: StudentRequest["type"];
    recipientId: string;
    anneeAcademique: string;
    codeUE?: string;
    objet: string;
    description: string;
    nomPieceJointe: string;
    numeroQuittanceJoint: string;
  }) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `REQ-2026-${randomNum}`;
    const today = new Date();
    const dateFormatted = `${today.getDate()} ${
      [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ][today.getMonth()]
    } ${today.getFullYear()}`;

    const newRequest: StudentRequest = {
      id: newId,
      studentId: currentStudent?.id || "std-01",
      dateDepot: dateFormatted,
      type: data.type,
      recipientId: data.recipientId,
      anneeAcademique: data.anneeAcademique,
      codeUE: data.codeUE,
      objet: data.objet,
      description: data.description,
      nomPieceJointe: data.nomPieceJointe || "quittance_inscription_50000.pdf",
      numeroQuittanceJoint: data.numeroQuittanceJoint || currentStudent?.quittancePaiement.numeroQuittance || "QUIT-2025-084920",
      statut: "Enregistrée",
      reponseOfficielle: "Votre requête a été enregistrée avec succès. Elle sera transmise pour instruction sous 48h ouvrées.",
      dateReponse: dateFormatted,
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    try {
      localStorage.setItem("facsciences_student_requests", JSON.stringify(updated));
    } catch {}

    return newId;
  };

  const getStudentGrades = (studentId: string) => {
    // Dans notre prototype, nous fournissons la base multi-années détaillée pour Alain KAMGA
    // et nous adaptons l'en-tête pour les autres profils
    if (studentId === "std-02") {
      return [
        {
          anneeAcademique: "2025/2026",
          isCurrent: true,
          niveau: "Licence 2 (L2)",
          filiere: "Informatique — Systèmes d'Information & Génie Logiciel (SIGL)",
          decisionJury: "Semestre 3 Validé — Semestre 4 en cours",
          dateDeliberation: "10 Février 2026",
          mgpAnnuelle: 3.58,
          creditsValidesTotal: 30,
          creditsInscritsTotal: 60,
          semestres: [
            {
              semestreCode: "S3",
              semestreLabel: "Semestre 3 (Harmattan)",
              periode: "Octobre 2025 – Février 2026",
              totalCreditsInscrits: 30,
              totalCreditsValides: 30,
              mgpSemestre: 3.58,
              unitesEnseignement: [
                { codeUE: "INF 201", intitule: "Algorithmique & Structures de Données Avancées", credits: 6, noteCC: 27.0, noteSN: 58.0, noteFinale: 85.0, grade: "A", statut: "Validé", enseignantResponsable: "Dr BILOA" },
                { codeUE: "INF 202", intitule: "Bases de Données Relationnelles & SQL", credits: 6, noteCC: 25.5, noteSN: 54.0, noteFinale: 79.5, grade: "A", statut: "Validé", enseignantResponsable: "Pr TCHOUKEU" },
                { codeUE: "INF 203", intitule: "Architecture des Ordinateurs & Systèmes d'Exploitation", credits: 6, noteCC: 23.0, noteSN: 50.0, noteFinale: 73.0, grade: "B+", statut: "Validé", enseignantResponsable: "Dr NANA" },
                { codeUE: "MAT 205", intitule: "Mathématiques pour l'Informatique & Graphes", credits: 6, noteCC: 22.0, noteSN: 48.0, noteFinale: 70.0, grade: "B+", statut: "Validé", enseignantResponsable: "Département Mathématiques" },
                { codeUE: "INF 211", intitule: "TP de Programmation Web & Objets (Java / C++)", credits: 6, noteCC: 28.0, noteSN: 59.0, noteFinale: 87.0, grade: "A", statut: "Validé", enseignantResponsable: "Laboratoire Pédagogique INF" },
              ],
            },
          ],
        },
      ];
    }

    if (studentId === "std-03") {
      return [
        {
          anneeAcademique: "2025/2026",
          isCurrent: true,
          niveau: "Master 1 (M1)",
          filiere: "Énergie Renouvelable — Option Solaire Photovoltaïque",
          decisionJury: "Semestre 1 Validé avec Mention Bien — Semestre 2 en cours",
          dateDeliberation: "14 Février 2026",
          mgpAnnuelle: 3.65,
          creditsValidesTotal: 30,
          creditsInscritsTotal: 60,
          semestres: [
            {
              semestreCode: "S1",
              semestreLabel: "Semestre 1 (Master 1)",
              periode: "Octobre 2025 – Février 2026",
              totalCreditsInscrits: 30,
              totalCreditsValides: 30,
              mgpSemestre: 3.65,
              unitesEnseignement: [
                { codeUE: "ENR 401", intitule: "Gisement Solaire & Physique des Semi-conducteurs", credits: 6, noteCC: 26.5, noteSN: 56.5, noteFinale: 83.0, grade: "A", statut: "Validé", enseignantResponsable: "Dr NDJAKA" },
                { codeUE: "ENR 402", intitule: "Conversion Photovoltaïque & Onduleurs Hybrides", credits: 6, noteCC: 25.0, noteSN: 53.0, noteFinale: 78.0, grade: "A", statut: "Validé", enseignantResponsable: "Pr TCHUENTE" },
                { codeUE: "ENR 403", intitule: "Stockage Électrochimique & Batteries Lithium-Ion", credits: 6, noteCC: 24.0, noteSN: 51.0, noteFinale: 75.0, grade: "B+", statut: "Validé", enseignantResponsable: "Dr FOGANG" },
                { codeUE: "ENR 404", intitule: "Dimensionnement Technique & Logiciels Solaires (PVsyst)", credits: 6, noteCC: 28.0, noteSN: 60.0, noteFinale: 88.0, grade: "A", statut: "Validé", enseignantResponsable: "Ingénieurs Filière ENR" },
                { codeUE: "ENR 411", intitule: "Banc d'Essai Expérimental sur Modules & Réseaux", credits: 6, noteCC: 27.0, noteSN: 58.0, noteFinale: 85.0, grade: "A", statut: "Validé", enseignantResponsable: "Plateforme Solaire UY1" },
              ],
            },
          ],
        },
      ];
    }

    return GRADES_KAMGA;
  };

  return (
    <StudentAuthContext.Provider
      value={{
        currentStudent,
        allDemoStudents: DEMO_STUDENTS,
        isAuthenticated: !!currentStudent,
        login,
        logout,
        switchDemoStudent,
        requests,
        submitRequest,
        getStudentGrades,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error("useStudentAuth must be used within a StudentAuthProvider");
  }
  return context;
}
