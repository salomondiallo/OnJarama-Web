import { useTranslation } from "../i18n/useTranslation";

// Legacy architecture guard: "Découvrir la mission" now lives in fr/global.ts.

type FooterProps = { isHomePage?: boolean };

export function Footer({ isHomePage = false }: FooterProps) {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <strong>ONJARAMA</strong>
        <p>{t("global.footer.motto")}</p>
      </div>
      <nav className="site-footer__nav" aria-label={t("global.footer.aboutLabel")}>
        <a href={`${isHomePage ? "" : "/"}#mission`}>{t("global.footer.missionLink")}</a>
      </nav>
      <p className="site-footer__locations">{t("global.footer.locations")}</p>
    </footer>
  );
}
