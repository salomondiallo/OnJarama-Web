import ojpEmblem from "../../assets/ecosystem/emblems/ojp-emblem-a2.png";
import type { PublicProjectEditorial } from "./types";

export const ojpProject = {
  id: "path",
  shortName: "OJP",
  name: "OnJarama Path",
  emblem: ojpEmblem,
  emblemAlt: "Emblème-graine turquoise, violet et vert du projet OnJarama Path",
  seo: {
    title: "OnJarama Path (OJP) — Projet d’organisation financière OnJarama",
    description: "Découvrez OnJarama Path, le projet OnJarama en développement conçu pour aider à mieux comprendre et organiser ses finances personnelles et progresser avec plus de clarté vers ses objectifs.",
    canonicalUrl: "https://onjarama.ca/ojp",
    ogTitle: "OnJarama Path (OJP) — Projet d’organisation financière OnJarama",
    ogDescription: "Découvrez la mission et la trajectoire d’OnJarama Path, projet OnJarama consacré à l’organisation financière personnelle et à la progression vers des objectifs définis.",
  },
  mission: "Comprendre ses finances, organiser ses priorités et avancer vers ses objectifs avec plus de clarté.",
  summary: "Informations dispersées, objectifs difficiles à relier au quotidien, suivi interrompu : OJP cherche à transformer cette complexité en un parcours personnel plus lisible et plus structuré.",
  audiences: [
    "Personnes et foyers",
    "Personnes ayant des objectifs financiers",
    "Personnes recherchant davantage de clarté",
  ],
  currentCapabilities: [
    { title: "Un modèle clarifié", description: "La mission, les publics et la méthode comprendre–organiser–progresser structurent désormais la conception d’OJP.", stage: "CURRENT" },
    { title: "Une architecture en travail", description: "La situation personnelle, les priorités, les objectifs et leur évolution sont organisés dans un cadre cohérent, encore en développement.", stage: "CURRENT" },
    { title: "Des principes responsables", description: "La confidentialité, le contrôle utilisateur et l’absence de promesse financière encadrent le projet avant toute ouverture produit.", stage: "CURRENT" },
  ],
  plannedCapabilities: [
    { title: "Lire sa situation", description: "Regrouper revenus, dépenses et repères simples pour rendre une situation personnelle plus compréhensible.", stage: "PLANNED" },
    { title: "Organiser ses priorités", description: "Structurer budget, projets, objectifs et organisation de l’épargne sans prescrire de décision financière.", stage: "PLANNED" },
    { title: "Suivre son évolution", description: "Préparer des visualisations, rappels et repères permettant d’observer une évolution sans garantir de résultat.", stage: "PLANNED" },
    { title: "Protéger et expliquer", description: "Qualifier le traitement des données et proposer des repères pédagogiques compréhensibles avant toute disponibilité publique.", stage: "PLANNED" },
  ],
  projectStatus: {
    label: "Projet en développement actif",
    stage: "CURRENT",
    detail: "Les capacités en construction seront présentées comme disponibles uniquement après qualification réelle.",
  },
  roadmap: [
    { label: "Cadre et principes", description: "Stabiliser le modèle, les publics et les garde-fous qui donnent sa direction à OJP.", stage: "CURRENT" },
    { label: "Parcours à qualifier", description: "Construire les expériences de compréhension, d’organisation et de suivi, puis les éprouver avant toute ouverture.", stage: "PLANNED" },
    { label: "Clarté durable", description: "Faire évoluer OJP vers un parcours personnel compréhensible, sans transformer cette vision en promesse de résultat.", stage: "VISION" },
  ],
  ecosystemRole: {
    projects: [
      { shortName: "OJW", relation: "OnJarama Web est le portail public qui présente OJP lorsque ses informations sont qualifiées." },
      { shortName: "OJA / OJCS", relation: "OJA et OJCS sont d’autres composantes de l’écosystème. Aucune intégration fonctionnelle ou aucun échange de données n’est affirmé." },
    ],
    foundation: { shortName: "OJF", relation: "OnJarama Foundation est le porteur institutionnel de l’écosystème." },
  },
  primaryAction: { label: "Découvrir l’écosystème", href: "/#ecosystem-projects" },
  secondaryAction: { label: "Voir la roadmap", href: "/#roadmap" },
  why: [
    { title: "Comprendre", description: "Rendre l’information financière personnelle plus lisible afin de mieux situer sa situation, ses priorités et les décisions qui l’influencent." },
    { title: "Organiser", description: "Structurer budget, projets et objectifs autour de repères compréhensibles, sans conseil financier personnalisé." },
    { title: "Progresser", description: "Construire un chemin réaliste entre une situation actuelle et des objectifs définis, sans promesse de résultat financier." },
  ],
  audienceDetails: [
    { title: "Personnes et foyers", description: "Pour mieux lire et structurer les réalités financières du quotidien." },
    { title: "Porteurs d’objectifs", description: "Pour relier des priorités personnelles à un parcours compréhensible." },
    { title: "Personnes en recherche de clarté", description: "Pour avancer sans exiger de connaissances financières avancées." },
  ],
  challenges: [
    "Voir sa situation sans multiplier les tableaux et informations isolées.",
    "Relier les décisions du quotidien à des objectifs personnels compréhensibles.",
    "Maintenir un suivi dans le temps sans pression ni promesse de performance.",
  ],
  vision: {
    title: "Un chemin plus clair pour avancer",
    statement: "La vision d’OJP est d’aider chacun à mieux comprendre où il se trouve, définir où il souhaite aller et construire progressivement un chemin réaliste entre les deux.",
    detail: "Faire de la gestion financière personnelle un parcours compréhensible plutôt qu’une suite de chiffres isolés.",
  },
  financialGuardrail: "OJP vise à fournir des outils d’organisation, de compréhension et d’éducation financière. Les informations présentées ne constituent pas un conseil financier, juridique, fiscal ou d’investissement personnalisé, et aucun résultat financier n’est garanti.",
  privacyPrinciple: "Les données financières personnelles devront être traitées avec un niveau élevé de confidentialité et de contrôle utilisateur avant toute fonctionnalité impliquant des données sensibles.",
} satisfies PublicProjectEditorial & {
  why: readonly { title: string; description: string }[];
  audienceDetails: readonly { title: string; description: string }[];
  challenges: readonly string[];
  vision: { title: string; statement: string; detail: string };
  financialGuardrail: string;
  privacyPrinciple: string;
};
