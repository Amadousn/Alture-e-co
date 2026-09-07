---
brand: raselio
generated_on: 2026-09-07
refresh_by: 2026-10-07
sources_synced:
  - customer-reviews: 2026-09-07   # interrogé, 0 avis. L'outil dit que la base est vide et que ce n'est pas un problème d'accès
  - ad-account: 2026-09-07          # lu en entier, lecture créative complète sur 24 annonces, 6 achats attribués
  - ad-comments: 2026-09-07         # interrogé, 2 commentaires au total sur tout le compte. Corpus complet
  - post-purchase-surveys: 2026-09-07  # interrogé, totalResponsesForBrand 0. Aucun sondage n'a jamais été envoyé
  - brand-reputation: 2026-09-07    # 8 requêtes de marque sur deux jours, 0 mention
  - reddit: 2026-09-07              # aucun outil Reddit dans cette installation Parker, lecture directe refusée
  - other-reviews: 2026-09-07       # 0 avis tiers sur Raselio, 7 pages d'avis de catégorie refusées par le proxy
  - voc-corpus-profile: 2026-09-06  # 2 enregistrements de langage client, 1 verbatim unique, 57 entrées en quarantaine
persona_count: 2
flagship_persona: meticuleux-discret
companion_docs:
  - persona-voice-library: personas/persona-voice-library.md
  - lifecycle-journey-maps: personas/lifecycle-journey-maps.md
data_limitations: [Ce document est une synthèse construite sur presque rien du côté acheteur, et il faut le lire avec ce chiffre en tête : une seule phrase de client existe dans tout le coffre, et son auteur n'est même pas un acheteur identifié. Les sept sources qui devaient nourrir cette synthèse ont toutes été interrogées le 2026-09-06 et le 2026-09-07 : 0 avis client, 0 réponse de sondage post-achat, 2 commentaires publicitaires, 0 mention de la marque sur 8 requêtes, 0 avis tiers, aucun outil Reddit dans cette installation et toutes les surfaces communautaires refusées par le proxy réseau. Une seule source a livré de la matière dense, le compte publicitaire, et c'est une source d'audience servie, pas d'acheteur réel. La méthode persona demande de croiser la lecture de l'audience servie avec la lecture de l'acheteur réel ; ici la seconde tient sur 6 achats attribués et 11 commandes. Conséquences précises. L'âge des acheteurs est inféré de deux façons faibles et concordantes, une ventilation de plateforme sur 6 achats et une lecture de prénoms sur 11 commandes ; il n'est jamais verified au sens d'une donnée d'état civil. Le genre est inféré de la même manière. Aucune raison d'achat déclarée n'existe. Aucun écart mesuré entre le dit et le fait n'existe, faute de « dit ». Aucun jour type n'est observé : la section day-in-the-life de chaque persona est construite sur des horodatages de commande, des emplacements de diffusion et des appareils, jamais sur un récit de client. Aucune donnée de valeur vie client, aucun rachat, 0 client récurrent sur 11. Les parts d'état posées dans les blocs de signaux comportementaux sont des estimations explicitement marquées comme telles, sur des dénominateurs de 6 à 11, et aucune ne doit être citée comme une statistique. Le persona secondaire est en confiance hypothesis et ne doit pas porter de stratégie phare. Enfin, trois jeux de personas concurrents existaient déjà dans les actifs de la marque avant ce document, écrits en onze jours, et aucun n'était construit sur un acheteur : la section de biais les traite.]
methods_loaded: [creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/ad-account-analysis.md, creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/killer-performance-ads.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Personas — Raselio

## How to read this doc

Chaque persona ci-dessous est une **identité**, c'est-à-dire une façon durable de se voir soi-même qui décrira encore la même personne dans cinq ans. Un déclencheur n'est pas un persona. Une saison n'est pas un persona. Un cadeau n'est pas un persona. Ces choses-là sont des **signaux comportementaux**, des états de situation qui se posent sur une identité et qui tournent sans qu'on réécrive la personne. Elles vivent dans un bloc séparé, exprès.

Pour produire un travail créatif, on choisit le persona pour la voix et l'identité, puis on pose le ou les signaux comportementaux actifs pour ce qui est saillant maintenant.

**Un avertissement qu'il faut lire avant tout le reste, parce qu'il change la façon d'utiliser ce document.** Raselio a quarante-six jours de vie commerciale, onze commandes et six achats attribués. Les sept sources qui devaient nourrir cette synthèse ont été interrogées et six sont vides ou quasi vides. Il existe **une seule phrase de client** dans tout le coffre, et rien ne prouve que son auteur ait acheté.

Ce document ne contient donc pas de personas validés au sens habituel. Il contient un persona à confiance mixte, construit sur du comportement d'achat et sur une lecture créative complète, et un candidat à confiance hypothesis. Tout le reste est nommé comme absent. `persona-research-and-creative-strategy-process.md` décrit trois états de départ possibles pour une marque, et Raselio est dans le premier pour la donnée, celui de la marque qui n'a presque pas de donnée client, tout en étant dans le deuxième pour le discours, celui de la marque qui croit connaître ses personas sans pouvoir les valider. La méthode dit quoi faire dans ce cas : nommer l'écart plutôt que renvoyer à la marque sa propre histoire, et dire à voix haute que les personas sont des hypothèses à tester et pas une vérité acquise.

**Les méthodes chargées avant la synthèse.** `persona-research-and-creative-strategy-process.md` pour la séquence en deux temps, audience servie puis acheteur réel, pour le partage entre identité et calque, pour l'échelle de force de preuve et pour l'échelle de confiance. `emotional-delivery-and-timing.md` pour les quatre phases TEEP, Trigger, Exploration, Evaluation, Purchase, et pour l'état émotionnel d'arrivée. `advertising-to-older-audiences.md` parce que la totalité des achats attribués vient d'hommes de plus de 45 ans et que ce doc est le prior le plus lourd de cette catégorie. `ad-account-analysis.md` pour l'effet de répartition, l'étage d'entonnoir et la lecture des emplacements. `customer-review-mining-method.md` pour le dénominateur et l'écho de marque. `killer-performance-ads.md` pour la barre. `creative-strategy-fundamentals.md` pour la posture des boucles.

## Cross-persona bias notes

Le cadrage vient de Sarah Levinger : un marketeur fabrique le client vers lequel il penche, donc le signal dans la donnée peut être en partie auto-produit. Pour Raselio, ce risque n'est pas théorique, il est documenté, et il prend quatre formes.

**Écho de marque.** Il n'y a aucun écho constaté, et c'est plus inquiétant que rassurant. Un écho suppose des clients qui rendent à la marque son propre vocabulaire ; ici aucun client n'a jamais écrit une ligne, donc la boucle n'est pas fermée, elle est armée. La marque a déjà écrit les phrases que ses clients sont censés lui renvoyer : l'advertorial dit « **La seule chose qu'elles regrettent, c'est de ne pas l'avoir fait plus tôt.** », et la créa 16 met dans la bouche d'un « Hervé D. · Achat vérifié ★★★★★ » la phrase « J'aurais dû le faire il y a 20 ans. », que l'équipe documente elle-même comme inventée. La bibliothèque de voix client porte 57 entrées de langage écrit par la marque, mises en quarantaine, contre 1 verbatim organique. Conséquence pour ce document : aucune formule de la marque n'est utilisée ici comme preuve d'un trait de persona. Détail complet dans `source-pulls/personas/brand-self-echo-detection.md`.

**Risque de minorité bruyante.** Il est inversé chez Raselio, et il faut le dire dans ce sens-là. Personne n'est bruyant. Deux commentaires publicitaires pour 44 672 impressions, soit un commentaire pour 22 336 impressions, contre 32 ajouts au panier sur la même fenêtre : six fois plus de gens ont mis le produit dans un panier que de gens qui ont écrit un mot en public. Le risque n'est donc pas qu'une minorité bruyante domine la lecture, c'est que la seule voix disponible, une, soit prise pour la voix du public. Part de voix : 100 % des commentaires publicitaires viennent de deux personnes non identifiées. Part de chiffre d'affaires attribuable à ces deux personnes : inconnue, probablement nulle.

**Écart entre le dit et le fait.** Non mesurable aujourd'hui, parce que le côté « dit » n'existe pas : zéro réponse de sondage, zéro avis. `source-pulls/personas/post-purchase-surveys.md` en fait quatre hypothèses explicitement marquées comme telles et non résolues. La plus importante pour ce document : un acheteur interrogé dira probablement l'hygiène ou le confort, alors que la moitié des créas qui tournent vendent le regard d'une partenaire. Personne ne sait laquelle des deux versions agit.

**Sources qui se contredisent.** Une contradiction dure existe et elle est le sujet du document. La marque a écrit trois jeux de personas en onze jours, aucun construit sur un acheteur.
Le 23 août, brief d'équipe, verbatim, stated : « **ICP :** Homme FR, 18-34 ans (persona « Kevin, 27 ans ») ».
Le 3 septembre, brief d'équipe, verbatim, stated : « **Persona principal — « Hervé », 58 ans (cœur 55-64, extension 45-69)** », plus « Catherine », 54 ans, et « Marc », 47 ans.
Le document de contexte de marque stocké dans Parker, lu le 2026-09-06, nomme cinq profils dont aucun n'a plus de 47 ans : Thomas 38 ans, Nabil 26 ans, Sandrine 44 ans, Damien 31 ans, Lucas 47 ans, et recommande de tester « French men 25-50 (broad) ». Ce document dit lui-même, verbatim : « No creative background, testing history, winning angles, or previous performance data was provided by the brand. » Il est bâti sur de la recherche publique et sur du langage d'avis de concurrents, jamais sur un acheteur Raselio.
Face aux trois, la donnée d'achat, verified : 6 achats attribués sur 6 chez des hommes de plus de 45 ans, 82,4 % de la dépense chez les plus de 45 ans, 0 achat sous 45 ans sur 135,97 € dépensés là.
**La façon dont ce document tranche.** Il ne reprend aucun des trois jeux. Il construit un persona depuis le comportement d'achat observé et depuis la lecture créative complète de ce qui a converti, et il marque l'âge comme inféré parce qu'il l'est. Les trois jeux existants sont traités en fin de document comme des artefacts de biais à surveiller ou à retirer.

## Served-versus-actual diagnosis

**Le diagnostic, en deux phrases.** Raselio croit avoir un problème d'audience à conquérir, alors qu'elle n'a jamais parlé à celle qu'elle gagne déjà : sa créa est castée et écrite pour un homme d'environ trente ans, tutoyé et torse nu, pendant que 82,4 % de sa dépense et la totalité de ses six achats atterrissent chez des hommes de plus de quarante-cinq ans, et que le seul mécanisme qui vend est celui qui montre un état calme plutôt qu'une blague. Le trimestre ne se joue pas sur un élargissement d'audience, il se joue sur une seule chose : rendre la marque croyable pour un homme de cinquante-huit ans, avec de la preuve réelle et un format qui lui laisse le temps d'être convaincu.

**Ce que ce diagnostic disqualifie, nommément.** Un lot de plus dans la famille post-it, qui a reçu 181,11 € et un seul achat. Un casting de trente ans torse nu sur une créa d'acquisition. Un quatrième lot de trente statiques quasi identiques chargé en un jour. Un test d'élargissement vers les 18-44, qui a déjà consommé 135,97 € pour zéro achat. Une créa qui ajoute une preuve chiffrée sans source.

**La preuve, dans l'ordre.**

Côté audience servie, lecture média complète sur 24 annonces qui portent la moitié de la dépense et la totalité des achats, verified. L'annonce la plus rentable du compte, `52505820203791` « IMPECCABLE | CROP TAILLE », montre « un seul modèle masculin de la fin de la vingtaine au milieu de la trentaine », torse nu, tatoué, le mot « FOCUS » tatoué sur les côtes. Son texte publicitaire tutoie : « La tondeuse ultime pour tout le corps n'existe pas... À moins que tu n'aies pas encore essayé la Raselio ? » L'annonce la plus dépensière du compte, `52505593472791` « POSTIT | GAGNANTE », ouvre par « Hey, sacré gaillard ! 🌿 » et liste « 🍒 Couilles / 💪 Torse / 🦵 Jambes ».

Côté acheteur réel, verified sur la ventilation agrégée au niveau annonce : 18-24 → 2,3 % de la dépense, 25-34 → 6,2 %, 35-44 → 9,1 %, 45-54 → 17,9 %, 55-64 → 33,3 %, 65+ → 31,2 %. Hommes 86,9 %, mobile 93,4 %, Facebook 70,7 %. Sur les six annonces les plus dépensières, qui portent tous les achats, la concentration monte à 86,3 % chez les plus de 45 ans et 96,6 % chez les hommes. Les six achats se répartissent en 4 sur la ligne 55-64, 1 sur 45-54, 1 sur 65+.

L'écart, formulé simplement : **un homme de cinquante-huit ans a acheté après avoir vu à l'écran un homme de trente ans, torse nu, tatoué, tutoyé, avec un post-it à smiley sur l'entrejambe.** `advertising-to-older-audiences.md` dit que la preuve doit avoir l'âge du spectateur pour se transférer et qu'un visage bien plus jeune ne transfère pas. Ici, ça a converti quand même. Deux explications tiennent encore et le compte ne permet pas de trancher : soit ce n'est pas le corps qui vend mais la phrase « Soyez impeccable partout » et le produit net et grand, soit l'homme achète malgré la créa parce que le produit répond à un problème qu'il a déjà. C'est la boucle ouverte numéro un de ce document.

**Le troisième écart, et il est d'exécution.** La marque a écrit le 3 septembre puis le 4 septembre qu'elle passait en hommes 45-64 sans Advantage+. Au 6 septembre, les treize ad sets Raselio sont toujours en 18-65, tous genres, Advantage+ activé, verified. La décision existe sur le papier et pas dans le compte.

## Framework architecture

Ce document est la maison canonique des identifiants suivants. `persona-voice-library.md`, `lifecycle-journey-maps.md` et `voice-of-customer.md` doivent réutiliser ces noms et ne pas en créer d'autres pour la même chose.

- **Identités** : deux slugs, `meticuleux-discret` et `partenaire-qui-commande`.
- **Signaux comportementaux** : états de situation, en kebab-case, définis dans le bloc de chaque persona et repris dans la bibliothèque des calques.
- **Portes d'entrée** : moments qui font passer un persona de passif à actif.
- **Calques comportementaux** : comportements d'achat qui traversent les personas.
- **Calques d'identité** : étiquettes stables qui se posent sur un persona sans en devenir un.
- **Voix qui parlent pour la marque** : types de porte-parole, classés par ce que la preuve laisse attendre.
- **Signaux de message** : noms canoniques des angles, pour que l'équipe compare la même chose d'un persona à l'autre.

## Persona reference matrix

| | `meticuleux-discret` — flagship | `partenaire-qui-commande` — emerging |
|---|---|---|
| Qui | Un homme qui entretient déjà cette zone et veut que la routine cesse d'être une épreuve | Une femme en couple qui commande pour lui parce qu'il ne le fera pas |
| Âge, inféré | 45 à 69, cœur 55-64 | 45 à 60 |
| Preuve d'achat | 6 achats attribués sur 6, 11 commandes | 0 achat. 3 ajouts au panier et 1 initiation de paiement, stated par l'équipe |
| Part de la dépense compte | 82,4 % chez les 45+ | 11,9 % chez les femmes, sans ciblage dédié |
| Confiance | mixed | hypothesis |
| Message qui vend | `etat-impeccable` | aucun testé |
| Voix qui porterait | `pair-du-meme-age`, jamais essayée pour de vrai | `femme-qui-a-offert`, jamais essayée |
| Sources qui l'appuient | ad-account, données de commande Shopify | ad-account seulement, et par un signal d'intention, pas d'achat |
| Sources muettes | avis, sondage, commentaires, reddit, avis tiers, réputation | toutes |

---

## Persona 1 : Le méticuleux discret — flagship

`meticuleux-discret`

Un homme qui tient les choses en ordre sans en faire un sujet, qui s'occupe déjà de cette zone avec un outil qui n'a pas été conçu pour elle, et qui veut simplement que ce moment cesse d'être une épreuve.

### Identity

**Identités centrales.** Deux seulement, parce que la preuve n'en porte pas plus.

**Un — celui qui entretient, pas celui qui se transforme.** Inferred, confiance mixte. La preuve la plus solide est un fait de conversion : quatre des six achats du compte viennent d'un seul ad set, `52505820131591` « IMPECCABLE x5 », dont le mécanisme visuel est un fond crème, un titre noir « Soyez impeccable partout. », un produit héros net, et des flèches vers les zones, verified sur la lecture créative. Le mot porteur est un adjectif d'état, pas un verbe d'action. En face, le lot qui promet un changement de soi, EMOTION, avec « Gêné de te déshabiller ? Plus jamais. » et « Redeviens fier », a consommé 85,04 € et produit zéro achat. L'équipe est arrivée à la même lecture de son côté, stated : « Il ne cherche pas à « devenir » quelqu'un, il veut être **impeccable, propre, à l'aise** et ne plus retenir sa respiration. » Deux lectures indépendantes qui convergent, sur six achats.

**Deux — celui qui attend d'un outil qu'il soit fait pour son travail.** Inferred, confiance mixte. Toute la structure d'achat de cette marque repose sur une substitution d'outil, et c'est aussi ce que le compte a le mieux financé : les quatre annonces les plus dépensières qui portent des achats renvoient vers l'advertorial `/pages/pourquoi-pas-votre-tondeuse-a-barbe`, verified. La page dit, verbatim : « Cette lame a été conçue pour votre mâchoire : une surface plane, une peau épaisse, une zone que vous voyez parfaitement dans le miroir. Sous la ceinture, c'est l'inverse. » L'homme qui achète ne découvre pas un besoin, il constate qu'il utilise le mauvais objet depuis des années. La limite de cette lecture est nette et je la pose : c'est la marque qui affirme la substitution, aucun acheteur ne l'a jamais confirmée.

**Identités contextuelles.** Une seule, et elle s'active dans une condition nommée.
**Le vérificateur, quand la marque lui est inconnue.** Inferred, confiance mixte. La condition est l'achat à une marque jamais vue. Ce qui l'atteste indirectement : 2 431 sessions produisent 42 ajouts au panier sur 61 jours, soit 1,7 %, et 11 commandes ; entre 1 116 et 4 154 sessions par commande selon le compteur retenu. Ce n'est pas la marche d'un achat d'impulsion à 34,99 €. Et l'annonce qui traite la garantie et le colis neutre affiche le meilleur taux de clic du compte, 14,06 % sur `52506457654991`, sans avoir jamais reçu plus de 1,33 €. Cet homme veut vérifier, et il n'a rien à vérifier : huit requêtes de marque ne remontent aucune trace de Raselio.

**Dehors contre dedans.** L'écart le plus net de ce persona n'est pas mesuré, il est structurel, et il faut le dire comme une hypothèse plutôt que comme un constat. Cet homme achète un objet qu'il n'annoncera à personne, sur une marque qui vend explicitement le fait que personne ne saura, advertorial verbatim : « Le colis arrive dans un emballage neutre et discret : personne n'a besoin de savoir, tout le monde finira par remarquer. » La preuve indirecte que le dehors et le dedans divergent est le silence lui-même : 44 672 impressions, 32 ajouts au panier, et deux commentaires publics. Aucun acheteur n'a jamais rien dit sous son nom. La version présentable et la version d'achat ne se rencontrent nulle part. Non mesuré, marqué comme tel.

### Behavioral signals (currently observed)

Quatre états, chacun avec sa part estimée, son dénominateur et sa source. Aucune de ces parts n'est une statistique : les dénominateurs vont de 6 à 11.

**`veille-dun-moment-qui-compte`** — Il y a bientôt un moment où il sera vu, et l'entretien remonte dans la liste. Part estimée : non mesurable. Source : uniquement la mise en scène de la marque, jamais un acheteur. Implication : c'est l'état que la créa travaille le plus, avec « Le moment de vérité, c'est quand le boxer tombe. » et « Ce soir. », et c'est aussi celui dont on ne sait rien. À tester en premier par un sondage à une question.

**`apres-une-mauvaise-seance`** — Il vient de se couper, de se pincer ou d'avoir des boutons trois jours après, et il cherche autre chose. Part estimée : non mesurable. Source : advertorial et FAQ de la marque, stated. Implication : c'est le seul état où l'argument du mauvais outil arrive au bon moment ; ailleurs il arrive trop tôt.

**`verification-avant-achat`** — Il a cliqué, il est sur le site, et il cherche à savoir à qui il achète. Part estimée : le compte laisse penser que cet état est fréquent, sans le chiffrer. Source : verified, 2 431 sessions pour 42 ajouts au panier sur 61 jours, plus le taux de clic de 14,06 % de la créa garantie-colis sur 64 impressions. Implication : c'est la phase Evaluation au sens de `emotional-delivery-and-timing.md`, celle où il ne cherche pas plus d'information mais une hésitation précise à lever, et le compte n'a jamais mis cinq euros derrière.

**`report-repete`** — Il repousse, pas par flemme mais par logistique. Part estimée : non mesurable. Source : advertorial, stated, verbatim : « Ce n'est pas la flemme. C'est la logistique : s'installer dans la salle de bain, trouver le bon moment, et finir par retrouver des poils sur le lavabo. » Implication : cet état appelle un argument de temps, cinq minutes sous la douche, et le compte l'a chargé pour 0,02 € cumulés.

**Note de méthode sur ce bloc.** Le gabarit demande trois à six signaux et prévient qu'en dessous de trois le persona est sous-capturé. Quatre sont posés, et trois des quatre viennent des textes de la marque, pas d'un acheteur. C'est la faiblesse principale de ce persona et elle est nommée ici plutôt que masquée par un cinquième signal inventé.

### Voice signature

Il ne parle pas de ce sujet. C'est le fait central et il est mesuré : deux commentaires publics pour 44 672 impressions, zéro avis, zéro réponse de sondage. Quand il parle, la seule preuve disponible dit qu'il passe par l'image plutôt que par le vocabulaire technique : le seul verbatim du coffre, « Plus rien de la bête sauvage qui sommeille en nous. », n'emploie ni sabot, ni repousse, ni poil incarné. Un enregistrement, donc thin.

Le vouvoiement est une décision de marque, pas une observation : l'équipe l'écrit, stated, « Ton qui marche : **vouvoiement**, phrases courtes, humour pudique et adulte », mais les annonces qui ont converti tutoient toutes. Le registre reste ouvert.

Banque de phrases complète dans `personas/voice-of-customer/voice-of-customer.md` et dans `personas/persona-voice-library.md`, section `meticuleux-discret`. Il faut savoir avant d'y aller que la bibliothèque contient un verbatim et 57 entrées de langage de marque en quarantaine.

### Day-in-the-life

Ce récit est bâti sur du comportement observé, pas sur un client qui raconte. Chaque élément porte sa source.

Il achète sur son téléphone : 93,4 % de la dépense qui l'atteint part sur mobile, verified. Il voit la publicité dans un fil Facebook : 70,7 % de la dépense part sur Facebook, 26 143 impressions sur le fil Facebook contre 6 490 sur le fil Instagram, et 8 de ses 11 commandes portent facebook comme référent, verified. `ad-account-analysis.md` lit une dépense lourde sur le fil Facebook comme une navigation posée, plus proche d'une phase de considération que d'une découverte impulsive.

Il paie tôt le matin ou tard le soir : sur les 11 commandes, quatre tombent entre 07:23 et 09:20 heure locale et trois entre 21:33 et 22:48, verified sur les horodatages Shopify. Sur onze, ce n'est pas un motif, c'est une piste, et ce sont les deux moments où un homme est dans sa salle de bain.

Il est en France, partout : 11 commandes sur 11 facturées en France, verified. Les domaines de messagerie penchent vers une génération, quatre acheteurs sur onze employant un fournisseur d'accès français ou une messagerie historique, live.fr, bbox.fr, orange.fr, plus yahoo et hotmail. Inféré, thin, et à traiter comme une piste et non comme une donnée d'âge.

Ce qu'on ne sait pas : son métier, sa situation familiale, ce qu'il regarde, à qui il parle. Aucune source ne le dit. Le document de contexte de marque stocké dans Parker propose des biographies complètes pour cinq profils types ; elles sont écrites sans donnée Raselio et ne sont pas reprises ici.

### What activates purchase

**Motif de déclenchement observé.** Un seul est verified, et ce n'est pas un déclencheur d'acheteur, c'est un déclencheur de canal : la première commande de la boutique tombe le 2026-08-26, le lendemain du jour où le compte publicitaire passe du régime Audience Network au régime fil Facebook. Du 10 au 16 août, 130 829 impressions achetées à 0,22-0,63 € de CPM produisent zéro achat. Après huit jours d'arrêt, le compte redémarre le 25 août à 13-23 € de CPM et sort son premier achat le lendemain. Le parcours de cette marque commence dans un fil Facebook et nulle part ailleurs.

**Raison déclarée contre raison révélée.** Aucune raison déclarée n'existe : zéro sondage, zéro avis. Le côté révélé dit ceci, verified : sur 677,81 € de dépense au niveau annonce, le message qui a produit quatre des six achats est `etat-impeccable`, à 112,39 € et 28,10 € de coût par achat ; le message qui a reçu le plus d'argent est `humour-post-it`, à 181,11 € et un seul achat ; et le message qui fait le plus cliquer est `securite-de-lachat`, à 14,06 % de taux de clic pour moins de cinq euros dépensés. **Le côté porteur pour les décisions marketing est le révélé, faute d'alternative.** Le jour où un déclaré existera, la première chose à faire sera de le confronter à ces trois chiffres.

**Friction à la fermeture.** Elle est post-clic et l'équipe l'a chiffrée elle-même, stated, brief du 3 septembre, verbatim : « **Le vrai problème est post-clic** : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 € », et « CVR sessions ≈ 0,23 % : le site convertit 5 à 10 fois moins qu'une fiche produit e-commerce saine (1-2 %). » La lecture indépendante concorde : 2 431 sessions, 42 ajouts au panier, 11 commandes. Ce qui l'arrête n'est pas documenté par un acheteur. Trois candidats sont chiffrés : il n'a rien à vérifier sur la marque, huit requêtes ne remontant aucune trace ; il tombe sur le nom d'une autre marque en ouvrant les conditions de vente, cinq politiques sur six portant encore « Cutlab » ; et la garantie, le remboursement et le colis neutre, qui sont les seuls sujets à faire cliquer fort, ne sont traités ni par la FAQ ni par une créa financée.

### What we believe vs what we observed

**Revendications à forte confiance, présentes dans trois types de source ou plus.** Une seule atteint le seuil, et il faut être précis sur ce qu'elle dit.
*Les acheteurs de Raselio ont plus de 45 ans.* Trois sources indépendantes : la ventilation d'âge agrégée au niveau annonce, 82,4 % de la dépense et 6 achats sur 6 chez les 45+ ; les données de commande Shopify, avec des prénoms et des domaines de messagerie qui penchent vers une génération ; et la lecture indépendante de l'équipe, stated, « prénoms de la génération 1955-1975 ; un e-mail contient « 1966 » ». Dénominateurs minuscules, 6 et 11, direction nette, valeurs à ne pas citer au centime.

**Revendications à source unique, à corroborer.**
*Le mécanisme « Impeccable » est le seul prouvé sur l'achat.* Source : le compte publicitaire seul. Quatre achats sur 112,39 €. À corroborer par un avis ou un sondage.
*L'acheteur vient d'une tondeuse à barbe ou d'un rasoir.* Source : les textes de la marque seuls. Jamais confirmé par un acheteur.
*Les six déclencheurs de l'advertorial.* Source : la marque seule.
*L'homme achète en pensant au regard d'une partenaire.* Source : la mise en scène de la marque seule, sur des annonces qui n'ont produit aucun achat.

**Hypothèses d'équipe que la donnée ne soutient pas.** Trois, et chacune est chiffrée en face.
*« Approuvée par plus de 35 000 hommes » et « 4,7/5 sur 1 734 avis ».* Contre : 11 commandes, 0 avis confirmé par l'outil. La veille de l'équipe relève par ailleurs chez un concurrent néerlandais un post-it « +35 000 mannen ».
*Les cinq témoignages nommés des créas 16, 17, 27, W12 et N08.* Contre : les personnes n'existent pas, et l'équipe le documente elle-même.
*« Cibler hommes 45-65+ France, Advantage+ désactivé ».* Contre : au 6 septembre, treize ad sets sur treize sont en 18-65 avec Advantage+ activé. Ce n'est pas une croyance fausse, c'est une décision non appliquée, et elle empêche tout test propre de ce persona.

### Awareness and market sophistication

**Stade de conscience : problème conscient, entrant en conscience de la solution.** Inferred, confiance mixte. Il sait qu'il se coupe, qu'il a des boutons, que sa tondeuse à barbe n'est pas idéale. Ce qu'il ne sait pas, c'est qu'une catégorie d'outils existe pour ça. La preuve indirecte est dans le compte : la créa qui nomme la catégorie sans rien expliquer, « LA TONDEUSE INTIME / ANTI-COUPURE · ANTI POIL INCARNÉ · ANTI IRRITATION », est celle qu'un concurrent français fait tourner depuis huit mois selon la veille de l'équipe, ce qui suggère un public déjà conscient du problème et pas encore de la solution.

**Sophistication du marché : moyenne et en train de monter.** Verified sur la veille de l'équipe : au moins quatre marques françaises actives en publicité disent toutes la même chose, anti-coupure, anti-irritation, anti-poil incarné. Quand tout le monde promet la même chose, ce persona ne récompense plus la promesse mais le reçu.

**Ce qui compte comme reçu pour lui, précisément.** `advertising-to-older-audiences.md` est net : l'autorité est le raccourci de confiance, la preuve doit venir d'une source qu'il reconnaît déjà, le témoignage doit avoir son âge, et un nombre élevé d'avis lit comme une preuve réelle. Raselio n'a aucun de ces reçus : pas d'avis, pas de presse, pas d'expert, pas de comparatif, pas de témoignage réel. Elle a mis un chiffre à la place et le chiffre est sans source.

**Implication pour l'ouverture.** Ouvrir sur le bénéfice en clair dès le premier temps, gros texte et hiérarchie simple, un callout d'âge explicite parce que la subtilité sous-performe avec ce public, et laisser au problème le temps d'exister avant la solution. C'est une forme, pas un script.

### Message signals, frequency-ranked

| rang | signal | sources et poids | expression chez ce persona | la marque le mène-t-elle ? |
|---|---|---|---|---|
| 1 | `etat-impeccable` | ad-account seul, 112,39 €, 4 achats sur 6, coût par achat 28,10 € contre 94,16 € sur la campagne | Il veut être en ordre, pas transformé | Elle le mène, mais avec les deux tiers du budget qu'elle met sur l'humour |
| 2 | `securite-de-lachat` | ad-account seul, taux de clic 14,06 % sur 64 impressions, moins de 5 € dépensés au total | C'est ce qui reste à lever quand il est déjà convaincu par le produit | Elle le rate. Sept annonces identifiées, budget quasi nul |
| 3 | `mauvais-outil` | ad-account et pages du site, présent partout | Il constate qu'il utilise le mauvais objet depuis des années | Elle le mène. C'est l'axe de l'advertorial vers lequel les gagnantes renvoient |
| 4 | `humour-post-it` | ad-account seul, 181,11 €, 25 annonces, 1 achat | Il clique et il ne paie pas | Elle le sur-mène. C'est le plus gros pari du compte et il ne gagne pas |
| 5 | `callout-dage` | ad-account seul, 57,37 € sur 30 annonces, 3 jours, 0 achat | Nommer son âge en clair est le levier de pertinence de ce public | Elle vient de commencer. Trop tôt pour lire |
| 6 | `led-presbytie` | ad-account seul, 1,15 € | Le seul angle construit à partir d'une donnée d'acheteur | Elle l'a écrit et pas financé |
| 7 | `preuve-sociale-chiffree` | ad-account et site | Il y accorde plus de poids que la moyenne | Elle le mène avec un chiffre indéfendable |

**Le plus gros pari réel du compte, nommé :** l'humour post-it, 181,11 €, un achat. Le message qui vend a reçu les deux tiers de cette somme. Le message qui fait le plus cliquer n'a jamais reçu cinq euros.

### T-E-E-P content angle map

Les quatre phases viennent de `emotional-delivery-and-timing.md` : Trigger, quand le besoin devient conscient ; Exploration, quand il compare ; Evaluation, quand il gère un risque ; Purchase, quand la décision est prise et où la créa doit retirer plutôt qu'ajouter.

**Trigger.** Ce qu'il faut faire : lui renvoyer son état avec précision, sans proposer de solution tout de suite. La marque le fait déjà bien, l'advertorial en est fait. Ce qu'il faut éviter : la blague, qui fait rire quelqu'un qui n'était pas concerné.

**Exploration.** Ce qu'il faut faire : lui donner une idée de ce que c'est que d'être client ici, une texture de marque, un point de vue. C'est la phase la plus vide du compte : rien, sur 163 annonces, ne dit qui est cette marque. Le seul objet qui s'en approche est l'annonce éditoriale du 14 août, `7001074469987`, qui traite l'objection céramique en quatre paragraphes et affiche le meilleur coût par clic sortant du compte, 0,378 € contre 0,99 € et 1,27 € pour les deux plus gros dépensiers. Elle a été arrêtée et jamais rejouée.

**Evaluation.** Ce qu'il faut faire : nommer l'hésitation précise. Garantie, remboursement, colis neutre, provenance, service en français. C'est le trou le plus net et le plus rattrapable : la créa qui le fait affiche le meilleur taux de clic du compte pour 1,33 €. Ce qu'il faut éviter : ajouter de l'information ou de la pression, ce qui, selon la méthode, le fait décider que ce n'est pas la bonne marque.

**Purchase.** Ce qu'il faut faire : retirer. Prix unique, livraison offerte, un seul bouton. La marque le fait déjà.

**La lecture d'ensemble, et c'est la plus utile.** Le compte écrit presque tout en Trigger et en Purchase et laisse Exploration et Evaluation quasi vides. C'est exactement l'inverse de ce dont un homme de cinquante-huit ans a besoin devant une marque qu'il n'a jamais vue.

### Attribution

```yaml
sources_used:
  - type: ad-account
    last_pulled: 2026-09-07
  - type: shopify-orders-and-customers
    last_pulled: 2026-09-06
  - type: shopify-analytics
    last_pulled: 2026-09-06
  - type: ad-comments
    last_pulled: 2026-09-07
sources_available_but_unused:
  - customer-reviews        # 0 avis. Corpus interrogé et déclaré vide par l'outil
  - post-purchase-surveys   # 0 réponse. Aucun sondage n'a jamais été envoyé
  - reddit                  # aucun outil dans cette installation, lecture directe refusée
  - other-reviews           # 0 avis tiers sur la marque, pages de catégorie refusées
  - brand-reputation        # 8 requêtes, 0 mention de la marque
confidence: mixed
confidence_reason: >
  Une seule source a livré de la matière dense, le compte publicitaire, et elle décrit
  l'audience servie plus que l'acheteur. Le côté acheteur tient sur 6 achats attribués et
  11 commandes, avec trois lectures indépendantes qui convergent sur la tranche d'âge.
  Cinq sources sur sept sont muettes, et le silence de ad-comments est lui-même un signal :
  2 commentaires pour 44 672 impressions dit que ce persona ne s'exprime pas en public.
  Ce qui ferait passer ce persona à strong : dix réponses de sondage post-achat, ou dix avis
  clients, l'un ou l'autre suffisant à confirmer l'âge, la substitution d'outil et la raison
  d'achat par une bouche autre que celle de la marque.
```

---

## Persona 2 : La partenaire qui commande à sa place — emerging

`partenaire-qui-commande`

Une femme en couple avec cet homme, qui voit la publicité, qui sait qu'il ne commandera jamais, et qui commande pour lui.

**Avertissement de statut, à lire avant le reste de la section.** Ce persona n'a produit **aucun achat**. Il est en confiance `hypothesis` et il ne doit porter aucune stratégie phare. Il figure ici plutôt que dans la liste de surveillance pour une seule raison, discutée ci-dessous : il désigne une personne différente, pas un comportement du persona un.

**Pourquoi ce n'est pas un simple calque, et la question mérite d'être posée.** `persona-research-and-creative-strategy-process.md` range explicitement le cadeau parmi les comportements qui traversent les personas et jamais parmi les personas, et prévient que l'acheteur motivé par une occasion est le piège classique. La distinction qui sauve celui-ci est qu'il ne s'agit pas d'un comportement du même homme : c'est un autre être humain, d'un autre genre, avec un autre parcours de découverte, une autre objection et une autre voix. Un calque décrit ce que fait une personne ; ici la personne change. Le calque `achat-cadeau` existe par ailleurs dans la bibliothèque des calques et s'applique aussi au persona un, quand il offre à quelqu'un d'autre.

### Identity

**Identités centrales.** Une seule, et elle est hypothétique.
**Celle qui règle ce qu'il ne réglera pas.** Hypothesis. La seule preuve est un signal d'intention, stated par l'équipe, brief du 3 septembre, verbatim : « Les femmes 45-54 montrent un signal faible mais réel d'achat-cadeau (3 ATC, 1 paiement initié) ». Le compte confirme le contexte, verified : la ligne femmes 45-54 a reçu 28,45 € pour 15 547 impressions et 63 clics, zéro achat, et l'ensemble des lignes femmes a reçu 91,80 € au niveau annonce pour zéro achat.

**Identités contextuelles.** Aucune. Aucune source ne permet d'en poser une.

**Dehors contre dedans.** Non mesuré. L'hypothèse que la marque a écrite, stated, créa 28 : elle veut offrir sans que ce soit une critique. Texte à l'image : « Le cadeau qu'il ne s'offrira jamais lui-même. / Et dont vous profiterez aussi. / Colis neutre · Livraison offerte ». Aucune femme n'a jamais confirmé cette lecture.

### Behavioral signals (currently observed)

Trois états posés, tous en hypothesis, tous sans part mesurable.

**`voit-la-pub-pour-lui`** — Elle est la cible de diffusion sans être la cible de message. Source : verified, 91,80 € de dépense féminine au niveau annonce, arrivée par l'expansion Advantage+ et non par un ciblage. Implication : elle voit déjà des créas écrites pour un homme, avec un homme torse nu, et personne n'a jamais mesuré ce que ça produit chez elle.

**`sait-quil-nosera-pas`** — L'état que la marque suppose. Source : brief d'équipe, stated. Implication : si c'est vrai, l'objection à lever n'est pas la sécurité du produit mais la gêne d'offrir.

**`occasion-de-cadeau`** — Un anniversaire, une fête, un Noël. Source : aucune. Aucun calendrier promotionnel n'a jamais été testé sur cette marque, et la seule créa saisonnière du compte, le lot RENTREE, a produit 28,11 € et zéro achat.

### Voice signature

Inconnue. Aucune femme n'a écrit un mot à cette marque, sur aucune surface. La seule créa écrite pour elle n'a jamais été diffusée dans un ad set. Blanc nommé.

### Day-in-the-life

Non écrit. Aucune source ne le permet, et une biographie inventée ici ferait exactement le dégât que ce document existe pour éviter. Ce qui est verified se résume à ceci : les lignes femmes du compte reçoivent de la diffusion sans ciblage, majoritairement dans des emplacements à bas coût, et ne convertissent pas.

### What activates purchase

**Motif de déclenchement observé.** Aucun. Zéro achat.
**Raison déclarée contre raison révélée.** Ni l'une ni l'autre n'existe.
**Friction à la fermeture.** Trois ajouts au panier et une initiation de paiement, sans achat, stated par l'équipe. Quelque chose s'arrête entre le panier et le paiement, et personne ne sait quoi. Une hypothèse chiffrable et non vérifiée : la créa qu'elle voit est écrite au masculin et montre un homme torse nu, donc rien sur la page ne lui dit que ce cadeau est une bonne idée.

### What we believe vs what we observed

**Revendications à forte confiance :** aucune.
**Revendications à source unique :** l'intégralité de ce persona. Une seule source, la lecture d'équipe d'un signal d'intention.
**Hypothèses d'équipe que la donnée ne soutient pas :** que ce signal justifie un ad set. Trois ajouts au panier sans achat, sur un budget jamais alloué, ne justifient pas encore un ad set dédié ; ils justifient un test à budget plafonné.

### Awareness and market sophistication

**Stade de conscience :** inconnu. Elle peut être totalement inconsciente du problème comme parfaitement consciente de la solution, selon qu'elle a ou non déjà vu son compagnon se plaindre.
**Sophistication :** inconnue. Aucune créa concurrente relevée dans la veille de l'équipe ne s'adresse à la partenaire, ce qui, si ça se confirme, ferait de cet angle un espace libre. Stated, à vérifier.

### Message signals, frequency-ranked

Un seul signal existe et il n'a jamais été diffusé : `cadeau-quil-ne-soffrira-pas`. Source : créa 28, jamais mise en ligne. Poids : zéro.

### T-E-E-P content angle map

Non écrite, faute de matière. La seule chose utile à dire est une contrainte de phase : sa phase Evaluation n'est pas la même que celle de l'homme. Lui gère le risque de se blesser ; elle gère le risque de vexer. Ce sont deux objections différentes et la marque n'a écrit que la première.

### Attribution

```yaml
sources_used:
  - type: ad-account
    last_pulled: 2026-09-07
sources_available_but_unused:
  - customer-reviews
  - post-purchase-surveys
  - ad-comments
  - reddit
  - other-reviews
  - brand-reputation
  - shopify-orders-and-customers   # aucune commande n'est attribuable à une acheteuse
confidence: hypothesis
what_would_move_it_up: >
  Trois seuils de preuve, pas un calendrier.
  Un : un ad set femmes 45-60 à budget plafonné produisant au moins 3 achats attribués,
  ce qui ferait passer le persona de hypothesis à thin.
  Deux : une réponse de sondage post-achat où une acheteuse dit avoir commandé pour son
  compagnon, ce qui vaudrait plus que les trois achats parce que ce serait la première
  parole de cette personne.
  Trois : une deuxième source indépendante montrant le même signal, un commentaire, un avis
  ou un message entrant, ce qui ferait passer le persona à mixed.
  Tant qu'aucun des trois n'est atteint, ce persona ne finance pas de production.
```

---

## Entry-door trigger library

Les moments qui font passer un persona de passif à actif. **Six des sept sont écrits par la marque et n'ont jamais été confirmés par un acheteur.** Le septième est le seul comportement observé.

| slug | le moment | source | statut |
|---|---|---|---|
| `seance-qui-fait-peur` | Au moment de poser la lame, il retient son souffle | advertorial | stated, non confirmé |
| `boutons-72h` | Trois jours après, la zone est couverte de petits boutons rouges | advertorial | stated, non confirmé |
| `repousse-qui-se-remarque` | La repousse gratte et se remarque au mauvais moment | advertorial | stated, non confirmé |
| `le-soir-ou-ca-compte` | Il y a bientôt un moment où il sera vu | advertorial et créas | stated, non confirmé |
| `report-logistique` | Il repousse pour ne pas avoir à tout installer | advertorial | stated, non confirmé |
| `vue-qui-baisse` | Passé cinquante ans, il ne voit plus bien de près | créa 30 | stated, inventé après lecture de l'âge des acheteurs |
| `bascule-vers-le-fil-facebook` | Il croise la marque dans un fil Facebook, sur mobile, le matin ou tard le soir | compte publicitaire et horodatages de commande | **verified**, seul déclencheur observé |

## Behavioral overlays

Comportements d'achat et états de situation qui traversent les personas. Aucun n'est un persona.

| slug | ce que c'est | sur quels personas | preuve |
|---|---|---|---|
| `achat-cadeau` | Acheter pour quelqu'un d'autre | les deux | 3 ajouts au panier chez les femmes 45-54, stated. Zéro achat |
| `verification-avant-achat` | Chercher à savoir à qui on achète avant de payer | `meticuleux-discret` surtout | verified indirectement, 42 ajouts au panier sur 2 431 sessions |
| `veille-dun-moment-qui-compte` | Un moment social approche | les deux | stated par la marque |
| `apres-une-mauvaise-seance` | Une coupure ou une irritation récente | `meticuleux-discret` | stated par la marque |
| `report-repete` | Repousser pour raison logistique | `meticuleux-discret` | stated par la marque |
| `saison-rentree` | Reprise de septembre | non attaché | testé une fois, lot RENTREE, 28,11 €, 0 achat |

## Identity overlays

Étiquettes stables qui se posent sur un persona sans en devenir un. Les deux premières sont des suppositions de la marque et sont marquées comme telles.

| slug | ce que c'est | statut |
|---|---|---|
| `en-couple-heterosexuel` | La marque suppose un homme en couple avec une femme dans presque toute sa mise en scène | **Supposition non vérifiée.** Verified sur les créas, jamais sur un acheteur. Aucune donnée ne confirme ni n'infirme |
| `presbyte` | Ne voit plus bien de près, ce qui rend la LED utile | inferred depuis l'âge des acheteurs, jamais confirmé |
| `actif-ou-jeune-retraite` | Encore en activité ou récemment retraité | inferred, thin |
| `deja-adepte-du-geste` | Se rase déjà cette zone | stated par la marque, jamais confirmé |

## Voices that speak for the brand

Types de porte-parole, classés par ce que `advertising-to-older-audiences.md` fait attendre pour ce public. Aucun n'a jamais été utilisé authentiquement par cette marque.

| slug | ce que c'est | état chez Raselio |
|---|---|---|
| `pair-du-meme-age` | Un homme de son âge qui raconte | **Fabriqué.** Cinq témoignages signés de personnes qui n'existent pas, documentés comme inventés par l'équipe. À remplacer, pas à répéter |
| `expert-sante` | Un médecin, un dermatologue, un pharmacien | jamais essayé. Le plus fort selon la méthode pour ce public |
| `fondateur` | Dylan Ulry à l'écran | jamais essayé. Actif de confiance inutilisé |
| `institution-comparatif` | Un comparatif ou un média de catégorie | jamais visé. Un agrégateur publie un top 10 daté de septembre 2026 sans Raselio |
| `client-verifie` | Un avis réel avec sa date | n'existe pas. 0 avis |
| `femme-qui-a-offert` | Une acheteuse qui raconte pourquoi elle a offert | n'existe pas. 0 acheteuse |

## Messaging signals library

Noms canoniques des angles. Toute autre appellation dans un document compagnon doit être ramenée à celle-ci.

`etat-impeccable` · `securite-de-lachat` · `mauvais-outil` · `humour-post-it` · `callout-dage` · `led-presbytie` · `preuve-sociale-chiffree` · `regard-de-la-partenaire` · `nostalgie-16-ans` · `objection-technique-editoriale` · `logistique-france` · `cadeau-quil-ne-soffrira-pas` · `categorie-nommee` · `anti-marketing-prix-honnete`

Les deux derniers portent une note obligatoire : `categorie-nommee` est repris d'une créa de Billy Trimmer et `anti-marketing-prix-honnete` de Grümwise, d'après la veille de l'équipe. Ce ne sont pas des territoires libres.

## Companion-doc routing

- **Langage exact et banque de phrases** : `personas/voice-of-customer/voice-of-customer.md` et ses neuf extractions. À ouvrir en sachant qu'il contient un verbatim organique et 57 entrées de langage de marque en quarantaine.
- **Voix par persona, registre et émotion** : `personas/persona-voice-library.md`, sections `meticuleux-discret` et `partenaire-qui-commande`.
- **Parcours, moments de cycle de vie et points de fuite** : `personas/lifecycle-journey-maps.md`.
- **Biais de marketeur au niveau persona** : `personas/cross-persona-bias-notes.md`.
- **Écho de marque au niveau de la phrase** : `source-pulls/personas/brand-self-echo-detection.md`.

## What we're watching

**Nouveaux signaux comportementaux.** Aucun signal nouveau n'est détectable : la fenêtre entière de cette marque fait quarante-six jours et il n'existe pas de période antérieure à comparer. Ce document est le point zéro.

**Signaux qui s'effacent.** Aucun, pour la même raison.

**Cluster d'identité en formation, et c'est le plus intéressant de cette section.** Un homme pour qui le poil est une identité et pas un problème. La preuve tient en une phrase, verbatim, verified, commentaire publicitaire du 2026-08-31 à 15:46:58 UTC sous l'annonce `52505820194591` : « Plus rien de la bête sauvage qui sommeille en nous. » Aucune des sept objections que l'équipe s'est écrites ne contient cette idée, et aucune des 24 annonces dont la lecture créative est complète ne la touche. Un enregistrement, donc pas un persona et pas encore un candidat. Ce qui le ferait monter : une deuxième occurrence dans une source indépendante, un commentaire, un fil, un avis.

**Personas soupçonnés d'être des artefacts de biais, à rétrograder ou à retirer.** Trois, et chacun avec sa preuve.
*« Kevin, 27 ans », brief du 23 août.* À retirer. Contredit par 6 achats sur 6 chez les 45+ et par 135,97 € dépensés sur les 18-44 sans un seul achat. L'équipe l'a elle-même retiré le 3 septembre, stated : « **Les données contredisent ce persona sur toute la ligne.** »
*Les cinq profils du document de contexte de marque stocké dans Parker, Thomas 38, Nabil 26, Sandrine 44, Damien 31, Lucas 47.* À rétrograder au rang d'hypothèses de catégorie. Aucun n'est construit sur un acheteur Raselio, le document le dit lui-même, et quatre des cinq ont moins de 45 ans. Le risque est qu'un run futur les prenne pour des personas validés parce qu'ils sont détaillés et bien écrits.
*« Hervé, 58 ans », brief du 3 septembre.* À conserver comme direction et à rétrograder comme personnage. La direction d'âge est confirmée par trois sources indépendantes ; le prénom, la biographie et la situation de couple ne le sont par aucune. Et il faut noter un point de vigilance relevé par le document de parcours client : l'un des onze acheteurs de la boutique s'appelle Hervé F., commande #1007 du 2026-09-01, et le brief qui nomme le persona « Hervé » date du 3 septembre. Rien ne prouve un lien et je n'en affirme aucun. Le risque à surveiller est qu'un persona nommé d'après un client soit ensuite traité comme validé par ce même client.

## Open loops

**Boucle 1.** Observation : les cinq annonces qui portent les six achats montrent toutes des hommes d'environ trente ans, torse nu et tatoués, et leur texte tutoie, alors que 82,4 % de la dépense et la totalité des achats atterrissent chez des hommes de plus de 45 ans. Pull : Surprise, elle a tiré quand la description du modèle de l'annonce la plus rentable a donné « fin de la vingtaine au milieu de la trentaine » au lieu de l'homme mûr que la lecture d'âge laissait attendre. Question : qu'est-ce qui, dans ces créas, a convaincu un homme de cinquante-huit ans alors que la personne à l'écran ne lui ressemble pas ? Justification : c'est la question qui décide du casting de tout le prochain trimestre, et le lot suivant est déjà écrit autour d'un modèle aux cheveux gris sans que personne ne sache si c'est une amélioration. Territoire : Creators and talent.

**Boucle 2.** Observation : onze hommes ont acheté, huit ont été livrés, et aucun n'a jamais reçu une question ni laissé un mot, pendant que la marque affiche 1 734 avis et 17 000 clients sur sa page d'accueil. Pull : Gap, elle a tiré en voyant que la source de premier rang du système persona est vide alors qu'un e-mail à onze personnes suffirait à la créer. Question : qu'est-ce qui a décidé les onze premiers acheteurs de Raselio ce jour-là ? Justification : sans cette réponse, chaque persona de cette marque reste une inférence sur six achats et des prénoms, et aucun ne peut passer au-dessus de la confiance mixte. Territoire : Personas. Seule la marque peut répondre.

**Boucle 3.** Observation : les annonces qui traitent la garantie, le colis neutre et le remboursement affichent le meilleur taux de clic du compte, jusqu'à 14,06 %, et toute cette famille a reçu moins de cinq euros sur 677,81 €, pendant que l'humour anatomique en recevait 181,11 € pour un seul achat. Pull : Tension, elle a tiré en voyant l'argent aller au message qui fait rire et pas au message qui fait cliquer. Question : combien d'hommes se décident au moment où la question du colis et du remboursement est réglée, plutôt qu'au moment où le produit est expliqué ? Justification : la réponse décide si le prochain lot continue d'expliquer la tondeuse ou commence à vendre la sécurité de l'achat, et c'est la moitié du budget de production. Territoire : Messaging.

**Boucle 4.** Observation : les femmes ont reçu 91,80 € de diffusion sans jamais recevoir un message, la seule créa écrite pour elles n'a jamais été mise en ligne, et le signal qui la justifie tient en trois ajouts au panier sans achat. Pull : Gap, elle a tiré en voyant une audience massivement servie en volume et jamais servie en message. Question : combien de femmes achètent ce type de produit pour leur compagnon en France ? Justification : si le chiffre est significatif, la marque a un deuxième persona et un deuxième marché qu'elle n'a jamais adressés ; s'il est marginal, les 91,80 € sont du gaspillage à couper. Territoire : Personas.

**Boucle 5.** Observation : le seul mot spontané qu'un Français ait écrit à cette marque parle de ce qu'on perd en se rasant, et aucune des sept objections de l'équipe ni aucune des 24 créas lues en entier ne touche cette idée. Pull : Curiosité, elle a tiré parce que la seule voix extérieure disponible parle depuis un endroit que la marque n'a jamais envisagé. Question : que pensent perdre les hommes qui refusent de se raser cette zone ? Justification : si ce frein est répandu, il se situe en amont de tout ce que la marque traite aujourd'hui, et la moitié du marché lui est peut-être fermée pour une raison qu'elle n'a jamais nommée. Territoire : Personas.

**Boucle 6.** Observation : la marque a écrit trois jeux de personas en onze jours, aucun construit sur un acheteur, et le dernier en date attribue à son acheteur sept objections dont aucune n'a jamais rencontré une conversation réelle. Pull : Pattern, elle a tiré parce que la même erreur revient trois fois de suite sous trois formes différentes, un persona détaillé posé sans donnée client. Question : parmi les objections que la marque s'est écrites, lesquelles des hommes formulent-ils vraiment quand aucune marque n'écoute ? Justification : la marque construit son prochain lot créatif sur cette liste, et si trois des sept sont des inventions d'équipe, une part du budget répond à des freins qui n'existent pas. Territoire : Messaging.

**Boucle 7.** Observation : la marque a décidé par écrit le 3 puis le 4 septembre de cibler les hommes 45-64 sans Advantage+, et au 6 septembre les treize ad sets Raselio sont toujours en 18-65, tous genres, Advantage+ activé. Pull : Surprise, elle a tiré au moment où le paramétrage réel du compte a contredit deux décisions écrites de suite. Question : qu'est-ce qui empêche la décision de ciblage de descendre dans le compte ? Justification : tant que la réponse est inconnue, aucun test de persona ne peut être lu proprement, parce que chaque lot écrit pour un homme de 58 ans est diffusé à une audience qui ne lui ressemble pas. Territoire : Personas. Seule la marque peut répondre.
