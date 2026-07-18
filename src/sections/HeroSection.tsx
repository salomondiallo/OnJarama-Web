export function HeroSection() {
  return (
    <section id="top" className="hero premium-section" aria-labelledby="hero-title">
      <div className="hero__content reveal-up">
        <p className="eyebrow">Portail officiel OnJarama</p>
        <h1 id="hero-title">Un écosystème pour avancer avec clarté.</h1>
        <p className="hero__lead">
          OnJarama réunit des outils numériques pensés pour organiser les projets,
          soutenir l’apprentissage, connecter les services et construire une progression durable.
        </p>
        <div className="hero__actions" aria-label="Actions principales">
          <a className="button button-primary" href="#ecosystem">Commencer</a>
          <a className="button button-secondary" href="#roadmap">Voir la trajectoire</a>
        </div>
        <div className="trust-strip" aria-label="Principes OnJarama">
          <span>Mobile-first</span>
          <span>Accessible</span>
          <span>Progressif</span>
          <span>Sécurisé</span>
        </div>
      </div>
      <div className="hero__visual reveal-up" aria-label="Parcours OnJarama">
        <div className="orbit-card">
          <div className="orbit-center">OJ</div>
          <span className="orbit-dot orbit-dot--one">Path</span>
          <span className="orbit-dot orbit-dot--two">Academy</span>
          <span className="orbit-dot orbit-dot--three">OJCS</span>
          <span className="orbit-dot orbit-dot--four">Foundation</span>
        </div>
      </div>
    </section>
  );
}
