import { frenchGlobalMessages } from "./locales/fr/global";
import type { TranslationDictionary, TranslationKey, TranslationMessages } from "./types";

function resolvePath(messages: TranslationMessages<TranslationDictionary>, key: TranslationKey): string | undefined {
  const value = key.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[segment];
  }, messages);
  return typeof value === "string" ? value : undefined;
}

export function translate(
  messages: TranslationMessages<TranslationDictionary>,
  key: TranslationKey,
  warn = import.meta.env.DEV,
): string {
  const localized = resolvePath(messages, key);
  if (localized) return localized;
  const fallback = resolvePath(frenchGlobalMessages, key);
  if (warn) console.warn(`[i18n] Missing translation key "${key}"; using French fallback.`);
  return fallback ?? key;
}
