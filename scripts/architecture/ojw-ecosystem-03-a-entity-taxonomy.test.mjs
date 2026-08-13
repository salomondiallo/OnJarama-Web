import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const data = read("src/data/ecosystem.ts");
const section = read("src/sections/EcosystemSection.tsx");
const app = read("src/App.tsx");
const canonical = data.slice(data.indexOf("export const ecosystemEntities"), data.indexOf("export const publicApplications"));

assert.match(data, /type EcosystemEntityType = "APPLICATION" \| "SOFTWARE" \| "WEB_PORTAL" \| "FOUNDATION"/);
assert.match(data, /type EcosystemEntity = PublicProject \| FoundationEntity/);
assert.equal((canonical.match(/entityType: "APPLICATION"/g) ?? []).length, 3);
assert.deepEqual([...canonical.matchAll(/shortName: "(OJA|OJP|OJCS)"/g)].map((match) => match[1]), ["OJA", "OJP", "OJCS"]);
assert.equal((canonical.match(/entityType: "SOFTWARE"/g) ?? []).length, 0);
assert.equal((canonical.match(/entityType: "WEB_PORTAL"/g) ?? []).length, 1);
assert.equal((canonical.match(/entityType: "FOUNDATION"/g) ?? []).length, 1);
assert.equal((canonical.match(/publicPageAvailable: true/g) ?? []).length, 4);
assert.match(data, /export const publicApplications = ecosystemEntities\.filter/);
assert.match(data, /export const publicSoftware = ecosystemEntities\.filter/);
assert.match(data, /export const webPortalEntity = ecosystemEntities\.find/);
assert.match(data, /export const foundationEntity = ecosystemEntities\.find/);
assert.match(data, /export const publicPageEntities = ecosystemEntities\.filter/);
assert.match(canonical, /entityType: "WEB_PORTAL"[\s\S]*homeProductCard: false[\s\S]*shortName: "OJW"/);
assert.match(canonical, /acronym: "OJF"[\s\S]*entityType: "FOUNDATION"[\s\S]*homeProductCard: false/);
assert.doesNotMatch(canonical, /\bOJS\b|OnJarama School|\bOJE\b/);
assert.match(section, /id="ecosystem-projects"/);
assert.match(section, /publicApplications/);
assert.match(section, /publicSoftware/);
assert.match(section, /webPortalEntity/);
assert.match(section, /foundationEntity/);
assert.doesNotMatch(section, /publicProjects/);
for (const route of ["oja", "ojp", "ojcs", "ojw"]) assert.match(app, new RegExp(`path="/${route}"`));
assert.match(data, /LEGACY_HERO_PROJECTION != CANONICAL_PUBLIC_TAXONOMY/);

console.log("OJW-ECOSYSTEM-03-A: entity taxonomy, selectors, public pages and legacy projection validated.");
