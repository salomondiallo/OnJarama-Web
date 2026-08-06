import { useMemo, useState } from "react";
import { ecosystem } from "../data/ecosystem";
import { TreeScene } from "../components/TreeScene";
import { DayNightToggle } from "../components/DayNightToggle";
import { useDayNightMode, type DayNightMode } from "../hooks/useDayNightMode";

export function TreeHeroSection() {
  const foundation = useMemo(() => ecosystem.find((item) => item.kind === "institutional")!, []);
  const fruits = useMemo(() => ecosystem.filter((item) => item.kind !== "institutional"), []);
  const defaultId = useMemo(() => ecosystem.find((item) => item.isCurrent)?.id ?? ecosystem[0].id, []);
  const [activeId, setActiveId] = useState(defaultId);
  const [preparedMode, setPreparedMode] = useState<DayNightMode | null>(null);
  const { mode, preference, setPreference, autoStrategy } = useDayNightMode();

  return (
    <section id="top" className={`tree-hero premium-section is-${mode}`} data-light-mode={mode} aria-labelledby="immersive-hero-title">
      <div className="tree-hero__panorama">
        <div className="tree-hero__intro">
          <p className="tree-hero__eyebrow">OnJarama · Une vision qui prend racine</p>
          <h1 id="immersive-hero-title">UN ÉCOSYSTÈME AU SERVICE D’UNE <br /><span>VISION HUMAINE</span></h1>
          <p className="tree-hero__lead">OnJarama relie éducation, innovation, financement, connexion et fondation pour créer des synergies durables au service d’un avenir meilleur.</p>
          <div className="tree-hero__actions">
            <a className="tree-hero__cta tree-hero__cta--primary" href="#ecosystem-projects">Découvrir l’écosystème</a>
            <a className="tree-hero__cta" href="#roadmap">Voir la roadmap</a>
          </div>
          <DayNightToggle
            value={preference}
            resolvedMode={mode}
            autoStrategy={autoStrategy}
            onChange={setPreference}
            onPrepare={(next) => setPreparedMode(next === "auto" ? mode : next)}
          />
        </div>

        <TreeScene mode={mode} preparedMode={preparedMode} foundation={foundation} fruits={fruits} activeId={activeId} onActivate={setActiveId} onPreview={() => {}} />

      </div>
    </section>
  );
}
