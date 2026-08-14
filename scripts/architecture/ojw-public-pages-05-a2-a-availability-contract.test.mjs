import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const model = read("src/data/ecosystem.ts");
const status = read("src/components/ProjectStatus.tsx");
const canonical = model.slice(model.indexOf("export const ecosystemEntities"), model.indexOf("export const publicApplications"));
const entityBlock = (id) => {
  const start = canonical.indexOf(`id: "${id}"`);
  const next = canonical.indexOf("\n  {", start + 1);
  return canonical.slice(start, next === -1 ? undefined : next);
};

for (const id of ["academy", "path", "ojcs-connect"]) {
  assert.match(entityBlock(id), /entityType:\s*"APPLICATION"[\s\S]*publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*false[\s\S]*productAvailable:\s*false/);
}
assert.match(entityBlock("web"), /entityType:\s*"WEB_PORTAL"[\s\S]*publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*true[\s\S]*productAvailable:\s*false/);
assert.match(entityBlock("foundation"), /entityType:\s*"FOUNDATION"[\s\S]*homeProductCard:\s*false/);
assert.doesNotMatch(entityBlock("foundation"), /publicServiceAvailable|productAvailable/);
assert.equal((canonical.match(/entityType:\s*"SOFTWARE"/g) ?? []).length, 0);
assert.equal((canonical.match(/publicPageAvailable:\s*true/g) ?? []).length, 4);
assert.equal((canonical.match(/publicServiceAvailable:\s*true/g) ?? []).length, 1);
assert.equal((canonical.match(/productAvailable:\s*true/g) ?? []).length, 0);

assert.match(status, /data-stage=\{stage\}/);
assert.doesNotMatch(status, /état \{stage\.toLowerCase\(\)\}|état current|état planned|état vision/i);

for (const [file, prefix] of [
  ["docs/OJW-ECOSYSTEM-02-C-OJA-CANONICAL-EDITORIAL-MODEL.md", "OJA"],
  ["docs/OJW-ECOSYSTEM-02-D-OJP-CANONICAL-EDITORIAL-MODEL.md", "OJP"],
  ["docs/OJW-ECOSYSTEM-02-E-OJCS-CANONICAL-EDITORIAL-MODEL.md", "OJCS"],
]) {
  const document = read(file);
  assert.match(document, new RegExp(`${prefix}_PUBLIC_PAGE_AVAILABLE = TRUE`));
  assert.match(document, new RegExp(`${prefix}_PRODUCT_AVAILABLE = FALSE`));
  assert.match(document, new RegExp(`${prefix}_PRODUCT_CTA = NONE`));
}

console.log("OJW-PUBLIC-PAGES-05-A2-A: availability contract, documentary status and accessible project labels validated.");
