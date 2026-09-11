import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
const config = read("src/i18n/config.ts");
const types = read("src/i18n/types.ts");
const provider = read("src/i18n/I18nProvider.tsx");
const header = read("src/components/Header.tsx");
const app = read("src/App.tsx");

assert.match(config, /REGISTERED_LOCALES = \["fr", "en", "es", "pt", "ar", "zh-CN"\]/u, "All six locales must remain registered.");
for (const field of ["registered", "translationStatus", "editoriallyApproved", "publiclyAvailable", "routePrefix"]) {
  assert.match(types, new RegExp(`\\b${field}:`, "u"), `LocaleConfiguration must expose ${field}.`);
}
assert.match(config, /fr: \{[^\n]*translationStatus: "CANONICAL_APPROVED"[^\n]*editoriallyApproved: true[^\n]*publiclyAvailable: true[^\n]*routePrefix: ""/u, "French must remain canonical, approved and public without a prefix.");
for (const locale of ["en", "es", "pt", "ar", "zh-CN"]) {
  assert.match(config, new RegExp(`"?${locale}"?: \\{[^\\n]*translationStatus: "MISSING"[^\\n]*editoriallyApproved: false[^\\n]*publiclyAvailable: false[^\\n]*routePrefix: "${locale}"`, "u"), `${locale} must remain missing, unapproved and non-public.`);
  assert.equal(existsSync(new URL(`../../src/i18n/locales/${locale}/global.ts`, import.meta.url)), false, `${locale} must not contain a translation module.`);
}
assert.match(config, /PUBLIC_LOCALE_COUNT = PUBLIC_LOCALES\.length/u, "The public locale count must derive from filtered registry data.");
assert.match(config, /return PUBLIC_LOCALE_COUNT >= 2/u, "The language switcher must require at least two public locales.");
assert.match(config, /isPublicLocale[\s\S]*publiclyAvailable/u, "Public selection must use an explicit availability guard.");
assert.match(provider, /if \(!isPublicLocale\(locale\)\) return false/u, "The future public API must reject non-public locales.");
assert.match(provider, /setLocale: setRequestedLocale,[\s\S]*setPublicLocale/u, "Internal locale qualification and public selection must remain distinct.");
assert.doesNotMatch(header, /LanguageSwitcher|language-switcher/u, "No language switcher may be rendered while French is the sole public locale.");
assert.doesNotMatch(app, /path="\/(en|es|pt|ar|zh-CN)/u, "No foreign public route may be created.");
assert.match(header, /event\.key === "Escape"/u, "Escape dismissal must remain intact.");
assert.match(header, /handlePointerDown/u, "Outside-pointer dismissal must remain intact.");
assert.match(header, /menuToggleRef\.current\?\.focus/u, "Dismissal focus return must remain intact.");
assert.match(config, /ar: \{[^\n]*dir: "rtl"[^\n]*publiclyAvailable: false/u, "Arabic stays registered as RTL but must remain non-public.");

console.log("OJW post-V1 locale availability: six registered locales, French-only public access and dormant switcher contract validated.");
