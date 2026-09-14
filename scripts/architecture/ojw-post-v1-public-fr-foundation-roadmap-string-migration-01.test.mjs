import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");
const foundationPath = "src/i18n/locales/fr/foundation.ts";
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
      leaves.push([key, value.text]);
    }
  }
};
visit(declaration.initializer);
const roadmapLeaves = leaves.filter(([key]) => key.startsWith("foundation.roadmap."));
assert.equal(roadmapLeaves.filter(([key]) => !key.includes(".steps.")).length, 3);
assert.equal(roadmapLeaves.filter(([key]) => key.includes(".steps.")).length, 6);
assert.equal(roadmapLeaves.length, 9);
assert.equal(leaves.length, 21);
assert.doesNotMatch(source, /\bconstitution\s*:/iu);

const roadmap = read("src/data/roadmap.ts");
assert.match(roadmap, /\{ id: "exists" \},\s*\{ id: "consolidates" \},\s*\{ id: "extends" \}/u);
for (const text of roadmapLeaves.map(([, value]) => value)) assert.equal(roadmap.includes(text), false);
assert.doesNotMatch(roadmap, /\b(year|text):/u);

const section = read("src/sections/RoadmapSection.tsx");
assert.match(section, /useTranslation/u);
for (const key of ["foundation.roadmap.kicker", "foundation.roadmap.title", "foundation.roadmap.description"]) assert.ok(section.includes(key));
assert.ok(section.includes("foundation.roadmap.steps.${item.id}.label"));
assert.ok(section.includes("foundation.roadmap.steps.${item.id}.description"));
assert.match(section, /aria-labelledby="roadmap-title"/u);

const config = read("src/i18n/config.ts");
assert.match(config, /foundation: "PARTIAL"/u);
assert.equal(existsSync("src/i18n/locales/en/foundation.ts"), false);
assert.doesNotMatch(read("src/App.tsx"), /path=["']\/(en|es|pt|ar|zh-CN)/u);

console.log("OJW post-V1 French Foundation Roadmap migration: 9 canonical keys, stable ordered ids and strict boundaries validated.");
