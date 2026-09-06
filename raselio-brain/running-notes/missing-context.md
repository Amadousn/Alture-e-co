---
brand: Raselio
doc: missing-context
last_updated: 2026-09-06
sources: build-day intake gaps + data_limitations across all docs + the brand-routed section of the latest open-loops roll-up
---

# Missing context — what the brand has not yet told us

## Data sources not connected

- ~~**Parker MCP brand**~~ — **RÉSOLU 2026-09-06 09:50 UTC** (`brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, org « Dylan's Org »). Texte d'origine : the Parker MCP was reachable but returned no brand for this account (`get_available_brands` → `organizations: []`). Until Raselio exists as a brand in Parker, the brain has no native reach into Meta ad comments, TikTok organic, customer reviews, post-purchase surveys, Reddit, competitor ad library, swipe file, or the setup-status telemetry. Starves: ad-comments, post-purchase-surveys, reddit, other-reviews, organic-tiktok, tiktok-mining, and every "comments" read. Unblocks when connected: all persona source pulls at full depth, the hook audit on comments, the monthly organic audits. A Slack invite to `#parker-dylan-s-org-raselio` from Real Simple Labs arrived on 2026-09-06 — the onboarding may be mid-flight on Parker's side.
- **Parker Desktop** — not installed (no `~/.parker/workspace.json`). The brain is self-managed on GitHub instead. Not blocking.
- **Customer reviews** — no review app or review feed exists on the store (Shopify has no review metafields; the "4,7/5 · 1 734 avis" on the landing page has no data source behind it). Starves: customer-reviews, customer-review-audit, VoC corpus.
- **Post-purchase survey** — none running. Starves: post-purchase-surveys, persona attribution.
- **Organic social** — no Instagram/TikTok/YouTube handle was found in any connected source; Shopify shows 181 sessions from Instagram and 923 from Facebook, so at least a Facebook page (id 1234695553067195, "Raselio") exists. Handles and content history not provided.
- **Google Ads / search** — nothing connected; 24 sessions from Google in 90 days.
- **Email / SMS** — no ESP connected.
- **Northbeam / third-party attribution** — not connected; performance is read in Meta + Shopify only.

## Intake questions — ordered by what they unblock

1. **Which numbers define a winner for you?** North-star (ROAS, CPA, MER, bénéfice net?), the target value, and whether hitting it is the whole story. Unblocks: every audit's verdicts, product-priority, the roadmap's sizing.
2. **What is the max cost per purchase you will tolerate, and the real landed unit cost** (product ≈ 11,41 € per the recap sheet; Colissimo shipping cost per order; payment fees)? Unblocks: performance-targets-and-metrics, sprint-plan sizing.
3. **Where do "+17 000 hommes" and "4,7/5 · 1 734 avis" come from?** If they are placeholders inherited from a template, they are a claims risk on every ad and on the landing page. Unblocks: brand-identity (claims gate), brand-lens, every brief.
4. **Who are the competitors you actually watch, and who is inspiration?** Build-day set: Thomyle (FR direct), Gillette Labs Body + Intimate (mass FR), Grümwise (team's own inspo teardown). Confirm or replace. Unblocks: competitors/, external audits, whitespace.
5. **Your brief format** — paste it and it becomes `briefs/_brief-template.md`. Unblocks: brief-creation matching your format.
6. **When two ads in one ad set diverge on spend, does the higher-spend one win, or do you weigh efficiency too?** Unblocks: the iteration and diversity audits' selection rule.
7. **Do you read performance in Meta only, or also in Shopify, and on which attribution window?** Unblocks: every performance read's denominator.
8. **Organic handles and what exists there** (Instagram, TikTok, Facebook page, YouTube). Unblocks: organic-channels-inventory, monthly organic audit.
9. **Product spec sheet** — RPM, battery life, blade material certification, IPX rating, warranty terms. Unblocks: claims substantiation in scripts and statics.
10. **The roadmap review moment** — the build did not pause at Phase 2 (nobody was present); the strategic roadmap is drafted and awaiting your approve / adjust / reject.
11. **Anything an agency you just hired should know** — process, tools, statuses, who decides. Voice-dictate it long.

## Blocage de build en cours

- **2026-09-06 08:34 UTC — limite de dépense mensuelle du compte Claude atteinte.** Le build de la Phase 1 s'est arrêté après deux tranches de fondation sur quatorze. La limite de session se réinitialise à 13h00 UTC ; la limite mensuelle demande une action sur https://claude.ai/settings/usage. Rien n'est perdu : `BUILD-STATUS.md` porte le ledger complet et la procédure de reprise.

## Per-doc named blanks

Filled by each doc's `data_limitations` frontmatter as the build runs — see the individual docs under `sub-context-docs/`, `personas/`, `audits/`, `competitors/`.

### operations-and-team.md (généré 2026-09-06)

Document reconstruit à 100 % depuis les traces, sans une seule réponse de la marque : l'intake de set-up n'a pas pu être posé, le build a tourné sans personne. Blancs nommés, à demander à Dylan :

1. **Le budget marketing.** Aucun montant total, mensuel ou annuel n'existe dans une source. Seule la dépense déjà engagée est lisible, 684,82 € sur Meta du 2026-08-10 au 2026-09-06. Fermeté du budget, horizon, et qui peut le changer : non stated.
2. **Le coût de structure.** Abonnement Shopify, crédits Higgsfield, IONOS, OVHcloud, Hostinger, frais Shopify Payments, coût réel du Colissimo par commande : aucun montant nulle part. La marge unitaire de 23,58 € utilisée partout dans le brain est donc une marge avant port et avant frais de paiement.
3. **Les heures disponibles.** Combien de temps par semaine Raselio reçoit réellement, face à Trael et Aerozya. Rien ne le dit, et ça dimensionne toute vague créative.
4. **Ce que l'équipe veut automatiser, dans ses mots.** Aucun souhait n'a jamais été formulé. Les trois candidats lus dans les gestes (rangement des images, saisie du classeur, recopiage vers Shopify) sont des inférences.
5. **Les droits d'écriture.** L'assistant a écrit le 2026-07-26 « Je n'ai pas les droits d'écriture sur les politiques légales de la boutique ». À sonder : vraie limite ou droit jamais ouvert.
6. **Les huit jours d'extinction publicitaire du 17 au 24 août 2026.** Zéro euro dépensé, aucune explication dans une source.
7. **Satisfaction sur les outils et intention de déléguer.** Aucun prestataire n'apparaît ; trois demandes d'accès collaborateur et deux démarchages d'agence sont restés sans suite visible. Non confirmé par la marque.
8. **Le fournisseur.** Délai d'approvisionnement, stock détenu, point de départ des colis : rien dans les sources au-delà de la référence RUILANG 810 sur 1688.
9. **Qui tranche entre Dylan et l'assistant IA** quand le brief et l'exécution divergent. Exemple mesuré : le brief du 3 septembre écrit « exclure les 18-44 des campagnes de conversion » et les ad sets actifs s'appellent toujours « HOMMES 18-55 » douze jours plus tard.

### marketing-calendar-and-campaigns.md (généré 2026-09-06)

Blancs nommés propres au calendrier :

1. **Le calendrier à venir.** Rien, absolument rien dans les sources ne dit ce qui est prévu après le 2026-09-06. Seule la marque peut le donner.
2. **Aucun historique d'une année sur l'autre.** La marque a 46 jours : la section des moments récurrents est structurellement vide et le restera jusqu'à ce qu'une saison revienne. Premier vrai test : Black Friday 2026, le 27 novembre.
3. **Le lot RENTRÉE du 2026-09-01.** Quatre annonces, 28,42 €, creative read unavailable. Ce que l'équipe attendait de cet angle : non stated.
4. **Les visuels de sept lots créatifs** (RENTRÉE, POSTIT, EMOTION, IMPECCABLE, RS·C/PP, W/N, R02-R30) n'ont pas pu être inspectés : pas de brand_id Parker, et les documents de l'équipe ne couvrent que les lots du 23 août et du 3 septembre.
5. **La mise en scène saisonnière du magasin.** raselio.com est bloqué par le proxy : page d'accueil, bandeaux promotionnels et habillage non vus.
6. **Aucun rythme d'inbox et aucun rythme organique.** Pas d'ESP, pas de handle Instagram, TikTok ou YouTube ; le plan de trois posts Facebook du 14 août est la seule trace organique et rien ne confirme qu'il a été publié.
7. **Les prochains lancements produit.** Un deuxième SKU, un accessoire, une lame de rechange ou le retour du pack : seule la marque le sait. Le doc Grümwise du 13 août listait « tête rasoir à grille, embout nez, set 7 coupe-ongles, trousse cuir » comme pièces déjà disponibles chez le fournisseur, stated.

### customer-journey-and-persona-discovery.md (généré 2026-09-06)

Blancs nommés propres au parcours client :

1. **Aucun avis client, nulle part.** Pas d'application d'avis sur la boutique, aucun avis Shopify, aucun avis marketplace ou tiers, et quatre recherches Gmail dédiées à la voix client ne remontent rien. La source de premier rang de ce document est vide : « ce que les clients aiment » n'a pas pu être écrit. Le geste le moins cher pour le combler est un e-mail de suivi aux onze acheteurs, ou un sondage post-achat d'une seule question.
2. **Les commentaires sous les 183 annonces n'ont jamais été lus.** Pas de brand_id Parker au 2026-09-06, donc pas d'accès aux commentaires publicitaires Meta. C'est le seul endroit où des prospects Raselio ont pu écrire quelque chose, et il reste fermé.
3. **Aucun sondage post-achat.** Il n'existe donc aucune source reliant un acheteur réel à sa raison d'achat. Tout ce que ce document dit d'une tête d'acheteur est du comportement ou de la parole de marque.
4. **La ventilation Meta par âge et genre est au niveau compte.** Elle inclut ≈ 116 € de la marque soeur Trael sur 850,79 €, soit 15 %. L'API n'accepte pas de filtre de campagne au niveau ad_account. Les 6 achats sont bien Raselio, mais les dépenses et CTR par tranche d'âge sont mélangés. À refaire proprement quand un chemin de filtrage existera.
5. **Le compteur de sessions ayant terminé le paiement ne voit que 3 achats sur 11** sur la série de 61 jours, alors que 11 commandes existent. Écart non résolu : suivi de session, blocage de consentement ou paiement hors session. Il fausse tout taux de conversion calculé côté sessions.
6. **Les commandes ne sont pas reliées à leur page d'entrée ni à leur appareil** dans les analytics disponibles. Impossible de dire par quelle porte les onze acheteurs sont entrés, fiche produit, landing « 7 raisons » ou advertorial.
7. **La provenance de « +17 000 hommes » et « 4,7/5 · 1 734 avis » reste inconnue.** Déjà posée en question d'intake n° 3 ; ce document ajoute que le même « 1 734 avis » figure sur la marque soeur Trael, ce qui pointe un gabarit recopié. Seule la marque peut dire d'où ça vient.
8. **Le couple hétérosexuel est supposé partout dans la mise en scène** de l'advertorial et des créas, et rien ne le confirme ni ne l'infirme dans la donnée. À valider dans le travail persona.
9. **Aucune vidéo, aucune voix, aucun visage sur 183 annonces.** La marque n'a jamais testé un format long ni un témoignage, alors que c'est le prior le plus fort pour le public qui achète. Ce qui a été essayé et écarté, s'il y a eu un essai, n'est écrit nulle part.

### community-and-forums.md (généré 2026-09-06)

Ce document n'a capturé **aucun** verbatim de communauté. Blancs nommés, tous liés à l'accès :

1. **Toutes les surfaces communautaires visées sont bloquées par le proxy réseau de la session.** Treize lectures directes tentées le 2026-09-06, treize échecs. Refus « unable to fetch » sur www.reddit.com, old.reddit.com, forum.doctissimo.fr, www.aufeminin.com. Refus EGRESS_BLOCKED sur www.jeuxvideo.com, www.amazon.fr, fr.trustpilot.com, www.neogaf.com, forums.anandtech.com, www.teamblind.com, www.galaxus.ch, billy-trimmer.com, www.gillette.fr, www.europe1.fr. Un contrôle curl sur quinze domaines de plus renvoie 000 sur les quinze. À retenter dès qu'un accès réseau existe.
2. **WebSearch fonctionne mais son index est américain et il ne rend que des résumés.** Huit requêtes lancées, zéro fil francophone lisible. La requête « r/rasage subreddit français » renvoie des groupes Steam. Les citations visibles dans ses résumés sont des paraphrases de l'outil, jamais des verbatims vérifiés, et elles ne sont utilisées nulle part comme preuve.
3. **Aucun accès Reddit via Parker MCP** faute de brand_id. Le corpus Reddit natif et les commentaires publicitaires restent fermés.
4. **Aucune communauté francophone dédiée à l'entretien intime masculin n'a été identifiée.** Impossible de dire si elle n'existe pas ou si l'outil ne la voit pas. C'est la première chose à trancher au prochain run.
5. **Les sept objections que l'équipe s'est écrites n'ont jamais été confrontées à une conversation réelle.** Aucune n'est confirmée, aucune n'est infirmée.
6. **Les métaphores fortes du site**, le cutter contre le scalpel et le déminage, n'ont pas pu être comparées au langage des hommes. On ne sait pas si c'est la voix du client ou celle du copywriter.
7. **Zéro pépite.** Pour une marque sans avis, sans commentaire lisible et sans sondage, c'était la dernière chance d'entendre un vrai acheteur. Elle reste ouverte.
8. **Onze adresses de fils identifiées mais non lues** sont conservées dans l'annexe du document, prêtes à être ouvertes. Un fil francophone sur Galaxus, six anglophones, plus les sources de statistique de catégorie.

### category-and-market-research.md (généré 2026-09-06)

Blancs nommés propres à la lecture de catégorie :

1. **La taille de la catégorie n'existe nulle part.** Aucune source atteignable ne chiffre le marché français des tondeuses et rasoirs intimes pour hommes. Les deux rapports payants trouvés sur le grooming masculin français se contredisent d'un facteur vingt-cinq sur la même année, Deep Market Insights à 2 503,5 M$ en 2024 et Mobility Foresights à 64,7 Md$ en 2025 : aucun n'est utilisable. Le chiffre de « 120 M€, +6 %/an » qui circule vient du blog d'un concurrent, billy-trimmer.com, sans source ni méthode.
2. **Six sources bloquées par le proxy de la session.** businesswire.com, chaindrugreview.com, demotivateur.fr, gillette.fr, charles.co et fr.scamdoc.com. Pour ces pages je n'ai que le résumé du moteur de recherche, donc la date exacte, l'échantillon et la méthode du sondage IFOP sur les pratiques dépilatoires ne sont pas vérifiés, et le communiqué de lancement de Gillette Labs Body n'a pas été lu à la source.
3. **Aucune voix de client français.** Pas de brand_id Parker, donc ni commentaires publicitaires, ni avis, ni Reddit, ni forums. Les six barrières de catégorie sont lues dans des études publiées et dans les publicités des concurrents, jamais dans la bouche d'un acheteur français.
4. **Aucune donnée de recherche.** Pas d'accès Google Trends : le volume et la saisonnalité des requêtes françaises du type « tondeuse intime homme » ne sont pas mesurés. C'est ce qui empêche de trancher la boucle sur le moment de l'année où la catégorie achète.
5. **Le contrôle des rappels produit n'est pas exhaustif.** L'absence de rappel sur les tondeuses intimes est un constat de recherche du 6 septembre 2026, pas une lecture complète du registre RappelConso.
6. **Aucune page de vérification de confiance n'existe pour raselio.com** dans les recherches menées le 6 septembre 2026, alors que thomyle.com en a trois. À re-vérifier au prochain refresh, c'est le type de page qui apparaît avec le volume.
7. **À demander à Dylan, et c'est le point le plus actionnable de ce document :** savait-il que la tondeuse Gillette Labs i3 Body + Intimate est relevée à 29,70 € au Leclerc Drive et que le Philips OneBlade Intimate démarre à 24,95 € chez Carrefour, c'est-à-dire en dessous des 34,99 € de Raselio ? Tout le raisonnement de prix de l'équipe depuis le 13 août est construit contre « les tondeuses premium à 80-100 € ».

### competitive-landscape.md (généré 2026-09-06)

Blancs nommés propres à la carte concurrentielle :

1. **Le set n'est toujours pas confirmé par le fondateur.** C'est la question 4 ci-dessus et elle reste ouverte. Ce document a fait monter deux marques dans le set profond que le set du jour du build ne contenait pas, Billy et Philips OneBlade Intimate, et il a sorti Grümwise du set direct pour la placer en inspo. Ces trois mouvements sont des jugements de Parker et attendent l'accord de Dylan.
2. **Aucune lecture créative pour quatre des cinq marques citées.** Gillette, Philips, Billy et ClubCooper : aucun visuel, aucune accroche, aucune transcription. Le document écrit `creative read unavailable` à chaque fois. Débloqué par un brand_id Parker ou par un appel Brandsearch sur les 186 annonces de Billy.
3. **Brandsearch se contredit sur Thomyle :** 2 082 annonces au total sur la fiche de marque, 1 063 dans l'agrégat tous temps. Les deux chiffres sont portés, aucun n'est réconcilié.
4. **Le corpus Thomyle n'est lu qu'à 40 annonces sur 1 063.** get_brand_ads renvoie 20 lignes par appel sans paramètre de page : seules les 20 plus dépensières et les 20 plus récentes ont été lues.
5. **Les cinq requêtes search_meta_ads en français sur la France ont renvoyé zéro ligne.** Aucune découverte de concurrent par mots-clés publicitaires n'a été possible, et discover_meta_ads n'accepte pas de filtre pays. La grappe française a donc été trouvée par lookup_brand sur des noms devinés, ce qui peut avoir manqué des acteurs.
6. **Le décalage Thomyle non expliqué :** 97 741,09 € de dépense EU cumulée et 108 visites mensuelles sur le même site, d'après la même source. Porté en boucle ouverte.

### reputation-analysis.md (généré 2026-09-06)

Passe **partielle** : la source la plus lourde d'une lecture de réputation, les avis clients, n'existe pas. Blancs nommés :

1. **D'où viennent « 17 000 hommes » et « 4,7/5 · 1 734 avis » ?** Déjà en question d'intake n° 3, et ce document en fait le point dur. La marque affiche 1 734 avis et en a 0, elle affiche 17 000 clients et en a 11. Le même « 1 734 avis » figure sur la marque sœur Trael, ce qui pointe un gabarit. Les créas antérieures disaient 35 000. Risque de conformité actif, puisque ces mentions tournent en publicité payée aujourd'hui. Seule la marque peut répondre.
2. **Les témoignages inventés.** L'équipe a écrit elle-même que les créas 16, 17, 27, W12 et N08 utilisent des prénoms et des citations de témoignage inventés, et l'advertorial est signé « Par Julien M. », personne non identifiable. À remplacer par de vrais avis. Le repli déjà écrit par l'équipe, « Déjà adoptée par des milliers d'hommes », n'a jamais été appliqué.
3. **Commentaires publicitaires : non tirés, jamais lus.** 183 annonces, 1 100 clics, 44 672 impressions, et personne n'a ouvert un seul commentaire, faute de brand_id Parker. C'est le trou le plus rattrapable et la seule surface publique où des Français ont réagi à la marque.
4. **Aucun social organique lu.** Aucun handle Instagram, TikTok ou YouTube dans une source ; seule une page Facebook id 1234695553067195 est connue. Ni les posts ni les commentaires n'ont été vus.
5. **Sites d'avis et de signalement illisibles.** Trustpilot, Signal Arnaques, Avis Vérifiés, Scamadviser, Amazon.fr et Cdiscount refusent la connexion depuis cette session. Aucune fiche Raselio n'a été trouvée par la recherche, mais l'absence n'a pas pu être confirmée par lecture directe. À revérifier en priorité.
6. **Trajectoire de sentiment non calculable.** Première version du document, aucun avis à suivre dans le temps. Un tableau de compteurs au 2026-09-06 sert de point zéro pour le prochain run.
7. **Le nom « Cutlab » appartient déjà à au moins trois entités françaises** : cutlab.fr, kits de couteaux pliants ; lecutlab.fr, découpe numérique ; CUTlab d'Infolab. La marque a reçu un e-mail « Notice of DMCA Infringement » le 2026-08-16 depuis une adresse `pusan.ac.kr` signée « The Meta Business Team », et a changé de nom fin juillet. Rien dans les sources ne relie ces faits. Seule la marque sait s'il y a eu une mise en demeure réelle.
8. **Le chantier Cutlab dans les politiques n'est toujours pas fait.** Cinq politiques sur six portent « Cutlab », deux renvoient à cutlabsupport@gmail.com, les CGV portent « Nom du médiateur : [À COMPLÉTER OBLIGATOIREMENT] », la page Contact est vide. Quarante jours après le changement de nom.
9. **Aucun placement dans un comparatif de catégorie.** Un agrégateur français publie un « top 10 tondeuse anti coupure partie intime » daté de septembre 2026 sans Raselio. Autorité réelle, atteignable, jamais visée.
10. **Aucun dispositif de réponse aux commentaires publicitaires** n'a pu être constaté ni infirmé. La seule réponse client documentée tient en deux mots, « Hello sure ».

### visual-vocabulary.md (généré 2026-09-06)

Blancs nommés propres au vocabulaire visuel :

1. **Aucun visuel n'a été ouvert à l'oeil.** Toutes les scènes du document viennent soit des prompts de génération écrits par l'équipe, soit des champs ad_summary / ad_analysis / creator_demographic que Parker génère à partir de l'image. Là où les deux existent pour une même créa, ils concordent. Un humain n'a rien regardé.
2. **La lecture média complète couvre 19 annonces sur 163 Raselio, soit 12 %.** Les lots W/N du 4 septembre et R02-R30 du 5 septembre n'ont aucune lecture créative : seulement des noms d'annonces et, pour W/N, des concepts en une ligne. Le document écrit `creative read unavailable` pour ces lots et ne s'en sert dans aucune conclusion. Débloqué par une passe Parker sur ces adIds au prochain refresh.
3. **Trois vidéos du compte montrent Grümwise, pas Raselio, et personne ne sait pourquoi.** `RAZELIO | CREATIVE 03 | DEMONSTRATION` (id 7001074471187), `09 | UGC UNBOXING` (7001074470787) et `10 | UGC TEMOIGNAGE` (7001074470987), créées le 14 août, 10,84 € dépensés à elles trois, encore au statut actif dans une campagne en pause, pointant sur l'ancienne URL `cutlab-essentials-bundle` et affichant 44,90 €. Les champs visual_hook disent « holds up a black Grümwise box » et le résumé relève le logo Grümwise sur le manche. Seule la marque peut dire d'où viennent ces fichiers et s'ils doivent être retirés. **Ceci corrige la note « Aucune vidéo, aucune voix, aucun visage sur 183 annonces » portée plus haut sous customer-journey-and-persona-discovery : il y a bien trois vidéos, avec voix off française et visages, elles sont simplement d'une autre marque.**
4. **La tondeuse Raselio ne touche jamais un corps.** Sur les 39 unités dont la scène est établie, aucun plan ne montre le produit en contact avec une peau ; le seul plan lame-contre-peau du répertoire montre la tondeuse générique du concurrent. Pendant ce temps la landing affirme trois mécanismes, la tête qui épouse les reliefs, la LED qui éclaire et le sabot qui règle, qu'aucune image de la marque ne prouve. Personne ne sait si c'est une contrainte assumée ou un angle mort.
5. **Le pivot de talent n'a jamais été isolé.** Entre le 31 août et le 3 septembre l'homme à l'écran passe de 25-35 ans tatoué torse nu à 45-60 ans en peignoir regardant l'objectif, et en même temps la preuve sociale passe de 35 000 à 17 000, le tutoiement devient vouvoiement et la moitié du système graphique change. Aucune variable n'est restée fixe, donc aucun apprentissage n'est attribuable.
6. **Le générateur rajeunit les modèles.** Le prompt de la créa 01 demande « un homme français de 55-60 ans » ; la lecture de l'image rendue estime 45-55. Écart à corriger explicitement dans les prompts du prochain lot, sinon la correction de persona ne survit pas à la génération.
7. **Aucune description visuelle des concurrents français directs.** Brandsearch renvoie pour Thomyle le format, les dates, la dépense EU et le texte, jamais de storyboard ni de visual_hook ; pour Billy, Club Cooper, Gillette et Philips, rien du tout. Le seul concurrent dont la grammaire visuelle est tenue plan par plan est Grümwise, et par le document de l'équipe, donc stated. Débloqué par un appel Brandsearch sur les 186 annonces de Billy, ou par `search_competitor_facebook_ads` maintenant que le brand_id existe.
8. **La cadence de rafraîchissement de ce document est contradictoire.** `parker-system/system/refresh-cadence.md` classe visual-vocabulary en trimestriel ; le prompt qui le produit impose « monthly, with the hook audit » et le grave dans le squelette de frontmatter. J'ai suivi le prompt, refresh_by au 2026-10-06. À trancher côté méthode.
9. **Le champ visual_hook de Parker est vide sur toutes les statiques.** Il n'est renseigné que sur les vidéos. La reconstruction du premier regard sur une statique passe donc par ad_summary, qui décrit toute l'image et pas l'ordre de lecture. Limite d'outil, pas de source.
10. **Aucune donnée de performance ne peut départager les visuels.** 6 achats attribués sur 771,64 € de dépense, plus de la moitié des annonces sous 1 € dépensé. Le document ne classe rien par performance et ne le pourra pas avant plusieurs semaines de diffusion continue.

### organic-channels-inventory.md (généré 2026-09-06)

Document **partiel** par la réalité, pas par manque de travail : la marque n'a pas de présence organique. Blancs nommés :

1. **Personne ne sait ce que contient la page Facebook.** La page « Raselio » id 1234695553067195 est établie par trois voies indépendantes : l'API des pages du compte publicitaire, la bibliothèque publicitaire Meta avec 158 annonces estimées en France, et les permaliens de commentaires. Aucune publication organique n'a pu être observée, et facebook.com est refusé par le proxy de la session. Il suffit d'ouvrir la page pour trancher. **À demander à Dylan.**
2. **Aucun compte Instagram n'est rattaché au compte publicitaire**, vérifié le 2026-09-06 : `ads_get_ig_accounts` renvoie une liste vide. Pendant ce temps 217,82 € sur 771,64 € de dépense marque, soit 28,2 %, partent sur des emplacements Instagram. Ce que voit un homme qui tape sur le nom de la marque dans son fil Instagram n'est pas connu. Réparation administrative, pas créative.
3. **`search_and_manage_organic_social` n'existe pas dans cette installation Parker MCP.** La marque existe désormais dans Parker, brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, mais aucun outil n'expose son organique. L'inventaire a donc été construit à l'API publicitaire, à la bibliothèque publicitaire et aux documents de l'équipe.
4. **facebook.com, instagram.com et tiktok.com sont bloqués par le proxy**, refus EGRESS_BLOCKED sur les trois. Aucun profil, aucun compteur d'abonnés, aucune cadence de publication n'a pu être lu. Ces champs sont vides, pas estimés. À retenter dès qu'un accès réseau existe.
5. **Cinq recherches web n'ont rien trouvé sur la marque.** « Raselio tondeuse intime homme Instagram », « "raselio" tiktok OR youtube OR instagram compte officiel », « raselio.com avis marque française tondeuse », « "@raselio" OR "raselio officiel" tondeuse », « Meta Ad Library Raselio page 1234695553067195 France ». L'index du moteur est américain et ne rend que des résumés : l'absence de résultat ne prouve pas l'absence de compte.
6. **Le site ne pointe vers aucun réseau.** L'export Shopify complet, fiche produit, quatre pages, six politiques et collection, ne contient aucune occurrence de « instagram », « tiktok », « youtube », « pinterest », « facebook.com » ni « @raselio ». Reste ouvert de savoir si c'est un oubli ou un choix lié à la discrétion que la marque vend.
7. **Rien ne confirme que le seul post organique jamais rédigé a été publié.** Le document Drive du 14 août contient un post Raselio complet, avec consignes d'horaire et de format. Il vend « Raselio Pro™, Pack Essentiel à 59,99 € », livre en « France & Canada » et tutoie, trois choses qui ne sont plus vraies. Publié ou non, c'est le brouillon qui traîne dans le dossier.
8. **Le corpus de commentaires publicitaires tient en deux lignes.** 2 commentaires sur 47 484 impressions, aucun like, aucun répondu : « Lol » le 2026-09-01 et « Plus rien de la bête sauvage qui sommeille en nous. » le 2026-08-31. C'est la seule voix de client français que le coffre contienne, et elle suggère une objection que rien d'autre n'a nommée : que se raser là revient à renoncer à quelque chose. **À reprendre en travail persona.**
9. **Les deux surfaces d'attribution Shopify se contredisent sur Instagram.** Le taux de conversion des sessions Instagram est renvoyé à 0 % sur 181 sessions en 90 jours, et la ventilation par référent de commande attribue 2 commandes et 69,98 € à Instagram sur la même fenêtre. Les deux chiffres sont portés, aucun n'est réconcilié.
10. **Un identifiant de page non résolu.** Les permaliens des deux commentaires pointent vers `122109959949409627`, pas `1234695553067195`. Très probablement la même page sous son identifiant de nouvelle expérience, non vérifié depuis cette session. À confirmer d'un clic dans le Business Manager.
11. **Aucun compteur d'audience nulle part.** Abonnés, portée organique, taux d'engagement, cadence : rien de tout cela n'existe dans une source atteignable, donc aucune note de force n'est calculée sur une base chiffrée. La note de 2 sur 10 attribuée à Facebook est une lecture raisonnée, pas un calcul.

### 90-day-creative-strategy-audit.md — audits/2026-Q3/ (généré 2026-09-06)

Blancs nommés propres à l'audit de stratégie créative t0 :

1. **Aucun audit du trimestre précédent.** C'est le point zéro. La marque a 46 jours d'existence, 28 jours de diffusion publicitaire et 12 jours de ventes, donc chaque phrase de trajectoire porte sur des jours et non sur des trimestres. Le prochain passage, à partir du 2026-12-05, sera le premier à pouvoir lire un mouvement.
2. **La lecture créative est indisponible pour la majorité des annonces qui portent la dépense, et c'est la limite la plus lourde de l'audit.** Aucun brand_id Parker n'existe pour Raselio, donc `search_facebook_ads_sql`, `search_facebook_ads_semantic` et les descriptions de créa Parker sont inaccessibles. L'appel direct `mcp__meta__ads_get_creatives` sur le compte 1573950771030463 a été refusé par le classifieur d'autorisation de la session le 2026-09-06 : ni le corps de texte, ni le titre, ni l'URL d'image d'aucune annonce n'ont pu être lus dans le compte. Les seules descriptions visuelles fiables viennent des documents de production de l'équipe, qui couvrent en détail les lots du 3 et du 4 septembre, ceux qui n'ont presque pas dépensé, et qui décrivent en une ligne six annonces plus anciennes seulement. Pour les lots `STATIQUE S1` à `S10` hors S2 et S9, `POSTIT`, `ARRET DE BUS`, `EMOTION`, `RENTREE`, `RS · C/PP` et `R02` à `R30`, seuls les noms existent : `creative read unavailable` est écrit dans le corps de l'audit à chaque fois, et aucune affirmation créative n'y est adossée. **C'est le blanc à débloquer en premier**, soit par un brand_id Parker, soit par une autorisation explicite d'appeler `ads_get_creatives` sur ce compte.
3. **Le fichier `source-pulls/meta-creatives-copy.md` n'existait pas au moment de la rédaction.** L'audit a donc travaillé à partir des noms d'annonces et des documents Drive. Si ce pull est écrit plus tard, les sections 2 et 3 de l'audit doivent être reprises avec les vrais textes et visuels.
4. **Taux d'accroche et taux de rétention n'existent nulle part dans ce compte.** Les 163 annonces Raselio sont des images fixes ; ces deux métriques sont des métriques vidéo. Le gabarit de l'audit les demande dans les instantanés du top 10 ; elles sont marquées sans objet, pas manquantes. Elles n'existeront que le jour où la marque produira une vidéo.
5. **Deux totaux de dépense Raselio coexistent sans réconciliation :** 684,82 € en sommant les 4 lignes de campagnes et 677,81 € en sommant les 163 lignes d'annonces. Écart de 7,01 €, non expliqué par les sources. Les deux sont portés dans l'audit ; les pourcentages par créa sont calculés sur 677,81 €.
6. **Le décompte d'ad sets de `source-pulls/meta-account-campaigns-adsets.md` est incohérent avec son propre tableau :** le titre annonce « Ad sets (14) », le tableau contient 16 lignes dont 3 pour Trael. L'audit retient 13 ad sets Raselio, comptés sur les lignes. À corriger dans le pull au prochain refresh.
7. **Aucune mémoire de marque ni mémoire utilisateur.** `search_chat_history` a renvoyé 0 fil le 2026-09-06 : l'équipe n'a jamais parlé à Parker avant ce build, donc la source « ce que la marque a déjà dit » est vide pour toutes les sections.
8. **L'étiquette « GAGNANTE » circule dans trois lots du compte** et désigne un choix de l'équipe, pas un verdict de données. Seule la marque peut dire ce que ce mot a voulu dire au moment où il a été posé. À demander, parce que l'étiquette va se répliquer et fausser toutes les lectures suivantes.
9. **À demander à Dylan, question ouverte de l'audit :** le mot cru « Couilles » de l'annonce `STATIQUE S2` a produit le meilleur taux d'ajout au panier du compte, et la charte de ton écrite le 3 septembre l'interdit. Laquelle des deux règles gagne ? Personne d'autre que la marque ne peut trancher.

### 90-day-performance-audit.md — audits/2026-Q3/ (généré 2026-09-06)

Blancs nommés propres à l'audit de performance et de livraison t0 :

1. **Aucune ventilation propre à Raselio.** L'API n'accepte pas de filtre de campagne au niveau `ad_account`, donc les ventilations par âge, genre et emplacement portent sur 850,79 € de dépense compte, dont environ 116,37 € appartiennent à la marque soeur Trael, soit 13,7 %. **Aucun pourcentage démographique ou d'emplacement de l'audit n'est propre à Raselio seule.** Débloqué le jour où Trael quitte le compte, ou par un pull par campagne avec breakdowns.
2. **Deux ventilations n'ont pas été tirées avant l'interruption de la session de pull :** `device_platform` et `country`. Elles manquent alors que Shopify montre 989 sessions de bureau depuis les États-Unis sur 2 404 sessions ventilées, pour 11 commandes toutes facturées en France. À compléter au prochain refresh, c'est la ventilation qui dirait combien de la dépense part hors du public visé.
3. **`ads_insights_anomaly_signal` et `ads_get_opportunity_score` n'ont pas été tirés.** Aucune lecture d'anomalie ni de score d'opportunité n'existe pour ce trimestre.
4. **Les colonnes de clics des deux tables ne se réconcilient pas :** la ventilation démographique totalise 1 795 clics quand les lignes d'annonces en totalisent 1 236 pour le compte entier. Les deux ne mesurent probablement pas la même chose, clics totaux contre clics sur lien, mais rien dans les pulls ne le dit. Conséquence directe : **le CTR par tranche d'âge n'est pas comparable au CTR par annonce**, et le désaccord entre la lecture de l'équipe, « plus l'homme est jeune, plus il clique », et la table de compte, où le meilleur cliqueur masculin est le 65 ans et plus, ne peut pas être tranché avec les données actuelles.
5. **L'économie unitaire est stated et incomplète.** Coût produit 11,41 € par unité selon la feuille de l'équipe du 28 août, 12,71 € selon celle du 6 septembre, sans note d'explication. Aucun coût de port Colissimo réel, aucun frais Shopify Payments, aucun abonnement Shopify, aucun crédit Higgsfield, aucun coût de domaine. La marge de 23,58 € utilisée dans l'audit est **une marge avant frais**, et le seuil de rentabilité de 21 € qui en découle est donc optimiste d'un montant inconnu. **À faire compléter par la marque : le coût réel tout compris d'une commande livrée.**
6. **Aucune exclusion d'acheteurs n'a pu être constatée ni infirmée dans le paramétrage tiré.** La fréquence de la campagne active est de 2,34 contre un repère de 1,2, et aucune source ne dit si une liste d'exclusion existe.
7. **Aucun budget écrit.** Ni montant mensuel, ni horizon, ni plafond de test ne figurent dans une source. Seules les dépenses déjà engagées sont lisibles. Une recommandation qui suppose un engagement de dépense sur trois mois n'a personne pour la signer aujourd'hui.
8. **L'écart d'attribution n'est pas résolu :** Meta attribue 6 achats, Shopify compte 11 commandes dont 8 marquées Facebook et 2 Instagram. Cinq commandes ne sont vues par personne dans le compte publicitaire. Porté en boucle ouverte plutôt qu'en limite, parce que la question du chemin d'achat est stratégique et pas seulement technique.

### 90-day-diversity-audit.md — audits/2026-Q3/ (généré 2026-09-06)

Blancs nommés propres à l'audit de diversité de format t0 :

1. **Aucun audit du trimestre précédent**, donc les champs `formats_dropped_since_prior_quarter` et `formats_new_this_quarter` sont structurellement vides ou triviaux : rien n'a été abandonné, tout est nouveau, le compte a 28 jours.
2. **La classification en sous-formats repose sur les noms d'annonces pour la majorité de la dépense.** Les lots documentés par l'équipe, RS30 du 3 septembre et W/N du 4 septembre, sont ceux qui n'ont presque pas dépensé ; les lots qui portent la dépense ne sont décrits nulle part. Tout classement de sous-format sur `STATIQUE S1-S10` hors S2 et S9, `POSTIT`, `ARRET DE BUS`, `EMOTION`, `RENTREE`, `RS · C/PP` et `R02-R30` est marqué **inferred** dans l'audit et ne porte aucune affirmation créative. Même déblocage que le blanc n° 2 de l'audit de stratégie créative.
3. **La bibliothèque inspo est mince et indirecte.** Elle se réduit au décorticage que l'équipe a fait elle-même des dix meilleures créatives de Grümwise le 13 août 2026 : les descriptions des annonces sources sont donc **stated par l'équipe et non observées par Parker**. Brandsearch n'a aucune fiche pour grumwise.com. Les trois recommandations ancrées sur Grümwise reposent sur un document de seconde main.
4. **La bibliothèque concurrente est riche en métadonnées et vide en visuel.** Pour Thomyle, Brandsearch renvoie le format, le statut, la dépense EU, la portée EU, les dates et le texte publicitaire verbatim, mais **aucune description d'image, aucun plan, aucune transcription** : `creative read unavailable` sur tous les visuels concurrents. La recommandation numéro 2 de l'audit est donc ancrée sur une copie vérifiable et un visuel invisible.
5. **Aucune bibliothèque d'affinité n'existe pour Raselio.** Le gabarit de l'audit demande inspo, affinité et concurrents ; la marque n'a que deux des trois, et l'une des deux est de seconde main. Les recommandations se rétrécissent mécaniquement à ce que ces sources font remonter.
6. **Les cinq requêtes `search_meta_ads` en français sur la France ont renvoyé zéro ligne** le 2026-09-06 : « tondeuse intime », « rasage intime homme », « tondeuse corps homme », « poils incarnés homme », « tondeuse testicules ». Aucune découverte de format par mots-clés publicitaires n'a été possible, et `discover_meta_ads` n'accepte pas de filtre pays.
7. **Le corpus Thomyle n'est lu qu'à 40 annonces sur 1 063**, les 20 plus dépensières et les 20 plus récentes. Les formats qui vivent dans les 1 023 autres n'ont pas été vus.
8. **Le nombre d'entités distinctes que Meta reconnaît dans ce compte est inconnu et non mesurable depuis les outils disponibles.** C'est la question centrale de la boucle 1 de cet audit : 163 identifiants de créa existent, combien d'empreintes distinctes le système voit-il ? Aucun champ de l'API tirée ne le dit.
9. **À demander à la marque, question ouverte de l'audit :** qu'est-ce qui décide aujourd'hui qu'un lot de créas reçoit du budget ou n'en reçoit pas ? 105 annonces sur 163 ont été produites en quatre jours pour 68,91 € au total. Si la décision est délibérée, le critère doit entrer dans toutes les recommandations suivantes.

## Resolved — with date and where the answer lives

- 2026-09-06 — Ad naming convention: read directly from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Primary campaign objective: verified OUTCOME_SALES from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Rough unit economics: taken from the team's own "Récap mensuel" sheet → `running-notes/brand-rules.md` (stated, partial).
- **2026-09-06 09:50 UTC — La marque Raselio existe dans le Parker MCP.** `brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, organisation « Dylan's Org ». Elle était absente au démarrage du build (06:00 UTC) et est apparue en cours de route, probablement via l'onboarding Real Simple Labs signalé par l'invitation Slack du matin. Enregistré dans `parker_config.json`. **Conséquence :** les commentaires d'annonces, les avis clients, les sondages post-achat, Reddit, le corpus TikTok organique, l'analyse média des créatives et `brand_discovery` deviennent accessibles. Tous les docs écrits avant cette heure portent des mentions `data-limited` sur ces surfaces qui ne sont plus vraies — ils sont à re-run par `/refresh-context` en priorité. Premiers éléments déjà tirés : le corpus de commentaires du compte tient en **deux lignes**, « Lol » et « Plus rien de la bête sauvage qui sommeille en nous. », toutes deux sans réponse.
