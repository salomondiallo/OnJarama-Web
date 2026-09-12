import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");
const homePath = "src/i18n/locales/fr/home.ts";
assert.ok(existsSync(homePath), "The French HOME dictionary must exist.");

const home = read(homePath);
const file = ts.createSourceFile(homePath, home, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const declaration = file.statements
  .filter(ts.isVariableStatement)
  .flatMap((statement) => statement.declarationList.declarations)
  .find((item) => ts.isIdentifier(item.name) && item.name.text === "frenchHomeMessages");
assert.ok(declaration?.initializer, "frenchHomeMessages must exist.");

const unwrap = (node) => ts.isSatisfiesExpression(node) || ts.isAsExpression(node) ? unwrap(node.expression) : node;
const leaves = [];
const visit = (node, prefix = "") => {
  const object = unwrap(node);
  assert.ok(ts.isObjectLiteralExpression(object), `${prefix || "frenchHomeMessages"} must be an object.`);
  for (const property of object.properties) {
    assert.ok(ts.isPropertyAssignment(property), "HOME messages must use explicit properties.");
    const name = property.name.getText(file).replace(/^['"]|['"]$/g, "");
    const key = prefix ? `${prefix}.${name}` : name;
    const value = unwrap(property.initializer);
    if (ts.isObjectLiteralExpression(value)) visit(value, key);
    else {
      assert.ok(ts.isStringLiteralLike(value), `${key} must be a string.`);
      assert.notEqual(value.text.trim(), "", `${key} must not be empty.`);
      leaves.push([key, value.text]);
    }
  }
};
visit(declaration.initializer);
assert.equal(leaves.length, 32, "The approved French HOME lot must contain exactly 32 keys.");

for (const forbidden of ["Constitution OnJarama", "Vision et principes", "Valeurs et engagements", "Objectifs institutionnels", "Le socle de la vision"]) {
  assert.doesNotMatch(home, new RegExp(forbidden), `${forbidden} belongs to FOUNDATION, not HOME.`);
}
for (const forbidden of ["OnJarama Academy", "OnJarama Path", "OJCS Connect", "En développement", "Vous êtes ici"]) {
  assert.doesNotMatch(home, new RegExp(forbidden), `${forbidden} belongs to PROJECT_SPECIFIC, not HOME.`);
}

const targetComponents = ["src/sections/TreeHeroSection.tsx", "src/sections/EcosystemSection.tsx", "src/sections/AboutSection.tsx"].map(read).join("\n");
assert.match(targetComponents, /useTranslation/);
assert.match(targetComponents, /home\.hero\.label/);
assert.match(targetComponents, /home\.ecosystem\.applications\.discoverProject/);
assert.match(targetComponents, /home\.about\.technology/);

const ecosystem = read("src/data/ecosystem.ts");
assert.equal((ecosystem.match(/entityType: "APPLICATION",/g) ?? []).length, 3);
assert.match(ecosystem, /entityType: "WEB_PORTAL"/);
assert.match(ecosystem, /entityType: "FOUNDATION"/);
assert.match(ecosystem, /publicSoftware = ecosystemEntities\.filter/);

const app = read("src/App.tsx");
assert.doesNotMatch(app, /path=["']\/(en|es|pt|ar|zh-CN)/);
assert.equal(existsSync("src/i18n/locales/en/home.ts"), false);
assert.match(read("src/pages/HomePage.tsx"), /OnJarama — Votre parcours\. Votre rythme\./);
assert.match(read("src/i18n/config.ts"), /en:.*translationStatus: "REVIEWED".*editoriallyApproved: false.*publiclyAvailable: false/);

console.log("OJW post-V1 French HOME migration: 32 typed keys, boundaries, taxonomy and immutable public contracts validated.");
