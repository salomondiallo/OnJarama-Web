import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..", "..");
const documentPath = resolve(
  repositoryRoot,
  "docs",
  "OJW-LOT-13-HOMEPAGE-IMMERSIVE-QUALITY-CLOSURE.md",
);

assert.ok(existsSync(documentPath), "Le document OJW-LOT-13 doit exister.");

const document = readFileSync(documentPath, "utf8");
const requiredCommitHashes = [
  "0e175c8",
  "1d44f10",
  "7142e3a",
  "e86b8db",
  "2915dbc",
  "e9ffeff",
  "f966c49",
  "873a460",
  "dac9f44",
  "886037e",
  "b2baf15",
];

for (const hash of requiredCommitHashes) {
  assert.ok(document.includes(hash), `Le document doit mentionner ${hash}.`);
}

assert.ok(document.includes("5bfc8d8"), "Le document doit mentionner 5bfc8d8.");
assert.ok(
  document.includes("b2baf15c1836cad201b8a1a0c7bf671aaf361403"),
  "Le document doit mentionner le hash HEAD complet.",
);
assert.match(
  document,
  /exactement onze commits/i,
  "Le document doit déclarer exactement onze commits.",
);
assert.ok(
  document.includes("DÉCISION DE CLÔTURE OJW-LOT-13"),
  "La décision de clôture doit être présente.",
);
assert.ok(
  document.includes("Aucun déploiement n’a été exécuté dans OJW-LOT-13."),
  "L’absence de déploiement doit être explicite.",
);
assert.ok(
  document.includes("LOT-13 ne constitue pas une preuve Production actuelle"),
  "La limite de preuve Production actuelle doit être explicite.",
);
assert.ok(
  document.includes(
    "OJW-LOT-12-B` reste une preuve historique valable pour l’état observé au moment de sa création",
  ),
  "Le statut historique de la preuve LOT-12-B doit être explicite.",
);
assert.ok(
  document.includes(
    "Aucune adoption doctrinale concernant OnJarama Foundation n’est prononcée par LOT-13.",
  ),
  "L’absence de décision doctrinale Foundation doit être explicite.",
);

const requiredRepositoryFiles = [
  "src/components/TreeScene.tsx",
  "src/components/ProjectPreviewCard.tsx",
  "src/sections/TreeHeroSection.tsx",
  "src/styles/tree.css",
  "src/styles/sections.css",
  "docs/visual-references/onjarama-homepage-official-reference.png",
];

for (const relativePath of requiredRepositoryFiles) {
  assert.ok(
    existsSync(resolve(repositoryRoot, relativePath)),
    `Le fichier consolidé doit exister : ${relativePath}`,
  );
}

console.log(
  "OJW-LOT-13: document, séquence, décision, limites et fichiers consolidés validés.",
);
