import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const globalMessages = read("src/i18n/locales/fr/global.ts");
const types = read("src/i18n/types.ts");
const config = read("src/i18n/config.ts");

const consumers = [
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/components/DayNightToggle.tsx",
  "src/components/LocalSkyControl.tsx",
  "src/components/PublicProjectContext.tsx",
  "src/components/PublicProjectExplorer.tsx",
  "src/layouts/PublicProjectLayout.tsx",
];

for (const path of consumers) {
  const source = read(path);
  assert.match(source, /useTranslation/, `${path} must consume the i18n authority`);
}

for (const domain of ["nav", "controls", "footer", "projectContext", "projectExplorer"]) {
  assert.match(globalMessages, new RegExp(`\\b${domain}:`), `French GLOBAL must define ${domain}`);
  assert.match(types, new RegExp(`\\b${domain}:`), `typed dictionary must define ${domain}`);
}

for (const copy of [
  "Aller au contenu",
  "Choisir l’ambiance lumineuse",
  "Synchroniser avec mon ciel local",
  "Construisons ensemble l’avenir.",
  "Contexte de la page publique",
  "Poursuivre la découverte d’OnJarama",
]) {
  assert.match(globalMessages, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}

assert.match(config, /PUBLIC_LOCALE_COUNT\s*=\s*PUBLIC_LOCALES\.length/);
assert.match(config, /return PUBLIC_LOCALE_COUNT >= 2/);
assert.match(config, /en:.*translationStatus: "MISSING".*publiclyAvailable: false/);
assert.equal(existsSync(join(root, "src/i18n/locales/en")), false, "no English locale files may exist");

const app = read("src/App.tsx");
assert.doesNotMatch(app, /path=["']\/(en|es|pt|ar|zh-CN)/);

const header = read("src/components/Header.tsx");
assert.match(header, /document\.removeEventListener\("keydown", handleKeyDown\)/);
assert.match(header, /document\.removeEventListener\("pointerdown", handlePointerDown\)/);
assert.doesNotMatch(header, /LanguageSwitcher/);

const hero = read("src/components/TreeScene.tsx");
assert.match(hero, /coastal/i, "the static coastal Hero authority must remain present");

console.log("OJW post-V1 French GLOBAL migration: typed authority, consumers, accessibility and frozen locale contracts validated.");
