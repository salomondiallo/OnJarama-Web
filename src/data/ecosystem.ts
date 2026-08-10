import ojaEmblem from "../assets/ecosystem/emblems/oja-emblem-a2.png";
import ojpEmblem from "../assets/ecosystem/emblems/ojp-emblem-a2.png";
import ojcsEmblem from "../assets/ecosystem/emblems/ojcs-emblem-a2.png";
import ojwEmblem from "../assets/ecosystem/emblems/ojw-emblem-a2.png";

export type EcosystemState = "preparation" | "development" | "ready";

export type PublicProject = {
  id: string;
  slug: string;
  shortName: string;
  /** Compatibility alias consumed by the historical hidden Hero controls. */
  acronym: string;
  name: string;
  description: string;
  status: EcosystemState;
  statusLabel: string;
  publicPagePath: `/${string}`;
  publicPageAvailable: boolean;
  productAvailable: boolean;
  emblem: string;
  emblemAlt: string;
  /** Temporary compatibility destination for the hidden legacy Hero only. */
  legacyHeroHref?: string;
};

export type FoundationEntity = {
  id: string;
  acronym: "OJF";
  name: string;
  statusLabel: string;
  description: string;
  kind: "institutional";
  entityType: "FOUNDATION";
  roles: readonly ["ECOSYSTEM_CARRIER", "INSTITUTIONAL_ENTITY"];
};

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

export const foundationEntity: FoundationEntity = {
  id: "foundation",
  acronym: "OJF",
  name: "OnJarama Foundation",
  statusLabel: "En préparation",
  description:
    "Pilier institutionnel et social chargé de structurer l’impact, les partenariats et les futures initiatives d’intérêt collectif d’OnJarama.",
  kind: "institutional",
  entityType: "FOUNDATION",
  roles: ["ECOSYSTEM_CARRIER", "INSTITUTIONAL_ENTITY"],
};

export const publicProjects: readonly PublicProject[] = [
  {
    id: "academy",
    slug: "OJA",
    shortName: "OJA",
    acronym: "OJA",
    name: "OnJarama Academy",
    description: "Apprentissage, rôles éducatifs, progression et fondations offline-first.",
    status: "development",
    statusLabel: "En développement",
    publicPagePath: "/oja",
    publicPageAvailable: false,
    productAvailable: false,
    emblem: ojaEmblem,
    emblemAlt: "Emblème organique vert du projet OJA",
  },
  {
    id: "path",
    slug: "OJP",
    shortName: "OJP",
    acronym: "OJP",
    name: "OnJarama Path",
    description: "Finances personnelles, objectifs, budget et progression guidée.",
    status: "development",
    statusLabel: "En développement",
    publicPagePath: "/ojp",
    publicPageAvailable: false,
    productAvailable: false,
    emblem: ojpEmblem,
    emblemAlt: "Emblème-graine bleu et violet du projet OJP",
  },
  {
    id: "ojcs-connect",
    slug: "OJCS",
    shortName: "OJCS",
    acronym: "OJCS",
    name: "OJCS Connect",
    description: "Services connectés, diaspora, ressources et découvertes communautaires.",
    status: "development",
    statusLabel: "En développement",
    publicPagePath: "/ojcs",
    publicPageAvailable: false,
    productAvailable: false,
    emblem: ojcsEmblem,
    emblemAlt: "Emblème communautaire orange du projet OJCS",
  },
  {
    id: "web",
    slug: "OJW",
    shortName: "OJW",
    acronym: "OJW",
    name: "OnJarama Web",
    description: "Le portail institutionnel que vous consultez : présentation de l’écosystème et point d’entrée officiel.",
    status: "ready",
    statusLabel: "Vous êtes ici",
    publicPagePath: "/ojw",
    publicPageAvailable: false,
    productAvailable: true,
    emblem: ojwEmblem,
    emblemAlt: "Emblème-portail bleu du projet OJW",
    legacyHeroHref: "#top",
  },
] as const;

/**
 * Compatibility projection for the locked, hidden Hero legacy. New public UI
 * must consume publicProjects or foundationEntity directly.
 */
export const ecosystem: EcosystemItem[] = [
  { ...foundationEntity, state: "preparation" },
  ...publicProjects.map((project) => ({
    id: project.id,
    acronym: project.shortName,
    name: project.name,
    statusLabel: project.statusLabel,
    state: project.status,
    description: project.description,
    href: project.legacyHeroHref,
    isCurrent: project.id === "web",
    kind: "application" as const,
  })),
];
