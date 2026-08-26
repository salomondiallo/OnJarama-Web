# OnJarama Web V1 — Feature Freeze

## Identité et statut

```text
GATE = OJW-V1-FEATURE-FREEZE
FREEZE_DATE = 2026-08-25
V1_FUNCTIONAL_BASELINE = d7734a931ef4281442b1bf3a3cb5af3c9b61a91f
V1_FREEZE_BASELINE = d7734a931ef4281442b1bf3a3cb5af3c9b61a91f
V1_FREEZE_RECORD_COMMIT = PENDING_FOUNDER_APPROVAL_AND_GIT_CLOSURE
FEATURE_FREEZE_V1 = READY_LOCAL
PRODUCTION_BASELINE = QUALIFIED
```

Ce document est une pièce de gouvernance technique. La baseline fonctionnelle V1 demeure le commit ci-dessus. Le futur commit documentaire enregistrera le gel sans devenir une nouvelle baseline fonctionnelle.

## Portée du gel

Le Feature Freeze gèle l’architecture publique, la taxonomie, les routes, la doctrine, le Hero, le Living Environment, la navigation, la disponibilité et les fonctionnalités de la V1. Il ne signifie pas qu’OnJarama Web ne pourra plus évoluer après la V1.

## Doctrine V1

```text
OJA = APPLICATION
OJP = APPLICATION
OJCS = APPLICATION
OJW = WEB_PORTAL
OJF = FOUNDATION
APPLICATION_COUNT = 3
APPLICATION_ORDER = OJA,OJP,OJCS
SOFTWARE_COUNT = 0
```

OJW est le portail Web public et non une quatrième application. OJF est le socle institutionnel : ce n’est ni une application, ni un logiciel, ni un produit, ni un fruit.

## Routes publiques V1

Routes canoniques :

- `/`
- `/oja`
- `/ojp`
- `/ojcs`
- `/ojw`

Ancres Home :

- `/#about`
- `/#ecosystem-projects`
- `/#vision`
- `/#mission`
- `/#roadmap`

```text
/ojf = ABSENT
VALID_SPA_DIRECT_ACCESS = HTTP_200
UNKNOWN_ROUTE = HTTP_404
```

## Disponibilité gelée

| Entité | publicPageAvailable | publicServiceAvailable | productAvailable |
| --- | --- | --- | --- |
| OJA | true | false | false |
| OJP | true | false | false |
| OJCS | true | false | false |
| OJW | true | true | false |

Aucun téléchargement, installation, compte produit ou CTA d’ouverture d’application n’est annoncé en V1.

## Home et Hero V1

La Home conserve les trois applications, le territoire Logiciels sans produit nommé, OJW comme portail et OJF comme fondation. Mission, Vision, Roadmap et Footer restent dans leur état qualifié Q3.

```text
EDITORIAL_HERO_CARD = ABSENT
HERO_CTA_RESIDUAL = ABSENT
CARD_FREE_RUNTIME = CLOSED
CARD_FREE_HIGH_RES_RUNTIME = CLOSED
DAY_VISIBLE_CELESTIAL_DISC = OFF
ONE_VISIBLE_MOON_MAX = QUALIFIED
STATIC_BIRDS_RASTER = RESOLVED
HERO_TREE = ABSENT
TREE_FRUITS = ABSENT
LEGACY_TREE_FRUIT_SYSTEM = DO_NOT_REACTIVATE
```

## Living Environment V1

Le gel couvre LE-02 (ciel), LE-03 (eau), LE-04 (atmosphère), LE-05 (astronomie locale) et LE-07-FIX1 (frontière responsive et accessibilité).

```text
SNOW_V1 = OFF
REAL_WEATHER = OFF
LOCATION_TRANSMISSION = NONE
RAW_COORDINATE_STORAGE = FORBIDDEN
LOCATION_WATCH = OFF
COMPACT_MAX_WIDTH = 768
STANDARD_MIN_WIDTH = 769
```

Aucune nouvelle météo, animation majeure ou couche Living Environment ne fait partie du freeze.

## Pages publiques

Les vitrines `/oja`, `/ojp`, `/ojcs` et `/ojw` conservent leurs identités, statuts honnêtes, contenus qualifiés, navigation commune, garde-fous éditoriaux et disponibilité actuelle. Les applications OJA, OJP et OJCS ne sont pas présentées comme des produits publics disponibles.

## Responsive et accessibilité

La matrice qualifiée couvre 390, 768, 769, 1024, 1440 et 1920 px, avec contrôle complémentaire Home à 2560 px. Sont gelés : absence d’overflow horizontal, breakpoint COMPACT/STANDARD, Header responsive, cibles principales, skip-link, landmarks, focus visible, contrôles natifs, états ARIA et reduced-motion.

## Performance et ressources

Baseline comparative du build qualifié :

- JS principal : environ `258,19 kB / 87,70 kB gzip` ;
- CSS : environ `134,31 kB / 27,38 kB gzip` ;
- Home : environ `54,36 kB / 16,96 kB gzip`.

Ces chiffres sont des repères comparatifs, pas des limites immuables. La livraison V1 privilégie AVIF, conserve WebP et PNG en fallback, sélectionne les ressources responsive, applique un cache long immutable aux assets fingerprintés et garde le HTML revalidable.

## Sécurité et dépendances

```text
NPM_AUDIT_VULNERABILITIES = 0
PRODUCTION_DEPENDENCY_VULNERABILITIES = 0
BRACE_EXPANSION_VERSION = 5.0.9
NANOID_VERSION = 3.3.18
POSTCSS_VERSION = 8.5.26
SUNCALC_VERSION = 2.0.1
HSTS = ACTIVE
```

Aucune API météo ou astronomique distante, aucun service de localisation distant et aucun tracker inattendu ne sont requis.

## Confidentialité

La synchronisation du ciel local nécessite une action explicite. Les coordonnées sont arrondies à 0,25°, stockées localement et effaçables. Les coordonnées brutes ne sont pas persistées. Il n’existe ni transmission, ni `watchPosition`, ni météo distante.

## Tests de référence

Au moment du gel local :

```text
ARCHITECTURAL_TESTS = 56/56 PASS
LINT = PASS
BUILD = PASS
NPM_AUDIT = 0 VULNERABILITIES
```

Le total inclut le garde-fou Feature Freeze ajouté par cette porte. La clôture Git reste soumise à Founder Review.

## ACCEPTED_V1_DEBT

### Favicon

`/favicon.ico = 404` et aucun favicon n’est déclaré. Classification : `NON_BLOCKING_V1`.

### Headers complémentaires

CSP et certains headers de durcissement ne sont pas encore définis. Classification : `POST_V1_HARDENING`.

### Animations hors viewport

```text
OFFSCREEN_PERFORMANCE_IMPACT = NOT_DEMONSTRATED
OFFSCREEN_OPTIMIZATION = DEFERRED_POST_V1
```

### Références historiques

Les ressources `clean` de rollback/provenance, certaines assertions historiques et du CSS legacy restent présents sans être montés comme runtime obsolète.

```text
HISTORICAL_REFERENCE_CLEANUP = DEFERRED_NON_BLOCKING
```

### Auto local

La démonstration avec une localisation réelle non personnelle reste une preuve complémentaire : `COMPLEMENTARY_PROOF_PENDING`. Elle ne bloque ni le fallback, ni la sécurité, ni le freeze.

Ces éléments sont des dettes acceptées, améliorations post-V1 ou preuves complémentaires. Ils ne signifient pas `V1_INCOMPLETE`.

## Règles après freeze

### V1_ALLOWED_AFTER_FREEZE

- correction d’un bug démontré ;
- régression Production ;
- faille de sécurité ;
- accessibilité bloquante ;
- erreur factuelle ;
- incompatibilité navigateur démontrée ;
- correction nécessaire à l’intégrité du build ou du déploiement.

### V1_FORBIDDEN_AFTER_FREEZE

- nouvelle fonctionnalité, application ou produit ;
- redesign ;
- animation majeure ou nouvel effet Living Environment ;
- route publique majeure ;
- changement doctrinal ou taxonomique ;
- ajout opportuniste.

## Critères de réouverture V1

Une réouverture exige une anomalie reproductible relevant de `V1_ALLOWED_AFTER_FREEZE`, une preuve de son impact, un scope minimal, des validations de non-régression et une autorisation fondatrice explicite. Toute évolution fonctionnelle doit ouvrir une porte post-V1 distincte.

```text
OJW_V1_FEATURE_FREEZE = PREPARED_FOR_FOUNDER_REVIEW
PRODUCTION_MUTATION = NONE
TAG = SEPARATE_FOUNDER_DECISION
```
