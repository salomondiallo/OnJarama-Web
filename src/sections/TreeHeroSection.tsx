import { useMemo, useState } from "react";
import { ecosystem } from "../data/ecosystem";
import { TreeScene } from "../components/TreeScene";
import type { DayNightMode } from "../hooks/useDayNightMode";
import type { LivingEnvironmentState } from "../hooks/useLivingEnvironment";
import { resolveSkyPreviewMode } from "../utils/dynamicSky";
import { useTranslation } from "../i18n/useTranslation";

type TreeHeroSectionProps = {
  environment: LivingEnvironmentState;
  preparedMode: DayNightMode | null;
};

export function TreeHeroSection({ environment, preparedMode }: TreeHeroSectionProps) {
  const { t } = useTranslation();
  const foundation = useMemo(() => ecosystem.find((item) => item.kind === "institutional")!, []);
  const fruits = useMemo(() => ecosystem.filter((item) => item.kind !== "institutional"), []);
  const defaultId = useMemo(() => ecosystem.find((item) => item.isCurrent)?.id ?? ecosystem[0].id, []);
  const [activeId, setActiveId] = useState(defaultId);
  const resolvedMode = resolveSkyPreviewMode(typeof window === "undefined" ? "" : window.location.search, environment.resolvedMode);
  const preference = environment.preference;
  return (
    <section id="top" className={`tree-hero premium-section is-${resolvedMode}`} data-light-mode={resolvedMode} aria-label={t("home.hero.label")}>
      <h1 className="sr-only">{t("home.hero.title")}</h1>
      <div className="tree-hero__panorama">
        <TreeScene mode={resolvedMode} preference={preference} preparedMode={preparedMode} environment={environment} foundation={foundation} fruits={fruits} activeId={activeId} onActivate={setActiveId} onPreview={() => {}} />
      </div>
    </section>
  );
}
