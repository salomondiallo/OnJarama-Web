import { ecosystem } from "../data/ecosystem";

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="section" aria-labelledby="ecosystem-title">
      <div className="section-heading">
        <p className="section-kicker">Ã‰cosystÃ¨me</p>
        <h2 id="ecosystem-title">Les piliers OnJarama</h2>
        <p>
          Une architecture progressive oÃ¹ chaque application garde son rÃ´le tout en partageant une identitÃ© commune.
        </p>
      </div>
      <div className="ecosystem-grid">
        {ecosystem.map((item) => (
          <article className="ecosystem-card reveal-up" key={item.name}>
            <span>{item.status}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
