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
        label: "Choose the lighting mode",
        legend: "Lighting mode",
        auto: "Auto",
        day: "Day",
        night: "Night",
        autoSolarDay: "Automatic mode based on the Sun; currently Day",
        autoSolarNight: "Automatic mode based on the Sun; currently Night",
        autoFallbackDay: "Automatic mode using fallback times; currently Day",
        autoFallbackNight: "Automatic mode using fallback times; currently Night",
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
          unsynced: "Auto mode is currently using the artistic day/night schedule.",
          requesting: "Requesting location…",
          synced: "Auto mode is synchronized with your local sky using your approximate location.",
          denied: "Location declined. Auto mode will keep using the artistic day/night schedule.",
          error: "Location unavailable. Auto mode will keep using the artistic day/night schedule.",
        },
        synchronize: "Allow location access",
        synchronizing: "Synchronizing…",
        clear: "Clear my location",
        close: "Close",
      },
    },
    footer: {
      motto: "Let’s build the future together.",
      aboutLabel: "About OnJarama",
      missionLink: "Discover our mission",
      locations: "Guinea • Quebec • Canada",
    },
    projectContext: {
      label: "Public project page navigation",
      ecosystem: "Ecosystem",
      backToEcosystem: "← Back to the ecosystem",
    },
    projectExplorer: {
      kicker: "Explore the ecosystem",
      title: "Continue exploring OnJarama",
      description: "Each link opens a public project overview page. The applications remain in development until their availability as products is formally confirmed.",
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
