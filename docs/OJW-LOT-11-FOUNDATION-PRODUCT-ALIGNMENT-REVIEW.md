# OJW-LOT-11 — Revue produit persistée de l’alignement OnJarama Foundation

## 1. Objet de la revue

Ce document constitue la revue produit officielle et persistée du portail OnJarama Web (OJW) concernant la représentation publique d’OnJarama Foundation.

Cette revue :

- valide, côté produit, l’état actuel du portail au regard du positionnement institutionnel et social officiellement validé d’OnJarama Foundation ;
- répond à la réserve documentaire relevée dans `OJF-LOT-00G-OJW-EVIDENCE-RECONCILIATION-AND-ADOPTION-READINESS.md` (dépôt `onjarama-foundation`), critère 2 des dix critères cumulatifs d’`OJF-LOT-00E-PILOT-TO-ADOPTED-RULES` : *« Revue côté produit, documentée dans le dépôt de l’application »*, jusqu’ici qualifié « Non satisfait au sens strict » faute d’un tel document dans `onjarama-web` ;
- **ne prononce pas** l’adoption finale d’OJW dans le dépôt OnJarama-Foundation. Cette décision reste de la compétence exclusive du dépôt `onjarama-foundation`.

## 2. État examiné

- Dépôt : `OnJarama-Web` (`https://github.com/salomondiallo/OnJarama-Web.git`)
- Branche : `main`
- Commit produit canonique : `0a05da5c938234171fffac598643ad46b45722c3`
- Message : `feat(web): integrate approved Foundation positioning`
- Date de la revue : 2026-07-19
- Fichiers inspectés (5) : `src/data/ecosystem.ts`, `src/data/roadmap.ts`, `src/sections/EcosystemSection.tsx`, `src/sections/VisionSection.tsx`, `src/styles/cards.css` — ainsi que `src/sections/MissionSection.tsx` et `src/sections/HeroSection.tsx` pour confirmer l’absence de recentrage sur Foundation.
- Référence Foundation : `OJF-LOT-00G-OJW-EVIDENCE-RECONCILIATION-AND-ADOPTION-READINESS.md`
- Commit OJF consulté (lecture seule) : `f305e9b69440ed850641172d99b1c9630ebcc780` — `docs(foundation): reconcile OJW evidence and preserve pilot status`

## 3. Positionnement produit validé

- Nom : **OnJarama Foundation**
- Nature : pilier institutionnel et social de l’écosystème OnJarama (et non une application technique)
- Fonction initiale : gouvernance de l’impact, structuration institutionnelle, partenariats
- Évolution future : futures initiatives d’intérêt collectif
- Statut public : **En préparation**
- Position : première carte de la section Écosystème
- Aucun lien actif sur aucune carte de l’écosystème
- Aucun programme ni partenaire présenté comme déjà opérationnel

Description publique officielle (texte validé) :

> « Pilier institutionnel et social chargé de structurer l’impact, les partenariats et les futures initiatives d’intérêt collectif d’OnJarama. »

Cette description est reproduite à l’identique dans `src/data/ecosystem.ts` (champ `description` de l’entrée `foundation`), à la seule différence typographique de l’apostrophe courbe (’), déjà la convention de tout le dépôt.

## 4. Historique pertinent

| Commit | Nature | Statut |
|---|---|---|
| `4734ef1acc4f8b08d92cc45fa05c36306f5e0a27` | Ancien OJW-LOT-09 | **Annulé**. N’est ni la baseline actuelle ni une preuve produit active. Toute mention doit être accompagnée de cette précision. |
| `fc10b4ff8b036d03cb8ace51614700e0fc5a03f0` | Restauration de la baseline institutionnelle approuvée (annule intégralement `4734ef1`) | Historique — dépassé par les commits suivants |
| `b81fdcc97c40a6979446f59bc0b472c42fa3701b` | Clarification intermédiaire de Foundation dans la carte écosystème | **Étape intermédiaire historique**. A introduit plusieurs écarts au positionnement validé (ordre, statut, sous-titre non prévu, lien actif, structure de carte divergente, halo doré prononcé) — écarts documentés et corrigés par le commit suivant. **N’est plus la référence produit.** |
| `0a05da5c938234171fffac598643ad46b45722c3` | Intégration canonique des décisions humaines validées, corrigeant les écarts de `b81fdcc` | **Baseline produit actuelle et canonique.** |

Note de réconciliation avec la documentation Foundation existante : `OJF-LOT-00G` (commit `f305e9b6`) cite encore `b81fdcc` comme « preuve canonique actuelle » côté OJW, cette évaluation ayant été faite avant la correction intégrée par `0a05da5`. Le présent document établit que **`0a05da5`, et non `b81fdcc`, est désormais la référence produit correcte** ; toute mise à jour future de la documentation Foundation référençant l’état d’OJW devrait pointer vers `0a05da5`.

## 5. Critères de revue produit

| # | Critère | Preuve | Résultat | Remarque |
|---|---|---|---|---|
| 1 | Foundation apparaît en première position dans l’écosystème | `ecosystem.ts` : entrée `foundation` en tête du tableau | Satisfait | — |
| 2 | Foundation présentée comme pilier institutionnel et social, non comme une application technique | `ecosystem.ts` : `kind: "institutional"` ; description axée gouvernance/partenariats/intérêt collectif | Satisfait | — |
| 3 | Description publique exactement conforme au texte validé | `ecosystem.ts`, champ `description` de `foundation` | Satisfait | Apostrophe courbe (’) au lieu de droite (') — convention typographique du dépôt, non un écart de contenu |
| 4 | Statut public exactement « En préparation » | `ecosystem.ts` : `status: "En préparation"` | Satisfait | — |
| 5 | Foundation non présentée comme déjà opérationnelle | Description au futur (« futures initiatives ») ; aucun programme/bénéficiaire cité | Satisfait | — |
| 6 | OnJarama Path affiche « En développement » | `ecosystem.ts` : `status: "En développement"` | Satisfait | — |
| 7 | OnJarama Academy affiche « En développement » | `ecosystem.ts` : `status: "En développement"` | Satisfait | — |
| 8 | OJCS Connect affiche « En développement » | `ecosystem.ts` : `status: "En développement"` | Satisfait | — |
| 9 | OnJarama Web affiche « Vous êtes ici » | `ecosystem.ts` : `status: "Vous êtes ici"` | Satisfait | — |
| 10 | Aucune carte ne contient de lien actif | `EcosystemSection.tsx` : aucun élément `<a>` dans le rendu des cartes | Satisfait | — |
| 11 | Aucun faux bouton, aucune flèche d’action, aucun gestionnaire de clic | `EcosystemSection.tsx` : aucun `role="button"`, `tabIndex`, `onClick` | Satisfait | — |
| 12 | Iconographie Foundation distincte et institutionnelle, mais provisoire | `EcosystemSection.tsx` : icône SVG (cercles superposés), `aria-hidden="true"` | Satisfait | Icône explicitement provisoire ; refonte possible dans un lot de design distinct |
| 13 | Carte Foundation conserve la même importance structurelle que les autres | `EcosystemSection.tsx` : structure JSX unifiée (icône optionnelle → statut → nom → description → action optionnelle) pour les 5 cartes | Satisfait | — |
| 14 | Traitement doré discret et non dominant | `cards.css` : `.ecosystem-card--institutional { border-color: var(--oj-gold-strong); }` uniquement, sans dégradé de fond ni pastille dorée séparée | Satisfait | — |
| 15 | Texte Vision exact présent | `VisionSection.tsx` : phrase intégrale | Satisfait | Apostrophe courbe, cf. remarque du critère 3 |
| 16 | Texte Roadmap exact présent | `roadmap.ts`, entrée `"Après"` | Satisfait | Apostrophe courbe, cf. remarque du critère 3 |
| 17 | Mission non recentrée spécifiquement sur Foundation | `MissionSection.tsx` : aucune mention de Foundation | Satisfait | — |
| 18 | Hero non recentré spécifiquement sur Foundation | `HeroSection.tsx` : titre et proposition de valeur inchangés ; Foundation apparaît uniquement comme l’un des 4 points égaux du visuel orbit-card, hérité du LOT-08 et non modifié par `0a05da5` | Satisfait | Point déjà traité honnêtement dans `OJF-LOT-00E`/`OJF-LOT-00G` (§5) : le risque de confusion est réduit par la clarification de la carte écosystème, sans modification du Hero lui-même — ce lot ne prétend pas résoudre ce point au-delà de ce qui est déjà constaté côté OJF |
| 19 | Aucun programme, partenaire, financement, bénéficiaire ou résultat opérationnel non validé annoncé | Lecture intégrale des 5 fichiers | Satisfait | — |
| 20 | Aucun statut juridique acquis affirmé sans décision correspondante | Description limitée à « pilier institutionnel et social... en préparation » | Satisfait | — |
| 21 | Aucun couplage technique avec le dépôt OnJarama-Foundation | Aucun import, URL ou référence de configuration vers `onjarama-foundation` | Satisfait | — |
| 22 | Aucun backend, authentification, base de données, variable ou secret partagé avec OJF | `package.json`/`package-lock.json` inchangés ; aucun fichier `.env*`/`.vercel` dans le diff | Satisfait | — |
| 23 | Aucun code provenant d’OJA, OJCS ou OJP introduit | Contrôle d’isolation exécuté lors d’`OJW-FOUNDATION-INTEGRATION-01` (grep ciblé, aucune occurrence) | Satisfait | Résultat cité, non ré-exécuté dans ce lot documentaire |
| 24 | Les autres cartes conservent leur positionnement produit validé | Path/Academy/OJCS Connect : descriptions inchangées depuis LOT-08, seul le statut a été mis à jour selon la décision validée | Satisfait | — |
| 25 | Le rendu reste responsive | `cards.css` : règle `@media (max-width: 620px)` préservée sans modification | Satisfait | Vérification statique du code uniquement ; aucun rendu visuel réel n’a été exécuté dans ce lot (limite déjà signalée dans `OJW-LOT-08-PRODUCTION-REVIEW`) |
| 26 | Structure accessible (icône décorative `aria-hidden`, titres cohérents, absence de faux contrôles, statut non transmis uniquement par la couleur) | `EcosystemSection.tsx` : `aria-hidden="true"` sur l’icône ; hiérarchie `h2` (section) → `h3` (carte) ; statut toujours accompagné de texte, badge de couleur uniforme quel que soit le statut | Satisfait | — |
| 27 | Le lint est valide | `npm run lint` | Voir §6 (validations locales) | — |
| 28 | Le build TypeScript/Vite est valide | `npm run build` | Voir §6 (validations locales) | — |
| 29 | La Production validée correspond au commit canonique `0a05da5` | Voir `docs/OJW-LOT-12-B-FOUNDATION-PRODUCTION-EVIDENCE.md` — preuve persistée et reproductible (2026-07-20) : déploiement Production actif `dpl_7Q8BYrwsyoKBkixjzUdaAusgbCEH` (`Ready`, alias `onjarama.ca`), correspondance SHA-256 octet pour octet entre le build local de `HEAD` et les bundles distants (HTML, CSS, JS), et absence de diff runtime entre `0a05da5` et `HEAD` (`git diff --exit-code` sur `src`, `public`, `index.html` et la configuration de build : code de sortie 0) | Satisfait | Le commit associé au déploiement actif est documentairement postérieur à `0a05da5` (commits `a2d4c02` et `db7cacf`, tous deux strictement documentaires) ; l'équivalence runtime est établie par preuve de contenu reproductible, pas par une simple affirmation de session — corrige le défaut de traçabilité relevé par `OJF-LOT-00H` et par `OJW-LOT-12-FOUNDATION-POSITIONING-RECONCILIATION-AUDIT.md` |

## 6. Décision côté produit

Sous réserve de la confirmation des résultats techniques consignés au rapport final de ce lot (`npm run lint`, `npm run build`, `git diff --check`) :

**ALIGNEMENT FOUNDATION APPROUVÉ CÔTÉ PRODUIT**

- Le portail au commit `0a05da5` est accepté comme représentation produit actuelle d’OnJarama Foundation.
- Les décisions humaines de positionnement (nom, nature institutionnelle et sociale, statut « En préparation », position, description, absence de lien actif, traitement visuel sobre) sont correctement intégrées.
- La représentation est honnête quant au statut « En préparation » : aucun engagement opérationnel, partenariat, financement ou résultat fictif n’est annoncé.
- Le point de vigilance produit relevé côté OJF (critère 2 d’`OJF-LOT-00E-PILOT-TO-ADOPTED-RULES`) est résolu par l’existence même de ce document.
- Cette revue satisfait l’exigence de preuve persistée dans le dépôt de l’application, telle que formulée dans `OJF-LOT-00G`.
- **L’adoption finale reste de la compétence du dépôt OnJarama-Foundation** et n’est ni prononcée ni présumée par ce document.

## 7. Portée et limites

- Aucune modification fonctionnelle n’a été effectuée dans ce lot.
- Aucune modification visuelle n’a été effectuée dans ce lot.
- Aucun changement de texte public n’a été effectué dans ce lot.
- Aucun déploiement n’a été effectué ni requis par ce lot.
- Aucune adoption finale n’est prononcée côté OnJarama-Foundation.
- Aucune restauration d’OJW-LOT-09 (`4734ef1`) n’a eu lieu ; ce commit reste annulé.
- Aucun fichier du dépôt OnJarama-Foundation n’a été modifié ; sa consultation s’est limitée à la lecture d’`OJF-LOT-00G`.
- Aucune refonte visuelle générale du portail n’a été entreprise.
- L’iconographie institutionnelle actuelle de Foundation (cercles superposés) est provisoire et pourra être revue ultérieurement dans un lot de design distinct.
