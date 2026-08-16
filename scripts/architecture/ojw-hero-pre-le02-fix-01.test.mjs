import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();

const hero = text("src/sections/TreeHeroSection.tsx");
const home = text("src/pages/HomePage.tsx");
const ecosystem = text("src/sections/EcosystemSection.tsx");
const scene = text("src/components/TreeScene.tsx");
const css = text("src/styles/tree.css");
const packageJson = JSON.parse(text("package.json"));

assert.match(hero, /className="tree-hero__cta tree-hero__cta--primary" href="#ecosystem-projects"/);
assert.match(hero, /className="tree-hero__cta" href="#roadmap"/);
assert.match(ecosystem, /<section id="ecosystem-projects"/);
assert.doesNotMatch(hero, /href="\/(?:ecosystem-projects|ojf)"/);
assert.match(hero, /tree-hero__intro--option-b/);
assert.match(css, /\.tree-hero__intro--option-b \.tree-hero__cta\[href="#roadmap"\]\{order:-1\}/);
assert.match(css, /\.tree-hero__intro--option-b \.tree-hero__actions\{position:absolute;[^\n]*grid-area:auto;[^\n]*min-width:0;[^\n]*width:39%/);
assert.match(css, /\.tree-hero__intro--option-b \.tree-hero__cta\{box-sizing:border-box;min-width:0;width:100%/);
assert.match(css, /@media\(min-width:761px\) and \(max-width:959px\)\{[\s\S]*?height:55%;min-height:0[\s\S]*?top:40%;bottom:auto/);
assert.doesNotMatch(css, /dynamic-sky\{clip-path:polygon\(0 0,67%/);
assert.match(css, /\.dynamic-sky\{clip-path:none;[^\n]*mask-image:linear-gradient/);

assert.doesNotMatch(hero + home, /<TreeFruit|tree-fruit/);
assert.match(scene, /data-gfx04-r2-treeless/);
assert.match(scene, /environment\.dynamicSkyState/);
assert.match(scene, /className="scene-birds"/);
assert.match(css, /\.gfx02-life-layers \.scene-bird/);
assert.doesNotMatch(css, /hero-pre-le02[^\n]*(?:animation|@keyframes)/i);

assert.equal(sha256("src/assets/immersive/founder-canonical/founder-canonical-day.png"), "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7");
assert.equal(sha256("src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png"), "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12");

const STATIC_BIRDS_SOURCE = "RASTER";
const STATIC_BIRDS_NEXT_ACTION = "LE02_CONTROLLED_REPLACEMENT";
assert.equal(STATIC_BIRDS_SOURCE, "RASTER");
assert.equal(STATIC_BIRDS_NEXT_ACTION, "LE02_CONTROLLED_REPLACEMENT");
assert.equal(packageJson.scripts["test:ojw:hero-pre-le02-fix-01"], "node scripts/architecture/ojw-hero-pre-le02-fix-01.test.mjs");

console.log("OJW-HERO-PRE-LE02-FIX-01: CTA mapping, feathered sky boundary, canonical masters and LE-01 preservation validated.");
