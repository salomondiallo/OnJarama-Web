import type { TranslationDictionary } from "../../types";

export const englishHomeMessages = {
  home: {
    hero: {
      label: "OnJarama",
      title: "OnJarama",
    },
    ecosystem: {
      kicker: "The OnJarama ecosystem",
      title: "A shared vision, distinct paths to action.",
      description: "OnJarama connects applications, a family of business solutions, a public Web portal, and an institutional foundation in service of a shared human ambition.",
      mapLabel: "Structured overview of the ecosystem",
      map: {
        applications: "Applications",
        software: "Business solutions",
        softwareStatus: "A family taking shape",
        portal: "Public portal",
        foundation: "Institutional foundation",
      },
      applications: {
        kicker: "Digital products",
        title: "Our applications",
        description: "Public pathways designed around education, personal progress, and meaningful connections.",
        cardLinkLabel: "discover the public page",
        discoverProject: "Discover the project",
      },
      software: {
        kicker: "Business solutions",
        title: "Our software",
        description: "This family will bring together OnJarama business solutions dedicated to organization, operations, and coordination.",
        qualifiedNeed: "Each solution will be defined in response to a qualified need.",
        ratifiedIdentity: "Its identity will be established after qualification and ratification.",
        noneAnnounced: "No software has been publicly announced at this time.",
      },
      publicPresence: {
        kicker: "Portal & Foundation",
        title: "Our public presence",
        description: "The Web portal and institutional foundation make the OnJarama ecosystem accessible, clear, and coherent.",
        portalKicker: "Active public portal",
        portalTitle: "The public portal",
        discover: "Discover",
      },
    },
    about: {
      kicker: "Why OnJarama",
      title: "Making useful pathways more accessible and easier to understand.",
      purpose: "OnJarama exists to help people better understand the possibilities available to them, gain greater autonomy, and move forward in contexts where access, information, and coordination often remain fragmented.",
      technology: "Technology is a means: it should bring people, projects, and institutions closer together without replacing human responsibility.",
    },
  },
} as const satisfies Pick<TranslationDictionary, "home">;
