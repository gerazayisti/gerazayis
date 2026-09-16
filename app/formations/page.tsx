import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import FormationsHero from "@/components/FormationsHero";
import FormationsThreeBranches from "@/components/FormationsThreeBranches";
import FormationsLmdOverview from "@/components/FormationsLmdOverview";
import FormationsProSection from "@/components/FormationsProSection";
import FormationsPolesGrid from "@/components/FormationsPolesGrid";
import FormationsAdmissionGuide from "@/components/FormationsAdmissionGuide";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Formations & Diplômes — Faculté des Sciences | Université de Yaoundé I",
  description:
    "Les 3 grandes branches de formation de la Faculté des Sciences de l'Université de Yaoundé I : Cursus Académiques LMD (10 Départements), 18 Formations Professionnelles (Licences Pro & Masters Pro), et Certifications d'État (Sciences Forensiques & Énergie Solaire).",
};

export default function FormationsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* 1. En-tête éditorial & Métriques clés */}
        <FormationsHero />

        {/* 2. Les 3 Grandes Branches de l'offre : Académique · Professionnel · Certification */}
        <FormationsThreeBranches />

        {/* 3. Le Schéma LMD expliqué simplement (Licence, Master, Doctorat) */}
        <FormationsLmdOverview />

        {/* 4. Section III Officielle : Formations Professionnelles (Licences Pro & Masters Pro) & Certificats */}
        <FormationsProSection />

        {/* 5. Les 10 Départements scientifiques & Débouchés par pôle académique */}
        <FormationsPolesGrid />

        {/* 6. Guide d'admission en 4 étapes & FAQ simplifiée */}
        <FormationsAdmissionGuide />
      </main>
      <SiteFooter />
    </>
  );
}
