import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const app = read("src/App.tsx");
const home = read("src/pages/HomePage.tsx");
const header = read("src/components/Header.tsx");
const headerStyles = read("src/styles/header.css");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const context = read("src/components/PublicProjectContext.tsx");
const ecosystem = read("src/data/ecosystem.ts");
const projectData = ["oja", "ojp", "ojcs", "ojw"].map((id) => read(`src/data/projects/${id}.ts`)).join("\n");
const canonicalEntities = ecosystem.slice(ecosystem.indexOf("export const ecosystemEntities"), ecosystem.indexOf("export const publicApplications"));

for (const route of ["oja", "ojp", "ojcs", "ojw"]) {
  assert.match(app, new RegExp(`path="/${route}"`));
  assert.match(projectData, new RegExp(`canonicalUrl: "https://onjarama\\.ca/${route}"`));
}
assert.match(home, /canonicalUrl: "https:\/\/onjarama\.ca\/"/);
assert.match(header, /aria-label=\{isMenuOpen \? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"\}/);
assert.match(headerStyles, /\.menu-toggle:focus-visible/);
assert.match(headerStyles, /\.menu-toggle\{width:44px;height:44px\}/);
assert.match(explorer, /to=\{project\.publicPagePath\}/);
assert.match(context, /href="\/#ecosystem-projects"/);
assert.equal((canonicalEntities.match(/publicPageAvailable: true/g) ?? []).length, 4);
assert.equal((canonicalEntities.match(/productAvailable: false/g) ?? []).length, 4);
assert.equal((canonicalEntities.match(/entityType: "APPLICATION"/g) ?? []).length, 3);
assert.equal((canonicalEntities.match(/entityType: "WEB_PORTAL"/g) ?? []).length, 1);
assert.equal((canonicalEntities.match(/entityType: "SOFTWARE"[,\n]/g) ?? []).length, 0);
assert.doesNotMatch(`${home}\n${explorer}\n${context}`, /TreeScene|dynamicSky|scene-day|scene-night/i);

console.log("OJW-PUBLIC-SURFACE-05-A6-A: canonical routes, metadata, taxonomy, navigation and mobile header contract validated.");
