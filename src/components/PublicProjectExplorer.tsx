import { Link } from "react-router-dom";
import { publicPageEntities } from "../data/ecosystem";

type PublicProjectExplorerProps = {
  currentProject: "OJA" | "OJP" | "OJCS";
};

const publicNatureLabel = {
  APPLICATION: "Application OnJarama",
  WEB_PORTAL: "Portail web OnJarama",
} as const;

const publicProjects = publicPageEntities.filter(
  (entity) => entity.entityType === "APPLICATION" || entity.entityType === "WEB_PORTAL",
);

export function PublicProjectExplorer({ currentProject }: PublicProjectExplorerProps) {
  return (
    <section className="public-project-explorer" aria-labelledby="public-project-explorer-title">
      <div className="public-project-explorer__heading">
        <p className="section-kicker">Explorer l’écosystème</p>
        <h2 id="public-project-explorer-title">Poursuivre la découverte d’OnJarama</h2>
        <p>Chaque lien ouvre une page publique de présentation. Les applications restent en développement tant que leur disponibilité produit n’est pas qualifiée.</p>
      </div>

      <div className="public-project-explorer__grid">
        {publicProjects.map((project) => {
          const isCurrent = project.acronym === currentProject;
          const content = (
            <>
              <img src={project.emblem} alt="" aria-hidden="true" />
              <span className="public-project-explorer__identity">
                <span className="public-project-explorer__acronym">{project.acronym}</span>
                <strong>{project.name}</strong>
                <span>{publicNatureLabel[project.entityType]}</span>
              </span>
              <span className="public-project-explorer__action">
                {isCurrent ? "Projet actuel" : project.entityType === "WEB_PORTAL" ? "Découvrir le portail" : "Découvrir"}
              </span>
            </>
          );

          return isCurrent ? (
            <article className="public-project-explorer__item is-current" data-accent={project.acronym.toLowerCase()} aria-current="page" key={project.id}>
              {content}
            </article>
          ) : (
            <Link className="public-project-explorer__item" data-accent={project.acronym.toLowerCase()} to={project.publicPagePath} key={project.id}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
