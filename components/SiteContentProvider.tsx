"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CmsPageSection, INITIAL_CMS_CONTENT } from "@/lib/admin-data";

interface SiteContentContextType {
  cmsItems: CmsPageSection[];
  getContent: (cle: string, fallback?: string) => string;
  updateItemValue: (id: string, newValeur: string) => void;
  saveAllChanges: () => void;
  resetToDefaults: () => void;
  lastSavedTime: string | null;
  hasUnsavedChanges: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [cmsItems, setCmsItems] = useState<CmsPageSection[]>(INITIAL_CMS_CONTENT);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Charger depuis localStorage au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fs_cms_content_overrides");
      if (saved) {
        const parsed: Record<string, string> = JSON.parse(saved);
        setCmsItems((prev) =>
          prev.map((item) => {
            if (parsed[item.cle] !== undefined) {
              return { ...item, valeurParDefaut: parsed[item.cle] };
            }
            return item;
          })
        );
      }
      const savedTime = localStorage.getItem("fs_cms_last_saved_time");
      if (savedTime) setLastSavedTime(savedTime);
    } catch {
      // Ignorer
    }
  }, []);

  // Obtenir la valeur d'une clé (avec fallback)
  const getContent = (cle: string, fallback: string = ""): string => {
    const item = cmsItems.find((i) => i.cle === cle);
    return item ? item.valeurParDefaut : fallback;
  };

  // Mettre à jour la valeur d'un champ
  const updateItemValue = (id: string, newValeur: string) => {
    setCmsItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, valeurParDefaut: newValeur };
        }
        return item;
      })
    );
    setHasUnsavedChanges(true);
  };

  // Sauvegarder dans le stockage persistant du navigateur
  const saveAllChanges = () => {
    try {
      const overrides: Record<string, string> = {};
      cmsItems.forEach((item) => {
        overrides[item.cle] = item.valeurParDefaut;
      });
      localStorage.setItem("fs_cms_content_overrides", JSON.stringify(overrides));
      const nowTime = new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      localStorage.setItem("fs_cms_last_saved_time", nowTime);
      setLastSavedTime(nowTime);
      setHasUnsavedChanges(false);
    } catch {
      alert("Erreur lors de l'enregistrement dans le stockage local.");
    }
  };

  // Réinitialiser les textes d'origine
  const resetToDefaults = () => {
    try {
      localStorage.removeItem("fs_cms_content_overrides");
      localStorage.removeItem("fs_cms_last_saved_time");
      setCmsItems(INITIAL_CMS_CONTENT);
      setLastSavedTime(null);
      setHasUnsavedChanges(false);
    } catch {}
  };

  return (
    <SiteContentContext.Provider
      value={{
        cmsItems,
        getContent,
        updateItemValue,
        saveAllChanges,
        resetToDefaults,
        lastSavedTime,
        hasUnsavedChanges,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return ctx;
}
