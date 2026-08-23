import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();

const scene = read("src/components/TreeScene.tsx");
const sceneImports = scene.slice(0, scene.indexOf("import { useMemo"));
const hero = read("src/sections/TreeHeroSection.tsx");
const header = read("src/components/Header.tsx");
const styles = read("src/styles/tree.css");
const pkg = JSON.parse(read("package.json"));
const base = "src/assets/immersive/founder-canonical/";

for (const mode of ["day", "night-no-moon"]) {
  assert.match(scene, new RegExp(`founder-canonical-${mode}-card-free\\.png`));
  for (const width of [960, 1280, 1586]) {
    const qualityTier = width === 1586 ? "(?:hq-)?" : "";
    assert.match(scene, new RegExp(`founder-canonical-${mode}-card-free-${qualityTier}${width}\\.avif`));
    assert.match(scene, new RegExp(`founder-canonical-${mode}-card-free-${qualityTier}${width}\\.webp`));
  }
}
assert.doesNotMatch(sceneImports, /founder-canonical-(?:day|night-no-moon)-clean(?:-|\.png)/);
assert.doesNotMatch(sceneImports, /1672/);

assert.doesNotMatch(hero, /tree-hero__intro|tree-hero__eyebrow|tree-hero__lead|tree-hero__actions|tree-hero__cta/);
assert.doesNotMatch(hero, /Découvrir l’écosystème|Voir la roadmap|immersive-hero-title/);
assert.match(header, /#ecosystem-projects/);
assert.match(header, /#roadmap/);
assert.doesNotMatch(hero, /<a\b|<button\b/);

assert.match(scene, /className="scene-birds"/);
assert.match(styles, /prefers-reduced-motion:reduce[\s\S]*?\.scene-bird/);
assert.match(styles, /\.tree-hero\.is-day[\s\S]*?astronomical-celestial__sun[\s\S]*?display:none!important/);
assert.match(scene, /astronomicalMoonFullyVisible/);
assert.match(scene, /!astronomicalSky && <g className="gfx03-moon-system"/);
assert.doesNotMatch(`${scene}\n${styles}`, /requestAnimationFrame/);

assert.equal(sha256(`${base}founder-canonical-day-card-free.png`), "A996FC935B121D9C71C6D01578ED058A2B141A08CE470758495C59C9DF84CE33");
assert.equal(sha256(`${base}founder-canonical-night-no-moon-card-free.png`), "6AA6D63E668ED191848AC5C7FEDC29A2E2BD60F5CFCA4DF299C45008A5B5D85A");
assert.equal(sha256(`${base}founder-canonical-day.png`), "AB9BF630E4964C09B7EE88CD1DD53B75005A10E8959668897C6E546489E34CD7");
assert.equal(sha256(`${base}founder-canonical-night-no-moon.png`), "B85ED28B4E379C959D148CF12496DF3C16EAA1138A5CB21211B1680CCFA21D12");
assert.equal(Object.keys(pkg.dependencies).length, 4);

console.log("OJW-HERO-SIMPLIFICATION-GFX-04: card-free runtime, absent editorial card, preserved navigation and celestial contracts validated.");
