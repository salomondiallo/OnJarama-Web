import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const app = read("src/App.tsx");
const manager = read("src/components/RouteFocusManager.tsx");
const header = read("src/components/Header.tsx");
const explorer = read("src/components/PublicProjectExplorer.tsx");
const context = read("src/components/PublicProjectContext.tsx");
const projectData = ["oja", "ojp", "ojcs", "ojw"].map((code) => read(`src/data/projects/${code}.ts`)).join("\n");
const packageJson = JSON.parse(read("package.json"));

for (const route of ["oja", "ojp", "ojcs", "ojw"]) {
  assert.match(app, new RegExp(`path="/${route}"`), `/${route} must remain routed`);
}

assert.match(manager, /const \{ hash, pathname \} = useLocation\(\)/);
assert.match(manager, /history\.scrollRestoration = "manual"/);
assert.match(manager, /root\.style\.scrollBehavior = "auto"/);
assert.match(manager, /if \(!hash\)[\s\S]*window\.scrollTo\(\{ top: 0, left: 0 \}\)/);
assert.match(manager, /document\.getElementById\(decodeURIComponent\(hash\.slice\(1\)\)\)/);
assert.match(manager, /scrollIntoView\(\{ block: "start" \}\)/);
assert.match(manager, /MutationObserver/, "lazy hash targets must be resolved after rendering");
assert.match(manager, /requestAnimationFrame/, "native restoration must be reconciled after paint");

assert.match(projectData, /href:\s*"\/#ecosystem-projects"/);
assert.match(projectData, /href:\s*"\/#roadmap"/);
assert.match(header, /className="brand" href=\{isHomePage \? "#top" : "\/"\}/);
assert.match(explorer, /to=\{project\.publicPagePath\}/);
assert.match(context, /href="\/#ecosystem-projects"/);
assert.doesNotMatch(explorer, /scrollTo|scrollIntoView/);
assert.doesNotMatch(context, /scrollTo|scrollIntoView/);
assert.doesNotMatch(projectData, /télécharger|téléchargement|accéder à l'application/i);

assert.deepEqual(Object.keys(packageJson.dependencies).sort(), ["@vitejs/plugin-react", "vite"].filter((name) => name in packageJson.dependencies).concat(["react", "react-dom", "react-router-dom"]).sort());

console.log("OJW PUBLIC-PAGES-05-A5-B-FIX1 scroll restoration architecture: PASS");
