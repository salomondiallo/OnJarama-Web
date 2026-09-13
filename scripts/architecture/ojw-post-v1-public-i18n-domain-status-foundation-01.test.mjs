import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const types = read("src/i18n/types.ts");
const config = read("src/i18n/config.ts");
const app = read("src/App.tsx");

assert.match(types, /type I18nDomain = "global" \| "home" \| "foundation" \| "oja" \| "ojp" \| "ojcs" \| "ojw" \| "metadata"/);
assert.match(types, /type AggregatedTranslationStatus = "MISSING" \| "PARTIAL" \| "REVIEWED" \| "APPROVED" \| "CANONICAL_APPROVED"/);
assert.match(config, /fr: .*domainStatuses: \{ \.\.\.missingDomainStatuses, global: "CANONICAL_APPROVED", home: "CANONICAL_APPROVED" \}/);
assert.match(config, /en: .*domainStatuses: \{ \.\.\.missingDomainStatuses, global: "REVIEWED" \}/);
assert.match(config, /deriveLocaleTranslationStatus/);
assert.match(config, /statuses\.every\(\(status\) => status === "MISSING"\)\) return "MISSING"/);
assert.match(config, /statuses\.some\(\(status\) => status === "MISSING" \|\| status === "DRAFT"\)\) return "PARTIAL"/);
assert.match(config, /statuses\.every\(\(status\) => status === "CANONICAL_APPROVED"\)\) return "CANONICAL_APPROVED"/);
assert.match(config, /statuses\.every\(\(status\) => status === "APPROVED" \|\| status === "CANONICAL_APPROVED"\)\) return "APPROVED"/);
assert.match(config, /return "REVIEWED"/);
assert.match(config, /getDomainTranslationStatus/);
assert.match(config, /getAggregatedLocaleTranslationStatus/);
assert.match(config, /isDomainAtLeastDraft/);
assert.match(config, /isLocaleTranslationComplete/);
assert.match(config, /en: .*editoriallyApproved: false, publiclyAvailable: false/);
assert.match(config, /PUBLIC_LOCALE_COUNT >= 2/);
assert.doesNotMatch(app, /path=["']\/(en|es|pt|ar|zh-CN)/);
assert.equal(existsSync("src/i18n/locales/en/home.ts"), false);

console.log("OJW post-V1 i18n domain statuses: typed domains, deterministic aggregation and publication independence validated.");
