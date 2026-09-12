import type { TranslationDictionary } from "../../types";

export const frenchGlobalMessages = {
  global: {
    nav: {
      primaryLabel: "Navigation principale OnJarama",
      skipToContent: "Aller au contenu",
      home: "Accueil OnJarama",
      logoAlt: "Logo officiel OnJarama",
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
        legend: "Ambiance lumineuse",
        auto: "Auto",
        day: "Jour",
        night: "Nuit",
        autoSolarDay: "Mode automatique solaire, ambiance actuelle : jour",
        autoSolarNight: "Mode automatique solaire, ambiance actuelle : nuit",
        autoFallbackDay: "Mode automatique avec horaires de secours, ambiance actuelle : jour",
        autoFallbackNight: "Mode automatique avec horaires de secours, ambiance actuelle : nuit",
        dayMode: "Mode jour",
        nightMode: "Mode nuit",
      },
      localSky: {
        label: "Ciel local",
        synced: "synchronisé",
        unsynced: "non synchronisé",
        heading: "Synchroniser avec mon ciel local",
        privacy: "Votre position approximative sert uniquement à placer le Soleil et la Lune. Elle reste enregistrée dans ce navigateur et n’est envoyée nulle part.",
        status: {
          unsynced: "Le mode Auto utilise actuellement les horaires artistiques.",
          requesting: "Demande de localisation en cours…",
          synced: "Le mode Auto est synchronisé avec votre ciel local approximatif.",
          denied: "Localisation refusée. Le mode Auto conserve les horaires artistiques.",
          error: "Localisation indisponible. Le mode Auto conserve les horaires artistiques.",
        },
        synchronize: "Autoriser la localisation",
        synchronizing: "Synchronisation…",
        clear: "Effacer ma localisation",
        close: "Fermer",
      },
    },
    footer: {
      motto: "Construisons ensemble l’avenir.",
      aboutLabel: "À propos d’OnJarama",
      missionLink: "Découvrir la mission",
      locations: "Guinée • Québec • Canada",
    },
    projectContext: {
      label: "Contexte de la page publique",
      ecosystem: "Écosystème",
      backToEcosystem: "← Retour à l’écosystème",
    },
    projectExplorer: {
      kicker: "Explorer l’écosystème",
      title: "Poursuivre la découverte d’OnJarama",
      description: "Chaque lien ouvre une page publique de présentation. Les applications restent en développement tant que leur disponibilité produit n’est pas qualifiée.",
      applicationNature: "Application OnJarama",
      portalNature: "Portail web OnJarama",
      currentProject: "Projet actuel",
      discoverPortal: "Découvrir le portail",
      discover: "Découvrir",
    },
  },
  a11y: {
    menu: {
      open: "Ouvrir le menu de navigation",
      close: "Fermer le menu de navigation",
    },
  },
} as const satisfies Pick<TranslationDictionary, "global" | "a11y">;
