# 01 — ParoPet UK (paropet.co.uk) vs ParoPet US (theparopet.com) : analyse comparative

Date d'exécution : 10 septembre 2026.

## 0. Méthode et limites (à lire avant tout)

**Les deux domaines ParoPet sont bloqués par la politique réseau de cette session** (`paropet.co.uk`, `theparopet.com`, ainsi que Trustpilot, Amazon UK et Wayback Machine → 403 sur CONNECT). Il n'a donc **pas** été possible de relire les prix et promotions « live » comme demandé par le brief.

Sources effectivement utilisées :

| Source | Ce qu'elle a donné | Fraîcheur |
|---|---|---|
| Brandsearch — fiches marque des deux domaines | Plateforme, type, trafic, nb de produits, nb d'annonces Meta | Snapshot septembre 2026 |
| Brandsearch — catalogue produits des deux domaines | Titres, prix, dates de création, IDs produits | Snapshot septembre 2026 |
| Brandsearch — annonces Meta actives (20 premières par dépense, sur 150 US / 335 UK) | Copywriting intégral, angles, dépenses UE, dates | Juin → 3 sept. 2026 |
| Extraits de recherche web (pages produit, page « no-pull-dog-harness », contact, Trustpilot, Amazon UK, Companies House) | Prix, garanties, seuils de livraison, avis, emails | Extraits indexés, date inconnue (probablement août–sept. 2026) |

Conséquence : **tout prix cité ci-dessous doit être re-vérifié sur les sites au moment de l'exécution de l'offre**, comme le brief l'exige. Les chiffres sont marqués `[snapshot]` quand ils viennent d'une source datée, `[extrait]` quand ils viennent d'un extrait de recherche non daté.

## 1. Le fait structurant : une seule boutique, deux domaines

Les deux catalogues Brandsearch renvoient **les mêmes IDs produits Shopify** (ex. harnais `9680144236785`, bundle `9680143483121`, laisse élastique `9775215739121`), les mêmes dates de création, et Brandsearch donne le même pays d'origine (GB) aux deux marques. Les 20 annonces Meta les plus dépensières sont **les mêmes IDs d'annonces** sur les deux domaines (ex. `2056770798611177`, `2845622695799407`).

Conclusion : ParoPet n'a pas deux boutiques. Il a **une boutique Shopify (Royaume-Uni, société PAROPET LTD, Companies House n° 17174830) avec Shopify Markets** : un marché UK sur `paropet.co.uk` (GBP) et un marché US sur `theparopet.com` (USD), un seul compte publicitaire Meta, un seul jeu de créas.

Chronologie déduite :
- Marque référencée par Brandsearch sur `paropet.co.uk` en avril 2026 ; ~149 000 visites/mois `[snapshot]`.
- Domaine `theparopet.com` référencé le 14 août 2026, trafic mesuré : 0 `[snapshot]` → **l'expansion US est très récente** (été 2026).
- Le 20 août 2026, deux produits sont créés sur les deux marchés : « 🎁 FREE ParoPet Classic Dog Lead » (0) et « ParoPet Shock-Absorbing Bungee Lead » (payante). Voir §3.

Brandsearch classe `paropet.co.uk` en **« dropshipping »** et `theparopet.com` en « DTC brand ». Les délais de livraison UK annoncés (« dispatched within 1–2 business days, delivered within 4–8 business days » `[extrait]`) sont cohérents avec un stock hors UK ou un 3PL lent.

## 2. Méthode d'adaptation internationale de ParoPet

| Dimension | Conservé sur tous les marchés | Adapté par pays |
|---|---|---|
| Boutique, thème, structure de pages | Identique (même Shopify, mêmes handles `/products/paropet-no-pull-dog-harness`, `/pages/no-pull-dog-harness`) | Rien |
| Catalogue | Identique (19 produits) | Rien |
| Créas et textes publicitaires | Identiques, mêmes IDs d'annonces | Rien — les annonces US disent encore « Join thousands of **UK** dog owners » et emploient « lead », « colour », « personalise » |
| SEO | — | Non adapté : la page `theparopet.com/pages/no-pull-dog-harness` porte encore le title « No-Pull Dog Harness **UK** \| Step-In Front Clip » |
| Devise | — | GBP ↔ USD via Shopify Markets |
| Prix | Même logique (prix rond, remise 20 % permanente en pub, prix barré sur PDP) | Montants (voir §3) |
| Seuil de livraison gratuite | Même logique : seuil placé **juste au-dessus du prix du harnais** pour forcer un ajout au panier | £40 (harnais £29) vs $50 (harnais $39) |
| Cadeau | Même mécanique « laisse assortie offerte » | Aucune différence constatée |
| Garantie | 40 jours, « 40-day walk trial », remboursement intégral | Aucune différence |
| Email support | Même format | `support@paropet.co.uk` vs `support@theparopet.com` `[extrait]` |
| Preuve sociale | Mêmes claims (« thousands of UK dog owners », « 50,000+ owners ») | Non adaptée — claim UK servi aux Américains |
| Personnalisation (patch nom) | Même option | $9 US `[extrait]` ; prix UK non retrouvé |

**Verdict** : ParoPet n'adapte que la devise, les montants et le seuil de livraison. Tout le reste est du copier-coller, y compris des éléments qui trahissent l'origine UK sur le marché US. C'est précisément la faille que notre boutique australienne doit exploiter : une adaptation locale réelle, pas une simple conversion de devise.

## 3. Offre : prix, promotions, cadeaux, bundles, upsells

### 3.1 Catalogue et prix par marché `[snapshot Brandsearch, sept. 2026]`

| Produit (titre exact) | UK (GBP) | US (USD) | Ratio US/UK | Rôle dans le funnel |
|---|---|---|---|---|
| ParoPet No-Pull Dog Harness | 29,00 | 39,00 | 1,34 | Produit héros |
| Extra No-Pull Harness & Free Bungee Lead (`/second-complete-set`) | 29,00 | 39,00 | 1,34 | Upsell « deuxième chien » / post-achat |
| 🎁 FREE ParoPet Classic Dog Lead (créé 20/08/2026) | 0 | 0 | — | Cadeau automatique panier |
| ParoPet Shock-Absorbing Bungee Lead (créé 20/08/2026) | 9,99 | 14,00 | 1,40 | Upsell panier |
| ParoPet Comfort Grip Rope Lead | 21,00 | 29,00 | 1,38 | Cross-sell |
| ParoPet Essentials Dog Collar | 13,00 | 18,00 | 1,38 | Cross-sell |
| ParoPet Tactical Collar (`/paropet-heavy-duty-collar`) | 21,00 | 29,00 | 1,38 | Cross-sell |
| Complete Walk Set | 45,00 | 62,00 | 1,38 | Bundle intermédiaire |
| Ultimate No-Pull Bundle | 50,00 | 82,00 | **1,64** | Bundle haut |
| The Complete No-Pull Guide | 0 | 0 | — | Ebook gratuit (lead magnet / order bump) |

Observations :
- Le taux GBP→USD appliqué est ≈1,38 sur presque tout le catalogue, sauf le harnais (1,34, arrondi à 39) et **l'Ultimate Bundle (1,64)** : le bundle US est proportionnellement bien plus cher. À revérifier live ; si confirmé, c'est soit une erreur de configuration Markets, soit un test de prix US.
- Le brief mentionne un prix barré US de **47 USD** (soit −17 %). Les annonces Meta parlent, elles, de **« 20% off »** en permanence depuis le 10 juin 2026. 39/47 = −17 %, pas −20 %. Contradiction à consigner (voir §8).
- Le porte-sacs à déjections mentionné dans le brief **n'apparaît pas** dans le top 10 catalogue Brandsearch. Ne pas l'affirmer sans vérification live.

### 3.2 Le cadeau a changé (à revérifier live)

Toutes les annonces juin→septembre 2026 promettent une **« free matching bungee lead »** (laisse élastique assortie). Or, le 20 août 2026, ParoPet a créé sur les deux marchés :
1. un produit « 🎁 FREE ParoPet Classic Dog Lead » à 0 ;
2. un produit « Shock-Absorbing Bungee Lead » **payant** (£9,99 / $14).

Hypothèse la plus probable : le cadeau a été **rétrogradé** d'une laisse élastique à une laisse classique, et la laisse élastique est devenue un upsell payant, **sans que les annonces soient mises à jour**. Si c'est confirmé live, c'est une incohérence pub/PDP exploitable : notre offre australienne doit dire exactement ce qu'elle offre, et l'annonce doit correspondre à la page.

### 3.3 Promotion

- Remise permanente « 20 % » dans **100 % des 20 annonces** les plus dépensières, sur les deux marchés, du 10 juin au 22 août 2026. Les deux annonces les plus récentes (2–4 sept.) abandonnent le « 20% » et mènent sur la garantie.
- Prix barré sur PDP (47 → 39 USD selon le brief).
- **Aucun prix, aucun symbole monétaire, aucun seuil de livraison dans les annonces** : l'annonce vend le mécanisme + le cadeau + la garantie, la page vend le prix.

### 3.4 Upsells et personnalisation

- Patch nom personnalisable : $9 en supplément `[extrait]` ; dans les annonces : « Personalise it with your dog's name if you like », « You can even get his name stitched on it » (note : « stitched » ≠ patch velcro — incohérence de description).
- « Extra No-Pull Harness & Free Bungee Lead » à prix du harnais seul : upsell « deuxième harnais » post-achat ou multi-chiens.
- Bundles : contenu exact non vérifiable ; le seul fait confirmé `[extrait]` : « The free bungee lead is included with the Ultimate No-Pull Bundle at no extra cost ».
- Ebook « The Complete No-Pull Guide » à 0 : lead magnet et/ou order bump qui répond par avance à l'objection « ce n'est pas du dressage ».

### 3.5 Livraison et retours

| | UK | US |
|---|---|---|
| Livraison gratuite | à partir de **£40** `[extrait]` | à partir de **$50** `[extrait]` |
| Sinon | £3,99 tracked `[extrait]` | non retrouvé |
| Délais | expédition 1–2 j ouvrés, livraison 4–8 j ouvrés `[extrait]` | non retrouvé |
| Retours | 40 jours, remboursement intégral, « just email support@… » | idem |
| Retours **gratuits** ? | **Rien ne l'indique.** Le client renvoie à ses frais (« send it back ») | idem |

Le seuil est placé à ~+38 % (UK) et ~+28 % (US) au-dessus du prix du harnais seul : l'acheteur d'un harnais paie la livraison ou ajoute une laisse élastique/un collier pour la gagner. C'est le levier AOV principal.

## 4. Mécanisme produit (tel que communiqué)

Liste consolidée des affirmations ParoPet (annonces + extraits PDP) — **chacune est à cocher dans `04-product-verification-checklist.md` avant réemploi** :

1. Attache frontale (anneau D poitrail) qui **redirige latéralement** : « the front D-ring turns your dog back towards you the second they pull », « redirected sideways instead of dragging you forward ».
2. Explication « clip dorsal = mécanique de chien de traîneau » : « Most harnesses clip on the back … That's sled dog mechanics ».
3. Attache dorsale pour promenade libre (anneau D arrière).
4. Aucune pression sur la gorge : « no choking, no pinching, nothing on the face », « guides from the chest, not the throat ».
5. Enfilage rapide : « One clip on, one clip off », « Two clips and it's on », « goes over the head and clips on in one go » — **et** ailleurs « step-in design » et « no stepping in ». ParoPet se contredit sur le mode d'enfilage (voir §8).
6. 4 points de réglage : « adjustable at 4 points », « Four adjustable straps ».
7. Poignée dorsale : « A grab handle on the back for instant control near roads or other dogs ».
8. Plastron rembourré, nylon léger respirant, sangles plates anti-frottement, « chafe resistant webbing ».
9. Liseré réfléchissant.
10. Boucles à clip rapide, anneaux D métalliques avant/arrière.
11. « Escape-proof safety loop » `[extrait]`.
12. Tailles et coloris : plusieurs coloris (rose confirmé par avis), grille cm non récupérée.
13. « No training required / no training needed » — **claim le plus risqué**, contredit par leur propre guide de fitting (« behaviour change comes from repetition ») et par des avis négatifs.

## 5. Promesse émotionnelle et copywriting

### 5.1 Ce que vendent réellement les annonces (par dépense UE, 20 premières annonces)

| Angle | Part de dépense approx. | Exemples verbatim |
|---|---|---|
| Douleur physique du maître + abandon des promenades (UGC 1re personne) | ~19 % (1 seule annonce, la plus dépensière : ~€14 k) | « My shoulder hadn't recovered properly and every walk was leaving me sore. I'd started skipping them. » / « Stopped walking her because it hurts? » |
| Promo + cadeau + urgence (« 20% Off Sale Final Hours », « Free Bungee Lead & 20% Off Today ») | ~60 % | « Still thinking about it? Here's the nudge. » |
| Pédagogie mécanisme / déculpabilisation | ~10 % | « The pulling isn't your fault. » / « Your dog isn't the problem. The clip position is. » |
| Pattern-interrupt « apology » + preuve sociale chiffrée + rareté | ~12 % | « We owe you an apology… 50,000+ owners had already switched… Popular colours are still in stock, but not for long. » |
| Comparaison outils (slip lead, licol, collier à pointes, harnais dorsal) | ~2 % | « slip leads crush the throat, head halters get pawed off, prong collars hurt, and back-clip harnesses actually trigger the instinct to pull harder » |

### 5.2 Structure de copy récurrente (à reproduire dans sa logique, pas dans ses mots)

1. Hook = douleur du maître ou reframe de la culpabilité.
2. Mécanisme en une phrase (avant vs arrière).
3. 3–5 puces produit (enfilage, rembourrage, poignée, laisse offerte, personnalisation).
4. Preuve sociale non chiffrée (« thousands of UK dog owners ») ou chiffrée (« 50,000+ »).
5. Offre : 20 % + laisse offerte.
6. Garantie 40 jours comme suppression du risque : « Basically free to try. »
7. CTA unique « Shop now ».

### 5.3 Promesses émotionnelles verbatim

« Walks without the pulling - finally. » · « enjoy the walk again » · « no more sore arms, no more getting dragged » · « if it doesn't change your walks, send it back » · « The complete walking set, sorted. » · « It's the harness owners keep saying they wish they'd bought sooner. »

### 5.4 Ce qui manque dans leur copy (opportunités AU)

Aucune mention de : vélos, joggeurs, enfants, propriétaires âgés, dos (uniquement épaule/bras), chiens réactifs, chaleur, plage, randonnée, visibilité nocturne, races, chiens de refuge, lavage. Aucune démonstration multi-morphologies. Aucune distinction honnête « contrôle ≠ dressage » dans les annonces (elle n'existe que dans la page fitting).

## 6. Homepage, PDP, mobile, panier (reconstitué à partir des extraits)

Impossible de rendre les pages. Éléments confirmés par extraits :
- Homepage : « Built for real dog owners and the dogs they love », collection « Walk » (« less pulling, more comfort, and confidence on every walk »), témoignages clients (Maltipoo « best harness that I have found »), widget avis « 4.8 out of 5 from 3,718 reviews ».
- PDP : titre « ParoPet No Pull Dog Harness », prix barré, sélecteur taille/couleur, guide « measure at the widest point just behind the front legs… If you're between sizes, go up… very thick coat → size up », instructions « two fingers under the straps… Too tight can cause rubbing. Too loose makes twisting more likely. Adjust both sides evenly », bloc garantie « return it within 40 days of ordering for a full refund. No hassle. Just email support@… », option patch nom, cadeau laisse.
- Landing page longue `/pages/no-pull-dog-harness` (2 annonces « lp » les plus récentes pointent vers une LP) : « Step-In Front Clip », « free bungee lead and 40-day walk trial », section training « Keep the training block short, reward loose lead, and stop when the lead goes tight… 5-10 minutes… reward every 5-10 steps ».
- Mobile : non observable. Les annonces sont 100 % Facebook/Instagram/Threads/Messenger/Audience Network → trafic quasi exclusivement mobile ; la PDP est donc de fait le point d'atterrissage mobile principal.
- Panier : cadeau à 0 ajouté automatiquement (produit « 🎁 FREE … » à 0), seuil de livraison gratuite, upsell laisse élastique/collier. Non observable en détail.

## 7. Avis, notes, langage client, objections

Voir `02-language-mining.md` pour le détail. Synthèse :

| Source | Note | Volume | Remarque |
|---|---|---|---|
| Widget on-site (PDP/homepage) | 4,8/5 | 3 718 avis `[extrait]` | Non auditable |
| Trustpilot paropet.co.uk | **3,8/5** | **272 avis** `[extrait]` ; répartition 69 % 5★, 5 % 4★, <1 % 3★, 4 % 2★, **22 % 1★** | Très polarisé ; un extrait plus ancien dit « 31 people have already reviewed » |
| Annonces Meta | aucune note | « thousands of UK dog owners », « 50,000+ owners » | Claims non sourcés |

Les 1★ Trustpilot portent sur : **livraison lente / colis non reçu, absence de réponse aux demandes de remboursement, harnais qui se desserre en marche (jusqu'à une plaie sous l'aisselle), « ne stoppe pas la traction »**. Amazon UK : « twists too much and doesn't stop the pulling ».

## 8. Contradictions et données à ne pas reprendre

| # | Contradiction | Détail | Conséquence pour nous |
|---|---|---|---|
| C1 | Nombre de clients | « thousands of UK dog owners » (annonces) vs « 50,000+ owners » (annonce « apology ») vs 272 avis Trustpilot | Aucun chiffre ParoPet ne doit apparaître chez nous |
| C2 | Notes et volumes d'avis | 4,8/5 sur 3 718 (site) vs 3,8/5 sur 272 (Trustpilot) vs « 31 » (ancien extrait) | Nous n'affichons que des avis réels collectés par nous, avec compteur réel |
| C3 | Emails | `support@paropet.co.uk` vs `support@theparopet.com` — même équipe, deux façades | Une seule adresse AU claire ; annoncer un délai de réponse réel |
| C4 | Livraison gratuite ≠ retours gratuits | Livraison offerte > seuil ; retour à la charge du client ; 1★ pour remboursements ignorés | Notre garantie doit préciser qui paie le retour |
| C5 | Remise | −20 % (annonces) vs 47→39 = −17 % (PDP, brief) | Pas de prix barré fictif chez nous |
| C6 | Cadeau | « free matching bungee lead » (annonces) vs produit « FREE Classic Dog Lead » créé 20/08 + bungee devenue payante | Dire exactement ce qui est offert |
| C7 | Enfilage | « step-in » (LP, title SEO) vs « goes over the head » / « no stepping in » (annonces) | Décrire notre vrai mode d'enfilage, avec vidéo |
| C8 | Personnalisation | « name stitched on it » (annonce) vs patch amovible à $9 (PDP) | Décrire le vrai procédé |
| C9 | Autorité | « Our dog trainer recommended ParoPet's front-clip harness » (annonce en voix client) — aucun éducateur nommé, aucun vétérinaire | Aucune mention d'éducateur/véto sans partenariat nommé |
| C10 | Urgence | « 20% Off Sale Final Hours » actif pendant 5+ semaines ; « Today » depuis juin ; « not for long » | Exclu par le brief |
| C11 | Marché | Annonces US = « UK dog owners » ; title SEO « UK » sur .com ; dépenses pub libellées UE | Notre copy doit être australienne de bout en bout |
| C12 | « No training required » | Contredit par leur propre page fitting et par les avis « doesn't stop pulling » | Nous vendons contrôle immédiat + méthode courte, pas un miracle |
| C13 | Produits Amazon UK « Paropet » | Plusieurs listings au nom « Paropet » avec titres génériques (B0GYJSJ3LM, B0HDPMS4TY, B0HCJBRY4Y, B0H8RDQXWJ) en plus des listings officiels (B0H2YXKS69, B0H2YNRMYJ) | Probables imitations ; ne rien en déduire sur le produit ParoPet |
| C14 | Bundle US | Ultimate Bundle ratio 1,64 vs 1,38 ailleurs | À revérifier ; ne pas copier la structure de prix sans la comprendre |
| C15 | Porte-sacs | Cité dans le brief, absent du top catalogue | Vérifier avant d'en faire un produit complémentaire « comme ParoPet » |

## 9. Tableau CRO comparatif

| Élément | ParoPet UK | ParoPet US | À conserver (logique) | À améliorer | Adaptation Australie |
|---|---|---|---|---|---|
| Hero | Promesse « walks without the pulling », photo/vidéo chien, avis 4,8 | Identique | Une promesse, un mécanisme, un CTA | Aucun ancrage local ; pas de morphologies variées | Vidéo 6 s : kelpie/staffy qui pivote vers son maître sur une piste côtière ; promesse « freedom to enjoy walks and adventures without dreading the pull » |
| Angle marketing | Douleur maître + « ce n'est pas ta faute » + promo | Identique (copy UK) | Reframe de la culpabilité, UGC 1re personne | Angle promo dominant, fausse urgence | Liberté / aventure ; sécurité vélos-joggeurs sur pistes partagées ; chaleur |
| Prix | £29 (harnais) | $39, barré $47 | Prix rond, sous la barre psychologique | Prix barré permanent | A$59, sans faux barré ; comparaison honnête avec Easy Walk / Ruffwear |
| Promotion | −20 % permanent en pub | Identique | Offre unique et lisible | « Final hours » mensonger | Offre de lancement datée réellement, ou pas de promo |
| Cadeau | Laisse assortie (bungee → classique ?) | Identique | Cadeau utile, assorti, visible dans le panier | Écart pub/PDP | Laisse classique assortie offerte, annoncée à l'identique partout ; bungee en upsell |
| Personnalisation | Patch nom | Patch $9 | Option à faible friction sur PDP | « stitched » vs patch | Patch velcro nom + numéro (utile : identification, retrouver un chien à la plage) — si logistique validée |
| Preuve sociale | 4,8/3 718 on-site ; 3,8/272 Trustpilot ; « 50,000+ » | Identique | Avis avec race + situation + photo | Chiffres incohérents | Avis réels collectés post-achat, filtrables par race/taille/situation |
| Mécanisme | Avant vs arrière, « sled dog mechanics » | Identique | Explication en une phrase + schéma | Pas de démo multi-morphologies | Animation vue de dessus + 3 vidéos (petit/moyen/grand, poitrail profond) |
| Guide des tailles | « mesurer derrière les pattes avant, entre deux → au-dessus » | Identique | Règle simple | Pas de grille cm visible dans les extraits, pas de races | Grille cm + tour de cou + tableau races AU + « quel doigt passer » |
| Objections | Page fitting (2 doigts, symétrie) | Identique | Conseils précis | Non intégrées à la PDP/FAQ | FAQ : desserrage, rotation, mastication, poitrail large, « ce n'est pas du dressage » |
| FAQ | Non observable | Non observable | — | — | FAQ honnête (voir `03`) |
| Garantie | 40 jours, remboursement, retour aux frais du client | Identique | Garantie « ça change tes promenades ou remboursé » | Retour payant, réclamations ignorées (1★) | 60 jours, retour prépayé (Australia Post), délai de réponse affiché |
| Livraison | Gratuite > £40, £3,99 sinon, 4–8 j | Gratuite > $50 | Seuil légèrement > prix héros pour l'AOV | Délais longs | Gratuite Australia-wide dès le harnais (voir `03` §2), Express dispo, délais AusPost réels |
| Produit complémentaire | Bungee, rope lead, colliers, 2e harnais, ebook | Identique, plus cher | Laisse élastique = upsell logique | Bundle US mal calibré | Bundle « Beach & Trail » : harnais + bungee + porte-sacs |
| Panier | Cadeau à 0, seuil, upsell | Identique | Cadeau visible, barre de progression | — | Barre « free shipping » + upsell bungee A$22 + patch |
| Mobile | Trafic 100 % social → mobile | Identique | PDP = LP mobile | Non observable | PDP mobile-first : ATC sticky, guide taille en drawer, vidéos verticales |

## 10. Complément : compte publicitaire, chronologie de l'offre, créas (ajout 10 sept. 2026)

Voir `05-ad-system-and-creative-playbook.md` pour le détail. Points qui modifient la lecture des sections 3 et 8 :

- **Volume réel** : 490 annonces Meta indexées sur paropet.co.uk, ≈ €368 k de dépense UE, 32 M de reach ; ciblage déclaré GB uniquement. theparopet.com n'a aucun ciblage US indexé : la « version US » n'a, à ce jour, **aucune publicité propre**.
- **L'offre a bougé 4 fois en 5 mois** : 30 % + 30 j + livraison gratuite (avril) → 20 % + 40 j (mi-avril) → 20 % + **60 j** testé sur deux annonces UGC (≈ €31 k, mai–juin) → retour à 40 j → abandon du « 20 % » dans les titres début septembre au profit de « 40-day Money-Back Guarantee » et « Thousands Of UK Dog Owners Have Made The Switch ».
- **Annonce n° 1 (€80 643)** : « The pulling isn't your fault. » en green-screen TikTok, présentateur récurrent, sur-titre « Most pulling dogs never stop pulling ». Le mécanisme, pas la promo, est ce qui a scalé.
- **Claims supplémentaires non sourcés** : « the one trainers actually use » (≈ €44 k de dépense cumulée), « Free UK delivery » sans seuil (avril), et une erreur factuelle « Collars clip on the back » diffusée à €10 k.
- **Contradiction C16** : garantie 30 → 40 → 60 → 40 jours selon la période ; un client qui a vu l'annonce « 60-day return » et lit « 40 days » sur la PDP a une réclamation ACL-like légitime au Royaume-Uni (Consumer Protection from Unfair Trading Regulations). Notre garantie doit être identique partout, tout le temps.
