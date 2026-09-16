"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AdminUser,
  AdminRole,
  ADMIN_USERS,
  QuittanceRecord,
  INITIAL_QUITTANCES,
  DECANAT_STATS,
  DEPARTMENTS_METRICS,
  DepartmentMetric,
} from "@/lib/admin-data";
import { StudentRequest, INITIAL_STUDENT_REQUESTS } from "@/lib/student-data";

interface AdminAuthContextType {
  currentUser: AdminUser;
  allAdminUsers: AdminUser[];
  currentRole: AdminRole;
  switchUser: (userId: string) => void;
  switchRole: (role: AdminRole) => void;
  // Requêtes
  allRequests: StudentRequest[];
  getTeacherRequests: (deptCode?: string) => StudentRequest[];
  resolveTeacherClaim: (
    requestId: string,
    decision: "Favorable / Résolue" | "Défavorable / Rejetée",
    reponseOfficielle: string,
    noteRectifieeCC?: number,
    noteRectifieeSN?: number
  ) => void;
  resolveDaarsClaim: (
    requestId: string,
    statut: "Favorable / Résolue" | "En instruction" | "Rejetée",
    reponseOfficielle: string
  ) => void;
  // Quittances
  allQuittances: QuittanceRecord[];
  validateQuittance: (numeroQuittance: string) => void;
  // Doyen
  decanatStats: typeof DECANAT_STATS;
  departmentsMetrics: DepartmentMetric[];
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AdminUser>(ADMIN_USERS[4]); // Par défaut Le Doyen
  const [allRequests, setAllRequests] = useState<StudentRequest[]>(INITIAL_STUDENT_REQUESTS);
  const [allQuittances, setAllQuittances] = useState<QuittanceRecord[]>(INITIAL_QUITTANCES);

  // Charger depuis localStorage au montage côté client
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("fs_active_admin_user_id");
      if (savedUser) {
        const found = ADMIN_USERS.find((u) => u.id === savedUser);
        if (found) setCurrentUser(found);
      }
      const savedReqs = localStorage.getItem("fs_admin_requests");
      if (savedReqs) {
        setAllRequests(JSON.parse(savedReqs));
      }
      const savedQuit = localStorage.getItem("fs_admin_quittances");
      if (savedQuit) {
        setAllQuittances(JSON.parse(savedQuit));
      }
    } catch {
      // Fallback
    }
  }, []);

  const switchUser = (userId: string) => {
    const found = ADMIN_USERS.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      try {
        localStorage.setItem("fs_active_admin_user_id", found.id);
      } catch {}
    }
  };

  const switchRole = (role: AdminRole) => {
    const found = ADMIN_USERS.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      try {
        localStorage.setItem("fs_active_admin_user_id", found.id);
      } catch {}
    }
  };

  // Traitement enseignant
  const resolveTeacherClaim = (
    requestId: string,
    decision: "Favorable / Résolue" | "Défavorable / Rejetée",
    reponseOfficielle: string,
    noteRectifieeCC?: number,
    noteRectifieeSN?: number
  ) => {
    setAllRequests((prev) => {
      const updated = prev.map((req) => {
        if (req.id === requestId) {
          let complement = "";
          if (noteRectifieeCC !== undefined) {
            complement += ` [Note CC rectifiée : ${noteRectifieeCC}/30]`;
          }
          if (noteRectifieeSN !== undefined) {
            complement += ` [Note SN rectifiée : ${noteRectifieeSN}/70]`;
          }
          return {
            ...req,
            statut: decision,
            reponseOfficielle: `${reponseOfficielle}${complement}`,
            dateReponse: new Date().toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          };
        }
        return req;
      });
      try {
        localStorage.setItem("fs_admin_requests", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Traitement DAARS
  const resolveDaarsClaim = (
    requestId: string,
    statut: "Favorable / Résolue" | "En instruction" | "Rejetée",
    reponseOfficielle: string
  ) => {
    setAllRequests((prev) => {
      const updated = prev.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            statut,
            reponseOfficielle,
            dateReponse: new Date().toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          };
        }
        return req;
      });
      try {
        localStorage.setItem("fs_admin_requests", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Validation quittance bancaire
  const validateQuittance = (numeroQuittance: string) => {
    setAllQuittances((prev) => {
      const updated = prev.map((q) => {
        if (q.numeroQuittance === numeroQuittance) {
          return { ...q, statut: "Validé" as const };
        }
        return q;
      });
      try {
        localStorage.setItem("fs_admin_quittances", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Requêtes filtrées pour l'enseignant
  const getTeacherRequests = (deptCode?: string) => {
    const code = deptCode || currentUser.departementCode || "BC";
    if (code === "BC") {
      return allRequests.filter(
        (r) => r.recipientId === "ens-bch" || r.codeUE?.startsWith("BCH")
      );
    }
    if (code === "ENR" || code === "PH") {
      return allRequests.filter(
        (r) =>
          r.recipientId === "ens-enr" ||
          r.codeUE?.startsWith("ENR") ||
          r.codeUE?.startsWith("PHY")
      );
    }
    return allRequests;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentUser,
        allAdminUsers: ADMIN_USERS,
        currentRole: currentUser.role,
        switchUser,
        switchRole,
        allRequests,
        getTeacherRequests,
        resolveTeacherClaim,
        resolveDaarsClaim,
        allQuittances,
        validateQuittance,
        decanatStats: DECANAT_STATS,
        departmentsMetrics: DEPARTMENTS_METRICS,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return ctx;
}
