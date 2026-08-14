import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const ecosystem = read("src/data/ecosystem.ts");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const packageJson = JSON.parse(read("package.json"));
const packageLock = read("package-lock.json");

const pages = [
  { code: "OJA", route: "/oja", file: "src/pages/OJAPage.tsx", data: "src/data/projects/oja.ts" },
  { code: "OJP", route: "/ojp", file: "src/pages/OJPPage.tsx", data: "src/data/projects/ojp.ts" },
  { code: "OJCS", route: "/ojcs", file: "src/pages/OJCSPage.tsx", data: "src/data/projects/ojcs.ts" },
  { code: "OJW", route: "/ojw", file: "src/pages/OJWPage.tsx", data: "src/data/projects/ojw.ts" },
].map((page) => ({ ...page, source: read(page.file), editorial: read(page.data) }));

const entityBlock = (id) => {
  const start = ecosystem.indexOf(`id: "${id}"`);
  const end = ecosystem.indexOf("\n  {", start + 1);
  return ecosystem.slice(start, end === -1 ? undefined : end);
};

const publicEntities = [
  { code: "OJA", id: "academy", route: "/oja", type: "APPLICATION", service: false },
  { code: "OJP", id: "path", route: "/ojp", type: "APPLICATION", service: false },
  { code: "OJCS", id: "ojcs-connect", route: "/ojcs", type: "APPLICATION", service: false },
  { code: "OJW", id: "web", route: "/ojw", type: "WEB_PORTAL", service: true },
];

assert.equal(pages.length, 4);
assert.equal(new Set(pages.map((page) => page.source.match(/from "\.\.\/components\/PublicProjectExplorer"/)?.[0])).size, 1);
for (const page of pages) {
  assert.match(page.source, new RegExp(`<PublicProjectExplorer currentProject="${page.code}" \\/>`));
  assert.match(page.editorial, new RegExp(`canonicalUrl: "https:\\/\\/onjarama\\.ca${page.route}"`));
}

for (const entity of publicEntities) {
  const source = entityBlock(entity.id);
  assert.match(source, new RegExp(`entityType: "${entity.type}"`));
  assert.match(source, new RegExp(`publicPagePath: "${entity.route}"`));
  assert.match(source, /publicPageAvailable: true/);
  assert.match(source, new RegExp(`publicServiceAvailable: ${entity.service}`));
  assert.match(source, /productAvailable: false/);
}
assert.equal(publicEntities.filter((entity) => entity.type === "APPLICATION").map((entity) => entity.code).join(","), "OJA,OJP,OJCS");
assert.equal((ecosystem.match(/entityType: "SOFTWARE",/g) ?? []).length, 0);
assert.match(ecosystem, /id: "foundation"[\s\S]*?entityType: "FOUNDATION"/);

assert.match(explorer, /publicPageEntities\.filter/);
assert.doesNotMatch(explorer, /productAvailable/);
assert.match(explorer, /entity\.entityType === "APPLICATION" \|\| entity\.entityType === "WEB_PORTAL"/);
assert.match(explorer, /currentProject: "OJA" \| "OJP" \| "OJCS" \| "OJW"/);
assert.match(explorer, /project\.entityType === "WEB_PORTAL" \? "[^\"]+"/);
assert.match(explorer, /aria-current="page"/);
assert.match(explorer, /isCurrent \? \(/);
assert.doesNotMatch(explorer, /foundationEntity|OJF/);
assert.doesNotMatch(explorer, /T[^\n\"]+charger|Installer|App Store|Play Store|APK|Login|Signup|Account|\/download/i);

const dependencies = Object.keys(packageJson.dependencies ?? {}).sort();
const lockDependencies = Object.keys(JSON.parse(packageLock).packages?.[""]?.dependencies ?? {}).sort();
assert.deepEqual(dependencies, lockDependencies);
assert.equal(packageJson.scripts["test:ojw:public-pages-05-a3-c"], "node scripts/architecture/ojw-public-pages-05-a3-c-cross-navigation-qualification.test.mjs");

console.log("OJW-PUBLIC-PAGES-05-A3-C: four-page shared navigation, taxonomy, availability, routes, metadata and product isolation validated.");
