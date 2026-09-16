import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { AdminAuthProvider } from "@/components/AdminAuthProvider";
import { SiteContentProvider } from "@/components/SiteContentProvider";

export const metadata = {
  title: "Portail d'Administration · Faculté des Sciences — UY1",
  description:
    "Espace d'administration multi-rôles : Le Doyen, Enseignants, DAARS / Scolarité Centrale et Webmaster CMS.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <SiteContentProvider>
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
          {/* ── SIDEBAR GAUCHE DÉDIÉE (remplace les 2 headers) ── */}
          <AdminSidebar />

          {/* ── ZONE DE CONTENU PRINCIPALE ── */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
            {/* Fine barre supérieure d'état */}
            <header className="bg-white border-b border-[#111111] px-6 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 inline-block animate-pulse"></span>
                <span className="text-[#0a0a0a]/50 uppercase font-bold">Système d&apos;Information Facultaire :</span>
                <span className="text-[#5A2CA8] font-bold">Portail Intégré FS — UY1</span>
              </div>

              <div className="flex items-center gap-4 text-[#0a0a0a]/60 text-[11px]">
                <span>Session Académique 2025/2026</span>
                <span className="text-[#111111]">|</span>
                <span>Plateau Atemengué, Yaoundé</span>
              </div>
            </header>

            {/* Contenu de la page */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </SiteContentProvider>
    </AdminAuthProvider>
  );
}
