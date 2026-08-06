import { ecosystem } from "../data/ecosystem";
import ojaEmblem from "../assets/ecosystem/emblems/oja-emblem-a2.png";
import ojpEmblem from "../assets/ecosystem/emblems/ojp-emblem-a2.png";
import ojcsEmblem from "../assets/ecosystem/emblems/ojcs-emblem-a2.png";
import ojwEmblem from "../assets/ecosystem/emblems/ojw-emblem-a2.png";

const PROJECT_ORDER = ["academy", "path", "ojcs-connect", "web"] as const;

const PROJECT_PRESENTATION = {
  academy: {
    emblem: ojaEmblem,
    alt: "Emblème organique vert du projet OJA",
    accent: "oja",
  },
  path: {
    emblem: ojpEmblem,
    alt: "Emblème-graine bleu et violet du projet OJP",
    accent: "ojp",
  },
  "ojcs-connect": {
    emblem: ojcsEmblem,
    alt: "Emblème communautaire orange du projet OJCS",
    accent: "ojcs",
  },
  web: {
    emblem: ojwEmblem,
    alt: "Emblème-portail bleu du projet OJW",
    accent: "ojw",
  },
} as const;

export function EcosystemSection() {
  const projects = PROJECT_ORDER.map((id) => ecosystem.find((item) => item.id === id)).filter(
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
          const isReady = item.state === "ready" && Boolean(item.href);

          return (
            <article className={`ecosystem-card ecosystem-card--${presentation.accent} reveal-up`} key={item.id}>
              <div className="ecosystem-card__emblem">
                <img src={presentation.emblem} alt={presentation.alt} width="1024" height="1024" />
              </div>
              <p className="ecosystem-card__status">{item.statusLabel}</p>
              <h3>
                <span className="ecosystem-card__acronym">{item.acronym}</span>
                {item.name}
              </h3>
              <p>{item.description}</p>
              <div className="ecosystem-card__action">
                {isReady ? (
                  <a className="ecosystem-card__link" href={item.href} aria-label={`${item.name} — revenir au portail actuel`}>
                    Portail actuel <span aria-hidden="true">↑</span>
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
