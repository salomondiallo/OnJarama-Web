import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  calculateCivilTwilight,
  findNextSolarBoundary,
  getNextFallbackBoundary,
  resolveFallbackDayNightMode,
  resolveLocalCelestialState,
  resolveSolarDayNightMode,
} from "../../src/utils/solarDayNight.ts";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const hook = read("src/hooks/useDayNightMode.ts");
const toggle = read("src/components/DayNightToggle.tsx");
const scene = read("src/components/TreeScene.tsx");
const styles = read("src/styles/tree.css");
const hero = read("src/sections/TreeHeroSection.tsx");
const app = read("src/pages/HomePage.tsx");
const ecosystemSection = read("src/sections/EcosystemSection.tsx");

const montreal = { latitude: 45.5017, longitude: -73.5673 };
const conakry = { latitude: 9.6412, longitude: -13.5784 };
const sydney = { latitude: -33.8688, longitude: 151.2093 };
const polarSite = { latitude: 78.2232, longitude: 15.6469 };
const duration = (twilight) => twilight.dusk.getTime() - twilight.dawn.getTime();

const montrealSummerDate = new Date("2026-06-21T18:05:00-04:00");
const montrealWinterDate = new Date("2026-12-21T18:05:00-05:00");
const montrealSummer = calculateCivilTwilight(montrealSummerDate, montreal.latitude, montreal.longitude);
const montrealWinter = calculateCivilTwilight(montrealWinterDate, montreal.latitude, montreal.longitude);
assert.equal(montrealSummer.condition, "normal");
assert.equal(montrealWinter.condition, "normal");
assert.ok(montrealSummer.dawn && montrealSummer.dusk);
assert.ok(montrealWinter.dawn && montrealWinter.dusk);
assert.equal(resolveSolarDayNightMode(montrealSummerDate, montreal.latitude, montreal.longitude), "day");
assert.equal(resolveSolarDayNightMode(new Date("2026-06-21T20:00:00-04:00"), montreal.latitude, montreal.longitude), "day");
assert.equal(resolveSolarDayNightMode(montrealWinterDate, montreal.latitude, montreal.longitude), "night");
assert.ok(duration(montrealSummer) > duration(montrealWinter));

const conakrySummer = calculateCivilTwilight(new Date("2026-06-21T12:00:00Z"), conakry.latitude, conakry.longitude);
const conakryWinter = calculateCivilTwilight(new Date("2026-12-21T12:00:00Z"), conakry.latitude, conakry.longitude);
assert.equal(conakrySummer.condition, "normal");
assert.equal(conakryWinter.condition, "normal");
assert.ok(Math.abs(duration(conakrySummer) - duration(conakryWinter)) < Math.abs(duration(montrealSummer) - duration(montrealWinter)));

assert.equal(resolveSolarDayNightMode(new Date("2026-12-21T19:00:00+11:00"), sydney.latitude, sydney.longitude), "day");
assert.equal(resolveSolarDayNightMode(new Date("2026-06-21T19:00:00+10:00"), sydney.latitude, sydney.longitude), "night");
assert.equal(calculateCivilTwilight(new Date("2026-06-21T12:00:00+02:00"), polarSite.latitude, polarSite.longitude).condition, "polar-day");
assert.equal(calculateCivilTwilight(new Date("2026-12-21T12:00:00+01:00"), polarSite.latitude, polarSite.longitude).condition, "polar-night");
assert.equal(resolveSolarDayNightMode(new Date("2026-01-01"), 100, 0), null);
assert.ok(findNextSolarBoundary(montrealSummerDate, montreal.latitude, montreal.longitude) > montrealSummerDate);

assert.equal(resolveFallbackDayNightMode(new Date("2026-01-01T06:00:00")), "day");
assert.equal(resolveFallbackDayNightMode(new Date("2026-01-01T18:59:59")), "day");
assert.equal(resolveFallbackDayNightMode(new Date("2026-01-01T19:00:00")), "night");
assert.equal(resolveFallbackDayNightMode(new Date("2026-01-01T05:59:59")), "night");
assert.ok(getNextFallbackBoundary(new Date("2026-01-01T18:00:00")) > new Date("2026-01-01T18:00:00"));

assert.doesNotMatch(hook, /navigator\.(?:permissions|geolocation)/);
assert.doesNotMatch(hook, /localStorage\.(?:setItem|getItem)\([^)]*(?:latitude|longitude|coordinates)/i);
assert.doesNotMatch(hook, /fetch\(|XMLHttpRequest|axios|setInterval/);
assert.equal((hook.match(/window\.setTimeout/g) ?? []).length, 1);
assert.match(hook, /window\.clearTimeout/);
assert.match(hook, /getNextLocalMidnight/);
assert.match(hook, /visibilitychange/);
assert.match(hook, /window\.addEventListener\("focus"/);
assert.match(hook, /window\.addEventListener\("pageshow"/);
assert.match(hook, /getTimezoneOffset/);
assert.match(hook, /preference !== "auto"[\s\S]*clearBoundaryTimer/);
assert.match(toggle, /Mode automatique/);
assert.match(toggle, /ambiance actuelle/);
assert.equal(resolveLocalCelestialState(new Date("2026-01-01T07:00:00")).phase, "morning");
assert.equal(resolveLocalCelestialState(new Date("2026-01-01T12:00:00")).phase, "day");
assert.equal(resolveLocalCelestialState(new Date("2026-01-01T17:30:00")).phase, "evening");
assert.equal(resolveLocalCelestialState(new Date("2026-01-01T23:00:00")).phase, "night");

assert.match(styles, /@keyframes waterfallOrganic/);
assert.match(styles, /@keyframes riverGlint/);
assert.match(styles, /@keyframes birdDriftOne/);
assert.match(styles, /@keyframes birdWingPulse/);
assert.match(styles, /@keyframes cityLightBreathe/);
assert.match(styles, /@keyframes pathLampBreathe/);
assert.match(styles, /@keyframes fruitLightBreathe/);
assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
assert.match(styles, /\.gfx02-city-light__accent,.gfx02-lamp-post__cap,.tree-fruit__visual\{animation:none!important\}/);

assert.match(scene, /type="image\/avif"[\s\S]*type="image\/webp"[\s\S]*src=\{dayScene\}/);
assert.match(scene, /founder-canonical-night-no-moon\.png/);
assert.doesNotMatch(scene, /fix6/i);
assert.match(scene, /const targetMode = dynamicSky\.resolvedDayNightMode/);
assert.match(scene, /const visibleMode = loadedModes\.has\(targetMode\) \? targetMode : lastVisibleMode/);
assert.doesNotMatch(hero, /<InstitutionalProjectBand/);
assert.match(app, /<TreeHeroSection mode=\{mode\} preference=\{preference\} preparedMode=\{preparedMode\} \/>[\s\S]*<EcosystemSection \/>/);
assert.match(ecosystemSection, /PROJECT_ORDER = \["academy", "path", "ojcs-connect", "web"\]/);

console.log("OJW-LOT-18-A: calcul solaire saisonnier, confidentialité, timer unique et vie organique validés.");
