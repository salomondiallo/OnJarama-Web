import type { Locale, LocaleConfiguration, TextDirection } from "./types";

export const REGISTERED_LOCALES = ["fr", "en", "es", "pt", "ar", "zh-CN"] as const satisfies readonly Locale[];
export const PUBLIC_LANGUAGES = REGISTERED_LOCALES;

export const DEFAULT_LANGUAGE: Locale = "fr";
export const CANONICAL_CONTENT_LANGUAGE: Locale = "fr";
export const FALLBACK_LANGUAGE: Locale = "fr";
export const RTL_LANGUAGES = ["ar"] as const satisfies readonly Locale[];

export const LOCALE_REGISTRY = {
  fr: { code: "fr", name: "Français", dir: "ltr", registered: true, translationStatus: "CANONICAL_APPROVED", editoriallyApproved: true, publiclyAvailable: true, routePrefix: "", fallback: "fr" },
  en: { code: "en", name: "English", dir: "ltr", registered: true, translationStatus: "REVIEWED", editoriallyApproved: false, publiclyAvailable: false, routePrefix: "en", fallback: "fr" },
  es: { code: "es", name: "Español", dir: "ltr", registered: true, translationStatus: "MISSING", editoriallyApproved: false, publiclyAvailable: false, routePrefix: "es", fallback: "fr" },
  pt: { code: "pt", name: "Português", dir: "ltr", registered: true, translationStatus: "MISSING", editoriallyApproved: false, publiclyAvailable: false, routePrefix: "pt", fallback: "fr" },
  ar: { code: "ar", name: "العربية", dir: "rtl", registered: true, translationStatus: "MISSING", editoriallyApproved: false, publiclyAvailable: false, routePrefix: "ar", fallback: "fr" },
  "zh-CN": { code: "zh-CN", name: "简体中文", dir: "ltr", registered: true, translationStatus: "MISSING", editoriallyApproved: false, publiclyAvailable: false, routePrefix: "zh-CN", fallback: "fr" },
} as const satisfies Readonly<Record<Locale, LocaleConfiguration>>;

export function isLocale(value: string): value is Locale {
  return (REGISTERED_LOCALES as readonly string[]).includes(value);
}

export const isRegisteredLocale = isLocale;

export function getPublicLocales(): Locale[] {
  return REGISTERED_LOCALES.filter((locale) => LOCALE_REGISTRY[locale].publiclyAvailable);
}

export const PUBLIC_LOCALES = getPublicLocales();
export const PUBLIC_LOCALE_COUNT = PUBLIC_LOCALES.length;

export function isPublicLocale(value: string): value is Locale {
  return isLocale(value) && LOCALE_REGISTRY[value].publiclyAvailable;
}

export function shouldRenderLanguageSwitcher(): boolean {
  return PUBLIC_LOCALE_COUNT >= 2;
}

export function getLocaleConfiguration(locale: Locale): LocaleConfiguration {
  return LOCALE_REGISTRY[locale];
}

export function getTextDirection(locale: Locale): TextDirection {
  return LOCALE_REGISTRY[locale].dir;
}
