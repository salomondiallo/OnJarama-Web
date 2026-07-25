import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

const hero = read("src/sections/TreeHeroSection.tsx");
const band = read("src/components/InstitutionalProjectBand.tsx");
const ecosystem = read("src/data/ecosystem.ts");
const scene = read("src/components/TreeScene.tsx");
const treeCss = read("src/styles/tree.css");
const footer = read("src/components/Footer.tsx");
const footerCss = read("src/styles/footer.css");

assert.match(band, /PROJECT_ORDER\s*=\s*\["foundation",\s*"academy",\s*"path",\s*"ojcs-connect",\s*"web"\]/);
assert.match(band, /data-project-count=\{orderedItems\.length\}/);
assert.equal((ecosystem.match(/\bid:\s*"/g) ?? []).length, 5, "The institutional band source must contain exactly five projects");
for (const acronym of ["OJF", "OJA", "OJP", "OJCS", "OJW"]) {
  assert.match(ecosystem, new RegExp(`acronym:\\s*"${acronym}"`));
}
assert.equal((`${hero}\n${band}`.match(/<h1\b/g) ?? []).length, 1, "The immersive homepage must render one H1");

assert.match(hero, /className="tree-hero__intro"/);
assert.match(treeCss, /\.tree-hero__intro\{[\s\S]*background:rgba\(5,20,31,\.72\)/);
assert.doesNotMatch(treeCss, /\.tree-hero__intro\{[^}]*background:\s*(?:#fff|white)/);

assert.match(treeCss, /\.institutional-projects\{[\s\S]*grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
assert.match(treeCss, /@media\(max-width:760px\)\{[\s\S]*\.institutional-projects\{grid-template-columns:1fr/);
assert.match(treeCss, /\.institutional-card:focus-visible\{/);
assert.match(treeCss, /\.institutional-card\{[\s\S]*min-height:238px/);
assert.match(treeCss, /\.tree-hero__cta\s*\{[^}]*min-height:48px/);
assert.match(treeCss, /\.day-night-toggle button\s*\{[^}]*min-height:42px/);
assert.match(treeCss, /@media\(max-width:760px\)\{[\s\S]*\.day-night-toggle button\{[^}]*min-height:44px/);

assert.match(hero, /<DayNightToggle[\s\S]*value=\{preference\}[\s\S]*onChange=\{setPreference\}/);
assert.match(hero, /Apps futures/);
assert.match(hero, /<InstitutionalProjectBand/);
assert.doesNotMatch(hero, /EcosystemSidebar|ProjectPreviewCard/);

assert.match(scene, /ojw-gfx-02-scene-day\.png/);
assert.match(scene, /ojw-gfx-02-scene-night-natural-city-lights\.png/);
assert.equal((scene.match(/<picture>/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/avif"/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/webp"/g) ?? []).length, 2);
assert.match(scene, /loading=\{mode === "day" \|\| preparedMode === "day" \? "eager" : "lazy"\}/);
assert.match(scene, /loading=\{mode === "night" \|\| preparedMode === "night" \? "eager" : "lazy"\}/);
assert.match(scene, /path:\s*\{\s*x:\s*71\.2,\s*y:\s*31\.8\s*\}/);
assert.match(scene, /academy:\s*\{\s*x:\s*86\.1,\s*y:\s*25\s*\}/);
assert.match(scene, /web:\s*\{\s*x:\s*71\.5,\s*y:\s*49\.8\s*\}/);
assert.match(scene, /"ojcs-connect":\s*\{\s*x:\s*87,\s*y:\s*51\.8\s*\}/);

assert.doesNotMatch(footer, /href="#"/);
assert.doesNotMatch(footer, /Confidentialité|Cookies/);
assert.match(footer, /href="#mission"/);
assert.match(footerCss, /min-height:44px/);
assert.match(treeCss, /@media\(prefers-reduced-motion:reduce\)\{[\s\S]*\.institutional-card/);

console.log("OJW-LOT-17-A architecture checks passed.");
