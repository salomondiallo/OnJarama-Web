# OJW-LOT-19-A — Cartographie technique du hero

Audit documentaire sur la base `dd7061a4ae0c479d31a38e42b7775acd3bc6848f`.

## Cartographie raster / HTML / CSS

| Élément | Responsable actuel | Nature | Jour | Nuit | Couche indépendante | Déplaçable sans asset | Nouvelle plaque | Risque et stratégie |
|---|---|---|---|---|---|---|---|---|
| Arbre | PNG maîtres importés par `TreeScene.tsx` | Raster | Oui | Oui | Texture CSS seulement | Non | Oui | Élevé : produire un arbre OJF commun Jour/Nuit |
| Inscription OJF | `.tree-inscription` dans `TreeScene.tsx`; CSS lignes 409–414 | HTML/CSS | Non raster | Non raster | Oui | Oui | Non pour la retirer | Retirer seulement après validation de l'OJF organique raster |
| OJA | `FRUIT_LAYOUT.academy`, `.tree-fruit--academy` | HTML/CSS | Non | Non | Oui | Oui | Non | Réutiliser la donnée `ecosystem` dans la bande |
| OJP | `FRUIT_LAYOUT.path`, `.tree-fruit--path` | HTML/CSS | Non | Non | Oui | Oui | Non | Même stratégie |
| OJCS | `FRUIT_LAYOUT["ojcs-connect"]` | HTML/CSS | Non | Non | Oui | Oui | Non | Même stratégie |
| OJW | `FRUIT_LAYOUT.web`, `.tree-fruit--web` | HTML/CSS | Non | Non | Oui | Oui | Non | Conserver le lien courant |
| Tiges/attaches | `.tree-fruit__stem` et variables `--stem-*` | HTML/CSS | Non | Non | Oui | Oui | Non | Supprimer avec le rendu des fruits |
| Chemin | PNG maîtres | Raster | Oui | Oui | Lampes Web en plus | Non | Oui | Élevé : même axe et géométrie Jour/Nuit |
| Lampes | `LAMP_POSTS`, `.gfx02-lamp-posts`; éclairage nocturne également raster | Mixte | DOM présent, éteint | DOM allumé + lumière raster | Oui, partielle | Oui pour DOM | Oui pour géométrie physique | Éviter double éclairage; recaler après GFX-03 |
| Cité | PNG maîtres | Raster | Oui | Oui | `.gfx02-city-light` | Non | Seulement si axe modifié | Garder géométrie et netteté |
| Cascade | PNG maîtres + SVG `.waterfall__stream` | Mixte | Oui | Oui | Oui | Animation oui | Non si géométrie conservée | Recaler uniquement si GFX-03 dérive |
| Cours d'eau | PNG maîtres + SVG `.river-flow__glint` | Mixte | Oui | Oui | Oui | Animation oui | Non si géométrie conservée | Préserver les tracés ou les recalibrer |
| Oiseaux | SVG `.scene-birds` | HTML/SVG/CSS | Non | Non | Oui | Oui | Non | Conserver DOM, trajectoires et reduced-motion |
| Lumières cité | Plaque Nuit + `.gfx02-city-light` | Mixte | Raster jour non lumineux | Raster nuit lumineux | Oui | Oui pour accents | Plaque Nuit GFX-03 | Vérifier absence d'artefacts FIX6/FIX7 |
| Panneau éditorial | `.tree-hero__intro` dans `TreeHeroSection.tsx` | HTML/CSS | Non | Non | Oui | Oui | Non | Réserver sa zone au cadrage |
| Bande institutionnelle | `.tree-hero__institutional` | HTML/CSS | Non | Non | Oui | Oui | Non | Conserver LOT-17-A |
| Cartes projets | `InstitutionalProjectBand.tsx` | HTML/CSS | Non | Non | Oui | Oui | Non | Conserver ordre OJF, OJA, OJP, OJCS, OJW |

## Preuves de code et réponses obligatoires

1. **Les quatre fruits sont-ils indépendants des plaques ?** Oui. `TreeScene.tsx` définit `FRUIT_LAYOUT`, filtre les positions puis rend un lien ou un bouton `.tree-fruit`; aucune image de fruit n'est importée. Les PNG inspectés ne montrent aucun fruit.
2. **Les attaches sont-elles indépendantes ?** Oui. Chaque fruit contient `<span className="tree-fruit__stem">`; `tree.css` lignes 418–422 et 440–450 gère angle, longueur et point d'attache.
3. **OJF est-il raster ou HTML ?** HTML. `TreeScene.tsx` rend `.tree-inscription` avec trois enfants; `tree.css` lignes 409–414 applique position, couleur, masque et relief. Les plaques n'affichent pas OJF.
4. **Le chemin est-il intégré aux plaques ?** Oui. Il est visible dans les deux PNG 1672 × 941 et aucun chemin structurel n'est rendu dans le DOM actif. Les anciennes règles `.luminous-path*` sont du CSS historique, sans élément correspondant dans `TreeScene`.
5. **Les lampes sont-elles raster, CSS, ou les deux ?** Les deux. Huit lampes DOM viennent de `LAMP_POSTS` et `.gfx02-lamp-posts` (lignes 401–407). La plaque Nuit contient aussi les ambiances/lumières de chemin issues de sa composition raster.
6. **Peut-on retirer les fruits sans retoucher les PNG ?** Oui : supprimer le rendu `fruits.map`, `FRUIT_LAYOUT`, les styles `.tree-fruit*` devenus inutiles et la prop `fruits`. Aucun pixel maître n'est concerné.
7. **Peut-on déplacer les accès sans duplication ?** Oui. `TreeHeroSection.tsx` dérive déjà `fruits` de `ecosystem`. Une future `ProjectAccessBand` peut recevoir cette même collection et les mêmes gestionnaires `activeId/onActivate/onPreview`.
8. **Peut-on réutiliser AVIF → WebP → PNG ?** Oui. Les deux `<picture>` déclarent AVIF 960/1280/1672, puis WebP aux mêmes largeurs, puis PNG 1672 × 941. Les imports peuvent être substitués sans changer l'architecture FIX7-R1.
9. **Les animations d'eau et oiseaux survivront-elles ?** Oui si la géométrie GFX-03 respecte le repère 1672 × 941. Elles sont dans `.gfx02-life-layers`, avec `viewBox="0 0 1672 941"` et non dans les images. Un recalage des chemins SVG peut toutefois être requis si les pixels d'eau changent.
10. **Sélecteurs à faire évoluer plus tard.** `.tree-inscription*`, `.tree-fruit*`, `.gfx02-lamp-post*`, potentiellement `.waterfall__stream`, `.river-flow__glint`, `.gfx02-natural-texture*`, `.gfx02-city-light*`, `.tree-hero__institutional` et nouveaux `.project-access-band*`. Ne pas modifier `.day-night-toggle` ni le contrat des plaques sans nécessité.
11. **Tests à faire évoluer.** `test:ojw:lot-16-d-fix7` pour les nouveaux noms/format/réseau; `test:ojw:lot-16-a` pour l'absence des fruits/OJF HTML et la conservation des couches; `test:ojw:lot-17-a` pour l'insertion avant les cartes; `test:ojw:lot-18-a` pour Auto solaire et animations. LOT-14/LOT-13 restent des garde-fous.
12. **Cadrage desktop.** Garder le canevas complet 1672 × 941 : cascade dans x=0–22 %, cité x=38–56 %, chemin x=42–66 %, arbre x=62–100 %. Protéger surtout le tronc OJF et l'axe chemin/entrée.
13. **Cadrage mobile.** Le CSS actif utilise `object-fit:contain` et le même ratio 1672/941 sous 760 px; il n'y a donc pas de recadrage horizontal attendu. Aucun élément essentiel ne doit néanmoins dépendre des 5 % extrêmes, afin de résister aux conteneurs et densités réelles.
14. **Zone libre éditoriale.** Sur desktop, réserver le bas gauche correspondant approximativement à x=0–34 %, y=60–100 %, car `.tree-hero__intro` est positionné à gauche et en bas. Le panneau est hors image sur mobile, mais cette réserve protège la composition desktop.
15. **LOT-18-A : superposé ou inclus ?** Superposés : bascule Auto/Jour/Nuit et sa logique solaire (`DayNightToggle`, `useDayNightMode`), plaque inactive montée à l'intention, textures, ville, lune, eau, oiseaux, lampes, inscription et fruits. Inclus dans les images : ciel/colorimétrie, montagnes, végétation, arbre, chemin, cité, cascade et rivière de base.

## Architecture proposée pour la bande des quatre projets

Créer ultérieurement un composant sémantique `ProjectAccessBand` entre `.tree-hero__panorama` et `.tree-hero__institutional`. Il recevra les quatre éléments non institutionnels issus de `ecosystem`, sans nouvelle source de vérité.

| Sigle | Libellé demandé | Statut source | Cible actuelle/future | Aria-label proposé |
|---|---|---|---|---|
| OJA | OnJarama Academy | En développement | destination à confirmer; pas de faux lien | `OnJarama Academy — En développement` |
| OJP | OnJarama Pro | En développement | donnée actuelle `path`; renommage métier à arbitrer | `OnJarama Pro — En développement` |
| OJCS | OnJarama Connect & Services | En développement | donnée actuelle `ojcs-connect`; destination à confirmer | `OnJarama Connect & Services — En développement` |
| OJW | OnJarama Web | Vous êtes ici | `#top` actuellement | `OnJarama Web — Vous êtes ici` |

Utiliser `<a>` seulement avec une cible réelle et `<button type="button">` sinon, comme `InstitutionalProjectBand`. Desktop : `grid-template-columns:repeat(4,1fr)`. Mobile : deux colonnes. Chaque contrôle a une hauteur minimale de 44 px, un hover non essentiel, un focus visible d'au moins 3 px, et reste utilisable au clavier/tactile. Le renommage affiché OJP/OJCS ne doit pas altérer silencieusement les données métier avant arbitrage.

## Risques principaux

- incohérence géométrique Jour/Nuit provoquant un saut lors du fondu;
- OJF organique illisible ou trop typographique;
- double lampage raster/Web et réapparition des artefacts FIX6;
- collision du panneau avec l'arbre ou le chemin;
- tracés SVG d'eau décalés;
- préchargement involontaire des deux familles, régression FIX7-R1;
- duplication des états projets entre nouvelle bande et cartes;
- renommages OJP/OJCS non alignés avec `ecosystem`;
- réduction de lisibilité mobile malgré `contain`.
