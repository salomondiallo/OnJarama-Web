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
          <article className="ecosystem-card reveal-up" key={item.id}>
            <span>{item.status}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="ecosystem-card__action">
              {item.href ? (
                <a className="ecosystem-card__link" href={item.href}>
                  {item.isCurrent ? "Vous êtes ici" : "Découvrir"}
                </a>
              ) : (
                <span className="ecosystem-card__link ecosystem-card__link--pending">
                  Lien officiel à venir
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="foundation-note reveal-up">
        <strong>À propos d’OnJarama Foundation</strong>
        <p>
          Foundation n’est pas une application : c’est un socle commun passif et versionné.
          Il ne détient ni utilisateur, ni secret, ni base de données partagée — seulement des
          standards que chaque pôle applique librement.
        </p>
      </div>
    </section>
  );
}
