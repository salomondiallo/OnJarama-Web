import { ProjectHero } from "../components/ProjectHero";
import { PublicProjectExplorer } from "../components/PublicProjectExplorer";
import { ProjectStatus } from "../components/ProjectStatus";
import { ojaProject } from "../data/projects";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

export default function OJAPage() {
  usePageMetadata(ojaProject.seo);

  return (
    <PublicProjectLayout currentProject="OJA">
      <div className="oja-page a5b-compact-showcase">
        <ProjectHero project={ojaProject} kicker="Application éducative OnJarama" />

        <section className="project-section oja-section oja-story" aria-labelledby="why-oja-title">
          <p className="section-kicker">Pourquoi OJA</p>
          <div className="oja-story__layout">
            <div>
              <h2 id="why-oja-title">Donner de la continuité à chaque parcours d’apprentissage</h2>
              <p className="project-section__lead">{ojaProject.summary}</p>
            </div>
            <div className="oja-principles">
              {ojaProject.why.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="project-section oja-section" aria-labelledby="oja-audiences-title">
          <p className="section-kicker">Pour qui</p>
          <h2 id="oja-audiences-title">Un même parcours, plusieurs accompagnants</h2>
          <div className="oja-audience-strip">
            {ojaProject.audienceDetails.map((item, index) => (
              <div key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>
            ))}
          </div>
        </section>

        <section className="project-section oja-section oja-progress" aria-labelledby="oja-current-title">
          <div className="oja-current__layout">
            <div>
              <ProjectStatus label="Ce qui est déjà engagé" stage="CURRENT" />
              <p className="section-kicker">État actuel</p>
              <h2 id="oja-current-title">Des fondations réelles, pas un lancement annoncé</h2>
              <p className="project-section__lead">OJA dispose d’un cadre de conception et d’un travail éducatif engagés. L’application n’est pas encore proposée comme produit public.</p>
            </div>
            <div className="oja-current__proofs">
              {ojaProject.currentCapabilities.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}
            </div>
          </div>
        </section>

        <section className="project-section oja-section oja-terrain" aria-labelledby="oja-terrain-title">
          <p className="section-kicker">Apprendre dans les réalités du terrain</p>
          <h2 id="oja-terrain-title">La Guinée n’est pas un décor : elle oriente la conception</h2>
          <p className="project-section__lead">Les conditions d’équipement, de connexion et d’accompagnement façonnent les choix d’OJA dès maintenant.</p>
          <div className="oja-terrain__grid">
            <article><span>01</span><h3>Le smartphone comme point d’entrée</h3><p>La conception privilégie une expérience mobile, lisible et attentive à l’accessibilité.</p></article>
            <article><span>02</span><h3>La continuité malgré une connexion irrégulière</h3><p>L’architecture prépare progressivement des usages en connectivité limitée. Toutes les fonctionnalités ne sont pas encore disponibles hors connexion.</p></article>
          </div>
        </section>

        <section className="project-section oja-section oja-building" aria-labelledby="oja-planned-title">
          <div className="oja-building__heading">
            <ProjectStatus label="Ce que nous construisons" stage="PLANNED" />
            <p className="section-kicker">En construction</p>
            <h2 id="oja-planned-title">Trois domaines, une progression cohérente</h2>
          </div>
          <div className="oja-building__domains">
            {ojaProject.plannedCapabilities.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="project-section oja-section" aria-labelledby="oja-roadmap-title">
          <p className="section-kicker">Trajectoire OJA</p>
          <h2 id="oja-roadmap-title">Avancer par étapes, qualifier avant d’ouvrir</h2>
          <ol className="project-roadmap oja-roadmap">
            {ojaProject.roadmap.map((item) => (
              <li key={item.label}><ProjectStatus label={item.stage === "CURRENT" ? "Ce qui est déjà engagé" : item.stage === "PLANNED" ? "Ce que nous construisons" : "Vision de long terme"} stage={item.stage} /><h3>{item.label}</h3><p>{item.description}</p></li>
            ))}
          </ol>
        </section>

        <section className="project-final-cta oja-final-cta" aria-labelledby="oja-cta-title">
          <div><p className="section-kicker">Dans OnJarama</p><h2 id="oja-cta-title">OJA porte la dimension éducative de l’écosystème</h2><p>OJF en est le porteur institutionnel ; OJW en organise la présence publique.</p></div>
          <div className="project-final-cta__actions">
            <a className="button button-primary" href={ojaProject.primaryAction.href}>{ojaProject.primaryAction.label}</a>
            <a className="button button-secondary" href={ojaProject.secondaryAction.href}>{ojaProject.secondaryAction.label}</a>
          </div>
        </section>

        <PublicProjectExplorer currentProject="OJA" />
      </div>
    </PublicProjectLayout>
  );
}
