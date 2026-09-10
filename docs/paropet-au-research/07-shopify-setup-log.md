# 07 — Journal de montage de la boutique Shopify (10 sept. 2026)

Boutique cible : **My Store 10** (`crms7m-ss.myshopify.com`), marché principal « Australie », devise d'affichage AUD, expédition AU uniquement, thème Horizon.

## Créé via l'Admin API

| Type | Élément | ID / handle | Notes |
|---|---|---|---|
| Produit | Front-Clip No-Pull Harness | `front-clip-no-pull-harness` · 20 variantes Size × Colour (XS–XL × Charcoal/Ocean/Red Dirt/Gum) · 59 | stock 25/variante, SKU `HAR-{SIZE}-{COL}` |
| Produit | Classic Lead (included with every harness) | `classic-lead-included-with-every-harness` · 4 coloris · 19 | stock 50 ; offerte via remise automatique |
| Produit | Shock-Absorbing Bungee Lead | 4 coloris · 22 | stock 30 |
| Produit | Name + Phone Patch | 12 | non suivi ; **champ de personnalisation à activer dans le thème** (bloc « product-custom-property ») |
| Produit | Poo Bag Holder | 2 coloris · 12 | stock 30 |
| Produit | Beach & Track Bundle | `beach-amp-track-bundle` · Size × Colour · 89 | produit simple ; à convertir en bundle Shopify/Moonbundle pour décrémenter les composants |
| Collection | Harness (smart : tag harness OU bundle) | `harness` | |
| Collection | Leads & Accessories (smart : tag lead OU accessory) | `leads-amp-accessories` | |
| Collection | Walk (smart : tag walk) | `walk` | alimentée sur la homepage |
| Collection | Home page (manuelle) | `frontpage` | harnais, bundle, bungee, patch ajoutés |
| Pages | Size Guide, Fitting Guide, FAQ, 60-Day Loose-Lead Guarantee, Shipping & Returns, The First 10 Walks, About, Contact (mise à jour) | `/pages/…` | copy en-AU issue de `03` et `06` |
| Menus | Main menu (7 entrées) et Footer menu (8 entrées) | | |
| Remise automatique | « Matching Classic Lead included with every harness » | BXGY : 1 harnais → 1 Classic Lead à 100 % | active depuis le 10/09/2026, cumulable |
| Livraison | Zone Australia : Standard 0 (existant) + **Express Post (1-3 business days) 9,95** | profil général | |
| Thème | Copie « Horizon AU homepage draft » (non publiée) avec `templates/index.json` réécrit : hero, bandeau confiance, douleurs, mécanisme, « Built for how Australians walk », produit vedette, does/doesn't, garantie, FAQ accordéon, grille Walk | `OnlineStoreTheme/198432194944` | à prévisualiser puis publier depuis l'admin |

## À faire dans l'admin (non faisable par API ou volontairement laissé au marchand)

1. **Devise de la boutique** : Settings → General → Store currency = **AUD**. La boutique est encore en EUR ; les montants saisis (59, 19, 22, 12, 89, 9,95) sont des montants AUD et ne sont corrects qu'après ce changement. À faire avant toute commande.
2. **Politiques légales** : l'API refuse `write_legal_policies`. Coller les textes de `06-post-purchase-and-policies.md` §3 dans Settings → Policies (Refund, Shipping, Contact, Terms).
3. **Publier le thème** « Horizon AU homepage draft » après prévisualisation, et y ajouter les médias (hero vidéo, photos produit).
4. **Images produits** : aucune image chargée (pas d'URL publique). Suivre la shot-list de la maquette.
5. **Champ de personnalisation** sur Name + Phone Patch (bloc Horizon « Product custom property », libellé « Dog's name and your mobile »).
6. **Nom de marque** : remplacer `[BRAND]`, `[city]`, `hello@[brand].com.au`, `ABN [number]` partout (produits, pages, thème, menu). Le vendor produit est `[BRAND]`.
7. **Localisation d'expédition** : la location « Shop location » est en France ; créer/déplacer la location en Australie pour que les délais et l'Australia Post soient cohérents.
8. **Paiements** : activer Shopify Payments AUD, PayPal, Afterpay.
9. **Avis** : installer une app d'avis (Judge.me/Loox) reliée à l'email J+30 ; aucune note factice.
10. **Bundle** : convertir « Beach & Track Bundle » en bundle réel (Shopify Bundles ou Moonbundle) pour la gestion de stock des composants.
11. Vérifier la checklist `04` avant de mettre en ligne les affirmations produit.

## Mise à jour du 10 sept. 2026 (soir) : catalogue réduit au harnais + laisse

Décision marchand : « je vais faire le harnais et la laisse ». Appliqué comme suit (réversible, rien n'est supprimé) :

- **Actifs** : Front-Clip No-Pull Harness (59) et **Matching Classic Lead** (19, renommée ; offerte automatiquement avec chaque harnais).
- **Passés en brouillon** : Shock-Absorbing Bungee Lead, Name + Phone Patch, Poo Bag Holder, Beach & Track Bundle. Réactivables en un clic si l'offre s'élargit.
- **Textes nettoyés** de toute mention laisse élastique / patch / bundle : description harnais (nouveau bloc « What's in the box »), description laisse, Fitting Guide, FAQ, The First 10 Walks.
- **Menu principal** : Harness · Lead · Size Guide · Fitting · FAQ · 60-Day Guarantee.
- **Collection** « Leads & Accessories » renommée « Leads » (handle inchangé).
- La homepage (thème brouillon) n'affiche que ces deux produits dans la grille « Walk ».

## Identité visuelle du thème (brouillon « Horizon AU homepage draft »)

Appliqué dans `config/settings_data.json`, `sections/header-group.json`, `sections/footer-group.json`, `templates/product.json` :

| Élément | Valeur |
|---|---|
| Palette | fond #F2F5F4 (sea-fog), texte #13262B (ink), accent #0E6F8C (ocean), bordures #C9D4D3 ; badge promo #B9773A (red dirt) |
| Typo | titres Archivo Bold, corps IBM Plex Sans 16 px, accent/annonces IBM Plex Mono ; H1 56, H2 40, H6 en capitales |
| Boutons | primaire fond ocean / texte blanc, rayon 6 ; secondaire contour ocean |
| Sélecteur de variantes | boutons rayon 6, sélection fond ink ; swatches activés (les pastilles couleur s'afficheront une fois les valeurs « Colour » liées à la taxonomie couleur Shopify) |
| Bandeau d'annonce | fond ink, texte clair mono : « Free shipping Australia-wide · 60-Day Loose-Lead Guarantee · Matching lead included » |
| En-tête | recherche, sélecteur pays et langue masqués (AU uniquement), menu sticky |
| Pied de page | capture email « The First 10 Walks, free », réseaux sociaux vides (à remplir), « Powered by Shopify » retiré |
| Page produit | titre en H2, ligne de promesse ocean sous le prix, aide à la taille sous le sélecteur, bloc « Shipping, returns and guarantee » |

Produits (photos, mesures réelles, coloris définitifs) : laissés au marchand pour la fin.

## Thème « beauty-16-5-1-2 » (Lumin, base Dawn) : portage complet (10 sept. 2026, soir)

Le marchand a installé ce thème (non publié, `OnlineStoreTheme/198428983680`). Fichiers réécrits par API :

| Fichier | Contenu |
|---|---|
| `templates/index.json` | 12 sections : hero (image-banner, scheme sombre), ligne de promesse, bandeau confiance (trust-badges ×4), « If this sounds like your walks », mécanisme (image-with-text), « Built for how Australians walk » (multicolumn ×4), produit vedette harnais (featured-product : titre, prix, promesse, sélecteur avec lien guide des tailles, note taille, achat, description), does/doesn't, comparatif collier / dorsal / licol / frontal (multicolumn), garantie 60 jours (fond ink), FAQ accordéon ×6, collection Walk |
| `templates/product.json` | Tous les blocs de démo à fausse urgence **désactivés** (« 4.8 From 136 Reviews », « 758 people purchased », « Hurry up! Only X in stock », compte à rebours « Order in », paliers « Bundle & Save », cross-sells « Save up to 50% », badges « 24/7 Support / Free Shipping Globally »). Ajoutés : ligne de promesse sous le prix, 4 pictos honnêtes, note taille sous le sélecteur, onglets Sizing / Shipping & returns / What it does and what it doesn't. Sections de démo (hero Lumin, sliders, méga-menus, faux avis, « Offer End Soon ») supprimées ; comparatif 2 colonnes « Front-clip vs Back-clip », FAQ, garantie, produits liés conservés |
| `sections/header-group.json` | Bandeau : « Free shipping Australia-wide · 60-Day Loose-Lead Guarantee · Matching lead included » (fond ink, texte clair), bandeau défilant « Theme Created by Lumintheme » désactivé, menu main-menu, sélecteurs pays/langue coupés, en-tête non transparent |
| `sections/footer-group.json` | Newsletter « The First 10 Walks, free », 4 tuiles confiance, bandeau Lumin supprimé, menus Help (footer) et Shop, bloc « Need a hand? », crédit Lumin et « Powered by Shopify » retirés |
| `config/settings_data.json` | Schémas de couleurs : background-1 #F2F5F4/#13262B/bouton #0E6F8C, background-2 sombre, accent-1 blanc, accent-2 #C9D4D3 ; titres Archivo, corps IBM Plex Sans ; rayons 6 ; barre de progression panier (seuils USD) coupée, message « Limited-Time Offer » et minuteur panier retirés ; bloc marque « [BRAND] » |

Reste à faire dans l'éditeur de thème : images (hero, image-with-text, produit), logo, activer le thème, vérifier les couleurs de la barre sticky « add to cart » (encore blanc/noir) et le type de menu desktop (« mega »).

## Emplacements médias sur le thème beauty (4 vidéos, 3 photos)

Aucun fichier n'est encore dans Shopify (Contenu → Fichiers vide). Les emplacements sont créés et vides ; il suffit de choisir le fichier dans l'éditeur de thème.

| Média | Emplacement | Où le choisir |
|---|---|---|
| Vidéo 1 (chien qui pivote vers le maître) | Hero homepage, section « Video Text Overlay » | Éditeur → page d'accueil → 1re section → Video |
| Vidéo 2 (mécanisme clip avant vs arrière) | Section « Video with Text » « Why the clip position changes everything » | Éditeur → page d'accueil → 5e section → Video |
| Vidéo 3 (fitting, mains et curseurs) | Section « Video » « Fitting it in two minutes » sur la page produit, et section « Watch the fit first » sur la page Fitting Guide (nouveau modèle `page.fitting-guide`, assigné) | Éditeur → Produits → Défaut ; Éditeur → Pages → Fitting Guide |
| Vidéo 4 (plage, piste) | Section « Video » « Beach, sand, bush track… » après « Built for how Australians walk » | Éditeur → page d'accueil → 7e section → Video |
| Photo 1 (harnais porté, côté) | 1re image du produit harnais | Produits → Front-Clip No-Pull Harness → Médias |
| Photo 2 (détail anneau D, poignée) | 2e image du produit harnais | idem |
| Photo 3 (flat-lay harnais + laisse) | Image du produit Matching Classic Lead, et 3e image du harnais | Produits → Matching Classic Lead → Médias |

Ordre conseillé des médias produit : photo 1, vidéo 1, photo 2, vidéo 3, vidéo 4, photo 3. Les vignettes vidéo se règlent dans Médias → « Modifier la miniature ».

## Bilan CRO : tableau `01` §9 → boutique (10 sept. 2026, soir)

| Ligne CRO | Statut sur le thème beauty |
|---|---|
| Hero vidéo + promesse liberté | ✅ emplacement vidéo créé, titre et CTA en place (vidéo à choisir) |
| Angle vélos/joggeurs, chaleur, plage | ✅ sections « If this sounds like your walks », « Built for how Australians walk », vidéo plage/piste |
| Prix A$59 sans faux barré | ✅ (devise AUD à activer dans Settings) |
| Promotion : aucune fausse urgence | ✅ compte à rebours, « Offer end tonight », barre de progression USD, faux avis et « Only X left » désactivés |
| Cadeau identique partout | ✅ remise auto BXGY + ligne de promesse hero/PDP + message panier « Your matching Classic Lead is added free » |
| Personnalisation patch | ⏸ produit en brouillon (décision : harnais + laisse) |
| Preuve sociale réelle | ⏳ aucune app d'avis installée (non faisable par API) : installer Judge.me ou Loox, relier à l'email J+30 |
| Mécanisme + démo multi-morphologies | ✅ vidéo mécanisme + comparatif 2 colonnes ; ⏳ démos petit/large/profond nécessitent des vidéos supplémentaires |
| Guide des tailles cm + races AU | ✅ page + lien depuis le sélecteur (icône règle) + note sous le sélecteur |
| Objections (desserrage, rotation, mastication, poitrail, dressage) | ✅ FAQ homepage + FAQ PDP + onglets Sizing / Shipping / What it does |
| Garantie 60 j retour prépayé | ✅ page, section sombre, onglet PDP ; ⏳ texte à coller dans Settings → Policies |
| Livraison gratuite AU + Express | ✅ tarifs + textes |
| Produit complémentaire | ✅ laisse de rechange en upsell panier (« Add a spare »), collection leads |
| Panier | ✅ drawer : message cadeau, ligne « Included free », « You save », upsell laisse, icônes paiement ; pas de minuteur |
| Mobile | ✅ barre sticky « add to cart » aux couleurs de marque, titre + prix visibles, vidéos verticales à charger |
| Swatches couleur | ✅ pastilles Charcoal / Ocean / Red Dirt / Gum définies dans les réglages du thème |

## Correction directe du thème brouillon (10 sept. 2026, nuit) — brief « Corrige maintenant la boutique »

Thème modifié : **beauty-16-5-1-2** (`gid://shopify/OnlineStoreTheme/198428983680`, non publié). Rien n'a été touché sur le thème actif Horizon.

### Fait via l'API

| Point du brief | Action | Fichier / objet |
|---|---|---|
| 1. Header | Menu principal = Home · Harness · FAQ · Our Story (menu `main-menu` 332986581376). Lead, Size Guide, Fitting, Guarantee retirés du header. Icônes Search et Account masquées (CSS `custom_css` de la section header + `disable_search` / `predictive_search_enabled:false`). Mobile : logo à gauche (`mobile_logo_position:left`), hamburger, panier à droite, header compact (padding 4/4). Menu desktop en dropdown (plus de méga-menu). Barre d'annonce : « Free shipping Australia-wide · 60-Day Loose-Lead Guarantee · Matching lead included ». | `sections/header-group.json`, `config/settings_data.json` |
| 2. Langue | Tout en anglais australien : « [BRAND] » retiré du bloc marque (« Made for Australian walks »), des pages et de la fiche produit ; vendor « [BRAND] » supprimé sur les deux produits et le vendor masqué partout (`show_vendor*`:false) car Shopify remplace un vendor vide par le nom de boutique « My Store 10 ». Seuils de barre de progression panier passés en AUD (barre désactivée de toute façon). | pages, produits, `config/settings_data.json` |
| 3. Illustrations génériques | Aucune section avec image/vidéo vide (donc plus de placeholder Dawn). Séparateur « vagues » du footer désactivé. Les sections média seront réintroduites quand les vraies photos existeront (voir Bloqué). | `templates/index.json`, `sections/footer-group.json` |
| 6. Hero | Texte exact du brief : « Walks you actually look forward to. » / sous-titre / bouton « SHOP THE HARNESS — A$59 » / micro-ligne « Matching lead included · Free Australia-wide shipping · 60-day guarantee ». Texte à gauche sur desktop. Fond sombre en attendant la vidéo. | `templates/index.json` › `hero` |
| 9. Structure | Ordre : hero → bandeau confiance → douleur → mécanisme → 3 cartes lifestyle → produit vedette → « What it does — and what it doesn't » → taille (« Big, strong dogs. Small dogs too. ») → comparatif → garantie → FAQ → « Enjoy the walk again. » | `templates/index.json` |
| 10. Lifestyle | 3 cartes uniquement : Early mornings and hot evenings / Beach, sand and salt / Bush tracks and coastal walks. | `lifestyle` |
| 11. Does / doesn't | Titre et intro exacts, deux colonnes avec les 4 + 3 puces du brief ; « Read the first 10 walks » en simple lien secondaire vers `/pages/first-10-walks`. | `does_intro`, `does_cols` |
| 12. Produit vedette | Section `featured-product` reliée au vrai harnais (`front-clip-no-pull-harness`) : 5 tailles × 4 couleurs, A$59, stock réel (25/variante, 500 au total), sélecteur avec lien Size Guide, note de taille, bouton Add to cart (produit et collections publiés sur le canal Online Store, donc plus de « Sold out »). Pas de photo générée du produit. | `featured_harness` |
| 13. Footer | SHOP (Harness) · HELP (FAQ, Size Guide, Fitting Guide, Track My Order, Contact) · ABOUT (Our Story) · LEGAL (Shipping, Returns, Privacy Policy, Terms of Service, Legal Notice). Pages Track My Order, Terms of Service, Legal Notice créées. Mention « Powered by Shopify » masquée. | `sections/footer-group.json`, menus footer-shop/help/about/legal |
| 15. PDP | Sticky add-to-cart actif (couleurs de marque, vendor masqué) ; section vidéo vide retirée ; blocs d'urgence de démo toujours désactivés. | `templates/product.json` |

### Bloqué (à faire par vous avant que je puisse continuer)

1. **Aucune vraie photo du harnais n'existe dans Shopify** (Contenu → Fichiers vide, produit sans média). Le brief impose d'utiliser les vraies images du produit comme références Higgsfield et de préserver exactement le design ; sans elles, la vidéo hero et les 9 photos ne peuvent pas être générées sans inventer un harnais. Déposez 3 à 6 photos nettes du vrai produit (face, profil, dos, détail clip avant, détail boucles) dans Contenu → Fichiers ou sur la fiche produit, puis je lance : vidéo hero 6–8 s (16:9 + recadrage 9:16, poster), les 9 photos du brief, upload dans Files, et je bascule les sections en `video-with-text-overlay`, `image-with-text`, `multicolumn` avec images, `image-banner`.
2. **Nom de boutique** « My Store 10 » : Paramètres → Détails de la boutique (non modifiable par API).
3. **Politiques légales** : Paramètres → Politiques (textes prêts dans `06-post-purchase-and-policies.md`) ; l'API refuse `write_legal_policies`.
4. **Publier le thème** beauty-16-5-1-2 quand les médias seront en place (l'API bloque la publication).
5. **Aperçu** : le proxy de cette session bloque `crms7m-ss.myshopify.com`, donc le rendu 390 px n'a pas pu être vérifié ici. À contrôler dans l'éditeur de thème (Aperçu mobile) : header compact, hero ≤ 3 lignes, cartes lifestyle en colonne, sticky ATC.

## Médias générés avec Higgsfield (10 sept. 2026, nuit) — sur demande « génère-les »

Aucune photo réelle n'existait. Sur instruction de l'utilisateur, le harnais de référence a été **créé** en packshot studio (Charcoal, 1:1), puis cette image a servi de référence unique à toutes les autres générations pour garder le même design (plastron en Y rembourré, anneau D acier au centre du poitrail, anneau D + poignée + barrette bleu Ocean sur le dos, boucles noires mates, liseré réfléchissant, aucun logo). Modèle image : Nano Banana Pro 2K ; vidéo : Seedance 2.5, 8 s, 1080p, sans audio ; recadrage 9:16 fait au ffmpeg. **Contrôle visuel non effectué** (le proxy de la session bloque les URLs de rendu) : vérifier chaque image dans Contenu → Fichiers et régénérer celles qui présentent un défaut (pattes, laisse, boucles).

| Fichier Shopify (Contenu → Fichiers) | Usage | Ratio |
|---|---|---|
| harness-charcoal-front / -profile / -back, harness-front-clip-macro, harness-buckle-macro, harness-ocean-front, harness-red-dirt-front, harness-gum-front, harness-and-lead-flatlay | Médias produit harnais (11 médias, l'image de mécanisme et la photo « fitting » incluses) ; flat-lay + macro clip sur la laisse | 1:1 |
| au-problem-pulling.png | Section « If this sounds like your walks » (image-with-text) | 4:5 |
| au-mechanism-front-clip.png | « Why the clip position changes everything » | 1:1 |
| au-early-morning.png, au-beach-rinse.png, au-bush-track.png | 3 cartes « Built for how Australians walk » | 4:5, 4:5, 3:2 |
| au-big-and-small-dogs.png | « Big, strong dogs. Small dogs too. » | 16:9 |
| au-product-macro-on-dog.png | Intro « What it does — and what it doesn't » | 1:1 |
| au-fitting-hands.png | « Two fingers under every strap » | 4:3 |
| au-final-cta-beach.png | Bannière finale « Enjoy the walk again. » | 16:9 |
| au-hero-poster.png | Image de départ de la vidéo hero / poster | 16:9 |
| au-hero-sunrise.mp4 | Hero vidéo (section « Video Text Overlay », autoplay muet en boucle, lazy) | 16:9 1920×1080 |
| au-hero-sunrise-9x16.mp4 | Recadrage mobile / pubs | 9:16 1080×1920 |

Homepage réécrite (`templates/index.json`) : hero vidéo avec texte à gauche + dégradé uniquement derrière le texte, micro-ligne sous le hero, puis alternance texte/photo sur toutes les sections. Coût Higgsfield : 19 images + 1 vidéo.
