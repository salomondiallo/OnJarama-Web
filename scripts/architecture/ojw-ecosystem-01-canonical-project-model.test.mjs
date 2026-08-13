import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const data = read("src/data/ecosystem.ts");
const section = read("src/sections/EcosystemSection.tsx");
const canonical = data.slice(data.indexOf("export const ecosystemEntities"), data.indexOf("export const publicApplications"));

assert.deepEqual(
  [...canonical.matchAll(/shortName:\s*"(OJA|OJP|OJCS)"/g)].map((match) => match[1]),
  ["OJA", "OJP", "OJCS"],
  "APPLICATION_ORDER must remain OJA,OJP,OJCS",
);
assert.equal((canonical.match(/entityType:\s*"APPLICATION"/g) ?? []).length, 3, "APPLICATION_COUNT must be 3");
assert.equal((canonical.match(/entityType:\s*"SOFTWARE"/g) ?? []).length, 0, "SOFTWARE_COUNT must be 0");
assert.equal((canonical.match(/entityType:\s*"WEB_PORTAL"/g) ?? []).length, 1, "WEB_PORTAL_COUNT must be 1");
assert.equal((canonical.match(/entityType:\s*"FOUNDATION"/g) ?? []).length, 1, "FOUNDATION_COUNT must be 1");
assert.equal((canonical.match(/publicPageAvailable:\s*true/g) ?? []).length, 4, "PUBLIC_PAGE_COUNT must be 4");
assert.match(canonical, /shortName:\s*"OJW"[\s\S]*entityType:\s*"WEB_PORTAL"|entityType:\s*"WEB_PORTAL"[\s\S]*shortName:\s*"OJW"/);
assert.match(canonical, /entityType:\s*"WEB_PORTAL"[\s\S]*homeProductCard:\s*false/);
assert.match(canonical, /acronym:\s*"OJF"[\s\S]*entityType:\s*"FOUNDATION"|entityType:\s*"FOUNDATION"[\s\S]*acronym:\s*"OJF"/);
assert.match(canonical, /entityType:\s*"FOUNDATION"[\s\S]*homeProductCard:\s*false/);
assert.match(data, /export const publicApplications/);
assert.match(data, /export const publicSoftware/);
assert.match(data, /export const webPortalEntity/);
assert.match(data, /export const foundationEntity/);
assert.match(data, /export const publicPageEntities/);
assert.match(data, /LEGACY_HERO_PROJECTION != CANONICAL_PUBLIC_TAXONOMY/);
assert.match(section, /foundationEntity/);
assert.doesNotMatch(section.match(/ecosystem-role--foundation[\s\S]*?<\/article>/)?.[0] ?? "", /ecosystem-card|href=/, "OJF_RENDERED_AS_PROJECT_CARD must remain FALSE");
assert.match(section, /publicApplications/);
assert.match(section, /publicSoftware/);
assert.match(section, /href=\{item\.publicPagePath\}/);
assert.match(section, /href=\{webPortalEntity\.publicPagePath\}/);

for (const asset of ["oja", "ojp", "ojcs", "ojw"]) {
  assert.match(data, new RegExp(`import ${asset}Emblem from "\\.\\./assets/ecosystem/emblems/${asset}-emblem-a2\\.png"`));
}

console.log("OJW-ECOSYSTEM-01: canonical entity taxonomy, public pages and OJF separation validated.");
