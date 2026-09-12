import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");

function dictionaryLeaves(path, exportName) {
  const source = read(path);
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = file.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => statement.declarationList.declarations)
    .find((item) => ts.isIdentifier(item.name) && item.name.text === exportName);
  assert.ok(declaration?.initializer, `${exportName} must exist`);

  const unwrap = (node) => ts.isSatisfiesExpression(node) || ts.isAsExpression(node) ? unwrap(node.expression) : node;
  const leaves = new Map();
  const visit = (node, prefix = "") => {
    const object = unwrap(node);
    assert.ok(ts.isObjectLiteralExpression(object), `${prefix || exportName} must be an object`);
    for (const property of object.properties) {
      assert.ok(ts.isPropertyAssignment(property), `${prefix || exportName} must use explicit properties`);
      const name = property.name.getText(file).replace(/^['"]|['"]$/g, "");
      const key = prefix ? `${prefix}.${name}` : name;
      const value = unwrap(property.initializer);
      if (ts.isObjectLiteralExpression(value)) visit(value, key);
      else {
        assert.ok(ts.isStringLiteralLike(value), `${key} must be a string`);
        assert.notEqual(value.text.trim(), "", `${key} must not be empty`);
        leaves.set(key, value.text);
      }
    }
  };
  visit(declaration.initializer);
  return leaves;
}

const french = dictionaryLeaves("src/i18n/locales/fr/global.ts", "frenchGlobalMessages");
const english = dictionaryLeaves("src/i18n/locales/en/global.ts", "englishGlobalMessages");
assert.equal(french.size, 52);
assert.equal(english.size, 52);
assert.deepEqual([...english.keys()].sort(), [...french.keys()].sort(), "FR/EN GLOBAL key parity must be exact");

const allowedIdentical = new Set(["Vision", "Mission", "Roadmap", "Auto"]);
for (const [key, value] of english) {
  assert.ok(value !== french.get(key) || allowedIdentical.has(value) || /OnJarama|Canada/.test(value), `${key} must not silently copy French`);
}

const reviewedCorrections = {
  "global.controls.theme.label": "Choose the lighting mode",
  "global.controls.theme.legend": "Lighting mode",
  "global.controls.theme.autoSolarDay": "Automatic mode based on the Sun; currently Day",
  "global.controls.theme.autoSolarNight": "Automatic mode based on the Sun; currently Night",
  "global.controls.theme.autoFallbackDay": "Automatic mode using fallback times; currently Day",
  "global.controls.theme.autoFallbackNight": "Automatic mode using fallback times; currently Night",
  "global.controls.localSky.status.unsynced": "Auto mode is currently using the artistic day/night schedule.",
  "global.controls.localSky.status.synced": "Auto mode is synchronized with your local sky using your approximate location.",
  "global.controls.localSky.status.denied": "Location declined. Auto mode will keep using the artistic day/night schedule.",
  "global.controls.localSky.status.error": "Location unavailable. Auto mode will keep using the artistic day/night schedule.",
  "global.footer.motto": "Let’s build the future together.",
  "global.projectContext.label": "Public project page navigation",
  "global.projectExplorer.description": "Each link opens a public project overview page. The applications remain in development until their availability as products is formally confirmed.",
};
for (const [key, value] of Object.entries(reviewedCorrections)) {
  assert.equal(english.get(key), value, `${key} must retain its editorially reviewed correction`);
}

const config = read("src/i18n/config.ts");
assert.match(config, /en:.*translationStatus: "DRAFT".*editoriallyApproved: false.*publiclyAvailable: false/);
assert.match(config, /return PUBLIC_LOCALE_COUNT >= 2/);

const provider = read("src/i18n/I18nProvider.tsx");
assert.match(provider, /en: async \(\) =>/);
assert.match(provider, /await import\("\.\/locales\/en\/global"\)/);
assert.match(provider, /if \(!isPublicLocale\(locale\)\) return false/);

const app = read("src/App.tsx");
assert.doesNotMatch(app, /path=["']\/en(?:\/|["'])/);
assert.match(provider, /const frenchBundle/);

const hero = read("src/components/TreeScene.tsx");
assert.match(hero, /coastal/i);

console.log("OJW post-V1 English GLOBAL draft: 52-key parity, lazy loading and non-public availability validated.");
