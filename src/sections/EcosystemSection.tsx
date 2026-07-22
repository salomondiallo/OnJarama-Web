import { ecosystem } from "../data/ecosystem";

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="section" aria-labelledby="ecosystem-title">
      <div className="section-heading">
        <p className="section-kicker">Écosystème</p>
        <h2 id="ecosystem-title">Les piliers OnJarama</h2>
        <p>
          Une architecture progressive où chaque application garde son rôle tout en partageant une identité commune.
        </p>
      </div>
      <div className="ecosystem-grid">
        {ecosystem.map((item) => (
          <article
            className={`ecosystem-card reveal-up${item.kind === "institutional" ? " ecosystem-card--institutional" : ""}`}
            key={item.id}
          >
            {item.kind === "institutional" ? (
              <span className="ecosystem-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" />
                </svg>
              </span>
            ) : null}
            <span>{item.statusLabel}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="ecosystem-card__action">
              {item.state === "ready" ? (
                <a className="ecosystem-card__link" href={item.href}>
                  {item.isCurrent ? "Vous êtes ici ↑" : "Ouvrir"}
                </a>
              ) : (
                <span className="ecosystem-card__link ecosystem-card__link--pending">
                  Bientôt disponible
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
