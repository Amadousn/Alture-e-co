---
brand: raselio
last_updated: 2026-09-06
refresh_by: 2026-12-06
sources_synced:
  - customer-reviews: null        # n'existe pas. Aucune application d'avis sur Shopify, aucun métachamp d'avis, aucune fiche marketplace, aucun agrégateur
  - ad-comments: null             # jamais tirés. 163 annonces Raselio, 43 270 impressions, 1 084 clics. Parker MCP ne connaît pas cette marque au 2026-09-06
  - post-purchase-surveys: null   # n'existe pas. Aucun outil de sondage branché
  - brand-reputation: 2026-09-06  # lu, et le résultat est zéro mention de la marque sur 6 requêtes
  - reddit: null                  # lecture refusée par le proxy réseau. 13 tentatives le 2026-09-06, 4 de plus le même jour pour cette passe, toutes refusées
  - other-reviews: null           # lecture refusée par le proxy réseau. Amazon.fr, Cdiscount, Trustpilot, Best Buy, Walmart
  - ad-account: 2026-09-06        # lu. C'est la seule source textuelle disponible et elle est écrite par la marque, donc elle ne produit aucun snippet client
snippet_count_total: 0
category_counts:
  pain_phrase: 0
  outcome_phrase: 0
  metaphor: 0
  objection: 0
  aspirational: 0
  trigger_moment: 0
  surprise_delight: 0
  category_jargon: 0
  anti_language: 0
corpus_profile: personas/voice-of-customer/voc-corpus-profile.md
quarantined_brand_projected_entries: 57
persona_slugs_available: aucun. `personas/personas-profile.md` n'existe pas au 2026-09-06, donc aucun identity_tag ni behavioral_signal_tag ne peut être posé
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/emotional-delivery-and-timing.md]
data_limitations: [LA BIBLIOTHÈQUE EST VIDE. 0 snippet sur les 9 catégories. Les neuf passes d'extraction ont chacune rendu zéro entrée, pour la même raison unique et vérifiée : il n'existe aucun enregistrement de langage client pour cette marque, nulle part. Aucune récurrence, aucune diversité de source, aucune confiance et aucun tag ne peut donc être calculé. Les sections ce qui émerge et ce qui s'efface sont vides parce qu'il n'y a rien à faire bouger. La seule matière textuelle du périmètre est écrite par la marque, elle est mise en quarantaine en annexe, elle porte brand_self_echo à true par construction, et elle ne doit jamais être présentée comme la parole d'un client. Cinq lignes de copie attribuées à des clients nommés sont documentées comme inventées par l'équipe elle-même et sont bannies de tous les bacs.]
---

# Voice of Customer — Raselio

## How Parker uses this library

**Avertissement à lire avant toute utilisation. Cette bibliothèque est vide, et c'est le résultat correct.**

En temps normal, une compétence de rédaction charge cette bibliothèque, choisit une identité de persona et un signal comportemental actif, et tire les phrases qui parlent la langue de ce client. Ici, il n'y a rien à tirer. Zéro snippet dans les neuf catégories, parce qu'aucun client de Raselio n'a jamais écrit un mot que ce système ait pu lire.

**Ce que ça veut dire concrètement pour la prochaine compétence qui ouvre ce fichier.** Toute copie écrite pour Raselio aujourd'hui est écrite sans langage client. Ce n'est pas un défaut de cette bibliothèque, c'est un fait sur la marque, et il vaut mieux le savoir que de recevoir des phrases inventées. Écrivez à partir de la fiche produit, du positionnement et du jugement, et dites-le.

**Ce qu'il ne faut surtout pas faire.** L'annexe de ce document contient beaucoup de langage. Il est excellent. Il est écrit par Raselio. Il ne prouve rien sur ce que pense un client et il ne doit jamais être cité comme une parole de client. Il porte `brand_self_echo: true` sur chaque entrée, ce qui, selon la convention du modèle, le plafonne à la confiance la plus basse et interdit de l'utiliser comme copie principale sans dérogation explicite.

**Cinq lignes sont bannies sans exception.** Elles se présentent comme des témoignages de clients identifiés et l'équipe documente elle-même qu'elles sont inventées. Elles sont listées dans la section Flagged for review et elles n'entrent dans aucun bac, sous aucune étiquette.

Pondération de confiance, dans le cas général : préférer les snippets à récurrence forte et à diversité de sources large, traiter les snippets à source unique comme des candidats et non comme du canon. Sans objet aujourd'hui, faute de snippets.

---

## Pain phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-pain-phrase.md`.

Aucune phrase de douleur écrite par un client de Raselio n'existe. Les sept surfaces de la méthode ont été visées et le détail des motifs d'absence est dans `voc-corpus-profile.md`. Ce que la marque projette comme douleur, neuf entrées datées, est en annexe A de la passe d'extraction, en quarantaine.

---

## Outcome phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-outcome-phrase.md`.

Onze appareils livrés entre le 2026-08-26 et le 2026-09-04, zéro retour d'usage écrit. Conséquence directe pour l'assemblage : le gouverneur de conformité de revendication ne peut se régler contre aucun usage réel, donc **toute promesse de résultat de cette marque est `gated` par défaut**, y compris les revendications absolues du type « 0 coupure ». La revendication de la FAQ, « La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir », est classée `unusable` : elle parle de clients qui n'ont rien constaté par écrit.

---

## Metaphors

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-metaphor.md`.

Cent pour cent des images disponibles sont écrites par la marque, ce qui est exactement le risque que le modèle signale pour cette catégorie. Sept images projetées sont en quarantaine, dont une porte de l'allitération, « Une lame droite sur une peau qui bouge. C'est là que ça dérape. » Aucune n'a de narrateur client.

---

## Objection phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-objection.md`.

C'est la catégorie où le vide coûte le plus au compte. 1 084 clics pour 11 commandes entre le 2026-08-10 et le 2026-09-06, soit environ 1 073 personnes qui ont cliqué et sont reparties, et aucune n'a été écoutée. L'équipe écrit elle-même « Le vrai problème est post-clic ». Les huit questions de la FAQ du site sont les objections que la marque anticipe, pas celles qu'on lui a posées.

---

## Aspirational phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-aspirational.md`.

Six aspirations projetées, toutes construites autour de ne pas être surpris et de rester présentable. Aucun client ne les a formulées. C'est le cas de figure que le prompt d'extraction désigne comme la marque qui admire son propre reflet, et il est ici intégral.

---

## Trigger moments

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-trigger-moment.md`.

Onze achats horodatés au jour près, zéro raison connue. Le champ `behavioral_signal_tag`, que le modèle désigne comme porteur et rarement nul sur cette catégorie, est nul deux fois : aucun enregistrement à taguer, et aucun slug de signal disponible puisque `personas-profile.md` n'existe pas.

---

## Surprise/delight phrases

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-surprise-delight.md`.

Seule catégorie dont l'annexe de langage projeté est vide, et c'est délibéré : une surprise que la marque annonce n'est plus une surprise, c'est une promesse. Les cinq candidats évidents, colis neutre, boîte complète, socle, étanchéité, durabilité des lames, sont tous déjà vendus par la marque et sont donc routés vers les résultats. Constat qui en découle : **Raselio ne connaît aujourd'hui aucun bénéfice de son produit qu'elle ne vende pas déjà.**

---

## Category jargon

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-category-jargon.md`.

Aucun usage de vocabulaire par un client n'a été observé. Le constat de méthode qui en sort est plus utile que le vide : le vocabulaire français de cette catégorie est tenu par les vendeurs, pas par les pairs, et le français n'a pas d'équivalent installé de manscaping ou de ball trimmer. Fait vérifié à retenir : la requête « Raselio tondeuse avis forum » renvoie neuf forums de tondeuses à gazon, donc le mot « tondeuse » seul sort de la catégorie dans l'index français.

---

## Anti-language

**0 entrée.** Extraction complète dans `personas/voice-of-customer/voc-anti-language.md`.

Aucune règle de ne-pas-dire n'est produite, et c'est volontaire : la méthode prévient qu'une règle bâtie sur un compte sans dénominateur bride la copie pour rien. La marque a écrit quatre postures de rejet, dont « Vous ne payez pas la pub. Vous payez la lame. », et personne ne les lui a renvoyées. Deux de ces postures convergent avec des plaintes documentées contre le leader américain de la catégorie, ce qui les rend prometteuses sans les valider.

---

## What's emerging

**Vide.** Une phrase émergente se définit comme vue pour la première fois dans les 30 derniers jours avec une récurrence de trois ou plus. Zéro phrase client existe, donc zéro peut émerger. La bibliothèque n'a pas de version antérieure, ce document est sa première, et le point zéro est celui du tableau de compteurs de `voc-corpus-profile.md`.

## What's fading

**Vide.** Une phrase qui s'efface se définit comme ayant récurré auparavant et n'étant plus apparue depuis 60 jours. Il n'y a pas d'auparavant. Première version de la bibliothèque.

Une seule chose bouge et elle est du côté de la marque, pas du client : le registre des créas est passé du tutoiement, lot du 2026-08-23 visant « Kevin, 27 ans », au vouvoiement, lot du 2026-09-03 visant 45 ans et plus. Onze jours d'écart, aucun mot de client entre les deux. Ce n'est pas un langage client qui s'efface, c'est une hypothèse qui a été remplacée par une autre.

## Flagged for review

Trois blocs, du plus grave au moins grave.

**1. Cinq lignes de copie attribuées à des clients qui n'existent pas. Bannies de tous les bacs, sans dérogation.** Verified sur les documents de l'équipe, qui les documente elle-même.

| Copie | Créa | Ce que l'équipe en écrit |
|---|---|---|
| « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » attribuée à « Hervé D. · Achat vérifié ★★★★★ » | 16 | « à remplacer par de vrais avis clients dès que possible » |
| « Catherine ❤️ / T'as fait quoi de différent ? / Rien. / (Raselio.) » présentée comme une capture de SMS | 17 | idem |
| « 58 ans. Fini de retenir ma respiration. » sur une pancarte tenue par un homme de 58 ans | 27 | idem |
| « Bernard L. » et « Bernard, 61 ans » avec citation inventée | W12, N08 | « Remplace par un avis réel » |
| Advertorial signé « Par Julien M. », « Mis à jour le 31 août 2026 » | page advertorial | aucune personne de ce nom n'existe dans une source |

Le danger est précis : ces lignes ont exactement la forme d'une pépite de mining. Un run futur qui relira les créas sans ce document les prendra pour du langage client.

**2. Les chiffres de preuve sociale que la marque diffuse et ne peut pas défendre.** Verified des deux côtés. « 4,7/5 » et « (1 734 avis) » en haut de la landing contre 0 avis existant. « +17 000 clients satisfaits » dans la barre de confiance et « Approuvée par plus de 17 000 hommes » sur 8 des 30 créas du lot du 2026-09-03, contre 11 commandes. Une version antérieure disait 35 000. Le même « 1 734 avis » figure sur la marque sœur Trael, ce qui pointe un gabarit recopié. Ces mentions tournent aujourd'hui en publicité payée. C'est un risque de conformité actif et il est placé devant le public, les hommes de 45 ans et plus, qui accorde le plus de poids à la preuve reconnue.

**3. Le corpus projeté en entier, 57 entrées, plafonné à la confiance la plus basse.** Neuf entrées de douleur, sept de résultat, sept d'image, huit d'objection, six d'aspiration, six de déclencheur, zéro de surprise, dix de vocabulaire, quatre de contre-langage. Chacune porte `brand_self_echo: true` parce que chacune remplit la première condition du modèle sans discussion possible : elle n'apparaît que dans des canaux où la marque contrôle entièrement l'environnement de langage, et elle est absente de tout canal où un client parle sans y avoir été invité. Aucune ne peut servir de copie principale au titre de langage client. Elles servent d'hypothèses datées, à confronter aux premiers commentaires publicitaires lus.

---

## Annexe — Où se trouve le langage projeté

Cette bibliothèque ne recopie pas le corpus projeté, pour éviter qu'il ne prenne la place du bac client par accident. Il vit dans les annexes A des neuf passes d'extraction, avec sa surface, sa date et son drapeau d'écho :

| Catégorie | Fichier | Entrées en quarantaine |
|---|---|---|
| Douleur | `voc-pain-phrase.md` | 9 |
| Résultat | `voc-outcome-phrase.md` | 7 |
| Image | `voc-metaphor.md` | 7 |
| Objection | `voc-objection.md` | 8 |
| Aspiration | `voc-aspirational.md` | 6 |
| Déclencheur | `voc-trigger-moment.md` | 6 |
| Surprise | `voc-surprise-delight.md` | 0, vide par choix de méthode |
| Vocabulaire | `voc-category-jargon.md` | 10 |
| Contre-langage | `voc-anti-language.md` | 4 |
| **Total** | | **57** |

Le langage de catégorie, issu des clients d'autres marques, vit dans les annexes B des mêmes fichiers. Il est intégralement composé de thèmes résumés par WebSearch, jamais de verbatims : toute lecture directe du web est refusée par le proxy réseau, quatre tentatives le 2026-09-06, quatre `EGRESS_BLOCKED`, dont Wikipédia.

---

## Open loops

**1. Le seul langage client existant de cette marque est enfermé derrière un accès manquant.**

Observation. Les 163 annonces Raselio ont porté 43 270 impressions et 1 084 clics entre le 2026-08-10 et le 2026-09-06, verified. Les commentaires sous ces annonces n'ont jamais été ouverts, parce que Parker MCP ne connaît pas cette marque et que `get_available_brands` renvoie une liste d'organisations vide. Les neuf passes d'extraction ont rendu zéro entrée, et cette source aurait pu en alimenter neuf.

Pull. **Gap.** Il fired en assemblage, pas dans une extraction : c'est en voyant les neuf bacs vides côte à côte, tous pour la même raison unique, que la taille de ce trou est devenue visible.

Question. Que disent les Français dans les commentaires sous les annonces Raselio ?

Justification. C'est la seule source qui peut remplir plusieurs catégories d'un coup, en français, sans rien produire de nouveau. Elle transformerait cette bibliothèque d'un document vide en un document utile.

Territoire. Messaging.

**2. Trois catégories pointent vers la même question sur qui décide de l'achat.**

Observation. La convergence est la forme la plus lourde qu'un signal peut prendre en assemblage, et elle est ici. L'aspiration projetée met une partenaire dans la scène, « Personne n'a besoin de savoir, tout le monde finira par remarquer. » Le déclencheur projeté aussi, « Elle a remarqué. » et « Ce soir. » Et le plan média prévoit un ad set femmes 45 à 60 ans pour la créa 28, « Le cadeau qu'il ne s'offrira jamais lui-même. » Trois catégories, une seule figure, zéro donnée.

Pull. **Pattern.** Il fired parce que la même personne absente revient dans trois bacs indépendants.

Question. Qui décide vraiment de cet achat dans un foyer ?

Justification. Si la partenaire est prescriptrice ou acheteuse, une part importante du budget créatif s'adresse aujourd'hui à la mauvaise personne, et le ciblage du compte, entièrement masculin sauf une exception prévue, est à revoir.

Territoire. Personas.

**3. Les neuf catégories sont vides et rien n'est en place pour qu'elles se remplissent.**

Observation. Onze acheteurs livrés, aucune application d'avis installée, aucun e-mail de sondage, une page « Contactez-nous » au corps vide, verified sur l'export Shopify. La marque affiche 1 734 avis et n'a aucun moyen d'en obtenir un seul.

Pull. **Tension.** Il fired sur la contradiction entre l'importance que la marque donne aux avis dans sa propre communication et l'absence totale de dispositif pour en récolter.

Question. Qu'est-ce qui empêche aujourd'hui la marque de demander un retour à ses onze premiers acheteurs ?

Justification. Le premier verbatim réel change plus le travail créatif que trente créas de plus. Tant qu'il n'existe pas, chaque angle qui tourne reste une hypothèse et le coût par acquisition à 86 € contre un point mort à 21 € ne peut pas être diagnostiqué.

Territoire. Produit.

**4. Aucun slug de persona n'existe, donc aucun snippet futur ne pourra être tagué.**

Observation. `personas/personas-profile.md` n'existe pas dans ce cerveau au 2026-09-06. Les champs `identity_tag` et `behavioral_signal_tag` sont nuls dans les neuf passes, par obligation et non par jugement. Le champ de signal comportemental, que le modèle désigne comme porteur sur la catégorie des déclencheurs, est nul là aussi.

Pull. **Gap.** Il fired parce que même si les commentaires publicitaires étaient lus demain, la bibliothèque ne pourrait pas ranger ce qu'elle en tirerait.

Question. Quelles identités et quels états situationnels le travail persona doit-il définir pour que cette bibliothèque devienne interrogeable ?

Justification. Sans slugs, la bibliothèque reste une liste plate. Avec eux, elle devient ce pour quoi elle existe : une réserve de langage qu'on tire par persona et par moment.

Territoire. Personas.

Boucle routée vers le travail persona : la boucle 4. Boucle réservée à la marque : la boucle 3, qui porte sur une décision d'outillage que seul Dylan peut prendre.

---

**Méthodes chargées pour cet assemblage :** `parker-system/creative-strategy-context/customer-review-mining-method.md`, `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md`, `parker-system/creative-strategy-context/advertising-to-older-audiences.md` et `parker-system/creative-strategy-context/emotional-delivery-and-timing.md`. Les deux gouverneurs, conformité de revendication et voix, ont été appliqués, le drapeau d'écho de marque a été posé sur les 57 entrées en quarantaine avec la lecture croisée des canaux que seule la passe d'assemblage peut faire, et le drapeau d'allitération a été porté depuis l'extraction des images. Structure conforme à `parker-system/templates/voc-template.md`.

This is everything I know about mining customer reviews for creative material.
This is everything I know about advertising to older audiences.
