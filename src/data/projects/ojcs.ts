import ojcsEmblem from "../../assets/ecosystem/emblems/ojcs-emblem-a2.png";
import type { PublicProjectEditorial } from "./types";

export const ojcsProject = {
  id: "ojcs-connect",
  shortName: "OJCS",
  name: "OJCS Connect",
  emblem: ojcsEmblem,
  emblemAlt: "Emblème communautaire orange et corail du projet OJCS Connect",
  seo: {
    title: "OJCS Connect — Projet de connexion et de services OnJarama",
    description: "Découvrez OJCS Connect, le projet OnJarama en développement conçu d’abord pour la Guinée afin de mieux repérer services, ressources, opportunités et acteurs utiles.",
    canonicalUrl: "https://onjarama.ca/ojcs",
    ogTitle: "OJCS Connect — Projet de connexion et de services OnJarama",
    ogDescription: "Découvrez la mission et la trajectoire d’OJCS Connect, projet OnJarama conçu pour rapprocher progressivement services, ressources, acteurs et diaspora autour de parcours utiles.",
  },
  mission: "Voir ce qui existe, comprendre où le trouver et se connecter plus utilement lorsque les parcours sont qualifiés.",
  summary: "Les informations utiles sont souvent dispersées, difficiles à situer et inégales dans leur fiabilité. OJCS Connect organise un chemin plus lisible entre habitants, activités, diaspora et organisations, en partant des réalités de la Guinée.",
  audiences: ["Habitants et personnes en Guinée", "Professionnels et activités", "Diaspora liée à la Guinée", "Organisations et institutions"],
  currentCapabilities: [
    { title: "Une structure de base engagée", description: "Le socle et les premiers parcours sont suffisamment avancés pour guider la suite du projet.", stage: "CURRENT" },
    { title: "Des informations organisées", description: "Carte, répertoire et fiches sont pensés ensemble, sans constituer aujourd’hui un annuaire public actif.", stage: "CURRENT" },
    { title: "Le territoire pris en compte", description: "Navigation, adaptation aux écrans et organisation géographique font partie de la conception dès maintenant.", stage: "CURRENT" },
  ],
  plannedCapabilities: [
    { title: "Découverte et repérage", description: "Recherche, filtres et ressources devront aider à trouver plus simplement une information pertinente.", stage: "PLANNED" },
    { title: "Données et localisation", description: "Carte, répertoire et fiches devront s’appuyer progressivement sur des informations réelles et gouvernées.", stage: "PLANNED" },
    { title: "Confiance et qualification", description: "Signalement, modération, vérification et clarté des statuts seront qualifiés avant toute promesse publique.", stage: "PLANNED" },
    { title: "Mise en relation progressive", description: "Le contact, les parcours diaspora et de premiers services utiles ne seront ouverts qu’après qualification.", stage: "PLANNED" },
  ],
  projectStatus: { label: "Projet en développement actif", stage: "CURRENT", detail: "OnJarama Connect Services — les capacités présentées restent en développement et ne constituent pas un produit public disponible." },
  roadmap: [
    { label: "Fondations et premiers parcours", description: "Stabiliser le socle, l’organisation des informations et les usages essentiels.", stage: "CURRENT" },
    { label: "Informations et usages qualifiés", description: "Relier progressivement données, repérage et confiance à des règles claires.", stage: "PLANNED" },
    { label: "Connexions étendues avec maîtrise", description: "Élargir les parcours et territoires seulement après qualification du socle guinéen.", stage: "VISION" },
  ],
  ecosystemRole: {
    projects: [
      { shortName: "OJW", relation: "OnJarama Web est le portail public qui présente OJCS lorsque ses informations sont qualifiées." },
      { shortName: "OJA / OJP", relation: "OJA et OJP sont d’autres composantes OnJarama, sans compte commun, partage de données ou intégration runtime affirmés." },
    ],
    foundation: { shortName: "OJF", relation: "OnJarama Foundation est le porteur institutionnel de l’écosystème." },
  },
  primaryAction: { label: "Découvrir l’écosystème", href: "/#ecosystem-projects" },
  secondaryAction: { label: "Voir la roadmap", href: "/#roadmap" },
  connectAxes: [
    { title: "Explorer", description: "Découvrir des informations, ressources ou acteurs utiles." },
    { title: "Localiser", description: "Comprendre où se trouvent activités, services ou organisations." },
    { title: "Qualifier", description: "Améliorer progressivement la clarté et la fiabilité des informations, sans prétendre à une vérification actuelle." },
    { title: "Contacter", description: "Permettre une mise en relation seulement lorsque les règles et parcours nécessaires seront qualifiés." },
  ],
  audienceDetails: [
    { title: "Habitants", description: "Mieux repérer une information ou un acteur utile en Guinée." },
    { title: "Activités", description: "Devenir plus identifiables après qualification, sans profil public actif aujourd’hui." },
    { title: "Diaspora", description: "Rester reliée au terrain et à des ressources compréhensibles." },
    { title: "Organisations", description: "Participer lorsque usages et règles de publication seront suffisamment qualifiés." },
  ],
  geography: "OJCS se construit d’abord pour les réalités de la Guinée, avec un lien naturel vers sa diaspora et une ouverture progressive possible vers d’autres territoires.",
  trustPrinciple: "OJCS est conçu pour intégrer progressivement des mécanismes de vérification, de signalement, de modération et de clarté des statuts avant que des acteurs ou services puissent être présentés comme vérifiés ou qualifiés.",
  vision: "Faire d’OJCS Connect une infrastructure numérique utile pour la Guinée, capable de rendre les services et acteurs plus visibles, de rapprocher le terrain et la diaspora, et de transformer des recherches dispersées en parcours plus simples et plus compréhensibles.",
} satisfies PublicProjectEditorial & {
  connectAxes: readonly { title: string; description: string }[];
  audienceDetails: readonly { title: string; description: string }[];
  geography: string;
  trustPrinciple: string;
  vision: string;
};
