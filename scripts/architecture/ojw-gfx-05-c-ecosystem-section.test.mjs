import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const app = read("src/pages/HomePage.tsx");
const section = read("src/sections/EcosystemSection.tsx");
const ecosystem = read("src/data/ecosystem.ts");
const hero = read("src/sections/TreeHeroSection.tsx");
const cards = read("src/styles/cards.css");
const tree = read("src/styles/tree.css");

assert.ok(app.indexOf("<EcosystemSection />") > app.indexOf("<TreeHeroSection />"));
assert.ok(app.indexOf("<EcosystemSection />") < app.indexOf("<AboutSection />"));
assert.match(section, /publicApplications\.map/);
assert.match(section, /data-application-count=\{publicApplications\.length\}/);
assert.match(section, /data-software-count=\{publicSoftware\.length\}/);
assert.match(ecosystem, /emblemAlt: "[^"]*OJA/);
assert.match(ecosystem, /emblemAlt: "[^"]*OJP/);
assert.match(ecosystem, /emblemAlt: "[^"]*OJCS/);
assert.match(ecosystem, /emblemAlt: "[^"]*OJW/);
assert.match(hero, /href="#ecosystem-projects"/);
assert.doesNotMatch(hero, /InstitutionalProjectBand|Cinq projets, une vision commune|institutional-projects-title/);
assert.doesNotMatch(tree, /\.tree-hero__institutional|\.institutional-card|\.institutional-projects/);
assert.match(section, /ecosystem-role--foundation/);
assert.match(section, /ecosystem-role--portal/);
assert.match(cards, /grid-template-columns: minmax\(0, 1\.65fr\) minmax\(280px, \.85fr\)/);
assert.match(cards, /@media \(max-width: 820px\)/);
assert.match(cards, /@media \(max-width: 620px\)/);
assert.match(cards, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(cards, /\.ecosystem-card--ojp \.ecosystem-card__emblem \{ width: clamp\(122px, 10vw, 154px\); \}/);
assert.match(cards, /\.ecosystem-card--ojcs \.ecosystem-card__emblem \{ width: clamp\(100px, 8\.5vw, 128px\); \}/);

for (const asset of ["oja", "ojp", "ojcs", "ojw"]) {
  const path = resolve(root, `src/assets/ecosystem/emblems/${asset}-emblem-a2.png`);
  assert.ok(existsSync(path), `${asset} emblem is missing`);
  assert.ok(statSync(path).size > 0, `${asset} emblem is empty`);
}

console.log("OJW-GFX-05-C: selected emblems, accessibility and responsive ecosystem rules validated.");
