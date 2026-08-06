import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const app = read("src/App.tsx");
const section = read("src/sections/EcosystemSection.tsx");
const hero = read("src/sections/TreeHeroSection.tsx");
const cards = read("src/styles/cards.css");
const tree = read("src/styles/tree.css");

assert.ok(app.indexOf("<EcosystemSection />") > app.indexOf("<TreeHeroSection />"));
assert.ok(app.indexOf("<EcosystemSection />") < app.indexOf("<AboutSection />"));
assert.match(section, /PROJECT_ORDER = \["academy", "path", "ojcs-connect", "web"\]/);
assert.match(section, /data-project-count=\{projects\.length\}/);
assert.match(section, /Page en préparation/);
assert.match(section, /aria-disabled="true"/);
assert.match(section, /Emblème organique vert du projet OJA/);
assert.match(section, /Emblème-graine bleu et violet du projet OJP/);
assert.match(section, /Emblème communautaire orange du projet OJCS/);
assert.match(section, /Emblème-portail bleu du projet OJW/);
assert.match(hero, /href="#ecosystem-projects"/);
assert.doesNotMatch(hero, /InstitutionalProjectBand|Cinq projets, une vision commune|institutional-projects-title/);
assert.doesNotMatch(tree, /\.tree-hero__institutional|\.institutional-card|\.institutional-projects/);
assert.doesNotMatch(section, /foundation/);
assert.match(cards, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
assert.match(cards, /@media \(max-width: 980px\)/);
assert.match(cards, /@media \(max-width: 620px\)/);
assert.match(cards, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(cards, /\.ecosystem-card--ojp \.ecosystem-card__emblem \{ width: clamp\(124px, 12\.2vw, 166px\); \}/);
assert.match(cards, /\.ecosystem-card--ojcs \.ecosystem-card__emblem \{ width: clamp\(101px, 9\.9vw, 136px\); \}/);

for (const asset of ["oja", "ojp", "ojcs", "ojw"]) {
  const path = resolve(root, `src/assets/ecosystem/emblems/${asset}-emblem-a2.png`);
  assert.ok(existsSync(path), `${asset} emblem is missing`);
  assert.ok(statSync(path).size > 0, `${asset} emblem is empty`);
}

console.log("OJW-GFX-05-C: Direction C, four selected emblems, accessibility and responsive rules validated.");
