# OJW-LOT-09 — Revue d'alignement Foundation

## 1. Objectif

Vérifier si le portail institutionnel OnJarama Web (issu du LOT 08) est cohérent avec les principes d'OnJarama Foundation et avec la déclaration pilote créée côté OJF au LOT 00D, sans créer d'intégration technique entre les deux dépôts.

## 2. Baseline OJW

- Dépôt : `onjarama-web` (remote `https://github.com/salomondiallo/OnJarama-Web.git`).
- Branche : `main`.
- Dernier commit avant travail : `23706a9fa49ad23fe20caa91fb1da18d2bed00be` — chore(web): ignore local environment artifacts.
- OJW-LOT-08 identifié comme déjà présent : portail institutionnel complet (`Header`, `HeroSection`, `AboutSection`, `EcosystemSection`, `MissionSection`, `VisionSection`, `RoadmapSection`, `Footer`), avec une section écosystème listant Path, Academy, OJCS Connect, Web et Foundation.

## 3. Référence OJF-LOT-00D

Ce lot s'appuie sur la déclaration d'adoption pilote créée côté OnJarama Foundation (dépôt `onjarama-foundation`, `docs/08-adoption/OJF-LOT-00D-OJW-PILOT-ADOPTION-DECLARATION.md`) : adoption documentaire pilote, non technique, révocable, portant sur l'alignement institutionnel (ton, mission, séparation des responsabilités), explicitement sans intégration technique.

Cette revue ne modifie pas cette déclaration ni aucun fichier du dépôt Foundation.

## 4. Ce qui est aligné

- **Distinction claire Web / Foundation** : `EcosystemSection` présente OnJarama Web comme « le portail institutionnel que vous consultez » (`isCurrent: true`) et OnJarama Foundation séparément comme « Socle commun », sans les confondre.
- **Foundation présentée comme socle passif et non intrusif** : la note dédiée (`foundation-note` dans `EcosystemSection.tsx`) indique explicitement : « Foundation n'est pas une application : c'est un socle commun passif et versionné. Il ne détient ni utilisateur, ni secret, ni base de données partagée — seulement des standards que chaque pôle applique librement. » Ce texte est directement cohérent avec la doctrine du LOT 00A.
- **Aucune promesse de base partagée, d'utilisateur centralisé ou d'authentification transverse** : aucune section du portail n'évoque un compte, une session ou une base commune entre applications.
- **Aucune dépendance technique** : aucun import, aucun package et aucune référence de configuration vers le dépôt Foundation n'existe dans le code source ou dans `package.json`.
- **Ton institutionnel et sobriété** : les textes des sections (`Hero`, `About`, `Mission`) restent courts, clairs, sans jargon technique excessif, cohérents avec un portail public.
- **Présentation cohérente de l'écosystème** : les cinq pôles (Path, Academy, OJCS Connect, Web, Foundation) sont listés de façon homogène dans `ecosystem.ts`.

## 5. Ce qui a été corrigé

Deux ajustements de texte, sans changement d'architecture ni de fonctionnalité :

1. **`src/data/roadmap.ts`** — l'entrée « Après » indiquait « Connexion progressive aux applications OnJarama et à Foundation. », ce qui regroupait implicitement Foundation avec les applications comme cible de « connexion », en contradiction avec la note écosystème affirmant que « Foundation n'est pas une application ». Reformulé en : « Liens officiels progressifs vers les applications OnJarama, et alignement documentaire avec les standards Foundation. »
2. **`src/sections/VisionSection.tsx`** — le libellé de section « Contrôle UX » utilisait un jargon technique (« UX ») peu adapté à un public non technique. Reformulé en « Qualité d'usage ».

## 6. Ce qui reste hors périmètre

- Aucune modification du visuel « orbit-card » du Hero (qui représente Path, Academy, OJCS et Foundation comme points d'un même schéma visuel) : il s'agit d'un choix de design déjà établi au LOT 08, dont la refonte dépasserait le périmètre de corrections légères autorisé ici. Le texte environnant clarifie déjà la nature non applicative de Foundation.
- Aucune intégration technique, aucun package, aucun import, aucun appel réseau vers Foundation n'a été ajouté ni envisagé.
- Aucune modification des secrets, variables d'environnement, configuration Vercel ou production.
- Aucun changement de dépendances npm.

## 7. Risques

- Le schéma visuel du Hero (orbit-card) place Foundation visuellement au même niveau que les trois applications ; à surveiller si une prochaine évolution du portail devait accentuer cette ambiguïté visuelle.
- Cette revue reste unilatérale côté OJW ; elle ne constitue pas une validation croisée formelle avec l'équipe Foundation.

## 8. Conclusion

Le portail OnJarama Web, tel qu'issu du LOT 08, est globalement cohérent avec les principes d'OnJarama Foundation et avec la déclaration pilote du LOT 00D. Les deux corrections de texte appliquées renforcent cette cohérence sans modifier l'architecture ni introduire de dépendance technique.

## 9. Recommandation

Maintenir le statut de Foundation comme **pilote documentaire** côté OJF tant que l'adoption n'est pas formellement validée (revue documentaire, validation manuelle, mise à jour du registre d'adoption), conformément aux conditions définies dans la déclaration pilote OJF-LOT-00D.
