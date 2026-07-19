export type EcosystemItem = {
  id: string;
  name: string;
  status: string;
  description: string;
  isCurrent?: boolean;
  kind?: "application" | "institutional";
};

export const ecosystem: EcosystemItem[] = [
  {
    id: "foundation",
    name: "OnJarama Foundation",
    status: "En préparation",
    description:
      "Pilier institutionnel et social chargé de structurer l’impact, les partenariats et les futures initiatives d’intérêt collectif d’OnJarama.",
    kind: "institutional",
  },
  {
    id: "path",
    name: "OnJarama Path",
    status: "En développement",
    description: "Finances personnelles, objectifs, budget et progression guidée.",
  },
  {
    id: "academy",
    name: "OnJarama Academy",
    status: "En développement",
    description: "Apprentissage, rôles éducatifs, progression et fondations offline-first.",
  },
  {
    id: "ojcs-connect",
    name: "OJCS Connect",
    status: "En développement",
    description: "Services connectés, diaspora, ressources et découvertes communautaires.",
  },
  {
    id: "web",
    name: "OnJarama Web",
    status: "Vous êtes ici",
    description: "Le portail institutionnel que vous consultez : présentation de l’écosystème et point d’entrée officiel.",
    isCurrent: true,
  },
];
