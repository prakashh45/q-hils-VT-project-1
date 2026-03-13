import React, { createContext, useContext, useState } from "react";

/* ---------- TYPES ---------- */

type SchoolType = {
  id: string;
  name: string;
  district?: string;
};

type VisitType = {
  date: string;
  time: string;
  school: string;
  district: string;
};

type VisitContextType = {
  visits: VisitType[];
  addVisit: (visit: VisitType) => void;

  currentSchool: SchoolType | null;
  setCurrentSchool: (school: SchoolType | null) => void;

  visitId: string | null;
  setVisitId: (id: string | null) => void;
};

/* ---------- CONTEXT ---------- */

const VisitContext = createContext<VisitContextType | undefined>(undefined);

/* ---------- DEFAULT SCHOOL ---------- */

const DEFAULT_SCHOOL: SchoolType = {
  id: "31311000000027052",
  name: "Demo School",
  district: "Default District"
};

/* ---------- PROVIDER ---------- */

export const VisitProvider = ({ children }: { children: React.ReactNode }) => {

  const [visits, setVisits] = useState<VisitType[]>([
    {
      date: "Oct 24 2023",
      time: "10:00 AM",
      school: "Greenwood High",
      district: "North District"
    }
  ]);

  /* CURRENT SCHOOL (DEFAULT SET) */

  const [currentSchool, setCurrentSchool] = useState<SchoolType | null>(DEFAULT_SCHOOL);

  /* ACTIVE VISIT ID */

  const [visitId, setVisitId] = useState<string | null>(null);

  /* ADD VISIT */

  const addVisit = (visit: VisitType) => {

    setVisits((prev) => [...prev, visit]);

  };

  return (

    <VisitContext.Provider
      value={{
        visits,
        addVisit,
        currentSchool,
        setCurrentSchool,
        visitId,
        setVisitId
      }}
    >

      {children}

    </VisitContext.Provider>

  );

};

/* ---------- HOOK ---------- */

export const useVisit = () => {

  const context = useContext(VisitContext);

  if (!context) {
    throw new Error("useVisit must be used inside VisitProvider");
  }

  return context;

};

export default VisitProvider;