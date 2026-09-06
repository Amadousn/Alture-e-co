---
brand: raselio
last_updated: 2026-09-06
refresh_by: 2026-12-06
sources_synced:
  - customer-reviews: 2026-09-06   # interrogé, 0 avis. L'outil répond que la base est vide et que ce n'est pas un problème d'accès
  - ad-comments: 2026-09-06        # interrogé, 2 commentaires au total. Corpus complet, pas un échantillon
  - post-purchase-surveys: 2026-09-06  # interrogé, totalResponsesForBrand 0. Aucun outil de sondage branché
  - brand-reputation: 2026-09-06   # lu, 0 mention de la marque sur 6 requêtes
  - reddit: null                   # aucun outil Reddit dans cette installation Parker, et lecture directe refusée par le proxy réseau
  - other-reviews: null            # lecture refusée par le proxy réseau. Amazon.fr, Cdiscount, Trustpilot, Best Buy, Walmart
  - ad-account: 2026-09-06         # lu. Source textuelle volumineuse, écrite par la marque, ne produit aucun snippet client
snippet_count_total: 2
category_counts:
  pain_phrase: 0
  outcome_phrase: 0
  metaphor: 1
  objection: 1
  aspirational: 0
  trigger_moment: 0
  surprise_delight: 0
  category_jargon: 0
  anti_language: 0
unique_verbatims: 1
corpus_profile: personas/voice-of-customer/voc-corpus-profile.md
corpus_denominator: 2 enregistrements de langage client existants, tirés en direct de Parker le 2026-09-06, brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
quarantined_brand_projected_entries: 57
persona_slugs_available: aucun. `personas/personas-profile.md` n'existe pas au 2026-09-06, donc aucun identity_tag ni behavioral_signal_tag ne peut être posé. Le document de contexte de marque Parker propose 5 profils types nommés, Thomas, Nabil, Sandrine, Damien et Lucas, mais ce ne sont pas des slugs canoniques et cette bibliothèque n'a pas le droit d'en inventer
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/emotional-delivery-and-timing.md]
data_limitations: [LA BIBLIOTHÈQUE CONTIENT 2 ENTRÉES POUR 1 VERBATIM UNIQUE. Le corpus client entier compte 2 enregistrements, interrogés en direct via Parker le 2026-09-06 et non déduits, deux commentaires publicitaires dont l'un fait trois caractères. Il reste donc une seule phrase de client utilisable pour toute la marque, entrée dans deux catégories, images et objections, à confiance thin. Sept catégories sur neuf sont vides. Aucune récurrence supérieure à 1 n'est possible sur un dénominateur de 2, donc aucun motif ne peut être établi et aucune confiance ne peut dépasser thin. Aucun tag d'identité ni de signal comportemental n'est posé, faute de personas-profile.md. Les sections ce qui émerge et ce qui s'efface sont vides parce qu'une seule ligne ne bouge pas. La matière textuelle volumineuse est écrite par la marque, mise en quarantaine dans les annexes des neuf extractions, avec brand_self_echo à true par construction. Cinq lignes de copie attribuées à des clients nommés sont documentées comme inventées par l'équipe elle-même et sont bannies de tous les bacs. Le langage de catégorie disponible provient de clients d'autres marques et arrive sans nom de marque, sans date et sans lien.]
---

# Voice of Customer — Raselio

## How Parker uses this library

**Avertissement à lire avant toute utilisation. Cette bibliothèque contient une seule phrase de client, et c'est le résultat correct.**

Le corpus a été interrogé, pas supposé. La marque existe désormais dans Parker MCP, brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, et les outils ont été appelés le 2026-09-06 : 0 avis, avec un message explicite de l'outil disant que la base est vide et que ce n'est pas un problème d'accès ; 0 réponse de sondage post-achat ; 2 commentaires publicitaires au total, ce qui est le corpus complet et pas un échantillon.

**La voici, la seule phrase que Raselio possède.**

> « Plus rien de la bête sauvage qui sommeille en nous. » Le 2026-08-31 à 15h46 UTC, en commentaire sous l'annonce `52505820194591`, « RASELIO | IMPECCABLE | BOXER ». 0 like, 0 réponse.

Elle est entrée deux fois, en image et en objection, parce qu'elle appartient vraiment aux deux. Elle porte une récurrence de 1 sur un dénominateur de 2, donc une confiance thin. C'est un candidat, jamais du canon.

**Ce que ça veut dire pour la compétence qui ouvre ce fichier.** Vous pouvez citer cette phrase, elle est réelle, datée, sourcée et non contaminée par la marque. Vous ne pouvez rien en conclure de général. Pour tout le reste, la copie de Raselio s'écrit aujourd'hui sans langage client, et il vaut mieux le dire que de recevoir des phrases inventées.

**Ce qu'il ne faut surtout pas faire.** Les annexes des neuf extractions contiennent beaucoup de langage. Il est excellent. Il est écrit par Raselio. Il porte `brand_self_echo: true`, ce qui, selon la convention du modèle, le plafonne à la confiance la plus basse et interdit de l'utiliser comme copie principale sans dérogation explicite. Les annexes B contiennent en plus du langage de catégorie venu de clients d'autres marques : il arrive sans nom de marque, sans date et sans lien, il est `stated` et `thin`, et il ne doit jamais être présenté comme la parole d'un client de Raselio.

**Cinq lignes sont bannies sans exception.** Elles se présentent comme des témoignages de clients identifiés et l'équipe documente elle-même qu'elles sont inventées. Elles sont listées dans la section Flagged for review.

Pondération de confiance, dans le cas général : préférer les snippets à récurrence forte et à diversité de sources large, traiter les snippets à source unique comme des candidats et non comme du canon. Ici, l'unique snippet est à source unique, donc candidat.

---

## Pain phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-pain-phrase.md`.

Corpus interrogé le 2026-09-06 : aucune des deux lignes du corpus client ne nomme une douleur. Ce que la marque projette comme douleur, neuf entrées datées, est en annexe A de la passe d'extraction, en quarantaine. Le langage de douleur de la catégorie converge fortement avec ce que Raselio projette sur quatre points, la peur de se couper, le mauvais outil, la fenêtre de trois jours et la responsabilité de la lame, et fait apparaître une douleur que Raselio ne nomme nulle part : le temps que ça prend.

---

## Outcome phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-outcome-phrase.md`.

Onze appareils livrés entre le 2026-08-26 et le 2026-09-04, zéro retour d'usage écrit, et les deux commentaires du corpus sont des réactions à une publicité, pas des retours d'utilisateurs. Conséquence directe pour l'assemblage : le gouverneur de conformité de revendication ne peut se régler contre aucun usage réel, donc **toute promesse de résultat de cette marque est `gated` par défaut**, y compris les revendications absolues du type « 0 coupure ». La revendication de la FAQ, « La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir », est classée `unusable` : elle parle de clients qui n'ont rien constaté par écrit.

Note de langage utile pour les rédacteurs, marquée inferred : le langage de résultat de la catégorie est prudent et relatif. Un vrai client écrit « so far it has not nicked me » là où Raselio écrit « 0 coupure ». La formulation modeste sonne plus vrai.

---

## Metaphors

**1 entrée.** Extraction complète dans `personas/voice-of-customer/voc-metaphor.md`.

```yaml
- snippet: "Plus rien de la bête sauvage qui sommeille en nous."
  category: metaphor
  identity_tag: null
  behavioral_signal_tag: null
  sku_tag: MS-810 Tondeuse Intime Homme Raselio
  use_case_tag: null
  source:
    type: ad-comment
    platform: Facebook, page 1234695553067195, sous l'annonce 52505820194591 « RASELIO | IMPECCABLE | BOXER »
    review_id: 3c2ca5a3-6d53-5564-6fd8-f33d60753d83
    date: 2026-08-31
    product_version: ère 3, tondeuse seule à 34,99 €, en vigueur depuis le 2026-08-26
    url: https://www.facebook.com/122109959949409627/posts/122108833431409627?comment_id=1395943165961254
  recurrence: 1
  source_diversity: [ad-comment]
  first_seen: 2026-08-31
  last_seen: 2026-08-31
  confidence: thin
  brand_self_echo: false
  alliteration: false
  claims_check: clear
  voice_check: transformable
  notes: >
    Dénominateur : 1 sur 2 enregistrements de langage client existants, tirés de Parker le
    2026-09-06 qui renvoie total 2. Récurrence de 1, donc candidat et non motif, confiance
    thin par la règle du modèle.
    L'image est double : la pilosité comme bête sauvage, et cette bête endormie plutôt
    qu'agitée, ce qui fait de la zone une puissance en réserve et non un désordre. C'est le
    modèle mental inverse de celui de la marque.
    Écho de marque à false, et la vérification a porté sur tout : 4 surfaces du site, 30
    fiches créa du 2026-09-03, 9 concepts du 2026-08-23. Aucune formulation approchante.
    claims_check clear : la phrase ne revendique rien sur le produit.
    voice_check transformable : l'observation est juste, le registre ironique n'est pas
    celui de la marque, qui est sobre et rassurant. L'idée peut nourrir un concept, la
    formulation ne se reprend pas telle quelle dans la voix actuelle.
    sku_tag trivial : la marque n'a qu'un SKU.
    Auteur anonyme, author_id et author_name vides côté Parker.
```

Les sept autres images du dossier sont écrites par la marque et vivent en annexe A de l'extraction, avec le drapeau d'écho. Une d'entre elles porte de l'allitération, « Une lame droite sur une peau qui bouge. C'est là que ça dérape. »

---

## Objection phrases

**1 entrée.** Extraction complète dans `personas/voice-of-customer/voc-objection.md`.

```yaml
- snippet: "Plus rien de la bête sauvage qui sommeille en nous."
  category: objection
  identity_tag: null
  behavioral_signal_tag: null
  sku_tag: MS-810 Tondeuse Intime Homme Raselio
  use_case_tag: null
  source:
    type: ad-comment
    platform: Facebook, page 1234695553067195, sous l'annonce 52505820194591 « RASELIO | IMPECCABLE | BOXER »
    review_id: 3c2ca5a3-6d53-5564-6fd8-f33d60753d83
    date: 2026-08-31
    product_version: ère 3, tondeuse seule à 34,99 €, en vigueur depuis le 2026-08-26
    url: https://www.facebook.com/122109959949409627/posts/122108833431409627?comment_id=1395943165961254
  recurrence: 1
  source_diversity: [ad-comment]
  first_seen: 2026-08-31
  last_seen: 2026-08-31
  confidence: thin
  brand_self_echo: false
  alliteration: false
  claims_check: clear
  voice_check: transformable
  notes: >
    Même verbatim que l'entrée métaphore. Le modèle prévoit une entrée par catégorie à
    laquelle la phrase appartient vraiment, et elle appartient aux deux.
    L'objection de surface est une blague sur la virilité. L'inquiétude qui se tient
    dessous, et ceci est ma lecture et non ce que l'auteur a écrit : raser cette zone est
    perçu comme un renoncement plutôt que comme une amélioration. Marqué inferred.
    Aucune résolution n'existe : 0 like, 0 réponse, et la marque n'a aucun dispositif de
    réponse aux commentaires.
    C'est la seule objection observée de toute la marque, et elle ne figure dans aucune
    des huit questions de sa FAQ ni dans aucune des 30 fiches créa.
```

Les huit objections que la marque anticipe, prix, sécurité, outil, garantie, discrétion, vivent en annexe A de l'extraction. Le langage de catégorie fait apparaître trois objections que Raselio ne traite nulle part : l'étanchéité qui lâche avec le temps, la robustesse à bas prix, et la comparaison directe à un concurrent nommé.

---

## Aspirational phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-aspirational.md`.

Six aspirations projetées, toutes construites autour de ne pas être surpris et de rester présentable. Aucun client ne les a formulées, et la seule voix française reçue dit l'inverse : elle nomme une perte, pas un devenir souhaité. Un enregistrement contre six lignes de copie, ce n'est pas un verdict, mais c'est la seule fois où le réel a répondu et il a répondu à côté.

---

## Trigger moments

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-trigger-moment.md`.

Onze achats horodatés à la minute, zéro raison connue. Les deux commentaires du corpus ne racontent aucun moment et rien ne dit que leurs auteurs aient acheté. Le champ `behavioral_signal_tag`, que le modèle désigne comme porteur et rarement nul sur cette catégorie, est nul deux fois : aucun enregistrement à taguer, et aucun slug disponible. Un sondage post-achat est de très loin l'outil qui remplirait cette catégorie le plus vite, et il n'existe pas.

---

## Surprise/delight phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-surprise-delight.md`.

Seule catégorie dont l'annexe de langage projeté est vide, et c'est délibéré : une surprise que la marque annonce n'est plus une surprise, c'est une promesse. Les cinq candidats évidents, colis neutre, boîte complète, socle, étanchéité, durabilité des lames, sont tous déjà vendus par la marque et sont routés vers les résultats. Constat qui en découle : **Raselio ne connaît aujourd'hui aucun bénéfice de son produit qu'elle ne vende pas déjà.**

---

## Category jargon

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-category-jargon.md`.

Aucun terme de catégorie employé par un client n'a été observé, et le seul Français qui ait parlé à cette marque a construit une image plutôt qu'employé un vocabulaire. Le constat de méthode qui en sort est plus utile que le vide : le vocabulaire français de cette catégorie est tenu par les vendeurs, pas par les pairs, et le français n'a pas d'équivalent installé de manscaping, ball trimmer ou below the belt. Fait vérifié à retenir : la requête « Raselio tondeuse avis forum » renvoie neuf forums de tondeuses à gazon, donc le mot « tondeuse » seul sort de la catégorie dans l'index français.

---

## Anti-language

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-anti-language.md`.

Aucune règle de ne-pas-dire n'est produite, et c'est volontaire : la méthode prévient qu'une règle bâtie sur un compte sans dénominateur bride la copie pour rien. Le seul commentaire porteur de langage rejette la proposition du produit, pas la façon dont on la vend, donc il est classé en objection et pas ici. La marque a écrit quatre postures de rejet, dont « Vous ne payez pas la pub. Vous payez la lame. », et personne ne les lui a renvoyées. Deux d'entre elles convergent avec des plaintes documentées contre le leader américain de la catégorie, ce qui les rend prometteuses sans les valider.

---

## What's emerging

**Vide.** Une phrase émergente se définit comme vue pour la première fois dans les 30 derniers jours avec une récurrence de trois ou plus. Le seul verbatim du corpus date du 2026-08-31, donc il tombe bien dans la fenêtre de 30 jours, mais sa récurrence est de 1. Il ne franchit pas le seuil et il est traité comme un candidat isolé plutôt que comme une tendance.

La bibliothèque n'a pas de version antérieure, ce document est sa première, et le point zéro est le tableau de compteurs de `voc-corpus-profile.md`.

## What's fading

**Vide.** Une phrase qui s'efface se définit comme ayant récurré auparavant et n'étant plus apparue depuis 60 jours. Il n'y a pas d'auparavant. Première version de la bibliothèque.

Une seule chose bouge et elle est du côté de la marque, pas du client : le registre des créas est passé du tutoiement, lot du 2026-08-23 visant « Kevin, 27 ans », au vouvoiement, lot du 2026-09-03 visant 45 ans et plus. Onze jours d'écart, aucun mot de client entre les deux. Ce n'est pas un langage client qui s'efface, c'est une hypothèse remplacée par une autre.

## Flagged for review

Quatre blocs, du plus grave au moins grave.

**1. Cinq lignes de copie attribuées à des clients qui n'existent pas. Bannies de tous les bacs, sans dérogation.** Verified sur les documents de l'équipe, qui les documente elle-même.

| Copie | Créa | Ce que l'équipe en écrit |
|---|---|---|
| « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » attribuée à « Hervé D. · Achat vérifié ★★★★★ » | 16 | « à remplacer par de vrais avis clients dès que possible » |
| « Catherine ❤️ / T'as fait quoi de différent ? / Rien. / (Raselio.) » présentée comme une capture de SMS | 17 | idem |
| « 58 ans. Fini de retenir ma respiration. » sur une pancarte tenue par un homme de 58 ans | 27 | idem |
| « Bernard L. » et « Bernard, 61 ans » avec citation inventée | W12, N08 | « Remplace par un avis réel » |
| Advertorial signé « Par Julien M. », « Mis à jour le 31 août 2026 » | page advertorial | aucune personne de ce nom n'existe dans une source |

Le danger est précis : ces lignes ont exactement la forme d'une pépite de mining. Un run futur qui relira les créas sans ce document les prendra pour du langage client.

**2. Les chiffres de preuve sociale que la marque diffuse et ne peut pas défendre.** Verified des deux côtés. « 4,7/5 » et « (1 734 avis) » en haut de la landing contre 0 avis existant, confirmé par l'outil Parker et pas seulement par l'absence d'application d'avis. « +17 000 clients satisfaits » dans la barre de confiance et « Approuvée par plus de 17 000 hommes » sur 8 des 30 créas du lot du 2026-09-03, contre 11 commandes. Une version antérieure disait 35 000. Le même « 1 734 avis » figure sur la marque sœur Trael, ce qui pointe un gabarit recopié. Ces mentions tournent aujourd'hui en publicité payée. C'est un risque de conformité actif, placé devant le public, les hommes de 45 ans et plus, qui accorde le plus de poids à la preuve reconnue.

**3. L'unique snippet de la bibliothèque est à source unique et il ne doit pas devenir du canon.** « Plus rien de la bête sauvage qui sommeille en nous. » est réelle, datée, sourcée et non contaminée par la marque, ce qui en fait la meilleure matière du coffre. Elle repose sur un enregistrement, dans un seul type de source, sans corroboration. Elle est parfaite à citer telle quelle avec sa date. Elle ne prouve rien de général, et la promouvoir en insight de positionnement serait exactement le laundering que la passe d'assemblage existe pour empêcher.

**4. Le corpus projeté en entier, 57 entrées, plafonné à la confiance la plus basse.** Neuf entrées de douleur, sept de résultat, sept d'image, huit d'objection, six d'aspiration, six de déclencheur, zéro de surprise, dix de vocabulaire, quatre de contre-langage. Chacune porte `brand_self_echo: true` parce qu'elle remplit la première condition du modèle sans discussion : elle n'apparaît que dans des canaux où la marque contrôle entièrement l'environnement de langage, et elle est absente du seul canal où un client a parlé sans y avoir été invité. Elles servent d'hypothèses datées, pas de copie.

---

## Annexe — Où se trouve le reste

Cette bibliothèque ne recopie pas le corpus projeté, pour éviter qu'il ne prenne la place du bac client par accident. Il vit dans les annexes A des neuf passes d'extraction, avec sa surface, sa date et son drapeau d'écho.

| Catégorie | Fichier | Snippets clients | Entrées projetées en quarantaine |
|---|---|---|---|
| Douleur | `voc-pain-phrase.md` | 0 | 9 |
| Résultat | `voc-outcome-phrase.md` | 0 | 7 |
| Image | `voc-metaphor.md` | **1** | 7 |
| Objection | `voc-objection.md` | **1** | 8 |
| Aspiration | `voc-aspirational.md` | 0 | 6 |
| Déclencheur | `voc-trigger-moment.md` | 0 | 6 |
| Surprise | `voc-surprise-delight.md` | 0 | 0, vide par choix de méthode |
| Vocabulaire | `voc-category-jargon.md` | 0 | 10 |
| Contre-langage | `voc-anti-language.md` | 0 | 4 |
| **Total** | | **2 entrées, 1 verbatim unique** | **57** |

Le langage de catégorie, issu des clients d'autres marques, vit dans les annexes B des mêmes fichiers. Il vient de deux sources, toutes deux incomplètes. La première est le document de contexte de marque que Parker stocke pour cette marque, dont la section « Customer Language » contient une douzaine de phrases entre guillemets que le document attribue lui-même à une analyse d'avis de concurrents, sans nommer la marque, sans date et sans lien. La seconde est six requêtes WebSearch du 2026-09-06, qui rendent des thèmes résumés par un outil et jamais de texte source, parce que toute lecture directe du web est refusée par le proxy réseau : quatre tentatives ce jour-là, quatre `EGRESS_BLOCKED`, dont Wikipédia.

---

## Open loops

**1. Les publicités de cette marque ne font réagir personne, et ça n'avait jamais été mesuré.**

Observation. La source que tout ce build croyait fermée s'est ouverte le 2026-09-06 et elle a rendu deux lignes. 163 annonces, 43 270 impressions, 1 084 clics, 2 commentaires, 0 like, 0 réponse. Soit 0,046 commentaire pour mille impressions.

Pull. **Surprise.** Il fired en assemblage : les neuf extractions attendaient toutes la même source pour se remplir, la source a répondu, et elle était presque vide.

Question. Pourquoi ces publicités ne font-elles réagir personne par écrit ?

Justification. Si c'est le format statique, la marque a un levier de format à essayer tout de suite. Si c'est le sujet, trop intime pour commenter sous son vrai nom, alors les commentaires ne seront jamais une source de langage pour cette marque et il faut mettre l'effort ailleurs, dans un sondage post-achat.

Territoire. Messaging.

**2. La seule voix française reçue dit le contraire de ce que la marque suppose.**

Observation. C'est une convergence entre trois catégories, la forme la plus lourde qu'un signal peut prendre en assemblage. Le seul verbatim client construit une image, la pilosité comme bête sauvage endormie ; il porte une objection, se raser c'est renoncer à quelque chose ; et il contredit l'aspiration que la marque projette, la sérénité et la présentabilité. Une phrase, trois catégories, un seul sens.

Pull. **Résonance.** Il fired parce que cette phrase vaut mieux que la plupart des accroches du répertoire, elle a été écrite gratuitement, et elle est restée sans réponse.

Question. Qu'est-ce qu'un homme pense perdre quand il rase cette zone ?

Justification. Si cette résistance est répandue, la marque rassure sur l'outil quelqu'un qui hésite sur le geste, et tout son argumentaire tombe à côté. Un enregistrement ne le prouve pas, mais c'est la première fois qu'un signal client pointe une direction que la marque n'a jamais envisagée, et c'est facile à tester.

Territoire. Messaging.

**3. Trois catégories pointent vers la même question sur qui décide de l'achat.**

Observation. L'aspiration projetée met une partenaire dans la scène, « Personne n'a besoin de savoir, tout le monde finira par remarquer. » Le déclencheur projeté aussi, « Elle a remarqué. » et « Ce soir. » Et le plan média prévoit un ad set femmes 45 à 60 ans pour la créa 28. Trois catégories, une seule figure, zéro donnée. Le document de contexte de marque Parker va dans le même sens en proposant un profil type d'acheteuse, Sandrine, sans plus de preuve.

Pull. **Pattern.** Il fired parce que la même personne absente revient dans trois bacs indépendants et dans un quatrième document.

Question. Qui décide vraiment de cet achat dans un foyer ?

Justification. Si la partenaire est prescriptrice ou acheteuse, une part importante du budget créatif s'adresse aujourd'hui à la mauvaise personne, et le ciblage du compte, entièrement masculin sauf une exception prévue, est à revoir.

Territoire. Personas.

**4. Onze acheteurs livrés et rien pour leur demander quoi que ce soit.**

Observation. Les outils confirment l'absence : 0 avis, avec un message disant que la base est vide et que ce n'est pas un problème d'accès, et 0 réponse de sondage post-achat. Côté boutique, aucune application d'avis installée, aucun e-mail de sondage, une page « Contactez-nous » au corps vide. La marque affiche 1 734 avis et n'a aucun moyen d'en obtenir un seul.

Pull. **Tension.** Il fired sur la contradiction entre l'importance que la marque donne aux avis dans sa propre communication et l'absence totale de dispositif pour en récolter.

Question. Qu'est-ce qui empêche aujourd'hui la marque de demander un retour à ses onze premiers acheteurs ?

Justification. Le premier vrai retour d'usage change plus le travail créatif que trente créas de plus. Il débloquerait aussi le gouverneur de conformité de revendication, qui ne peut se régler contre rien aujourd'hui et force chaque promesse de résultat en `gated`.

Territoire. Produit.

**5. Aucun slug de persona n'existe, donc rien de ce qui arrivera demain ne pourra être rangé.**

Observation. `personas/personas-profile.md` n'existe pas dans ce cerveau au 2026-09-06. Les champs `identity_tag` et `behavioral_signal_tag` sont nuls sur les deux entrées de la bibliothèque et dans les neuf passes, par obligation et non par jugement. Le document de contexte Parker propose cinq profils nommés, Thomas, Nabil, Sandrine, Damien et Lucas, mais ce ne sont pas des slugs canoniques et cette bibliothèque n'a pas le droit d'en inventer.

Pull. **Gap.** Il fired parce que même si le corpus grandissait demain, la bibliothèque ne pourrait pas ranger ce qu'elle en tirerait.

Question. Quelles identités et quels états situationnels le travail persona doit-il définir pour que cette bibliothèque devienne interrogeable ?

Justification. Sans slugs, la bibliothèque reste une liste plate. Avec eux, elle devient ce pour quoi elle existe : une réserve de langage qu'on tire par persona et par moment.

Territoire. Personas.

Boucle routée vers le travail persona : la boucle 5. Boucle réservée à la marque : la boucle 4, qui porte sur une décision d'outillage que seul Dylan peut prendre.

---

**Méthodes chargées pour cet assemblage :** `parker-system/creative-strategy-context/customer-review-mining-method.md`, `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md`, `parker-system/creative-strategy-context/advertising-to-older-audiences.md` et `parker-system/creative-strategy-context/emotional-delivery-and-timing.md`. Les deux gouverneurs, conformité de revendication et voix, ont été appliqués aux deux entrées et à tout le corpus projeté ; le drapeau d'écho de marque a été posé avec la lecture croisée des canaux que seule la passe d'assemblage peut faire ; le marquage d'ère produit est porté sur les deux entrées ; le drapeau d'allitération a été relevé depuis l'extraction des images. Structure conforme à `parker-system/templates/voc-template.md`.

This is everything I know about mining customer reviews for creative material.
This is everything I know about advertising to older audiences.
