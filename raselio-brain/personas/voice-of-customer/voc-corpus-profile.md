---
brand: raselio
doc: voc-corpus-profile
generated_on: 2026-09-06
refresh_by: 2026-12-06
raw_records_received: 2
normalized_records: 2
deduplicated_records_removed: 0
date_range: 2026-08-31 to 2026-09-01
sources_read: [Parker MCP brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 — get_available_brands (org « Dylan's Org », 1 marque), search_facebook_ad_comments_sql (2 lignes, total renvoyé 2), search_facebook_ad_comments_semantic (totalCommentsAnalyzed 2), search_customer_reviews_sql (0 ligne, message explicite de base vide), search_customer_reviews_semantic (totalReviewsAnalyzed 0), semantic_search_post_purchase_survey (totalResponsesForBrand 0), get_brand_persona (document de contexte de marque complet, généré par Parker), search_chat_history mode listThreads (0 fil), aucun outil Reddit n'existe dans cette installation, une recherche d'outil sur reddit ne renvoie rien, tous appelés le 2026-09-06, personas/voice-of-customer/voc-corpus-profile.md n'existait pas avant ce run, source-pulls/shopify-store-and-product.md (4 surfaces de texte de marque, 6 politiques, 1 fiche produit), source-pulls/shopify-orders-and-customers.md (11 commandes, 14 fiches clients), source-pulls/shopify-analytics.md (8 requêtes ShopifyQL, 2 431 sessions sur 90 jours), source-pulls/meta-ads-all.md (183 lignes annonce dont 163 Raselio), source-pulls/meta-account-campaigns-adsets.md, source-pulls/meta-account-breakdowns.md, source-pulls/meta-performance-trend.md, source-pulls/gmail-brand-signals.md (46 fils, corps complets de 8 fils), source-pulls/drive-30-statiques-meta-plan-2026-09-03.md (30 fiches créa complètes), source-pulls/drive-30-creas-json-2026-09-03.md, source-pulls/drive-30-creas-meta-index-2026-09-03.md, source-pulls/drive-9-ads-statiques-prompts-2026-08-23.md, source-pulls/drive-higgsfield-prompts-final-2026-09-03.md, sub-context-docs/organic-channels-inventory.md, sub-context-docs/reputation-analysis.md, sub-context-docs/community-and-forums.md, sub-context-docs/customer-journey-and-persona-discovery.md, running-notes/brand-rules.md, WebSearch (6 requêtes le 2026-09-06), WebFetch (4 tentatives le 2026-09-06, 4 échecs)]
expected_sources_missing: [customer-reviews — n'existe pas, confirmé par l'outil et non déduit : search_customer_reviews_sql répond « The database does not contain any customer reviews yet for this brand. No reviews have been uploaded or imported. This is not an access issue » ; aucune application d'avis sur Shopify, aucun métachamp d'avis, aucune fiche marketplace, aucun agrégateur. post-purchase-surveys — n'existe pas, confirmé par l'outil : totalResponsesForBrand 0. NPS — idem, aucun sondage. organic-social — aucune publication observable, aucun compte Instagram rattaché au compte publicitaire, search_and_manage_organic_social n'existe pas dans cette installation Parker. reddit — lecture directe refusée par le proxy réseau, 13 tentatives le 2026-09-06 par la passe community-and-forums, 4 de plus pour cette passe. other-reviews — Amazon.fr, Cdiscount, Trustpilot, Best Buy, Walmart tous refusés par le proxy. support-tickets — aucun outil de support, aucun ticket client dans 46 fils Gmail]
structured_fields_available: [Sur les 2 enregistrements clients : comment_id, message, created_time, like_count, comment_count, permalink_url, ad_ids, ad_names, post_ids, parent_comment_ids, comment_length, snapshot_date. Champs présents et vides sur les 2 : author_id, author_name. Champs inexistants sur cette source : note, SKU, âge, sexe, région, statut de premier acheteur, canal, appareil. Hors langage client, les champs structurés du périmètre portent sur des commandes et des annonces : Shopify order_id, order_date, first_name, last_initial, city, order_value, SKU ; Meta ad_id, ad_name, campaign_id, adset_id, created_date, spend, impressions, reach, clicks, ctr, cpc, cpm, purchases, roas, âge, sexe, plateforme, placement]
model_applied_tags: [Sur les 2 enregistrements clients, 4 tags posés à la main : sentiment, présence de langage exploitable, catégorie VoC d'appartenance, écho de marque. Aucun n'est un champ structuré, tous sont des jugements de modèle, et l'échantillon est de 2, ce qui les rend indicatifs et rien de plus. Sur le texte écrit par la marque, tous les tags portent le préfixe brand-projected : brand-projected-pain, brand-projected-outcome, brand-projected-metaphor, brand-projected-objection, brand-projected-aspiration, brand-projected-trigger, brand-projected-jargon, brand-projected-anti-language, plus era (tutoiement 2026-08-23 contre vouvoiement 2026-09-03) et fabricated-testimonial]
data_limitations: [LE CORPUS DE LANGAGE CLIENT COMPTE 2 ENREGISTREMENTS. Deux commentaires publicitaires, tirés en direct de Parker le 2026-09-06, qui répond total 2. L'un des deux, « Lol », ne porte aucun langage exploitable. Il reste donc UN SEUL verbatim client utilisable pour toute la marque. Toutes les mesures que cette passe devait produire, sentiment, distribution de notes, fréquences de thèmes, découpages par SKU, âge, région ou type d'acheteur, sont non calculables sur un échantillon de 2 et ne sont pas calculées. Détail par surface. Avis : 0, absence confirmée par l'outil Parker et non déduite. Sondages post-achat : 0, absence confirmée par l'outil. Commentaires publicitaires : 2 sur 163 annonces, 43 270 impressions et 1 084 clics côté Raselio seul, soit un taux de commentaire proche de zéro et deux commentaires sans aucune réponse de la marque. Forums et Reddit : 0 verbatim, toutes les lectures directes refusées, 13 le 2026-09-06 par une passe antérieure et 4 de plus aujourd'hui, dont en.wikipedia.org, ce qui montre que le blocage est global et non ciblé. Boîte mail : 46 fils lus, 1 message de formulaire, classé démarchage d'agence, donc 0 enregistrement client. Aucun verbatim de catégorie n'est atteignable non plus, pour la même raison réseau, donc l'axe de secours ne rend que des thèmes résumés par WebSearch. Le seul index de langage volumineux que ce document peut livrer est un index de langage écrit par la marque, mis en quarantaine et jamais présenté comme du langage client.]
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md]
---

# VoC corpus profile - Raselio

## Executive summary

**Le corpus de langage client de Raselio compte deux enregistrements. Deux commentaires publicitaires, et rien d'autre, sur toutes les surfaces, vérifié en direct.** Tout le reste de ce document découle de ce chiffre, et le travail utile a été de mesurer précisément la forme de ce presque-vide plutôt que de le combler.

Voici les cinq constats qui comptent.

**1. Le corpus tient en deux lignes, et une seule porte du langage.** Verified, tiré de Parker le 2026-09-06 avec le brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, qui renvoie `total: 2`. Les voici en entier.

> « Plus rien de la bête sauvage qui sommeille en nous. » Le 2026-08-31 à 15h46 UTC, sous l'annonce `52505820194591`, « RASELIO | IMPECCABLE | BOXER ». 0 like, 0 réponse.

> « Lol » Le 2026-09-01 à 15h37 UTC, sous l'annonce `52505897035991`, « EMOTION 3 - Barbe soignee et tes boules ». 0 like, 0 réponse.

Le second ne porte rien d'exploitable, trois caractères. Le premier est la seule phrase qu'un Français ait jamais adressée publiquement à cette marque, et c'est une bonne phrase : elle construit une image, la pilosité comme bête sauvage endormie, et elle formule en creux une résistance que rien dans les documents de la marque n'avait nommée, l'idée que se raser là revient à renoncer à quelque chose. Ce verbatim est entré dans deux bacs, les images et les objections, à confiance thin, sur un dénominateur de 2 enregistrements lus.

**2. Zéro avis et zéro sondage, et l'absence est confirmée par l'outil, pas déduite.** Verified. `search_customer_reviews_sql` répond en toutes lettres que la base ne contient aucun avis pour cette marque et que ce n'est pas un problème d'accès. `semantic_search_post_purchase_survey` renvoie `totalResponsesForBrand: 0`. La boutique n'a par ailleurs aucune application d'avis et aucun métachamp d'avis. La boucle se ferme donc en installant une collecte, pas en rebranchant un outil.

**3. Deux commentaires sur 43 270 impressions, c'est en soi une mesure.** Verified. Le compte Raselio a porté 163 annonces, 43 270 impressions et 1 084 clics entre le 2026-08-10 et le 2026-09-06. Il en sort deux commentaires, zéro like, zéro réponse de la marque. Ce n'est pas un problème d'accès, c'est une absence d'engagement réel, et elle dit quelque chose sur des créas statiques qui diffusent sans jamais provoquer. Sur un échantillon aussi petit, je le note comme une observation et pas comme un diagnostic.

**4. Ce que la marque possède à la place est un corpus de langage projeté, et il est dense.** Verified. Quatre surfaces de texte sur le site et 30 fiches créa du 2026-09-03 portant chacune un titre, un texte principal et le texte présent sur l'image, plus 9 concepts antérieurs du 2026-08-23. Cette matière est riche et souvent excellente. Elle n'est pas du langage client. C'est l'hypothèse que la marque se fait du langage de son client, et ce document la range en quarantaine sous l'étiquette `brand-projected`, jamais dans le bac client.

**5. Une partie de ce langage projeté est faussement attribuée à des clients, et l'équipe le sait.** Verified sur ses propres documents. Le brief du 2026-09-03 écrit : « Les créas 16, 17, 27 utilisent des prénoms fictifs de témoignage (Hervé D., Catherine) : à remplacer par de vrais avis clients dès que possible ». La créa 16 fait dire à « Hervé D. · Achat vérifié ★★★★★ » la phrase « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » Cette phrase est de la copie publicitaire. Elle a la forme exacte d'une pépite de mining et elle en a la séduction. Elle n'entre dans aucun bac de ce système, sous aucune condition.

**Le levier créatif le plus important que ce corpus révèle.** Un homme a répondu à une publicité de tondeuse intime par une blague sur la virilité qu'on taille, et personne n'a repris la balle. C'est le seul signal client réel de la marque et il pointe vers une résistance culturelle que ni la landing, ni l'advertorial, ni les 30 créas ne traitent : le poil comme quelque chose qu'on perd et pas seulement comme un problème qu'on règle. Sur un enregistrement, c'est une piste, pas une conclusion.

**La plus grosse limite du document.** Un dénominateur de 2. Tout ce qui suit décrit un presque-vide avec précision au lieu de décrire des clients.

## Source and data profile

**Enregistrements bruts reçus : 2. Enregistrements normalisés : 2. Doublons retirés : 0. Plage de dates : 2026-08-31 au 2026-09-01, soit deux jours.**

Le tableau ci-dessous est le vrai résultat de la passe. Chaque ligne dit ce qui a été visé, ce qui a été trouvé, et le motif exact de l'absence, parce que « non tiré », « n'existe pas » et « existe mais est illisible » appellent trois actions différentes.

| Surface visée | Enregistrements obtenus | Statut | Motif exact, au 2026-09-06 |
|---|---|---|---|
| Commentaires publicitaires Meta | **2** | **Tirés** | Parker MCP, brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, `search_facebook_ad_comments_sql` renvoie `total: 2`, confirmé par le pass sémantique qui déclare `totalCommentsAnalyzed: 2`. Corpus complet, pas un échantillon. |
| Avis boutique (Shopify) | 0 | N'existe pas | Confirmé par l'outil : `search_customer_reviews_sql` répond que la base ne contient aucun avis et que ce n'est pas un problème d'accès. Aucune application d'avis installée, aucun métachamp d'avis sur le produit. |
| Sondages post-achat | 0 | N'existe pas | Confirmé par l'outil : `totalResponsesForBrand: 0`. Aucun outil de sondage branché. |
| NPS | 0 | N'existe pas | Idem, aucun sondage. |
| Avis plateforme tierce | 0 | N'existe pas et illisible | Aucune fiche Raselio trouvée par 6 requêtes de marque. Trustpilot, Avis Vérifiés, Signal Arnaques refusés par le proxy. |
| Avis marketplace et retail | 0 | N'existe pas et illisible | Amazon.fr, Cdiscount, Best Buy, Walmart refusés par le proxy. |
| Commentaires organiques | 0 | N'existe pas | Aucune publication organique observable sur la page Facebook. Aucun compte Instagram rattaché au compte publicitaire, `ads_get_ig_accounts` renvoie une liste vide. `search_and_manage_organic_social` n'existe pas dans cette installation Parker. |
| Reddit et forums | 0 | Lecture refusée | 13 lectures directes refusées le 2026-09-06 par la passe `community-and-forums`. 4 tentatives de plus pour cette passe, 4 refus. |
| Tickets support | 0 | N'existe pas | Aucun outil de support. |
| Formulaire de contact | 0 | Existe mais n'est pas client | 46 fils Gmail lus. Un seul message de formulaire, du 2026-08-26, signé « Sodiq ». Les 4 messages suivants du même fil sont une offre commerciale de « Emprofit Solution » à faire croître la boutique contre 2 % de commission. Ce n'est pas un client. |
| Reddit via Parker | 0 | Outil inexistant | Aucun outil Reddit n'existe dans cette installation Parker. Une recherche d'outil sur le mot reddit ne renvoie aucune correspondance. Ce n'est pas un accès refusé, c'est une capacité absente. |
| Historique de conversations Parker | 0 | Vide | `search_chat_history` en mode listThreads renvoie 0 fil pour cette marque. Personne n'a encore parlé de Raselio à Parker, donc aucun contexte de conversation ne peut corriger ou compléter ce document. |
| Document de contexte de marque Parker | 1 document | Lu | `get_brand_persona` renvoie un document complet généré par Parker : positionnement, 5 profils clients types, langage de catégorie, paysage concurrentiel, voix de marque. Ce document contient des citations, et leur provenance est traitée plus bas. **Ce n'est pas une source de langage client de Raselio.** |

### Les deux enregistrements, en entier

| row_id | source | plateforme | date | annonce | texte verbatim | likes | réponses | longueur |
|---|---|---|---|---|---|---|---|---|
| `3c2ca5a3-6d53-5564-6fd8-f33d60753d83` | ad-comment | Facebook, page 1234695553067195 | 2026-08-31T15:46:58Z | `52505820194591` « RASELIO \| IMPECCABLE \| BOXER » | « Plus rien de la bête sauvage qui sommeille en nous. » | 0 | 0 | 51 |
| `b86f8833-cadf-bad9-8cfc-1f0c6893a98f` | ad-comment | Facebook, page 1234695553067195 | 2026-09-01T15:37:47Z | `52505897035991` « EMOTION 3 - Barbe soignee et tes boules » | « Lol » | 0 | 0 | 3 |

Les deux sont des commentaires de premier niveau, `parent_comment_ids` vide. Aucun des deux n'a reçu de réponse, `comment_count: 0` sur les deux. Les champs `author_id` et `author_name` sont vides sur les deux, donc rien n'est connu de qui a écrit, ni l'âge, ni le sexe, ni la région.

### Le taux de commentaire, mesuré

| Compteur | Valeur | Fenêtre |
|---|---|---|
| Annonces Raselio ayant tourné | 163 | 2026-08-10 → 2026-09-06 |
| Impressions Raselio | 43 270 | idem |
| Clics Raselio | 1 084 | idem |
| Commentaires reçus | 2 | idem |
| Commentaires par millier d'impressions | 0,046 | idem |
| Likes reçus | 0 | idem |
| Réponses de la marque | 0 sur 2 | idem |

Les totaux Raselio excluent la campagne `52505344998791`, qui appartient à la marque sœur Trael. Les lectures de compte qui portent 47 484 impressions ou 1 234 clics incluent Trael et ne doivent pas être mélangées à ces lignes.

**Le blocage réseau, refait aujourd'hui, parce qu'il conditionne l'axe de secours.** Quatre lectures directes tentées le 2026-09-06 pour cette passe : `www.bestbuy.com`, `shavercheck.com`, `www.walmart.com`, `en.wikipedia.org`. Les quatre renvoient `EGRESS_BLOCKED`. Le fait que Wikipédia soit refusé au même titre qu'Amazon dit que le blocage est global et non ciblé sur les surfaces d'avis. Le statut du proxy le confirme en clair : `gateway answered 403 to CONNECT`. Aucun verbatim de catégorie n'est atteignable.

**Ce que WebSearch peut et ne peut pas.** Six requêtes lancées le 2026-09-06 sur les avis de produits comparables, Manscaped Lawn Mower 5.0, Philips OneBlade Intimate, Meridian Trimmer, plus deux requêtes de vocabulaire français et une sur les plaintes récurrentes. L'outil répond. Il rend des résumés écrits par un petit modèle, jamais le texte source. La règle posée par la passe `community-and-forums` tient : une citation qui apparaît dans un résumé WebSearch est une paraphrase de l'outil tant qu'elle n'a pas été relue à la source, et la source est inatteignable. Le corpus de catégorie contient donc des thèmes, pas des verbatims.

### Le corpus de langage projeté par la marque, mesuré

Cette matière n'est pas du langage client et n'entre dans aucun compte ci-dessus.

| Surface | Enregistrements | Fenêtre | Statut de lecture |
|---|---|---|---|
| Description produit Shopify | 1 | à jour au 2026-09-06 | Verbatim complet, verified |
| Page « Notre Histoire » | 1, 4 paragraphes | à jour au 2026-09-06 | Verbatim complet, verified |
| Advertorial « 7 raisons pour lesquelles votre tondeuse à barbe n'a rien à faire sous la ceinture » | 1, 7 sections + encart offre | daté « Mis à jour le 31 août 2026 » | Verbatim complet, verified |
| Landing « 7 raisons de choisir Raselio » | 1, hero + 7 raisons + FAQ 8 questions | à jour au 2026-09-06 | Verbatim complet, verified |
| Fiches créa du lot du 2026-09-03 | 30, titre + texte principal + texte à l'image | 2026-09-03 | Verbatim complet via le manifeste de l'équipe, stated |
| Concepts créa du lot du 2026-08-23 | 9, headlines et textes visibles | 2026-08-23 | Verbatim complet, stated |
| Annonces Raselio dans le compte Meta | 163 | 2026-08-10 → 2026-09-06 | Copie lisible pour 30 fiches. Les 133 autres ne portent qu'un nom d'annonce, donc `creative read unavailable` |

Un nom d'annonce est une poignée d'inventaire, pas une lecture créative. « R07 Anti coupure 50 ans et plus » localise une annonce, il ne prouve pas ce qu'elle dit. Ces 133 lignes sont comptées, jamais citées.

### Ce que portent les 11 commandes

Verified : 11 commandes entre le 2026-08-26 et le 2026-09-04, 14 fiches clients, 0 client récurrent sur 11, 0 retour demandé, 0 réclamation. Une commande à 39,90 €, dix à 34,99 €. Ces enregistrements portent un prénom, une initiale, une ville, un montant et un SKU. Aucun ne porte une ligne de texte écrite par l'acheteur. Onze acheteurs et zéro mot d'eux : les deux seuls mots que la marque possède viennent de gens qui n'ont pas acheté.

### Distribution des notes

Impossible. Il n'y a aucune note, sur aucune surface, et les commentaires publicitaires n'en portent pas par nature. La marque affiche pourtant « 4,7/5 » et « (1 734 avis) » sur sa landing et « Noté 4,7/5 sur 1 734 avis » sur son bloc produit, verified sur l'export Shopify du 2026-09-06. Le dénominateur affiché est 1 734, le dénominateur réel est 0. Cet écart est traité dans `sub-context-docs/reputation-analysis.md` ; ici il compte pour une seule raison : il ne doit jamais être confondu avec une distribution de notes disponible.

## Normalized schema

Deux enregistrements ont été normalisés. Le modèle ci-dessous montre ce qu'ils portent et, surtout, ce qu'ils ne portent pas, parce que la liste des champs vides est ce qui limite toute analyse aval.

| Champ normalisé | Peuplé sur les 2 enregistrements | Nature | Note |
|---|---|---|---|
| `row_id` | 2 sur 2 | Fait structuré | `comment_id` renvoyé par Parker |
| `source_type` | 2 sur 2 | Fait structuré | `ad-comment` sur les deux |
| `platform` | 2 sur 2 | Fait structuré | Facebook, page 1234695553067195 |
| `source_native_id` | 2 sur 2 | Fait structuré | `facebook_comment_ids` |
| `date` | 2 sur 2 | Fait structuré | Précision à la seconde, ce qui est le meilleur champ du corpus |
| `text` | 2 sur 2 | Fait structuré | Le champ qui porte tout, et il porte 54 caractères en tout |
| `url` | 2 sur 2 | Fait structuré | Permaliens Facebook complets |
| `rating` | 0 sur 2 | Inexistant | Un commentaire publicitaire ne porte pas de note |
| `product_sku` | 0 sur 2 | Inexistant sur la source | Trivial par ailleurs : la marque n'a qu'un SKU, donc le champ serait constant et sans valeur de segmentation |
| `age`, `gender`, `region` | 0 sur 2 | Inexistant | `author_id` et `author_name` sont vides sur les deux. Rien n'est connu des auteurs. La ventilation d'âge du compte publicitaire décrit qui achète, jamais qui a écrit, et les deux ne doivent pas être joints |
| `channel`, `device` | 0 sur 2 | Inexistant | Idem |
| `buyer_type` | 0 sur 2 | Inexistant | Rien ne dit si l'un des deux auteurs a acheté |
| `ad_id`, `ad_name` | 2 sur 2 | Fait structuré | Le seul champ de contexte utile : il dit sous quelle créa la réaction est arrivée |

**Champs déduits du texte : aucun.** Sur deux enregistrements dont l'un fait trois caractères, aucune déduction de champ structuré n'est défendable. Les seuls jugements posés sont des tags de catégorie VoC, listés dans la section suivante et marqués comme jugements de modèle.

## Classification method

Quatre tags ont été posés à la main sur les deux enregistrements. Aucun n'est un champ structuré. L'échantillon est de 2, donc chaque tag est indicatif et ne peut porter aucun taux.

| row_id | Sentiment | Langage exploitable | Catégories VoC | Écho de marque |
|---|---|---|---|---|
| `3c2ca5a3…` « Plus rien de la bête sauvage qui sommeille en nous. » | Ambivalent, ni éloge ni plainte. Ironie affectueuse | Oui | Image et objection | false, aucune formulation approchante n'existe dans la copie de la marque |
| `b86f8833…` « Lol » | Neutre | Non | Aucune | false |

Les vingt lentilles que cette passe devait poser sur chaque ligne, motivation d'achat, cadeau ou achat pour soi, occasion d'usage, barrière, expérience produit, résultat, transformation, preuve sociale, fidélité, mention de publicité ou d'influenceur, recommandation, comparaison, confusion produit, inquiétude de prix, incident de livraison, suggestion d'amélioration, signal persona et les autres, sont toutes non renseignées : deux commentaires publicitaires ne contiennent aucune de ces informations.

Sur le texte écrit par la marque, les tags sont préfixés pour qu'aucune passe ultérieure ne puisse les confondre avec une lecture client : `brand-projected-pain`, `brand-projected-outcome`, `brand-projected-metaphor`, `brand-projected-objection`, `brand-projected-aspiration`, `brand-projected-trigger`, `brand-projected-jargon`, `brand-projected-anti-language`, plus `era` pour le registre de rédaction et `fabricated-testimonial` pour la copie qui se présente comme la parole d'un client identifié qui n'existe pas.

**Ce à quoi une passe aval peut faire confiance dans ce document.** Quatre choses : les deux verbatims et leurs métadonnées, tirés en direct de Parker ; les comptes de surfaces et leurs motifs d'absence ; les dénominateurs du compte publicitaire et de la boutique ; la liste verbatim du langage projeté avec sa date et sa surface. Rien d'autre. Le dénominateur de récurrence pour le langage client est de 2, ce qui veut dire qu'aucune récurrence supérieure à 1 n'est possible et qu'aucun motif ne peut être établi.

## Sentiment and rating profile

**Non calculable. L'échantillon est de 2 et l'un des deux enregistrements fait trois caractères.**

Sentiment global : non calculable. Distribution des notes : inexistante, la source ne porte pas de note. Sentiment par source : un seul type de source. Sentiment par SKU : un seul SKU. Sentiment dans le temps : deux jours consécutifs, aucune tendance. Thèmes positifs et négatifs les plus forts : aucun thème ne peut recurrer sur deux lignes.

La méthode demande de marquer thin tout ce qui repose sur moins de dix enregistrements. Ici tout repose sur deux, donc tout est thin, sans exception et par construction.

**Le point zéro, avec les seuls compteurs qui existent, tous verified au 2026-09-06.** C'est contre ce tableau que le prochain run mesurera un mouvement.

| Compteur | Valeur | Fenêtre |
|---|---|---|
| Enregistrements de langage client, toutes surfaces | 2 | 2026-08-31 → 2026-09-01 |
| Dont porteurs de langage exploitable | 1 | idem |
| Avis | 0 | depuis l'ouverture, 2026-07-23 |
| Sondages post-achat | 0 | idem |
| Note moyenne | inexistante | idem |
| Commandes | 11 | 2026-08-26 → 2026-09-04 |
| Clients récurrents | 0 sur 11 | 90 jours |
| Retours demandés | 0 | depuis l'ouverture |
| Réclamations | 0 | 46 fils Gmail lus |
| Annonces Raselio ayant tourné | 163 | 2026-08-10 → 2026-09-06 |
| Impressions Raselio | 43 270 | idem |
| Clics Raselio | 1 084 | idem |
| Achats attribués Meta | 6 | idem |
| Sessions boutique | 2 431 | 90 jours |
| Réponses de la marque aux commentaires | 0 sur 2 | idem |

## Motivation and trigger profile

**Data-limited. Aucune motivation d'achat et aucun déclencheur ne sont observés.** Les deux enregistrements du corpus sont des réactions à une publicité, pas des récits d'achat, et rien ne dit que leurs auteurs aient acheté quoi que ce soit.

Ce que la méthode voudrait compter ici, motivations, tâches à accomplir, moments de bascule, mentions de publicité ou d'influenceur, recommandations, comparaisons, urgence, remise, mauvaise expérience antérieure, appelle un corpus de récits d'achat. Il n'y en a pas.

**Ce qui existe à la place, et qui n'est pas la même chose.** Deux signaux structurés, utiles et muets sur le pourquoi. Le premier est la ventilation d'âge du compte : sur l'intégralité de l'historique, les achats attribués viennent d'hommes de 45 ans et plus, cœur 55 à 64 ans, stated d'après la lecture de l'équipe du 2026-09-03, et le pull du 2026-09-06 en compte 6 sur le périmètre Raselio. C'est une lecture de qui achète, pas de pourquoi. Le second est la structure de la demande côté site : 2 431 sessions sur 90 jours, 11 commandes, aucun panier récurrent. Là encore, un comportement, pas une raison.

**Le déclencheur que la marque suppose, à ranger comme hypothèse.** L'advertorial met en scène un moment précis : « Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées. » C'est un déclencheur écrit par la marque, classé `brand-projected-trigger`, et il attend toujours d'être confirmé ou démenti.

## Gifting, usage, and occasion profile

**Data-limited. Aucune part de cadeau, aucune relation de destinataire, aucune occasion et aucun usage familial ne sont observés.**

Le champ « acheté pour offrir » n'existe sur aucune surface de la boutique, aucun acheteur n'a écrit, et les deux commentaires ne parlent ni d'usage ni d'occasion. La part de cadeau est inconnue, pas nulle, et la distinction compte : écrire 0 % serait une invention.

**Ce que la marque a misé sur ce terrain, en quarantaine.** Deux créas du lot du 2026-09-03 posent l'hypothèse cadeau, et l'équipe la nomme comme une initiative issue de sa lecture des données plutôt que d'un signal client : la créa 28, « Le cadeau qu'il ne s'offrira jamais lui-même. », dont le texte principal dit « Il n'osera jamais se l'acheter. Vous, si. », avec un ad set femmes 45 à 60 ans prévu. C'est un pari de ciblage, pas une part de marché observée.

## Objections and barriers profile

**Une objection observée, sur un dénominateur de 2. Aucune inquiétude de prix, aucune confusion produit, aucun incident de livraison ou de service n'est observé.**

**L'objection observée, verbatim et datée.** « Plus rien de la bête sauvage qui sommeille en nous. », le 2026-08-31 à 15h46 UTC, sous l'annonce « RASELIO | IMPECCABLE | BOXER ». Ce n'est pas un doute sur le fonctionnement du produit. C'est une résistance à sa proposition même : l'idée que se raser cette zone revient à perdre quelque chose. Elle est formulée par la blague, ce qui est la façon dont ce genre de réticence se dit en public. Recurrence 1 sur un corpus de 2, confiance thin, écho de marque false. Aucune surface de la marque, ni la landing, ni l'advertorial, ni les 30 créas, ne traite cette résistance.

**Ce que ce document ne fait pas.** Il ne promeut pas ce commentaire au rang de motif. Un enregistrement est un candidat, jamais un patron, et la méthode est nette là-dessus. Il est enregistré, daté, et il attend d'être corroboré ou démenti quand le corpus grandira.

**La barrière la plus lourde reste visible dans le compte et pas dans une phrase.** Stated d'après l'équipe : CTR de 3,02 % sur la campagne principale, taux de conversion site autour de 0,2 %, CPA d'environ 86 € pour un point mort à 21 €, et sa conclusion écrite, « Le vrai problème est post-clic ». Environ 1 073 personnes ont cliqué et ne sont pas allées au bout. Deux d'entre elles ont commenté. Les autres n'ont rien dit.

## Product experience and outcome profile

**Data-limited. Aucune expérience produit rapportée par un utilisateur n'existe.**

Aucune fonctionnalité louée, aucune fonctionnalité critiquée, aucune première impression, aucune lecture de facilité d'usage, de durabilité, de design ou de performance, aucune attente dépassée ou déçue, aucun signal de problème résolu. Onze appareils ont été livrés et pas un retour d'usage n'est écrit nulle part. Les deux commentaires du corpus sont des réactions à une publicité et rien ne dit que leurs auteurs aient tenu l'objet dans la main.

**Ce qui est vérifié sur le produit, et qui n'est pas une expérience.** Verified sur la fiche Shopify : tête arrondie, lames céramique, éclairage LED intégré, sabot réglable 3 hauteurs, 100 % étanche, sans fil sur socle, garantie 2 ans, satisfait ou remboursé 30 jours. Deux specs sont marquées « à confirmer » par l'équipe elle-même dans son document Grümwise, le régime moteur et l'autonomie exacte, alors que le site annonce environ 90 minutes.

**Le risque que ce vide crée.** Le gouverneur de conformité de revendication se règle normalement contre ce que les clients rapportent. Ici il ne peut se régler que contre la fiche produit, donc toute promesse de résultat que la marque écrit est non substantiée par l'usage et doit être marquée `gated` par défaut dans la bibliothèque assemblée.

## Transformation and impact profile

**Data-limited. Aucune transformation rapportée n'existe.**

Aucun récit avant et après écrit par un client, aucun changement de routine, aucun changement de comportement, aucun gain de confiance, aucun effet sur une relation, aucun résultat chiffré, aucune recommandation, aucun réachat, aucun abandon.

**La transformation existe pourtant, écrite en entier, par la marque.** Et c'est là que le risque est le plus grand pour un run futur, parce que la matière est belle. L'advertorial construit un arc complet : l'état de départ, « chaque passage se fait les dents serrées » ; le mécanisme, « une lame en acier qui chauffe tire le poil avant de le couper » ; l'état d'arrivée, « Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve. » ; et la scène de couple, portée par les attributs alt des images, « Lui au bout du lit, elle sous la couette » puis « Le couple réconcilié, câlin sur le lit ».

C'est un arc de qualité professionnelle et il est entièrement `brand-projected`. La méthode appelle « concept de revue entière » une revue dont l'arc complet devient l'actif publicitaire, et prévient que ces pièces sont rares et à haut levier. Le piège est symétrique : un arc parfaitement écrit qui n'a jamais eu de narrateur réel ressemble exactement à la pièce rare que le système cherche. Il ne l'est pas.

## Language and creative-asset index

**Index de citations client : une entrée.**

| Type de citation | Verbatim | row_id | Surface | Date | Note |
|---|---|---|---|---|---|
| Pépite, image, objection | « Plus rien de la bête sauvage qui sommeille en nous. » | `3c2ca5a3-6d53-5564-6fd8-f33d60753d83` | Commentaire publicitaire Facebook, annonce `52505820194591` « RASELIO \| IMPECCABLE \| BOXER » | 2026-08-31 | Le seul verbatim client de la marque. Construit une image, la pilosité comme bête sauvage endormie, et porte une résistance à la proposition. Récurrence 1 sur 2. Confiance thin. Écho de marque false |
| Sans langage exploitable | « Lol » | `b86f8833-cadf-bad9-8cfc-1f0c6893a98f` | Commentaire publicitaire Facebook, annonce `52505897035991` « EMOTION 3 - Barbe soignee et tes boules » | 2026-09-01 | Trois caractères. Compté dans le corpus, ne produit aucune entrée |

Zéro phrase de douleur, zéro phrase de résultat, zéro déclencheur, zéro jargon, zéro contre-langage, zéro valeur aberrante, zéro concept de revue entière écrits par un client.

**Index de langage projeté par la marque : peuplé, et mis en quarantaine.** Ce qui suit est du texte écrit par Raselio pour Raselio. Ce n'est pas du langage client et aucun élément d'ici n'a le droit d'être présenté comme une citation. Chaque ligne porte sa surface et sa date.

| Type projeté | Verbatim de la marque | Surface | Date |
|---|---|---|---|
| Douleur | « Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées. » | Advertorial, section 1 | 2026-08-31 |
| Douleur | « Personne n'en parle, mais tout le monde la connaît : cette micro-hésitation avant de poser la lame. Ce réflexe de contracter tout le corps. » | Advertorial, section 2 | 2026-08-31 |
| Douleur | « Et 72 heures plus tard, la zone est couverte de petits boutons rouges et de poils incarnés. » | Advertorial, section 3 | 2026-08-31 |
| Douleur | « Soyons honnêtes : cette zone, vous ne la voyez jamais entièrement. Vous devinez, vous passez la tondeuse au jugé. » | Advertorial, section 4 | 2026-08-31 |
| Douleur | « Deux jours de peau lisse, puis une semaine de repousse dure qui gratte, qui pique, et qui se remarque. » | Advertorial, section 5 | 2026-08-31 |
| Douleur | « Ça pique 3 jours après ? Vous rasez trop court. » | Créa 15, titre Meta | 2026-09-03 |
| Douleur | « Vous retenez votre souffle. Vous vérifiez au toucher. Ça pique 3 jours après. » | Créa 19, texte principal | 2026-09-03 |
| Douleur | « Ce n'est pas la flemme. C'est la logistique : s'installer dans la salle de bain, trouver le bon moment, et finir par retrouver des poils sur le lavabo. » | Advertorial, section 6 | 2026-08-31 |
| Résultat | « Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve. » | Advertorial, section 2 | 2026-08-31 |
| Résultat | « Fini le jugé. Vous voyez, donc vous maîtrisez. » | Advertorial, section 4 | 2026-08-31 |
| Résultat | « C'est exactement la différence entre « je me suis rasé » et « je suis entretenu ». » | Advertorial, section 5 | 2026-08-31 |
| Résultat | « 0 coupure. 0 stress. 100 % contrôle. » | Créa 06, titre Meta | 2026-09-03 |
| Image | « Utiliser le même outil pour les deux, c'est découper au cutter ce qui demande un scalpel. » | Advertorial, section 1 | 2026-08-31 |
| Image | « Cette séance qui ressemble plus à du déminage qu'à de l'entretien. » | Advertorial, section 2 | 2026-08-31 |
| Image | « Vous ne feriez pas ça à un kiwi. » puis « Alors pourquoi à vous ? » | Créa 05, titre Meta et texte image | 2026-09-03 |
| Image | « Elle épouse les reliefs au lieu de les attaquer. » | Advertorial, section 2 | 2026-08-31 |
| Objection | « Ma tondeuse à barbe ne suffit-elle pas ? » | Landing « 7 raisons », FAQ question 1 | 2026-09-06 |
| Objection | « Est-elle adaptée aux testicules et aux zones sensibles ? » | Landing « 7 raisons », FAQ question 2 | 2026-09-06 |
| Objection | « La confiance en soi ne devrait pas être un pari à 75 €. » | Advertorial, section 7 | 2026-08-31 |
| Aspiration | « JE VEUX ÊTRE SEREIN » | Advertorial, bouton d'appel à l'action | 2026-08-31 |
| Aspiration | « La confiance, ça se prépare avant le moment où on en a besoin. » | Advertorial, encart offre | 2026-08-31 |
| Déclencheur | « Ce soir. » manuscrit sur post-it | Créa 11, texte présent sur l'image | 2026-09-03 |
| Déclencheur | « Précisément la semaine où vous auriez préféré être présentable. » | Advertorial, section 3 | 2026-08-31 |
| Jargon | « repousse qui pique », « poils incarnés », « rasage à blanc », « sabot 3 hauteurs », « lames céramique », « tête arrondie » | Landing, advertorial, fiche produit | 2026-08-31 → 2026-09-06 |
| Contre-langage | « Vous ne payez pas la pub. Vous payez la lame. » et « Pas d'influenceurs. Pas d'abonnement. » | Créa 08, titre et texte image | 2026-09-03 |
| Registre | « Vos couilles sont une zone sensible. Votre tondeuse à barbe l'ignore. » | Advertorial, titre section 1 | 2026-08-31 |
| Registre | « Le maillot, le pubis, l'aine, l'entrejambe… » | Page « Notre Histoire » | 2026-09-06 |

**Témoignages fabriqués, listés pour être bannis, jamais pour être utilisés.** Verified sur les documents de l'équipe.

| Copie | Créa | Ce que l'équipe en dit |
|---|---|---|
| « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » attribuée à « Hervé D. · Achat vérifié ★★★★★ » | 16 | « à remplacer par de vrais avis clients dès que possible » |
| « Catherine ❤️ / T'as fait quoi de différent ? / Rien. / (Raselio.) » présenté comme une capture de SMS | 17 | idem |
| « 58 ans. Fini de retenir ma respiration. » sur une pancarte tenue par un homme de 58 ans | 27 | idem |
| « Bernard L. » et « Bernard, 61 ans » avec citation inventée | W12, N08 | « Remplace par un avis réel » |
| Advertorial signé « Par Julien M. », « Mis à jour le 31 août 2026 » | page advertorial | aucune personne de ce nom n'existe dans une source |

Aucune de ces lignes n'entre dans une passe d'extraction, y compris sous l'étiquette `brand-projected`. Elles constituent une catégorie à part, `fabricated-testimonial`, dont la seule fonction est d'être reconnue et écartée.

**Langage de catégorie, deuxième source, et il faut être précis sur ce qu'elle est.** `get_brand_persona` renvoie un document de contexte de marque généré par Parker, et sa section « Customer Language » contient des phrases entre guillemets. Le document dit lui-même d'où elles viennent : « Based on competitive review analysis and category-level customer language ». Autrement dit ce sont des avis de clients d'autres marques, en anglais, rassemblés par une passe de recherche antérieure.

**Ce qui leur manque, et c'est décisif pour leur poids.** Aucune ne porte le nom de la marque dont elle vient. Aucune ne porte de date. Aucune ne porte de lien. La méthode de mining est nette sur ce point : une citation sans date est une preuve affaiblie, surtout pour tout ce qui touche la coupe, la peau, la qualité ou le prix. Ici il manque la date **et** la marque **et** la source. Je les enregistre parce qu'elles sont du vrai langage de catégorie et qu'elles valent mieux qu'un résumé de moteur de recherche. Je les marque `stated`, `thin`, provenance incomplète, et elles ne peuvent servir ni de preuve, ni de citation attribuable, ni de langage de client de Raselio.

| Verbatim, tel qu'écrit dans le document Parker | Ce qu'il porte | Provenance |
|---|---|---|
| « Taking any type of razor or trimmer to your nether regions can be daunting and time consuming. » | Douleur d'appréhension et de temps | Document de contexte Parker, section Customer Language, tiré le 2026-09-06. Marque, date et lien inconnus |
| « I'm sure many men can relate to finishing a trim session with a few nicks and cuts. » | Douleur de coupure, formulée comme une expérience partagée | Idem |
| « The small head moved in and out of crevices easily, and felt very safe with no risk of pain. » | Résultat de sécurité et de maniabilité | Idem |
| « No pulling or tugging of hair. » | Résultat, absence de tirage | Idem |
| « It is handy for obscure places and so far it has not nicked me. » | Résultat, prudence dans la formulation, « so far » | Idem |
| « I feel more clean, cool, and confident — plus the wife likes it. » | Résultat, lie le ressenti personnel au regard de la partenaire | Idem. C'est la ligne qui converge le plus avec ce que Raselio met en scène |
| « Game changer » | Expression de conversion, désignée comme la plus courante de la catégorie | Idem |
| « Bought this less than a year ago and never used it under the water. When I finally did it broke. It is not waterproof at all. » | Plainte de durabilité et d'étanchéité non tenue | Idem. Objection directe pour un produit qui vend le 100 % étanche |
| « Not a very robust trimmer » | Plainte de qualité de fabrication à bas prix | Idem |
| « This shaver is bulky and does not have the same feel and closeness as the One-Blade. » | Comparaison intra-catégorie | Idem |
| « Better than expected — great for sensitive areas » | Attente basse dépassée | Idem |
| « For a man who grooms occasionally, the Meridian delivers 80% of the result at less than half the price. » | Comparaison de valeur | Idem. La seule qui nomme une marque |

**Langage de catégorie, première source : thèmes seulement, aucun verbatim.** Six requêtes WebSearch le 2026-09-06, quatre lectures directes tentées, quatre refusées.

| Thème de catégorie | Marque concernée | Source | Statut |
|---|---|---|---|
| La peur de la coupure et de l'accroc est le premier critère de choix rapporté | Manscaped Lawn Mower 5.0 | résumé WebSearch de pages d'avis Best Buy et Walmart | Paraphrase d'outil, source non ouverte |
| Les lames émoussées sont désignées comme la vraie cause des coupures, plus que la technique | Philips OneBlade, Manscaped | résumé WebSearch de tests et comparatifs | Paraphrase d'outil |
| Le compromis rasage de près contre sécurité est le débat central de la catégorie | Philips OneBlade Intimate | résumé WebSearch d'un comparatif français | Paraphrase d'outil |
| Les démangeaisons apparaissent 24 à 72 heures après le rasage, au moment de la repousse | catégorie, contenus Braun et Gillette | résumé WebSearch | Paraphrase d'outil. Converge avec la fenêtre de 3 jours mise en avant par Raselio |
| Le modèle par abonnement et le prix sont le point de friction dominant des plaintes | Manscaped | résumé WebSearch de Trustpilot et PissedConsumer | Paraphrase d'outil |
| Des fragments entre guillemets attribués à des acheteurs vérifiés remontent dans un résumé | Meridian Grooming | résumé WebSearch | **Non confirmés à la source, sans date, sur une page marchande contrôlée par la marque. Traités comme non vérifiés et non repris comme citations** |

## Data limitations

**La limite principale, en une phrase : le dénominateur est 2, et un seul des deux enregistrements porte du langage.** Tout ce qui suit détaille cette limite.

**Sources manquantes, par nature de manque.** Deux natures qui appellent deux actions différentes. Celles qui n'existent pas, confirmé par l'outil et non déduit : avis, sondages post-achat, NPS, tickets de support. La boucle se ferme en installant une collecte. Celles qui existent et n'ont pas pu être lues : fils Reddit et forums, avis marketplace de la catégorie, publications organiques. La boucle se ferme en ouvrant un accès réseau ou en publiant.

**Ce qui a changé aujourd'hui et qui doit être noté pour le prochain run.** La marque existe désormais dans Parker MCP, brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, org « Dylan's Org ». Les passes antérieures de ce build, notamment `reputation-analysis` et `community-and-forums`, ont été écrites quand ce n'était pas le cas et portent la mention « la marque n'existe pas dans Parker ». Cette mention est périmée depuis le 2026-09-06 et leurs blancs sur les commentaires publicitaires sont désormais fermés par ce document.

**Ce que l'ouverture de Parker n'a pas débloqué.** Trois choses, et il faut les nommer pour que personne ne relance ces pistes en croyant qu'elles sont maintenant ouvertes. Les avis et les sondages restent à zéro, et l'outil dit lui-même que ce n'est pas un problème d'accès mais une base vide. Aucun outil Reddit n'existe dans cette installation Parker, ce qui est une capacité absente et non un accès refusé. L'historique de conversations Parker pour cette marque est vide, 0 fil, donc aucun échange antérieur ne peut compléter ce document.

**Le document de contexte de marque Parker, et le piège qu'il porte.** `get_brand_persona` renvoie un document riche et bien écrit qui contient une section « Customer Language » avec une douzaine de phrases entre guillemets. Ces phrases ne sont pas des clients de Raselio, le document le dit lui-même, et elles n'ont ni marque d'origine, ni date, ni lien. Le risque est le même que pour les faux témoignages de l'équipe : une phrase entre guillemets dans un document d'apparence officielle ressemble à une preuve. Elle ne l'est pas ici, et ce document les range en langage de catégorie à provenance incomplète, jamais en langage client. Le même document propose aussi cinq profils clients types nommés, Thomas, Nabil, Sandrine, Damien et Lucas. Ce sont des personas écrits par Parker, pas des slugs canoniques, et la bibliothèque VoC n'a pas le droit d'inventer de slug, donc aucun tag d'identité n'a été posé à partir d'eux.

**Le blocage réseau reste total.** Quatre lectures directes tentées le 2026-09-06 pour cette passe, quatre `EGRESS_BLOCKED`, dont Wikipédia. Le statut du proxy renvoie `gateway answered 403 to CONNECT`. Aucun verbatim de catégorie n'est atteignable, donc l'axe de secours ne donne que des thèmes résumés par un outil.

**Champs peuplés, côté client.** Six champs sur douze : identifiant, type de source, plateforme, date, texte, lien, plus l'annonce d'origine. Six champs absents et importants : note, SKU, âge, sexe, région, statut d'acheteur. Les auteurs des deux commentaires sont anonymes, `author_id` et `author_name` vides sur les deux, donc rien n'est connu d'eux.

**Taille d'échantillon.** Le seuil de la méthode, marquer thin en dessous de dix enregistrements, s'applique à la totalité du corpus. Aucune récurrence supérieure à 1 n'est possible sur deux lignes, donc aucun motif ne peut être établi. Les 11 commandes et les 6 achats attribués sont eux aussi des échantillons minuscules et sont écrits comme tels.

**Biais de source, dans les deux sens.** Les deux enregistrements clients viennent d'une seule surface, les commentaires publicitaires, où les gens réagissent à une publicité et pas à un produit qu'ils ont utilisé. Le corpus textuel volumineux est écrit par la marque, donc biaisé à 100 % vers ce qu'elle croit. Le corpus de catégorie est un résumé d'index américain, biaisé vers l'anglophone et vers les grandes marques américaines.

**Ère produit.** La marque a connu trois configurations en six semaines, kit Cutlab, kit Raselio Pro™, puis tondeuse seule, et deux prix, 39,90 € puis 34,99 €. Les deux commentaires datent de l'ère actuelle, fin août et début septembre, donc l'ère est propre pour eux. Les deux ères antérieures n'ont aucun enregistrement.

**Pas de visibilité LTV ni réachat.** 0 client récurrent sur 11, SKU unique, aucun abonnement.

**Aucune trajectoire.** Première version de ce document. Le tableau de compteurs de la section sentiment est le point zéro.

---

**Méthodes chargées pour cette passe :** `parker-system/creative-strategy-context/customer-review-mining-method.md` et `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md`, lues avant l'analyse et appliquées de bout en bout : les trois détecteurs séparés, la règle qu'un compte n'est pas une significativité sans dénominateur, la règle qu'une citation sans date est une preuve affaiblie, la liste d'exclusion, le repérage de l'écho de marque, le marquage d'ère, la discipline de couverture de sources et la discipline d'intégrité des données.

This is everything I know about mining customer reviews for creative material.
