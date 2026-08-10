import { publicProjects } from "../data/ecosystem";

const PROJECT_ORDER = ["academy", "path", "ojcs-connect", "web"] as const;

const PROJECT_PRESENTATION = {
  academy: {
    accent: "oja",
  },
  path: {
    accent: "ojp",
  },
  "ojcs-connect": {
    accent: "ojcs",
  },
  web: {
    accent: "ojw",
  },
} as const;

export function EcosystemSection() {
  const projects = PROJECT_ORDER.map((id) => publicProjects.find((item) => item.id === id)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <section id="ecosystem-projects" className="section ecosystem-section" aria-labelledby="ecosystem-projects-title">
      <div className="section-heading">
        <p className="section-kicker">Écosystème</p>
        <h2 id="ecosystem-projects-title">Un écosystème, plusieurs chemins pour avancer</h2>
        <p>
          Découvrez les projets OnJarama et le rôle que chacun joue dans la construction d’un écosystème humain,
          accessible et durable.
        </p>
      </div>
      <div className="ecosystem-grid" data-project-count={projects.length}>
        {projects.map((item) => {
          const presentation = PROJECT_PRESENTATION[item.id as keyof typeof PROJECT_PRESENTATION];
          const hasPublicPage = item.publicPageAvailable;

          return (
            <article className={`ecosystem-card ecosystem-card--${presentation.accent} reveal-up`} key={item.id}>
              <div className="ecosystem-card__emblem">
                <img src={item.emblem} alt={item.emblemAlt} width="1024" height="1024" />
              </div>
              <p className="ecosystem-card__status">{item.statusLabel}</p>
              <h3>
                <span className="ecosystem-card__acronym">{item.acronym}</span>
                {item.name}
              </h3>
              <p>{item.description}</p>
              <div className="ecosystem-card__action">
                {hasPublicPage ? (
                  <a className="ecosystem-card__link" href={item.publicPagePath} aria-label={`${item.name} — découvrir la page publique`}>
                    Découvrir le projet <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <span className="ecosystem-card__link ecosystem-card__link--pending" aria-disabled="true">
                    Page en préparation
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
