# OJW-GFX-04 — Rapport d'intégration Web locale

Date : 26 juillet 2026

## 1. Préflight Git

- Dépôt : `C:\Users\tsdia\OnJarama Main\onjarama-web`
- Remote contrôlé : `salomondiallo/OnJarama-Web`
- Branche : `main`
- HEAD initial : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- `origin/main` initial : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- Divergence initiale : `0 0`
- Working tree et staging initiaux : propres

## 2. Sources validées utilisées

Les deux compositions finales approuvées de l'arbre B proviennent de
`OJW-GFX-03-G\04-desktop-final`.

| Source | Dimensions | SHA-256 |
| --- | ---: | --- |
| `ojw-gfx03g-tree-B-day-desktop-final.png` | 1672 × 941 | `F24BA313885AB5DA1BD5D4F730FA4B19ED5AECCA8FDA85EF8651C0738DED63AE` |
| `ojw-gfx03g-tree-B-night-desktop-final.png` | 1672 × 941 | `8DDB3662EDDD67784E0F9156432E6693321B92E2E6D0BF6EC55894ED40164775` |

Les PNG intégrés sont des copies byte-identiques. Les variantes 960, 1280 et
1672 ont été dérivées localement et de manière déterministe en AVIF et WebP,
sans génération d'image et sans altération des sources externes validées.

## 3. Fichiers modifiés ou ajoutés

- `package.json`
- `src/components/TreeScene.tsx`
- `src/styles/tree.css`
- `scripts/architecture/ojw-gfx-04-approved-tree-b-integration.test.mjs`
- `src/assets/immersive/gfx03/scene-day-tree-b.png`
- `src/assets/immersive/gfx03/scene-night-tree-b.png`
- douze variantes AVIF/WebP sous `src/assets/immersive/gfx03/optimized/`
- `docs/OJW-GFX-04-LOCAL-WEB-INTEGRATION-REPORT.md`

## 4. Logique d'intégration

`TreeScene` utilise désormais exclusivement les deux plaques finales GFX-03-G
pour son décor principal. Les sources `<picture>` conservent l'ordre AVIF,
WebP, puis PNG, ainsi que les trois largeurs 960, 1280 et 1672.

La logique de montage différé existante est conservée : seule la famille du
mode actif est montée initialement, la plaque demandée est préparée lors d'une
interaction avec le contrôle, puis l'ancienne plaque reste visible jusqu'au
chargement de la cible. Les plaques déjà chargées restent montées en mémoire.

Les anciennes surcouches qui dupliqueraient des éléments déjà aplatis dans le
maître approuvé sont neutralisées uniquement pour la scène GFX-03 : ancienne
inscription OJF, anciens fruits, lumières de cité, lampadaires, lune et texture
générique. Les couches compatibles de vie organique restent gérées par le
runtime.

## 5. Gestion Jour / Nuit

Les modes `Auto`, `Jour` et `Nuit` ainsi que le calcul solaire existant ne sont
pas modifiés. Le mode résolu pilote la famille Jour ou Nuit GFX-03-G. Le fondu,
le maintien de la plaque précédente pendant le chargement et
`prefers-reduced-motion` restent en place.

## 6. Comportement responsive

La plaque conserve son ratio maître `1672 / 941`, sans déformation et sans
recadrage destructif. `object-fit: contain` et un centrage constant préservent
la cascade, le chemin, la cité et l'arbre B sur les différentes largeurs. Sur
mobile, la scène dispose d'un cadre intrinsèque au même ratio, ce qui évite de
couper la structure OJF ou la cime.

Le build responsive est validé techniquement. Une qualification visuelle
réelle aux viewports desktop et mobile reste à effectuer par le Fondateur :
aucun navigateur contrôlable n'est disponible dans la présente session
Codex Remote. Aucune preuve visuelle n'a été inventée.

## 7. Zones techniques futures des fruits

Quatre ancres DOM invisibles, non interactives et exclues de l'arbre
d'accessibilité sont préparées à partir des coordonnées validées :

| Projet | x | y | diamètre maximal indicatif |
| --- | ---: | ---: | ---: |
| OJA | 64,29 % | 29,97 % | 58 px |
| OJP | 73,03 % | 20,09 % | 58 px |
| OJCS | 82,18 % | 24,44 % | 58 px |
| OJW | 90,19 % | 34,33 % | 58 px |

Aucun fruit réel n'est affiché. Les ancres sont disponibles via
`data-gfx03-fruit-zones`, `data-project` et `data-max-diameter` pour une future
intégration.

## 8. Validations

Tous les contrôles exécutés ont réussi :

- `npm.cmd run test:ojw:gfx-04`
- `npm.cmd run test:ojw:lot-18-a`
- `npm.cmd run test:ojw:lot-16-d-fix7`
- `npm.cmd run test:ojw:lot-17-a`
- `npm.cmd run test:ojw:lot-16-a`
- `npm.cmd run test:ojw:lot-14`
- `npm.cmd run test:ojw:lot-13`
- `npm.cmd run lint`
- `npm.cmd run build`
- `git diff --check`

Le test GFX-04 contrôle notamment les SHA-256 et dimensions des PNG, la
présence des douze dérivés, l'ordre AVIF/WebP/PNG, les trois largeurs, les
coordonnées des quatre ancres et leur invisibilité.

## 9. Limites

- La revue visuelle humaine réelle desktop/tablette/mobile reste requise.
- Aucun navigateur contrôlable n'était exposé par l'environnement Remote.
- Le port local 4177 était déjà occupé par un serveur existant, qui n'a pas été
  arrêté conformément au périmètre.
- Les fruits demeurent volontairement absents jusqu'à validation de leurs
  visuels finaux.

## 10. État Git final

- HEAD : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- `origin/main` : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- Divergence : `0 0`
- Staging : vide
- Working tree : contient uniquement les modifications locales non commitées
  de ce lot
- Aucun commit, push, merge, amend, déploiement ou appel Vercel

## 11. Verdict

`OJW_GFX_04_LOCAL_WEB_INTEGRATION_READY_FOR_REVIEW`
