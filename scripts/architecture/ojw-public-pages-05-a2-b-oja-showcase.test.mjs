import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const model = read("src/data/ecosystem.ts");
const editorial = read("src/data/projects/oja.ts");
const page = read("src/pages/OJAPage.tsx");
const status = read("src/components/ProjectStatus.tsx");
const styles = read("src/styles/project-pages.css");
const canonical = model.slice(model.indexOf("export const ecosystemEntities"), model.indexOf("export const publicApplications"));
const start = canonical.indexOf('id: "academy"');
const end = canonical.indexOf("\n  {", start + 1);
const oja = canonical.slice(start, end);

assert.match(oja, /entityType:\s*"APPLICATION"[\s\S]*publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*false[\s\S]*productAvailable:\s*false/);
assert.match(page, /kicker="Application éducative OnJarama"/);
assert.equal((page.match(/<section\b/g) ?? []).length, 7, "OJA showcase must use seven content sections after its shared Hero");
for (const marker of [
  "Pourquoi OJA",
  "Pour qui",
  "Ce qui est déjà engagé",
  "Apprendre dans les réalités du terrain",
  "Ce que nous construisons",
  "Trajectoire OJA",
  "Dans OnJarama",
]) assert.match(page, new RegExp(marker));

assert.equal((editorial.match(/stage:\s*"CURRENT"/g) ?? []).length > 0, true);
assert.equal((editorial.match(/stage:\s*"PLANNED"/g) ?? []).length > 0, true);
assert.equal((editorial.match(/stage:\s*"VISION"/g) ?? []).length > 0, true);
assert.doesNotMatch(`${page}\n${editorial}`, /projet logiciel éducatif/i);
assert.doesNotMatch(`${page}\n${editorial}`, /Essayer|Télécharger|Installer|Ouvrir l’application|Se connecter|S’inscrire|Créer un compte|Commencer gratuitement|Participer aux tests|Contribuer/i);
assert.match(editorial, /label:\s*"Découvrir l’écosystème",\s*href:\s*"\/#ecosystem-projects"/);
assert.match(editorial, /label:\s*"Voir la roadmap",\s*href:\s*"\/#roadmap"/);
assert.match(editorial, /canonicalUrl:\s*"https:\/\/onjarama\.ca\/oja"/);
assert.doesNotMatch(status, /état \{stage\.toLowerCase\(\)\}|état current|état planned|état vision/i);
assert.doesNotMatch(page, /TreeHeroSection|TreeScene|dynamicSky|scene-day|scene-night|Explorer les autres applications/i);
assert.doesNotMatch(page, /ojpProject|ojcsProject|ojwProject|OJPPage|OJCSPage|OJWPage/);
for (const selector of [".oja-story__layout", ".oja-audience-strip", ".oja-current__layout", ".oja-building__domains"]) {
  assert.match(styles, new RegExp(selector.replace(".", "\\.")));
}
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

console.log("OJW-PUBLIC-PAGES-05-A2-B: concise OJA showcase, honest availability, grounded identity and project isolation validated.");
