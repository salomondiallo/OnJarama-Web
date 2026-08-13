import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
const home = read("src/pages/HomePage.tsx");
const ecosystem = read("src/sections/EcosystemSection.tsx");
const about = read("src/sections/AboutSection.tsx");
const mission = read("src/sections/MissionSection.tsx");
const vision = read("src/sections/VisionSection.tsx");
const roadmapSection = read("src/sections/RoadmapSection.tsx");
const roadmap = read("src/data/roadmap.ts");
const data = read("src/data/ecosystem.ts");
const cards = read("src/styles/cards.css");
const sections = read("src/styles/sections.css");

assert.ok(home.indexOf("<TreeHeroSection") < home.indexOf("<EcosystemSection />"));
assert.ok(home.indexOf("<EcosystemSection />") < home.indexOf("<AboutSection />"));
assert.ok(home.indexOf("<AboutSection />") < home.indexOf("<MissionSection />"));
assert.ok(home.indexOf("<MissionSection />") < home.indexOf("<VisionSection />"));
assert.ok(home.indexOf("<VisionSection />") < home.indexOf("<RoadmapSection />"));
for (const [source, anchor] of [[ecosystem,"ecosystem-projects"],[about,"about"],[mission,"mission"],[vision,"vision"],[roadmapSection,"roadmap"]]) assert.match(source, new RegExp(`id="${anchor}"`));
assert.match(ecosystem, /publicApplications\.map/);
assert.deepEqual([...ecosystem.matchAll(/^\s+(academy|path|"ojcs-connect"):/gm)].map((m)=>m[1].replaceAll('"','')), ["academy","path","ojcs-connect"]);
assert.match(ecosystem, /data-software-count=\{publicSoftware\.length\}/);
assert.doesNotMatch(ecosystem, /publicSoftware\.map|OnJarama School|\bOJS\b|\bOJE\b|bientôt|prochainement/i);
assert.match(ecosystem, /ecosystem-role--portal[\s\S]*href=\{webPortalEntity\.publicPagePath\}/);
assert.match(data, /publicPagePath: "\/ojw"/);
assert.match(ecosystem, /ecosystem-role--foundation[\s\S]*socle présent/);
assert.doesNotMatch(`${ecosystem}\n${vision}\n${roadmap}`, /À terme,? OnJarama Foundation portera|future présentation de sa Constitution|Structuration progressive d.OnJarama Foundation/i);
assert.doesNotMatch(home, /path="\/ojf"/i);
assert.match(cards, /grid-template-columns:minmax\(0,1\.25fr\) minmax\(300px,\.75fr\)/);
assert.match(cards, /@media \(max-width: 820px\)[\s\S]*grid-template-columns:1fr/);
assert.match(cards, /\.ecosystem-role__link[\s\S]*min-height: 44px/);
assert.match(sections, /@media \(max-width: 760px\)/);

console.log("OJW-HOME-04-A: institutional uplift, canonical taxonomy, doctrine, anchors and responsive structure validated.");
