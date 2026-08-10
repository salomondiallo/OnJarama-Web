import { publicProjects } from "../data/ecosystem";
import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

type ProjectPlaceholderPageProps = { projectId: string };

export function ProjectPlaceholderPage({ projectId }: ProjectPlaceholderPageProps) {
  const project = publicProjects.find((item) => item.id === projectId);
  if (!project) return null;

  return (
    <PublicProjectLayout>
      <section className="public-page-placeholder" aria-labelledby="project-placeholder-title">
        <p className="section-kicker">Page publique non publiée</p>
        <h1 id="project-placeholder-title" data-route-heading tabIndex={-1}>{project.shortName}</h1>
        <p>{project.name}</p>
        <strong>Page en préparation</strong>
      </section>
    </PublicProjectLayout>
  );
}
