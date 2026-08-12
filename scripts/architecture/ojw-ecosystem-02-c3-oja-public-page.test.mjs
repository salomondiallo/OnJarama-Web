import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const app = read("src/App.tsx");
const data = read("src/data/ecosystem.ts");
const section = read("src/sections/EcosystemSection.tsx");
const page = read("src/pages/OJAPage.tsx");
const editorial = read("src/data/projects/oja.ts");
const hero = read("src/components/ProjectHero.tsx");
const layout = read("src/layouts/PublicProjectLayout.tsx");
const home = read("src/pages/HomePage.tsx");
const styles = read("src/styles/project-pages.css");

const publicModel = data.slice(data.indexOf("export const publicProjects"), data.indexOf("/**\n * Compatibility projection"));
const projectBlock = (id) => {
  const start = publicModel.indexOf(`id: "${id}"`);
  const next = publicModel.indexOf("\n  {", start + 1);
  return publicModel.slice(start, next === -1 ? undefined : next);
};

assert.match(app, /path="\/oja" element={<OJAPage/);
assert.match(app, /path="\/OJA" element={<Navigate to="\/oja" replace/);
assert.match(projectBlock("academy"), /publicPagePath:\s*"\/oja"[\s\S]*publicPageAvailable:\s*true[\s\S]*productAvailable:\s*false/);
assert.match(projectBlock("web"), /publicPageAvailable:\s*true/);
assert.match(projectBlock("path"), /publicPageAvailable:\s*true/);
assert.match(projectBlock("ojcs-connect"), /publicPageAvailable:\s*false/);
assert.equal((publicModel.match(/publicPageAvailable:\s*true/g) ?? []).length, 3, "ACTIVE_PUBLIC_PROJECT_PAGE_COUNT must be 3 locally");
assert.match(section, /href=\{item\.publicPagePath\}/, "HOME cards must use canonical project paths");
assert.match(page, /<ProjectHero project=\{ojaProject\}/);
assert.equal((`${page}\n${hero}`.match(/<h1\b/g) ?? []).length, 1, "OJA_PAGE_SINGLE_H1 must pass");
assert.doesNotMatch(page, /TreeHeroSection|TreeScene|dynamicSky|founder-canonical|scene-day|scene-night/i);
assert.match(layout, /showAmbience=\{false\}/, "OJA_PAGE_AMBIENCE_SELECTOR must be 0");
assert.doesNotMatch(home, /showAmbience=\{false\}/, "HOME ambience selector must remain present");
assert.match(editorial, /canonicalUrl:\s*"https:\/\/onjarama\.ca\/oja"/);
assert.match(editorial, /label:\s*"Découvrir l’écosystème",\s*href:\s*"\/#ecosystem-projects"/);
assert.match(editorial, /label:\s*"Voir la roadmap",\s*href:\s*"\/#roadmap"/);
assert.match(editorial, /Projet en développement actif/);
assert.match(`${page}\n${editorial}`, /Toutes les fonctionnalités ne sont pas encore disponibles hors connexion/);
assert.doesNotMatch(editorial, /Ouvrir OJA|Tester OJA|Accéder à l’application|entièrement hors ligne/i);
assert.doesNotMatch(editorial, /date de sortie|utilisateurs actifs|partenaire/i);
assert.match(page, /Ce qui est déjà engagé/);
assert.match(page, /Ce que nous construisons/);
assert.match(page, /De la Guinée vers le monde/i);
assert.match(page, /OJF — Fondation/);
assert.doesNotMatch(page, /OJF[\s\S]*publicPagePath|OJF[\s\S]*Découvrir le projet/);
assert.match(styles, /\.oja-page/);
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

console.log("OJW-ECOSYSTEM-02-C3: OJA public page, canonical content, honest availability and project isolation validated.");
