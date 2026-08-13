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
        <div>
          <p className="section-kicker">L’écosystème OnJarama</p>
          <h2 id="ecosystem-projects-title">Une vision commune, des voies d’action distinctes.</h2>
          <p>OnJarama relie des applications, une famille de solutions métier, un portail Web public et un socle institutionnel au service d’une même ambition humaine.</p>
        </div>
        <dl className="ecosystem-section__map" aria-label="Lecture structurée de l’écosystème">
          <div><dt>Applications</dt><dd>OJA · OJP · OJCS</dd></div>
          <div><dt>Solutions métier</dt><dd>Une famille en structuration</dd></div>
          <div><dt>Portail public</dt><dd>OJW</dd></div>
          <div><dt>Socle institutionnel</dt><dd>OJF</dd></div>
        </dl>
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
            <p>Cette famille accueillera les solutions métier OnJarama dédiées à l’organisation, aux opérations et à la coordination.</p>
            <ul>
              <li>Chaque solution sera définie à partir d’un besoin qualifié.</li>
              <li>Son identité sera établie après qualification et ratification.</li>
              <li>Aucun logiciel n’est actuellement annoncé publiquement.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="ecosystem-roles">
        <article className="ecosystem-role ecosystem-role--portal">
          <div className="ecosystem-role__emblem"><img src={webPortalEntity.emblem} alt={webPortalEntity.emblemAlt} width="1024" height="1024" /></div>
          <div className="ecosystem-role__content">
            <p className="section-kicker">Portail public actif</p>
            <h3>OJW — Le portail public</h3>
            <p>OJW est le point d’entrée Web officiel pour découvrir les applications, les futures solutions métier et la dimension institutionnelle d’OnJarama.</p>
            <a className="ecosystem-role__link" href={webPortalEntity.publicPagePath}>Découvrir OJW <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article className="ecosystem-role ecosystem-role--foundation">
          <div className="ecosystem-role__content">
            <p className="section-kicker">Fondation institutionnelle</p>
            <h3>{foundationEntity.acronym} — Le socle présent d’OnJarama</h3>
            <p>OJF porte dès aujourd’hui la continuité institutionnelle de l’écosystème et son introduction publique à la Constitution OnJarama.</p>
            <ul className="ecosystem-foundation-pillars">
              <li>Vision et principes</li><li>Valeurs et engagements</li><li>Objectifs institutionnels</li><li>Constitution OnJarama</li>
            </ul>
            <p className="ecosystem-role__note">Ces contenus seront approfondis progressivement, sans remettre en cause le rôle institutionnel déjà établi d’OJF.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
