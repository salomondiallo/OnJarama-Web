import type { PublicProjectEditorial } from "../data/projects";
import { ProjectStatus } from "./ProjectStatus";
import { ResponsiveImage } from "./ResponsiveImage";
import { getProjectEmblemSources } from "../data/responsiveAssets";

type ProjectHeroProps = {
  project: PublicProjectEditorial;
  kicker?: string;
};

export function ProjectHero({ project, kicker = "Projet public OnJarama" }: ProjectHeroProps) {
  return (
    <section className="project-hero" aria-labelledby="project-title">
      <div className="project-hero__identity">
        <ResponsiveImage
          sources={getProjectEmblemSources(project.shortName)}
          sizes="(max-width: 760px) 160px, 320px"
          alt={project.emblemAlt}
          width="1024"
          height="1024"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="project-hero__content">
        <ProjectStatus label={project.projectStatus.label} stage={project.projectStatus.stage} />
        <p className="section-kicker">{kicker}</p>
        <h1 id="project-title" data-route-heading tabIndex={-1}>
          <span>{project.shortName}</span>
          {project.name}
        </h1>
        <p className="project-hero__mission">{project.mission}</p>
        <p>{project.projectStatus.detail}</p>
      </div>
    </section>
  );
}
