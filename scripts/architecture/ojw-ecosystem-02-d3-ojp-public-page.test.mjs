import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const app = read("src/App.tsx");
const data = read("src/data/ecosystem.ts");
const section = read("src/sections/EcosystemSection.tsx");
const page = read("src/pages/OJPPage.tsx");
const editorial = read("src/data/projects/ojp.ts");
const hero = read("src/components/ProjectHero.tsx");
const layout = read("src/layouts/PublicProjectLayout.tsx");
const styles = read("src/styles/project-pages.css");

const publicModel = data.slice(data.indexOf("export const ecosystemEntities"), data.indexOf("export const publicApplications"));
const projectBlock = (id) => {
  const start = publicModel.indexOf(`id: "${id}"`);
  const next = publicModel.indexOf("\n  {", start + 1);
  return publicModel.slice(start, next === -1 ? undefined : next);
};

assert.match(app, /path="\/ojp" element={<OJPPage/);
assert.match(app, /path="\/OJP" element={<Navigate to="\/ojp" replace/);
assert.doesNotMatch(app, /path="\/ojp" element={<ProjectPlaceholderPage/);
assert.match(projectBlock("path"), /publicPagePath:\s*"\/ojp"[\s\S]*publicPageAvailable:\s*true[\s\S]*publicServiceAvailable:\s*false[\s\S]*productAvailable:\s*false/);
assert.match(projectBlock("academy"), /publicPageAvailable:\s*true/);
assert.match(projectBlock("web"), /publicPageAvailable:\s*true/);
assert.match(projectBlock("ojcs-connect"), /publicPageAvailable:\s*true/);
assert.equal((publicModel.match(/publicPageAvailable:\s*true/g) ?? []).length, 4, "ACTIVE_PUBLIC_PROJECT_PAGE_COUNT_LOCAL must be 4");
assert.match(section, /href=\{item\.publicPagePath\}/);
assert.match(page, /<ProjectHero project=\{ojpProject\}/);
assert.equal((`${page}\n${hero}`.match(/<h1\b/g) ?? []).length, 1, "OJP_PAGE_SINGLE_H1 must pass");
assert.match(layout, /showAmbience=\{false\}/, "OJP_PAGE_AMBIENCE_SELECTOR must be 0");
assert.doesNotMatch(page, /TreeHeroSection|TreeScene|dynamicSky|founder-canonical|scene-day|scene-night/i);
assert.match(editorial, /canonicalUrl:\s*"https:\/\/onjarama\.ca\/ojp"/);
assert.match(editorial, /Projet en développement actif/);
assert.doesNotMatch(editorial, /produit complet (est |déjà )?disponible|product available/i);
assert.match(page, /Organiser sans conseiller ni promettre/);
assert.match(editorial, /ne constituent pas un conseil financier, juridique, fiscal ou d’investissement personnalisé/);
assert.match(editorial, /aucun résultat financier n’est garanti/);
assert.match(editorial, /exigence de conception future|devront être traitées avec un niveau élevé de confidentialité/);
assert.match(editorial, /label:\s*"Découvrir l’écosystème",\s*href:\s*"\/#ecosystem-projects"/);
assert.match(editorial, /label:\s*"Voir la roadmap",\s*href:\s*"\/#roadmap"/);
assert.doesNotMatch(`${page}\n${editorial}`, /Ouvrir OJP|Tester OJP|Gérer mon budget|Connecter mon compte/);
assert.doesNotMatch(editorial, /connexion bancaire|transaction financière|automatisation financière|courtier|prêteur/i);
assert.doesNotMatch(page, />CURRENT<|>PLANNED<|>VISION</);
assert.match(page, /En cours de structuration/);
assert.match(page, /À construire/);
assert.match(styles, /\.ojp-page/);
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

console.log("OJW-ECOSYSTEM-02-D3: OJP public page, financial guardrails, honest availability and Hero isolation validated.");
