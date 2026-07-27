# OJW-GFX-04-FIX4 — Soleil lisible et fusion finale arbre–terrain

## Fichiers modifiés

- `src/components/TreeScene.tsx`
- `src/styles/tree.css`
- `scripts/architecture/ojw-gfx-04-approved-tree-b-integration.test.mjs`
- `docs/OJW-GFX-04-FIX4-SUN-TREE-FUSION-REPORT.md`

## Soleil Jour

- Position conservée : `cx=825`, `cy=135`.
- Halo diffus ramené à un rayon de `100`, sans bord ni contour.
- Noyau resserré à un rayon de `18`.
- Gradient central progressif : opacités `.62`, `.46`, `.20`, `.06`, puis
  transparence complète.
- Échelle mobile du noyau : `2.2`, sans modification de l'opacité du système.
- La présence solaire est désormais lisible sur desktop et mobile, sans
  disque opaque.

## Fusion arbre–terrain

- Deux calques Web strictement localisés à la cime/tronc et à la base.
- Traitement local : `blur(.65px) saturate(.9) contrast(.94)`.
- Masques radiaux progressifs pour éviter toute frontière du traitement.
- Teintes atmosphériques distinctes Jour/Nuit.
- Trois occlusions organiques supplémentaires et un renforcement mesuré des
  petites formes végétales existantes devant les racines.
- Aucun changement de plaque, géométrie OJF, position ou échelle de l'arbre.

## Captures

`C:\Users\tsdia\Downloads\Projet_OnJarama\Web\Graphics\OJW-GFX-04-FIX4-CAPTURES`

Les dix preuves demandées ont été générées depuis le build final FIX4 :
desktop Jour/Nuit, mobile Jour/Nuit, soleil, racines Jour/Nuit, comparaison
FIX3-R1/FIX4 et cascade Jour/Nuit.

## Validations

- GFX-04 : réussi
- LOT-18-A : réussi
- LOT-17-A : réussi
- LOT-16-D-FIX7 : réussi
- lint : réussi
- build : réussi
- `git diff --check` : réussi

## Verdict

`OJW_GFX_04_FIX4_READY_FOR_FOUNDER_REVIEW`

Aucun commit, push, déploiement ou appel Vercel n'a été effectué.
