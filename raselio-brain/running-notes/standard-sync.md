# Standard sync — the update ledger

## Where this brain stands

- **Factory remote:** https://github.com/real-simple-labs/parker-brain
- **Posture:** `follow`
- **Pinned release:** `v15` — the highest `vN` tag on the factory on 2026-09-06. Note (verified 2026-09-06): the `v15` and `v14` tags both resolve to commit `b55c441` ("v14 migration and release notes"); the factory's `main` carries two newer commits (`cff7282` "v15: fine-tuned skills, trigger-event hooks, webinars" and `79522c6` "v16: Parker Desktop owns brain sync") that are not tagged yet. `/update-brain` will offer them once the factory cuts the tags.
- **Migrations applied through:** `v15` (nothing to apply on a fresh build)
- **Last compared:** 2026-09-06 against `v15` (newest tag) / `main@79522c6` (untagged)

## Sync model for this brain

This brain is **managed**: it lives at the root of `parker-brain/dylan-s-org-raselio`, its own private Parker-provisioned repository, so the `save-brain` skill's managed-repo credential rules apply in full — mint a short-lived credential through `setup_parker_brain`, write it to `.git/parker-credentials`, push to `main`.

**Move on record.** The Parker MCP had no Raselio brand at the start of the 2026-09-06 build (`get_available_brands` returned `organizations: []`), so there was no repo to provision into and the whole build was written inside a third-party repo (`amadousn/alture-e-co`, folder `raselio-brain/`, branch `claude/clone-brain-raselio-ysv5ue`). The brand appeared mid-build at 09:50 UTC. On 2026-09-07 `setup_parker_brain` created this repo (`reused_existing: false`) and the brain was transferred here flat, with the `parker-system/` mount re-attached at the same pin. The build-time location is history only — nothing is written there again, and the two copies are not kept in sync. `update_parker_brain_setup_status` was still never called, so `run_id` in `parker_config.json` stays empty; see `running-notes/missing-context.md`.

## Offer history

No offers yet — first /update-brain run fills this in.
