import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const ecosystem = read("src/data/ecosystem.ts");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const css = read("src/styles/project-pages.css");
const packageJson = JSON.parse(read("package.json"));
const pagePaths = ["src/pages/OJAPage.tsx", "src/pages/OJPPage.tsx", "src/pages/OJCSPage.tsx"];
const pages = pagePaths.map(read);
const combinedPages = pages.join("\n");

assert.equal((combinedPages.match(/import \{ PublicProjectExplorer \}/g) ?? []).length, 3);
assert.equal((combinedPages.match(/<PublicProjectExplorer currentProject=/g) ?? []).length, 3);
assert.match(pages[0], /currentProject="OJA"/);
assert.match(pages[1], /currentProject="OJP"/);
assert.match(pages[2], /currentProject="OJCS"/);
assert.doesNotMatch(combinedPages, /public-project-explorer__grid|Poursuivre la découverte d’OnJarama/);

assert.match(explorer, /publicPageEntities\.filter/);
assert.match(explorer, /entity\.entityType === "APPLICATION" \|\| entity\.entityType === "WEB_PORTAL"/);
assert.doesNotMatch(explorer, /productAvailable/);
assert.match(explorer, /project\.publicPagePath/);
assert.match(explorer, /project\.entityType === "WEB_PORTAL" \? "Découvrir le portail"/);
assert.match(explorer, /aria-current="page"/);
assert.match(explorer, /isCurrent \? \(/);
assert.doesNotMatch(explorer, /window\.location|https?:\/\/|href=["']\/(?:app|download|login|signup|try|dashboard|account)/i);
assert.doesNotMatch(explorer, /Télécharger|Installer|App Store|Play Store|APK|Se connecter|Créer un compte/i);

for (const [id, route] of [["academy", "/oja"], ["path", "/ojp"], ["ojcs-connect", "/ojcs"], ["web", "/ojw"]]) {
  const start = ecosystem.indexOf(`id: "${id}"`);
  const end = ecosystem.indexOf("\n  {", start + 1);
  const entity = ecosystem.slice(start, end === -1 ? undefined : end);
  assert.match(entity, new RegExp(`publicPagePath: "${route}"`));
  assert.match(entity, /publicPageAvailable: true/);
  assert.match(entity, /productAvailable: false/);
}
assert.equal((ecosystem.match(/entityType: "APPLICATION"/g) ?? []).length, 4);
assert.equal((ecosystem.match(/entityType: "SOFTWARE"/g) ?? []).length, 1);
assert.match(ecosystem, /id: "web"[\s\S]*?entityType: "WEB_PORTAL"/);
assert.match(ecosystem, /id: "foundation"[\s\S]*?entityType: "FOUNDATION"/);
assert.doesNotMatch(explorer, /foundationEntity|OJF/);

assert.match(css, /\.public-project-explorer__action[^}]*min-height: 44px/);
assert.match(css, /\.public-project-explorer__item:not\(\.is-current\):focus-visible/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.public-project-explorer__item/);
assert.equal(packageJson.scripts["test:ojw:public-pages-05-a3-a"], "node scripts/architecture/ojw-public-pages-05-a3-a-cross-navigation.test.mjs");

for (const protectedFile of ["src/pages/HomePage.tsx", "src/sections/EcosystemSection.tsx", "src/sections/TreeHeroSection.tsx", "src/components/TreeScene.tsx", "src/utils/dynamicSky.ts"]) {
  assert.doesNotMatch(combinedPages + explorer, new RegExp(protectedFile.split("/").at(-1).replace(".", "\\.")));
}

console.log("OJW-PUBLIC-PAGES-05-A3-A: shared public-page navigation, taxonomy, availability, routes, accessibility and product isolation validated.");
