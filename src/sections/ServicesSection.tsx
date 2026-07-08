import { services } from "../data/services";

export function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="section-heading">
        <span>Services</span>
        <h3>Ce que propose OnJarama</h3>
        <p>
          Le portail soutient d’abord les services déjà présents dans OnJarama
          Path. OJCS viendra ensuite compléter l’écosystème.
        </p>
      </div>

      <div className="cards">
        {services.map((service) => (
          <article key={service.id} className={`card ${service.cardClassName}`}>
            <div className="card-top">
              <span className={`badge ${service.statusClassName}`}>
                {service.status}
              </span>
            </div>

            <h4>{service.title}</h4>

            <p>{service.description}</p>

            <div className="service-list">
              {service.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
