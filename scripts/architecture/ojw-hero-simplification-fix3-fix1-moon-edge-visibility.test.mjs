import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const rootUrl = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, rootUrl));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();

const scene = text("src/components/TreeScene.tsx");
const styles = text("src/styles/tree.css");
const astronomy = text("src/lib/astronomicalSky.ts");
const pkg = JSON.parse(text("package.json"));

assert.match(scene, /\{!astronomicalSky && <g className="gfx03-moon-system"/, "Auto local must not mount the artistic moon");
assert.match(scene, /const astronomicalMoonRadius = environment\.performanceProfile === "COMPACT" \? 10 : 14/);
assert.match(scene, /astronomicalSky\.moonX >= astronomicalMoonRadiusPercent/);
assert.match(scene, /astronomicalSky\.moonX <= 100 - astronomicalMoonRadiusPercent/);
assert.match(scene, /\{astronomicalMoonFullyVisible && <span[\s\S]*className="astronomical-celestial__moon"/, "the astronomical moon must render only when its complete disc fits");
assert.doesNotMatch(scene, /clamp\([^\n]*moon|moon[^\n]*clamp\(/i, "astronomical moon position must never be clamped");
assert.match(astronomy, /HERO_HORIZONTAL_FOV_DEGREES = 180/);
assert.match(astronomy, /getPosition|getMoonPosition|getMoonIllumination/);
assert.match(styles, /\.tree-hero\.is-day \.gfx03-sun-system,[\s\S]*\.tree-hero\.is-day \.astronomical-celestial__moon\{display:none!important\}/);
assert.match(styles, /\.tree-hero\.is-night \.gfx03-moon-system\{opacity:\.88\}/);
assert.equal(pkg.dependencies.suncalc, "2.0.1");
assert.equal(Object.keys(pkg.dependencies).length, 4);
assert.doesNotMatch(`${scene}\n${styles}`, /requestAnimationFrame|setInterval\s*\(/);
assert.doesNotMatch(scene, /card-free/);

const hashes = {
  "src/assets/immersive/founder-canonical/founder-canonical-day.png": "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png": "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12",
  "src/assets/immersive/founder-canonical/founder-canonical-day-clean.png": "85FF35900B7FC2DFBD9A168C49FAA1E8BB3491ECA2885250BA0A51F0478E1D0A",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon-clean.png": "FA4167300522CDC9C2D75F17ED84270641CDB12597091690B1F829C917047E1F",
};
for (const [file, hash] of Object.entries(hashes)) assert.equal(sha256(file), hash, `${file} must remain unchanged`);

console.log("OJW-HERO-SIMPLIFICATION-FIX3-FIX1: astronomical moon renders only when its complete responsive disc fits without clamping.");
