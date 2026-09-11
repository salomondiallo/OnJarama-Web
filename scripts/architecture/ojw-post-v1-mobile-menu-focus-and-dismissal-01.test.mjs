import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
const header = read("src/components/Header.tsx");
const main = read("src/main.tsx");

assert.match(header, /useRef<HTMLButtonElement>\(null\)/u, "The hamburger must expose a focused dismissal target.");
assert.match(header, /useRef<HTMLElement>\(null\)/u, "The mobile navigation must expose an outside-click boundary.");
assert.match(header, /event\.key === "Escape"/u, "Escape must dismiss the open mobile menu.");
assert.match(header, /document\.addEventListener\("pointerdown", handlePointerDown\)/u, "Pointer dismissal must cover click and tap outside.");
assert.match(header, /menuToggleRef\.current\?\.contains\(target\) \|\| menuRef\.current\?\.contains\(target\)/u, "The toggle and menu panel must remain inside the dismissal boundary.");
assert.match(header, /menuToggleRef\.current\?\.focus\(\)/u, "Dismissal must support returning focus to the hamburger.");
assert.match(header, /menuRef\.current\?\.contains\(document\.activeElement\)/u, "Outside dismissal must only restore focus when menu context held it.");
assert.match(header, /removeEventListener\("keydown", handleKeyDown\)/u, "The Escape listener must be cleaned up.");
assert.match(header, /removeEventListener\("pointerdown", handlePointerDown\)/u, "The pointer listener must be cleaned up.");
assert.match(header, /<a href=\{homeHref\("#about"\)\} onClick=\{closeMenu\}>/u, "Route selection must retain its existing close behavior.");
assert.doesNotMatch(header, /focus-trap|overflow\s*=|document\.body\.style/u, "No focus trap or scroll lock belongs in this lot.");
assert.match(main, /<I18nProvider>[\s\S]*<App \/>[\s\S]*<\/I18nProvider>/u, "The qualified i18n foundation must remain installed.");

console.log("OJW post-V1 mobile menu: Escape, outside pointer dismissal, targeted focus return and listener cleanup validated.");
