import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import TeachersHeader from "@/components/TeachersHeader";
import TeachersStatsTable from "@/components/TeachersStatsTable";
import TeachersAdminTeam from "@/components/TeachersAdminTeam";
import TeachersAccordion from "@/components/TeachersAccordion";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Enseignants Permanents — Faculté des Sciences | Université de Yaoundé I",
  description:
    "Liste officielle des enseignants permanents de la Faculté des Sciences de l'Université de Yaoundé I pour l'année académique 2023/2024 : 318 enseignants par département et par grade (Professeurs, Maîtres de Conférences, Chargés de Cours, Assistants).",
};

export default function EnseignantsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <TeachersHeader />
        <TeachersStatsTable />
        <TeachersAdminTeam />
        <TeachersAccordion />
      </main>
      <SiteFooter />
    </>
  );
}
