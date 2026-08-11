export type ProjectContentStage = "CURRENT" | "PLANNED" | "VISION";

export type ProjectCapability = {
  title: string;
  description: string;
  stage: ProjectContentStage;
};

export type ProjectRoadmapItem = {
  label: string;
  description: string;
  stage: ProjectContentStage;
};

export type ProjectAction = {
  label: string;
  href: `/${string}`;
};

export type PublicProjectEditorial = {
  id: string;
  shortName: string;
  name: string;
  emblem: string;
  emblemAlt: string;
  seo: {
    title: string;
    description: string;
    canonicalUrl: `https://${string}`;
    ogTitle?: string;
    ogDescription?: string;
  };
  mission: string;
  summary: string;
  audiences: readonly string[];
  currentCapabilities: readonly ProjectCapability[];
  plannedCapabilities: readonly ProjectCapability[];
  projectStatus: {
    label: string;
    stage: ProjectContentStage;
    detail: string;
  };
  roadmap: readonly ProjectRoadmapItem[];
  ecosystemRole: {
    projects: readonly { shortName: string; relation: string }[];
    foundation: { shortName: "OJF"; relation: string };
  };
  primaryAction: ProjectAction;
  secondaryAction: ProjectAction;
};
