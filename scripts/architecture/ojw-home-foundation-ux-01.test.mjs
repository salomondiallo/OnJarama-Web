import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const section = readFileSync("src/sections/EcosystemSection.tsx", "utf8");
const styles = readFileSync("src/styles/cards.css", "utf8");
const entities = readFileSync("src/data/ecosystem.ts", "utf8");
const app = readFileSync("src/App.tsx", "utf8");

assert.match(section, /ecosystem-public-presence/);
assert.match(section, /Notre présence publique/);
assert.match(section, /OJW — Le portail public/);
assert.match(section, /foundationEntity\.acronym/);
assert.match(entities, /entityType: "WEB_PORTAL"/);
assert.match(entities, /entityType: "FOUNDATION"/);
assert.doesNotMatch(section.match(/ecosystem-public-presence[\s\S]*?<\/section>/)?.[0] ?? "", /publicApplications\.map|OJA|OJP|OJCS/);

for (const label of ["Vision et principes", "Valeurs et engagements", "Objectifs institutionnels", "Constitution OnJarama"]) {
  assert.match(section, new RegExp(label));
}
assert.equal((section.match(/aria-expanded=/g) ?? []).length, 1);
assert.match(section, /aria-controls=\{panelId\}/);
assert.match(section, /<button[\s\S]*?type="button"/);
assert.match(styles, /ecosystem-foundation-disclosure button[^{]*\{[^}]*min-height:48px/);
assert.match(styles, /ecosystem-foundation-disclosure button:focus-visible/);

assert.doesNotMatch(app, /path="\/ojf"|path:\s*"\/ojf"/i);
assert.doesNotMatch(section, /Télécharger|Installer|Ouvrir l’application|Compte|Connexion/);
assert.doesNotMatch(section, /href=.*constitution|download=/i);
assert.equal((entities.match(/entityType: "APPLICATION"/g) ?? []).length, 4, "three entities plus the ApplicationEntity type contract must remain");
assert.match(entities, /publicSoftware = ecosystemEntities\.filter\([\s\S]*?entityType === "SOFTWARE"/);
assert.doesNotMatch(entities.match(/ecosystemEntities:[\s\S]*?\] as const;/)?.[0] ?? "", /entityType: "SOFTWARE"/);

for (const protectedPath of ["useEnvironmentClock", "useLivingEnvironment", "useDayNightMode", "TreeScene", "TreeHeroSection", "dynamicSky"]) {
  assert.doesNotMatch(section, new RegExp(protectedPath));
}

console.log("OJW-HOME-FOUNDATION-UX-01: shared public-presence family and accessible OJF disclosures validated.");
