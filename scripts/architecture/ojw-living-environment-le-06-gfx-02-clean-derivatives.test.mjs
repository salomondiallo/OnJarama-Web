import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";

const rootUrl = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, rootUrl));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();
const base = "src/assets/immersive/founder-canonical/";
const optimized = `${base}optimized/`;

const protectedFiles = {
  [`${base}founder-canonical-day.png`]: "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7",
  [`${base}founder-canonical-night-no-moon.png`]: "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12",
  [`${optimized}founder-canonical-day-960.avif`]: "45413052C0B1C06F8B91CB1133E27D6BC3B44CF0F2C09CD71E14B4FB7CA02914",
  [`${optimized}founder-canonical-day-960.webp`]: "870D64E8ED4B2C9CD0848AD3990A2329B4D054793F1BD24500BACB7A6B0D3E74",
  [`${optimized}founder-canonical-day-1280.avif`]: "3D370C5245D2AA1D11508C40F22DB3DB91C2A737F65412682A62349E5CE83BFB",
  [`${optimized}founder-canonical-day-1280.webp`]: "C06A2E54ADE10FC3F18FD64F086CA4615880AF02A0414B2E11A98B27AA938E12",
  [`${optimized}founder-canonical-day-1586.avif`]: "F44DF5D604651DA325227FF5F6A420A92B89DA2BA9DADE0913C328A4CAFF9130",
  [`${optimized}founder-canonical-day-1586.webp`]: "C5694048FF6CF382EAE299A65AFDDF1EAAB27366C980A78C475930E606CCB578",
  [`${optimized}founder-canonical-night-no-moon-960.avif`]: "9BB81FCD79B95552D2278616567BD0AC8CCFF9070107B7AA3AD116345DD88DFE",
  [`${optimized}founder-canonical-night-no-moon-960.webp`]: "35B41305FCDC8D3DFA764E9C3E15FDE30ED9179A1CBFCBB2FB5C849DFAC42CF3",
  [`${optimized}founder-canonical-night-no-moon-1280.avif`]: "9E640AE47A142D8A6422CF3FD2F88475CAC207CCE7D98E9810DF0848EC2494CD",
  [`${optimized}founder-canonical-night-no-moon-1280.webp`]: "2ECCBA2BD3FC75E1AB40B48935FB28306D007B278574117F25DAEAE6EF1BFB2E",
  [`${optimized}founder-canonical-night-no-moon-1586.avif`]: "E075C14825F24294B8BD565AEF5ED0A19B781586166945E665EE3A66C704E7CB",
  [`${optimized}founder-canonical-night-no-moon-1586.webp`]: "977B0A34D6D02950D4CC3BECE5E7C081FFE8321D79ED768AC4EE81942449D8F8",
};

for (const [file, expected] of Object.entries(protectedFiles)) assert.equal(sha256(file), expected, `${file} must remain unchanged`);

const cleanSources = {
  day: { file: `${base}founder-canonical-day-clean.png`, hash: "85FF35900B7FC2DFBD9A168C49FAA1E8BB3491ECA2885250BA0A51F0478E1D0A", dimensions: [1586, 429] },
  night: { file: `${base}founder-canonical-night-no-moon-clean.png`, hash: "FA4167300522CDC9C2D75F17ED84270641CDB12597091690B1F829C917047E1F", dimensions: [1586, 464] },
};

function findAscii(buffer, token) { return buffer.indexOf(Buffer.from(token, "ascii")); }
function pngDimensions(buffer) { assert.equal(buffer.subarray(1, 4).toString("ascii"), "PNG"); return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)]; }
function avifDimensions(buffer) { assert.match(buffer.subarray(4, 16).toString("ascii"), /ftypavi[fs]/); const ispe = findAscii(buffer, "ispe"); assert.ok(ispe > 0); return [buffer.readUInt32BE(ispe + 8), buffer.readUInt32BE(ispe + 12)]; }
function webpDimensions(buffer) { assert.equal(buffer.subarray(0, 4).toString("ascii"), "RIFF"); assert.equal(buffer.subarray(8, 12).toString("ascii"), "WEBP"); const vp8x = findAscii(buffer, "VP8X"); if (vp8x > 0) return [1 + buffer.readUIntLE(vp8x + 12, 3), 1 + buffer.readUIntLE(vp8x + 15, 3)]; const vp8 = findAscii(buffer, "VP8 "); assert.ok(vp8 > 0); return [buffer.readUInt16LE(vp8 + 14) & 0x3fff, buffer.readUInt16LE(vp8 + 16) & 0x3fff]; }

for (const source of Object.values(cleanSources)) {
  assert.equal(sha256(source.file), source.hash);
  assert.deepEqual(pngDimensions(read(source.file)), source.dimensions);
}

const expected = {
  day: { stem: "founder-canonical-day-clean", heights: { 960: 260, 1280: 346, 1586: 429 } },
  night: { stem: "founder-canonical-night-no-moon-clean", heights: { 960: 281, 1280: 374, 1586: 464 } },
};

for (const { stem, heights } of Object.values(expected)) {
  for (const [width, height] of Object.entries(heights)) {
    for (const format of ["avif", "webp"]) {
      const file = `${optimized}${stem}-${width}.${format}`;
      assert.ok(statSync(new URL(file, rootUrl)).size > 0);
      const dimensions = format === "avif" ? avifDimensions(read(file)) : webpDimensions(read(file));
      assert.deepEqual(dimensions, [Number(width), height], `${file} dimensions`);
    }
  }
}

const cleanFiles = [
  ...readdirSync(new URL(base, rootUrl)).filter((name) => /clean\.png$/.test(name)),
  ...readdirSync(new URL(optimized, rootUrl)).filter((name) => /clean-\d+\.(avif|webp)$/.test(name)),
];
assert.equal(cleanFiles.length, 14, "exactly fourteen clean parallel assets are required");
assert.ok(cleanFiles.every((name) => !name.includes("1672")), "1672 clean assets are forbidden");

const scene = text("src/components/TreeScene.tsx");
assert.match(scene, /founder-canonical-day-clean\.png/, "approved clean source must remain available to the runtime switch gate");
assert.match(scene, /founder-canonical-night-no-moon-clean\.png/, "approved clean source must remain available to the runtime switch gate");

console.log("OJW-LIVING-ENVIRONMENT-LE-06-GFX-02: fourteen clean assets, immutable masters and preserved legacy rollback derivatives validated.");
