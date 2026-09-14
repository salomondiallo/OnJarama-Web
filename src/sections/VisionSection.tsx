import { useTranslation } from "../i18n/useTranslation";

export function VisionSection() {
  const { t } = useTranslation();
  return (
    <section id="vision" className="section" aria-labelledby="vision-title">
      <div className="section-heading">
        <p className="section-kicker">{t("foundation.vision.kicker")}</p>
        <h2 id="vision-title">{t("foundation.vision.title")}</h2>
      </div>
      <p className="section-text">
        {t("foundation.vision.body")}
      </p>
      <div className="quality-grid">
        <article><strong>{t("foundation.vision.principles.usefulTitle")}</strong><p>{t("foundation.vision.principles.usefulBody")}</p></article>
        <article><strong>{t("foundation.vision.principles.autonomousTitle")}</strong><p>{t("foundation.vision.principles.autonomousBody")}</p></article>
        <article><strong>{t("foundation.vision.principles.humanTitle")}</strong><p>{t("foundation.vision.principles.humanBody")}</p></article>
      </div>
    </section>
  );
}
