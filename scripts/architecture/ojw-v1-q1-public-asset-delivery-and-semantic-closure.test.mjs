import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root));
const text = (file) => read(file).toString("utf8");
const sha256 = (file) => createHash("sha256").update(read(file)).digest("hex").toUpperCase();
const findAscii = (buffer, token) => buffer.indexOf(Buffer.from(token, "ascii"));
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

const masters = {
  "src/assets/brand/onjarama-official-logo.png": "6A82FC9EF30F54A96D8DF6B4C555853B10CB5A6D3ECA0D9B0FB78F3EC44AEAAF",
  "src/assets/ecosystem/emblems/oja-emblem-a2.png": "0F4A814E6C3F8C219A19E790A2D091BB0C3EBEB2CE5EAF6F22F2798B21EE3D78",
  "src/assets/ecosystem/emblems/ojp-emblem-a2.png": "EB8D2D42597B078C6EE85B44E17655C7C72681E3D6BC43CAE613EF20B0A62036",
  "src/assets/ecosystem/emblems/ojcs-emblem-a2.png": "CE2817C96C105D0570A626CDE81FDFB872AB084FFC9490295F53DF5B10C2A5B8",
  "src/assets/ecosystem/emblems/ojw-emblem-a2.png": "3E4C23249829B6E2B2214D82229DB0A4226C29FC4C6F3AE20447328B22D9B24A",
  "src/assets/immersive/founder-canonical/founder-canonical-day.png": "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7",
  "src/assets/immersive/founder-canonical/founder-canonical-night-no-moon.png": "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12",
};
for (const [file, expected] of Object.entries(masters)) assert.equal(sha256(file), expected, `${file} must stay immutable`);

for (const width of [64, 128]) {
  for (const format of ["avif", "webp"]) {
    const file = `src/assets/brand/optimized/onjarama-official-logo-${width}.${format}`;
    const buffer = read(file);
    assert.deepEqual(format === "avif" ? avifDimensions(buffer) : webpDimensions(buffer), [width, width]);
    assert.ok(statSync(new URL(file, root)).size < 10_000, `${file} must remain lightweight`);
  }
}

for (const acronym of ["oja", "ojp", "ojcs", "ojw"]) {
  for (const width of [160, 320, 640]) {
    for (const format of ["avif", "webp"]) {
      const file = `src/assets/ecosystem/emblems/optimized/${acronym}-emblem-a2-${width}.${format}`;
      const buffer = read(file);
      assert.deepEqual(format === "avif" ? avifDimensions(buffer) : webpDimensions(buffer), [width, width]);
      assert.ok(statSync(new URL(file, root)).size < 80_000, `${file} must remain lightweight`);
    }
  }
}

const responsiveAssets = text("src/data/responsiveAssets.ts");
const responsiveImage = text("src/components/ResponsiveImage.tsx");
const header = text("src/components/Header.tsx");
const hero = text("src/components/ProjectHero.tsx");
const explorer = text("src/components/PublicProjectExplorer.tsx");
const ecosystemSection = text("src/sections/EcosystemSection.tsx");
const footer = text("src/components/Footer.tsx");
const headerCss = text("src/styles/header.css");
const taxonomy = text("src/data/ecosystem.ts");
const le02 = text("scripts/architecture/ojw-living-environment-le-02-sky-life.test.mjs");
const packageJson = JSON.parse(text("package.json"));

assert.match(responsiveImage, /<picture>/);
assert.match(responsiveImage, /type="image\/avif"/);
assert.match(responsiveImage, /type="image\/webp"/);
assert.match(responsiveAssets, /64w[\s\S]*128w/);
assert.match(responsiveAssets, /160w[\s\S]*320w[\s\S]*640w/);
assert.doesNotMatch(header, /src=\{officialLogo\}/);
assert.doesNotMatch(hero, /src=\{project\.emblem\}/);
assert.doesNotMatch(explorer, /src=\{project\.emblem\}/);
assert.doesNotMatch(ecosystemSection, /src=\{(?:item|webPortalEntity)\.emblem\}/);
assert.match(explorer, /loading="lazy"/);
assert.match(ecosystemSection, /loading="lazy"/);

assert.doesNotMatch(footer, /Nous soutenir/);
assert.match(footer, /Découvrir la mission/);
assert.match(footer, /#mission/);
assert.match(headerCss, /\.skip-link\s*\{[^}]*min-height:\s*44px/);
assert.match(le02, /STATIC_BIRDS_RASTER\s*=\s*"RESOLVED"/);

assert.match(taxonomy, /entityType:\s*"APPLICATION"/);
assert.match(taxonomy, /entityType:\s*"WEB_PORTAL"/);
assert.match(taxonomy, /entityType:\s*"FOUNDATION"/);
assert.match(taxonomy, /publicSoftware/);
assert.equal(packageJson.scripts["test:ojw:v1-q1"], "node scripts/architecture/ojw-v1-q1-public-asset-delivery-and-semantic-closure.test.mjs");

console.log("OJW-V1-Q1: immutable masters, lightweight responsive assets, honest Footer semantics, 44px skip-link and resolved raster birds validated.");
