"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ParticleLoader() {
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<number>(0);
  const [show, setShow] = useState<boolean>(true);
  const prevPathnameRef = useRef<string | null>(null);

  // 1. Déclenchement UNIQUEMENT au premier chargement (démarrage) et lors d'un VRAI changement de page
  useEffect(() => {
    // Premier chargement de l'application
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      setShow(true);
      setActiveKey((k) => k + 1);
      return;
    }

    // Changement réel d'URL entre deux pages distinctes (ex: / -> /formations)
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setShow(true);
      setActiveKey((k) => k + 1);
    }
    // Si on est sur la même page (ancres #, boutons, filtres internes), NE RIEN DÉCLENCHER
  }, [pathname]);

  // 2. Sécurité absolue : disparition garantie après 2.8 secondes (respecte "max 3 seconde")
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, 2850);

    return () => clearTimeout(timer);
  }, [activeKey, show]);

  if (!show) {
    return null;
  }

  return (
    <div
      key={activeKey}
      role="status"
      aria-live="polite"
      aria-label="Chargement..."
      className="fixed inset-0 z-[999999] flex items-center justify-center select-none bg-white"
      style={{
        animation: "particleLoaderExit 2.85s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
      }}
    >
      <style jsx>{`
        @keyframes particleLoaderExit {
          0% {
            opacity: 1;
            pointer-events: auto;
            visibility: visible;
          }
          82% {
            opacity: 1;
            pointer-events: auto;
            visibility: visible;
          }
          96% {
            opacity: 0;
            pointer-events: none;
            visibility: visible;
          }
          100% {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }
        }
      `}</style>

      {/* Uniquement l'effet de chargement du logo sur fond blanc */}
      <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center pointer-events-none">
        <video
          src="/loader/logo_particle_loader.webm"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </div>
  );
}
