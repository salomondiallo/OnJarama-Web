import { ProjectHero } from "../components/ProjectHero";
import { ojwProject } from "../data/projects";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

const publicDestinations = [
  { shortName: "OJA", name: "OnJarama Academy", href: "/oja", description: "Éducation, accompagnement et progression." },
  { shortName: "OJP", name: "OnJarama Path", href: "/ojp", description: "Organisation financière personnelle et clarté." },
  { shortName: "OJCS", name: "OJCS Connect", href: "/ojcs", description: "Services, ressources et connexions utiles." },
] as const;

function OJWStatus({ label, stage }: { label: string; stage: "CURRENT" | "PLANNED" | "VISION" }) {
  return <span className="project-status" data-stage={stage}><span aria-hidden="true" />{label}</span>;
}

export default function OJWPage() {
  usePageMetadata(ojwProject.seo);

  return (
    <PublicProjectLayout>
      <div className="ojw-page">
      <ProjectHero project={ojwProject} kicker="Portail public OnJarama" />

      <section className="project-section ojw-section ojw-presence" aria-labelledby="about-ojw-title">
        <p className="section-kicker">onjarama.ca et OJW</p>
        <h2 id="about-ojw-title">Une présence Web publique, organisée par le portail OJW</h2>
        <p className="project-section__lead">{ojwProject.summary}</p>
        <div className="ojw-presence__facts" aria-label="Rôle du portail public">
          <p><strong>onjarama.ca</strong><span>La présence Web publique de l’écosystème.</span></p>
          <p><strong>OJW</strong><span>Le portail qui organise cette présence et relie ses composantes.</span></p>
        </div>
      </section>

      <section className="project-section ojw-section" aria-labelledby="current-capabilities-title">
        <p className="section-kicker">Disponible aujourd’hui</p>
        <h2 id="current-capabilities-title">Ce qu’un visiteur peut faire maintenant</h2>
        <div className="project-capabilities ojw-actions">
          {ojwProject.currentCapabilities.map((item) => (
            <article key={item.title}><OJWStatus label="Ce qui existe aujourd’hui" stage={item.stage} /><h3>{item.title}</h3><p>{item.description}</p></article>
          ))}
        </div>
      </section>

      <section className="project-section ojw-section ojw-map" aria-labelledby="ecosystem-role-title">
        <p className="section-kicker">Cartographie publique</p>
        <h2 id="ecosystem-role-title">Relier sans confondre les composantes</h2>
        <div className="ojw-map__grid">
          <article><p className="ojw-map__type">Applications</p><h3>OJA · OJP · OJCS</h3><p>Trois applications en développement, chacune présentée par une page publique — sans annoncer un accès produit.</p></article>
          <article><p className="ojw-map__type">Portail public</p><h3>OJW</h3><p>Le point d’entrée Web qui organise la découverte et l’orientation.</p></article>
          <article><p className="ojw-map__type">Fondation</p><h3>OJF</h3><p>Le socle institutionnel présent, distinct d’un produit ou d’une application.</p></article>
          <article><p className="ojw-map__type">Solutions métier</p><h3>Une famille en structuration</h3><p>Aucun logiciel n’est actuellement nommé ou annoncé publiquement.</p></article>
        </div>
      </section>

      <section className="project-section ojw-section ojw-destinations" aria-labelledby="ojw-destinations-title">
        <p className="section-kicker">Pages publiques accessibles</p>
        <h2 id="ojw-destinations-title">Explorer les applications depuis leur vitrine publique</h2>
        <div className="ojw-destinations__grid">
          {publicDestinations.map((destination) => (
            <a key={destination.shortName} href={destination.href} aria-label={`${destination.name} — découvrir la page publique`}>
              <span>{destination.shortName}</span><strong>{destination.name}</strong><p>{destination.description}</p><span aria-hidden="true">Découvrir →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="ojw-foundation" aria-labelledby="ojw-foundation-title">
        <div><p className="section-kicker">Socle institutionnel</p><h2 id="ojw-foundation-title">OJF donne une continuité institutionnelle à l’ensemble</h2></div>
        <p>{ojwProject.ecosystemRole.foundation.relation} OJW en expose publiquement la vision, les principes et la trajectoire sans transformer OJF en produit.</p>
      </section>

      <section className="project-section ojw-section" aria-labelledby="ojw-roadmap-title">
        <p className="section-kicker">Trajectoire du portail</p>
        <h2 id="ojw-roadmap-title">Consolider ce qui est public, étendre ce qui est qualifié</h2>
        <ol className="project-roadmap ojw-roadmap">
          {ojwProject.roadmap.map((item) => (
            <li key={item.label}><OJWStatus label={item.label} stage={item.stage} /><h3>{item.label}</h3><p>{item.description}</p></li>
          ))}
        </ol>
      </section>

      <section className="project-final-cta ojw-final-cta" aria-labelledby="project-cta-title">
        <div><p className="section-kicker">Continuer</p><h2 id="project-cta-title">Revenir à la vue d’ensemble publique</h2></div>
        <div className="project-final-cta__actions">
          <a className="button button-primary" href={ojwProject.primaryAction.href}>{ojwProject.primaryAction.label}</a>
          <a className="button button-secondary" href={ojwProject.secondaryAction.href}>{ojwProject.secondaryAction.label}</a>
        </div>
      </section>
      </div>
    </PublicProjectLayout>
  );
}
