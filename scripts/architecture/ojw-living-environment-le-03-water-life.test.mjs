import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();

const scene = text("src/components/TreeScene.tsx");
const css = text("src/styles/tree.css");
const hero = text("src/sections/TreeHeroSection.tsx");
const sky = text("src/utils/dynamicSky.ts");
const packageJson = JSON.parse(text("package.json"));
const water = scene + css;

assert.match(scene, /className="living-water"/);
assert.match(scene, /living-water__waterfall/);
assert.match(scene, /living-water__river/);
assert.match(scene, /living-water__foam/);
assert.match(scene, /living-water__mist/);
assert.match(scene, /aria-hidden="true"/);
assert.match(scene, /focusable="false"/);
assert.match(css, /\.living-water\{[^}]*pointer-events:none/);
assert.match(scene, /data-water-profile=\{environment\.performanceProfile\.toLowerCase\(\)\}/);
assert.match(scene, /data-water-motion=\{environment\.reducedMotion \? "static" : "live"\}/);
assert.match(css, /data-environment-profile="compact"/);
assert.match(css, /@media\(max-width:900px\)\{\.living-water__fall--three/);
assert.match(css, /prefers-reduced-motion:reduce[\s\S]*\.living-water__fall[\s\S]*animation:none!important/);
assert.match(css, /@keyframes le03WaterfallFlow/);
assert.match(css, /@keyframes le03RiverFlow/);
assert.match(css, /@keyframes le03FoamPulse/);
assert.match(css, /@keyframes le03WaterMist/);
assert.doesNotMatch(water, /<canvas|WebGL|three\.js|<video|requestAnimationFrame/);
assert.doesNotMatch(water, /navigator\.geolocation|VITE_WEATHER|realWeather/);
assert.match(hero, /href="#ecosystem-projects"/);
assert.match(sky, /resolveInternalDynamicSky/);
assert.equal(sha256("src/assets/immersive/founder-canonical/founder-canonical-day.png"), "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7");
assert.equal(sha256("src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png"), "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12");
assert.equal(packageJson.scripts["test:ojw:living-environment-le-03"], "node scripts/architecture/ojw-living-environment-le-03-water-life.test.mjs");

console.log("OJW-LIVING-ENVIRONMENT-LE-03: localized waterfall, river, foam and water-mist layers validated.");
