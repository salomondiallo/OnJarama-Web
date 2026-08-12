import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const app = read("src/App.tsx");
const data = read("src/data/ecosystem.ts");
const section = read("src/sections/EcosystemSection.tsx");
const header = read("src/components/Header.tsx");
const home = read("src/pages/HomePage.tsx");
const hero = read("src/sections/TreeHeroSection.tsx");
const layout = read("src/layouts/PublicProjectLayout.tsx");
const notFound = read("src/pages/NotFoundPage.tsx");
const vercel = JSON.parse(read("vercel.json"));

assert.match(app, /path="\/" element={<HomePage/, "HOME_ROUTE must remain /");
assert.deepEqual([...app.matchAll(/path="\/(oja|ojp|ojcs|ojw)"/g)].map((match) => `/${match[1]}`), ["/oja", "/ojp", "/ojcs", "/ojw"]);
assert.deepEqual([...data.matchAll(/publicPagePath:\s*"(\/[^"/]+)"/g)].map((match) => match[1]), ["/oja", "/ojp", "/ojcs", "/ojw"]);
assert.equal((data.match(/publicPageAvailable:\s*true/g) ?? []).length, 4, "All four qualified project pages must be public locally");
assert.doesNotMatch(app, /path="\/ojf"/i, "OJF_PROJECT_ROUTE must remain FALSE");
assert.match(app, /path="\*" element={<NotFoundPage/);
assert.match(notFound, /<h1/);
assert.match(notFound, /href="\/"/);
assert.match(section, /const hasPublicPage = item\.publicPageAvailable/);
assert.doesNotMatch(section, /publicPageAvailable:\s*true/);
assert.match(header, /isHomePage \? "" : "\/"/);
assert.match(home, /<Header\s+isHomePage/);
assert.match(hero, /<h1/);
assert.match(layout, /<Header/);
assert.doesNotMatch(layout, /TreeHeroSection|TreeScene|dynamicSky/i, "HERO_PROJECT_PAGE_DEPENDENCY and DYNAMIC_SKY_PROJECT_PAGE_DEPENDENCY must remain NONE");
assert.deepEqual(vercel.redirects.map(({ source }) => source), ["/OJA", "/OJP", "/OJCS", "/OJW"]);
assert.equal(vercel.rewrites.at(-1).destination, "/index.html");

console.log("OJW-ECOSYSTEM-02-A: public routing, lowercase canonicals, shared shell and controlled NotFound validated.");
