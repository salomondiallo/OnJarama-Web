import { ProjectHero } from "../components/ProjectHero";
import { PublicProjectExplorer } from "../components/PublicProjectExplorer";
import { ProjectStatus } from "../components/ProjectStatus";
import { ojpProject } from "../data/projects";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

const publicRoadmapStage = { CURRENT: "En cours de structuration", PLANNED: "À construire", VISION: "Vision" } as const;

export default function OJPPage() {
  usePageMetadata(ojpProject.seo);

  return (
    <PublicProjectLayout currentProject="OJP">
      <div className="ojp-page">
        <ProjectHero project={ojpProject} kicker="Application d’organisation financière personnelle" />

        <section className="project-section ojp-section ojp-problem" aria-labelledby="why-ojp-title">
          <p className="section-kicker">Pourquoi OJP</p>
          <div className="ojp-problem__layout">
            <div><h2 id="why-ojp-title">Retrouver une lecture claire de ses propres priorités</h2><p className="project-section__lead">{ojpProject.summary}</p></div>
            <ul className="ojp-challenges">
              {ojpProject.challenges.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="project-section ojp-section" aria-labelledby="ojp-audiences-title">
          <p className="section-kicker">Pour qui</p>
          <h2 id="ojp-audiences-title">Des situations différentes, un besoin commun de clarté</h2>
          <div className="ojp-audience-line">
            {ojpProject.audienceDetails.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}
          </div>
        </section>

        <section className="ojp-method" aria-labelledby="ojp-method-title">
          <div className="ojp-method__heading"><p className="section-kicker">La méthode OJP</p><h2 id="ojp-method-title">Comprendre. Organiser. Progresser.</h2><p>Une direction de conception, pas une promesse de résultat.</p></div>
          <ol className="ojp-method__steps">
            {ojpProject.why.map((item, index) => <li key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}
          </ol>
        </section>

        <section className="project-section ojp-section ojp-current" aria-labelledby="ojp-current-title">
          <div className="ojp-current__intro"><ProjectStatus label="Ce qui est déjà engagé" stage="CURRENT" /><p className="section-kicker">État actuel</p><h2 id="ojp-current-title">Un cadre en construction, aucun service financier ouvert</h2></div>
          <div className="ojp-current__list">
            {ojpProject.currentCapabilities.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="project-section ojp-section ojp-building" aria-labelledby="ojp-planned-title">
          <div className="ojp-building__heading"><ProjectStatus label="Ce que nous construisons" stage="PLANNED" /><p className="section-kicker">En construction</p><h2 id="ojp-planned-title">Quatre domaines plutôt qu’un catalogue de fonctions</h2></div>
          <div className="ojp-building__domains">
            {ojpProject.plannedCapabilities.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="ojp-responsibility" aria-labelledby="ojp-guardrail-title">
          <div className="ojp-responsibility__heading"><p className="section-kicker">Un cadre responsable</p><h2 id="ojp-guardrail-title">Organiser sans conseiller ni promettre</h2></div>
          <div className="ojp-responsibility__principles">
            <article><h3>Garde-fou financier</h3><p>{ojpProject.financialGuardrail}</p></article>
            <article><h3>Confidentialité par conception</h3><p>{ojpProject.privacyPrinciple}</p><p>Il s’agit d’une exigence future, pas d’une capacité technique déjà livrée.</p></article>
          </div>
        </section>

        <section className="project-section ojp-section" aria-labelledby="ojp-roadmap-title">
          <p className="section-kicker">Trajectoire OJP</p>
          <h2 id="ojp-roadmap-title">Construire la clarté avant d’ouvrir le produit</h2>
          <ol className="project-roadmap ojp-roadmap">
            {ojpProject.roadmap.map((item) => <li key={item.label}><ProjectStatus label={publicRoadmapStage[item.stage]} stage={item.stage} /><h3>{item.label}</h3><p>{item.description}</p></li>)}
          </ol>
        </section>

        <section className="project-final-cta ojp-final-cta" aria-labelledby="ojp-cta-title">
          <div><p className="section-kicker">Dans OnJarama</p><h2 id="ojp-cta-title">OJP explore une relation plus claire aux décisions financières personnelles</h2><p>OJF porte le cadre institutionnel ; OJW organise la présence publique de l’écosystème.</p></div>
          <div className="project-final-cta__actions">
            <a className="button button-primary" href={ojpProject.primaryAction.href}>{ojpProject.primaryAction.label}</a>
            <a className="button button-secondary" href={ojpProject.secondaryAction.href}>{ojpProject.secondaryAction.label}</a>
          </div>
        </section>

        <PublicProjectExplorer currentProject="OJP" />
      </div>
    </PublicProjectLayout>
  );
}
