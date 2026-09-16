// Base de données et modèles pour l'Espace Étudiant de la Faculté des Sciences - UY1

export interface StudentAccount {
  id: string;
  nom: string;
  prenom: string;
  matricule: string; // Sert de mot de passe par défaut
  email: string; // Format : prenom.nom@facsciences-uy1.cm
  passwordDefault: string; // Identique au matricule
  faculte: string;
  departementCode: string;
  filiere: string;
  cycle: string;
  niveau: string;
  anneeAcademique: string;
  statutInscription: "Inscrit · À jour des droits" | "Préinscrit" | "En attente de paiement";
  quittancePaiement: {
    numeroQuittance: string;
    montant: string;
    datePaiement: string;
    banque: string;
    agence: string;
  };
  telephone: string;
  dateNaissance: string;
  lieuNaissance: string;
}

export interface CourseGrade {
  codeUE: string;
  intitule: string;
  credits: number;
  noteCC: number; // Sur 30
  noteSN: number; // Sur 70
  noteFinale: number; // Sur 100
  grade: "A" | "B+" | "B" | "C+" | "C" | "D" | "E" | string;
  statut: "Validé" | "Rattrapage" | "Non Validé" | string;
  enseignantResponsable: string;
}

export interface SemesterGrades {
  semestreCode: string;
  semestreLabel: string;
  periode: string;
  unitesEnseignement: CourseGrade[];
  totalCreditsInscrits: number;
  totalCreditsValides: number;
  mgpSemestre: number; // Sur 4.00
}

export interface GradeScaleItem {
  range: string;
  grade: string;
  points: number;
  mention: string;
  decision: string;
}

export const GRADING_SCALE: GradeScaleItem[] = [
  { range: "80 et plus", grade: "A", points: 4.00, mention: "Très bien", decision: "Validé (Capitalisé & Transférable)" },
  { range: "75 — 79", grade: "A-", points: 3.70, mention: "Bien", decision: "Validé (Capitalisé & Transférable)" },
  { range: "70 — 74", grade: "B+", points: 3.30, mention: "Bien", decision: "Validé (Capitalisé & Transférable)" },
  { range: "65 — 69", grade: "B", points: 3.00, mention: "Assez bien", decision: "Validé (Capitalisé & Transférable)" },
  { range: "60 — 64", grade: "B-", points: 2.70, mention: "Assez bien", decision: "Validé (Capitalisé & Transférable)" },
  { range: "55 — 59", grade: "C+", points: 2.30, mention: "Passable", decision: "Validé (Capitalisé & Transférable)" },
  { range: "50 — 54", grade: "C", points: 2.00, mention: "Passable", decision: "Validé (Capitalisé & Transférable)" },
  { range: "45 — 49", grade: "C-", points: 1.70, mention: "Crédits capitalisés non transférables", decision: "Capitalisé non transférable" },
  { range: "40 — 44", grade: "D+", points: 1.30, mention: "Crédits capitalisés non transférables", decision: "Capitalisé non transférable" },
  { range: "35 — 39", grade: "D", points: 1.00, mention: "Crédits capitalisés non transférables", decision: "Capitalisé non transférable" },
  { range: "30 — 34", grade: "E", points: 0.00, mention: "Échec", decision: "Échec / Non Validé" },
  { range: "00 — 29", grade: "F", points: 0.00, mention: "Échec", decision: "Échec / Non Validé" },
];

export interface StudentAttitudeSymbol {
  code: string;
  signification: string;
  description: string;
}

export const STUDENT_ATTITUDE_SYMBOLS: StudentAttitudeSymbol[] = [
  { code: "I", signification: "Incomplet", description: "Absence à l'examen due à une raison acceptée par l'autorité académique." },
  { code: "A", signification: "Abandon", description: "Absence non justifiée à l'examen." },
  { code: "S", signification: "Suspension", description: "Autorisation accordée par le Doyen à ne pas se présenter à l'examen." },
  { code: "R", signification: "Reprise ou redoublement", description: "UE reprise. Les deux notes apparaissent au relevé, la dernière note est utilisée pour la MGP." },
  { code: "AL", signification: "Audition libre", description: "Inscription à titre d'auditeur libre (crédits non capitalisables pour le diplôme)." },
];

export interface AcademicYearGrades {
  anneeAcademique: string; // "2025/2026", "2024/2025", "2023/2024"
  isCurrent: boolean; // true pour 2025/2026 (affiché en premier)
  niveau: string;
  filiere: string;
  semestres: SemesterGrades[];
  mgpAnnuelle: number;
  creditsValidesTotal: number;
  creditsInscritsTotal: number;
  decisionJury: string;
  dateDeliberation: string;
}

export type RequestType =
  | "probleme_note"
  | "correction_matricule"
  | "correction_nom"
  | "certificat_scolarite"
  | "probleme_paiement"
  | "autre";

export interface RequestTypeOption {
  value: RequestType;
  label: string;
  description: string;
  pieceRequise: string;
}

export const REQUEST_TYPES_LIST: RequestTypeOption[] = [
  {
    value: "probleme_note",
    label: "Problème de note (Omission, erreur de saisie ou contestation CC/SN)",
    description: "Note manquante sur le procès-verbal d'examen, discordance entre la copie et la note affichée ou réclamation sur le CC/SN.",
    pieceRequise: "Reçu de paiement des droits + Copie d'émargement / reçu de composition ou copie du cahier de TP",
  },
  {
    value: "correction_matricule",
    label: "Correction de matricule erroné",
    description: "Anomalie constatée sur le numéro matricule officiel figurant sur les listes de classe ou relevés.",
    pieceRequise: "Reçu d'inscription officielle + Fiche de préinscription originale",
  },
  {
    value: "correction_nom",
    label: "Correction de nom, prénom ou état civil",
    description: "Faute d'orthographe sur le patronyme, inversion nom/prénom ou omission de date de naissance.",
    pieceRequise: "Reçu d'inscription + Copie certifiée conforme de l'Acte de Naissance + Relevé du Baccalauréat",
  },
  {
    value: "certificat_scolarite",
    label: "Demande de certificat de scolarité ou attestation d'inscription",
    description: "Délivrance expresse d'un document officiel pour les dossiers de bourse, visa ou concours administratifs.",
    pieceRequise: "Quittance de paiement des droits universitaires (50 000 FCFA) + Carte d'étudiant ou récépissé",
  },
  {
    value: "probleme_paiement",
    label: "Problème avec paiements / Quittance des droits universitaires",
    description: "Paiement non validé dans le système informatique central malgré le versement bancaire effectif.",
    pieceRequise: "Bordereau de versement bancaire original ou reçu officiel de paiement agréé",
  },
  {
    value: "autre",
    label: "Autre requête personnalisée",
    description: "Toute autre requête académique ou administrative spécifique à expliciter dans la description.",
    pieceRequise: "Reçu officiel d'inscription + Pièces justificatives au choix de l'étudiant",
  },
];

export interface RecipientEntity {
  id: string;
  category: "enseignant" | "departement" | "direction" | "administration";
  label: string;
  role: string;
}

export const RECIPIENTS_LIST: RecipientEntity[] = [
  { id: "ens-bch", category: "enseignant", label: "Enseignant Responsable d'UE (Biochimie)", role: "Professeur / Chargé de Cours" },
  { id: "ens-inf", category: "enseignant", label: "Enseignant Responsable d'UE (Informatique)", role: "Professeur / Maître de Conférences" },
  { id: "ens-enr", category: "enseignant", label: "Enseignant Responsable d'UE (Énergie Renouvelable)", role: "Responsable Pédagogique Solaire" },
  { id: "ens-gen", category: "enseignant", label: "Autre Enseignant de la Faculté", role: "Corps professoral" },
  { id: "dept-bch", category: "departement", label: "Département de Biochimie (Chef de Dépt & Secrétariat)", role: "Secrétariat Pédagogique [BCH]" },
  { id: "dept-inf", category: "departement", label: "Département d'Informatique (Chef de Dépt & Secrétariat)", role: "Secrétariat Pédagogique [INF]" },
  { id: "dept-enr", category: "departement", label: "Département d'Énergie Renouvelable", role: "Coordination Pédagogique [ENR]" },
  { id: "daars", category: "administration", label: "Division des Affaires Académiques, de la Recherche et de la Scolarité (DAARS)", role: "Gestion centrale de la scolarité" },
  { id: "daf", category: "administration", label: "Division Administrative et Financière (DAF / Intendance)", role: "Comptabilité et validation des quittances" },
  { id: "dpsaa", category: "direction", label: "Vice-Décanat / DPSAA (Programmation & Suivi Académique)", role: "Supervision des examens et jurys" },
  { id: "decanat", category: "direction", label: "Décanat de la Faculté des Sciences (Le Doyen)", role: "Haute autorité facultaire" },
];

export interface StudentRequest {
  id: string; // Ex: "REQ-2026-0482"
  studentId: string;
  dateDepot: string;
  type: RequestType;
  recipientId: string;
  anneeAcademique: string;
  codeUE?: string;
  objet: string;
  description: string;
  nomPieceJointe: string;
  numeroQuittanceJoint: string;
  statut:
    | "Enregistrée"
    | "En cours d'instruction"
    | "En instruction"
    | "Transmise à l'autorité"
    | "Favorable / Résolue"
    | "Rejetée"
    | "Défavorable / Rejetée"
    | string;
  reponseOfficielle?: string;
  dateReponse?: string;
}

// ── Données des Étudiants de Démonstration ──

export const DEMO_STUDENTS: StudentAccount[] = [
  {
    id: "std-01",
    nom: "KAMGA",
    prenom: "Alain",
    matricule: "22S14890",
    email: "alain.kamga@facsciences-uy1.cm",
    passwordDefault: "22S14890",
    faculte: "Faculté des Sciences · Université de Yaoundé I",
    departementCode: "BCH",
    filiere: "Biochimie Fondamentale",
    cycle: "Licence",
    niveau: "Licence 3 (L3)",
    anneeAcademique: "2025/2026",
    statutInscription: "Inscrit · À jour des droits",
    quittancePaiement: {
      numeroQuittance: "QUIT-2025-084920",
      montant: "50 000 FCFA",
      datePaiement: "08 Octobre 2025",
      banque: "Afriland First Bank",
      agence: "Guichet Campus UY1 — Plateau Atemengue",
    },
    telephone: "(+237) 699 45 12 80",
    dateNaissance: "14 Mars 2003",
    lieuNaissance: "Yaoundé",
  },
  {
    id: "std-02",
    nom: "FOUDA",
    prenom: "Marie",
    matricule: "23S08412",
    email: "marie.fouda@facsciences-uy1.cm",
    passwordDefault: "23S08412",
    faculte: "Faculté des Sciences · Université de Yaoundé I",
    departementCode: "INF",
    filiere: "Informatique — Systèmes d'Information & Génie Logiciel (SIGL)",
    cycle: "Licence",
    niveau: "Licence 2 (L2)",
    anneeAcademique: "2025/2026",
    statutInscription: "Inscrit · À jour des droits",
    quittancePaiement: {
      numeroQuittance: "QUIT-2025-091422",
      montant: "50 000 FCFA",
      datePaiement: "15 Octobre 2025",
      banque: "Commercial Bank of Cameroon (CBC)",
      agence: "Agence Yaoundé Melen",
    },
    telephone: "(+237) 677 34 89 01",
    dateNaissance: "22 Juillet 2004",
    lieuNaissance: "Mbalmayo",
  },
  {
    id: "std-03",
    nom: "EBOLO",
    prenom: "Jean",
    matricule: "21S04892",
    email: "jean.ebolo@facsciences-uy1.cm",
    passwordDefault: "21S04892",
    faculte: "Faculté des Sciences · Université de Yaoundé I",
    departementCode: "ENR",
    filiere: "Énergie Renouvelable — Option Solaire Photovoltaïque",
    cycle: "Master",
    niveau: "Master 1 (M1)",
    anneeAcademique: "2025/2026",
    statutInscription: "Inscrit · À jour des droits",
    quittancePaiement: {
      numeroQuittance: "QUIT-2025-078310",
      montant: "50 000 FCFA",
      datePaiement: "03 Octobre 2025",
      banque: "Société Générale Cameroun",
      agence: "Agence Mokolo Yaoundé",
    },
    telephone: "(+237) 694 22 71 50",
    dateNaissance: "05 Novembre 2001",
    lieuNaissance: "Ebolowa",
  },
];

// ── Base de Données des Notes pour Alain KAMGA (std-01) ──

export const GRADES_KAMGA: AcademicYearGrades[] = [
  // 1. Année 2025/2026 (Année en cours — DOIT ÊTRE AFFICHÉE EN PREMIER)
  {
    anneeAcademique: "2025/2026",
    isCurrent: true,
    niveau: "Licence 3 (L3)",
    filiere: "Biochimie Fondamentale & Appliquée",
    decisionJury: "Semestre 1 Validé avec Mention Bien — Semestre 2 en cours",
    dateDeliberation: "12 Février 2026",
    mgpAnnuelle: 3.42,
    creditsValidesTotal: 30,
    creditsInscritsTotal: 60,
    semestres: [
      {
        semestreCode: "S5",
        semestreLabel: "Semestre 5 (Harmattan)",
        periode: "Octobre 2025 – Février 2026",
        totalCreditsInscrits: 30,
        totalCreditsValides: 30,
        mgpSemestre: 3.42,
        unitesEnseignement: [
          {
            codeUE: "BCH 301",
            intitule: "Enzymologie Moléculaire & Cinétique Avancée",
            credits: 6,
            noteCC: 25.5,
            noteSN: 54.0,
            noteFinale: 79.5,
            grade: "A",
            statut: "Validé",
            enseignantResponsable: "Pr NDJIGUI / Dr FOKOU",
          },
          {
            codeUE: "BCH 302",
            intitule: "Biochimie Métabolique & Régulation Intégrée",
            credits: 6,
            noteCC: 23.0,
            noteSN: 51.5,
            noteFinale: 74.5,
            grade: "B+",
            statut: "Validé",
            enseignantResponsable: "Pr NYEGUE Maximilienne",
          },
          {
            codeUE: "BCH 303",
            intitule: "Génie Génétique & Biologie Moléculaire Médicale",
            credits: 6,
            noteCC: 26.0,
            noteSN: 56.0,
            noteFinale: 82.0,
            grade: "A",
            statut: "Validé",
            enseignantResponsable: "Pr OWONO OWONO Luc Calvin",
          },
          {
            codeUE: "BCH 304",
            intitule: "Bio-énergétique Cellulaire & Membranes Biologiques",
            credits: 6,
            noteCC: 21.5,
            noteSN: 46.0,
            noteFinale: 67.5,
            grade: "B",
            statut: "Validé",
            enseignantResponsable: "Dr NOUNDJEU Pierre",
          },
          {
            codeUE: "BCH 311",
            intitule: "Travaux Pratiques de Biochimie Clinique & Dosage",
            credits: 6,
            noteCC: 27.0,
            noteSN: 57.5,
            noteFinale: 84.5,
            grade: "A",
            statut: "Validé",
            enseignantResponsable: "Équipe Pédagogique Laboratoire BCH",
          },
        ],
      },
      {
        semestreCode: "S6",
        semestreLabel: "Semestre 6 (Mousson)",
        periode: "Mars 2026 – Juillet 2026",
        totalCreditsInscrits: 30,
        totalCreditsValides: 0,
        mgpSemestre: 0.0,
        unitesEnseignement: [
          {
            codeUE: "BCH 305",
            intitule: "Immunologie Fondamentale & Immunopathologie",
            credits: 6,
            noteCC: 24.0,
            noteSN: 0.0,
            noteFinale: 24.0,
            grade: "E",
            statut: "Rattrapage",
            enseignantResponsable: "Pr AJEAGAH Gideon",
          },
          {
            codeUE: "BCH 306",
            intitule: "Toxicologie Alimentaire & Hygiène Industrielle",
            credits: 6,
            noteCC: 25.0,
            noteSN: 0.0,
            noteFinale: 25.0,
            grade: "E",
            statut: "Rattrapage",
            enseignantResponsable: "Dr NDOYE FOE Florentine",
          },
          {
            codeUE: "BCH 307",
            intitule: "Pharmacologie & Substances Naturelles Thérapeutiques",
            credits: 6,
            noteCC: 22.5,
            noteSN: 0.0,
            noteFinale: 22.5,
            grade: "E",
            statut: "Rattrapage",
            enseignantResponsable: "Pr TCHUENTE",
          },
          {
            codeUE: "BCH 308",
            intitule: "Bio-informatique Structurale & Analyse de Séquences",
            credits: 6,
            noteCC: 26.5,
            noteSN: 0.0,
            noteFinale: 26.5,
            grade: "E",
            statut: "Rattrapage",
            enseignantResponsable: "Dr BILOA",
          },
          {
            codeUE: "BCH 312",
            intitule: "Stage Professionnel / Projet de Fin d'Études L3",
            credits: 6,
            noteCC: 0.0,
            noteSN: 0.0,
            noteFinale: 0.0,
            grade: "E",
            statut: "Rattrapage",
            enseignantResponsable: "Tuteurs de stage / Commission LMD",
          },
        ],
      },
    ],
  },

  // 2. Année 2024/2025 (Licence 2)
  {
    anneeAcademique: "2024/2025",
    isCurrent: false,
    niveau: "Licence 2 (L2)",
    filiere: "Biochimie Fondamentale",
    decisionJury: "Admis en Licence 3 avec Mention Assez Bien (60/60 crédits)",
    dateDeliberation: "20 Juillet 2025",
    mgpAnnuelle: 3.18,
    creditsValidesTotal: 60,
    creditsInscritsTotal: 60,
    semestres: [
      {
        semestreCode: "S3",
        semestreLabel: "Semestre 3",
        periode: "Octobre 2024 – Février 2025",
        totalCreditsInscrits: 30,
        totalCreditsValides: 30,
        mgpSemestre: 3.12,
        unitesEnseignement: [
          { codeUE: "BCH 201", intitule: "Biochimie Structurale des Protéines", credits: 6, noteCC: 22.0, noteSN: 48.0, noteFinale: 70.0, grade: "B+", statut: "Validé", enseignantResponsable: "Pr OWONO OWONO L." },
          { codeUE: "BCH 202", intitule: "Biochimie Structurale des Glucides & Lipides", credits: 6, noteCC: 21.0, noteSN: 45.0, noteFinale: 66.0, grade: "B", statut: "Validé", enseignantResponsable: "Dr FOKOU" },
          { codeUE: "BCH 203", intitule: "Microbiologie Générale Appliquée", credits: 6, noteCC: 24.0, noteSN: 50.0, noteFinale: 74.0, grade: "B+", statut: "Validé", enseignantResponsable: "Pr NYEGUE M." },
          { codeUE: "CHM 201", intitule: "Chimie Organique Fonctionnelle pour Biochimistes", credits: 6, noteCC: 19.5, noteSN: 42.0, noteFinale: 61.5, grade: "C+", statut: "Validé", enseignantResponsable: "Pr NOUNDJEU P." },
          { codeUE: "BCH 211", intitule: "TP de Biochimie Générale & Sécurité", credits: 6, noteCC: 26.0, noteSN: 52.0, noteFinale: 78.0, grade: "A", statut: "Validé", enseignantResponsable: "Laboratoire Pédagogique BCH" },
        ],
      },
      {
        semestreCode: "S4",
        semestreLabel: "Semestre 4",
        periode: "Mars 2025 – Juin 2025",
        totalCreditsInscrits: 30,
        totalCreditsValides: 30,
        mgpSemestre: 3.24,
        unitesEnseignement: [
          { codeUE: "BCH 204", intitule: "Enzymologie Générale & Catalyse", credits: 6, noteCC: 23.0, noteSN: 49.0, noteFinale: 72.0, grade: "B+", statut: "Validé", enseignantResponsable: "Dr NDOYE FOE" },
          { codeUE: "BCH 205", intitule: "Biologie Cellulaire Avancée & Signalisation", credits: 6, noteCC: 22.5, noteSN: 48.0, noteFinale: 70.5, grade: "B+", statut: "Validé", enseignantResponsable: "Pr AJEAGAH G." },
          { codeUE: "BCH 206", intitule: "Génétique Fondamentale & Hérédité", credits: 6, noteCC: 21.0, noteSN: 46.0, noteFinale: 67.0, grade: "B", statut: "Validé", enseignantResponsable: "Dr NOUNDJEU" },
          { codeUE: "STA 201", intitule: "Biostatistiques & Analyse de Données Expérimentales", credits: 6, noteCC: 20.0, noteSN: 44.0, noteFinale: 64.0, grade: "C+", statut: "Validé", enseignantResponsable: "Département Mathématiques" },
          { codeUE: "ANG 201", intitule: "Scientific English & Technical Communication", credits: 6, noteCC: 25.0, noteSN: 53.0, noteFinale: 78.0, grade: "A", statut: "Validé", enseignantResponsable: "Centre Bilingue UY1" },
        ],
      },
    ],
  },

  // 3. Année 2023/2024 (Licence 1)
  {
    anneeAcademique: "2023/2024",
    isCurrent: false,
    niveau: "Licence 1 (L1)",
    filiere: "Sciences de la Vie & de la Matière (Tronc Commun)",
    decisionJury: "Admis en Licence 2 (60/60 crédits validés)",
    dateDeliberation: "18 Juillet 2024",
    mgpAnnuelle: 3.05,
    creditsValidesTotal: 60,
    creditsInscritsTotal: 60,
    semestres: [
      {
        semestreCode: "S1",
        semestreLabel: "Semestre 1",
        periode: "Octobre 2023 – Février 2024",
        totalCreditsInscrits: 30,
        totalCreditsValides: 30,
        mgpSemestre: 3.02,
        unitesEnseignement: [
          { codeUE: "BIOS 101", intitule: "Biologie Cellulaire Fondamentale", credits: 6, noteCC: 20.0, noteSN: 44.0, noteFinale: 64.0, grade: "C+", statut: "Validé", enseignantResponsable: "Équipe Biologie UY1" },
          { codeUE: "CHM 101", intitule: "Chimie Générale & Thermodynamique", credits: 6, noteCC: 21.0, noteSN: 43.0, noteFinale: 64.0, grade: "C+", statut: "Validé", enseignantResponsable: "Département Chimie" },
          { codeUE: "PHY 101", intitule: "Physique pour Sciences du Vivant", credits: 6, noteCC: 19.0, noteSN: 42.0, noteFinale: 61.0, grade: "C+", statut: "Validé", enseignantResponsable: "Département Physique" },
          { codeUE: "MAT 101", intitule: "Mathématiques pour Biologistes", credits: 6, noteCC: 18.0, noteSN: 41.0, noteFinale: 59.0, grade: "C", statut: "Validé", enseignantResponsable: "Département Mathématiques" },
          { codeUE: "INF 101", intitule: "Informatique Fondamentale & Algorithmique", credits: 6, noteCC: 24.0, noteSN: 52.0, noteFinale: 76.0, grade: "A", statut: "Validé", enseignantResponsable: "Département Informatique" },
        ],
      },
      {
        semestreCode: "S2",
        semestreLabel: "Semestre 2",
        periode: "Mars 2024 – Juin 2024",
        totalCreditsInscrits: 30,
        totalCreditsValides: 30,
        mgpSemestre: 3.08,
        unitesEnseignement: [
          { codeUE: "BIOS 102", intitule: "Biologie Végétale & Animale", credits: 6, noteCC: 22.0, noteSN: 46.0, noteFinale: 68.0, grade: "B", statut: "Validé", enseignantResponsable: "Équipe BPA & BPV" },
          { codeUE: "CHM 102", intitule: "Chimie Organique Structurale", credits: 6, noteCC: 20.5, noteSN: 45.0, noteFinale: 65.5, grade: "B", statut: "Validé", enseignantResponsable: "Département Chimie" },
          { codeUE: "BCH 101", intitule: "Introduction aux Biomolécules", credits: 6, noteCC: 23.0, noteSN: 49.0, noteFinale: 72.0, grade: "B+", statut: "Validé", enseignantResponsable: "Département Biochimie" },
          { codeUE: "GEO 101", intitule: "Géosciences & Écologie Générale", credits: 6, noteCC: 21.0, noteSN: 44.0, noteFinale: 65.0, grade: "B", statut: "Validé", enseignantResponsable: "Département Sciences Terre" },
          { codeUE: "TP 102", intitule: "TP Expérimentaux Pluridisciplinaires", credits: 6, noteCC: 25.0, noteSN: 50.0, noteFinale: 75.0, grade: "B+", statut: "Validé", enseignantResponsable: "Laboratoires Tronc Commun" },
        ],
      },
    ],
  },
];

// ── Liste Initiale des Requêtes Étudiantes Soumises ──

export const INITIAL_STUDENT_REQUESTS: StudentRequest[] = [
  {
    id: "REQ-2026-0482",
    studentId: "std-01",
    dateDepot: "16 Février 2026",
    type: "probleme_note",
    recipientId: "ens-bch",
    anneeAcademique: "2025/2026",
    codeUE: "BCH 302",
    objet: "Omission de la note de Contrôle Continu (CC) en BCH 302",
    description: "J'ai composé régulièrement lors du contrôle continu du 14 décembre 2025 en salle S03 sous l'émargement n°42. La note affichée sur le babillard provisoire porte la mention 'ABS'. Je sollicite le report effectif de ma note de 23/30 conformément à mon double de copie.",
    nomPieceJointe: "bordereau_emargement_cc_bch302.pdf",
    numeroQuittanceJoint: "QUIT-2025-084920",
    statut: "Transmise à l'autorité",
    reponseOfficielle: "Requête transmise au Pr NYEGUE le 18 Février 2026 pour vérification du cahier d'émargement.",
    dateReponse: "18 Février 2026",
  },
  {
    id: "REQ-2025-1104",
    studentId: "std-01",
    dateDepot: "04 Novembre 2025",
    type: "certificat_scolarite",
    recipientId: "daars",
    anneeAcademique: "2025/2026",
    objet: "Délivrance de deux exemplaires du certificat de scolarité L3",
    description: "Demande de certificat de scolarité pour le renouvellement du dossier de bourse nationale MINESUP.",
    nomPieceJointe: "quittance_droits_universitaires_50000.pdf",
    numeroQuittanceJoint: "QUIT-2025-084920",
    statut: "Favorable / Résolue",
    reponseOfficielle: "Certificats signés disponibles au Guichet n°4 de la Scolarité centrale.",
    dateReponse: "07 Novembre 2025",
  },
];
