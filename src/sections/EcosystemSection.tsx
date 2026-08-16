import { useState } from "react";
import { foundationEntity, publicApplications, publicSoftware, webPortalEntity } from "../data/ecosystem";

const APPLICATION_PRESENTATION: Record<string, string> = {
  academy: "oja",
  path: "ojp",
  "ojcs-connect": "ojcs",
};

const FOUNDATION_DISCLOSURES = [
  {
    id: "vision",
    label: "Vision et principes",
    content: "OJF porte la vision et les principes qui donnent une continuité institutionnelle aux initiatives OnJarama.",
  },
  {
    id: "values",
    label: "Valeurs et engagements",
    content: "Cette section sera approfondie progressivement.",
  },
  {
    id: "objectives",
    label: "Objectifs institutionnels",
    content: "Cette section sera approfondie progressivement.",
  },
  {
    id: "constitution",
    label: "Constitution OnJarama",
    content: "OJF porte l’introduction publique à la Constitution OnJarama. Cette section sera approfondie progressivement.",
  },
] as const;

export function EcosystemSection() {
  const [openFoundationDisclosure, setOpenFoundationDisclosure] = useState<string | null>(null);

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

      <section className="ecosystem-public-presence" aria-labelledby="public-presence-title">
        <div className="ecosystem-public-presence__heading">
          <p className="section-kicker">Portail &amp; Fondation</p>
          <h3 id="public-presence-title">Notre présence publique</h3>
          <p>Le portail Web et le socle institutionnel rendent l’écosystème OnJarama accessible, lisible et cohérent.</p>
        </div>
        <div className="ecosystem-roles">
          <article className="ecosystem-role ecosystem-role--portal">
            <div className="ecosystem-role__emblem"><img src={webPortalEntity.emblem} alt={webPortalEntity.emblemAlt} width="1024" height="1024" /></div>
            <div className="ecosystem-role__content">
              <p className="section-kicker">Portail public actif</p>
              <h4>OJW — Le portail public</h4>
              <p>OJW est le point d’entrée Web officiel pour découvrir les applications, les futures solutions métier et la dimension institutionnelle d’OnJarama.</p>
              <a className="ecosystem-role__link" href={webPortalEntity.publicPagePath}>Découvrir OJW <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article className="ecosystem-role ecosystem-role--foundation">
            <div className="ecosystem-role__content">
              <p className="section-kicker">Fondation institutionnelle</p>
              <h4>{foundationEntity.acronym} — Le socle présent d’OnJarama</h4>
              <p>OJF porte dès aujourd’hui la continuité institutionnelle de l’écosystème et son introduction publique à la Constitution OnJarama.</p>
              <div className="ecosystem-foundation-disclosures">
                {FOUNDATION_DISCLOSURES.map((item) => {
                  const isOpen = openFoundationDisclosure === item.id;
                  const panelId = `foundation-${item.id}-panel`;
                  return (
                    <div className={`ecosystem-foundation-disclosure${isOpen ? " is-open" : ""}`} key={item.id}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFoundationDisclosure(isOpen ? null : item.id)}
                      >
                        <span>{item.label}</span><span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                      </button>
                      <div id={panelId} hidden={!isOpen} className="ecosystem-foundation-disclosure__panel">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="ecosystem-role__note">Ces contenus seront approfondis progressivement, sans remettre en cause le rôle institutionnel déjà établi d’OJF.</p>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
