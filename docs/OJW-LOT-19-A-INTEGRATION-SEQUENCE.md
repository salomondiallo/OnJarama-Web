# OJW-LOT-19-A — Séquence d'intégration contrôlée

Chaque étape est un lot séparé. PRE1 ne réalise aucune de ces modifications.

| Étape | Prérequis | Fichiers concernés | Tests / réussite | Arrêt | Retour arrière |
|---|---|---|---|---|---|
| A — Production GFX-03 hors dépôt | Spécification et références validées | Dossier graphique externe uniquement | PNG Jour/Nuit 1672×941, même géométrie, OJF organique, aucun fruit | OJF artificiel, cadrage ou géométrie divergents | Conserver GFX-02; rejeter l'export |
| B — Qualification graphique | A complète, galerie locale | Pack de revue hors dépôt | Desktop/mobile, Jour/Nuit approuvés; différence géométrique conforme | Validation fondatrice manquante ou artefact | Nouvelle itération externe; aucune intégration |
| C — Optimisation | PNG maîtres approuvés | Sorties externes AVIF/WebP | 960/1280/1672, dimensions et SHA-256, fidélité visuelle | dérive colorimétrique/netteté ou mauvais format | Supprimer seulement le pack dérivé rejeté |
| D — Intégration locale | B/C validées, Git propre | `src/assets/immersive/gfx03/`, `TreeScene.tsx`, test FIX7 | AVIF→WebP→PNG; une seule famille initiale; fondu sans vide/CLS | double téléchargement, fallback absent, décalage | Restaurer imports GFX-02 et retirer uniquement nouveaux assets |
| E — Retrait fruits/tiges | D qualifiée | `TreeScene.tsx`, `tree.css`, tests LOT-16-A/18-A | aucun `.tree-fruit`/stem; aucune régression scène | accès perdus avant bande prête | Réappliquer rendu et styles depuis snapshot |
| F — Bande quatre projets | Données/cibles et noms arbitrés | nouveau composant, `TreeHeroSection.tsx`, `tree.css`, LOT-17-A | position après panorama; 4 colonnes/2×2; clavier/tactile; données uniques | faux liens, ordre ou accessibilité incorrects | Retirer composant; restaurer fruits si nécessaire |
| G — Lampes et animations | Géométrie finale GFX-03 | `TreeScene.tsx`, `tree.css`, LOT-16-A/18-A | deux lignes cohérentes, jour discret, nuit chaude, reduced-motion | double lampage ou artefacts FIX6 | Restaurer coordonnées/couches qualifiées; ne pas toucher au raster |
| H — Qualification visuelle | D–G stables | aucun changement hors corrections ciblées | desktop/mobile Jour/Nuit/Auto, panneau, cartes, eau, oiseaux, console propre | défaut visuel ou mode Auto divergent | Revenir au dernier snapshot qualifié |
| I — Qualification réseau | build local réussi | build/preview en lecture seule | une famille au départ, cible après interaction, retour sans 3e téléchargement | plaque inactive préchargée ou erreurs réseau | Restaurer logique FIX7-R1 |
| J — Snapshot, commit, push séparés | validations complètes et accord explicite | snapshot hors dépôt puis Git | manifeste/SHA, diff ciblé, commit unique; push seulement sous mandat distinct | état Git inattendu ou validation absente | arrêter avant commit/push; conserver snapshot |

## Validations minimales des lots d'intégration

À chaque étape de code pertinente :

```text
npm.cmd run test:ojw:lot-18-a
npm.cmd run test:ojw:lot-16-d-fix7
npm.cmd run test:ojw:lot-17-a
npm.cmd run test:ojw:lot-16-a
npm.cmd run test:ojw:lot-14
npm.cmd run test:ojw:lot-13
npm.cmd run lint
npm.cmd run build
git diff --check
```

Ajouter une revue humaine à 1440 × 900 et 400 × 1221 en Jour, Nuit et Auto, une inspection console, puis un contrôle réseau froid. Aucun lot ne poursuit vers le suivant si son critère d'arrêt est rencontré.

## Points de contrôle et risques

- Capturer l'état Git et les SHA-256 avant chaque intégration.
- Ne jamais remplacer ou supprimer GFX-02 avant qualification explicite de GFX-03.
- Conserver les PNG maîtres comme fallbacks.
- Protéger la logique solaire, le stockage de préférence et le montage à l'intention utilisateur.
- Ne pas fusionner production graphique, retrait des fruits, nouvelle navigation et commit dans une seule opération irréversible.
- Arbitrer avant F les noms demandés « OnJarama Pro » et « OnJarama Connect & Services », différents des libellés actuels `OnJarama Path` et `OJCS Connect`.

## Stratégie générale de retour arrière

Chaque lot commence par un snapshot vérifié et garde les anciens assets jusqu'à qualification. Le retour arrière consiste à restaurer uniquement les imports/composants/styles du lot concerné depuis le snapshot, sans `reset --hard`, puis à relancer les validations. Aucun asset qualifié antérieur n'est supprimé avant approbation fondatrice et mandat dédié.
