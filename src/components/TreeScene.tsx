import type { EcosystemItem, EcosystemState } from "../data/ecosystem";

type FruitPosition = { x: number; y: number; branch: [number, number][] };

const FRUIT_LAYOUT: Record<string, FruitPosition> = {
  path: { x: 1190, y: 300, branch: [[1370, 640], [1310, 490], [1240, 390], [1190, 300]] },
  academy: { x: 1440, y: 235, branch: [[1360, 625], [1390, 470], [1425, 335], [1440, 235]] },
  "ojcs-connect": { x: 1110, y: 490, branch: [[1360, 650], [1270, 595], [1180, 535], [1110, 490]] },
  web: { x: 1485, y: 455, branch: [[1380, 650], [1420, 590], [1460, 520], [1485, 455]] },
};

const STATE_CLASS: Record<EcosystemState, string> = {
  preparation: "is-preparation",
  development: "is-development",
  ready: "is-ready",
};

function branchPath(points: [number, number][]) {
  const [a, b, c, d] = points;
  return `M ${a[0]} ${a[1]} C ${b[0]} ${b[1]}, ${c[0]} ${c[1]}, ${d[0]} ${d[1]}`;
}

type TreeSceneProps = {
  foundation: EcosystemItem;
  fruits: EcosystemItem[];
  activeId: string;
  onActivate: (id: string) => void;
  onPreview: (id: string | null) => void;
};

export function TreeScene({ fruits, activeId, onActivate, onPreview }: TreeSceneProps) {
  return (
    <div className="tree-scene">
      <svg className="tree-scene__art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Vallée OnJarama avec cascade, cité futuriste, rivière et arbre monumental">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop className="sky-top"/><stop className="sky-bottom" offset="100%"/></linearGradient>
          <linearGradient id="waterfall" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#dffaff"/><stop offset="45%" stopColor="#74d4ef"/><stop offset="72%" stopColor="#efffff"/><stop offset="100%" stopColor="#409fc8"/></linearGradient>
          <linearGradient id="river" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#91e8f5"/><stop offset="48%" stopColor="#3aa6cb"/><stop offset="100%" stopColor="#173e66"/></linearGradient>
          <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#28160c"/><stop offset="42%" stopColor="#77502b"/><stop offset="64%" stopColor="#4b2d18"/><stop offset="100%" stopColor="#1b110a"/></linearGradient>
          <linearGradient id="pathGlow" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#fff1a8"/><stop offset="100%" stopColor="#dcae42" stopOpacity=".25"/></linearGradient>
          <radialGradient id="leaf"><stop stopColor="#75c66f"/><stop offset="100%" stopColor="#155637"/></radialGradient>
          <linearGradient id="pathSurface" x1="1" y1="1" x2="0" y2="0"><stop stopColor="#f6d46d" stopOpacity=".9"/><stop offset="55%" stopColor="#c88e2c" stopOpacity=".62"/><stop offset="100%" stopColor="#fff0a0" stopOpacity=".28"/></linearGradient>
          <radialGradient id="mist"><stop stopColor="#f4feff" stopOpacity=".8"/><stop offset="100%" stopColor="#b8edf5" stopOpacity="0"/></radialGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <rect className="scene-sky" width="1600" height="900" fill="url(#sky)"/>
        <g className="scene-stars" aria-hidden="true">{[[80,80],[190,130],[320,62],[490,115],[680,74],[870,130],[1040,58],[1210,110]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2"/>)}</g>
        <g className="scene-sun" aria-hidden="true"><circle cx="505" cy="120" r="48"/><circle cx="505" cy="120" r="78" className="scene-orb-halo"/></g>
        <g className="scene-moon" aria-hidden="true"><circle cx="505" cy="120" r="38"/><circle cx="521" cy="108" r="37" className="scene-moon-cut"/></g>
        <g className="scene-clouds" aria-hidden="true"><path d="M170 155c28-38 76-25 85 4 37-23 82 0 85 33H120c2-28 23-40 50-37Z"/><path d="M700 105c20-26 54-18 62 3 26-17 60 0 64 24H662c3-20 18-29 38-27Z"/></g>

        <g className="scene-mountains" aria-hidden="true"><path d="M0 430 250 180 410 380 610 220 825 430Z"/><path d="m500 440 300-265 230 255 210-205 265 245Z" className="scene-mountains__far"/></g>
        <g className="scene-city" transform="translate(100 -35) scale(1.12)" aria-hidden="true">
          <g className="city-backdrop">
            <path d="M554 486V374l13-38 13 38v112Zm82 0V318l12-48 13 48v168Zm99 0V345l11-42 12 42v141Zm157 0V326l12-50 13 50v160Zm91 0V382l12-36 13 36v104Z" />
            <path className="city-backdrop__lights" d="M562 397h11m-11 22h11m71-74h10m-10 24h10m89-1h10m-10 24h10m147-60h10m-10 25h10m81 35h10m-10 23h10" />
          </g>

          <ellipse className="city-platform-shadow" cx="800" cy="510" rx="270" ry="55" />
          <path className="city-terrace" d="M530 480h540l-43 54H575Z" />
          <path className="city-plaza" d="M590 478h420l-35 34H625Z" />

          <g className="city-secondary">
            <path className="city-secondary__left" d="M588 482V354l27-42 28 42v128Z" />
            <path className="city-secondary__inner-left" d="M660 482V292l31-54 32 54v190Z" />
            <path className="city-secondary__inner-right" d="M862 482V305l30-48 31 48v177Z" />
            <path className="city-secondary__right" d="M948 482V360l26-40 27 40v122Z" />
            <path className="city-light" d="M603 375h25m-25 25h25m-25 25h25M676 320h31m-31 28h31m-31 28h31m-31 28h31M878 330h29m-29 28h29m-29 28h29m-29 28h29M962 382h25m-25 25h25m-25 25h25" />
          </g>

          <g className="city-central">
            <path className="city-spire" d="M758 484V278l22-46 20-72 21 72 23 46v206Z" />
            <path className="city-spire-core" d="M786 476V265l14-70 15 70v211Z" />
            <path className="city-ring" d="M748 314h104M730 362h141M741 411h118" />
            <path className="city-spire-light" d="M800 186v276" />
          </g>

          <g className="city-lowrise">
            <path d="M555 489v-60l28-19 29 19v60Zm72 0v-74l31-22 32 22v74Zm84 0v-54l27-18 28 18v54Zm127 0v-58l28-19 29 19v58Zm81 0v-70l30-21 31 21v70Zm76 0v-52l25-17 26 17v52Z" />
            <path className="city-lowrise__roofs" d="M553 431h61m11-14h67m17 20h59m68-4h61m20-12h65m11 18h55" />
          </g>

          <ellipse className="city-entrance-halo" cx="800" cy="501" rx="70" ry="20" />
          <path className="city-entrance" d="M755 506q45-45 90 0l-10 15h-70Z" />
          <path className="city-entrance-door" d="M786 510q14-24 28 0v12h-28Z" />
        </g>

        <g className="scene-cliff" aria-hidden="true"><path d="M0 80C120 62 267 105 360 205c45 48 38 102 70 155l-72 242L0 646Z"/><path className="cliff-face" d="M74 174c60 24 110 12 162 40l-35 374H22Zm238 64 85 67-57 281-84 7Z"/><path className="cliff-green" d="M0 82c132-18 262 31 334 126-82-21-140 28-199-3C93 183 49 172 0 188Z"/></g>
        <g className="waterfall" aria-hidden="true">
          <path className="waterfall__body" d="M128 182c30 80 1 151 18 224 14 63-2 132-31 211l224 4c34-96 9-151 13-228 5-91 35-155 5-222Z" fill="url(#waterfall)"/>
          <path className="waterfall__veil" d="M153 185c23 91-7 173 11 260 10 51-5 105-25 162M205 180c-2 115 37 196 5 424M266 176c35 116-13 223 25 431M326 173c-26 124 18 241-10 432"/>
          <path className="waterfall__stream waterfall__stream--one" d="M170 187c28 118-18 247 4 408"/><path className="waterfall__stream waterfall__stream--two" d="M287 180c-7 134 31 260-10 424"/>
          <g className="waterfall__mist"><ellipse cx="227" cy="614" rx="205" ry="67" fill="url(#mist)"/><ellipse cx="303" cy="605" rx="126" ry="45" fill="url(#mist)"/></g>
        </g>

        <path className="scene-ground" d="M0 570c250-65 405-3 590-15 234-15 352-100 558-58 180 37 290 4 452-50v453H0Z"/>
        <g className="river-flow" aria-hidden="true">
          <path className="river-flow__body" d="M86 605c176 38 332-18 469-31 135-13 199 3 271 61 85 69 182 75 315 81 143 7 233 50 305 184H690c-5-80-35-140-125-180-117-52-294-24-479-70Z" fill="url(#river)"/>
          <path className="river-flow__shine river-flow__shine--one" d="M260 612c170 11 292-55 469 40 130 70 239 70 390 89"/><path className="river-flow__shine river-flow__shine--two" d="M400 660c190-39 274 34 380 70 110 37 235 20 360 87"/>
          <path className="river-branch" d="M908 704c142 7 238-13 346-51 58-20 103-17 151 7"/><path className="river-branch-shine" d="M920 695c125 4 226-17 330-49 56-17 99-13 139 8"/>
        </g>

        <g className="luminous-path" aria-hidden="true"><path className="luminous-path__surface" d="M1510 900C1362 822 1218 769 1115 704 1060 650 1020 565 998 510l-25 13c24 68 49 157 85 232 105 71 200 104 288 145Z" fill="url(#pathSurface)"/><path className="luminous-path__edge" d="M1455 887c-154-86-269-115-375-184-48-45-69-117-94-191" filter="url(#softGlow)"/><path className="luminous-path__spark" d="M1455 887c-154-86-269-115-375-184-48-45-69-117-94-191"/></g>
        <g className="scene-birds" aria-hidden="true"><path d="M630 245q16-14 32 0 16-14 32 0"/><path d="M710 205q13-12 26 0 13-12 26 0"/><path d="M785 250q11-10 22 0 11-10 22 0"/></g>

        <g className="tree-canopy" aria-hidden="true">{[[1190,244,165],[1320,145,205],[1480,160,220],[1580,292,210],[1280,365,205],[1485,410,235],[1135,430,145]].map(([cx,cy,r], i) => <path key={`${cx}-${cy}`} d={`M${cx-r},${cy+15}C${cx-r*.92},${cy-r*.55} ${cx-r*.38},${cy-r} ${cx},${cy-r*.82}C${cx+r*.55},${cy-r*1.04} ${cx+r},${cy-r*.4} ${cx+r*.88},${cy+20}C${cx+r},${cy+r*.55} ${cx+r*.28},${cy+r} ${cx},${cy+r*.82}C${cx-r*.6},${cy+r} ${cx-r},${cy+r*.5} ${cx-r},${cy+15}Z`} fill="url(#leaf)" className={`canopy-cluster canopy-cluster--${i}`}/>)}</g>
        <g className="tree-branches" fill="none" stroke="url(#trunk)" strokeLinecap="round" aria-hidden="true">{fruits.map(item => { const p=FRUIT_LAYOUT[item.id]; return p ? <path key={item.id} d={branchPath(p.branch)} strokeWidth={item.id === "web" ? 42 : 34}/> : null; })}<path d="M1370 650C1290 500 1310 325 1265 205" strokeWidth="65"/><path d="M1380 620c65-170 120-270 185-350" strokeWidth="52"/></g>
        <path className="tree-trunk" d="M1192 900c82-132 111-241 92-342-13-71 11-145 84-211 65 68 95 143 80 236-17 104 22 211 121 317Z" fill="url(#trunk)"/>
        <g className="tree-inscription" aria-hidden="true">
          <text className="tree-inscription__ojf" x="1378" y="690" textAnchor="middle">OJF</text>
          <text className="tree-inscription__foundation" x="1378" y="732" textAnchor="middle" textLength="245" lengthAdjust="spacingAndGlyphs">ONJARAMA FOUNDATION</text>
          <text className="tree-inscription__motto" x="1378" y="765" textAnchor="middle" textLength="205" lengthAdjust="spacingAndGlyphs">LE SOCLE DE LA VISION</text>
        </g>
        <g className="tree-roots" fill="none" stroke="url(#trunk)" strokeLinecap="round" aria-hidden="true"><path d="M1355 820c-70 35-159 48-262 80"/><path d="M1415 828c84 22 126 43 185 72"/><path d="M1382 827c-7 31-11 51-8 73"/></g>
      </svg>

      {fruits.map((item) => {
        const layout = FRUIT_LAYOUT[item.id]; if (!layout) return null;
        const props = { className: `tree-fruit tree-fruit--${item.id} ${STATE_CLASS[item.state]} ${activeId === item.id ? "is-active" : ""}`, style: { left: `${layout.x / 16}%`, top: `${layout.y / 9}%` }, onMouseEnter: () => onPreview(item.id), onFocus: () => onPreview(item.id), onMouseLeave: () => onPreview(null), onBlur: () => onPreview(null), onClick: () => onActivate(item.id), "aria-label": `${item.name}, ${item.statusLabel}${item.state === "ready" ? " — accéder au portail" : " — bientôt disponible"}` };
        return item.state === "ready" ? (
          <a key={item.id} href={item.href} {...props} aria-current={activeId === item.id ? "page" : undefined}>
            <span className="tree-fruit__acronym">{item.acronym}</span>
            <span className="tree-fruit__maturity" aria-hidden="true" />
          </a>
        ) : (
          <button key={item.id} type="button" {...props} aria-pressed={activeId === item.id}>
            <span className="tree-fruit__acronym">{item.acronym}</span>
            <span className="tree-fruit__maturity" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
