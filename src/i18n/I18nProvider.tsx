import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { CANONICAL_CONTENT_LANGUAGE, DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, getTextDirection, isPublicLocale } from "./config";
import { I18nContext } from "./I18nContext";
import { frenchMessages } from "./locales/fr";
import { translate } from "./translate";
import type { Locale, TranslationDictionary, TranslationMessages } from "./types";

type LocaleBundle = {
  locale: Locale;
  messages: TranslationMessages<TranslationDictionary>;
};

type LocaleLoader = () => Promise<LocaleBundle>;

// Reviewed non-default locales will be registered here with dynamic imports.
// French stays synchronous so the canonical experience never flashes.
const localeLoaders: Partial<Record<Locale, LocaleLoader>> = {
  en: async () => ({
    locale: "en",
    messages: (await import("./locales/en/global")).englishGlobalMessages,
  }),
};

const frenchBundle: LocaleBundle = {
  locale: CANONICAL_CONTENT_LANGUAGE,
  messages: frenchMessages,
};

async function loadLocale(locale: Locale): Promise<LocaleBundle> {
  if (locale === FALLBACK_LANGUAGE) return frenchBundle;
  const loader = localeLoaders[locale];
  if (!loader) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Locale "${locale}" is not available; falling back to "${FALLBACK_LANGUAGE}".`);
    }
    return frenchBundle;
  }
  try {
    return await loader();
  } catch {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Locale "${locale}" could not be loaded; falling back to "${FALLBACK_LANGUAGE}".`);
    }
    return frenchBundle;
  }
}

type I18nProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export function I18nProvider({ children, initialLocale = DEFAULT_LANGUAGE }: I18nProviderProps) {
  const [requestedLocale, setRequestedLocale] = useState<Locale>(initialLocale);
  const [bundle, setBundle] = useState<LocaleBundle>(frenchBundle);

  useEffect(() => {
    let active = true;
    void loadLocale(requestedLocale).then((nextBundle) => {
      if (active) setBundle(nextBundle);
    });
    return () => {
      active = false;
    };
  }, [requestedLocale]);

  const direction = getTextDirection(bundle.locale);

  useEffect(() => {
    document.documentElement.lang = bundle.locale;
    document.documentElement.dir = direction;
  }, [bundle.locale, direction]);

  const t = useCallback(
    (key: Parameters<typeof translate>[1]) => translate(bundle.messages, key),
    [bundle.messages],
  );
  const setPublicLocale = useCallback((locale: Locale) => {
    if (!isPublicLocale(locale)) return false;
    setRequestedLocale(locale);
    return true;
  }, []);
  const value = useMemo(() => ({
    locale: bundle.locale,
    requestedLocale,
    direction,
    setLocale: setRequestedLocale,
    setPublicLocale,
    t,
  }), [bundle.locale, direction, requestedLocale, setPublicLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
