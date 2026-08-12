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
  summary: "OnJarama Path est un projet numérique conçu pour aider chacun à mieux comprendre et organiser sa situation financière personnelle, puis à progresser avec plus de clarté vers ses propres objectifs, en transformant budget, priorités et décisions du quotidien en un parcours plus structuré.",
  audiences: [
    "Personnes et foyers",
    "Personnes ayant des objectifs financiers",
    "Personnes recherchant davantage de clarté",
  ],
  currentCapabilities: [
    { title: "Un projet réellement en développement", description: "OJP structure son identité, sa mission et son positionnement sans présenter un produit complet comme déjà disponible.", stage: "CURRENT" },
    { title: "Un modèle de progression financière", description: "Le modèle du projet se construit autour des finances personnelles, des objectifs, du budget et d’une progression guidée.", stage: "CURRENT" },
    { title: "Organisation et compréhension", description: "Le travail engagé porte sur l’organisation et la compréhension de l’information financière personnelle.", stage: "CURRENT" },
    { title: "Situation, objectifs et progression", description: "L’architecture recherchée distingue la situation actuelle, les objectifs et la progression dans le temps, sans annoncer cette capacité comme déjà livrée.", stage: "CURRENT" },
  ],
  plannedCapabilities: [
    { title: "Revenus et dépenses", description: "Organisation des revenus et des dépenses.", stage: "PLANNED" },
    { title: "Budget personnel", description: "Construction et suivi d’un budget personnel.", stage: "PLANNED" },
    { title: "Objectifs financiers", description: "Définition d’objectifs financiers et de priorités personnelles.", stage: "PLANNED" },
    { title: "Suivi de progression", description: "Repères permettant de suivre une progression dans le temps.", stage: "PLANNED" },
    { title: "Projets et priorités", description: "Préparation de projets et de priorités financières.", stage: "PLANNED" },
    { title: "Organisation de l’épargne", description: "Organisation progressive de l’épargne autour d’objectifs définis.", stage: "PLANNED" },
    { title: "Visualisations simples", description: "Visualisations simples destinées à rendre une situation plus compréhensible.", stage: "PLANNED" },
    { title: "Repères pédagogiques", description: "Repères pédagogiques pour mieux comprendre les choix financiers et leurs implications.", stage: "PLANNED" },
    { title: "Rappels et repères", description: "Rappels et repères de progression après qualification.", stage: "PLANNED" },
  ],
  projectStatus: {
    label: "Projet en développement actif",
    stage: "CURRENT",
    detail: "Les capacités en construction seront présentées comme disponibles uniquement après qualification réelle.",
  },
  roadmap: [
    { label: "Fondations", description: "Stabiliser la mission, le positionnement, les publics et l’architecture du projet.", stage: "CURRENT" },
    { label: "Organisation", description: "Structurer les modèles de revenus, dépenses, budget, objectifs et priorités.", stage: "PLANNED" },
    { label: "Compréhension", description: "Préparer des visualisations et repères pédagogiques simples.", stage: "PLANNED" },
    { label: "Qualification", description: "Qualifier chaque capacité et ses garde-fous avant toute disponibilité publique.", stage: "PLANNED" },
    { label: "Progression", description: "Construire un chemin clair entre situation actuelle, objectifs et décisions du quotidien.", stage: "VISION" },
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
    { title: "Personnes et foyers", description: "Celles et ceux qui souhaitent mieux comprendre et structurer leurs finances quotidiennes." },
    { title: "Personnes ayant des objectifs financiers", description: "Épargne, achat, projet, réduction de dette ou constitution d’une réserve financière." },
    { title: "Personnes recherchant davantage de clarté", description: "Celles et ceux qui veulent reprendre le contrôle de leur organisation sans exiger de connaissances avancées en finance." },
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
  vision: { title: string; statement: string; detail: string };
  financialGuardrail: string;
  privacyPrinciple: string;
};
