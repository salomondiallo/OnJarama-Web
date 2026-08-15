# OJW-PUBLIC-PAGES-05-A5-A — Contrat de preuve publique

## Objet

Ce document gouverne les preuves, captures, illustrations et représentations visuelles publiées sur `/oja`, `/ojp`, `/ojcs` et `/ojw`.

Principe fondateur : OnJarama peut présenter une ambition forte, mais ne doit jamais créer une fausse impression de maturité. Toute représentation doit permettre de distinguer clairement ce qui existe, ce qui est en cours, ce qui est conceptuel et ce qui relève du futur.

Ce contrat ne rend disponible aucun produit, n'autorise aucun asset et ne remplace pas une validation fondatrice explicite.

## Classes canoniques

### AUTHENTIC_PRODUCT_CAPTURE

Capture produite depuis un runtime ou produit OnJarama réel, identifié et qualifié. L'état montré doit exister au moment de la capture. Une capture authentique constitue une preuve seulement dans les limites de son contexte, de sa version et de sa date.

### CONCEPTUAL_ILLUSTRATION

Illustration qui explique une vision, un parcours, une relation, une architecture conceptuelle, un contexte ou un usage futur. Elle ne constitue jamais une capture produit ni une preuve de disponibilité. La mention « Illustration conceptuelle » est obligatoire dès qu'un visiteur pourrait raisonnablement la confondre avec une interface ou un résultat réel.

### INSTITUTIONAL_DIAGRAM

Schéma déterministe montrant des étapes, rôles, relations, architectures, progressions ou statuts. Il ne doit inventer ni utilisateur, ni donnée, ni partenaire, ni résultat. Une légende textuelle complète les schémas complexes.

### DECORATIVE_VISUAL

Élément esthétique secondaire. Il ne prouve jamais une fonctionnalité, une disponibilité, un résultat ou une relation institutionnelle.

## Fiche minimale d'une preuve authentique

Une preuve authentique doit rester reliée à une source vérifiable. Sa fiche minimale contient :

- entité concernée ;
- classe et type de preuve ;
- source vérifiable ;
- date de capture ou version ;
- page, écran et contexte ;
- viewport lorsque pertinent ;
- baseline Git ou version publique lorsque pertinente ;
- statut de qualification ;
- limitations ou éléments non démontrés ;
- autorisation fondatrice d'usage public.

La fiche peut être conservée dans les métadonnées du livrable ou dans un manifeste voisin. Aucun système de gestion plus complexe n'est requis.

## Admission d'une capture produit

Une capture produit est admissible uniquement si toutes les conditions suivantes sont satisfaites :

1. elle vient réellement du projet concerné ;
2. l'écran et l'état affichés existent ;
3. le contenu n'a pas été fabriqué pour exagérer la maturité ;
4. les données personnelles ou sensibles sont absentes, anonymisées ou neutralisées ;
5. aucune fonction future n'est présentée comme disponible ;
6. la validation fonctionnelle et visuelle de l'état montré est documentée ;
7. le Fondateur a explicitement autorisé l'usage public.

Sont interdits : faux screenshots, assemblages qui simulent une interface disponible, ajout de fonctions par retouche et recadrage qui altère le sens de l'écran.

Un recadrage, une compression ou une optimisation sans perte de sens reste permis. Toute retouche doit préserver fidèlement le contenu réel.

## Statut par entité

### OJA — CONCEPTUAL_VISUAL_ONLY

Les illustrations conceptuelles et diagrammes institutionnels sont permis. Aucune capture applicative n'est qualifiée dans le dépôt OJW comme preuve publique. Cela ne signifie pas que l'application n'existe pas ; cela signifie seulement qu'aucune source réelle n'a encore franchi cette porte de preuve.

### OJP — CONCEPTUAL_VISUAL_ONLY

Le parcours « Comprendre → Organiser → Progresser » peut être représenté conceptuellement. Il ne doit pas ressembler à une banque en ligne, un compte bancaire, un portefeuille, une transaction, un rendement ou un résultat financier réel.

### OJCS — CONCEPTUAL_VISUAL_ONLY

Une représentation peut relier la Guinée, les territoires, les acteurs, les ressources, la diaspora et les connexions. Elle ne doit pas fabriquer d'établissement, profil, note, certification, entreprise vérifiée, annuaire disponible, transaction ou réservation.

### OJW — READY_FOR_AUTHENTIC_SCREENSHOT

OJW est le portail public observable. Une capture peut être produite depuis une version qualifiée de `onjarama.ca`. Elle doit identifier sa source, sa date, sa page, son viewport et, lorsque pertinente, sa baseline Git. Elle ne doit pas être retouchée pour ajouter une fonction. Elle peut être recadrée ou optimisée sans falsifier le contenu et doit être renouvelée lorsqu'elle ne représente plus correctement l'état public.

## Passage vers READY_FOR_AUTHENTIC_SCREENSHOT

Le passage d'OJA, OJP ou OJCS de `CONCEPTUAL_VISUAL_ONLY` à `READY_FOR_AUTHENTIC_SCREENSHOT` est une décision explicite. Il exige au minimum :

- un écran réel identifié ;
- un état suffisamment stable ;
- des données sûres ;
- une validation fonctionnelle ;
- une validation visuelle ;
- une autorisation fondatrice.

Une simple présence d'images dans un dépôt ne réalise pas cette transition.

## Données fictives et données de démonstration

Il est interdit de présenter comme réels : faux utilisateurs, établissements, partenaires, résultats, taux de réussite, nombres d'utilisateurs, témoignages, avis, statistiques internes, revenus, téléchargements ou indicateurs d'impact.

Des données de démonstration peuvent apparaître dans une vraie capture produit seulement si elles sont nécessaires à la compréhension, clairement identifiées comme exemples, non présentées comme réelles et dépourvues de données sensibles réelles. Le contexte ou la légende doit employer une indication explicite telle que « Données de démonstration ».

## Partenaires et institutions

Une organisation ne peut être présentée comme partenaire, soutien, client, collaborateur officiel ou caution sans preuve vérifiable et autorisation suffisante. Une institution peut être citée comme source, contexte, acteur sectoriel ou référence publique uniquement si la formulation ne suggère aucune relation inexistante.

## Chiffres publics

Tout chiffre affirmant un état réel doit être relié à une source, une date et un périmètre vérifiables. Cela couvre notamment utilisateurs, établissements, couverture, réussite, adoption, partenaires et performance. Un nombre conceptuel ou explicatif doit être décrit comme tel et ne peut prendre la forme d'une statistique réelle.

## Capacités futures

Une capacité future doit être classée `PLANNED`, `VISION`, `FUTURE` ou par une formulation publique équivalente. Elle ne peut être qualifiée de `AVAILABLE`, `CURRENT`, `LIVE` ou `ACTIVE` tant que cet état n'est pas vérifié.

Les blocs publics « Ce qui existe déjà » ou « Fondations actuelles » ne contiennent que des réalités vérifiables. La preuve peut être un texte précis, un état canonique, une architecture existante, une capture authentique ou une autre source vérifiable. Un screenshot n'est pas obligatoire pour chaque affirmation.

## Disponibilité produit

Le contrat canonique actuel est :

- OJA : `productAvailable = false` ;
- OJP : `productAvailable = false` ;
- OJCS : `productAvailable = false` ;
- OJW : `productAvailable = false`.

Aucune vitrine ne peut donc afficher de bouton Télécharger, App Store, Play Store, APK ou Installation, ni présenter une application comme publiquement disponible.

## Hiérarchie des sources de vérité

1. runtime OnJarama qualifié ;
2. repository et documentation canonique OnJarama ;
3. source externe officielle vérifiée ;
4. illustration conceptuelle explicitement identifiée.

Une source de niveau inférieur ne contredit pas une source de niveau supérieur. Une illustration conceptuelle ne devient jamais une preuve de niveau 1.

## Versionnage et traçabilité

Convention minimale recommandée pour une capture authentique importante :

`<entite>-<page-ou-ecran>-<YYYYMMDD>-<viewport>-<baseline>-<statut>.<extension>`

Exemple de statut : `qualified-public-evidence`. Le manifeste associé conserve la source, le contexte, les limitations et l'autorisation.

## Obsolescence

Une capture reste historiquement authentique après une évolution du produit, mais elle ne doit plus être décrite comme actuelle. Son statut devient `HISTORICAL_AUTHENTIC_CAPTURE` ou équivalent, et elle est remplacée lorsque l'écart nuit à la compréhension publique.

## Accessibilité

Tout visuel démonstratif important reçoit un texte alternatif pertinent ou une description contextuelle suffisante. Un schéma complexe reçoit une description textuelle complémentaire ; son `alt` reste concis et n'essaie pas de reproduire toute sa structure.

Un visuel purement décoratif utilise un texte alternatif vide lorsqu'il n'apporte aucune information.

## IA générative

L'IA générative peut contribuer à `CONCEPTUAL_ILLUSTRATION`, `DECORATIVE_VISUAL` et, sous contrôle humain, à certains éléments institutionnels. La classe, la légende et le contexte doivent rester honnêtes.

Un visuel généré ne peut jamais être présenté comme une capture réelle, un utilisateur réel, un établissement partenaire réel, une donnée réelle ou une preuve d'un produit existant.

## Gouvernance et autorisation

Le responsable d'une future intégration doit vérifier la classe du visuel, sa source, sa fiche de traçabilité, son accessibilité et son respect de la disponibilité produit. L'autorisation fondatrice est obligatoire pour toute capture produit publique et pour tout changement de statut d'une entité.

En cas de doute, le visuel reste hors publication. Une ambition de présentation ne constitue jamais une preuve.
