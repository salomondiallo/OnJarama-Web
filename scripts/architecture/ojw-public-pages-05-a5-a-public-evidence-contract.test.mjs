import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const contract = read("docs/OJW-PUBLIC-PAGES-05-A5-A-PUBLIC-EVIDENCE-CONTRACT.md");
const packageJson = JSON.parse(read("package.json"));
const normalized = contract.normalize("NFC").replace(/\s+/g, " ");
const includes = (text) => assert.ok(normalized.includes(text), `Contract must include: ${text}`);

for (const visualClass of [
  "AUTHENTIC_PRODUCT_CAPTURE",
  "CONCEPTUAL_ILLUSTRATION",
  "INSTITUTIONAL_DIAGRAM",
  "DECORATIVE_VISUAL",
]) {
  includes(visualClass);
}

for (const protectedDoctrine of [
  "faux screenshots",
  "faux utilisateurs",
  "Partenaires et institutions",
  "Chiffres publics",
  "Capacités futures",
  "Disponibilité produit",
  "Versionnage et traçabilité",
  "Obsolescence",
  "Accessibilité",
  "IA générative",
  "autorisation fondatrice",
]) {
  includes(protectedDoctrine);
}

assert.match(normalized, /OJA — CONCEPTUAL_VISUAL_ONLY/);
assert.match(normalized, /OJP — CONCEPTUAL_VISUAL_ONLY/);
assert.match(normalized, /OJCS — CONCEPTUAL_VISUAL_ONLY/);
assert.match(normalized, /OJW — READY_FOR_AUTHENTIC_SCREENSHOT/);
assert.match(normalized, /passage d'OJA, OJP ou OJCS de `CONCEPTUAL_VISUAL_ONLY` à `READY_FOR_AUTHENTIC_SCREENSHOT`/);

for (const entity of ["OJA", "OJP", "OJCS", "OJW"]) {
  includes(`${entity} : \`productAvailable = false\``);
}

assert.match(normalized, /Données de démonstration/);
assert.match(normalized, /runtime OnJarama qualifié/);
assert.match(normalized, /Une illustration conceptuelle ne devient jamais une preuve de niveau 1/);
assert.match(normalized, /Les blocs publics « Ce qui existe déjà » ou « Fondations actuelles » ne contiennent que des réalités vérifiables/);
assert.match(normalized, /Un screenshot n'est pas obligatoire pour chaque affirmation/);
assert.match(normalized, /En cas de doute, le visuel reste hors publication/);

assert.equal(
  packageJson.scripts["test:ojw:public-pages-05-a5-a"],
  "node scripts/architecture/ojw-public-pages-05-a5-a-public-evidence-contract.test.mjs",
);

console.log("OJW-PUBLIC-PAGES-05-A5-A: canonical public evidence classes, provenance, safeguards and founder governance validated.");
