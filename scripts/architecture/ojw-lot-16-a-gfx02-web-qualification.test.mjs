import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const scenePath = resolve(root, "src/components/TreeScene.tsx");
const stylesPath = resolve(root, "src/styles/tree.css");
const packagePath = resolve(root, "package.json");
const dayPath = resolve(root, "src/assets/immersive/gfx02/ojw-gfx-02-scene-day.png");
const nightPath = resolve(root, "src/assets/immersive/gfx02/ojw-gfx-02-scene-night-natural-city-lights.png");
const optimizedRoot = resolve(root, "src/assets/immersive/gfx02/optimized");
const institutionalHeroPath = resolve(root, "src/sections/TreeHeroSection.tsx");
const ecosystemSectionPath = resolve(root, "src/sections/EcosystemSection.tsx");

const scene = readFileSync(scenePath, "utf8");
const styles = readFileSync(stylesPath, "utf8");
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));

function pngDimensions(path) {
  const bytes = readFileSync(path);
  assert.equal(bytes.toString("ascii", 1, 4), "PNG", `${path} doit être un PNG.`);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();
}

const optimizedAssets = new Map([
  ["scene-day-1672.avif", "CD2012DD1E1D3B6587B729CE0592B76A3CC38B70A5D12A0739F5011E041C63D8"],
  ["scene-day-1672.webp", "2FAF0833FFA00BE6FCDADE1C6C64FBE8A55D7A261C95B928C6FC3E7B91749F4E"],
  ["scene-day-1280.avif", "AC359416B30FFAF0DBA885876A19D0D847DF304F0528082F46AE20245713D28F"],
  ["scene-day-1280.webp", "25B28DA7D01657881EDFB7A13C9DCC4B20A3BFF8B53814A5832EE2659A774001"],
  ["scene-day-960.avif", "1BE513953F83DA96CF87F1E0F3F7CA3F113871F0ED04EDCBEE529FADDA1409A9"],
  ["scene-day-960.webp", "B20A44C9B824C4A56020116524495A5C9BF5B2CD4E0F04BE7478AD057C2C8AD9"],
  ["scene-night-fix7-1672.avif", "26AC79110BB310DEB67FE9C0EC99C7F6672DF515FCC010ED5C4E4C62C05BCA0C"],
  ["scene-night-fix7-1672.webp", "940B67368FA98BC545703635F145FDD0963782F660EBAF5C7FBAED99A37B3038"],
  ["scene-night-fix7-1280.avif", "DF5AC3A278C14BEA86863FF08AFB3FB5ACA546C084333F64FCAC0C1B21A315B9"],
  ["scene-night-fix7-1280.webp", "4FEBE3D12EC11716414B45F9A343653D81757F77581337F01196287F825B1F06"],
  ["scene-night-fix7-960.avif", "801BE6AB7094C4389899054DAA3F7C9BDCA7D9822D7C1CCF22EDAF99BD379A66"],
  ["scene-night-fix7-960.webp", "C66978CD7B0FFCE9FB9E62DAB63505C45D50EE802B79EFA67C5D0DD8F7902686"],
]);

for (const asset of [dayPath, nightPath]) {
  assert.ok(existsSync(asset), `Plaque GFX-02 absente : ${asset}`);
  assert.deepEqual(pngDimensions(asset), { width: 1672, height: 941 });
}

for (const [name, expectedHash] of optimizedAssets) {
  const path = resolve(optimizedRoot, name);
  assert.ok(existsSync(path), `Asset optimisé absent : ${name}`);
  const bytes = readFileSync(path);
  if (name.endsWith(".avif")) {
    assert.equal(bytes.toString("ascii", 4, 12), "ftypavif", `${name} doit être un AVIF.`);
  } else {
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF", `${name} doit être un conteneur RIFF.`);
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP", `${name} doit être un WebP.`);
  }
  assert.equal(sha256(path), expectedHash, `Empreinte optimisée différente : ${name}`);
}

assert.match(scene, /gfx02-scene-plate--day/);
assert.match(scene, /gfx02-scene-plate--night/);
assert.match(scene, /ojw-gfx-02-scene-night-natural-city-lights\.png/);
assert.doesNotMatch(scene, /from "\.\.\/assets\/immersive\/gfx02\/ojw-gfx-02-scene-night-(?:pre3|no-moon|no-moon-no-tree-rings)\.png"/);
assert.equal((scene.match(/<picture>/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/avif"/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/webp"/g) ?? []).length, 2);
assert.equal((scene.match(/960w,/g) ?? []).length, 4);
assert.equal((scene.match(/1280w,/g) ?? []).length, 4);
assert.equal((scene.match(/1672w/g) ?? []).length, 4);
assert.match(scene, /loading=\{targetMode === "day" \|\| preparedMode === "day" \? "eager" : "lazy"\}/);
assert.match(scene, /loading=\{targetMode === "night" \|\| preparedMode === "night" \? "eager" : "lazy"\}/);
assert.match(scene, /fetchPriority=\{targetMode === "day" \|\| preparedMode === "day" \? "high" : "low"\}/);
assert.match(scene, /fetchPriority=\{targetMode === "night" \|\| preparedMode === "night" \? "high" : "low"\}/);
assert.doesNotMatch(scene, /setTimeout|requestIdleCallback/);
assert.match(scene, /width="1672"/);
assert.match(scene, /height="941"/);
assert.equal((scene.match(/alt=""/g) ?? []).length, 2);
assert.equal((scene.match(/aria-hidden="true"/g) ?? []).length >= 2, true);

assert.match(styles, /\.gfx02-scene-plate\{[^}]*transform:none!important/);
assert.match(styles, /\.gfx02-scene-plate\{[^}]*transition:opacity/);
assert.match(styles, /\.is-day \.gfx02-scene-plate--day\{opacity:1\}/);
assert.match(styles, /\.is-night \.gfx02-scene-plate--night\{opacity:1\}/);
assert.doesNotMatch(styles, /\.gfx02-scene-plate--(?:day|night)[^{]*\{[^}]*(?:translate|scale|rotate)/);

for (const layer of ["gfx02-city-light", "gfx02-lamp-posts"]) {
  assert.ok(scene.includes(layer), `Couche Web absente : ${layer}`);
}
assert.doesNotMatch(scene, /gfx02-tree-light/);
assert.doesNotMatch(styles, /gfx02-tree-light/);
assert.doesNotMatch(styles, /gfx02TreeBreath/);
assert.ok(styles.includes(".is-night .gfx02-city-light"));
assert.ok(styles.includes(".is-night .gfx02-lamp-post"));
assert.equal((scene.match(/className="gfx02-lamp-post"/g) ?? []).length, 1);
assert.equal((scene.match(/className="scene-bird scene-bird--/g) ?? []).length, 3);
assert.equal((scene.match(/<ellipse cx="(?:547|674|781)"/g) ?? []).length, 3);
assert.match(styles, /\.scene-bird--three\{display:none\}/);

const layoutBlock = scene.slice(scene.indexOf("const FRUIT_LAYOUT"), scene.indexOf("const STATE_CLASS"));
for (const id of ["path", "academy", "web", '"ojcs-connect"']) {
  assert.ok(layoutBlock.includes(id), `Fruit absent : ${id}`);
}
assert.equal((layoutBlock.match(/: \{ x:/g) ?? []).length, 4, "Exactement quatre fruits sont attendus.");
assert.ok(scene.includes("tree-fruit__stem"));
const inscriptionBlock = scene.slice(
  scene.indexOf('className="tree-inscription"'),
  scene.indexOf("{fruits.map"),
);
assert.doesNotMatch(inscriptionBlock, /tree-fruit__stem/, "OJF ne doit recevoir aucune tige.");

assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
assert.ok(scene.includes("waterfall__stream"));
assert.doesNotMatch(scene, /className="[^"]*waterfall__mist/);
assert.doesNotMatch(scene, /className="[^"]*waterfall__foam/);
const waterfallBlock = scene.slice(scene.indexOf('className="waterfall"'), scene.indexOf("river-flow__glint"));
assert.doesNotMatch(waterfallBlock, /<ellipse/);
assert.doesNotMatch(styles, /\.gfx02-life-layers \.waterfall__(?:mist|foam)/);
assert.ok(scene.includes("river-flow__glint"));
assert.ok(scene.includes("scene-bird--one"));

assert.ok(scene.includes('className="tree-fruit__visual"'));
for (const [fruit, diameter, angle, mobileLength] of [
  ["path", 34, "4deg", 18],
  ["academy", 34, "-5deg", 17],
  ["web", 37, "2deg", 16],
  ["ojcs-connect", 34, "-4deg", 15],
]) {
  const mobileRule = new RegExp(
    `\\.tree-fruit\\.tree-fruit--${fruit}\\{[^}]*width:44px;height:44px;[^}]*--fruit-diameter:${diameter}px;[^}]*--fruit-radius:[^;]+;[^}]*--stem-angle:${angle};--stem-length:${mobileLength}px;`,
  );
  assert.match(styles, mobileRule, `Configuration mobile incomplète pour ${fruit}.`);
}
for (const position of [
  [".tree-fruit.tree-fruit--path", "left:71.2%!important;top:31.8%!important"],
  [".tree-fruit.tree-fruit--academy", "left:86.1%!important;top:25%!important"],
  [".tree-fruit.tree-fruit--web", "left:71.5%!important;top:49.8%!important"],
  [".tree-fruit.tree-fruit--ojcs-connect", "left:87%!important;top:51.8%!important"],
]) {
  assert.ok(styles.includes(`${position[0]}{${position[1]}`), `Position mobile modifiée : ${position[0]}`);
}
assert.match(styles, /\.tree-fruit__stem\{[^}]*transform-origin:50% 0/);
assert.equal((styles.match(/--stem-angle:(?:-?\d+deg)/g) ?? []).length >= 8, true);
assert.match(styles, /\.tree-inscription\{[^}]*left:76%;top:66%/);
assert.ok(scene.includes('className="tree-inscription"'));
assert.ok(scene.includes('className="gfx02-lamp-posts"'));
assert.doesNotMatch(readFileSync(institutionalHeroPath, "utf8"), /<InstitutionalProjectBand|Cinq projets, une vision commune/);
assert.match(readFileSync(ecosystemSectionPath, "utf8"), /PROJECT_ORDER = \["academy", "path", "ojcs-connect", "web"\]/);

assert.doesNotMatch(scene, /https?:\/\//);
assert.doesNotMatch(styles, /url\(\s*["']?https?:\/\//);
assert.equal(existsSync(resolve(root, "src/assets/immersive/phase1")), false);
assert.deepEqual(Object.keys(packageJson.dependencies), ["react", "react-dom"]);
assert.ok(packageJson.scripts["test:ojw:lot-16-a"]);

console.log("OJW-LOT-16-A: plaques GFX-02, couches Web, interactions et géométrie qualifiées.");
