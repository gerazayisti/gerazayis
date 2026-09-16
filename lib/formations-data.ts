// Données complètes et simplifiées de l'offre académique de la Faculté des Sciences - UY1
// Conforme au système LMD (Licence, Master, Doctorat) et aux 10 départements officiels.

export interface LmdCycle {
  code: string;
  name: string;
  shortName: string;
  badge: string;
  duration: string;
  credits: string;
  entryLevel: string;
  description: string;
  tracks: {
    title: string;
    description: string;
    badge: string;
  }[];
  pedagogicalFormat: string[];
  keyOutcomes: string[];
}

export interface FormationBranch {
  id: "academique" | "professionnelle" | "certification";
  code: string;
  name: string;
  subtitle: string;
  badge: string;
  targetCount: string;
  color: string;
  description: string;
  programsList: string[];
  keyStrengths: string[];
  targetAudience: string;
  anchorHref: string;
}

export const threeBranches: FormationBranch[] = [
  {
    id: "academique",
    code: "01",
    name: "Branche Académique & Recherche",
    subtitle: "Socle Fondamental LMD dans les 10 Départements",
    badge: "Licence · Master Recherche · Doctorat / PhD",
    targetCount: "10 Départements",
    color: "#5A2CA8",
    description:
      "Cursus d'excellence fondamentale dispensés par plus de 300 enseignants-chercheurs. Axés sur la rigueur conceptuelle, l'expérimentation en laboratoire et la préparation des futurs chercheurs et enseignants du supérieur.",
    programsList: [
      "Licences Fondamentales dans les 10 Départements scientifiques",
      "Masters Recherche orientés vers l'investigation et la découverte scientifique",
      "Doctorat / Ph.D avec thèses soutenues dans les unités de recherche accréditées",
    ],
    keyStrengths: [
      "Rigueur conceptuelle et publications internationales de rang A",
      "Passerelles directes vers les écoles doctorales et coopérations internationales",
      "Formation fondamentale solide reconnue mondialement",
    ],
    targetAudience: "Bacheliers et étudiants désireux d'embrasser de hautes carrières scientifiques, académiques et de recherche.",
    anchorHref: "#poles-scientifiques",
  },
  {
    id: "professionnelle",
    code: "02",
    name: "Branche Professionnelle",
    subtitle: "Licences Pro & Masters Pro pour l'Industrie",
    badge: "18 Cursus Pro (2 LP + 16 MP)",
    targetCount: "18 Diplômes Pro",
    color: "#18181b",
    description:
      "Filières professionnalisantes créées en prise directe avec les exigences des entreprises et des branches industrielles. Elles allient cours spécialisés, études de cas et stages obligatoires en milieu professionnel.",
    programsList: [
      "2 Licences Professionnelles : ICT4D et SIGL (Informatique)",
      "16 Masters Professionnels : Forêts, Mines & Pétrole, Géotechnique, Sécurité Alimentaire, Biotechnologies, Semences, One Health, etc.",
    ],
    keyStrengths: [
      "Forte employabilité immédiate sur le marché national et sous-régional",
      "Intervention d'experts du secteur privé et des institutions partenaires",
      "Stages en entreprise et projets de fin d'études professionnalisants",
    ],
    targetAudience: "Étudiants en quête d'un métier concret et techniciens souhaitant acquérir un grade de cadre supérieur.",
    anchorHref: "#formations-professionnelles",
  },
  {
    id: "certification",
    code: "03",
    name: "Branche Certifications & Formations Qualifiantes",
    subtitle: "Sessions Courtes Pratiques & Recyclage de Compétences",
    badge: "Certificats Universitaires Officiels",
    targetCount: "Certifications Continues",
    color: "#059669",
    description:
      "Modules intensifs de renforcement de compétences pratiques, sanctionnés par un Certificat officiel signé de l'Autorité Universitaire. Conçus pour les praticiens, techniciens et professionnels en reconversion.",
    programsList: [
      "Certification en gestion d'une scène de crime & Sciences Forensiques (BPA)",
      "Formation Professionnelle en Énergie Électrique Photovoltaïque (Physique)",
      "Certifications courtes appliquées de laboratoire et technologies numériques",
    ],
    keyStrengths: [
      "Formats intensifs courts compatibles avec une activité professionnelle",
      "Pratique sur bancs d'essais réels et manipulations directes",
      "Reconnaissance institutionnelle par l'Université de Yaoundé I",
    ],
    targetAudience: "Professionnels en poste, techniciens, officiers de police judiciaire, installateurs solaires et diplômés.",
    anchorHref: "#formations-professionnelles",
  },
];

export const lmdCycles: LmdCycle[] = [
  {
    code: "L",
    name: "Cycle Licence",
    shortName: "Licence (L1 - L2 - L3)",
    badge: "Premier Cycle · Bac + 3",
    duration: "3 ans (6 semestres)",
    credits: "180 crédits ECTS",
    entryLevel: "Baccalauréats C, D, E, F, GCE A-Level Scientifique ou équivalent",
    description:
      "Le cycle Licence permet d'acquérir le socle fondamental des connaissances scientifiques, la méthodologie de travail universitaire et une première orientation vers la recherche ou les métiers appliqués.",
    tracks: [
      {
        title: "Licence Fondamentale",
        description: "Enseignement théorique et fondamental approfondi, orienté vers la poursuite d'études en Master et Doctorat dans l'un des 10 départements scientifiques.",
        badge: "Recherche & Enseignement",
      },
      {
        title: "Licence Professionnelle",
        description: "Formation à forte composante pratique avec stages obligatoires en entreprise pour une insertion rapide sur le marché du travail camerounais et sous-régional.",
        badge: "Insertion Métier Directe",
      },
    ],
    pedagogicalFormat: [
      "Cours Magistraux (CM) en grands amphithéâtres",
      "Travaux Dirigés (TD) en groupes restreints pour la maîtrise des méthodes",
      "Travaux Pratiques (TP) obligatoires en laboratoires spécialisés",
      "Contrôles Continus (CC) et examens semestriels de validation",
    ],
    keyOutcomes: [
      "Maîtrise des concepts fondamentaux de la filière choisie",
      "Rigueur d'analyse, modélisation et esprit critique scientifique",
      "Compétences informatiques et bilinguisme scientifique (Français / Anglais)",
    ],
  },
  {
    code: "M",
    name: "Cycle Master",
    shortName: "Master (M1 - M2)",
    badge: "Deuxième Cycle · Bac + 5",
    duration: "2 ans (4 semestres)",
    credits: "120 crédits ECTS",
    entryLevel: "Licence scientifique validée dans la discipline correspondante",
    description:
      "Le cycle Master permet une haute spécialisation thématique, l'apprentissage de la méthodologie de recherche de pointe ou le perfectionnement technique pour les fonctions d'encadrement et d'ingénierie.",
    tracks: [
      {
        title: "Master Recherche",
        description: "Formation par la recherche scientifique au sein des laboratoires accrédités, sanctionnée par la rédaction et la soutenance publique d'un Mémoire de Master.",
        badge: "Préparation au Doctorat",
      },
      {
        title: "Master Professionnel",
        description: "Cursus spécialisés en adéquation avec les filières industrielles (Génie Logiciel, Data Science, Énergies Solaires, Phytochimie, Géomatériaux).",
        badge: "Cadre Technique & Ingénierie",
      },
    ],
    pedagogicalFormat: [
      "Séminaires thématiques de spécialité et ateliers de recherche",
      "Projets expérimentaux avancés en équipe",
      "Stage obligatoire en entreprise ou en laboratoire partenaire",
      "Soutenance publique de fin d'études devant un jury d'enseignants-chercheurs",
    ],
    keyOutcomes: [
      "Autonomie scientifique et maîtrise des outils technologiques de pointe",
      "Capacité à concevoir, diriger et évaluer un projet scientifique complexe",
      "Aptitude à la communication scientifique internationale",
    ],
  },
  {
    code: "D",
    name: "Cycle Doctorat / Ph.D",
    shortName: "Doctorat (PhD)",
    badge: "Troisième Cycle · Bac + 8",
    duration: "3 ans minimum (6 semestres)",
    credits: "Thèse de Doctorat",
    entryLevel: "Master Recherche scientifique avec mention et avis favorable du comité doctoral",
    description:
      "Le sommet des études universitaires scientifiques. Le candidat prépare une thèse originale contribuant à faire avancer la science mondiale sous la direction d'un Professeur ou Maître de Conférences de rang magistral.",
    tracks: [
      {
        title: "Thèse de Doctorat / Ph.D",
        description: "Recherche fondamentale ou appliquée sanctionnée par des publications dans des revues internationales de rang A et une soutenance publique solennelle.",
        badge: "Grade Universitaire Suprême",
      },
    ],
    pedagogicalFormat: [
      "Recherche expérimentale ou théorique à plein temps en laboratoire",
      "Publications d'articles indexés dans les banques de données scientifiques",
      "Participation aux colloques, congrès et écoles doctorales internationales",
      "Soutenance de thèse devant un jury d'experts nationaux et internationaux",
    ],
    keyOutcomes: [
      "Expertise scientifique de niveau mondial dans sa spécialité",
      "Accès aux carrières d'enseignant-chercheur du supérieur et de maître de recherche",
      "Capacité à diriger des unités de recherche scientifique et d'innovation",
    ],
  },
];

export const allOfficialDepartmentsList = [
  { code: "INF", name: "Informatique", fullName: "Département d’Informatique", slug: "informatique", domain: "exactes" },
  { code: "MAT", name: "Mathématiques", fullName: "Département de Mathématiques", slug: "mathematiques", domain: "exactes" },
  { code: "PHY", name: "Physique", fullName: "Département de Physique", slug: "physique", domain: "exactes" },
  { code: "ENR", name: "Énergie Renouvelable", fullName: "Département d’Énergie Renouvelable", slug: "energie-renouvelable", domain: "exactes" },
  { code: "BCH", name: "Biochimie", fullName: "Département de Biochimie", slug: "biochimie", domain: "vie" },
  { code: "BPA", name: "Biologie et Physiologie Animales", fullName: "Département de Biologie et Physiologie Animales", slug: "biologie-physiologie-animales", domain: "vie" },
  { code: "BPV", name: "Biologie et Physiologie Végétales", fullName: "Département de Biologie et Physiologie Végétales", slug: "biologie-physiologie-vegetales", domain: "vie" },
  { code: "MIB", name: "Microbiologie", fullName: "Département de Microbiologie", slug: "microbiologie", domain: "vie" },
  { code: "COr", name: "Chimie Organique", fullName: "Département de Chimie Organique", slug: "chimie-organique", domain: "matiere" },
  { code: "CIn", name: "Chimie Inorganique", fullName: "Département de Chimie Inorganique", slug: "chimie-inorganique", domain: "matiere" },
  { code: "STU", name: "Sciences de la Terre", fullName: "Département des Sciences de la Terre", slug: "sciences-de-la-terre", domain: "matiere" },
];

export const biochimieDepartmentDetails = {
  name: "Biochimie",
  fullName: "Département de Biochimie",
  faculty: "Faculté des Sciences · Université de Yaoundé I",
  code: "BCH",
  foundationYear: "1964",
  history: "Le Département de Biochimie de la Faculté des Sciences a ouvert ses portes en 1964.",
  missions: [
    "La formation fondamentale et appliquée dans les différents aspects de la biochimie",
    "La recherche",
    "L’appui au développement",
  ],
  careerOutcomes: [
    "Enseignement",
    "Recherche (clinique, agricole, biomédicale, pharmaceutique, etc…)",
    "Technicien de laboratoire",
    "Contrôle qualité",
    "Délégué médical",
    "Industries agro-alimentaire et cosmétique",
    "PME en biotechnologies",
    "Administration centrale (Ministère du commerce, Ministère de l’industrie, etc…)",
    "Auto emploi",
  ],
  flagshipProject: {
    name: "Projet SOILGUARD",
    subtitle: "Recherche sur la biodiversité des sols et appui aux politiques de préservation",
    links: [
      { label: "Photos et vidéos", type: "media", url: "https://uy1.uninet.cm/wp-content/uploads/2025/04/Soilguard-Brochure-2-soil-biodiversity-researchers-educators-and-policy-supporters-for-Digital-Sharing_opt.pdf" },
      { label: "Résultats", type: "results", url: "#" },
      { label: "Évènements", type: "events", url: "#" },
    ],
  },
  downloadableGrids: [
    { title: "Grille des unités d’enseignement du niveau I", level: "Niveau I (Licence 1)", url: "#" },
    { title: "Grille des unités d’enseignement du niveau II", level: "Niveau II (Licence 2)", url: "#" },
    { title: "Grille des unités d’enseignement du niveau III", level: "Niveau III (Licence 3)", url: "#" },
    { title: "Grille des unités d’enseignement du niveau IV", level: "Niveau IV (Master 1)", url: "#" },
  ],
  downloadableSyllabi: [
    { title: "Programme des enseignements niveau II", level: "Niveau II (Licence 2)", url: "#" },
    { title: "Programme des enseignements niveau III", level: "Niveau III (Licence 3)", url: "#" },
  ],
  professionalPrograms: [
    { title: "Sécurité Sanitaire des Aliments", type: "Master Professionnel", duration: "2 ans" },
    { title: "Biotechnologie de la Santé Publique", type: "Master Professionnel", duration: "2 ans" },
  ],
  images: [
    {
      src: "/research_lab.jpg",
      title: "Laboratoire de Recherche en Biochimie & Enzymologie",
      caption: "Bancs d'analyse spectrophotométrique et équipements de biochimie clinique, fondamentale et appliquée.",
      tag: "Recherche & Labo",
    },
    {
      src: "/courses/chemistry.jpg",
      title: "Travaux Pratiques & Expérimentations Étudiantes",
      caption: "Séances encadrées de travaux pratiques (TP) obligatoires pour les étudiants de Licence et Master.",
      tag: "Pédagogie & TP",
    },
    {
      src: "/student_story.jpg",
      title: "Séminaires & Projets d'Études en Équipe",
      caption: "Présentation des travaux de recherche par les étudiants-chercheurs et doctorants du département.",
      tag: "Vie Scientifique",
    },
    {
      src: "/campus_facade.jpg",
      title: "Bloc des Sciences de la Vie — Campus Principal",
      caption: "Bâtiment abritant les salles de cours spécialisées, bureaux des enseignants et laboratoires de biochimie.",
      tag: "Infrastructures",
    },
  ],
  events: [
    {
      id: "ev-01",
      date: "Prochainement",
      day: "28",
      month: "NOV",
      year: "2026",
      title: "Séminaire de Recherche : Avancées en Sécurité Sanitaire des Aliments",
      type: "Séminaire Scientifique",
      badge: "À venir",
      location: "Salle de Conférence du Département de Biochimie",
      description: "Présentation des résultats récents sur la détection des contaminants chimiques et mycotoxines dans les denrées agroalimentaires camerounaises.",
      speaker: "Équipe pédagogique du Master Professionnel Sécurité Sanitaire des Aliments",
    },
    {
      id: "ev-02",
      date: "Édition 2026",
      day: "15",
      month: "OCT",
      year: "2026",
      title: "Atelier International SOILGUARD : Biodiversité des Sols et Santé Écosystémique",
      type: "Colloque International",
      badge: "Projet Phare",
      location: "Amphithéâtre 1001 — Campus Principal UY1",
      description: "Restitution des analyses pédologiques, partage des indicateurs de biodiversité microbienne et interactions avec les acteurs du monde agricole.",
      speaker: "Consortium International SOILGUARD & Enseignants-Chercheurs de la Faculté",
    },
    {
      id: "ev-03",
      date: "Session Annuelle",
      day: "12",
      month: "DÉC",
      year: "2026",
      title: "Soutenances Publiques des Mémoires de Master Professionnel & Recherche",
      type: "Soutenances Publiques",
      badge: "Diplomation",
      location: "Bloc Pédagogique — Salles de Soutenance",
      description: "Présentation solennelle devant les jurys universitaires des mémoires de fin d'études en biotechnologie de santé publique et biochimie.",
      speaker: "Promotion Master 2 & Jurys d'enseignants de rang magistral",
    },
  ],
  contact: {
    chefEmail: "cdbc@facsciences.uy1.cm",
    secretariatEmail: "cdbc.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Bloc Sciences de la Vie, Plateau Atemengue",
    phone: "(+237) 222 23 44 96",
  },
};

export const departmentContactsMap: Record<string, { chefEmail: string; secretariatEmail: string; location: string }> = {
  INF: {
    chefEmail: "cdin@facsciences.uy1.cm",
    secretariatEmail: "cdin.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Bloc Informatique & Réseaux",
  },
  MAT: {
    chefEmail: "cdma@facsciences.uy1.cm",
    secretariatEmail: "cdma.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Bâtiment des Mathématiques",
  },
  PHY: {
    chefEmail: "cdph@facsciences.uy1.cm",
    secretariatEmail: "cdph.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Pavillon de Physique",
  },
  ENR: {
    chefEmail: "cdenr@facsciences.uy1.cm",
    secretariatEmail: "cdph@facsciences.uy1.cm",
    location: "Campus Principal — Pôle Énergie Renouvelable & Solaire",
  },
  BCH: {
    chefEmail: "cdbc@facsciences.uy1.cm",
    secretariatEmail: "cdbc.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Bloc Sciences de la Vie, Plateau Atemengue",
  },
  BPA: {
    chefEmail: "cdbpa@facsciences.uy1.cm",
    secretariatEmail: "cdbpa.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Département Biologie Animale",
  },
  BPV: {
    chefEmail: "cdbpv@facsciences.uy1.cm",
    secretariatEmail: "cdbpv.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Département Biologie Végétale & Herbier National",
  },
  MIB: {
    chefEmail: "cdmib@facsciences.uy1.cm",
    secretariatEmail: "cdmib.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Laboratoire Central de Microbiologie",
  },
  COr: {
    chefEmail: "cdcor@facsciences.uy1.cm",
    secretariatEmail: "cdcor.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Pavillon de Chimie Organique",
  },
  CIn: {
    chefEmail: "cdcin@facsciences.uy1.cm",
    secretariatEmail: "cdcin.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Pavillon de Chimie Inorganique",
  },
  STU: {
    chefEmail: "cdstu@facsciences.uy1.cm",
    secretariatEmail: "cdstu.secretariat@facsciences.uy1.cm",
    location: "Campus Principal — Bloc Géosciences & Muséum Minéralogique",
  },
};

export interface DepartmentImageItem {
  src: string;
  title: string;
  caption: string;
  tag: string;
}

export interface DepartmentEventItem {
  id: string;
  date: string;
  day: string;
  month: string;
  year: string;
  title: string;
  type: string;
  badge: string;
  location: string;
  description: string;
  speaker: string;
}

export function getDepartmentImagesAndEvents(code: string): {
  images: DepartmentImageItem[];
  events: DepartmentEventItem[];
} {
  if (code === "BCH") {
    return {
      images: biochimieDepartmentDetails.images,
      events: biochimieDepartmentDetails.events,
    };
  }

  if (code === "INF") {
    return {
      images: [
        {
          src: "/courses/computer.jpg",
          title: "Laboratoire de Développement & Systèmes Logiciels",
          caption: "Postes de travail réseau, serveurs de test et environnements de déploiement pour ICT4D et SIGL.",
          tag: "Génie Logiciel",
        },
        {
          src: "/research_lab.jpg",
          title: "Centre de Calcul & Laboratoire de Recherche en IA",
          caption: "Infrastructure dédiée aux travaux de modélisation algorithmique, big data et traitement automatique.",
          tag: "Recherche Avancée",
        },
        {
          src: "/student_story.jpg",
          title: "Séances de Code Collaboratif & Projets Étudiants",
          caption: "Ateliers pratiques, sprints de développement et présentations de projets en équipe.",
          tag: "Pédagogie Active",
        },
        {
          src: "/campus_facade.jpg",
          title: "Bâtiment Pédagogique Informatique — Campus Principal",
          caption: "Espace abritant les salles de cours spécialisées, les laboratoires et les bureaux des enseignants.",
          tag: "Infrastructures",
        },
      ],
      events: [
        {
          id: "inf-ev-01",
          date: "Prochainement",
          day: "25",
          month: "NOV",
          year: "2026",
          title: "Démo Day & Hackathon : Solutions Logicielles ICT4D pour l'Afrique",
          type: "Hackathon Pédagogique",
          badge: "À venir",
          location: "Laboratoire Central d'Informatique",
          description: "Compétition de prototypage rapide d'applications mobiles et plateformes web à fort impact social pour les étudiants de Licence Pro et Master SIGL.",
          speaker: "Jurys d'experts du secteur numérique camerounais et enseignants",
        },
        {
          id: "inf-ev-02",
          date: "Édition 2026",
          day: "14",
          month: "OCT",
          year: "2026",
          title: "Séminaire de Recherche : Intelligence Artificielle & Traitement des Données Locales",
          type: "Séminaire Scientifique",
          badge: "Recherche",
          location: "Amphithéâtre 1001 — UY1",
          description: "Conférence sur les avancées de l'apprentissage profond appliqué aux langues nationales camerounaises et à la télémédecine.",
          speaker: "Équipe du Laboratoire d'Informatique Fondamentale et Appliquée",
        },
        {
          id: "inf-ev-03",
          date: "Session Annuelle",
          day: "10",
          month: "DÉC",
          year: "2026",
          title: "Soutenances Publiques des Mémoires de Master Professionnel SIGL",
          type: "Soutenances Publiques",
          badge: "Diplomation",
          location: "Salles de Soutenances — Bloc Informatique",
          description: "Évaluation devant jurys académiques et industriels des stages de fin d'études et architectures logicielles d'entreprise.",
          speaker: "Promotion sortante Master SIGL & jurys d'enseignants",
        },
      ],
    };
  }

  if (code === "ENR") {
    return {
      images: [
        {
          src: "/courses/solar.jpg",
          title: "Banc d'Essai Photovoltaïque & Centrale Solaire Pilote",
          caption: "Modules photovoltaïques monocristallins et polycristallins, onduleurs et instrumentation de mesure solaire.",
          tag: "Énergie Solaire",
        },
        {
          src: "/research_lab.jpg",
          title: "Laboratoire de Conversion et Stockage d'Énergie",
          caption: "Bancs d'analyse thermique, batteries stationnaires et régulateurs de charge pour réseaux autonomes.",
          tag: "Recherche & Mesure",
        },
        {
          src: "/student_story.jpg",
          title: "Atelier Pratique de Câblage & Dimensionnement",
          caption: "Travaux pratiques de dimensionnement et d'installation solaire encadrés par des spécialistes de la filière.",
          tag: "Travaux Pratiques",
        },
        {
          src: "/campus_facade.jpg",
          title: "Pôle Technique Énergie Renouvelable — Campus UY1",
          caption: "Plateforme d'expérimentation pour la Licence Pro, le Master Pro et les formations certifiantes en énergie.",
          tag: "Infrastructures",
        },
      ],
      events: [
        {
          id: "enr-ev-01",
          date: "Prochainement",
          day: "20",
          month: "NOV",
          year: "2026",
          title: "Atelier Technique : Dimensionnement & Maintenance des Micro-Réseaux Hybrides",
          type: "Atelier Professionnel",
          badge: "À venir",
          location: "Plateforme Solaire de la Faculté des Sciences",
          description: "Formation pratique et démonstration de maintenance préventive sur onduleurs hybrides et stockage lithium-ion.",
          speaker: "Ingénieurs et enseignants de la filière Énergie Renouvelable",
        },
        {
          id: "enr-ev-02",
          date: "Édition 2026",
          day: "18",
          month: "OCT",
          year: "2026",
          title: "Colloque National sur la Transition Énergétique & l'Électrification Rurale",
          type: "Colloque National",
          badge: "Énergie & Climat",
          location: "Amphithéâtre 1001 — Campus Principal",
          description: "Échanges entre chercheurs universitaires, ministères techniques (MINEE) et opérateurs solaires du Cameroun.",
          speaker: "Comité scientifique de la filière Énergie Renouvelable",
        },
        {
          id: "enr-ev-03",
          date: "Session Annuelle",
          day: "05",
          month: "DÉC",
          year: "2026",
          title: "Remise des Certificats Professionnels & Soutenances de Projets Solaires",
          type: "Soutenances & Diplomation",
          badge: "Diplomation",
          location: "Salle des Actes de la Faculté des Sciences",
          description: "Cérémonie officielle de diplomation des promotions Licence Pro, Master Pro et Certification Énergie Photovoltaïque.",
          speaker: "Doyen de la Faculté des Sciences & Responsables de la filière",
        },
      ],
    };
  }

  // Fallback universel riche pour les autres départements (MAT, PHY, BPA, BPV, MIB, COr, CIn, STU)
  return {
    images: [
      {
        src: "/research_lab.jpg",
        title: "Laboratoire de Recherche Spécialisé",
        caption: "Bancs d'analyse expérimentale et équipements scientifiques de pointe du département.",
        tag: "Recherche & Labo",
      },
      {
        src: "/courses/chemistry.jpg",
        title: "Travaux Pratiques & Expérimentations Étudiantes",
        caption: "Séances de manipulation et d'expérimentation encadrées pour les étudiants de Licence et Master.",
        tag: "Pédagogie & TP",
      },
      {
        src: "/student_story.jpg",
        title: "Séminaires Thématiques & Travail en Équipe",
        caption: "Présentation des résultats de recherche et préparation collégiale des mémoires de recherche.",
        tag: "Vie Scientifique",
      },
      {
        src: "/campus_facade.jpg",
        title: "Pavillon du Département — Campus Principal",
        caption: "Bâtiment d'enseignement accueillant les bureaux professoraux, salles de cours et laboratoires.",
        tag: "Infrastructures",
      },
    ],
    events: [
      {
        id: `${code.toLowerCase()}-ev-01`,
        date: "Prochainement",
        day: "26",
        month: "NOV",
        year: "2026",
        title: "Séminaire de Recherche Départemental : Nouvelles Frontières Scientifiques",
        type: "Séminaire Scientifique",
        badge: "À venir",
        location: "Salle de Séminaire du Département",
        description: "Exposé des résultats de travaux de doctorat et échanges scientifiques entre enseignants et chercheurs.",
        speaker: "Enseignants de rang magistral et chercheurs associés du département",
      },
      {
        id: `${code.toLowerCase()}-ev-02`,
        date: "Édition 2026",
        day: "16",
        month: "OCT",
        year: "2026",
        title: "Journées Portes Ouvertes & Démonstrations Expérimentales",
        type: "Journée Scientifique",
        badge: "Vulgarisation",
        location: "Laboratoires Pédagogiques du Département",
        description: "Visite guidée des installations de recherche, démonstrations pratiques et échanges avec les futurs étudiants.",
        speaker: "Équipe pédagogique et associations étudiantes scientifiques",
      },
      {
        id: `${code.toLowerCase()}-ev-03`,
        date: "Session Annuelle",
        day: "15",
        month: "DÉC",
        year: "2026",
        title: "Soutenances Publiques des Mémoires de Master & Thèses",
        type: "Soutenances Publiques",
        badge: "Diplomation",
        location: "Amphithéâtre Dédié — Faculté des Sciences",
        description: "Présentation publique des travaux de recherche de deuxième et troisième cycle devant les jurys universitaires.",
        speaker: "Candidats de Master et Doctorat & Jurys officiels",
      },
    ],
  };
}

export interface FormationsDomain {
  id: string;
  name: string;
  badge: string;
  color: string;
  description: string;
  departments: {
    code: string;
    name: string;
    slug: string;
    summary: string;
    degrees: string[];
    specialties: string[];
    careers: string[];
  }[];
}

export const formationsDomains: FormationsDomain[] = [
  {
    id: "exactes",
    name: "Sciences Exactes & Technologies Numériques",
    badge: "4 Départements",
    color: "#5A2CA8",
    description:
      "Formations d'élite en informatique, modélisation mathématique, télécommunications, intelligence artificielle, physique des matériaux et énergie renouvelable.",
    departments: [
      {
        code: "INF",
        name: "Département d’Informatique",
        slug: "informatique",
        summary: "Architecture logicielle, intelligence artificielle, cybersécurité, réseaux, data science et calcul haute performance.",
        degrees: ["Licence Informatique", "Licences Pro (SIGL, ICT4D)", "Master Recherche & Pro", "Doctorat / Ph.D"],
        specialties: ["Génie Logiciel & Systèmes Web", "Intelligence Artificielle & Data Science", "Cybersécurité & Réseaux", "Systèmes Distribués & Cloud"],
        careers: ["Ingénieur logiciel", "Data Scientist", "Architecte Cloud", "Consultant en cybersécurité", "Chercheur en informatique"],
      },
      {
        code: "MAT",
        name: "Département de Mathématiques",
        slug: "mathematiques",
        summary: "Mathématiques fondamentales et appliquées, probabilités, statistique décisionnelle, analyse numérique et modélisation biomathématique.",
        degrees: ["Licence Mathématiques", "Master Fondamental & Appliqué", "Doctorat / Ph.D"],
        specialties: ["Analyse & Équations Différentielles", "Algèbre & Géométrie", "Probabilités & Statistique Appliquée", "Modélisation Mathématique"],
        careers: ["Statisticien / Biostatisticien", "Actuaire & Analyste quantitatif", "Modélisateur", "Enseignant-chercheur", "Analyste de données financières"],
      },
      {
        code: "PHY",
        name: "Département de Physique",
        slug: "physique",
        summary: "Physique des matériaux, électronique, télécommunications, mécanique des fluides, nanosciences et géophysique.",
        degrees: ["Licence Physique", "Master Physique Fondamentale & Pro", "Doctorat / Ph.D"],
        specialties: ["Physique des Matériaux & Semi-conducteurs", "Électronique & Télécoms", "Mécanique & Géophysique", "Nanosciences"],
        careers: ["Physicien des matériaux", "Technicien supérieur électronicien", "Expert géophysicien", "Chercheur"],
      },
      {
        code: "ENR",
        name: "Département d’Énergie Renouvelable",
        slug: "energie-renouvelable",
        summary: "Génie solaire photovoltaïque, conception et audit d'installations solaires, conversion d'énergie et transition énergétique.",
        degrees: ["Licence Professionnelle ENR", "Master Professionnel ENR", "Certificat d'État Solaire"],
        specialties: ["Production d'Énergie Électrique Photovoltaïque", "Systèmes Solaires Raccordés & Autonomes", "Stockage Électrochimique & Onduleurs", "Audit Énergétique"],
        careers: ["Ingénieur solaire photovoltaïque", "Chef de projet énergies renouvelables", "Installateur et auditeur agréé", "Gestionnaire de micro-réseaux"],
      },
    ],
  },
  {
    id: "vie",
    name: "Sciences de la Vie, Santé & Biotechnologies",
    badge: "4 Départements",
    color: "#059669",
    description:
      "Cursus scientifiques dédiés aux mécanismes vivants, à la génétique, à la microbiologie appliquée, aux biotechnologies médicales, végétales et animales.",
    departments: [
      {
        code: "BCH",
        name: "Département de Biochimie",
        slug: "biochimie",
        summary: "Biochimie fondamentale, biologie moléculaire, biochimie clinique, toxicologie, nutrition et bio-industries.",
        degrees: ["Licence Biochimie", "Master Recherche & Pro", "Doctorat / Ph.D"],
        specialties: ["Biologie Moléculaire & Génétique", "Biochimie Médicale & Clinique", "Sciences des Aliments & Nutrition", "Toxicologie & Pharmacologie"],
        careers: ["Biochimiste de laboratoire clinique", "Responsable qualité agroalimentaire", "Chercheur en biologie médicale", "Expert toxicologue"],
      },
      {
        code: "MIB",
        name: "Département de Microbiologie",
        slug: "microbiologie",
        summary: "Bactériologie, virologie, mycologie médicale, immunologie des maladies infectieuses et biotechnologies microbiennes.",
        degrees: ["Licence Microbiologie", "Master Recherche & Pro", "Doctorat / Ph.D"],
        specialties: ["Bactériologie & Virologie Médicale", "Biotechnologies Microbiennes Industrielles", "Bio-sécurité & Contrôle Qualité", "Microbiologie Environnementale"],
        careers: ["Microbiologiste d'analyse médicale", "Responsable de bio-sécurité industrielle", "Spécialiste du traitement des eaux", "Chercheur"],
      },
      {
        code: "BPV",
        name: "Département de Biologie et Physiologie Végétales",
        slug: "biologie-physiologie-vegetales",
        summary: "Botanique tropicale, génétique et amélioration des cultures, phytopathologie, agro-écologie et valorisation de la flore camerounaise.",
        degrees: ["Licence Biologie Végétale", "Master Recherche & Pro", "Doctorat / Ph.D"],
        specialties: ["Botanique Tropicale & Taxonomie", "Physiologie & Nutrition Végétale", "Phytopathologie & Protection des Cultures", "Biotechnologies Végétales & Agroforesterie"],
        careers: ["Agronome botaniste", "Spécialiste de la protection des végétaux", "Responsable de pépinière / herboristerie", "Chercheur en écologie végétale"],
      },
      {
        code: "BPA",
        name: "Département de Biologie et Physiologie Animales",
        slug: "biologie-physiologie-animales",
        summary: "Zoologie, physiologie animale, parasitologie tropicale, gestion de la faune sauvage, entomologie médicale et aquaculture durable.",
        degrees: ["Licence Biologie Animale", "Master Recherche & Pro", "Doctorat / Ph.D"],
        specialties: ["Parasitologie & Vecteurs de Maladies", "Physiologie & Endocrinologie Animale", "Écologie Faunique & Aires Protégées", "Pisciculture & Aquaculture"],
        careers: ["Biologiste spécialiste des vecteurs de santé", "Gestionnaire de parcs et réserves naturelles", "Ingénieur aquacole", "Chercheur en parasitologie"],
      },
    ],
  },
  {
    id: "matiere",
    name: "Sciences de la Matière, de la Terre & Environnement",
    badge: "3 Départements",
    color: "#D97706",
    description:
      "Chimie des substances naturelles, chimie minérale et des matériaux locaux, géologie, exploration minière, ressources en eau et géotechnique.",
    departments: [
      {
        code: "COr",
        name: "Département de Chimie Organique",
        slug: "chimie-organique",
        summary: "Synthèse organique, phytochimie, extraction de principes actifs de plantes médicinales camerounaises et chimie cosmétique / pharmaceutique.",
        degrees: ["Licence Chimie Organique", "Master Recherche & Pro", "Doctorat / Ph.D"],
        specialties: ["Phytochimie & Substances Naturelles", "Synthèse Moléculaire Organique", "Chimie Médicinale & Thérapeutique", "Valorisation des Agro-ressources"],
        careers: ["Chimiste formulateur (cosmétique, pharmacie)", "Spécialiste en phyto-médicaments", "Analyste chromatographie", "Chercheur chimiste"],
      },
      {
        code: "CIn",
        name: "Département de Chimie Inorganique",
        slug: "chimie-inorganique",
        summary: "Chimie minérale, chimie de coordination, étude des argiles locales et céramiques, catalyse industrielle et traitement des pollutions.",
        degrees: ["Licence Chimie Inorganique", "Master Recherche & Pro", "Doctorat / Ph.D"],
        specialties: ["Chimie des Matériaux & Argiles Locales", "Chimie Minérale & Métallurgie", "Chimie de Coordination", "Dépollution & Physico-chimie de l'Environnement"],
        careers: ["Ingénieur des matériaux céramiques / cimenteries", "Chimiste d'analyse minière", "Responsable traitement des effluents", "Chercheur"],
      },
      {
        code: "STU",
        name: "Département des Sciences de la Terre",
        slug: "sciences-de-la-terre",
        summary: "Cartographie géologique, hydrogéologie, prospection minière et pétrolière, géotechnique routière et surveillance des risques volcaniques.",
        degrees: ["Licence Sciences de la Terre", "Master Géosciences & Pro", "Doctorat / Ph.D"],
        specialties: ["Géologie Structurale & Pétrologie", "Hydrogéologie & Gestion des Eaux", "Prospection Minière, Carrières & Énergies", "Géotechnique & Risques Sismiques"],
        careers: ["Géologue d'exploration minière", "Hydrogéologue (forages et eau potable)", "Ingénieur géotechnicien (BTP)", "Volcanologue / Sismologue"],
      },
    ],
  },
];

export const certifiantePrograms = [
  {
    code: "CERT-ENR",
    title: "Production d'Énergie Électrique Photovoltaïque (Solaire)",
    department: "Département de Physique / Faculté des Sciences",
    accreditation: "Formation certifiante d'État · Université de Yaoundé I",
    badge: "Session Permanente",
    duration: "Formation intensive courte (Théorie & Pratique en atelier)",
    target: "Bacheliers scientifiques, étudiants, techniciens, ingénieurs et professionnels de l'énergie",
    objective:
      "Former des spécialistes directement opérationnels pour le dimensionnement, l'installation, le raccordement et la maintenance des systèmes solaires photovoltaïques autonomes et raccordés au réseau.",
    modules: [
      "Gisement solaire et rayonnement au Cameroun et en Afrique Centrale",
      "Technologie des cellules et panneaux photovoltaïques",
      "Régulateurs de charge, onduleurs, convertisseurs et parcs de batteries",
      "Dimensionnement pratique d'installations solaires résidentielles et industrielles",
      "Normes de sécurité électrique, protection parafoudre et maintenance préventive",
      "Travaux pratiques sur bancs d'essais solaires réels de la Faculté",
    ],
    diplomaIssued: "Certificat d'Aptitude Professionnelle signé de l'Autorité Universitaire",
    href: "/formations/energie-renouvelable",
  },
];

export interface ProfessionalProgramItem {
  id: string;
  type: "Certificat" | "Licence Professionnelle" | "Master Professionnel";
  levelBadge: string;
  department: string;
  departmentCode: string;
  title: string;
  option?: string;
  duration: string;
  summary: string;
  careers: string[];
}

export const professionalProgramsList: ProfessionalProgramItem[] = [
  // ── 1. CERTIFICATS ──
  {
    id: "cert-forensique",
    type: "Certificat",
    levelBadge: "Certificat Professionnel",
    department: "Département de Biologie et Physiologie Animales",
    departmentCode: "BPA",
    title: "Certification en gestion optimale d'une scène de crime : Importance des sciences Forensiques",
    duration: "Session courte certifiante",
    summary: "Formation spécialisée en criminalistique biologique, recueil et analyse d'indices biologiques sur scène d'infraction, entomologie médicolégale et protocoles médico-légaux rigoureux.",
    careers: ["Expert criminalistique", "Technicien de scène de crime", "Consultant médico-légal", "Officier de police judiciaire spécialisé"],
  },
  {
    id: "cert-photovoltaique",
    type: "Certificat",
    levelBadge: "Certificat Professionnel",
    department: "Département d’Énergie Renouvelable",
    departmentCode: "ENR",
    title: "Production d'Énergie Électrique Photovoltaïque",
    duration: "Session certifiante intensive",
    summary: "Dimensionnement, ingénierie d'installation, maintenance des convertisseurs et accumulateurs solaires, et raccordement aux réseaux électriques et sites isolés.",
    careers: ["Installateur solaire agréé", "Technicien supérieur photovoltaïque", "Gestionnaire de micro-centrales solaires", "Auditeur énergétique"],
  },

  // ── 2. LICENCES PROFESSIONNELLES ──
  {
    id: "lp-ict4d",
    type: "Licence Professionnelle",
    levelBadge: "Licence Pro · Bac + 3",
    department: "Département d'Informatique",
    departmentCode: "INF",
    title: "Information and Communication Technology for Development (ICT4D)",
    duration: "1 an après Bac+2 ou parcours complet 3 ans",
    summary: "Conception et déploiement de solutions numériques, applicatifs mobiles et plateformes cloud adaptées aux défis de développement socio-économique en Afrique.",
    careers: ["Chef de projet digital TIC", "Développeur de solutions e-santé / e-agri", "Administrateur de plateformes communautaires", "Consultant TIC"],
  },
  {
    id: "lp-sigl",
    type: "Licence Professionnelle",
    levelBadge: "Licence Pro · Bac + 3",
    department: "Département d'Informatique",
    departmentCode: "INF",
    title: "Système d'Information et Génie Logiciel (SIGL)",
    duration: "1 an après Bac+2 ou parcours complet 3 ans",
    summary: "Génie logiciel avancé, architecture des bases de données d'entreprise, développement web full-stack, cybersécurité opérationnelle et gouvernance des SI.",
    careers: ["Ingénieur d'études et développement logiciel", "Administrateur de bases de données", "Analyste programmeur", "Architecte d'applications Web & Mobile"],
  },
  {
    id: "lp-enr",
    type: "Licence Professionnelle",
    levelBadge: "Licence Pro · Bac + 3",
    department: "Département d’Énergie Renouvelable",
    departmentCode: "ENR",
    title: "Licence Professionnelle en Énergie Renouvelable",
    option: "Option : Production d'Énergie Électrique Photovoltaïque",
    duration: "3 ans (6 semestres)",
    summary: "Formation d'ingénierie et de technicité appliquée pour la conception, le dimensionnement, le raccordement et la maintenance de parcs solaires et générateurs photovoltaïques.",
    careers: ["Chef de chantier solaire", "Technicien supérieur photovoltaïque", "Auditeur d'installations solaires", "Installateur agréé systèmes solaires"],
  },

  // ── 3. MASTERS PROFESSIONNELS ──
  // Énergie Renouvelable (1)
  {
    id: "mp-enr",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département d’Énergie Renouvelable",
    departmentCode: "ENR",
    title: "Master Professionnel en Énergie Renouvelable",
    option: "Option : Ingénierie & Gestion des Énergies Nouvelles et Renouvelables",
    duration: "2 ans (4 semestres)",
    summary: "Management de projets énergétiques, dimensionnement d'infrastructures hybrides et réseaux intelligents (smart grids), politiques énergétiques et audit thermique & photovoltaïque.",
    careers: ["Ingénieur en chef de projets solaires", "Consultant en transition énergétique", "Responsable bureau d'études ENR", "Directeur d'exploitation de micro-centrales"],
  },

  // Biologie et Physiologie Végétales (8)
  {
    id: "mp-bpv-assainissement",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Sciences de l'Environnement",
    option: "Option : Assainissement et Restauration de l'Environnement",
    duration: "2 ans (4 semestres)",
    summary: "Phytoremédiation, traitement écologique des eaux usées, remédiation des sols pollués et réhabilitation écologique des sites dégradés par l'activité humaine.",
    careers: ["Ingénieur en assainissement écologique", "Expert en restauration des sols", "Consultant en dépollution végétale", "Auditeur environnemental"],
  },
  {
    id: "mp-bpv-audit-foret",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Sciences Forestières",
    option: "Option : Audit et Certification des Forêts et Aires Protégées",
    duration: "2 ans (4 semestres)",
    summary: "Normes de certification forestière internationale (FSC, PEFC), traçabilité du bois, conformité légale et gouvernance des concessions forestières tropicales.",
    careers: ["Auditeur forestier certifié", "Responsable certification et traçabilité", "Cadre dans l'administration des Eaux et Forêts", "Expert ONG conservation"],
  },
  {
    id: "mp-bpv-aires-protegees",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Sciences Forestières",
    option: "Option : Aires Protégées",
    duration: "2 ans (4 semestres)",
    summary: "Planification stratégique, zonage, surveillance écologique et gestion participative des parcs nationaux et réserves de biodiversité.",
    careers: ["Conservateur de parc national", "Gestionnaire d'aires protégées", "Chargé de mission biodiversité", "Expert en écologie du paysage"],
  },
  {
    id: "mp-bpv-agroforesterie",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Sciences Forestières",
    option: "Option : Agroforesterie",
    duration: "2 ans (4 semestres)",
    summary: "Association durable des essences ligneuses et des cultures vivrières, piégeage du carbone, résilience climatique et intensification écologique.",
    careers: ["Ingénieur agroforestier", "Conseiller en transition agro-écologique", "Responsable de projets carbone forestier", "Développeur de filières durables"],
  },
  {
    id: "mp-bpv-sciences-forestieres",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Master Professionnel en Sciences Forestières",
    duration: "2 ans (4 semestres)",
    summary: "Sylviculture tropicale, dynamique des peuplements forestiers, aménagement durable du massif forestier du Bassin du Congo et dendrométrie avancée.",
    careers: ["Ingénieur forestier", "Responsable d'aménagement forestier", "Directeur d'exploitation responsable", "Chercheur en sylviculture"],
  },
  {
    id: "mp-bpv-semences",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Industrie des Semences",
    option: "Option : Technologie des Semences",
    duration: "2 ans (4 semestres)",
    summary: "Sélection variétale, multiplication contrôlée, contrôle qualité germinatif, conditionnement industriel et réglementation semencière nationale et internationale.",
    careers: ["Directeur de station semencière", "Technologiste semencier", "Inspecteur de certification des semences", "Sélectionneur végétal junior"],
  },
  {
    id: "mp-bpv-littoraux",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Gestion Intégrée des Environnements littoraux et Marins",
    option: "Option : Évaluation et Audit Environnemental",
    duration: "2 ans (4 semestres)",
    summary: "Gestion des mangroves, lutte contre l'érosion côtière, études d'impact environnemental et social (EIES) pour les aménagements portuaires et maritimes.",
    careers: ["Évaluateur d'impact environnemental marin", "Gestionnaire de zone littorale", "Auditeur environnemental côtier", "Chargé de mission océanographique"],
  },
  {
    id: "mp-bpv-one-health",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Végétales",
    departmentCode: "BPV",
    title: "Master en « Une Santé » - « One Health »",
    duration: "2 ans (4 semestres)",
    summary: "Approche intégrée interdisciplinaire interconnectant la santé humaine, la santé animale et l'équilibre des écosystèmes environnementaux face aux zoonoses émergentes.",
    careers: ["Coordonnateur de programmes One Health", "Épidémiologiste environnemental", "Expert en biosécurité intersectorielle", "Conseiller en politiques sanitaires intégrées"],
  },

  // Sciences de la Terre (3)
  {
    id: "mp-stu-mines-petrole",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département des Sciences de la Terre",
    departmentCode: "STU",
    title: "Mines, Pétrole et Métallurgie",
    duration: "2 ans (4 semestres)",
    summary: "Exploration des gisements métalliques et d'hydrocarbures, diagraphie pétrolière, géochimie minière, modélisation de gisements et métallurgie extractive.",
    careers: ["Géologue d'exploitation minière", "Ingénieur réservoir pétrolier", "Métallurgiste d'extraction", "Superviseur de forages miniers"],
  },
  {
    id: "mp-stu-eau-risques",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département des Sciences de la Terre",
    departmentCode: "STU",
    title: "Master Régional Ressources en Eau et Risques Environnementaux dans les Métropoles Africaines",
    duration: "2 ans (4 semestres)",
    summary: "Hydrologie urbaine, hydrogéologie des aquifères profonds, cartographie des zones inondables, assainissement métropolitain et modélisation des crues.",
    careers: ["Hydrogéologue urbain", "Gestionnaire de régie des eaux", "Expert en prévention des inondations et risques naturels", "Consultant métropolitain en assainissement"],
  },
  {
    id: "mp-stu-geotechnique",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département des Sciences de la Terre",
    departmentCode: "STU",
    title: "Géotechnique",
    duration: "2 ans (4 semestres)",
    summary: "Mécanique des sols et des roches, stabilité des pentes et talus, fondations des grands ouvrages d'art (ponts, barrages, autoroutes) et sondages géotechniques.",
    careers: ["Ingénieur géotechnicien BTP", "Chef de laboratoire mécanique des sols", "Expert stabilité des fondations", "Superviseur d'ouvrages souterrains"],
  },

  // Biochimie (2)
  {
    id: "mp-bch-securite-aliments",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biochimie",
    departmentCode: "BCH",
    title: "Sécurité Sanitaire des Aliments",
    duration: "2 ans (4 semestres)",
    summary: "Analyse toxicologique alimentaire, démarche HACCP, traçabilité des denrées, microbiologie prédictive et contrôle qualité selon les normes ISO 22000.",
    careers: ["Responsable qualité et sécurité alimentaire", "Auditeur HACCP / ISO 22000", "Inspecteur de répression des fraudes et salubrité", "Directeur de laboratoire agroalimentaire"],
  },
  {
    id: "mp-bch-biotech-sante",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biochimie",
    departmentCode: "BCH",
    title: "Biotechnologie de la Santé Publique",
    duration: "2 ans (4 semestres)",
    summary: "Biologie moléculaire appliquée au diagnostic de masse, vaccins, immunodosages, pharmacogénomique et bioproduction de principes actifs thérapeutiques.",
    careers: ["Biotechnologiste médical", "Responsable de laboratoire de diagnostic moléculaire", "Chargé d'essais cliniques", "Développeur de bio-médicaments"],
  },

  // Biologie et Physiologie Animales (3)
  {
    id: "mp-bpa-phytiatrie",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Animales",
    departmentCode: "BPA",
    title: "Phytiatrie",
    duration: "2 ans (4 semestres)",
    summary: "Protection phytosanitaire intégrée, entomologie agricole, lutte biologique contre les insectes ravageurs, toxicologie des pesticides et bio-intrants.",
    careers: ["Médecin des plantes / Phytiatre", "Inspecteur phytosanitaire aux frontières", "Responsable R&D bio-pesticides", "Conseiller en protection intégrée des cultures"],
  },
  {
    id: "mp-bpa-biodiversite-animale",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Animales",
    departmentCode: "BPA",
    title: "Master en Biodiversité Animale et Conservation",
    duration: "2 ans (4 semestres)",
    summary: "Inventaires faunistiques, dynamique des populations de grande faune, génétique de la conservation, suivi télémétrique et gestion des conflits homme-faune.",
    careers: ["Biologiste de la conservation animale", "Responsable scientifique d'ONG faunique", "Gestionnaire de corridors écologiques", "Consultant en faune tropicale"],
  },
  {
    id: "mp-bpa-gcb",
    type: "Master Professionnel",
    levelBadge: "Master Pro · Bac + 5",
    department: "Département de Biologie et Physiologie Animales",
    departmentCode: "BPA",
    title: "Master Professionnel en Gestion et Conservation de la Biodiversité (GCB)",
    duration: "2 ans (4 semestres)",
    summary: "Stratégies de valorisation durable des ressources zoogénétiques, bio-surveillance des écosystèmes dulçaquicoles et terrestres, et plans d'aménagement faunique.",
    careers: ["Coordonnateur de projets de biodiversité", "Directeur de sanctuaire de faune", "Auditeur de biodiversité industrielle", "Chargé d'études d'impact écologique"],
  },
];

export const admissionRequirementsSummary = {
  general: "L'admission en 1ère année de Licence à la Faculté des Sciences est ouverte à tous les titulaires d'un diplôme d'études secondaires scientifiques, camerounais et étrangers, sans distinction de sexe ou de religion.",
  diplomasAccepted: [
    "Baccalauréats séries C, D, E",
    "Baccalauréat série F (Génie Civil, Électrique selon filières ciblées)",
    "General Certificate of Education (GCE) Advanced Level avec au moins deux matières scientifiques",
    "Tout diplôme étranger reconnu équivalent par le Ministère de l'Enseignement Supérieur (MINESUP)",
  ],
  steps: [
    {
      step: "01",
      title: "Préinscription en ligne",
      desc: "Création du profil étudiant sur le portail numérique officiel de l'Université de Yaoundé I et sélection de la filière.",
    },
    {
      step: "02",
      title: "Paiement des droits universitaires",
      desc: "Règlement des frais d'inscription légaux (50 000 FCFA pour les nationaux) via les canaux officiels agréés.",
    },
    {
      step: "03",
      title: "Dépôt physique du dossier",
      desc: "Dépôt des pièces certifiées conformes et de la fiche de préinscription au guichet de la Scolarité centrale (Campus Principal).",
    },
    {
      step: "04",
      title: "Affichage des listes & Début des cours",
      desc: "Publication officielle des listes d'admission, retrait de la carte d'étudiant et accès aux amphithéâtres.",
    },
  ],
};
