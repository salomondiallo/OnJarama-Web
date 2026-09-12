import type { TranslationDictionary } from "../../types";

export const englishGlobalMessages = {
  global: {
    nav: {
      primaryLabel: "OnJarama main navigation",
      skipToContent: "Skip to content",
      home: "OnJarama home",
      logoAlt: "Official OnJarama logo",
      sectionsLabel: "Portal sections",
      about: "Why OnJarama",
      ecosystem: "Ecosystem",
      vision: "Vision",
      mission: "Mission",
      roadmap: "Roadmap",
    },
    controls: {
      theme: {
        label: "Choose the lighting ambience",
        legend: "Lighting ambience",
        auto: "Auto",
        day: "Day",
        night: "Night",
        autoSolarDay: "Automatic solar mode, current ambience: day",
        autoSolarNight: "Automatic solar mode, current ambience: night",
        autoFallbackDay: "Automatic mode using the fallback schedule, current ambience: day",
        autoFallbackNight: "Automatic mode using the fallback schedule, current ambience: night",
        dayMode: "Day mode",
        nightMode: "Night mode",
      },
      localSky: {
        label: "Local sky",
        synced: "synchronized",
        unsynced: "not synchronized",
        heading: "Synchronize with my local sky",
        privacy: "Your approximate location is used only to position the Sun and Moon. It remains stored in this browser and is not sent anywhere.",
        status: {
          unsynced: "Auto mode is currently using the artistic schedule.",
          requesting: "Requesting location…",
          synced: "Auto mode is synchronized with your approximate local sky.",
          denied: "Location permission denied. Auto mode will continue using the artistic schedule.",
          error: "Location unavailable. Auto mode will continue using the artistic schedule.",
        },
        synchronize: "Allow location access",
        synchronizing: "Synchronizing…",
        clear: "Clear my location",
        close: "Close",
      },
    },
    footer: {
      motto: "Building the future together.",
      aboutLabel: "About OnJarama",
      missionLink: "Discover our mission",
      locations: "Guinea • Quebec • Canada",
    },
    projectContext: {
      label: "Public page context",
      ecosystem: "Ecosystem",
      backToEcosystem: "← Back to the ecosystem",
    },
    projectExplorer: {
      kicker: "Explore the ecosystem",
      title: "Continue exploring OnJarama",
      description: "Each link opens a public presentation page. The applications remain in development until their availability as products has been qualified.",
      applicationNature: "OnJarama application",
      portalNature: "OnJarama public web portal",
      currentProject: "Current project",
      discoverPortal: "Explore the portal",
      discover: "Explore",
    },
  },
  a11y: {
    menu: {
      open: "Open the navigation menu",
      close: "Close the navigation menu",
    },
  },
} as const satisfies TranslationDictionary;
