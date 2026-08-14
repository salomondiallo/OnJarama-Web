import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const ecosystem = read("src/data/ecosystem.ts");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const ojwPage = read("src/pages/OJWPage.tsx");
const ojwData = read("src/data/projects/ojw.ts");
const packageJson = JSON.parse(read("package.json"));
const protectedPages = ["src/pages/OJAPage.tsx", "src/pages/OJPPage.tsx", "src/pages/OJCSPage.tsx"].map(read).join("\n");

const entityBlock = (id) => {
  const start = ecosystem.indexOf(`id: "${id}"`);
  const end = ecosystem.indexOf("\n  {", start + 1);
  return ecosystem.slice(start, end === -1 ? undefined : end);
};

const oja = entityBlock("academy");
const ojp = entityBlock("path");
const ojcs = entityBlock("ojcs-connect");
const ojw = entityBlock("web");

assert.match(explorer, /currentProject: "OJA" \| "OJP" \| "OJCS" \| "OJW"/);
assert.match(ojwPage, /import \{ PublicProjectExplorer \} from "\.\.\/components\/PublicProjectExplorer"/);
assert.match(ojwPage, /<PublicProjectExplorer currentProject="OJW" \/>/);
assert.ok(ojwPage.indexOf("<PublicProjectExplorer") > ojwPage.indexOf("project-final-cta ojw-final-cta"));

assert.match(ojw, /entityType: "WEB_PORTAL"/);
assert.doesNotMatch(ojw, /entityType: "APPLICATION"/);
assert.match(ojw, /publicPageAvailable: true/);
assert.match(ojw, /publicServiceAvailable: true/);
assert.match(ojw, /productAvailable: false/);
assert.equal([oja, ojp, ojcs].filter((entity) => /entityType: "APPLICATION"/.test(entity)).length, 3);
assert.equal((ecosystem.match(/entityType: "SOFTWARE",/g) ?? []).length, 0);
assert.match(ecosystem, /id: "foundation"[\s\S]*?entityType: "FOUNDATION"/);

for (const [entity, route] of [[oja, "/oja"], [ojp, "/ojp"], [ojcs, "/ojcs"]]) {
  assert.match(entity, new RegExp(`publicPagePath: "${route}"`));
  assert.match(entity, /publicPageAvailable: true/);
}
assert.match(explorer, /publicPageEntities\.filter/);
assert.doesNotMatch(explorer, /productAvailable/);
assert.match(explorer, /aria-current="page"/);
assert.match(explorer, /isCurrent \? \(/);
assert.match(explorer, /project\.entityType === "WEB_PORTAL" \? "D[^\"]+couvrir le portail"/);
assert.doesNotMatch(explorer + ojwPage, /T[^\n\"]+charger|Installer|App Store|Play Store|APK|Login|Signup|Account|Acc[^\n\"]+der [^\n\"]+application/i);

assert.equal((protectedPages.match(/<PublicProjectExplorer currentProject=/g) ?? []).length, 3);
assert.match(protectedPages, /currentProject="OJA"/);
assert.match(protectedPages, /currentProject="OJP"/);
assert.match(protectedPages, /currentProject="OJCS"/);
assert.match(ojwData, /canonicalUrl: "https:\/\/onjarama\.ca\/ojw"/);
assert.doesNotMatch(ojwPage + explorer, /TreeHeroSection|TreeScene|dynamicSky|HomePage/);

assert.equal(packageJson.scripts["test:ojw:public-pages-05-a3-b"], "node scripts/architecture/ojw-public-pages-05-a3-b-ojw-navigation.test.mjs");

console.log("OJW-PUBLIC-PAGES-05-A3-B: OJW portal navigation, taxonomy, current-page state, routes and product isolation validated.");
