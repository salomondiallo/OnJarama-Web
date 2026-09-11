import type { Locale, LocaleConfiguration, TextDirection } from "./types";

export const PUBLIC_LANGUAGES = ["fr", "en", "es", "pt", "ar", "zh-CN"] as const satisfies readonly Locale[];

export const DEFAULT_LANGUAGE: Locale = "fr";
export const CANONICAL_CONTENT_LANGUAGE: Locale = "fr";
export const FALLBACK_LANGUAGE: Locale = "fr";
export const RTL_LANGUAGES = ["ar"] as const satisfies readonly Locale[];

export const LOCALE_REGISTRY = {
  fr: { code: "fr", name: "Français", dir: "ltr", availability: "CANONICAL", fallback: "fr" },
  en: { code: "en", name: "English", dir: "ltr", availability: "REGISTERED_NOT_AVAILABLE", fallback: "fr" },
  es: { code: "es", name: "Español", dir: "ltr", availability: "REGISTERED_NOT_AVAILABLE", fallback: "fr" },
  pt: { code: "pt", name: "Português", dir: "ltr", availability: "REGISTERED_NOT_AVAILABLE", fallback: "fr" },
  ar: { code: "ar", name: "العربية", dir: "rtl", availability: "REGISTERED_NOT_AVAILABLE", fallback: "fr" },
  "zh-CN": { code: "zh-CN", name: "简体中文", dir: "ltr", availability: "REGISTERED_NOT_AVAILABLE", fallback: "fr" },
} as const satisfies Readonly<Record<Locale, LocaleConfiguration>>;

export function isLocale(value: string): value is Locale {
  return (PUBLIC_LANGUAGES as readonly string[]).includes(value);
}

export function getLocaleConfiguration(locale: Locale): LocaleConfiguration {
  return LOCALE_REGISTRY[locale];
}

export function getTextDirection(locale: Locale): TextDirection {
  return LOCALE_REGISTRY[locale].dir;
}
