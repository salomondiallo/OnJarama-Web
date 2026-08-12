import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const data = read("src/data/ecosystem.ts");
const section = read("src/sections/EcosystemSection.tsx");

const publicModel = data.slice(data.indexOf("export const publicProjects"), data.indexOf("/**\n * Compatibility projection"));
const foundationModel = data.slice(data.indexOf("export const foundationEntity"), data.indexOf("export const publicProjects"));

assert.equal((publicModel.match(/\bid:\s*"/g) ?? []).length, 4, "PUBLIC_PROJECT_COUNT must remain 4");
assert.deepEqual(
  [...publicModel.matchAll(/shortName:\s*"([A-Z]+)"/g)].map((match) => match[1]),
  ["OJA", "OJP", "OJCS", "OJW"],
  "PUBLIC_PROJECT_ORDER must remain OJA,OJP,OJCS,OJW",
);

for (const [id, slug, path] of [["academy", "OJA", "oja"], ["path", "OJP", "ojp"], ["ojcs-connect", "OJCS", "ojcs"], ["web", "OJW", "ojw"]]) {
  const start = publicModel.indexOf(`id: "${id}"`);
  const next = publicModel.indexOf("\n  {", start + 1);
  const project = publicModel.slice(start, next === -1 ? undefined : next);
  for (const field of ["slug", "shortName", "name", "description", "status", "publicPagePath", "publicPageAvailable", "productAvailable", "emblem", "emblemAlt"]) {
    assert.match(project, new RegExp(`\\b${field}:`), `${slug} is missing ${field}`);
  }
  assert.match(project, new RegExp(`publicPagePath:\\s*"/${path}"`));
  assert.match(project, /publicPageAvailable:\s*true/, `${slug} public page availability is incorrect`);
}

assert.match(foundationModel, /entityType:\s*"FOUNDATION"/);
assert.match(foundationModel, /"ECOSYSTEM_CARRIER"/);
assert.match(foundationModel, /"INSTITUTIONAL_ENTITY"/);
assert.doesNotMatch(section, /foundationEntity|\bfoundation\b/, "OJF_RENDERED_AS_PROJECT_CARD must remain FALSE");
assert.match(section, /publicProjects/);
assert.match(section, /item\.publicPageAvailable/);
assert.match(section, /href=\{item\.publicPagePath\}/);
assert.doesNotMatch(section, /href="#top"|href=\{item\.href\}/, "NO_ACTIVE_404_PROJECT_LINK must remain PASS");
assert.match(section, /PROJECT_ORDER = \["academy", "path", "ojcs-connect", "web"\]/);

for (const asset of ["oja", "ojp", "ojcs", "ojw"]) {
  assert.match(data, new RegExp(`import ${asset}Emblem from "\\.\\./assets/ecosystem/emblems/${asset}-emblem-a2\\.png"`));
}

console.log("OJW-ECOSYSTEM-01: canonical public project model, OJF separation and inactive future routes validated.");
