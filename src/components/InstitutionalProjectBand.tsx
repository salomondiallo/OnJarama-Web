import type { EcosystemItem } from "../data/ecosystem";

const PROJECT_ORDER = ["foundation", "academy", "path", "ojcs-connect", "web"] as const;

const STATE_CLASS: Record<EcosystemItem["state"], string> = {
  preparation: "is-preparation",
  development: "is-development",
  ready: "is-ready",
};

type InstitutionalProjectBandProps = {
  items: EcosystemItem[];
  activeId: string;
  onActivate: (id: string) => void;
  onPreview: (id: string | null) => void;
};

export function InstitutionalProjectBand({
  items,
  activeId,
  onActivate,
  onPreview,
}: InstitutionalProjectBandProps) {
  const orderedItems = PROJECT_ORDER.map((id) => items.find((item) => item.id === id)).filter(
    (item): item is EcosystemItem => Boolean(item),
  );

  return (
    <div className="institutional-projects" data-project-count={orderedItems.length}>
      {orderedItems.map((item) => {
        const isReady = item.state === "ready";
        const commonProps = {
          className: `institutional-card ${STATE_CLASS[item.state]} ${activeId === item.id ? "is-active" : ""}`,
          onMouseEnter: () => onPreview(item.id),
          onFocus: () => onPreview(item.id),
          onMouseLeave: () => onPreview(null),
          onBlur: () => onPreview(null),
          onClick: () => onActivate(item.id),
          "aria-label": `${item.name} — ${item.statusLabel}`,
        };
        const content = (
          <>
            <div className="institutional-card__head">
              <span className="institutional-card__acronym" aria-hidden="true">{item.acronym}</span>
              <span className="institutional-card__status">{item.statusLabel}</span>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="institutional-card__action" aria-hidden="true">
              {isReady ? "Explorer le portail →" : "Présentation du projet"}
            </span>
          </>
        );

        return isReady ? (
          <a key={item.id} href={item.href} {...commonProps} aria-current="page">
            {content}
          </a>
        ) : (
          <button key={item.id} type="button" {...commonProps}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
