import type { EcosystemItem } from "../data/ecosystem";

const STATE_LABEL_CLASS: Record<EcosystemItem["state"], string> = {
  preparation: "preview-card__status--preparation",
  development: "preview-card__status--development",
  ready: "preview-card__status--ready",
};

type ProjectPreviewCardProps = {
  item: EcosystemItem;
};

export function ProjectPreviewCard({ item }: ProjectPreviewCardProps) {
  const isReady = item.state === "ready";

  return (
    <div className="preview-card" role="status" aria-live="polite">
      <div className="preview-card__head">
        <span className="preview-card__acronym">{item.acronym}</span>
        <div>
          <p className={`preview-card__status ${STATE_LABEL_CLASS[item.state]}`}>{item.statusLabel}</p>
          <h3 className="preview-card__title">{item.name}</h3>
        </div>
      </div>
      <p className="preview-card__text">{item.description}</p>
      {isReady ? (
        <a className="preview-card__cta" href={item.href}>
          Explorer le portail
        </a>
      ) : (
        <p className="preview-card__pending">Bientôt disponible — aucun lien public actif pour le moment.</p>
      )}
    </div>
  );
}
