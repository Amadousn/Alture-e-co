# Standard sync — the update ledger

## Where this brain stands

- **Factory remote:** https://github.com/real-simple-labs/parker-brain
- **Posture:** `follow`
- **Pinned release:** `v15` — the highest `vN` tag on the factory on 2026-09-06. Note (verified 2026-09-06): the `v15` and `v14` tags both resolve to commit `b55c441` ("v14 migration and release notes"); the factory's `main` carries two newer commits (`cff7282` "v15: fine-tuned skills, trigger-event hooks, webinars" and `79522c6` "v16: Parker Desktop owns brain sync") that are not tagged yet. `/update-brain` will offer them once the factory cuts the tags.
- **Migrations applied through:** `v15` (nothing to apply on a fresh build)
- **Last compared:** 2026-09-06 against `v15` (newest tag) / `main@79522c6` (untagged)

## Sync model for this brain

This brain is **self-managed**: it lives as the `raselio-brain/` folder of the team's own GitHub repository `amadousn/alture-e-co` (origin outside the `parker-brain` org), not in a Parker-provisioned repo, and Parker Desktop is not installed here. Saving is done with the team's own git (commit + push to the working branch); the `save-brain` skill's managed-repo credential rules do not apply. The Parker MCP had no brand configured for Raselio on build day, so `setup_parker_brain` and `update_parker_brain_setup_status` were not called — see `running-notes/missing-context.md`.

## Offer history

No offers yet — first /update-brain run fills this in.
