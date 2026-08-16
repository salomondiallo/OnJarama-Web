import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const pages = ["OJA", "OJP", "OJCS", "OJW"].map((code) => ({ code, source: read(`src/pages/${code}Page.tsx`) }));
const css = read("src/styles/project-pages.css");
const ecosystem = read("src/data/ecosystem.ts");
const evidence = read("docs/OJW-PUBLIC-PAGES-05-A5-A-PUBLIC-EVIDENCE-CONTRACT.md");
const packageJson = JSON.parse(read("package.json"));
const packageLock = JSON.parse(read("package-lock.json"));
const combined = pages.map(({ source }) => source).join("\n");

for (const { code, source } of pages) {
  assert.match(source, new RegExp(`<PublicProjectLayout currentProject="${code}">`));
  assert.match(source, /<ProjectHero project=/);
  assert.match(source, /<PublicProjectExplorer currentProject=/);
  assert.match(source, /a5b-compact-showcase/);
}

assert.equal((ecosystem.match(/entityType: "APPLICATION",/g) ?? []).length, 3);
assert.equal((ecosystem.match(/entityType: "SOFTWARE",/g) ?? []).length, 0);
assert.match(ecosystem, /id: "web"[\s\S]*?entityType: "WEB_PORTAL"/);
assert.match(ecosystem, /id: "foundation"[\s\S]*?entityType: "FOUNDATION"/);
assert.equal((ecosystem.match(/productAvailable: false/g) ?? []).length, 4);

assert.match(combined, /Comprendre\. Organiser\. Progresser\./);
assert.match(combined, /Organiser sans conseiller ni promettre/);
assert.match(combined, /Explorer\. Localiser\. Qualifier\. Contacter\./);
assert.match(combined, /Qualifier avant/);
assert.doesNotMatch(combined, /TÃ©lÃ©charger|Installer|App Store|Play Store|APK|CrÃ©er un compte|Connexion/);
assert.doesNotMatch(combined, /<img|<picture|<svg/);

assert.match(css, /\.a5b-compact-showcase > \.project-section/);
assert.doesNotMatch(pages.find(({ code }) => code === "OJW").source, /publicDestinations|ojw-destinations/);
assert.match(evidence, /AUTHENTIC_PRODUCT_CAPTURE/);
assert.match(evidence, /CONCEPTUAL_VISUAL_ONLY/);
assert.deepEqual(Object.keys(packageJson.dependencies ?? {}).sort(), Object.keys(packageLock.packages?.[""]?.dependencies ?? {}).sort());
assert.equal(packageJson.scripts["test:ojw:public-pages-05-a5-b"], "node scripts/architecture/ojw-public-pages-05-a5-b-structural-recomposition.test.mjs");

console.log("OJW-PUBLIC-PAGES-05-A5-B: four compact showcases, protected taxonomy, availability, guardrails and evidence contract validated.");
