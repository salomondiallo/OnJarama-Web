import dayScene from "../assets/immersive/gfx02/ojw-gfx-02-scene-day.png";
import nightScene from "../assets/immersive/gfx02/ojw-gfx-02-scene-night-natural-city-lights.png";
import dayAvif960 from "../assets/immersive/gfx02/optimized/scene-day-960.avif";
import dayAvif1280 from "../assets/immersive/gfx02/optimized/scene-day-1280.avif";
import dayAvif1672 from "../assets/immersive/gfx02/optimized/scene-day-1672.avif";
import dayWebp960 from "../assets/immersive/gfx02/optimized/scene-day-960.webp";
import dayWebp1280 from "../assets/immersive/gfx02/optimized/scene-day-1280.webp";
import dayWebp1672 from "../assets/immersive/gfx02/optimized/scene-day-1672.webp";
import nightAvif960 from "../assets/immersive/gfx02/optimized/scene-night-fix7-960.avif";
import nightAvif1280 from "../assets/immersive/gfx02/optimized/scene-night-fix7-1280.avif";
import nightAvif1672 from "../assets/immersive/gfx02/optimized/scene-night-fix7-1672.avif";
import nightWebp960 from "../assets/immersive/gfx02/optimized/scene-night-fix7-960.webp";
import nightWebp1280 from "../assets/immersive/gfx02/optimized/scene-night-fix7-1280.webp";
import nightWebp1672 from "../assets/immersive/gfx02/optimized/scene-night-fix7-1672.webp";
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

const STATE_CLASS: Record<EcosystemState, string> = {
  preparation: "is-preparation",
  development: "is-development",
  ready: "is-ready",
};

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
    <div className={`tree-scene is-scene-${visibleMode}`} data-gfx02-scene>
      <div className="gfx02-scene-plates" aria-hidden="true">
        {dayMounted && (
          <picture>
            <source
              type="image/avif"
              srcSet={`${dayAvif960} 960w, ${dayAvif1280} 1280w, ${dayAvif1672} 1672w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${dayWebp960} 960w, ${dayWebp1280} 1280w, ${dayWebp1672} 1672w`}
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
              srcSet={`${nightAvif960} 960w, ${nightAvif1280} 1280w, ${nightAvif1672} 1672w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${nightWebp960} 960w, ${nightWebp1280} 1280w, ${nightWebp1672} 1672w`}
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
            <stop offset="0" stopColor="#fffef0" />
            <stop offset=".5" stopColor="#f1f3df" />
            <stop offset=".82" stopColor="#d7dfd9" />
            <stop offset="1" stopColor="#b9cad1" />
          </radialGradient>
        </defs>
        <circle className="gfx02-moon-refinement" cx="470" cy="126" r="46" fill="url(#gfx02MoonSurface)" />
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
