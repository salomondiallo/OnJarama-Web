import ojaEmblem from "../../assets/ecosystem/emblems/oja-emblem-a2.png";
import type { PublicProjectEditorial } from "./types";

export const ojaProject = {
  id: "academy",
  shortName: "OJA",
  name: "OnJarama Academy",
  emblem: ojaEmblem,
  emblemAlt: "Emblème organique vert du projet OnJarama Academy",
  seo: {
    title: "OnJarama Academy (OJA) — Projet éducatif OnJarama",
    description: "Découvrez OnJarama Academy, le projet éducatif OnJarama en développement, conçu d’abord à partir des réalités éducatives guinéennes.",
    canonicalUrl: "https://onjarama.ca/oja",
    ogTitle: "OnJarama Academy (OJA) — Projet éducatif OnJarama",
    ogDescription: "Découvrez la mission, les publics et la trajectoire d’OnJarama Academy, projet éducatif conçu d’abord à partir des réalités guinéennes.",
  },
  mission: "Une application éducative pensée pour apprendre, accompagner et progresser à partir des réalités guinéennes.",
  summary: "OnJarama Academy part d’un besoin simple : permettre aux apprenants de mieux comprendre leur parcours et à celles et ceux qui les accompagnent de disposer de repères plus clairs, même lorsque les conditions d’accès au numérique sont contraintes.",
  audiences: [
    "Apprenants",
    "Enseignants",
    "Familles et responsables",
    "Établissements et acteurs éducatifs",
  ],
  currentCapabilities: [
    {
      title: "Une architecture éducative établie",
      description: "Les rôles, les parcours et les principaux contextes éducatifs disposent de fondations de conception clairement structurées.",
      stage: "CURRENT",
    },
    {
      title: "Un travail pédagogique engagé",
      description: "Les besoins des apprenants, enseignants, responsables et établissements guident la conception et la préparation progressive des contenus.",
      stage: "CURRENT",
    },
    {
      title: "Le terrain intégré dès la conception",
      description: "Le smartphone, l’accessibilité et la connectivité irrégulière sont pris en compte dans l’architecture en cours, sans annoncer un produit déjà disponible.",
      stage: "CURRENT",
    },
  ],
  plannedCapabilities: [
    {
      title: "Apprendre et progresser",
      description: "Structurer progressivement les parcours, activités, repères de progression et évaluations à partir de référentiels qualifiés.",
      stage: "PLANNED",
    },
    {
      title: "Accompagner les rôles éducatifs",
      description: "Construire des espaces adaptés aux apprenants, enseignants, familles et établissements, ainsi que leurs échanges et validations utiles.",
      stage: "PLANNED",
    },
    {
      title: "Renforcer la continuité",
      description: "Faire progresser l’accessibilité, la synchronisation et les capacités hors connexion, puis étendre les parcours à mesure de leur validation.",
      stage: "PLANNED",
    },
  ],
  projectStatus: {
    label: "Projet en développement actif",
    stage: "CURRENT",
    detail: "Les cours, examens et espaces dédiés aux différents rôles seront présentés publiquement à mesure qu’ils seront qualifiés et réellement disponibles.",
  },
  roadmap: [
    { label: "Fondations engagées", description: "Structurer les rôles, les parcours et les contextes éducatifs qui donnent sa cohérence à OJA.", stage: "CURRENT" },
    { label: "Construction et qualification", description: "Développer les expériences et contenus, puis les confronter progressivement aux réalités du terrain.", stage: "PLANNED" },
    { label: "Extension maîtrisée", description: "Renforcer la continuité hors connexion et élargir les parcours seulement lorsqu’ils sont suffisamment qualifiés.", stage: "VISION" },
  ],
  ecosystemRole: {
    projects: [
      { shortName: "OJW", relation: "OnJarama Web est le portail public qui présente OJA lorsque ses informations sont qualifiées." },
      { shortName: "OJP / OJCS", relation: "OJP et OJCS appartiennent au même écosystème. Leurs relations fonctionnelles avec OJA seront présentées lorsqu’elles seront suffisamment définies et qualifiées." },
    ],
    foundation: {
      shortName: "OJF",
      relation: "OnJarama Foundation est le porteur institutionnel de l’écosystème, et non une application sœur équivalente.",
    },
  },
  primaryAction: { label: "Découvrir l’écosystème", href: "/#ecosystem-projects" },
  secondaryAction: { label: "Voir la roadmap", href: "/#roadmap" },
  why: [
    { title: "Accéder", description: "Réduire les obstacles qui rendent l’apprentissage difficile à suivre ou à poursuivre." },
    { title: "Comprendre", description: "Donner des étapes et des repères lisibles aux apprenants comme à leurs accompagnants." },
    { title: "Continuer", description: "Concevoir pour des usages réels, notamment sur smartphone et avec une connexion irrégulière." },
  ],
  audienceDetails: [
    { title: "Apprenants", description: "Les élèves d’abord, puis d’autres parcours à mesure de leur qualification." },
    { title: "Enseignants", description: "Celles et ceux qui préparent, transmettent et accompagnent les apprentissages." },
    { title: "Familles et responsables", description: "Les personnes qui soutiennent l’apprenant dans la continuité de son parcours." },
    { title: "Établissements", description: "Les structures et acteurs éducatifs qui organisent et suivent les parcours." },
  ],
} satisfies PublicProjectEditorial & {
  why: readonly { title: string; description: string }[];
  audienceDetails: readonly { title: string; description: string }[];
};
