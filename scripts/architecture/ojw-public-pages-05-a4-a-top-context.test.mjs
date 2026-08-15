import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const layout = read("src/layouts/PublicProjectLayout.tsx");
const context = read("src/components/PublicProjectContext.tsx");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const header = read("src/components/Header.tsx");
const ecosystem = read("src/data/ecosystem.ts");
const css = read("src/styles/project-pages.css");
const packageJson = JSON.parse(read("package.json"));
const packageLock = JSON.parse(read("package-lock.json"));
const pages = [
  ["OJA", "src/pages/OJAPage.tsx"],
  ["OJP", "src/pages/OJPPage.tsx"],
  ["OJCS", "src/pages/OJCSPage.tsx"],
  ["OJW", "src/pages/OJWPage.tsx"],
].map(([code, file]) => ({ code, source: read(file) }));

for (const { code, source } of pages) {
  assert.match(source, new RegExp(`<PublicProjectLayout currentProject="${code}">`));
  assert.doesNotMatch(source, /Retour à l’écosystème/);
}

assert.match(layout, /currentProject\?: PublicProjectContextCode/);
assert.match(layout, /<PublicProjectContext currentProject=\{currentProject\} \/>/);
assert.match(context, /publicPageEntities\.find/);
assert.match(context, /href="\/#ecosystem-projects"/);
assert.match(context, /aria-current="page"/);
assert.match(context, /"OJA" \| "OJP" \| "OJCS" \| "OJW"/);
assert.match(header, /className="brand" href=\{isHomePage \? "#top" : "\/"\}/);

assert.equal((ecosystem.match(/entityType: "APPLICATION",/g) ?? []).length, 3);
assert.equal((ecosystem.match(/entityType: "SOFTWARE",/g) ?? []).length, 0);
assert.match(ecosystem, /id: "web"[\s\S]*?entityType: "WEB_PORTAL"/);
assert.match(ecosystem, /id: "foundation"[\s\S]*?entityType: "FOUNDATION"/);
assert.doesNotMatch(context + layout, /Télécharger|Installer|App Store|Play Store|APK|Login|Signup|Account/i);

assert.match(css, /\.public-project-context a[^{]*\{[^}]*min-height: 44px/);
assert.match(css, /\.public-project-context a:focus-visible/);
assert.match(css, /\.public-page-shell:has\(\.public-project-context\)/);
assert.doesNotMatch(explorer, /PublicProjectContext|public-project-context/);

assert.deepEqual(Object.keys(packageJson.dependencies ?? {}).sort(), Object.keys(packageLock.packages?.[""]?.dependencies ?? {}).sort());
assert.equal(packageJson.scripts["test:ojw:public-pages-05-a4-a"], "node scripts/architecture/ojw-public-pages-05-a4-a-top-context.test.mjs");

console.log("OJW-PUBLIC-PAGES-05-A4-A: compact shared project context, canonical taxonomy, accessibility and protected navigation validated.");
