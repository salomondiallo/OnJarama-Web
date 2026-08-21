import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildMoonIlluminationGeometry,
  resolveAstronomicalMoonPhase,
} from "../../src/lib/astronomicalSky.ts";

const scene = readFileSync("src/components/TreeScene.tsx", "utf8");
const css = readFileSync("src/styles/tree.css", "utf8");

const phaseCases = [
  [0, "NEW", 0, "NONE"],
  [0.125, "WAXING_CRESCENT", 0.146447, "RIGHT"],
  [0.25, "FIRST_QUARTER", 0.5, "RIGHT"],
  [0.375, "WAXING_GIBBOUS", 0.853553, "RIGHT"],
  [0.5, "FULL", 1, "FULL"],
  [0.625, "WANING_GIBBOUS", 0.853553, "LEFT"],
  [0.75, "LAST_QUARTER", 0.5, "LEFT"],
  [0.875, "WANING_CRESCENT", 0.146447, "LEFT"],
];

for (const [phase, family, fraction, brightSide] of phaseCases) {
  const geometry = buildMoonIlluminationGeometry(phase);
  assert.equal(resolveAstronomicalMoonPhase(phase), family);
  assert.ok(Math.abs(geometry.illuminatedFraction - fraction) < 0.000001, `${family} illumination geometry`);
  assert.equal(geometry.brightSide, brightSide, `${family} bright side`);
  if (family === "NEW") assert.equal(geometry.path, "");
  else assert.ok(geometry.path.endsWith(" Z"), `${family} path must be closed`);
}

const firstQuarter = buildMoonIlluminationGeometry(0.25);
const lastQuarter = buildMoonIlluminationGeometry(0.75);
assert.notEqual(firstQuarter.path, lastQuarter.path);
assert.equal(Math.min(...firstQuarter.points.map(([x]) => x)), 16);
assert.equal(Math.max(...lastQuarter.points.map(([x]) => x)), 16);
assert.match(scene, /clipPath id="astronomicalMoonDisc"/);
assert.match(scene, /clipPath="url\(#astronomicalMoonDisc\)"/);
assert.match(scene, /astronomical-celestial__moon-rim/);
assert.match(scene, /astronomicalMoonPreview \? 49\.113 : -astronomicalSky\.moonOrientation/);
assert.match(scene, /import\.meta\.env\.DEV \? searchParams\?\.get\("moon-phase-preview"\)/);
assert.match(css, /astronomical-celestial__moon\{width:28px;height:28px/);
assert.match(css, /astronomical-celestial__moon-earthshine\{fill:#263844;opacity:\.72\}/);
assert.match(css, /@media\(max-width:760px\)\{\.astronomical-celestial__moon\{width:20px;height:20px/);
assert.doesNotMatch(`${scene}\n${css}`, /canvas|webgl|requestAnimationFrame/i);

console.log("OJW-LIVING-ENVIRONMENT-LE-05-FIX1: circular lunar disc, eight phase families, orientation and fixed diameter validated.");
