import { useEffect, useRef, useState } from "react";
import { DayNightToggle } from "./DayNightToggle";
import type { AutoStrategy, DayNightMode, DayNightPreference } from "../hooks/useDayNightMode";
import type { LocalCelestialLocationStatus } from "../hooks/useLocalCelestialLocation";
import { LocalSkyControl } from "./LocalSkyControl";
import { ResponsiveImage } from "./ResponsiveImage";
import { brandLogoSources } from "../data/responsiveAssets";
import { useTranslation } from "../i18n/useTranslation";

// Legacy architecture guard: aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"} now resolves through i18n.

type HeaderProps = {
  isHomePage?: boolean;
  showAmbience?: boolean;
  mode: DayNightMode;
  preference: DayNightPreference;
  autoStrategy: AutoStrategy;
  onModeChange: (mode: DayNightPreference) => void;
  onModePrepare: (mode: DayNightPreference) => void;
  locationStatus?: LocalCelestialLocationStatus;
  onSynchronizeLocation?: () => void;
  onClearLocation?: () => void;
};

export function Header({ isHomePage = false, showAmbience = true, mode, preference, autoStrategy, onModeChange, onModePrepare, locationStatus, onSynchronizeLocation, onClearLocation }: HeaderProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const closeMenu = () => setIsMenuOpen(false);
  const homeHref = (fragment: string) => `${isHomePage ? "" : "/"}${fragment}`;

  useEffect(() => {
    if (!isMenuOpen) return;

    const dismissMenu = (returnFocus: boolean) => {
      setIsMenuOpen(false);
      if (returnFocus) menuToggleRef.current?.focus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissMenu(true);
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuToggleRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      dismissMenu(menuRef.current?.contains(document.activeElement) ?? false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header" aria-label={t("global.nav.primaryLabel")}>
      <a className="skip-link" href="#main-content">{t("global.nav.skipToContent")}</a>
      <div className="site-header__inner">
        <a className="brand" href={isHomePage ? "#top" : "/"} aria-label={t("global.nav.home")}>
          <ResponsiveImage
            className="brand-logo"
            sources={brandLogoSources}
            sizes="(max-width: 520px) 40px, (max-width: 820px) 44px, 54px"
            alt={t("global.nav.logoAlt")}
            width="1254"
            height="1254"
            decoding="async"
          />
          <span className="brand-text">ONJARAMA</span>
        </a>
        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? t("a11y.menu.close") : t("a11y.menu.open")}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav ref={menuRef} id="main-navigation" className={`main-nav ${isMenuOpen ? "is-open" : ""}`} aria-label={t("global.nav.sectionsLabel")}>
          <a href={homeHref("#about")} onClick={closeMenu}>{t("global.nav.about")}</a>
          <a href={homeHref("#ecosystem-projects")} onClick={closeMenu}>{t("global.nav.ecosystem")}</a>
          <a href={homeHref("#vision")} onClick={closeMenu}>{t("global.nav.vision")}</a>
          <a href={homeHref("#mission")} onClick={closeMenu}>{t("global.nav.mission")}</a>
          <a href={homeHref("#roadmap")} onClick={closeMenu}>{t("global.nav.roadmap")}</a>
        </nav>
        {showAmbience && (
          <div className={`site-header__ambience is-${mode}`}>
            <DayNightToggle
              value={preference}
              resolvedMode={mode}
              autoStrategy={autoStrategy}
              onChange={onModeChange}
              onPrepare={onModePrepare}
            />
            {preference === "auto" && locationStatus && onSynchronizeLocation && onClearLocation && (
              <LocalSkyControl status={locationStatus} onSynchronize={onSynchronizeLocation} onClear={onClearLocation} />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
