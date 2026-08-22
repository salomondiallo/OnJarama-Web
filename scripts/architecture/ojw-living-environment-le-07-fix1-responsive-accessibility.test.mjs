import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const headerCss = readFileSync("src/styles/header.css", "utf8");
const treeCss = readFileSync("src/styles/tree.css", "utf8");
const livingEnvironment = readFileSync("src/hooks/useLivingEnvironment.ts", "utf8");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const runtimeContract = `${headerCss}\n${treeCss}\n${livingEnvironment}`;

assert.equal(
  pkg.scripts["test:ojw:living-environment-le-07-fix1"],
  "node scripts/architecture/ojw-living-environment-le-07-fix1-responsive-accessibility.test.mjs",
);
assert.match(
  treeCss,
  /\.day-night-toggle button \{[^}]*min-height:44px;/,
);
assert.doesNotMatch(treeCss, /\.day-night-toggle button\{[^}]*min-height:(?:3\d|4[0-3])px;/);
assert.match(
  headerCss,
  /@media \(max-width: 1023px\)[\s\S]*?\.site-header__ambience \.day-night-toggle button\{min-width:44px;min-height:44px;/,
);
assert.match(
  headerCss,
  /@media \(max-width:430px\)[\s\S]*?\.site-header__ambience \.day-night-toggle button\{min-width:44px;min-height:44px;/,
);
assert.match(livingEnvironment, /useMediaQuery\("\(max-width: 768px\)"\)/);
assert.doesNotMatch(livingEnvironment, /useMediaQuery\("\(max-width: 767px\)"\)/);
assert.match(
  treeCss,
  /\[data-environment-profile="compact"\] \.dynamic-sky__clouds--near,\[data-environment-profile="compact"\] \.scene-bird--three\{display:none\}/,
);
assert.doesNotMatch(treeCss, /@media\(max-width:760px\)\{[^}]*\.scene-bird--three\{display:none\}/);
assert.match(treeCss, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?\.gfx02-life-layers \.scene-bird\{display:none!important\}/);
assert.doesNotMatch(runtimeContract, /IntersectionObserver|requestAnimationFrame|<canvas|WebGLRenderingContext|<video/i);
assert.deepEqual(Object.keys(pkg.dependencies).sort(), ["react", "react-dom", "react-router-dom", "suncalc"]);

console.log("OJW-LIVING-ENVIRONMENT-LE-07-FIX1: 44px ambience targets and the 768px COMPACT boundary are protected.");
