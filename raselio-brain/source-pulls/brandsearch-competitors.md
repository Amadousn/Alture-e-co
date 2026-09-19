---
brand: Raselio
source: Brandsearch brand ids thomyle.com, cutlab.space, manscaped-leader.com, billy-trimmer.com, nutss.fr, wavyliss.com, coco-liss.com, kelyss.com, cocospoilus.fr, a719d0-af.myshopify.com, clubcooper.com, mightybull.co, balls.co, manscaped-us.com, bakblade.com, thebakblade.com, mangroomer.com, bodygroomer.com, maserenea.com, lumeziaa.com + lookup/search/discover queries listed per section
pulled_on: 2026-09-06
tool: mcp__Brandsearch__get_brand, mcp__Brandsearch__lookup_brand, mcp__Brandsearch__get_brand_ads, mcp__Brandsearch__get_brand_ads_aggregates, mcp__Brandsearch__get_products, mcp__Brandsearch__search_meta_ads, mcp__Brandsearch__discover_meta_ads, mcp__Brandsearch__search_brands
claim_status: verified-as-reported by Brandsearch     # all figures are Brandsearch's own estimates/counts (EU spend & reach are Meta EU transparency estimates as reported by Brandsearch); nothing re-verified elsewhere
window: Brandsearch catalogue state on 2026-09-06; thomyle ads crawled up to created_at 2026-08-21; aggregates window from=null/to=null (all-time, 1,063 ads)
notes: Verbatim tool output rendered to markdown. Limits — (1) get_brand_ads returns 20 ads per call and has no page parameter, so "spend" and "recent" sorts each give the top 20 of 1,063; (2) landing URLs are not a returned field on any ad (only dashboard/media URLs) — recorded as "not returned"; the product URL appears only inside some ad bodies; (3) search_brands has no page parameter and returned page 1 of 97 (20 rows), not 30; (4) discover_meta_ads has no country_code parameter — the FR filter requested could not be applied, result is the niche-only English-default sample; (5) all five search_meta_ads queries returned 0 rows; (6) lookup_brand returns at most 5 matches (limit default) — "resolves" below means the name query returned a match list.
---

# Brandsearch — competitor landscape for Raselio (tondeuse intime homme, FR)

## A. get_brand — direct profiles

### thomyle.com (get_brand)
```
Brand: thomyle.com (thomyle.com)
Niche: Beauty & Skincare | Status: Active
Monthly Visits: 108
Products: 18
Ecommerce Platform: shopify
Meta Ads: 32 active / 2,082 total
Listed: May 30, 2025
country_code: FR
title: Thomyle - Le rasage intime au masculin
description: On réinvente le soin intime au masculin, sans tabou, sans compromis. Découvrez nos rasoir pour homme et nos soins intimes pour vous messieurs !
created_at: 2025-05-30 | last_meta_total_count: 2082 | last_meta_active_count: 32 | product_count: 18
dashboard_url: https://app.brandsearch.co/brand-analysis/thomyle.com
```

### cutlab.space (get_brand) — Raselio's former domain
```
Brand: cutlab.space (cutlab.space)
Status: Inactive
Monthly Visits: 0
Ecommerce Platform: shopify
Meta Ads: 0 active / 0 total
Listed: Jul 31, 2026
country_code: FR
title: Tondeuse Corps Homme Étanche et Précise | Cutlab – Raselio
description: Découvrez la tondeuse corps homme Cutlab, étanche et douce pour la peau. Une coupe précise pour le torse, les aisselles et les zones intimes.
created_at: 2026-07-31 | niche: (none) | product_count: (not returned)
dashboard_url: https://app.brandsearch.co/brand-analysis/cutlab.space
```

### manscaped-leader.com (get_brand)
```
Brand: manscaped-leader.com (manscaped-leader.com)
Niche: Beauty & Skincare | Status: Inactive
Monthly Visits: 0
Products: 87
Ecommerce Platform: Shopify
Meta Ads: 0 active / 0 total
Listed: Dec 12, 2025
country_code: US
title: MANSCAPED
description: MANSCAPED
dashboard_url: https://app.brandsearch.co/brand-analysis/manscaped-leader.com
```

## B. lookup_brand — which names resolve

| query | type_used | resolves? | matches (id · title · country · niche) |
|---|---|---|---|
| philips oneblade | name | NO — `matches: []` | — |
| gillette labs | name | NO — `matches: []` | — |
| meridian | name | yes (5, none grooming) | meridian-eg.myshopify.com · "– Meridian" · EG; meridian-eg.com · "Meridian" · EG; meridian-bloom.com · "Meridian Bloom" · US; meridian-domain.myshopify.com · "Meridian Domain" · US; meridian-webshop.com · "Meridian Corp" · US · Toys & Games |
| balls trimmer | name | yes (2) | mightybull.co · "UK's #1 Balls Trimmer – Precision Manscaping Tool for Men - The Tamer – Mighty Bull" · US · Health & Supplements; balls.co · "BALLS™ Body and Pubic Trimmer - Personal Grooming for Men and Women – Edward Ventures International LLC" · US · Beauty & Skincare (tiktok @ballsco) |
| grumwise | name | NO — `matches: []` | — |
| manscaped | name | yes (5) | manscaped-leader.com · "MANSCAPED" · US · Beauty & Skincare; manscaped-qa.myshopify.com · "manscaped-qa" · US; manscaped-shop.myshopify.com · "MANSCAPED" · US; manscaped-x-deloitte.myshopify.com · "Manscaped X Deloitte"; manscaped-us.com · "MANSCAPED® \| The Leader in Men's Grooming Tools & Essentials \| MANSCAP" · US · Beauty & Skincare |
| bakblade | name | yes (5) | bakbladeco.com (www.bakbladeco.com) · "BAKBLADE" · US; bakblade.com · "BAKBLADE" · US; testingwebsitelive.com · "BAKBLADE" · US; uktesters.co.uk · "BAKBLADE Body Grooming Co" · GB; thebakblade.com · "BAKBLADE Body Grooming Co" · GB — all Beauty & Skincare |
| mangroomer | name | yes (3) | murphy-gibson1982.myshopify.com · "MANGROOMER - MANGROOMER" · CA · Beauty & Skincare; mangroomer.com (www.mangroomer.com) · "MANGROOMER - industry leader in men's grooming products" · US · Beauty & Skincare; bodygroomer.com (www.bodygroomer.com) · "MANGROOMER - BODY GROOMING \| The Future of Men's Body Grooming" · US |
| lawn mower trimmer | name | yes but irrelevant (2 garden-parts shops) | gomowerparts.com.au · NZ · Home & Garden; gomowerparts.co.nz · NZ · Home & Garden — the MANSCAPED "Lawn Mower" product does not resolve |
| tondeuse intime | name | yes (5) | clubcooper.com · "Tondeuse Intime Homme — Sans Coupure & Waterproof \| ClubCooper" · MT · Beauty & Skincare; billy-trimmer.com · "La tondeuse intime pour tous – Billy trimmer" · FR · Beauty & Skincare; nutss.fr · "Tondeuse intime homme & corps – sans coupure \| Nutss" · FR · Beauty & Skincare; wavyliss.com · "Wavyliss.® Kit Rituel Douceur \| Tondeuse Intime + Soin Comple" · FR · Fashion; coco-liss.com · "Coco Liss - La Tondeuse Intime Homme & Femme Sans Coupure" · FR · Beauty & Skincare |
| rasoir intime | name | yes (5) | maserenea.com (www.maserenea.com) · "Rasoir Intime Femme Sans Irritation \| MASERENEA™" · US · Health & Supplements; lumeziaa.com · "LUMÉZIA™ \| Rasoir intime premium pour femme – Lumézia" · US · Beauty & Skincare; kelyss.com · "Kelyss \| Rasoir intime femme 2-en-1 doux et efficace" · FR; a719d0-af.myshopify.com · "Rasoir intime pour hommes \| CocosPoilus - Sécurité et confiance. – CocosPoilus®" · FR · Health & Supplements; cocospoilus.fr · same title · FR · Beauty & Skincare |

## C. get_brand — every FR-based match and every clear body/intimate-trimmer seller

### billy-trimmer.com (FR)
```
Brand: billy-trimmer.com | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 26,792 | Products: 19 | Platform: shopify
Meta Ads: 52 active / 186 total | Listed: Nov 22, 2024 | country_code: FR
title: La tondeuse intime pour tous – Billy trimmer
description: La tondeuse intime anti-coupure pour hommes et femmes — billy. Lame céramique, 100% waterproof, anti-poil incarné. Maillot, pubis, testicules, bikini...
emails: []
```

### nutss.fr (FR)
```
Brand: nutss.fr | Niche: Beauty & Skincare | Status: Inactive
Monthly Visits: 0 | Products: 1 | Platform: shopify
Meta Ads: 0 active / 0 total | Listed: Jan 02, 2026 | country_code: FR
title: Tondeuse intime homme & corps – sans coupure | Nutss
description: Nutss : la tondeuse intime conçue pour éviter coupures et irritations. Rasage précis des zones sensibles, sans douleur. Livraison gratuite en France. Garantie 1 an.
```

### wavyliss.com (FR)
```
Brand: wavyliss.com | Niche: Fashion | Status: Active
Monthly Visits: 0 | Products: 13 | Platform: shopify
Meta Ads: 0 active / 64 total | Listed: Jan 23, 2026 | country_code: FR
title: Wavyliss.® Kit Rituel Douceur | Tondeuse Intime + Soin Comple
description: Kit Rituel Douceur Wavyliss — Tondeuse intime femme + huile apaisante + gant exfoliant + pochette. Peau douce, zéro irritation. Livraison gratuite. Garantie 30 jours.
```

### coco-liss.com (FR)
```
Brand: coco-liss.com | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 0 | Products: 1 | Platform: shopify
Meta Ads: 0 active / 0 total | Listed: Jul 17, 2026 | country_code: FR
title: Coco Liss - La Tondeuse Intime Homme & Femme Sans Coupure
description: La tondeuse intime homme & femme conçue pour un rasage sans coupure ni irritation. Étanche, lames en céramique, autonomie longue durée.
```

### kelyss.com (FR)
```
Brand: kelyss.com | Niche: (none) | Status: Active
Monthly Visits: 0 | Products: 3 | Platform: shopify
Meta Ads: 5 active / 6 total | Listed: Jul 31, 2026 | country_code: FR
title: Kelyss | Rasoir intime femme 2-en-1 doux et efficace
description: Découvrez le rasoir électrique femme Kelyss : un appareil 2-en-1, sans fil et waterproof, conçu pour raccourcir les poils longs puis raser les poils courts. Idéal pour le maillot, les aisselles, les jambes et les zones sensibles, à la maison ou sous la douche.
```

### cocospoilus.fr (FR)
```
Brand: cocospoilus.fr | Niche: Beauty & Skincare | Status: Inactive
Monthly Visits: 0 | Products: 1 | Platform: Shopify
Meta Ads: 0 active / 4 total | Listed: Jul 19, 2024 | country_code: FR
emails: info@cocospoilus.fr, info@cocospoilus.com
title: Rasoir intime pour hommes | CocosPoilus - Sécurité et confiance. – CocosPoilus®
description: Découvrez CocosPoilus, le rasoir intime parfait pour les hommes qui veulent se sentir en confiance. Grâce à sa lame en céramique, il garantit un rasage sans coupures et prend soin de vos cocos avec douceur et sécurité. Un design ergonomique pour une expérience unique. Prenez soin de vous et boostez votre confiance.
```

### a719d0-af.myshopify.com (FR — CocosPoilus myshopify mirror)
```
Brand: a719d0-af.myshopify.com | Niche: Health & Supplements | Status: Inactive
Monthly Visits: 0 | Products: 1 | Platform: Shopify
Meta Ads: 0 active / 0 total | Listed: Jul 19, 2024 | country_code: FR
title: Rasoir intime pour hommes | CocosPoilus - Sécurité et confiance. – CocosPoilus®
description: (identical to cocospoilus.fr)
```

### clubcooper.com (MT, sells to France)
```
Brand: clubcooper.com | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 3,435 | Products: 10 | Platform: shopify
Meta Ads: 0 active / 24 total | Listed: Jul 04, 2025 | country_code: MT
title: Tondeuse Intime Homme — Sans Coupure & Waterproof | ClubCooper
description: Tondeuse intime Cooper : lame céramique, 90 min d'autonomie, waterproof, 0 irritation. Design compact, livraison offerte en France. Commandez la vôtre.
```

### mightybull.co (US-listed, UK brand)
```
Brand: mightybull.co | Niche: Health & Supplements | Status: Inactive
Monthly Visits: 0 | Products: 1 | Platform: Shopify
Meta Ads: 0 active / 0 total | Listed: May 10, 2024 | country_code: US
title: UK's #1 Balls Trimmer – Precision Manscaping Tool for Men - The Tamer – Mighty Bull
description: Discover the UK's #1 voted men's balls trimmer with Mighty Bull's The Tamer™. The UK's favourite manscaped alternative, delivering a smooth, irritation-free shave with groin precision-engineered technology. As a UK-born and bred company, we bring you the best in balls grooming. Elevate your ball shaving routine today.
```

### balls.co (US)
```
Brand: balls.co | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 29,175 | Products: 23 | Platform: shopify
Meta Ads: 0 active / 6 total | Listed: Jan 03, 2020 | country_code: US
emails: hello@balls.co, shop@menballs.myshopify.com, help@balls.co
title: BALLS™ Body and Pubic Trimmer - Personal Grooming for Men and Women – Edward Ventures International LLC
description: Micro trimming ceramic blades for precise trimming. Quiet and cordless. 100% Waterproof, use it safely in the shower. Now in three new colors. Free shipping. Shop the Internet's best-loved body and pubic hair trimmer.
```

### manscaped-us.com (US)
```
Brand: manscaped-us.com | Niche: Beauty & Skincare | Status: Inactive
Monthly Visits: 873 | Products: 87 | Platform: Shopify
Meta Ads: 0 active / 0 total | Listed: Dec 05, 2025 | country_code: US
title: MANSCAPED® | The Leader in Men's Grooming Tools & Essentials | MANSCAP
description: MANSCAPED US
```

### bakblade.com (US)
```
Brand: bakblade.com | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 27,515 | Products: 4 | Platform: shopify
Meta Ads: 38 active / 38 total | Listed: Nov 03, 2017 | country_code: US
emails: wholesale@olsamgroup.com, contact@bakblade.com
title: BAKBLADE | description: BAKBLADE
```

### thebakblade.com (GB)
```
Brand: thebakblade.com | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 2,747 | Products: 14 | Platform: shopify
Meta Ads: 0 active / 0 total | Listed: Dec 12, 2025 | country_code: GB
title: BAKBLADE Body Grooming Co
description: Tame unruly back hair with BakBlade. Our innovative, do-it-yourself back shavers feature DryGlide technology and make BakBlade the best wet or dry shave solution for unwanted back and body hair
```

### mangroomer.com (US)
```
Brand: www.mangroomer.com (mangroomer.com) | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 8,206 | Products: 40 | Platform: shopify
Meta Ads: 0 active / 0 total | Listed: Oct 27, 2017 | country_code: US
emails: Info@mangroomer.com, sales@mangroomer.com
title: MANGROOMER - industry leader in men's grooming products
description: MANGROOMER, back hair shaver, body groomer and ball shavers, man wipes, biz wipes, nose trimmer, back shavers, man groomer, body groomers, body shaver, manscaping, manscape.
```

### bodygroomer.com (US)
```
Brand: www.bodygroomer.com (bodygroomer.com) | Niche: (none) | Status: Inactive
Monthly Visits: 1,966 | Products: 0 | Platform: shopify
Meta Ads: 0 active / 0 total | Listed: Jun 22, 2018 | country_code: US
title: MANGROOMER - BODY GROOMING | The Future of Men's Body Grooming
description: MANGROOMER - the industry leader for men's body grooming, manscaping, and body hair removal
```

### maserenea.com (US-listed, FR-language women's intimate razor)
```
Brand: www.maserenea.com (maserenea.com) | Niche: Health & Supplements | Status: Inactive
Monthly Visits: 0 | Products: 2 | Platform: Shopify
Meta Ads: 0 active / 30 total | Listed: Aug 29, 2025 | country_code: US
title: Rasoir Intime Femme Sans Irritation | MASERENEA™
description: Rasoir intime femme sans coupures ni irritations. Résultat doux et précis en quelques minutes. Étanche, sans douleur et facile à utiliser. Offre exclusive : -50% + Livraison gratuite.
```

### lumeziaa.com (US-listed, FR-language women's intimate razor)
```
Brand: lumeziaa.com | Niche: Beauty & Skincare | Status: Active
Monthly Visits: 0 | Products: 2 | Platform: shopify
Meta Ads: 0 active / 17 total | Listed: May 15, 2026 | country_code: US
title: LUMÉZIA™ | Rasoir intime premium pour femme – Lumézia
description: Découvrez LUMÉZIA™, le rasoir intime féminin premium conçu pour une peau douce, nette et sans irritation. Livraison rapide et garantie 30 jours.
```

## D. thomyle.com — Meta ads sorted by spend (get_brand_ads platform=meta sort_by=spend)

Result saved to a tool-results file and parsed with python. Top 20 of 1,063 ads. Every returned ad below.

pagination: {'page': 1, 'page_size': 20, 'total': 1063, 'total_pages': 54}

### Ad 24498181093113298 — brand thomyle.com
- headline/title: "Le Rasoir N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-07-13T07:00:00 | end: 2025-10-25T07:00:00 | days active (end-start+1): 105
- EU spend: 12117.34 € | EU reach: 1488527
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.
```

### Ad 907929188246851 — brand thomyle.com
- headline/title: "Le Rasoir N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-01-17T08:00:00 | end: 2026-05-23T07:00:00 | days active (end-start+1): 127
- EU spend: 3686.92 € | EU reach: 449461
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.
```

### Ad 1037119535253802 — brand thomyle.com
- headline/title: "Le Rasoir N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-06-18T07:00:00 | end: 2025-07-04T07:00:00 | days active (end-start+1): 17
- EU spend: 2916.74 € | EU reach: 355578
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.
```

### Ad 1741869303074724 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-07-31T07:00:00 | end: 2025-09-16T07:00:00 | days active (end-start+1): 48
- EU spend: 2838.60 € | EU reach: 350458
- landing url: not returned
- body text (verbatim):

```text
Tu veux qu’elle s’occupe bien de toi ? Commence par être agréable à s’occuper.
Parce qu’un rasage à sec, un vieux Bic, et des coupures sur les testicules… ça donne pas envie de te gâter.

👉 Le Fidèle, c’est la tondeuse pensée pour tes vraies zones sensibles :
✔️ Lames douces → zéro coupure
✔️ LED intégrée → tu vois ce que tu fais
✔️ 100 % étanche → sous la douche, en toute tranquillité
✔️ Et 120 minutes d’autonomie pour ne jamais être pris de court

💬 Résultat ?
Une peau douce. Un look clean. Une femme plus enthousiaste.
Et des moments intimes… beaucoup plus agréables.

🎁 En ce moment : -25 % + un cadeau offert
➡️ Clique ici pour raser net… et recevoir net.
```

### Ad 1749435982325968 — brand thomyle.com
- headline/title: "Le Rasoir N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-06-18T07:00:00 | end: 2025-07-03T07:00:00 | days active (end-start+1): 16
- EU spend: 2723.61 € | EU reach: 332908
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.
```

### Ad 776660794701468 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-12T07:00:00 | end: 2025-09-16T07:00:00 | days active (end-start+1): 36
- EU spend: 2447.79 € | EU reach: 301721
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 1660478448273374 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-02-06T08:00:00 | end: 2026-03-21T07:00:00 | days active (end-start+1): 44
- EU spend: 2371.97 € | EU reach: 289322
- landing url: not returned
- body text (verbatim):

```text
J’avais toujours peur de me couper.

À chaque rasage, j’étais en sueur.
Un faux mouvement… et c’était la catastrophe.

Résultat ?
Soit je prenais 20 minutes à stresser,
soit je laissais tomber.

Et dans tous les cas, c’était la galère.

Puis j’ai essayé Le Fidèle.

Dès la première utilisation, la différence est claire.
La lame SkinSafe anticoupure rassure immédiatement.
Impossible de se blesser.

Et comme il est étanche, je me rase sous la douche,
en 5 minutes chrono.

Aujourd’hui, plus de peur.
Plus de stress.
Juste un résultat propre et net.

–25% + cadeau offert en ce moment.
Essaye sans risque.
```

### Ad 1688251272320272 — brand thomyle.com
- headline/title: "Le rasoir intime n°1 en Europe"
- CTA: ORDER_NOW — "Order Now"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-06-15T07:00:00 | end: 2026-07-16T07:00:00 | days active (end-start+1): 32
- EU spend: 1978.10 € | EU reach: 241464
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.

👉 https://thomyle.com/products/rasoir-electrique-pour-homme-le-fidele
```

### Ad 1142182718009790 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-09-11T07:00:00 | end: 2025-11-07T08:00:00 | days active (end-start+1): 58
- EU spend: 1837.48 € | EU reach: 225923
- landing url: not returned
- body text (verbatim):

```text
Tu veux qu’elle s’occupe bien de toi ? Commence par être agréable à s’occuper.
Parce qu’un rasage à sec, un vieux Bic, et des coupures sur les testicules… ça donne pas envie de te gâter.

👉 Le Fidèle, c’est la tondeuse pensée pour tes vraies zones sensibles :
✔️ Lames douces → zéro coupure
✔️ LED intégrée → tu vois ce que tu fais
✔️ 100 % étanche → sous la douche, en toute tranquillité
✔️ Et 120 minutes d’autonomie pour ne jamais être pris de court

💬 Résultat ?
Une peau douce. Un look clean. Une femme plus enthousiaste.
Et des moments intimes… beaucoup plus agréables.

🎁 En ce moment : -25 % + un cadeau offert
➡️ Clique ici pour raser net… et recevoir net.
```

### Ad 1460017685004615 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-07-24T07:00:00 | end: 2026-06-15T07:00:00 | days active (end-start+1): 327
- EU spend: 1635.81 € | EU reach: 201465
- landing url: not returned
- body text (verbatim):

```text
Tu veux qu’elle s’occupe bien de toi ? Commence par être agréable à s’occuper.
Parce qu’un rasage à sec, un vieux Bic, et des coupures sur les testicules… ça donne pas envie de te gâter.

👉 Le Fidèle, c’est la tondeuse pensée pour tes vraies zones sensibles :
✔️ Lames douces → zéro coupure
✔️ LED intégrée → tu vois ce que tu fais
✔️ 100 % étanche → sous la douche, en toute tranquillité
✔️ Et 120 minutes d’autonomie pour ne jamais être pris de court

💬 Résultat ?
Une peau douce. Un look clean. Une femme plus enthousiaste.
Et des moments intimes… beaucoup plus agréables.

🎁 En ce moment : -25 % + un cadeau offert
➡️ Clique ici pour raser net… et recevoir net.
```

### Ad 2093676494451752 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: image | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-07-29T07:00:00 | end: 2025-09-21T07:00:00 | days active (end-start+1): 55
- EU spend: 1529.82 € | EU reach: 188126
- landing url: image_original_url=https://media4.brandsearch.co/resize/NvpKLBTdv4GciGT0dqd-7lcF8rm5MBuom46AQDF85dU/skp:jpg:png:webp:heic/exp:1788941015/bG9jYWw6Ly8vbWV0YS8yMDkzNjc2NDk0NDUxNzUyX29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 1496495494868237 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-05T07:00:00 | end: 2025-08-29T07:00:00 | days active (end-start+1): 25
- EU spend: 1378.56 € | EU reach: 169742
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 934268249557930 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-02-05T08:00:00 | end: 2026-05-24T07:00:00 | days active (end-start+1): 109
- EU spend: 1346.86 € | EU reach: 164374
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.
```

### Ad 1246562817303827 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-12-10T08:00:00 | end: 2025-12-20T08:00:00 | days active (end-start+1): 11
- EU spend: 1133.78 € | EU reach: 138808
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 777978368124116 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-05T07:00:00 | end: 2025-08-29T07:00:00 | days active (end-start+1): 25
- EU spend: 1115.64 € | EU reach: 137573
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 3926588350986596 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-12T07:00:00 | end: 2025-08-29T07:00:00 | days active (end-start+1): 18
- EU spend: 1004.89 € | EU reach: 123846
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 3493799437429866 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-12T07:00:00 | end: 2025-09-15T07:00:00 | days active (end-start+1): 35
- EU spend: 936.14 € | EU reach: 115436
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 2213048639457692 — brand thomyle.com
- headline/title: "Le Rasoir N°1 en Europe"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-06-15T07:00:00 | end: 2026-06-29T07:00:00 | days active (end-start+1): 15
- EU spend: 914.99 € | EU reach: 110984
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.
```

### Ad 790755407229940 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-09-11T07:00:00 | end: 2025-09-25T07:00:00 | days active (end-start+1): 15
- EU spend: 863.63 € | EU reach: 106144
- landing url: not returned
- body text (verbatim):

```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

### Ad 1105806901622065 — brand thomyle.com
- headline/title: "La Tondeuse N°1 en Europe"
- CTA: GET_OFFER — "Get Offer"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-09T07:00:00 | end: 2025-11-15T08:00:00 | days active (end-start+1): 99
- EU spend: 849.07 € | EU reach: 104171
- landing url: not returned
- body text (verbatim):

```text
Tu veux lui faire plaisir… mais t’as pas envie de mettre ta bouche sur un champ de bataille ?

Entre les poils trop longs, les boutons et les coupures, y’a de quoi perdre l’envie.

🎁 Offres-lui Le Fidèle™, la tondeuse qui va transformer sa zone sensible… et ton plaisir.

✔️ LED intégrée
✔️ Lames arrondies, zéro irritation/coupure
✔️ Étanche & facile à utiliser
✔️ 60 jours pour tester ou rembourser

👉 Tu penses que c’est pour lui ?
Tu verras très vite que c’est également pour toi.
Clique ici pour commander.
```

## E. thomyle.com — Meta ads sorted by recent (get_brand_ads platform=meta sort_by=recent)

pagination: page 1 / 54, page_size 20, total 1,063. All 20 ads: status **active**, platforms Facebook, Instagram, Audience_Network, Messenger, Threads, funnel_type product, landing url **not returned** (field absent; body copy D carries the product URL). Body texts are shared across ads — the six distinct bodies are given verbatim once (A–F) and referenced per ad.

### Distinct body texts (verbatim)

**Copy A** (rentrée variant)
```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale rentrée  : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

**Copy B** (été variant — identical to A except the offer line)
```text
Marre des rasoirs qui coupent et irritent ?
Le Fidèle™ est la solution idéale ! 💡

Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, parfait à utiliser sous la douche 💦.
Plus de confort, zéro poil qui traîne.

Pourquoi choisir Le Fidèle™ ? 🚀
• Lame SkinSafe : zéro coupure, zéro poil incarné.
• LED intégrée : précision maximale.
• Étanche : rasage propre sous la douche.

✅ Déjà plus de 10 000 hommes conquis.
🎁 Offre Spéciale Été : -25 % + 1 cadeau offert.

Vos parties méritent mieux 👉 Profitez-en maintenant sur Thomyle.com !
```

**Copy C** (promo code)
```text
Nos plus grosses réductions de l'année !
Maintenant -20 % sur tout avec le code "THOMYLE20"
```

**Copy D** (product-link variant)
```text
Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 Conçu pour offrir une protection optimale, ce rasoir garantit un rasage doux et sans coupures, même dans les zones les plus sensibles.

Totalement étanche, il est parfait à utiliser sous la douche 💦, pour un confort inégalé. Pourquoi choisir Le Fidèle™ ? 🚀

Nouvelle technologie : Dites adieu aux irritations.
Étanche : Rasage pratique sous la douche.

👉 https://thomyle.com/products/rasoir-electrique-pour-homme-le-fidele
```

**Copy E** (SUMMER20)
```text
🔥 Fini les coupures là où ça fait mal.

Le Fidèle, c'est la tondeuse pensé pour les zones sensibles :

✅ Lames sécurisées
✅ Rasage précis avec lumière LED
✅ Étanche et sans irritation

🎁 Et en ce moment, tu profites de -20% supplémentaires avec le code SUMMER20

➡ Fais-toi plaisir… ou fais-lui plaisir. Offre limitée !
```

**Copy F** (English)
```text
Tired of razors that cut and irritate?
Discover Le FidèleTM, the ultimate solution! 💡

Say goodbye to cuts and ingrown hairs with our SkinSafe blade. Plus, LED light for maximum precision.

 Waterproof design makes it perfect for shower use 💦.
Get more comfort, zero stray hairs!

Why choose Le FidèleTM? 🚀
• No cuts, no ingrowns 
• Maximum precision
• Clean shave in the shower 

Over 10,000 men already conquered!
 Limited time offer: -25% + free gift 🎁

Your skin deserves better 👉 Get yours now on Thomyle.com!
```

### The 20 "recent" ads

| # | ad id | headline | CTA type — text | format | start | end | days active | EU spend | EU reach | status | body | landing url |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1023964803791266 | La Tondeuse N°1 en Europe | LEARN_MORE — "Learn More" | video | 2026-08-05 | 2026-08-20 | 16 | 0.58 € | 71 | active | Copy A | not returned |
| 2 | 1700604271232623 | La Tondeuse N°1 en Europe | GET_OFFER_VIEW — "Get offer" | image | 2026-08-06 | 2026-08-21 | 16 | 0.61 € | 75 | active | Copy C | not returned |
| 3 | 2494110341012327 | La Tondeuse N°1 en Europe | GET_OFFER_VIEW — "Get offer" | image | 2026-08-05 | 2026-08-20 | 16 | 0.75 € | 92 | active | Copy C | not returned |
| 4 | 1080550514496470 | Le rasoir intime n°1 en Europe | ORDER_NOW — "Order now" | video | 2026-08-05 | 2026-08-20 | 16 | 0.77 € | 95 | active | Copy D | in body: https://thomyle.com/products/rasoir-electrique-pour-homme-le-fidele |
| 5 | 1018525434486207 | La Tondeuse N°1 en Europe | GET_OFFER — "Get Offer" | image | 2026-08-05 | 2026-08-21 | 17 | 1.17 € | 143 | active | Copy E | not returned |
| 6 | 2116118175947580 | La Tondeuse N°1 en Europe | GET_OFFER — "Get Offer" | image | 2026-08-05 | 2026-08-20 | 16 | 1.28 € | 158 | active | Copy B | not returned |
| 7 | 1410541194285029 | Le rasoir intime n°1 en Europe | ORDER_NOW — "Order now" | video | 2026-08-05 | 2026-08-21 | 17 | 1.23 € | 149 | active | Copy D | in body (product URL) |
| 8 | 1374242160934470 | La Tondeuse N°1 en Europe | GET_OFFER — "Get offer" | image | 2026-08-17 | 2026-08-17 | 1 | not returned | not returned | active | Copy B | not returned |
| 9 | 27921314694188625 | Le rasoir intime n°1 en Europe | ORDER_NOW — "Order Now" | video | 2026-08-05 | 2026-08-21 | 17 | 1.67 € | 205 | active | Copy D | in body (product URL) |
| 10 | 1704128800864533 | La Tondeuse N°1 en Europe | GET_OFFER — "Get Offer" | image | 2026-08-05 | 2026-08-20 | 16 | 2.01 € | 247 | active | Copy B | not returned |
| 11 | 1301768585366098 | La Tondeuse N°1 en Europe | GET_OFFER — "Get Offer" | video | 2026-08-05 | 2026-08-20 | 16 | 2.47 € | 303 | active | Copy B | not returned |
| 12 | 1524434662250737 | La Tondeuse N°1 en Europe | GET_OFFER_VIEW — "Get offer" | image | 2026-08-05 | 2026-08-21 | 17 | 2.23 € | 274 | active | Copy C | not returned |
| 13 | 1721738592278106 | La Tondeuse N°1 en Europe | GET_OFFER — "Get Offer" | image | 2026-08-05 | 2026-08-21 | 17 | 3.18 € | 391 | active | Copy B | not returned |
| 14 | 874087968891065 | Le rasoir intime n°1 en Europe | ORDER_NOW — "Order now" | video | 2026-08-05 | 2026-08-21 | 17 | 3.72 € | 455 | active | Copy D | in body (product URL) |
| 15 | 1345238177769703 | La Tondeuse N°1 en Europe | GET_OFFER_VIEW — "Get offer" | image | 2026-08-05 | 2026-08-21 | 17 | 4.77 € | 585 | active | Copy C | not returned |
| 16 | 1068210535582000 | La Tondeuse N°1 en Europe | LEARN_MORE — "Learn more" | image | 2026-08-10 | 2026-08-10 | 1 | not returned | not returned | active | Copy C | not returned |
| 17 | 918070254670652 | La Tondeuse N°1 en Europe | GET_OFFER — "Get Offer" | image | 2026-08-05 | 2026-08-21 | 17 | 3.00 € | 367 | active | Copy F | not returned |
| 18 | 3366993820146895 | La Tondeuse N°1 en Europe | GET_OFFER — "Get offer" | video | 2026-08-12 | 2026-08-12 | 1 | not returned | not returned | active | Copy B | not returned |
| 19 | 1531363598738260 | Le rasoir intime n°1 en Europe | ORDER_NOW — "Order now" | video | 2026-08-05 | 2026-08-20 | 16 | 17.41 € | 2,134 | active | Copy D | in body (product URL) |
| 20 | 2013852465902153 | La Tondeuse N°1 en Europe | LEARN_MORE — "Learn More" | image | 2026-08-05 | 2026-08-21 | 17 | 15.78 € | 1,933 | active | Copy C | not returned |

## F. thomyle.com — get_brand_ads_aggregates (platform meta, all-time)

```json
{
  "brand_id": "thomyle.com",
  "platform": "meta",
  "window": {"from": null, "to": null, "ad_count": 1063},
  "media_mix": {"video": 790, "image": 273},
  "funnel_mix": {"product": 603, "unknown": 460},
  "language_mix": {"fr": 1054, "en": 8, "unknown": 1},
  "cta_breakdown": {"GET_OFFER": 2062, "GET_OFFER_VIEW": 337, "SHOP_NOW": 557, "LEARN_MORE": 232, "ORDER_NOW": 56, "SEE_DETAILS": 45},
  "demography": {"gender": {"All": 1041, "unknown": 22}, "age": {"18": 1041, "65": 1041, "unknown": 22}, "country": {}},
  "spend_summary": {
    "ad_count": 1063,
    "eu_total_spend": 97741.09001626633,
    "avg_eu_total_spend": 93.89153699929523,
    "max_eu_total_spend": 12117.33984375,
    "eu_total_reach": 11973023,
    "avg_eu_total_reach": 11501.463016330452,
    "max_eu_total_reach": 1488527
  }
}
```

## G. thomyle.com — get_products (product_type all)

Bestsellers (rank as reported):

| rank | id | title | price | url | created_at | vendor |
|---|---|---|---|---|---|---|
| 1 | 8230380830915 | Le Fidèle™ - Un rasage intime sûr, doux et sans irritation | 119.9 EUR | https://thomyle.com/products/le-fidele™-un-rasage-intime-doux-sur-et-sans-irritation-copie | 2025-12-08 | THOMYLE |
| 2 | 8051340280003 | Le Fidèle™ - Votre allié idéal pour un rasage intime impeccable | 49.9 EUR | https://thomyle.com/products/rasoir-electrique-pour-homme-le-fidele | 2024-10-04 | THOMYLE |
| 3 | 8233638133955 | Kit "L'essentiel" | 99.9 EUR | https://thomyle.com/products/kit-lindispensable | 2026-01-02 | Thomyle |
| 4 | 8233636921539 | Kit Barbe & visage | 119.9 EUR | https://thomyle.com/products/kit-barbe | 2026-01-02 | Thomyle |
| 6 | 8233632628931 | Shaver | 49.9 EUR | https://thomyle.com/products/shaver | 2026-01-02 | Thomyle |
| 7 | 8233632596163 | Rasoir lame finition | 19.9 EUR | https://thomyle.com/products/rasoir-lame-finition | 2026-01-02 | Thomyle |
| 8 | 8233632530627 | Tondeuse nez | 24.9 EUR | https://thomyle.com/products/tondeuse-nez | 2026-01-02 | Thomyle |
| 9 | 8233632465091 | Tondeuse finition barbe | 39.9 EUR | https://thomyle.com/products/tondeuse-finition-barbe | 2026-01-02 | Thomyle |
| 10 | 8229598101699 | Assurance colis | 9.0 EUR | https://thomyle.com/products/assurance-colis-1 | 2025-12-01 | Thomyle |
| 11 | 8229597905091 | 3x Lames de rasage ( 6 mois ) | 29.9 EUR | https://thomyle.com/products/lame-de-rasage-le-fidele-copie | 2025-12-01 | Thomyle |

Latest (additional to the above): 8233638166723 · Kit Full Grooming · price 0.0 USD (as reported) · https://thomyle.com/products/kit-full-grooming · 2026-01-02 · Thomyle · rank null. (No rank 5 was returned; product_type="" on all rows.)

## H. search_meta_ads — FR, sort_by spend, max_ads_per_brand 3

| q | country_code | sort_by | max_ads_per_brand | result |
|---|---|---|---|---|
| tondeuse intime | FR | spend | 3 | **0 ads** — `{"pagination": {"page": 1, "page_size": 20, "total": 0, "total_pages": 1}, "data": []}` |
| rasage intime homme | FR | spend | 3 | **0 ads** — same empty result |
| tondeuse corps homme | FR | spend | 3 | **0 ads** — same empty result |
| poils incarnés homme | FR | spend | 3 | **0 ads** — same empty result |
| tondeuse testicules | FR | spend | 3 | **0 ads** — same empty result |

All five queries returned zero rows.

## I. discover_meta_ads — niche "Beauty & Skincare", limit 30

Tool has no `country_code` parameter, so the requested FR filter could not be applied; this is the niche-only sample (English-default discovery prefilter). Result saved to a tool-results file and parsed with python; every one of the 30 rows below (landing url field absent on every row).

seed: None count: 30

### Ad 1303858511833292 — brand lipsmart.com
- headline/title: "Nourished Lips In 60 Seconds"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: deleted | funnel: homepage | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-05-01T07:00:00 | end: 2026-05-24T07:00:00 | days active (end-start+1): 24
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media10.brandsearch.co/resize/ViRPm6ySQklP5SjBEWoaKYUDl2XHivQZZOakEX6aRPI/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xMzAzODU4NTExODMzMjkyX29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
See what everyone is talking about. Hydrated, nourished lips in just 60 seconds. The secret? LIPSMART.💋
```

### Ad 1638428700484938 — brand cascadiaskincare.com
- headline/title: "Bulk Bar"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: deleted | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, THREADS
- start: 2026-03-06T08:00:00 | end: 2026-03-10T07:00:00 | days active (end-start+1): 5
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media4.brandsearch.co/resize/PD_EZhg5f-APr1Up8eriY0rkxtsrwFLJBn97KtXzdc4/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xNjM4NDI4NzAwNDg0OTM4X29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
Natural Wellness - Since 1990. Botanical Infused skincare and all natural soap handmade in the pacific north west.
```

### Ad 1377134187781479 — brand musefile.com
- headline/title: "Muse File"
- CTA: SHOP_NOW — "Shop now"
- format: image | status: inactive | funnel: collection | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-04-24T07:00:00 | end: 2026-06-27T07:00:00 | days active (end-start+1): 65
- EU spend: 47.10 € | EU reach: 4096
- landing url: image_original_url=https://media4.brandsearch.co/resize/H4WtoMj4DYf8AfzUamUe96ClycU4vqac850oGg36pY4/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xMzc3MTM0MTg3NzgxNDc5X29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
🌸 SPRING FLING SALE IS HERE 🌸

Our Dust Extractor and Ultrasonic Cleaner are now at their lowest prices ever 👀 Plus, we’ve sneaked in a few extra bits with up to 55% OFF 🙌🏼

This is your sign to treat yourself today✨

Shop now whilst stocks last☀️
```

### Ad 1095995492272746 — brand us.orveda.com
- headline/title: "Pre And Post Procedure Routine - Skin Care Routine - Orveda"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER
- start: 2024-12-13T08:00:00 | end: 2025-03-12T07:00:00 | days active (end-start+1): 90
- EU spend: 4881.47 € | EU reach: 485718
- landing url: image_original_url=https://media4.brandsearch.co/resize/D4IobsGN0x4qLnxFrrDNAUyIj2EMvRAhHPPUOjKiwX4/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xMDk1OTk1NDkyMjcyNzQ2X29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
The French green bio-tech skincare brand that works on the past, the present and the future of the skin.
```

### Ad 1251264576867319 — brand flowhaircare.com
- headline/title: "Detangling Treatment, 6 fl oz"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: active | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-01-22T08:00:00 | end: 2026-03-19T07:00:00 | days active (end-start+1): 57
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media4.brandsearch.co/resize/gra6ZmLhrz7uW6KztqOjfwgXFqA67vsjUCg5iIZxgdw/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xMjUxMjY0NTc2ODY3MzE5X29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
Still thinking about Flow? 
It's time to give your hair the TLC it deserves!
Say goodbye to bad hair days and hello to a gorgeous you! What are you waiting for?
```

### Ad 961740439785000 — brand tattilashes.com
- headline/title: null
- CTA: SHOP_NOW — "Shop now"
- format: video | status: active | funnel: collection | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-05-14T07:00:00 | end: 2026-05-23T07:00:00 | days active (end-start+1): 10
- EU spend: 717.06 € | EU reach: 62353
- landing url: not returned
- body text (verbatim):

```text
Stop stressing about falling lashes and messy glue. Our Pre-Glued Clusters are designed for the girlies on the go. Whether you’re hitting a PB in the gym, heading into back-to-back meetings or jetting off on holiday, these lashes are secured for 5-10 days! 

#TattiLashes #LashHacks #MorningRoutine #GymProofLashes #ClusterLashes #DIYExtensions
```

### Ad 1477669777703833 — brand lunacosoap.com
- headline/title: "Meet the Goddess Collection"
- CTA: SHOP_NOW — "Shop now"
- format: image | status: deleted | funnel: collection | platforms: FACEBOOK, INSTAGRAM, MESSENGER, THREADS
- start: 2026-03-09T07:00:00 | end: 2026-03-13T07:00:00 | days active (end-start+1): 5
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media4.brandsearch.co/resize/qCYgSWlJNFSimeS4XbYeSW2iOx6t0abgfDqicR44Juw/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xNDc3NjY5Nzc3NzAzODMzX29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
Every bar is handcrafted in small batches with natural botanicals that leave your skin soft, clean, and glowing.
```

### Ad 959828189857165 — brand hairhouse.com.au
- headline/title: "Blow Dry from $50"
- CTA: BOOK_TRAVEL — "Book Now"
- format: video | status: active | funnel: lp | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-04-21T07:00:00 | end: 2026-06-26T07:00:00 | days active (end-start+1): 67
- EU spend: not returned | EU reach: not returned
- landing url: not returned
- body text (verbatim):

```text
Let this be your sign to book your next hair appointment…
🌟 100+ stores across Australia
🌟 Home of 200+ Professional Brands
🌟 Expert Haircare advice you can trust
T&Cs apply.
```

### Ad 931640563084082 — brand zahrax.com
- headline/title: "Get yours now"
- CTA: GET_OFFER_VIEW — "Get offer"
- format: image | status: deleted | funnel: collection | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-04-26T07:00:00 | end: 2026-06-01T07:00:00 | days active (end-start+1): 37
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media4.brandsearch.co/resize/VZ2ZuzM9trYBjfzVjlWWBr6gkLmMPkVZ0f2lCQHjda0/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS85MzE2NDA1NjMwODQwODJfb3JpZ2luYWwuanBn
- body text (verbatim):

```text
Same scent, different price. Get yours now: https://zahrax.com/collections/bundles
```

### Ad 2019692882190892 — brand beautybyshemoore.co.uk
- headline/title: "Grow Your Hair Naturally"
- CTA: BOOK_TRAVEL — "Book now"
- format: video | status: inactive | funnel: facebook | platforms: FACEBOOK, INSTAGRAM
- start: 2025-10-12T07:00:00 | end: 2025-10-22T07:00:00 | days active (end-start+1): 11
- EU spend: 4.77 € | EU reach: 415
- landing url: not returned
- body text (verbatim):

```text
💉 PRP for thinning hair? Yes, it works!
✔ Stimulates hair growth
✔ Long-lasting, natural results

⚡ Discount Ends Oct 30!
📍Based in Wolverhampton 
📞 Call now for your FREE consultation: 07903 880121

#BeautyByShemoore #PRPHair #HairRestoration #HairGrowthJourney #ThinningHairSolutions #NaturalResults #NurseLedCare
```

### Ad 26389815880654713 — brand juviasplace.com
- headline/title: "The Nubian Loose Highlighter - Nubia"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: deleted | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-02-26T08:00:00 | end: 2026-03-31T07:00:00 | days active (end-start+1): 34
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media4.brandsearch.co/resize/HH2ZZnvtDc5Y2K-SBF0CLxBixtumzyuCva_IZkvsYuo/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8yNjM4OTgxNTg4MDY1NDcxM19vcmlnaW5hbC5qcGc
- body text (verbatim):

```text
Find your perfect match from Juvia's Place. Shop the full collection now at juviasplace.com.
```

### Ad 1407950700263867 — brand silverstoneapothecary.com
- headline/title: "Curl Care made with Clean Chemistry"
- CTA: SHOP_NOW — "Shop Now"
- format: video | status: active | funnel: collection | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, THREADS
- start: 2026-02-16T08:00:00 | end: 2026-08-21T07:00:00 | days active (end-start+1): 187
- EU spend: not returned | EU reach: not returned
- landing url: not returned
- body text (verbatim):

```text
Long-lasting curl definition and frizz control without the crunch? Yes, please!

This is THE gel for fine curls that get weighed down with too many products. It gives you a strong cast so your clumps stay together and defined, but scrunches out to soft, touchable curls that will last for days.

The Mystic Aura Strong-Hold Gel is:
✨ Oil-Free
✨ Protein-free
✨ Fragrance-free

And offers:
✨ Humidity protection
✨ Frizz control
✨ Long-lasting hold
✨ Soft, touchable curls
```

### Ad 1777664126967395 — brand goldenstarbeauty.com
- headline/title: "Summer Sale"
- CTA: SHOP_NOW — "Shop now"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-07-29T07:00:00 | end: 2025-08-01T07:00:00 | days active (end-start+1): 4
- EU spend: 35.03 € | EU reach: 4346
- landing url: not returned
- body text (verbatim):

```text
Wake up every morning with smooth, frizz-free, and healthy hair that stays perfectly styled!
```

### Ad 2167544030681605 — brand povbeauty.com
- headline/title: "made for mature skin."
- CTA: SHOP_NOW — "Shop Now"
- format: video | status: active | funnel: collection | platforms: FACEBOOK, INSTAGRAM, MESSENGER, THREADS
- start: 2026-02-27T08:00:00 | end: 2026-05-10T07:00:00 | days active (end-start+1): 73
- EU spend: not returned | EU reach: not returned
- landing url: not returned
- body text (verbatim):

```text
Meet the Snatch It duo. Targeted treatments to help firm, smooth and prep. Your skin will thank you.
```

### Ad 2021132131951999 — brand image-ads.com
- headline/title: "Instant Results After 1st Use"
- CTA: SHOP_NOW — "Shop now"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-01-29T08:00:00 | end: 2026-03-03T08:00:00 | days active (end-start+1): 34
- EU spend: 540.04 € | EU reach: 46327
- landing url: not returned
- body text (verbatim):

```text
Ladies, can we stop pretending we don’t shave our faces? 🙃
We shave our legs. Our underarms. But our faces? Taboo.
The truth? Dermaplaning is skincare that actually works.

1️⃣ Removes peach fuzz & dead skin for instant smoothness
2️⃣ Reveals brighter, more even-looking skin
3️⃣ No redness, irritation, or downtime
4️⃣ Makeup glides on flawlessly (no more cakey foundation)

It’s not weird. It’s skincare that actually works.
Because glowing skin shouldn’t be a secret. 💛

The hair will not grow back thicker, longer or stubbly. 
Backed by our full 60-Day Money-Back Guarantee
Learn more information
```

### Ad 752476034301863 — brand somaactive.com
- headline/title: "20% OFF Your FIRST Online Order"
- CTA: None — null
- format: image | status: inactive | funnel: homepage | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-13T07:00:00 | end: 2025-08-26T07:00:00 | days active (end-start+1): 14
- EU spend: 2.60 € | EU reach: 527
- landing url: image_original_url=https://media3.brandsearch.co/resize/k3M1TDFHChMC2TJ6o7mZi9UDCWyk_VkMFelJcctsUs0/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS83NTI0NzYwMzQzMDE4NjNfb3JpZ2luYWwuanBn
- body text (verbatim):

```text
First order? Get 20% off your entire purchase! Use code WELCOME20 and shop with us today!
```

### Ad 904014235853031 — brand clearjellystamper.com
- headline/title: "Our clear stamping system lets you see exactly where your design lands — so every look comes out crisp, clean, and perfectly placed."
- CTA: SHOP_NOW — "Shop Now"
- format: video | status: deleted | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-03-05T08:00:00 | end: 2026-03-15T07:00:00 | days active (end-start+1): 11
- EU spend: not returned | EU reach: not returned
- landing url: not returned
- body text (verbatim):

```text
Discover why Clear Jelly Stamper is Changing the Game for Nail Art

Tired of guessing where your design will land? 
We were too. That’s why we invented the original crystal-clear stamper—so you can stamp with confidence, precision, and zero guesswork. 💖
Just perfectly placed, professional-looking nail art—every single time. 💅

 ✔️ 600+ original layered stamping plates
 ✔️ 300+ pigmented stamping polishes
 ✔️ Beginner friendly & pro loved
 ✔️ Free shipping over $125

Competing Brands:

❌Most stamping brands use close-ended stampers, which leads to reduced visibility -This makes placement frustrating, time-consuming, and often inaccurate—especially for beginners.
❌Standard nail brands offer copycat concepts at the loss of originality, quality, and layering precision

What's Our Secret? 

✅We use crystal clear open-ended stampers,  ensuring maximum view and perfect placement. -Our lens clarity offers true 360° visibility—no distortion, no refraction.
✅We provide a complete stamping system—plates, polishes, and tools that work together at exceptional quality, giving you confidence, control, and beautiful results without the guesswork 

⭐⭐⭐⭐⭐
“Brilliant products, even more brilliant company! … high quality nail art for everyone—especially those of us that can't draw.”
– Mac McLernon

Please enjoy 15% off your order using code GOSTAMP
www.clearjellystamper.com

✔️Free shipping over $125
✔️Beginner Friendly & Pro Approved
✔️Always the Best Quality

We’re excited to welcome you to the Clear Jelly Stamper Family!

Debbie Duxbury
Founder, Clear Jelly Stamper
```

### Ad 938271321976532 — brand lolasbeautytreasure.com
- headline/title: null
- CTA: VIEW_INSTAGRAM_PROFILE — "Visit Instagram profile"
- format: video | status: deleted | funnel: instagram | platforms: INSTAGRAM
- start: 2026-02-04T08:00:00 | end: 2026-02-08T08:00:00 | days active (end-start+1): 5
- EU spend: not returned | EU reach: not returned
- landing url: not returned
- body text (verbatim):

```text
New Character Unlocked 🌸 

Wig: Tamara + Flawless Curl  @lolasbeautytreasure
```

### Ad 880944578255904 — brand dannysbeauty.com
- headline/title: null
- CTA: VIEW_INSTAGRAM_PROFILE — "Visit Instagram profile"
- format: image | status: active | funnel: instagram | platforms: INSTAGRAM
- start: 2026-01-29T08:00:00 | end: 2026-02-03T08:00:00 | days active (end-start+1): 6
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media4.brandsearch.co/resize/qXtmCS3sAoZfaLvaapJ1Fx5ypxRQKxcRJnaiFQ9EOpI/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS84ODA5NDQ1NzgyNTU5MDRfb3JpZ2luYWwuanBn
- body text (verbatim):

```text
Danny’s RAW BUNDLES. One of the Best bundles in OHIO. . 🚨STAY TUNED FOR OUR VALENTINES GIVEWAY, 3 Beautiful customers will be spoiled and treated like a QUEEN. 👸🏽 👸🏿💅💆🏾‍♀️
```

### Ad 1389334372904430 — brand kmellia.com
- headline/title: "Glam Up Your Hair 💋"
- CTA: SHOP_NOW — "Shop now"
- format: video | status: active | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-12-04T08:00:00 | end: 2026-02-08T08:00:00 | days active (end-start+1): 67
- EU spend: not returned | EU reach: not returned
- landing url: not returned
- body text (verbatim):

```text
The price of this scrunchie is what you pay. But do you ever wonder how much goes into making the products you love?
 
I often - rightfully - get asked. What warrants the price of your products? It's "hors de prix". Why don't you come up with a cheaper range, so you could sell more?! 

The truth is, as a French designer, I really value haute-couture, quality and craftsmanship. I don't care about how many pieces I can sell, I care about what pieces I sell and to whom.

The French really value the savoir-faire that goes into making the iconic pieces they love. Delicate pastries that melt in your mouth, sexy perfumes that awaken your confidence, accessories that look irresistibly YOU!

So today, I am very excited to be taking you backstage with me. You will experience first hand how your Bijou is carefully made so you can keep shining bright like the diamond that you are ✨

XO Camille
```

### Ad 1476079600648727 — brand pmdbeauty.com
- headline/title: "Try it 30% OFF"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: active | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-05-07T07:00:00 | end: 2026-07-19T07:00:00 | days active (end-start+1): 74
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media10.brandsearch.co/resize/yevrIbrLjmCMOMWdqk3J2zo0JrafbrezW5v_O6p1vsQ/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xNDc2MDc5NjAwNjQ4NzI3X29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
This Lifting Massage Band is a non-invasive, hands-free device that uses microcurrent, vibration, and lightweight compression to contour the jawline, improve firmness, and reduce puffiness in just 10 minutes. The adjustable fit and power pod placement allow you to customize comfort and target specific areas. 
It delivers visible improvements after one use and more dramatic results over time.

It’s great for:

* Sagging Skin
* Double Chin
* Loss of Firmness
* Elasticity
* Puffiness
* Poor Circulation
* Lymphatic Buildup
* Tension in Jaws and Cheeks

It also has a 20 year warranty!
```

### Ad 1423530942741505 — brand nishihairextensions.com
- headline/title: null
- CTA: LEARN_MORE — "Learn more"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2026-01-22T08:00:00 | end: 2026-01-24T08:00:00 | days active (end-start+1): 3
- EU spend: 5.80 € | EU reach: 504
- landing url: not returned
- body text (verbatim):

```text
“My hair doesn’t grow… and I don’t know why”

That’s the sentence I hear over and over

You’re doing everything right:
• you oil your scalp
• you switch products
• you try to be patient
• you even take breaks

But somehow…
• your hair still feels thin
• your ends keep breaking
• your length never changes
• and every year, it feels like you’re back at square one

Here’s the truth most people don’t realize:

Your hair is growing
You’re just not keeping it

And no one ever teaches you how to 

I kept hearing:

“My hair just doesn’t grow”

So I created one clear system that shows you:
• how to support growth
• how to build thickness
• how to stop losing progress
• how to maintain your hair long-term

No trends
No confusion
No guessing

The Fuller Hair Formula is for people who are tired of wondering why their hair won’t change

It’s finally live ✨
$7.99 launch price for 48 hours only

If you’ve ever said “I want my hair to grow,” this was made for you

Link in bio 🔗 

#HairGrowthJourney #FullerHair #HealthyHairHabits
```

### Ad 679629548497195 — brand us.vueskin.com
- headline/title: "From Oily Nose to Clear Skin"
- CTA: LEARN_MORE — "Learn more"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-09-24T07:00:00 | end: 2026-05-07T07:00:00 | days active (end-start+1): 226
- EU spend: 3584.00 € | EU reach: 387340
- landing url: not returned
- body text (verbatim):

```text
From visible and clogged pores to a clear nose 👃💕

Add this nose patch to your routine for clear and healthy pores 😊

30% OFF - https://vueswiss.com/products/hydrocolloid-nose-patches

Try today with a 60-day money-back guarantee! 🤩👇🏼
```

### Ad 4364665170445126 — brand yorkshiresharpening.co.uk
- headline/title: null
- CTA: MESSAGE_PAGE — "Send message"
- format: image | status: inactive | funnel: lp | platforms: FACEBOOK, INSTAGRAM, MESSENGER
- start: 2026-03-25T07:00:00 | end: 2026-04-02T07:00:00 | days active (end-start+1): 9
- EU spend: 453.27 € | EU reach: 39415
- landing url: image_original_url=https://media4.brandsearch.co/resize/vtqtkfc6SuDVSINeh4d49fK5g3cAoJb--lHhYJg12rc/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS80MzY0NjY1MTcwNDQ1MTI2X29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
✂️🐾 Dog Groomers - Professional Sharpening at Your Door 🚐

Dull tools slow you down, pull coats, and leave uneven finishes — not ideal for you or your furry clients.

At Yorkshire Sharpening we specialise in professional sharpening for dog grooming equipment, including:

✔️ Clipper Blades 
✔️ Grooming scissors - Straights, curved, thinners, chunkers 
✔️ Servicing of clippers 

✨ Precision sharpening for a smooth, clean cut
✨ Extend the life of your tools
✨ Fast turnaround times
✨ Mobile / postal service available

📩 Message us to book

📍 Serving:  Yorkshire, North Notts, Lancashire and parts of County Durham for the mobile service and nationwide postal
*The mobile service is subject to a minimum requirement.
```

### Ad 685807781251687 — brand us.vueskin.com
- headline/title: "BLACK FRIDAY SALE 🖤"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-10-31T07:00:00 | end: 2026-02-15T08:00:00 | days active (end-start+1): 108
- EU spend: 5171.35 € | EU reach: 559622
- landing url: image_original_url=https://media4.brandsearch.co/resize/5hfWSeO09Qhv7RmitKCVKSb5GmhsvNfjmMp-ObP7Gsg/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS82ODU4MDc3ODEyNTE2ODdfb3JpZ2luYWwuanBn
- body text (verbatim):

```text
BLACK FRIDAY is HERE 🖤
Clear pores, smooth skin, hydrated glow 
Vue’s favorites are up to 45% off. 

👉  https://vueswiss.com/products/hydrocolloid-nose-patches
```

### Ad 1155431599964158 — brand velvetacare.net
- headline/title: "Tired of broken, peeling nails? 💔 Try this. 💅✅"
- CTA: SHOP_NOW — "Shop Now"
- format: video | status: deleted | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-08-01T07:00:00 | end: 2025-08-02T07:00:00 | days active (end-start+1): 2
- EU spend: 7.44 € | EU reach: 784
- landing url: not returned
- body text (verbatim):

```text
I was this close to giving up on my nails 💔
Peeling, brittle, dry — nothing worked… until I found this little pen ✨🖊️
Packed with natural oils 🌿, it actually helps your nails grow back stronger 💅
Twist, brush, massage — done in 30 seconds ⏱️
If your nails are breaking for no reason, try this. You’ll see the difference in days 🔥
```

### Ad 873464881922898 — brand ebboceanclub.com
- headline/title: "Detangling Tonic Spray"
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: active | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, THREADS
- start: 2025-11-26T08:00:00 | end: 2026-05-29T07:00:00 | days active (end-start+1): 185
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media3.brandsearch.co/resize/_mKoBtpQhvDxdqxujJE-Z02cYnhiXMuzbOC1batvDhw/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS84NzM0NjQ4ODE5MjI4OThfb3JpZ2luYWwuanBn
- body text (verbatim):

```text
Introducing Ebb Ocean Club. Performance haircare that repairs and protects your strands from every element. Silicone-free and plant based.
```

### Ad 1252076086860964 — brand pcmc.co.nz
- headline/title: "Meet one of New Zealand’s leading Professional Clinic Ranges. Now 20% off."
- CTA: SHOP_NOW — "Shop Now"
- format: image | status: deleted | funnel: collection | platforms: FACEBOOK, INSTAGRAM, MESSENGER
- start: 2026-02-28T08:00:00 | end: 2026-03-15T07:00:00 | days active (end-start+1): 16
- EU spend: not returned | EU reach: not returned
- landing url: image_original_url=https://media4.brandsearch.co/resize/_5z5Cjk5528SURgm9y32t9yj6xp3BdrF3SwgVjJtL-w/skp:jpg:png:webp:heic/exp:1788941034/bG9jYWw6Ly8vbWV0YS8xMjUyMDc2MDg2ODYwOTY0X29yaWdpbmFsLmpwZw
- body text (verbatim):

```text
For a limited time, enjoy 20% OFF all Juvenate Cosmedical Skincare.

Meet one of New Zealand’s leading Professional Clinic Ranges.

Formulated with rigorously selected actives, naturally derived ingredients and advanced skin science, Juvenate is committed to Skin Rejuvenation at its core — always safe, effective and respectful of the environment.

Clean. High-performing. Created with integrity.
If you’ve been meaning to upgrade your routine or restock your favourites, now is the time.

Professional skincare. Exclusive savings. Available online and in clinic.
```

### Ad 1096741524976598 — brand damiaskin.com
- headline/title: null
- CTA: VIEW_INSTAGRAM_PROFILE — "Visit Instagram profile"
- format: video | status: active | funnel: instagram | platforms: INSTAGRAM
- start: 2024-12-10T08:00:00 | end: 2026-01-29T08:00:00 | days active (end-start+1): 416
- EU spend: not returned | EU reach: not returned
- landing url: not returned
- body text (verbatim):

```text
Get ready to unleash your next obsession. A scent that says everything without saying a word. Who’s ready for this drop? #damiaSKIN
Sign up for SMS for early access…
```

### Ad 2115833389813851 — brand sebskincare.com
- headline/title: "It’s Not Just Dry Skin"
- CTA: SHOP_NOW — "Shop now"
- format: video | status: inactive | funnel: product | platforms: FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER
- start: 2026-06-06T07:00:00 | end: 2026-06-23T07:00:00 | days active (end-start+1): 18
- EU spend: 722.57 € | EU reach: 62832
- landing url: not returned
- body text (verbatim):

```text
Struggling with flakes & flare-ups? It's not just 'dry skin'.

Our Natural Calming Serum helps to calm redness, reduce flakes, and balance your skin barrier — without harsh chemicals.

🌟 Over 5,000 5-Star Reviews 🌟

💧 Calms visible redness, flakes & irritation
🌿 Natural ingredients inspired by nature & science
🦠 Supports a healthy skin microbiome

Give your skin the daily relief it’s been craving — naturally.

✅ 30-Day Money Back Guarantee
```

## J. search_brands — country_code FR, niche "Beauty & Skincare", meta_ads_active true, sort_by active

pagination: page 1 / 97, page_size 20, total 1,940. The tool exposes no page parameter, so 20 rows (not 30) were obtainable.

| # | name | domain (id) | Meta active / total | monthly visits | status | products | listed | description |
|---|---|---|---|---|---|---|---|---|
| 1 | darnahair.com | darnahair.com | 6,378 / 50,001 | 0 | active | 7 | 2024-01-26 | Découvrez tous les produits techniques nécessaires à la réalisation de lissages professionnels chez vous. (title: DARNA HAIR – DARNA HAIR) |
| 2 | pro.manucurist.com | pro.manucurist.com | 3,347 / 24,403 | 1,484 | active | 438 | 2020-03-13 | Manucurist Pro (title: Manucurist PRO– Manucurist Pro; emails commercial@manucurist.com, export@manucurist.com, hello@manucurist.com) |
| 3 | www.manucurist.com | manucurist.com | 3,116 / 24,720 | 1,425,703 | active | 494 | 2019-06-21 | Découvrez notre collection de vernis naturels composé à 84% d'ingrédients bio-sourcés. Manucurist responsable. Vernis green & Green Flash - Vegan, 9 free and cruelty free. Alternative au semi-permanent (title: Manucurist \| Vernis et Vernis LED Vegan et Bio-sourcé) |
| 4 | wearejolies.com | wearejolies.com | 1,345 / 2,338 | 322,251 | active | 522 | 2021-02-05 | Marque française de lingerie éthique, transparente, et sans complexe. Livraison France, DOM-TOM, Europe et à l'international. (title: We Are Jolies \| Lingerie Bio & Positive) |
| 5 | de.leonieandco.com | de.leonieandco.com | 1,140 / 8,356 | 0 | active | 22 | 2025-07-04 | Leonie & Co - Deutschland |
| 6 | fr.leonieandco.com | fr.leonieandco.com | 1,133 / 8,351 | 0 | active | 36 | 2025-05-23 | Leonie & Co - France |
| 7 | luxeol.com | luxeol.com | 1,122 / 1,996 | 209,505 | active | 166 | 2017-02-03 | Luxéol vous accompagne au quotidien avec des soins capillaires et compléments alimentaires alliant expertise, naturalité et efficacité. (title: Luxéol, l'expertise capillaire) |
| 8 | fr.naked-underwear.com | fr.naked-underwear.com | 1,104 / 9,667 | 4,020 | active | 223 | 2022-08-26 | Marque de lingerie audacieuse et innovante, NAKED Underwear sublime la féminité grâce à des collections élégantes et confortables : ensembles deux ou trois pièces, bodys sensuels et accessoires uniques. Déjà adoptée par des milliers de femmes, découvrez une lingerie sexy, raffinée et confortable au quotidien. (email contact@naked-underwear.com) |
| 9 | maison-close.com | maison-close.com | 1,050 / 7,619 | 322,771 | active | 972 | 2016-12-30 | Maison Close is a high-end and cheeky lingerie brand. Free delivery from 69‚Ç¨ and free returns. Lingerie, ready-to-wear, sensual accessories. Discover Maison Close bras, bodysuits, catsuits and thongs. (title: Maison Close \| Official website - High-end lingerie) |
| 10 | leonieandco.fr | leonieandco.fr | 1,030 / 8,247 | 98,512 | active | 36 | 2025-06-13 | Découvrez nos leggings anti-cellulite 3D drainants : galbent, raffermissent et lissent votre silhouette. Livraison rapide & plus de 20 000 clientes satisfaites. (title: Leggings Anti-Cellulite 3D \| Leonie and Co - France Officiel) |
| 11 | www.pandatea.fr | pandatea.fr | 1,019 / 4,564 | 200,009 | active | 244 | 2018-04-06 | Thé en vrac & en sachet mousseline en coton. 100% Biologique. Formulé par un pharmacien. Mélanges bien-être pour toute la famille. (title: Panda Tea \| Thés & infusions bien-être pour toute la famille; emails contact@pandatea.fr, partnerships@pandatea.fr, presse@pandatea.fr, sales@pandatea.fr, press@pandateatox.com, sales@pandateatox.com, contact@pandateatox.com) |
| 12 | mayaverra.com | mayaverra.com | 988 / 1,890 | 52,129 | active | 3 | 2026-03-13 | mayaverra (title: mayaverra) |
| 13 | leonieandco.co.uk | leonieandco.co.uk | 970 / 8,348 | 8,895 | active | 23 | 2025-06-27 | Leonie & Co - United kingdom |
| 14 | leonieandco.ca | leonieandco.ca | 954 / 8,333 | 0 | active | 23 | 2025-06-27 | Leonie & Co - Canada (title: Leonie and Co) |
| 15 | unbottled.co | unbottled.co | 865 / 3,129 | 268,316 | active | 242 | 2020-03-06 | Ici on se bat pour libérer vos salles de bain du plastique et des produits chimiques. 🐳 Unbottled veut vous faire oublier vos produits en bouteille. #dropthebottle (title: Unbottled : Produits Solides \| Sans Plastique, Sains & Efficaces; email hello@unbottled.co) |
| 16 | reveline.fr | reveline.fr | 814 / 2,380 | 13,607 | active | 4 | 2026-02-20 | Le premier rouge à lèvres qui s'adapte à votre pH pour révéler votre couleur sur-mesure, en quelques secondes. Fini les teintes qui assèchent, craquèlent ou ne vous ressemblent pas. (title: ROUGE À LÈVRES pH GLOW RÉVÉLINE™ – Reveline) |
| 17 | reveline.nl | reveline.nl | 813 / 2,379 | 0 | inactive | 1 | 2026-03-27 | (same description as reveline.fr; title: ROUGE À LÈVRES pH GLOW RÉVÉLINE™ – Reveline NL) |
| 18 | revelineitalia.com | revelineitalia.com | 812 / 2,405 | 1,584 | active | 1 | 2026-04-03 | Il primo rossetto che si adatta al Suo pH per rivelare il Suo colore su misura, in pochi secondi. Basta con le tinte che seccano, screpolano o non Le somigliano. (title: ROSSETTO PH GLOW REVELINE™ – Reveline IT) |
| 19 | lynae.co | lynae.co | 749 / 3,150 | 564,514 | active | 7 | 2025-04-04 | Découvrez Lynae, la solution 100% naturelle pour stimuler votre drainage lymphatique, réduire les gonflements et retrouver légèreté, vitalité et confiance au quotidien. (title: Lynae – Drainage lymphatique naturel \| Légèreté & Bien-être) |
| 20 | bexanova.com | bexanova.com | 722 / 1,356 | 22,041 | active | 6 | 2026-03-27 | (no description; title: BEXANOVA) |

All 20 rows: niche Beauty & Skincare, country_code FR, platform shopify.
