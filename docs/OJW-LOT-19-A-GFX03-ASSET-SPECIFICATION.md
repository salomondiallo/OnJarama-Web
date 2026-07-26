# OJW-GFX-03-HERO-OJF-RECOMPOSITION — Spécification des assets

Statut : cahier des charges PRE1. Aucune image n'est produite ou intégrée par ce lot.

## Livrables maîtres

- Jour : PNG 1672 × 941.
- Nuit : PNG 1672 × 941.
- Géométrie strictement commune : même cadrage, mêmes coordonnées et aucun déplacement entre modes.
- Déclinaisons ultérieures : AVIF puis WebP en 960, 1280 et 1672 px, PNG maître en fallback.

## Composition commune

- cascade à gauche et cours d'eau conservés;
- cité futuriste exactement dans l'axe du chemin;
- arbre monumental à droite, tronc formant naturellement O, J et F;
- aucune inscription OJF collée, aucun fruit, fil ou attache;
- chemin majoritairement droit, naturel, sans bitume ni marquage;
- aucun élément essentiel dans les 5 % extrêmes;
- zone éditoriale desktop libre en bas à gauche;
- aucun texte, logo, interface, carte ou oiseau incrusté.

L'arbre doit exprimer fondation par les racines, présence ancestrale par le tronc et transmission par la cime. Les lettres naissent des volumes du bois; sont interdits la typographie artificielle, le cercle décoratif, le métal et l'aspect portail sculpté.

## Jour

Lumière naturelle chaude, netteté maîtrisée, feuillage vert profond, écorce détaillée, chemin lisible, cité visible. Les lampes existent physiquement en deux lignes convergentes mais restent éteintes ou discrètes. Aucun symbole métallique ou texte plaqué.

## Nuit

Même géométrie pixel pour pixel. L'arbre reste détaillé et éclairé avec retenue. Les lampes chaudes suivent deux lignes convergentes vers la cité, avec espacement perspectif et petites variations d'intensité, sans ligne continue. La cité est éclairée; ciel et lune sont cohérents. Sont interdits : halos concentriques, voile orange, artefacts verticaux/horizontaux FIX6, néons, flash et flou global.

## Zones de cadrage

Repère maître : origine en haut à gauche, 1672 × 941.

- Cascade : x=0–22 %, avec marge de sécurité intérieure.
- Cité et entrée : x=38–56 %, y≈28–62 %.
- Axe du chemin : du premier plan x≈52–66 %, y≈100 %, vers l'entrée x≈45–50 %, y≈56 %.
- Arbre OJF : x=62–100 %, tronc lisible dans x≈68–90 %; éviter une lettre essentielle au-delà de x=95 %.
- Zone éditoriale desktop : garder x=0–34 %, y=60–100 % sans détail indispensable ni contraste concurrent.

Desktop utilise `object-fit:cover` sur un panorama dont la hauteur varie : valider 1440 × 900, 1280 × 800 et 1024 × 768. Mobile utilise actuellement `object-fit:contain` et le ratio 1672/941 : valider 400 × 1221, 390 × 844 et 360 × 800, sans réduire l'OJF, la cité ou la cascade à un détail illisible.

## Références externes et rôle de chacune

Les trois fichiers existent hors dépôt au 25 juillet 2026. Ils n'ont été ni copiés, ni modifiés, ni réencodés, ni déplacés. La capture de l'Explorateur Windows n'est pas une référence graphique.

| Fichier et chemin | Extension / format réel | Dimensions | Taille | SHA-256 | Rôle et exclusions |
|---|---|---:|---:|---|---|
| `C:\Users\tsdia\Downloads\Projet_OnJarama\Arbre ancestral et lettres formées.png` | `.png` / PNG | 1122 × 1402 | 3 389 278 octets | `2149E202EFBD2BC552A9D0DB0855F5DD4A769E8510603E3DF8D5C5F6187AEEB0` | Référence principale de fusion organique O/J/F. Ne pas copier sa composition verticale, son image entière ou en faire une typographie artificielle. |
| `C:\Users\tsdia\Downloads\Projet_OnJarama\ChatGPT Image 25 juil. 2026, 22_22_06.png` | `.png` / PNG | 1672 × 941 | 3 154 846 octets | `7064B567768C0631FB1D80599837D416F8F72F056FFAD30321CC52EDDEB437E6` | Référence principale du chemin droit, de l'axe vers la cité et des deux lignes de lampes convergentes. Ne pas produire une route moderne ou des lignes continues. |
| `C:\Users\tsdia\Downloads\Projet_OnJarama\Arbre magique dans une forêt ensoleillée.png` | `.png` / PNG | 1122 × 1402 | 3 214 564 octets | `CCDB750D5D9277179E9AF4ABDDEE2F18AD9B38D313BBC903D83BB5F2A569EB4B` | Référence secondaire de monumentalité, noblesse et densité de cime. Exclure cercle, ornements métalliques et effet de portail sculpté. |

## Contrôles d'acceptation graphique

1. Dimensions exactes et identité géométrique Jour/Nuit démontrées.
2. OJF lisible naturellement dans le tronc, sans surcouche nécessaire.
3. Aucun fruit ni attache dans les pixels.
4. Chemin relié à l'entrée de la cité; lampes en perspective par paires.
5. Cascade, eau, cité, montagne et arbre restent lisibles sur les viewports cibles.
6. Zone éditoriale utilisable et aucun élément essentiel aux extrêmes.
7. Nuit sans artefact FIX6/FIX7, halo concentrique ou perte de netteté.
8. Comparaison visuelle Jour/Nuit et différence géométrique qualifiées hors dépôt avant toute optimisation.
