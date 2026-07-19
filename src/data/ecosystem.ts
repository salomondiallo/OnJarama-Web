export type EcosystemItem = {
  id: string;
  name: string;
  subtitle?: string;
  status: string;
  description: string;
  href?: string;
  isCurrent?: boolean;
  kind?: "application" | "institutional";
  actionLabel?: string;
};

export const ecosystem: EcosystemItem[] = [
  {
    id: "path",
    name: "OnJarama Path",
    status: "Disponible",
    description: "Finances personnelles, objectifs, budget et progression guidée.",
    href: undefined as string | undefined,
  },
  {
    id: "academy",
    name: "OnJarama Academy",
    status: "En construction avancée",
    description: "Apprentissage, rôles éducatifs, progression et fondations offline-first.",
    href: undefined as string | undefined,
  },
  {
    id: "ojcs-connect",
    name: "OJCS Connect",
    status: "En développement",
    description: "Services connectés, diaspora, ressources et découvertes communautaires.",
    href: undefined as string | undefined,
  },
  {
    id: "web",
    name: "OnJarama Web",
    status: "Portail actuel",
    description: "Le portail institutionnel que vous consultez : présentation de l’écosystème et point d’entrée officiel.",
    href: "#top",
    isCurrent: true,
  },
  {
    id: "foundation",
    name: "OnJarama Foundation",
    subtitle: "Fondation et mission institutionnelle",
    status: "Cadre institutionnel en développement",
    description:
      "Le socle institutionnel d’OnJarama, consacré à la mission sociale, à la gouvernance, aux partenariats et aux initiatives d’intérêt collectif.",
    href: "#foundation-note",
    kind: "institutional",
    actionLabel: "Découvrir sa mission",
  },
];
