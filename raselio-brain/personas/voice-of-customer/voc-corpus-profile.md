---
brand: raselio
doc: voc-corpus-profile
generated_on: 2026-09-06
refresh_by: 2026-12-06
raw_records_received: 0
normalized_records: 0
deduplicated_records_removed: 0
date_range: aucune, le corpus est vide
sources_read: [shopify-store-and-product.md (4 surfaces de texte de marque, 6 politiques, 1 fiche produit), shopify-orders-and-customers.md (11 commandes, 14 fiches clients), shopify-analytics.md (8 requêtes ShopifyQL, 2 431 sessions sur 90 jours), meta-ads-all.md (183 lignes annonce dont 163 Raselio), meta-account-campaigns-adsets.md, meta-account-breakdowns.md, meta-performance-trend.md, gmail-brand-signals.md (46 fils sur la requête `raselio OR cutlab`, corps complets de 8 fils), drive-30-statiques-meta-plan-2026-09-03.md (30 fiches créa complètes), drive-30-creas-json-2026-09-03.md (30 enregistrements titre + texte principal), drive-30-creas-meta-index-2026-09-03.md, drive-9-ads-statiques-prompts-2026-08-23.md (9 concepts, ère tutoiement), drive-higgsfield-prompts-final-2026-09-03.md, drive-30-statiques-generees-2026-09-04.md, sub-context-docs/reputation-analysis.md, sub-context-docs/community-and-forums.md, sub-context-docs/customer-journey-and-persona-discovery.md, running-notes/brand-rules.md, WebSearch (6 requêtes lancées le 2026-09-06 sur les avis de la catégorie), WebFetch (4 tentatives le 2026-09-06, 4 échecs)]
expected_sources_missing: [customer-reviews — n'existe pas, aucune application d'avis installée sur Shopify, aucun métachamp d'avis, aucune fiche marketplace, aucun agrégateur ; post-purchase-surveys — n'existe pas, aucun outil de sondage branché et Parker MCP ne couvre pas cette marque ; NPS — n'existe pas ; ad-comments — NON TIRÉS, les 163 annonces Raselio ont porté 43 270 impressions et 1 084 clics et pas un commentaire n'a été ouvert, faute de brand_id Parker ; organic-social — aucun handle Instagram, TikTok ou YouTube connu, seule une page Facebook id 1234695553067195 est nommée, aucun post ni commentaire lu ; reddit — accès Parker inexistant et lecture directe refusée par le proxy réseau ; other-reviews — Amazon.fr, Cdiscount, Trustpilot, Avis Vérifiés, Signal Arnaques, Best Buy, Walmart tous refusés par le proxy ; support-tickets — aucun outil de support, la boîte fondateur ne contient aucun ticket client]
structured_fields_available: [aucun champ structuré d'avis client n'existe. Les seuls champs structurés du périmètre portent sur des commandes et des annonces, pas sur du langage client : Shopify order_id, order_date, first_name, last_initial, city, order_value, SKU ; Meta ad_id, ad_name, campaign_id, adset_id, created_date, spend, impressions, reach, clicks, ctr, cpc, cpm, purchases, roas, âge, sexe, plateforme, placement. Aucun de ces champs ne porte de texte écrit par un client.]
model_applied_tags: [aucun tag n'a été appliqué à un enregistrement client, parce qu'il n'y a aucun enregistrement client à taguer. Les seuls tags posés par ce document le sont sur du texte écrit par la marque et portent tous le préfixe brand-projected : brand-projected-pain, brand-projected-outcome, brand-projected-metaphor, brand-projected-objection, brand-projected-aspiration, brand-projected-trigger, brand-projected-jargon, brand-projected-anti-language, ère de rédaction (tutoiement 2026-08-23 contre vouvoiement 2026-09-03), et témoignage fabriqué. Ce sont des jugements de modèle sur de la copie de marque, jamais des lectures de langage client.]
data_limitations: [LE CORPUS DE LANGAGE CLIENT EST VIDE. 0 enregistrement normalisé sur 0 enregistrement brut reçu. Ce n'est pas une passe partielle, c'est une passe sans matière première, et tous les chiffres du document tournent autour de ce zéro. Détail par surface. Avis : 0, et l'absence est vérifiée à la source, pas supposée, puisque la boutique n'a aucune application d'avis et aucun métachamp d'avis. Sondages post-achat : 0, aucun outil branché. Commentaires publicitaires : jamais tirés, ce qui est différent de zéro commentaire, et c'est le trou le plus rattrapable du document. Forums et Reddit : 0 verbatim, 13 lectures directes refusées le 2026-09-06 par une passe antérieure, 4 lectures de plus tentées aujourd'hui et refusées, dont en.wikipedia.org, ce qui montre que le blocage est total et pas ciblé. Boîte mail : 46 fils lus, 1 message de formulaire de contact, classé démarchage d'agence par la passe Gmail, donc 0 enregistrement client. Conséquence : aucun taux de sentiment, aucune distribution de notes, aucune fréquence de thème, aucun découpage par SKU, âge, région ou type d'acheteur ne peut être calculé, et aucun ne l'est. Les sections sentiment, motivation, cadeau, objection, expérience produit et transformation sont data-limited de bout en bout. Le seul index de langage que ce document peut livrer est un index de langage écrit par la marque, mis en quarantaine et jamais présenté comme du langage client.]
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md]
---

# VoC corpus profile - Raselio

## Executive summary

**Le corpus de langage client de Raselio est vide. Zéro enregistrement, sur toutes les surfaces, vérifié.** Tout le reste de ce document découle de ce fait, et le travail utile a été de mesurer précisément la forme de ce vide plutôt que de le combler.

Voici les cinq constats qui comptent.

**1. Zéro avis client existe, et l'absence est vérifiée à la source.** Verified. La boutique Shopify `8piiys-jj.myshopify.com` ne porte aucune application d'avis, aucun métachamp d'avis, et aucune fiche marketplace ni aucun agrégateur ne rend Raselio. Ce n'est pas « les avis n'ont pas pu être tirés ». C'est « il n'y a rien à tirer ». La différence est importante pour le prochain run : la boucle se ferme en installant une collecte, pas en rebranchant un outil.

**2. Le vide n'est pas anormal pour l'âge de la marque, et le dire est plus honnête que de le déplorer.** Verified. La boutique a 46 jours d'existence commerciale au 2026-09-06, 11 commandes et 0 client récurrent sur 11. Un corpus d'avis à ce stade serait suspect, pas rassurant. La question utile n'est pas « pourquoi n'y a-t-il pas d'avis », c'est « qu'est-ce qui est en place pour qu'il y en ait dans trente jours », et la réponse est rien.

**3. La surface de langage client la plus grosse existe déjà et n'a jamais été ouverte : les commentaires publicitaires.** Verified sur le compte, data-limited sur le contenu. Les 163 annonces Raselio du compte 1573950771030463 ont porté 43 270 impressions et 1 084 clics entre le 2026-08-10 et le 2026-09-06. Des Français ont réagi sous ces annonces. Pas un commentaire n'a été lu, parce que Parker MCP ne connaît pas cette marque au 2026-09-06 et que `get_available_brands` renvoie une liste d'organisations vide. C'est le seul endroit du périmètre où du langage client réel existe aujourd'hui, gratuit, en français, et déjà écrit.

**4. Ce que la marque possède à la place, c'est un corpus de langage projeté, et il est dense.** Verified. Quatre surfaces de texte sur le site et 30 fiches créa du 2026-09-03 portant chacune un titre, un texte principal et le texte présent sur l'image, plus 9 concepts antérieurs du 2026-08-23. Cette matière est riche, précise et souvent excellente. Elle n'est pas du langage client. C'est l'hypothèse que la marque se fait du langage de son client, et ce document la range en quarantaine sous l'étiquette `brand-projected`, jamais dans le bac client.

**5. Une partie de ce langage projeté est faussement attribuée à des clients, et l'équipe le sait.** Verified sur ses propres documents. Le brief du 2026-09-03 écrit lui-même : « Les créas 16, 17, 27 utilisent des prénoms fictifs de témoignage (Hervé D., Catherine) : à remplacer par de vrais avis clients dès que possible ». La créa 16 fait dire à « Hervé D. · Achat vérifié ★★★★★ » la phrase « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » Cette phrase est de la copie publicitaire. Elle a la forme exacte d'une pépite de mining et elle en a la séduction. Elle n'entre dans aucun bac de ce système, sous aucune condition, et ce document la nomme pour que personne ne la reprenne par erreur dans six mois.

**Le levier créatif le plus important que ce corpus révèle.** Il est négatif et il est le seul honnête : aucune décision de messaging ne peut aujourd'hui s'appuyer sur du langage client chez Raselio, donc chaque angle qui tourne est une hypothèse non testée. Le compte le montre déjà : CTR de 3,02 % sur la campagne principale contre un taux de conversion site d'environ 0,2 %, stated d'après la lecture de l'équipe. Les gens cliquent sur le langage projeté et n'achètent pas. Le corpus vide est exactement l'explication candidate la plus simple de cet écart, et il ne peut pas être vérifié tant qu'il reste vide.

**La plus grosse limite du document.** Il n'y a pas de corpus. Tout ce qui suit décrit un vide avec précision au lieu de décrire des clients.

## Source and data profile

**Enregistrements bruts reçus : 0. Enregistrements normalisés : 0. Doublons retirés : 0.** Il n'y a pas de plage de dates, parce qu'il n'y a pas de dates.

Le tableau ci-dessous est le vrai résultat de la passe. Chaque ligne dit ce qui a été visé, ce qui a été trouvé, et le motif exact de l'absence, parce que « non tiré » et « n'existe pas » appellent deux actions différentes.

| Surface visée | Enregistrements obtenus | Statut | Motif exact, au 2026-09-06 |
|---|---|---|---|
| Avis boutique (Shopify) | 0 | N'existe pas | Aucune application d'avis installée, aucun métachamp d'avis sur le produit `gid://shopify/Product/15882947854667`. Verified sur l'export. |
| Avis plateforme tierce | 0 | N'existe pas | Aucune fiche Raselio sur un agrégateur trouvée par 6 requêtes de marque. |
| Avis marketplace et retail | 0 | N'existe pas et illisible | Amazon.fr et Cdiscount refusés par le proxy réseau. Aucune fiche trouvée par recherche. |
| Sondages post-achat | 0 | N'existe pas | Aucun outil de sondage branché sur la boutique. Parker MCP ne couvre pas la marque. |
| NPS | 0 | N'existe pas | Idem. |
| Commentaires publicitaires Meta | 0 | **NON TIRÉS** | 163 annonces Raselio, 43 270 impressions, 1 084 clics. Parker MCP n'a pas de brand_id pour Raselio ; `get_available_brands` renvoie une liste d'organisations vide. Les commentaires existent probablement et n'ont jamais été ouverts. |
| Commentaires organiques | 0 | Non tirés | Aucun handle Instagram, TikTok ou YouTube nommé dans une source. Seule une page Facebook id 1234695553067195 est connue. |
| Reddit et forums | 0 | Lecture refusée | 13 lectures directes refusées le 2026-09-06 par la passe `community-and-forums`. 4 tentatives de plus aujourd'hui, 4 refus. |
| Tickets support | 0 | N'existe pas | Aucun outil de support. La boîte fondateur ne porte aucun ticket. |
| Formulaire de contact | 0 | Existe mais n'est pas client | 46 fils Gmail lus sur `raselio OR cutlab`. Un seul message de formulaire, du 2026-08-26, signé « Sodiq ». La passe Gmail l'a classé démarchage d'agence, et les 4 messages suivants du même fil sont une offre de « Emprofit Solution » à faire croître la boutique pour 2 % de commission. Ce n'est pas un client. |

**Le contrôle réseau, refait aujourd'hui, parce qu'il conditionne tout le reste.** Quatre lectures directes tentées le 2026-09-06 pour cette passe : `www.bestbuy.com` (page d'avis Manscaped Lawn Mower 5.0), `shavercheck.com`, `www.walmart.com` (page d'avis Manscaped), `en.wikipedia.org`. Les quatre renvoient `EGRESS_BLOCKED`. Le fait que Wikipédia soit refusé au même titre qu'Amazon dit que le blocage est global et non ciblé sur les surfaces d'avis. Le statut du proxy le confirme en clair : `gateway answered 403 to CONNECT (policy denial or upstream failure)`. Aucune lecture directe du web n'est possible dans cette session, donc aucun verbatim de catégorie n'est atteignable non plus.

**Ce que WebSearch peut et ne peut pas.** Six requêtes lancées le 2026-09-06 sur les avis de produits comparables : Manscaped Lawn Mower 5.0, Philips OneBlade Intimate, Meridian Trimmer, plus deux requêtes de vocabulaire français et une sur les plaintes récurrentes de la catégorie. L'outil répond. Il rend des résumés écrits par un petit modèle, jamais le texte source. La passe `community-and-forums` avait déjà posé la règle sur ce point et ce document la garde : une citation qui apparaît dans un résumé WebSearch est une paraphrase de l'outil tant qu'elle n'a pas été relue à la source, et la source est ici inatteignable. Résultat : le corpus de catégorie contient des thèmes, pas des verbatims.

### Le corpus de langage projeté par la marque, mesuré

Cette matière n'est pas du langage client et n'entre dans aucun compte ci-dessus. Elle est mesurée ici parce qu'elle est la seule matière textuelle réelle du périmètre et parce que les passes d'extraction en ont besoin, en quarantaine.

| Surface | Enregistrements | Fenêtre | Statut de lecture |
|---|---|---|---|
| Description produit Shopify | 1 | à jour au 2026-09-06 | Verbatim complet, verified |
| Page « Notre Histoire » | 1, 4 paragraphes | à jour au 2026-09-06 | Verbatim complet, verified |
| Advertorial « 7 raisons pour lesquelles votre tondeuse à barbe n'a rien à faire sous la ceinture » | 1, 7 sections + encart offre | daté « Mis à jour le 31 août 2026 » dans le corps | Verbatim complet, verified |
| Landing « 7 raisons de choisir Raselio » | 1, hero + 7 raisons + FAQ 8 questions | à jour au 2026-09-06 | Verbatim complet, verified |
| Fiches créa du lot du 2026-09-03 | 30, chacune avec titre, texte principal et texte présent sur l'image | 2026-09-03 | Verbatim complet via le manifeste de l'équipe, stated |
| Concepts créa du lot du 2026-08-23 | 9, avec headlines et textes visibles | 2026-08-23 | Verbatim complet, stated |
| Annonces Raselio dans le compte Meta | 163 | 2026-08-10 → 2026-09-06 | Copie lisible pour les 30 fiches du 2026-09-03 seulement. Les 133 autres ne portent qu'un nom d'annonce, donc `creative read unavailable` |

**Le point sur les 133 annonces.** Un nom d'annonce est une poignée d'inventaire, pas une lecture créative. « R07 Anti coupure 50 ans et plus » localise une annonce, il ne prouve pas ce qu'elle dit ni ce qu'elle montre. Ces 133 lignes sont comptées, jamais citées.

### Ce que portent les 11 commandes

Verified sur `shopify-orders-and-customers.md` : 11 commandes entre le 2026-08-26 et le 2026-09-04, 14 fiches clients, 0 client récurrent sur 11, 0 retour demandé, 0 réclamation. Une commande à 39,90 €, les dix suivantes à 34,99 €. Ces enregistrements portent un prénom, une initiale, une ville, un montant et un SKU. Aucun ne porte une ligne de texte écrite par l'acheteur. Onze acheteurs et zéro mot d'eux, c'est la phrase qui résume le corpus.

### Distribution des notes

Impossible. Il n'y a aucune note, sur aucune surface. La marque affiche pourtant « 4,7/5 » et « (1 734 avis) » sur sa landing et « Noté 4,7/5 sur 1 734 avis » sur son bloc produit, verified sur l'export Shopify du 2026-09-06. Le dénominateur affiché est 1 734, le dénominateur réel est 0. Cet écart est traité dans `sub-context-docs/reputation-analysis.md` ; ici il compte pour une seule raison : il ne doit jamais être confondu avec une distribution de notes disponible.

## Normalized schema

Aucun enregistrement n'a été normalisé, donc le modèle ci-dessous est un schéma vide plutôt qu'un schéma peuplé. Il est écrit quand même, parce que le prochain run doit savoir dans quelle forme verser ce qu'il collectera, et parce qu'il montre exactement quels champs manqueront encore quand la première source arrivera.

| Champ normalisé | Statut aujourd'hui | Ce qui l'alimentera quand une source arrivera |
|---|---|---|
| `row_id` | vide | Généré à l'ingestion |
| `source_type` | vide | review, ad-comment, post-purchase-survey, brand-reputation, reddit, other-review, ad-account |
| `platform` | vide | Nom exact de la surface |
| `source_native_id` | vide | Id d'avis ou de commentaire rendu par la plateforme. Fait structuré |
| `date` | vide | Fait structuré. Sans lui, la méthode de mining impose de baisser la confiance de toute lecture de coupe, de peau ou de prix |
| `rating` | vide | Fait structuré quand la surface en porte un. Les commentaires publicitaires n'en portent pas |
| `product_sku` | vide | Trivial ici : la marque n'a qu'un SKU, `Electric intimate hair removal device`, donc le champ sera constant et ne portera aucune information de segmentation |
| `text` | vide | Le champ qui manque le plus. Sans lui, il n'y a pas de passe VoC |
| `url` | vide | Lien direct vers l'artefact source |
| `age`, `gender`, `region` | vide côté client | Existe côté Meta au niveau agrégé, jamais au niveau d'un texte. Ne jamais joindre les deux : la ventilation d'âge du compte décrit qui achète, pas qui a écrit une phrase |
| `channel`, `device` | vide côté client | Idem |
| `buyer_type` | vide | 0 client récurrent sur 11, donc le champ n'aurait aujourd'hui qu'une seule valeur |

**Un mot sur les champs déduits du texte.** Aucun champ n'a été déduit, puisqu'il n'y a pas de texte client. Quand il y en aura, la règle de la méthode s'applique : un champ déduit d'une phrase se marque model-inferred et ne se présente jamais comme un champ que le client a rempli.

## Classification method

**Aucun tag n'a été appliqué à un enregistrement client, parce qu'il n'y en a aucun.** Les vingt lentilles que cette passe devait poser sur chaque ligne, sentiment, motivation d'achat, cadeau ou achat pour soi, occasion d'usage, barrière, expérience produit, résultat, transformation, émotion, preuve sociale, fidélité, mention de publicité ou d'influenceur, recommandation, comparaison, confusion produit, inquiétude de prix, incident de livraison ou de service, suggestion d'amélioration, citation remarquable, signal persona et écho de marque, sont toutes non appliquées. Aucune n'est disponible en aval.

Les seuls tags que ce document pose portent sur du texte écrit par la marque, et ils sont préfixés pour qu'aucune passe ultérieure ne puisse les confondre avec une lecture client :

| Tag | Ce qu'il marque | Nature |
|---|---|---|
| `brand-projected-pain` | La marque nomme une douleur qu'elle prête au client | Jugement de modèle sur de la copie de marque |
| `brand-projected-outcome` | La marque nomme un résultat qu'elle promet | Idem |
| `brand-projected-metaphor` | La marque construit une image ou une comparaison | Idem |
| `brand-projected-objection` | La marque met en scène un doute d'achat | Idem |
| `brand-projected-aspiration` | La marque nomme un soi désiré | Idem |
| `brand-projected-trigger` | La marque met en scène un moment déclencheur | Idem |
| `brand-projected-jargon` | Vocabulaire de catégorie employé par la marque | Idem |
| `brand-projected-anti-language` | La marque se positionne contre un discours de catégorie | Idem |
| `era` | Registre de rédaction : tutoiement, lot du 2026-08-23 ; vouvoiement, lot du 2026-09-03 | Fait structuré, la date de chaque document est connue |
| `fabricated-testimonial` | Copie qui se présente comme la parole d'un client identifié qui n'existe pas | Fait, la marque le documente elle-même |

**Ce qu'une passe aval peut faire confiance à ce document.** Trois choses seulement : les comptes de surfaces et leurs motifs d'absence, les dénominateurs du compte publicitaire et de la boutique, et la liste verbatim du langage projeté avec sa date et sa surface. Rien d'autre. En particulier, ce document ne fournit aucun dénominateur de récurrence de langage client, donc toute récurrence calculée en aval sur du langage client est à marquer data-limited.

## Sentiment and rating profile

**Data-limited de bout en bout. Aucune de ces mesures n'existe.**

Sentiment global : non calculable, 0 enregistrement. Distribution des notes : non calculable, 0 note. Sentiment par source : non calculable. Sentiment par SKU : sans objet, un seul SKU, et de toute façon 0 enregistrement. Sentiment dans le temps : non calculable, première version du document et aucune ligne à suivre. Thèmes positifs et négatifs les plus forts : aucun, il n'y a aucun thème parce qu'il n'y a aucun texte.

La méthode de mining demande de traiter la taille d'échantillon comme un gouverneur de confiance et de marquer thin tout ce qui repose sur moins de dix enregistrements. Ici il faut aller plus loin que thin : il n'y a pas d'échantillon du tout, donc il n'y a rien à marquer.

**Le seul point zéro qu'on peut poser.** Il n'est pas un sentiment, c'est un jeu de compteurs, tous verified au 2026-09-06, contre lesquels le prochain run mesurera un mouvement.

| Compteur | Valeur | Fenêtre |
|---|---|---|
| Enregistrements de langage client, toutes surfaces | 0 | depuis l'ouverture, 2026-07-23 |
| Avis | 0 | idem |
| Note moyenne | inexistante | idem |
| Commandes | 11 | 2026-08-26 → 2026-09-04 |
| Clients récurrents | 0 sur 11 | 90 jours |
| Retours demandés | 0 | depuis l'ouverture |
| Réclamations | 0 | 46 fils Gmail lus |
| Messages entrants classés client | 0 sur 1 message de formulaire reçu | 46 jours |
| Annonces Raselio ayant tourné | 163 | 2026-08-10 → 2026-09-06 |
| Impressions Raselio | 43 270 | idem |
| Clics Raselio | 1 084 | idem |
| Achats attribués Meta | 6 | idem |
| Sessions boutique | 2 431 | 90 jours |
| Commentaires publicitaires lus | 0 sur un nombre inconnu | idem |

## Motivation and trigger profile

**Data-limited. Aucune motivation d'achat et aucun déclencheur ne sont observés, parce qu'aucun acheteur n'a écrit un mot.**

Ce que la méthode voudrait compter ici, motivations, tâches à accomplir, moments de bascule, mentions de publicité ou d'influenceur, recommandations, comparaisons, urgence, remise, mauvaise expérience antérieure, appelle un corpus de texte. Il n'y en a pas. Aucun de ces compteurs n'est produit et aucun ne doit être inventé en aval.

**Ce qui existe à la place, et qui n'est pas la même chose.** Deux signaux structurés, tous deux utiles et tous deux muets sur le pourquoi.

Le premier est la ventilation d'âge du compte publicitaire, stated d'après la lecture de l'équipe du 2026-09-03 : sur l'intégralité de l'historique Meta, 5 achats attribués sur 5 venaient d'hommes de 45 ans et plus, cœur 55 à 64 ans, et le pull du 2026-09-06 en compte 6 sur le périmètre Raselio. Les hommes de 18 à 44 ans cliquent et n'achètent pas. C'est une lecture de qui achète. Ce n'est pas une lecture de pourquoi, et la confondre avec une motivation serait exactement l'erreur que ce document existe pour empêcher.

Le second est la structure de la demande côté site, verified : 2 431 sessions sur 90 jours, 11 commandes, aucun panier récurrent. Là encore, un comportement, pas une raison.

**Le déclencheur que la marque suppose, et qu'il faut ranger comme hypothèse.** L'advertorial met en scène un moment précis : « Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées. » C'est un déclencheur écrit par la marque. Il est classé `brand-projected-trigger` et il attend d'être confirmé ou démenti par un client.

## Gifting, usage, and occasion profile

**Data-limited. Aucune part de cadeau, aucune relation de destinataire, aucune occasion et aucun usage familial ne sont observés.**

Le champ « acheté pour offrir » n'existe sur aucune surface de la boutique et aucun acheteur n'a écrit une phrase où il aurait pu le dire. La part de cadeau est donc inconnue, pas nulle, et la distinction compte : écrire 0 % serait une invention.

**Ce que la marque a misé sur ce terrain, en quarantaine.** Deux créas du lot du 2026-09-03 posent explicitement l'hypothèse cadeau, et l'équipe la nomme comme une initiative issue de sa lecture des données plutôt que d'un signal client : la créa 28, « Le cadeau qu'il ne s'offrira jamais lui-même. », dont le texte principal dit « Il n'osera jamais se l'acheter. Vous, si. », et le plan prévoit pour elle un ad set femmes 45 à 60 ans. C'est un pari de ciblage, pas une part de marché observée. Tant que le corpus est vide, la part réelle de cadeau reste un blanc nommé.

## Objections and barriers profile

**Data-limited. Aucune objection client n'est observée.** Aucune inquiétude de prix, aucune confusion produit, aucun scepticisme, aucun incident de livraison, aucun problème de service, aucune rupture, aucune question de compatibilité, aucune réaction à un avis négatif ne peut être comptée, parce qu'aucun client n'a écrit.

Trois observations structurées valent quand même d'être posées, chacune avec son étiquette exacte.

**Le seul message entrant du périmètre n'est pas un client.** Verified. Un message de formulaire de contact reçu le 2026-08-26, signé « Sodiq », demande « Hello, can i know when you will ship if a customer should order today? ». La passe Gmail a lu les six messages du fil et a établi que les quatre suivants sont une offre commerciale de « Emprofit Solution ». Ce message est donc du démarchage, pas une objection client, et il ne rentre pas dans le corpus. Il est nommé ici pour que personne ne le repêche plus tard comme le premier verbatim de la marque.

**Zéro réclamation et zéro retour ne veulent pas dire zéro objection.** Verified sur 46 fils Gmail et sur les 11 commandes. Avec onze acheteurs et un délai de livraison de 48 à 72 heures annoncé, l'absence de plainte est le résultat attendu du volume, pas une preuve de satisfaction.

**La barrière la plus lourde est visible dans le compte et pas dans une phrase.** Stated d'après l'équipe : CTR de 3,02 % sur la campagne principale, taux de conversion site autour de 0,2 %, CPA d'environ 86 € pour un point mort à 21 €. L'écart entre le clic et l'achat est le lieu où vivent les objections de cette marque. Personne ne peut dire lesquelles, parce que personne n'a lu un mot des gens qui ont cliqué et ne sont pas allés au bout.

## Product experience and outcome profile

**Data-limited. Aucune expérience produit rapportée par un client n'existe.**

Aucune fonctionnalité louée, aucune fonctionnalité critiquée, aucune première impression, aucune lecture de facilité d'usage, de durabilité, de design ou de performance, aucune attente dépassée ou déçue, aucune confusion après achat, aucun signal de problème résolu. Onze appareils ont été livrés et pas un retour d'usage n'est écrit nulle part.

**Ce qui est vérifié sur le produit, et qui n'est pas une expérience.** Verified sur la fiche Shopify : tête arrondie, lames céramique, éclairage LED intégré, sabot réglable 3 hauteurs, 100 % étanche, sans fil sur socle, garantie 2 ans, satisfait ou remboursé 30 jours. Deux specs sont marquées « à confirmer » par l'équipe elle-même dans son document Grümwise, le régime moteur et l'autonomie exacte, alors que le site annonce environ 90 minutes. Ce sont des caractéristiques déclarées, pas des résultats constatés par des utilisateurs.

**Le risque que ce vide crée.** La méthode impose un gouverneur de conformité de revendication sur chaque bout de langage avant qu'il n'entre en copie. Ce gouverneur se règle normalement contre ce que les clients rapportent vraiment. Ici il ne peut se régler que contre la fiche produit, donc toute promesse de résultat que la marque écrit aujourd'hui est non substantiée par l'usage, et devra être marquée `gated` par défaut dans la bibliothèque assemblée.

## Transformation and impact profile

**Data-limited. Aucune transformation rapportée n'existe.**

Aucun récit avant et après écrit par un client, aucun changement de routine, aucun changement de comportement, aucun gain de confiance, aucun effet sur une relation, aucune habitude prise, aucun résultat chiffré, aucune recommandation, aucun réachat, aucun abandon. Zéro sur les onze acheteurs, sur zéro texte disponible.

**La transformation existe pourtant, écrite en entier, par la marque.** Et c'est précisément là que le risque est le plus grand pour un run futur, parce que la matière est belle. L'advertorial construit un arc complet : l'état de départ, « chaque passage se fait les dents serrées » ; le mécanisme, « une lame en acier qui chauffe tire le poil avant de le couper » ; l'état d'arrivée, « Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve. » ; et même la scène de couple, portée par les attributs alt des images, « Lui au bout du lit, elle sous la couette » puis « Le couple réconcilié, câlin sur le lit ».

C'est un arc de transformation de qualité professionnelle. Il est entièrement `brand-projected`. Aucun client ne l'a raconté. La méthode appelle « concept de revue entière » une revue dont l'arc complet devient l'actif publicitaire, et prévient que ces pièces sont rares et à haut levier. Le piège ici est symétrique : un arc parfaitement écrit qui n'a jamais eu de narrateur réel ressemble exactement à la pièce rare que le système cherche. Il ne l'est pas.

## Language and creative-asset index

**Index de citations client : vide.** Zéro pépite, zéro phrase de titre, zéro phrase de douleur, zéro phrase de résultat, zéro objection, zéro moment déclencheur, zéro métaphore, zéro jargon, zéro contre-langage, zéro valeur aberrante, zéro concept de revue entière. Aucune de ces catégories ne contient un seul enregistrement, et aucune ne doit être remplie en aval sans une source nouvelle.

**Index de langage projeté par la marque : peuplé, et mis en quarantaine.** Ce qui suit est du texte écrit par Raselio pour Raselio. Ce n'est pas du langage client, ce n'est pas une preuve de ce que dit un client, et aucun élément d'ici n'a le droit d'être présenté comme une citation. Chaque ligne porte sa surface et sa date. Les neuf passes d'extraction lisent ce tableau comme une hypothèse à tester, jamais comme du matériau à lever.

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
| Métaphore | « Utiliser le même outil pour les deux, c'est découper au cutter ce qui demande un scalpel. » | Advertorial, section 1 | 2026-08-31 |
| Métaphore | « Cette séance qui ressemble plus à du déminage qu'à de l'entretien. » | Advertorial, section 2 | 2026-08-31 |
| Métaphore | « Vous ne feriez pas ça à un kiwi. » puis « Alors pourquoi à vous ? » | Créa 05, titre Meta et texte image | 2026-09-03 |
| Métaphore | « Elle épouse les reliefs au lieu de les attaquer. » | Advertorial, section 2 | 2026-08-31 |
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

Aucune de ces cinq lignes n'entre dans une passe d'extraction, sous aucune étiquette, y compris `brand-projected`. Elles constituent une catégorie à part, `fabricated-testimonial`, dont la seule fonction est d'être reconnue et écartée.

**Langage de catégorie tiré des clients d'autres marques : thèmes seulement, aucun verbatim.** Six requêtes WebSearch le 2026-09-06, quatre lectures directes tentées, quatre refusées. Ce qui suit est un résumé produit par l'outil de recherche, pas une citation, et il est marqué comme tel partout où il apparaît en aval.

| Thème de catégorie | Marque concernée | Source | Statut |
|---|---|---|---|
| La peur de la coupure et de l'accroc est le premier critère de choix rapporté | Manscaped Lawn Mower 5.0 | résumé WebSearch de pages d'avis Best Buy et Walmart | Paraphrase d'outil, source non ouverte, EGRESS_BLOCKED |
| Les lames émoussées sont désignées comme la vraie cause des coupures, plus que la technique | Philips OneBlade, Manscaped | résumé WebSearch de tests et de comparatifs | Paraphrase d'outil |
| Le compromis rasage de près contre sécurité est le débat central de la catégorie | Philips OneBlade Intimate | résumé WebSearch d'un comparatif français | Paraphrase d'outil |
| Les démangeaisons apparaissent 24 à 72 heures après le rasage, au moment de la repousse | catégorie, contenus de marque Braun et Gillette | résumé WebSearch | Paraphrase d'outil. À noter : la fenêtre de 3 jours que Raselio met en avant existe bien comme repère de catégorie |
| Le modèle par abonnement et le prix sont le point de friction dominant des plaintes | Manscaped | résumé WebSearch de Trustpilot et PissedConsumer | Paraphrase d'outil |
| Des fragments entre guillemets attribués à des acheteurs vérifiés remontent dans un résumé | Meridian Grooming | résumé WebSearch | **Non confirmés à la source, sans date, sur une page marchande contrôlée par la marque. Traités comme non vérifiés et non repris comme citations.** |

## Data limitations

**La limite principale, redite en une phrase : il n'y a pas de corpus.** 0 enregistrement brut, 0 enregistrement normalisé, 0 doublon retiré, aucune plage de dates. Tout ce qui suit détaille cette limite plutôt que de la compléter.

**Sources manquantes, par nature de manque.** Deux natures, qui appellent deux actions différentes. Celles qui n'existent pas : avis, sondages post-achat, NPS, tickets de support. La boucle se ferme en installant une collecte. Celles qui existent et n'ont pas été lues : commentaires publicitaires sous 163 annonces, commentaires organiques, fils Reddit et forums, avis marketplace de la catégorie. La boucle se ferme en ouvrant un accès.

**Le blocage réseau est total et vérifié aujourd'hui.** Quatre lectures directes tentées le 2026-09-06 pour cette passe, quatre `EGRESS_BLOCKED`, dont Wikipédia. Le statut du proxy renvoie `gateway answered 403 to CONNECT`. Aucun verbatim de catégorie n'est atteignable, donc l'axe de secours prévu, lire les clients des concurrents, ne donne que des thèmes résumés par un outil.

**Parker MCP ne couvre pas cette marque.** `get_available_brands` renvoie une liste d'organisations vide au 2026-09-06. Conséquence directe : ni `search_customer_reviews_semantic`, ni `search_facebook_ad_comments_semantic`, ni `lookup_post_purchase_survey` ne peuvent être appelés. Les trois outils qui alimentent normalement cette passe sont hors service pour Raselio.

**Champs peuplés : aucun, côté client.** Aucun champ d'âge, de sexe, de région, de statut de premier achat, de note, de SKU ou de date ne porte de valeur liée à un texte client, parce qu'il n'y a pas de texte client. La ventilation d'âge du compte publicitaire existe mais décrit des achats, pas des phrases, et les deux ne doivent jamais être joints.

**Taille d'échantillon.** Le seuil habituel, marquer thin en dessous de dix enregistrements, ne s'applique pas ici parce qu'il n'y a aucun enregistrement. Toute la matière disponible est en dessous du seuil par construction. Les 11 commandes et les 6 achats attribués sont des échantillons minuscules et sont écrits comme tels partout.

**Biais de source, dans les deux sens.** Le seul corpus textuel disponible est écrit par la marque, donc il est biaisé à 100 % vers ce que la marque croit. Le corpus de catégorie disponible est un résumé d'index américain, donc il est biaisé vers l'anglophone et vers les grandes marques américaines. Aucun des deux ne représente le client français de Raselio.

**Ère produit.** La marque a connu trois configurations en six semaines, kit Cutlab, kit Raselio Pro™, puis tondeuse seule, et deux prix, 39,90 € puis 34,99 €. Aucune de ces ères ne porte d'avis, donc le calcul de sentiment par ère est impossible et le restera pour les deux premières.

**Pas de visibilité LTV ni réachat.** 0 client récurrent sur 11, SKU unique, aucun abonnement. Aucune lecture de valeur vie ni de rachat n'est possible.

**Aucune trajectoire.** Première version de ce document. Le tableau de compteurs de la section sentiment est le point zéro contre lequel le prochain run mesurera un mouvement.

---

**Méthodes chargées pour cette passe :** `parker-system/creative-strategy-context/customer-review-mining-method.md` et `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md`, lues avant l'analyse et appliquées de bout en bout : les trois détecteurs séparés, la règle qu'un compte n'est pas une significativité sans dénominateur, la règle qu'une citation sans date est une preuve affaiblie, la liste d'exclusion, le repérage de l'écho de marque, le marquage d'ère, la discipline de couverture de sources et la discipline d'intégrité des données.

This is everything I know about mining customer reviews for creative material.
