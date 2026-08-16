import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const app = read("src/App.tsx");
const model = read("src/data/ecosystem.ts");
const editorial = read("src/data/projects/ojw.ts");
const page = read("src/pages/OJWPage.tsx");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const styles = read("src/styles/project-pages.css");

const canonical = model.slice(model.indexOf("export const ecosystemEntities"), model.indexOf("export const publicApplications"));
const entityBlock = (id) => {
  const start = canonical.indexOf(`id: "${id}"`);
  const next = canonical.indexOf("\n  {", start + 1);
  return canonical.slice(start, next === -1 ? undefined : next);
};

assert.match(app, /path="\/ojw" element={<OJWPage/);
assert.match(entityBlock("web"), /entityType:\s*"WEB_PORTAL"[\s\S]*publicPageAvailable:\s*true/);
assert.doesNotMatch(entityBlock("web"), /entityType:\s*"APPLICATION"|homeProductCard:\s*true/);
for (const id of ["academy", "path", "ojcs-connect"]) {
  assert.match(entityBlock(id), /entityType:\s*"APPLICATION"[\s\S]*publicPageAvailable:\s*true[\s\S]*productAvailable:\s*false/);
}
assert.equal((canonical.match(/entityType:\s*"SOFTWARE"/g) ?? []).length, 0);
assert.match(entityBlock("foundation"), /entityType:\s*"FOUNDATION"[\s\S]*homeProductCard:\s*false/);

for (const obsolete of [
  "Les autres pages projets restent en préparation",
  "Les pages dédiées aux autres projets seront ouvertes progressivement",
  "Qualifier puis ouvrir progressivement les pages publiques des projets",
]) assert.doesNotMatch(editorial, new RegExp(obsolete));

assert.match(editorial, /onjarama\.ca est la présence Web publique/);
assert.match(editorial, /pages publiques OJA, OJP, OJCS et OJW sont accessibles/);
assert.match(editorial, /ne signifie pas que les applications sont elles-mêmes disponibles comme produits/);
assert.match(page, /kicker="Portail public OnJarama"/);
assert.match(page, /<PublicProjectExplorer currentProject="OJW" \/>/);
assert.match(explorer, /publicPageEntities\.filter/);
assert.match(explorer, /to=\{project\.publicPagePath\}/);
for (const [id, route] of [["academy", "/oja"], ["path", "/ojp"], ["ojcs-connect", "/ojcs"]]) {
  assert.match(entityBlock(id), new RegExp(`publicPagePath: "${route}"[\\s\\S]*publicPageAvailable: true[\\s\\S]*productAvailable: false`));
}
assert.match(page, /Une famille en structuration/);
assert.doesNotMatch(`${page}\n${editorial}`, /Télécharger|Ouvrir l’application|Essayer l’application|Créer un compte|S’inscrire/i);
assert.doesNotMatch(page, /label=\{item\.stage\}/);
assert.doesNotMatch(page, /TreeHeroSection|TreeScene|dynamicSky|scene-day|scene-night/i);
assert.match(editorial, /canonicalUrl:\s*"https:\/\/onjarama\.ca\/ojw"/);
assert.match(styles, /\.ojw-page/);
assert.match(styles, /\.ojw-page \.project-status \.sr-only \{ display:none; \}/);
assert.match(styles, /\.ojw-destinations__grid a:hover,\.ojw-destinations__grid a:focus-visible/);

console.log("OJW-PUBLIC-PAGES-05-A1: canonical Web portal reconciliation, honest availability and public navigation validated.");
