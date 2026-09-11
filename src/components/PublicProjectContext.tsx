import { publicPageEntities } from "../data/ecosystem";
import { useTranslation } from "../i18n/useTranslation";

export type PublicProjectContextCode = "OJA" | "OJP" | "OJCS" | "OJW";

type PublicProjectContextProps = {
  currentProject: PublicProjectContextCode;
};

export function PublicProjectContext({ currentProject }: PublicProjectContextProps) {
  const { t } = useTranslation();
  const project = publicPageEntities.find((entity) => entity.acronym === currentProject);

  if (!project) return null;

  return (
    <nav className="public-project-context" aria-label={t("global.projectContext.label")}>
      <a href="/#ecosystem-projects">{t("global.projectContext.ecosystem")}</a>
      <span className="public-project-context__separator" aria-hidden="true">/</span>
      <span className="public-project-context__current" aria-current="page">
        <strong>{project.acronym}</strong>
        <span aria-hidden="true">·</span>
        <span>{project.name}</span>
      </span>
    </nav>
  );
}
