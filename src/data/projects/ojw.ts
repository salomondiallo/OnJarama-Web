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
    description: "Découvrez OnJarama Web, le portail qui organise la présence publique de l’écosystème sur onjarama.ca et relie ses projets, sa vision et son socle institutionnel.",
    canonicalUrl: "https://onjarama.ca/ojw",
  },
  mission: "Organiser la présence Web publique d’OnJarama et offrir un point d’entrée clair vers ses projets, sa trajectoire et son socle institutionnel.",
  summary: "onjarama.ca est la présence Web publique de l’écosystème. OJW organise ce portail : il permet de découvrir les composantes OnJarama, d’accéder à leurs pages publiques et de comprendre ce qui existe aujourd’hui sans confondre une page de présentation avec une application disponible.",
  audiences: [
    "Les personnes qui souhaitent comprendre l’écosystème OnJarama.",
    "Les visiteurs qui recherchent ses projets, sa vision ou sa trajectoire publique.",
  ],
  currentCapabilities: [
    { title: "Découvrir l’écosystème", description: "La Home présente les applications, le futur territoire Logiciels, le portail public OJW et le socle institutionnel OJF.", stage: "CURRENT" },
    { title: "Consulter les pages publiques", description: "Les pages OJA, OJP, OJCS et OJW sont accessibles pour comprendre le rôle et la trajectoire de chaque entité.", stage: "CURRENT" },
    { title: "Comprendre la direction commune", description: "Le portail publie la vision, la mission, la roadmap et l’introduction au rôle institutionnel d’OJF.", stage: "CURRENT" },
  ],
  plannedCapabilities: [
    { title: "Consolider les vitrines publiques", description: "Les pages existantes seront enrichies à mesure que leurs contenus, visuels et accès réels seront qualifiés.", stage: "PLANNED" },
    { title: "Approfondir les contenus institutionnels", description: "Le portail pourra accueillir des contenus institutionnels dédiés lorsqu’ils seront établis et approuvés.", stage: "PLANNED" },
  ],
  projectStatus: {
    label: "Portail public actif",
    stage: "CURRENT",
    detail: "La Home et les pages publiques OJA, OJP, OJCS et OJW sont accessibles. Cette disponibilité éditoriale ne signifie pas que les applications sont elles-mêmes disponibles comme produits.",
  },
  roadmap: [
    { label: "Ce qui existe aujourd’hui", description: "Un portail public stable, une Home institutionnelle et quatre pages publiques reliées.", stage: "CURRENT" },
    { label: "Ce que nous consolidons", description: "La clarté des parcours, la qualité des vitrines et la cohérence des contenus publics.", stage: "PLANNED" },
    { label: "Notre trajectoire", description: "Faire d’OJW un point d’entrée durable vers les composantes publiques et institutionnelles d’OnJarama.", stage: "VISION" },
  ],
  ecosystemRole: {
    projects: [
      { shortName: "OJA", relation: "Application éducative dont la page publique présente la mission, les publics et la trajectoire." },
      { shortName: "OJP", relation: "Application d’organisation financière personnelle dont la page publique expose le positionnement et les limites actuelles." },
      { shortName: "OJCS", relation: "Application de connexion et de services dont la page publique explique les axes, les publics et la progression." },
    ],
    foundation: {
      shortName: "OJF",
      relation: "OnJarama Foundation est le porteur institutionnel de l’écosystème, et non un projet frère équivalent.",
    },
  },
  primaryAction: { label: "Explorer l’écosystème", href: "/#ecosystem-projects" },
  secondaryAction: { label: "Voir la roadmap", href: "/#roadmap" },
};
