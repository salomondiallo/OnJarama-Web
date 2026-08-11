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
  mission: "Apprendre, accompagner et progresser dans un environnement éducatif pensé d’abord pour les réalités guinéennes.",
  summary: "OnJarama Academy est un projet éducatif numérique conçu pour rendre l’apprentissage, l’accompagnement et la progression plus accessibles, en tenant compte des réalités des apprenants, des familles, des enseignants et des établissements, d’abord en Guinée puis progressivement au-delà.",
  audiences: [
    "Apprenants",
    "Enseignants",
    "Familles et responsables",
    "Établissements et acteurs éducatifs",
  ],
  currentCapabilities: [
    {
      title: "Un projet logiciel éducatif en développement",
      description: "L’architecture des parcours, des rôles et des contextes éducatifs est en cours de structuration.",
      stage: "CURRENT",
    },
    {
      title: "Un travail pédagogique engagé",
      description: "Les contextes apprenant, enseignant, responsable et établissement guident la conception, tandis que le travail pédagogique et la préparation de contenus internes avancent.",
      stage: "CURRENT",
    },
    {
      title: "Des fondations accessibles",
      description: "La conception privilégie le smartphone et l’accessibilité, avec des fondations techniques destinées à permettre progressivement des usages lorsque la connectivité est limitée.",
      stage: "CURRENT",
    },
  ],
  plannedCapabilities: [
    {
      title: "Parcours et apprentissage",
      description: "Des parcours structurés par cycles et niveaux, des espaces adaptés aux rôles, des activités pédagogiques ainsi que la progression, le suivi, la préparation et l’évaluation.",
      stage: "PLANNED",
    },
    {
      title: "Accompagnement éducatif",
      description: "L’accompagnement des familles, des outils pour enseignants, des contextes de classe, de groupe et d’établissement, ainsi que des échanges, demandes, validations et communications entre les acteurs concernés.",
      stage: "PLANNED",
    },
    {
      title: "Accès en connectivité limitée",
      description: "Un accès progressivement renforcé, avec synchronisation et capacités hors connexion plus avancées.",
      stage: "PLANNED",
    },
    {
      title: "Élargissement académique",
      description: "Un développement progressif couvrant l’architecture visée du Primaire, du Collège et du Lycée à partir de référentiels vérifiés.",
      stage: "PLANNED",
    },
  ],
  projectStatus: {
    label: "Projet en développement actif",
    stage: "CURRENT",
    detail: "Les cours, examens et espaces dédiés aux différents rôles seront présentés publiquement à mesure qu’ils seront qualifiés et réellement disponibles.",
  },
  roadmap: [
    { label: "Fondations", description: "Architecture des rôles, parcours et contextes éducatifs.", stage: "CURRENT" },
    { label: "Expérience", description: "Interfaces, navigation et identité visuelle adaptées aux usages réels.", stage: "PLANNED" },
    { label: "Contenus", description: "Développement progressif de ressources pédagogiques à partir de références vérifiées.", stage: "PLANNED" },
    { label: "Validation terrain", description: "Tests avec utilisateurs, enseignants et établissements lorsque le projet sera suffisamment prêt.", stage: "PLANNED" },
    { label: "Extension", description: "Capacités hors connexion renforcées, outils institutionnels qualifiés et ouverture progressive à d’autres contextes.", stage: "VISION" },
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
    { title: "Rendre les parcours plus accessibles", description: "Rendre l’apprentissage, l’accompagnement et la progression plus lisibles et accessibles." },
    { title: "Soutenir la continuité", description: "Structurer les rôles et les parcours autour d’étapes claires et de repères durables." },
    { title: "Partir des réalités éducatives", description: "Construire d’abord à partir des réalités de la Guinée avant une ouverture progressive à d’autres contextes." },
  ],
  audienceDetails: [
    { title: "Apprenants", description: "Les élèves en priorité, puis d’autres parcours éducatifs ou de formation à mesure qu’ils seront qualifiés." },
    { title: "Enseignants", description: "Les enseignants rattachés à un établissement ou exerçant dans des contextes indépendants." },
    { title: "Familles et responsables", description: "Les parents, tuteurs et responsables qui accompagnent l’apprenant." },
    { title: "Établissements et acteurs éducatifs", description: "Les directions, administrations, structures et institutions éducatives concernées." },
  ],
} satisfies PublicProjectEditorial & {
  why: readonly { title: string; description: string }[];
  audienceDetails: readonly { title: string; description: string }[];
};
