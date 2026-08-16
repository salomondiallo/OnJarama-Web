import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";

const rootUrl = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, rootUrl));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();
const base = "src/assets/immersive/founder-canonical/";
const optimized = `${base}optimized/`;

assert.equal(sha256(`${base}founder-canonical-day.png`), "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7");
assert.equal(sha256(`${base}founder-canonical-night-no-moon.png`), "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12");

const dimensions = {
  day: { 960: [960, 260], 1280: [1280, 346], 1586: [1586, 429] },
  "night-no-moon": { 960: [960, 281], 1280: [1280, 374], 1586: [1586, 464] },
};

function findAscii(buffer, token) {
  return buffer.indexOf(Buffer.from(token, "ascii"));
}

function avifDimensions(buffer) {
  assert.match(buffer.subarray(4, 16).toString("ascii"), /ftypavi[fs]/);
  const ispe = findAscii(buffer, "ispe");
  assert.ok(ispe > 0, "AVIF ispe box missing");
  return [buffer.readUInt32BE(ispe + 8), buffer.readUInt32BE(ispe + 12)];
}

function webpDimensions(buffer) {
  assert.equal(buffer.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(buffer.subarray(8, 12).toString("ascii"), "WEBP");
  const vp8x = findAscii(buffer, "VP8X");
  if (vp8x > 0) return [1 + buffer.readUIntLE(vp8x + 12, 3), 1 + buffer.readUIntLE(vp8x + 15, 3)];
  const vp8 = findAscii(buffer, "VP8 ");
  assert.ok(vp8 > 0, "WebP VP8 chunk missing");
  return [buffer.readUInt16LE(vp8 + 14) & 0x3fff, buffer.readUInt16LE(vp8 + 16) & 0x3fff];
}

for (const [variant, widths] of Object.entries(dimensions)) {
  const stem = `founder-canonical-${variant}`;
  for (const [width, expected] of Object.entries(widths)) {
    for (const format of ["avif", "webp"]) {
      const file = `${optimized}${stem}-${width}.${format}`;
      assert.ok(statSync(new URL(file, rootUrl)).size > 0, `${file} must be non-empty`);
      const buffer = read(file);
      const actual = format === "avif" ? avifDimensions(buffer) : webpDimensions(buffer);
      assert.deepEqual(actual, expected, `${file} dimensions`);
    }
  }
}

const scene = text("src/components/TreeScene.tsx");
assert.match(scene, /type="image\/avif"[\s\S]*?960w[\s\S]*?1280w[\s\S]*?1586w/);
assert.match(scene, /type="image\/webp"[\s\S]*?960w[\s\S]*?1280w[\s\S]*?1586w/);
assert.match(scene, /src=\{dayScene\}/);
assert.match(scene, /src=\{nightScene\}/);
assert.doesNotMatch(scene, /1672w/);

console.log("OJW-LIVING-ENVIRONMENT-LE-01-ASSETS: real AVIF/WebP signatures, responsive dimensions, master hashes and PNG fallbacks validated.");
