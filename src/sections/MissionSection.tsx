import { useTranslation } from "../i18n/useTranslation";

export function MissionSection() {
  const { t } = useTranslation();
  return (
    <section id="mission" className="section mission-band" aria-labelledby="mission-title">
      <div><p className="section-kicker">{t("foundation.mission.kicker")}</p><h2 id="mission-title">{t("foundation.mission.title")}</h2></div>
      <p>{t("foundation.mission.body")}</p>
    </section>
  );
}
