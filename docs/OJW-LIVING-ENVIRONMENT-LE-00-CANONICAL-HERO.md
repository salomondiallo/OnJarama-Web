# OJW Living Environment LE-00 — Canon du Hero V1

## Statut

Ce document ferme la divergence entre l’ancienne composition historique avec arbre et fruits et le Hero panoramique actuellement publié.

```text
LIVING_ENVIRONMENT_VERSION = V1
HERO_BASELINE = CURRENT_CANONICAL_PANORAMA
HERO_TREE = ABSENT
TREE_FRUITS = ABSENT
LEGACY_TREE_FRUIT_SYSTEM = DO_NOT_REACTIVATE
SNOW_V1 = OFF
```

Les archives, sources et assets historiques ne sont ni invalidés ni supprimés. Ils ne constituent simplement pas la cible visuelle de Living Environment V1.

## Doctrine du Hero

Le Hero panoramique canonique actuel reste la baseline visuelle de LE-01 à LE-08. Living Environment doit lui donner vie sans en remplacer la composition, sans réintroduire le grand arbre et sans réactiver les fruits historiques.

Les textes, CTA, routes, vitrines publiques, Header et plaques maîtres restent protégés.

## Taxonomie institutionnelle

```text
OJA = APPLICATION
OJP = APPLICATION
OJCS = APPLICATION
OJW = WEB_PORTAL
OJF = FOUNDATION
```

OJF est le porteur institutionnel de l’écosystème. OJF n’est ni une application, ni un logiciel, ni un fruit, ni une carte produit équivalente.

Les futures micro-interactions de projets ciblent par défaut leurs représentations publiques actuelles dans la section Écosystème. Elles ne doivent pas dépendre de `.tree-fruit`.

## Périmètre Living Environment V1

Les familles autorisées pour les prochaines portes sont :

- lumière ;
- soleil et lune ;
- ciel et nuages ;
- cascade et cours d’eau ;
- oiseaux ;
- atmosphère, pluie et brume ;
- lanternes ;
- micro-mouvements décoratifs compatibles avec le panorama actuel.

La neige est exclue de V1. Toute scène enneigée future nécessitera une décision fondatrice distincte.

## Technologies

Priorité à CSS, SVG et DOM. Canvas ne peut être retenu que pour un avantage concret démontré. WebGL n’est pas justifié pour V1. Aucune vidéo de fond n’est prévue.

## Conditions d’entrée LE-01

LE-01 doit :

1. auditer et préparer de vraies variantes optimisées des plaques Jour/Nuit ;
2. conserver les plaques maîtres originales ;
3. supprimer la double temporalité actuelle au profit d’une horloge environnementale partagée ;
4. maintenir `useDayNightMode` comme autorité Auto/Jour/Nuit ;
5. maintenir `dynamicSky.ts` comme modèle du ciel ;
6. introduire dès l’origine un profil mobile et reduced-motion centralisé ;
7. ne créer aucune seconde source de vérité.

## Profils de robustesse

Sur 390 et 768 px, V1 prévoit moins de nuages, aucune pluie proche, moins d’oiseaux et aucune couche coûteuse non essentielle. Les filtres plein écran doivent être évités lorsqu’une solution localisée suffit.

Avec `prefers-reduced-motion: reduce`, la scène reste complète et esthétique, mais essentiellement statique.

## Invariants de protection

De LE-01 à LE-08 :

- ne pas réintroduire l’arbre dans le Hero ;
- ne pas réactiver `.tree-fruit` ;
- ne pas transformer OJF en produit ;
- ne pas ajouter de neige automatique ;
- ne pas créer de météo réelle, géolocalisation ou seconde autorité Jour/Nuit sans nouvelle porte explicite ;
- ne pas supprimer les archives ou plaques maîtres historiques.

```text
OJW_LIVING_ENVIRONMENT_LE_00_CANON = RECONCILED
NEXT_GATE = OJW-LIVING-ENVIRONMENT-LE-01
```
