# OJW-GFX-04-FIX1 — Rapport de raffinement visuel du Hero

## 1. Préflight Git

- Dépôt : `C:\Users\tsdia\OnJarama Main\onjarama-web`
- Branche : `main`
- HEAD : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- `origin/main` : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- Divergence : `0 0`
- Les seules modifications initiales étaient celles du working tree GFX-04 connu.

## 2. Fichiers modifiés par FIX1

- `src/components/TreeScene.tsx`
- `src/styles/tree.css`
- `scripts/architecture/ojw-gfx-04-approved-tree-b-integration.test.mjs`
- `docs/OJW-GFX-04-FIX1-VISUAL-REFINEMENT-REPORT.md`

Les plaques GFX-03-G, leurs dérivés AVIF/WebP, le logo et les autres sections du portail n'ont pas été modifiés.

## 3. Corrections apportées

### Lampadaires et petites lumières

Les surcouches historiques de lampadaires restent désactivées pour GFX-03. Les lumières pixel-verrouillées des plaques sont conservées : elles sont éteintes ou discrètes le Jour, clairement visibles la Nuit et occupent exactement le même axe de chemin dans les deux modes. Une première surcouche expérimentale a été retirée après revue, car elle doublait inutilement ces lumières raster.

### Ancrage de l'arbre

Une ombre de contact SVG très localisée a été ajoutée sous la base des racines. Elle renforce le contact avec le terrain sans plaque, sans flou global et sans modifier la silhouette OJF. La végétation et les racines déjà intégrées au maître restent visibles.

### Majesté de l'arbre

La structure et les proportions validées de l'arbre B sont inchangées. La cime complète, les branches principales et le tronc monumental restent visibles. La suppression des surcouches parasites améliore leur lecture sans redimensionnement artificiel.

### Cascade

Les trois filets Web verticaux historiques sont désactivés pour la scène GFX-03. La cascade raster naturelle reste visible, sans bandes SVG superposées.

### Soleil et lune

Un soleil Jour et une lune Nuit sont rendus dans le SVG existant, à des positions stables et responsive. Les deux utilisent des gradients radiaux doux. Un seul astre est visible par mode.

### Brume et netteté

Les anciennes textures et brumes Web restent désactivées sur GFX-03. Aucun nouveau voile n'est ajouté. La cité, le chemin, la cascade et l'arbre conservent la netteté des plaques qualifiées.

### Éléments conservés

- Arbre OJF et structure des lettres inchangés.
- Ancien système de fruits toujours masqué.
- Zones techniques des futurs fruits toujours invisibles.
- Cité, chemin, cascade et composition générale inchangés.

## 4. Captures

Dossier hors dépôt :

`C:\Users\tsdia\Downloads\Projet_OnJarama\Web\Graphics\OJW-GFX-04-FIX1-CAPTURES`

Captures principales :

- Desktop Jour, `1440 × 900`
- Desktop Nuit, `1440 × 900`
- Mobile Jour, `390 × 844`
- Mobile Nuit, `390 × 844`

Gros plans :

- arbre et racines, Jour et Nuit ;
- cascade, Jour et Nuit ;
- chemin et lumières, Jour et Nuit.

## 5. Validations techniques

Toutes réussies :

- `npm.cmd run test:ojw:gfx-04`
- `npm.cmd run test:ojw:lot-18-a`
- `npm.cmd run test:ojw:lot-17-a`
- `npm.cmd run test:ojw:lot-16-d-fix7`
- `npm.cmd run lint`
- `npm.cmd run build`
- `git diff --check`

## 6. État Git final

- Aucun commit.
- Aucun push.
- Aucun déploiement.
- Aucun appel Vercel.
- HEAD et `origin/main` inchangés.
- Le working tree GFX-04 reste local.

## 7. Verdict

`OJW_GFX_04_FIX1_READY_FOR_FOUNDER_REVIEW`
