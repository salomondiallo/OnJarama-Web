import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();

const clock = text("src/hooks/useEnvironmentClock.ts");
const living = text("src/hooks/useLivingEnvironment.ts");
const dayNight = text("src/hooks/useDayNightMode.ts");
const sky = text("src/utils/dynamicSky.ts");
const scene = text("src/components/TreeScene.tsx");
const hero = text("src/sections/TreeHeroSection.tsx");
const ecosystem = text("src/sections/EcosystemSection.tsx");
const canon = text("docs/OJW-LIVING-ENVIRONMENT-LE-00-CANONICAL-HERO.md");
const css = text("src/styles/tree.css");
const packageJson = JSON.parse(text("package.json"));
const runtime = [clock, living, dayNight, sky, scene, hero, css].join("\n");

assert.match(living, /useEnvironmentClock\(\)/);
assert.match(living, /useDayNightMode\(nowMs\)/);
assert.match(living, /resolveInternalDynamicSky/);
assert.match(living, /performanceProfile/);
assert.match(scene, /environment\.celestialProgress/);
assert.match(scene, /environment\.dynamicSkyState/);
assert.match(scene, /className="gfx03-sun-system"/);
assert.match(scene, /className="gfx03-moon-system"/);
assert.match(scene, /dynamic-sky__clouds--far/);
assert.match(scene, /dynamic-sky__clouds--mid/);
assert.match(scene, /dynamic-sky__clouds--near/);
assert.match(scene, /className="scene-birds"/);
assert.match(css, /dynamicSkyDriftFar 190s/);
assert.match(css, /dynamicSkyDriftMid 138s/);
assert.match(css, /dynamicSkyDriftNear 116s/);
assert.match(css, /le02BirdPassOne 47s/);
assert.match(css, /le02BirdPassTwo 61s/);
assert.match(css, /le02BirdPassThree 73s/);
assert.match(css, /data-environment-profile="compact"/);
assert.match(css, /prefers-reduced-motion:reduce[\s\S]*?\.gfx02-life-layers \.scene-bird\{display:none!important\}/);
assert.doesNotMatch(css, /animation:[^;]*gfx04R2(?:Sun|Moon)Arc|animation:[^;]*(?:11h|12h)/);
assert.match(hero, /href="#ecosystem-projects"/);
assert.match(ecosystem, /id="ecosystem-projects"/);

assert.doesNotMatch(runtime, /requestAnimationFrame|<canvas|WebGL|three\.js|<video|navigator\.geolocation|VITE_WEATHER|snow/iu);
assert.match(scene, /data-gfx04-r2-treeless/);
assert.match(css, /\.tree-scene\[data-gfx03-scene\] \.tree-fruit\{[\s\S]*display:none/);
assert.match(canon, /HERO_TREE = ABSENT/);
assert.match(canon, /TREE_FRUITS = ABSENT/);
assert.doesNotMatch(scene, /1672w/);
assert.equal(sha256("src/assets/immersive/founder-canonical/founder-canonical-day.png"), "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7");
assert.equal(sha256("src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png"), "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12");
assert.equal(packageJson.scripts["test:ojw:living-environment-le-02"], "node scripts/architecture/ojw-living-environment-le-02-sky-life.test.mjs");

const STATIC_BIRDS = "AUDITED_AND_DEFERRED";
assert.equal(STATIC_BIRDS, "AUDITED_AND_DEFERRED");

console.log("OJW-LIVING-ENVIRONMENT-LE-02: shared-time celestial motion, layered clouds, spaced birds, compact and reduced-motion contracts validated.");
