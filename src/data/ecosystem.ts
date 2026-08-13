import ojaEmblem from "../assets/ecosystem/emblems/oja-emblem-a2.png";
import ojpEmblem from "../assets/ecosystem/emblems/ojp-emblem-a2.png";
import ojcsEmblem from "../assets/ecosystem/emblems/ojcs-emblem-a2.png";
import ojwEmblem from "../assets/ecosystem/emblems/ojw-emblem-a2.png";

export type EcosystemState = "preparation" | "development" | "ready";
export type EcosystemEntityType = "APPLICATION" | "SOFTWARE" | "WEB_PORTAL" | "FOUNDATION";

type PublicPageFields = {
  publicPagePath: `/${string}`;
  publicPageAvailable: boolean;
};

type ProductFields = {
  slug: string;
  shortName: string;
  acronym: string;
  status: EcosystemState;
  productAvailable: boolean;
  emblem: string;
  emblemAlt: string;
  legacyHeroHref?: string;
};

type PublicEntityBase = {
  id: string;
  name: string;
  description: string;
  statusLabel: string;
} & PublicPageFields;

export type ApplicationEntity = PublicEntityBase & ProductFields & {
  entityType: "APPLICATION";
  homeProductCard: true;
};

export type SoftwareEntity = PublicEntityBase & ProductFields & {
  entityType: "SOFTWARE";
  homeProductCard: true;
};

export type WebPortalEntity = PublicEntityBase & ProductFields & {
  entityType: "WEB_PORTAL";
  homeProductCard: false;
};

export type FoundationEntity = {
  id: string;
  acronym: "OJF";
  name: string;
  statusLabel: string;
  description: string;
  kind: "institutional";
  entityType: "FOUNDATION";
  homeProductCard: false;
  roles: readonly ["ECOSYSTEM_CARRIER", "INSTITUTIONAL_ENTITY"];
};

export type PublicProject = ApplicationEntity | SoftwareEntity | WebPortalEntity;
export type EcosystemEntity = PublicProject | FoundationEntity;

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

export const ecosystemEntities: readonly EcosystemEntity[] = [
  {
    id: "academy",
    entityType: "APPLICATION",
    homeProductCard: true,
    slug: "OJA",
    shortName: "OJA",
    acronym: "OJA",
    name: "OnJarama Academy",
    description: "Apprentissage, rôles éducatifs, progression et fondations offline-first.",
    status: "development",
    statusLabel: "En développement",
    publicPagePath: "/oja",
    publicPageAvailable: true,
    productAvailable: false,
    emblem: ojaEmblem,
    emblemAlt: "Emblème organique vert du projet OJA",
  },
  {
    id: "path",
    entityType: "APPLICATION",
    homeProductCard: true,
    slug: "OJP",
    shortName: "OJP",
    acronym: "OJP",
    name: "OnJarama Path",
    description: "Finances personnelles, objectifs, budget et progression guidée.",
    status: "development",
    statusLabel: "En développement",
    publicPagePath: "/ojp",
    publicPageAvailable: true,
    productAvailable: false,
    emblem: ojpEmblem,
    emblemAlt: "Emblème-graine bleu et violet du projet OJP",
  },
  {
    id: "ojcs-connect",
    entityType: "APPLICATION",
    homeProductCard: true,
    slug: "OJCS",
    shortName: "OJCS",
    acronym: "OJCS",
    name: "OJCS Connect",
    description: "Services connectés, diaspora, ressources et découvertes communautaires.",
    status: "development",
    statusLabel: "En développement",
    publicPagePath: "/ojcs",
    publicPageAvailable: true,
    productAvailable: false,
    emblem: ojcsEmblem,
    emblemAlt: "Emblème communautaire orange du projet OJCS",
  },
  {
    id: "web",
    entityType: "WEB_PORTAL",
    homeProductCard: false,
    slug: "OJW",
    shortName: "OJW",
    acronym: "OJW",
    name: "OnJarama Web",
    description: "Le portail institutionnel que vous consultez : présentation de l’écosystème et point d’entrée officiel.",
    status: "ready",
    statusLabel: "Vous êtes ici",
    publicPagePath: "/ojw",
    publicPageAvailable: true,
    productAvailable: true,
    emblem: ojwEmblem,
    emblemAlt: "Emblème-portail bleu du projet OJW",
    legacyHeroHref: "#top",
  },
  {
    id: "foundation",
    acronym: "OJF",
    name: "OnJarama Foundation",
    statusLabel: "En préparation",
    description: "Socle institutionnel présent d’OnJarama, porteur de sa vision, de ses principes, de ses engagements, de ses objectifs et de l’introduction publique à sa Constitution.",
    kind: "institutional",
    entityType: "FOUNDATION",
    homeProductCard: false,
    roles: ["ECOSYSTEM_CARRIER", "INSTITUTIONAL_ENTITY"],
  },
] as const;

export const publicApplications = ecosystemEntities.filter(
  (entity): entity is ApplicationEntity => entity.entityType === "APPLICATION",
);

export const publicSoftware = ecosystemEntities.filter(
  (entity): entity is SoftwareEntity => entity.entityType === "SOFTWARE",
);

export const webPortalEntity = ecosystemEntities.find(
  (entity): entity is WebPortalEntity => entity.entityType === "WEB_PORTAL",
)!;

export const foundationEntity = ecosystemEntities.find(
  (entity): entity is FoundationEntity => entity.entityType === "FOUNDATION",
)!;

export const publicPageEntities = ecosystemEntities.filter(
  (entity): entity is PublicProject => "publicPageAvailable" in entity && entity.publicPageAvailable,
);

/** Temporary Home compatibility selector. It intentionally retains OJW until ECOSYSTEM-03-B. */
export const publicProjects: readonly PublicProject[] = publicPageEntities;

/** LEGACY_HERO_PROJECTION != CANONICAL_PUBLIC_TAXONOMY. */
export const ecosystem: EcosystemItem[] = [
  { ...foundationEntity, state: "preparation" },
  ...publicPageEntities.map((entity) => ({
    id: entity.id,
    acronym: entity.shortName,
    name: entity.name,
    statusLabel: entity.statusLabel,
    state: entity.status,
    description: entity.description,
    href: entity.legacyHeroHref,
    isCurrent: entity.entityType === "WEB_PORTAL",
    kind: "application" as const,
  })),
];
