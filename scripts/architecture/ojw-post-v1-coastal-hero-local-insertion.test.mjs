import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const assetRoot = join(root, "src/assets/immersive/post-v1/coastal-hero");
const optimizedRoot = join(assetRoot, "optimized");
const scene = readFileSync(join(root, "src/components/TreeScene.tsx"), "utf8");
const css = readFileSync(join(root, "src/styles/tree.css"), "utf8");

const masters = {
  day: ["coastal-hero-day-3840.png", "42c9e1812dc696357000c8f2a9472f869fec6c3f91b3cc604457d7ade5169321"],
  night: ["coastal-hero-night-3840.png", "ea85ffeeb1ec6bd3883d86b1ddd9af29c558aeb73a77309b8153bf0a86283ad6"],
};

for (const [mode, [name, expectedHash]] of Object.entries(masters)) {
  const contents = readFileSync(join(assetRoot, name));
  assert.equal(createHash("sha256").update(contents).digest("hex"), expectedHash, `${mode} master must remain exact`);
  assert.equal(contents.readUInt32BE(16), 3840, `${mode} master width must be 3840`);
  assert.equal(contents.readUInt32BE(20), 2161, `${mode} master height must be 2161`);
  assert.match(scene, new RegExp(name.replaceAll(".", "\\.")), `${mode} master must be the PNG fallback`);
}

for (const mode of ["day", "night"]) {
  for (const width of [960, 1280, 1586, 1920, 2560, 3840]) {
    for (const format of ["avif", "webp"]) {
      const name = `coastal-hero-${mode}-${width}.${format}`;
      assert.ok(existsSync(join(optimizedRoot, name)), `${name} must exist`);
      assert.match(scene, new RegExp(name.replaceAll(".", "\\.")), `${name} must be imported`);
      assert.match(scene, new RegExp(`\\$\\{[^}]*${width}[^}]*\\} ${width}w`), `${width}w must be declared`);
    }
  }
}

assert.match(scene, /data-post-v1-coastal-hero/);
assert.doesNotMatch(scene, /mobile-framing/);
assert.match(scene, /width="3840"[\s\S]*height="2161"/);
assert.doesNotMatch(scene, /post-v1[\s\S]{0,160}1672w/);
assert.match(css, /tree-hero__panorama:has\(\.tree-scene\[data-post-v1-coastal-hero\]\)\{aspect-ratio:3840\/2161\}/);
assert.match(css, /tree-scene\[data-post-v1-coastal-hero\] \.gfx02-scene-plate\{object-fit:contain;object-position:center center\}/);
assert.match(css, /@media\(max-width:767px\)[\s\S]*data-post-v1-coastal-hero[\s\S]*height:280px[\s\S]*object-fit:cover;object-position:70% center/);
assert.match(css, /tree-scene\[data-post-v1-coastal-hero\] \.dynamic-sky[\s\S]*\.astronomical-celestial[\s\S]*\.gfx03-moon-system[\s\S]*display:none!important/);

console.log("OJW post-V1 coastal Hero local insertion contract: PASS");
