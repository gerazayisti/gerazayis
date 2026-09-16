// Données et modèles pour le Portail d'Administration Multi-Rôles de la Faculté des Sciences (UY1)
// Rôles pris en charge :
// 1. Étudiant (espace personnel, babillard, requêtes)
// 2. Enseignant (instruction des réclamations assignées, saisie/rectification des notes CC/SN)
// 3. Administrateur DAARS / Scolarité (validation des quittances 50 000 FCFA, gestion globale, délivrance actes)
// 4. Le Doyen (vue d'ensemble panoramique de l'établissement, statistiques par département, décrets)
// 5. Webmaster (CMS live d'édition des textes pour toutes les pages du site)

export type AdminRole = "etudiant" | "enseignant" | "administrateur" | "doyen" | "webmaster";

export interface AdminUser {
  id: string;
  role: AdminRole;
  nom: string;
  prenom: string;
  titre: string;
  email: string;
  matriculeOrCode: string;
  departementCode?: string;
  departementNom?: string;
  avatarInitials: string;
  descriptionRole: string;
}

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "user-etudiant",
    role: "etudiant",
    nom: "KAMGA",
    prenom: "Alain",
    titre: "Étudiant L3 Biochimie",
    email: "alain.kamga@facsciences-uy1.cm",
    matriculeOrCode: "22S14890",
    departementCode: "BC",
    departementNom: "Biochimie",
    avatarInitials: "AK",
    descriptionRole: "Consultation du Babillard numérique, quittance et dépôt de requêtes académiques.",
  },
  {
    id: "user-enseignant-bch",
    role: "enseignant",
    nom: "NYEGUE",
    prenom: "Maximilienne",
    titre: "Professeur Titulaire · Responsable d'UE",
    email: "enseignant.nyegue@facsciences-uy1.cm",
    matriculeOrCode: "ENS-BCH-042",
    departementCode: "BC",
    departementNom: "Biochimie",
    avatarInitials: "MN",
    descriptionRole: "Instruction des requêtes d'étudiants, contrôle d'émargement et validation des notes BCH.",
  },
  {
    id: "user-enseignant-enr",
    role: "enseignant",
    nom: "NDJAKA",
    prenom: "Jean-Marie",
    titre: "Maître de Conférences · Responsable Pédagogique Solaire",
    email: "enseignant.ndjaka@facsciences-uy1.cm",
    matriculeOrCode: "ENS-ENR-018",
    departementCode: "ENR",
    departementNom: "Énergie Renouvelable",
    avatarInitials: "JN",
    descriptionRole: "Supervision des travaux pratiques et réclamations en conversion photovoltaïque.",
  },
  {
    id: "user-daars",
    role: "administrateur",
    nom: "SCOLARITÉ CENTRALE",
    prenom: "Division DAARS",
    titre: "Chef de Division DAARS / Intendance DAF",
    email: "scolarite.centrale@facsciences-uy1.cm",
    matriculeOrCode: "ADMIN-DAARS-2026",
    departementCode: "DAARS",
    departementNom: "Scolarité Centrale",
    avatarInitials: "DA",
    descriptionRole: "Validation des quittances de 50 000 FCFA, gestion globale des requêtes et PV de jurys.",
  },
  {
    id: "user-doyen",
    role: "doyen",
    nom: "LE DOYEN",
    prenom: "Direction Facultaire",
    titre: "Doyen de la Faculté des Sciences",
    email: "doyen@facsciences-uy1.cm",
    matriculeOrCode: "DOYEN-FS-UY1",
    departementCode: "DECANAT",
    departementNom: "Décanat de la Faculté des Sciences",
    avatarInitials: "DY",
    descriptionRole: "Haute autorité facultaire · Vue d'ensemble panoramique, finances, scolarité et décrets.",
  },
  {
    id: "user-webmaster",
    role: "webmaster",
    nom: "DIRECTION COMM.",
    prenom: "Webmaster Central",
    titre: "Gestionnaire CMS & Contenu Numérique",
    email: "webmaster@facsciences-uy1.cm",
    matriculeOrCode: "WEBMASTER-FS-01",
    departementCode: "CI",
    departementNom: "Centre Informatique & Communication",
    avatarInitials: "WM",
    descriptionRole: "Édition et mise à jour textuelle de toutes les pages du site web de la Faculté.",
  },
];

// ── Statistiques Panoramiques pour Monsieur le Doyen ──

export interface DepartmentMetric {
  code: string;
  nom: string;
  chefDepartement: string;
  etudiantsInscrits: number;
  quittancesValidees: number;
  tauxRecouvrement: number; // En %
  requetesOuvertes: number;
  requetesTraitees: number;
  mgpMoyenne: number;
  enseignantsPermanents: number;
}

export const DECANAT_STATS = {
  anneeAcademique: "2025/2026",
  effectifTotalEtudiants: 14850,
  quittancesTotalPayees: 13920,
  recettesTotalFCFA: "696 000 000 FCFA", // 13 920 × 50 000 FCFA
  tauxPaiementGlobal: "93.7%",
  corpsProfessoralTotal: 318,
  departementsCount: 10,
  requetesTotalDeposees: 184,
  requetesTraitees: 168,
  tauxResolutionRequetes: "91.3%",
  tauxReussiteSemestre1: "78.6%",
  prochaineDeliberation: "28 Juin 2026",
};

export const DEPARTMENTS_METRICS: DepartmentMetric[] = [
  {
    code: "BC",
    nom: "Biochimie",
    chefDepartement: "Pr NYEGUE Maximilienne",
    etudiantsInscrits: 1640,
    quittancesValidees: 1560,
    tauxRecouvrement: 95.1,
    requetesOuvertes: 18,
    requetesTraitees: 17,
    mgpMoyenne: 2.88,
    enseignantsPermanents: 34,
  },
  {
    code: "IN",
    nom: "Informatique",
    chefDepartement: "Pr ATSA ETOUNDI Roger",
    etudiantsInscrits: 2150,
    quittancesValidees: 2040,
    tauxRecouvrement: 94.8,
    requetesOuvertes: 24,
    requetesTraitees: 22,
    mgpMoyenne: 3.02,
    enseignantsPermanents: 38,
  },
  {
    code: "PH",
    nom: "Physique",
    chefDepartement: "Pr TCHUENTE Guy",
    etudiantsInscrits: 1420,
    quittancesValidees: 1320,
    tauxRecouvrement: 92.9,
    requetesOuvertes: 14,
    requetesTraitees: 13,
    mgpMoyenne: 2.74,
    enseignantsPermanents: 41,
  },
  {
    code: "MA",
    nom: "Mathématiques",
    chefDepartement: "Pr BEKOLLE David",
    etudiantsInscrits: 1180,
    quittancesValidees: 1100,
    tauxRecouvrement: 93.2,
    requetesOuvertes: 16,
    requetesTraitees: 15,
    mgpMoyenne: 2.65,
    enseignantsPermanents: 32,
  },
  {
    code: "COr",
    nom: "Chimie Organique",
    chefDepartement: "Pr PEGNYEMBO Emmanuel",
    etudiantsInscrits: 1290,
    quittancesValidees: 1210,
    tauxRecouvrement: 93.8,
    requetesOuvertes: 19,
    requetesTraitees: 18,
    mgpMoyenne: 2.81,
    enseignantsPermanents: 29,
  },
  {
    code: "MIB",
    nom: "Microbiologie",
    chefDepartement: "Pr KOUAM Jean",
    etudiantsInscrits: 1340,
    quittancesValidees: 1270,
    tauxRecouvrement: 94.7,
    requetesOuvertes: 15,
    requetesTraitees: 14,
    mgpMoyenne: 2.92,
    enseignantsPermanents: 27,
  },
  {
    code: "STU",
    nom: "Sciences de la Terre",
    chefDepartement: "Pr NDJIGUI Paul-Désiré",
    etudiantsInscrits: 1510,
    quittancesValidees: 1410,
    tauxRecouvrement: 93.3,
    requetesOuvertes: 22,
    requetesTraitees: 20,
    mgpMoyenne: 2.85,
    enseignantsPermanents: 31,
  },
  {
    code: "BPV",
    nom: "Biologie Végétale",
    chefDepartement: "Pr MAPONGMETSEM Pierre",
    etudiantsInscrits: 1480,
    quittancesValidees: 1390,
    tauxRecouvrement: 93.9,
    requetesOuvertes: 17,
    requetesTraitees: 15,
    mgpMoyenne: 2.79,
    enseignantsPermanents: 30,
  },
  {
    code: "BPA",
    nom: "Biologie Animale",
    chefDepartement: "Pr BILONG BILONG Charles",
    etudiantsInscrits: 1610,
    quittancesValidees: 1510,
    tauxRecouvrement: 93.7,
    requetesOuvertes: 21,
    requetesTraitees: 19,
    mgpMoyenne: 2.83,
    enseignantsPermanents: 33,
  },
  {
    code: "CIn",
    nom: "Chimie Inorganique",
    chefDepartement: "Pr TCHOUANKOUE Jean-Pierre",
    etudiantsInscrits: 1230,
    quittancesValidees: 1110,
    tauxRecouvrement: 90.2,
    requetesOuvertes: 18,
    requetesTraitees: 15,
    mgpMoyenne: 2.70,
    enseignantsPermanents: 23,
  },
];

// ── Liste des Quittances Bancaires (pour contrôle DAARS & DAF) ──

export interface QuittanceRecord {
  numeroQuittance: string;
  matricule: string;
  nomEtudiant: string;
  filiere: string;
  niveau: string;
  montant: string;
  datePaiement: string;
  banque: string;
  agence: string;
  statut: "Validé" | "En attente de vérification" | "Rejeté / Chèque impayé";
}

export const INITIAL_QUITTANCES: QuittanceRecord[] = [
  {
    numeroQuittance: "QUIT-2025-084920",
    matricule: "22S14890",
    nomEtudiant: "Alain KAMGA",
    filiere: "Biochimie",
    niveau: "Licence 3",
    montant: "50 000 FCFA",
    datePaiement: "02 Octobre 2025",
    banque: "Afriland First Bank",
    agence: "Yaoundé — Ngoa-Ekellé",
    statut: "Validé",
  },
  {
    numeroQuittance: "QUIT-2025-091402",
    matricule: "23S08412",
    nomEtudiant: "Marie FOUDA",
    filiere: "Informatique (SIGL)",
    niveau: "Licence 2",
    montant: "50 000 FCFA",
    datePaiement: "28 Septembre 2025",
    banque: "BICEC",
    agence: "Yaoundé — Melen",
    statut: "Validé",
  },
  {
    numeroQuittance: "QUIT-2025-072118",
    matricule: "21S04892",
    nomEtudiant: "Jean EBOLO",
    filiere: "Énergie Renouvelable",
    niveau: "Master 1",
    montant: "50 000 FCFA",
    datePaiement: "05 Octobre 2025",
    banque: "Société Générale Cameroun",
    agence: "Yaoundé — Poste Centrale",
    statut: "Validé",
  },
  {
    numeroQuittance: "QUIT-2026-014992",
    matricule: "24S03115",
    nomEtudiant: "Brice NOUBOSSE",
    filiere: "Mathématiques",
    niveau: "Licence 1",
    montant: "50 000 FCFA",
    datePaiement: "14 Janvier 2026",
    banque: "Express Union Bank",
    agence: "Yaoundé — Mokolo",
    statut: "En attente de vérification",
  },
  {
    numeroQuittance: "QUIT-2026-015840",
    matricule: "25S09012",
    nomEtudiant: "Carine MBALLA",
    filiere: "Sciences de la Terre",
    niveau: "Licence 1",
    montant: "50 000 FCFA",
    datePaiement: "20 Janvier 2026",
    banque: "CCA Bank",
    agence: "Yaoundé — Omnisports",
    statut: "En attente de vérification",
  },
];

// ── Catalogue des Textes Éditables par le Webmaster (CMS Toutes Pages) ──

export interface CmsPageSection {
  id: string;
  pageId: string;
  pageTitre: string;
  sectionId: string;
  sectionLabel: string;
  cle: string;
  titreChamp: string;
  valeurParDefaut: string;
  type: "text" | "textarea" | "number";
}

export const INITIAL_CMS_CONTENT: CmsPageSection[] = [
  // 1. PAGE ACCUEIL
  {
    id: "cms-home-hero-title",
    pageId: "accueil",
    pageTitre: "Page d'Accueil",
    sectionId: "hero",
    sectionLabel: "Bandeau Héro Principal",
    cle: "home_hero_title",
    titreChamp: "Titre Principal Héro",
    valeurParDefaut: "Faculté des Sciences — Université de Yaoundé I",
    type: "text",
  },
  {
    id: "cms-home-hero-subtitle",
    pageId: "accueil",
    pageTitre: "Page d'Accueil",
    sectionId: "hero",
    sectionLabel: "Bandeau Héro Principal",
    cle: "home_hero_subtitle",
    titreChamp: "Sous-titre / Slogan d'Excellence",
    valeurParDefaut: "Premier pôle d'excellence en formation fondamentale, recherche scientifique et innovation technologique en Afrique Centrale.",
    type: "textarea",
  },
  {
    id: "cms-home-stats-students",
    pageId: "accueil",
    pageTitre: "Page d'Accueil",
    sectionId: "stats",
    sectionLabel: "Chiffres Clés & Statistiques",
    cle: "home_stats_students",
    titreChamp: "Nombre d'Étudiants Inscrits",
    valeurParDefaut: "14 850",
    type: "text",
  },
  {
    id: "cms-home-alert-msg",
    pageId: "accueil",
    pageTitre: "Page d'Accueil",
    sectionId: "alerte",
    sectionLabel: "Alerte Décanale Défilante",
    cle: "home_alert_text",
    titreChamp: "Message d'Alerte Décanale",
    valeurParDefaut: "SESSION NORMALE S2 2025/2026 EN COURS · CONSULTATION DES NOTES SUR LE BABILLARD NUMÉRIQUE · DÉPÔT DES REQUÊTES EN LIGNE OUVERT.",
    type: "textarea",
  },

  // 2. PAGE LA FACULTÉ (PRÉSENTATION & GOUVERNANCE)
  {
    id: "cms-faculte-doyen-word",
    pageId: "la-faculte",
    pageTitre: "La Faculté (Présentation & Décanat)",
    sectionId: "mot-doyen",
    sectionLabel: "Mot Officiel du Doyen",
    cle: "faculte_doyen_word",
    titreChamp: "Discours d'Orientation du Doyen",
    valeurParDefaut: "Bienvenue à la Faculté des Sciences de l'Université de Yaoundé I, matrice des sciences exactes et des technologies d'avenir au Cameroun. Notre mission cardinale conjugue rigueur méthodologique, intégrité académique et réponse aux défis de la transition énergétique et numérique.",
    type: "textarea",
  },
  {
    id: "cms-faculte-contacts-phone",
    pageId: "la-faculte",
    pageTitre: "La Faculté (Contacts & Localisation)",
    sectionId: "contacts",
    sectionLabel: "Coordonnées Officielles",
    cle: "faculte_phone",
    titreChamp: "Standard Téléphonique Officiel",
    valeurParDefaut: "(+237) 222 23 44 96",
    type: "text",
  },
  {
    id: "cms-faculte-contacts-email",
    pageId: "la-faculte",
    pageTitre: "La Faculté (Contacts & Localisation)",
    sectionId: "contacts",
    sectionLabel: "Coordonnées Officielles",
    cle: "faculte_email_doyen",
    titreChamp: "Courriel Officiel du Décanat",
    valeurParDefaut: "doyen@facsciences.uy1.cm",
    type: "text",
  },

  // 3. PAGE FORMATIONS & DÉPARTEMENTS
  {
    id: "cms-formations-intro",
    pageId: "formations",
    pageTitre: "Offre de Formation & Départements",
    sectionId: "formations-header",
    sectionLabel: "En-tête de l'Offre de Formation",
    cle: "formations_header_desc",
    titreChamp: "Description Synthétique de l'Offre",
    valeurParDefaut: "Un catalogue complet articulé autour de 3 branches majeures : 10 Licences & Masters fondamentaux, Licences professionnelles d'insertion immédiate (SIGL, ICT4D), et Certifications d'excellence en Énergie Solaire Photovoltaïque.",
    type: "textarea",
  },
  {
    id: "cms-departement-bc-desc",
    pageId: "formations",
    pageTitre: "Offre de Formation & Départements",
    sectionId: "departement-bc",
    sectionLabel: "Département de Biochimie",
    cle: "dept_bc_summary",
    titreChamp: "Présentation Départementale [BC]",
    valeurParDefaut: "Le Département de Biochimie, ouvert en 1964, assure la formation fondamentale et appliquée en métabolisme, biotechnologies, bio-chimie clinique et contrôle de la qualité agro-alimentaire.",
    type: "textarea",
  },

  // 4. PAGE ESPACE ÉTUDIANT (SCOLARITÉ & CALENDRIER)
  {
    id: "cms-scolarite-horaires",
    pageId: "espace-etudiant",
    pageTitre: "Espace Étudiant & Scolarité",
    sectionId: "scolarite-guichet",
    sectionLabel: "Guichets de la Scolarité Centrale",
    cle: "scolarite_opening_hours",
    titreChamp: "Horaires d'Ouverture des Guichets",
    valeurParDefaut: "08h00 — 15h30 (Lundi au Vendredi ouvrés · Pavillon DAARS)",
    type: "text",
  },
  {
    id: "cms-scolarite-frais",
    pageId: "espace-etudiant",
    pageTitre: "Espace Étudiant & Scolarité",
    sectionId: "droits-universitaires",
    sectionLabel: "Droits Universitaires Fixés par l'État",
    cle: "tuition_fees_amount",
    titreChamp: "Montant Annuel Obligatoire",
    valeurParDefaut: "50 000 FCFA (payable en agences bancaires agréées)",
    type: "text",
  },
  {
    id: "cms-calendrier-annee",
    pageId: "espace-etudiant",
    pageTitre: "Espace Étudiant & Scolarité",
    sectionId: "calendrier-academique",
    sectionLabel: "Calendrier Académique Officiel",
    cle: "academic_year_label",
    titreChamp: "Intitulé de l'Année Académique Active",
    valeurParDefaut: "Année Académique 2025/2026",
    type: "text",
  },

  // 5. PAGE RECHERCHES & LABORATOIRES
  {
    id: "cms-recherche-axes",
    pageId: "recherches",
    pageTitre: "Recherches & Laboratoires",
    sectionId: "axes-prioritaires",
    sectionLabel: "Axes Prioritaires de Recherche",
    cle: "recherche_axes_intro",
    titreChamp: "Orientation Stratégique de la Recherche",
    valeurParDefaut: "Trois piliers directeurs : Biosciences & Santé tropicale, Matériaux innovants & Énergies renouvelables, Modélisation mathématique et informatique pour le développement durable.",
    type: "textarea",
  },

  // 6. PAGE ACTUALITÉS & BABILLARD
  {
    id: "cms-actualites-header",
    pageId: "actualites",
    pageTitre: "Actualités & Événements",
    sectionId: "actualites-header",
    sectionLabel: "Actualités Facultaires",
    cle: "actualites_intro_text",
    titreChamp: "Sous-titre de la Page Actualités",
    valeurParDefaut: "Toute la vie scientifique, les soutenances publiques de thèses, les séminaires et communiqués du Décanat de la Faculté des Sciences.",
    type: "textarea",
  },
];
