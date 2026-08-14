import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const model = read("src/data/ecosystem.ts");
const editorial = read("src/data/projects/ojp.ts");
const page = read("src/pages/OJPPage.tsx");
const status = read("src/components/ProjectStatus.tsx");
const styles = read("src/styles/project-pages.css");
const canonical = model.slice(model.indexOf("export const ecosystemEntities"), model.indexOf("export const publicApplications"));
const start = canonical.indexOf('id: "path"');
const end = canonical.indexOf("\n  {", start + 1);
const ojp = canonical.slice(start, end);

assert.match(ojp, /entityType:\s*"APPLICATION"[\s\S]*publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*false[\s\S]*productAvailable:\s*false/);
assert.match(page, /kicker="Application d’organisation financière personnelle"/);
assert.equal((page.match(/<section\b/g) ?? []).length, 8, "OJP showcase must use eight focused sections after its shared Hero");
for (const marker of [
  "Pourquoi OJP",
  "Pour qui",
  "Comprendre. Organiser. Progresser.",
  "Ce qui est déjà engagé",
  "Ce que nous construisons",
  "Un cadre responsable",
  "Trajectoire OJP",
  "Dans OnJarama",
]) assert.match(page, new RegExp(marker.replaceAll(".", "\\.")));

assert.equal((editorial.match(/plannedCapabilities:/g) ?? []).length, 1);
assert.equal((editorial.match(/stage:\s*"PLANNED"/g) ?? []).length, 5, "Four construction domains and one roadmap phase are expected");
assert.match(page, /aucun service financier ouvert/);
assert.match(editorial, /ne constituent pas un conseil financier, juridique, fiscal ou d’investissement personnalisé/);
assert.match(editorial, /aucun résultat financier n’est garanti/);
assert.match(page, /exigence future, pas d’une capacité technique déjà livrée/);
assert.doesNotMatch(`${page}\n${editorial}`, /progression guidée/i);
assert.doesNotMatch(`${page}\n${editorial}`, /Essayer|Télécharger|Installer|Ouvrir l’application|Se connecter|Créer un compte|Commencer|Ajouter mes comptes|Connecter ma banque|Investir|Obtenir des conseils|Participer aux tests|Contribuer/i);
assert.doesNotMatch(`${page}\n${editorial}`, /économies garanties|réduction de dette garantie|performance financière|résultat garanti/i);
assert.doesNotMatch(editorial, /connexion bancaire|transaction financière|automatisation financière|courtier|prêteur/i);
assert.match(editorial, /canonicalUrl:\s*"https:\/\/onjarama\.ca\/ojp"/);
assert.doesNotMatch(status, /état \{stage\.toLowerCase\(\)\}|état current|état planned|état vision/i);
assert.doesNotMatch(page, /TreeHeroSection|TreeScene|dynamicSky|scene-day|scene-night|Explorer les autres applications/i);
assert.doesNotMatch(page, /ojaProject|ojcsProject|ojwProject|OJAPage|OJCSPage|OJWPage/);
for (const selector of [".ojp-problem__layout", ".ojp-method__steps", ".ojp-current__list", ".ojp-responsibility"]) {
  assert.match(styles, new RegExp(selector.replace(".", "\\.")));
}
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

console.log("OJW-PUBLIC-PAGES-05-A2-C: distinctive OJP showcase, responsible financial framing and honest availability validated.");
