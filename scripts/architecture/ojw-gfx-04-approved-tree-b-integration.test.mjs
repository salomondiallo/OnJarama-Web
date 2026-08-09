import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const scene = read("src/components/TreeScene.tsx");
const styles = read("src/styles/tree.css");
const solar = read("src/utils/solarDayNight.ts");
const hook = read("src/hooks/useDayNightMode.ts");

const assets = {
  day: ["src/assets/immersive/founder-canonical/founder-canonical-day.png", "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7", 1586, 429],
  night: ["src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png", "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12", 1586, 464],
};

for (const [mode, [file, sha256, width, height]] of Object.entries(assets)) {
  const absolute = resolve(root, file);
  assert.ok(existsSync(absolute), `Plaque ${mode} GFX-04-R2 absente.`);
  const data = readFileSync(absolute);
  assert.equal(createHash("sha256").update(data).digest("hex").toUpperCase(), sha256);
  assert.equal(data.readUInt32BE(16), width);
  assert.equal(data.readUInt32BE(20), height);
}

assert.match(scene, /assets\/immersive\/founder-canonical\/founder-canonical-day\.png/);
assert.match(scene, /assets\/immersive\/founder-canonical\/founder-canonical-night-no-moon\.png/);
assert.match(scene, /data-gfx04-r2-treeless/);
assert.equal((scene.match(/<picture>/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/avif"/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/webp"/g) ?? []).length, 2);
assert.match(styles, /\.tree-scene\[data-gfx03-scene\] \.gfx02-scene-plate\{[^}]*object-fit:cover[^}]*object-position:center bottom/);
assert.match(styles, /\[data-gfx04-r2-treeless\] \.gfx03-tree-blend,[\s\S]*\.gfx03-root-integration\{display:none\}/);
assert.match(scene, /className="gfx03-sun-system" style=\{\{ transform:/);
assert.match(scene, /className="gfx03-moon-system" style=\{\{ transform:/);
assert.match(styles, /@keyframes gfx04R2SunArc/);
assert.match(styles, /@keyframes gfx04R2MoonArc/);
assert.match(styles, /prefers-reduced-motion:reduce[\s\S]*animation:none!important/);
assert.match(solar, /resolveLocalCelestialState/);
assert.doesNotMatch(hook, /navigator\.(?:geolocation|permissions)/);
assert.match(scene, /className="gfx03-lamp-path-light"/);
assert.match(styles, /\[data-gfx04-r2-treeless\] \.gfx03-lamp-path-light,[\s\S]*display:none!important/);
assert.match(styles, /\.tree-scene\[data-gfx03-scene\] \.tree-fruit\{[\s\S]*display:none/);

console.log("OJW-GFX-04-R2: panorama sans arbre, cycle celeste local, lanternes et responsive valides.");
