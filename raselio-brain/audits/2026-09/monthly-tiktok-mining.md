---
brand: raselio
doc: monthly-tiktok-mining
month: 2026-09
generated_on: 2026-09-06
refresh_by: 2026-10-06
data_sources_read: [Parker MCP search_tiktok_videos — trois tirages du 2026-09-06 sur le brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37, corpus complet de 20 vidéos parcouru en deux pages triées par vues, plus deux tirages with_video_report qui ont ramené le rapport média complet de 16 vidéos (script audio, script de texte à l'écran, démographie du créateur et environnement, analyse des trois premières secondes, accroche visuelle, accroche audio, accroche texte, cadrage et production, analyse des incrustations, éléments visuels et mise en scène produit, observations), Parker MCP get_brand_persona, Parker MCP search_facebook_ads_sql pour l'ancrage compte, parker-system/creative-strategy-context/adapting-scripts.md, source-pulls/meta-ads-all.md, source-pulls/meta-account-breakdowns.md, sub-context-docs/organic-channels-inventory.md, audits/2026-09/monthly-performance-report.md, audits/2026-09/monthly-hook-audit.md, audits/2026-09/biweekly-iterations-report.md, running-notes/brand-rules.md, running-notes/success-definition.md]
videos_selected: [5 base de marque, 5 corpus élargi]
data_limitations: [Le partage cinq et cinq demandé par le gabarit ne peut pas être tenu tel qu'il est écrit. Cette installation Parker n'expose qu'un seul outil TikTok, search_tiktok_videos, et il est obligatoirement porté par un brand_id : il n'y a pas de base globale interrogeable à côté de la base de marque. Le corpus entier de Raselio compte 20 vidéos. Le document tient donc dix entrées en deux moitiés de cinq, mais les deux moitiés viennent de la même bibliothèque : la « base de marque » est le noyau que la curation classe Relevant avec un score de 1, le « corpus élargi » est l'anneau extérieur, celui que la curation classe Potentially Relevant ou qui vise un public différent. C'est la meilleure approximation honnête du partage demandé. | Le ratio vues sur abonnés, que le gabarit exige pour chaque vidéo, n'existe pas : l'outil renvoie un identifiant d'auteur mais aucun compteur d'abonnés, et tiktok.com est bloqué par le proxy de la session. Aucun ratio n'a été estimé. Il est remplacé partout par trois taux calculables sur les chiffres réellement renvoyés, le taux de mentions j'aime, le taux de partage et le taux d'enregistrement, chacun rapporté aux vues. | Aucun rapport du mois précédent : ce document est le premier de la série, il n'y a donc aucune vidéo adaptée le mois dernier dont l'issue pourrait être notée. | Aucun avis client. La boutique n'a aucun outil d'avis branché, search_customer_reviews_sql n'a rien à lire pour cette marque, et le corpus de commentaires publicitaires du compte tient en deux lignes. L'ancrage en preuve de marque de chaque vidéo se fait donc sur le compte publicitaire, sur les briefs de l'équipe et sur le document de contexte de marque, jamais sur un avis, faute d'avis. | Aucune mémoire de marque ni mémoire utilisateur : search_chat_history renvoie zéro fil. | Les vidéos n'ont pas été regardées à l'oeil. La lecture visuelle de chaque entrée vient du rapport média Parker, qui décrit ce que la vidéo montre et dit, section par section. Quatre vidéos du corpus n'ont pas de rapport tiré dans ce run et ne sont donc pas retenues comme entrées. | Le corpus est entièrement anglophone, ce qui est la limite la plus lourde de ce document et aussi son constat principal : il est traité comme un constat dans le corps du texte, pas seulement comme une limite.]
---

# Monthly TikTok mining — Raselio — 2026-09

Le corpus TikTok que Parker porte pour Raselio compte **20 vidéos, cumulant environ 13,3 millions de vues, toutes organiques, aucune n'appartenant à Raselio**, verified sur les deux pages du tirage du 2026-09-06. La curation en classe 14 comme pertinentes avec un score de 1, 5 comme potentiellement pertinentes et 1 comme non pertinente. Les seize mots-clés qui ont servi à le constituer sont visibles dans chaque ligne et ils sont **tous en anglais** : « how to manscape », « shaving cuts help », « best trimmer for balls », « Manscaped worth it », « Manscaped review », « shaving down there men », « stop razor burn », « Philips Oneblade intimate », « mens hygiene routine », « Meridian trimmer review », « Manscaped vs Meridian », « safe body trimmer », « grooming gifts for him », « trimmer that actually works », « fixed ingrown hairs », « mens intimate trimmer ».

Voilà pourquoi ce document commence par un avertissement plutôt que par une vidéo. **Les 20 vidéos sont en anglais. Aucune n'est française.** Et sur les seize dont le rapport média a été tiré, la personne la plus âgée jamais filmée est un père « d'environ la fin de la trentaine » qui accompagne son fils de quinze ans dans un rayon de supermarché. **Personne au-dessus de quarante ans n'apparaît à l'écran dans tout le corpus.** L'acheteur de Raselio, lui, est un homme français de 55 à 64 ans : les six achats du compte sont tous sur des hommes de 45 ans et plus, et 84,9 % de la dépense de la dernière quinzaine part sur cette tranche, verified. Ce corpus est donc une bibliothèque de mécanismes, pas une bibliothèque de visages. Ce qui est transportable ici, ce sont les structures, les ouvertures, les rythmes et les objets à l'image. Ce qui ne l'est pas, c'est la personne qui les porte.

Deuxième constat de cadrage, tout aussi utile. **Les marques qui occupent cette langue organique sont trois, et Raselio n'en fait pas partie.** Manscaped apparaît dans 6 des 20 vidéos, Philips OneBlade dans 5, Meridian dans 3, Ulike dans 1. Sur 13,3 millions de vues d'attention gratuite dans la niche exacte de Raselio, la marque est absente à cent pour cent, et elle n'a de toute façon aucun compte TikTok, verified dans l'inventaire des canaux organiques. Ce que la catégorie fabrique gratuitement, Raselio le paie à 16,93 € de CPM.

**Comment j'ai lu.** À travers `adapting-scripts.md`, dont la discipline gouverne toute la section script de chaque entrée : décortiquer la référence en segments numérotés, garder le nombre et l'ordre des segments, garder le type d'accroche, le rythme de phrase, la cadence de plans et la place de la preuve, et ne remplacer que le contenu, jamais la structure. La règle qui compte le plus ici est la mise en garde du document sur les vidéos sans voix : quand une référence n'a que du texte à l'écran et de la musique, l'adaptation reste sans voix, le texte **est** le script.

**Comment lire les chiffres.** Le ratio vues sur abonnés demandé par le gabarit n'existe pas dans cette source, et il n'a pas été deviné. Chaque entrée porte à la place trois taux calculés sur les chiffres réellement renvoyés : les mentions j'aime rapportées aux vues, les partages rapportés aux vues, et les enregistrements rapportés aux vues. Le taux d'enregistrement est celui qui compte le plus dans cette niche : une vidéo qu'on met de côté est une vidéo qu'on compte appliquer.

---

## Base de marque — 1 · @themrnav, « 4 Steps To Shaving Down There The Right Way »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7663517457486859542_1786244557/7663517457486859542_4_steps_to_shaving_down_there_the_right_way_lads_i.mp4`. Page TikTok : `https://www.tiktok.com/@themrnav/video/7663517457486859542`. Source : base de marque, classée Relevant avec un score de 1.

Publiée le **2026-07-17**. Créateur `@themrnav`. **4 500 000 vues, 148 700 mentions j'aime, 1 444 commentaires, 21 500 partages, 25 721 enregistrements.** Taux de mentions j'aime 3,30 %, taux de partage 0,48 %, taux d'enregistrement 0,57 %. Ratio vues sur abonnés indisponible. Hashtags : `#fyp #menshygiene #shavingtips #malegrooming #hygienetok`. Durée d'environ 1 minute 10.

### Why this video is here

C'est la vidéo la plus vue du corpus, de loin, et elle est aussi la plus récente des vidéos à grande échelle. Mais la raison de la retenir n'est pas le compteur, c'est ce qu'elle prouve sur la demande. **Le problème que Raselio vend, l'irritation et la coupure, est ici le sujet entier d'une vidéo qui a fait 4,5 millions de vues sans un euro de média.** Cela recoupe exactement ce que le compte publicitaire dit : parmi les étiquettes de désir de la quinzaine, « Freedom from fear, pain, and danger » est portée par 41 annonces, la catégorie la plus fournie du compte, verified sur la distribution d'étiquettes Parker. Le document de contexte de marque le dit en langue client, verbatim : « Worried about cutting myself » et « fear of pain » sont, mot pour mot, l'état émotionnel de départ de cette catégorie.

Le deuxième ancrage est un écart, et il est plus intéressant. Cette vidéo dépense ses soixante-dix secondes à **enseigner une routine**, pas à vendre un objet. La tondeuse n'arrive qu'à l'étape deux sur quatre. Le compte de Raselio, lui, n'a jamais rien enseigné : sur 163 annonces, l'étiquette `awareness_level: Unaware` porte 4 annonces et 12,21 € sur la quinzaine, contre 70 annonces et 507,97 € pour `Solution Aware`, verified. La marque parle exclusivement à des gens qui savent déjà qu'une tondeuse intime existe. Cette vidéo prouve qu'il y a un très grand public en amont de cette conscience, et que ce public regarde jusqu'au bout quand on lui apprend quelque chose.

Le troisième ancrage est un signal d'usage : **25 721 enregistrements**. Les gens ne rient pas de cette vidéo, ils la gardent pour l'appliquer. C'est le comportement d'un acheteur qui prépare un geste, pas d'un spectateur qui passe. Sur un compte dont le goulot mesuré est après le clic, avec 21 ajouts panier et 11 paiements initiés pour 5 commandes sur la dernière semaine, une créa qui fabrique de l'intention plutôt que du clic vaut plus qu'une créa qui fabrique du clic.

### Visual breakdown

Le plan de fond est un intérieur minimaliste, murs blancs, un miroir rond entrevu derrière l'épaule, lumière douce et régulière. Le créateur est un homme noir de la petite trentaine, barbe entretenue, t-shirt crème, un bracelet de perles. Rien de tout cela ne ressemble à un studio publicitaire : c'est une chambre ou un bureau, et c'est le point.

Les six premières secondes sont un montage rapide de **fautes et de conséquences**. Le créateur mime un geste de rasage vers le haut, et une photo réelle de peau irritée s'incruste avec le mot « RAZOR BURN » dans un cadre blanc. Geste latéral, photo d'un poil incarné, mot « INGROWN HAIR ». Geste vers le bas, photo de boutons, mot « IRRITATION ». C'est trois paires en cinq secondes. Les photos ne sont pas des illustrations propres, ce sont des gros plans crus de peau abîmée, et c'est ce qui arrête le doigt.

Ensuite la vidéo bascule dans une grille de quatre étapes, chacune annoncée par une carte texte centrée : « STEP 1 », « GLIDE EASIER », « STEP 2 », « ELECTRICAL SHAVER », « SHAVING CREAM / CONDITIONER », « STEP 3 », « SIDE TO SIDE », « STEP 4 MOISTURISE », puis « SAVE THIS FOR LATER » pour finir. La tondeuse, un Philips OneBlade, est brandie vers l'objectif plusieurs fois, et à 22 secondes le créateur la passe sur son **avant-bras** pour montrer le glissement. C'est la démonstration la plus astucieuse du corpus entier : elle prouve la sensation sans jamais approcher de la zone dont on parle, ce qui est exactement la contrainte que Raselio s'est écrite, stated dans ses briefs, ne jamais montrer l'anatomie et passer par des substituts.

Le typographique tient tout. Titres en jaune et noir pour l'alerte, blanc pour les étapes, gros, centrés, lisibles son coupé. Rien n'est laissé à la voix seule.

### Hook analysis

L'accroche est du type conséquence négative, et elle est verbale, visuelle et textuelle à la fois dans la même seconde. La première ligne parlée, verbatim : « Shave up, razor burn. Shave sideways, ingrown hair. Shave downwards, irritation. » Trois propositions de quatre mots, martelées au rythme d'un métronome. Le texte à l'écran, verbatim : « SHAVE YOUR PUBES CORRECTLY », en jaune et noir. Et la couche visuelle est la photo de peau abîmée.

Ce qui la rend efficace n'est pas la peur, c'est **la reconnaissance**. Chacune des trois lignes décrit un geste que le spectateur a fait, et le résultat qu'il a eu. Il n'y a aucune promesse à ces trois secondes, seulement un diagnostic. La promesse arrive à la quatrième seconde, avec « Stop shaving your pubes the wrong way », et à ce moment le spectateur est déjà d'accord.

### Script analysis

Décorticage en segments, selon la méthode d'adaptation. **Huit segments.** 1, accroche par conséquence négative, trois paires geste et douleur en cinq secondes. 2, verdict et promesse de guide, « follow this guide and I'll show you the correct routine ». 3, étape une, la douche chaude et le pourquoi physiologique, les pores et le poil ramolli. 4, étape deux, l'outil, le passage au rasoir électrique, avec la démonstration sur l'avant-bras. 5, une astuce en incise, la crème à raser ou l'après-shampoing pour peau sensible. 6, étape trois, dans le sens du poil, jamais contre. 7, étape quatre, hydrater. 8, réaffirmation et appel à l'action douce, verbatim, « it's not just the razor, it's also the routine. So save this for later ».

Ce que la méthode d'adaptation impose si Raselio reprend cette référence : **garder les huit segments, dans cet ordre, et ne remplacer que le contenu.** Le OneBlade du segment 4 devient la Raselio, avec sa tête arrondie et ses lames céramique. La preuve du segment 4 reste ce qu'elle est dans la référence, une démonstration de glissement sur une zone montrable, ce qui satisfait à la fois la règle de correspondance de la preuve et la contrainte de conformité de la marque. Le rythme est court et clippé, six à dix mots par phrase : une accroche de vingt mots serait une dérive structurelle, pas une adaptation. Et le segment 8 se termine sur une invitation à garder, pas sur un achat, ce qui est le contraire de ce que fait le compte aujourd'hui. La seule addition permise par la méthode est le segment solution s'il manque, et ici il ne manque pas.

---

## Base de marque — 2 · @italianfella, « i will never trust that brand again »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7026762933040467205_1788672870/7026762933040467205_i_will_never_trust_that_brand_again_levismusicproj.mp4`. Page TikTok : `https://www.tiktok.com/@italianfella/video/7026762933040467205`. Source : base de marque, Relevant avec un score de 1.

Publiée le **2021-11-04**, la plus ancienne des entrées de cette moitié. **2 300 000 vues, 328 200 mentions j'aime, 2 524 commentaires, 8 055 partages, 6 414 enregistrements.** Taux de mentions j'aime **14,27 %, le plus élevé de tout le corpus par un facteur quatre**. Taux de partage 0,35 %, taux d'enregistrement 0,28 %. Durée d'environ 9 secondes.

### Why this video is here

Elle est vieille de presque cinq ans et elle est retenue quand même, parce qu'un taux de mentions j'aime de 14,27 % sur 2,3 millions de vues n'existe nulle part ailleurs dans ce corpus. Ce chiffre dit qu'elle n'a pas été regardée, elle a été **approuvée**, massivement.

L'ancrage en preuve de marque est direct et il est double. D'abord, la vidéo attaque nommément Manscaped, qui est le concurrent premium de Raselio et la marque la plus présente de ce corpus avec 6 vidéos sur 20. Ensuite, et c'est plus important, elle attaque **la promesse exacte que Raselio fait aussi**. Le texte à l'écran dit, verbatim : « Me confidently using a Manscaped razor for the first time because their entire ad campaign is about how it will never nick you ». Or les annonces de Raselio disent aujourd'hui, verbatim, « Zéro coupure » et « 0 COUPURE. 0 STRESS. 100 % CONTRÔLE. » C'est le même engagement, mot pour mot, et cette vidéo est la preuve qu'il existe un réflexe public de le mettre à l'épreuve.

Le troisième ancrage est une tension avec le compte. La marque a un problème de crédibilité mesurable : elle affiche « Approuvée par plus de 35 000 hommes » sur ses créas qui convertissent et « 4,7/5 · 1 734 avis » sur son site, pendant que la boutique compte 11 clients et n'a aucun outil d'avis branché, verified. Cette vidéo montre à quoi ressemble le retour de bâton quand une promesse de sécurité n'est pas tenue, et à quelle vitesse il voyage.

### Visual breakdown

C'est un plan unique, quasiment sans montage, et c'est un modèle d'économie. La caméra est posée **au ras du sol**, appuyée contre une plinthe dans un couloir domestique banal, lumière de plafonnier, rien de mis en scène. Le créateur, un jeune homme de la vingtaine en chemise à motifs verte et bleue, pantalon foncé, chaussettes blanches, enjambe l'objectif au premier plan. Voir un pied passer au-dessus de la caméra est une rupture de motif immédiate : le fil ne montre jamais ça.

Il s'éloigne ensuite vers la salle de bain, se penche au-dessus de la baignoire, hors du cadre serré, et le corps se raidit d'un coup. **Aucun produit n'est visible à aucun moment.** Il n'y a ni tondeuse, ni emballage, ni logo. Toute l'histoire est portée par la posture du corps et par le bloc de texte en haut de l'écran.

C'est la leçon visuelle la plus transportable de la moitié : le meilleur taux d'approbation du corpus a été obtenu **sans montrer le produit une seule fois**. Le compte de Raselio fait exactement l'inverse, avec un plan produit vertical, grand et détouré, sur presque chacune de ses 163 annonces.

### Hook analysis

L'accroche est un bloc de texte unique, présent du début à la fin, et un plan au ras du sol. Il n'y a **pas un mot prononcé** dans les trois premières secondes ni dans les six suivantes ; le seul son est un cri déformé qui arrive à la sixième seconde. Le silence initial est la construction du gag.

Le mécanisme d'accroche est ce que le rapport média appelle attente contre réalité. Le texte installe une confiance, « confidently », et il l'attribue explicitement à une campagne publicitaire. Le spectateur sait donc dès la première seconde que quelque chose va mal tourner, et il reste pour voir quoi. Le corps de la vidéo n'a rien à expliquer : il n'a qu'à livrer la chute.

### Script analysis

Selon la méthode d'adaptation, cette vidéo est à classer **texte à l'écran uniquement**, et cette classification doit être conservée dans toute adaptation. Ajouter une voix off serait une faute de structure, pas une amélioration. **Trois segments seulement.** 1, accroche par le texte et le plan au sol, zéro seconde à trois. 2, la marche vers la salle de bain et la mise en position, trois à six. 3, la chute physique et sonore, six à neuf.

Trois segments, neuf secondes, un bloc de texte, aucun produit. Si Raselio trace ce squelette, elle garde les trois segments, la durée, l'absence de voix, l'absence de produit, et elle remplace uniquement le contenu du bloc de texte. La règle de correspondance de la preuve pose ici une difficulté réelle qu'il faut nommer : la référence tire sa force du fait que le concurrent **échoue**. Une marque ne peut pas se moquer d'elle-même sur la sécurité, c'est son seul argument. La substitution structurelle la plus proche, celle que la méthode autorise quand une tactique n'est pas utilisable telle quelle, est de déplacer l'échec sur l'outil que la marque combat déjà dans toute sa copie, la tondeuse à barbe. Le compte a d'ailleurs déjà écrit cette phrase, verbatim, dans son annonce `RS30-7R 25` : « Voici ce que votre tondeuse à barbe fait à cette zone. »

---

## Base de marque — 3 · @kaleb.o, « This my go to », top 3 tondeuses

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7657297378218642701_1788672944/7657297378218642701_this_my_go_to_fyp_shaving_selfcare.mp4`. Page TikTok : `https://www.tiktok.com/@kaleb.o/video/7657297378218642701`. Source : base de marque, Relevant avec un score de 1.

Publiée le **2026-06-30**. **711 300 vues, 25 000 mentions j'aime, 80 commentaires, 692 partages, 9 744 enregistrements.** Taux de mentions j'aime 3,51 %, taux de partage 0,10 %, **taux d'enregistrement 1,37 %, le deuxième plus élevé du corpus**. Hashtags : `#fyp #shaving #selfcare`. Durée d'environ 18 secondes.

### Why this video is here

Un taux d'enregistrement de 1,37 % pour un taux de partage de 0,10 % dessine un comportement précis : on ne montre pas cette vidéo à ses amis, **on la garde pour acheter**. C'est une liste de courses, pas un divertissement. Sur une marque dont le problème mesuré est de transformer l'attention en intention, c'est le format le plus directement utile du corpus.

L'ancrage en preuve de marque est un manque, et il est net. Le format liste existe une seule fois dans les 163 annonces de Raselio, avec l'étiquette `ad_format: Listicle` portée par 2 annonces pour **0,41 € de dépense sur la quinzaine**, verified sur la distribution d'étiquettes Parker. Le compte a une landing entière construite sur une liste, `/pages/7-raisons`, avec 312 sessions sur 90 jours, et 59 des créas du lot RS30 pointent dessus, mais la structure de liste n'est presque jamais dans le visuel lui-même. Il y a un décalage entre la page et l'annonce.

Le deuxième ancrage est un mécanisme de catégorie que Raselio ne peut pas s'offrir autrement. Cette vidéo met la tondeuse intime **à côté** d'outils que tout le monde connaît, le OneBlade, deux BaBylissPRO. Raselio n'a aucune notoriété, c'est écrit noir sur blanc dans son document de contexte de marque, et le format liste est le moyen le moins cher d'emprunter la crédibilité des marques établies sans dire un mot d'elles.

### Visual breakdown

Salle de bain domestique très éclairée, reflet de miroir, objets du quotidien visibles au fond. Le créateur a une vingtaine d'années, cheveux bouclés châtains, bouc taillé, torse nu, plusieurs bagues et une chaîne en or. La production est de la selfie à la main, pas du studio.

La première image est trois outils tenus ensemble dans le cadre : un OneBlade noir et néon, une BaBylissPRO GoldFX dorée, une BaBylissPRO FoilFX02 cuivrée. Les finitions métalliques dorées et cuivrées attrapent la lumière de la vanité et créent un contraste fort dès l'image fixe. **Le métal fait le travail que ferait une accroche.**

Ensuite, trois séquences identiques dans leur construction : un outil tenu vers l'objectif, une étiquette texte en haut à gauche qui le nomme et lui donne un rôle, puis un plan très court du créateur qui mime son usage sur le visage ou le cou. Les trois étiquettes, verbatim : « All around: Philips one blade », « Line up tool: Babyliss pro », « Foil shaver: Babyliss pro ». Fin sur un pouce levé. Le montage suit la mesure de la musique.

Ce qui se transporte ici n'est pas la salle de bain d'un homme de vingt ans, c'est **la grammaire du rôle attribué**. Chaque outil reçoit un travail nommé. C'est exactement l'argument central de Raselio, verbatim dans son contexte de marque : « A beard trimmer was never designed for this area — Raselio was. » La vidéo prouve que le public de la catégorie accepte déjà l'idée qu'un outil égale une zone.

### Hook analysis

Accroche de type liste d'autorité, portée par le texte et l'objet en même temps. Texte, verbatim : « Top 3 trimmers rn ». Trois mots plus une abréviation, en haut au centre, présents une seconde. Visuellement, les trois outils dans une seule main.

Ce qui la fait marcher est la promesse de brièveté. « Top 3 » dit au spectateur combien de temps ça va durer, et « rn », pour « right now », dit que la liste est à jour. Aucune parole n'est nécessaire : la piste audio est une chanson, pas une voix. C'est la deuxième vidéo de cette moitié qui fonctionne sans script parlé.

### Script analysis

Classification selon la méthode d'adaptation : **texte à l'écran uniquement**, la musique porte le rythme, les étiquettes portent le sens. À conserver tel quel dans toute adaptation. **Cinq segments.** 1, accroche liste, les trois outils tenus ensemble. 2, produit un, étiquette de rôle, mime d'usage. 3, produit deux, même construction. 4, produit trois, même construction. 5, approbation, pouce levé.

L'adaptation est presque mécanique et c'est ce qui la rend intéressante. Cinq segments, cinq segments. Chaque étiquette garde sa forme, deux ou trois mots, deux points, le nom de l'outil. La substitution évidente pour Raselio n'est pas de comparer trois marques, ce que la méthode déconseille faute de comparaison conforme, mais de **garder la structure de rôle en changeant l'axe** : trois zones au lieu de trois outils, avec la même tondeuse à chaque plan. Le compte a déjà écrit ces étiquettes, verbatim, sur les post-it de son annonce `RS30-7R 04` : « Là-dessous :) », « Torse :) », « Dos :) ». La référence dit simplement de les faire bouger et de les mettre dans la main de quelqu'un. La contrainte de rythme de la méthode s'applique : les plans de la référence durent trois secondes chacun, pas huit.

---

## Base de marque — 4 · @pierredalati, « Manscaped Chairman Pro chez Costco »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7657623579109969170_1788672651/7657623579109969170_grab_the_chairmanr_pro_essentials_kit_by_manscaped.mp4`. Page TikTok : `https://www.tiktok.com/@pierredalati/video/7657623579109969170`. Source : base de marque, Relevant avec un score de 1.

Publiée le **2026-07-01**. **583 200 vues, 31 200 mentions j'aime, 190 commentaires, 553 partages, 5 165 enregistrements.** Taux de mentions j'aime 5,35 %, taux de partage 0,09 %, taux d'enregistrement 0,89 %. Hashtags : `#manscaped #grooming #selfcare #fyp`. Durée d'environ 43 secondes.

### Why this video is here

C'est la seule vidéo du corpus qui **démontre une caractéristique produit par caractéristique produit**, et c'est précisément ce que Raselio écrit dans sa copie sans jamais le montrer. Les annonces `RS30` répètent, verbatim, « Tête arrondie, lames céramique, LED intégrée : la tondeuse pensée pour les zones intimes. » Ces trois arguments sont posés comme du texte sur une image fixe, et rien ne les prouve. La référence, elle, allume la LED dans une pièce assombrie, passe l'appareil sous le robinet, et le range dans un étui de voyage.

L'ancrage en preuve de marque le plus fort est une phrase de la vidéo elle-même, verbatim : la LED est « underrated because it helps you actually see the areas you're shaving instead of guessing ». C'est le seul endroit de tout le corpus où quelqu'un explique **pourquoi** une lampe intégrée compte, et le mot qui fait le travail est « guessing ». Raselio vend le même composant et n'a jamais nommé le problème qu'il résout. Le document de contexte de marque avait pourtant identifié la chose : la LED répond au problème de visibilité, les plis de peau et les zones difficiles à voir, qui est ce qui rend le geste effrayant.

Le deuxième ancrage est démographique, et il joue contre l'usage direct autant que pour. Le prior sur les publics de plus de cinquante ans dit que la démonstration lente et très lisible, façon téléachat, est un des formats les plus fiables de cette tranche d'âge. Cette vidéo est exactement ce format, mais montée à un plan toutes les une à deux secondes, ce qui est trop rapide pour l'acheteur de Raselio. **La structure est la bonne, la cadence ne l'est pas**, et le document d'adaptation autorise à conserver la structure en réglant le rythme sur le public.

### Visual breakdown

Trois décors, dans cet ordre. Un studio maison avec une porte bleue au fond et une lumière travaillée, pour l'adresse directe. Un magasin Costco, parking puis rayons, en caméra subjective. Un lavabo de salle de bain, pour les démonstrations fonctionnelles.

L'ouverture est un très gros plan sur la main qui tient un rasoir manuel ordinaire, puis une transition rapide sur la même main qui tient une tondeuse électrique. Ce couple d'images, l'objet à jeter puis l'objet à prendre, tient en moins de deux secondes.

La partie qui mérite d'être volée est la séquence de preuve. Le coffret est montré sur l'étagère du magasin, puis déballé. La tondeuse passe sur le visage. **La LED est allumée dans une pièce assombrie**, ce qui rend la fonction visible plutôt que déclarée. L'appareil est rincé sous le robinet, plan qui prouve l'étanchéité en trois secondes sans un mot de spécification. Il est ensuite rangé dans son étui, et la lotion apaisante est appliquée pour montrer l'effet sur la rougeur.

Les incrustations sont en mots isolés, un par un, synchronisés à la voix, au centre du cadre : « still », « multi », « walk », « find », « $40 », « July 5th », « skin », « smooth », « LED », « 75 », « travel », « irritation ». Le nom du produit et l'offre passent, eux, dans un cartouche blanc plus grand, pour rester lisibles son coupé.

### Hook analysis

Accroche du type vous vous y prenez mal, avec une injonction en ouverture. Ligne parlée, verbatim : « If you're still shaving with a multi-blade, throw it out. » Neuf mots, un impératif, aucune politesse. Le texte à l'écran ne porte que deux mots dans ces trois secondes, « still » puis « multi », synchronisés à la voix.

Ce qui la rend efficace est le geste de rejet plutôt que la promesse d'achat. Elle demande d'abord de jeter quelque chose que le spectateur possède, ce qui crée un vide, et elle propose de le remplir seulement ensuite. C'est la structure de rejet que la doctrine des titres appelle « Stop [inferior behavior] », et c'est exactement la position de marque de Raselio, dont l'argument central est qu'une tondeuse à barbe n'a jamais été conçue pour cette zone.

### Script analysis

**Huit segments.** 1, accroche par le rejet, l'objet à jeter. 2, le lieu et l'offre, l'entrée en magasin et le prix barré. 3, l'usage prévu, pour le visage et le cou. 4, les deux têtes interchangeables et le choix de finition. 5, la grappe de fonctions, flex adjust, bord de précision, LED, avec la démonstration dans le noir. 6, la robustesse, étanchéité au robinet, 75 minutes, verrou de voyage. 7, l'après-rasage apaisant. 8, l'appel à l'action, le lieu, le prix, la date limite.

L'adaptation à Raselio garde les huit segments et leur ordre. Les substitutions imposées par la méthode : le segment 2, qui est un segment de distribution physique, n'existe pas pour une marque en vente directe uniquement ; la méthode autorise la substitution structurelle la plus proche, et c'est le déballage à domicile, qui occupe la même place et la même durée. Le segment 5 est celui à protéger absolument, parce que c'est le seul segment de tout le corpus qui montre une LED en fonctionnement. Le segment 8 doit perdre la date limite, parce que sur ce compte les annonces marquées promotionnelles portent 262,95 € sur la quinzaine et **zéro achat attribué**, verified. La fidélité de rythme demandée par la méthode est ici à ajuster consciemment vers le public réel de la marque, et c'est la seule dérive assumée du document.

---

## Base de marque — 5 · @kerrydenevan, « It's the perfect gift for him (and you!!) »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7440210812678999326_1788672558/7440210812678999326_its_the_perfect_gift_for_him_and_you_manscaped_gif.mp4`. Page TikTok : `https://www.tiktok.com/@kerrydenevan/video/7440210812678999326`. Source : base de marque, Relevant avec un score de 1.

Publiée le **2024-11-22**. **46 700 vues, 351 mentions j'aime, 9 commentaires, 48 partages, 309 enregistrements.** Taux de mentions j'aime 0,75 %, taux de partage 0,10 %, taux d'enregistrement 0,66 %. Hashtags : `#GiftGuideForHim #GiftGuide #HolidayGifts2024 #TikTokMadeMeBuyIt #ManscapedPartner`. Durée d'environ 1 minute 20.

### Why this video is here

C'est la vidéo la moins vue de cette moitié et elle est retenue à cause d'un signal de compte que rien d'autre n'explique. **Les femmes de 45 à 54 ans ont reçu 28,45 € de dépense et produit 0 achat attribué, mais le brief de l'équipe rapporte 3 ajouts panier et 1 paiement initié sur ce segment**, stated. Sur la dernière quinzaine, les femmes portent 3,7 % de la dépense du compte, soit 25,39 €, verified. Une seule créa des 163 leur parle, verbatim : « Le cadeau qu'il ne s'offrira jamais lui-même. » Aucun ad set dédié n'a jamais été créé. C'est le seul territoire d'audience du dossier qui n'a jamais été essayé.

Le deuxième ancrage vient du document de contexte de marque, qui décrit ce comportement d'achat comme un des cinq profils de la marque : une femme qui achète l'objet pour son compagnon, avec cette exigence précise, verbatim, que le cadeau doit ressembler à « I thought of you » et non à « you need this ». Cette vidéo est la seule du corpus qui exécute cette contrainte, et elle l'exécute presque à la lettre.

Le troisième ancrage est calendaire. La marque est une marque française sans calendrier écrit, et sa saison de cadeaux, Noël, arrive dans un peu plus de trois mois. La vidéo est datée de novembre 2024 et porte le hashtag `#HolidayGifts2024`. C'est donc aussi une référence de fenêtre, pas seulement de format.

### Visual breakdown

Un intérieur domestique clair et minimaliste, salon plutôt que salle de bain, murs neutres, un lustre noir moderne. La créatrice est une femme de la fin de la vingtaine, cheveux longs châtains, gros pull blanc en maille torsadée, jean bleu. Lumière douce, mélange de jour et d'anneau. **Ce n'est pas un décor de produit, c'est un décor de maison, et c'est ce qui rend le cadeau crédible.**

Elle tient un colis. À huit secondes, elle l'ouvre d'un geste franc, et le bruit du couvercle sert de transition. À l'intérieur du couvercle, une phrase imprimée en doré, verbatim : « Your balls will thank you ». Puis elle sort les objets un par un et les tient près de l'objectif, chaque fois quelques secondes.

Le texte principal reste à l'écran pendant les quatre-vingts secondes, verbatim : « The perfect gift for the man in your life ». À vingt-deux secondes, une capture d'écran du site vient appuyer la description. À une minute et trois secondes, un code de réduction s'affiche en haut à droite.

Ce qui se transporte pour Raselio est la mise en scène du **déballage comme preuve de complétude**. La marque vend un coffret complet, socle, brosse, huile, sabot, et son argument est qu'il n'y a rien d'autre à acheter. Sur 163 annonces, aucune ne montre le contenu de la boîte. Une seule créa, `R12 Kit complet 34,99`, porte l'idée dans son nom et elle n'a jamais dépensé un centime.

### Hook analysis

L'accroche est parlée et elle est adressée. Première ligne, verbatim : « As I was working on my gift guide, I came across literally the perfect gift for my husband. » Visuellement, elle tient le colis fermé, ce qui installe une attente de révélation. Le texte à l'écran, verbatim, « The perfect gift for the man in your life », nomme la spectatrice sans détour.

Le mécanisme est un écart de curiosité doublé d'un appel d'identité. La spectatrice sait immédiatement que la vidéo est pour elle et ne sait pas encore ce qu'est le cadeau. Et surtout, l'accroche établit la créatrice comme quelqu'un qui **a déjà fait le tri**, ce qui est le service que rend un guide de cadeaux.

### Script analysis

**Sept segments.** 1, accroche, le guide de cadeaux et le colis fermé. 2, l'aveu partagé, verbatim, « I know I'm not the only one whose husband asks to shave their back ». 3, le contexte personnel, le mari poilu, l'aveu qu'elle le rase elle-même. 4, l'inventaire du coffret, un objet après l'autre. 5, le bénéfice pour elle, verbatim, « It also avoids getting nicks and cuts on the neck, which my husband yells at me almost every time not to cut him. So you're welcome, I won't be cutting you anymore. » 6, l'offre, code et livraison. 7, le retournement final, verbatim, « Ladies, not only is this for the men, but it's also for us. »

Le segment 5 est le coeur et c'est celui qu'une adaptation doit protéger. La vidéo ne vend pas un cadeau à une femme, elle lui vend **la fin d'une corvée qu'elle assume déjà**. C'est la différence exacte entre « I thought of you » et « you need this », et c'est aussi la raison pour laquelle le retournement du segment 7 ne sonne pas comme un argument de vente ajouté.

Pour Raselio, la méthode impose de garder les sept segments et le registre parlé. Les substitutions : le coffret Manscaped à cinq objets devient le coffret Raselio à cinq objets, ce qui tombe juste, socle, brosse, huile, sabot trois hauteurs, câble. Le segment 6 perd le code de réduction, pour la même raison que plus haut. Et la règle de correspondance de la preuve interdit de reprendre la phrase dorée du couvercle : la charte de ton écrite par l'équipe le 3 septembre exclut ce registre, et une marque qui se positionne contre l'humour de vestiaire ne peut pas l'emprunter par la porte de derrière.

---

## Corpus élargi — 1 · @dadandtel, « The best manscaping Essentials for Teen Guys »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7406272010344598827_1788672481/7406272010344598827_the_best_manscaping_essentials_for_teen_guys.mp4`. Page TikTok : `https://www.tiktok.com/@dadandtel/video/7406272010344598827`. Source : corpus élargi, classée Potentially Relevant avec un score de 0,6.

Publiée le **2024-08-23**. **1 700 000 vues, 130 600 mentions j'aime, 303 commentaires, 2 740 partages, 29 784 enregistrements.** Taux de mentions j'aime 7,68 %, taux de partage 0,16 %, **taux d'enregistrement 1,75 %, le plus élevé de tout le corpus**. Durée d'environ 1 minute 21.

### Why this video is here

Elle est dans l'anneau extérieur parce que son public déclaré, des adolescents de quinze ans et leurs parents, n'est pas celui de Raselio. Elle est retenue quand même pour une raison unique et importante : **c'est la seule vidéo des seize lues où un homme de plus de trente-cinq ans est à l'écran.** Le rapport média décrit un père « d'environ la fin de la trentaine ». C'est le plafond d'âge de tout ce corpus. Pour une marque dont les six achats sont sur des hommes de 45 ans et plus, ce fait vaut plus qu'un compteur de vues.

Le deuxième ancrage est le taux d'enregistrement, 1,75 %, soit 29 784 personnes qui ont mis cette vidéo de côté. C'est le comportement d'un contenu de référence, pas d'un contenu de divertissement. Le compte de Raselio, à l'inverse, a construit sa dépense sur l'amusement : sur la quinzaine, `emotion: Playfulness` porte 26,9 % de la dépense et `Amusement` 18 %, verified, et l'équipe a elle-même écrit que ce registre fait cliquer sans faire acheter.

Le troisième ancrage est une posture. Cette vidéo est un homme plus âgé qui explique un geste intime à quelqu'un qui n'ose pas demander. C'est exactement la relation que le document de contexte de marque décrit pour un de ses profils, verbatim : « A colleague's offhand comment about "taking care of yourself down there" over beers sent him down a quiet Google rabbit hole he'd never admit to. » La catégorie se transmet par une remarque d'homme à homme, et cette vidéo est cette remarque, filmée.

### Visual breakdown

Le décor est un rayon de grande surface, très éclairé, lumière blanche plate. Le père, barbe soignée, t-shirt noir, jogging vert, marche dans l'allée avec son fils, tresses longues, grand t-shirt beige. La caméra est à hauteur d'oeil, à la main, et les suit. C'est du vlog, pas du studio.

Le texte principal, verbatim, tient tout le long en haut de l'écran : « 4 Manscaping Essentials Every Teen Boy Needs ». À chaque recommandation, un **détourage de produit en grand** s'incruste au centre du cadre, un gel douche Native à cinq secondes, une crème CeraVe à vingt-sept, un nettoyant PanOxyl à une minute seize. Le père attrape aussi physiquement les produits en rayon.

Le détail le plus habile est ailleurs : **les tondeuses ne sont jamais montrées clairement.** Elles sont évoquées par des bruitages, un bourdonnement, un cliquetis, un bruit de rasage. Sur un sujet où la plateforme est susceptible, montrer moins et faire entendre plus est une solution de conformité qui coûte zéro euro. Raselio, qui a une annonce marquée en anomalie par Meta et qui masque l'entrejambe par pixel, post-it, serviette ou recadrage, a tout intérêt à noter ce raccourci.

### Hook analysis

Accroche double, verbale et textuelle. Ligne parlée, verbatim : « I'm here with my 15-year-old son and I'm going to get him the essentials he needs to manscape. » Texte à l'écran, verbatim : « 4 Manscaping Essentials Every Teen Boy Needs ».

Ce qui la fait marcher est le nombre plus le destinataire. « 4 » dit la longueur, « Every Teen Boy » dit à qui, et la présence physique du fils rend la scène impossible à fabriquer. Le père ne parle pas de grooming, il **accompagne quelqu'un**, ce qui est une position d'autorité bien plus solide qu'un avis.

### Script analysis

**Six segments.** 1, accroche, l'intention et le duo. 2, l'étape lavage, avec le produit incrusté. 3, l'étape outils, portée par des bruitages plutôt que par des images. 4, l'étape séchage, avec la règle de la serviette séparée. 5, l'étape hydratation, avec le produit incrusté. 6, l'astuce finale contre la bactérie et l'odeur.

Le trait de style de la référence est l'usage d'euphémismes drôles, « manhood », « monster truck », et la méthode d'adaptation est claire là-dessus : les traits de copie doivent être remplacés par l'équivalent conforme de la marque, pas recopiés. La charte de ton de Raselio exclut ce registre. La substitution structurelle qui garde le rôle du segment sans le ton est le nom clinique et calme, qui est déjà la voix de la marque et qui, sur un public de plus de cinquante ans, fonctionne mieux que le contournement.

La vraie valeur de cette référence pour Raselio n'est pas son script, c'est **sa distribution des rôles**. Six segments, un homme qui explique, un autre qui écoute. Il suffit de changer les deux âges : au lieu d'un père de trente-huit ans et d'un fils de quinze, un homme de soixante et un homme de cinquante-cinq, ou un homme de soixante seul face caméra qui explique le geste à celui qu'il était il y a dix ans. La marque n'a jamais filmé personne, verified, et c'est le format le moins cher pour commencer.

---

## Corpus élargi — 2 · @thedrskin, « Sick of razor bumps? »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7667931541917420808_1785778393/7667931541917420808_sick_of_razor_bumps_here_is_how_to_fix_your_routin.mp4`. Page TikTok : `https://www.tiktok.com/@thedrskin/video/7667931541917420808`. Source : corpus élargi, Potentially Relevant avec un score de 0,6.

Publiée le **2026-07-29**. **128 600 vues, 3 887 mentions j'aime, 52 commentaires, 348 partages, 1 104 enregistrements.** Taux de mentions j'aime 3,02 %, taux de partage 0,27 %, taux d'enregistrement 0,86 %. Hashtags : `#medicalaesthetician #drskin #ingrowhairs #bumps`. Durée d'environ 54 secondes.

### Why this video is here

Elle est dans l'anneau extérieur parce qu'elle parle de barbe et pas de zone intime, et elle est retenue parce qu'elle est **la seule vidéo du corpus portée par une figure d'autorité**. Le créateur porte une blouse noire et un stéthoscope, se présente comme « DR SKIN », et filme dans une pièce clinique avec des étagères de produits et des planches anatomiques.

L'ancrage en preuve de marque est un manque criant. Sur 163 annonces Raselio, l'étiquette `ad_format: Authority Figure` porte **1 annonce et 0,17 € de dépense sur la dernière semaine**, verified. Le prior sur les publics de plus de cinquante ans place pourtant le témoignage validé par un expert en tête des formats les plus fiables sur cette tranche d'âge, devant l'humour et devant la démonstration seule. La marque a donc zéro euro sur le format que son acheteur réel croit le plus, et 26,9 % de sa dépense sur celui qu'il croit le moins.

Le deuxième ancrage est une phrase. Le créateur ouvre en disant, verbatim : « If you keep getting ingrown hairs like this, you are not alone. This was me before. » L'autorité s'installe par l'aveu, pas par le diplôme. C'est le registre exact que le document de contexte de marque décrit comme celui qui marche sur cette catégorie, franc et rassurant, et l'inverse exact des post-it de Raselio.

### Visual breakdown

La vidéo s'ouvre sur un **stitch**, c'est-à-dire une reprise de la vidéo de quelqu'un d'autre : un homme montre en gros plan une irritation sévère autour de son bouc, peau enflammée, poils incarnés visibles. Le texte, verbatim, dit « Goatee went wrong ». Un bandeau bleu annonce « INCOMING STITCH ». C'est une selfie à la main, en extérieur, en contre-plongée légère.

À quatorze secondes, le décor change complètement. On passe à un plan fixe, à hauteur d'oeil, sur trépied, dans une pièce professionnelle. Le créateur est en blouse noire avec un stéthoscope, et il a lui-même des patchs sur le visage, ce qui dit sans le dire qu'il connaît le problème de l'intérieur. Au-dessus de son épaule, des images s'incrustent en style fond vert.

La séquence de preuve est une suite d'objets nommés et lisibles plusieurs secondes chacun : un schéma anatomique du poil incarné à dix-neuf secondes, des tondeuses Wahl à trente-trois, un rasoir droit à trente-quatre, un acide glycolique The Ordinary à trente-cinq, un BHA à trente-huit, une séance de laser à quarante-trois. Les sous-titres blancs sur fond noir reprennent la parole mot pour mot, en bas au centre, pour la lecture son coupé.

**Le schéma anatomique est l'élément le plus volable de tout ce document.** Raselio vend une tête arrondie qui éloigne la lame d'une peau fine et mobile. Sa meilleure annonce éducative, `RS30-7R 25`, écrit exactement ce mécanisme en texte, verbatim : « Une lame droite conçue pour une joue tendue, posée sur une peau fine qui bouge : elle pince les plis, chauffe et tire le poil. » Ce paragraphe est un schéma qui n'a jamais été dessiné.

### Hook analysis

Accroche par appel au problème et écart de curiosité, portée par une image crue. Les treize premières secondes sont **sans une parole**, seulement une piste musicale mélodique et le stitch. Le texte, verbatim, « Goatee went wrong », suffit à raconter l'histoire.

Ce qui fonctionne est la texture. Un gros plan de peau réellement abîmée est une rupture de motif dans un fil rempli d'images propres, et il déclenche une empathie physique avant toute réflexion. La voix n'arrive qu'à quatorze secondes, calme et empathique. L'ordre compte : la douleur d'abord, l'autorité ensuite. Une annonce qui commencerait par la blouse blanche perdrait le spectateur avant d'avoir le droit de lui parler.

### Script analysis

**Six segments.** 1, le stitch, la douleur montrée, sans parole. 2, l'entrée de l'expert et l'aveu, « you are not alone. This was me before ». 3, l'explication du pourquoi, l'anatomie du poil incarné et ses conséquences, boutons, inflammation, marques sombres. 4, la routine immédiate, eau chaude, gel, sens du poil, tondeuse électrique ou rasoir propre. 5, l'entretien, l'exfoliation. 6, la solution longue durée, le laser, et la conclusion, verbatim, « That's how you finally break the cycle ».

L'adaptation à Raselio garde les six segments et l'arc, qui va de la frustration à la clarté puis à l'espoir. Deux substitutions imposées par la règle de correspondance de la preuve, et elles sont sérieuses. D'abord, le segment 6 propose un traitement, le laser, que Raselio ne vend pas et ne peut pas revendiquer ; l'équivalent structurel conforme est l'entretien de la lame et le remplacement du geste, pas une promesse médicale. Ensuite, et c'est une règle écrite dans les notes de la marque, aucune revendication dermatologique n'est autorisée tant qu'aucun test ne l'appuie. L'autorité empruntée ici est celle d'un praticien réel ; si Raselio n'en a pas, la méthode impose de garder le rôle du segment 2 avec un cadrage d'autorité conforme, l'homme qui a vécu le problème plutôt que celui qui le soigne.

---

## Corpus élargi — 3 · @mozzie.moz, « i bought the philips norelco one blade intimate so you dont have to »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7418428537327160618_1788672726/7418428537327160618_i_bought_the_philips_norelco_one_blade_intimate_so.mp4`. Page TikTok : `https://www.tiktok.com/@mozzie.moz/video/7418428537327160618`. Source : corpus élargi, Potentially Relevant avec un score de 0,6.

Publiée le **2024-09-25**. **539 500 vues, 5 636 mentions j'aime, 158 commentaires, 155 partages, 995 enregistrements.** Taux de mentions j'aime 1,04 %, taux de partage 0,03 %, taux d'enregistrement 0,18 %. Hashtags : `#reviews #onebladeintimate #philipsnorelco #oneblade #sensitiveskin`. Durée d'environ 1 minute 19.

### Why this video is here

Elle est dans l'anneau extérieur parce que la créatrice est une jeune femme qui parle de sa ligne de bikini, ce qui n'est ni le produit ni l'acheteur de Raselio. Elle est retenue parce qu'elle est **la seule vidéo du corpus qui montre ce qui se passe quand une promesse de zone sensible n'est pas tenue**, et parce que son sujet est exactement le concurrent que Raselio affronte en France.

L'ancrage en preuve de marque est un risque, pas une opportunité, et c'est pour ça qu'il compte. Le compte de Raselio écrit aujourd'hui « Zéro coupure » et « Anti-coupure. Anti poil incarné. Anti irritation. » sur des créas payées, et affiche « Approuvée par plus de 35 000 hommes » alors que la boutique a onze clients et aucun outil d'avis, verified. Cette vidéo est le scénario du retour de bâton, filmé par quelqu'un qui a payé trente ou quarante dollars pour croire la même phrase.

Le deuxième ancrage est une phrase de vocabulaire client que la marque devrait connaître par coeur. Verbatim : « don't believe everything you see online and don't spend thirty or forty dollars or whatever it is to buy this if you really don't think that you need it because I wish I hadn't bought it. » C'est l'objection numéro un du document de contexte de marque, la peur d'acheter une camelote à petit prix, énoncée dans les mots de quelqu'un qui vient de la vivre.

### Visual breakdown

Le décor est une chambre ou un studio étudiant : mobilier visible, une lampe, une porte au fond, lumière chaude de plafonnier mélangée à un peu de jour. La créatrice est une jeune femme, cheveux bouclés châtains, sweat vert d'université, un collier fin. Rien n'est mis en scène.

Un seul objet à l'image, la tondeuse Philips OneBlade Intimates, blanche, tenue très près de l'objectif dès la première seconde. Le contraste entre le blanc de l'appareil et le vert du sweat suffit à le faire ressortir. Elle la fait tourner pour montrer la lame et la marque, puis s'en sert comme d'un accessoire pour ponctuer ses phrases.

**Il n'y a aucune démonstration, aucun avant après, aucune preuve visuelle.** La douleur est racontée avec les mains. Un seul bandeau texte, verbatim, « philips norelco one blade intimates review », reste en haut pendant toute la vidéo. Aucune musique. Ce dénuement est le format lui-même : une caméra, un objet, un visage, et une personne qui dit ce qu'elle pense.

C'est aussi la démonstration qu'une vidéo de cette catégorie n'a besoin d'aucun moyen de production. Raselio n'a jamais filmé personne sur 163 annonces, verified, et le coût d'entrée de ce format est un téléphone posé sur une étagère.

### Hook analysis

Accroche de type mise en garde, ce que la niche appelle du désinfluencement. Ligne parlée, verbatim : « I bought this so that you do not have to. And let me tell you what I think. I don't like it, okay? »

Le mécanisme est l'inversion d'attente. Tout le fil vend, celle-ci prévient, et c'est cette rareté qui arrête le doigt. Le ton est assertif, presque protecteur, et il n'y a pas de musique, ce qui met toute l'attention sur la parole. La ligne « And that's a bold statement, but let me tell you why » referme la boucle et retient : elle annonce qu'une justification arrive, donc on reste.

### Script analysis

**Six segments.** 1, le verdict d'abord, contre toute logique de vente. 2, la légitimation, verbatim, « that's a bold statement, but let me tell you why ». 3, le contexte d'achat, ce que d'autres créatrices avaient promis, ce qui installe qu'elle n'est pas de mauvaise foi. 4, l'expérience réelle, poils incarnés, feu du rasoir, verbatim, « I'm genuinely in pain ». 5, l'avertissement adressé, verbatim, « the girl with sensitive skin — don't do this to yourself ». 6, la nuance et la clôture, verbatim, « It could work for some people, it did not work for me ».

Une marque ne peut évidemment pas produire une vidéo qui la démolit. La méthode d'adaptation prévoit exactement ce cas : quand la référence utilise une tactique que la marque ne peut pas employer, on substitue l'équivalent structurel le plus proche en gardant le rôle du segment. Ici, l'équivalent est de **déplacer la cible du verdict** vers ce que Raselio combat déjà, la tondeuse à barbe réutilisée. Le segment 1 devient un verdict sur l'outil, pas sur une marque nommée, ce qui évite en plus le terrain de la comparaison. Le segment 3 garde son rôle, dire pourquoi on y avait cru, ce qui est le segment le plus important pour la crédibilité. Le segment 6 garde sa nuance, qui est ce qui rend une vidéo honnête crédible.

Une réserve à porter et à faire trancher par la marque : le compte affiche des chiffres de preuve sociale que rien n'étaye. Adopter le registre de l'honnêteté radicale en gardant « 35 000 hommes » et « 4,7/5 · 1 734 avis » serait la contradiction la plus visible qu'une créa puisse porter.

---

## Corpus élargi — 4 · @themrnav, « If You Always Get Razor Bumps Down There… »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7670520323585871126_1788673054/7670520323585871126_if_you_always_get_razor_bumps_down_there_watch_thi.mp4`. Page TikTok : `https://www.tiktok.com/@themrnav/video/7670520323585871126`. Source : corpus élargi, Relevant avec un score de 1, retenue ici parce qu'elle est la plus récente du corpus et qu'elle est du même créateur que l'entrée 1 de la base de marque.

Publiée le **2026-08-05**, soit **32 jours avant ce document, la vidéo la plus récente des 20**. **69 700 vues, 676 mentions j'aime, 17 commentaires, 70 partages, 259 enregistrements.** Taux de mentions j'aime 0,97 %, taux de partage 0,10 %, taux d'enregistrement 0,37 %. Hashtags : `#fyp #shavingtips #razorbumps #malegrooming #selfcare #levelup`. Durée d'environ 1 minute 10.

### Why this video is here

Elle est ici pour une raison de méthode plus que de performance : elle est la **deuxième version** d'un mécanisme déjà validé par le même créateur trois semaines plus tôt, et elle permet de voir ce qu'il a gardé et ce qu'il a changé. La version de juillet a fait 4,5 millions de vues, celle-ci en fait 69 700. Le mécanisme d'ouverture est identique, mot pour mot dans sa structure : « Shave up? Razor burn. Shave sideways? Ingrown hair. Shave downwards? Irritation. » Ce qui change est la place de l'outil, promu de l'étape deux au coeur du propos, et l'ajout d'un lien d'achat.

Le rapport de un à soixante-cinq entre les deux vues est le fait le plus utile de cette entrée, et il vaut avertissement pour Raselio. **Le même créateur, le même mécanisme, le même sujet, à trois semaines d'écart, et un effondrement de portée.** C'est le comportement qu'on attend d'un contenu que l'algorithme reconnaît comme déjà vu, et c'est exactement le problème que le compte publicitaire de la marque a fabriqué à sa propre échelle en produisant 105 annonces en quatre jours autour d'un fond, d'une mise en page et d'un titre identiques.

Le deuxième ancrage est verbal. C'est la seule vidéo du corpus qui prononce l'engagement de Raselio mot pour mot, verbatim : « the blade on this is designed to specifically not nick you or cut you in any shape or form. It's completely skin-safe. » Les annonces `RS30` écrivent la même chose en français : « 0 COUPURE. 0 STRESS. 100 % CONTRÔLE. »

### Visual breakdown

Espace intérieur minimaliste, murs blancs, lumière douce façon lumière naturelle. Le créateur est le même homme que l'entrée 1, mais habillé autrement, t-shirt noir à imprimé blanc, casquette rouge et noire. L'ambiance est celle d'une chambre, pas d'un plateau.

L'ouverture est en gros plans : un rasoir jetable orange bon marché passé sur un tissu noir texturé, et des incrustations en **jaune vif** au centre, « RAZOR BURN », « INGROWN HAIR », « IRRITATION ». Le contraste jaune sur noir est la décision graphique la plus forte du corpus, et elle est reprise à chaque étape : « STOP USING A RAZOR », « SHOWER », « GET A BODY GROOMER », « MOISTURISE ». Un ou deux mots, jamais plus.

Deux objets se partagent le rôle. Le rasoir jetable orange est **le méchant**, montré usé, ordinaire, presque sale. La tondeuse électrique noire est le héros, filmée en gros plan sur la lame et sur le port de charge. Le créateur la tient contre sa bouche comme un micro, ce qui est un geste natif de la plateforme et qui la garde dans le cadre pendant qu'il parle. Un pot d'huile de coco vient clore la routine.

**La distribution des rôles entre deux objets ordinaires est ce qu'il y a à voler ici.** Raselio a écrit cet affrontement, verbatim, dans `RS30-7R 25`, mais elle ne l'a jamais mis en scène : sur 163 annonces, aucune ne montre côte à côte la tondeuse à barbe et la Raselio.

### Hook analysis

Même mécanisme que l'entrée 1, resserré. Trois paires geste et douleur en six secondes, ponctuées par des effets sonores de transition. Ligne parlée, verbatim : « Shave up? Razor burn. Shave sideways? Ingrown hair. Shave downwards? Irritation. » La différence avec juillet est l'intonation interrogative, qui transforme chaque constat en question posée au spectateur.

Une revendication d'autorité arrive juste après, et elle est franche jusqu'à l'inconfort, verbatim : « My groin is much smoother than most girls out there. » Elle fonctionne dans ce contexte parce qu'elle est invérifiable et assumée comme telle. Elle est parfaitement inutilisable pour Raselio, dont la charte de ton exclut ce registre et dont le public a soixante ans.

### Script analysis

**Sept segments.** 1, accroche par les trois conséquences. 2, la revendication d'autorité. 3, étape un, jeter le rasoir. 4, étape deux, la douche chaude. 5, étape trois, la tondeuse dédiée, avec le sabot et la promesse de sécurité. 6, étape quatre, hydrater, l'huile de coco non parfumée. 7, l'appel à l'action, le lien, plus un bonus, l'étanchéité.

Ce que la comparaison des deux versions apprend, et c'est la leçon d'adaptation la plus concrète de ce document : entre juillet et août, le créateur a gardé le segment 1 à l'identique et a **déplacé le produit du milieu vers le centre**. La version qui vend le plus explicitement est celle qui a le moins porté. La méthode d'adaptation dit de conserver le placement du segment produit de la référence ; si Raselio trace le squelette de juillet, la tondeuse arrive en segment 4 sur 8 et pas en segment 5 sur 7, et elle arrive comme un outil parmi les étapes d'une routine, pas comme la raison d'être de la vidéo. La fidélité de rythme s'applique aussi : les incrustations font un ou deux mots, jamais une phrase.

---

## Corpus élargi — 5 · @hdsnubbs, « How To Manscape PROPERLY As A Man »

### The video

Fichier lisible : `https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7497361701831068971_1779591882/7497361701831068971_fyp_hygiene_menshygiene_menshygienetips_hygienetip.mp4`. Page TikTok : `https://www.tiktok.com/@hdsnubbs/video/7497361701831068971`. Source : corpus élargi, Relevant avec un score de 1, retenue ici parce que c'est la seule vidéo entièrement muette du corpus.

Publiée le **2025-04-25**. **100 800 vues, 2 917 mentions j'aime, 1 commentaire, 54 partages, 792 enregistrements.** Taux de mentions j'aime 2,89 %, taux de partage 0,05 %, taux d'enregistrement 0,79 %. Un seul commentaire pour 100 800 vues, ce qui est le rapport le plus étrange du corpus. Hashtags : `#fyp #hygiene #menshygiene #menshygienetips #hygienetips #selfcare #selfimprovement #manscaped #bodyhair`. Durée d'environ 28 secondes.

### Why this video is here

C'est la référence la plus proche de ce que Raselio peut produire demain matin sans changer d'organisation. **Aucune parole, aucune voix off, aucun script à écrire.** Le texte à l'écran est le script entier, et l'équipe de Raselio ne fait que ça depuis trois semaines. La marque produit du texte sur image à un rythme de 30 unités par jour, verified sur les dates de création. La seule chose qui manque à ces textes est un corps et un mouvement derrière.

L'ancrage en preuve de marque est arithmétique. Les 163 annonces du compte sont des images fixes, verified, et sur la quinzaine `ad_format: Headline Only` porte 31 annonces et 236,45 €, `Post-It Note` 55 annonces et 359,09 €. Le compte n'a **aucune vidéo**. Ce format est le pont le moins coûteux entre ce que la marque sait faire et un format qu'elle n'a jamais essayé, parce qu'il ne demande ni voix, ni acteur qui parle, ni écriture nouvelle.

Le deuxième ancrage est le contenu du texte lui-même, qui donne à Raselio des sujets qu'elle n'a jamais abordés. Une ligne dit, verbatim : « excessive hair contributes to odor ». Une autre donne une hauteur de sabot précise, verbatim : « 🥜: 3mm guard ». Une troisième désamorce l'exigence, verbatim : « it doesn't have to be completely shaved ». Aucun de ces trois arguments n'existe dans les 224 paires de copy du compte : ni l'odeur, ni la hauteur de coupe, ni l'autorisation de faire à moitié. Le produit a pourtant un sabot trois hauteurs, stated dans les spécifications de l'équipe.

### Visual breakdown

Une salle de bain ordinaire, mur de carrelage blanc, porte en bois, lumière de plafonnier. Le créateur a une vingtaine d'années, physique athlétique. Il commence habillé, en plan moyen, regard caméra, gestes des mains, puis passe torse nu. La transition sert de rupture de motif.

Toute la narration passe par des cartes de texte blanches, centrées, tenues deux à trois secondes chacune : « How To Manscape PROPERLY As A Man (Men's Hygiene) », puis « phillips multi groomer (amazon) », « wipe off body/excess deodorant with baby wipe », « chest: 1mm guard or no guard (preference) », « just shave all the hair off honestly », « it doesn't have to be completely shaved », « excessive hair contributes to odor », « 🥜: 3mm guard », « but no women will be mad if it's trimmed. », « hop in shower immediately », « use sensitive soap for 🥜 ».

Les plans alternent entre le créateur et des gros plans d'outils et de produits, une tondeuse Phillips à trois secondes, des lingettes à cinq, un savon Dove peaux sensibles à vingt-six. Le montage suit une instrumentale rythmée, coupe rapide. Les produits sont posés comme des outils dans une routine, pas comme des articles à vendre.

**L'usage de l'emoji cacahuète comme substitut de la zone est la trouvaille de conformité la plus économique du corpus.** Raselio a écrit exactement la même règle dans ses briefs et l'exécute avec des post-it, des pixels et des serviettes. Cette vidéo montre que le substitut peut vivre **dans le texte** plutôt que dans l'image, ce qui coûte encore moins cher et supprime le problème que le statut `WITH_ISSUES` de l'annonce `STATIQUE S9` pose peut-être.

### Hook analysis

Accroche par le bénéfice, entièrement textuelle. Verbatim : « How To Manscape PROPERLY As A Man (Men's Hygiene) ». Le mot qui travaille est « PROPERLY », en capitales : il installe que le spectateur s'y prend probablement mal, sans le lui dire en face.

Visuellement, l'accroche est le regard caméra et les gestes des mains, suivis par le passage au torse nu. Sur le plan sonore, une instrumentale hip-hop rapide démarre à la première image et donne le tempo du montage. Il n'y a pas de voix du tout, ce qui rend la vidéo lisible dans un fil coupé, ce qui est la condition de base de tout ce que Raselio produit déjà.

### Script analysis

Classification selon la méthode d'adaptation : **texte à l'écran uniquement**. La règle est explicite, ne jamais ajouter de voix off à une référence qui n'en a pas, le texte est le script. **Six segments.** 1, accroche et promesse. 2, l'outil, avec sa source d'achat. 3, la préparation, essuyer le déodorant. 4, le torse, avec la hauteur de sabot. 5, la zone intime, avec sa hauteur de sabot et la ligne qui rassure. 6, l'après, douche immédiate et savon doux.

L'adaptation pour Raselio est la plus simple de tout le document et c'est pour ça qu'elle est ici. Six cartes de texte, six segments, une tondeuse, une salle de bain, un téléphone sur une étagère. Les substitutions imposées : l'outil du segment 2 devient la Raselio avec son sabot trois hauteurs, ce qui rend le segment 4 et le segment 5 exacts plutôt qu'approximatifs. Le segment 5 doit changer de justification, parce que la ligne de la référence, verbatim, « but no women will be mad if it's trimmed », s'adresse à un homme de vingt ans qui cherche l'approbation, et que l'acheteur de Raselio a soixante ans. La règle de rythme s'applique : les cartes tiennent deux à trois secondes, pas six. Et la contrainte de la marque tient toute seule, puisque la référence ne montre jamais la zone, elle l'écrit.

---

## Open loops

**1. La catégorie enseigne un geste et Raselio vend un objet, et personne n'a mesuré ce que l'enseignement rapporte.**
Les deux vidéos les plus vues du corpus, 4,5 millions et 1,7 million de vues, sont des tutoriels en quatre étapes qui montrent l'outil au milieu et pas au début. Elles portent aussi les deux plus hauts taux d'enregistrement, 0,57 % et 1,75 %. Le compte de Raselio, lui, dépense 507,97 € sur la quinzaine en annonces classées `Solution Aware` et 12,21 € en annonces classées `Unaware`, verified.
*Pull : **Gap**.* Il y a des millions de vues gratuites sur le versant amont de cette catégorie, et la marque n'a jamais dépensé un euro dessus.
**Question : combien de gens achètent cette tondeuse après avoir appris à s'en servir plutôt qu'après avoir vu qu'elle existe ?**
Si le chemin d'achat passe par l'apprentissage, l'advertorial et la landing en sept raisons deviennent le coeur de la stratégie et pas des pages de destination, et la créative change de travail. Territoire : **Messaging**.

**2. Personne au-dessus de quarante ans n'apparaît nulle part dans cette catégorie, et Raselio n'a que des acheteurs au-dessus de quarante-cinq.**
Sur seize vidéos dont la démographie du créateur a été lue, l'homme le plus âgé est un père « d'environ la fin de la trentaine ». Aucune vidéo ne montre un homme de cinquante ou soixante ans. Les six achats du compte sont tous sur des hommes de 45 ans et plus.
*Pull : **Surprise**.* Une catégorie entière parle à des hommes de vingt-cinq ans, et l'argent d'au moins une marque de cette catégorie vient d'hommes de soixante.
**Question : où sont les hommes de plus de cinquante ans qui achètent ce produit, quand ils ne sont pas sur TikTok ?**
Si ce public vit ailleurs, sur le fil Facebook où tombent déjà 70,8 % de la dépense du compte, alors le corpus TikTok reste une source de mécanismes et jamais une source de canal, et la marque doit arrêter d'attendre de l'organique TikTok ce qu'il ne peut pas lui donner. Territoire : **Personas**.

**3. Le corpus a été constitué en anglais, et personne ne sait ce que la même niche dit en français.**
Les seize mots-clés de collecte sont tous anglophones, et les 20 vidéos sont anglophones. Aucune requête française n'a été lancée dans la constitution du corpus, et les cinq recherches françaises menées sur la bibliothèque publicitaire Meta le 2026-09-06 avaient déjà renvoyé zéro ligne.
*Pull : **Curiosité**.* Toute la matière de langue de cette marque vient d'un marché qui n'est pas le sien, et rien ne dit si le français dit la même chose.
**Question : quels mots les hommes français emploient-ils pour ce problème quand ils ne parlent pas à une marque ?**
Si la langue française de la catégorie diffère, la copie du compte est une traduction d'un vocabulaire américain plutôt qu'une écriture, et chaque accroche est à réécrire depuis la source. Territoire : **Messaging**.

**4. La seule vidéo qui parle à l'acheteuse est aussi le seul territoire d'audience que la marque n'a jamais financé.**
La vidéo de `@kerrydenevan` vend l'objet à une femme en lui promettant la fin d'une corvée, pas un cadeau. Côté compte, les femmes de 45 à 54 ans ont reçu 28,45 €, produit 0 achat attribué, et le brief de l'équipe rapporte 3 ajouts panier et 1 paiement initié sur ce segment, stated. Une seule créa des 163 leur parle.
*Pull : **Motif**.* Le même comportement, une femme qui achète l'objet intime pour son compagnon, apparaît dans le signal du compte, dans le corpus organique et dans le document de contexte de marque.
**Question : qu'est-ce qu'une femme cherche à régler pour elle-même quand elle achète cet objet à son compagnon ?**
Si ce qu'elle achète est la fin d'une tâche qu'elle assume, et non un cadeau, alors toute la créative qui lui est destinée est à écrire dans l'autre sens, et la fenêtre de fin d'année devient une occasion réelle. Territoire : **Personas**.

## Signatures de méthode

`this is based on everything I have learned about adapting and re-writing scripts`
`This is everything I know about advertising to older audiences.`

## Appendix - Parker media links

| ID | Source | Lien tableau de bord Parker | Vidéo lisible | Page TikTok | Vignette | Où c'est discuté |
|---|---|---|---|---|---|---|
| M001 | @themrnav, « 4 Steps To Shaving Down There The Right Way » | https://app.heyparker.ai/dashboard/inspiration?video_report=cec4600e-08fd-4f3d-92c4-b53c4894a5f2&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7663517457486859542_1786244557/7663517457486859542_4_steps_to_shaving_down_there_the_right_way_lads_i.mp4 | https://www.tiktok.com/@themrnav/video/7663517457486859542 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7663517457486859542_1786244557/thumbnail.jpg | Base de marque 1 |
| M002 | @italianfella, « i will never trust that brand again » | https://app.heyparker.ai/dashboard/inspiration?video_report=766bb876-aa1a-42f0-a9e1-673a55329fe6&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7026762933040467205_1788672870/7026762933040467205_i_will_never_trust_that_brand_again_levismusicproj.mp4 | https://www.tiktok.com/@italianfella/video/7026762933040467205 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7026762933040467205_1788672870/thumbnail.jpg | Base de marque 2 |
| M003 | @kaleb.o, « This my go to » | https://app.heyparker.ai/dashboard/inspiration?video_report=412cef83-c253-4815-b4fd-913573aaf440&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7657297378218642701_1788672944/7657297378218642701_this_my_go_to_fyp_shaving_selfcare.mp4 | https://www.tiktok.com/@kaleb.o/video/7657297378218642701 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7657297378218642701_1788672944/thumbnail.jpg | Base de marque 3 |
| M004 | @pierredalati, Manscaped Chairman Pro chez Costco | https://app.heyparker.ai/dashboard/inspiration?video_report=b711e40f-0c64-4880-bdef-5e620a135ef1&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7657623579109969170_1788672651/7657623579109969170_grab_the_chairmanr_pro_essentials_kit_by_manscaped.mp4 | https://www.tiktok.com/@pierredalati/video/7657623579109969170 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7657623579109969170_1788672651/thumbnail.jpg | Base de marque 4 |
| M005 | @kerrydenevan, « It's the perfect gift for him (and you!!) » | https://app.heyparker.ai/dashboard/inspiration?video_report=8a123416-943c-4bb0-94be-cfb2204159de&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7440210812678999326_1788672558/7440210812678999326_its_the_perfect_gift_for_him_and_you_manscaped_gif.mp4 | https://www.tiktok.com/@kerrydenevan/video/7440210812678999326 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7440210812678999326_1788672558/thumbnail.jpg | Base de marque 5 |
| M006 | @dadandtel, « The best manscaping Essentials for Teen Guys » | https://app.heyparker.ai/dashboard/inspiration?video_report=fad4114b-3e10-4373-8e7a-9b4484cf997e&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7406272010344598827_1788672481/7406272010344598827_the_best_manscaping_essentials_for_teen_guys.mp4 | https://www.tiktok.com/@dadandtel/video/7406272010344598827 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7406272010344598827_1788672481/thumbnail.jpg | Corpus élargi 1 |
| M007 | @thedrskin, « Sick of razor bumps? » | https://app.heyparker.ai/dashboard/inspiration?video_report=e58b17a5-3c70-467b-8323-19a27619cf9a&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7667931541917420808_1785778393/7667931541917420808_sick_of_razor_bumps_here_is_how_to_fix_your_routin.mp4 | https://www.tiktok.com/@thedrskin/video/7667931541917420808 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7667931541917420808_1785778393/thumbnail.jpg | Corpus élargi 2 |
| M008 | @mozzie.moz, « i bought the philips norelco one blade intimate so you dont have to » | https://app.heyparker.ai/dashboard/inspiration?video_report=a6e8cc5f-2070-440e-802c-fe046f4cca1d&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7418428537327160618_1788672726/7418428537327160618_i_bought_the_philips_norelco_one_blade_intimate_so.mp4 | https://www.tiktok.com/@mozzie.moz/video/7418428537327160618 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7418428537327160618_1788672726/thumbnail.jpg | Corpus élargi 3 |
| M009 | @themrnav, « If You Always Get Razor Bumps Down There… » | https://app.heyparker.ai/dashboard/inspiration?video_report=d4f5a3fd-5cce-45b0-ac0e-8ab8d138de1d&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7670520323585871126_1788673054/7670520323585871126_if_you_always_get_razor_bumps_down_there_watch_thi.mp4 | https://www.tiktok.com/@themrnav/video/7670520323585871126 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7670520323585871126_1788673054/thumbnail.png | Corpus élargi 4 |
| M010 | @hdsnubbs, « How To Manscape PROPERLY As A Man » | https://app.heyparker.ai/dashboard/inspiration?video_report=0db11715-100c-4dd5-98e0-a024c382f8f3&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7497361701831068971_1779591882/7497361701831068971_fyp_hygiene_menshygiene_menshygienetips_hygienetip.mp4 | https://www.tiktok.com/@hdsnubbs/video/7497361701831068971 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7497361701831068971_1779591882/thumbnail.jpg | Corpus élargi 5 |
| M011 | @mattrandon, « HOW TO PREVENT INGROWN HAIRS! », corpus non retenu | https://app.heyparker.ai/dashboard/inspiration?video_report=311c6f50-d2f6-4901-9378-a96f0c79357c&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7472132794248940822_1784134409/7472132794248940822_how_to_prevent_ingrown_hairs_ulike_beauty_partner_.mp4 | https://www.tiktok.com/@mattrandon/video/7472132794248940822 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7472132794248940822_1784134409/thumbnail.jpg | Cadrage du corpus |
| M012 | @sallydarrgriffin, « my @manscaped review », corpus non retenu | https://app.heyparker.ai/dashboard/inspiration?video_report=5af8ac08-a818-419f-85af-58683a85a5ab&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7050973540916710703_1788672559/7050973540916710703_my_manscaped_review.mp4 | https://www.tiktok.com/@sallydarrgriffin/video/7050973540916710703 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7050973540916710703_1788672559/thumbnail.jpg | Cadrage du corpus, présence Manscaped |
| M013 | @kooshaaa, « pov: you always cut yourself shaving », corpus non retenu | https://app.heyparker.ai/dashboard/inspiration?video_report=ebfdd09c-b1bd-4a8c-a4b9-014235ebd4f8&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7488402929724968238_1782616891/7488402929724968238_me_slimmer_trimmer_all_summer_meridian_grooming_ma.mp4 | https://www.tiktok.com/@kooshaaa/video/7488402929724968238 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7488402929724968238_1782616891/thumbnail.jpg | Cadrage du corpus, présence Meridian |
| M014 | @_brittneymonet, « Girl tips i wish i knew sooner! », corpus non retenu | https://app.heyparker.ai/dashboard/inspiration?video_report=f9c8c029-5287-4663-9db8-764fd801b28b&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7284675493247421739_1771146412/7284675493247421739_girl_tips_i_wish_i_knew_sooner_philips_one_blade_t.mp4 | https://www.tiktok.com/@_brittneymonet/video/7284675493247421739 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7284675493247421739_1771146412/thumbnail.jpg | Cadrage du corpus, présence Philips |
| M015 | @itssimannn, skit Manscaped, seule vidéo classée Not Relevant | https://app.heyparker.ai/dashboard/inspiration?video_report=0b95bb4d-3725-4ca3-903b-e6db4fe2dc55&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7438441951814307114_1788672874/7438441951814307114_get_20percent_off_free_shipping_manscaped_with_cod.mp4 | https://www.tiktok.com/@itssimannn/video/7438441951814307114 | https://auth.heyparker.ai/storage/v1/object/public/tiktok-videos/7438441951814307114_1788672874/thumbnail.jpg | Cadrage du corpus, registre exclu par la charte de ton |
| M016 | Annonces Raselio, dépense et achats par annonce, ancrage compte | — | `source-pulls/meta-ads-all.md` | — | — | Ancrages de chaque entrée |
| M017 | Ventilations âge, genre, emplacement et série quotidienne | — | `source-pulls/meta-account-breakdowns.md` | — | — | L'acheteur de 45 ans et plus |
| M018 | Inventaire des canaux organiques, absence de TikTok Raselio | — | `sub-context-docs/organic-channels-inventory.md` | — | — | Cadrage d'ouverture |
| M019 | Landing advertoriale | — | https://www.raselio.com/pages/pourquoi-pas-votre-tondeuse-a-barbe | — | — | Boucle ouverte 1 |
| M020 | Landing listicle en sept raisons | — | https://www.raselio.com/pages/7-raisons | — | — | Base de marque 3, boucle ouverte 1 |
