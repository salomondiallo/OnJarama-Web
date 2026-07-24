import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const scene = readFileSync(resolve(repositoryRoot, "src/components/TreeScene.tsx"), "utf8");
const styles = readFileSync(resolve(repositoryRoot, "src/styles/tree.css"), "utf8");

for (const layer of [
  "waterfall__foam",
  "waterfall__stream",
  "river-flow__glint",
  "scene-bird--one",
  "scene-bird--two",
  "scene-bird--three",
  "tree-canopy",
]) {
  assert.ok(scene.includes(layer), `La couche vivante ${layer} doit exister.`);
}

for (const motion of [
  "@keyframes waterfallFlow",
  "@keyframes foamDrift",
  "@keyframes riverGlint",
  "@keyframes canopyLight",
  "@keyframes birdDriftOne",
  "@keyframes birdDriftTwo",
  "@keyframes birdDriftThree",
]) {
  assert.ok(styles.includes(motion), `Le mouvement ${motion} doit être défini.`);
}

assert.ok(styles.includes("@media(prefers-reduced-motion:reduce)"));
assert.ok(styles.includes(".scene-bird"));
assert.match(styles, /\.tree-fruit\.is-development/);
assert.match(styles, /\.tree-fruit--web/);
assert.match(styles, /\.is-day \.scene-sun/);
assert.match(styles, /\.is-day \.scene-moon/);

console.log("OJW-LOT-14: eau, arbre, oiseaux, fruits, thèmes et mouvement réduit validés.");
