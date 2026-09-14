import { roadmap } from "../data/roadmap";
import { useTranslation } from "../i18n/useTranslation";

export function RoadmapSection() {
  const { t } = useTranslation();
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="section-heading">
        <p className="section-kicker">{t("foundation.roadmap.kicker")}</p>
        <h2 id="roadmap-title">{t("foundation.roadmap.title")}</h2>
        <p>{t("foundation.roadmap.description")}</p>
      </div>
      <div className="timeline">
        {roadmap.map((item) => (
          <article key={item.id}>
            <strong>{t(`foundation.roadmap.steps.${item.id}.label`)}</strong>
            <p>{t(`foundation.roadmap.steps.${item.id}.description`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
