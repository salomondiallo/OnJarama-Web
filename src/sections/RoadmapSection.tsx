import { roadmap } from "../data/roadmap";

export function RoadmapSection() {
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="section-heading">
        <p className="section-kicker">Roadmap</p>
        <h2 id="roadmap-title">Une trajectoire progressive et durable.</h2>
        <p>OnJarama avance par qualification progressive : consolider ce qui existe avant d’étendre ce qui peut servir durablement.</p>
      </div>
      <div className="timeline">
        {roadmap.map((item) => (
          <article key={item.year}>
            <strong>{item.year}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
