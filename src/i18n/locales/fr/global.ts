import type { TranslationDictionary } from "../../types";

export const frenchGlobalMessages = {
  global: {
    nav: {
      skipToContent: "Aller au contenu",
      home: "Accueil OnJarama",
      sectionsLabel: "Sections du portail",
      about: "Pourquoi",
      ecosystem: "Écosystème",
      vision: "Vision",
      mission: "Mission",
      roadmap: "Roadmap",
    },
    controls: {
      theme: {
        label: "Choisir l’ambiance lumineuse",
        auto: "Auto",
        day: "Jour",
        night: "Nuit",
      },
      localSky: "Ciel local",
    },
    footer: {
      motto: "Construisons ensemble l’avenir.",
      aboutLabel: "À propos d’OnJarama",
      missionLink: "Découvrir la mission",
      locations: "Guinée • Québec • Canada",
    },
  },
  a11y: {
    menu: {
      open: "Ouvrir le menu de navigation",
      close: "Fermer le menu de navigation",
    },
  },
} as const satisfies TranslationDictionary;
