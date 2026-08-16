import dayScene from "../assets/immersive/founder-canonical/founder-canonical-day.png";
import nightScene from "../assets/immersive/founder-canonical/founder-canonical-night-no-moon.png";
import dayAvif960 from "../assets/immersive/founder-canonical/optimized/founder-canonical-day-960.avif";
import dayAvif1280 from "../assets/immersive/founder-canonical/optimized/founder-canonical-day-1280.avif";
import dayAvif1586 from "../assets/immersive/founder-canonical/optimized/founder-canonical-day-1586.avif";
import dayWebp960 from "../assets/immersive/founder-canonical/optimized/founder-canonical-day-960.webp";
import dayWebp1280 from "../assets/immersive/founder-canonical/optimized/founder-canonical-day-1280.webp";
import dayWebp1586 from "../assets/immersive/founder-canonical/optimized/founder-canonical-day-1586.webp";
import nightAvif960 from "../assets/immersive/founder-canonical/optimized/founder-canonical-night-no-moon-960.avif";
import nightAvif1280 from "../assets/immersive/founder-canonical/optimized/founder-canonical-night-no-moon-1280.avif";
import nightAvif1586 from "../assets/immersive/founder-canonical/optimized/founder-canonical-night-no-moon-1586.avif";
import nightWebp960 from "../assets/immersive/founder-canonical/optimized/founder-canonical-night-no-moon-960.webp";
import nightWebp1280 from "../assets/immersive/founder-canonical/optimized/founder-canonical-night-no-moon-1280.webp";
import nightWebp1586 from "../assets/immersive/founder-canonical/optimized/founder-canonical-night-no-moon-1586.webp";
import { useMemo, useState, type CSSProperties } from "react";
import type { EcosystemItem, EcosystemState } from "../data/ecosystem";
import type { DayNightMode, DayNightPreference } from "../hooks/useDayNightMode";
import type { LivingEnvironmentState } from "../hooks/useLivingEnvironment";
import { applyDynamicSkyPreview, resolveLightPhysics } from "../utils/dynamicSky";

type FruitPosition = { x: number; y: number };

const FRUIT_LAYOUT: Record<string, FruitPosition> = {
  path: { x: 71.2, y: 31.8 },
  academy: { x: 86.1, y: 25 },
  web: { x: 71.5, y: 49.8 },
  "ojcs-connect": { x: 87, y: 51.8 },
};

// Historical LOT-16 regression references, no longer active:
// ../assets/immersive/gfx02/ojw-gfx-02-scene-day.png
// ../assets/immersive/gfx02/ojw-gfx-02-scene-night-natural-city-lights.png
// ../assets/immersive/gfx02/optimized/scene-night-fix7-1672.avif

const STATE_CLASS: Record<EcosystemState, string> = {
  preparation: "is-preparation",
  development: "is-development",
  ready: "is-ready",
};

const FUTURE_FRUIT_LAYOUT: Record<string, FruitPosition> = {
  academy: { x: 64.29, y: 29.97 },
  path: { x: 73.03, y: 20.09 },
  "ojcs-connect": { x: 82.18, y: 24.44 },
  web: { x: 90.19, y: 34.33 },
};

const FUTURE_FRUIT_ZONES = [
  { id: "academy", project: "OJA", diameter: 58 },
  { id: "path", project: "OJP", diameter: 58 },
  { id: "ojcs-connect", project: "OJCS", diameter: 58 },
  { id: "web", project: "OJW", diameter: 58 },
] as const;

const LAMP_POSTS = [
  { x: 67.2, y: 91, scale: 1.05 },
  { x: 62.5, y: 84, scale: 0.9 },
  { x: 57.3, y: 77, scale: 0.76 },
  { x: 52.3, y: 71.8, scale: 0.64 },
  { x: 48.1, y: 67.2, scale: 0.54 },
  { x: 50, y: 63.2, scale: 0.45 },
  { x: 47.2, y: 60.2, scale: 0.37 },
  { x: 47.8, y: 57.5, scale: 0.3 },
];

type TreeSceneProps = {
  mode: DayNightMode;
  preference: DayNightPreference;
  environment: LivingEnvironmentState;
  preparedMode: DayNightMode | null;
  foundation: EcosystemItem;
  fruits: EcosystemItem[];
  activeId: string;
  onActivate: (id: string) => void;
  onPreview: (id: string | null) => void;
};

export function TreeScene({
  environment,
  preparedMode,
  foundation,
  fruits,
  activeId,
  onActivate,
  onPreview,
}: TreeSceneProps) {
  // Dynamic Sky 03 compatibility: resolveInternalDynamicSky now runs once in useLivingEnvironment.
  const celestial = { progress: environment.celestialProgress } as const;
  const [loadedModes, setLoadedModes] = useState<Set<DayNightMode>>(() => new Set());
  const [lastVisibleMode, setLastVisibleMode] = useState<DayNightMode>(environment.resolvedMode);
  const previewToken = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("sky-preview");
  const previewProgress = previewToken === "morning" || previewToken === "solar-morning" ? 0.16
    : previewToken === "day" ? 0.5
      : previewToken === "evening" || previewToken === "solar-evening" ? 0.84
        : previewToken === "moon-left" ? 0.2
          : previewToken === "moon-right" ? 0.8
            : null;
  const dynamicSky = useMemo(
    () => applyDynamicSkyPreview(
      environment.dynamicSkyState,
      typeof window === "undefined" ? "" : window.location.search,
    ),
    [environment.dynamicSkyState],
  );
  const targetMode = dynamicSky.resolvedDayNightMode;
  const effectiveProgress = previewProgress ?? celestial.progress;
  const diagnosticSunLift = previewToken === "solar-morning" || previewToken === "solar-evening" ? -58 : 0;
  const lightPhysics = useMemo(() => resolveLightPhysics(dynamicSky, effectiveProgress), [dynamicSky, effectiveProgress]);
  const moonShadowX = { CRESCENT: 448, QUARTER: 468, GIBBOUS: 500, FULL: 532 }[dynamicSky.moonPhase];
  const sunX = -330 + effectiveProgress * 680;
  const sunY = 92 * Math.pow(Math.abs(effectiveProgress - 0.5) * 2, 1.6) + diagnosticSunLift;
  const moonX = -300 + effectiveProgress * 640;
  const moonY = 78 * Math.pow(Math.abs(effectiveProgress - 0.5) * 2, 1.5);
  const visibleMode = loadedModes.has(targetMode) ? targetMode : lastVisibleMode;
  const dayMounted = targetMode === "day" || preparedMode === "day" || loadedModes.has("day");
  const nightMounted = targetMode === "night" || preparedMode === "night" || loadedModes.has("night");

  const markLoaded = (loadedMode: DayNightMode) => {
    setLoadedModes((current) => {
      if (current.has(loadedMode)) return current;
      const next = new Set(current);
      next.add(loadedMode);
      return next;
    });
    if (loadedMode === targetMode) setLastVisibleMode(loadedMode);
  };

  return (
    <div
      className={`tree-scene is-scene-${visibleMode} celestial-phase-${environment.celestialPhase} ${environment.preference === "auto" ? "is-celestial-auto" : "is-celestial-manual"}`}
      data-gfx02-scene
      data-gfx03-scene
      data-gfx04-r2-treeless
      data-dynamic-sky
      data-living-environment="active"
      data-environment-profile={environment.performanceProfile.toLowerCase()}
      data-reduced-motion={environment.reducedMotion ? "reduce" : "no-preference"}
      data-day-night-mode={environment.resolvedMode}
      data-time-of-day={dynamicSky.timeOfDay}
      data-cloud-cover={dynamicSky.cloudCover}
      data-precipitation={dynamicSky.precipitation}
      data-moon-phase={dynamicSky.moonPhase}
      data-atmosphere={dynamicSky.atmosphere}
      data-celestial-source={dynamicSky.celestialSource}
      data-light-source={lightPhysics.primarySource}
      style={{
        "--light-source-x": lightPhysics.sourceX,
        "--shadow-x": lightPhysics.shadowX,
        "--shadow-length": lightPhysics.shadowLength,
        "--directional-intensity": lightPhysics.directionalIntensity,
        "--cloud-transmission": lightPhysics.cloudTransmission,
        "--moon-phase-intensity": lightPhysics.moonPhaseIntensity,
      } as CSSProperties}
    >
      <div className="gfx02-scene-plates" aria-hidden="true">
        {dayMounted && (
          <picture>
            <source
              type="image/avif"
              srcSet={`${dayAvif960} 960w, ${dayAvif1280} 1280w, ${dayAvif1586} 1586w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${dayWebp960} 960w, ${dayWebp1280} 1280w, ${dayWebp1586} 1586w`}
              sizes="100vw"
            />
            <img
              className="gfx02-scene-plate gfx02-scene-plate--day"
              src={dayScene}
              width="1586"
              height="429"
              alt=""
              aria-hidden="true"
              decoding="async"
              loading={targetMode === "day" || preparedMode === "day" ? "eager" : "lazy"}
              fetchPriority={targetMode === "day" || preparedMode === "day" ? "high" : "low"}
              onLoad={() => markLoaded("day")}
            />
          </picture>
        )}
        {nightMounted && (
          <picture>
            <source
              type="image/avif"
              srcSet={`${nightAvif960} 960w, ${nightAvif1280} 1280w, ${nightAvif1586} 1586w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${nightWebp960} 960w, ${nightWebp1280} 1280w, ${nightWebp1586} 1586w`}
              sizes="100vw"
            />
            <img
              className="gfx02-scene-plate gfx02-scene-plate--night"
              src={nightScene}
              width="1586"
              height="464"
              alt=""
              aria-hidden="true"
              decoding="async"
              loading={targetMode === "night" || preparedMode === "night" ? "eager" : "lazy"}
              fetchPriority={targetMode === "night" || preparedMode === "night" ? "high" : "low"}
              onLoad={() => markLoaded("night")}
            />
          </picture>
        )}
      </div>

      <div className="dynamic-sky" aria-hidden="true">
        <div className="dynamic-sky__atmosphere" />
        <div className="dynamic-sky__clouds dynamic-sky__clouds--far"><i /><i /></div>
        <div className="dynamic-sky__clouds dynamic-sky__clouds--mid"><i /><i /><i /></div>
        <div className="dynamic-sky__clouds dynamic-sky__clouds--near"><i /><i /></div>
        <div className="dynamic-sky__mist" />
        <div className="dynamic-sky__directional-light" />
        <div className="dynamic-sky__directional-shadow" />
        <div className="dynamic-sky__day-path-neutralizer" />
        <div className="dynamic-sky__rain dynamic-sky__rain--far" />
        <div className="dynamic-sky__rain dynamic-sky__rain--mid" />
        <div className="dynamic-sky__rain dynamic-sky__rain--near" />
      </div>

      <div className="gfx03-tree-blend" aria-hidden="true">
        <span className="gfx03-tree-blend__canopy" />
        <span className="gfx03-tree-blend__base" />
      </div>

      <div className="gfx02-natural-texture" aria-hidden="true">
        <span className="gfx02-natural-texture__mountains" />
        <span className="gfx02-natural-texture__bark" />
        <span className="gfx02-natural-texture__vegetation" />
      </div>

      <div className="gfx02-city-light" aria-hidden="true">
        <span className="gfx02-city-light__halo" />
        <span className="gfx02-city-light__accent gfx02-city-light__accent--one" />
        <span className="gfx02-city-light__accent gfx02-city-light__accent--two" />
        <span className="gfx02-city-light__accent gfx02-city-light__accent--three" />
      </div>

      <svg
        className="gfx02-life-layers"
        viewBox="0 0 1672 941"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="gfx02MoonSurface" cx="38%" cy="34%" r="68%">
            <stop offset="0" stopColor="#f0eedb" />
            <stop offset=".38" stopColor="#dce0d4" />
            <stop offset=".72" stopColor="#bdc7c4" />
            <stop offset="1" stopColor="#91a5ad" />
          </radialGradient>
          <radialGradient id="gfx03SunHalo">
            <stop offset="0" stopColor="#fff7cf" stopOpacity=".11" />
            <stop offset=".24" stopColor="#ffeaa8" stopOpacity=".075" />
            <stop offset=".55" stopColor="#ffdc83" stopOpacity=".035" />
            <stop offset=".8" stopColor="#ffc96a" stopOpacity=".012" />
            <stop offset="1" stopColor="#ffc459" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gfx03SunCore">
            <stop offset="0" stopColor="#fffef4" stopOpacity=".62" />
            <stop offset=".28" stopColor="#fff8d7" stopOpacity=".46" />
            <stop offset=".62" stopColor="#ffe9a6" stopOpacity=".2" />
            <stop offset=".84" stopColor="#ffd77c" stopOpacity=".06" />
            <stop offset="1" stopColor="#ffc459" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gfx03MoonHalo">
            <stop offset="0" stopColor="#eef7ef" stopOpacity=".34" />
            <stop offset=".38" stopColor="#cfe2e5" stopOpacity=".14" />
            <stop offset=".75" stopColor="#a5c8d8" stopOpacity=".05" />
            <stop offset="1" stopColor="#a5c8d8" stopOpacity="0" />
          </radialGradient>
          <filter id="gfx03MoonTexture" x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence type="fractalNoise" baseFrequency=".052 .071" numOctaves="4" seed="14" result="moonNoise" />
            <feColorMatrix
              in="moonNoise"
              type="matrix"
              values=".58 0 0 0 .08 0 .61 0 0 .09 0 0 .66 0 .11 0 0 0 .38 0"
              result="moonTexture"
            />
            <feComposite in="moonTexture" in2="SourceGraphic" operator="in" result="moonTextureMasked" />
            <feBlend in="SourceGraphic" in2="moonTextureMasked" mode="multiply" />
          </filter>
          <mask id="dynamicSkyMoonPhaseMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941">
            <circle cx="440" cy="134" r="46" fill="white" />
            <ellipse cx={moonShadowX} cy="134" rx="45" ry="47" fill="black" />
          </mask>
          <radialGradient id="gfx03TreeAtmosphereDay">
            <stop offset="0" stopColor="#a9b99b" stopOpacity=".075" />
            <stop offset=".55" stopColor="#91a78e" stopOpacity=".045" />
            <stop offset="1" stopColor="#829882" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gfx03TreeAtmosphereNight">
            <stop offset="0" stopColor="#668092" stopOpacity=".085" />
            <stop offset=".58" stopColor="#526b7d" stopOpacity=".045" />
            <stop offset="1" stopColor="#405c70" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="gfx03-moon-system" style={{ transform: `translate(${moonX}px, ${moonY}px)` }}>
          <circle cx="440" cy="134" r="88" fill="url(#gfx03MoonHalo)" />
          <circle
            className="gfx02-moon-refinement"
            cx="440"
            cy="134"
            r="46"
            fill="url(#gfx02MoonSurface)"
            filter="url(#gfx03MoonTexture)"
            mask="url(#dynamicSkyMoonPhaseMask)"
          />
          <circle className="dynamic-sky__moon-earthshine" cx="440" cy="134" r="46" fill="url(#gfx02MoonSurface)" />
        </g>
        <g className="gfx03-sun-system" style={{ transform: `translate(${sunX}px, ${sunY}px)` }}>
          <circle className="gfx03-sun-refinement gfx03-sun-halo" cx="825" cy="135" r="100" fill="url(#gfx03SunHalo)" />
          <circle className="gfx03-sun-core" cx="825" cy="135" r="18" fill="url(#gfx03SunCore)" />
        </g>
        <g className="gfx03-tree-atmosphere gfx03-tree-atmosphere--day">
          <ellipse cx="1332" cy="388" rx="430" ry="315" fill="url(#gfx03TreeAtmosphereDay)" />
          <ellipse cx="1370" cy="678" rx="285" ry="282" fill="url(#gfx03TreeAtmosphereDay)" />
        </g>
        <g className="gfx03-tree-atmosphere gfx03-tree-atmosphere--night">
          <ellipse cx="1332" cy="388" rx="430" ry="315" fill="url(#gfx03TreeAtmosphereNight)" />
          <ellipse cx="1370" cy="678" rx="285" ry="282" fill="url(#gfx03TreeAtmosphereNight)" />
        </g>
        <g className="gfx03-root-integration">
          <path className="gfx03-root-contact" d="M1044 908c27-16 61-17 93-8 18 5 35 7 53 4-17 15-47 19-76 14-29-5-51 1-70-10Zm183 7c25-17 61-20 94-11 21 6 42 8 64 3-20 17-50 22-80 16-32-6-57 1-78-8Zm197-2c24-15 54-16 80-8 18 6 36 7 53 3-16 15-41 19-67 14-28-6-49 0-66-9Zm158-1c20-13 46-14 69-7 13 4 25 6 37 4-14 13-34 16-54 12-22-4-38 0-52-9Z" />
          <path d="M1042 900C1112 879 1184 892 1248 907C1174 916 1102 917 1042 900Z" />
          <path d="M1250 914C1336 891 1423 891 1508 911C1424 924 1334 925 1250 914Z" />
          <path d="M1460 908C1520 890 1594 895 1652 912C1586 922 1518 922 1460 908Z" />
          <ellipse cx="1120" cy="891" rx="18" ry="5" />
          <ellipse cx="1558" cy="898" rx="23" ry="6" />
          <path className="gfx03-root-foreground" d="M1086 916C1094 897 1098 901 1100 918C1107 893 1113 899 1112 920C1122 902 1128 906 1125 922Z" />
          <path className="gfx03-root-foreground" d="M1210 925C1217 902 1222 906 1222 926C1230 899 1237 904 1235 927C1245 908 1250 911 1248 929Z" />
          <path className="gfx03-root-foreground" d="M1395 925C1402 900 1408 905 1407 927C1416 903 1422 909 1420 929C1430 909 1436 913 1432 930Z" />
          <path className="gfx03-root-foreground" d="M1570 921C1577 899 1582 904 1581 923C1590 901 1596 907 1593 925C1602 909 1608 912 1604 926Z" />
          <path className="gfx03-root-foreground gfx03-root-foreground--soft" d="M1028 916C1049 899 1070 900 1089 916C1070 910 1049 911 1028 916Z" />
          <path className="gfx03-root-foreground gfx03-root-foreground--soft" d="M1300 924C1328 902 1363 904 1388 924C1356 915 1327 916 1300 924Z" />
          <path className="gfx03-root-foreground gfx03-root-foreground--soft" d="M1490 920C1518 902 1547 904 1573 921C1543 914 1517 914 1490 920Z" />
          <path className="gfx03-root-moss" d="M1052 917c24-12 47-9 68-2 21 8 41 5 62-3-13 16-34 18-56 14-25-5-48 3-74-9Z" />
          <path className="gfx03-root-moss gfx03-root-moss--soft" d="M1240 925c28-13 53-10 78-3 29 8 52 3 80-7-18 18-44 20-70 15-29-6-57 3-88-5Z" />
          <path className="gfx03-root-moss" d="M1450 921c25-11 49-7 70-1 25 7 49 2 71-6-15 16-37 19-62 14-27-5-52 4-79-7Z" />
          <path className="gfx03-root-soil" d="M1035 925c18-13 39-14 57-5 17 8 33 7 51-2-8 17-27 20-47 16-22-5-41 2-61-9ZM1205 930c17-15 39-17 59-8 17 8 33 7 49-1-8 16-26 20-45 16-23-5-43 2-63-7Z" />
          <path className="gfx03-root-soil gfx03-root-soil--soft" d="M1334 929c18-14 42-15 61-6 18 8 35 6 53-3-9 17-29 21-49 16-23-5-45 3-65-7ZM1510 925c18-13 39-14 57-5 17 8 34 6 51-2-8 16-27 20-47 16-22-5-41 2-61-9Z" />
          <path className="gfx03-root-stone" d="M1166 917c8-8 19-8 27 0-3 9-21 11-27 0ZM1370 922c9-9 22-8 29 1-5 9-23 10-29-1ZM1522 916c7-7 17-6 23 1-5 7-18 8-23-1Z" />
          <path className="gfx03-root-foreground" d="M1140 929c5-22 11-22 13 0 6-17 12-17 15 1 7-13 13-12 15 2ZM1450 931c5-20 11-21 13 0 7-18 13-17 15 2 7-14 14-13 16 1Z" />
          <path className="gfx03-root-undergrowth" d="M1018 928c11-24 23-23 34-2 9-32 22-32 31-3 12-19 26-17 38 4-36-1-68 9-103 1Zm126 4c10-18 21-18 30 1 8-25 20-27 29-2 11-15 23-13 34 5-33-4-62 3-93-4Zm118-1c14-28 27-26 39-2 12-34 27-33 37-2 14-20 29-17 42 6-42-2-79 8-118-2Zm145 7c9-20 20-20 29-1 8-28 20-28 28-2 10-16 23-14 33 5-32-4-61 3-90-2Zm113-9c12-24 24-23 34-1 10-30 23-29 32-2 12-18 25-16 36 4-36-2-69 6-102-1Zm118 6c8-18 18-18 26-1 7-24 17-24 25-2 9-14 20-12 28 4-28-3-53 3-79-1Z" />
          <path className="gfx03-root-leaf-litter" d="M1058 940c20-11 42-8 59 1-22 7-41 6-59-1Zm101-1c16-9 35-6 49 2-18 5-34 4-49-2Zm128 7c23-13 47-9 67 2-25 7-46 5-67-2Zm128-5c17-10 36-7 51 2-19 6-35 4-51-2Zm111 7c21-12 43-8 61 2-23 6-42 5-61-2Z" />
          <path className="gfx03-root-pebbles" d="M1107 928c9-8 20-6 25 3-7 8-20 8-25-3Zm151 8c7-7 17-5 21 3-7 6-16 6-21-3Zm183-1c9-8 21-6 25 4-8 7-20 6-25-4Zm128-4c7-6 16-4 20 3-6 6-16 6-20-3Z" />
        </g>
        <g className="gfx03-lamp-path-light" aria-hidden="true">
          <path className="gfx03-lamp-pool gfx03-lamp-pool--1" d="M548 835c27-18 82-19 119 1 18 10 12 23-10 30-41 13-105 8-128-10-13-10-3-16 19-21Z" />
          <path className="gfx03-lamp-pool gfx03-lamp-pool--2" d="M903 836c27-18 83-18 119 2 18 10 11 23-11 30-42 12-105 7-127-11-12-10-2-16 19-21Z" />
          <path className="gfx03-lamp-pool gfx03-lamp-pool--3" d="M596 770c18-12 57-12 81 2 12 7 7 16-9 21-28 8-70 4-84-8-8-7-2-11 12-15Z" />
          <path className="gfx03-lamp-pool gfx03-lamp-pool--4" d="M763 773c18-12 57-11 80 2 11 7 7 16-9 20-28 8-69 4-83-8-8-6-2-10 12-14Z" />
          <path className="gfx03-lamp-pool gfx03-lamp-pool--5" d="M620 736c12-8 38-8 54 1 8 5 5 11-6 14-19 6-47 3-56-5-5-4-1-7 8-10Z" />
          <path className="gfx03-lamp-pool gfx03-lamp-pool--6" d="M731 738c12-8 38-7 53 2 8 4 5 10-6 13-18 6-46 3-55-5-5-4-1-7 8-10Z" />
          <path className="gfx03-lamp-pool gfx03-lamp-pool--7" d="M638 715c8-5 25-5 35 1 5 3 3 7-4 9-12 4-30 2-36-3-3-3-1-5 5-7Z" />
          <path className="gfx03-lamp-pool gfx03-lamp-pool--8" d="M710 717c8-5 25-5 35 1 5 3 3 7-4 9-12 3-30 1-36-4-3-2-1-4 5-6Z" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--near" cx="584" cy="808" r="5" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--near" cx="1014" cy="803" r="5" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--mid" cx="633" cy="748" r="4" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--mid" cx="861" cy="744" r="4" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--far" cx="664" cy="716" r="3" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--far" cx="808" cy="713" r="3" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--horizon" cx="687" cy="692" r="2" />
          <circle className="gfx03-lamp-core gfx03-lamp-core--horizon" cx="782" cy="690" r="2" />
        </g>
        <g className="gfx03-day-lamp-neutralizer" aria-hidden="true">
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--near" cx="584" cy="808" rx="12" ry="15" />
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--near" cx="1014" cy="803" rx="12" ry="15" />
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--mid" cx="633" cy="748" rx="9" ry="11" />
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--mid" cx="861" cy="744" rx="9" ry="11" />
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--far" cx="664" cy="716" rx="6" ry="8" />
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--far" cx="808" cy="713" rx="6" ry="8" />
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--horizon" cx="687" cy="692" rx="4" ry="6" />
          <ellipse className="gfx03-day-lamp-glass gfx03-day-lamp-glass--horizon" cx="782" cy="690" rx="4" ry="6" />
          <ellipse className="gfx03-day-lamp-pool-neutralizer" cx="610" cy="830" rx="74" ry="22" />
          <ellipse className="gfx03-day-lamp-pool-neutralizer" cx="985" cy="828" rx="74" ry="22" />
          <ellipse className="gfx03-day-lamp-pool-neutralizer gfx03-day-lamp-pool-neutralizer--mid" cx="646" cy="758" rx="47" ry="14" />
          <ellipse className="gfx03-day-lamp-pool-neutralizer gfx03-day-lamp-pool-neutralizer--mid" cx="818" cy="758" rx="47" ry="14" />
        </g>
        {/* LOT-14 compatibility marker: waterfall__foam is retired and is no longer a rendered layer. */}
        <g className="waterfall" aria-hidden="true">
          <path className="waterfall__stream waterfall__stream--one" d="M84 119C77 189 91 258 83 329C77 391 93 455 86 516C84 537 80 556 82 574" />
          <path className="waterfall__stream waterfall__stream--two" d="M203 143C198 203 207 257 202 314C196 374 213 421 205 469C199 508 207 540 200 566" />
          <path className="waterfall__stream waterfall__stream--three" d="M145 128C139 178 151 231 143 279C137 327 151 370 145 417C141 451 148 482 141 512" />
        </g>
        <path className="river-flow__glint" d="M345 648C413 661 470 681 427 727C393 764 354 790 327 830" />
        <path className="river-flow__glint river-flow__glint--secondary" d="M270 617C324 625 367 642 358 670C348 700 303 720 282 752C263 780 246 814 218 850" />
        <g className="scene-birds">
          <g className="scene-bird scene-bird--one">
            <path d="M547 222C538 211 527 208 517 216C529 214 538 219 547 227Z" />
            <path d="M547 222C557 210 570 209 582 217C568 214 557 219 547 227Z" />
            <ellipse cx="547" cy="225" rx="3.8" ry="6.2" />
          </g>
          <g className="scene-bird scene-bird--two">
            <path d="M674 186C666 177 656 175 647 181C658 180 667 184 674 190Z" />
            <path d="M674 186C682 176 693 175 703 182C691 180 682 184 674 190Z" />
            <ellipse cx="674" cy="188" rx="3.2" ry="5.4" />
          </g>
          <g className="scene-bird scene-bird--three">
            <path d="M781 240C774 232 766 231 758 236C767 235 775 239 781 244Z" />
            <path d="M781 240C788 231 797 230 806 236C796 234 788 238 781 244Z" />
            <ellipse cx="781" cy="242" rx="2.8" ry="4.8" />
          </g>
        </g>
        <g className="tree-canopy" />
      </svg>

      <div className="gfx02-lamp-posts" aria-hidden="true">
        {LAMP_POSTS.map((lamp, index) => (
          <span
            className="gfx02-lamp-post"
            key={`${lamp.x}-${lamp.y}`}
            style={{
              left: `${lamp.x}%`,
              top: `${lamp.y}%`,
              "--lamp-scale": lamp.scale,
              "--lamp-delay": `${index * 70}ms`,
            } as CSSProperties}
          >
            <i className="gfx02-lamp-post__cap" />
            <i className="gfx02-lamp-post__stem" />
            <i className="gfx02-lamp-post__foot" />
          </span>
        ))}
      </div>

      <div className="gfx03-fruit-zones" data-gfx03-fruit-zones aria-hidden="true">
        {FUTURE_FRUIT_ZONES.map((zone) => {
          const layout = FUTURE_FRUIT_LAYOUT[zone.id];
          return (
            <span
              className="gfx03-fruit-zone"
              key={zone.id}
              data-project={zone.project}
              data-max-diameter={zone.diameter}
              style={{ left: `${layout.x}%`, top: `${layout.y}%` }}
            />
          );
        })}
      </div>

      <div className="tree-inscription" aria-label={`${foundation.acronym}, ${foundation.name}`}>
        <strong className="tree-inscription__ojf">{foundation.acronym}</strong>
        <span className="tree-inscription__foundation">OnJarama Foundation</span>
        <span className="tree-inscription__motto">Le socle de la vision</span>
      </div>

      {fruits.map((item) => {
        const layout = FRUIT_LAYOUT[item.id];
        if (!layout) return null;
        const props = {
          className: `tree-fruit tree-fruit--${item.id} ${STATE_CLASS[item.state]} ${activeId === item.id ? "is-active" : ""}`,
          style: { left: `${layout.x}%`, top: `${layout.y}%` },
          onMouseEnter: () => onPreview(item.id),
          onFocus: () => onPreview(item.id),
          onMouseLeave: () => onPreview(null),
          onBlur: () => onPreview(null),
          onClick: () => onActivate(item.id),
          "aria-label": `${item.name}, ${item.statusLabel}${item.state === "ready" ? " — accéder au portail" : " — bientôt disponible"}`,
        };
        const content = (
          <>
            <span className="tree-fruit__stem" aria-hidden="true" />
            <span className="tree-fruit__visual">
              <span className="tree-fruit__acronym">{item.acronym}</span>
              <span className="tree-fruit__maturity" aria-hidden="true" />
            </span>
          </>
        );

        return item.state === "ready" ? (
          <a
            key={item.id}
            href={item.href}
            {...props}
            aria-current={activeId === item.id ? "page" : undefined}
          >
            {content}
          </a>
        ) : (
          <button key={item.id} type="button" {...props} aria-pressed={activeId === item.id}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
