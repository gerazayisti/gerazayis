# CAHIER DES CHARGES & SPÉCIFICATIONS TECHNIQUES BACKEND
## Système d'Information & Portail Numérique Intégré
### Faculté des Sciences — Université de Yaoundé I (UY1)

---

## Sommaire Exécutif

1. [Vision du Système & Contexte Réglementaire](#1-vision-du-système--contexte-réglementaire)
2. [Architecture Technique Globale](#2-architecture-technique-globale)
3. [Schéma de Données Relationnel Exhaustif (Prisma ORM / PostgreSQL)](#3-schéma-de-données-relationnel-exhaustif)
4. [Moteurs de Règles Métier (Business Engines)](#4-moteurs-de-règles-métier)
   - 4.1. Moteur LMD : Calcul de MGP, Notation (12 paliers) et Enjambement
   - 4.2. Moteur Financier : Quittances des Droits Universitaires (50 000 FCFA)
   - 4.3. Moteur des Requêtes & Circuit Décisionnel Décanat/Enseignant
5. [Spécifications Complètes des Endpoints d'API (RESTful)](#5-spécifications-complètes-des-endpoints-dapi)
6. [Contrôle d'Accès Basé sur les Rôles (RBAC) & Sécurité](#6-contrôle-daccès-basé-sur-les-rôles-rbac--sécurité)
7. [Traçabilité Anti-Fraude & Piste d'Audit Immuable](#7-traçabilité-anti-fraude--piste-daudit-immuable)
8. [Module CMS Live pour le Webmaster (Édition Toutes Pages)](#8-module-cms-live-pour-le-webmaster)
9. [Architecture de Déploiement & Dockerisation](#9-architecture-de-déploiement--dockerisation)
10. [Conclusion & Feuille de Route d'Intégration](#10-conclusion--feuille-de-route-dintégration)

---

## 1. Vision du Système & Contexte Réglementaire

Le présent document constitue le référentiel technique pour l'implémentation backend du système d'information de la **Faculté des Sciences de l'Université de Yaoundé I (FS/UYI)**.

### 1.1. Missions Cardinales du Backend
1. **Gouvernance Décanale Panoramique** : Fournir au Doyen une vision consolidée en temps réel des 10 départements (effectifs, finances, PV de jurys, arrêtés décanaux).
2. **Gestion Intégrale de la Scolarité (DAARS & DAF)** : Contrôle d'inscription, vérification des versements bancaires (50 000 FCFA), production sécurisée d'actes académiques (certificats de scolarité, attestations, parchemins).
3. **Moteur Pédagogique Conforme LMD (CEMAC / MINESUP)** : Calcul automatisé de la Moyenne Générale Pondérée (MGP / 4.00), barème à 12 échelons ($A$ à $F$), règles d'enjambement et de compensation semestrielle.
4. **Guichet Numérique des Requêtes** : Cycle de vie dématérialisé des réclamations avec routage enseignant/département/scolarité et notification en direct.
5. **CMS Institutionnel Centralisé** : API d'édition dynamique de contenu pour le Webmaster garantissant la mise à jour sans redéploiement de toutes les pages publiques.

---

## 2. Architecture Technique Globale

Le backend est conçu selon les principes de l'architecture hexagonale (Ports & Adapters) afin d'isoler les règles métier des dépendances d'infrastructure.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 COUCHE CLIENT FRONTEND                                 │
│          Next.js (App Router) · Portail Public · Espace Étudiant · Espace Admin         │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ HTTPS / JSON / WebSockets
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 PASSERELLE D'ENTRÉE (GATEWAY)                          │
│          Reverse Proxy Nginx / Cloudflare · Rate Limiting · Helmet · CORS Strict       │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              APPLICATION BACKEND (NODE.JS / NESTJS)                    │
│                                                                                        │
│   ┌─────────────────────┐  ┌──────────────────────┐  ┌─────────────────────────────┐   │
│   │   Auth & RBAC Guard │  │  Business Logic LMD  │  │  Claims Workflow Engine     │   │
│   └─────────────────────┘  └──────────────────────┘  └─────────────────────────────┘   │
│   ┌─────────────────────┐  ┌──────────────────────┐  ┌─────────────────────────────┐   │
│   │ Financial Quittance │  │ CMS All-Pages Engine │  │ PDF & Crypto Signature Svc  │   │
│   └─────────────────────┘  └──────────────────────┘  └─────────────────────────────┘   │
└───────────┬───────────────────────────────┬─────────────────────────────┬──────────────┘
            │                               │                             │
            ▼                               ▼                             ▼
┌───────────────────────┐       ┌───────────────────────┐     ┌──────────────────────────┐
│   BASE DE DONNÉES     │       │   CACHE & FILES BULL  │     │   STOCKAGE DOCUMENTS S3  │
│   PostgreSQL 16       │       │   Redis 7             │     │   MinIO / Cloudflare R2  │
│   Transactions ACID   │       │   Sessions, MGP Cache │     │   Bordereaux, Relevés    │
└───────────────────────┘       └───────────────────────┘     └──────────────────────────┘
```

### Stack Technique Retenue
- **Framework** : Node.js (v20+ LTS) avec **NestJS** (ou API Routes Next.js Enterprise avec Zod).
- **Langage** : TypeScript 5.x en mode strict.
- **Base de Données Principale** : PostgreSQL 16 (optimisé pour la conformité relationnelle et les transactions bancaires/académiques).
- **ORM** : Prisma ORM v5 / v6 (schéma déclaratif, migrations typées).
- **Cache & Message Broker** : Redis 7 (gestion des sessions, files de tâches pour l'envoi d'emails et la génération asynchrone des PDF certifiés).
- **Stockage Objets (Blob Storage)** : MinIO ou AWS S3 / Cloudflare R2 (stockage immuable des bordereaux bancaires et pièces jointes des requêtes).
- **Moteur Cryptographique** : Signatures Ed25519 / HMAC-SHA256 pour les QR-Codes des attestations et relevés de notes.

---

## 3. Schéma de Données Relationnel Exhaustif

Voici le fichier de modélisation `schema.prisma` complet, intégrant l'intégralité du domaine métier de la Faculté des Sciences.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ── 1. GESTION DES UTILISATEURS & AUTHENTIFICATION ──

enum Role {
  ETUDIANT
  ENSEIGNANT
  ADMIN_DAARS
  DOYEN
  WEBMASTER
}

enum StatutCompte {
  ACTIF
  SUSPENDU
  EN_ATTENTE_ACTIVATION
}

model User {
  id              String         @id @default(uuid())
  email           String         @unique // prenom.nom@facsciences-uy1.cm
  passwordHash    String
  nom             String
  prenom          String
  role            Role           @default(ETUDIANT)
  statutCompte    StatutCompte   @default(ACTIF)
  telephone       String?
  derniereConnex  DateTime?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  studentProfile  StudentProfile?
  teacherProfile  TeacherProfile?
  auditLogs       AuditLog[]

  @@index([email, role])
}

// ── 2. PROFIL ÉTUDIANT & INSCRIPTION ACADÉMIQUE ──

enum StatutInscription {
  PREINSCRIT
  INSCRIT_A_JOUR_DES_DROITS
  EN_ATTENTE_DE_PAIEMENT
  AJOURNE
}

model StudentProfile {
  id                  String             @id @default(uuid())
  userId              String             @unique
  user                User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  matricule           String             @unique // Ex: "22S14890" (Sert de mot de passe initial)
  dateNaissance       DateTime
  lieuNaissance       String
  nationalite         String             @default("Camerounaise")
  sexe                String             // "M" ou "F"
  cniNumero           String?
  photoUrl            String?
  filiereCode         String             // Ex: "BC", "IN", "PH"
  filiere             Filiere            @relation(fields: [filiereCode], references: [code])
  niveau              String             // "L1", "L2", "L3", "M1", "M2", "DOC"
  cycle               String             // "Licence", "Master", "Doctorat"
  statutInscription   StatutInscription  @default(EN_ATTENTE_DE_PAIEMENT)
  regimeEtude         String             @default("Temps Plein") // "Temps Plein" ou "Temps Partiel"

  quittances          QuittancePaiement[]
  inscriptionsUE      InscriptionUE[]
  relevesAnnuels      ReleveAnnuel[]
  requetes            StudentRequest[]

  createdAt           DateTime           @default(now())
  updatedAt           DateTime           @updatedAt

  @@index([matricule, filiereCode, niveau])
}

// ── 3. PROFIL ENSEIGNANT & DÉPARTEMENT ──

model TeacherProfile {
  id                String             @id @default(uuid())
  userId            String             @unique
  user              User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  codeEnseignant    String             @unique // Ex: "ENS-BCH-042"
  grade             String             // "Professeur Titulaire", "Maître de Conférences", "Chargé de Cours", "Assistant"
  specialite        String
  departementCode   String
  departement       Department         @relation(fields: [departementCode], references: [code])
  bureau            String?

  coursResponsable  UniteEnseignement[]
  requetesAssignees StudentRequest[]

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  @@index([codeEnseignant, departementCode])
}

// ── 4. STRUCTURE ACADÉMIQUE DE LA FACULTÉ ──

model Department {
  code              String             @id // "BC", "IN", "PH", "MA", "COr", "CIn", "MIB", "STU", "BPV", "BPA"
  nom               String
  slug              String             @unique
  division          String             @default("Division de la Programmation et du Suivi des Enseignements")
  chefDepartement   String
  bureauLocalisation String
  telephone         String?
  email             String

  filieres          Filiere[]
  enseignants       TeacherProfile[]
  unitesEnseignement UniteEnseignement[]

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}

model Filiere {
  code              String             @id // "BCH", "INF", "PHY", "MAT", "CHM", "STU", "BOV", "BOA"
  nom               String
  departementCode   String
  departement       Department         @relation(fields: [departementCode], references: [code])
  students          StudentProfile[]
  unitesEnseignement UniteEnseignement[]

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}

enum CategorieUE {
  FONDAMENTALE
  COMPLEMENTAIRE_OPTIONNELLE
  TRANSVERSALE_OBLIGATOIRE
  NON_OBLIGATOIRE
}

model UniteEnseignement {
  code              String             @id // Ex: "BCH 302", "INF 201"
  intitule          String
  credits           Int                @default(6) // 1 à 6 crédits
  heuresCM          Float              @default(3.0) // Heures de Cours Magistraux hebdomadaires
  heuresTD          Float              @default(1.5) // Heures de Travaux Dirigés hebdomadaires
  heuresTP          Float              @default(0.0) // Heures de Travaux Pratiques hebdomadaires
  categorie         CategorieUE        @default(FONDAMENTALE)
  semestreCode      String             // "S1", "S2", "S3", "S4", "S5", "S6"
  niveau            String             // "L1", "L2", "L3", "M1", "M2"
  filiereCode       String
  filiere           Filiere            @relation(fields: [filiereCode], references: [code])
  departementCode   String
  departement       Department         @relation(fields: [departementCode], references: [code])
  enseignantId      String?
  enseignant        TeacherProfile?    @relation(fields: [enseignantId], references: [id])

  inscriptions      InscriptionUE[]
  requetes          StudentRequest[]

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  @@index([semestreCode, niveau, filiereCode])
}

// ── 5. FINANCE : QUITTANCES DES DROITS UNIVERSITAIRES (50 000 FCFA) ──

enum StatutQuittance {
  VALIDE
  EN_ATTENTE_VERIFICATION
  REJETE_IMPAYE
}

model QuittancePaiement {
  numeroQuittance   String             @id // Ex: "QUIT-2025-084920"
  studentId         String
  student           StudentProfile     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  montantFCFA       Int                @default(50000)
  anneeAcademique   String             // "2025/2026"
  datePaiement      DateTime
  banquePartenaire  String             // "Afriland First Bank", "BICEC", "SGC", "Express Union", "CCA Bank"
  agence            String
  bordereauScanUrl  String?
  statut            StatutQuittance    @default(EN_ATTENTE_VERIFICATION)
  valideParUserId   String?
  dateValidation    DateTime?

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  @@index([numeroQuittance, studentId, statut])
}

// ── 6. SYSTÈME D'ÉVALUATION LMD, NOTES & BABILLARD ──

enum GradeNotation {
  A   // 80 - 100 (4.00)
  A_MINUS // 75 - 79 (3.70)
  B_PLUS  // 70 - 74 (3.30)
  B       // 65 - 69 (3.00)
  B_MINUS // 60 - 64 (2.70)
  C_PLUS  // 55 - 59 (2.30)
  C       // 50 - 54 (2.00)
  C_MINUS // 45 - 49 (1.70)
  D_PLUS  // 40 - 44 (1.30)
  D       // 35 - 39 (1.00)
  E       // 30 - 34 (0.00)
  F       // 00 - 29 (0.00)
}

enum StatutUE {
  VALIDE
  CAPITALISE_NON_TRANSFERABLE
  RATTRAPAGE
  ECHEC
}

enum AttitudeSymbol {
  AUCUN
  I   // Incomplet
  A   // Abandon
  S   // Suspension
  R   // Reprise
  AL  // Audition libre
}

model InscriptionUE {
  id                String             @id @default(uuid())
  studentId         String
  student           StudentProfile     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  ueCode            String
  uniteEnseignement UniteEnseignement  @relation(fields: [ueCode], references: [code])
  anneeAcademique   String             // "2025/2026"
  semestreCode      String             // "S1", "S2"

  noteCC            Float?             // Sur 30 (ou sur 20 si TPE)
  noteTPE           Float?             // Sur 20 (optionnel)
  noteSN            Float?             // Sur 70 (ou sur 60 si TPE)
  noteFinale        Float?             // Sur 100
  grade             GradeNotation?
  qualitePoints     Float?             // 0.00 à 4.00 (xi)
  statut            StatutUE           @default(RATTRAPAGE)
  attitude          AttitudeSymbol     @default(AUCUN)
  estReprise        Boolean            @default(false)

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  @@unique([studentId, ueCode, anneeAcademique])
  @@index([ueCode, anneeAcademique, semestreCode])
}

model ReleveAnnuel {
  id                  String         @id @default(uuid())
  studentId           String
  student             StudentProfile @relation(fields: [studentId], references: [id], onDelete: Cascade)
  anneeAcademique     String         // "2025/2026"
  isCurrentYear       Boolean        @default(true)
  niveau              String         // "L3"
  creditsInscrits     Int            @default(60)
  creditsValides      Int            @default(0)
  mgpAnnuelle         Float          @default(0.00) // Formule : sum(xi * ni) / sum(ni)
  decisionJury        String         // "Admis avec Mention", "Ajourné", "Autorisé à enjamber"
  dateDeliberation    DateTime?
  hashAuthentification String?       // Empreinte SHA256 pour QR-Code
  qrCodeSignature     String?

  createdAt           DateTime       @default(now())
  updatedAt           DateTime       @updatedAt

  @@unique([studentId, anneeAcademique])
}

// ── 7. WORKFLOW DU GUICHET DES REQUÊTES ──

enum TypeRequete {
  PROBLEME_NOTE
  CORRECTION_MATRICULE
  CORRECTION_NOM
  CERTIFICAT_SCOLARITE
  PROBLEME_PAIEMENT
  AUTRE
}

enum StatutRequete {
  ENREGISTREE
  EN_COURS_DINSTRUCTION
  EN_INSTRUCTION
  TRANSMISE_A_LAUTORITE
  FAVORABLE_RESOLUE
  REJETEE
  DEFAVORABLE_REJETEE
}

model StudentRequest {
  id                  String             @id // Ex: "REQ-2026-0482"
  studentId           String
  student             StudentProfile     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  type                TypeRequete
  destinataireEntite  String             // "ens-bch", "dept-inf", "daars", "daf", "decanat"
  assignedTeacherId   String?
  assignedTeacher     TeacherProfile?    @relation(fields: [assignedTeacherId], references: [id])
  anneeAcademique     String             // "2025/2026"
  ueCode              String?
  uniteEnseignement   UniteEnseignement? @relation(fields: [ueCode], references: [code])
  objet               String
  description         String             @db.Text
  numeroQuittance     String             // Quittance des droits de 50 000 FCFA
  pieceJointeUrl      String?

  statut              StatutRequete      @default(ENREGISTREE)
  reponseOfficielle   String?            @db.Text
  noteRectifieeCC     Float?
  noteRectifieeSN     Float?
  instructeurUserId   String?
  dateReponse         DateTime?

  createdAt           DateTime           @default(now())
  updatedAt           DateTime           @updatedAt

  @@index([id, studentId, statut, destinataireEntite])
}

// ── 8. TRAÇABILITÉ ANTI-FRAUDE & AUDIT LOGS ──

model AuditLog {
  id            String         @id @default(uuid())
  userId        String?
  user          User?          @relation(fields: [userId], references: [id])
  action        String         // "MODIFICATION_NOTE_CC", "VALIDATION_QUITTANCE", "DELIBERATION_JURY"
  entite        String         // "InscriptionUE", "QuittancePaiement"
  entiteId      String
  ancienneValeur Json?
  nouvelleValeur Json?
  adresseIp     String
  userAgent     String
  horodatage    DateTime       @default(now())

  @@index([action, entiteId, horodatage])
}

// ── 9. CMS DYNAMIQUE POUR LE WEBMASTER (TOUTES PAGES) ──

model CmsContent {
  id              String         @id @default(uuid())
  pageId          String         // "accueil", "la-faculte", "formations", "espace-etudiant", "recherches", "actualites"
  pageTitre       String
  sectionId       String         // "hero", "mot-doyen", "stats", "contacts", "scolarite"
  sectionLabel    String
  cle             String         @unique // Ex: "home_hero_title", "faculte_doyen_word"
  titreChamp      String
  valeur          String         @db.Text
  typeChamp       String         @default("text") // "text", "textarea", "number"
  derniereModifPar String?       // Webmaster ID
  estPublie       Boolean        @default(true)
  version         Int            @default(1)

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@index([pageId, sectionId, cle])
}
```

---

## 4. Moteurs de Règles Métier (Business Engines)

### 4.1. Moteur LMD : Calcul de la MGP et Enjambement

Conformément à la réglementation de l'Université de Yaoundé I, le calcul de la **Moyenne Générale Pondérée (MGP)** repose sur une échelle stricte de 4.00 points.

#### A. Algorithme de Conversion Note/100 ➔ Points ($x_i$) et Grade
```typescript
export interface GradeCalculationResult {
  grade: GradeNotation;
  points: number;
  mention: string;
  statut: StatutUE;
}

export function evaluateGrade(noteFinale100: number): GradeCalculationResult {
  if (noteFinale100 >= 80.0) {
    return { grade: GradeNotation.A, points: 4.00, mention: "Très bien", statut: StatutUE.VALIDE };
  } else if (noteFinale100 >= 75.0) {
    return { grade: GradeNotation.A_MINUS, points: 3.70, mention: "Bien", statut: StatutUE.VALIDE };
  } else if (noteFinale100 >= 70.0) {
    return { grade: GradeNotation.B_PLUS, points: 3.30, mention: "Bien", statut: StatutUE.VALIDE };
  } else if (noteFinale100 >= 65.0) {
    return { grade: GradeNotation.B, points: 3.00, mention: "Assez bien", statut: StatutUE.VALIDE };
  } else if (noteFinale100 >= 60.0) {
    return { grade: GradeNotation.B_MINUS, points: 2.70, mention: "Assez bien", statut: StatutUE.VALIDE };
  } else if (noteFinale100 >= 55.0) {
    return { grade: GradeNotation.C_PLUS, points: 2.30, mention: "Passable", statut: StatutUE.VALIDE };
  } else if (noteFinale100 >= 50.0) {
    return { grade: GradeNotation.C, points: 2.00, mention: "Passable", statut: StatutUE.VALIDE };
  } else if (noteFinale100 >= 45.0) {
    return { grade: GradeNotation.C_MINUS, points: 1.70, mention: "Crédits capitalisés non transférables", statut: StatutUE.CAPITALISE_NON_TRANSFERABLE };
  } else if (noteFinale100 >= 40.0) {
    return { grade: GradeNotation.D_PLUS, points: 1.30, mention: "Crédits capitalisés non transférables", statut: StatutUE.CAPITALISE_NON_TRANSFERABLE };
  } else if (noteFinale100 >= 35.0) {
    return { grade: GradeNotation.D, points: 1.00, mention: "Crédits capitalisés non transférables", statut: StatutUE.CAPITALISE_NON_TRANSFERABLE };
  } else if (noteFinale100 >= 30.0) {
    return { grade: GradeNotation.E, points: 0.00, mention: "Échec", statut: StatutUE.ECHEC };
  } else {
    return { grade: GradeNotation.F, points: 0.00, mention: "Échec", statut: StatutUE.ECHEC };
  }
}
```

#### B. Formule Officielle de Calcul de la MGP
$$\text{MGP} = \frac{\sum_{i=1}^{N} (x_i \times n_i)}{\sum_{i=1}^{N} n_i}$$
- $x_i$ : Valeur en points de l'UE $i$ (de $0.00$ à $4.00$).
- $n_i$ : Nombre de crédits ECTS de l'UE $i$ (ex: 6 crédits).
- En cas de **Reprise d'UE** (note initiale $\le 50/100$) : les deux notes restent consignées au relevé d'audit, mais **seule la dernière note obtenue** intervient dans la MGP officielle.

#### C. Règles Réglementaires d'Enjambement (Passage de Niveau)
```typescript
export function evaluateProgression(
  niveauActuel: "L1" | "L2" | "M1",
  creditsValidesNiveau: number,
  creditsTotalNiveau: number,
  mgpAnnuelle: number,
  creditsL1Valides?: number
): { decision: string; autorisePassage: boolean } {
  // Règle 1 : Passage L1 -> L2
  if (niveauActuel === "L1") {
    if (creditsValidesNiveau === 60) {
      return { decision: "Admis au niveau supérieur (L2)", autorisePassage: true };
    }
    // Enjambement conditionnel : au moins 75% des crédits (45 ECTS) et MGP >= 2.00
    if (creditsValidesNiveau >= 45 && mgpAnnuelle >= 2.00) {
      return { decision: "Autorisé à enjamber en L2 avec dettes d'UEs", autorisePassage: true };
    }
    return { decision: "Ajourné au niveau L1 (Redoublement)", autorisePassage: false };
  }

  // Règle 2 : Passage L2 -> L3
  if (niveauActuel === "L2") {
    if (creditsValidesNiveau === 60 && creditsL1Valides === 60) {
      return { decision: "Admis au niveau supérieur (L3)", autorisePassage: true };
    }
    // Enjambement conditionnel : 100% de L1 (60 ECTS) + 75% de L2 (45 ECTS) et MGP L2 >= 2.00
    if (creditsL1Valides === 60 && creditsValidesNiveau >= 45 && mgpAnnuelle >= 2.00) {
      return { decision: "Autorisé à enjamber en L3 par décision du Jury", autorisePassage: true };
    }
    return { decision: "Ajourné au niveau L2", autorisePassage: false };
  }

  // Règle 3 : Passage M1 -> M2
  if (niveauActuel === "M1") {
    if (creditsValidesNiveau === 60 && mgpAnnuelle >= 2.70) {
      return { decision: "Admis en M2 (Spécialisation)", autorisePassage: true };
    }
    return { decision: "Non sélectionné pour le M2", autorisePassage: false };
  }

  return { decision: "Statut indéterminé", autorisePassage: false };
}
```

---

### 4.2. Moteur Financier : Quittances des Droits Universitaires (50 000 FCFA)

Conformément au Décret Présidentiel régissant les universités d'État au Cameroun, les droits universitaires s'élèvent à **50 000 FCFA par an**.

```
   Étudiant                    Banque Partenaire                  DAARS / Intendance DAF
      │                               │                                     │
      │ 1. Versement 50 000 FCFA      │                                     │
      ├──────────────────────────────►│                                     │
      │                               │ 2. Émission Bordereau               │
      │◄──────────────────────────────┤                                     │
      │                               │                                     │
      │ 3. Saisie n° Quittance + Scan │                                     │
      ├────────────────────────────────────────────────────────────────────►│
      │                                                                     │ 4. Rapprochement bancaire
      │                                                                     │    (Afriland, BICEC, SGC)
      │                                                                     │ 5. Validation quittance
      │                                                                     ├─────────┐
      │                                6. Statut "Inscrit · À jour"         │◄────────┘
      │◄────────────────────────────────────────────────────────────────────┤
      │ 7. Déblocage accès aux examens et cartes biométriques               │
```

**Actions automatisées lors de la validation par la DAF** :
1. Transition du statut de `QuittancePaiement` vers `VALIDE`.
2. Mise à jour automatique de `StudentProfile.statutInscription` vers `INSCRIT_A_JOUR_DES_DROITS`.
3. Génération du ticket de retrait de la carte d'étudiant biométrique.
4. Déblocage de la possibilité de composer lors des contrôles continus et examens finaux.

---

### 4.3. Moteur des Requêtes & Circuit Décisionnel

Chaque réclamation est tracée de manière univoque avec un identifiant de ticket au format `REQ-YYYY-XXXX`.

```mermaid
stateDiagram-v2
    [*] --> ENREGISTREE : Soumission Étudiant (Quittance 50 000 obligatoire)
    ENREGISTREE --> EN_COURS_DINSTRUCTION : Prise en charge par la Scolarité
    EN_COURS_DINSTRUCTION --> TRANSMISE_A_LAUTORITE : Routage vers Enseignant/Département
    
    state TRANSMISE_A_LAUTORITE {
        [*] --> VerificationEmargement
        VerificationEmargement --> ExamenCopie
    }

    TRANSMISE_A_LAUTORITE --> FAVORABLE_RESOLUE : Avis Favorable Enseignant (Note CC/SN rectifiée)
    TRANSMISE_A_LAUTORITE --> DEFAVORABLE_REJETEE : Avis Défavorable (Note maintenue)

    FAVORABLE_RESOLUE --> PublicationBabillard : Mise à jour automatique du relevé
    DEFAVORABLE_REJETEE --> NotificationEtudiant : Clôture avec motivation écrite
    PublicationBabillard --> [*]
    NotificationEtudiant --> [*]
```

---

## 5. Spécifications Complètes des Endpoints d'API (RESTful)

Tous les endpoints sont préfixés par `/api/v1`. Les échanges s'effectuent au format `application/json`.

### 5.1. Module Authentification (`/api/v1/auth`)

| Méthode | Endpoint | Rôles Autorisés | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Public | Authentification via email académique + mot de passe (matricule par défaut pour les étudiants). |
| `POST` | `/auth/refresh` | Public (Cookie) | Renouvellement de l'AccessToken JWT via RefreshToken HttpOnly. |
| `POST` | `/auth/logout` | Tous | Révocation de session et suppression des cookies sécurisés. |
| `GET` | `/auth/me` | Tous | Retourne l'identité complète, le rôle actif et les permissions de l'utilisateur connecté. |
| `POST` | `/auth/change-password`| Tous | Modification du mot de passe initial avec invalidation des sessions antérieures. |

---

### 5.2. Module Espace Étudiant & Babillard (`/api/v1/student`)

| Méthode | Endpoint | Rôles Autorisés | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/student/profile` | `ETUDIANT` | Carte d'identité biométrique numérique, filière, niveau et statut quittance. |
| `GET` | `/student/grades` | `ETUDIANT` | Procès-verbal des notes semestrielles avec **l'année en cours (2025/2026) affichée en premier**, détails CC/SN, ECTS et MGP. |
| `GET` | `/student/grades/export-pdf`| `ETUDIANT` | Génération du relevé semestriel officiel au format PDF signé avec hash SHA256 et QR-Code. |
| `POST` | `/student/requests` | `ETUDIANT` | Dépôt d'une réclamation académique (vérification automatique de la quittance de 50 000 FCFA). |
| `GET` | `/student/requests` | `ETUDIANT` | Historique et statut en temps réel des tickets `REQ-YYYY-XXXX` déposés. |

---

### 5.3. Module Enseignant (`/api/v1/teacher`)

| Méthode | Endpoint | Rôles Autorisés | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/teacher/courses` | `ENSEIGNANT` | Liste des Unités d'Enseignement dont le professeur est responsable. |
| `GET` | `/teacher/courses/:ueCode/grades`| `ENSEIGNANT` | Bordereau de notes de la classe d'étudiants inscrits à l'UE. |
| `PUT` | `/teacher/courses/:ueCode/grades`| `ENSEIGNANT` | Enregistrement groupé ou individuel des notes de Contrôle Continu (/30) et Examen Final (/70). |
| `GET` | `/teacher/assigned-requests`| `ENSEIGNANT` | Liste des requêtes d'étudiants transmises pour instruction sur ses cours. |
| `POST` | `/teacher/resolve-request/:id`| `ENSEIGNANT` | Émission de la décision motivée : accord favorable (avec note CC/SN rectifiée) ou rejet. |

---

### 5.4. Module Scolarité Centrale & DAARS (`/api/v1/admin/daars`)

| Méthode | Endpoint | Rôles Autorisés | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/daars/quittances` | `ADMIN_DAARS`, `DOYEN` | Registre des quittances bancaires avec filtre par banque et statut. |
| `POST` | `/admin/daars/quittances/:numero/validate` | `ADMIN_DAARS` | Validation officielle du bordereau bancaire de 50 000 FCFA. |
| `GET` | `/admin/daars/requests` | `ADMIN_DAARS` | Registre général de toutes les réclamations de la Faculté. |
| `POST` | `/admin/daars/requests/:id/resolve` | `ADMIN_DAARS` | Traitement des actes (certificat de scolarité, correction matricule). |
| `POST` | `/admin/daars/babillard/publish`| `ADMIN_DAARS`, `DOYEN` | Verrouillage des jurys et publication officielle sur le Babillard numérique. |

---

### 5.5. Module Exécutif Décanat — Le Doyen (`/api/v1/admin/doyen`)

| Méthode | Endpoint | Rôles Autorisés | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/doyen/panoramic-stats`| `DOYEN` | Métriques globales : effectifs, total recettes quittances (696M FCFA), taux de réussite. |
| `GET` | `/admin/doyen/departments-overview`| `DOYEN` | Tableau comparatif détaillé des 10 départements de la Faculté. |
| `POST` | `/admin/doyen/decrees` | `DOYEN` | Signature électronique et enregistrement d'un arrêté décanal officiel. |
| `POST` | `/admin/doyen/broadcast-alert`| `DOYEN` | Diffusion instantanée d'une alerte prioritaire sur la page d'accueil du site. |

---

### 5.6. Module Webmaster CMS Live (`/api/v1/cms`)

| Méthode | Endpoint | Rôles Autorisés | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/cms/content/:pageId` | Public (Cached) | Retourne les textes dynamiques de la page demandée (Accueil, Présentation, Formations, etc.). |
| `GET` | `/cms/all-fields` | `WEBMASTER` | Liste complète de tous les champs textuels modifiables de l'ensemble du site. |
| `PUT` | `/cms/update-field/:cle`| `WEBMASTER` | Mise à jour de la valeur d'un texte, d'un titre H1, d'un slogan ou d'une coordonnée. |
| `POST` | `/cms/publish-all` | `WEBMASTER` | Validation et invalidation du cache Redis pour déploiement en direct sur tout le site. |
| `POST` | `/cms/reset-defaults` | `WEBMASTER` | Restauration des textes d'origine du site à partir du référentiel institutionnel. |

---

## 6. Contrôle d'Accès Basé sur les Rôles (RBAC) & Sécurité

### 6.1. Matrice des Droits et Privilèges (RBAC)

| Fonctionnalité / Domaine | `ETUDIANT` | `ENSEIGNANT` | `ADMIN_DAARS` | `DOYEN` | `WEBMASTER` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Consulter son Babillard personnel** | ✓ (Propre profil) | — | ✓ | ✓ | — |
| **Déposer une requête académique** | ✓ | — | — | — | — |
| **Saisir les notes de son cours (CC/SN)** | — | ✓ | — | — | — |
| **Instruire une réclamation d'UE** | — | ✓ | — | — | — |
| **Valider les quittances (50 000 FCFA)**| — | — | ✓ | ✓ | — |
| **Délivrer certificats de scolarité** | — | — | ✓ | ✓ | — |
| **Publier le Babillard officiel** | — | — | ✓ | ✓ | — |
| **Vue Panoramique des 10 Départements**| — | — | — | ✓ | — |
| **Émettre un Arrêté Décanal** | — | — | — | ✓ | — |
| **Éditer les textes du CMS (Toutes pages)**| — | — | — | — | ✓ |

### 6.2. Sécurisation des Jetons JWT
- **AccessToken** : Durée de vie courte (15 minutes), payload chiffré contenant `{ userId, role, matriculeOrCode }`.
- **RefreshToken** : Durée de vie 7 jours, stocké dans un cookie `HttpOnly`, `Secure`, `SameSite=Strict`, avec rotation automatique à chaque usage pour prévenir le rejeu.

---

## 7. Traçabilité Anti-Fraude & Piste d'Audit Immuable

Les notes universitaires et les procès-verbaux de délibération ont une valeur juridique souveraine. Toute modification ultérieure doit faire l'objet d'un audit infalsifiable.

### Structure d'un Enregistrement d'Audit :
```json
{
  "id": "aud-2026-084920",
  "userId": "user-enseignant-bch",
  "action": "RECTIFICATION_NOTE_CC",
  "entite": "InscriptionUE",
  "entiteId": "ue-bch302-std01",
  "ancienneValeur": {
    "noteCC": 0.0,
    "statut": "ABSENT"
  },
  "nouvelleValeur": {
    "noteCC": 23.0,
    "statut": "VALIDE",
    "justificatif": "Vérification cahier émargement S03 (Ticket REQ-2026-0482)"
  },
  "adresseIp": "192.168.42.10",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128",
  "horodatage": "2026-02-18T14:32:00.000Z"
}
```

---

## 8. Module CMS Live pour le Webmaster

Le CMS permet d'alimenter dynamiquement l'ensemble des pages publiques du frontend.

### Stratégie de Cache & Invalidation (Redis)
1. **Lecture Client** : Le frontend interroge `/api/v1/cms/content/:pageId`. Si la clé `cms:page:<pageId>` existe dans Redis, la réponse est servie en **moins de 5ms**.
2. **Édition Webmaster** : Le webmaster édite un ou plusieurs champs depuis son tableau de bord (`/admin/webmaster`).
3. **Publication** : Lors de l'appel à `/api/v1/cms/publish-all`, le backend :
   - Sauvegarde les modifications dans PostgreSQL en incrémentant la version.
   - Purge les clés `cms:page:*` du cache Redis.
   - Émet un événement via WebSocket pour actualiser instantanément les clients connectés.

---

## 9. Architecture de Déploiement & Dockerisation

### 9.1. Fichier `docker-compose.yml` de Production

```yaml
version: '3.8'

services:
  # ── API BACKEND NESTJS ──
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: fs_uy1_backend
    restart: always
    environment:
      NODE_ENV: production
      PORT: 4000
      DATABASE_URL: postgresql://fs_admin:Secr3tUY1Pass@postgres:5432/facsciences_db?schema=public
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET_KEY_PRODUCTION}
      S3_ENDPOINT: minio:9000
      S3_BUCKET: facsciences-documents
    ports:
      - "4000:4000"
    depends_on:
      - postgres
      - redis

  # ── BASE DE DONNÉES POSTGRESQL 16 ──
  postgres:
    image: postgres:16-alpine
    container_name: fs_uy1_postgres
    restart: always
    environment:
      POSTGRES_DB: facsciences_db
      POSTGRES_USER: fs_admin
      POSTGRES_PASSWORD: Secr3tUY1Pass
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  # ── CACHE REDIS 7 ──
  redis:
    image: redis:7-alpine
    container_name: fs_uy1_redis
    restart: always
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redisdata:/data
    ports:
      - "6379:6379"

  # ── STOCKAGE OBJETS S3 (MINIO) ──
  minio:
    image: minio/minio:RELEASE.2024-05-10T01-41-38Z
    container_name: fs_uy1_minio
    restart: always
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minio_fs_admin
      MINIO_ROOT_PASSWORD: MinioSecr3tPass2026
    volumes:
      - miniodata:/data
    ports:
      - "9000:9000"
      - "9001:9001"

volumes:
  pgdata:
  redisdata:
  miniodata:
```

### 9.2. Plan de Sauvegarde & Résilience
- **Sauvegarde Quotidienne** : Script cron exécutant un `pg_dump` complet de `facsciences_db` à 02h00 du matin, chiffré par clé GPG asymétrique et expédié vers un serveur de réplication hors-site.
- **Restauration d'Urgence** : Procédure de reprise après sinistre (DRP) permettant un rétablissement complet en moins de 15 minutes.

---

## 10. Conclusion & Feuille de Route d'Intégration

Ce cahier des charges backend offre une couverture intégrale des processus académiques, financiers et décisionnels de la Faculté des Sciences de l'Université de Yaoundé I. 

### Étapes Suivantes Immédiates :
1. **Initialisation des migrations Prisma** via `npx prisma migrate dev`.
2. **Peuplement initial des données (Seed)** avec les 10 départements, les maquettes de cours LMD et les comptes types.
3. **Mise en place des Webhooks bancaires** avec les établissements financiers partenaires de l'UY1.
4. **Déploiement en pré-production** pour les tests de charge lors des sessions de délibération des examens.
