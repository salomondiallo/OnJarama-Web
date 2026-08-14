import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const data = read("src/data/ecosystem.ts");
const editorial = read("src/data/projects/ojcs.ts");
const page = read("src/pages/OJCSPage.tsx");
const styles = read("src/styles/project-pages.css");
const model = data.slice(data.indexOf("export const ecosystemEntities"), data.indexOf("export const publicApplications"));
const start = model.indexOf('id: "ojcs-connect"');
const end = model.indexOf("\n  {", start + 1);
const ojcs = model.slice(start, end === -1 ? undefined : end);

assert.match(ojcs, /entityType:\s*"APPLICATION"/);
assert.match(ojcs, /publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*false[\s\S]*productAvailable:\s*false/);
assert.match(page, /<ProjectHero project=\{ojcsProject\} kicker="Application de repérage et de connexion utile"/);
assert.equal((page.match(/<section\b/g) ?? []).length, 8);
for (const axis of ["Explorer", "Localiser", "Qualifier", "Contacter"]) assert.match(editorial, new RegExp(`title: "${axis}"`));
assert.match(page, /pas quatre services déjà ouverts/);
assert.match(editorial, /sans prétendre à une vérification actuelle/);
assert.match(editorial, /mise en relation seulement lorsque les règles et parcours nécessaires seront qualifiés/);
assert.match(page, /Des fondations réelles, pas un service public ouvert/);
assert.match(page, /Quatre domaines à qualifier ensemble/);
assert.match(page, /La Guinée comme ancrage, la diaspora comme lien/);
assert.match(page, /Qualifier avant d’affirmer/);
assert.match(editorial, /vérification, de signalement, de modération et de clarté des statuts avant/);
assert.match(page, /Étendre les connexions avec maîtrise/);
assert.doesNotMatch(editorial, /label:\s*"(?:Essayer|Télécharger|Installer|Créer un compte|Se connecter|Rechercher maintenant|Contacter maintenant|Réserver|Acheter|Publier une activité|Ajouter mon entreprise)"/i);
assert.doesNotMatch(`${page}\n${editorial}`, /marketplace|paiement|transaction|commission|réseau social actif|annuaire public actif aujourd’hui/i);
assert.doesNotMatch(page, /ProjectStatus|CURRENT|PLANNED|VISION/);
assert.match(editorial, /canonicalUrl:\s*"https:\/\/onjarama\.ca\/ojcs"/);
assert.doesNotMatch(page, /TreeHeroSection|TreeScene|dynamicSky|scene-day|scene-night/i);
assert.doesNotMatch(page, /ojaProject|ojpProject|ojwProject|OJAPage|OJPPage|OJWPage/);
assert.match(styles, /\.ojcs-connect/);
assert.match(styles, /\.ojcs-territory/);
assert.match(styles, /\.ojcs-trajectory/);
assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);

console.log("OJW-PUBLIC-PAGES-05-A2-D: OJCS application showcase, Connect axes, qualified trust and public-service guardrails validated.");
