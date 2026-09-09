---
doc: reproduction-10-frameworks
generated_on: 2026-09-09
source: Google Doc « Winning Statics » (id 1CFx7B38UW1A…), partagé par alexv.rob1@gmail.com le 2026-09-06
statut: généré, non validé visuellement
---

# Les 10 frameworks du doc « Winning Statics », reproduits pour Raselio

**Ce que j'ai pu lire et ce que je n'ai pas pu voir.** Le doc fait 11,8 Mo et ses 10 statiques sont des **images intégrées**. Le texte passe par le connecteur Drive, les images non : `docs.google.com` et `lh7-rt.googleusercontent.com` sont refusés par le proxy de sortie (code 000, testé le 2026-09-09), et faire transiter le doc en base64 représenterait ~16 Mo, ce qui ne rentre pas. **J'ai donc les 10 noms de framework, pas les 10 visuels.** La reproduction s'appuie sur les frameworks et sur l'évidence chiffrée de `competitors/_bibliotheque-architectures.md` (~31 000 annonces), pas sur une copie des images d'Alex.

**Route qui fonctionne, découverte le 2026-09-09 :** le connecteur Google Drive lit les fichiers `image/png` et `image/jpeg` un par un et renvoie **tout le texte présent sur la créative plus une liste d'étiquettes de sujet**. Testé sur un PNG du Drive de Dylan : le texte intégral est ressorti. Donc des statiques déposées en **fichiers image séparés** dans un dossier Drive sont exploitables ; un doc avec des images collées dedans ne l'est pas.

## La correspondance framework → famille d'architecture

| # | Framework du doc | Famille | Évidence corpus | État Raselio avant ce lot |
|---|---|---|---|---|
| 1 | US VS THEM | A4 | Hollow 20,2 % de 1 464 · Mars Men 9 % | absente |
| 2 | BOLD CLAIM | A1 | Headline Only n° 1 chez 5 marques sur 6 | TIER 1 (W-C typo) |
| 3 | iPhone NOTES | **nouvelle famille A17** | absente de la bibliothèque, créée ici | absente |
| 4 | Features & Benefits | A11 | Happy Mammoth 18,1 % · PetLab 16 % | mécanisme M3 décodé, jamais produit |
| 5 | Before & After | A3 | Mars Men 22,7 % · Happy Mammoth « DAY 1 / DAY 14 » 632 j | absente — le plus gros trou |
| 6 | OFFER | A5 | Mars Men 28,6 % · PetLab « 50 % OFF » 421 j | bloquée : pas d'offre |
| 7 | TESTIMONIAL | A7 | Wild Roman 103 j · Hollow 138 j | **interdite** : 0 avis réel |
| 8 | QUESTION | A13 | Mars Men post-it quiz 132 j | absente |
| 9 | Reasons Why | A11 variante listicle | Happy Mammoth Listicle 4,2 % | absente |
| 10 | Sticky Notes | A2 | O Positiv 3,2 % · Mars Men 132 j | TIER 1 (W-B post-it) |

## Les deux arbitrages, et pourquoi

**OFFER (#6) — produite, mais sans remise inventée.** Raselio n'a pas d'offre : un SKU, 34,99 €, prix unique, et le coût produit est toujours `null` dans Shopify, donc aucune remise ne peut être calculée proprement. J'ai donc retourné le framework : le prix devient l'argument (« Prix unique. Pas de promotion. ») et la réassurance porte les trois seules conditions réellement publiées — garantie 2 ans, satisfait ou remboursé 30 jours, colis neutre. Aucun prix barré, aucun compte à rebours, aucun pourcentage.

**TESTIMONIAL (#7) — produite avec la seule phrase réelle qui existe.** La règle dure n° 1 interdit tout témoignage signé d'un prénom et d'un âge : Raselio a **11 commandes, 0 avis, 2 commentaires** et fait déjà tourner cinq témoignages que l'équipe documente elle-même comme inventés. Mais le compte contient **un vrai commentaire**, verified 2026-09-07, cité mot pour mot : « Plus rien de la bête sauvage qui sommeille en nous. » Je l'ai monté en citation nue avec sa source exacte — « Commentaire reçu sous une publicité Raselio. » — et rien d'autre : **aucun nom, aucun âge, aucun avatar, aucune étoile, aucune mention d'achat vérifié**. Montrer un vrai commentaire comme un commentaire n'est pas trompeur. Le faire passer pour un avis client vérifié le serait.

Cette créative reste un pis-aller. La vraie version de #7 s'ouvre le jour où un des 8 acheteurs livrés répond à un e-mail.

## Nouvelle famille — A17, iPhone Notes

Absente de la liste des 30 architectures de Dylan et de la bibliothèque. À ajouter à `_bibliotheque-architectures.md`.

**Structure.** Capture d'écran de l'application Notes d'iOS, interface fidèle, texte système, souvent une liste à cocher, parfois une annotation manuscrite par-dessus. **Pourquoi ça marche.** C'est le format le plus natif qui existe : il ne ressemble à aucune publicité, il emprunte l'interface que le lecteur a déjà sous les yeux, et une liste à cocher se lit en une seconde. **Ce qui se verrouille.** La fidélité de l'interface iOS, le texte système jamais remplacé par une police décorative, la brièveté des lignes, l'annotation manuscrite comme unique élément non natif. **Ce qui s'adapte.** Le contenu de la note. **Piège.** Une note écrite à la première personne par un client inventé retomberait sous la règle dure n° 1 — donc la note est celle de la marque, jamais celle d'un faux acheteur.

## Contraintes tenues dans les dix prompts

Aucune nudité, proxy serviette + post-it ou cadrage au-dessus du nombril ; aucune note, aucun compteur d'avis, aucun « X hommes », aucun témoignage signé ; aucune spécification hors des sept publiées, tours-minute et autonomie exacte absents de toute image ; aucune marque concurrente nommée, montrée ou citée ; vouvoiement ; homme de 57 ans, pas un mannequin de vingt ans ; palette crème #F7F3EC, terracotta #C15D2F, encre #211C17, noir #0B0B0D ; bloc de fidélité produit MS-810 collé verbatim, `image_references` = media `8f86e875-a8fa-4024-aec2-cedfb22fc165`.

## Contrôle visuel — celui de Dylan

Trois points, dans l'ordre : **les accents français** (le point de casse le plus probable), **la fidélité produit** (grip losanges, bouton rond à anneau vert, LED sous la tête, peigne argenté, socle évasé, aucune inscription), et sur #1 et #5 **la distinction entre la tondeuse générique et le produit héros**. Causes de rejet dans `winners/REJECTION_LOG.md`.
