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
