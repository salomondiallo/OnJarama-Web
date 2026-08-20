import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const scene = readFileSync("src/components/TreeScene.tsx", "utf8");
const hero = readFileSync("src/sections/TreeHeroSection.tsx", "utf8");
const css = readFileSync("src/styles/tree.css", "utf8");
const sky = readFileSync("src/utils/dynamicSky.ts", "utf8");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const runtime = `${scene}\n${css}\n${sky}`;
const sha = (path) => createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();

assert.match(scene, /className="dynamic-sky living-atmosphere"/);
assert.match(scene, /data-rain-active=/);
assert.match(scene, /data-ambient-mist=/);
assert.equal((scene.match(/living-atmosphere__rain living-atmosphere__rain--/g) ?? []).length, 3);
assert.match(scene, /living-atmosphere__mist/);
assert.match(scene, /className="dynamic-sky living-atmosphere"[\s\S]*aria-hidden="true"/);
assert.match(css, /\.living-atmosphere\{pointer-events:none\}/);
assert.match(css, /le04RainFar/);
assert.match(css, /le04RainMid/);
assert.match(css, /le04RainNear/);
assert.match(css, /le04AmbientMist/);
assert.match(css, /@media\(max-width:900px\)[^{]*\{[^}]*\.living-atmosphere__rain--near\{display:none\}/);
assert.match(css, /data-atmosphere-profile="compact"/);
assert.match(css, /@media\(prefers-reduced-motion:reduce\)[^{]*\{[^}]*\.living-atmosphere__rain\{display:none!important/);
assert.match(scene, /className="living-water"/);
assert.match(scene, /dynamic-sky__clouds--far/);
assert.match(hero, /href="#ecosystem-projects"/);
assert.match(hero, /href="#roadmap"/);
assert.doesNotMatch(runtime, /navigator\.geolocation|VITE_WEATHER_|OpenWeather|WeatherKit|Meteostat|requestAnimationFrame|<canvas|<video|WebGLRenderingContext/i);
assert.doesNotMatch(`${scene}\n${css}`, /snowflake|flurry|winter precipitation/i);
assert.deepEqual(Object.keys(pkg.dependencies).sort(), ["react", "react-dom", "react-router-dom"]);
assert.equal(sha("src/assets/immersive/founder-canonical/founder-canonical-day.png"), "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7");
assert.equal(sha("src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png"), "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12");

console.log("OJW-LIVING-ENVIRONMENT-LE-04: decorative multi-depth rain, ambient mist, compact and reduced-motion contracts validated.");
