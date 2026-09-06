# Build log — Raselio — 2026-09-06 full buildout

Permanent provenance for the cold-start build. One line per prompt run: prompt path (in `parker-system/prompts/`), output path, sources pulled, review verdict (pass / re-run / surfaced), reviewer note.

## Phase 0 — 2026-09-06 06:00–07:00 UTC

- Factory cloned from https://github.com/real-simple-labs/parker-brain; highest tag `v15` (= commit b55c441, identical to `v14`); mounted at `parker-system/` as a submodule pinned to `v15`.
- Executable layer copied out of the mount: 20 craft skills + 11-skill routine bundle (routine `dream` kept over craft `dream`), 2 review-gate agents, `scripts/voice-lint.py`, `scripts/grounding-check.py`, `.claude/output-styles/parker.md`, `.claude/settings.json`, 4 hooks, 6 schedule recipes.
- Parker MCP: `get_available_brands` → `{"organizations":[]}` — no brand; `update_parker_brain_setup_status` therefore not callable (needs a brand UUID). Logged in missing-context.
- Operability test of the other surfaces (verified): Shopify store "Raselio" (1 product, 11 orders, 2 431 sessions/90d), Meta ad account 1573950771030463 (5 campaigns, 183 ads, ≈1 100 € spent since 2026-08-10), Google Drive (20 Raselio files), Gmail (64 Raselio/Cutlab threads), Brandsearch (thomyle.com corpus), Meta Ad Library (FR). Web fetch of raselio.com blocked by the sandbox proxy (page bodies read through Shopify Admin instead).
- Intake: unattended; answers derived from the team's own documents and marked stated; gaps → `running-notes/missing-context.md`.

## Phase 1 — runs

(appended as each prompt completes)
