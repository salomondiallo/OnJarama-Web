import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const section = read("src/sections/EcosystemSection.tsx");
const data = read("src/data/ecosystem.ts");
const cards = read("src/styles/cards.css");
const canonical = data.slice(data.indexOf("export const ecosystemEntities"), data.indexOf("export const publicApplications"));

assert.match(section, /foundationEntity, publicApplications, publicSoftware, webPortalEntity/);
assert.doesNotMatch(section, /publicProjects/);
assert.match(section, /id="ecosystem-projects"/);
assert.match(section, /Nos applications/);
assert.match(section, /data-application-count=\{publicApplications\.length\}/);
assert.match(section, /publicApplications\.map/);
assert.deepEqual([...section.matchAll(/^\s+(academy|path|"ojcs-connect"):/gm)].map((match) => match[1].replaceAll('"', '')), ["academy", "path", "ojcs-connect"]);
assert.match(section, /Nos logiciels/);
assert.match(section, /data-software-count=\{publicSoftware\.length\}/);
assert.doesNotMatch(section, /publicSoftware\.map/);
assert.doesNotMatch(section, /OnJarama School|\bOJS\b|\bOJE\b|bientôt|prochainement/i);
assert.match(section, /ecosystem-role--portal[\s\S]*href=\{webPortalEntity\.publicPagePath\}/);
assert.match(section, /ecosystem-role--foundation/);
assert.doesNotMatch(section.match(/ecosystem-role--foundation[\s\S]*?<\/article>/)?.[0] ?? "", /href=/);
assert.equal((canonical.match(/entityType: "APPLICATION"/g) ?? []).length, 3);
assert.equal((canonical.match(/entityType: "SOFTWARE"/g) ?? []).length, 0);
assert.match(cards, /grid-template-columns: minmax\(0, 1\.65fr\) minmax\(280px, \.85fr\)/);
assert.match(cards, /@media \(max-width: 820px\)[\s\S]*\.ecosystem-territories,[\s\S]*grid-template-columns: 1fr/);
assert.match(cards, /@media \(max-width: 620px\)[\s\S]*\.ecosystem-applications-grid \{ grid-template-columns: 1fr/);
assert.match(cards, /\.ecosystem-role__link[\s\S]*min-height: 44px/);
assert.match(cards, /@media \(prefers-reduced-motion: reduce\)/);

console.log("OJW-ECOSYSTEM-03-B: applications, software territory, OJW portal and OJF foundation recomposition validated.");
