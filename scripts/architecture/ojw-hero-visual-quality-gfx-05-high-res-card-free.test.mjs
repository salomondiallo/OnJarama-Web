import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const scene = readFileSync(join(root, "src/components/TreeScene.tsx"), "utf8");
const optimized = join(root, "src/assets/immersive/post-v1/coastal-hero/optimized");

for (const mode of ["day", "night"]) {
  for (const width of [1586, 1920, 2560, 3840]) {
    for (const format of ["avif", "webp"]) {
      const name = `coastal-hero-${mode}-${width}.${format}`;
      assert.ok(existsSync(join(optimized, name)), `${name} must exist`);
      assert.match(scene, new RegExp(name.replaceAll(".", "\\.")), `${name} must be imported`);
      assert.match(scene, new RegExp(`\\$\\{[^}]*${width}[^}]*\\} ${width}w`), `${width}w must be declared`);
    }
  }
}

assert.match(scene, /1920w[\s\S]*2560w[\s\S]*3840w/);
assert.match(scene, /1280w[\s\S]*1586w/);
assert.match(scene, /960w/);
assert.doesNotMatch(scene, /1672w/);
assert.match(scene, /sizes="100vw"/);

console.log("OJW Hero Visual Quality GFX-05 high-resolution card-free contract: PASS");
