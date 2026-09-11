import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");

const buttons = read("src/styles/buttons.css");
const header = read("src/styles/header.css");
const cards = read("src/styles/cards.css");
const projectPages = read("src/styles/project-pages.css");

assert.match(buttons, /\.button:hover\s*\{/u, "Shared buttons must expose hover feedback.");
assert.match(buttons, /\.button:focus-visible\s*\{/u, "Shared buttons must preserve keyboard focus.");
assert.match(buttons, /\.button:active\s*\{/u, "Shared buttons must expose pressed feedback.");

assert.match(header, /\.main-nav a:focus-visible\s*\{/u, "Header navigation must expose explicit focus-visible feedback.");
assert.doesNotMatch(header, /\.main-nav a:hover\s*,\s*\.main-nav a:focus-visible[^}]*outline:\s*none/su, "Header focus must not be removed.");
for (const selector of [
  ".main-nav a:active",
  ".menu-toggle:active",
  ".site-header__ambience .day-night-toggle button:active",
  ".local-sky-control__trigger:active",
]) {
  assert.ok(header.includes(selector), `${selector} must expose pressed feedback.`);
}

assert.match(cards, /\.ecosystem-card__link:active/u, "Application card actions must expose pressed feedback.");
assert.match(cards, /\.ecosystem-role__link:active/u, "Public role actions must expose pressed feedback.");
assert.match(cards, /\.ecosystem-foundation-disclosure button:hover/u, "OJF disclosures must expose hover feedback.");
assert.match(cards, /\.ecosystem-foundation-disclosure button:active/u, "OJF disclosures must expose pressed feedback.");
assert.match(projectPages, /\.public-project-explorer__item:not\(\.is-current\):active/u, "Interactive project explorer items must expose pressed feedback.");

const reducedMotion = [buttons, header, cards, projectPages].join("\n");
assert.match(reducedMotion, /@media\s*\(prefers-reduced-motion:\s*reduce\)/u, "Interaction motion must retain a reduced-motion contract.");
assert.doesNotMatch(reducedMotion, /requestAnimationFrame|canvas|webgl/iu, "CSS interaction polish must not add a rendering engine.");

console.log("OJW post-V1 public interaction polish: shared hover, focus, press and reduced-motion contracts validated.");
