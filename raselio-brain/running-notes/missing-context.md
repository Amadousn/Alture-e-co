---
brand: Raselio
doc: missing-context
last_updated: 2026-09-06
sources: build-day intake gaps + data_limitations across all docs + the brand-routed section of the latest open-loops roll-up
---

# Missing context — what the brand has not yet told us

## Data sources not connected

- **Parker MCP brand** — the Parker MCP was reachable but returned no brand for this account (`get_available_brands` → `organizations: []`). Until Raselio exists as a brand in Parker, the brain has no native reach into Meta ad comments, TikTok organic, customer reviews, post-purchase surveys, Reddit, competitor ad library, swipe file, or the setup-status telemetry. Starves: ad-comments, post-purchase-surveys, reddit, other-reviews, organic-tiktok, tiktok-mining, and every "comments" read. Unblocks when connected: all persona source pulls at full depth, the hook audit on comments, the monthly organic audits. A Slack invite to `#parker-dylan-s-org-raselio` from Real Simple Labs arrived on 2026-09-06 — the onboarding may be mid-flight on Parker's side.
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

## Resolved — with date and where the answer lives

- 2026-09-06 — Ad naming convention: read directly from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Primary campaign objective: verified OUTCOME_SALES from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Rough unit economics: taken from the team's own "Récap mensuel" sheet → `running-notes/brand-rules.md` (stated, partial).
