# OJW-LOT-12-A — Audit croisé de réconciliation du positionnement Foundation

## 1. Objet

Ce document audite la décision `OJF-LOT-00H` (dépôt `onjarama-foundation`, commit `1d8ca856eb55a1613d92376dd11b581c6bf475fb`), qui a bloqué l'adoption finale d'OnJarama Web malgré l'existence de la revue produit persistée `OJW-LOT-11` (commit `a2d4c02`, 29/29 critères déclarés satisfaits côté OJW).

Ce lot ne conteste pas automatiquement la décision Foundation. Il vérifie, par lecture directe et indépendante des deux dépôts, si les motifs invoqués par `OJF-LOT-00H` sont fondés, précis et traçables, puis distingue les corrections purement documentaires des éventuelles corrections produit, sans en appliquer aucune.

Ce lot ne déclare pas l'adoption OJF acquise. Il ne modifie ni le runtime OJW ni aucun fichier `onjarama-foundation`.

## 2. États Git OJW et OJF examinés

**OJW (`onjarama-web`)**
- Racine : `C:\Users\tsdia\OnJarama Main\onjarama-web`
- Remote : `https://github.com/salomondiallo/OnJarama-Web.git`
- Branche : `main`
- HEAD = origin/main : `a2d4c02d91fbd160a40e26bae57a18308c2d922a`
- Synchronisation : 0/0, arbre propre, staging vide (vérifié en préflight)

**OJF (`onjarama-foundation`, lecture seule)**
- Racine : `C:\Users\tsdia\OnJarama Main\onjarama-foundation`
- Branche : `main`
- HEAD : `1d8ca856eb55a1613d92376dd11b581c6bf475fb` (confirmé — correspond exactement à `OJF-LOT-00H`)
- Statut du dépôt : propre (`git status --short --branch` vide hors indicateur de branche), non modifié par ce lot

## 3. Historique pertinent

| Commit | Dépôt | Nature | Statut retenu par ce lot |
|---|---|---|---|
| `4734ef1` | OJW | Ancien OJW-LOT-09 | Annulé, non actif (confirmé des deux côtés) |
| `fc10b4f` | OJW | Annulation de `4734ef1`, restauration baseline | Historique |
| `b81fdcc` | OJW | OJW-LOT-10 — différenciation institutionnelle (sous-titre, badge distinct, ancre fonctionnelle, note explicative) | **Dernière représentation ayant fait l'objet d'une validation croisée Foundation complète** selon `OJF-LOT-00H` §8 — divergence assumée avec l'évaluation faite dans `OJW-LOT-11`, qui la qualifiait d'« étape intermédiaire non conforme » |
| `0a05da5` | OJW | Intégration du positionnement « pilier institutionnel et social » (gouvernance, partenariats, initiatives d'intérêt collectif), retrait des éléments de `b81fdcc` | **État produit courant, non approuvé par Foundation** (`OJF-LOT-00H` §2, §5) |
| `a2d4c02` | OJW | OJW-LOT-11 — revue produit persistée (29/29) | Existence confirmée ; **contenu jugé non conforme et insuffisamment fiable** (`OJF-LOT-00H` §4, §6) |
| `f305e9b6` | OJF | OJF-LOT-00G — réconciliation, référençait encore `b81fdcc` comme preuve canonique OJW | Dépassé côté produit par `0a05da5`, mais dont le contenu (`b81fdcc`) reste la dernière base validée par Foundation |
| `1d8ca856` | OJF | OJF-LOT-00H — décision finale : adoption non prononcée | Référence contraignante actuelle côté Foundation |

## 4. Décision OJF-LOT-00H

Résumé fidèle, vérifié par lecture intégrale de `docs/12-audit/OJF-LOT-00H-OJW-FINAL-ADOPTION-DECISION.md` :

- **Décision** : ne pas adopter ; statut « pilote documentaire » maintenu.
- **Bilan des dix critères cumulatifs** (`OJF-LOT-00E-PILOT-TO-ADOPTED-RULES.md` §3) : 8/10 satisfaits ; critères 2 et 7 non satisfaits.
- **Trois blocages, par ordre de priorité** :
  1. Positionnement institutionnel non autorisé (§5, Point A) : Foundation présentée dans OJW avec un mandat de gouvernance, partenariats, initiatives d'intérêt collectif — répété dans trois fichiers.
  2. Retrait non arbitré des garde-fous de LOT-10 (§5, Point B) : sous-titre, badge distinct, ancre fonctionnelle, note explicative — retirés sans consultation Foundation.
  3. Affirmation de déploiement production non vérifiable (§6, critère 29 du document `OJW-LOT-11`) : renvoie à une mission « OJW-FOUNDATION-INTEGRATION-01 » introuvable dans les deux dépôts.
- Les vérifications techniques indépendantes (absence de secret, de dépendance forcée, de couplage, lint, build) sont **confirmées et non contestées** par `OJF-LOT-00H` — le blocage porte exclusivement sur la gouvernance du contenu et la fiabilité de la preuve, pas sur la qualité technique du code.

## 5. Analyse exacte du critère 2

**Définition officielle** (`OJF-LOT-00E-PILOT-TO-ADOPTED-RULES.md`, §3, point 2) : *« Revue côté produit : l'application a réalisé sa propre revue d'alignement, documentée dans son propre dépôt. »*

Cette définition littérale porte sur l'**existence** d'une revue documentée. Elle ne précise pas explicitement, dans ce document, un critère de conformité de contenu — `OJF-LOT-00H` en fait une lecture plus substantielle (§4) : l'existence matérielle ne suffit pas si le contenu de la revue est lui-même non fiable ou en contradiction avec la doctrine. Cette interprétation extensive est cohérente avec l'esprit du §4 des mêmes règles (« un point de vigilance jugé structurant... justifie de maintenir le statut ») et avec le principe de non-automaticité (§5), mais constitue une lecture au-delà du texte strict du critère 2 — à noter pour la traçabilité de l'interprétation, sans la contester.

**Preuve attendue** : un document de revue produit existant et fiable dans `onjarama-web`.

**Preuve fournie par OJW-LOT-11** : `docs/OJW-LOT-11-FOUNDATION-PRODUCT-ALIGNMENT-REVIEW.md` (commit `a2d4c02`, 109 lignes, 29 critères déclarés satisfaits).

**Raison exacte de la non-conformité — vérifiée indépendamment par ce lot, pas seulement recopiée depuis OJF-LOT-00H :**

1. **Positionnement doctrinal non autorisé.** Lecture directe de `docs/lot-00a/01-DOCTRINE-CONSTITUTIVE.md` (dépôt OJF) :
   - §3 (Mission) : *« La mission de la fondation est d'améliorer la cohérence, la qualité, l'accessibilité, la sécurité et la maintenabilité de l'écosystème OnJarama. Elle peut fournir des règles communes et des ressources réutilisables, mais elle ne doit pas administrer les applications consommatrices. »* — aucune mention de gouvernance, de partenariats ou d'initiatives d'intérêt collectif.
   - §13 (Périmètre initial) : *« Pendant le LOT 00A, Foundation reste exclusivement documentaire. »*
   - §14 (Gouvernance des changements) : toute modification de la doctrine doit être explicitement proposée, motivée et validée avant intégration.
   - `docs/lot-00b/OJF-LOT-00B-ECOSYSTEM-MAP.md` §2 : *« Foundation est un socle commun passif. »*
   - Le texte actuellement publié dans OJW (`src/data/ecosystem.ts`, `src/data/roadmap.ts`, `src/sections/VisionSection.tsx` au commit `0a05da5`) décrit Foundation comme un « pilier institutionnel et social chargé de structurer l'impact, les partenariats et les futures initiatives d'intérêt collectif », avec une fonction de « gouvernance de l'impact » — **confirmé en contradiction avec le texte doctrinal ci-dessus**, aucune trace d'une validation LOT 00A §14 pour cet élargissement n'a été trouvée dans `onjarama-foundation`.
   - Fait notable pour la réconciliation : l'ancienne note retirée par `0a05da5` (« Foundation n'est pas une application : c'est un socle commun passif et versionné... ») était, elle, textuellement alignée avec la doctrine LOT 00A/00B. Son retrait a donc supprimé un élément conforme, au profit d'un texte qui ne l'est pas.
2. **Retrait unilatéral des garde-fous de LOT-10.** Confirmé par diff direct (`git show b81fdcc` vs état `0a05da5`, déjà documenté dans `OJW-LOT-11` §4 lui-même) : sous-titre, badge distinct, ancre fonctionnelle et note explicative ont disparu sans qu'aucune trace de consultation Foundation n'existe dans l'historique `onjarama-web` ni `onjarama-foundation` entre `b81fdcc` (10:04) et `0a05da5` (12:09) le 2026-07-19.
3. **Critère 29 du document OJW-LOT-11 — affirmation invérifiable.** Vérifié par recherche directe : la chaîne « OJW-FOUNDATION-INTEGRATION-01 » n'apparaît dans aucun commit, aucun fichier suivi et aucun document persisté d'`onjarama-web` ni d'`onjarama-foundation`, hormis sa citation dans `OJW-LOT-11` lui-même et sa mention critique dans `OJF-LOT-00H`. **Constat propre à ce lot, non présent tel quel dans OJF-LOT-00H** : cette vérification production a réellement été exécutée (comparaison octet pour octet du bundle Vercel avec le build local de `0a05da5`, déploiement `dpl_CQNkAbx5EybQGR53RxQWSVXnUMRz` constaté `Ready`) — mais uniquement au cours d'une session d'agent conversationnelle, sans qu'aucun artefact (fichier, commit, log) n'ait été persisté dans l'un ou l'autre dépôt. Le fait rapporté est probablement exact, mais **structurellement invérifiable** par toute personne ou tout lot n'ayant pas eu accès à cette conversation. Il s'agit d'un défaut de traçabilité, pas d'une fausse affirmation délibérée ni d'un défaut technique du portail.

**Distinctions demandées par la mission :**
- Preuve persistée : oui, le document `a2d4c02` existe et est persisté.
- Preuve indépendante : non pour les points A et B (auto-évaluation produit, non recoupée par Foundation avant publication) ; non plus pour le critère 29 (aucune preuve indépendante persistée).
- Preuve postérieure au runtime : oui, `a2d4c02` documente `0a05da5`, mais **documente un runtime qui contredit lui-même la doctrine** — la revue est donc cohérente avec le code, mais le code n'est pas conforme à la doctrine Foundation.
- Approbation du contenu : non obtenue côté Foundation avant publication.
- Approbation de l'état réellement déployé : partiellement vérifiable techniquement (bundle identique confirmé par ce lot par recoupement des hash constatés dans les échanges précédents), mais non traçable de façon persistée, donc non opposable comme preuve formelle.
- Traçabilité de la décision humaine : absente pour le changement de positionnement (aucun commit, dans aucun des deux dépôts, ne documente une décision Foundation autorisant l'élargissement de mandat).
- Référence canonique correcte : **contestée** — `OJW-LOT-11` traite `0a05da5` comme seule référence correcte et `b81fdcc` comme « dépassé, non conforme » ; `OJF-LOT-00H` retient l'inverse (`b81fdcc` = dernière base validée). Ce lot ne tranche pas ce point ; il le signale comme le nœud central de la réconciliation (voir §7).

**Correction nécessaire** : soit (a) aligner le contenu produit sur la doctrine actuelle (retrait ou reformulation des mentions de gouvernance/partenariats/impact, réintroduction possible d'une différenciation proche de LOT-10), soit (b) faire valider formellement un mandat élargi via un lot de gouvernance LOT 00A §14 côté Foundation avant qu'il ne soit reflété dans OJW ; et, indépendamment, rendre vérifiable ou retirer l'affirmation du critère 29.

**Dépôt(s) concerné(s)** : correction de contenu → `onjarama-web` (`src/data/ecosystem.ts`, `src/data/roadmap.ts`, `src/sections/VisionSection.tsx`) si voie (a) ; `onjarama-foundation` (nouveau lot de doctrine) si voie (b). Correction du critère 29 → `onjarama-web` (document uniquement, pas de runtime).

## 6. Analyse exacte du critère 7

**Définition officielle** (`OJF-LOT-00E-PILOT-TO-ADOPTED-RULES.md`, §3, point 7) : *« Validation manuelle : une décision humaine explicite confirme le passage au statut "adopté" ; ce passage n'est jamais automatique. »* Renforcé par §5 (Non-automaticité) : *« Chaque transition de statut nécessite une décision explicite, tracée par un commit Git identifiable. »*

**Forme attendue** : un commit Git, dans `onjarama-foundation`, portant une décision humaine explicite et distincte confirmant le passage à « adopté ».

**Validation actuellement présente** : aucune. Tous les commits examinés (`OJF-LOT-00D` à `OJF-LOT-00H`) sont des lots d'évaluation ou de réconciliation ; aucun ne constitue, ni ne prétend constituer, l'acte de validation manuelle final prévu par le critère 7.

**Raison de l'insuffisance** : le critère 7 est structurellement distinct des neuf autres — il ne peut pas être « satisfait » par une revue, aussi complète soit-elle, mais uniquement par un acte de décision humaine dédié. Tant que le critère 2 n'est pas résolu, ce lot considère qu'il serait prématuré de solliciter cet acte : le §4 des règles précise qu'un point de vigilance structurant (ici, positions A et B) justifie de maintenir le statut antérieur jusqu'à clarification.

**Rôle autorisé à valider** : non nommé explicitement dans la documentation consultée ; par déduction du contexte (auteur de tous les commits Foundation et OJW consultés : Salomon Diallo), il s'agit du fondateur. Ce lot ne suppose ni n'invente cette validation.

**Formulation manquante** : un commit distinct dans `onjarama-foundation`, postérieur à la résolution du critère 2, énonçant explicitement la décision d'adoption (ou son refus, ou son report).

**Question fermée à soumettre au fondateur** (critère 7, à poser seulement après résolution du critère 2) :

> « Une fois le positionnement Foundation dans OJW rendu conforme à la doctrine (ou la doctrine explicitement élargie), confirmez-vous vouloir procéder vous-même à la décision d'adoption formelle dans `onjarama-foundation`, par un commit dédié et distinct de toute revue automatisée ? »

## 7. Comparaison avec OJW-LOT-11

| Point | Position d'OJW-LOT-11 | Position d'OJF-LOT-00H | Vérification indépendante de ce lot |
|---|---|---|---|
| Référence canonique | `0a05da5` seul valide ; `b81fdcc` « étape intermédiaire non conforme » | `b81fdcc` = dernière base validée par Foundation ; `0a05da5` = état produit non approuvé | Fait chronologique non contesté : `0a05da5` corrige des écarts *par rapport aux décisions transmises côté produit* (mission `OJW-FOUNDATION-INTEGRATION-01`), mais ces décisions elles-mêmes n'ont jamais été confrontées à la doctrine `onjarama-foundation` avant leur mise en œuvre — c'est la racine du désaccord |
| Description Foundation | Conforme au texte transmis comme « décision humaine validée » lors de la mission produit | Non autorisée par LOT 00A §3/§13 | Confirmé : aucune trace, dans `onjarama-foundation`, d'une validation de ce mandat élargi antérieure à `0a05da5` |
| Retrait des garde-fous LOT-10 | Présenté comme correction d'un « écart » | Présenté comme retrait unilatéral d'un acquis validé | Les deux faits matériels (contenu de LOT-10 retiré) sont identiques ; seule la qualification diverge — question de gouvernance, pas de fait |
| Critère 29 (Production) | Affirmé comme « Satisfait », preuve citée mais non jointe | Jugé disqualifiant en l'état | Confirmé par ce lot : le fait est probablement vrai mais n'est pas traçable indépendamment de la conversation qui l'a produit |
| Résultat global | 29/29, « ALIGNEMENT FOUNDATION APPROUVÉ CÔTÉ PRODUIT » | 8/10 critères Foundation, adoption non prononcée | Les deux évaluations mesurent des référentiels différents (29 critères produit ad hoc vs 10 critères cumulatifs Foundation) ; elles ne sont pas directement comparables terme à terme, ce qui explique en partie l'écart de conclusion |

## 8. Comparaison avec le runtime 0a05da5

Vérifié par relecture directe des fichiers actuels (identiques à l'état `0a05da5`, aucune modification depuis) :

- `src/data/ecosystem.ts` : entrée `foundation`, `description` = « Pilier institutionnel et social chargé de structurer l'impact, les partenariats et les futures initiatives d'intérêt collectif d'OnJarama. » — confirme le Point A.
- `src/data/roadmap.ts` : entrée « Après » = « Structuration progressive d'OnJarama Foundation, de sa gouvernance et de ses futurs partenariats institutionnels. » — confirme la répétition du mandat en dehors de la seule carte écosystème.
- `src/sections/VisionSection.tsx` : phrase ajoutée « ... en structurant son impact et ses partenariats. » — troisième occurrence, confirme « répétée dans trois sections » (`OJF-LOT-00H` §5, Point A).
- `src/sections/EcosystemSection.tsx` : structure unifiée sans sous-titre, sans badge distinct, sans ancre — confirme le Point B (retrait des garde-fous LOT-10).
- `src/sections/MissionSection.tsx`, `src/sections/HeroSection.tsx` : aucune mention de Foundation ajoutée — confirme qu'aucun nouveau point de blocage n'existe à ce niveau (cohérent avec `OJF-LOT-00H` §5, qui ne mentionne aucun grief sur ces deux fichiers).
- `src/styles/cards.css` : traitement doré atténué (bordure seule, sans dégradé) — non contesté par `OJF-LOT-00H`, qui ne porte que sur le texte et la structure, pas sur le style visuel.

**Aucune modification runtime n'a été apportée par ce lot.** Les constats ci-dessus sont des lectures, pas des changements.

## 9. Matrice de réconciliation

| Exigence OJF | État OJW actuel | Preuve existante | Écart constaté | Gravité | Correction minimale | Fichier/dépôt concerné | Validation humaine requise | Porte proposée |
|---|---|---|---|---|---|---|---|---|
| Positionnement Foundation conforme à LOT 00A §3 | Mandat élargi (gouvernance, partenariats, impact) publié dans 3 fichiers | `ecosystem.ts`, `roadmap.ts`, `VisionSection.tsx` (commit `0a05da5`) | Contenu non autorisé par la doctrine actuelle | Élevée (bloque critère 2) | Reformuler ou retirer les mentions de gouvernance/partenariats/impact, ou obtenir validation doctrinale explicite | `onjarama-web` (3 fichiers) ou `onjarama-foundation` (nouveau lot doctrine) selon la voie choisie | **Oui — décision du fondateur sur la voie (a) ou (b)** | OJW-LOT-12-B (si voie a) ou lot de gouvernance OJF dédié (si voie b) |
| Garde-fous LOT-10 non retirés sans arbitrage | Sous-titre, badge, ancre, note absents depuis `0a05da5` | `EcosystemSection.tsx` (commit `0a05da5`) | Retrait unilatéral, non consulté | Élevée (bloque critère 2, lié au point précédent) | Réintroduire ces éléments si voie (a) retenue, ou faire ratifier leur retrait si voie (b) | `onjarama-web` (`EcosystemSection.tsx`, `cards.css`) | Oui — dépend de la même décision | OJW-LOT-12-B |
| Preuve production vérifiable et traçable | Affirmation non sourcée dans `OJW-LOT-11` (critère 29) | Vérification réelle effectuée en session, non persistée | Défaut de traçabilité, pas d'inexactitude de fait | Modérée | Retirer/atténuer l'affirmation, ou la re-documenter avec preuve reproductible (ex. capture de hash de bundle, identifiant de déploiement, horodatage, dans un fichier versionné) | `onjarama-web` (document uniquement) | Non — correction rédactionnelle | OJW-LOT-12-B |
| Décision manuelle d'adoption (critère 7) | Absente | — | Aucun commit de décision explicite | Structurelle (ne peut être résolue que par le fondateur) | Aucune action d'agent possible | `onjarama-foundation` | **Oui — acte réservé au fondateur** | Hors périmètre agent, postérieur à la résolution des points ci-dessus |
| Référence canonique OJW divergente entre les deux dépôts (`0a05da5` vs `b81fdcc`) | Chaque dépôt affirme une référence différente comme « base validée » | `OJW-LOT-11` §4 vs `OJF-LOT-00H` §8 | Contradiction documentaire directe, non résolue | Modérée (source de confusion future) | Une fois la voie (a)/(b) tranchée, mettre à jour `OJW-LOT-11` ou un lot successeur pour aligner la référence canonique des deux côtés | `onjarama-web` et `onjarama-foundation` | Oui — découle de la même décision | OJW-LOT-12-B (côté OJW) |

## 10. Décisions humaines encore requises

1. **Question fermée — positionnement Foundation** (prioritaire, conditionne tout le reste) :
   > « Le mandat de Foundation actuellement publié dans OJW (gouvernance de l'impact, partenariats, initiatives d'intérêt collectif) doit-il être (a) retiré/reformulé dans OJW pour redevenir conforme à la doctrine LOT 00A actuelle — ce qui impliquerait de réintroduire une différenciation proche de celle de LOT-10 (sous-titre, badge, ancre, note) — ou (b) validé formellement comme extension de la doctrine Foundation via un lot de gouvernance dédié (LOT 00A §14) dans `onjarama-foundation`, avant d'être reflété dans OJW ? »
2. **Question fermée — preuve de production (critère 29)** :
   > « L'affirmation de correspondance Production/`0a05da5` dans `OJW-LOT-11` doit-elle être (a) retirée/atténuée du document tant qu'aucune preuve persistée n'existe, ou (b) re-vérifiée et documentée de façon traçable (nouveau commit avec preuve reproductible) dans `onjarama-web` ? »
3. **Acte réservé (critère 7)**, à accomplir uniquement après résolution des points 1 et 2 : décision d'adoption explicite, par commit dédié, dans `onjarama-foundation`.

Aucune de ces trois décisions n'est prise par ce lot.

## 11. Plan minimal proposé pour OJW-LOT-12-B (non exécuté)

Sous réserve de la décision humaine au point 1 :

- **Si voie (a) retenue** : dans `onjarama-web`, modifier uniquement `src/data/ecosystem.ts`, `src/data/roadmap.ts`, `src/sections/VisionSection.tsx` et `src/sections/EcosystemSection.tsx`/`src/styles/cards.css` pour retirer les formulations de gouvernance/partenariats/impact et réintroduire une différenciation Foundation proche de celle de `b81fdcc`, puis mettre à jour `OJW-LOT-11` (ou créer un document successeur) pour refléter la référence canonique corrigée.
- **Si voie (b) retenue** : aucune action côté `onjarama-web` dans l'immédiat ; le travail se déroule d'abord dans `onjarama-foundation` (lot de gouvernance LOT 00A §14), et OJW-LOT-12-B serait alors redéfini pour se limiter à une mise à jour documentaire une fois la doctrine élargie formellement validée.
- **Dans tous les cas** : corriger ou retirer l'affirmation invérifiable du critère 29 dans `OJW-LOT-11`, en la remplaçant soit par un retrait explicite, soit par une preuve reproductible et versionnée.
- **Portée strictement exclue de LOT-12-B** : la décision d'adoption elle-même (critère 7), qui reste un acte humain distinct côté `onjarama-foundation`.

Ce plan n'est qu'une proposition ; son exécution nécessite une porte OJW-LOT-12-B distincte, ouverte après la décision humaine sur la voie (a) ou (b).

## 12. Portée et limites

- Aucune modification runtime, CSS ou de contenu public n'a été effectuée par ce lot.
- Aucun fichier `onjarama-foundation` n'a été modifié ; toute lecture y a été strictement en lecture seule.
- Aucun commit, push, déploiement, tag ou release n'a été créé.
- `OJW-LOT-11` n'a pas été modifié silencieusement ; ses écarts sont documentés ici, dans un fichier distinct.
- Aucune adoption finale n'est prononcée ou présumée par ce document.
- `4734ef1` et OJW-LOT-09 ne sont pas réactivés.
- OJW-LOT-13 n'est pas ouvert ; seul un plan pour une porte OJW-LOT-12-B distincte est proposé, non exécuté.
- Ce lot ne tranche pas la question de fond (voie a vs voie b) : elle appartient explicitement au fondateur.

## 13. Arbitrages humains du fondateur

Les décisions suivantes ont été rendues par le fondateur, postérieurement à la publication de ce document, et sont consignées ici fidèlement sans modification du contenu d'analyse qui précède :

1. **Voie B retenue.** Le positionnement institutionnel et social intégré dans OJW (`0a05da5`) doit être reconnu par une évolution doctrinale préalable dans OnJarama-Foundation, et non corrigé côté produit. La question fermée du §10, point 1, est tranchée en faveur de l'option (b) : validation formelle d'un mandat élargi via un lot de gouvernance dédié (LOT 00A §14) dans `onjarama-foundation`, avant toute nouvelle réévaluation d'adoption.
2. **Aucun retour arrière du runtime OJW `0a05da5` n'est demandé.** Le plan §11 « Si voie (a) retenue » (reformulation ou retrait des mentions de gouvernance/partenariats/impact, réintroduction d'une différenciation proche de `b81fdcc`) est explicitement écarté. Le contenu actuel de `src/data/ecosystem.ts`, `src/data/roadmap.ts`, `src/sections/VisionSection.tsx` et `src/sections/EcosystemSection.tsx` reste inchangé.
3. **Le critère 29 est conservé**, mais sa preuve de correspondance Production doit être persistée dans une porte documentaire ultérieure — et non retirée ou atténuée comme l'envisageait l'option (a) de la question fermée du §10, point 2. La re-vérification traçable (identifiant de déploiement, comparaison de hash de bundle, horodatage) reste à produire dans un document versionné distinct.
4. **L'adoption finale côté OJF reste différée** jusqu'à satisfaction des critères 2 et 7 des dix critères cumulatifs (`OJF-LOT-00E-PILOT-TO-ADOPTED-RULES.md` §3). Aucune adoption n'est prononcée par cet arbitrage.

**Conséquence directe sur le plan du §11** : la branche « Si voie (a) retenue » est abandonnée. Le plan applicable devient la branche « Si voie (b) retenue » : aucune action immédiate côté `onjarama-web` sur le positionnement Foundation ; le travail se poursuit d'abord dans `onjarama-foundation` par un lot de gouvernance dédié (LOT 00A §14). Une porte documentaire distincte, à ouvrir ultérieurement, portera sur la persistance de la preuve du critère 29.

Ces arbitrages ne constituent pas la décision d'adoption du critère 7 : celle-ci reste un acte distinct, réservé au fondateur, à accomplir dans `onjarama-foundation` une fois le travail doctrinal de la voie B abouti.
