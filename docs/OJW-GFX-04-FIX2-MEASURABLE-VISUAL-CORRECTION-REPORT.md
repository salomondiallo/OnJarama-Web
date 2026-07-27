# OJW-GFX-04-FIX2 — Rapport de correction visuelle mesurable

## 1. Préflight Git

- Branche : `main`
- HEAD : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- `origin/main` : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- Divergence : `0 0`
- Working tree limité au lot local OJW GFX-04.

## 2. Fichiers modifiés

- `src/components/TreeScene.tsx`
- `src/styles/tree.css`
- `scripts/architecture/ojw-gfx-04-approved-tree-b-integration.test.mjs`
- `docs/OJW-GFX-04-FIX2-MEASURABLE-VISUAL-CORRECTION-REPORT.md`

Les plaques, dérivés AVIF/WebP, logo et autres sections restent inchangés.

## 3. Corrections par problème

### Astres

Les disques FIX1 ont été remplacés par deux systèmes atmosphériques indépendants :

- soleil suggéré par un halo radial de rayon `148 px`, sans noyau opaque ;
- lune ramenée à un rayon de `29 px`, entourée d'un halo de `88 px` et enrichie de marques très discrètes ;
- transition Jour/Nuit de `700 ms`, désactivée avec `prefers-reduced-motion`.

### Ancrage

La jonction est constituée d'une ombre principale de `310 × 22 px`, de trois formes organiques irrégulières et de deux petites zones de contact. Les couleurs diffèrent en Jour et en Nuit. La structure OJF n'est pas modifiée.

### Majesté

La plaque complète est affichée à `102,5 %`, centrée avec un débord de `-1,25 %`. Ce zoom contrôlé augmente mesurably la présence du tronc et de la cime tout en conservant la cascade, la cité et le chemin. L'arbre étant intégré au raster maître, un agrandissement sélectif sans modifier l'image aurait été impossible.

### Éléments préservés

- lampadaires raster discrets le Jour et visibles la Nuit ;
- même axe pixel-verrouillé des lumières ;
- aucun lampadaire Web redondant ;
- filets Web verticaux de cascade désactivés ;
- brumes et textures Web superflues désactivées ;
- ancien système de fruits masqué.

## 4. Soleil

Le soleil n'est plus représenté par une pastille. La capture finale montre seulement une présence chaude diffuse au-dessus de la cime. Le centre du halo utilise une opacité maximale de `0,14`, décroissant jusqu'à zéro.

## 5. Lune

La lune est environ 37 % plus petite que le disque FIX1 (`29 px` contre `46 px`). Son gradient, son halo séparé et ses marques à faible opacité réduisent l'effet plat tout en maintenant sa lisibilité.

## 6. Ancrage des racines

Les ombres suivent plusieurs groupes de racines au lieu d'une ellipse uniforme. Le pied se raccorde aux pierres et à la végétation du raster sans cadre, plaque ou flou global.

## 7. Majesté de la cime

Le zoom de `2,5 %` renforce l'occupation du premier plan, la largeur perçue des branches et la densité de la canopée. La totalité fonctionnelle de la scène reste lisible.

## 8. Captures

Dossier :

`C:\Users\tsdia\Downloads\Projet_OnJarama\Web\Graphics\OJW-GFX-04-FIX2-CAPTURES`

Onze preuves sont fournies :

- Desktop Jour et Nuit ;
- Mobile Jour et Nuit ;
- soleil Jour ;
- lune Nuit ;
- racines/sol Jour et Nuit ;
- cime/branches ;
- chemin/lampadaires Jour et Nuit.

Constats :

- le soleil n'est plus une pastille collée ;
- la lune est plus petite, nuancée et atmosphérique ;
- les racines paraissent ancrées ;
- le raccord végétation/sol est plus cohérent ;
- la cime paraît plus monumentale ;
- les lampes restent cohérentes ;
- la cascade reste propre ;
- OJF, cité, chemin et cascade restent lisibles ;
- les vues mobiles restent exploitables.

## 9. Validations

Réussies :

- `npm.cmd run test:ojw:gfx-04`
- `npm.cmd run test:ojw:lot-18-a`
- `npm.cmd run test:ojw:lot-17-a`
- `npm.cmd run test:ojw:lot-16-d-fix7`
- `npm.cmd run lint`
- `npm.cmd run build`
- `git diff --check`

## 10. État Git final

- HEAD et `origin/main` inchangés.
- Aucun commit.
- Aucun push.
- Aucun déploiement.
- Aucun appel Vercel.

## 11. Verdict

`OJW_GFX_04_FIX2_READY_FOR_FOUNDER_REVIEW`
