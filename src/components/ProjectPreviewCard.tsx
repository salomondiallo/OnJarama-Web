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
  const titleId = `preview-card-title-${item.id}`;

  return (
    <section
      className={`preview-card preview-card--${item.state}`}
      aria-labelledby={titleId}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="preview-card__head">
        <span className="preview-card__acronym" aria-hidden="true">{item.acronym}</span>
        <div className="preview-card__identity">
          <p className={`preview-card__status ${STATE_LABEL_CLASS[item.state]}`}>
            <span className="preview-card__status-dot" aria-hidden="true" />
            {item.statusLabel}
          </p>
          <h3 id={titleId} className="preview-card__title">{item.name}</h3>
        </div>
      </div>
      <p className="preview-card__text">{item.description}</p>
      <div className="preview-card__action">
        {isReady ? (
          <a className="preview-card__cta" href={item.href}>
            Explorer le portail
          </a>
        ) : (
          <p className="preview-card__pending">Bientôt disponible — aucun lien public actif pour le moment.</p>
        )}
      </div>
    </section>
  );
}
