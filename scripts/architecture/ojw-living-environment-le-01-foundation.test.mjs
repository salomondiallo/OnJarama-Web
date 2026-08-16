import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const canon = read("docs/OJW-LIVING-ENVIRONMENT-LE-00-CANONICAL-HERO.md");
const clock = read("src/hooks/useEnvironmentClock.ts");
const living = read("src/hooks/useLivingEnvironment.ts");
const dayNight = read("src/hooks/useDayNightMode.ts");
const home = read("src/pages/HomePage.tsx");
const hero = read("src/sections/TreeHeroSection.tsx");
const scene = read("src/components/TreeScene.tsx");
const dynamicSky = read("src/utils/dynamicSky.ts");
const packageJson = JSON.parse(read("package.json"));

for (const invariant of [
  "HERO_TREE = ABSENT",
  "TREE_FRUITS = ABSENT",
  "LEGACY_TREE_FRUIT_SYSTEM = DO_NOT_REACTIVATE",
  "SNOW_V1 = OFF",
]) assert.match(canon, new RegExp(invariant));

assert.match(clock, /ENVIRONMENT_CLOCK_INTERVAL_MS = 60_000/);
assert.match(clock, /visibilitychange/);
assert.match(clock, /pageshow/);
assert.match(clock, /window\.clearInterval/);
assert.doesNotMatch(clock, /requestAnimationFrame/);
assert.match(living, /export function useLivingEnvironment/);
assert.match(living, /useEnvironmentClock\(\)/);
assert.match(living, /useDayNightMode\(nowMs\)/);
assert.match(living, /resolveInternalDynamicSky/);
assert.match(living, /prefers-reduced-motion: reduce/);
assert.match(living, /max-width: 767px/);
assert.match(living, /"COMPACT"/);
assert.match(living, /"STANDARD"/);
assert.match(dayNight, /resolveFallbackDayNightMode/);
assert.match(home, /useLivingEnvironment\(\)/);
assert.match(hero, /environment=\{livingEnvironment\}|environment: LivingEnvironmentState/);
assert.doesNotMatch(scene, /useState\(\(\) => new Date\(\)\)/);
assert.doesNotMatch(scene, /import[^\n]*(?:resolveInternalDynamicSky|resolveLocalCelestialState)|(?:resolveInternalDynamicSky|resolveLocalCelestialState)\(/);
assert.match(scene, /environment\.dynamicSkyState/);
assert.match(scene, /data-living-environment="active"/);
assert.match(scene, /data-reduced-motion/);
assert.match(dynamicSky, /export function resolveInternalDynamicSky/);

const runtime = [clock, living, dayNight, home, hero, scene, dynamicSky].join("\n");
assert.doesNotMatch(runtime, /navigator\.geolocation|VITE_WEATHER|WebSocket\(|axios|<canvas|webgl|<video/iu);
assert.doesNotMatch(runtime, /snow|className="waterfall__foam/iu);
assert.equal(Object.keys(packageJson.dependencies).sort().join(","), "react,react-dom,react-router-dom");
assert.equal(packageJson.scripts["test:ojw:living-environment-le-01"], "node scripts/architecture/ojw-living-environment-le-01-foundation.test.mjs");

console.log("OJW-LIVING-ENVIRONMENT-LE-01: shared clock, orchestrator, authority, profile and reduced-motion foundation validated.");
