# Shopify theme files (Lumin) — AU harness store

Source of truth for the custom sections and JSON templates pushed to the
unpublished theme "claude change" (ID 198445564288) via the Admin API.

Custom sections written for this store (not recovered from older shops):
- `sections/au-hero-video.liquid` – hero video (autoplay, muted, loop, playsinline, poster, deferred source, 9:16 mobile cut).
- `sections/au-benefits-tabs.liquid` – four-benefit interactive tabs (manual, no autoplay).
- `sections/au-does-doesnt.liquid` – honest what-it-does / doesn't section (kept available, not in the current order).

Reused Lumin theme components: trust-badges, image-with-text, featured-product,
table-compare-pro, collapsible-content, image-banner, rich-text, main-product
(review, promo, custom_liquid, collapsible_tab blocks), sticky ATC (snippets/new-atc),
cart drawer (snippets/cart-drawer), shoppable-videos and Lumin-review (both
connected but disabled until real footage / real reviews exist).

Templates: `templates/index.json`, `templates/product.json`, `templates/page.faq.json`,
`templates/page.fitting-guide.json`. Settings: `config/settings_data.json`.

## Recovered CRO code (branch claude/raselio-cro-optimization-kugzz7)

`recovered/raselio/` holds the custom Liquid blocks extracted verbatim from
`docs/raselio/theme-actif/product.json` (Raselio store). Reused on the PDP,
adapted to the harness copy and colours:
- `custom_liquid_review_stars` → block `au_review_stars` (disabled until a real rating exists)
- `custom_liquid_benefits` → block `au_benefits`
- `custom_liquid_garantie_ligne` → block `au_reassurance`
- `custom_liquid_reviews_carousel` → block `au_reviews_carousel` (rebuilt to read a list, disabled until real reviews exist)
- `g_garantie` / `g_portraits` (rs-* pattern) → section `pdp_guarantee`
Not found anywhere: `aerozya-avis-slider.liquid`. Not reusable: `custom_liquid_4raisons` (a static PNG), `custom_liquid_slider_ba` (before/after skin slider).


## Homepage v3 (customer media, compact offer, fit guide)

- `sections/au-customer-media.liquid` — "Real dogs. Real walks." mixed carousel (4 video blocks 9:16 + 3 photo blocks 4:5, each switchable). Structure from the CRO library: scroll-snap track, arrows and dots from `lisance-clientes`; click-to-play, one active video, pause off-screen from `lisance-videos` (rewritten: no autoplay, file attached to the DOM on first click only, sound toggle). Media pickers are empty until the real customer files are added in the theme editor; empty cards show a placeholder in the editor only.
- `sections/au-offer-card.liquid` — compact product offer adapted from `lisance-offre` (bordered box, image left, price from the product, 3 benefits, 3 reassurances, one button to the PDP). Tiers, timers and euro formatting removed. Replaces `au-walk-kit` on the homepage.
- `sections/au-fit-guide.liquid` — rebuilt on the `lisance-focus` layout (centred head, one visual with ratio/focal, CTA + note) plus three fitting steps; primary button links to the size guide page (modal optional).
- `sections/au-benefits-tabs.liquid` — rebuilt on `lisance-benefices` (tab bar with icons, progress bar autoplay that stops on click, keyboard, editor block select); block setting ids kept (`title`, `text`, `image`) plus `tab` and `icon`.
- `au-real-walks` and `au-walk-kit` stay in the theme but are no longer used by `templates/index.json`.

- `sections/au-faq.liquid` — compact CRO FAQ adapted from `lisance-faq` (one answer open at a time, animated height, aria) without the category tabs; six questions as blocks, footer link to the full FAQ page. Replaces the collapsible-content FAQ on the homepage (placed after the guarantee, before the final CTA).
- `templates/page.contact.json` — contact page: page body (email, reply time) + Lumin contact form; the demo image banner and placeholder rich text were removed.
- Menus: main menu = Home, Harness, Our Story, Contact Us; footer help menu = FAQ, Contact Us, Size Guide, Fitting Guide, Track My Order.

## Homepage v4 (mixed media, PeakConversion tabs FAQ)

- Section order in `templates/index.json`: hero → trust strip → problem → mechanism → four benefits (tabs) → mixed media → Australian lifestyle → compact offer → size & fit → 60-day guarantee → tabs FAQ → final CTA. No featured-product block and no comparison table on the homepage.
- `sections/au-customer-media.liquid` — "See the harness in action": 8 cards alternating a customer video (9:16, click-to-play, poster, one active video, sound toggle, pause off-screen, file attached to the DOM on first click) and a product/lifestyle photo (4:5, image + ALT + focal + caption, no fake names or testimonials). The four customer videos (`paropet-1..4`) were inserted by the merchant and are kept as-is. The four photos were generated with Higgsfield (nano_banana_pro, product packshot as image reference) and imported to Shopify Files as `harness-lifestyle-labrador-front-clip.png`, `harness-lifestyle-kelpie-coastal.png`, `harness-lifestyle-staffy-bush-track.png`, `harness-lifestyle-golden-fitting.png`. Media height (desktop) is 520 px so roughly three cards are visible on a laptop and about 1.2 on a phone.
- `sections/pc-tabs-faq-1.liquid` — PeakConversion "PC - Tabs FAQ #1" reworked: UTF-8 copy, IP notice kept, tabs are real `<button role="tab">` with `aria-selected`, questions are buttons with `aria-expanded`/`aria-controls`, answers open with a grid-rows transition (no fixed height), the default category falls back to the first tab, the tab bar scrolls horizontally on mobile and is not sticky, blocks carry `shopify_attributes`, and the script re-runs on `shopify:section:load`. Three tabs (Harness & pulling / Size & fit / Delivery & guarantee), six questions, footer link to `/pages/faq`. Replaces `au-faq` on the homepage (`au-faq` stays in the theme).
- `sections/au-hero-video.liquid` — new `focal_desktop` / `focal_mobile` settings for the object-position of the video and poster, plus a slightly shorter mobile height.
- Theme housekeeping: the `assets/qa-*` files in the draft theme are preview relays used during QA (the API refuses theme file deletion); they are not referenced anywhere and can be removed from the theme code editor.

## Homepage v5 (CTA system, shorter page, newsletter)

- `assets/au-cta.css` (linked from `layout/theme.liquid` after the theme CSS) — one CTA system: primary buttons are solid (scheme button colour, white/cream label, darker hover via brightness, no colour inversion), 52 px minimum height, shared radius, uppercase label, visible focus ring, full width on phones; secondary buttons are outlined and fill on hover.
- Four primary commercial CTAs only, all to `/products/front-clip-no-pull-harness`: hero "See the harness", benefits "Choose your harness", compact offer "Choose your size — A$59", final CTA "Make walks easier — A$59". Mechanism and guarantee keep a discreet link ("See how it works", "Try it for 60 days" outlined); the FAQ button "See all questions" goes to `/pages/faq`; the size-guide buttons are outlined utility buttons. Labels are stored in sentence case and rendered uppercase by CSS.
- Page shortened: hero `min(72vh, 720px)` desktop / `min(66svh, 560px)` mobile so the CTA sits inside the first screen at 390 px, image-with-text sections on the medium media height with 32 px padding, shorter copy, no button after the lifestyle section, final banner on the medium height.
- Guarantee appears once in full (guarantee section, with a link to `/pages/guarantee`); elsewhere only short mentions (trust strip, offer chip, one FAQ answer, final CTA line).
- `sections/au-benefits-tabs.liquid` — each benefit appears once: the image badge duplicating the tab label was removed, inactive panels carry `hidden`, inactive photos `aria-hidden`, tabs use a roving `tabindex`.
- Brand name: `settings.brand_name` (Theme settings → Brand information, default `[BRAND NAME]`) feeds the header wordmark, footer copyright, title suffix and `og:site_name` (`config/settings_schema.json`). The Shopify store name "My Store 10" is not used by the theme; rename it in Settings → Store details for checkout and emails.
- `first_10_walks` — Lumin `newsletter` section ("The First 10 Walks, free", one email field) after the final CTA, before the footer.
- Mixed media carousel: videos labelled "Customer walk", photos "Closer look"; posters only until a video is clicked, photos lazy-loaded with responsive sizes.

## Homepage v6 (a CTA in every section, offer card, announcement link)

- Every main content section ends with one filled primary CTA, all distinct: hero "See the harness", problem "Take back your walks", mechanism "See the front-clip harness", benefits "Choose your harness", media "See it for your dog", lifestyle "Built for your next walk", offer "Choose your size — A$59", size & fit "Find your dog's size" (→ `/pages/size-guide`), guarantee "Try it for 60 days" (cream on the dark scheme), FAQ "See all questions" (→ `/pages/faq`), final "Make walks easier — A$59". Commercial CTAs go to `/products/front-clip-no-pull-harness`. Announcement bar, header, trust strip, newsletter and footer stay structural (no extra button).
- `sections/au-offer-card.liquid` — the single harness + lead photo is shown whole (`object-fit: contain`, padded white media box), larger price (2.6rem) and price note, larger reassurance chips, tighter paddings (24/32 px section, smaller inner padding). Mobile: photo first, content, full-width CTA. Benefits checked against the product: 4 adjustment points, XS–XL, four colours (Charcoal, Ocean, Red Dirt, Gum), lead included.
- `sections/header-group.json` — the announcement bar text links to the product page.

## Homepage v7 (benefits as four large photo cards, video-only carousel)

- `sections/au-benefits-tabs.liquid` (type name kept) — four benefit cards, each with its own 4:5 Higgsfield photo, a number badge (or icon), title and one-line text. Desktop: 2 × 2 grid (max width 1040 px, 16 px radius). Mobile: horizontal carousel (card = 88 % of the track so about 12 % of the next card peeks, scroll-snap, swipe, dots). Above the cards a segmented navigation of four pills (icon in a small circle + short sentence-case label: Redirects pulling / Easy on the neck / Everyday comfort / Two walking modes): light inactive pills, petrol active pill with white text, thin border, hover, focus ring, 48–52 px tall, equal widths on desktop, horizontal scroll on mobile. Clicking a pill highlights the matching card (petrol ring + badge) and scrolls it into view; swiping the mobile carousel updates the pills and dots. One filled CTA "Choose your harness" after the cards. Icons live in `snippets/au-benefit-icon.liquid`.
- Photos per benefit: Labrador (front-clip redirection), Staffy bush track (less pressure on the neck), Golden fitting (adjustable comfort), Kelpie coastal (front and back walking modes).
- `customer_media` is now the four customer videos only ("See it on real walks"): 9:16 posters, click-to-play, one video at a time, sound toggle, swipe on mobile, static row on desktop, CTA "See it for your dog". The generated photos were removed from this carousel (they are used large in the benefits section).
