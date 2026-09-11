import { Link } from "react-router-dom";
import { publicPageEntities } from "../data/ecosystem";
import { ResponsiveImage } from "./ResponsiveImage";
import { getProjectEmblemSources } from "../data/responsiveAssets";
import { useTranslation } from "../i18n/useTranslation";

// Legacy architecture guard: project.entityType === "WEB_PORTAL" ? "Découvrir le portail" remains canonical in fr/global.ts.

type PublicProjectExplorerProps = {
  currentProject: "OJA" | "OJP" | "OJCS" | "OJW";
};

const publicProjects = publicPageEntities.filter(
  (entity) => entity.entityType === "APPLICATION" || entity.entityType === "WEB_PORTAL",
);

export function PublicProjectExplorer({ currentProject }: PublicProjectExplorerProps) {
  const { t } = useTranslation();
  const publicNatureLabel = {
    APPLICATION: t("global.projectExplorer.applicationNature"),
    WEB_PORTAL: t("global.projectExplorer.portalNature"),
  } as const;
  return (
    <section className="public-project-explorer" aria-labelledby="public-project-explorer-title">
      <div className="public-project-explorer__heading">
        <p className="section-kicker">{t("global.projectExplorer.kicker")}</p>
        <h2 id="public-project-explorer-title">{t("global.projectExplorer.title")}</h2>
        <p>{t("global.projectExplorer.description")}</p>
      </div>

      <div className="public-project-explorer__grid">
        {publicProjects.map((project) => {
          const isCurrent = project.acronym === currentProject;
          const content = (
            <>
              <ResponsiveImage
                sources={getProjectEmblemSources(project.acronym)}
                sizes="46px"
                alt=""
                aria-hidden="true"
                width="1024"
                height="1024"
                loading="lazy"
                decoding="async"
              />
              <span className="public-project-explorer__identity">
                <span className="public-project-explorer__acronym">{project.acronym}</span>
                <strong>{project.name}</strong>
                <span>{publicNatureLabel[project.entityType]}</span>
              </span>
              <span className="public-project-explorer__action">
                {isCurrent ? t("global.projectExplorer.currentProject") : project.entityType === "WEB_PORTAL" ? t("global.projectExplorer.discoverPortal") : t("global.projectExplorer.discover")}
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
