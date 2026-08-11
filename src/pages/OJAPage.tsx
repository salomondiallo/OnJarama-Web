import { ProjectHero } from "../components/ProjectHero";
import { ProjectStatus } from "../components/ProjectStatus";
import { ojaProject } from "../data/projects";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

export default function OJAPage() {
  usePageMetadata(ojaProject.seo);

  return (
    <PublicProjectLayout>
      <div className="oja-page">
        <ProjectHero project={ojaProject} kicker="Projet éducatif OnJarama" />

        <section className="project-section oja-section" aria-labelledby="why-oja-title">
          <p className="section-kicker">Pourquoi OJA</p>
          <h2 id="why-oja-title">Une éducation plus accessible, ancrée dans le réel</h2>
          <p className="project-section__lead">{ojaProject.summary}</p>
          <div className="oja-feature-grid">
            {ojaProject.why.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="project-section oja-section" aria-labelledby="oja-audiences-title">
          <p className="section-kicker">Pour qui</p>
          <h2 id="oja-audiences-title">Quatre familles au cœur du projet</h2>
          <div className="oja-audience-grid">
            {ojaProject.audienceDetails.map((item, index) => (
              <article key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>
            ))}
          </div>
        </section>

        <section className="project-section oja-section oja-progress" aria-labelledby="oja-current-title">
          <p className="section-kicker">État actuel</p>
          <h2 id="oja-current-title">Ce qui est déjà engagé</h2>
          <div className="project-capabilities">
            {ojaProject.currentCapabilities.map((item) => (
              <article key={item.title}><ProjectStatus label="Ce qui est déjà engagé" stage={item.stage} /><h3>{item.title}</h3><p>{item.description}</p></article>
            ))}
          </div>
        </section>

        <section className="project-section oja-section oja-building" aria-labelledby="oja-planned-title">
          <p className="section-kicker">Trajectoire</p>
          <h2 id="oja-planned-title">Ce que nous construisons</h2>
          <div className="oja-planned-grid">
            {ojaProject.plannedCapabilities.map((item) => (
              <article key={item.title}><ProjectStatus label="Ce que nous construisons" stage={item.stage} /><h3>{item.title}</h3><p>{item.description}</p></article>
            ))}
          </div>
        </section>

        <section className="project-section oja-section oja-terrain" aria-labelledby="oja-terrain-title">
          <p className="section-kicker">Pensé pour les réalités de terrain</p>
          <h2 id="oja-terrain-title">Guinée d’abord, accès progressivement renforcé</h2>
          <div className="oja-terrain__grid">
            <article><h3>Smartphone et accessibilité</h3><p>La conception privilégie une expérience utilisable sur smartphone et attentive à l’accessibilité.</p></article>
            <article><h3>Connectivité limitée</h3><p>OJA est conçu avec une approche offline-first afin de pouvoir, progressivement, mieux servir les contextes où la connexion Internet est limitée ou intermittente. Toutes les fonctionnalités ne sont pas encore disponibles hors connexion.</p></article>
          </div>
        </section>

        <section className="oja-vision" aria-labelledby="oja-vision-title">
          <ProjectStatus label="Vision de long terme" stage="VISION" />
          <p className="section-kicker">De la Guinée vers le monde</p>
          <h2 id="oja-vision-title">Une approche ancrée, solide et adaptable</h2>
          <p>Faire grandir une approche éducative d’abord ancrée dans les réalités guinéennes, puis adaptable à d’autres contextes, sans présenter cette ambition comme une disponibilité internationale actuelle.</p>
        </section>

        <section className="project-section oja-section" aria-labelledby="oja-roadmap-title">
          <p className="section-kicker">Trajectoire OJA</p>
          <h2 id="oja-roadmap-title">Cinq phases publiques, sans calendrier artificiel</h2>
          <ol className="project-roadmap oja-roadmap">
            {ojaProject.roadmap.map((item) => (
              <li key={item.label}><ProjectStatus label={item.stage === "CURRENT" ? "Ce qui est déjà engagé" : item.stage === "PLANNED" ? "Ce que nous construisons" : "Vision de long terme"} stage={item.stage} /><h3>{item.label}</h3><p>{item.description}</p></li>
            ))}
          </ol>
        </section>

        <section className="project-section oja-section" aria-labelledby="oja-ecosystem-title">
          <p className="section-kicker">Dans l’écosystème OnJarama</p>
          <h2 id="oja-ecosystem-title">La composante éducative, clairement située</h2>
          <div className="project-relations oja-relations">
            <article><h3>OJA</h3><p>OJA est la composante éducative de l’écosystème OnJarama.</p></article>
            {ojaProject.ecosystemRole.projects.map((item) => <article key={item.shortName}><h3>{item.shortName}</h3><p>{item.relation}</p></article>)}
            <article className="project-relations__foundation"><h3>OJF — Fondation</h3><p>{ojaProject.ecosystemRole.foundation.relation}</p></article>
          </div>
        </section>

        <section className="project-final-cta oja-final-cta" aria-labelledby="oja-cta-title">
          <div><p className="section-kicker">Continuer</p><h2 id="oja-cta-title">Découvrir l’écosystème et sa trajectoire</h2></div>
          <div className="project-final-cta__actions">
            <a className="button button-primary" href={ojaProject.primaryAction.href}>{ojaProject.primaryAction.label}</a>
            <a className="button button-secondary" href={ojaProject.secondaryAction.href}>{ojaProject.secondaryAction.label}</a>
          </div>
        </section>
      </div>
    </PublicProjectLayout>
  );
}
