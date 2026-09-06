---
brand: Raselio
source: Shopify Admin (store info, product catalog, online-store pages, shop policies, collections)
pulled_on: 2026-09-06
tool: mcp__Shopify__get-shop-info, mcp__Shopify__search_products, mcp__Shopify__get-product, mcp__Shopify__graphql_query, mcp__Shopify__search_collections
claim_status: verified   # direct observation from the tool
window: live state as of 2026-09-06
notes: Store has exactly 1 product and 1 collection (empty). 4 online-store pages returned; "Contactez-nous" body is empty in the API. The shopPolicies query validated and returned 6 policies; several still carry the former "Cutlab" brand name and a "cutlabsupport@gmail.com" address (recorded verbatim, not corrected). Product totalInventory is 0 and variant inventoryQuantity is -11 (oversold / inventory not tracked).
---

# 1. Shop info (`get-shop-info`)

| Field | Value |
|---|---|
| name | Raselio |
| domain | www.raselio.com |
| email | raseliosupport@gmail.com |
| planName | Basic |
| currencyCode | EUR |
| timezone | CEST |
| country | France |
| myshopify domain (from analytics responses) | 8piiys-jj.myshopify.com |

# 2. Product catalog (`search_products`, first 50, no query)

Result: 1 product, `pageInfo.hasNextPage = false`.

| Field | Value |
|---|---|
| id | gid://shopify/Product/15882947854667 |
| title | Tondeuse Intime Homme Raselio™ |
| handle | raselio-tondeuse-parties-intimes |
| status | ACTIVE |
| createdAt | 2026-07-24T00:04:10Z |
| updatedAt | 2026-09-06T03:23:11Z |
| productType | Bundle |
| vendor | Raselio |
| tags | bundle, essentials, grooming |
| totalInventory | 0 |
| description (truncated by tool) | La tondeuse intime homme pensée pour les testicules, les parties intimes et les zones sensibles. Pour raser là où la peau est la plus fragile avec ... |
| featuredMedia image url | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_21_aout_2026_20_25_27.png?v=1787336796 |
| priceRangeV2.minVariantPrice | 34.99 EUR |
| variantsCount | 1 |
| variant id | gid://shopify/ProductVariant/57933901594955 |
| variant title | Default Title |
| variant sku | Electric intimate hair removal device |
| variant price | 34.99 |
| variant inventoryQuantity | -11 |

# 3. Product detail (`get-product` gid://shopify/Product/15882947854667)

| Field | Value |
|---|---|
| title | Tondeuse Intime Homme Raselio™ |
| vendor | Raselio |
| status | ACTIVE |
| productType | Bundle |
| tags | bundle, essentials, grooming |
| totalInventory | 0 |
| totalVariants | 1 |
| currencyCode | EUR |
| featuredImageUrl | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_21_aout_2026_20_25_27.png?v=1787336796 |

## 3.1 descriptionHtml (verbatim)

```html
<p><strong>La tondeuse intime homme pensée pour les testicules, les parties intimes et les zones sensibles.</strong> Pour raser là où la peau est la plus fragile avec plus de contrôle, plus de confort et beaucoup moins d'appréhension qu'avec une tondeuse classique.</p>
<p>✓ Tête arrondie et lames céramique : conçues pour limiter les accrocs et les irritations, même sur peau sensible<br>✓ Éclairage LED intégré : vous voyez ce que vous rasez, jusque dans les plis<br>✓ 100% étanche : utilisable sous la douche et rincée en quelques secondes<br>✓ Sabot réglable 3 hauteurs pour un rasage sur-mesure<br>✓ Sans fil, rechargeable sur son socle</p>
<p><strong>Garantie 2 ans</strong> · Livraison Colissimo offerte · Satisfait ou remboursé 30 jours.</p>
```

## 3.2 Variants

| id | title | sku | price | inventoryQuantity |
|---|---|---|---|---|
| gid://shopify/ProductVariant/57933901594955 | Default Title | Electric intimate hair removal device | 34.99 | -11 |

## 3.3 Images (11, in API order) with alt text

| # | mediaId | url | altText |
|---|---|---|---|
| 1 | gid://shopify/MediaImage/73590682321227 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_21_aout_2026_20_25_27.png?v=1787336796 | Tondeuse intime homme Raselio sur son socle de charge, pensee pour les parties intimes |
| 2 | gid://shopify/MediaImage/73903871164747 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_6_sept._2026_05_21_38.png?v=1788664954 | (empty) |
| 3 | gid://shopify/MediaImage/73848827937099 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_f4deade0-e0f9-43a8-96e5-d71ac5961a3e.png?v=1788428566 | Macro de la tete arrondie et des lames ceramique Raselio, concues pour les zones sensibles |
| 4 | gid://shopify/MediaImage/73903808119115 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_6_sept._2026_05_14_28.png?v=1788664568 | (empty) |
| 5 | gid://shopify/MediaImage/73848827969867 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_093717_894785bc-41d1-4a37-85c9-d7e313ef13c4.png?v=1788428566 | Eclairage LED integre de la tondeuse Raselio eclairant la zone intime, plus d'angles morts |
| 6 | gid://shopify/MediaImage/73848828002635 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_f292f88f-17f4-4df3-a9f1-a8d2da3dab6a.png?v=1788428567 | Comparaison tondeuse a barbe et tondeuse intime Raselio : lame peau fine, LED, lame dediee |
| 7 | gid://shopify/MediaImage/73848828035403 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_d2071e4d-aa15-4043-912a-e03acb88314f.png?v=1788428567 | Tondeuse Raselio rincee sous l'eau : 100% etanche, utilisable sous la douche |
| 8 | gid://shopify/MediaImage/73848828068171 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_093052_4336aa0e-4a74-4183-9401-edf861477703.png?v=1788428566 | Comment utiliser la tondeuse Raselio en 3 etapes : regler la hauteur, passer sans appuyer, rincer |
| 9 | gid://shopify/MediaImage/73848828100939 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_30c25428-d903-4a1d-a4cc-afe8649bfcbc.png?v=1788428567 | Contenu de la boite Raselio : tondeuse, sabot guide de coupe, socle de charge, cable USB, brosse, huile |
| 10 | gid://shopify/MediaImage/73848828133707 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_093716_c2285a30-7248-44a9-95c1-9e58749a966c.png?v=1788428567 | Garantie 2 ans, satisfait ou rembourse 30 jours et colis neutre et discret avec Raselio |
| 11 | gid://shopify/MediaImage/73903808086347 | https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_6_sept._2026_05_14_39.png?v=1788664569 | (empty) |

# 4. Online-store pages (`graphql_query` `{ pages(first:20){ nodes{ title handle body } } }`)

4 pages returned.

| title | handle | body length |
|---|---|---|
| Contactez-nous | contact | empty string |
| Notre Histoire | notre-histoire | 4 paragraphs |
| 7 raisons pour lesquelles votre tondeuse à barbe n'a rien à faire sous la ceinture | pourquoi-pas-votre-tondeuse-a-barbe | advertorial, 7 sections + offer box |
| 7 raisons de choisir Raselio | 7-raisons | full landing page (inline CSS + HTML) |

## 4.1 Page "Contactez-nous" (handle: contact)

Body: `""` (empty).

## 4.2 Page "Notre Histoire" (handle: notre-histoire) — body verbatim

```html
<p>RASELIO est née d'un constat simple : raser ses parties intimes et ses zones sensibles reste, pour beaucoup d'hommes, un moment inconfortable et un peu risqué. Le maillot, le pubis, l'aine, l'entrejambe… ce sont les endroits les plus délicats à entretenir, et pourtant les moins bien servis par les tondeuses classiques.</p>

<p>Nous avons donc concentré RASELIO sur une seule mission : rendre l'entretien des zones intimes et du corps plus précis, plus confortable et plus rassurant. Sa lame est pensée pour glisser sur les zones sensibles avec douceur, aider à limiter les irritations et offrir une coupe nette, sans que le geste soit une contrainte. Le boîtier est 100% étanche, pour une utilisation sous la douche et un nettoyage en quelques secondes.</p>

<p>Notre approche est volontairement simple : une seule tondeuse, pensée dans le détail, plutôt qu'une multitude d'accessoires. RASELIO s'occupe des parties intimes en priorité, mais accompagne aussi le torse, le ventre et le reste du corps.</p>

<p>Chaque commande est un achat unique, sans abonnement caché ni engagement. Si RASELIO ne vous convient pas, vous disposez de 30 jours pour nous la retourner et être remboursé. C'est notre façon de vous laisser l'essayer en toute confiance.</p>
```

## 4.3 Page "7 raisons pour lesquelles votre tondeuse à barbe n'a rien à faire sous la ceinture" (handle: pourquoi-pas-votre-tondeuse-a-barbe) — body verbatim

```html
<div style="max-width:720px;margin:0 auto;">

<p style="text-align:center;"><span style="display:inline-block;background:#c15d2f;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:2px;padding:6px 14px;border-radius:4px;">ENTRETIEN INTIME MASCULIN</span></p>

<p style="text-align:center;margin:18px 0 6px 0;"><strong>Par Julien M.</strong><br><span style="color:#6b7280;font-size:14px;">Mis à jour le 31 août 2026</span></p>

<p style="text-align:center;font-size:18px;"><strong>« À lire avant de repasser votre tondeuse à barbe sous la ceinture. Surtout si vous connaissez la sensation de la repousse qui pique... et le moment gênant qui va avec. »</strong></p>

<h2 style="margin-top:40px;">1. Vos couilles sont une zone sensible. Votre tondeuse à barbe l'ignore.</h2>
<p>Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées.</p>
<p>C'est normal. Cette lame a été conçue pour votre mâchoire : une surface plane, une peau épaisse, une zone que vous voyez parfaitement dans le miroir. Sous la ceinture, c'est l'inverse. La peau la plus fine du corps, une surface irrégulière qui bouge, et des angles que vous ne voyez qu'à moitié. Utiliser le même outil pour les deux, c'est découper au cutter ce qui demande un scalpel.</p>
<p><strong>Le pire ? Vous le savez déjà. Vous le sentez à chaque passage. Mais jusqu'ici, vous n'aviez pas d'alternative.</strong></p>
<p><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_012123_0b741a91-d229-41f7-a635-f32243bc7008.png?v=1788053053" alt="Deux œufs sur velours et la tondeuse Raselio — zone sensible, outil adapté" style="width:100%;border-radius:12px;"></p>

<h2 style="margin-top:40px;">2. Cette appréhension avant chaque passage ? Elle n'est pas obligatoire.</h2>
<p>Personne n'en parle, mais tout le monde la connaît : cette micro-hésitation avant de poser la lame. Ce réflexe de contracter tout le corps. Cette séance qui ressemble plus à du déminage qu'à de l'entretien.</p>
<p>La tête arrondie Raselio™ a été pensée pour cette zone, et uniquement pour elle. Elle épouse les reliefs au lieu de les attaquer, et vous gardez le contrôle du début à la fin.</p>
<p><strong>Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve.</strong></p>
<p style="text-align:center;"><a href="https://www.raselio.com/products/raselio-tondeuse-parties-intimes" style="display:inline-block;background:#c15d2f;color:#ffffff;font-weight:700;padding:16px 34px;border-radius:8px;text-decoration:none;">JE VEUX ÊTRE SEREIN</a></p>
<p><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-apprehension-rect.png?v=1788140739" alt="La grimace derrière le comptoir : chaque passage se fait les dents serrées" style="width:100%;border-radius:12px;"></p>

<h2 style="margin-top:40px;">3. Les boutons rouges qui apparaissent 3 jours après. Toujours au mauvais moment.</h2>
<p>Vous faites l'effort de vous entretenir. Et 72 heures plus tard, la zone est couverte de petits boutons rouges et de poils incarnés. Précisément la semaine où vous auriez préféré être présentable.</p>
<p>La cause, c'est presque toujours la lame. Une lame en acier qui chauffe tire le poil avant de le couper. Le poil casse mal, repousse de travers, et s'incarne. Les lames céramique Raselio™ ne chauffent pas et coupent le poil net, sans le tirer. Une coupe nette, c'est une repousse propre.</p>
<p><strong>Vous mettez toutes les chances de votre côté pour que la zone reste comme vous la voulez : impeccable.</strong></p>
<p><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_ad64ddf6-d384-4670-9395-3881595edb1a.png?v=1788051647" alt="Macro de la tête arrondie et des lames céramique Raselio" style="width:100%;border-radius:12px;"></p>

<h2 style="margin-top:40px;">4. Vous travaillez à l'aveugle. Au-dessus d'une lame.</h2>
<p>Soyons honnêtes : cette zone, vous ne la voyez jamais entièrement. Vous devinez, vous passez la tondeuse au jugé, et vous vérifiez du bout des doigts en espérant que c'est régulier.</p>
<p>Deviner, au-dessus d'une lame, sur la peau la plus fine du corps. Écrit noir sur blanc, ça paraît absurde. Ça l'est. La LED intégrée à la tête éclaire exactement ce que vous coupez, au moment où vous le coupez.</p>
<p><strong>Fini le jugé. Vous voyez, donc vous maîtrisez.</strong></p>
<p style="text-align:center;"><a href="https://www.raselio.com/products/raselio-tondeuse-parties-intimes" style="display:inline-block;background:#c15d2f;color:#ffffff;font-weight:700;padding:16px 34px;border-radius:8px;text-decoration:none;">VOIR LA TONDEUSE</a></p>
<p><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_6f1ce54d-9a78-4320-9f59-f75f72dc7c1c.png?v=1788051647" alt="Tondeuse intime Raselio MS-810, LED allumée" style="width:100%;border-radius:12px;"></p>

<h2 style="margin-top:40px;">5. La repousse qui pique, vous n'êtes pas le seul à la sentir.</h2>
<p>Le rasage à blanc, c'est le piège. Deux jours de peau lisse, puis une semaine de repousse dure qui gratte, qui pique, et qui se remarque. Y compris dans les moments où vous auriez préféré qu'on remarque autre chose.</p>
<p style="margin:24px 0 0 0;"><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-scene-avant-rect.png?v=1788140738" alt="Lui au bout du lit, elle sous la couette" style="width:100%;border-radius:12px;"></p>
<p style="text-align:center;color:#6b7280;font-size:14px;font-style:italic;margin-top:8px;">Tondeuse à barbe.</p>
<p>La vraie solution, ce n'est pas raser à ras. C'est tondre à la bonne longueur. Le sabot 3 hauteurs vous laisse choisir : net, court, ou naturel maîtrisé. Assez court pour être impeccable, assez long pour ne jamais piquer.</p>
<p><strong>C'est exactement la différence entre « je me suis rasé » et « je suis entretenu ». La seconde version est celle qui fait bonne impression de près.</strong></p>

<h2 style="margin-top:40px;">6. La vraie raison pour laquelle vous repoussez ça à demain.</h2>
<p>Ce n'est pas la flemme. C'est la logistique : s'installer dans la salle de bain, trouver le bon moment, et finir par retrouver des poils sur le lavabo. Que quelqu'un d'autre risque de voir avant vous.</p>
<p>Raselio™ est 100 % étanche. La routine entière se fait sous la douche : 5 minutes, tout part avec l'eau, aucune trace de votre passage. Avec environ 90 minutes d'autonomie, la charge ne sera jamais votre excuse.</p>
<p><strong>Quand c'est aussi simple, vous le faites vraiment. Et régulièrement.</strong></p>
<p style="text-align:center;"><a href="https://www.raselio.com/products/raselio-tondeuse-parties-intimes" style="display:inline-block;background:#c15d2f;color:#ffffff;font-weight:700;padding:16px 34px;border-radius:8px;text-decoration:none;">JE PASSE À L'OUTIL ADAPTÉ</a></p>
<p><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_c0b4fbec-dedc-4555-aa17-7ca5202f844f.png?v=1788051647" alt="Raselio sous l'eau dans une douche premium — 100% étanche" style="width:100%;border-radius:12px;"></p>

<h2 style="margin-top:40px;">7. La confiance en soi ne devrait pas être un pari à 75 €.</h2>
<p>Sabot, socle de charge, câble USB, huile d'entretien, brosse de nettoyage : tout est dans la boîte. Vous n'avez rien à ajouter, à part 5 minutes sous la douche.</p>
<p>Et si ce n'est pas pour vous ? 30 jours pour changer d'avis, remboursé. La tondeuse, elle, est garantie 2 ans. Le colis arrive dans un emballage neutre et discret : personne n'a besoin de savoir, tout le monde finira par remarquer.</p>
<p><strong>Plus de 17 000 personnes ont déjà fait le changement. La seule chose qu'elles regrettent, c'est de ne pas l'avoir fait plus tôt.</strong></p>
<p style="text-align:center;"><a href="https://www.raselio.com/products/raselio-tondeuse-parties-intimes" style="display:inline-block;background:#c15d2f;color:#ffffff;font-weight:700;padding:16px 34px;border-radius:8px;text-decoration:none;">J'ESSAIE 30 JOURS SANS RISQUE</a></p>
<p><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_52370bd7-cfca-4262-b4ad-a8eaffe96ee0.png?v=1788052021" alt="Raselio MS-810 avec socle, sabot, câble USB, huile et brosse" style="width:100%;border-radius:12px;"></p>

<p style="margin:40px 0 0 0;"><img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-scene-apres-rect.png?v=1788140739" alt="Le couple réconcilié, câlin sur le lit" style="width:100%;border-radius:12px;"></p>
<p style="text-align:center;color:#6b7280;font-size:14px;font-style:italic;margin-top:8px;">Raselio.</p>

<div style="background:#f7f3ec;border:2px solid #c15d2f;border-radius:16px;padding:28px 22px;margin-top:24px;text-align:center;">
<h2 style="margin-top:0;">OFFRE EN COURS</h2>
<p><em>La confiance, ça se prépare avant le moment où on en a besoin.</em></p>
<p>Tondeuse Intime Homme Raselio™ : <strong>34,99 €</strong> <span style="text-decoration:line-through;color:#6b7280;">75,00 €</span></p>
<p>Livrée complète avec tous ses accessoires.</p>
<p><a href="https://www.raselio.com/products/raselio-tondeuse-parties-intimes" style="display:inline-block;background:#c15d2f;color:#ffffff;font-weight:700;padding:18px 40px;border-radius:8px;text-decoration:none;font-size:18px;">PROFITER DE L'OFFRE</a></p>
<p style="margin-bottom:0;"><strong>Garantie 2 ans</strong> · <strong>Satisfait ou remboursé 30 jours</strong> · Emballage neutre et discret.</p>
</div>

</div>
```

## 4.4 Page "7 raisons de choisir Raselio" (handle: 7-raisons) — body verbatim

```html
<style>@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap");</style>
<style>
  /* ===== Raselio — landing "7 raisons" (structure calquée sur apui.fr/pages/5-choses-a-savoir) ===== */
  /* --- Intégration thème Raselio : landing sans distraction --- */
  .shopify-section-group-header-group,
  .shopify-section-group-footer-group { display: none !important; }
  .main-page-title { display: none !important; }
  .page-width, .page-width--narrow { max-width: none !important; padding: 0 !important; }
  /* Suppression des espaces parasites du thème autour de la landing */
  #MainContent, main, .main-content, .content-for-layout,
  .shopify-section--page, .section-template--page, .template-page main {
    padding-top: 0 !important; padding-bottom: 0 !important;
    margin-top: 0 !important; margin-bottom: 0 !important;
  }
  #MainContent > .shopify-section:empty, main > .shopify-section:empty { display: none !important; }

  .rz, .rz * { box-sizing: border-box; margin: 0; padding: 0; }
  .rz {
    --cream: #F7F3EC;
    --cream-2: #FFFFFF;
    --ink: #211C17;
    --ink-soft: #5A5048;
    --terra: #C15D2F;
    --terra-dark: #A84D24;
    --black: #0F0C0A;
    --gold: #D9A441;
    --line: rgba(33,28,23,.12);
    --display: "Fraunces", Georgia, "Times New Roman", serif;
    --body: "Inter", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    --page: 1269px;
    --gutter: 40px;
    font-family: var(--body);
    color: var(--ink);
    background: var(--cream);
    font-size: 16px;
    line-height: 1.45;
    -webkit-font-smoothing: antialiased;
  }
  .rz a { color: inherit; text-decoration: none; }
  .rz img { display: block; max-width: 100%; }
  .rz .pw { width: 100%; max-width: var(--page); margin: 0 auto; padding-left: var(--gutter); padding-right: var(--gutter); }
  .rz .icon { width: 1em; height: 1em; display: inline-block; vertical-align: middle; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
  .rz .icon--fill { fill: currentColor; stroke: none; }

  /* ---- Bouton ---- */
  .rz .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    height: 50px; padding: 0 28px; border-radius: 50px;
    background: var(--terra); color: #fff;
    font-family: var(--body); font-size: 14px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
    transition: background .2s ease, transform .2s ease;
    white-space: nowrap;
  }
  .rz .btn:hover { background: var(--terra-dark); transform: translateY(-1px); }
  .rz .btn:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }
  .rz .btn .icon { font-size: 18px; }

  /* ---- 0. Barre logo ---- */
  .rz .logo-bar { background: var(--cream-2); height: 52px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--line); }
  .rz .wordmark { font-family: var(--body); font-weight: 600; font-size: 15px; letter-spacing: .3em; color: var(--terra); padding-left: .38em; }

  /* ---- 1. Hero ---- */
  .rz .hero { position: relative; height: 450px; background: var(--black); color: #fff; overflow: hidden; }
  .rz .hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 78% 40%; }
  .rz .hero__filter { position: absolute; inset: 0; display: block; background: linear-gradient(90deg, #0F0C0A 0%, #0F0C0A 34%, rgba(15,12,10,.72) 52%, rgba(15,12,10,.18) 78%, rgba(15,12,10,.05) 100%); }
  .rz .hero__content { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 18px; max-width: 694px; }
  .rz .rating { display: flex; align-items: center; gap: 8px; font-size: 14px; }
  .rz .stars { display: inline-flex; gap: 2px; color: var(--gold); font-size: 16px; }
  .rz .rating__count { opacity: .8; }
  .rz .hero__title { font-family: var(--display); font-weight: 500; font-size: 48px; line-height: 1.12; letter-spacing: -.01em; color: #fff; text-wrap: balance; }
  .rz .hero__title em { font-style: italic; color: #E8B08A; }
  .rz .hero__sub { font-size: 22px; line-height: 1.35; font-weight: 400; max-width: 600px; opacity: .92; text-wrap: pretty; }

  /* ---- 2. Barre de confiance ---- */
  .rz .trust { background: #000; color: #fff; height: 85px; }
  .rz .trust .pw { height: 100%; display: flex; align-items: center; }
  .rz .trust__item { flex: 1 1 0; display: flex; align-items: center; justify-content: center; gap: 15px; font-weight: 600; font-size: 18px; letter-spacing: .04em; text-transform: uppercase; text-align: center; }
  .rz .trust__item .icon { font-size: 32px; color: var(--terra); stroke-width: 1.75; }

  /* ---- 3. Les 7 raisons ---- */
  .rz .reasons { background: var(--cream); padding: 38px 0; }
  .rz .reasons .pw { display: flex; flex-direction: column; gap: 38px; }
  .rz .reason { display: flex; align-items: center; gap: 50px; }
  .rz .reason__media { position: relative; flex: none; width: 427px; height: 427px; border-radius: 6px; overflow: hidden; background: #14110F; }
  .rz .reason__media img { width: 100%; height: 100%; object-fit: cover; }
  .rz .reason__media img.zoom-hand { transform: scale(2); transform-origin: 74% 44%; }
  .rz .reason--wide .reason__media { width: 600px; height: 400px; }
  .rz .reason__num { position: absolute; top: 0; left: 0; width: 72px; height: 72px; display: grid; place-items: center; background: var(--black); color: #fff; font-family: var(--display); font-size: 40px; font-weight: 500; line-height: 1; }
  .rz .reason__text { flex: 1 1 auto; display: flex; flex-direction: column; gap: 10px; max-width: 712px; }
  .rz .reason__title { font-family: var(--display); font-weight: 500; font-size: 44px; line-height: 1.12; letter-spacing: -.005em; color: var(--ink); text-transform: uppercase; text-wrap: balance; }
  .rz .reason__title em { font-style: italic; color: var(--terra); }
  .rz .reason__desc { font-size: 19px; line-height: 1.5; font-weight: 500; color: var(--ink-soft); max-width: 640px; text-wrap: pretty; }

  /* ---- 4. Marquee ---- */
  .rz .marquee { background: #000; color: #fff; height: 70px; overflow: hidden; display: flex; align-items: center; }
  .rz .marquee__track { display: flex; gap: 0; width: max-content; animation: rz-marquee 28s linear infinite; }
  .rz .marquee__item { display: inline-flex; align-items: center; gap: 12px; padding: 0 44px; font-size: 15px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; }
  .rz .marquee__item .icon { font-size: 20px; color: var(--terra); }
  @keyframes rz-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .rz .marquee__track { animation: none; } }

  /* ---- 5. Bloc produit ---- */
  .rz .product { background: var(--cream); padding: 38px 0; }
  .rz .product .pw { display: flex; align-items: center; gap: 30px; }
  .rz .product__media { flex: none; width: 580px; height: 580px; border-radius: 16px; overflow: hidden; }
  .rz .product__media img { width: 100%; height: 100%; object-fit: cover; }
  .rz .product__text { flex: 1 1 auto; display: flex; flex-direction: column; gap: 20px; max-width: 580px; }
  .rz .product__title { font-family: var(--display); font-weight: 500; font-size: 26px; line-height: 1.25; color: var(--ink); text-transform: uppercase; text-wrap: balance; }
  .rz .product__copy { display: flex; flex-direction: column; gap: 12px; font-size: 15px; line-height: 1.5; color: var(--ink-soft); }
  .rz .product__copy strong { color: var(--ink); font-weight: 600; }
  .rz .checks { display: flex; flex-direction: column; gap: 16px; }
  .rz .check { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 500; }
  .rz .check__ico { width: 25px; height: 25px; border-radius: 50%; background: var(--terra); color: #fff; display: grid; place-items: center; flex: none; }
  .rz .check__ico .icon { font-size: 14px; stroke-width: 3; }
  .rz .product__cta { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
  .rz .badge { display: inline-flex; align-items: center; gap: 10px; height: 40px; padding: 0 16px; border-radius: 8px; border: 1px solid var(--line); background: var(--cream-2); font-size: 14px; font-weight: 500; }

  /* ---- 6. FAQ ---- */
  .rz .faq { background: #000; color: #fff; padding: 38px 0; }
  .rz .faq .pw { max-width: 900px; display: flex; flex-direction: column; gap: 20px; }
  .rz .faq__title { font-family: var(--display); font-weight: 500; font-size: 32px; color: #fff; text-align: center; }
  .rz .acc { border-top: 1px solid rgba(255,255,255,.18); }
  .rz .acc:last-child { border-bottom: 1px solid rgba(255,255,255,.18); }
  .rz .acc summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 48px; padding: 12px 4px; font-size: 16px; font-weight: 500; }
  .rz .acc summary::-webkit-details-marker { display: none; }
  .rz .acc summary .icon { font-size: 22px; color: var(--terra); transition: transform .2s ease; }
  .rz .acc[open] summary .icon { transform: rotate(180deg); }
  .rz .acc summary:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; border-radius: 4px; }
  .rz .acc__body { padding: 0 4px 16px; font-size: 15px; line-height: 1.55; color: rgba(255,255,255,.82); max-width: 720px; }

  /* ---- 7. CTA ---- */
  .rz .cta { background: var(--cream-2); height: 86px; display: flex; align-items: center; justify-content: center; }

  /* ---- 8. Garanties ---- */
  .rz .cards { background: var(--cream); padding: 26px 0; }
  .rz .cards .pw { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .rz .card { background: var(--cream-2); border-radius: 12px; padding: 16px 16px 18px; display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center; border: 1px solid var(--line); }
  .rz .card .icon { font-size: 26px; color: var(--terra); stroke-width: 1.6; }
  .rz .card__title { font-size: 13px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; line-height: 1.3; }
  .rz .card__desc { font-size: 13px; color: var(--ink-soft); line-height: 1.4; max-width: 300px; }

  /* ---- 9. Footer ---- */
  .rz .foot { background: var(--terra); color: #fff; min-height: 112px; display: flex; align-items: center; }
  .rz .foot .pw { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; font-size: 14px; }
  .rz .foot a { text-decoration: underline; text-underline-offset: 3px; }
  .rz .foot .wordmark { color: #fff; font-size: 16px; }

  /* ---- Mobile ---- */
  @media (max-width: 900px) {
    .rz { --gutter: 20px; }
    .rz .hero { height: auto; min-height: 520px; }
    .rz .hero__filter { background: linear-gradient(180deg, rgba(15,12,10,.35) 0%, rgba(15,12,10,.85) 55%, #0F0C0A 100%); }
    .rz .hero__img { object-position: 60% 20%; }
    .rz .hero__content { height: auto; padding: 150px var(--gutter) 32px; justify-content: flex-end; }
    .rz .hero__title { font-size: 34px; }
    .rz .hero__sub { font-size: 18px; }
    .rz .trust { height: auto; padding: 18px 0; }
    .rz .trust .pw { height: auto; flex-direction: column; gap: 14px; }
    .rz .trust__item { flex: none; font-size: 15px; justify-content: flex-start; text-align: left; width: 100%; }
    .rz .trust__item br { display: none; }
    .rz .reason { flex-direction: column; align-items: stretch; gap: 18px; }
    .rz .reason__media { width: 100%; height: auto; aspect-ratio: 1 / 1; }
    .rz .reason--wide .reason__media { width: 100%; height: auto; aspect-ratio: 3 / 2; }
    .rz .reason__media img { height: 100%; }
    .rz .reason__media img.zoom-hand { transform: scale(1.6); transform-origin: 74% 44%; }
    .rz .reason__title { font-size: 30px; }
    .rz .reason__desc { font-size: 17px; }
    .rz .product .pw { flex-direction: column; gap: 28px; }
    .rz .product__media { width: 100%; height: auto; aspect-ratio: 1 / 1; }
    .rz .product__title { font-size: 22px; }
    .rz .cards .pw { grid-template-columns: 1fr; }
    .rz .card { padding: 18px 16px; }
    .rz .cards { padding: 22px 0; }
    .rz .cta { height: auto; padding: 24px 0; }
    .rz .foot { padding: 24px 0; }
  }
</style>

<div class="rz">

  <!-- 0. Barre logo -->
  <div class="logo-bar"><a class="wordmark" href="https://raselio.com/">RASELIO</a></div>

  <!-- 1. Hero -->
  <section class="hero">
    <img class="hero__img" src="https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_06_06_33.png?width=1600" alt="Homme utilisant la tondeuse intime Raselio dans une salle de bain">
    <div class="hero__filter"></div>
    <div class="pw hero__content">
      <div class="rating" aria-label="Note moyenne 4,7 sur 5, 1 734 avis">
        <span class="stars" aria-hidden="true">
          <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
          <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
          <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
          <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
          <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5v14.8l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3z" opacity=".35"></path></svg>
        </span>
        <span class="rating__note">4,7/5</span>
        <span class="rating__count">(1 734 avis)</span>
      </div>
      <h1 class="hero__title">7 raisons pour lesquelles +17 000 hommes ont adopté <em>Raselio</em>
</h1>
      <p class="hero__sub">La fin de l'appréhension et des irritations. Une tonte maîtrisée, même là où la peau est la plus fragile.</p>
    </div>
  </section>

  <!-- 2. Barre de confiance -->
  <section class="trust">
    <div class="pw">
      <div class="trust__item">
        <svg class="icon" viewbox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>
        <span>+17 000 clients <br>satisfaits</span>
      </div>
      <div class="trust__item">
        <svg class="icon" viewbox="0 0 24 24"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="17.5" cy="18.5" r="2.5"></circle></svg>
        <span>Livraison <br>offerte</span>
      </div>
      <div class="trust__item">
        <svg class="icon" viewbox="0 0 24 24"><path d="M3 7v6h6"></path><path d="M3 13a9 9 0 1 0 3-6.7L3 9"></path></svg>
        <span>Satisfait ou remboursé</span>
      </div>
    </div>
  </section>

  <!-- 3. Les 7 raisons -->
  <section class="reasons">
    <div class="pw">

      <article class="reason">
        <div class="reason__media">
          <img class="reason__img" src="https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_06_06_43.png?width=900" alt="Tondeuse Raselio en action, tête arrondie posée sur la peau">
          <span class="reason__num" aria-hidden="true">1</span>
        </div>
        <div class="reason__text">
          <h2 class="reason__title">Une tonte maîtrisée,<br>dès le <em>premier passage</em>
</h2>
          <p class="reason__desc">La tête arrondie et les lames céramique glissent sur la peau au lieu de l'accrocher. Vous rasez les zones sensibles avec plus de contrôle, plus de confort et beaucoup moins d'appréhension qu'avec une tondeuse classique.</p>
        </div>
      </article>

      <article class="reason">
        <div class="reason__media">
          <img class="reason__img zoom-hand" src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPTImage21aout2026_01_31_21.png?width=900" alt="Prise en main de la tondeuse Raselio sur une zone sensible">
          <span class="reason__num" aria-hidden="true">2</span>
        </div>
        <div class="reason__text">
          <h2 class="reason__title">Pensée pour cette zone,<br>pas pour <em>votre barbe</em>
</h2>
          <p class="reason__desc">Une tondeuse à barbe est faite pour une peau plane et résistante. Ici, la peau est fine, mobile et pleine de plis. Raselio a été conçue pour ces zones-là : format court, bien en main, tête arrondie et lames céramique.</p>
        </div>
      </article>

      <article class="reason">
        <div class="reason__media">
          <img class="reason__img" src="https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_06_11_08.png?width=900" alt="Tondeuse Raselio rincée sous le robinet">
          <span class="reason__num" aria-hidden="true">3</span>
        </div>
        <div class="reason__text">
          <h2 class="reason__title">100 % étanche,<br>directement <em>sous la douche</em>
</h2>
          <p class="reason__desc">Peau détendue, poils assouplis, rinçage en quelques secondes. Raselio s'utilise sous l'eau et se nettoie d'un simple passage sous le robinet. Pas de poils dans le lavabo, pas de brosse à sortir.</p>
        </div>
      </article>

      <article class="reason">
        <div class="reason__media">
          <img class="reason__img" src="https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_06_06_33.png?width=900" alt="Éclairage LED intégré de la tondeuse Raselio">
          <span class="reason__num" aria-hidden="true">4</span>
        </div>
        <div class="reason__text">
          <h2 class="reason__title">Vous voyez enfin<br><em>ce que vous rasez</em>
</h2>
          <p class="reason__desc">L'éclairage LED intégré éclaire chaque pli et chaque zone d'ombre. Fini le rasage à l'aveugle : vous avancez sûrement, sans repasser dix fois au même endroit.</p>
        </div>
      </article>

      <article class="reason">
        <div class="reason__media">
          <img class="reason__img" src="https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_15_24_25.png?width=900" alt="Démonstration du sabot réglable Raselio sur une surface arrondie">
          <span class="reason__num" aria-hidden="true">5</span>
        </div>
        <div class="reason__text">
          <h2 class="reason__title">La fin de la repousse<br><em>qui pique</em>
</h2>
          <p class="reason__desc">Le sabot réglable 3 hauteurs vous laisse choisir la longueur qui vous convient. Pas de rasage à blanc imposé, pas de démangeaisons deux jours plus tard : une coupe nette, confortable, adaptée à votre peau.</p>
        </div>
      </article>

      <article class="reason">
        <div class="reason__media">
          <img class="reason__img" src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_103729_792b3bdc-4ffe-4bbd-b80b-5da14e19561f.png?width=900" alt="Tondeuse Raselio livrée avec son socle, son sabot, son câble USB, son flacon d'huile et sa brosse">
          <span class="reason__num" aria-hidden="true">6</span>
        </div>
        <div class="reason__text">
          <h2 class="reason__title">Sans fil,<br><em>toujours prête</em>
</h2>
          <p class="reason__desc">Raselio se recharge sur son socle, qui lui sert aussi de support dans la salle de bain. Aucun câble à gérer pendant l'utilisation, rien à démonter avant de commencer : vous la prenez, vous tondez, vous la reposez.</p>
        </div>
      </article>

      <article class="reason">
        <div class="reason__media">
          <img class="reason__img" src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-raison7-C.png?width=900" alt="Tondeuse Raselio sur son socle avec emballage neutre, essai 30 jours">
          <span class="reason__num" aria-hidden="true">7</span>
        </div>
        <div class="reason__text">
          <h2 class="reason__title">Satisfait ou remboursé<br><em>30 jours</em>
</h2>
          <p class="reason__desc">Essayez Raselio pendant 30 jours, sans aucun risque. Si vous ne constatez pas de différence par rapport à votre ancienne méthode, nous vous remboursons intégralement, sans poser de questions. Et la tondeuse est garantie 2 ans.</p>
        </div>
      </article>

    </div>
  </section>

  <!-- 4. Marquee -->
  <section class="marquee" aria-label="Avantages Raselio">
    <div class="marquee__track">
      <span class="marquee__item"><svg class="icon" viewbox="0 0 24 24"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="17.5" cy="18.5" r="2.5"></circle></svg>Livraison Colissimo offerte — Sans minimum d'achat</span>
      <span class="marquee__item"><svg class="icon" viewbox="0 0 24 24"><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z"></path><path d="M9 12l2 2 4-4"></path></svg>Garantie 2 ans — Satisfait ou remboursé 30 jours</span>
      <span class="marquee__item"><svg class="icon" viewbox="0 0 24 24"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="17.5" cy="18.5" r="2.5"></circle></svg>Livraison Colissimo offerte — Sans minimum d'achat</span>
      <span class="marquee__item"><svg class="icon" viewbox="0 0 24 24"><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z"></path><path d="M9 12l2 2 4-4"></path></svg>Garantie 2 ans — Satisfait ou remboursé 30 jours</span>
      <span class="marquee__item" aria-hidden="true"><svg class="icon" viewbox="0 0 24 24"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="17.5" cy="18.5" r="2.5"></circle></svg>Livraison Colissimo offerte — Sans minimum d'achat</span>
      <span class="marquee__item" aria-hidden="true"><svg class="icon" viewbox="0 0 24 24"><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z"></path><path d="M9 12l2 2 4-4"></path></svg>Garantie 2 ans — Satisfait ou remboursé 30 jours</span>
      <span class="marquee__item" aria-hidden="true"><svg class="icon" viewbox="0 0 24 24"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="17.5" cy="18.5" r="2.5"></circle></svg>Livraison Colissimo offerte — Sans minimum d'achat</span>
      <span class="marquee__item" aria-hidden="true"><svg class="icon" viewbox="0 0 24 24"><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z"></path><path d="M9 12l2 2 4-4"></path></svg>Garantie 2 ans — Satisfait ou remboursé 30 jours</span>
    </div>
  </section>

  <!-- 5. Bloc produit -->
  <section class="product">
    <div class="pw">
      <div class="product__media">
        <img src="https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_21_aout_2026_20_25_27.png?width=1200" alt="Tondeuse intime homme Raselio avec son socle de charge">
      </div>
      <div class="product__text">
        <h3 class="product__title">Tondeuse intime Raselio™, enfin un rasage intime serein</h3>
        <div class="product__copy">
          <p>Vos parties intimes sont une zone sensible. Votre tondeuse devrait le savoir : <strong>tête arrondie, lames céramique, éclairage LED.</strong></p>
          <p>Avec Raselio : <strong>moins d'accrocs, moins d'irritations</strong> et <strong>une peau respectée,</strong> même sur les zones les plus fragiles.</p>
        </div>
        <div class="checks">
          <div class="check">
<span class="check__ico"><svg class="icon" viewbox="0 0 24 24"><path d="M5 12l5 5L20 7"></path></svg></span>Tête arrondie et lames céramique</div>
          <div class="check">
<span class="check__ico"><svg class="icon" viewbox="0 0 24 24"><path d="M5 12l5 5L20 7"></path></svg></span>100 % étanche, se rince sous la douche</div>
          <div class="check">
<span class="check__ico"><svg class="icon" viewbox="0 0 24 24"><path d="M5 12l5 5L20 7"></path></svg></span>Sans fil, rechargeable sur son socle</div>
        </div>
        <div class="product__cta">
          <a class="btn" href="https://raselio.com/products/raselio-tondeuse-parties-intimes">Raser sans stress <svg class="icon" viewbox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
          <div class="badge">
            <span class="stars" aria-hidden="true">
              <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
              <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
              <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
              <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>
              <svg class="icon icon--fill" viewbox="0 0 24 24"><path d="M12 2.5v14.8l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"></path><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3z" opacity=".35"></path></svg>
            </span>
            Noté 4,7/5 sur 1 734 avis
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. FAQ -->
  <section class="faq">
    <div class="pw">
      <h3 class="faq__title">Questions fréquentes</h3>
      <div>
        <details class="acc">
          <summary>Ma tondeuse à barbe ne suffit-elle pas ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Une tondeuse à barbe est conçue pour une peau plane et plutôt résistante. Sur les parties intimes, la peau est fine, mobile et pleine de plis : les lames droites accrochent et irritent. Raselio a été pensée spécifiquement pour ces zones, avec une tête arrondie, des lames céramique et un éclairage LED.</div>
        </details>
        <details class="acc">
          <summary>Est-elle adaptée aux testicules et aux zones sensibles ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Oui, c'est précisément son usage. La tête arrondie limite les accrocs sur la peau fine et le sabot vous permet de garder une longueur de sécurité. Tendez bien la peau et avancez par passages courts : c'est la méthode la plus confortable.</div>
        </details>
        <details class="acc">
          <summary>Peut-on l'utiliser sous la douche ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Oui. Raselio est 100 % étanche : vous pouvez l'utiliser sous la douche, puis la rincer directement sous le robinet. L'eau chaude détend la peau et assouplit les poils, ce qui rend la tonte plus confortable.</div>
        </details>
        <details class="acc">
          <summary>Comment éviter les irritations et la repousse qui pique ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Gardez un peu de longueur grâce au sabot plutôt que de raser à blanc, tondez sur peau propre et détendue, puis hydratez. La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir.</div>
        </details>
        <details class="acc">
          <summary>Quelle hauteur de coupe choisir ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Le sabot propose 3 hauteurs. Commencez par la plus longue pour dégrossir, puis descendez si vous souhaitez un résultat plus court. Sans sabot, la tête arrondie permet une finition au plus près, à réserver aux zones les moins sensibles.</div>
        </details>
        <details class="acc">
          <summary>Est-elle sans fil ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Oui. Raselio est sans fil et se recharge sur son socle, qui lui sert aussi de support dans la salle de bain. Aucun câble à manipuler pendant l'utilisation.</div>
        </details>
        <details class="acc">
          <summary>Comment l'entretenir ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Rincez la tête sous l'eau après chaque utilisation, secouez et laissez sécher sur le socle. Les lames céramique ne rouillent pas et conservent leur tranchant bien plus longtemps que des lames acier classiques.</div>
        </details>
        <details class="acc">
          <summary>Quelle garantie ? <svg class="icon" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></summary>
          <div class="acc__body">Raselio est garantie 2 ans. En plus, vous disposez de 30 jours pour l'essayer : si elle ne vous convient pas, nous vous remboursons intégralement, sans poser de questions.</div>
        </details>
      </div>
    </div>
  </section>

  <!-- 7. CTA -->
  <section class="cta">
    <a class="btn" href="https://raselio.com/products/raselio-tondeuse-parties-intimes">Voir la tondeuse <svg class="icon" viewbox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
  </section>

  <!-- 8. Garanties -->
  <section class="cards">
    <div class="pw">
      <div class="card">
        <svg class="icon" viewbox="0 0 24 24"><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z"></path><path d="M9 12l2 2 4-4"></path></svg>
        <div class="card__title">Garantie remboursement 30 jours</div>
        <p class="card__desc">Si vous n'êtes pas satisfait après 30 jours, nous vous remboursons sans question.</p>
      </div>
      <div class="card">
        <svg class="icon" viewbox="0 0 24 24"><path d="M12 3l2.2 5.3L20 9l-4.4 3.9L17 19l-5-3-5 3 1.4-6.1L4 9l5.8-.7z"></path><path d="M19 2l.6 1.4L21 4l-1.4.6L19 6l-.6-1.4L17 4l1.4-.6z"></path></svg>
        <div class="card__title">Plus de 17 000 hommes satisfaits</div>
        <p class="card__desc">Vous pouvez nous faire confiance, d'autres hommes ont déjà validé !</p>
      </div>
      <div class="card">
        <svg class="icon" viewbox="0 0 24 24"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"></path><path d="M3 8l9 5 9-5M12 13v8"></path></svg>
        <div class="card__title">Livraison à domicile offerte</div>
        <p class="card__desc">Profitez de la livraison Colissimo offerte, sans minimum d'achat.</p>
      </div>
    </div>
  </section>

  <!-- 9. Footer -->
  <footer class="foot">
    <div class="pw">
      <span class="wordmark">RASELIO</span>
      <p>© 2026 Raselio. Tous droits réservés.</p>
      <p><a href="https://raselio.com/policies/legal-notice">Mentions légales</a>  -  <a href="https://raselio.com/policies/privacy-policy">Politique de confidentialité</a></p>
    </div>
  </footer>

</div>
```

# 5. Shop policies (`graphql_query` `{ shop { shopPolicies { type body } } }`)

Query validated and returned 6 policies. Bodies verbatim below (HTML as returned).

## 5.1 CONTACT_INFORMATION

```html
<p>Nom commercial : Raselio</p>
<p>Numéro de téléphone&nbsp;: 0745235029</p>
<p>Adresse e-mail&nbsp;: ulrydylan.buisness@gmail.com</p>
<p>Adresse physique : 21 Rue des Filoirs, 77480 Bray-sur-Seine, France</p>
<p><span style="font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-size: 0.875rem;">Numéro de téléphone : 0745235029</span></p>
<p>Adresse e-mail : <meta charset="utf-8"><span>raseliosupport@gmail.com</span></p>
<p>&nbsp;</p>
```

## 5.2 LEGAL_NOTICE

```html
<p><span>MENTIONS LÉGALES</span></p>
<p><span>ÉDITEUR DU SITE</span></p>
<p><span>Le site Raselio est édité par :</span></p>
<p><span>Nom commercial : Raselio</span><br><span>Entrepreneur : Dylan Ulry, entrepreneur individuel (EI)</span><br><span>Adresse professionnelle : 118 rue des Peintres, 69480 Anse, France</span><br><span>Numéro SIREN : 982 367 286</span><br><span>Numéro SIRET : 982 367 286 00027</span><br><span>Immatriculation : Registre national des entreprises (RNE)</span><br><span>E-mail : <meta charset="utf-8">raseliosupport@gmail.com</span><br><br></p>
<p><span>DIRECTEUR DE LA PUBLICATION</span></p>
<p><span>Le directeur de la publication est Dylan Ulry, entrepreneur individuel.</span></p>
<p><span>HÉBERGEMENT DU SITE</span></p>
<p><span>Le site est hébergé par :</span></p>
<p><span>Shopify International Limited</span><br><span>2nd Floor, 1-2 Victoria Buildings</span><br><span>Haddington Road</span><br><span>Dublin 4, D04 XN32</span><br><span>Irlande</span></p>
<p><span>Site internet : </span><a href="http://www.shopify.com/"><span>www.shopify.com</span></a></p>
<p><span>PROPRIÉTÉ INTELLECTUELLE</span></p>
<p><span>L’ensemble des éléments présents sur le site Cutlab, notamment les textes, photographies, images, graphismes, logos, vidéos et éléments de mise en page, est protégé par les règles françaises et internationales relatives à la propriété intellectuelle.</span></p>
<p><span>Toute reproduction, représentation, modification, diffusion ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.</span></p>
<p><span>DONNÉES PERSONNELLES</span></p>
<p><span>Les données personnelles collectées sur le site sont utilisées pour traiter les commandes, assurer la livraison, gérer les demandes adressées au service client et améliorer les services proposés.</span></p>
<p><span>Les modalités de collecte, d’utilisation et de conservation des données sont détaillées dans la politique de confidentialité accessible sur le site.</span></p>
<p><span>Pour exercer vos droits relatifs à vos données personnelles, vous pouvez contacter Raselio à l’adresse suivante : <meta charset="utf-8">raseliosupport@gmail.com</span></p>
<p><span>RESPONSABILITÉ</span></p>
<p><span>Raselio s’efforce de fournir des informations exactes et actualisées. Toutefois, Raselio ne peut garantir l’absence totale d’erreurs ou d’interruptions temporaires du site.</span></p>
<p><span>Raselio ne pourra pas être tenu responsable d’un dommage résultant d’une mauvaise utilisation du site ou des produits, sans préjudice des responsabilités qui ne peuvent être exclues par la loi.</span></p>
<p><span>DROIT APPLICABLE</span></p>
<p><span>Les présentes mentions légales sont soumises au droit français.</span></p>
<p><span>CONTACT</span></p>
<p><span>Pour toute demande concernant le site ou une commande :</span></p>
<p><span>Raselio</span></p>
<p><span>E-mail :&nbsp;<meta charset="utf-8">raseliosupport@gmail.com</span><br><span>Adresse : 118 rue des Peintres, 69480 Anse, France</span></p>
```

## 5.3 PRIVACY_POLICY

```html
<p><span>La présente politique explique comment Cutlab collecte, utilise et protège les données personnelles des visiteurs et clients de sa boutique en ligne.</span></p>
<p><span>Lorsque vous consultez le site, créez un compte, passez une commande ou contactez notre service client, nous pouvons recueillir certaines informations telles que votre nom, votre adresse de livraison et de facturation, votre adresse e-mail, votre numéro de téléphone, les informations relatives à votre commande, votre adresse IP ainsi que les informations nécessaires au paiement.</span></p>
<p><span>Les données de paiement sont traitées de manière sécurisée par nos prestataires de paiement. Cutlab ne conserve pas l’intégralité des informations de votre carte bancaire.</span></p>
<p><span>Ces données peuvent être utilisées pour :</span></p>
<p><span>– traiter, préparer et livrer les commandes ;</span><br><span>– gérer les paiements, retours et remboursements ;</span><br><span>– communiquer avec les clients ;</span><br><span>– prévenir la fraude et sécuriser le site ;</span><br><span>– respecter nos obligations légales et comptables ;</span><br><span>– améliorer le fonctionnement de la boutique ;</span><br><span>– envoyer des communications commerciales lorsque le client y a consenti ou lorsque la loi le permet.</span></p>
<p><span>Les données peuvent être communiquées uniquement aux prestataires nécessaires au fonctionnement de la boutique, notamment Shopify, les prestataires de paiement, les transporteurs, les services informatiques, les outils d’analyse et les partenaires chargés de l’exécution des commandes. Ces prestataires ne doivent utiliser les données que dans le cadre des services qui leur sont confiés.</span></p>
<p><span>Certains prestataires peuvent traiter des données en dehors de l’Espace économique européen. Lorsque cela est nécessaire, des garanties juridiques appropriées sont mises en place conformément à la réglementation applicable.</span></p>
<p><span>Les données sont conservées pendant la durée nécessaire à l’exécution des commandes, à la gestion de la relation commerciale et au respect de nos obligations légales, fiscales, comptables et de prévention de la fraude.</span></p>
<p><span>Le site peut utiliser des cookies nécessaires à son fonctionnement ainsi que, sous réserve de votre consentement lorsque celui-ci est requis, des cookies de mesure d’audience, de personnalisation ou de publicité. Vous pouvez gérer vos préférences au moyen de l’outil de consentement disponible sur le site.</span></p>
<p><span>Conformément à la réglementation applicable, vous pouvez demander l’accès, la rectification, l’effacement ou la portabilité de vos données. Vous pouvez également demander la limitation du traitement ou vous opposer à certains traitements. Lorsqu’un traitement repose sur votre consentement, vous pouvez retirer celui-ci à tout moment.</span></p>
<p><span>Pour exercer vos droits</span></p>
<p>&nbsp;</p>
```

## 5.4 REFUND_POLICY

```html
<p><span>Chez Cutlab, vous disposez d’un délai de 30 jours après la réception de votre commande pour demander un retour.</span></p>
<p><span>Pour être admissible à un retour, l’article doit être dans son état d’origine, non utilisé, complet et retourné dans son emballage d’origine avec ses accessoires. Une preuve d’achat pourra être demandée.</span></p>
<p><span>Pour effectuer une demande de retour, contactez-nous à l’adresse <meta charset="utf-8">raseliosupport@gmail.com </span><span>en indiquant votre numéro de commande et le motif de votre demande. Les produits retournés sans demande préalable pourront être refusés.</span></p>
<p><span>Conformément à la réglementation européenne, vous disposez également d’un délai légal de rétractation de 14 jours à compter de la réception de votre commande, sans avoir à justifier votre décision.</span></p>
<p><span>Pour des raisons d’hygiène, les produits scellés ne pouvant être remis en vente pour des raisons de protection de la santé ou d’hygiène ne peuvent plus être retournés après ouverture de leur scellé, sauf s’ils sont défectueux ou non conformes.</span></p>
<p><span>Les frais de retour sont à la charge du client, sauf si le produit reçu est endommagé, défectueux, non conforme ou différent de celui commandé. Les frais de livraison standard initialement payés sont remboursés dans le cadre du droit légal de rétractation. Les éventuels frais supplémentaires liés à un mode de livraison express ne sont pas remboursés.</span></p>
<p><span>À réception du retour, nous vérifierons l’état du produit et vous informerons de l’acceptation ou du refus du remboursement. Si le remboursement est accepté, celui-ci sera effectué sur le moyen de paiement utilisé lors de la commande. Le délai d’apparition du remboursement dépend ensuite de votre banque ou de l’organisme de paiement.</span></p>
<p><span>Cutlab peut différer le remboursement jusqu’à la récupération du produit ou jusqu’à la réception d’une preuve d’expédition du retour.</span></p>
<p><span>Si votre produit est arrivé endommagé, contactez-nous dès que possible à <meta charset="utf-8">raseliosupport@gmail.com </span><span>avec votre numéro de commande ainsi que des photos ou vidéos du produit et de son emballage.</span></p>
<p><span>Les produits personnalisés, les cartes-cadeaux et les produits ayant été endommagés après leur réception ne sont pas remboursables, sauf disposition légale contraire.</span></p>
<p><span>Cette politique ne limite pas vos droits relatifs à la garantie légale de conformité et à la garantie contre les vices cachés.</span></p>
```

## 5.5 SHIPPING_POLICY

```html
<p><span>Les commandes Cutlab sont préparées et expédiées dans les meilleurs délais après validation du paiement.</span></p>
<p><span>Le délai de préparation habituel est de 1 à 3 jours ouvrés. Les délais estimés de livraison sont indiqués sur la page du produit, lors du passage de la commande ou dans l’e-mail de confirmation. Ces délais sont donnés à titre estimatif et peuvent varier selon la destination, le transporteur, les périodes de forte activité ou des circonstances indépendantes de notre volonté.</span></p>
<p><span>Une fois la commande expédiée, un e-mail de confirmation peut être envoyé avec les informations de suivi disponibles. Un délai de quelques jours peut être nécessaire avant l’actualisation du suivi par le transporteur.</span></p>
<p><span>Le client doit vérifier attentivement l’adresse de livraison avant de confirmer sa commande. Cutlab ne pourra pas être tenu responsable d’un retard ou d’un échec de livraison causé par une adresse incorrecte ou incomplète communiquée par le client.</span></p>
<p><span>Si une erreur est constatée dans l’adresse, contactez-nous rapidement à </span><a href="mailto:cutlabsupport@gmail.com"><span>cutlabsupport@gmail.com</span></a><span>. Une modification ne pourra être garantie si la commande a déjà été préparée ou expédiée.</span></p>
<p><span>Une commande peut être livrée en plusieurs colis. Dans ce cas, plusieurs numéros de suivi peuvent être communiqués et les colis peuvent arriver à des dates différentes.</span></p>
<p><span>En cas de retard important, de colis indiqué comme livré mais non reçu ou de suivi anormalement bloqué, contactez-nous à </span><a href="mailto:cutlabsupport@gmail.com"><span>cutlabsupport@gmail.com</span></a><span> avec votre numéro de commande. Nous effectuerons les vérifications nécessaires auprès du transporteur.</span></p>
<p><span>En cas de perte confirmée du colis, une solution adaptée sera proposée conformément à la réglementation applicable.</span></p>
<p><span>Des taxes, droits de douane ou frais d’importation peuvent s’appliquer pour certaines destinations situées en dehors de l’Union européenne. Sauf indication contraire, ces frais restent à la charge du destinataire.</span></p>
```

## 5.6 TERMS_OF_SALE

```html
<p><span>CONDITIONS GÉNÉRALES DE VENTE</span></p>
<p><span>Dernière mise à jour : 25 juillet 2026</span></p>
<ol start="1">
<li>
<p><span>IDENTITÉ DU VENDEUR</span></p>
</li>
</ol>
<p><span>La boutique Cutlab est exploitée par :</span></p>
<p><span>Dylan Ulry, entrepreneur individuel (EI)</span><br><span>Nom commercial : Cutlab</span><br><span>Adresse professionnelle : 118 rue des Peintres, 69480 Anse, France</span><br><span>SIREN : 982 367 286</span><br><span>SIRET : 982 367 286 00027</span><br><span>Immatriculation : Registre national des entreprises (RNE)</span><br><span>E-mail : <meta charset="utf-8">raseliosupport@gmail.com</span><br><br></p>
<ol start="2">
<li>
<p><span>OBJET</span></p>
</li>
</ol>
<p><span>Les présentes conditions générales de vente, ci-après « CGV », régissent les ventes de produits réalisées sur la boutique en ligne Cutlab auprès de consommateurs.</span></p>
<p><span>Toute commande passée sur le site implique l’acceptation sans réserve des présentes CGV par le client.</span></p>
<p><span>La version applicable est celle accessible sur le site au moment de la validation de la commande.</span></p>
<ol start="3">
<li>
<p><span>PRODUITS</span></p>
</li>
</ol>
<p><span>Les caractéristiques essentielles, les fonctionnalités, le contenu et le prix de chaque produit sont indiqués sur sa page.</span></p>
<p><span>Le client doit prendre connaissance de ces informations avant de passer commande.</span></p>
<p><span>Cutlab fait son possible pour présenter les produits avec exactitude. Cependant, de légères différences de couleur ou d’apparence peuvent exister en fonction de l’écran utilisé ou des conditions de prise de vue.</span></p>
<p><span>Les photographies sont présentées à titre illustratif. Les accessoires inclus sont uniquement ceux indiqués dans la description du produit.</span></p>
<p><span>Les produits sont proposés dans la limite des stocks disponibles.</span></p>
<ol start="4">
<li>
<p><span>PRIX</span></p>
</li>
</ol>
<p><span>Les prix sont affichés en euros, toutes taxes comprises lorsque celles-ci sont applicables.</span></p>
<p><span>Les éventuels frais de livraison sont indiqués avant la validation définitive de la commande.</span></p>
<p><span>Cutlab peut modifier ses prix à tout moment. Le prix facturé reste celui affiché et accepté par le client au moment de la commande, sauf erreur manifeste.</span></p>
<p><span>Les codes promotionnels et réductions ne sont pas cumulables, sauf indication contraire.</span></p>
<ol start="5">
<li>
<p><span>COMMANDE</span></p>
</li>
</ol>
<p><span>Pour passer une commande, le client sélectionne le produit souhaité, vérifie le contenu de son panier, renseigne ses coordonnées, choisit le mode de livraison disponible et procède au paiement.</span></p>
<p><span>Avant le paiement, le client peut vérifier et corriger les informations de sa commande.</span></p>
<p><span>La validation de la commande implique une obligation de paiement.</span></p>
<p><span>Après la commande, un e-mail de confirmation récapitulant les informations essentielles est envoyé à l’adresse communiquée par le client.</span></p>
<p><span>Raselio peut refuser ou annuler une commande en cas :</span></p>
<ul>
<li>
<p><span>de paiement refusé ;</span></p>
</li>
<li>
<p><span>d’informations incorrectes ou incomplètes ;</span></p>
</li>
<li>
<p><span>d’indisponibilité du produit ;</span></p>
</li>
<li>
<p><span>de suspicion de fraude ;</span></p>
</li>
<li>
<p><span>de commande anormale ou abusive ;</span></p>
</li>
<li>
<p><span>d’erreur manifeste concernant le prix ou la description.</span></p>
</li>
</ul>
<p><span>En cas d’annulation par Raselio après encaissement, les sommes payées seront remboursées.</span></p>
<ol start="6">
<li>
<p><span>PAIEMENT</span></p>
</li>
</ol>
<p><span>Le paiement s’effectue au moyen des solutions proposées lors de la commande.</span></p>
<p><span>Les transactions sont traitées par des prestataires de paiement sécurisés. Raselio ne conserve pas directement les informations bancaires complètes du client.</span></p>
<p><span>La commande est traitée après confirmation du paiement.</span></p>
<ol start="7">
<li>
<p><span>PRÉPARATION ET LIVRAISON</span></p>
</li>
</ol>
<p><span>Les commandes sont généralement préparées dans un délai de 1 à 3 jours ouvrés après confirmation du paiement.</span></p>
<p><span>Les délais de livraison affichés sur le site ou lors du paiement sont des estimations. Ils commencent après le traitement et l’expédition de la commande.</span></p>
<p><span>Lorsque aucune date ou aucun délai précis n’a été convenu, la commande est livrée au plus tard 30 jours après la conclusion du contrat, sauf disposition légale contraire.</span></p>
<p><span>Les délais peuvent être prolongés pendant les périodes de forte activité, les jours fériés ou en cas d’événement indépendant de la volonté de Raselio.</span></p>
<p><span>Le client doit fournir une adresse exacte et complète. Raselio ne peut être tenu responsable d’un retard ou d’un échec de livraison causé par une adresse incorrecte ou incomplète communiquée par le client.</span></p>
<p><span>Si le délai de livraison convenu n’est pas respecté, le client peut demander à Raselio d’effectuer la livraison dans un délai supplémentaire raisonnable. Si la livraison n’est toujours pas effectuée, le client peut annuler la commande dans les conditions prévues par la loi.</span></p>
<ol start="8">
<li>
<p><span>TRANSFERT DES RISQUES</span></p>
</li>
</ol>
<p><span>Le risque de perte ou d’endommagement du produit est transféré au client lorsqu’il prend physiquement possession de la commande.</span></p>
<p><span>Lorsque le client choisit lui-même un transporteur qui n’est pas proposé par Raselio, le transfert des risques intervient lors de la remise du produit au transporteur.</span></p>
<ol start="9">
<li>
<p><span>DROIT DE RÉTRACTATION</span></p>
</li>
</ol>
<p><span>Conformément aux règles applicables aux ventes à distance, le client dispose d’un délai de 14 jours à compter de la réception du produit pour informer Raselio de sa décision de se rétracter, sans avoir à fournir de motif.</span></p>
<p><span>Pour une commande comportant plusieurs produits livrés séparément, le délai commence à la réception du dernier produit.</span></p>
<p><span>La demande de rétractation doit être envoyée à :</span></p>
<p><meta charset="utf-8"><span>raseliosupport@gmail.com</span></p>
<p><br></p>
<p><span>Le client peut utiliser le formulaire de rétractation figurant à la fin des présentes CGV ou envoyer une déclaration claire indiquant sa décision.</span></p>
<p><span>Après avoir communiqué sa décision, le client dispose de 14 jours pour retourner le produit.</span></p>
<ol start="10">
<li>
<p><span>POLITIQUE COMMERCIALE DE RETOUR SOUS 30 JOURS</span></p>
</li>
</ol>
<p><span>En complément du droit légal de rétractation, Cutlab permet de demander un retour dans un délai maximal de 30 jours après la réception de la commande.</span></p>
<p><span>Après l’expiration du délai légal de rétractation, cette possibilité constitue une politique commerciale volontaire. Le produit doit être inutilisé, complet, dans son état d’origine et accompagné de son emballage ainsi que de tous ses accessoires.</span></p>
<p><span>Le client doit contacter <meta charset="utf-8">raseliosupport@gmail.com</span><span>avant tout retour. L’adresse et les instructions de retour lui seront communiquées par e-mail.</span></p>
<ol start="11">
<li>
<p><span>EXCEPTIONS AU DROIT DE RÉTRACTATION</span></p>
</li>
</ol>
<p><span>Conformément à la législation applicable, le droit de rétractation peut notamment être exclu pour les produits scellés ne pouvant être retournés pour des raisons de protection de la santé ou d’hygiène lorsqu’ils ont été descellés après la livraison.</span></p>
<p><span>Cette exception peut concerner les appareils de rasage ou de soin corporel lorsqu’ils sont vendus sous un emballage protecteur scellé puis descellés par le client.</span></p>
<p><span>Cette exclusion ne prive pas le client de ses droits lorsque le produit est défectueux, endommagé ou non conforme.</span></p>
<ol start="12">
<li>
<p><span>FRAIS DE RETOUR</span></p>
</li>
</ol>
<p><span>Les frais directs de retour liés à un changement d’avis sont à la charge du client.</span></p>
<p><span>Cutlab prend en charge les frais nécessaires lorsqu’un produit reçu est défectueux, endommagé, non conforme ou différent de celui commandé.</span></p>
<p><span>Aucun retour ne doit être envoyé sans avoir préalablement contacté Raselio.</span></p>
<ol start="13">
<li>
<p><span>REMBOURSEMENT</span></p>
</li>
</ol>
<p><span>En cas de rétractation valable, Raselio rembourse les sommes reçues, y compris les frais de livraison standard initiaux.</span></p>
<p><span>Les frais supplémentaires résultant du choix d’un mode de livraison plus coûteux que la livraison standard ne sont pas remboursés.</span></p>
<p><span>Le remboursement est effectué au plus tard 14 jours après la notification de la rétractation. Raselio&nbsp; peut toutefois différer le remboursement jusqu’à la récupération du produit ou jusqu’à la réception d’une preuve de son expédition.</span></p>
<p><span>Le remboursement est réalisé avec le même moyen de paiement que celui utilisé lors de la commande, sauf accord exprès pour utiliser un autre moyen.</span></p>
<p><span>Une dépréciation peut être déduite si le produit a été manipulé au-delà de ce qui est nécessaire pour vérifier sa nature, ses caractéristiques et son bon fonctionnement.</span></p>
<ol start="14">
<li>
<p><span>PRODUIT ENDOMMAGÉ, DÉFECTUEUX OU INCORRECT</span></p>
</li>
</ol>
<p><span>Le client doit vérifier l’état de sa commande dès sa réception.</span></p>
<p><span>En cas de produit endommagé, défectueux, incomplet ou différent de celui commandé, le client doit contacter <meta charset="utf-8">raseliosupport@gmail.com</span><span>en fournissant :</span></p>
<ul>
<li>
<p><span>son numéro de commande ;</span></p>
</li>
<li>
<p><span>une description du problème ;</span></p>
</li>
<li>
<p><span>des photographies du produit et de son emballage.</span></p>
</li>
</ul>
<p><span>Raselio examinera la demande et proposera une solution conformément aux garanties légales applicables.</span></p>
<ol start="15">
<li>
<p><span>GARANTIE LÉGALE DE CONFORMITÉ</span></p>
</li>
</ol>
<p><span>Le client bénéficie de la garantie légale de conformité applicable aux biens vendus par un professionnel.</span></p>
<p><span>Cette garantie s’applique pendant deux ans à compter de la délivrance du produit.</span></p>
<p><span>En cas de défaut de conformité, le client peut demander la mise en conformité du produit par réparation ou remplacement, sous réserve des conditions légales.</span></p>
<p><span>La mise en conformité doit intervenir sans frais pour le client, dans un délai raisonnable et sans inconvénient majeur.</span></p>
<p><span>Lorsque la réparation ou le remplacement est impossible, disproportionné, refusé ou n’est pas effectué dans les conditions prévues par la loi, le client peut demander une réduction du prix ou la résolution du contrat.</span></p>
<p><span>La garantie légale s’applique indépendamment de toute garantie commerciale éventuellement proposée.</span></p>
<ol start="16">
<li>
<p><span>GARANTIE CONTRE LES VICES CACHÉS</span></p>
</li>
</ol>
<p><span>Le client bénéficie également de la garantie contre les vices cachés lorsque le défaut caché rend le produit impropre à l’usage auquel il est destiné ou diminue tellement cet usage que le client ne l’aurait pas acheté, ou en aurait offert un prix inférieur, s’il en avait eu connaissance.</span></p>
<p><span>Dans les conditions prévues par la loi, le client peut choisir de rendre le produit et d’obtenir le remboursement du prix ou de conserver le produit et d’obtenir une réduction du prix.</span></p>
<ol start="17">
<li>
<p><span>UTILISATION DES PRODUITS</span></p>
</li>
</ol>
<p><span>Le client doit lire et respecter les instructions d’utilisation, d’entretien et de sécurité fournies avec le produit.</span></p>
<p><span>Raselio ne peut être tenu responsable des dommages résultant d’une mauvaise utilisation, d’une utilisation contraire à la destination du produit, d’un défaut d’entretien ou du non-respect des consignes de sécurité.</span></p>
<p><span>Cette limitation ne s’applique pas aux responsabilités qui ne peuvent être légalement exclues.</span></p>
<ol start="18">
<li>
<p><span>RESPONSABILITÉ</span></p>
</li>
</ol>
<p><span>Raselio ne pourra pas être tenu responsable d’un retard ou d’une inexécution résultant d’un événement imprévisible ou indépendant de sa volonté.</span></p>
<p><span>Aucune disposition des présentes CGV ne limite les droits impératifs accordés aux consommateurs par la loi.</span></p>
<ol start="19">
<li>
<p><span>DONNÉES PERSONNELLES</span></p>
</li>
</ol>
<p><span>Les données personnelles collectées sont utilisées notamment pour traiter les commandes, effectuer les livraisons, assurer le service client, prévenir la fraude et respecter les obligations légales.</span></p>
<p><span>Les informations détaillées concernant le traitement des données et les droits du client sont accessibles dans la politique de confidentialité de Cutlab.</span></p>
<p><span>Toute demande relative aux données personnelles peut être envoyée à <meta charset="utf-8">raseliosupport@gmail.com</span></p>
<ol start="20">
<li>
<p><span>PROPRIÉTÉ INTELLECTUELLE</span></p>
</li>
</ol>
<p><span>Les textes, images, photographies, logos, vidéos, graphismes et autres contenus présents sur le site Raselio sont protégés par les règles relatives à la propriété intellectuelle.</span></p>
<p><span>Toute reproduction, modification, publication ou exploitation sans autorisation préalable est interdite.</span></p>
<ol start="21">
<li>
<p><span>MÉDIATION DE LA CONSOMMATION</span></p>
</li>
</ol>
<p><span>En cas de réclamation, le client doit d’abord contacter Cutlab à l’adresse </span><a href="mailto:cutlabsupport@gmail.com"><span>cutlabsupport@gmail.com</span></a><span> afin de rechercher une solution amiable.</span></p>
<p><span>Si aucune solution amiable n’est trouvée, le consommateur peut saisir gratuitement le médiateur de la consommation auquel Cutlab a adhéré :</span></p>
<p><span>Nom du médiateur : [À COMPLÉTER OBLIGATOIREMENT]</span><br><span>Adresse : [À COMPLÉTER]</span><br><span>Site internet : [À COMPLÉTER]</span></p>
<p><span>La demande doit respecter les conditions d’admissibilité du médiateur concerné.</span></p>
<ol start="22">
<li>
<p><span>DROIT APPLICABLE ET LITIGES</span></p>
</li>
</ol>
<p><span>Les présentes CGV sont soumises au droit français.</span></p>
<p><span>Le consommateur conserve les protections impératives accordées par la législation de son pays de résidence lorsque celles-ci sont applicables.</span></p>
<p><span>En cas de litige non résolu à l’amiable, le consommateur peut saisir la juridiction compétente selon les règles légales applicables.</span></p>
<ol start="23">
<li>
<p><span>CONTACT</span></p>
</li>
</ol>
<p><span>Raselio</span><br><span>Dylan Ulry, entrepreneur individuel</span><br><span>118 rue des Peintres</span><br><span>69480 Anse, France</span><br><span>E-mail : <meta charset="utf-8">raseliosupport@gmail.com</span><br><span></span><span>FORMULAIRE TYPE DE RÉTRACTATION</span></p>
<p><span>À compléter et envoyer uniquement si vous souhaitez vous rétracter de votre commande.</span></p>
<p><span>À l’attention de :</span></p>
<p><span>Cutlab</span><br><span>Dylan Ulry, entrepreneur individuel</span><br><span>118 rue des Peintres</span><br><span>69480 Anse, France</span><br><span>E-mail : <meta charset="utf-8">raseliosupport@gmail.com</span></p>
<p><span>Je vous informe par la présente de ma décision de me rétracter du contrat portant sur la vente du produit suivant :</span></p>
<p><span>Produit commandé :</span><br><span>Numéro de commande :</span><br><span>Date de la commande :</span><br><span>Date de réception :</span><br><span>Nom du client :</span><br><span>Adresse du client :</span><br><span>E-mail utilisé pour la commande :</span><br><span>Date de la demande :</span><br><span>Signature du client, uniquement en cas d’envoi sur papier :</span></p>
```

## 5.7 TERMS_OF_SERVICE

```html
<p><span>Le présent site est exploité sous le nom Cutlab. En utilisant ce site ou en effectuant une commande, vous acceptez les présentes conditions de service.</span></p>
<p><span>Les produits, prix, offres et disponibilités peuvent être modifiés à tout moment. Nous nous efforçons de présenter les produits, leurs caractéristiques et leurs images aussi fidèlement que possible. De légères différences d’affichage peuvent toutefois apparaître selon l’écran utilisé.</span></p>
<p><span>Les prix applicables sont ceux affichés au moment de la validation de la commande. Les éventuels frais de livraison sont présentés avant le paiement.</span></p>
<p><span>Cutlab se réserve le droit de refuser ou d’annuler une commande en cas de suspicion de fraude, d’informations incorrectes, d’erreur manifeste de prix, d’indisponibilité du produit ou de problème de paiement. Si une commande déjà payée est annulée, les sommes concernées seront remboursées.</span></p>
<p><span>Le client s’engage à fournir des informations exactes, complètes et à jour lors de sa commande. Il est responsable de la confidentialité des informations liées à son compte client.</span></p>
<p><span>Les contenus du site, notamment les textes, visuels, graphismes et éléments de marque, ne peuvent pas être copiés, reproduits ou utilisés sans autorisation, sauf lorsque la loi le permet.</span></p>
<p><span>Il est interdit d’utiliser le site pour une activité illégale, frauduleuse ou susceptible d’endommager son fonctionnement ou de porter atteinte aux droits d’un tiers.</span></p>
<p><span>Le site peut contenir des liens ou utiliser des services exploités par des prestataires externes. Cutlab ne contrôle pas le contenu ni la disponibilité des sites tiers.</span></p>
<p><span>Cutlab ne pourra pas être tenu responsable des dommages résultant d’une mauvaise utilisation du produit, du non-respect des instructions d’utilisation ou d’une utilisation contraire à sa destination normale. Cette limitation ne s’applique pas lorsqu’elle est interdite par la loi et ne réduit pas les droits légaux des consommateurs.</span></p>
<p><span>Les présentes conditions sont soumises au droit français, sous réserve des règles impératives protégeant les consommateurs résidant dans un autre pays.</span></p>
<p><span>Pour toute question concernant ces conditions, contactez-nous à <meta charset="utf-8">raseliosupport@gmail.com</span></p>
```

# 6. Collections (`search_collections`, first 50, no query)

1 collection, `hasNextPage = false`.

| id | title | handle | updatedAt | image | productsCount | ruleSet | sortOrder |
|---|---|---|---|---|---|---|---|
| gid://shopify/Collection/698258424139 | Page d’accueil | frontpage | 2026-09-03T23:41:31Z | null | 0 | null | BEST_SELLING |
