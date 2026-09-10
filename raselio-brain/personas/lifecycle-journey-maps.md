---
brand: raselio
doc: lifecycle-journey-maps
generated_on: 2026-09-07
refresh_by: 2026-12-07
personas_profile: personas/personas-profile.md
persona_voice_library: personas/persona-voice-library.md
sources_read: [personas/personas-profile.md, personas/persona-voice-library.md, personas/voice-of-customer/voice-of-customer.md, personas/voice-of-customer/voc-corpus-profile.md, source-pulls/personas/ad-account.md, source-pulls/personas/ad-comments.md, source-pulls/personas/customer-reviews.md, source-pulls/personas/post-purchase-surveys.md, source-pulls/personas/other-reviews.md, source-pulls/personas/reddit.md, source-pulls/personas/brand-reputation.md, source-pulls/personas/brand-self-echo-detection.md, sub-context-docs/customer-journey-and-persona-discovery.md, sub-context-docs/performance-targets-and-metrics.md, sub-context-docs/website-and-product-audit.md, sub-context-docs/ad-account-evaluation.md, audits/2026-Q3/90-day-performance-audit.md, source-pulls/shopify-orders-and-customers.md (11 commandes, 14 fiches clients, tout l'historique), source-pulls/shopify-analytics.md (2 431 sessions sur 61 jours, entonnoir de session, référents de commande sur 90 jours), source-pulls/shopify-store-and-product.md (fiche produit, 4 pages, 6 politiques dont remboursement et expédition), source-pulls/gmail-brand-signals.md (46 fils, aucun e-mail sortant vers un client), running-notes/brand-rules.md, running-notes/success-definition.md, Parker MCP appelé le 2026-09-07 : search_facebook_ads_sql en lookup et en lifetime, search_facebook_ad_comments_sql, search_customer_reviews_sql, semantic_search_post_purchase_survey, lookup_post_purchase_survey]
measured_lifecycle_fields: [nombre de commandes (11, tout l'historique), valeur de commande (34,99 € sur 10 commandes, 39,90 € sur la première), nombre d'articles par commande (1 sur 11), statut de paiement (PAID sur 11), statut d'expédition (8 FULFILLED, 3 UNFULFILLED au 2026-09-06), clients récurrents (0 sur 11), pays de facturation (France sur 11), horodatage de commande à la minute (11), référent de commande sur 90 jours (facebook 8, instagram 2, vide 1), entonnoir publicitaire complet au niveau compte (775 clics sur lien, 597 vues de page, 32 ajouts au panier, 12 paiements initiés, 6 achats), entonnoir de session Shopify sur 61 jours (2 431 sessions, 42 sessions avec ajout au panier, 19 arrivées au paiement, 3 paiements terminés), achats attribués par annonce et par tranche d'âge, dépense par tranche d'âge]
directional_lifecycle_fields: [durée de chaque étape, délai entre première exposition et achat, valeur à vie, comportement de cohorte, taux de rachat, taux de retour, taux de parrainage, motif de départ, tout état émotionnel à chaque étape, tout ce qui concerne les étapes 3 à 5. Aucun de ces champs n'existe dans une source. Les lectures qui les concernent sont inférées depuis l'économie du produit, la copie de la marque et la donnée d'acquisition, et elles portent toutes la mention inférée]
data_limitations: [CETTE CARTE EST DIRECTIONNELLE SUR TOUT CE QUI SUIT LE PREMIER ACHAT, ET MESURÉE UNIQUEMENT SUR CE QUI LE PRÉCÈDE. Aucune donnée de rachat, de cohorte, de valeur à vie, de rétention, de désabonnement, de parrainage ni de délai jusqu'à l'achat n'existe pour cette marque, et ce n'est pas un problème d'outil : la boutique a 46 jours de vie commerciale, 11 commandes, la plus ancienne a douze jours au 2026-09-07, et zéro client récurrent. Il n'existe donc aucune cohorte à suivre. Aucun canal de cycle de vie n'existe non plus : aucun e-mail sortant vers un client dans les 46 fils Gmail lus, aucun SMS, aucun programme de fidélité, aucun parrainage, aucune application d'avis, aucun sondage post-achat. La marque n'a aucun moyen de reparler à un acheteur autrement qu'en le repayant en publicité. Les deux sources de premier rang de la méthode persona sont vides, interrogées le 2026-09-07 et pas supposées : 0 avis, 0 réponse de sondage. Le corpus de langage client fait un verbatim, donc aucune transition ne peut être éclairée par une citation d'acheteur Raselio. Un écart de mesure non résolu est porté tel quel : le compteur de sessions Shopify montre 3 paiements terminés sur 61 jours alors que 11 commandes existent sur la même fenêtre. Un second écart est porté tel quel : Meta attribue 6 achats, Shopify en compte 11, et cinq commandes ne sont vues par aucun rapport publicitaire ; aucun outil d'attribution tiers n'est branché, check_northbeam_connection renvoie connected false. Le trafic du site est contaminé : sur 2 404 sessions réparties, 1 254 viennent des États-Unis alors que les 11 commandes sont facturées en France à 100 %, donc les taux de conversion par session sont calculés sur un dénominateur gonflé.]
methods_loaded: [creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/ad-account-analysis.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Lifecycle journey maps - Raselio

## Purpose and how to use

Trois documents se composent. `personas/personas-profile.md` dit **à qui** parler. `personas/persona-voice-library.md` dit **avec quels mots**. Celui-ci dit **quand le dire et quelle transition le message essaie de faire bouger**.

**À lire avant de s'en servir.** Cette carte est mesurée sur tout ce qui précède le premier achat et directionnelle sur tout ce qui le suit. La raison est simple et elle n'est pas un défaut d'outil : la boutique a 46 jours de vie commerciale, onze commandes, et la plus ancienne a douze jours. Il n'existe aucune cohorte à suivre, aucun rachat à mesurer, aucun retour à compter. Toute lecture d'étape 3, 4 ou 5 dans ce document est une inférence depuis l'économie du produit et depuis la copie de la marque, jamais une observation.

**Ce que la carte est bonne à faire aujourd'hui.** Nommer précisément où l'argent se perd avant le premier achat, ce qui est mesuré et net. Nommer ce qui n'existe pas encore et qui devrait exister pour qu'une deuxième étape soit seulement possible. Et poser le point zéro contre lequel le prochain passage mesurera un mouvement.

## Lifecycle framework

La lentille standard a cinq étapes : prospect froid, premier acheteur, acheteur récurrent, abonné ou client fidèle, ambassadeur. **Elle ne s'applique pas telle quelle à cette marque, et la forcer produirait de la fiction.** Voici l'adaptation, avec la raison.

**Le modèle économique interdit les étapes 3 et 4 dans leur forme habituelle.** Raselio vend un SKU unique, la Tondeuse Intime Homme Raselio™ MS-810, à 34,99 €, en achat unique. Pas d'abonnement, pas de lames de rechange, pas de consommable, pas de gamme. La marque en fait un argument de vente, page « Notre Histoire », verified, verbatim : « Chaque commande est un achat unique, sans abonnement caché ni engagement. » C'est une bonne promesse commerciale et c'est, mécaniquement, l'absence de deuxième achat. **Il n'y a pas de chemin de rachat parce que le produit n'en propose aucun.** Zéro client récurrent sur onze le confirme, sur une fenêtre trop courte pour conclure quoi que ce soit.

**L'étape 5 est bloquée par la promesse du produit.** L'ambassadeur est celui qui parle. Raselio vend la discrétion comme un bénéfice, advertorial, verified, verbatim : « Le colis arrive dans un emballage neutre et discret : personne n'a besoin de savoir, tout le monde finira par remarquer. » Un produit dont le bénéfice central est que personne ne sache ne se recommande pas à voix haute. Le fait le confirme de l'extérieur : zéro mention de la marque dans l'index atteignable, zéro défenseur, zéro détracteur, deux commentaires publicitaires sur 43 270 impressions.

**Le cadre retenu, donc, en quatre étapes dont deux presque vides.**

**1. Prospect froid.** Mesuré. C'est là que vit tout le budget et toute la donnée.

**2. Premier acheteur.** Mesuré à l'entrée, aveugle ensuite. Onze hommes ont payé et personne ne sait ce qui leur est arrivé après.

**3. Deuxième achat.** **Structurellement absent** aujourd'hui, et c'est un choix de produit et pas un échec d'exécution. Ce qui pourrait le remplacer est nommé plus bas.

**4. Ambassadeur silencieux.** L'étape existe probablement dans la réalité et elle est invisible par nature. La recommandation de cette catégorie se fait probablement de bouche à oreille discret, entre deux hommes, sans trace mesurable.

**Une étape qui manque au cadre standard et qui compte énormément ici.** Entre le prospect froid et le premier acheteur, cette marque a une étape supplémentaire que la plupart des marques n'ont pas : **la vérification**. Un homme qui découvre une marque inconnue sur un fil Facebook et qui doit lui confier une lame et une adresse cherche à savoir à qui il achète. Et il ne trouve rien : zéro mention de Raselio dans l'index, zéro avis, zéro comparatif, zéro presse. Cette étape est traitée comme une étape à part entière dans la carte de la persona 1, parce que c'est là que la donnée montre que tout le monde s'en va.

## Data limitations

**Mesuré, et solide.**

L'entonnoir publicitaire complet au niveau compte, verified sur Parker : 775 clics sur lien, 597 vues de page de destination, 32 ajouts au panier, 12 paiements initiés, 6 achats. Étape par étape : 77,0 % du clic à la page, **5,4 % de la page au panier**, 37,5 % du panier au paiement, 50,0 % du paiement à l'achat.

L'entonnoir de session Shopify sur 61 jours, verified : 2 431 sessions, 42 sessions avec ajout au panier soit 1,7 %, 19 arrivées au paiement soit 0,8 %, 3 paiements terminés.

Les onze commandes, verified : toutes payées, toutes d'un seul article, toutes facturées en France, huit expédiées et trois non expédiées au 2026-09-06, zéro client récurrent, du 2026-08-26 au 2026-09-04.

**Directionnel, et il faut le dire à chaque fois.**

La durée de chaque étape. Le délai entre la première exposition et l'achat. La valeur à vie. Le comportement de cohorte. Le taux de rachat. Le taux de retour. Le taux de parrainage. Le motif de départ. L'état émotionnel à chaque étape. **Aucun de ces champs n'existe dans une source.**

**Deux écarts de mesure, portés tels quels et non résolus.**

Le compteur de sessions Shopify voit 3 paiements terminés sur 61 jours, alors que 11 commandes existent sur la même fenêtre. Il ne voit donc pas huit achats sur onze. L'écart n'est expliqué nulle part.

Meta attribue 6 achats, Shopify en compte 11, dont 8 marqués facebook et 2 instagram par son propre référent. **Cinq commandes réelles n'apparaissent dans aucun rapport publicitaire**, et la vérification est faite : aucun outil d'attribution tiers n'est branché, `check_northbeam_connection` renvoie `connected: false`, aucun e-mail, aucun SMS, aucun canal organique identifié.

**Un dénominateur contaminé.** Sur 2 404 sessions réparties par appareil et par pays, 989 sont des sessions ordinateur depuis les États-Unis et 265 des sessions mobiles depuis les États-Unis, contre 791 mobiles depuis la France et 119 ordinateur depuis la France. Les onze commandes sont facturées en France à 100 %. Une part importante du trafic américain n'est probablement ni humaine ni acheteuse, et elle gonfle le dénominateur de tous les taux de conversion par session.

## Cross-persona summary

Deux personas, et elles n'ont pas le même problème de cycle de vie.

**`soigne-discret`, flagship, six achats sur six.** Toute sa difficulté est concentrée dans une seule transition, et elle est mesurée : entre la page qui s'affiche et l'ajout au panier, 94,6 % des gens partent. Ce n'est plus une hypothèse sur la publicité, c'est une mesure sur la page. Après l'achat, la marque est aveugle et muette : elle n'a aucun canal pour reparler à cet homme, aucun moyen de savoir s'il est content, et aucun deuxième produit à lui vendre.

**`partenaire-prescriptrice`, émergente, zéro achat.** Elle n'a pas de parcours parce qu'elle n'a jamais commencé. La créa écrite pour elle n'a jamais été mise en ligne et aucun ad set femmes n'existe. Sa carte est donc une carte de ce qu'il faudrait observer, pas de ce qui a été observé.

**Où investir en premier, et la réponse ne se discute pas.** La transition du clic à l'ajout au panier de `soigne-discret`. C'est la seule étape de tout l'entonnoir qui sort de la normale, elle concerne la seule persona qui achète, elle coûte aujourd'hui l'intégralité du budget, et elle se règle sur la page plutôt qu'en produisant trente créas de plus. Les trois annonces les plus dépensières envoient d'ailleurs vers **trois destinations différentes**, la fiche produit, `/pages/7-raisons` et l'advertorial, et aucune source ne dit laquelle perd le plus de monde.

## Persona 1 - `soigne-discret`

**Le cadrage, en un paragraphe.** Cet homme n'a pas de parcours long au sens habituel. Il croise la marque dans un fil Facebook, sur mobile, et il n'ira nulle part ailleurs : zéro session d'affiliation, de média, de forum ou d'e-mail sur 90 jours, et la marque n'existe dans aucun résultat de recherche. Tout son parcours tient donc entre une publicité et une page. Le prix, 34,99 €, laisse croire à un achat d'impulsion, et son comportement dit le contraire : entre 1 116 et 4 154 sessions par commande selon le compteur retenu, et un coût par achat de 94,16 € sur la campagne principale pour un produit à 35 €. Mon interprétation, inférée, confiance mixed : **ce qui coûte cher ici n'est pas l'argent, c'est la permission.**

### L'arc complet, en prose

Il voit une image fixe dans son fil Facebook. Il a plus de 45 ans, à 82,4 % de la dépense, et 93,4 % de chances d'être sur son téléphone. L'image lui montre un homme d'environ trente ans, torse nu, tatoué, glabre, avec des flèches qui désignent ce qu'il faut raser, et un texte qui le tutoie. Il clique quand même : le taux de clic de la famille gagnante est de 1,63 à 3,69 %.

Il arrive sur une page. 77,0 % des clics sur lien atteignent bien une page, ce qui est normal. Et là, presque tout s'arrête : sur 597 vues de page, 32 ajouts au panier. **5,4 %.**

Ce qui se passe entre les deux n'est mesuré nulle part, et c'est le trou central de tout ce document. Ce que les sources permettent de dire, inféré, tient en trois points. La page lui demande d'acheter à une marque qu'il n'a jamais vue. S'il vérifie, il ne trouve rien : la marque n'est nulle part dans l'index français. Et la seule chose que la page lui offre en guise de garantie est un compteur d'avis que la marque ne peut pas défendre.

S'il franchit ça, le reste se comporte normalement. 37,5 % des paniers vont jusqu'à un paiement initié, 50,0 % des paiements aboutissent. Il paie 34,99 €, un seul article, souvent tôt le matin ou tard le soir.

Puis le silence. Aucun e-mail de la marque ne part vers lui, verified sur 46 fils Gmail. Aucun sondage. Aucune demande d'avis. Aucun deuxième produit. **La marque n'a plus aucun moyen de lui parler.**

### Étape 1 — Prospect froid

**État d'esprit.** Il ne cherche pas. `ad-account-analysis.md` note que le fil Facebook met l'utilisateur en mode de navigation posée, plus lent et plus délibéré que sur Instagram, et que la dépense y est un indicateur d'audience plus âgée. Le compte confirme dans les deux sens : Facebook porte 70,7 % de la dépense et 5 des 6 achats.

**Déclencheurs d'entrée.** Six sont nommés dans `personas-profile.md` et **aucun n'est confirmé par un acheteur**. Tous sont écrits par la marque.

**Ce qui le fait avancer.** La seule chose prouvée sur l'achat : la famille visuelle « Impeccable », fond crème, titre en très gros, un humain calme, produit héros net. Quatre achats sur six, coût par achat 28,10 € contre 94,16 € sur la campagne principale.

**Risques de décrochage.** Le premier est un problème de format que la méthode nomme précisément. `ad-account-analysis.md` pose que **les statiques penchent vers le bas de l'entonnoir** et qu'un compte lourd en statiques fait surtout de la capture de demande. Raselio est à 168 statiques sur 173 annonces indexées, zéro vidéo qui vende son produit. **Elle fait donc de la capture de demande pour une marque dont personne n'a jamais entendu parler.** C'est la contradiction structurelle de ce parcours : il n'y a pas de demande à capturer, il faudrait la créer, et le format employé n'est pas fait pour ça.

Le second risque est mesuré : environ 19,8 % de la dépense part dans des emplacements verticaux, Reels et Stories, où une image 4:5 est recadrée et se bat contre de la vidéo en mouvement.

**Meilleur contenu ou point de contact.** Le fil Facebook, où la créa est chez elle.

**Émotion clé.** L'appréhension au moment du geste, en basse intensité. Voir `persona-voice-library.md`, moteur 2.

### Étape 1 bis — Vérification. L'étape que le cadre standard n'a pas et qui décide de tout ici

**État d'esprit.** Il vient de cliquer et il veut savoir à qui il a affaire. C'est la phase Evaluation de `emotional-delivery-and-timing.md` : il ne cherche pas plus d'information, il gère un risque et attend qu'on nomme son hésitation exacte. Le document prévient qu'appliquer de la pression ou sur-expliquer sa valeur à ce moment le fait décrocher.

**Ce que la marque lui donne.** Un compteur d'avis inventé, « 4,7/5 sur 1 734 avis », face à 0 avis existants, et « +17 000 clients satisfaits », face à 11 commandes. Plus trois destinations différentes selon l'annonce cliquée.

**Ce qu'il trouve s'il vérifie.** Rien. Six requêtes de marque lancées le 2026-09-06 ne rendent aucune page qui parle de Raselio. « Raselio avis » remonte un théoricien de la musique du seizième siècle et la page Wikipédia du loueur de voitures Avis.

**Ce que la marque a et ne finance pas.** La créa `52506457654991` « RS · C11 garantie-colis » affiche **14,06 % de taux de clic, le meilleur du compte**, sur 1,33 € de dépense. Toute la famille de la sécurité d'achat tient sous cinq euros sur 677,81 €.

**Risque de décrochage, chiffré.** **94,6 % des vues de page ne produisent pas d'ajout au panier.** C'est la seule étape de tout l'entonnoir qui sort de la normale.

**Pourquoi ça coûte plus cher ici qu'ailleurs.** `advertising-to-older-audiences.md` pose que pour un public de 50 à 70 ans l'autorité est le raccourci de confiance, que la preuve doit venir d'une source déjà reconnue, et qu'un compteur d'avis élevé lit comme une preuve réelle. **La marque a donc placé sa preuve la plus fragile exactement devant le public le plus sensible à la preuve.**

### Étape 2 — Premier acheteur

**État d'esprit.** Inconnu. Personne ne lui a jamais rien demandé.

**Ce qui est mesuré.** Onze commandes, toutes d'un seul article, à 34,99 € sauf la première à 39,90 €, toutes facturées en France. Quatre tombent entre 05:23 et 09:07 UTC, trois entre 19:33 et 20:48 UTC. Huit expédiées, trois non expédiées au 2026-09-06.

**Ce qui pourrait rendre la première expérience meilleure que prévu.** Non observable, et c'est un vrai manque. La passe d'extraction de la surprise le note : **Raselio ne connaît aujourd'hui aucun bénéfice de son produit qu'elle ne vende pas déjà.** Elle a promis le colis neutre, la boîte complète, le socle, l'étanchéité et la durabilité des lames. Une promesse annoncée n'est plus une surprise.

**Risques de décrochage, deux, et les deux sont datés.**

Le premier est une contradiction de politique, verified sur les deux textes. Le site promet « nous vous remboursons intégralement, sans poser de questions » et la politique de remboursement n'accepte que les produits « dans son état d'origine, non utilisé » en excluant les scellés ouverts. **Un homme qui essaie la tondeuse pendant trente jours ne peut pas la rendre non utilisée.** La fenêtre de trente jours du premier acheteur se ferme vers le 2026-09-25.

Le second est un écart de promesse sur le délai : la créa 29 annonce « Livré en 48-72 h partout en France » quand la politique parle de « 1 à 3 jours ouvrés » de préparation et de délais « à titre estimatif ». Le seul message client jamais reçu par cette marque portait précisément sur la date d'expédition.

**Meilleur point de contact.** Aucun n'existe. Aucun e-mail sortant vers un client dans 46 fils Gmail, aucun SMS, aucune application d'avis, aucun sondage.

### Étape 3 — Deuxième achat

**Elle n'existe pas, et c'est un choix de produit.** Un SKU, un achat unique, aucun consommable, aucune gamme. Zéro client récurrent sur onze, sur une fenêtre de neuf jours qui ne permet de conclure à rien.

**Ce que ça fait à l'économie, et c'est la contrainte la plus dure de cette marque.** La marge brute est d'environ 23,58 € par unité avant frais de port et frais de paiement, sur un coût produit stated de 11,41 € à 12,71 € selon la feuille de l'équipe consultée. Le seuil de rentabilité qui en découle est d'environ 21 € de coût par achat, et il est optimiste d'un montant inconnu parce qu'aucun coût de port réel ni frais Shopify Payments n'est documenté. **Le coût d'acquisition doit donc être récupéré sur une seule transaction de 34,99 €.** Le coût par achat mesuré est de 94,16 € sur la campagne principale et de 128,61 € en lifetime. Le coût par ajout au panier est de 24,11 €, c'est-à-dire **au-dessus de la marge supposée**.

**Les trois chemins qui pourraient remplacer un deuxième achat, posés comme options et pas comme recommandations.** Une lame de rechange, ce que fait Meridian et ce que la marque exclut aujourd'hui par positionnement. Un deuxième SKU. Ou un prix de première vente plus élevé, ce que la marque a fait dans l'autre sens en passant de 39,90 € à 34,99 € le jour de sa première commande. Aucun de ces chemins n'est documenté comme envisagé.

### Étape 4 — Ambassadeur silencieux

**Directionnelle en entier.**

**Ce qui est observé, et c'est un vide.** Zéro mention de la marque dans l'index, zéro défenseur, zéro détracteur, deux commentaires publicitaires sur 43 270 impressions, zéro avis, zéro session d'affiliation ou de bouche à oreille sur 90 jours.

**Ce qui explique probablement ce vide, inféré, confiance mixed.** Le produit vend le secret. Un homme qui achète pour que personne ne sache ne poste pas, ne déballe pas devant une caméra et ne laisse pas d'avis sous son nom. La catégorie fonctionne probablement à la recommandation chuchotée, entre deux hommes, sans trace.

**Le seul vecteur que les données laissent entrevoir n'est pas un acheteur qui parle**, c'est un second acheteur pour le même homme : la partenaire. C'est le sujet de la persona 2.

### Transition critique

**Du clic à l'ajout au panier.** 597 vues de page, 32 ajouts au panier, 5,4 %. Trois des quatre étapes de l'entonnoir sont normales ou bonnes ; celle-ci est catastrophique. Elle concerne la seule persona qui achète, elle consomme tout le budget, et elle se règle sur la page plutôt qu'en produisant plus de créas.

### Motif de départ et geste de reconquête

**Motif de départ, inféré :** il ne franchit pas la vérification. Il ne trouve rien sur la marque, la preuve qu'on lui montre est un chiffre, et il ferme l'onglet.

**Geste de reconquête approprié à cette persona, et il n'est pas un e-mail :** la marque n'a aucun canal de reconquête. Elle n'a ni e-mail, ni SMS, ni audience de retargeting documentée. Le seul geste disponible aujourd'hui est de repayer l'impression, ce qui est le geste le plus cher de tous.

### Citations qui éclairent une transition

**Aucune ne vient d'un acheteur Raselio.** La seule voix extérieure existante, « Plus rien de la bête sauvage qui sommeille en nous », le 2026-08-31, éclaire une transition qui n'est même pas dans cette carte : celle qui précède le prospect froid, celle où un homme décide que ce geste n'est pas pour lui. Aucune annonce du compte ne s'adresse à cet homme.

## Persona 2 - `partenaire-prescriptrice`

**Avertissement de statut.** Zéro achat. Confiance `hypothesis`. Cette carte décrit ce qu'il faudrait observer et pas ce qui a été observé. Aucune ligne ne doit être citée comme un fait.

**Le cadrage.** Elle n'a pas de parcours parce qu'il n'a jamais commencé. La ligne femmes 45-54 a reçu 28,45 € pour 15 547 impressions, 63 clics, 0,41 % de taux de clic et **zéro achat**. La dépense féminine totale du compte, 91,80 € soit 11,9 %, est du débordement de diffusion et pas un ciblage : aucun ad set femmes n'existait au 2026-09-06. La créa écrite pour elle, la 28, texte à l'image `stated`, « Le cadeau qu'il ne s'offrira jamais lui-même. / Et dont vous profiterez aussi. / Colis neutre · Livraison offerte », **n'a jamais été mise en ligne**.

**Étape 1, prospect froid.** Elle croise la publicité sans chercher. Le taux de clic mesuré sur sa ligne, 0,41 %, est le plus bas des lignes servies : **la créa actuelle ne lui parle pas**, ce qui est attendu puisqu'elle n'a pas été écrite pour elle.

**Étape 1 bis, vérification.** La sienne est probablement plus lourde que celle de l'homme, inféré : elle achète un objet intime pour quelqu'un d'autre et elle doit être sûre que ça ne blesse pas et que ça n'humilie pas. Le seul extrait de catégorie qui décrit ce moment, sur une autre marque, montre une enquête sociale, `categorie`, `stated`, page non ouverte : « I bought this for my husband after asking a few men in my life who said this product was worth looking into for grooming 'down there'. »

**Étape 2, premier achat.** Jamais observée. Zéro achat sur toute la vie du compte.

**Étape 3, deuxième achat.** Elle n'en fera pas, et pour une raison différente de celle de l'homme : elle n'est pas l'utilisatrice. Son cycle est occasionnel et il suit le calendrier des cadeaux plutôt que l'usure d'un produit.

**Étape 4, ambassadrice.** C'est **la seule des deux personas qui pourrait parler à voix haute**, inféré, parce qu'elle n'a pas le sujet sur elle. Les quatre extraits d'avis Manscaped du corpus de catégorie sont tous écrits par des femmes qui racontent l'achat pour leur conjoint. Aucune de leurs équivalentes n'a jamais rien écrit sur Raselio, faute d'être passée à l'achat.

**Transition critique.** De la publicité au premier achat, parce que rien après n'a jamais eu lieu. Elle n'a jamais été testée : la créa existe, l'ad set n'existe pas, le budget n'a jamais été alloué.

**Motif de départ.** Non observable.

## Cross-persona patterns

**Motif 1. Les deux parcours meurent au même endroit, et personne ne regarde cet endroit.** Pour l'homme, c'est mesuré à 5,4 %. Pour la partenaire, c'est encore en amont. Dans les deux cas, la marque n'a aucune mesure de ce qui se passe sur la page, et les annonces envoient vers trois destinations différentes sans qu'aucune source dise laquelle perd le plus de monde. C'est le blanc le plus actionnable de tout le cerveau et il se comble avec un outil d'analyse de page.

**Motif 2. La marque n'a aucun moyen de reparler à qui que ce soit.** Ni e-mail, ni SMS, ni fidélité, ni parrainage, ni avis, ni sondage. Onze hommes ont reçu un colis et la marque ne peut plus les atteindre autrement qu'en repayant une impression. Ça a une conséquence directe sur la stratégie : **tant qu'aucun canal propriétaire n'existe, chaque euro de marge doit être gagné à la première tentative**, et le coût par achat mesuré est quatre à six fois le seuil de rentabilité.

**Motif 3. Le format employé ne correspond pas au travail à faire.** `ad-account-analysis.md` pose que les statiques penchent vers le bas de l'entonnoir et qu'un compte lourd en statiques fait de la capture de demande. Raselio est à 168 statiques sur 173, et elle n'a aucune demande à capturer : zéro notoriété, zéro mention, zéro recherche de marque. Elle utilise donc un outil de fermeture pour un travail d'ouverture. `advertising-to-older-audiences.md` va dans le même sens depuis l'autre bout : ce public tolère un récit plus long et convertit volontiers depuis un état conscient et même inconscient du problème, ce qui rend le format long pertinent plutôt que gaspillé.

**Motif 4. L'étape la plus servie est celle qui compte le moins.** Le compte écrit presque tout en Trigger et en Purchase. La phase Evaluation, celle qui décide, est servie par une famille de créas qui tient sous cinq euros et qui affiche le meilleur taux de clic du compte.

**Motif 5. Après le premier achat, la marque est aveugle des deux yeux.** Elle ne sait pas si l'appareil marche, si l'homme est content, s'il l'a offert, s'il le recommanderait. Et la première échéance arrive : la fenêtre de trente jours du premier acheteur se ferme vers le 2026-09-25, avec une politique de retour qui se contredit elle-même.

## Critical-transition map

| Persona | Transition la plus importante | Pourquoi elle compte | Mesurée ou inférée |
|---|---|---|---|
| `soigne-discret` | vue de page → ajout au panier | 5,4 %, la seule étape hors norme de tout l'entonnoir, et elle concerne la seule persona qui achète | **mesurée** sur 597 vues de page et 32 ajouts au panier |
| `soigne-discret` | premier achat → retour d'usage | aucun canal n'existe pour l'obtenir, et sans lui la persona reste bloquée à confiance thin | **mesurée en creux** : 0 avis, 0 réponse de sondage, 0 e-mail sortant |
| `soigne-discret` | premier achat → deuxième achat | structurellement absente, un SKU en achat unique, ce qui force toute la rentabilité sur une seule transaction de 34,99 € | **inférée** depuis l'économie du produit, 0 rachat sur 11 mais fenêtre de 9 jours |
| `partenaire-prescriptrice` | publicité → premier achat | jamais testée, la créa existe et l'ad set n'existe pas | **mesurée en creux** : 28,45 €, 63 clics, 0 achat |

## Recommendations

Chaque recommandation nomme la persona, l'étape, l'action, la base de preuve et sa limite. Aucune n'est proposée si les sources ne la portent pas.

**1. Mesurer ce qui se passe sur la page avant de produire une créa de plus.** Persona `soigne-discret`, étape 1 bis. Base de preuve : 597 vues de page pour 32 ajouts au panier, et trois destinations différentes selon l'annonce cliquée. Limite : aucun outil d'analyse de page n'est branché, donc cette recommandation demande un outil et pas un pull. C'est la première de la liste parce que c'est la seule étape hors norme de tout l'entonnoir.

**2. Financer la famille de la sécurité d'achat au-delà de cinq euros.** Persona `soigne-discret`, étape 1 bis. Base de preuve : 14,06 % de taux de clic sur `52506457654991`, le meilleur du compte, pour 1,33 € de dépense, et une phase Evaluation qui n'est servie par presque rien. Limite : 64 impressions de dénominateur, donc ce taux de clic n'est pas fiable et l'action est un test, pas une certitude.

**3. Demander un retour aux onze premiers acheteurs.** Persona `soigne-discret`, étape 2. Base de preuve : 0 avis et 0 réponse de sondage confirmés par l'outil, et une persona flagship bloquée à confiance thin faute d'une seule parole d'acheteur. Limite : onze personnes, donc au mieux une poignée de réponses. C'est quand même le geste le moins cher du document, et il ferait passer la persona de thin à mixed.

**4. Régler la contradiction de la politique de retour avant le 2026-09-25.** Persona `soigne-discret`, étape 2. Base de preuve : « nous vous remboursons intégralement, sans poser de questions » sur le site contre « dans son état d'origine, non utilisé » dans la politique, les deux verified. Limite : c'est une question juridique et commerciale, pas créative, et seule la marque peut trancher.

**5. Tester la partenaire une fois, proprement, avec la créa qui existe déjà.** Persona `partenaire-prescriptrice`, étape 1. Base de preuve : la créa 28 est écrite et n'a jamais été mise en ligne, aucun ad set femmes n'existe, et 91,80 € sont déjà partis en débordement de diffusion vers des femmes sans qu'une seule créa leur soit adressée. Limite : zéro achat aujourd'hui, donc l'attente raisonnable est un apprentissage et pas un canal.

**6. Essayer un format long une fois.** Persona `soigne-discret`, étape 1. Base de preuve : 168 statiques sur 173, zéro vidéo qui vende ce produit, `ad-account-analysis.md` qui pose que les statiques penchent vers le bas de l'entonnoir alors que cette marque n'a aucune demande à capturer, et `advertising-to-older-audiences.md` qui place le témoignage long avec validation d'expert et la démonstration façon téléachat en tête des formats qui portent chez ce public. Limite : la marque n'a jamais produit de vidéo et n'a aucun visage à mettre à l'écran. C'est une décision de production, pas une itération.

**Ce que je ne recommande pas, et pourquoi.** Aucun programme de fidélité, aucun parrainage, aucune séquence de rachat. Le produit n'a pas de deuxième achat et la marque a onze clients. Construire un cycle de vie aval avant d'avoir un cycle de vie amont qui tient serait exactement l'inverse de l'ordre utile.

## Open loops

**1. Personne ne sait quelle page perd les gens.**

Observation. L'entonnoir montre que 94,6 % des vues de page ne produisent pas d'ajout au panier, et les annonces envoient vers trois destinations différentes, la fiche produit, `/pages/7-raisons` et l'advertorial `/pages/pourquoi-pas-votre-tondeuse-a-barbe`. Aucune source ne dit laquelle perd le plus de monde.

Question. Laquelle des trois pages de destination de Raselio perd le plus de visiteurs ?

Territoire. Product.

**2. La marge doit être gagnée en une transaction et personne n'a écrit le vrai coût d'une commande livrée.**

Observation. Le produit n'a pas de deuxième achat, donc le coût d'acquisition doit être récupéré sur une seule vente de 34,99 €. La marge de 23,58 € utilisée partout est une marge avant frais : aucun coût de port Colissimo réel, aucun frais Shopify Payments, aucun abonnement, et le coût produit varie de 11,41 € à 12,71 € entre deux feuilles de l'équipe sans note d'explication.

Question. Combien coûte réellement une commande Raselio livrée, tout compris ?

Territoire. Product. **Seule la marque peut répondre.**

**3. Cinq commandes sur onze ne sont vues par personne.**

Observation. Meta attribue 6 achats, Shopify en compte 11 dont 8 marqués facebook et 2 instagram, aucun outil d'attribution tiers n'est branché, aucun e-mail, aucun SMS, aucun canal organique identifié.

Question. Par quel chemin les cinq commandes que la publicité ne voit pas sont-elles arrivées ?

Territoire. Product.

**4. La première fenêtre de retour se ferme dans deux semaines et la politique se contredit.**

Observation. Le site promet un remboursement « sans poser de questions » et la politique n'accepte que les produits non utilisés en excluant les scellés ouverts. Un homme qui essaie la tondeuse trente jours ne peut pas la rendre non utilisée. La fenêtre du premier acheteur se ferme vers le 2026-09-25.

Question. Que se passe-t-il quand un acheteur de cette catégorie demande à être remboursé ?

Territoire. Product. **Seule la marque peut répondre.**

---

**Sign-off des méthodes chargées qui en portent une.**

This is everything I know about advertising to older audiences.
