# OJW-LIVING-ENVIRONMENT-LE-05 — Auto Celestial PRE1

## Statut et périmètre

Ce document conçoit le futur mode Auto astronomique local. Il ne constitue pas une implémentation runtime et n'autorise ni demande de géolocalisation, ni dépendance, ni service distant.

```text
AUTO_CURRENT = ARTISTIC_TIME_BASED
AUTO_TARGET = ASTRONOMICAL_LOCAL_SKY
RUNTIME_IMPLEMENTATION = AUTHORIZED_FOR_NEXT_GATE_ONLY
REAL_WEATHER = OFF
ASTRONOMY_EXECUTION = LOCAL_ONLY
MANUAL_DAY_MODE = ARTISTIC_DETERMINISTIC
MANUAL_NIGHT_MODE = ARTISTIC_DETERMINISTIC
```

## 1. Audit du mode Auto actuel

### Autorités et responsabilités

- `useEnvironmentClock` est l'autorité temporelle partagée. Il publie `Date.now()`, se rafraîchit chaque minute, puis au retour de visibilité, au focus et à `pageshow`.
- `useDayNightMode` conserve la préférence `auto/day/night`. En Auto, il utilise le fallback local 06:00–19:00 Jour, 19:00–06:00 Nuit.
- `useLivingEnvironment` orchestre l'horloge, le mode, le profil STANDARD/COMPACT, reduced-motion et `dynamicSky`.
- `solarDayNight` contient déjà un calcul de crépuscule civil à partir de latitude/longitude, mais il n'est pas utilisé par l'Auto courant. Son `resolveLocalCelestialState` répartit seulement l'heure locale entre matin 06–10, jour 10–16, soirée 16–19 et nuit 19–06.
- `dynamicSky` reste le modèle de présentation atmosphérique. Sa phase lunaire est une approximation par âge synodique et quatre classes : croissant, quartier, gibbeuse, pleine lune.
- `TreeScene` traduit le progrès de phase en coordonnées artistiques. Les trajectoires Soleil/Lune, les dimensions, le masque lunaire et certains décalages CSS sont arbitraires et ne dépendent ni d'un azimut, ni d'une altitude, ni d'une position géographique.

### Causes de l'écart avec le ciel réel

1. La bascule Jour/Nuit dépend d'heures fixes, pas du lever/coucher local.
2. La position suit un progrès de tranche horaire et une courbe SVG, pas des coordonnées horizontales astronomiques.
3. La phase ne distingue pas correctement croissant croissant/décroissant et ne calcule ni fraction éclairée ni angle du limbe brillant.
4. L'orientation du croissant n'intègre pas l'angle parallactique de l'observateur.
5. La Lune runtime est graphiquement grande : disque de 92 unités dans le repère SVG, halo de 176 unités, avec décalages CSS fixes.
6. Le Hero n'a ni orientation de caméra ni champ de vision astronomique définis.

## 2. Architecture cible

Conserver une seule chaîne d'autorité :

```text
useEnvironmentClock (timestamp partagé)
        +
useDayNightMode (préférence Auto/Jour/Nuit)
        +
LocalCelestialLocation (consentement + coordonnées grossières)
        ↓
astronomicalSky, utilitaire pur et déterministe
        ↓
useLivingEnvironment, orchestrateur unique
        ↓
dynamicSky, adaptation de présentation
        ↓
TreeScene, rendu CSS/SVG
```

Le futur calcul doit vivre dans un utilitaire pur, par exemple `src/utils/astronomicalSky.ts`. Il ne doit créer ni horloge, ni store, ni boucle d'animation. `useLivingEnvironment` lui transmet le timestamp partagé et, uniquement en Auto synchronisé, la localisation consentie.

```text
CELESTIAL_UPDATE_SOURCE = USE_ENVIRONMENT_CLOCK
ASTRONOMY_REQUEST_ANIMATION_FRAME = NONE
ASTRONOMY_NETWORK_API = NONE
```

Jour et Nuit manuels conservent leur rendu artistique déterministe. Une sélection manuelle reste prioritaire même si elle contredit l'heure réelle.

## 3. Localisation : stratégies comparées

| Stratégie | Précision | Vie privée | Friction | Hors ligne | Complexité |
|---|---:|---|---|---|---|
| A — géolocalisation navigateur explicite | Bonne après réduction de précision | Permission sensible, maîtrisable si locale | Prompt après action | Oui après consentement et stockage local | Moyenne |
| B — ville/région choisie manuellement | Suffisante et compréhensible | Très favorable ; aucune coordonnée précise demandée | Choix initial | Oui avec référentiel local minimal | Moyenne |
| C — fallback artistique actuel | Non astronomique | Aucune donnée | Nulle | Oui | Faible |

### Recommandation

Adopter pour V1 le modèle A + C approuvé, avec B reporté :

1. Au chargement, conserver le fallback artistique, sans prompt.
2. Afficher une action explicite telle que « Synchroniser avec mon ciel local ».
3. Proposer la géolocalisation navigateur ponctuelle, seulement après une action explicite et une explication de finalité.
4. Reporter le choix manuel ville/région à une porte ultérieure.
5. Ne jamais utiliser `watchPosition`.
6. Arrondir immédiatement la position obtenue à 0,25° et ne jamais conserver la valeur brute.
7. Permettre de modifier ou effacer la localisation mémorisée.

Contrat recommandé :

```text
LOCATION_STORAGE = LOCAL_ONLY_COARSE_COORDINATES
RAW_COORDINATE_STORAGE = FORBIDDEN
LOCATION_TRANSMISSION = NONE
LOCATION_PRECISION = 0.25_DEGREE
LOCATION_PERMISSION_TRIGGER = EXPLICIT_USER_ACTION_ONLY
LOCATION_FALLBACK = ARTISTIC_TIME_BASED_CURRENT_MODEL
LOCATION_WATCH = OFF
LOCATION_CLEAR_CONTROL = REQUIRED
MANUAL_CITY_SELECTION_V1 = DEFERRED
```

Pour la géolocalisation navigateur, stocker un enregistrement local versionné contenant uniquement latitude/longitude arrondies, source et consentement. Les coordonnées brutes ne doivent jamais être persistées. Aucun compte et aucun serveur ne sont requis.

## 4. Options de calcul astronomique

### Option A — mathématique locale interne

Étendre le calcul solaire actuel et implémenter les coordonnées topocentriques lunaires, illumination, phase, angle du limbe brillant, parallaxe et angle parallactique.

- Licence : code interne.
- Bundle : faible.
- Offline : complet.
- Avantage : aucune dépendance.
- Risque : charge élevée de validation, erreurs subtiles d'orientation et maintenance astronomique durable.

Cette option n'est pas recommandée pour la Lune, précisément là où l'écart fondateur est le plus visible.

### Option B — bibliothèque spécialisée locale

Décision fondatrice : SunCalc 2.0.1 est la dépendance runtime approuvée pour la prochaine porte uniquement. La bibliothèque est open source sous licence BSD-2-Clause, possède des déclarations TypeScript intégrées, n'utilise aucune API distante et fonctionne localement/offline. Elle couvre positions Soleil/Lune, lever/coucher, illumination, phase, angle du limbe brillant et angle parallactique. L'orientation visuelle s'obtient à partir de l'angle du limbe brillant moins l'angle parallactique.

```text
ASTRONOMY_ENGINE = SUNCALC_2_0_1_APPROVED
ASTRONOMY_ENGINE_TARGET_PACKAGE = suncalc@2.0.1
DEPENDENCY_INSTALL_IN_PRE1 = FALSE
```

Le poids exact doit être mesuré dans le build réel avant acceptation. Aucune valeur de transfert ne doit être promise depuis les seuls fichiers source du projet.

### Option C — Astronomy Engine ou sous-ensemble vendored

Astronomy Engine est MIT, local et très précis, mais couvre un domaine beaucoup plus large et annonce environ 116 Ko de JavaScript minifié. Il est disproportionné pour un Hero Soleil/Lune V1. Copier un sous-ensemble dans le dépôt créerait un fork de maintenance et est déconseillé.

### Décision technique proposée

Installer SunCalc 2.0.1 uniquement dans la prochaine porte, conserver un adaptateur OnJarama pur et tester les sorties déterministes. PRE1 n'ajoute encore aucune dépendance.

## 5. Soleil et Lune

Le futur état normalisé doit séparer :

- altitude apparente ;
- azimut ;
- visibilité au-dessus de l'horizon ;
- fraction éclairée de la Lune ;
- phase continue et classe éditoriale ;
- waxing/waning ;
- angle du limbe brillant ;
- angle parallactique ;
- orientation finale du terminateur.

```text
MOON_PHASE_IS_POSITION = FALSE
MOON_PHASE = ASTRONOMICAL
MOON_ORIENTATION = BRIGHT_LIMB_ANGLE_MINUS_PARALLACTIC_ANGLE
BELOW_HORIZON_SOURCE_VISIBLE = FALSE
ASTRE_BELOW_HORIZON = HIDDEN
ASTRE_OUTSIDE_HERO_FOV = HIDDEN
AUTO_LOCAL_DAY_THRESHOLD = SUN_ALTITUDE_GREATER_THAN_MINUS_6_DEGREES
AUTO_LOCAL_NIGHT_THRESHOLD = SUN_ALTITUDE_LESS_OR_EQUAL_MINUS_6_DEGREES
AUTO_LOCAL_SUN_MOON_VISIBILITY = INDEPENDENT
AUTO_LOCAL_DUAL_ASTRES = ALLOWED_WHEN_ASTRONOMICALLY_VISIBLE
```

Une source située sous l'horizon ne doit pas être rendue. Une courte transition d'opacité autour de l'horizon est acceptable, sans immobiliser l'astre sur le bord. La lumière crépusculaire peut continuer à dépendre de l'altitude solaire même après disparition du disque.

### Taille apparente

La distance Terre–Lune ne doit produire qu'une variation fortement limitée. Les tailles approuvées sont 28 CSS px sur desktop et 20 CSS px sur mobile, avec un halo très discret. Cette cible remplace l'impression actuelle surdimensionnée sans prétendre reproduire une échelle photographique stricte.

```text
MOON_SIZE_DESKTOP = 28PX
MOON_SIZE_MOBILE = 20PX
MOON_DISTANCE_SIZE_VARIATION = STRONGLY_LIMITED
```

## 6. Mapping vers le Hero

Le panorama n'étant pas une vue 360°, une calibration artistique documentée est obligatoire :

- `viewBearingDeg` : direction virtuelle du centre du panorama ;
- `horizontalFovDeg` : champ horizontal représenté ;
- `horizonY` : ligne d'horizon normalisée du visuel canonique ;
- `verticalFovDeg` : champ vertical de ciel utile.

Décisions de calibration V1 :

```text
HERO_VIRTUAL_CAMERA_HEADING = EQUATOR_FACING
HERO_HORIZONTAL_FOV = 180_DEGREES
```

`EQUATOR_FACING` signifie une caméra virtuelle orientée vers l'équateur céleste : vers le sud dans l'hémisphère Nord et vers le nord dans l'hémisphère Sud. L'horizon vertical précis restera calibré sur les plaques sans changer cette règle.

Formules conceptuelles :

```text
deltaAzimuth = shortestSignedAngle(azimuth - viewBearingDeg)
x = 0.5 + deltaAzimuth / horizontalFovDeg
y = horizonY - altitude / verticalFovDeg
visible = altitude > 0 && abs(deltaAzimuth) <= horizontalFovDeg / 2 && y >= skyTop
```

Ne pas pincer l'astre contre un bord lorsqu'il sort du champ : le masquer. Les valeurs de bearing, FOV et horizon doivent être calibrées sur les plaques et approuvées visuellement. Un cadrage responsive peut ajuster le champ visible, mais ne doit pas changer le calcul astronomique.

## 7. Conflits raster

- La plaque active Nuit est explicitement `founder-canonical-night-no-moon.png` : aucune lune raster active.
- La plaque Jour active ne présente pas de disque solaire distinct identifié ; elle contient cependant un éclairage et des nuages artistiques baked.
- Les dérivés AVIF/WebP héritent du même contenu.
- Le moteur doit garantir une seule source céleste runtime et ne télécharger aucune ancienne plaque R2.

PRE1 ne modifie aucun asset. La position astronomique sera crédible dans le champ virtuel du Hero, tandis que l'éclairage baked restera une concession artistique documentée.

## 8. Performance, offline et accessibilité

- Calcul au chargement puis sur la minute partagée, `visibilitychange`, focus et `pageshow` déjà gérés.
- Aucun calcul à 60 FPS et aucun `requestAnimationFrame` astronomique.
- Calcul local pur, fonctionnel hors ligne après acquisition ou choix de localisation.
- Les couches Soleil/Lune restent décoratives, `aria-hidden` et `pointer-events:none`.
- Reduced-motion fige les transitions visuelles ; il ne modifie pas la vérité de la position calculée au dernier tick.
- Nuages et pluie restent décoratifs et indépendants de toute météo réelle.

```text
ASTRONOMICAL_REFRESH = SHARED_MINUTE_CLOCK_PLUS_BROWSER_REENTRY_EVENTS
```

## 9. Tests déterministes proposés

Les tests de la future implémentation injecteront timestamp et coordonnées fixes :

1. Soleil au-dessus de l'horizon et sous l'horizon.
2. Lever/coucher autour d'une tolérance documentée.
3. Croissant bas en soirée au Québec avec coordonnées publiques de ville, jamais personnelles.
4. Quartier, gibbeuse et pleine lune.
5. Lune sous l'horizon.
6. Orientation croissante/décroissante.
7. Cas hémisphère Nord et Sud.
8. Mapping dans/hors champ sans clamp de bord.
9. Refus de permission, navigateur incompatible et offline.
10. Jour/Nuit manuels indépendants de l'astronomie.

Les tests ne doivent jamais dépendre de `new Date()` au moment du CI. Les résultats de bibliothèque seront vérifiés avec tolérances numériques et quelques références astronomiques publiées, pas avec des snapshots visuels seuls.

## 10. Décisions fondatrices enregistrées

Les décisions de moteur, confidentialité, permission, stockage, fallback, seuil crépusculaire, visibilité indépendante des astres, caméra équatoriale, champ horizontal, horizon et taille lunaire sont fermées par le présent PRE1. L'implémentation runtime est autorisée uniquement dans la prochaine porte dédiée.

## 11. Sources techniques examinées

- SunCalc : https://github.com/mourner/suncalc
- Astronomy Engine : https://github.com/cosinekitty/astronomy
- W3C Geolocation : https://www.w3.org/TR/geolocation/
- MDN Geolocation API : https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

## Verdict PRE1

```text
OJW_LIVING_ENVIRONMENT_LE_05_AUTO_CELESTIAL_PRE1_READY_FOR_GIT_CLOSURE
NEXT_GATE = OJW-LIVING-ENVIRONMENT-LE-05-IMPLEMENTATION
```
