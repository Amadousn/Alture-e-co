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
