export type Locale = "fr" | "en" | "es" | "pt" | "ar" | "zh-CN";

export type TextDirection = "ltr" | "rtl";
export type TranslationStatus = "MISSING" | "DRAFT" | "REVIEWED" | "APPROVED" | "CANONICAL_APPROVED";
export type LocaleRoutePrefix = "" | Exclude<Locale, "fr">;

export type LocaleConfiguration = {
  code: Locale;
  name: string;
  dir: TextDirection;
  registered: true;
  translationStatus: TranslationStatus;
  editoriallyApproved: boolean;
  publiclyAvailable: boolean;
  routePrefix: LocaleRoutePrefix;
  fallback: Locale;
};

export type TranslationDictionary = {
  global: {
    nav: {
      primaryLabel: string;
      skipToContent: string;
      home: string;
      logoAlt: string;
      sectionsLabel: string;
      about: string;
      ecosystem: string;
      vision: string;
      mission: string;
      roadmap: string;
    };
    controls: {
      theme: {
        label: string;
        legend: string;
        auto: string;
        day: string;
        night: string;
        autoSolarDay: string;
        autoSolarNight: string;
        autoFallbackDay: string;
        autoFallbackNight: string;
        dayMode: string;
        nightMode: string;
      };
      localSky: {
        label: string;
        synced: string;
        unsynced: string;
        heading: string;
        privacy: string;
        status: {
          unsynced: string;
          requesting: string;
          synced: string;
          denied: string;
          error: string;
        };
        synchronize: string;
        synchronizing: string;
        clear: string;
        close: string;
      };
    };
    footer: { motto: string; aboutLabel: string; missionLink: string; locations: string };
    projectContext: {
      label: string;
      ecosystem: string;
      backToEcosystem: string;
    };
    projectExplorer: {
      kicker: string;
      title: string;
      description: string;
      applicationNature: string;
      portalNature: string;
      currentProject: string;
      discoverPortal: string;
      discover: string;
    };
  };
  a11y: {
    menu: { open: string; close: string };
  };
  home: {
    hero: {
      label: string;
      title: string;
    };
    ecosystem: {
      kicker: string;
      title: string;
      description: string;
      mapLabel: string;
      map: {
        applications: string;
        software: string;
        softwareStatus: string;
        portal: string;
        foundation: string;
      };
      applications: {
        kicker: string;
        title: string;
        description: string;
        cardLinkLabel: string;
        discoverProject: string;
      };
      software: {
        kicker: string;
        title: string;
        description: string;
        qualifiedNeed: string;
        ratifiedIdentity: string;
        noneAnnounced: string;
      };
      publicPresence: {
        kicker: string;
        title: string;
        description: string;
        portalKicker: string;
        portalTitle: string;
        discover: string;
      };
    };
    about: {
      kicker: string;
      title: string;
      purpose: string;
      technology: string;
    };
  };
};

export type TranslationMessages<T> = {
  [Key in keyof T]?: T[Key] extends string ? string : TranslationMessages<T[Key]>;
};

type StringKeyOf<T> = Extract<keyof T, string>;
export type NestedKey<T> = {
  [Key in StringKeyOf<T>]: T[Key] extends string
    ? Key
    : T[Key] extends Record<string, unknown>
      ? `${Key}.${NestedKey<T[Key]>}`
      : never;
}[StringKeyOf<T>];

export type TranslationKey = NestedKey<TranslationDictionary>;
export type TranslationFunction = (key: TranslationKey) => string;

export type I18nContextValue = {
  locale: Locale;
  requestedLocale: Locale;
  direction: TextDirection;
  setLocale: (locale: Locale) => void;
  setPublicLocale: (locale: Locale) => boolean;
  t: TranslationFunction;
};
