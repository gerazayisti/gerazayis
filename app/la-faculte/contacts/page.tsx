import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ContactHero from "@/components/ContactHero";
import ContactKeyCards from "@/components/ContactKeyCards";
import ContactDirectoryTable from "@/components/ContactDirectoryTable";
import ContactForm from "@/components/ContactForm";
import ContactLocationMap from "@/components/ContactLocationMap";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contacts & Localisation — Faculté des Sciences | Université de Yaoundé I",
  description:
    "Coordonnées officielles, annuaire des 20 adresses e-mails professionnelles du Décanat et des Départements, formulaire de contact officiel et plan d'accès de la Faculté des Sciences de l'Université de Yaoundé I (Plateau Atemengue, BP 812 Yaoundé, (+237) 222 23 44 96).",
};

export default function ContactsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* 1. En-tête & coordonnées de base (Téléphone, BP, Site Web, Secrétariat) */}
        <ContactHero />

        {/* 2. Cartes d'accès prioritaires (Doyen, Secrétariat, Scolarité, Diplômes, CI, Support) */}
        <ContactKeyCards />

        {/* 3. Annuaire officiel complet des 20 adresses et logins */}
        <ContactDirectoryTable />

        {/* 4. Formulaire officiel de transmission avec Captcha anti-robot */}
        <ContactForm />

        {/* 5. Implantation sur les 2 campus, horaires des guichets & plan OpenStreetMap */}
        <ContactLocationMap />
      </main>
      <SiteFooter />
    </>
  );
}
