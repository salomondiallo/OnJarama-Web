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
  mission: "Voir ce qui existe, trouver ce qui correspond à son besoin et se connecter plus simplement aux acteurs et services utiles.",
  summary: "OJCS Connect est un projet numérique conçu pour faciliter l’accès aux services, ressources, opportunités et acteurs utiles, en permettant progressivement de les découvrir, les localiser, mieux les comprendre et entrer en contact à travers des parcours simples, pensés d’abord pour les réalités de la Guinée.",
  audiences: ["Habitants et personnes en Guinée", "Professionnels et activités", "Diaspora liée à la Guinée", "Organisations et institutions"],
  currentCapabilities: [
    { title: "Fondation applicative", description: "Une fondation applicative réelle et une interface fonctionnelle ont été construites.", stage: "CURRENT" },
    { title: "Carte et Répertoire", description: "Une base de carte interactive et la structure du Répertoire OJCS existent en développement.", stage: "CURRENT" },
    { title: "Fiches structurées", description: "Des fiches d’activité et de professionnels sont structurées en base, sans répertoire public actif.", stage: "CURRENT" },
    { title: "Données de démonstration", description: "Des données de services et ressources de démonstration soutiennent le travail de conception.", stage: "CURRENT" },
    { title: "Navigation et responsive", description: "La navigation et l’adaptation responsive ont déjà été travaillées.", stage: "CURRENT" },
    { title: "Persistance future", description: "Les fondations vers des données persistantes ont commencé à être structurées.", stage: "CURRENT" },
  ],
  plannedCapabilities: [
    { title: "Données réelles et gouvernées", description: "Relier progressivement la Carte et le Répertoire à des données réelles et gouvernées.", stage: "PLANNED" },
    { title: "Recherche et filtres", description: "Préparer une recherche et des filtres utiles à des besoins compréhensibles.", stage: "PLANNED" },
    { title: "Fiches publiables", description: "Rendre des fiches publiables et recherchables après qualification.", stage: "PLANNED" },
    { title: "Découverte et contact", description: "Permettre progressivement la découverte et le contact avec des acteurs pertinents.", stage: "PLANNED" },
    { title: "Confiance progressive", description: "Construire vérification, signalement, modération et clarté des statuts.", stage: "PLANNED" },
    { title: "Ressources et diaspora", description: "Développer un centre de ressources et des parcours liés à la diaspora.", stage: "PLANNED" },
    { title: "Emploi et formation", description: "Consolider progressivement des domaines utiles comme l’emploi et la formation.", stage: "PLANNED" },
    { title: "Services métier", description: "Ouvrir de premiers services métier de manière contrôlée après qualification.", stage: "PLANNED" },
  ],
  projectStatus: { label: "Projet en développement actif", stage: "CURRENT", detail: "OnJarama Connect Services — les capacités présentées restent en développement et ne constituent pas un produit public disponible." },
  roadmap: [
    { label: "Fondations", description: "Stabiliser le socle applicatif, les parcours et les règles de présentation publique.", stage: "CURRENT" },
    { label: "Carte et Répertoire", description: "Relier carte et répertoire à des informations réelles et gouvernées.", stage: "PLANNED" },
    { label: "Données et parcours", description: "Préparer recherche, filtres, fiches, ressources et parcours utiles.", stage: "PLANNED" },
    { label: "Confiance et qualification", description: "Définir vérification, signalement, modération et statuts.", stage: "PLANNED" },
    { label: "Extension progressive", description: "Étendre les domaines et territoires après qualification du socle guinéen.", stage: "VISION" },
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
    { title: "Explorer", description: "Découvrir progressivement services, ressources, opportunités et acteurs utiles." },
    { title: "Localiser", description: "Situer ce qui existe lorsque les données seront réelles, gouvernées et qualifiées." },
    { title: "Qualifier", description: "Rendre informations et statuts plus clairs, sans prétendre à une vérification actuelle." },
    { title: "Contacter", description: "Entrer progressivement en contact après qualification des règles nécessaires." },
  ],
  audienceDetails: [
    { title: "Habitants et personnes en Guinée", description: "Pour rechercher un service, une ressource ou une opportunité en Guinée." },
    { title: "Professionnels et activités", description: "Pour rendre progressivement leur activité plus visible et identifiable, sans profil public actif aujourd’hui." },
    { title: "Diaspora liée à la Guinée", description: "Pour trouver des ressources et mieux préparer ou soutenir des actions sur le terrain." },
    { title: "Organisations et institutions", description: "Lorsque leurs usages et règles de publication seront suffisamment qualifiés." },
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
