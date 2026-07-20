# OJW-LOT-12-B — Preuve Production persistée du positionnement Foundation

## 1. Objet

Ce document constitue la preuve Production durable, traçable et reproductible associée au positionnement Foundation validé côté produit (commit `0a05da5`). Il complète le critère 29 de `docs/OJW-LOT-11-FOUNDATION-PRODUCT-ALIGNMENT-REVIEW.md`, dont l'affirmation initiale citait une vérification effectuée en session conversationnelle sans artefact persisté — défaut de traçabilité relevé indépendamment par `docs/OJW-LOT-12-FOUNDATION-POSITIONING-RECONCILIATION-AUDIT.md` (§5, analyse du critère 2) et par `OJF-LOT-00H` (dépôt `onjarama-foundation`).

Ce document ne prononce aucune adoption finale côté OnJarama Foundation.

## 2. État Git examiné

- Dépôt : `onjarama-web` (`https://github.com/salomondiallo/OnJarama-Web.git`)
- Branche : `main`
- HEAD au moment de la revue : `db7cacff6298939793b27aeb8e618c71e4a6b3dc`
- origin/main : identique, synchronisation 0/0, arbre propre, staging vide (préflight confirmé)
- État produit canonique : `0a05da5c938234171fffac598643ad46b45722c3` (`feat(web): integrate approved Foundation positioning`)
- Commits documentaires postérieurs à `0a05da5` : `a2d4c02` (OJW-LOT-11), `db7cacf` (OJW-LOT-12-A)
- Absence de changement runtime depuis `0a05da5` : confirmée (§5)

## 3. Déploiement Production actif

| Champ | Valeur |
|---|---|
| Projet Vercel | `on-jarama-web` (scope `ascenza-s-projects`, orgId `team_kuaDcuPWut5uL3yZk3quB2Jc`) |
| deploymentId | `dpl_7Q8BYrwsyoKBkixjzUdaAusgbCEH` |
| URL permanente | `https://on-jarama-pwklmtnw7-ascenza-s-projects.vercel.app` |
| Date de création | 2026-07-19 22:50:58 -0400 |
| Statut | Ready |
| Environnement | Production (`target: production`) |
| Framework | Vite |
| Alias | `onjarama.ca`, `on-jarama-web.vercel.app`, `on-jarama-web-ascenza-s-projects.vercel.app`, `on-jarama-web-git-main-ascenza-s-projects.vercel.app` |
| Domaine canonique | `onjarama.ca` |

**Limite outillage constatée** : l'inspection `vercel inspect <url> --json` disponible dans cet environnement n'expose aucun champ de métadonnée Git (sha, branche, message de commit) pour ce déploiement — vérifié par inspection directe de la sortie JSON complète, aucun champ `meta`, `gitSource` ou équivalent n'y figure. Le déploiement ne peut donc pas être rattaché à un commit par métadonnée Vercel dans cet environnement. La correspondance avec `HEAD`/`db7cacf` est établie par deux moyens indépendants : (1) corrélation temporelle (déploiement créé 4 min 41 s après l'horodatage du commit `db7cacf`, 22:46:17) et (2) correspondance de contenu octet pour octet entre le build local de `HEAD` et les bundles réellement servis (§7) — preuve plus rigoureuse qu'une étiquette de métadonnée, car elle vérifie les octets effectivement livrés au public plutôt qu'une déclaration.

## 4. Chronologie

| Déploiement | Créé | Commit associé (par corrélation temporelle) | Nature | Rôle |
|---|---|---|---|---|
| `dpl_CQNkAbx5EybQGR53RxQWSVXnUMRz` | 2026-07-19 12:11:48 | `0a05da5` (commit 12:09:55, soit 1 min 53 s avant) | Modification runtime | A initialement publié le positionnement Foundation canonique |
| `dpl_C3noeA9WgfLNgLWZT2VEfGZoVRLN` | 2026-07-19 16:51:18 | `a2d4c02` (commit 16:42:52, soit 8 min 26 s avant) | Documentaire uniquement (OJW-LOT-11) | Sert le même runtime que le déploiement précédent |
| `dpl_7Q8BYrwsyoKBkixjzUdaAusgbCEH` | 2026-07-19 22:50:58 | `db7cacf` (commit 22:46:17, soit 4 min 41 s avant) | Documentaire uniquement (OJW-LOT-12-A) | **Déploiement actif actuel**, aliasé sur `onjarama.ca` ; sert le même runtime que les deux précédents |

Explication honnête : chaque commit documentaire (`a2d4c02`, `db7cacf`) a déclenché un nouveau déploiement Vercel automatique (le système ne distingue pas les commits « documentaire seul » des commits modifiant le runtime), mais comme aucun de ces commits ne modifie `src/`, `public/`, `index.html` ou la configuration de build, chacun de ces déploiements sert un runtime identique à celui publié par `dpl_CQNkAbx5EybQGR53RxQWSVXnUMRz`. Le déploiement actif porte donc un identifiant et une date postérieurs à `0a05da5`, sans que cela indique une quelconque divergence de runtime — confirmé par la preuve d'équivalence Git (§5) et la preuve de contenu (§7).

## 5. Preuve d'équivalence Git

Commande exécutée :

```
git diff --exit-code 0a05da5c938234171fffac598643ad46b45722c3..HEAD -- src public index.html vite.config.ts package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json eslint.config.js
```

Résultat : code de sortie **0** (aucune différence).

Différences complètes entre `0a05da5` et `HEAD` (`git diff --name-status 0a05da5..HEAD`) :

```
A  docs/OJW-LOT-11-FOUNDATION-PRODUCT-ALIGNMENT-REVIEW.md
A  docs/OJW-LOT-12-FOUNDATION-POSITIONING-RECONCILIATION-AUDIT.md
```

**Confirmation** : les seules différences entre l'état produit canonique et `HEAD` sont deux fichiers Markdown ajoutés sous `docs/`. Aucun fichier runtime (`src/`, `public/`, `index.html`, configuration de build) n'a changé.

## 6. Preuve de build local

Commandes exécutées : `npm run lint` (exit 0), `npm run build` (`tsc -b && vite build`, exit 0).

| Fichier | Taille | SHA-256 |
|---|---|---|
| `dist/assets/index-DEKWnpdR.js` | 199 031 octets | `86A0EA135D27E2946A19828C1C3AFFFCE1A063859F477DCA59EE982888D9ECC0` |
| `dist/assets/index-BWLpJILA.css` | 7 552 octets | `B2D020FC2D1C4F217AC4A4EDCB80F0E3C5F66137CDBCC343D72D91F0E46731D4` |
| `dist/index.html` | 580 octets | `C217B9417940FCE1E405F93A775CD83C21A24B1A9F1AF68A2D5E6D9512A479E1` |

Le build n'a modifié aucun fichier suivi par Git (`git status --short` vide après build).

## 7. Preuve HTTP et bundles Production

Requête `curl -sI https://onjarama.ca` : `HTTP/1.1 200 OK`, `Content-Type: text/html; charset=utf-8`, en-tête `Strict-Transport-Security` présent, `Server: Vercel`, aucun indicateur d'écran d'erreur. `curl -L` confirme une URL finale `https://onjarama.ca/` avec **0 redirection**.

Bundles extraits du HTML réellement servi : `/assets/index-DEKWnpdR.js` et `/assets/index-BWLpJILA.css` — noms strictement identiques à ceux produits par le build local (§6).

Téléchargés hors dépôt dans `C:\Users\tsdia\Downloads\OJW-Production-Evidence\20260720-000329\` :

| Fichier distant | Taille | SHA-256 |
|---|---|---|
| `index-DEKWnpdR.js` | 199 031 octets | `86A0EA135D27E2946A19828C1C3AFFFCE1A063859F477DCA59EE982888D9ECC0` |
| `index-BWLpJILA.css` | 7 552 octets | `B2D020FC2D1C4F217AC4A4EDCB80F0E3C5F66137CDBCC343D72D91F0E46731D4` |
| `index.html` | 580 octets | `C217B9417940FCE1E405F93A775CD83C21A24B1A9F1AF68A2D5E6D9512A479E1` |

**Résultat de comparaison locale/Production : égalité octet pour octet** (catégorie 1 sur les quatre catégories possibles) — les trois hashes SHA-256 distants sont strictement identiques aux trois hashes locaux du §6, tailles incluses. Aucune différence de nom de fichier, aucune différence de métadonnée, aucune différence de runtime.

## 8. Vérification du contenu Foundation

| Élément attendu | Preuve | Résultat |
|---|---|---|
| « OnJarama Foundation » | Présent dans `index-DEKWnpdR.js` distant | Confirmé |
| « En préparation » | Présent | Confirmé |
| « Pilier institutionnel et social chargé de structurer l'impact, les partenariats et les futures initiatives d'intérêt collectif d'OnJarama. » | Présent (texte intégral) | Confirmé |
| « OnJarama Path » | Présent | Confirmé |
| « En développement » | Présent | Confirmé |
| « OnJarama Academy » | Présent | Confirmé |
| « OJCS Connect » | Présent | Confirmé |
| « OnJarama Web » | Présent | Confirmé |
| « Vous êtes ici » | Présent | Confirmé |
| « À terme, OnJarama Foundation portera la dimension institutionnelle et sociale de l'écosystème, en structurant son impact et ses partenariats. » | Présent (texte intégral) | Confirmé |
| « Structuration progressive d'OnJarama Foundation, de sa gouvernance et de ses futurs partenariats institutionnels. » | Présent (texte intégral) | Confirmé |
| « Cadre institutionnel en développement » (texte remplacé) | Absent | Confirmé absent |
| « Découvrir sa mission » (texte remplacé) | Absent | Confirmé absent |
| « Portail actuel » (texte remplacé) | Absent | Confirmé absent |
| « Disponible » (texte remplacé) | Absent | Confirmé absent |
| « En construction avancée » (texte remplacé) | Absent | Confirmé absent |
| « LOT-09 » | Absent | Confirmé absent |

## 9. Reproductibilité

```
# Inspection Git
git fetch origin
git rev-parse HEAD
git rev-parse origin/main
git diff --exit-code 0a05da5c938234171fffac598643ad46b45722c3..HEAD -- src public index.html vite.config.ts package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json eslint.config.js

# Build local
npm run lint
npm run build
Get-FileHash -Algorithm SHA256 dist\assets\<nom-du-bundle-js>
Get-FileHash -Algorithm SHA256 dist\assets\<nom-du-bundle-css>
Get-FileHash -Algorithm SHA256 dist\index.html

# Inspection Vercel (lecture seule)
vercel inspect https://onjarama.ca --json

# Contrôles HTTP et extraction des bundles
curl -sI https://onjarama.ca
curl -s https://onjarama.ca/ -o index.html
curl -s https://onjarama.ca/assets/<nom-du-bundle-js> -o bundle.js
curl -s https://onjarama.ca/assets/<nom-du-bundle-css> -o bundle.css
Get-FileHash -Algorithm SHA256 bundle.js
Get-FileHash -Algorithm SHA256 bundle.css
```

Aucun token, secret ou valeur sensible n'est requis pour reproduire ces contrôles ; toutes les commandes sont en lecture seule vis-à-vis du dépôt et de Vercel.

## 10. Portée et limites

- Cette preuve est ponctuelle, établie le 2026-07-20, à l'instant de son exécution. Elle ne constitue pas une surveillance continue de la Production.
- Aucune validation visuelle par navigateur réel n'a été effectuée dans ce lot ; la preuve porte sur le contenu des bundles et la structure HTML servie, pas sur le rendu visuel (limite déjà signalée dans `OJW-LOT-08-PRODUCTION-REVIEW`).
- Aucun déploiement, promotion, restauration, changement de domaine, de DNS ou de variable n'a été effectué par ce lot (§ suivante).
- Aucune modification n'a été apportée au dépôt `onjarama-foundation`.
- Toute évolution future du runtime OJW (nouveau commit modifiant `src/`, `public/`, ou la configuration de build) invalidera cette preuve, qui devra être reproduite.

## 11. Décision

**PREUVE PRODUCTION FOUNDATION ÉTABLIE ET PERSISTÉE**

- La Production active (`dpl_7Q8BYrwsyoKBkixjzUdaAusgbCEH`, alias `onjarama.ca`) sert un runtime équivalent à `0a05da5`.
- Le commit associé au déploiement actif est documentairement postérieur (`db7cacf`), mais cette postériorité est strictement documentaire : aucune métadonnée Vercel n'a pu confirmer directement le lien commit-déploiement dans cet environnement, mais l'équivalence de contenu (§7) et l'absence de diff runtime (§5) l'établissent avec un niveau de preuve au moins équivalent.
- L'équivalence est démontrée par l'absence de diff runtime entre `0a05da5` et `HEAD`, et par la correspondance SHA-256 octet pour octet des trois fichiers servis (HTML, CSS, JS) entre le build local et la Production distante.
- Le critère 29 de `OJW-LOT-11-FOUNDATION-PRODUCT-ALIGNMENT-REVIEW.md` dispose désormais d'une preuve persistée, versionnée et reproductible dans le présent document.
- **Cette décision ne constitue pas une adoption finale côté OnJarama Foundation.** Elle établit uniquement la fiabilité de la preuve technique citée au critère 29 ; les blocages de gouvernance identifiés par `OJF-LOT-00H` (positionnement doctrinal, critère 7) restent entiers et sont traités par la voie B retenue (`OJW-LOT-12-FOUNDATION-POSITIONING-RECONCILIATION-AUDIT.md` §13).
