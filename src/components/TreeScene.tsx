import dayScene from "../assets/immersive/gfx03/scene-day-tree-b-lamps-physically-off.png";
import nightScene from "../assets/immersive/gfx03/scene-night-tree-b-lamps-physical-fix1.png";
import { useState, type CSSProperties } from "react";
import type { EcosystemItem, EcosystemState } from "../data/ecosystem";
import type { DayNightMode } from "../hooks/useDayNightMode";

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
  preparedMode: DayNightMode | null;
  foundation: EcosystemItem;
  fruits: EcosystemItem[];
  activeId: string;
  onActivate: (id: string) => void;
  onPreview: (id: string | null) => void;
};

export function TreeScene({
  mode,
  preparedMode,
  foundation,
  fruits,
  activeId,
  onActivate,
  onPreview,
}: TreeSceneProps) {
  const [loadedModes, setLoadedModes] = useState<Set<DayNightMode>>(() => new Set());
  const [lastVisibleMode, setLastVisibleMode] = useState<DayNightMode>(mode);
  const visibleMode = loadedModes.has(mode) ? mode : lastVisibleMode;
  const dayMounted = mode === "day" || preparedMode === "day" || loadedModes.has("day");
  const nightMounted = mode === "night" || preparedMode === "night" || loadedModes.has("night");

  const markLoaded = (loadedMode: DayNightMode) => {
    setLoadedModes((current) => {
      if (current.has(loadedMode)) return current;
      const next = new Set(current);
      next.add(loadedMode);
      return next;
    });
    if (loadedMode === mode) setLastVisibleMode(loadedMode);
  };

  return (
    <div className={`tree-scene is-scene-${visibleMode}`} data-gfx02-scene data-gfx03-scene>
      <div className="gfx02-scene-plates" aria-hidden="true">
        {dayMounted && (
          <picture>
            <source
              type="image/avif"
              srcSet={`${dayScene} 960w, ${dayScene} 1280w, ${dayScene} 1672w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${dayScene} 960w, ${dayScene} 1280w, ${dayScene} 1672w`}
              sizes="100vw"
            />
            <img
              className="gfx02-scene-plate gfx02-scene-plate--day"
              src={dayScene}
              width="1672"
              height="941"
              alt=""
              aria-hidden="true"
              decoding="async"
              loading={mode === "day" || preparedMode === "day" ? "eager" : "lazy"}
              fetchPriority={mode === "day" || preparedMode === "day" ? "high" : "low"}
              onLoad={() => markLoaded("day")}
            />
          </picture>
        )}
        {nightMounted && (
          <picture>
            <source
              type="image/avif"
              srcSet={`${nightScene} 960w, ${nightScene} 1280w, ${nightScene} 1672w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${nightScene} 960w, ${nightScene} 1280w, ${nightScene} 1672w`}
              sizes="100vw"
            />
            <img
              className="gfx02-scene-plate gfx02-scene-plate--night"
              src={nightScene}
              width="1672"
              height="941"
              alt=""
              aria-hidden="true"
              decoding="async"
              loading={mode === "night" || preparedMode === "night" ? "eager" : "lazy"}
              fetchPriority={mode === "night" || preparedMode === "night" ? "high" : "low"}
              onLoad={() => markLoaded("night")}
            />
          </picture>
        )}
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
        <g className="gfx03-moon-system">
          <circle cx="440" cy="134" r="88" fill="url(#gfx03MoonHalo)" />
          <circle
            className="gfx02-moon-refinement"
            cx="440"
            cy="134"
            r="29"
            fill="url(#gfx02MoonSurface)"
            filter="url(#gfx03MoonTexture)"
          />
        </g>
        <g className="gfx03-sun-system">
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
          <path className="gfx03-root-contact" d="M1048 902c55-18 111-8 161-3 49 5 92-7 142-9 65-2 111 15 166 12 55-3 102-10 153 5-66 15-143 11-210 10-77-1-145 8-221 4-67-4-132 2-191-19Z" />
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
