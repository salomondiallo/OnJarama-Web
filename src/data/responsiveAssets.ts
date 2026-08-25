import logo64Avif from "../assets/brand/optimized/onjarama-official-logo-64.avif";
import logo128Avif from "../assets/brand/optimized/onjarama-official-logo-128.avif";
import logo64Webp from "../assets/brand/optimized/onjarama-official-logo-64.webp";
import logo128Webp from "../assets/brand/optimized/onjarama-official-logo-128.webp";
import officialLogo from "../assets/brand/onjarama-official-logo.png";

import oja160Avif from "../assets/ecosystem/emblems/optimized/oja-emblem-a2-160.avif";
import oja320Avif from "../assets/ecosystem/emblems/optimized/oja-emblem-a2-320.avif";
import oja640Avif from "../assets/ecosystem/emblems/optimized/oja-emblem-a2-640.avif";
import oja160Webp from "../assets/ecosystem/emblems/optimized/oja-emblem-a2-160.webp";
import oja320Webp from "../assets/ecosystem/emblems/optimized/oja-emblem-a2-320.webp";
import oja640Webp from "../assets/ecosystem/emblems/optimized/oja-emblem-a2-640.webp";
import ojaFallback from "../assets/ecosystem/emblems/oja-emblem-a2.png";

import ojp160Avif from "../assets/ecosystem/emblems/optimized/ojp-emblem-a2-160.avif";
import ojp320Avif from "../assets/ecosystem/emblems/optimized/ojp-emblem-a2-320.avif";
import ojp640Avif from "../assets/ecosystem/emblems/optimized/ojp-emblem-a2-640.avif";
import ojp160Webp from "../assets/ecosystem/emblems/optimized/ojp-emblem-a2-160.webp";
import ojp320Webp from "../assets/ecosystem/emblems/optimized/ojp-emblem-a2-320.webp";
import ojp640Webp from "../assets/ecosystem/emblems/optimized/ojp-emblem-a2-640.webp";
import ojpFallback from "../assets/ecosystem/emblems/ojp-emblem-a2.png";

import ojcs160Avif from "../assets/ecosystem/emblems/optimized/ojcs-emblem-a2-160.avif";
import ojcs320Avif from "../assets/ecosystem/emblems/optimized/ojcs-emblem-a2-320.avif";
import ojcs640Avif from "../assets/ecosystem/emblems/optimized/ojcs-emblem-a2-640.avif";
import ojcs160Webp from "../assets/ecosystem/emblems/optimized/ojcs-emblem-a2-160.webp";
import ojcs320Webp from "../assets/ecosystem/emblems/optimized/ojcs-emblem-a2-320.webp";
import ojcs640Webp from "../assets/ecosystem/emblems/optimized/ojcs-emblem-a2-640.webp";
import ojcsFallback from "../assets/ecosystem/emblems/ojcs-emblem-a2.png";

import ojw160Avif from "../assets/ecosystem/emblems/optimized/ojw-emblem-a2-160.avif";
import ojw320Avif from "../assets/ecosystem/emblems/optimized/ojw-emblem-a2-320.avif";
import ojw640Avif from "../assets/ecosystem/emblems/optimized/ojw-emblem-a2-640.avif";
import ojw160Webp from "../assets/ecosystem/emblems/optimized/ojw-emblem-a2-160.webp";
import ojw320Webp from "../assets/ecosystem/emblems/optimized/ojw-emblem-a2-320.webp";
import ojw640Webp from "../assets/ecosystem/emblems/optimized/ojw-emblem-a2-640.webp";
import ojwFallback from "../assets/ecosystem/emblems/ojw-emblem-a2.png";

export type ResponsiveImageSources = {
  avif: string;
  webp: string;
  fallback: string;
};

export const brandLogoSources: ResponsiveImageSources = {
  avif: `${logo64Avif} 64w, ${logo128Avif} 128w`,
  webp: `${logo64Webp} 64w, ${logo128Webp} 128w`,
  fallback: officialLogo,
};

const projectEmblemSources: Record<string, ResponsiveImageSources> = {
  OJA: {
    avif: `${oja160Avif} 160w, ${oja320Avif} 320w, ${oja640Avif} 640w`,
    webp: `${oja160Webp} 160w, ${oja320Webp} 320w, ${oja640Webp} 640w`,
    fallback: ojaFallback,
  },
  OJP: {
    avif: `${ojp160Avif} 160w, ${ojp320Avif} 320w, ${ojp640Avif} 640w`,
    webp: `${ojp160Webp} 160w, ${ojp320Webp} 320w, ${ojp640Webp} 640w`,
    fallback: ojpFallback,
  },
  OJCS: {
    avif: `${ojcs160Avif} 160w, ${ojcs320Avif} 320w, ${ojcs640Avif} 640w`,
    webp: `${ojcs160Webp} 160w, ${ojcs320Webp} 320w, ${ojcs640Webp} 640w`,
    fallback: ojcsFallback,
  },
  OJW: {
    avif: `${ojw160Avif} 160w, ${ojw320Avif} 320w, ${ojw640Avif} 640w`,
    webp: `${ojw160Webp} 160w, ${ojw320Webp} 320w, ${ojw640Webp} 640w`,
    fallback: ojwFallback,
  },
};

export function getProjectEmblemSources(acronym: string) {
  const sources = projectEmblemSources[acronym];
  if (!sources) throw new Error(`Unknown public project emblem: ${acronym}`);
  return sources;
}
