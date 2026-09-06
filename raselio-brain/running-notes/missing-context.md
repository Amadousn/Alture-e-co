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

## Resolved — with date and where the answer lives

- 2026-09-06 — Ad naming convention: read directly from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Primary campaign objective: verified OUTCOME_SALES from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Rough unit economics: taken from the team's own "Récap mensuel" sheet → `running-notes/brand-rules.md` (stated, partial).
