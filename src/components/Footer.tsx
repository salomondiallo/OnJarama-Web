type FooterProps = { isHomePage?: boolean };

export function Footer({ isHomePage = false }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <strong>ONJARAMA</strong>
        <p>Construisons ensemble l’avenir.</p>
      </div>
      <nav className="site-footer__nav" aria-label="Soutien">
        <a href={`${isHomePage ? "" : "/"}#mission`}>Nous soutenir</a>
      </nav>
      <p className="site-footer__locations">Guinée • Québec • Canada</p>
    </footer>
  );
}
