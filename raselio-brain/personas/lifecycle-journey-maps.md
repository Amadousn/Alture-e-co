---
brand: raselio
doc: lifecycle-journey-maps
generated_on: 2026-09-07
refresh_by: 2026-10-07
personas_profile: personas/personas-profile.md
persona_voice_library: personas/persona-voice-library.md
sources_read: [personas/personas-profile.md, personas/persona-voice-library.md, personas/voice-of-customer/voice-of-customer.md, personas/voice-of-customer/voc-corpus-profile.md, source-pulls/personas/ad-account.md, source-pulls/personas/ad-comments.md, source-pulls/personas/customer-reviews.md, source-pulls/personas/post-purchase-surveys.md, source-pulls/personas/brand-reputation.md, source-pulls/personas/other-reviews.md, source-pulls/personas/reddit.md, source-pulls/shopify-analytics.md, source-pulls/shopify-orders-and-customers.md, source-pulls/shopify-store-and-product.md, source-pulls/meta-ads-all.md, source-pulls/meta-account-campaigns-adsets.md, source-pulls/gmail-brand-signals.md, source-pulls/drive-politiques-boutique-cutlab-to-raselio-2026-07-26.md, sub-context-docs/website-and-product-audit.md, sub-context-docs/customer-journey-and-persona-discovery.md, running-notes/brand-rules.md, Parker MCP brand a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 — entonnoir lifetime au niveau annonce, clics sortants, vues de page d'atterrissage, ajouts au panier, initiations de paiement et achats]
measured_lifecycle_fields: [entonnoir publicitaire lifetime au niveau annonce — 775 clics sortants, 597 vues de page d'atterrissage, 32 ajouts au panier, 12 initiations de paiement, 6 achats, 209,94 € de valeur d'achat, source Parker, fenêtre 2026-08-10 → 2026-09-06 ; entonnoir de site sur 61 jours — 2 431 sessions, 42 sessions avec ajout au panier, 19 sessions arrivées au paiement, 3 sessions comptées comme paiement terminé, source ShopifyQL, fenêtre 2026-07-08 → 2026-09-06 ; commandes — 11 au total, 11 nouveaux clients, 0 client récurrent, taux de client récurrent 0,0 sur 90 jours, 100 % France, panier moyen 34,99 € sauf la première commande à 39,90 €, 1 article par commande sur 11, 0 remise appliquée, 0 annulation de vente ; statut d'exécution — 8 commandes FULFILLED et 3 UNFULFILLED au 2026-09-06 ; référents de commande — facebook 8, instagram 2, vide 1 ; pages d'entrée sur 90 jours — 30 lignes, la page d'accueil à 1 171 sessions, la fiche produit à 363, la landing « 7 raisons » à 312, l'advertorial à 195, l'ancienne page Cutlab à 97 ; horodatages des 11 commandes]
directional_lifecycle_fields: [durée de chaque étape, entièrement inférée ; délai entre la première exposition et l'achat, inconnu ; valeur vie client, inconnue et probablement plafonnée à une commande ; comportement de rachat, non observable, 0 rachat sur 11 clients et 12 jours d'ancienneté maximale ; cohortes, impossibles sur 11 commandes ; abonnement, sans objet, le modèle est un achat unique ; parrainage et bouche-à-oreille, non observés, 0 session venue d'un lien d'affiliation, d'un média, d'un forum ou d'un e-mail sur 2 431 ; cheminement par canal après le premier clic, non traçable, aucun outil d'attribution tiers n'est connecté ; satisfaction produit, inconnue, 0 avis et 0 réponse de sondage ; taux de retour, inconnu, la fenêtre de rétractation court encore sur les 11 commandes]
data_limitations: [Ce document est directionnel sur tout ce qui vient après le premier achat, et il faut le dire en tête. Raselio a onze commandes, zéro client récurrent, et la commande la plus ancienne a douze jours au moment de l'écriture : il n'existe aucune donnée de rétention, aucune cohorte, aucun rachat, aucune valeur vie client. Les étapes au-delà du premier achat sont donc décrites par ce que le modèle économique rend possible et par ce que le site permet, jamais par un comportement observé. Deux compteurs se contredisent sur la même fenêtre et les deux sont portés tels quels : la série ShopifyQL compte 3 sessions ayant terminé un paiement sur 61 jours alors que 11 commandes existent sur la même période, écart non résolu, et l'entonnoir Parker au niveau annonce compte 6 achats attribués sur la fenêtre publicitaire. Aucune lecture de ce document ne repose sur le seul compteur de sessions. Les analytics Shopify ne relient pas une commande à sa page d'entrée ni à son appareil : les lectures par page et par appareil portent sur des sessions, jamais sur des acheteurs. Le trafic est pollué : sur 2 404 sessions réparties, 989 sont des sessions ordinateur depuis les États-Unis et 265 des sessions mobiles depuis les États-Unis, alors que 100 % des commandes sont facturées en France, donc tout taux de conversion calculé sur le dénominateur brut est faux vers le bas. raselio.com est bloqué par le proxy réseau : le rendu réel du site, le panier et le paiement n'ont jamais été vus, seules les pages exportées par l'API Shopify l'ont été. Aucune donnée d'e-mail, aucune séquence de relance, aucune donnée de panier abandonné en dehors du compteur de sessions. Aucune parole d'acheteur nulle part : 0 avis, 0 réponse de sondage, 2 commentaires publicitaires, 1 message client entrant. Le persona secondaire est en confiance hypothesis et n'a produit aucun achat, donc son parcours est écrit comme une hypothèse de bout en bout.]
methods_loaded: [creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/ad-account-analysis.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Lifecycle journey maps - Raselio

## Purpose and how to use

Trois documents se composent. `personas/personas-profile.md` dit **à qui** parler. `personas/persona-voice-library.md` dit **avec quels mots**. Celui-ci dit **quand**, et surtout quelle transition le message essaie de faire franchir.

**La façon de l'utiliser pour cette marque en particulier.** Presque tout le poids est sur une seule transition, celle du prospect froid au premier achat, et ce n'est pas un choix de rédaction, c'est le modèle économique. Raselio vend un objet durable, à l'unité, sans abonnement, sans lame à racheter, avec deux ans de garantie. Elle le vend même explicitement comme un avantage, page « Notre Histoire », verbatim, verified : « Chaque commande est un achat unique, sans abonnement caché ni engagement. » La conséquence est arithmétique : la valeur vie client est aujourd'hui égale à une commande, 34,99 €, et le coût par achat sur la campagne principale est de 94,16 €. Tant que cette transition-là n'est pas réglée, aucune autre étape ne compte.

Donc, avant d'ouvrir la section d'une étape aval, il faut savoir qu'elle est directionnelle. Zéro client récurrent sur onze, et douze jours d'ancienneté maximale. Ce document ne prétend pas mesurer une rétention qui n'a pas encore eu le temps d'exister.

## Lifecycle framework

Les étapes standard sont conservées, avec deux adaptations que la preuve impose.

**Étape 1 — Prospect froid.** Il croise la marque dans un fil Facebook. Mesuré : 8 des 11 commandes portent facebook comme référent, 2 instagram, 1 aucun ; 70,7 % de la dépense part sur Facebook et 93,4 % sur mobile.

**Étape 2 — Évaluation, et c'est la première adaptation.** Le prix, 34,99 €, annonce un achat d'impulsion. Le comportement dit l'inverse : 597 vues de page d'atterrissage produisent 32 ajouts au panier, soit 5,4 %, et 2 431 sessions produisent 42 ajouts au panier sur 61 jours, soit 1,7 %. Cette étape n'est pas une formalité, c'est là que la marque perd presque tout le monde, et elle mérite d'être traitée comme une étape à part entière avec ses propres sous-moments.

**Étape 3 — Premier achat.** Mesuré : 11 commandes, toutes d'un article, toutes en France, 0 remise appliquée sur 61 jours.

**Étape 4 — Première expérience.** Non mesurée du tout. 8 commandes livrées, 0 avis, 0 réponse de sondage, 0 retour demandé dans les sources. C'est le trou noir du parcours.

**Étape 5 — Rachat, et c'est la deuxième adaptation. Cette étape n'existe pas dans le modèle actuel.** Le produit est unique, durable, garanti deux ans, sans consommable à racheter. Il n'y a rien à racheter avant plusieurs années. La question n'est donc pas « comment améliorer le taux de rachat », elle est « qu'est-ce qu'on vend à un homme qui a déjà tout ». Mesuré : 0 client récurrent sur 11, taux de client récurrent 0,0 sur 90 jours.

**Étape 6 — Fidélité et recommandation.** Structurellement difficile ici, et il faut le dire plutôt que de le traiter comme un chantier ordinaire. La marque vend la discrétion comme un bénéfice, advertorial verbatim, verified : « Le colis arrive dans un emballage neutre et discret : personne n'a besoin de savoir, tout le monde finira par remarquer. » Un produit dont la promesse est que personne ne sache ne se recommande pas à voix haute. Mesuré : 0 session venue d'un lien d'affiliation, d'un média, d'un forum ou d'un e-mail sur 2 431 ; 2 commentaires publicitaires pour 44 672 impressions ; 0 avis.

## Data limitations

Le résumé exécutable, source par source.

**Mesuré.** L'entonnoir publicitaire lifetime au niveau annonce, source Parker : 775 clics sortants, 597 vues de page d'atterrissage, 32 ajouts au panier, 12 initiations de paiement, 6 achats, 209,94 € de valeur. L'entonnoir de site sur 61 jours, source ShopifyQL : 2 431 sessions, 42 avec ajout au panier, 19 arrivées au paiement, 3 comptées comme paiement terminé. Les 11 commandes avec leur horodatage, leur référent, leur pays et leur statut d'exécution. Les 30 pages d'entrée sur 90 jours.

**Inféré et directionnel.** Toutes les durées d'étape. Le délai entre la première exposition et l'achat. La valeur vie client. Le comportement de rachat. Les cohortes. Le parrainage. La satisfaction produit. Le taux de retour. Le cheminement par canal après le premier clic.

**Deux compteurs qui ne se réconcilient pas, portés tels quels.** ShopifyQL compte 3 sessions ayant terminé un paiement sur 61 jours quand 11 commandes existent sur la même fenêtre. L'écart n'est pas résolu. Aucune lecture de ce document ne repose sur le seul compteur de sessions ; là où j'ai besoin d'un taux de conversion, j'utilise l'entonnoir publicitaire au niveau annonce, qui est cohérent de bout en bout.

**Un dénominateur pollué, à connaître avant de lire un pourcentage.** Sur 2 404 sessions réparties par appareil et par pays, 989 sont des sessions ordinateur depuis les États-Unis et 265 des sessions mobiles depuis les États-Unis, contre 791 mobiles depuis la France et 119 ordinateur depuis la France. Les 11 commandes sont facturées à 100 % en France. Une part importante du trafic américain sur ordinateur n'est probablement pas un acheteur humain, et elle gonfle le dénominateur de tout taux calculé sur les sessions brutes.

## Cross-persona summary

**`soigne-discret`, flagship, confiance mixed.** Il franchit sans difficulté l'étape du clic et il meurt à l'évaluation. Sur 597 vues de page d'atterrissage, 565 repartent sans rien mettre au panier. Ce qu'il lui manque n'est pas de l'information sur le produit, c'est une raison de faire confiance à un vendeur qu'il ne trouve nulle part ailleurs. C'est là qu'il faut investir en premier, et de loin.

**`partenaire-prescriptrice`, emerging, confiance hypothesis.** Elle n'a jamais franchi une seule étape. Trois ajouts au panier et une initiation de paiement, zéro achat, sur une audience qui n'a jamais reçu ni ciblage ni message. Son parcours entier est une hypothèse et il ne doit pas recevoir de budget de production avant un test plafonné.

**Où investir en premier, et la réponse est unique.** L'étape 2, l'évaluation, pour le persona flagship. C'est la seule étape où les chiffres montrent une hémorragie mesurée, c'est celle que la marque n'a jamais financée, et c'est celle où sa meilleure créa dort à 1,33 €.

---

## Persona 1 - Le soigné discret

`soigne-discret`

**Le cadrage du parcours, en un paragraphe.** Cet homme voit la publicité dans un fil Facebook, sur son téléphone, le matin ou tard le soir. Il clique facilement, parce que le sujet le concerne et parce que la créa est bien faite. Puis il arrive sur un site qui lui explique encore le produit alors que ce qu'il veut savoir, c'est à qui il achète. Il cherche à vérifier et il ne trouve rien : la marque n'existe nulle part en dehors de son propre site. Il repart. Ceux qui restent, très peu, achètent vite et sans remise. Et après l'achat, le parcours s'arrête : il n'a rien à racheter, rien à dire, et personne ne lui demande rien.

**L'arc complet, chiffré.** Sur 775 clics sortants, 597 chargent la page, soit 77 %. Sur ces 597, 32 ajoutent au panier, soit 5,4 %, ce qui veut dire que 565 hommes lisent la page et repartent. Sur ces 32, 12 lancent un paiement, soit 37,5 %. Sur ces 12, 6 achètent, soit 50 %. Le point d'effondrement n'est pas le paiement, il est franchement en amont : **94,6 % de la perte se produit sur la page, entre la lecture et le panier.** Mesuré, source Parker, fenêtre 2026-08-10 → 2026-09-06.

L'équipe est arrivée au même endroit indépendamment, stated, brief du 3 septembre, verbatim : « **Le vrai problème est post-clic** : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 €. »

### Étape 1 — Prospect froid

**État d'esprit.** Il navigue, il ne cherche rien. `ad-account-analysis.md` lit une dépense lourde sur le fil Facebook comme une navigation posée, plus proche d'une phase de considération que d'une découverte impulsive. Mesuré : 70,7 % de la dépense sur Facebook, 26 143 impressions sur le fil Facebook contre 6 490 sur le fil Instagram.

**Déclencheurs d'entrée.** Un seul est observé et ce n'est pas un déclencheur d'acheteur, c'est un déclencheur de canal : la première commande de la boutique tombe le 2026-08-26, le lendemain du jour où le compte publicitaire quitte le régime Audience Network pour le régime fil Facebook. Verified. Les six déclencheurs humains qui circulent dans le coffre sont écrits par la marque et non confirmés ; ils sont listés dans la bibliothèque des portes d'entrée de `personas-profile.md`.

**Ce qui le fait avancer.** Une accroche qui le qualifie. `advertising-to-older-audiences.md` est net sur ce point : pour ce public, le rappel d'identité explicite, du type « si vous avez plus de cinquante ans, ceci vous concerne », lève la pertinence de façon fiable, et la subtilité sous-performe. La marque vient de commencer à le faire, avec « La tondeuse indispensable après 50 ans. » et « 58 ans. Fini de retenir ma respiration. », sur 57,37 € et trois jours.

**Risques de décrochage.** Il ne se reconnaît pas. Les annonces qui portent tous les achats montrent des hommes d'environ trente ans, torse nu et tatoués, et tutoient. Combien d'hommes de son âge ont scrollé sans se sentir concernés est inconnu et non mesurable.

**Meilleur contenu à ce stade.** Une créa qui nomme l'âge et le geste, dans un registre calme. C'est ce que fait la famille « Impeccable », qui produit quatre des six achats à 28,10 € de coût par achat contre 94,16 € sur la campagne.

**Émotion clé.** Le soulagement d'être reconnu. Pas l'excitation.

### Étape 2 — Évaluation

**C'est l'étape qui décide de tout, et c'est celle que la marque n'a jamais financée.**

**État d'esprit.** Il est convaincu par l'idée et pas par le vendeur. `emotional-delivery-and-timing.md` décrit exactement cette phase : il ne cherche plus d'information, il gère un risque, et ajouter de la pression ou du volume à ce moment le fait décider que ce n'est pas la bonne marque.

**Ce qu'il cherche, et ce qu'il trouve.** Il cherche à savoir à qui il achète. Il trouve : une note de 4,7/5 sur 1 734 avis qu'il ne peut ouvrir nulle part, parce qu'il n'y a aucun avis ; huit requêtes de marque qui ne remontent aucune trace de Raselio ; des conditions de vente dont cinq sur six portent encore le nom d'une autre marque, Cutlab, et dont les CGV affichent « Nom du médiateur : [À COMPLÉTER OBLIGATOIREMENT] » ; une page Contact vide. Tout cela est verified.

**Ce qui le ferait avancer, avec la preuve que ça marche déjà.** L'annonce `52506457654991` « RS · C11 garantie-colis », qui traite la garantie et le colis neutre, affiche 14,06 % de taux de clic, le meilleur du compte, sur 64 impressions et 1,33 € dépensés. Toute cette famille de messages tient sous cinq euros cumulés sur 677,81 € de dépense. Et l'annonce éditoriale du 14 août, `7001074469987`, qui traite une objection en quatre paragraphes et se termine par « On les garantit 12 mois. Si elles s'ébrèchent, on les remplace », affiche 0,378 € de coût par clic sortant contre 0,99 € et 1,27 € pour les deux plus gros dépensiers. Elle a été arrêtée et jamais rejouée au prix actuel.

**Risques de décrochage, par ordre de taille.** Il ne trouve rien en cherchant la marque. La FAQ traite le produit et pas l'achat : ses sept questions portent sur la tondeuse à barbe, les testicules, la douche, les irritations, la hauteur de coupe, le sans-fil et l'entretien, et aucune sur la livraison, le retour, le remboursement, la garantie ou la provenance. La page d'atterrissage n'est pas la même selon l'annonce : les quatre annonces les plus dépensières qui portent des achats renvoient vers l'advertorial, les post-it vers la fiche produit, et trois vidéos encore actives vers l'ancienne page Cutlab à 44,90 €, un prix qui n'existe plus.

**Meilleur contenu à ce stade.** Une preuve qu'il reconnaît. `advertising-to-older-audiences.md` classe en tête l'autorité et la source d'apparence établie, et note qu'un compteur d'avis élevé lit comme une preuve réelle pour ce public. La marque a mis un compteur sans avis derrière.

**Émotion clé.** Le besoin d'un appui, pas d'un argument.

### Étape 3 — Premier achat

**État d'esprit.** Décidé. Ce qui reste à faire est de ne pas le gêner.

**Ce qui est mesuré.** Onze commandes, un article chacune, 34,99 € sauf la première à 39,90 €, zéro remise appliquée sur 61 jours de série, livraison offerte. Quatre commandes tombent entre 07:23 et 09:20 heure locale et trois entre 21:33 et 22:48. Sur onze, c'est une piste et pas un motif, et ce sont les deux moments où un homme est dans sa salle de bain.

**Risques de décrochage.** Douze initiations de paiement pour six achats : la moitié de ceux qui lancent un paiement ne finissent pas. Sur un dénominateur de douze, ce n'est pas un motif ; c'est le seul endroit du parcours où l'on peut chiffrer une perte tardive et il vaut la peine d'être regardé au prochain refresh.

**Meilleur contenu à ce stade.** Retirer, pas ajouter. La marque le fait déjà : prix unique, un bouton, livraison offerte.

**Émotion clé.** Le calme.

### Étape 4 — Première expérience

**Non mesurée, entièrement. C'est le trou noir du parcours et il faut le nommer comme tel.**

Huit commandes sur onze sont marquées FULFILLED au 2026-09-06, trois UNFULFILLED. Aucun retour demandé dans les 46 fils Gmail lus. Zéro avis. Zéro réponse de sondage. La commande la plus ancienne a douze jours.

**Ce qu'on ne sait pas, et qui compte.** Si l'objet tient ses promesses. Si l'autonomie annoncée est la bonne, l'équipe ayant elle-même marqué « à confirmer » l'autonomie, les RPM et la durée de garantie. Si l'étanchéité tient, ce qui est la déception différée la plus courante de la catégorie d'après les fragments non vérifiés en annexe de `persona-voice-library.md`. Et si un homme qui a ouvert la boîte peut encore se faire rembourser : le site promet un remboursement « sans poser de questions » et la politique n'accepte que les produits « dans son état d'origine, non utilisé », verified sur les deux textes. Ces deux phrases ne peuvent pas être vraies ensemble pour un homme qui a essayé la tondeuse.

**Ce qui remplirait cette étape pour presque rien.** Un e-mail à onze personnes, dont huit ont reçu leur colis. C'est la chose la moins chère de tout le coffre et personne ne l'a faite.

**Émotion clé.** Inconnue. C'est le point.

### Étape 5 — Rachat

**Cette étape n'existe pas dans le modèle actuel, et ce n'est pas un échec, c'est une conséquence.**

Mesuré : 0 client récurrent sur 11, taux de client récurrent 0,0 sur 90 jours. Le produit est unique, durable, garanti deux ans, et la marque vend explicitement le fait qu'il n'y a rien à racheter. Il n'y a donc rien à optimiser ici tant que le catalogue ne bouge pas.

**Ce que ça implique, arithmétiquement.** La valeur vie client est aujourd'hui de 34,99 € au maximum. Le coût par achat de la campagne principale est de 94,16 €. Le coût par achat de la meilleure famille de créas est de 28,10 €. La marge brute par unité est d'environ 23,58 € d'après la fiche de marge de l'équipe, avant frais d'expédition et de paiement. Autrement dit, même la meilleure créa du compte ne dégage pas de marge sur une seule vente. Le modèle ne tient que si le coût d'acquisition descend nettement, ou si un deuxième achat existe.

**Ce que la marque a déjà, sans l'utiliser.** Le kit contient un peigne, un socle, un câble, une brosse et une huile d'entretien, d'après le document de contexte de marque. Rien de tout ça n'est vendu séparément, et aucune lame de rechange n'est proposée. Ce n'est pas une recommandation de lancer un abonnement, ce que la marque a explicitement écarté ; c'est le constat qu'il n'existe aujourd'hui aucun deuxième achat possible, pas même un consommable à quelques euros.

### Étape 6 — Fidélité et recommandation

**Structurellement difficile, et pas seulement précoce.**

Mesuré : 0 session venue d'un lien d'affiliation, d'un média, d'un forum ou d'un e-mail sur 2 431 et 90 jours. 2 commentaires publicitaires pour 44 672 impressions, soit un pour 22 336. 0 avis. 0 mention de la marque sur huit requêtes.

La cause n'est pas seulement l'âge de la marque. Un homme qui recommande publiquement une tondeuse intime déclare du même coup qu'il l'utilise, et la marque vend la discrétion comme un bénéfice. Inféré, confiance mixte : cette catégorie fabrique peu de défenseurs, et une stratégie de preuve qui compte sur eux attendra longtemps.

**Le seul vecteur que les données laissent entrevoir n'est pas un homme qui parle, c'est une femme qui achète.** Il est traité au persona 2, en hypothèse.

### T-E-E-P decomposition — du prospect froid au premier achat

Les quatre phases viennent de `emotional-delivery-and-timing.md`.

**Trigger.** Ce qu'il faut : lui renvoyer son état avec précision, sans solution immédiate. Ce que la marque fait : bien, c'est ce que l'advertorial fait de mieux. Ce qu'elle rate : elle ouvre souvent sur la blague, qui fait rire quelqu'un qui n'était pas concerné.

**Exploration.** Ce qu'il faut : une texture de marque, un point de vue, une idée de ce que c'est que d'être client ici. Ce que la marque fait : presque rien. Sur 163 annonces, une seule dit qui elle est, l'éditoriale du 14 août, arrêtée. C'est la phase la plus vide du parcours.

**Evaluation.** Ce qu'il faut : nommer l'hésitation précise, garantie, remboursement, colis, provenance, service en français. Ce que la marque fait : moins de cinq euros sur 677,81 €, alors que c'est là qu'elle affiche son meilleur taux de clic. C'est le trou le plus rattrapable du parcours.

**Purchase.** Ce qu'il faut : retirer. Ce que la marque fait : correctement.

**La lecture d'ensemble.** Le compte écrit presque tout en Trigger et en Purchase et laisse Exploration et Evaluation quasi vides. C'est l'inverse de ce dont un homme de cinquante-huit ans a besoin devant une marque qu'il n'a jamais vue.

### Transition critique

**Du clic à l'ajout au panier.** 597 vues de page pour 32 ajouts, soit 5,4 %. Mesuré. C'est là que 94,6 % de la perte se produit et c'est la seule transition dont la correction change le modèle économique. Toutes les autres transitions du parcours de ce persona sont soit correctes, soit hors de portée aujourd'hui.

### Motif de décrochage et geste de rattrapage

**Le motif.** Il lit, il ne trouve pas de raison de faire confiance, il repart. Non observé directement, faute de parole d'acheteur, mais soutenu par trois faits mesurés : le taux de clic record de la créa garantie-colis, l'absence totale de la marque dans les résultats de recherche, et l'incohérence des documents juridiques.

**Le geste de rattrapage adapté à ce persona.** Pas une relance de panier abandonné avec une remise. `advertising-to-older-audiences.md` dit que ce public est sensible à la valeur mais réagit mal aux jeux de rareté, et `emotional-delivery-and-timing.md` dit qu'ajouter de la pression en phase Evaluation le fait décider contre la marque. Le geste qui correspond est de lever l'hésitation nommée : la garantie, le colis neutre, le remboursement, le service en français. Aucune relance de ce type n'existe aujourd'hui, aucune séquence e-mail n'apparaissant dans les 46 fils lus.

### Citations qui éclairent la transition

Deux, et ce sont les seules qui existent.

> « Hello, can i know when you will ship if a customer should order today? » — formulaire de contact Shopify, fil Gmail `1a03dccaf7935d33`, 2026-08-26 à 11:20 UTC. Réponse de la marque deux minutes plus tard, en entier : « Hello sure ». Un message client sur 46 jours, et il porte sur la livraison, c'est-à-dire sur le sujet que la FAQ ne traite pas.

> « Plus rien de la bête sauvage qui sommeille en nous. » — commentaire publicitaire, 2026-08-31 à 15:46:58 UTC, sous l'annonce `52505820194591`. Cette phrase n'éclaire pas une transition, elle éclaire un refus d'entrer dans le parcours.

---

## Persona 2 - La partenaire qui commande à sa place

`partenaire-prescriptrice`

**Statut, à lire avant le reste.** Confiance `hypothesis`. **Zéro achat.** Ce parcours est écrit de bout en bout comme une hypothèse et il ne doit pas financer de production.

**Le cadrage du parcours.** Elle reçoit la publicité sans être ciblée, parce qu'Advantage+ élargit hors du ciblage saisi. Elle voit une créa écrite au masculin, avec un homme torse nu, et un texte qui tutoie un autre homme. Rien sur la page ne lui dit que ce cadeau est une bonne idée, ni comment l'offrir sans que ce soit une critique.

**Ce qui est mesuré.** La ligne femmes 45-54 a reçu 28,45 € pour 15 547 impressions, 63 clics, 0,41 % de taux de clic et zéro achat. L'ensemble des lignes femmes a reçu 91,80 € au niveau annonce, soit 11,9 % de la dépense, pour zéro achat. Le seul signal d'intention est stated par l'équipe, brief du 3 septembre, verbatim : « Les femmes 45-54 montrent un signal faible mais réel d'achat-cadeau (3 ATC, 1 paiement initié) ».

**Étapes 1 à 3, en hypothèse.** Prospect froid : elle voit la publicité, sans ciblage et sans message pour elle. Évaluation : son risque n'est pas de se blesser, c'est de vexer, et aucune créa de la marque n'a jamais traité cette objection. Premier achat : jamais franchi.

**Étapes 4 à 6.** Sans objet, faute de premier achat.

**Transition critique.** De la vue au clic. 15 547 impressions pour 63 clics, soit 0,41 % de taux de clic contre 2,73 % sur la campagne principale. Elle ne clique pas, et la raison la plus simple est qu'elle voit une publicité qui ne s'adresse pas à elle.

**Motif de décrochage et geste de rattrapage.** Trois ajouts au panier et une initiation de paiement sans achat, stated. Le geste qui correspond, s'il devait être testé, est une créa qui lui parle et une page qui lui dit comment offrir sans critiquer. La créa 28 existe, texte à l'image stated : « Le cadeau qu'il ne s'offrira jamais lui-même. / Et dont vous profiterez aussi. / Colis neutre · Livraison offerte ». Elle n'a jamais été mise en ligne dans un ad set.

**Citations.** Aucune. Aucune femme n'a jamais écrit un mot à cette marque.

---

## Cross-persona patterns

**Un — La marque a un problème d'entonnoir, pas d'audience.** 775 clics sortants pour 6 achats. Le clic n'est pas cher et il est abondant. La perte se produit sur la page, à 94,6 %. Tant que ce chiffre ne bouge pas, produire trente créas de plus tous les deux jours n'améliore rien : quatre lots de 19, 30, 27 et 29 annonces ont été chargés en quatre jours consécutifs pour 68,91 € au total, soit 0,66 € par annonce.

**Deux — La phase d'évaluation est la phase la moins financée et la plus prometteuse, pour les deux personas.** Chez l'homme, elle porte le meilleur taux de clic du compte pour 1,33 €. Chez la femme, elle n'a jamais été écrite du tout. C'est le même trou vu de deux côtés.

**Trois — Le modèle économique n'a pas d'aval.** Un produit durable, sans consommable, sans abonnement, sans deuxième référence. La valeur vie client plafonne à 34,99 € et le coût par achat de la campagne principale est de 94,16 €. Aucune amélioration de rétention n'est possible parce qu'il n'y a rien à retenir. La seule variable est le coût d'acquisition.

**Quatre — La marque n'a jamais parlé à ses clients après l'achat.** Zéro e-mail de suivi sur 46 fils lus, zéro sondage, zéro demande d'avis. Ce n'est pas une lacune de rétention, c'est une lacune de connaissance : c'est ce silence qui prive tout le système persona de sa source de premier rang.

**Cinq — Le produit combat sa propre recommandation.** La discrétion est vendue comme un bénéfice et elle empêche le bouche-à-oreille. Toute stratégie de preuve qui repose sur des clients qui parlent doit tenir compte de ça, et probablement chercher sa preuve ailleurs : un expert, un comparatif, une démonstration.

## Critical-transition map

| persona | transition la plus importante | pourquoi elle compte | mesurée ou inférée |
|---|---|---|---|
| `soigne-discret` | vue de page d'atterrissage → ajout au panier, 32 sur 597, soit 5,4 % | 94,6 % de la perte totale du parcours se produit là, et c'est la seule transition dont la correction change le modèle économique | **mesurée**, entonnoir Parker lifetime |
| `soigne-discret` | initiation de paiement → achat, 6 sur 12, soit 50 % | la moitié de ceux qui commencent à payer ne finissent pas, sur un dénominateur de douze | **mesurée**, à surveiller, dénominateur trop petit pour conclure |
| `soigne-discret` | premier achat → deuxième achat | il n'existe pas de deuxième achat possible dans le catalogue actuel | **mesurée**, 0 sur 11 |
| `soigne-discret` | achat → parole publique | 0 avis et 2 commentaires pour 44 672 impressions, alors que c'est la seule source qui débloquerait tout le système persona | **mesurée** |
| `partenaire-prescriptrice` | impression → clic, 63 sur 15 547, soit 0,41 % | elle n'a jamais reçu un message écrit pour elle, donc rien ne dit si l'audience est mauvaise ou seulement mal servie | **mesurée** pour le chiffre, **inférée** pour la cause |

## Recommendations

Chaque recommandation nomme son persona, son étape, l'action, la preuve, et sa limite de donnée. Aucune n'est proposée sans preuve dans les sources.

**Un — Demander un avis aux onze acheteurs par e-mail.** Persona : `soigne-discret`. Étape : première expérience. Action : un e-mail, une question ouverte, aux huit acheteurs livrés en priorité. Preuve : 0 avis existant confirmé par l'outil, 8 commandes FULFILLED, 0 e-mail de suivi sur 46 fils lus, et une landing qui affiche 1 734 avis inexistants. Limite : onze réponses au maximum, donc jamais un échantillon, mais onze fois plus que ce qui existe aujourd'hui. C'est la seule action du document qui débloque simultanément la preuve sociale, la voix client et la validation du persona.

**Deux — Financer l'étape d'évaluation.** Persona : `soigne-discret`. Étape : évaluation. Action : mettre un budget réel derrière la famille garantie, colis neutre et remboursement, et remettre en ligne le format éditorial du 14 août au prix actuel. Preuve : 14,06 % de taux de clic sur `52506457654991` pour 1,33 € dépensés ; 0,378 € de coût par clic sortant sur `7001074469987` contre 0,99 € et 1,27 € pour les deux plus gros dépensiers. Limite : les deux chiffres reposent sur de petits volumes, 64 impressions pour la première et 6 229 pour la seconde, et le format éditorial pointe encore vers une page produit qui n'existe plus au bon prix.

**Trois — Réparer ce que l'homme trouve quand il vérifie.** Persona : `soigne-discret`. Étape : évaluation. Action : sortir « Cutlab » des six politiques, remplir le champ médiateur des CGV, remplir la page Contact, et harmoniser la page d'atterrissage des annonces. Preuve : cinq politiques sur six portent encore l'ancien nom, les CGV portent « Nom du médiateur : [À COMPLÉTER OBLIGATOIREMENT] », la page Contact est vide, et trois annonces vidéo actives renvoient vers `/products/cutlab-essentials-bundle` à 44,90 €. Limite : aucune donnée ne prouve que ces pages sont lues avant l'achat ; ce sont celles qu'un acheteur méfiant ouvre, et la méfiance est un frein que l'équipe s'attribue elle-même.

**Quatre — Traiter la livraison et le retour dans la FAQ.** Persona : `soigne-discret`. Étape : évaluation. Action : ajouter les questions de livraison, de retour, de remboursement et de provenance à la FAQ de la landing. Preuve : les sept questions actuelles portent toutes sur le produit ; la seule question qu'un client ait posée à la marque portait sur la date d'expédition ; et la contradiction entre « sans poser de questions » et « non utilisé » n'est traitée nulle part. Limite : un message client sur 46 jours n'est pas un motif.

**Cinq — Tester la partenaire à budget plafonné, avant d'y croire.** Persona : `partenaire-prescriptrice`. Étape : prospect froid. Action : un ad set femmes 45-60 plafonné à 10 % du budget, avec la créa 28 qui existe déjà. Preuve : 91,80 € déjà dépensés sur des femmes sans message ni ciblage, pour zéro achat, et un signal d'intention de 3 ajouts au panier stated par l'équipe. Limite : trois ajouts au panier sans achat ne justifient pas un ad set permanent ; ils justifient un test avec un seuil d'arrêt écrit d'avance.

**Six — Ne rien changer à l'étape du paiement pour l'instant.** Persona : `soigne-discret`. Étape : premier achat. Action : aucune. Preuve : 6 achats sur 12 initiations de paiement, sur un dénominateur de douze, et zéro remise appliquée sur 61 jours sans que ça empêche les achats. Limite : le compteur de sessions ShopifyQL et le compteur d'achats ne se réconcilient pas sur cette fenêtre, et il faut une base plus large avant de toucher à cette étape.

## Open loops

**Boucle 1.** Observation : 597 hommes chargent la page d'atterrissage et 565 repartent sans rien mettre au panier, alors que le clic coûte moins d'un euro et que la marque produit trente créas nouvelles tous les deux jours. Pull : Surprise, elle a tiré en voyant que la perte du parcours ne se produit pas là où toute la production est concentrée. Question : que cherche un homme sur cette page qu'il n'y trouve pas ? Justification : tant que ce chiffre ne bouge pas, chaque euro supplémentaire en publicité achète le même départ, et le modèle économique ne tient pas. Territoire : Product.

**Boucle 2.** Observation : le produit est durable, garanti deux ans, sans consommable ni abonnement, et la marque vend ça comme un avantage ; la valeur vie client plafonne donc à 34,99 € face à un coût par achat de 94,16 € sur la campagne principale. Pull : Tension, elle a tiré en mettant la marge par unité en face du coût d'acquisition. Question : qu'est-ce qu'un homme qui possède déjà cette tondeuse pourrait vouloir acheter ensuite ? Justification : sans deuxième achat, la marque n'a qu'un levier, faire baisser le coût d'acquisition, et elle n'a pas de marge d'erreur. Territoire : Product. Seule la marque peut répondre.

**Boucle 3.** Observation : la moitié de ceux qui lancent un paiement ne finissent pas, six achats pour douze initiations de paiement, et personne ne sait ce qui se passe entre les deux. Pull : Curiosité, elle a tiré parce que c'est la seule perte tardive chiffrable du parcours. Question : que se passe-t-il entre le moment où un homme lance son paiement et le moment où il abandonne ? Justification : c'est la moitié d'un achat sur deux, sur une marque qui en a onze, et la cause peut être technique autant que psychologique. Territoire : Product. Seule la marque peut répondre.

**Boucle 4.** Observation : huit hommes ont reçu leur colis, aucun n'a été recontacté, aucun n'a écrit un mot, et la marque affiche 1 734 avis sur sa page d'accueil. Pull : Gap, elle a tiré en voyant que l'étape de première expérience est totalement non mesurée alors qu'un e-mail à huit personnes la remplirait. Question : que s'est-il passé pour les huit hommes qui ont ouvert la boîte ? Justification : c'est la seule étape du parcours où la marque peut encore agir sur des clients existants, et c'est aussi la source qui débloquerait tout le système persona. Territoire : Product. Seule la marque peut répondre.

**Boucle 5.** Observation : la marque vend explicitement le fait que personne ne saura, et elle n'a ni avis, ni recommandation, ni bouche-à-oreille, avec zéro session venue d'un forum, d'un média ou d'un e-mail sur 2 431. Pull : Pattern, elle a tiré parce que la promesse de discrétion et l'absence totale de conversation pointent dans la même direction sur trois sources différentes. Question : comment une marque de cette catégorie fabrique-t-elle de la preuve quand ses clients ne veulent pas parler ? Justification : toute la stratégie de preuve de la marque suppose des clients qui s'expriment, et si la catégorie l'interdit, il faut construire la preuve ailleurs avant de dépenser plus. Territoire : Messaging.
