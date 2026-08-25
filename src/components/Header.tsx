import { useState } from "react";
import { DayNightToggle } from "./DayNightToggle";
import type { AutoStrategy, DayNightMode, DayNightPreference } from "../hooks/useDayNightMode";
import type { LocalCelestialLocationStatus } from "../hooks/useLocalCelestialLocation";
import { LocalSkyControl } from "./LocalSkyControl";
import { ResponsiveImage } from "./ResponsiveImage";
import { brandLogoSources } from "../data/responsiveAssets";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const homeHref = (fragment: string) => `${isHomePage ? "" : "/"}${fragment}`;

  return (
    <header className="site-header" aria-label="Navigation principale OnJarama">
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <div className="site-header__inner">
        <a className="brand" href={isHomePage ? "#top" : "/"} aria-label="Accueil OnJarama">
          <ResponsiveImage
            className="brand-logo"
            sources={brandLogoSources}
            sizes="(max-width: 520px) 40px, (max-width: 820px) 44px, 54px"
            alt="Logo officiel OnJarama"
            width="1254"
            height="1254"
            decoding="async"
          />
          <span className="brand-text">ONJARAMA</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav id="main-navigation" className={`main-nav ${isMenuOpen ? "is-open" : ""}`} aria-label="Sections du portail">
          <a href={homeHref("#about")} onClick={closeMenu}>Pourquoi</a>
          <a href={homeHref("#ecosystem-projects")} onClick={closeMenu}>Écosystème</a>
          <a href={homeHref("#vision")} onClick={closeMenu}>Vision</a>
          <a href={homeHref("#mission")} onClick={closeMenu}>Mission</a>
          <a href={homeHref("#roadmap")} onClick={closeMenu}>Roadmap</a>
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
