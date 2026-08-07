import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const scene = read("src/components/TreeScene.tsx");
const styles = read("src/styles/tree.css");

const assets = {
  day: {
    file: "src/assets/immersive/gfx03/scene-day-tree-b-lamps-physically-off.png",
    sha256: "B1902851361CC1E2F62868922FF34D32F3F41E879666EF6D7DD480A02DC572D8",
  },
  night: {
    file: "src/assets/immersive/gfx03/scene-night-tree-b-lamps-physical-fix1.png",
    sha256: "8BFCD438E6E70072E637F2355523BD2B746A4615CCBA5FB4D5978398E207EA5B",
  },
};

for (const [mode, asset] of Object.entries(assets)) {
  const absolute = resolve(root, asset.file);
  assert.ok(existsSync(absolute), `Plaque ${mode} GFX-03-G absente.`);
  const data = readFileSync(absolute);
  assert.equal(createHash("sha256").update(data).digest("hex").toUpperCase(), asset.sha256);
  assert.equal(data.readUInt32BE(16), 1672);
  assert.equal(data.readUInt32BE(20), 941);

}

assert.match(scene, /assets\/immersive\/gfx03\/scene-day-tree-b-lamps-physically-off\.png/);
assert.match(scene, /assets\/immersive\/gfx03\/scene-night-tree-b-lamps-physical-fix1\.png/);
assert.doesNotMatch(scene, /optimized\/scene-(?:day|night)-tree-b/);
assert.equal((scene.match(/type="image\/avif"/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/webp"/g) ?? []).length, 2);
assert.match(styles, /\.tree-scene\[data-gfx03-scene\] \.gfx02-lamp-posts[\s\S]*display:none/);
assert.match(scene, /data-gfx03-scene/);
assert.match(scene, /data-gfx03-fruit-zones/);

for (const [project, x, y] of [
  ["academy", "64.29", "29.97"],
  ["path", "73.03", "20.09"],
  ['"ojcs-connect"', "82.18", "24.44"],
  ["web", "90.19", "34.33"],
]) {
  assert.ok(scene.includes(`${project}: { x: ${x}, y: ${y} }`), `Zone ${project} incorrecte.`);
}

for (const project of ["OJA", "OJP", "OJCS", "OJW"]) {
  assert.ok(scene.includes(`project: "${project}"`), `Ancre ${project} absente.`);
}

assert.match(
  styles,
  /\.tree-scene\[data-gfx03-scene\] \.gfx02-scene-plate\{[^}]*object-fit:cover[^}]*object-position:center bottom/,
);
assert.match(
  styles,
  /\.tree-scene\[data-gfx03-scene\] \.tree-fruit\{[\s\S]*display:none/,
);
assert.match(styles, /\.gfx03-fruit-zones\{[^}]*visibility:hidden/);
assert.match(styles, /\.gfx03-fruit-zone\{/);
assert.match(scene, /className="gfx03-sun-refinement gfx03-sun-halo"/);
assert.match(scene, /className="gfx02-moon-refinement"/);
assert.match(scene, /className="gfx03-root-contact"/);
assert.match(scene, /className="gfx03-sun-system"/);
assert.match(scene, /className="gfx03-moon-system"/);
assert.doesNotMatch(scene, /gfx03-moon-mark/);
assert.match(scene, /<feTurbulence type="fractalNoise"[^>]*numOctaves="4"[^>]*seed="14"/);
assert.match(scene, /filter="url\(#gfx03MoonTexture\)"/);
assert.match(scene, /className="gfx03-root-integration"/);
assert.match(scene, /className="gfx03-tree-atmosphere gfx03-tree-atmosphere--day"/);
assert.match(scene, /className="gfx03-tree-atmosphere gfx03-tree-atmosphere--night"/);
assert.match(scene, /className="gfx03-root-foreground"/);
assert.equal((scene.match(/className="gfx03-root-moss/g) ?? []).length, 3);
assert.match(scene, /className="gfx03-tree-blend"/);
assert.match(scene, /className="gfx03-tree-blend__canopy"/);
assert.match(scene, /className="gfx03-tree-blend__base"/);
assert.match(
  styles,
  /\.tree-scene\[data-gfx03-scene\] \.gfx02-life-layers \.waterfall,[\s\S]*display:none/,
);
assert.match(styles, /\.tree-hero\.is-day \.gfx03-sun-system\{/);
assert.match(styles, /\.tree-hero\.is-night \.gfx03-moon-system\{/);
assert.match(styles, /\.gfx03-root-contact\{/);
assert.match(styles, /\.gfx03-root-foreground\{/);
assert.match(styles, /\.gfx03-tree-blend\{/);
assert.match(styles, /backdrop-filter:blur\(\.55px\) saturate\(\.84\) contrast\(\.9\) sepia\(\.025\)/);
assert.match(scene, /className="gfx03-root-soil"/);
assert.match(scene, /className="gfx03-root-stone"/);
assert.match(styles, /\.tree-hero\.is-day \.gfx03-tree-atmosphere--day\{/);
assert.match(styles, /width:102\.5%/);

console.log("OJW-GFX-04: plaques Tree B, toggle différé, responsive et zones futures validés.");
