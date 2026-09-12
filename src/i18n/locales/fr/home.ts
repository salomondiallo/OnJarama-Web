import type { TranslationDictionary } from "../../types";

export const frenchHomeMessages = {
  home: {
    hero: {
      label: "OnJarama",
      title: "OnJarama",
    },
    ecosystem: {
      kicker: "L’écosystème OnJarama",
      title: "Une vision commune, des voies d’action distinctes.",
      description: "OnJarama relie des applications, une famille de solutions métier, un portail Web public et un socle institutionnel au service d’une même ambition humaine.",
      mapLabel: "Lecture structurée de l’écosystème",
      map: {
        applications: "Applications",
        software: "Solutions métier",
        softwareStatus: "Une famille en structuration",
        portal: "Portail public",
        foundation: "Socle institutionnel",
      },
      applications: {
        kicker: "Produits numériques",
        title: "Nos applications",
        description: "Des parcours publics conçus autour de l’éducation, de la progression personnelle et des connexions utiles.",
        cardLinkLabel: "découvrir la page publique",
        discoverProject: "Découvrir le projet",
      },
      software: {
        kicker: "Solutions métier",
        title: "Nos logiciels",
        description: "Cette famille accueillera les solutions métier OnJarama dédiées à l’organisation, aux opérations et à la coordination.",
        qualifiedNeed: "Chaque solution sera définie à partir d’un besoin qualifié.",
        ratifiedIdentity: "Son identité sera établie après qualification et ratification.",
        noneAnnounced: "Aucun logiciel n’est actuellement annoncé publiquement.",
      },
      publicPresence: {
        kicker: "Portail & Fondation",
        title: "Notre présence publique",
        description: "Le portail Web et le socle institutionnel rendent l’écosystème OnJarama accessible, lisible et cohérent.",
        portalKicker: "Portail public actif",
        portalTitle: "Le portail public",
        discover: "Découvrir",
      },
    },
    about: {
      kicker: "Pourquoi OnJarama",
      title: "Rendre les parcours utiles plus accessibles et plus lisibles.",
      purpose: "OnJarama existe pour aider chacun à mieux comprendre ses possibilités, gagner en autonomie et progresser dans des contextes où l’accès, l’information et la coordination restent souvent fragmentés.",
      technology: "La technologie est un moyen : elle doit rapprocher les personnes, les projets et les institutions sans remplacer la responsabilité humaine.",
    },
  },
} as const satisfies Pick<TranslationDictionary, "home">;
