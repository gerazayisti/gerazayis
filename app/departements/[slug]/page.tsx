import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRightIcon,
  CheckIcon,
  BookOpenIcon,
  AwardIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  UsersIcon,
  MicroscopeIcon,
} from "@/components/Icons";
import {
  allOfficialDepartmentsList,
  biochimieDepartmentDetails,
  professionalProgramsList,
  formationsDomains,
  departmentContactsMap,
  getDepartmentImagesAndEvents,
} from "@/lib/formations-data";

export async function generateStaticParams() {
  return allOfficialDepartmentsList.map((dept) => ({
    slug: dept.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = allOfficialDepartmentsList.find((d) => d.slug === slug);

  if (!dept) {
    return {
      title: "Département — Faculté des Sciences | Université de Yaoundé I",
    };
  }

  return {
    title: `${dept.fullName} — Faculté des Sciences | Université de Yaoundé I`,
    description: `Page officielle de définition et présentation du ${dept.fullName} de la Faculté des Sciences de l'Université de Yaoundé I : missions statutaires, débouchés, galerie d'images des laboratoires, agenda scientifique, grilles LMD et contacts.`,
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = allOfficialDepartmentsList.find((d) => d.slug === slug);

  if (!dept) {
    notFound();
  }

  // Cursus professionnels rattachés à ce département
  const proPrograms = professionalProgramsList.filter(
    (p) => p.departmentCode === dept.code
  );

  // Domaine scientifique
  const domain = formationsDomains.find((dom) => dom.id === dept.domain);
  const domainDeptInfo = domain?.departments.find((d) => d.code === dept.code);

  // Données spécifiques pour Biochimie (conforme à la fiche exemplaire du prompt)
  const isBiochimie = dept.code === "BCH";

  // Images & Événements pour ce département
  const { images, events } = getDepartmentImagesAndEvents(dept.code);

  // Contacts officiels directs du département
  const contactInfo = departmentContactsMap[dept.code] || {
    chefEmail: `cd${dept.code.toLowerCase()}@facsciences.uy1.cm`,
    secretariatEmail: `cd${dept.code.toLowerCase()}.secretariat@facsciences.uy1.cm`,
    location: "Campus Principal — Faculté des Sciences, Plateau Atemengue",
  };

  return (
    <>
      <SiteHeader />
      <main>
        
        {/* ── En-tête / Hero du Département ── */}
        <section className="w-full bg-[#FAFAFA] border-b border-[#111111] py-14">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            
            {/* Fil d'Ariane & Code */}
            <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-xs">
              <Link href="/formations" className="hover:text-[#5A2CA8] transition font-bold text-[#0a0a0a]/60">
                Formations
              </Link>
              <span className="text-[#0a0a0a]/30">/</span>
              <Link href="/departements" className="hover:text-[#5A2CA8] transition font-bold text-[#0a0a0a]/60">
                Départements
              </Link>
              <span className="text-[#0a0a0a]/30">/</span>
              <span className="font-bold text-[#5A2CA8]">
                [{dept.code}] {dept.name}
              </span>
            </div>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="w-2.5 h-2.5 bg-[#5A2CA8]"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
                  Faculté des Sciences · UY1
                </span>
                {isBiochimie && (
                  <span className="font-mono text-xs bg-[#5A2CA8] text-white px-2 py-0.5 font-bold">
                    Fondé en {biochimieDepartmentDetails.foundationYear}
                  </span>
                )}
                {dept.code === "ENR" && (
                  <span className="font-mono text-xs bg-emerald-700 text-white px-2 py-0.5 font-bold">
                    Filière d&apos;Avenir · Énergie Solaire
                  </span>
                )}
                <span className="font-mono text-xs border border-[#111111] bg-white px-2 py-0.5 font-bold text-[#0a0a0a]">
                  Fiche de Présentation &amp; Définition
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0a0a0a] leading-tight">
                {dept.fullName}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#0a0a0a]/80 max-w-3xl leading-relaxed">
                {isBiochimie
                  ? biochimieDepartmentDetails.history
                  : domainDeptInfo?.summary ||
                    `Département d'enseignement et de recherche scientifique de la Faculté des Sciences de l'Université de Yaoundé I.`}
              </p>
            </div>

            {/* Barre de métriques rapides */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 border border-[#111111] bg-white divide-x divide-y sm:divide-y-0 divide-[#111111] font-mono">
              <div className="p-4">
                <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Code Académique</span>
                <p className="text-xl font-black text-[#5A2CA8] mt-1">[{dept.code}]</p>
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Domaine</span>
                <p className="text-xs font-bold text-[#0a0a0a] mt-1 truncate">{domain?.name || "Sciences"}</p>
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Diplômes</span>
                <p className="text-xs font-bold text-[#0a0a0a] mt-1">Licence · Master · Doctorat</p>
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase text-[#0a0a0a]/50 block font-bold">Cursus Pro Rattachés</span>
                <p className="text-xl font-black text-[#0a0a0a] mt-1">{proPrograms.length}</p>
              </div>
            </div>

            {/* Barre de navigation rapide par ancres */}
            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold">
              <span className="text-[#0a0a0a]/40 mr-1 uppercase text-[10px]">Accès rapide :</span>
              <a href="#missions" className="px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition">
                [01] Missions &amp; Débouchés
              </a>
              <a href="#images-laboratoires" className="px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition">
                [02] Images &amp; Laboratoires
              </a>
              <a href="#evenements-scientifiques" className="px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition">
                [03] Événements &amp; Séminaires
              </a>
              {isBiochimie && (
                <a href="#projet-phare" className="px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition">
                  [04] Projet SOILGUARD
                </a>
              )}
              <a href="#telechargements" className="px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition">
                [05] Grilles &amp; Syllabi
              </a>
              {proPrograms.length > 0 && (
                <a href="#formations-pro" className="px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition">
                  [06] Cursus Pro ({proPrograms.length})
                </a>
              )}
              <a href="#contact-departement" className="px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#5A2CA8] hover:text-white transition">
                [07] Contact &amp; Secrétariat
              </a>
            </div>

          </div>
        </section>

        {/* ── Section Missions & Débouchés ── */}
        <section id="missions" className="w-full bg-white border-b border-[#111111] py-16 scroll-mt-20">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#111111] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
              
              {/* Colonne 1 : Missions Statutaires (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-10 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                      Piliers Institutionnels
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                    Missions du Département
                  </h2>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {isBiochimie ? (
                    biochimieDepartmentDetails.missions.map((mission, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-[#111111] bg-[#FAFAFA] flex items-start gap-3"
                      >
                        <span className="w-6 h-6 bg-[#5A2CA8] text-white font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="font-bold text-[#0a0a0a] text-sm pt-0.5">
                          {mission}
                        </p>
                      </div>
                    ))
                  ) : (
                    [
                      `La formation fondamentale et appliquée dans la discipline (${dept.name})`,
                      "La recherche scientifique et technologique de pointe",
                      "L’appui au développement socio-économique et industriel",
                    ].map((mission, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-[#111111] bg-[#FAFAFA] flex items-start gap-3"
                      >
                        <span className="w-6 h-6 bg-[#5A2CA8] text-white font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="font-bold text-[#0a0a0a] text-sm pt-0.5">
                          {mission}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <p className="text-xs text-[#0a0a0a]/75 font-sans leading-relaxed pt-2">
                  Ces missions sont conduites sous la coordination de la Faculté des Sciences et de la Division de la Programmation et du Suivi des Enseignements, en étroite liaison avec les unités et laboratoires de recherche accrédités.
                </p>
              </div>

              {/* Colonne 2 : Débouchés Professionnels (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 bg-[#FAFAFA]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                      Perspectives de Carrière
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                    Débouchés
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  {(isBiochimie
                    ? biochimieDepartmentDetails.careerOutcomes
                    : domainDeptInfo?.careers || [
                        "Enseignement supérieur et secondaire",
                        "Laboratoires de recherche appliquée",
                        "Industries et PME spécialisées",
                        "Administration centrale et ministères techniques",
                        "Bureaux d'études et consultance technique",
                        "Auto-emploi et entrepreneuriat scientifique",
                      ]
                  ).map((deb, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-[#111111] bg-white flex items-center gap-2 hover:border-[#5A2CA8] transition"
                    >
                      <CheckIcon className="w-4 h-4 text-[#5A2CA8] shrink-0" />
                      <span className="text-[11px] font-bold text-[#0a0a0a] leading-tight">
                        {deb}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 border border-[#111111] bg-white text-[11px] font-mono text-[#0a0a0a]/70">
                  💡 Les diplômés accèdent tant aux carrières académiques (Doctorat / Enseignement) qu&apos;aux postes de direction technique, d&apos;ingénierie et d&apos;expertise dans les secteurs publics et privés.
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── Section Images & Galerie Laboratoires (Demande Utilisateur) ── */}
        <section id="images-laboratoires" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16 scroll-mt-20">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Infrastructures &amp; Travaux Expérimentaux
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                Galerie &amp; Laboratoires du Département
              </h2>
              <p className="mt-2 text-xs font-mono text-[#0a0a0a]/70">
                Aperçu photographique des plateformes d&apos;expérimentation, salles de travaux pratiques encadrés et cadre de recherche du département.
              </p>
            </div>

            {/* Grille des 4 images avec styling brutaliste */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#111111] bg-white divide-y md:divide-y-0 divide-[#111111]">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`p-4 border-b lg:border-b-0 border-[#111111] flex flex-col justify-between hover:bg-[#FAFAFA] transition group ${
                    idx < 3 ? "lg:border-r" : ""
                  } ${idx % 2 === 0 ? "md:max-lg:border-r" : ""}`}
                >
                  <div>
                    {/* Conteneur Image avec ratio et bordure */}
                    <div className="relative aspect-[16/11] w-full border border-[#111111] bg-black/5 overflow-hidden mb-3">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-2 left-2 font-mono text-[9px] font-black uppercase bg-[#111111] text-white px-2 py-0.5">
                        {img.tag}
                      </div>
                    </div>

                    <h3 className="font-black text-sm text-[#0a0a0a] tracking-tight leading-snug group-hover:text-[#5A2CA8] transition-colors">
                      {img.title}
                    </h3>

                    <p className="mt-2 text-xs text-[#0a0a0a]/70 font-sans leading-relaxed">
                      {img.caption}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-black/10 font-mono text-[10px] text-[#0a0a0a]/40 flex items-center justify-between">
                    <span>Vue #{idx + 1}</span>
                    <span className="text-[#5A2CA8] font-bold">[{dept.code}]</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Section Événements & Vie Scientifique (Demande Utilisateur) ── */}
        <section id="evenements-scientifiques" className="w-full bg-white border-b border-[#111111] py-16 scroll-mt-20">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                  <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                    Agenda Académique &amp; Vie Scientifique
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                  Événements &amp; Séminaires du Département
                </h2>
              </div>
              <p className="text-xs font-mono text-[#0a0a0a]/60 max-w-md">
                Séminaires de recherche, conférences internationales, ateliers méthodologiques et sessions solennelles de soutenances publiques.
              </p>
            </div>

            {/* Liste structurée des événements */}
            <div className="border border-[#111111] bg-white divide-y divide-[#111111]">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6 hover:bg-[#FAFAFA] transition-colors"
                >
                  {/* Bloc Calendrier Date */}
                  <div className="w-28 shrink-0 border border-[#111111] bg-[#5A2CA8] text-white p-3 text-center font-mono self-start lg:self-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider block text-white/75">
                      {ev.month} {ev.year}
                    </span>
                    <span className="text-3xl sm:text-4xl font-black leading-none block my-1">
                      {ev.day}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest block bg-white/20 py-0.5">
                      {ev.date}
                    </span>
                  </div>

                  {/* Contenu de l'événement */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-black uppercase bg-[#111111] text-white px-2 py-0.5">
                        {ev.type}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase border border-[#5A2CA8] text-[#5A2CA8] bg-[#5A2CA8]/10 px-2 py-0.5">
                        {ev.badge}
                      </span>
                      <span className="font-mono text-xs text-[#0a0a0a]/40 font-bold">
                        ID: {ev.id}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#0a0a0a] tracking-tight">
                      {ev.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#0a0a0a]/75 font-sans leading-relaxed">
                      {ev.description}
                    </p>

                    {/* Méta : Lieu & Intervenants */}
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#0a0a0a]/70">
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-[#5A2CA8] shrink-0" />
                        <span>{ev.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UsersIcon className="w-3.5 h-3.5 text-[#5A2CA8] shrink-0" />
                        <span>{ev.speaker}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action / info */}
                  <div className="shrink-0 self-start lg:self-center">
                    <span className="px-3 py-2 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition font-mono text-xs font-bold inline-flex items-center gap-1">
                      <span>Accès Libre</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Section Spécifique Projet Phare (SOILGUARD pour Biochimie) ── */}
        {isBiochimie && (
          <section id="projet-phare" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16 scroll-mt-20">
            <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
              
              <div className="p-8 sm:p-10 border border-[#111111] bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8] block mb-1">
                      Recherche Internationale &amp; Coopération
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                      Projet SOILGUARD
                    </h3>
                    <p className="text-xs font-mono text-[#0a0a0a]/70 mt-1">
                      {biochimieDepartmentDetails.flagshipProject.subtitle}
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-[#111111] text-white font-mono text-xs font-bold self-start md:self-auto">
                    Partenariat Scientifique International
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-black/10 font-mono text-xs">
                  {biochimieDepartmentDetails.flagshipProject.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-[#111111] bg-[#FAFAFA] hover:bg-[#5A2CA8] hover:text-white transition font-bold flex items-center justify-between group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRightIcon className="w-4 h-4 text-[#5A2CA8] group-hover:text-white" />
                    </a>
                  ))}
                </div>
                
                <p className="mt-4 text-[11px] font-mono text-[#0a0a0a]/50">
                  * Documentation technique et rapports scientifiques téléchargeables avec le soutien du consortium SOILGUARD.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* ── Section Documents & Grilles Disponibles au Téléchargement ── */}
        <section id="telechargements" className="w-full bg-white border-b border-[#111111] py-16 scroll-mt-20">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                  Documents Pédagogiques
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                Disponible au Téléchargement
              </h2>
              <p className="mt-2 text-xs font-mono text-[#0a0a0a]/60">
                Grilles officielles des unités d&apos;enseignement et maquettes des programmes de cours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 border border-[#111111] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
              
              {/* Grilles des Unités de Valeur / Enseignement */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="border-b border-[#111111] pb-3 mb-4">
                  <span className="font-mono text-[10px] font-black uppercase text-[#5A2CA8] block mb-1">
                    Maquettes Pédagogiques
                  </span>
                  <h3 className="text-xl font-black text-[#0a0a0a]">
                    Grille des unités de valeur
                  </h3>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {(isBiochimie
                    ? biochimieDepartmentDetails.downloadableGrids
                    : [
                        { title: "Grille des unités d’enseignement du niveau I", level: "Niveau I (Licence 1)", url: "#" },
                        { title: "Grille des unités d’enseignement du niveau II", level: "Niveau II (Licence 2)", url: "#" },
                        { title: "Grille des unités d’enseignement du niveau III", level: "Niveau III (Licence 3)", url: "#" },
                        { title: "Grille des unités d’enseignement du niveau IV", level: "Niveau IV (Master 1)", url: "#" },
                      ]
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-[#111111] bg-[#FAFAFA] flex items-center justify-between gap-3 hover:bg-white transition"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-[#0a0a0a] block truncate">{item.title}</span>
                        <span className="text-[10px] text-[#0a0a0a]/50">{item.level}</span>
                      </div>
                      <span className="px-2 py-1 bg-[#111111] text-white text-[10px] font-bold shrink-0">
                        PDF
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programmes des Enseignements */}
              <div className="p-6 sm:p-8 space-y-4 bg-[#FAFAFA]">
                <div className="border-b border-[#111111] pb-3 mb-4">
                  <span className="font-mono text-[10px] font-black uppercase text-[#5A2CA8] block mb-1">
                    Syllabus &amp; Cours
                  </span>
                  <h3 className="text-xl font-black text-[#0a0a0a]">
                    Programme des enseignements
                  </h3>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {(isBiochimie
                    ? biochimieDepartmentDetails.downloadableSyllabi
                    : [
                        { title: "Programme des enseignements niveau II", level: "Niveau II (Licence 2)", url: "#" },
                        { title: "Programme des enseignements niveau III", level: "Niveau III (Licence 3)", url: "#" },
                      ]
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-[#111111] bg-white flex items-center justify-between gap-3 hover:bg-[#FAFAFA] transition"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-[#0a0a0a] block truncate">{item.title}</span>
                        <span className="text-[10px] text-[#0a0a0a]/50">{item.level}</span>
                      </div>
                      <span className="px-2 py-1 bg-[#5A2CA8] text-white text-[10px] font-bold shrink-0">
                        PDF
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-[#0a0a0a]/60 font-mono pt-4">
                  * Note : Les liens de téléchargement définitifs des maquettes et programmes de cours seront fournis au moment venu par le Secrétariat académique.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── Formations Professionnelles rattachées au Département ── */}
        {proPrograms.length > 0 && (
          <section id="formations-pro" className="w-full bg-[#FAFAFA] border-b border-[#111111] py-16 scroll-mt-20">
            <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
              
              <div className="max-w-3xl mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                  <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                    Branche Professionnelle
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                  Formations Professionnelles Rattachées ({proPrograms.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#111111] bg-white divide-y md:divide-y-0 divide-[#111111]">
                {proPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-6 border-r border-b border-[#111111] flex flex-col justify-between hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-black uppercase bg-[#5A2CA8] text-white px-2 py-0.5 inline-block mb-3">
                        {prog.levelBadge}
                      </span>
                      <h4 className="font-black text-base text-[#0a0a0a] leading-snug">
                        {prog.title}
                      </h4>
                      {prog.option && (
                        <p className="mt-1.5 font-mono text-xs font-bold text-[#5A2CA8]">
                          {prog.option}
                        </p>
                      )}
                      <p className="mt-3 text-xs text-[#0a0a0a]/75 font-sans leading-relaxed">
                        {prog.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-[#0a0a0a]/60">{prog.duration}</span>
                      <Link
                        href="/espace-etudiant/admission"
                        className="text-[#5A2CA8] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Candidature</span>
                        <ArrowUpRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ── Section Contacts & Secrétariat Officiel du Département ── */}
        <section id="contact-departement" className="w-full bg-white border-b border-[#111111] py-16 scroll-mt-20">
          <div className="mx-auto max-w-content px-6 border-l border-r border-[#111111]">
            
            <div className="border border-[#111111] bg-[#FAFAFA] p-8 sm:p-10">
              <div className="max-w-3xl mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#5A2CA8]"></span>
                  <span className="font-mono text-xs font-black uppercase tracking-widest text-[#5A2CA8]">
                    Administration &amp; Renseignements
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                  Contact &amp; Secrétariat du {dept.fullName}
                </h2>
                <p className="text-xs font-mono text-[#0a0a0a]/70 mt-1">
                  Adresses professionnelles pour les inscriptions, examens, attestations et relations avec le corps professoral.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                
                {/* Email Chef de Département */}
                <div className="p-5 border border-[#111111] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-[#5A2CA8]">
                    <MailIcon className="w-4 h-4" />
                    <span className="font-black text-[10px] uppercase">Chef de Département</span>
                  </div>
                  <a
                    href={`mailto:${contactInfo.chefEmail}`}
                    className="font-bold text-[#0a0a0a] hover:text-[#5A2CA8] block truncate"
                  >
                    {contactInfo.chefEmail}
                  </a>
                  <span className="text-[10px] text-[#0a0a0a]/50 block">Directeur des Enseignements</span>
                </div>

                {/* Email Secrétariat */}
                <div className="p-5 border border-[#111111] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-[#5A2CA8]">
                    <MailIcon className="w-4 h-4" />
                    <span className="font-black text-[10px] uppercase">Secrétariat Pédagogique</span>
                  </div>
                  <a
                    href={`mailto:${contactInfo.secretariatEmail}`}
                    className="font-bold text-[#0a0a0a] hover:text-[#5A2CA8] block truncate"
                  >
                    {contactInfo.secretariatEmail}
                  </a>
                  <span className="text-[10px] text-[#0a0a0a]/50 block">Notes, attestations &amp; requêtes</span>
                </div>

                {/* Localisation Campus & Tél */}
                <div className="p-5 border border-[#111111] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-[#5A2CA8]">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="font-black text-[10px] uppercase">Localisation &amp; Tél</span>
                  </div>
                  <p className="font-bold text-[#0a0a0a] leading-tight">
                    {contactInfo.location}
                  </p>
                  <span className="text-[10px] text-[#0a0a0a]/50 block flex items-center gap-1">
                    <PhoneIcon className="w-3 h-3" />
                    <span>(+237) 222 23 44 96 (Standard UY1)</span>
                  </span>
                </div>

              </div>

              {/* Bouton d'accès aux enseignants permanents */}
              <div className="mt-6 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <span className="text-[#0a0a0a]/60">
                  Consulter la liste officielle des Professeurs et Maîtres de Conférences de ce département.
                </span>
                <Link
                  href="/la-faculte/enseignants"
                  className="px-4 py-2 bg-[#5A2CA8] text-white font-bold hover:bg-[#431C82] transition inline-flex items-center gap-1.5"
                >
                  <span>Voir le corps professoral [{dept.code}]</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
