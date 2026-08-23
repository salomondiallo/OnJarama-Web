import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";

const rootUrl = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, rootUrl));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();
const base = "src/assets/immersive/founder-canonical/";
const optimized = `${base}optimized/`;

const protectedSources = {
  [`${base}founder-canonical-day.png`]: "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7",
  [`${base}founder-canonical-night-no-moon.png`]: "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12",
  [`${base}founder-canonical-day-clean.png`]: "85FF35900B7FC2DFBD9A168C49FAA1E8BB3491ECA2885250BA0A51F0478E1D0A",
  [`${base}founder-canonical-night-no-moon-clean.png`]: "FA4167300522CDC9C2D75F17ED84270641CDB12597091690B1F829C917047E1F",
  [`${base}founder-canonical-day-card-free.png`]: "A996FC935B121D9C71C6D01578ED058A2B141A08CE470758495C59C9DF84CE33",
  [`${base}founder-canonical-night-no-moon-card-free.png`]: "6AA6D63E668ED191848AC5C7FEDC29A2E2BD60F5CFCA4DF299C45008A5B5D85A",
};

for (const [file, hash] of Object.entries(protectedSources)) assert.equal(sha256(file), hash, `${file} integrity`);

const findAscii = (buffer, token) => buffer.indexOf(Buffer.from(token, "ascii"));
const pngDimensions = (buffer) => [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
const avifDimensions = (buffer) => {
  assert.match(buffer.subarray(4, 16).toString("ascii"), /ftypavi[fs]/);
  const ispe = findAscii(buffer, "ispe");
  assert.ok(ispe > 0);
  return [buffer.readUInt32BE(ispe + 8), buffer.readUInt32BE(ispe + 12)];
};
const webpDimensions = (buffer) => {
  assert.equal(buffer.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(buffer.subarray(8, 12).toString("ascii"), "WEBP");
  const vp8x = findAscii(buffer, "VP8X");
  if (vp8x > 0) return [1 + buffer.readUIntLE(vp8x + 12, 3), 1 + buffer.readUIntLE(vp8x + 15, 3)];
  const vp8 = findAscii(buffer, "VP8 ");
  assert.ok(vp8 > 0);
  return [buffer.readUInt16LE(vp8 + 14) & 0x3fff, buffer.readUInt16LE(vp8 + 16) & 0x3fff];
};

assert.deepEqual(pngDimensions(read(`${base}founder-canonical-day-card-free.png`)), [1586, 429]);
assert.deepEqual(pngDimensions(read(`${base}founder-canonical-night-no-moon-card-free.png`)), [1586, 464]);

const families = {
  day: { stem: "founder-canonical-day-card-free", heights: { 960: 260, 1280: 346, 1586: 429 } },
  night: { stem: "founder-canonical-night-no-moon-card-free", heights: { 960: 281, 1280: 374, 1586: 464 } },
};

for (const { stem, heights } of Object.values(families)) {
  for (const [width, height] of Object.entries(heights)) {
    for (const format of ["avif", "webp"]) {
      const file = `${optimized}${stem}-${width}.${format}`;
      assert.ok(statSync(new URL(file, rootUrl)).size > 0, `${file} must not be empty`);
      assert.deepEqual(format === "avif" ? avifDimensions(read(file)) : webpDimensions(read(file)), [Number(width), height]);
    }
  }
}

const cardFreeFiles = [
  ...readdirSync(new URL(base, rootUrl)).filter((name) => /card-free\.png$/.test(name)),
  ...readdirSync(new URL(optimized, rootUrl)).filter((name) => /card-free-\d+\.(avif|webp)$/.test(name)),
];
assert.equal(cardFreeFiles.length, 14, "exactly fourteen parallel card-free assets are required");
assert.ok(cardFreeFiles.every((name) => !name.includes("1672")), "1672 and upscaled card-free assets are forbidden");

const scene = text("src/components/TreeScene.tsx");
const hero = text("src/sections/TreeHeroSection.tsx");
assert.match(scene, /founder-canonical-day-card-free\.png/, "the approved switch gate must use the DAY-A card-free source");
assert.match(scene, /founder-canonical-night-no-moon-card-free\.png/, "the approved switch gate must use the NIGHT-B card-free source");
assert.doesNotMatch(hero, /tree-hero__intro tree-hero__intro--option-b/, "the approved switch gate removes the editorial DOM card");
assert.match(scene, /gfx03-sun-system/);
assert.match(scene, /astronomical-celestial__sun/);

console.log("OJW-HERO-SIMPLIFICATION-GFX-03: fourteen card-free derivatives, immutable rollback sources and approved runtime switch validated.");
