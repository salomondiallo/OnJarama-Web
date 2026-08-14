import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const ecosystem = read("src/data/ecosystem.ts");
const status = read("src/components/ProjectStatus.tsx");
const pages = Object.fromEntries(["oja", "ojp", "ojcs", "ojw"].map((id) => [id, read(`src/pages/${id.toUpperCase()}Page.tsx`)]));
const projects = Object.fromEntries(["oja", "ojp", "ojcs", "ojw"].map((id) => [id, read(`src/data/projects/${id}.ts`)]));
const model = ecosystem.slice(ecosystem.indexOf("export const ecosystemEntities"), ecosystem.indexOf("export const publicApplications"));
const entity = (id) => {
  const start = model.indexOf(`id: "${id}"`);
  const end = model.indexOf("\n  {", start + 1);
  return model.slice(start, end === -1 ? undefined : end);
};

for (const id of ["academy", "path", "ojcs-connect"]) {
  assert.match(entity(id), /entityType:\s*"APPLICATION"/);
  assert.match(entity(id), /publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*false[\s\S]*productAvailable:\s*false/);
}
assert.match(entity("web"), /entityType:\s*"WEB_PORTAL"[\s\S]*publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*true[\s\S]*productAvailable:\s*false/);
assert.match(entity("foundation"), /entityType:\s*"FOUNDATION"/);
assert.match(entity("foundation"), /homeProductCard:\s*false/);
assert.doesNotMatch(entity("foundation"), /entityType:\s*"(?:APPLICATION|SOFTWARE)"|productAvailable/);
assert.match(ecosystem, /publicSoftware\s*=\s*ecosystemEntities\.filter/);
assert.equal((model.match(/entityType:\s*"SOFTWARE"/g) ?? []).length, 0);

const allowedActions = /label:\s*"(?:Découvrir l’écosystème|Voir la roadmap|Retour à l’écosystème)"/g;
const forbiddenAction = /label:\s*"(?:Télécharger|Installer|Essayer|Se connecter|Créer un compte|Commencer|Accéder à l’application)"/i;
for (const id of ["oja", "ojp", "ojcs"]) {
  assert.equal((projects[id].match(allowedActions) ?? []).length, 2);
  assert.doesNotMatch(projects[id], forbiddenAction);
  assert.doesNotMatch(pages[id], /TreeHeroSection|TreeScene|dynamicSky|scene-day|scene-night/i);
  assert.doesNotMatch(pages[id], /aria-label=[^>]*(?:CURRENT|PLANNED|VISION)|sr-only[^>]*(?:CURRENT|PLANNED|VISION)/i);
  for (const other of ["oja", "ojp", "ojcs"].filter((candidate) => candidate !== id)) {
    assert.doesNotMatch(pages[id], new RegExp(`href=[{\"']?\\?\"?/${other}(?:[\"'}]|$)`, "i"));
  }
}
assert.doesNotMatch(status, /sr-only|CURRENT|PLANNED|VISION/);

assert.match(pages.oja, /APPLICATION ÉDUCATIVE|Application éducative/i);
assert.match(pages.oja, /continuité à chaque parcours d’apprentissage/);
assert.match(pages.oja, /La Guinée n’est pas un décor/);
assert.match(projects.oja, /connectivité irrégulière/);
assert.doesNotMatch(`${pages.oja}\n${projects.oja}`, /programme Collège disponible|fonctionnement intégralement hors connexion/i);

for (const word of ["Comprendre", "Organiser", "Progresser"]) assert.match(projects.ojp, new RegExp(`title: "${word}"`));
assert.match(pages.ojp, /Comprendre\. Organiser\. Progresser\./);
assert.match(projects.ojp, /sans conseil financier personnalisé/);
assert.match(projects.ojp, /aucun résultat financier n’est garanti/);
assert.doesNotMatch(`${pages.ojp}\n${projects.ojp}`, /connexion bancaire|transaction bancaire|garantie d’enrichissement|résultat garanti/i);

for (const word of ["Explorer", "Localiser", "Qualifier", "Contacter"]) assert.match(projects.ojcs, new RegExp(`title: "${word}"`));
assert.match(pages.ojcs, /Explorer\. Localiser\. Qualifier\. Contacter\./);
assert.match(projects.ojcs, /mise en relation seulement lorsque les règles et parcours nécessaires seront qualifiés/);
assert.match(projects.ojcs, /sans constituer aujourd’hui un annuaire public actif/);
assert.doesNotMatch(`${pages.ojcs}\n${projects.ojcs}`, /marketplace active|paiement|réservation|publication d’activité ouverte|réseau social actif|certification opérationnelle/i);

for (const id of ["oja", "ojp", "ojcs"]) {
  assert.match(projects[id], new RegExp(`canonicalUrl: "https://onjarama\\.ca/${id}"`));
  assert.match(projects[id], /title:\s*"[^\n]+"/);
  assert.match(projects[id], /description:\s*"[^\n]+"/);
  assert.match(projects[id], /ogTitle:\s*"[^\n]+"/);
  assert.match(projects[id], /ogDescription:\s*"[^\n]+"/);
}
assert.notEqual(projects.oja.match(/title:\s*"([^\n]+)"/)?.[1], projects.ojp.match(/title:\s*"([^\n]+)"/)?.[1]);
assert.notEqual(projects.ojp.match(/title:\s*"([^\n]+)"/)?.[1], projects.ojcs.match(/title:\s*"([^\n]+)"/)?.[1]);

console.log("OJW-PUBLIC-PAGES-05-A2-E: cross-showcase availability, taxonomy, identity, guardrails, metadata and project isolation validated.");
