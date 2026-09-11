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
