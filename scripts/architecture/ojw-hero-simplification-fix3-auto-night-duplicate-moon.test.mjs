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

assert.match(scene, /\{!astronomicalSky && <g className="gfx03-moon-system"/, "Auto local must not mount the artistic moon beside the astronomical moon");
assert.match(scene, /\{!astronomicalSky && <g className="gfx03-sun-system"/, "Auto local must not mount an artistic celestial source beside astronomical sources");
assert.match(scene, /\{astronomicalSky && \([\s\S]*className="astronomical-celestial__moon"/, "the astronomical moon engine must remain mounted for Auto local");
assert.match(styles, /\.tree-hero\.is-day \.gfx03-sun-system,[\s\S]*\.tree-hero\.is-day \.astronomical-celestial__moon\{display:none!important\}/, "FIX2 Day celestial exclusion must remain closed");
assert.match(styles, /\.tree-hero\.is-night \.gfx03-moon-system\{opacity:\.88\}/, "manual and fallback Night must preserve the artistic moon");
assert.match(styles, /\[data-auto-celestial="local"\]\[data-moon-visible="true"\] \.astronomical-celestial__moon\{opacity:\.9\}/, "Auto local must preserve its astronomical moon authority");
assert.match(astronomy, /getPosition|getMoonPosition|getMoonIllumination/);
assert.match(scene, /coastal-hero-day-3840\.png/, "approved post-V1 DAY source must remain the runtime source");
assert.match(scene, /coastal-hero-night-3840\.png/, "approved post-V1 NIGHT source must remain the runtime source");
assert.equal(pkg.dependencies.suncalc, "2.0.1");
assert.equal(Object.keys(pkg.dependencies).length, 4, "FIX3 must add no dependency");
assert.doesNotMatch(`${scene}\n${styles}`, /requestAnimationFrame|setInterval\s*\(/);

const hashes = {
  "src/assets/immersive/founder-canonical/founder-canonical-day.png": "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png": "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12",
  "src/assets/immersive/founder-canonical/founder-canonical-day-clean.png": "85FF35900B7FC2DFBD9A168C49FAA1E8BB3491ECA2885250BA0A51F0478E1D0A",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon-clean.png": "FA4167300522CDC9C2D75F17ED84270641CDB12597091690B1F829C917047E1F",
};
for (const [file, hash] of Object.entries(hashes)) assert.equal(sha256(file), hash, `${file} must remain unchanged`);

console.log("OJW-HERO-SIMPLIFICATION-FIX3: Auto local mounts only astronomical astres while manual and fallback Night preserve one artistic moon.");
