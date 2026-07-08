export function Header() {
  return (
    <header className="site-header" aria-label="Navigation principale OnJarama">
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="Accueil OnJarama">
          <span className="brand-mark" aria-hidden="true">
            <span></span><span></span><span></span>
          </span>
          <span className="brand-text">ONJARAMA</span>
        </a>
        <nav className="main-nav" aria-label="Sections du portail">
          <a href="#about">Pourquoi</a>
          <a href="#ecosystem">Ã‰cosystÃ¨me</a>
          <a href="#mission">Mission</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
      </div>
    </header>
  );
}
