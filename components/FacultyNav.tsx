"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const facultySections = [
  { label: "Présentation Générale", href: "/la-faculte/presentation", code: "01" },
  { label: "Structure Administrative", href: "/la-faculte/structure", code: "02" },
  { label: "Enseignants Permanents", href: "/la-faculte/enseignants", code: "03" },
  { label: "Contacts & Localisation", href: "/la-faculte/contacts", code: "04" },
];

export default function FacultyNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border-b border-[#111111]">
      <div className="mx-auto max-w-content border-l border-r border-[#111111]">
        <div className="flex flex-col sm:flex-row items-stretch overflow-x-auto divide-y sm:divide-y-0 sm:divide-x divide-[#111111] bg-[#FAFAFA]">
          <div className="flex items-center gap-2 px-6 py-3.5 bg-[#18181b] text-white shrink-0">
            <span className="w-2 h-2 bg-[#5A2CA8]"></span>
            <span className="font-mono text-xs font-black uppercase tracking-widest">
              Dossier · La Faculté
            </span>
          </div>

          <nav className="flex items-center flex-1 overflow-x-auto">
            {facultySections.map((item) => {
              const isActive = pathname === item.href || (item.href === "/la-faculte/presentation" && pathname === "/la-faculte");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 border-r border-[#111111] last:border-r-0 ${
                    isActive
                      ? "bg-white text-[#5A2CA8] shadow-[inset_0_-2px_0_#5A2CA8]"
                      : "text-[#0a0a0a]/70 hover:bg-white hover:text-[#5A2CA8]"
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? "text-[#5A2CA8]" : "text-[#0a0a0a]/40"}`}>
                    [{item.code}]
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
