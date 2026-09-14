import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");
const foundationPath = "src/i18n/locales/fr/foundation.ts";
assert.equal(existsSync(foundationPath), true);

const source = read(foundationPath);
const file = ts.createSourceFile(foundationPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const declaration = file.statements.filter(ts.isVariableStatement).flatMap((statement) => statement.declarationList.declarations).find((item) => ts.isIdentifier(item.name) && item.name.text === "frenchFoundationMessages");
assert.ok(declaration?.initializer);
const leaves = [];
const unwrap = (node) => ts.isSatisfiesExpression(node) || ts.isAsExpression(node) ? unwrap(node.expression) : node;
const visit = (node, prefix = "") => {
  const object = unwrap(node);
  assert.ok(ts.isObjectLiteralExpression(object));
  for (const property of object.properties) {
    assert.ok(ts.isPropertyAssignment(property));
    const name = property.name.getText(file).replace(/^['"]|['"]$/g, "");
    const key = prefix ? `${prefix}.${name}` : name;
    const value = unwrap(property.initializer);
    if (ts.isObjectLiteralExpression(value)) visit(value, key);
    else {
      assert.ok(ts.isStringLiteralLike(value));
      assert.notEqual(value.text.trim(), "");
      leaves.push([key, value.text]);
    }
  }
};
visit(declaration.initializer);
assert.equal(leaves.filter(([key]) => key.startsWith("foundation.mission.")).length, 3);
assert.equal(leaves.filter(([key]) => key.startsWith("foundation.vision.")).length, 9);
assert.equal(leaves.filter(([key]) => key.startsWith("foundation.mission.") || key.startsWith("foundation.vision.")).length, 12);

for (const forbidden of ["disclosure", "hero", "OnJarama Academy", "OnJarama Path", "OJCS Connect"]) assert.doesNotMatch(source, new RegExp(forbidden, "iu"));
assert.doesNotMatch(source, /\bconstitution\s*:/iu);
const mission = read("src/sections/MissionSection.tsx");
const vision = read("src/sections/VisionSection.tsx");
assert.match(mission, /foundation\.mission\./);
assert.match(vision, /foundation\.vision\./);
assert.doesNotMatch(mission, /Donner à chacun/);
assert.doesNotMatch(vision, /Une technologie utile/);
assert.match(read("src/i18n/locales/fr/index.ts"), /\.\.\.frenchFoundationMessages/);
assert.equal(existsSync("src/i18n/locales/en/foundation.ts"), false);
const config = read("src/i18n/config.ts");
assert.match(config, /foundation: "MISSING"/);
assert.match(config, /fr: .*domainStatuses: \{ \.\.\.missingDomainStatuses, global: "CANONICAL_APPROVED", home: "CANONICAL_APPROVED", foundation: "PARTIAL" \}/);
assert.match(config, /en: .*global: "REVIEWED", home: "REVIEWED".*editoriallyApproved: false.*publiclyAvailable: false/);
assert.doesNotMatch(read("src/App.tsx"), /path=["']\/(en|es|pt|ar|zh-CN)/);

console.log("OJW post-V1 French Foundation Mission/Vision migration: 12 canonical keys, strict boundaries and non-public contracts validated.");
