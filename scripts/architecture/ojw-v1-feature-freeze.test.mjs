import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");
const freezePath = "docs/OJW-V1-FEATURE-FREEZE.md";

assert.ok(existsSync(new URL(freezePath, root)));

const freeze = read(freezePath);
const data = read("src/data/ecosystem.ts");
const app = read("src/App.tsx");
const hero = read("src/sections/TreeHeroSection.tsx");
const scene = read("src/components/TreeScene.tsx");
const le00 = read("docs/OJW-LIVING-ENVIRONMENT-LE-00-CANONICAL-HERO.md");
const location = read("src/hooks/useLocalCelestialLocation.ts");
const packageJson = JSON.parse(read("package.json"));
const canonical = data.slice(data.indexOf("export const ecosystemEntities"), data.indexOf("export const publicApplications"));

assert.match(freeze, /V1_FUNCTIONAL_BASELINE = d7734a931ef4281442b1bf3a3cb5af3c9b61a91f/);
assert.match(freeze, /V1_FREEZE_BASELINE = d7734a931ef4281442b1bf3a3cb5af3c9b61a91f/);
assert.match(freeze, /V1_FREEZE_RECORD_COMMIT = 5e31ab804a0bca811b8605c2a79008388d2e4595/);
assert.match(freeze, /FEATURE_FREEZE_V1 = ACTIVE/);

assert.equal((canonical.match(/entityType: "APPLICATION"/g) ?? []).length, 3);
assert.deepEqual([...canonical.matchAll(/shortName: "(OJA|OJP|OJCS)"/g)].map((match) => match[1]), ["OJA", "OJP", "OJCS"]);
assert.equal((canonical.match(/entityType: "SOFTWARE"/g) ?? []).length, 0);
assert.match(canonical, /entityType: "WEB_PORTAL"[\s\S]*shortName: "OJW"/);
assert.match(canonical, /acronym: "OJF"[\s\S]*entityType: "FOUNDATION"/);

for (const acronym of ["OJA", "OJP", "OJCS"]) {
  assert.match(canonical, new RegExp(`acronym: "${acronym}"[\\s\\S]*publicPageAvailable: true[\\s\\S]*publicServiceAvailable: false[\\s\\S]*productAvailable: false`));
}
assert.match(canonical, /acronym: "OJW"[\s\S]*publicPageAvailable: true[\s\S]*publicServiceAvailable: true[\s\S]*productAvailable: false/);

for (const route of ["/", "/oja", "/ojp", "/ojcs", "/ojw"]) {
  assert.match(app, new RegExp(`path="${route.replace("/", "\\/")}"`));
}
assert.doesNotMatch(app, /path="\/ojf"|path:\s*"\/ojf"/i);

assert.doesNotMatch(hero, /tree-hero__intro|tree-hero__cta/);
const sceneImports = (scene.match(/^import .*post-v1\/coastal-hero.*$/gm) ?? []).join("\n");
assert.match(sceneImports, /coastal-hero/);
assert.doesNotMatch(sceneImports, /-clean/);
assert.match(le00, /HERO_TREE = ABSENT/);
assert.match(le00, /TREE_FRUITS = ABSENT/);
assert.match(le00, /LEGACY_TREE_FRUIT_SYSTEM = DO_NOT_REACTIVATE/);
assert.match(le00, /SNOW_V1 = OFF/);

assert.match(location, /getCurrentPosition/);
assert.doesNotMatch(location, /watchPosition|fetch\(|sendBeacon|WebSocket/);
for (const contract of [
  "REAL_WEATHER = OFF",
  "LOCATION_TRANSMISSION = NONE",
  "RAW_COORDINATE_STORAGE = FORBIDDEN",
  "LOCATION_WATCH = OFF",
  "ACCEPTED_V1_DEBT",
  "OFFSCREEN_OPTIMIZATION = DEFERRED_POST_V1",
  "HISTORICAL_REFERENCE_CLEANUP = DEFERRED_NON_BLOCKING",
]) assert.match(freeze, new RegExp(contract));

assert.equal(packageJson.scripts["test:ojw:v1-feature-freeze"], "node scripts/architecture/ojw-v1-feature-freeze.test.mjs");

console.log("OJW-V1-FEATURE-FREEZE: functional baseline, doctrine, routes, availability, Hero, privacy and accepted debts validated.");
