import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const scene = readFileSync(join(root, "src/components/TreeScene.tsx"), "utf8");
const optimized = join(root, "src/assets/immersive/founder-canonical/optimized");

for (const mode of ["day", "night-no-moon"]) {
  for (const width of [1586, 1920, 2560, 3172]) {
    for (const format of ["avif", "webp"]) {
      const name = `founder-canonical-${mode}-card-free-hq-${width}.${format}`;
      assert.ok(existsSync(join(optimized, name)), `${name} must exist`);
      assert.match(scene, new RegExp(name.replaceAll(".", "\\.")), `${name} must be imported`);
      assert.match(scene, new RegExp(`\\$\\{[^}]*${width}[^}]*\\} ${width}w`), `${width}w must be declared`);
    }
  }
}

assert.match(scene, /media="\(min-width: 1587px\)"/);
assert.match(scene, /media="\(min-width: 1024px\)"/);
assert.match(scene, /1920w[\s\S]*2560w[\s\S]*3172w/);
assert.match(scene, /1280w[\s\S]*1586w/);
assert.match(scene, /960w/);
assert.doesNotMatch(scene, /card-free-hq-3840/);
assert.doesNotMatch(scene, /1672w/);
assert.match(scene, /sizes="100vw"/);

console.log("OJW Hero Visual Quality GFX-05 high-resolution card-free contract: PASS");
