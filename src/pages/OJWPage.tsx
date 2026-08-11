import { ProjectHero } from "../components/ProjectHero";
import { ProjectStatus } from "../components/ProjectStatus";
import { ojwProject } from "../data/projects";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

export default function OJWPage() {
  usePageMetadata(ojwProject.seo);

  return (
    <PublicProjectLayout>
      <ProjectHero project={ojwProject} />

      <section className="project-section" aria-labelledby="about-ojw-title">
        <p className="section-kicker">Ce qu’est OJW</p>
        <h2 id="about-ojw-title">Le portail public de l’écosystème</h2>
        <p className="project-section__lead">{ojwProject.summary}</p>
        <div className="project-audiences" aria-label="Publics concernés">
          {ojwProject.audiences.map((audience) => <p key={audience}>{audience}</p>)}
        </div>
      </section>

      <section className="project-section" aria-labelledby="ecosystem-role-title">
        <p className="section-kicker">Rôle dans l’écosystème</p>
        <h2 id="ecosystem-role-title">Relier les composantes publiques</h2>
        <div className="project-relations">
          {ojwProject.ecosystemRole.projects.map((item) => (
            <article key={item.shortName}><h3>{item.shortName}</h3><p>{item.relation}</p></article>
          ))}
          <article className="project-relations__foundation">
            <h3>{ojwProject.ecosystemRole.foundation.shortName} — Fondation</h3>
            <p>{ojwProject.ecosystemRole.foundation.relation}</p>
          </article>
        </div>
      </section>

      <section className="project-section" aria-labelledby="current-capabilities-title">
        <p className="section-kicker">Capacités actuelles</p>
        <h2 id="current-capabilities-title">Ce qui existe aujourd’hui</h2>
        <div className="project-capabilities">
          {ojwProject.currentCapabilities.map((item) => (
            <article key={item.title}><ProjectStatus label={item.stage} stage={item.stage} /><h3>{item.title}</h3><p>{item.description}</p></article>
          ))}
        </div>
      </section>

      <section className="project-section" aria-labelledby="trajectory-title">
        <p className="section-kicker">Trajectoire</p>
        <h2 id="trajectory-title">Ce qui est planifié</h2>
        <div className="project-capabilities">
          {ojwProject.plannedCapabilities.map((item) => (
            <article key={item.title}><ProjectStatus label={item.stage} stage={item.stage} /><h3>{item.title}</h3><p>{item.description}</p></article>
          ))}
        </div>
      </section>

      <section className="project-section" aria-labelledby="ojw-roadmap-title">
        <p className="section-kicker">Roadmap OJW</p>
        <h2 id="ojw-roadmap-title">Avancer sans promettre de calendrier artificiel</h2>
        <ol className="project-roadmap">
          {ojwProject.roadmap.map((item) => (
            <li key={item.label}><ProjectStatus label={item.stage} stage={item.stage} /><h3>{item.label}</h3><p>{item.description}</p></li>
          ))}
        </ol>
      </section>

      <section className="project-final-cta" aria-labelledby="project-cta-title">
        <div><p className="section-kicker">Continuer</p><h2 id="project-cta-title">Découvrir OnJarama depuis son point d’entrée principal</h2></div>
        <div className="project-final-cta__actions">
          <a className="button button-primary" href={ojwProject.primaryAction.href}>{ojwProject.primaryAction.label}</a>
          <a className="button button-secondary" href={ojwProject.secondaryAction.href}>{ojwProject.secondaryAction.label}</a>
        </div>
      </section>
    </PublicProjectLayout>
  );
}
