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
