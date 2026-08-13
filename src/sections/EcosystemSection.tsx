import { foundationEntity, publicApplications, publicSoftware, webPortalEntity } from "../data/ecosystem";

const APPLICATION_PRESENTATION: Record<string, string> = {
  academy: "oja",
  path: "ojp",
  "ojcs-connect": "ojcs",
};

export function EcosystemSection() {
  return (
    <section id="ecosystem-projects" className="section ecosystem-section" aria-labelledby="ecosystem-projects-title">
      <div className="section-heading ecosystem-section__heading">
        <p className="section-kicker">L’écosystème OnJarama</p>
        <h2 id="ecosystem-projects-title">Un écosystème, plusieurs chemins pour avancer</h2>
        <p>
          OnJarama réunit des applications, de futurs logiciels métier, un portail Web public et un socle institutionnel
          au service d’une même vision.
        </p>
      </div>

      <div className="ecosystem-territories">
        <section className="ecosystem-territory ecosystem-territory--applications" aria-labelledby="applications-title">
          <div className="ecosystem-territory__heading">
            <p className="section-kicker">Produits numériques</p>
            <h3 id="applications-title">Nos applications</h3>
            <p>Des parcours publics conçus autour de l’éducation, de la progression personnelle et des connexions utiles.</p>
          </div>
          <div className="ecosystem-applications-grid" data-application-count={publicApplications.length}>
            {publicApplications.map((item) => (
              <article className={`ecosystem-card ecosystem-card--${APPLICATION_PRESENTATION[item.id]} reveal-up`} key={item.id}>
                <div className="ecosystem-card__emblem">
                  <img src={item.emblem} alt={item.emblemAlt} width="1024" height="1024" />
                </div>
                <p className="ecosystem-card__status">{item.statusLabel}</p>
                <h4><span className="ecosystem-card__acronym">{item.acronym}</span>{item.name}</h4>
                <p>{item.description}</p>
                <div className="ecosystem-card__action">
                  <a className="ecosystem-card__link" href={item.publicPagePath} aria-label={`${item.name} — découvrir la page publique`}>
                    Découvrir le projet <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ecosystem-territory ecosystem-territory--software" aria-labelledby="software-title" data-software-count={publicSoftware.length}>
          <div className="ecosystem-territory__heading">
            <p className="section-kicker">Solutions métier</p>
            <h3 id="software-title">Nos logiciels</h3>
          </div>
          <div className="ecosystem-software-editorial">
            <span className="ecosystem-software-editorial__mark" aria-hidden="true">⌁</span>
            <p>Des solutions métier conçues pour aider des organisations et institutions à structurer leurs activités et leurs opérations.</p>
          </div>
        </section>
      </div>

      <div className="ecosystem-roles">
        <article className="ecosystem-role ecosystem-role--portal">
          <div className="ecosystem-role__emblem"><img src={webPortalEntity.emblem} alt={webPortalEntity.emblemAlt} width="1024" height="1024" /></div>
          <div className="ecosystem-role__content">
            <p className="section-kicker">Point d’entrée officiel</p>
            <h3>OJW — Le portail public</h3>
            <p>Le portail Web public d’OnJarama présente les applications, les logiciels et les composantes institutionnelles, et relie la vision d’ensemble.</p>
            <a className="ecosystem-role__link" href={webPortalEntity.publicPagePath}>Découvrir OJW <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article className="ecosystem-role ecosystem-role--foundation">
          <div className="ecosystem-role__content">
            <p className="section-kicker">Socle institutionnel</p>
            <h3>{foundationEntity.acronym} — Le socle d’OnJarama</h3>
            <p>OJF porte le socle institutionnel d’OnJarama : sa vision, ses principes, ses engagements et la future présentation de sa Constitution.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
