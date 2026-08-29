import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const rootUrl = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, rootUrl));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();

const scene = text("src/components/TreeScene.tsx");
const hero = text("src/sections/TreeHeroSection.tsx");
const styles = text("src/styles/tree.css");
const astronomy = text("src/lib/astronomicalSky.ts");
const location = text("src/hooks/useLocalCelestialLocation.ts");
const clock = text("src/hooks/useEnvironmentClock.ts");
const pkg = JSON.parse(text("package.json"));

assert.match(styles, /\.tree-hero\.is-day \.gfx03-sun-system,[\s\S]*\.tree-hero\.is-day \.astronomical-celestial__moon\{display:none!important\}/, "all artistic and astronomical Day discs must be removed from rendering");
assert.match(styles, /\.tree-hero\.is-night \.gfx03-moon-system\{opacity:\.88\}/, "the artistic Night moon must remain present");
assert.match(styles, /\[data-auto-celestial="local"\]\[data-moon-visible="true"\] \.astronomical-celestial__moon\{opacity:\.9\}/, "the astronomical Night moon contract must remain present");
assert.match(scene, /className="gfx03-moon-system"/);
assert.match(scene, /className="astronomical-celestial__moon"/);
assert.match(scene, /buildMoonIlluminationPath/);
assert.match(astronomy, /getPosition|getMoonPosition|getMoonIllumination/);
assert.match(astronomy, /sunVisible:[\s\S]*moonVisible:[\s\S]*localSkyMode:/);
assert.match(location, /navigator\.geolocation\.getCurrentPosition/);
assert.doesNotMatch(location, /watchPosition/);
assert.match(clock, /visibilitychange/);
assert.match(clock, /pageshow/);
assert.doesNotMatch(hero, /tree-hero__intro tree-hero__intro--option-b/);
assert.match(scene, /coastal-hero-day-3840\.png/, "approved post-V1 DAY source must remain the runtime source");
assert.match(scene, /coastal-hero-night-3840\.png/, "approved post-V1 NIGHT source must remain the runtime source");
assert.equal(pkg.dependencies.suncalc, "2.0.1");
assert.equal(Object.keys(pkg.dependencies).length, 4, "FIX2 must not add a dependency");
assert.doesNotMatch(`${scene}\n${styles}`, /requestAnimationFrame|setInterval\s*\(/);

const hashes = {
  "src/assets/immersive/founder-canonical/founder-canonical-day.png": "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png": "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12",
  "src/assets/immersive/founder-canonical/founder-canonical-day-clean.png": "85FF35900B7FC2DFBD9A168C49FAA1E8BB3491ECA2885250BA0A51F0478E1D0A",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon-clean.png": "FA4167300522CDC9C2D75F17ED84270641CDB12597091690B1F829C917047E1F",
  "src/assets/immersive/founder-canonical/founder-canonical-day-card-free.png": "A996FC935B121D9C71C6D01578ED058A2B141A08CE470758495C59C9DF84CE33",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon-card-free.png": "6AA6D63E668ED191848AC5C7FEDC29A2E2BD60F5CFCA4DF299C45008A5B5D85A",
};
for (const [file, hash] of Object.entries(hashes)) assert.equal(sha256(file), hash, `${file} must remain unchanged`);

console.log("OJW-HERO-SIMPLIFICATION-FIX2: all effective-Day celestial discs are removed while Night moon, local astronomy and card-free runtime remain protected.");
