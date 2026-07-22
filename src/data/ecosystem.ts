export type EcosystemState = "preparation" | "development" | "ready";

export type EcosystemItem = {
  id: string;
  acronym: string;
  name: string;
  statusLabel: string;
  state: EcosystemState;
  description: string;
  href?: string;
  isCurrent?: boolean;
  kind?: "application" | "institutional";
};

export const ecosystem: EcosystemItem[] = [
  {
    id: "foundation",
    acronym: "OJF",
    name: "OnJarama Foundation",
    statusLabel: "En préparation",
    state: "preparation",
    description:
      "Pilier institutionnel et social chargé de structurer l’impact, les partenariats et les futures initiatives d’intérêt collectif d’OnJarama.",
    kind: "institutional",
  },
  {
    id: "path",
    acronym: "OJP",
    name: "OnJarama Path",
    statusLabel: "En développement",
    state: "development",
    description: "Finances personnelles, objectifs, budget et progression guidée.",
  },
  {
    id: "academy",
    acronym: "OJA",
    name: "OnJarama Academy",
    statusLabel: "En développement",
    state: "development",
    description: "Apprentissage, rôles éducatifs, progression et fondations offline-first.",
  },
  {
    id: "ojcs-connect",
    acronym: "OJCS",
    name: "OJCS Connect",
    statusLabel: "En développement",
    state: "development",
    description: "Services connectés, diaspora, ressources et découvertes communautaires.",
  },
  {
    id: "web",
    acronym: "OJW",
    name: "OnJarama Web",
    statusLabel: "Vous êtes ici",
    state: "ready",
    description: "Le portail institutionnel que vous consultez : présentation de l’écosystème et point d’entrée officiel.",
    href: "#top",
    isCurrent: true,
  },
];
