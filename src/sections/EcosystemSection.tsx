import { useState } from "react";
import { foundationEntity, publicApplications, publicSoftware, webPortalEntity } from "../data/ecosystem";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { getProjectEmblemSources } from "../data/responsiveAssets";
import { useTranslation } from "../i18n/useTranslation";

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
    content: "OJF rassemble les valeurs et les engagements qui orientent les décisions et la conduite de l’écosystème OnJarama.",
  },
  {
    id: "objectives",
    label: "Objectifs institutionnels",
    content: "OJF formule les objectifs institutionnels communs qui donnent un cap durable aux initiatives OnJarama.",
  },
  {
    id: "constitution",
    label: "Constitution OnJarama",
    content: "OJF porte l’introduction publique à la Constitution OnJarama et en explique la fonction institutionnelle.",
  },
] as const;

export function EcosystemSection() {
  const { t } = useTranslation();
  const [openFoundationDisclosure, setOpenFoundationDisclosure] = useState<string | null>(null);

  return (
    <section id="ecosystem-projects" className="section ecosystem-section" aria-labelledby="ecosystem-projects-title">
      <div className="section-heading ecosystem-section__heading">
        <div>
          <p className="section-kicker">{t("home.ecosystem.kicker")}</p>
          <h2 id="ecosystem-projects-title">{t("home.ecosystem.title")}</h2>
          <p>{t("home.ecosystem.description")}</p>
        </div>
        <dl className="ecosystem-section__map" aria-label={t("home.ecosystem.mapLabel")}>
          <div><dt>{t("home.ecosystem.map.applications")}</dt><dd>OJA · OJP · OJCS</dd></div>
          <div><dt>{t("home.ecosystem.map.software")}</dt><dd>{t("home.ecosystem.map.softwareStatus")}</dd></div>
          <div><dt>{t("home.ecosystem.map.portal")}</dt><dd>OJW</dd></div>
          <div><dt>{t("home.ecosystem.map.foundation")}</dt><dd>OJF</dd></div>
        </dl>
      </div>

      <div className="ecosystem-territories">
        <section className="ecosystem-territory ecosystem-territory--applications" aria-labelledby="applications-title">
          <div className="ecosystem-territory__heading">
            <p className="section-kicker">{t("home.ecosystem.applications.kicker")}</p>
            <h3 id="applications-title">{t("home.ecosystem.applications.title")}</h3>
            <p>{t("home.ecosystem.applications.description")}</p>
          </div>
          <div className="ecosystem-applications-grid" data-application-count={publicApplications.length}>
            {publicApplications.map((item) => (
              <article className={`ecosystem-card ecosystem-card--${APPLICATION_PRESENTATION[item.id]} reveal-up`} key={item.id}>
                <div className="ecosystem-card__emblem">
                  <ResponsiveImage
                    sources={getProjectEmblemSources(item.acronym)}
                    sizes="(max-width: 760px) 154px, 154px"
                    alt={item.emblemAlt}
                    width="1024"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="ecosystem-card__status">{item.statusLabel}</p>
                <h4><span className="ecosystem-card__acronym">{item.acronym}</span>{item.name}</h4>
                <p>{item.description}</p>
                <div className="ecosystem-card__action">
                  <a className="ecosystem-card__link" href={item.publicPagePath} aria-label={`${item.name} — ${t("home.ecosystem.applications.cardLinkLabel")}`}>
                    {t("home.ecosystem.applications.discoverProject")} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ecosystem-territory ecosystem-territory--software" aria-labelledby="software-title" data-software-count={publicSoftware.length}>
          <div className="ecosystem-territory__heading">
            <p className="section-kicker">{t("home.ecosystem.software.kicker")}</p>
            <h3 id="software-title">{t("home.ecosystem.software.title")}</h3>
          </div>
          <div className="ecosystem-software-editorial">
            <span className="ecosystem-software-editorial__mark" aria-hidden="true">⌁</span>
            <p>{t("home.ecosystem.software.description")}</p>
            <ul>
              <li>{t("home.ecosystem.software.qualifiedNeed")}</li>
              <li>{t("home.ecosystem.software.ratifiedIdentity")}</li>
              <li>{t("home.ecosystem.software.noneAnnounced")}</li>
            </ul>
          </div>
        </section>
      </div>

      <section className="ecosystem-public-presence" aria-labelledby="public-presence-title">
        <div className="ecosystem-public-presence__heading">
          <p className="section-kicker">{t("home.ecosystem.publicPresence.kicker")}</p>
          <h3 id="public-presence-title">{t("home.ecosystem.publicPresence.title")}</h3>
          <p>{t("home.ecosystem.publicPresence.description")}</p>
        </div>
        <div className="ecosystem-roles">
          <article className="ecosystem-role ecosystem-role--portal">
            <div className="ecosystem-role__emblem">
              <ResponsiveImage
                sources={getProjectEmblemSources(webPortalEntity.acronym)}
                sizes="112px"
                alt={webPortalEntity.emblemAlt}
                width="1024"
                height="1024"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ecosystem-role__content">
              <p className="section-kicker">{t("home.ecosystem.publicPresence.portalKicker")}</p>
              <h4>{webPortalEntity.acronym} — {t("home.ecosystem.publicPresence.portalTitle")}</h4>
              <p>OJW est le point d’entrée Web officiel pour découvrir les applications, les futures solutions métier et la dimension institutionnelle d’OnJarama.</p>
              <a className="ecosystem-role__link" href={webPortalEntity.publicPagePath}>{t("home.ecosystem.publicPresence.discover")} {webPortalEntity.acronym} <span aria-hidden="true">→</span></a>
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
