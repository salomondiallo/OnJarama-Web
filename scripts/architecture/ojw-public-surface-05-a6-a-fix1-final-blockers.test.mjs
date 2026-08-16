import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const headerStyles = read("src/styles/header.css");
const home = read("src/pages/HomePage.tsx");
const metadata = read("src/hooks/usePageMetadata.ts");
const portalPage = read("src/pages/OJWPage.tsx");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const ecosystem = read("src/data/ecosystem.ts");

const mobileRules = headerStyles.slice(headerStyles.indexOf("@media (max-width:430px)"));
assert.match(mobileRules, /grid-template-columns:44px minmax\(110px,1fr\) 44px/);
assert.match(mobileRules, /\.menu-toggle\{width:44px;height:44px\}/);
assert.doesNotMatch(mobileRules, /\.menu-toggle\{width:40px;height:40px\}/);
assert.match(headerStyles, /\.menu-toggle:focus-visible \{ outline:3px solid #68d7f4/);

assert.match(home, /usePageMetadata\(\{/);
assert.match(home, /title: "OnJarama — Votre parcours\. Votre rythme\."/);
assert.match(home, /description: "OnJarama - Votre parcours\. Votre rythme\."/);
assert.match(home, /canonicalUrl: "https:\/\/onjarama\.ca\/"/);
for (const property of ["og:title", "og:description", "og:url"]) {
  assert.match(metadata, new RegExp(`upsertMeta\\("${property}"`));
}

assert.match(portalPage, /<PublicProjectExplorer currentProject="OJW" \/>/);
assert.match(explorer, /publicPageEntities\.filter/);
assert.match(explorer, /to=\{project\.publicPagePath\}/);
for (const route of ["/oja", "/ojp", "/ojcs", "/ojw"]) {
  assert.match(ecosystem, new RegExp(`publicPagePath: "${route}"[\\s\\S]*?publicPageAvailable: true`));
}
assert.equal((ecosystem.match(/entityType: "SOFTWARE"[,\n]/g) ?? []).length, 0);
assert.match(ecosystem, /id: "foundation"[\s\S]*?entityType: "FOUNDATION"/);

console.log("OJW-PUBLIC-SURFACE-05-A6-A-FIX1: touch target, Home metadata and shared portal navigation blockers validated.");
