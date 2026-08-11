import type { ProjectContentStage } from "../data/projects";

type ProjectStatusProps = {
  label: string;
  stage: ProjectContentStage;
};

export function ProjectStatus({ label, stage }: ProjectStatusProps) {
  return (
    <span className="project-status" data-stage={stage}>
      <span aria-hidden="true" />
      {label}
      <span className="sr-only"> — état {stage.toLowerCase()}</span>
    </span>
  );
}
