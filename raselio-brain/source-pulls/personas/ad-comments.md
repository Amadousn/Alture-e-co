---
brand: raselio
doc: ad-comments
generated_on: 2026-09-07
refresh_by: 2026-10-07
sources_read: [Parker MCP brand `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37` (org « Dylan's Org ») — `search_facebook_ad_comments_sql` en mode default, limit 500, offset 0, tri created_time desc, avec les champs ad_ids, ad_names, post_ids, parent_comment_ids, facebook_comment_ids, comment_length, author_id et snapshot_date ; `search_facebook_ad_comments_semantic`, topK 50, minScore 0, requête « tondeuse intime homme poils rasage objection prix avis », shouldIncludeNestedComments true ; `search_facebook_ads_sql` en lookup `adIds` sur les deux annonces commentées avec les blocs ad_analysis, demographics et extended ; `get_brand_persona`. Plateforme unique : Facebook, page 1234695553067195, compte publicitaire 1573950771030463. Docs amont lus : source-pulls/personas/ad-account.md, personas/voice-of-customer/voc-corpus-profile.md, personas/voice-of-customer/voc-metaphor.md, personas/voice-of-customer/voc-objection.md, personas/voice-of-customer/voice-of-customer.md, sub-context-docs/customer-journey-and-persona-discovery.md, sub-context-docs/reputation-analysis.md, sub-context-docs/ad-account-evaluation.md, source-pulls/meta-ads-all.md, source-pulls/meta-account-breakdowns.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md, running-notes/brand-rules.md]
comments_read: 2 commentaires, soit la totalité du corpus. Dénominateur : 183 lignes d'annonces retournées par le pull Meta du 2026-09-06 pour le compte 1573950771030463, dont 163 Raselio et 20 de la marque soeur Trael ; 173 annonces indexées côté Parker. Deux annonces sur 183 portent un commentaire, soit 1,1 %. Fenêtre de diffusion : première dépense le 2026-08-10, lecture au 2026-09-07, 28 jours calendaires dont 8 à zéro du 17 au 24 août. Contre les impressions : 43 270 impressions Raselio au niveau annonce et 1 084 clics sortants, soit 0,046 commentaire pour mille impressions.
data_limitations: [LE CORPUS ENTIER FAIT DEUX LIGNES ET L'UNE D'ELLES FAIT TROIS CARACTÈRES. Ce n'est pas un échantillon, c'est la totalité, vérifiée par deux appels indépendants le 2026-09-07 : l'appel SQL paginé à 500 renvoie deux enregistrements, l'appel sémantique à seuil 0 et topK 50 renvoie `totalCommentsAnalyzed: 2`. Aucune récurrence supérieure à 1 n'est calculable sur un dénominateur de 2, donc aucun motif ne peut être établi et aucune confiance ne peut dépasser thin dans tout ce document. Le champ `total` de la réponse SQL renvoie la valeur 0 alors que le tableau `results` contient bien deux lignes et que le message dit « Fetched 2 comment(s) » : c'est une incohérence du compteur de l'API, pas une incohérence du corpus, et le décompte retenu est celui du tableau et de l'appel sémantique. Les deux commentaires ont `author_id` et `author_name` vides côté Parker : aucun âge, aucun genre, aucune localisation, aucun historique d'auteur n'est lisible, donc toute lecture d'identité ici est une inférence sur cinquante et un caractères de texte. Les deux commentaires sont de premier niveau, `parent_comment_ids` vide sur les deux, et aucun n'a reçu de réponse ni de like : il n'existe aucun fil, donc aucune lecture de conversation. Instagram est un angle mort total : la ventilation Parker donne 28,2 % de la dépense Raselio sur Instagram et aucun outil de cette installation ne rend les commentaires Instagram, donc les réactions sur près d'un tiers de la diffusion n'ont jamais été lues. Même chose pour les réactions par message privé, absentes de tout outil. Aucun outil Reddit n'existe dans cette installation Parker, vérifié par recherche d'outil le 2026-09-07, donc la corroboration croisée que ce document réclame ne peut pas être faite contre une source non contrôlée par la marque. Les sources acheteur réel ont été interrogées et sont vides, ce qui n'est pas la même chose qu'inaccessibles : `search_customer_reviews_sql` renvoie 0 avis avec le message explicite que la base est vide et que ce n'est pas un problème d'accès, `semantic_search_post_purchase_survey` renvoie `totalResponsesForBrand: 0`. La date d'instantané des deux commentaires est le 2026-09-06 à 05:19:20 UTC : un commentaire déposé après cette heure ne serait pas encore dans l'index.]
methods_loaded: [creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Ad comments — persona signal — Raselio

## La piste de recherche, avant les lectures

Il faut commencer par le résultat, parce que le résultat est la taille du corpus.

Une sonde faite plus tôt dans ce build laissait penser que la section commentaires de ce compte tenait en deux lignes. Je l'ai vérifiée pour de bon, avec deux appels qui ne passent pas par le même chemin. Le premier est un appel SQL sur `search_facebook_ad_comments_sql`, marque `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, sans filtre d'annonce, sans filtre de date, sans filtre de texte, pagination réglée à 500 lignes et offset 0, tri par date décroissante, avec les champs d'identifiant d'annonce, de post, de parent et de longueur demandés en plus. Il renvoie deux enregistrements. Le second est un appel sémantique sur `search_facebook_ad_comments_semantic`, topK 50, seuil de similarité abaissé à 0 pour que rien ne soit filtré, réponses imbriquées incluses. Il renvoie les deux mêmes lignes et le compteur `totalCommentsAnalyzed: 2`.

Deux commentaires. Pour tout le compte. Depuis le premier euro dépensé le 2026-08-10. Verified.

Il faut poser ce chiffre contre ses dénominateurs, parce que c'est là qu'il devient une mesure et pas une anecdote. Le pull Meta du 2026-09-06 rend 183 lignes d'annonces pour le compte 1573950771030463, dont 163 Raselio et 20 de la marque soeur Trael. Parker en indexe 173. Deux de ces annonces portent un commentaire, soit 1,1 % des 183. Sur les 43 270 impressions et les 1 084 clics sortants du périmètre Raselio, ça fait 0,046 commentaire pour mille impressions. Autrement dit, il faut environ vingt-deux mille impressions pour qu'un Français écrive un mot sous une publicité de cette marque.

À cette taille, la décision de rédaction est facile et je la prends : le corpus entier tient dans ce document, mot pour mot, avec tous ses champs. Il n'y a rien à échantillonner, rien à résumer et rien à choisir.

**Ce que j'ai lu en plus des commentaires eux-mêmes.** La lecture créative complète des deux annonces commentées, obtenue par un appel `adIds` sur Parker avec les blocs d'analyse créative, de démographie et de champs étendus. C'est nécessaire ici : la méthode interdit de dire ce qu'une annonce montre à partir de son nom, et le nom d'annonce « RASELIO | IMPECCABLE | BOXER » ne prouve rien de ce qu'un commentateur a vu. J'ai aussi lu le document amont `source-pulls/personas/ad-account.md`, qui a déjà relevé l'un des deux commentaires et l'a laissé à ce document, ainsi que le profil de corpus voix-client et les deux extractions qui portent ce verbatim.

**Les méthodes chargées avant l'analyse.** `persona-research-and-creative-strategy-process.md` pour la séparation stricte entre l'audience servie et l'acheteur réel, pour l'interdiction de promouvoir un comportement en persona, et pour l'échelle de confiance qui met le commentaire publicitaire loin derrière le sondage post-achat et l'avis propriétaire. `customer-review-mining-method.md` pour la règle du dénominateur, pour la règle qui dit qu'une phrase isolée est un candidat et jamais un motif, et pour le repérage de l'écho de marque. `emotional-delivery-and-timing.md` pour l'état émotionnel d'arrivée et les quatre phases TEEP, Trigger, Exploration, Evaluation, Purchase. `advertising-to-older-audiences.md` parce que les deux annonces commentées ont livré 89,4 % et 86,0 % de leur budget à des hommes de 45 ans et plus, et que ce document est le prior de la catégorie pour ce public. `creative-strategy-fundamentals.md` pour la posture des boucles ouvertes, en particulier la règle qui dit qu'un compte de mentions n'est pas une signification et que le blanc bat la lecture inventée.

**Le corpus, en entier.**

> « Plus rien de la bête sauvage qui sommeille en nous. »
> Facebook, page 1234695553067195, le 2026-08-31 à 15:46:58 UTC. Sous l'annonce `52505820194591`, « RASELIO | IMPECCABLE | BOXER », post `1234695553067195_122108833431409627`. Commentaire de premier niveau, `parent_comment_ids` vide. 0 like, 0 réponse. Longueur 51 caractères. Auteur anonyme, `author_id` et `author_name` vides. Identifiant Parker `3c2ca5a3-6d53-5564-6fd8-f33d60753d83`. Lien : https://www.facebook.com/122109959949409627/posts/122108833431409627?comment_id=1395943165961254

> « Lol »
> Facebook, page 1234695553067195, le 2026-09-01 à 15:37:47 UTC. Sous l'annonce `52505897035991`, « EMOTION 3 - Barbe soignee et tes boules », post `1234695553067195_122108944095409627`. Commentaire de premier niveau, `parent_comment_ids` vide. 0 like, 0 réponse. Longueur 3 caractères. Auteur anonyme, `author_id` et `author_name` vides. Identifiant Parker `b86f8833-cadf-bad9-8cfc-1f0c6893a98f`. Lien : https://www.facebook.com/122109959949409627/posts/122108944095409627?comment_id=2257250055117203

C'est tout. Aucun commentaire n'a reçu de réponse de la marque, verified sur le champ `comment_count` à 0 des deux lignes.

## Identity signals observed

Un avertissement de dénominateur qui vaut pour toute cette section, et je ne le répéterai pas à chaque ligne. Deux commentaires, dont un de trois caractères. Chaque identité nommée ci-dessous repose sur une seule occurrence. La méthode de lecture des avis est explicite : une phrase isolée est un candidat, jamais un motif, et il faut une répétition indépendante avant de promouvoir un descripteur. Rien ici n'atteint ce seuil. Confiance thin partout, sans exception.

### Signal 1 — L'homme pour qui la pilosité est une force en réserve, pas un désordre à ranger. Inferred, confiance thin, une occurrence sur deux.

Le commentaire est : « Plus rien de la bête sauvage qui sommeille en nous. »

Voici pourquoi je le lis comme une identité et pas comme une blague.

L'image est double et elle est construite avec soin. Le premier étage est la pilosité vue comme une bête sauvage, une image de puissance et pas de saleté. Le deuxième étage est le verbe « sommeille » : la bête n'est pas déchaînée, elle dort, elle est en réserve. Un homme qui décrit ses poils comme une puissance endormie ne décrit pas un problème d'hygiène, il décrit un attribut. Et le « nous » est le mot qui fait basculer la phrase de l'opinion vers l'identité : l'auteur ne parle pas de lui, il parle au nom d'un groupe d'hommes dont il se compte membre. C'est une revendication d'appartenance.

Le « plus rien » porte la perte. La phrase entière est une élégie courte, sur un ton ironique, pour quelque chose qu'on est en train de perdre. Ce que cet homme voit dans l'annonce, ce n'est pas une tondeuse, c'est une norme qui avance.

Est-ce que cet homme est un acheteur ? Rien ne le dit et j'insiste, parce que c'est le biais central de cette source. Un commentateur n'est pas un acheteur, et la moitié du travail de ce document est de ne jamais laisser cette confusion passer. Ce que je peux dire est plus étroit : c'est un homme que Meta a servi et qui a pris le temps d'écrire une phrase construite plutôt que de passer son chemin.

**Ce que la créa qu'il regardait montrait exactement.** Lecture média complète, verified sur Parker le 2026-09-07. `52505820194591` « RASELIO | IMPECCABLE | BOXER » est une image fixe sur fond beige clair. En haut, en petit noir : « Approuvée par plus de 35 000 hommes ». Sous ce texte, en très gros et très gras : « Soyez impeccable partout. », avec une ondulation vert citron tracée sous le mot « partout ». À gauche, un homme photographié du milieu des cuisses jusqu'à la tête, torse nu, en boxer gris chiné. Peau olivâtre, cheveux bouclés foncés, barbe courte entretenue. Trois tatouages visibles : une scène de nature sur l'épaule droite, du texte en script sur le côté droit du torse, et le mot « FOCUS » à la verticale sur l'avant-bras gauche. Il regarde hors champ, expression neutre. Trois flèches noires courbes partent de la droite et désignent son torse, son entrejambe et le haut de sa cuisse. À droite, la tondeuse noire mate debout sur son socle, lame céramique blanche visible, « RASELIO » en capitales blanches sur le socle. La description Parker du modèle le situe « in his early to mid-30s ». Le texte publicitaire chargé tutoie, verbatim : « La tondeuse ultime pour tout le corps n'existe pas... / À moins que tu n'aies pas encore essayé la Raselio ? »

Donc l'homme qui écrit « la bête sauvage qui sommeille en nous » regardait un corps de trentenaire glabre, athlétique et tatoué, présenté comme l'état normal, avec trois flèches qui désignent ce qu'il faut raser. La méthode sur les audiences plus âgées dit que la preuve ne se transfère que si elle a l'âge du spectateur. Ici la preuve n'a ni son âge ni, peut-être, son corps.

### Signal 2 — L'homme qui trouve ça drôle et qui ne va pas plus loin. Inferred, confiance thin, une occurrence sur deux.

Le commentaire est : « Lol ». Trois caractères, aucune ponctuation, aucun emoji, aucune majuscule.

Il n'y a presque rien à en tirer et je refuse d'en tirer plus qu'il n'y a. Ce qu'on peut dire tient en deux points, et le second est le seul qui vaille.

Premier point : c'est un rire, pas une objection ni une adhésion. Il ne dit ni que le produit est bon, ni qu'il est mauvais, ni que l'auteur est concerné.

Deuxième point, plus utile : ce qu'il a fait rire. Lecture média complète, verified sur Parker le 2026-09-07. `52505897035991` « EMOTION 3 - Barbe soignee et tes boules » est bâtie sur le même gabarit que la précédente, même fond crème, même bandeau « Approuvée par plus de 35 000 hommes », même produit héros à droite, même modèle masculin de la fin de la vingtaine au début de la trentaine, torse nu, boxer gris, tatouages au bras droit et aux côtes. Ce qui change est la headline et un accessoire. La headline dit, verbatim : « Ta barbe est soignée. / Et tes boules ? » Et sur l'entrejambe du modèle est collé un post-it jaune vif portant un smiley dessiné à la main, deux points et une courbe. Le texte publicitaire chargé, verbatim : « Tu passes 10 minutes sur ta barbe chaque matin. Et le reste ? Tes boules méritent le même respect. ✅ Conçue pour la zone intime ✅ Zéro coupure ✅ 100% waterproof ».

C'est la créa la plus explicitement humoristique du compte parmi celles qui ont reçu du budget, et elle a récolté le seul rire du compte. Inferred, confiance thin : la créa a obtenu exactement l'effet qu'elle demandait. Ce n'est pas un compliment. `emotional-delivery-and-timing.md` rappelle qu'un état de forte intensité rétrécit l'attention et pousse à l'action immédiate mais supprime le traitement réflexif, celui qui fait qu'on s'identifie à ce qu'on voit. Un « Lol » est la trace d'une attention obtenue sans identification. L'annonce a produit 868 impressions, 31 clics, 3,57 % de CTR, 2 ajouts au panier, 1 initiation de paiement et zéro achat, verified sur Parker en lifetime.

### Le blanc nommé, et il est plus grand que les deux signaux

Aucune identité d'acheteur ne se lit ici. Aucun des deux auteurs ne dit qu'il a acheté, ne raconte un usage, ne décrit une salle de bain, ne nomme un âge, ne nomme une situation. Les six achats attribués du compte n'ont laissé aucun mot. Onze commandes Shopify n'ont laissé aucun mot. La section « qui achète » de cette source est vide, et elle est vide parce que les acheteurs de cette marque ne commentent pas, pas parce que l'outil n'a pas répondu.

## Recurring objections, with the identity behind each

**Il n'y a aucune objection récurrente, parce qu'il n'y a qu'une seule objection.** C'est la section que ce document devrait porter en priorité, la méthode le dit, et c'est celle où la source est la plus pauvre. Il faut le dire franchement plutôt que d'habiller une phrase en motif.

### Objection 1 et unique — « se raser là, c'est renoncer à quelque chose ». Stated dans la forme ironique, inferred dans le fond, confiance thin, une occurrence sur deux.

Verbatim, 2026-08-31 : « Plus rien de la bête sauvage qui sommeille en nous. »

**L'objection de surface** est une blague sur la virilité. C'est ce que la phrase dit à voix haute.

**L'inquiétude qui se tient dessous, et ceci est ma lecture, marquée inferred :** l'homme ne discute pas la sécurité de l'outil, ni le prix, ni la marque, ni le délai de livraison. Il discute le geste lui-même. Il pose que se raser cette zone est une soustraction et pas une amélioration. C'est une objection qui se situe **en amont** de toutes celles que la marque traite.

**L'identité derrière cette objection**, inferred : un homme pour qui la pilosité fait partie de ce qu'il est, et pour qui la norme du corps lisse est une mode qui arrive du dehors et qu'il regarde avec ironie. Il ne se dit pas contre le produit. Il se dit spectateur d'un changement qu'il n'a pas demandé.

**Pourquoi cette objection compte plus que sa taille.** Elle ne figure nulle part dans le travail de la marque. Verified sur trois surfaces. La liste d'objections que l'équipe s'est écrite le 2026-09-03 en contient sept, verbatim, stated : « « C'est pour les jeunes », « je vais me couper », « ma tondeuse à barbe suffit », « arnaque / ça vient de Chine », « colis pas discret », « à quoi sert la LED », « ça pique à la repousse ». » Aucune ne porte l'idée d'une perte. La FAQ de la landing porte sept questions et aucune non plus. Les 30 fiches créa du 2026-09-03 n'y touchent pas. Sur les 24 annonces lues en entier par le document amont `ad-account.md`, aucune n'adresse un homme qui pense perdre quelque chose. L'absence côté créa se compte à 163 sur 163.

Il faut tenir les deux bouts en même temps. Une occurrence n'est pas une objection de catégorie. Et c'est en même temps la seule objection spontanée que cette marque possède, ce qui lui donne un poids que sa fréquence ne justifie pas.

### Les objections que la marque attend et que personne n'a formulées

C'est une absence mesurée et elle mérite d'être notée comme un résultat. Sur les deux commentaires du corpus, zéro porte sur le prix, zéro sur le risque de coupure, zéro sur la garantie, zéro sur la discrétion du colis, zéro sur l'origine du produit, zéro sur la LED, zéro sur la repousse. Les sept objections que l'équipe construit sa prochaine série de créas pour traiter n'ont aucune trace dans la seule surface publique où un Français a réagi à cette marque.

Je ne conclus pas que ces objections n'existent pas. Deux commentaires ne peuvent rien réfuter. Je conclus que **la liste des sept objections n'a jamais été confrontée à un mot de client**, et que ce document ne peut pas la confirmer.

## Moments of recognition

**Aucun. Zéro sur deux.**

Une reconnaissance, au sens de ce document, c'est un commentateur qui dit qu'une annonce le décrit, nomme sa situation ou parle de qui il est. Aucun des deux commentaires ne fait ça. Le premier prend explicitement ses distances avec ce que l'annonce propose. Le second rit.

L'absence est un résultat et pas seulement un manque. La marque a diffusé 43 270 impressions autour d'un problème qu'elle décrit elle-même, verbatim sur son advertorial, comme universel : « Personne n'en parle, mais tout le monde la connaît : cette micro-hésitation avant de poser la lame. » Si cette description était aussi reconnaissable qu'elle le prétend, on attendrait qu'au moins un homme l'écrive. Aucun ne l'a fait. Inferred, confiance thin, parce que deux commentaires ne peuvent pas non plus infirmer une promesse.

Deux explications tiennent et cette source ne permet pas de trancher entre elles. Soit le format statique ne provoque pas d'écriture, soit le sujet interdit d'écrire quoi que ce soit sous son vrai nom sur un fil Facebook public. La seconde a une force particulière ici : c'est un produit dont la marque vend elle-même la discrétion, verbatim sur l'advertorial, « personne n'a besoin de savoir ». Un homme qui achète pour que personne ne sache ne commente pas sous son nom. La question part en boucle ouverte.

## Targeted-versus-showed-up gap

C'est la section où cette source a quelque chose de propre à dire, parce que les deux annonces commentées ont une ventilation démographique lisible au niveau annonce.

**Ce que la créa visait, lu dans le casting et dans le texte, verified sur la lecture média.** Les deux annonces montrent le même type d'homme : la description Parker donne « early to mid-30s » sur BOXER et « approximately 28 to 35 years old » sur EMOTION 3. Torse nu dans les deux cas, tatoué dans les deux cas, athlétique dans les deux cas, glabre dans les deux cas. Les deux textes publicitaires tutoient, « À moins que tu n'aies pas encore essayé » et « Tu passes 10 minutes sur ta barbe ». La headline de EMOTION 3 dit « Et tes boules ? ». C'est une créa écrite pour un homme jeune, et le brief d'équipe du 2026-08-23 le confirme, stated, verbatim : « **ICP :** Homme FR, 18-34 ans (persona « Kevin, 27 ans ») ».

**Ce que la plateforme a servi, verified sur la ventilation Parker au niveau annonce, lifetime.**

| annonce | dépense | 18-24 | 25-34 | 35-44 | 45-54 | 55-64 | 65+ | part 45+ |
|---|---|---|---|---|---|---|---|---|
| `52505820194591` BOXER | 8,62 € | 1,7 % | 2,7 % | 6,1 % | 10,9 % | 21,9 % | **56,6 %** | **89,4 %** |
| `52505897035991` EMOTION 3 | 17,81 € | 2,3 % | 5,5 % | 6,2 % | 13,2 % | **42,4 %** | 30,4 % | **86,0 %** |
| les deux ensemble | 26,43 € | 2,1 % | 4,6 % | 6,2 % | 12,4 % | 35,7 % | 39,0 % | **87,1 %** |

Sur les deux annonces ensemble : hommes 97,7 % de la dépense, femmes 2,0 %, mobile 90,4 %, Facebook 77,6 % et Instagram 21,8 %. Verified.

**L'écart, dit simplement.** La créa parle à un homme de trente ans et le compte l'a montrée, à 87 %, à des hommes de plus de 45 ans. Sur l'annonce BOXER, celle qui a reçu le commentaire de fond, la tranche 65 et plus prend à elle seule 56,6 % du budget de l'annonce. C'est la tranche la plus servie de toute cette lecture.

**Ce que ça change pour la lecture du commentaire, et je le marque inferred parce que c'est une inférence de probabilité et pas une donnée d'auteur.** Le champ auteur est vide, donc je ne sais pas qui a écrit « la bête sauvage ». Mais si 89,4 % du budget de cette annonce est allé à des hommes de 45 ans et plus, et 56,6 % à des hommes de 65 ans et plus, alors l'homme le plus probable derrière cette phrase est un homme âgé, pas un jeune. Et sa phrase se lit différemment sous cet éclairage : ce n'est plus un jeune qui plaisante sur la virilité, c'est probablement un homme d'une autre génération qui regarde une norme corporelle nouvelle défiler dans son fil. Confiance thin. C'est une probabilité de diffusion, pas une identification.

**Ce que l'écart ne dit pas.** Il ne dit pas que la créa jeune repousse les jeunes ni qu'elle attire les vieux. Les treize ad sets Raselio sont réglés en 18-65 tous genres avec Advantage+ activé, verified au 2026-09-06, donc la plateforme choisit librement à qui livrer. Ce qu'on observe est le résultat d'une enchère, pas d'un ciblage. La marque n'a jamais opposé, à budget égal, une créa écrite pour un homme de trente ans à une créa écrite pour un homme de cinquante-huit ans.

## Behavioral-signal states observed

Des états situationnels posés sur une personne, jamais des identités. La méthode persona est stricte là-dessus et la distinction doit survivre au passage vers la synthèse. À cette taille de corpus, un seul état est observable et il n'est même pas certain.

**L'état de spectateur amusé.** Inferred, confiance thin, une occurrence. Les deux commentaires sont écrits depuis la position de quelqu'un qui regarde et commente, pas de quelqu'un qui envisage. Ni l'un ni l'autre ne pose une question, ne demande un prix, ne mentionne une commande. `emotional-delivery-and-timing.md` place cet état hors des quatre phases TEEP : ce ne sont ni des déclencheurs, ni de l'exploration, ni de l'évaluation, ni de l'achat. C'est du divertissement. Sur une créa qui vise l'achat, c'est un état coûteux, parce qu'il consomme la diffusion sans rien qualifier.

**Ce qui n'est pas observable ici, et qu'il faut nommer plutôt que deviner.** Aucun état d'appréhension avant le geste. Aucun état de doute sur le vendeur. Aucun état de préparation avant un moment qui compte. Aucun état de cadeau. Aucun état lié à l'âge ou à la vue. Tous ces états existent dans les textes de la marque, et le document `ad-account.md` les a relevés dans la créa. Aucun n'existe dans la parole des gens. Le calque le plus travaillé par la marque, l'appréhension au moment du geste, n'a produit zéro commentaire sur zéro annonce.

## Corroboration and noise

**Ce que j'ai lu, dans le détail, pour que le chiffre soit vérifiable.** Deux commentaires, soit la totalité du corpus. Deux annonces sur les 183 lignes du pull Meta, soit 1,1 %. Une seule plateforme, Facebook, page 1234695553067195. Deux campagnes de la même famille, toutes deux dans « RASELIO | FR | CAMPAGNE STATIQUE | CBO 30 | V2 », ad sets « RASELIO | FR | IMPECCABLE x5 | BATCH V5 » et « POSTIT ÉMOTIONNEL x5 | BATCH V6 ». Fenêtre des commentaires : du 2026-08-31 au 2026-09-01, deux jours. Instantané de l'index : 2026-09-06 à 05:19:20 UTC.

**Ce qui est fiable ici, et c'est court.** Une seule chose atteint la qualité de fait : **le corpus fait deux lignes**. Elle est vérifiée deux fois par deux chemins différents, et elle est corroborée de façon indépendante par le profil de corpus voix-client, qui a fait ses propres appels et trouve le même total. Verified.

**Ce qui est un candidat et jamais un motif.** Les deux lectures d'identité, l'objection unique, l'absence de reconnaissance. Récurrence de 1 sur un dénominateur de 2. La méthode fixe le seuil de promotion d'un descripteur à trois occurrences indépendantes. Aucun signal ici n'en approche.

**La corroboration croisée, dans les deux sens.**

Aucun signal de ce document n'est corroboré par une source acheteur, parce qu'il n'existe aucune source acheteur. Avis clients : 0, absence confirmée par l'outil et non déduite. Sondages post-achat : 0 réponse. Reddit : aucun outil dans cette installation. Avis tiers : lecture directe refusée par le proxy réseau. Le seul recoupement possible est avec la bibliothèque voix-client de cette marque, et il est circulaire, parce que cette bibliothèque est construite sur les deux mêmes commentaires.

Il existe en revanche une corroboration de forme, et elle est réelle. Le verbatim « bête sauvage » a été soumis à une vérification d'écho de marque par la passe voix-client, sur quatre surfaces du site, les 30 fiches créa du 2026-09-03 et les 9 concepts du 2026-08-23 : aucune formulation approchante n'existe côté marque, et le drapeau `brand_self_echo` est posé à false. C'est la seule chose que je peux affirmer avec force sur cette phrase : **elle n'est pas de la marque**. Sur une marque qui a fabriqué sa preuve sociale avant d'avoir un client, c'est un point qui compte.

**Le bruit, nommé.** Le « Lol » est du bruit au sens strict. Il est conservé parce que le corpus fait deux lignes et qu'en jeter une reviendrait à en jeter la moitié, mais il ne porte aucun signal persona et il ne doit peser dans aucune lecture aval.

**Ce que ce document interdit à la synthèse.** Aucune persona ne peut être bâtie sur cette source. Aucune fréquence, aucune part, aucun classement d'objection ne peut en sortir. Ce que ce document livre est exactement trois choses : le fait que le corpus est presque vide, une phrase réelle et non contaminée, et une ventilation démographique qui montre que les deux annonces commentées ont été livrées à 87 % à des hommes de plus de 45 ans.

## Open loops

**Boucle 1.** Observation : le compte a acheté 43 270 impressions et 1 084 clics sortants sur 163 annonces et a récolté deux commentaires, zéro like et zéro réponse, soit 0,046 commentaire pour mille impressions, alors que les 163 annonces sont toutes des images fixes et qu'aucune vidéo n'a jamais tourné. Pull : Surprise, elle a tiré au moment où l'appel paginé à 500 lignes en a rendu deux. Question : pourquoi les publicités de cette marque ne font-elles réagir personne par écrit ? Justification : si c'est le format statique, la marque a un levier qu'elle peut essayer cette semaine ; si c'est le sujet, trop intime pour être commenté sous son vrai nom, alors les commentaires ne seront jamais une source de langage pour cette marque et l'effort doit aller vers un sondage post-achat. Territoire : Messaging.

**Boucle 2.** Observation : la seule phrase spontanée que cette marque ait reçue dit « Plus rien de la bête sauvage qui sommeille en nous », c'est-à-dire qu'elle nomme une perte, et cette idée n'apparaît dans aucune des sept objections que l'équipe s'est écrites, dans aucune des huit questions de la FAQ, et dans aucune des 163 annonces du compte. Pull : Curiosité, elle a tiré parce que le seul Français qui ait parlé à cette marque a parlé d'identité et pas de produit. Question : qu'est-ce qu'un homme pense perdre quand il rase cette zone ? Justification : si cette résistance est répandue, la marque rassure sur l'outil un homme qui hésite sur le geste, et tout son argumentaire arrive un cran trop tard. Territoire : Personas.

**Boucle 3.** Observation : l'annonce qui a reçu ce commentaire montre un homme d'une trentaine d'années, torse nu, tatoué, glabre, avec trois flèches désignant ce qu'il faut raser, et 56,6 % de son budget est parti chez des hommes de 65 ans et plus. Pull : Tension, elle a tiré en lisant la description du modèle et la ventilation d'âge de la même annonce l'une après l'autre. Question : que voit un homme de 65 ans quand on lui montre le corps d'un homme de 30 ans comme état normal ? Justification : la marque prépare un lot de créas casté sur un homme aux cheveux gris et n'a aucune idée de ce que le casting actuel produit chez le public qui reçoit réellement la diffusion. Territoire : Creators and talent.

**Boucle 4.** Observation : 28,2 % de la dépense Raselio est partie sur Instagram et aucun outil de cette installation ne rend les commentaires Instagram, donc les réactions sur près d'un tiers de la diffusion n'ont jamais été regardées. Pull : Gap, elle a tiré en comparant la part Instagram de la ventilation Parker à la liste des sources que ce document peut ouvrir. Question : que disent les gens sous les publicités Instagram de cette marque ? Justification : c'est la seule autre surface publique où des Français ont pu réagir, et si elle est aussi vide que Facebook, la conclusion sur le format se durcit ; si elle ne l'est pas, ce document a lu la mauvaise moitié du compte. Territoire : Messaging. **Seule la marque peut répondre**, en ouvrant les commentaires de sa page Instagram ou en donnant l'accès.

---

**Sign-off des méthodes chargées qui en portent une.**

This is everything I know about advertising to older audiences.
