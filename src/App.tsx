import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="logo">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <h1>ONJARAMA</h1>
        </div>

        <nav>
          <a href="#services">Services</a>
          <a href="#mission">Mission</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">Portail officiel OnJarama</div>

            <div className="hero-logo">
              <div className="logo large">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <h2>Votre parcours.</h2>
            <h2 className="accent">Votre rythme.</h2>

            <p>
              Le portail officiel de l’écosystème OnJarama. Un point d’entrée
              simple pour découvrir les services disponibles aujourd’hui et ceux
              qui arrivent demain.
            </p>

            <div className="hero-tags">
              <span>Finances</span>
              <span>Projets</span>
              <span>Progression</span>
              <span>Communauté</span>
            </div>

            <div className="hero-buttons">
              <a className="button primary" href="#services">
                Découvrir OnJarama Path
              </a>

              <a className="button secondary" href="#roadmap">
                Voir la vision
              </a>
            </div>
          </div>

          <div className="journey" aria-label="Parcours OnJarama">
            <div className="journey-step step-start">
              <span className="node"></span>
              <strong>Départ</strong>
            </div>

            <div className="journey-step step-discovery">
              <span className="node"></span>
              <strong>Découverte</strong>
            </div>

            <div className="journey-step step-organization">
              <span className="node"></span>
              <strong>Organisation</strong>
            </div>

            <div className="journey-step step-progress">
              <span className="node"></span>
              <strong>Progression</strong>
            </div>

            <div className="journey-step step-goal">
              <span className="node"></span>
              <strong>Objectif</strong>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading">
            <span>Services</span>
            <h3>Ce que propose OnJarama</h3>
            <p>
              Le portail soutient d’abord les services déjà présents dans
              OnJarama Path. OJCS viendra ensuite compléter l’écosystème.
            </p>
          </div>

          <div className="cards">
            <article className="card path">
              <div className="card-top">
                <span className="badge available">Disponible maintenant</span>
              </div>

              <h4>OnJarama Path</h4>

              <p>
                Un guide financier intelligent pour organiser son budget, suivre
                ses objectifs, simuler ses projets et avancer avec plus de clarté.
              </p>

              <div className="service-list">
                <span>Budget</span>
                <span>Épargne</span>
                <span>Objectifs</span>
                <span>Simulateurs</span>
                <span>Parcours</span>
              </div>
            </article>

            <article className="card ojcs">
              <div className="card-top">
                <span className="badge soon">En développement</span>
              </div>

              <h4>OJCS</h4>

              <p>
                Le futur espace de services connectés pour la diaspora, les
                communautés, les opportunités et l’accompagnement.
              </p>

              <div className="service-list">
                <span>Diaspora</span>
                <span>Services</span>
                <span>Réseau</span>
                <span>Communauté</span>
                <span>Opportunités</span>
              </div>
            </article>
          </div>
        </section>

        <section id="mission" className="section mission-section">
          <div className="mission-card">
            <span>Notre mission</span>

            <h3>
              Aider chaque personne à avancer vers ses objectifs à son propre
              rythme.
            </h3>

            <p>
              OnJarama rassemble des outils simples, humains et évolutifs pour
              transformer les idées, les projets et les efforts quotidiens en
              parcours plus clairs.
            </p>
          </div>
        </section>

        <section id="vision" className="section">
          <div className="section-heading">
            <span>Vision</span>
            <h3>Une base simple, humaine et évolutive</h3>
          </div>

          <div className="vision-grid">
            <div>
              <strong>Accessible</strong>
              <p>Des outils simples à comprendre et à utiliser.</p>
            </div>

            <div>
              <strong>Sécurisé</strong>
              <p>Une approche responsable, claire et respectueuse.</p>
            </div>

            <div>
              <strong>Évolutif</strong>
              <p>Un écosystème qui grandit étape par étape.</p>
            </div>

            <div>
              <strong>Humain</strong>
              <p>Une technologie au service des parcours réels.</p>
            </div>
          </div>
        </section>

        <section id="roadmap" className="section">
          <div className="section-heading">
            <span>Roadmap</span>
            <h3>Feuille de route</h3>
          </div>

          <div className="timeline">
            <div>
              <strong>2026</strong>
              <p>OnJarama Path — services financiers, objectifs et simulateurs.</p>
            </div>

            <div>
              <strong>2027</strong>
              <p>OJCS — services connectés, diaspora et communautés.</p>
            </div>

            <div>
              <strong>2028+</strong>
              <p>Écosystème OnJarama — portail central, services et expansion.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <h4>ONJARAMA</h4>
        <p>Votre parcours. Votre rythme.</p>
        <p>Guinée 🇬🇳 • Québec ⚜️ • Canada 🇨🇦</p>
        <p>Créateur : Thierno Diallo</p>
      </footer>
    </div>
  );
}

export default App;