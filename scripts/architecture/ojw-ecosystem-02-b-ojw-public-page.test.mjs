import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const app = read("src/App.tsx");
const data = read("src/data/ecosystem.ts");
const section = read("src/sections/EcosystemSection.tsx");
const page = read("src/pages/OJWPage.tsx");
const hero = read("src/components/ProjectHero.tsx");
const editorial = read("src/data/projects/ojw.ts");
const layout = read("src/layouts/PublicProjectLayout.tsx");
const home = read("src/pages/HomePage.tsx");

const publicModel = data.slice(data.indexOf("export const publicProjects"), data.indexOf("/**\n * Compatibility projection"));
const projectBlock = (id) => {
  const start = publicModel.indexOf(`id: "${id}"`);
  const next = publicModel.indexOf("\n  {", start + 1);
  return publicModel.slice(start, next === -1 ? undefined : next);
};

assert.match(app, /path="\/ojw" element={<OJWPage/);
assert.match(projectBlock("web"), /publicPagePath:\s*"\/ojw"[\s\S]*publicPageAvailable:\s*true/);
assert.match(projectBlock("academy"), /publicPageAvailable:\s*true/);
for (const id of ["path", "ojcs-connect"]) assert.match(projectBlock(id), /publicPageAvailable:\s*false/);
assert.equal((publicModel.match(/publicPageAvailable:\s*true/g) ?? []).length, 2, "ACTIVE_PUBLIC_PROJECT_PAGE_COUNT must be 2");
assert.match(section, /href=\{item\.publicPagePath\}/);
assert.match(hero, /<h1/);
assert.equal((`${page}\n${hero}`.match(/<h1\b/g) ?? []).length, 1, "OJW_PAGE_SINGLE_H1 must pass");
assert.doesNotMatch(page, /TreeHeroSection|TreeScene|dynamicSky|founder-canonical|scene-day|scene-night/i);
assert.match(layout, /showAmbience=\{false\}/, "PROJECT_PAGE_AMBIENCE_SELECTOR must be HIDDEN");
assert.doesNotMatch(home, /showAmbience=\{false\}/, "HOME_AMBIENCE_SELECTOR must remain PRESERVED");
assert.match(editorial, /href:\s*"\/#ecosystem-projects"/);
assert.match(editorial, /href:\s*"\/#roadmap"/);
assert.match(editorial, /shortName:\s*"OJF"[\s\S]*porteur institutionnel/);
assert.doesNotMatch(editorial, /date de sortie|utilisateurs actifs|partenaire/i);
assert.match(editorial, /canonicalUrl:\s*"https:\/\/onjarama\.ca\/ojw"/);

console.log("OJW-ECOSYSTEM-02-B: OJW pilot remains active with honest editorial stages, metadata and project-page isolation validated.");
