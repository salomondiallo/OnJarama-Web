# OJW-GFX-04-FIX3 — Soleil naturel et fusion arbre–terrain

## État initial

- Branche : `main`
- `HEAD` et `origin/main` : `a2206f0c8a3d88adf5b1c2c75d82e5e01040d0ec`
- Divergence : `0 0`
- Le working tree GFX-04 existant a été conservé.

## Corrections

### Soleil Jour

- Soleil Web localisé à `cx=825`, `cy=135`, à distance de la cime.
- Noyau lumineux de rayon `20` (diamètre 40 unités au maître), avec une
  opacité maximale de `0.105`.
- Halo atmosphérique de rayon `120`, progressif et sans contour.
- Opacité du système Jour : `1`.
- Sur écran de 700 px ou moins, le noyau est agrandi de `1.8` et le halo de
  `1.3` afin de préserver la perception mobile sans augmenter l'opacité
  centrale.
- Aucun disque opaque, contour, icône ou cercle SVG net n'est visible.

### Fusion colorimétrique de l'arbre

- Deux voiles atmosphériques localisés suivent la cime et le tronc, avec des
  variantes Jour et Nuit.
- Le traitement utilise uniquement des gradients alpha doux appliqués au
  calque de l'arbre.
- Aucun filtre global, aucun flou global et aucune modification de la plaque
  source.
- La monumentalité, la structure OJF, la position et la taille de l'arbre
  restent inchangées.

### Jonction racines–sol

- Ombre de contact principale conservée et complétée par des formes
  irrégulières.
- Occlusions locales et quatre petites formes de feuillage/herbes
  déterministes passent devant certaines racines.
- Les teintes et opacités sont différenciées entre Jour et Nuit.
- Aucune grande ombre uniforme et aucune végétation générée.

## Revue visuelle

- Le soleil est visible comme une présence atmosphérique diffuse, sans
  ressembler à une pastille : **oui**.
- L'arbre paraît appartenir au même paysage : **oui, la température et la
  profondeur locale sont mieux raccordées**.
- La différence de netteté arbre/végétation est réduite : **oui, subtilement,
  sans flou global**.
- Les racines semblent entrer dans le terrain : **oui, grâce aux occlusions
  localisées et aux éléments de premier plan**.
- Une limite de détourage subsiste-t-elle au pied : **elle est fortement
  atténuée et n'apparaît plus comme un bord inférieur continu**.
- Lune, lampadaires et cime conservés sans régression : **oui**.
- Les gros plans cascade Jour/Nuit ne montrent pas de nouvel artefact.

Captures :

`C:\Users\tsdia\Downloads\Projet_OnJarama\Web\Graphics\OJW-GFX-04-FIX3-CAPTURES`

## Validations

- `npm.cmd run test:ojw:gfx-04` : réussi
- `npm.cmd run test:ojw:lot-18-a` : réussi
- `npm.cmd run test:ojw:lot-17-a` : réussi
- `npm.cmd run test:ojw:lot-16-d-fix7` : réussi
- `npm.cmd run lint` : réussi
- `npm.cmd run build` : réussi
- `git diff --check` : réussi

## Conclusion

`OJW_GFX_04_FIX3_READY_FOR_FOUNDER_REVIEW`

Aucun commit, push, déploiement ou appel Vercel n'a été effectué.
