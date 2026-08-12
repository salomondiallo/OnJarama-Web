import { ProjectHero } from "../components/ProjectHero";
import { ProjectStatus } from "../components/ProjectStatus";
import { ojpProject } from "../data/projects";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

const publicRoadmapStage = { CURRENT: "En cours de structuration", PLANNED: "À construire", VISION: "Vision" } as const;

export default function OJPPage() {
  usePageMetadata(ojpProject.seo);

  return (
    <PublicProjectLayout>
      <div className="ojp-page">
        <ProjectHero project={ojpProject} kicker="Projet d’organisation et de progression financière OnJarama" />

        <section className="project-section ojp-section" aria-labelledby="why-ojp-title">
          <p className="section-kicker">Pourquoi OJP</p>
          <h2 id="why-ojp-title">Comprendre, organiser, progresser</h2>
          <p className="project-section__lead">{ojpProject.summary}</p>
          <div className="ojp-path-grid">
            {ojpProject.why.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="project-section ojp-section" aria-labelledby="ojp-audiences-title">
          <p className="section-kicker">Pour qui</p>
          <h2 id="ojp-audiences-title">Trois profils, un besoin commun de clarté</h2>
          <div className="ojp-audience-grid">
            {ojpProject.audienceDetails.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="project-section ojp-section ojp-current" aria-labelledby="ojp-current-title">
          <p className="section-kicker">État actuel</p>
          <h2 id="ojp-current-title">Ce qui est déjà engagé</h2>
          <div className="project-capabilities ojp-capabilities">
            {ojpProject.currentCapabilities.map((item) => <article key={item.title}><ProjectStatus label="Ce qui est déjà engagé" stage={item.stage} /><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="project-section ojp-section ojp-building" aria-labelledby="ojp-planned-title">
          <p className="section-kicker">En construction</p>
          <h2 id="ojp-planned-title">Ce que nous construisons</h2>
          <div className="ojp-planned-grid">
            {ojpProject.plannedCapabilities.map((item) => <article key={item.title}><ProjectStatus label="À construire" stage={item.stage} /><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="ojp-vision" aria-labelledby="ojp-vision-title">
          <ProjectStatus label="Vision" stage="VISION" />
          <p className="section-kicker">Trajectoire personnelle</p>
          <h2 id="ojp-vision-title">{ojpProject.vision.title}</h2>
          <p>{ojpProject.vision.statement}</p>
          <p>{ojpProject.vision.detail}</p>
        </section>

        <section className="ojp-guardrail" aria-labelledby="ojp-guardrail-title">
          <div><p className="section-kicker">Positionnement financier</p><h2 id="ojp-guardrail-title">Organiser sans promettre</h2></div>
          <p>{ojpProject.financialGuardrail}</p>
        </section>

        <section className="project-section ojp-section ojp-privacy" aria-labelledby="ojp-privacy-title">
          <p className="section-kicker">Principe futur</p>
          <h2 id="ojp-privacy-title">Confidentialité et contrôle utilisateur</h2>
          <p className="project-section__lead">{ojpProject.privacyPrinciple}</p>
          <p>Ce principe constitue une exigence de conception future et non une capacité technique déjà livrée.</p>
        </section>

        <section className="project-section ojp-section" aria-labelledby="ojp-roadmap-title">
          <p className="section-kicker">Trajectoire OJP</p>
          <h2 id="ojp-roadmap-title">Cinq phases publiques, sans date artificielle</h2>
          <ol className="project-roadmap ojp-roadmap">
            {ojpProject.roadmap.map((item) => <li key={item.label}><ProjectStatus label={publicRoadmapStage[item.stage]} stage={item.stage} /><h3>{item.label}</h3><p>{item.description}</p></li>)}
          </ol>
        </section>

        <section className="project-section ojp-section" aria-labelledby="ojp-ecosystem-title">
          <p className="section-kicker">Dans l’écosystème OnJarama</p>
          <h2 id="ojp-ecosystem-title">La composante d’organisation financière personnelle</h2>
          <div className="project-relations ojp-relations">
            <article><h3>OJP</h3><p>OJP est la composante d’organisation et de progression financière personnelle de l’écosystème OnJarama.</p></article>
            {ojpProject.ecosystemRole.projects.map((item) => <article key={item.shortName}><h3>{item.shortName}</h3><p>{item.relation}</p></article>)}
            <article className="project-relations__foundation"><h3>OJF — Fondation</h3><p>{ojpProject.ecosystemRole.foundation.relation}</p></article>
          </div>
        </section>

        <section className="project-final-cta ojp-final-cta" aria-labelledby="ojp-cta-title">
          <div><p className="section-kicker">Continuer</p><h2 id="ojp-cta-title">Découvrir l’écosystème et sa trajectoire</h2></div>
          <div className="project-final-cta__actions">
            <a className="button button-primary" href={ojpProject.primaryAction.href}>{ojpProject.primaryAction.label}</a>
            <a className="button button-secondary" href={ojpProject.secondaryAction.href}>{ojpProject.secondaryAction.label}</a>
          </div>
        </section>
      </div>
    </PublicProjectLayout>
  );
}
