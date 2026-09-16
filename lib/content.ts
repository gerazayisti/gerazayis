// Contenu sourcé depuis facsciences.uy1.cm (collecte du 15 septembre 2026).
// Les URLs d'images pointent encore vers l'ancien site : à rapatrier dans
// /public/departements/ dès que possible (voir README).

export const nav = [
  {
    label: "La Faculté",
    href: "/la-faculte",
    children: [
      { label: "Présentation", href: "/la-faculte/presentation" },
      { label: "Structure administrative", href: "/la-faculte/structure" },
      { label: "Enseignants permanents", href: "/la-faculte/enseignants" },
      { label: "Contacts & localisation", href: "/la-faculte/contacts" },
    ],
  },
  {
    label: "Formations",
    href: "/formations",
    children: [
      { label: "Diplômes", href: "/formations/diplomes" },
      { label: "Départements", href: "/departements" },
      { label: "Énergie renouvelable (certifiante)", href: "/formations/energie-renouvelable" },
    ],
  },
  {
    label: "Espace Étudiant",
    href: "/espace-etudiant",
    children: [
      { label: "Le Babillard (Notes & Résultats)", href: "/espace-etudiant/notes" },
      { label: "Guichet des Requêtes", href: "/espace-etudiant/requetes" },
      { label: "Service de la scolarité", href: "/espace-etudiant/scolarite" },
      { label: "Calendrier académique", href: "/espace-etudiant/calendrier" },
      { label: "Conditions d'admission", href: "/espace-etudiant/admission" },
      { label: "Système LMD", href: "/espace-etudiant/lmd" },
      { label: "Bourses d'étude & Aides", href: "/espace-etudiant/bourses" },
    ],
  },
  {
    label: "Recherches",
    href: "/recherches",
    children: [
      { label: "Axes de recherche", href: "/recherches/axes" },
      { label: "Laboratoires", href: "/recherches/laboratoires" },
      { label: "Résultats", href: "/recherches/resultats" },
    ],
  },
  {
    label: "Actualités",
    href: "/actualites",
    children: [
      { label: "Babillard", href: "/actualites/babillard" },
      { label: "Événements", href: "/actualites/evenements" },
      { label: "Galerie", href: "/actualites/galerie" },
    ],
  },
];

export type Department = {
  code: string;
  name: string;
  slug: string;
  fullName: string;
  division: string;
  institution: string;
  summary: string;
  specialties: string[];
  category: "Sciences Exactes" | "Sciences de la Vie" | "Sciences de la Matière & Terre";
  image?: string;
};

const OLD_UPLOADS = "https://facsciences.uy1.cm/wp-content/uploads/2018/06";

export const departments: Department[] = [
  {
    code: "COr",
    name: "Chimie Organique",
    slug: "chimie-organique",
    fullName: "Le Département de Chimie Organique",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : formation approfondie en synthèse organique, substances naturelles, phytochimie et valorisation des molécules bioactives issues de la biodiversité camerounaise.",
    specialties: ["Synthèse organique", "Phytochimie & Produits naturels", "Chimie thérapeutique", "Valorisation des agro-ressources"],
    category: "Sciences de la Matière & Terre",
    image: `${OLD_UPLOADS}/FS-Département-de-Chimie1-1024x745.jpg`,
  },
  {
    code: "MIB",
    name: "Microbiologie",
    slug: "microbiologie",
    fullName: "Le Département de Microbiologie",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : enseignement et recherche de pointe en bactériologie, virologie, mycologie médicale, immunologie et biotechnologies microbiennes appliquées à la santé et aux industries.",
    specialties: ["Bactériologie & Virologie", "Biotechnologies microbiennes", "Contrôle qualité & Bio-sécurité", "Microbiologie environnementale"],
    category: "Sciences de la Vie",
    image: `${OLD_UPLOADS}/FS-Département-de-Microbiologie1-1024x745.jpg`,
  },
  {
    code: "STU",
    name: "Sciences de la Terre",
    slug: "sciences-de-la-terre",
    fullName: "Le Département des Sciences de la Terre",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : géologie fondamentale et appliquée, cartographie géologique, hydrogéologie, exploration minière, géotechnique et gestion des risques volcaniques et sismiques.",
    specialties: ["Géologie & Pétrologie", "Hydrogéologie & Ressources en eau", "Mines, Carrières & Énergies fossiles", "Géotechnique & Risques naturels"],
    category: "Sciences de la Matière & Terre",
    image: `${OLD_UPLOADS}/FS-Département-de-la-Science-de-ta-Terre1-1024x745.jpg`,
  },
  {
    code: "BPV",
    name: "Biologie et Physiologie Végétales",
    slug: "biologie-physiologie-vegetales",
    fullName: "Le Département de Biologie et Physiologie Végétales",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : étude intégrée de la flore tropicale, amélioration génétique des plantes, physiologie végétale, agroforesterie et biotechnologies végétales.",
    specialties: ["Botanique tropicale & Systématique", "Physiologie & Nutrition végétale", "Phytopathologie", "Biotechnologies & Agro-écologie"],
    category: "Sciences de la Vie",
    image: `${OLD_UPLOADS}/FS-Département-de-Biologie-et-Physiologie-Vegetales1-1024x745.jpg`,
  },
  {
    code: "BPA",
    name: "Biologie et Physiologie Animales",
    slug: "biologie-physiologie-animales",
    fullName: "Le Département de Biologie et Physiologie Animales",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : zoologie, physiologie animale, entomologie médicale, parasitologie tropicale, gestion de la faune sauvage et aquaculture durable.",
    specialties: ["Parasitologie & Vecteurs de maladies", "Physiologie & Endocrinologie animale", "Écologie faunique & Conservation", "Pisciculture & Aquaculture"],
    category: "Sciences de la Vie",
    image: `${OLD_UPLOADS}/FS-Département-de-Biologie-et-Physiologie-Animales1-1024x745.jpg`,
  },
  {
    code: "INF",
    name: "Informatique",
    slug: "informatique",
    fullName: "Le Département d’Informatique",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : formation de haut niveau en génie logiciel, intelligence artificielle, systèmes d'information, réseaux informatiques, cybersécurité et calcul scientifique.",
    specialties: ["Génie Logiciel & Architecture Web", "Intelligence Artificielle & Data Science", "Réseaux, Systèmes & Cloud", "Algorithmique & Sécurité"],
    category: "Sciences Exactes",
    image: `${OLD_UPLOADS}/FS-Département-dInformatique1-1024x745.jpg`,
  },
  {
    code: "MAT",
    name: "Mathématiques",
    slug: "mathematiques",
    fullName: "Le Département de Mathématiques",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : enseignement rigoureux des mathématiques pures et appliquées, analyse fonctionnelle, algèbre, géométrie différentielle, probabilités, statistique et biomathématiques.",
    specialties: ["Analyse & Équations différentielles", "Algèbre & Géométrie", "Probabilités & Statistique appliquée", "Modélisation biomathématique"],
    category: "Sciences Exactes",
    image: `${OLD_UPLOADS}/FS-Département-de-Mathematique1-1024x745.jpg`,
  },
  {
    code: "PHY",
    name: "Physique",
    slug: "physique",
    fullName: "Le Département de Physique",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : physique des matériaux, mécanique des fluides, électronique, énergie renouvelable photovoltaïque, géophysique externe et nanosciences.",
    specialties: ["Physique des Matériaux & Semi-conducteurs", "Énergie Renouvelable & Photovoltaïque", "Électronique & Systèmes embarqués", "Mécanique & Géophysique"],
    category: "Sciences Exactes",
    image: `${OLD_UPLOADS}/FS-Département-de-Physique1-1024x745.jpg`,
  },
  {
    code: "BCH",
    name: "Biochimie",
    slug: "biochimie",
    fullName: "Le Département de Biochimie",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : biochimie fondamentale et médicale, enzymologie, biologie moléculaire, toxicologie, nutrition humaine et valorisation bio-industrielle.",
    specialties: ["Biologie moléculaire & Génétique", "Biochimie clinique & Pharmacologie", "Enzymologie & Métabolisme", "Sciences des aliments & Nutrition"],
    category: "Sciences de la Vie",
    image: `${OLD_UPLOADS}/FS-Département-de-Biochimie1-1024x745.jpg`,
  },
  {
    code: "CIn",
    name: "Chimie Inorganique",
    slug: "chimie-inorganique",
    fullName: "Le Département de Chimie Inorganique",
    division: "Division de la Programmation et du Suivi des Enseignements",
    institution: "Université de Yaoundé I · Faculté des Sciences",
    summary: "Université de Yaoundé I · Faculté des Sciences · Division de la Programmation et du Suivi des Enseignements : chimie minérale, chimie de coordination, chimie des argiles et céramiques locales, catalyse hétérogène et procédés environnementaux.",
    specialties: ["Chimie des Matériaux & Argiles", "Chimie Minérale & Métallurgie", "Chimie de Coordination", "Dépollution & Physico-chimie de l'environnement"],
    category: "Sciences de la Matière & Terre",
  },
];

export const professionalPrograms = [
  {
    code: "ER",
    name: "Énergie Renouvelable — Production d'Énergie Électrique Photovoltaïque",
    type: "Formation certifiante",
    note: "Annoncée par communiqué du Recteur, préinscription en ligne.",
  },
];

export const newsItems = [
  { date: "16 déc. 2024", title: "Liste protocolaire actualisée 2023-2024" },
  { date: "2024", title: "Calendrier académique 2023-2024" },
  { date: "28 mai 2024", title: "Début de la production des cartes d'étudiant" },
  { date: "2024", title: "Formation certifiante en Énergie Électrique Photovoltaïque" },
  { date: "2024", title: "Communiqué relatif à la diplomation" },
  { date: "2024", title: "Télé-évaluation des examens du semestre I" },
  { date: "2023", title: "Procédure de préinscription 2023-2024" },
  { date: "2023", title: "15e édition des Journées Scientifiques de l'étudiant" },
];

export const distinctions = [
  {
    title: "2018 OWSD-Elsevier Foundation Award for Women in Science",
    person: "Pr Djuidje Kenmoe",
  },
  {
    title: "Prix PAMCA",
    person: "Pr Mimpfoundi Rémy",
  },
  {
    title: "2e Colloque de l'Association des Géosciences",
    person: "Yaoundé, 2019",
  },
];

export const researchAxes = [
  "Sciences fondamentales",
  "Sciences appliquées et enseignements professionnalisants",
  "Appui au développement et promotion sociale et culturelle",
];

export const stats = [
  { value: "1962", label: "Année de création" },
  { value: "10", label: "Départements d'enseignement" },
  { value: "2", label: "Campus — principal et Extension" },
  { value: "3", label: "Vice-décanats" },
];

export const contact = {
  phone: "(+237) 222 23 44 96",
  bp: "BP: 812 Yaoundé-Cameroun",
  site: "https://facsciences.uy1.cm",
  siteDisplay: "facsciences.uy1.cm",
  emails: {
    official: "contact@facsciences.uninet.cm",
    doyen: "doyen@facsciences.uy1.cm",
    secretariat: "secretariat@facsciences.uy1.cm",
    scolarite: "scolarite@facsciences.uy1.cm",
    diplome: "diplome@facsciences.uy1.cm",
    ci: "ci@facsciences.uy1.cm",
    support: "support@facsciences.uy1.cm",
    admin: "admin@facsciences.uy1.cm",
  },
  social: {
    facebook: "https://facebook.com/FacSciencesUY1/",
    twitter: "https://twitter.com/FacSciencesUY1",
  },
};

export const administrativeStructure = {
  doyen: {
    name: "Pr OWONO OWONO Luc Calvin",
    title: "Doyen de la Faculté des Sciences",
    rank: "Professeur",
    image: "/administration/pr_owono_owono_luc_calvin.jpg",
    initials: "LO",
    description:
      "Assure la direction et la coordination générale de l’ensemble des services administratifs, pédagogiques et scientifiques de la Faculté des Sciences.",
  },
  deliberativeBodies: [
    {
      name: "Assemblée de Faculté",
      role: "Organe délibérant regroupant l'ensemble du corps professoral pour les orientations stratégiques académiques.",
    },
    {
      name: "Conseil de Faculté",
      role: "Instance décisionnelle pour la gestion budgétaire, les recrutements et la programmation des enseignements.",
    },
    {
      name: "Services Administratifs",
      role: "Ensemble des directions et divisions opérationnelles assurant la continuité du service public universitaire.",
    },
  ],
  viceDoyens: [
    {
      code: "VD-01",
      name: "Pr NDJIGUI Paul-Désiré",
      rank: "Professeur",
      role: "Vice-Doyen chargé de la Programmation et du Suivi des Activités Académiques",
      scope: "Programmation des cours magistraux, travaux dirigés, travaux pratiques et calendriers des examens semestriels.",
      image: undefined as string | undefined,
      initials: "PN",
    },
    {
      code: "VD-02",
      name: "Pr NYEGUE Maximilienne Ascension",
      rank: "Professeur",
      role: "Vice-Doyen chargée de la Scolarité, des Statistiques et du Suivi des Étudiants",
      scope: "Gestion des inscriptions, registres d'étudiants, statistiques académiques, délivrance des attestations et suivi des parcours.",
      image: "/administration/pr_nyegue_maximilienne.png",
      initials: "MN",
    },
    {
      code: "VD-03",
      name: "Pr NOUNDJEU Pierre",
      rank: "Maître de Conférences",
      role: "Vice-Doyen chargé de la Recherche et de la Coopération",
      scope: "Coordination des unités et laboratoires de recherche, partenariats académiques et industriels, mobilité et coopération internationale.",
      image: undefined as string | undefined,
      initials: "PN",
    },
  ],
  divisions: [
    {
      code: "DIV-01",
      name: "Division Administrative et Financière",
      head: "NDOYE FOE Marie C. F.",
      rank: "Maître de Conférences",
      role: "Chef de Division",
      scope: "Gestion des ressources humaines, exécution budgétaire, intendance des campus et suivi logistique.",
      image: undefined as string | undefined,
      initials: "MN",
    },
    {
      code: "DIV-02",
      name: "Division des Affaires Académiques, de la Scolarité et de la Recherche",
      head: "AJEAGAH Gideon AGHAINDUM",
      rank: "Professeur",
      role: "Chef de Division",
      scope: "Coordination du suivi pédagogique, scolarité centrale, diplomation et soutien aux programmes de recherche.",
      image: "/administration/pr_ajeagah_gideon.png",
      initials: "GA",
    },
  ],
};

export const academicPolicies = {
  admission:
    "Peuvent être admis à s’inscrire à la Faculté des Sciences en première année d’études les Camerounais et les étrangers qui en font la demande, sans distinction d’âge, de sexe ou de religion.",
  pedagogy: [
    {
      code: "CM",
      name: "Cours Magistraux",
      short: "CM",
      desc: "Enseignements théoriques dispensés en amphithéâtres par les professeurs et maîtres de conférences, couvrant les fondements conceptuels de chaque discipline.",
    },
    {
      code: "TD",
      name: "Travaux Dirigés",
      short: "TD",
      desc: "Séances d'approfondissement méthodologique en petits groupes pour la résolution d'exercices, d'études de cas et l'assimilation des cours magistraux.",
    },
    {
      code: "TP",
      name: "Travaux Pratiques",
      short: "TP",
      desc: "Manipulations expérimentales au sein des laboratoires spécialisés de la faculté pour l'acquisition du savoir-faire technique et scientifique.",
    },
  ],
  thesesDoc: {
    title: "Thèses de Doctorat PhD soutenues à la Faculté des Sciences (2018-2020)",
    url: "https://uy1.uninet.cm/wp-content/uploads/2025/04/Fichier_theses_doctorat-PhD_FS_2018-2020.pdf",
    period: "2018 - 2020",
    format: "Document PDF Officiel UY1",
  },
};

export const facultyPresentation = {
  title: "Présentation de la Faculté des Sciences",
  subtitle: "Université de Yaoundé I · Institution doyenne fondée en 1962",
  historyP1:
    "La Faculté des Sciences de l’Université de Yaoundé fut créée en juillet 1962 au sein de l’Université Fédérale du Cameroun (décret n°62/DF/289 du 26 juillet 1962). Les premiers enseignements se sont déroulés dans les bâtisses de l’actuel deuxième campus ou Annexe. En octobre 1967, fut inauguré le Campus principal. Elle est devenue la Faculté des Sciences de l’Université de Yaoundé I après la réforme universitaire de 1993 avec les décrets 93/027 et 93/036 du 19 janvier 1993 du Président de la République portant respectivement dispositions communes aux universités d’Etat et organisation administrative et académique de l’Université de Yaoundé I.",
  campusesP:
    "La Faculté des Sciences qui est l’un des établissements de l’Université de Yaoundé I est constituée de deux campus. Le campus principal situé à l’Ouest du Rectorat est implanté sur le versant nord-ouest du plateau Atemengue. Le deuxième campus couramment appelé extension.",
  missionsP:
    "Outre les missions générales de l’Université de Yaoundé I, la Faculté des Sciences est particulièrement chargée de la promotion des Sciences Fondamentales en général, des Sciences appliquées à travers des enseignements professionnalisants, de l’appui au développement et à la promotion sociale et culturelle.",
  milestones: [
    {
      year: "Juillet 1962",
      badge: "Décret N° 62/DF/289",
      title: "Création au sein de l'Université Fédérale du Cameroun",
      desc: "Signature du décret fondateur n°62/DF/289 du 26 juillet 1962 par le Président Ahmadou Ahidjo. Les tout premiers cours se déroulent dans les bâtisses de l'actuel deuxième campus (Annexe).",
      icon: "seal",
    },
    {
      year: "Octobre 1967",
      badge: "Inauguration solennelle",
      title: "Ouverture du Campus Principal",
      desc: "Inauguration solennelle des grands amphithéâtres, laboratoires de physique-chimie et du décanat sur le plateau Atemengue.",
      icon: "building",
    },
    {
      year: "19 Janvier 1993",
      badge: "Décrets N° 93/027 & 93/036",
      title: "Grande Réforme Universitaire Nationale",
      desc: "Décrets présidentiels portant dispositions communes aux universités d'État et organisation administrative et académique de l'Université de Yaoundé I, conférant à la Faculté des Sciences son statut actuel.",
      icon: "law",
    },
    {
      year: "Aujourd'hui",
      badge: "Système LMD & Recherche",
      title: "Pôle d'Excellence & Rayonnement Panafricain",
      desc: "10 départements d'enseignement, plus de 400 enseignants-chercheurs, des formations doctorales de pointe et des cursus professionnalisants accrédités.",
      icon: "rocket",
    },
  ],
  campuses: [
    {
      name: "Campus Principal",
      subtitle: "Plateau Atemengue — Ouest du Rectorat",
      code: "CAMPUS 01",
      desc: "Le campus principal est situé à l'Ouest du Rectorat, implanté sur le versant nord-ouest du plateau Atemengue. Il regroupe les services du Décanat, les grands amphithéâtres (Amphi 1001, Amphi 500), la Division de la Programmation et du Suivi des Enseignements, ainsi que les principaux laboratoires de recherche fondamentale et appliquée.",
      highlights: [
        "Décanat & Secrétariat Général",
        "Amphithéâtres magistraux & Salles TD",
        "Laboratoires de recherche spécialisés",
        "Services de la Scolarité & Diplômes",
      ],
      location: "Plateau Atemengue, Ngoa-Ekellé, Yaoundé",
    },
    {
      name: "Deuxième Campus (Extension)",
      subtitle: "Site historique — Annexe de la Faculté",
      code: "CAMPUS 02",
      desc: "Couramment appelé Extension ou Annexe, ce campus abrite les bâtisses historiques où se sont déroulés les tout premiers enseignements de la Faculté dès juillet 1962. Il accueille aujourd'hui des départements d'enseignement, des salles de travaux dirigés et des infrastructures académiques complémentaires.",
      highlights: [
        "Bâtisses historiques des enseignements de 1962",
        "Salles de cours & Travaux Dirigés",
        "Espaces d'études & Vie étudiante",
        "Infrastructures pédagogiques annexes",
      ],
      location: "Extension / Annexe, Yaoundé",
    },
  ],
  missions: [
    {
      number: "01",
      title: "Promotion des Sciences Fondamentales",
      tag: "Socle Académique",
      desc: "Transmettre et approfondir les savoirs fondamentaux en Mathématiques, Physique, Chimie Organique et Inorganique, Biologie Animale et Végétale, Biochimie, Microbiologie et Sciences de la Terre.",
      bullets: [
        "Formation de Licence et Master d'excellence académique",
        "Recherche fondamentale publiée dans des revues internationales de rang A",
        "Encadrement doctoral et préparation aux carrières de l'enseignement supérieur",
      ],
    },
    {
      number: "02",
      title: "Sciences Appliquées & Enseignements Professionnalisants",
      tag: "Insertion & Métiers",
      desc: "Répondre directement aux besoins de l'économie nationale et sous-régionale par des formations professionnalisantes, l'ingénierie logicielle, l'énergie renouvelable photovoltaïque et les biotechnologies.",
      bullets: [
        "Formation certifiante en production d'énergie électrique photovoltaïque",
        "Cursus d'ingénierie informatique, data science et cybersécurité",
        "Chimie appliquée, bio-industries, contrôle qualité et technologies environnementales",
      ],
    },
    {
      number: "03",
      title: "Appui au Développement & Promotion Sociale et Culturelle",
      tag: "Impact Sociétal",
      desc: "Mettre l'expertise scientifique au service de l'État, des collectivités, du tissu industriel et de la société civile pour relever les défis sanitaires, écologiques et technologiques.",
      bullets: [
        "Expertise scientifique auprès des ministères et institutions publiques",
        "Vulgarisation scientifique citoyenne et Journées Scientifiques de l'étudiant",
        "Rayonnement culturel et académique dans l'espace CEMAC et international",
      ],
    },
  ],
};

