import { useTranslation } from "../i18n/useTranslation";

export function AboutSection() {
  const { t } = useTranslation();
  return (
    <section id="about" className="section section-split" aria-labelledby="about-title">
      <div className="institutional-section__lead">
        <p className="section-kicker">{t("home.about.kicker")}</p>
        <h2 id="about-title">{t("home.about.title")}</h2>
      </div>
      <div className="institutional-section__body">
        <p className="section-text">{t("home.about.purpose")}</p>
        <p>{t("home.about.technology")}</p>
      </div>
    </section>
  );
}
