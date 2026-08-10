import { PublicProjectLayout } from "../layouts/PublicProjectLayout";

export function NotFoundPage() {
  return (
    <PublicProjectLayout>
      <section className="public-page-placeholder" aria-labelledby="not-found-title">
        <p className="section-kicker">Erreur 404</p>
        <h1 id="not-found-title" data-route-heading tabIndex={-1}>Page introuvable</h1>
        <p>Cette adresse ne correspond à aucune page publique OnJarama.</p>
        <a className="button button-primary" href="/">Retour à l’accueil</a>
      </section>
    </PublicProjectLayout>
  );
}
