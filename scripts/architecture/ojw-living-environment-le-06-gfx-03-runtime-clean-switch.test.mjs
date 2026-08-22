import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const rootUrl = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, rootUrl));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();
const exists = (file) => existsSync(new URL(file, rootUrl));
const base = "src/assets/immersive/founder-canonical/";
const optimized = `${base}optimized/`;
const scene = text("src/components/TreeScene.tsx");
const css = text("src/styles/tree.css");
const livingEnvironment = text("src/hooks/useLivingEnvironment.ts");

assert.equal(sha256(`${base}founder-canonical-day.png`), "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7");
assert.equal(sha256(`${base}founder-canonical-night-no-moon.png`), "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12");
assert.equal(sha256(`${base}founder-canonical-day-clean.png`), "85FF35900B7FC2DFBD9A168C49FAA1E8BB3491ECA2885250BA0A51F0478E1D0A");
assert.equal(sha256(`${base}founder-canonical-night-no-moon-clean.png`), "FA4167300522CDC9C2D75F17ED84270641CDB12597091690B1F829C917047E1F");

for (const variant of ["day", "night-no-moon"]) {
  assert.match(scene, new RegExp(`founder-canonical-${variant}-clean\\.png`));
  for (const width of [960, 1280, 1586]) {
    for (const format of ["avif", "webp"]) {
      assert.match(scene, new RegExp(`founder-canonical-${variant}-clean-${width}\\.${format}`));
      assert.ok(exists(`${optimized}founder-canonical-${variant}-clean-${width}.${format}`));
      assert.ok(exists(`${optimized}founder-canonical-${variant}-${width}.${format}`), "rollback asset must remain present");
    }
  }
}

assert.equal((scene.match(/type="image\/avif"/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/webp"/g) ?? []).length, 2);
assert.equal((scene.match(/960w,/g) ?? []).length, 4);
assert.equal((scene.match(/1280w,/g) ?? []).length, 4);
assert.equal((scene.match(/1586w/g) ?? []).length, 4);
assert.doesNotMatch(scene, /1672w/);

assert.match(scene, /scene-bird--one/);
assert.match(scene, /scene-bird--two/);
assert.match(scene, /scene-bird--three/);
assert.match(css, /\[data-environment-profile="compact"\][^}]*\.scene-bird--three\{display:none\}/);
assert.match(css, /\.gfx02-life-layers \.scene-bird\{display:none!important\}/);
assert.match(livingEnvironment, /useMediaQuery\("\(max-width: 768px\)"\)/);

console.log("OJW-LIVING-ENVIRONMENT-LE-06-GFX-03: clean AVIF/WebP/PNG runtime switch, rollback assets, runtime birds, reduced motion and LE-07 boundary validated.");
