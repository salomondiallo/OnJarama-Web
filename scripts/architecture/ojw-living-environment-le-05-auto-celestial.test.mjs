import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getMoonIllumination, getMoonPosition, getPosition } from "suncalc";
import {
  CIVIL_TWILIGHT_ALTITUDE_DEGREES,
  HERO_HORIZONTAL_FOV_DEGREES,
  LOCATION_PRECISION_DEGREES,
  buildMoonIlluminationPath,
  resolveAstronomicalMoonPhase,
  resolveAstronomicalSky,
  resolveEquatorFacingHeading,
  roundToQuarterDegree,
} from "../../src/lib/astronomicalSky.ts";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const astronomy = readFileSync("src/lib/astronomicalSky.ts", "utf8");
const locationHook = readFileSync("src/hooks/useLocalCelestialLocation.ts", "utf8");
const environment = readFileSync("src/hooks/useLivingEnvironment.ts", "utf8");
const scene = readFileSync("src/components/TreeScene.tsx", "utf8");
const control = readFileSync("src/components/LocalSkyControl.tsx", "utf8");
const css = readFileSync("src/styles/tree.css", "utf8");
const runtime = `${astronomy}\n${locationHook}\n${environment}\n${scene}\n${control}`;

assert.equal(pkg.dependencies.suncalc, "2.0.1");
assert.equal(lock.packages["node_modules/suncalc"].version, "2.0.1");
assert.deepEqual(Object.keys(lock.packages["node_modules/suncalc"].dependencies ?? {}), []);
assert.equal(LOCATION_PRECISION_DEGREES, 0.25);
assert.equal(CIVIL_TWILIGHT_ALTITUDE_DEGREES, -6);
assert.equal(HERO_HORIZONTAL_FOV_DEGREES, 180);
assert.equal(roundToQuarterDegree(45.5019), 45.5);
assert.equal(roundToQuarterDegree(-73.5674), -73.5);
assert.equal(resolveEquatorFacingHeading(9.5), 180);
assert.equal(resolveEquatorFacingHeading(-33.75), 0);

const cases = [
  { name: "Montreal", latitude: 45.5, longitude: -73.5, timestamp: Date.parse("2026-06-21T16:00:00Z") },
  { name: "Conakry", latitude: 9.5, longitude: -13.75, timestamp: Date.parse("2026-03-20T12:00:00Z") },
  { name: "Sydney", latitude: -33.75, longitude: 151.25, timestamp: Date.parse("2026-12-21T02:00:00Z") },
];
for (const item of cases) {
  const resolved = resolveAstronomicalSky({ ...item, profile: "STANDARD" });
  const date = new Date(item.timestamp);
  const sun = getPosition(date, item.latitude, item.longitude);
  const moon = getMoonPosition(date, item.latitude, item.longitude);
  const illumination = getMoonIllumination(date);
  assert.equal(resolved.solarAltitude, sun.altitude, `${item.name} sun altitude`);
  assert.equal(resolved.solarAzimuth, sun.azimuth, `${item.name} sun azimuth`);
  assert.equal(resolved.moonAltitude, moon.altitude, `${item.name} moon altitude`);
  assert.equal(resolved.moonAzimuth, moon.azimuth, `${item.name} moon azimuth`);
  assert.equal(resolved.moonIllumination, illumination.fraction, `${item.name} moon illumination`);
  assert.equal(resolved.moonOrientation, illumination.angle - moon.parallacticAngle, `${item.name} moon orientation`);
}

const montrealDay = Array.from({ length: 145 }, (_, index) => resolveAstronomicalSky({
  timestamp: Date.parse("2026-06-21T00:00:00Z") + index * 10 * 60_000,
  latitude: 45.5,
  longitude: -73.5,
  profile: "STANDARD",
}));
assert.ok(montrealDay.some((state) => state.solarAltitude > 0));
assert.ok(montrealDay.some((state) => state.solarAltitude <= 0 && state.solarAltitude > -6 && !state.sunVisible && state.localSkyMode === "DAY"));
assert.ok(montrealDay.some((state) => state.solarAltitude <= -6 && state.localSkyMode === "NIGHT"));

const lunarScan = Array.from({ length: 30 * 24 * 2 }, (_, index) => resolveAstronomicalSky({
  timestamp: Date.parse("2026-01-01T00:00:00Z") + index * 30 * 60_000,
  latitude: 45.5,
  longitude: -73.5,
  profile: "STANDARD",
}));
assert.ok(lunarScan.some((state) => state.moonVisible && state.moonAltitude > 0));
assert.ok(lunarScan.some((state) => state.moonAltitude <= 0 && !state.moonVisible));
assert.ok(lunarScan.some((state) => state.moonAltitude > 0 && state.moonIllumination > 0.005 && !state.moonVisible), "Moon above horizon but outside 180° FOV must be hidden");
assert.notEqual(cases[0].latitude >= 0, cases[2].latitude >= 0);
assert.notEqual(
  resolveAstronomicalSky({ ...cases[0], profile: "STANDARD" }).moonOrientation,
  resolveAstronomicalSky({ ...cases[2], profile: "STANDARD" }).moonOrientation,
);

assert.equal(resolveAstronomicalMoonPhase(0), "NEW");
assert.equal(resolveAstronomicalMoonPhase(0.12), "WAXING_CRESCENT");
assert.equal(resolveAstronomicalMoonPhase(0.25), "FIRST_QUARTER");
assert.equal(resolveAstronomicalMoonPhase(0.4), "WAXING_GIBBOUS");
assert.equal(resolveAstronomicalMoonPhase(0.5), "FULL");
assert.equal(resolveAstronomicalMoonPhase(0.65), "WANING_GIBBOUS");
assert.equal(resolveAstronomicalMoonPhase(0.75), "LAST_QUARTER");
assert.equal(resolveAstronomicalMoonPhase(0.88), "WANING_CRESCENT");
assert.equal(buildMoonIlluminationPath(0), "");
assert.notEqual(buildMoonIlluminationPath(0.25), buildMoonIlluminationPath(0.75));

assert.match(astronomy, /sun\.altitude > CIVIL_TWILIGHT_ALTITUDE_DEGREES/);
assert.match(astronomy, /sun\.altitude > CELESTIAL_HORIZON_DEGREES/);
assert.match(environment, /astronomicalSky \? astronomicalSky\.localSkyMode/);
assert.match(scene, /data-sun-visible/);
assert.match(scene, /data-moon-visible/);
assert.match(css, /astronomical-celestial__moon\{width:28px/);
assert.match(css, /@media\(max-width:760px\)\{\.astronomical-celestial__moon\{width:20px/);
assert.match(locationHook, /navigator\.geolocation\.getCurrentPosition/);
assert.doesNotMatch(locationHook, /useEffect|watchPosition/);
assert.match(locationHook, /roundToQuarterDegree\(coords\.latitude\)/);
assert.match(locationHook, /roundToQuarterDegree\(coords\.longitude\)/);
assert.match(locationHook, /removeItem\(CELESTIAL_LOCATION_STORAGE_KEY\)/);
assert.match(locationHook, /import\.meta\.env\.DEV/);
assert.match(locationHook, /celestial-location/);
assert.match(control, /Synchroniser avec mon ciel local/);
assert.match(control, /aria-expanded/);
assert.doesNotMatch(runtime, /fetch\(|XMLHttpRequest|sendBeacon|WebSocket|Weather API|OpenWeather|navigator\.geolocation\.watchPosition/i);

console.log("OJW-LIVING-ENVIRONMENT-LE-05: local SunCalc astronomy, coarse opt-in location, privacy, fallback and dual-celestial contracts validated.");
