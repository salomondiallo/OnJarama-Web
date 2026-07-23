# OJW-LOT-13 — Qualification et clôture contrôlées de la séquence d’accueil immersif

## A. Objet du lot

OJW-LOT-13 rattache formellement la séquence `0e175c8..b2baf15` à un lot OJW identifiable. Son périmètre est strictement documentaire et technique : qualifier les améliorations déjà intégrées, les valider dans leur état existant et fermer leur séquence sans introduire de nouvelle évolution visuelle ou fonctionnelle.

## B. État de départ

- Commit documentaire de référence : `5bfc8d8`
- Premier commit de la séquence : `0e175c8`
- Dernier commit de la séquence : `b2baf15c1836cad201b8a1a0c7bf671aaf361403`
- Taille vérifiée de la séquence : **exactement onze commits**
- Branche : `main`
- État initial : working tree propre, staging vide, aucun fichier non suivi
- Synchronisation initiale : `HEAD` et `origin/main` à `b2baf15c1836cad201b8a1a0c7bf671aaf361403`, divergence `0 0`
- Contrôle d’ascendance : `5bfc8d8` est bien un ancêtre de `b2baf15`

## C. Inventaire des onze commits

| # | Commit | Message Git vérifié | Rôle dans la séquence | Principaux fichiers touchés |
|---:|---|---|---|---|
| 1 | `0e175c8` | `feat(web): stabilize immersive responsive homepage` | Stabilisation responsive immersive de la page d’accueil et mise en place de sa structure principale | `src/App.tsx`, `src/components/TreeScene.tsx`, `src/components/ProjectPreviewCard.tsx`, `src/sections/TreeHeroSection.tsx`, `src/styles/tree.css`, `src/styles/sections.css` |
| 2 | `1d44f10` | `docs(web): preserve official homepage visual reference` | Préservation de la référence visuelle officielle | `docs/visual-references/onjarama-homepage-official-reference.png` |
| 3 | `7142e3a` | `style(web): refine immersive desktop hero framing` | Amélioration du cadrage immersif desktop | `src/components/TreeScene.tsx`, `src/styles/tree.css` |
| 4 | `e86b8db` | `style(web): improve hero readability across themes` | Amélioration de la lisibilité du hero selon les thèmes | `src/styles/tree.css` |
| 5 | `2915dbc` | `style(web): animate waterfall and river flow` | Animation de la chute d’eau et de la rivière | `src/styles/tree.css` |
| 6 | `e9ffeff` | `style(web): add subtle canopy breeze` | Ajout d’une brise subtile dans la canopée | `src/styles/tree.css` |
| 7 | `f966c49` | `style(web): refine accessible fruit interactions` | Amélioration des interactions accessibles des fruits | `src/styles/tree.css` |
| 8 | `873a460` | `style(web): clarify accessible project previews` | Clarification des aperçus accessibles des projets | `src/components/ProjectPreviewCard.tsx`, `src/sections/TreeHeroSection.tsx`, `src/styles/tree.css` |
| 9 | `dac9f44` | `style(web): smooth hero to institutional content transition` | Adoucissement de la transition vers le contenu institutionnel | `src/styles/sections.css`, `src/styles/tree.css` |
| 10 | `886037e` | `style(web): harmonize institutional homepage sections` | Harmonisation des sections institutionnelles | `src/App.css`, `src/styles/cards.css`, `src/styles/sections.css`, `src/styles/typography.css` |
| 11 | `b2baf15` | `fix(web): address homepage quality gate findings` | Correction des constats du quality gate de la page d’accueil | `src/styles/sections.css`, `src/styles/tree.css` |

## D. Périmètre produit consolidé

La séquence consolide, sans extension dans le présent lot :

- le cadrage immersif de la page d’accueil sur desktop et mobile ;
- la lisibilité du hero dans les modes jour et nuit ;
- la conservation dans le dépôt de la référence visuelle officielle ;
- les animations de la chute d’eau et de la rivière ;
- le mouvement léger de la canopée ;
- les interactions accessibles des fruits et des aperçus de projets ;
- la transition du hero vers les sections institutionnelles ;
- l’harmonisation visuelle générale des sections institutionnelles ;
- les corrections issues du quality gate final.

Ces éléments sont limités à ce que confirment l’historique Git et les fichiers existants. LOT-13 n’ajoute aucune fonctionnalité et ne modifie aucun fichier runtime.

## E. Validations techniques

Avant LOT-13, aucun script général `test` n’était configuré dans `package.json`.

Résultats finaux consignés après exécution :

- Test documentaire LOT-13 : **réussi**
- Lint ESLint : **réussi, aucune erreur**
- Build TypeScript/Vite : **réussi**
- Modules transformés par Vite : **33**
- `git diff --check` : **réussi, aucune erreur**

Le test LOT-13 est autonome, déterministe, sans accès réseau, sans dépendance supplémentaire et sans écriture.

## F. Décision de clôture

**DÉCISION DE CLÔTURE OJW-LOT-13**

- La séquence `0e175c8..b2baf15` est officiellement attribuée à **OJW-LOT-13 — Qualification et clôture contrôlées de la séquence d’accueil immersif**.
- La séquence est fermée au niveau du code source et de la documentation.
- Aucune nouvelle évolution visuelle ou fonctionnelle n’a été introduite par LOT-13.
- Après validation, commit et publication autorisée de ce mandat, l’état source de référence devient le commit final créé par OJW-LOT-13.

## G. Limite Production obligatoire

- Aucun déploiement n’a été exécuté dans OJW-LOT-13.
- LOT-13 ne constitue pas une preuve Production actuelle et ne prouve pas que `onjarama.ca` sert actuellement `b2baf15` ou le futur commit documentaire.
- `OJW-LOT-12-B` reste une preuve historique valable pour l’état observé au moment de sa création.
- Les changements runtime postérieurs à LOT-12-B empêchent de considérer cette preuve historique comme une preuve Production actuelle.
- Toute nouvelle vérification Production doit faire l’objet d’un lot séparé et d’une autorisation explicite.
- Aucune adoption doctrinale concernant OnJarama Foundation n’est prononcée par LOT-13.

## H. Prochaine étape

Aucun autre lot n’est ouvert automatiquement. Une vérification séparée de correspondance entre le dépôt et la Production pourra être envisagée ultérieurement, uniquement avec une autorisation explicite.
