import ojwEmblem from "../../assets/ecosystem/emblems/ojw-emblem-a2.png";
import type { PublicProjectEditorial } from "./types";

export const ojwProject: PublicProjectEditorial = {
  id: "web",
  shortName: "OJW",
  name: "OnJarama Web",
  emblem: ojwEmblem,
  emblemAlt: "Emblème-portail bleu du projet OnJarama Web",
  seo: {
    title: "OnJarama Web (OJW) — Portail public de l’écosystème OnJarama",
    description: "Découvrez le rôle d’OnJarama Web, portail public de l’écosystème OnJarama, son état actuel et sa trajectoire.",
    canonicalUrl: "https://onjarama.ca/ojw",
  },
  mission: "Rendre l’écosystème OnJarama, ses projets et sa trajectoire accessibles depuis un point d’entrée public clair.",
  summary: "OnJarama Web est le portail public de l’écosystème. Il présente les projets, la vision, la roadmap et les éléments institutionnels disponibles, sans se substituer aux produits qu’il met en relation.",
  audiences: [
    "Les personnes qui souhaitent comprendre l’écosystème OnJarama.",
    "Les visiteurs qui recherchent ses projets, sa vision ou sa trajectoire publique.",
  ],
  currentCapabilities: [
    { title: "Présenter l’écosystème", description: "La Home donne une vue commune d’OJA, OJP, OJCS et OJW.", stage: "CURRENT" },
    { title: "Porter le socle institutionnel", description: "Le portail publie la vision, la mission et la roadmap actuellement disponibles.", stage: "CURRENT" },
    { title: "Offrir une entrée publique", description: "OnJarama Web constitue l’adresse publique principale pour découvrir OnJarama.", stage: "CURRENT" },
  ],
  plannedCapabilities: [
    { title: "Pages publiques projets", description: "Les pages dédiées aux autres projets seront ouvertes progressivement après qualification.", stage: "PLANNED" },
    { title: "Contenus institutionnels dédiés", description: "Le portail pourra accueillir de nouvelles pages institutionnelles lorsqu’elles seront établies et approuvées.", stage: "PLANNED" },
  ],
  projectStatus: {
    label: "Portail public actif",
    stage: "CURRENT",
    detail: "La Home et la présente page pilote sont disponibles. Les autres pages projets restent en préparation.",
  },
  roadmap: [
    { label: "Socle actuel", description: "Maintenir un portail public stable et une présentation cohérente de l’écosystème.", stage: "CURRENT" },
    { label: "Prochaine étape", description: "Qualifier puis ouvrir progressivement les pages publiques des projets.", stage: "PLANNED" },
    { label: "Trajectoire", description: "Faire d’OJW un point d’entrée durable vers les composantes publiques d’OnJarama.", stage: "VISION" },
  ],
  ecosystemRole: {
    projects: [
      { shortName: "OJA", relation: "Projet éducatif présenté par le portail lorsqu’une information publique est qualifiée." },
      { shortName: "OJP", relation: "Projet de progression financière présenté par le portail lorsqu’une information publique est qualifiée." },
      { shortName: "OJCS", relation: "Projet de services connectés présenté par le portail lorsqu’une information publique est qualifiée." },
    ],
    foundation: {
      shortName: "OJF",
      relation: "OnJarama Foundation est le porteur institutionnel de l’écosystème, et non un projet frère équivalent.",
    },
  },
  primaryAction: { label: "Explorer l’écosystème", href: "/#ecosystem-projects" },
  secondaryAction: { label: "Voir la roadmap", href: "/#roadmap" },
};
