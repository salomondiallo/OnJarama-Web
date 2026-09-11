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
      skipToContent: string;
      home: string;
      sectionsLabel: string;
      about: string;
      ecosystem: string;
      vision: string;
      mission: string;
      roadmap: string;
    };
    controls: {
      theme: { label: string; auto: string; day: string; night: string };
      localSky: string;
    };
    footer: { motto: string; aboutLabel: string; missionLink: string; locations: string };
  };
  a11y: {
    menu: { open: string; close: string };
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
