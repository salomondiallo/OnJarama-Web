import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

const scene = read("src/components/TreeScene.tsx");
const hero = read("src/sections/TreeHeroSection.tsx");
const toggle = read("src/components/DayNightToggle.tsx");
const styles = read("src/styles/tree.css");
const app = read("src/App.tsx");
const header = read("src/components/Header.tsx");

assert.doesNotMatch(scene, /setTimeout|setInterval|requestIdleCallback/);
assert.match(scene, /useState<Set<DayNightMode>>\(\(\) => new Set\(\)\)/);
assert.match(scene, /const dayMounted = mode === "day" \|\| preparedMode === "day" \|\| loadedModes\.has\("day"\)/);
assert.match(scene, /const nightMounted = mode === "night" \|\| preparedMode === "night" \|\| loadedModes\.has\("night"\)/);

for (const event of ["onPointerDown", "onTouchStart", "onFocus"]) {
  assert.match(toggle, new RegExp(`${event}=\\{\\(\\) => onPrepare\\(option\\.value\\)\\}`));
}
assert.match(app, /onModePrepare=\{\(next\) => setPreparedMode\(next === "auto" \? mode : next\)\}/);
assert.match(header, /onPrepare=\{onModePrepare\}/);
assert.match(hero, /<TreeScene mode=\{mode\} preference=\{preference\} preparedMode=\{preparedMode\}/);

assert.match(scene, /const visibleMode = loadedModes\.has\(mode\) \? mode : lastVisibleMode/);
assert.match(scene, /onLoad=\{\(\) => markLoaded\("day"\)\}/);
assert.match(scene, /onLoad=\{\(\) => markLoaded\("night"\)\}/);
assert.match(scene, /next\.add\(loadedMode\)/);
assert.match(scene, /tree-scene is-scene-\$\{visibleMode\}/);
assert.match(styles, /\.tree-scene\.is-scene-day \.gfx02-scene-plate--day\{opacity:1\}/);
assert.match(styles, /\.tree-scene\.is-scene-night \.gfx02-scene-plate--night\{opacity:1\}/);

assert.equal((scene.match(/<picture>/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/avif"/g) ?? []).length, 2);
assert.equal((scene.match(/type="image\/webp"/g) ?? []).length, 2);
assert.equal((scene.match(/960w,/g) ?? []).length, 4);
assert.equal((scene.match(/1280w,/g) ?? []).length, 4);
assert.equal((scene.match(/1672w/g) ?? []).length, 4);
assert.equal((scene.match(/sizes="100vw"/g) ?? []).length, 4);
assert.match(scene, /scene-day-treeless-panorama\.png/);
assert.match(scene, /scene-night-treeless-panorama\.png/);
assert.equal((scene.match(/src=\{(?:dayScene|nightScene)\}/g) ?? []).length, 2);
assert.match(scene, /loading=\{mode === "day" \|\| preparedMode === "day" \? "eager" : "lazy"\}/);
assert.match(scene, /loading=\{mode === "night" \|\| preparedMode === "night" \? "eager" : "lazy"\}/);
assert.match(scene, /fetchPriority=\{mode === "day" \|\| preparedMode === "day" \? "high" : "low"\}/);
assert.match(scene, /fetchPriority=\{mode === "night" \|\| preparedMode === "night" \? "high" : "low"\}/);

console.log("OJW-LOT-16-D-FIX7-R1: une seule plaque initiale, préparation événementielle et fondu après chargement validés.");
