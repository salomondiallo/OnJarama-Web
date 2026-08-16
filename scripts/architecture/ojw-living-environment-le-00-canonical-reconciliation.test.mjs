import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const canon = read("docs/OJW-LIVING-ENVIRONMENT-LE-00-CANONICAL-HERO.md");
const scene = read("src/components/TreeScene.tsx");
const styles = read("src/styles/tree.css");
const ecosystem = read("src/data/ecosystem.ts");
const packageJson = JSON.parse(read("package.json"));
const entities = ecosystem.slice(ecosystem.indexOf("export const ecosystemEntities"), ecosystem.indexOf("export const publicApplications"));

for (const invariant of [
  "HERO_BASELINE = CURRENT_CANONICAL_PANORAMA",
  "HERO_TREE = ABSENT",
  "TREE_FRUITS = ABSENT",
  "LEGACY_TREE_FRUIT_SYSTEM = DO_NOT_REACTIVATE",
  "SNOW_V1 = OFF",
  "NEXT_GATE = OJW-LIVING-ENVIRONMENT-LE-01",
]) assert.match(canon, new RegExp(invariant));

assert.match(scene, /data-gfx04-r2-treeless/);
assert.match(scene, /founder-canonical-day\.png/);
assert.match(scene, /founder-canonical-night-no-moon\.png/);
assert.match(styles, /\.tree-scene\[data-gfx03-scene\][\s\S]*?\.tree-fruit\{[\s\S]*?display:none/);
assert.match(canon, /ne pas réactiver `\.tree-fruit`/);
assert.doesNotMatch(
  canon,
  /HERO_TREE = PRESENT|TREE_FRUITS = PRESENT|LEGACY_TREE_FRUIT_SYSTEM = REACTIVATE/,
);

assert.equal((entities.match(/entityType: "APPLICATION"/g) ?? []).length, 3);
assert.equal((entities.match(/entityType: "WEB_PORTAL"/g) ?? []).length, 1);
assert.equal((entities.match(/entityType: "FOUNDATION"/g) ?? []).length, 1);
assert.equal((entities.match(/entityType: "SOFTWARE"/g) ?? []).length, 0);
assert.match(entities, /id: "foundation"[\s\S]*?entityType: "FOUNDATION"[\s\S]*?homeProductCard: false/);

assert.match(canon, /Priorité à CSS, SVG et DOM/);
assert.match(canon, /WebGL n’est pas justifié pour V1/);
assert.match(canon, /useDayNightMode` comme autorité Auto\/Jour\/Nuit/);
assert.match(canon, /dynamicSky\.ts` comme modèle du ciel/);
assert.match(canon, /prefers-reduced-motion: reduce/);
assert.equal(packageJson.scripts["test:ojw:living-environment-le-00"], "node scripts/architecture/ojw-living-environment-le-00-canonical-reconciliation.test.mjs");

console.log("OJW-LIVING-ENVIRONMENT-LE-00: canonical treeless Hero, taxonomy, technology and LE-01 entry conditions validated.");
