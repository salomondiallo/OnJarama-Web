import { publicPageEntities } from "../data/ecosystem";

export type PublicProjectContextCode = "OJA" | "OJP" | "OJCS" | "OJW";

type PublicProjectContextProps = {
  currentProject: PublicProjectContextCode;
};

export function PublicProjectContext({ currentProject }: PublicProjectContextProps) {
  const project = publicPageEntities.find((entity) => entity.acronym === currentProject);

  if (!project) return null;

  return (
    <nav className="public-project-context" aria-label="Contexte de la page publique">
      <a href="/#ecosystem-projects">Écosystème</a>
      <span className="public-project-context__separator" aria-hidden="true">/</span>
      <span className="public-project-context__current" aria-current="page">
        <strong>{project.acronym}</strong>
        <span aria-hidden="true">·</span>
        <span>{project.name}</span>
      </span>
    </nav>
  );
}
