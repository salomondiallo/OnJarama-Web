# OJW-LOT-19-A — Décision officielle de recomposition du hero

Statut : décision PRE1, documentaire uniquement. Base auditée : `dd7061a4ae0c479d31a38e42b7775acd3bc6848f`.

## Arbre et OJF

L'arbre représente OJF lui-même. Le futur tronc doit suggérer ou former naturellement O, J et F par les volumes, courbes, creux, racines et branches du bois. Il ne doit comporter ni inscription ajoutée sur l'écorce, ni plaque, gravure plate, typographie collée, structure métallique ou couronne décorative.

La lecture OJF doit rester compréhensible sans transformer l'arbre en lettrage artificiel. L'arbre reste vivant, monumental, ancestral et crédible : les racines expriment la fondation, la cime la croissance et la transmission. Le retrait des fruits autorise une envergure accrue.

## Fruits et accès projets

OJA, OJP, OJCS et OJW quittent entièrement la scène immersive, avec leurs tiges. Ils deviennent quatre accès de navigation immédiatement après le panorama et avant les cartes institutionnelles détaillées.

- Desktop : une rangée de quatre accès lisibles, sans superposition sur le décor.
- Mobile : grille 2 × 2, sigle et nom visibles, cible tactile d'au moins 44 × 44 px.
- Clavier : ordre DOM naturel, activation native et focus clairement visible.
- Données : réutilisation de `ecosystem`; aucune duplication du statut, du nom ou de la destination.

OJF reste représenté par l'arbre dans la scène et par sa carte institutionnelle détaillée. Les cinq cartes existantes restent conservées.

## Chemin

Le futur chemin est majoritairement droit, naturel et minéral, avec de légères irrégularités de bord. Sa perspective part du premier plan et aboutit précisément à l'entrée principale de la cité. Ce n'est ni une autoroute, ni une route bitumée; il ne comporte aucune ligne peinte.

Le jour, les lampes sont physiquement présentes mais éteintes ou très discrètes. La nuit, elles forment deux lignes convergentes, avec un espacement resserré vers la cité, une lumière chaude, douce et légèrement irrégulière. L'effet symbolique de piste d'atterrissage ne doit produire ni flash, néon, ligne continue, ni artefact vertical ou horizontal.

## Éléments conservés

La cascade à gauche, le cours d'eau, la cité futuriste, les montagnes, les oiseaux, le ciel Jour/Nuit, le mode Auto solaire saisonnier, les animations organiques, le panneau éditorial, les cartes institutionnelles, le header et le footer sont conservés.

Le comportement FIX7-R1 reste une contrainte : une seule famille de plaque est montée au chargement initial, la cible est préparée à l'intention utilisateur, l'ancienne plaque reste visible jusqu'au chargement de la nouvelle, et les formats restent AVIF → WebP → PNG.

## Décision de production

Les changements structurants de l'arbre et du chemin ne peuvent pas être obtenus proprement par CSS : ces éléments sont intégrés aux PNG Jour/Nuit. Un nouveau pack pixel-aligné `OJW-GFX-03-HERO-OJF-RECOMPOSITION` est requis. Le retrait des fruits, le retrait de l'inscription HTML actuelle et la création de la bande d'accès seront réalisés ensuite par le code, après qualification graphique des plaques.
