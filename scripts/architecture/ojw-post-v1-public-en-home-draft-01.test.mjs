import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");
const dictionaryLeaves = (path, variableName) => {
  const source = read(path);
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = file.statements.filter(ts.isVariableStatement).flatMap((statement) => statement.declarationList.declarations).find((item) => ts.isIdentifier(item.name) && item.name.text === variableName);
  assert.ok(declaration?.initializer, `${variableName} must exist.`);
  const unwrap = (node) => ts.isSatisfiesExpression(node) || ts.isAsExpression(node) ? unwrap(node.expression) : node;
  const leaves = new Map();
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
        assert.ok(ts.isStringLiteralLike(value), `${key} must be a string.`);
        assert.notEqual(value.text.trim(), "", `${key} must not be empty.`);
        leaves.set(key, value.text);
      }
    }
  };
  visit(declaration.initializer);
  return { source, leaves };
};

const french = dictionaryLeaves("src/i18n/locales/fr/home.ts", "frenchHomeMessages");
const english = dictionaryLeaves("src/i18n/locales/en/home.ts", "englishHomeMessages");
assert.equal(french.leaves.size, 32);
assert.equal(english.leaves.size, 32);
assert.deepEqual([...english.leaves.keys()], [...french.leaves.keys()]);

for (const forbidden of ["OnJarama Academy", "OnJarama Path", "OJCS Connect", "Constitution OnJarama", "Vision and principles", "Values and commitments", "Institutional objectives"]) {
  assert.doesNotMatch(english.source, new RegExp(forbidden));
}
assert.match(english.source, /software: "Business solutions"/);
assert.match(english.source, /title: "Our public presence"/);
assert.match(english.source, /foundation: "Institutional foundation"/);
assert.match(english.source, /description: "Public pathways designed around education, personal progress, and meaningful connections\."/);
assert.match(english.source, /noneAnnounced: "No software has been publicly announced at this time\."/);
assert.match(english.source, /purpose: "OnJarama exists to help people better understand the possibilities available to them, gain greater autonomy, and move forward in contexts where access, information, and coordination often remain fragmented\."/);

const config = read("src/i18n/config.ts");
assert.match(config, /en: .*domainStatuses: \{ \.\.\.missingDomainStatuses, global: "REVIEWED", home: "DRAFT" \}.*editoriallyApproved: false.*publiclyAvailable: false/);
assert.match(config, /PUBLIC_LOCALE_COUNT >= 2/);
const provider = read("src/i18n/I18nProvider.tsx");
assert.match(provider, /import\("\.\/locales\/en"\)/);
assert.doesNotMatch(provider, /import .*locales\/en\/home/);
assert.doesNotMatch(read("src/App.tsx"), /path=["']\/(en|es|pt|ar|zh-CN)/);
assert.equal(existsSync("src/i18n/locales/en/home.ts"), true);

console.log("OJW post-V1 English HOME draft: 32-key parity, terminology, lazy bundle and non-public contracts validated.");
