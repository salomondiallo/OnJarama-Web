import { useState } from "react";
import officialLogo from "../assets/brand/onjarama-official-logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header" aria-label="Navigation principale OnJarama">
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="Accueil OnJarama">
          <img className="brand-logo" src={officialLogo} alt="Logo officiel OnJarama" />
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
          <a href="#about" onClick={closeMenu}>Pourquoi</a>
          <a href="#ecosystem" onClick={closeMenu}>Écosystème</a>
          <a href="#vision" onClick={closeMenu}>Vision</a>
          <a href="#mission" onClick={closeMenu}>Mission</a>
          <a href="#roadmap" onClick={closeMenu}>Roadmap</a>
        </nav>
      </div>
    </header>
  );
}
