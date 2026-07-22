import type { EcosystemItem } from "../data/ecosystem";

const STATE_DOT_CLASS: Record<EcosystemItem["state"], string> = {
  preparation: "project-item__dot--preparation",
  development: "project-item__dot--development",
  ready: "project-item__dot--ready",
};

type EcosystemSidebarProps = {
  items: EcosystemItem[];
  activeId: string;
  onActivate: (id: string) => void;
  onPreview: (id: string | null) => void;
};

export function EcosystemSidebar({ items, activeId, onActivate, onPreview }: EcosystemSidebarProps) {
  return (
    <aside className="tree-sidebar" aria-label="Identité et écosystème OnJarama">
      <div className="tree-sidebar__vision">
        <p className="section-kicker">Notre vision</p>
        <p>
          Une vision qui prend racine : un tronc commun, des branches qui grandissent à leur rythme
          et un chemin institutionnel qui reste lisible à chaque étape.
        </p>
        <a className="tree-sidebar__vision-link" href="#vision">
          En savoir plus →
        </a>
      </div>

      <h1 id="tree-hero-title" className="tree-sidebar__title">
        Un écosystème pour avancer avec clarté.
      </h1>
      <p className="tree-sidebar__lead">
        Organiser les projets, soutenir l’apprentissage, connecter les services et construire
        une progression durable.
      </p>

      <nav className="tree-sidebar__list" aria-label="Projets de l’écosystème OnJarama">
        <p className="tree-sidebar__list-title">Écosystème</p>
        <ul>
          {items.map((item) => {
            const isReady = item.state === "ready";
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`project-item ${activeId === item.id ? "is-active" : ""}`}
                  onMouseEnter={() => onPreview(item.id)}
                  onFocus={() => onPreview(item.id)}
                  onMouseLeave={() => onPreview(null)}
                  onBlur={() => onPreview(null)}
                  onClick={() => onActivate(item.id)}
                  aria-current={item.isCurrent ? "page" : undefined}
                >
                  <span className={`project-item__dot ${STATE_DOT_CLASS[item.state]}`} aria-hidden="true" />
                  <span className="project-item__name">{item.name}</span>
                  <span className="project-item__status">
                    {isReady ? "Prêt" : item.state === "development" ? "En cours" : "Préparation"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
