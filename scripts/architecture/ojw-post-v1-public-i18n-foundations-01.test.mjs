import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");

const config = read("src/i18n/config.ts");
const types = read("src/i18n/types.ts");
const provider = read("src/i18n/I18nProvider.tsx");
const french = read("src/i18n/locales/fr/global.ts");
const translate = read("src/i18n/translate.ts");
const main = read("src/main.tsx");

assert.match(config, /\["fr", "en", "es", "pt", "ar", "zh-CN"\]/u, "All six founder-approved public locales must be registered.");
assert.match(config, /DEFAULT_LANGUAGE[^\n]+= "fr"/u, "French must remain the default locale.");
assert.match(config, /CANONICAL_CONTENT_LANGUAGE[^\n]+= "fr"/u, "French must remain canonical.");
assert.match(config, /FALLBACK_LANGUAGE[^\n]+= "fr"/u, "French must remain the fallback.");
assert.match(config, /ar:\s*\{[^}]*dir: "rtl"[^}]*fallback: "fr"/u, "Arabic must be RTL with French fallback.");
for (const locale of ["fr", "en", "es", "pt", "zh-CN"]) {
  assert.match(config, new RegExp(`code: "${locale}"[^}]*dir: "ltr"`, "u"), `${locale} must be LTR.`);
}

assert.match(types, /export type Locale =/u, "Locale must be an explicit type.");
assert.match(types, /export type LocaleConfiguration =/u, "Locale configuration must be typed.");
assert.match(types, /export type TranslationKey = NestedKey<TranslationDictionary>/u, "Translation keys must derive from the canonical dictionary.");
for (const key of ["global", "nav", "controls", "a11y"]) {
  assert.match(french, new RegExp(`\\b${key}: \\{`, "u"), `French dictionary must contain ${key} keys.`);
}

assert.match(provider, /Partial<Record<Locale, LocaleLoader>>/u, "Future locale modules must have a typed lazy-loader registry.");
assert.match(provider, /if \(!loader\)[\s\S]*return frenchBundle/u, "An unavailable locale must fall back to French.");
assert.match(translate, /const fallback = resolvePath\(frenchGlobalMessages, key\)/u, "A missing key must fall back to its French value.");
assert.match(translate, /if \(warn\) console\.warn/u, "Missing keys must warn in development.");
assert.match(provider, /document\.documentElement\.lang = bundle\.locale/u, "The provider must centrally prepare document lang.");
assert.match(provider, /document\.documentElement\.dir = direction/u, "The provider must centrally prepare document direction.");
assert.match(main, /<I18nProvider>[\s\S]*<App \/>[\s\S]*<\/I18nProvider>/u, "The provider must wrap the unchanged application tree.");

assert.ok(existsSync(new URL("../../src/i18n/locales/en/global.ts", import.meta.url)), "The reviewed English GLOBAL draft may exist while remaining non-public.");
for (const locale of ["es", "pt", "ar", "zh-CN"]) {
  assert.equal(existsSync(new URL(`../../src/i18n/locales/${locale}/global.ts`, import.meta.url)), false, `${locale} must not contain placeholder translations.`);
}

const protectedFiles = [
  "src/components/Header.tsx",
  "src/components/TreeScene.tsx",
  "src/sections/TreeHeroSection.tsx",
  "src/App.tsx",
  "index.html",
];
for (const path of protectedFiles) {
  assert.ok(existsSync(new URL(`../../${path}`, import.meta.url)), `${path} must remain present and outside the i18n foundation migration.`);
}

assert.doesNotMatch([config, types, provider, french, translate, main].join("\n"), /react-i18next|from "i18next"|navigator\.languages|localStorage/u, "Dependencies, detection and persistence remain outside this lot.");

console.log("OJW post-V1 public i18n foundations: typed French canon, locale registry, fallback, lazy readiness and RTL contracts validated.");
