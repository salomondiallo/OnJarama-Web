import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const app = readFileSync("src/App.tsx", "utf8");

const immutableHeaders = (vercel.headers ?? []).filter((rule) =>
  rule.headers?.some(({ key, value }) =>
    key.toLowerCase() === "cache-control" && /immutable/i.test(value),
  ),
);

assert.equal(immutableHeaders.length, 1, "exactly one immutable cache rule is allowed");
assert.equal(immutableHeaders[0].source, "/assets/(.*)");
assert.match(
  immutableHeaders[0].headers.find(({ key }) => key.toLowerCase() === "cache-control").value,
  /^public, max-age=31536000, immutable$/,
);
assert.notEqual(immutableHeaders[0].source, "/(.*)", "immutable must never be global");
assert.ok(!immutableHeaders[0].source.includes("index.html"), "HTML must remain revalidable");
assert.ok(!immutableHeaders[0].source.includes("favicon"), "non-fingerprinted public assets stay outside immutable caching");

const spaRoutes = ["/oja", "/ojp", "/ojcs", "/ojw"];
assert.deepEqual(
  vercel.rewrites,
  spaRoutes.map((source) => ({ source, destination: "/index.html" })),
  "only canonical public SPA routes may rewrite to index.html",
);
assert.ok(!vercel.rewrites.some(({ source }) => source === "/(.*)" || source.includes(":path")), "unknown routes must not be rewritten to HTTP 200");
assert.ok(!vercel.rewrites.some(({ source }) => source.toLowerCase() === "/ojf"), "OJF has no public route");

for (const route of spaRoutes) {
  assert.match(app, new RegExp(`path=["']${route}["']`), `${route} must remain a React route`);
}
assert.match(app, /path=["']\*["']\s+element=\{<NotFoundPage\s*\/?>\}/, "React NotFound must remain available for client navigation");
assert.ok(!app.includes('path="/ojf"'), "no fictional OJF route");

assert.equal(
  packageJson.scripts["test:ojw:v1-q2-fix-01"],
  "node scripts/architecture/ojw-v1-q2-fix-01-http-404-and-cache-hygiene.test.mjs",
);

console.log("OJW-V1-Q2-FIX-01: explicit SPA routes, real hosting 404 fallback and fingerprinted immutable cache contract validated.");
