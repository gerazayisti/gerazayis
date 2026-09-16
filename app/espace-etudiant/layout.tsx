import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StudentNavHeader from "@/components/StudentNavHeader";
import { StudentAuthProvider } from "@/components/StudentAuthProvider";

export const metadata: Metadata = {
  title: "Espace Étudiant & Scolarité — Faculté des Sciences | UY1",
  description:
    "Portail numérique officiel des étudiants de la Faculté des Sciences de l'Université de Yaoundé I : relevés de notes, babillard, guichet des requêtes académiques, calendrier officiel, service de scolarité et bourses d'étude.",
};

export default function StudentSpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentAuthProvider>
      <SiteHeader />
      <StudentNavHeader />
      <main className="min-h-screen bg-[#FAFAFA]">{children}</main>
      <SiteFooter />
    </StudentAuthProvider>
  );
}
