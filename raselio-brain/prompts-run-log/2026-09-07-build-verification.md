# Build-completion verification — Raselio brand brain

**Run on:** 2026-09-07 · **Scope:** structural completeness and correct wiring only, per `parker-system/prompts/onboarding-runner.md` § "Verify the build — confirm the brain is complete and correctly wired". Not a judgement of whether the strategy is good.

**Context taken as given, not re-litigated:** this brain is self-managed (the `raselio-brain/` folder of `amadousn/alture-e-co`, branch `claude/clone-brain-raselio-ysv5ue`), there is no Parker Desktop and no `parker-brain` org repo, so the runner's managed-sync checks do not apply. The Parker brand `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37` appeared mid-build at 2026-09-06 09:50 UTC; the "unreachable" notes in docs written before that hour are stale **by design**, recorded in the priority re-run queue at the top of `running-notes/refresh-schedule.md`, and are not counted as failures here.

---

## Verdict at a glance

| # | Check | Verdict |
|---|---|---|
| 1 | The layout is whole | **FAIL** — every surface and every required output is on disk, but `prompts-run-log/` records nothing past Phase 0, and `briefs/` will not survive a clone |
| 2 | The contract is stamped, not templated | **PASS** |
| 3 | Every internal pointer resolves | **FAIL** — no dangling filesystem paths, but three pointer-bearing docs describe a brain that no longer matches disk |
| 4 | Method mounted and pinned, skills shipped | **PASS** — with one recorded caveat on the tag name |
| 5 | The brain is self-running | **PASS on wiring · NOT ARMED on schedules** (expected; `/setup-routines` is the fix) |
| 6 | The freshness ledger is real | **FAIL** — five real gaps in `refresh-schedule.md`, six audits missing or misreported in `audits/INDEX.md` |
| 7 | The provenance holds | **PASS** — nothing reads as fabricated; two numeric inconsistencies named below |
| 8 | The status file | **FAIL** — `BUILD-STATUS.md` is frozen at 2026-09-07 05:30 UTC and still lives at the repo root |

---

## 1. The layout is whole — FAIL

### What passes

Every top-level surface from the runner's flat layout exists: `CLAUDE.md`, `README.md`, `sub-context-docs/`, `source-pulls/`, `personas/` (+ `voice-of-customer/`), `competitors/`, `audits/`, `strategy/`, `idea-bank/`, `briefs/`, `open-loops/`, `hypotheses/`, `validations/`, `re-validations/`, `brand-lens.md`, `expert-insights/`, `running-notes/`, `.claude/skills/`, `.claude/settings.json`, `schedules/`, `dreaming/`, `workflows/`, `parker-system/`, `prompts-run-log/`, `BUILD-STATUS.md`, `parker_config.json`, plus `sprints/` and `users/` from the path map.

Every prompt the dependency graph required produced its output. Counted against the factory prompt sets in the mount, not eyeballed:

- **Phase 1A** — `parker-system/prompts/brand-profile/` carries 13 slices + `brand-profile-narrative` (excluding `README.md` and `_foundations.md`); `sub-context-docs/` carries all 14. Complete.
- **Phase 1B** — Thomyle carries all 9 slices + snapshot; `working-thesis-synthesis.md` exists at root.
- **Phase 1C** — all 8 source prompts produced `source-pulls/personas/*.md`; `personas-profile.md` + `persona-voice-library.md` + `lifecycle-journey-maps.md` + `cross-persona-bias-notes.md` all present.
- **Phase 1D** — all 10 `voc-*.md` slices present (the factory carries 10 `voc-*` prompts including `voc-corpus-profile`), plus the assembly at `personas/voice-of-customer/voice-of-customer.md`.
- **Phase 1E** — **17 of 17 audits on disk**: 5 quarterly internal, 4 monthly, 1 biweekly, 1 weekly, 4 quarterly external, 2 monthly external. Plus `audits/2026-Q3/gaps-opportunities-inspo.md`.
- **Phase 1 synthesis** — `open-loops/2026-09-07-roll-up.md` plus 12 promoted loops under `open-loops/promoted/2026-09/`.
- **Phase 2** — 4 strategy inputs + `strategic-roadmap.md`. **Phase 3** — 26 idea-bank entries + `index.md` + `evaluation-2026-09-07.md`, `sprints/2026-09-07-sprint-1/` with `sprint-plan.md`, 4 briefs and `retro.md`.

**The deferred branch is correctly noted, not silently missing.** Gillette Labs Body + Intimate and Philips OneBlade Intimate carry snapshots only. Both snapshots declare the deferral in `built_from` frontmatter ("Les neuf slices sont DIFFÉRÉES, pas sautées") and both carry a closing section "Les neuf slices différées, et ce qui débloquerait chacune" naming the unblocking condition per slice (`competitors/gillette-labs-body-intimate/competitor-snapshot.md:7,15,136`; `competitors/philips-oneblade-intimate/competitor-snapshot.md:7,136`). This is a properly recorded deferral and is **not** counted as a gap.

### Gap 1.1 — the build log records nothing past Phase 0 (hard)

`prompts-run-log/2026-09-06-full-buildout.md` is **15 lines long**. Its Phase 1 section reads, in full:

```
## Phase 1 — runs

(appended as each prompt completes)
```

Nothing was ever appended. Roughly 100 standing documents were produced across Phases 1, 2 and 3 and **not one has a log line, an output path, a source list, or a review verdict.** The runner requires (§ "Review pass"): *"log every verdict (pass, re-run, or surfaced) in `prompts-run-log/` so the build carries its own quality record."* The cross-check this verification is supposed to run — required prompts against the run log — cannot be performed against this file at all; the completeness above was reconstructed from the filesystem and the mount's prompt directories instead. **There is no record that the per-prompt fidelity review ever ran on any document.**

- **File:** `prompts-run-log/2026-09-06-full-buildout.md:13-15`

Minor, same file: line 9 says "20 craft skills" copied out of the mount. The mount carries **21** (`parker-system/.claude/skills/`). The copy itself is complete (see check 4) — the count in the log is wrong, not the shipment.

### Gap 1.2 — `briefs/` is empty and untracked, so it will not exist on clone

`briefs/` exists on this filesystem but holds zero files and zero tracked entries (`git ls-files raselio-brain/briefs` returns nothing). Git does not track empty directories, so **the surface disappears the moment anyone clones the repo.** `CLAUDE.md:206` and `brand-lens.md:156` both point at `briefs/_brief-template.md`; `sprints/2026-09-07-sprint-1/briefs/on-ne-devine-plus.md` frontmatter states the template does not exist and says why (no founder template was handed over) — that part is honest. The problem is the folder itself, not the missing template.

The same clone-fragility applies to these empty untracked subdirectories, though each has a tracked `README.md` in its parent so the top-level surface survives:

`sprints/_unplanned/briefs`, `open-loops/archived`, `hypotheses/tested`, `hypotheses/awaiting-user`, `hypotheses/denied`, `validations/validated`, `validations/invalidated`, `validations/inconclusive`, `validations/insufficient-evidence`, `re-validations/scheduled`, `re-validations/results`, `expert-insights/inbox`, `expert-insights/curation`, `expert-insights/context-update-candidates`.

`CLAUDE.md:63` names `inbox/`, `curation/` and `context-update-candidates/` as the shape of `expert-insights/`; on a fresh clone none of the three will be there.

---

## 2. The contract is stamped, not templated — PASS

`CLAUDE.md` and `README.md` both carry the real brand throughout: "Raselio", the MS-810 reference, 34,99 €, Shopify `8piiys-jj.myshopify.com`, Meta account `1573950771030463`, Parker brand `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, founder Dylan Ulry, the self-managed repo and branch. **Zero `{{`, `}}`, `[brand]`, `{{BRAND_NAME}}` or `{{slot}}` hits in either file.** No template header block survives.

Full-brain grep (excluding `parker-system/`) returns 27 hits. **None is a surviving template placeholder.** Reported in full as required, with the classification:

**Real data that happens to contain `{{ }}` — quoted evidence, correct to preserve:**

- `audits/2026-09/monthly-hook-audit.md:220` — `{{product.name}}`, quoted as the literal unresolved title on a competitor's live ad, explicitly labelled "un gabarit non résolu"
- `source-pulls/meta-creatives-copy.md:14`, `:794`, `:2093` — `{{product.name}}` as the actual name of four dynamic-catalogue creatives in the Meta account
- `source-pulls/meta-ad-library-competitors.md:306`, `:307` — `{{product.name}}` as the ad-library title for two Konvert ads
- `source-pulls/brandsearch-competitors.md:885` — `}}` closing a quoted JSON payload

**Factory craft-skill files copied verbatim out of the mount — generic by design, and the runner requires them shipped unmodified:**

- `.claude/skills/expert-signal-intake/SKILL.md:72`
- `.claude/skills/setup-routines/SKILL.md:35`
- `.claude/skills/improve-system/SKILL.md:37`, `:39`
- `.claude/skills/update-parker-skill/references/canonical-locations.md:64-73`, `:100`, `:105`
- `.claude/skills/brand-idea-bank-maintenance/SKILL.md:52`
- `.claude/skills/headlines/processes/rejection-contrast.md:13`, `:14` — `[brand]` inside two copywriting formula examples

**JSON escaping, not a placeholder:**

- `.claude/settings.json:46` — `}}` closing the escaped `hookSpecificOutput` fallback string

---

## 3. Every internal pointer resolves — FAIL

Every relative path extracted from `CLAUDE.md`, `README.md`, `sub-context-docs/brand-profile-narrative.md`, `brand-lens.md`, `competitors/INDEX.md` and `audits/INDEX.md` was tested against the filesystem. **No dangling filesystem path was found** — every backticked path and bare filename resolves to a real file, either directly or in the folder the prose places it in.

**The `brand-profile.md` question resolves cleanly.** `CLAUDE.md:48` states the rule explicitly: *"This brain has no file named `brand-profile.md`: wherever the method docs, the skills, or the voice block below say `brand-profile.md`, they mean this file"* — pointing at `sub-context-docs/brand-profile-narrative.md`, which exists. The one renamed pointer is documented at the top of the map. Pass.

The failure is a different and more dangerous kind: **three pointer-bearing documents describe a brain that no longer matches disk.** These are not broken links, they are wrong descriptions in the exact places Parker reads first — which is the silent-failure class this pass exists to catch.

### Gap 3.1 — the always-loaded one-pager's vault index is stale (hard)

`sub-context-docs/brand-profile-narrative.md` is the doc `CLAUDE.md:48` marks **"Read it first on every question."** Its vault index ("Le coffre, document par document") misdescribes four surfaces:

| Line | What it says | What is actually on disk |
|---|---|---|
| `:94` | `competitors/INDEX.md` — **"Pas encore générée."** | It exists, 20+ lines, fully written |
| `:95` | `audits/INDEX.md` — **"Pas encore générée."** | It exists |
| `:96` | `open-loops/` — "Le roll-up consolidé n'est pas encore écrit ; `promoted/` et `archived/` sont vides." | `open-loops/2026-09-07-roll-up.md` exists; `promoted/2026-09/` holds **12 graded loops** |
| `:97` | `strategy/` — "**Vide au 2026-09-07.**" | Holds 5 files: 4 inputs + `strategic-roadmap.md` |

A session that loads this doc first is told the strategic agenda and the roadmap do not exist. **This is the single most consequential gap in the build.**

### Gap 3.2 — `CLAUDE.md`'s "What is not yet built" paragraph is stale

`CLAUDE.md:206` asserts four things that are false on disk:

- *"`working-thesis-synthesis.md` does not exist."* — it exists at root, 49 843 bytes, `generated_on: 2026-09-07`.
- *"Two of the Phase-1 branch-E audits are missing (`customer-review-audit.md` and `quarterly-whitespace-analysis.md`)"* — both exist: `audits/2026-Q3/customer-review-audit.md` (235 lines, 34 157 bytes) and `audits/2026-Q3/quarterly-whitespace-analysis.md` (353 lines, 49 110 bytes), both stamped `generated_on: 2026-09-07` with full `data_limitations` blocks.
- *"`idea-bank/entries/` [is a] scaffold waiting for [its] own run"* — it holds **26 entries**.

Correct in the same paragraph and to keep: `briefs/_brief-template.md` was never created; the nine-doc teardown exists for Thomyle only; `dreaming/`, `workflows/` and `expert-insights/` are genuinely empty scaffolds.

### Gap 3.3 — `audits/INDEX.md` misreports its own folder (see also check 6)

`audits/INDEX.md:36` and the closing "Not generated, and why" section declare `customer-review-audit.md` and `quarterly-whitespace-analysis.md` **not generated**. Both exist. Detail under check 6.

---

## 4. The method is mounted and pinned, the skills shipped — PASS

**Mount.** `git submodule status` returns ` b55c441c5b3cd7c0c2d71428f2203f6fb186887b parker-system (v14)` — **clean, no `+`/`-`/`U` prefix, no local modifications.** The directory really contains `prompts/`, `creative-strategy-context/` and `system/` (plus `fixtures/`, `templates/`, `migrations/`, `global/`, `evals/`, `release-notes/`, `self-improvement/`, `scripts/`).

**Pin — caveat, not a fail.** `git submodule status` prints `(v14)`, while `parker_config.json` (`"parker_brain_version": "v15"`) and `running-notes/standard-sync.md` both say **v15**. Verified inside the mount: `git tag --points-at HEAD` returns **both `v14` and `v15`** on the same commit `b55c441`; `git describe` picks the lexically-first, `v14`. Both `standard-sync.md` and `BUILD-STATUS.md` record this identity explicitly and note that the untagged `v15`/`v16` work sits on the factory's `main` (`cff7282`, `79522c6`) awaiting tags. **The commit is right, the two configured pins agree with each other, and the discrepancy is documented — pass.** A fixer should not "correct" `parker_config.json` to v14.

**Deny rules.** `.claude/settings.json` `permissions.deny` carries all four: `Edit(/parker-system/**)`, `Edit(parker-system/**)`, `Write(/parker-system/**)`, `Write(parker-system/**)`.

**Skills — counted by name, not eyeballed.** Mount: **21** skills. Brain `.claude/skills/`: **26**.

- `comm -23` (in mount, not in brain) → **empty. Every craft skill shipped.**
- `comm -13` (in brain, not in mount) → exactly the 5 routine-only skills: `disconnect-factory`, `get-started`, `research-loops`, `save-brain`, `update-brain`.
- 21 + 5 = 26. Arithmetic closes with nothing unaccounted for.

**All eleven routine skills present:** `dream`, `self-improve`, `research-loops`, `update-brain`, `harvest-ideas`, `evaluate-ideas`, `refresh-context`, `save-brain`, `disconnect-factory`, `setup-routines`, `get-started`.

**Exactly one `dream`, and it is the routine one.** `.claude/skills/dream/SKILL.md` frontmatter describes proposals landing "into dreaming/proposals/pending", captured verbatim, promoted through self-improve — the routine variant. The mount's on-demand `/dream` (with its `triggers:` block) was correctly not merged over it. One directory, no duplicate.

**Review-gate bundle — all five present:**

| File | Status |
|---|---|
| `.claude/agents/creative-voice-review.md` | present, 5 081 bytes |
| `.claude/agents/context-grounding-review.md` | present, 9 911 bytes |
| `scripts/voice-lint.py` | present, 9 862 bytes |
| `scripts/grounding-check.py` | present, 6 788 bytes |
| `parker-system/creative-strategy-context/ai-writing-tells.md` | present, 12 327 bytes |

**Both checkers execute in the brain — proven, not assumed:**

```
$ echo "test line, delving into robust synergies" | python3 scripts/voice-lint.py -
voice-lint: 1 flag(s) across 1 non-empty lines (density 1.00)
  L1 [AI vocabulary] "robust" — flagged-word hit — judge density, not one hit
(exit 1 — correct: flags found)

$ python3 scripts/grounding-check.py
usage: grounding-check.py OUTPUT_FILE [BRAIN_ROOT]
(exit 2 — correct: usage printed)
```

Doubtful item, logged not failed: `voice-lint.py` flagged "robust" but not "delving" on that line. The gate runs and returns a real finding; whether the tell list should also carry "delving" is a content question for the factory, out of scope here.

---

## 5. The brain is self-running — PASS on wiring, NOT ARMED on schedules

**Wiring — pass, both halves of the voice layer intact:**

- `.claude/settings.json` carries `UserPromptSubmit → python3 .claude/hooks/craft-context.py` with an inline fallback context string; `.claude/hooks/craft-context.py` exists beside it (4 261 bytes).
- `"outputStyle": "Parker"` is set; `.claude/output-styles/parker.md` exists beside it (4 202 bytes).
- Three further hooks are wired and present: `PreToolUse → git-guard.py`, `SessionStart → session-start.py`, `PostToolUse → pull-log.py`.
- `schedules/` holds the six recipes: `dream.md`, `ideas-weekly.md`, `refresh-context.md`, `research-loops.md`, `self-improve.md`, `update-brain.md` (+ `README.md`).

**Armed status — reported honestly, as instructed.** `list_triggers` on this account returns `{"data":[]}`: **zero scheduled agents are registered.** All six `schedules/*.md` say so themselves — each carries *"Status: Job committed and live. Schedule **not yet registered** — run `/setup-routines` to arm it."* — and `schedules/README.md` explains why ("schedules are per-account, so a brain cloned onto a new instance arrives un-armed").

**This is the expected state for an unattended build, and the recipes report it accurately rather than claiming a false arm.** The fix is a one-time `/setup-routines` run by the account owner. Recorded as **not armed**, not as a pass and not as a hard fail. `CLAUDE.md:216` already instructs the brain to surface this offer on a session where the routines aren't armed, so the un-armed state is self-healing on first contact with a human.

---

## 6. The freshness ledger is real — FAIL

`running-notes/refresh-schedule.md` is a genuine ledger, not a stub: it aggregates real `generated_on`/`refresh_by` dates read off files, carries the priority re-run queue for the three pre-09:50-UTC docs, groups the VoC slices and the Thomyle sub-context docs correctly, and names an explicit "Exempt — self-cadenced" section for `running-notes/`, `brand-lens.md`, `source-pulls/`, the two INDEX files, and per-round artifacts. **115 documents outside `parker-system/` carry `generated_on` frontmatter.** Walked all of them against the schedule; after crediting every group line and every exemption, five real gaps remain.

`running-notes/routine-log.md` **exists and is correct**: header, usage note, entry-shape template, and a `## Log` section holding only `<!-- newest entries at the top; routines prepend here -->`. Empty and append-only, ready for the first scheduled run. Pass.

### Gap 6.1 — `working-thesis-synthesis.md` is absent from the schedule entirely

Root-level standing synthesis, `generated_on: 2026-09-07`, `refresh_by: 2026-10-07`, 49 843 bytes, and it appears nowhere in `running-notes/refresh-schedule.md` — not in a table, not in a group line, not in the exempt list. It has a real due date in 30 days that nothing will surface.

### Gap 6.2 — four audits missing from the audit cadence table

The "Audit cadence" table lists 14 rows. Six of the 18 audits on disk are unaccounted for; two of those are Gap 6.3. The four simply absent:

- `audits/2026-Q3/external/90-day-diversity-audit-external.md` — `generated_on: 2026-09-07`, `refresh_by: 2026-12-06`
- `audits/2026-Q3/external/single-competitor-ad-analysis-thomyle.md` — `generated_on: 2026-09-07`, `refresh_by: 2026-12-06`
- `audits/2026-09/external/monthly-creative-landscape.md` — `generated_on: 2026-09-07`, `refresh_by: 2026-10-07`
- `audits/2026-09/external/monthly-top-impressions-report.md` — `generated_on: 2026-09-07`, `refresh_by: 2026-10-07`

Two of the four come due on 2026-10-07 and no ledger line will raise them.

### Gap 6.3 — two schedule lines point at "never generated" docs that exist

`running-notes/refresh-schedule.md`, audit cadence table:

| Row as written | Reality |
|---|---|
| `audits/2026-Q3/customer-review-audit.md` \| **never generated** \| when the store has reviews | Exists. 235 lines, `generated_on: 2026-09-07`, `refresh_by: 2026-12-06`, full `data_limitations` block documenting four queries returning N=0 |
| `audits/2026-Q3/quarterly-whitespace-analysis.md` \| **never generated** \| next quarterly pass | Exists. 353 lines, `generated_on: 2026-09-07`, `refresh_by: 2026-12-06`, spend read covering 581,16 € of 830,16 € (70,0 %) with the tail treated in aggregate and said so |

The prose immediately below the table repeats the error at length ("`customer-review-audit.md` was not generated because the review pool is empty… `quarterly-whitespace-analysis.md` was not reached in the cold start"). Both documents were in fact written on 2026-09-07 and both handle their emptiness honestly — the ledger is simply describing a build state that was superseded.

### Gap 6.4 — the open-loops line says the roll-up has not run

Event-driven table, last row: `Open-loops roll-up (`open-loops/`) | not yet run | after the first `/research-loops` run`.

`open-loops/2026-09-07-roll-up.md` exists, and `open-loops/promoted/2026-09/` holds **12 graded loops** (`t1-1` … `t1-4`, `br-1` … `br-9` less `br-5`), each stamped `generated_on: 2026-09-07`, `refresh_by: 2026-09-21`. **That is a 2026-09-21 due date on twelve documents that the ledger believes do not exist** — the earliest real deadline in the brain, and the one most likely to be missed.

### Gap 6.5 — `audits/INDEX.md` does not match its folder

`audits/INDEX.md` opens *"Twelve audits exist"* and lists twelve. **Eighteen audit documents are on disk.** Six are missing or misreported:

- Absent entirely: `2026-Q3/external/90-day-diversity-audit-external.md`, `2026-Q3/external/single-competitor-ad-analysis-thomyle.md`, `2026-09/external/monthly-creative-landscape.md`, `2026-09/external/monthly-top-impressions-report.md`
- Listed under **"Not generated, and why"** despite existing: `2026-Q3/customer-review-audit.md`, `2026-Q3/quarterly-whitespace-analysis.md`

Compounding it, the header asserts folder-wide shared denominators of **"163 Raselio ads, 6 Meta-attributed purchases…"**, while the audit it indexes two lines later (`2026-Q3/90-day-performance-audit.md`) carries **183 ads (Meta API) against 173 (Parker)** and says the two totals do not reconcile. The index flattens a documented reconciliation failure into a single unsourced number.

Note the internal inconsistency this creates: `competitors/INDEX.md` correctly cites `audits/2026-Q3/external/single-competitor-ad-analysis-thomyle.md`, `90-day-diversity-audit-external.md` and `audits/2026-09/external/monthly-top-impressions-report.md` as existing — the competitor index knows about audits the audit index does not.

### `competitors/INDEX.md` — matches its folder, PASS

Three folders on disk, three described: `thomyle/` (snapshot + 9 slices), `gillette-labs-body-intimate/` (snapshot only, deferral stated), `philips-oneblade-intimate/` (snapshot only, deferral stated). It goes further and names the three roster entries that have no folder (Grümwise, Billy Trimmer, Cutlab) so the map is not read as more complete than it is. This is what `audits/INDEX.md` should look like.

### Minor, logged not failed

- `sprints/2026-09-07-sprint-1/retro.md` carries `generated_on` with **no `refresh_by`**. The schedule covers it with an event trigger ("à l'expédition du round"), so it is not orphaned, but the frontmatter is short one field the runner's review pass requires.
- Seven documents are stamped `last_updated:` instead of `generated_on:` — the four sprint briefs, `personas/voice-of-customer/voice-of-customer.md`, `running-notes/brand-notes-from-org.md`, `running-notes/missing-context.md`. Five of the seven are in the exempt or event-driven sections legitimately; `voice-of-customer.md` is a standing synthesis listed in the semi-annual table, and it is the one that should carry `generated_on`. A frontmatter walk keyed on `generated_on` will not see any of these seven.

---

## 7. The provenance holds — PASS

Twelve standing docs spot-checked across every branch (foundation, personas, VoC, competitors, quarterly audit, monthly audit, strategy inputs, roadmap, root synthesis, Phase-3 brief). **Nothing reads as fabricated to fill a gap. No document asserts a number its sources do not carry.**

| Doc | Stamps | Claim labels (stated/verified/inferred/data-limited) | Open-loops tail |
|---|---|---|---|
| `sub-context-docs/brand-identity-analysis.md` | 2026-09-06 → 2026-12-06 | 41 / 31 / 0 / 3 | yes |
| `sub-context-docs/ad-account-evaluation.md` | 2026-09-06 → 2026-10-06 | 12 / 25 / 3 / 1 | yes |
| `personas/personas-profile.md` | 2026-09-07 → 2026-12-07 | 19 / 18 / 6 / 0 | yes |
| `personas/voice-of-customer/voice-of-customer.md` | `last_updated` → 2026-12-06 | 1 / 2 / 2 / 0 | yes |
| `competitors/thomyle/competitor-snapshot.md` | 2026-09-06 → 2026-12-06 | 3 / 19 / 6 / 0 | yes |
| `competitors/gillette-labs-body-intimate/competitor-snapshot.md` | 2026-09-06 → 2026-12-06 | 12 / 15 / 6 / 2 | yes |
| `audits/2026-Q3/90-day-performance-audit.md` | 2026-09-06 → 2026-12-05 | 8 / 13 / 2 / 0 | yes |
| `audits/2026-09/monthly-hook-audit.md` | 2026-09-06 → 2026-10-06 | 24 / 57 / 5 / 2 | yes |
| `audits/2026-Q3/quarterly-whitespace-analysis.md` | 2026-09-07 → 2026-12-06 | full `data_limitations` block | yes |
| `strategy/strategic-roadmap.md` | 2026-09-07 → 2026-10-07 | 3 / 6 / 1 / 0 | yes |
| `strategy/messaging-strategy-input.md` | 2026-09-07 → 2026-10-07 | 9 / 19 / 1 / 0 | yes |
| `working-thesis-synthesis.md` | 2026-09-07 → 2026-10-07 | 7 / 35 / 6 / 2 | yes |

**The behaviour that most argues against fabrication.** Where the account's numbers do not reconcile, the docs carry the competing figures side by side and refuse to average them. `audits/2026-Q3/quarterly-whitespace-analysis.md` frontmatter: *"Trois totaux de dépense coexistent dans le coffre et ne se réconcilient pas : 684,82 € en somme de campagnes Raselio par l'API Meta, 677,81 € en somme des 163 lignes d'annonces, et 830,16 € au périmètre compte de Parker, marque soeur Trael comprise… Les deux sont portés côte à côte et jamais additionnés."* The same doc declares its own methodological breach — *"la queue de distribution, environ 155 lignes d'annonce chacune sous 14,33 €, n'a pas été lue une par une… ce qui est une entorse assumée à la règle de comptage de la méthode."*

The riskiest surfaces are the emptiest ones, and they are the best guarded. `audits/2026-Q3/customer-review-audit.md` quotes the tool's own message verbatim (*"This is not an access issue - the database simply has no review data to search"*), records `total_reviews_processed: 0 avis, 0 réponses de sondage post-achat, 2 commentaires publicitaires`, and explicitly refuses to pass the account's own ~224 headline/body pairs and five team-documented invented testimonials off as customer language — routing that guard through `source-pulls/personas/brand-self-echo-detection.md`. A build with a 2-snippet VoC corpus that writes 10 VoC slices is exactly where invention would show; `personas/voice-of-customer/voice-of-customer.md` carries `snippet_count_total: 2` and zeroed `category_counts` instead.

Denominators travel with every count across the corpus: "11 commandes" (183 occurrences), "6 achats" (174), "163 annonces" (127), "173 annonces" (61), "183 annonces" (52) — the variants are the competing pull scopes, each used where its scope applies, not smoothed into one number.

### Two numeric inconsistencies — named, below the fabrication bar

1. **Instagram spend share: 28,2 % vs 28,1 %.** 16 files say 28,2 % (including `CLAUDE.md`, `README.md`, `audits/2026-Q3/90-day-performance-audit.md` and the source pull `source-pulls/personas/ad-account.md`); three say 28,1 % (`audits/2026-Q3/quarterly-whitespace-analysis.md`, `audits/2026-Q3/customer-review-audit.md`, `running-notes/missing-context.md`). Both later docs were generated 2026-09-07 against a moving account, so this is most likely a re-pull, not an invention — but nothing in either doc says so, and 28,2 % is the number the source pull carries.
2. **`audits/INDEX.md` header denominators** — covered as Gap 6.5. The index states 163 ads / 6 purchases as folder-wide fact where the underlying audits carry an unreconciled 183-vs-173 split. This is the one place in the sample where a number is asserted more confidently than its sources support.

### Three standing docs carry no open-loops tail — verify, do not assume

`personas/voice-of-customer/voc-corpus-profile.md`, `competitors/thomyle/sub-context-docs/running-notes-on-competitor.md`, `competitors/_competitive-set.md`. All three are plausibly exempt by type (a corpus-statistics doc, a running-notes doc, a roster). Not called a fail, but a fixer should confirm against each one's generating prompt in `parker-system/prompts/` rather than assume.

---

## 8. The status file — FAIL

`BUILD-STATUS.md` is **frozen at 2026-09-07 05:30 UTC** and describes a build that had barely started. It also **still lives at the repo root**; the runner requires it archived into `prompts-run-log/` at completion, with the repo root carrying no live status file once the build is done.

Its dashboard versus disk:

| Row as written | Actually on disk |
|---|---|
| Phase en cours: **Phase 2 (stratégie) en cours** | Phases 2 and 3 both complete |
| Phase 1E — audits de référence: **0 / 17** | **17 / 17** |
| Phase 1A — fondation marque: **2 / 14 (6 en cours)** | **14 / 14** |
| Phase 1B — concurrents: **0 / 31** | Thomyle 10/10, Gillette + Philips snapshot-only by documented deferral, `working-thesis-synthesis.md` written |
| Phase 1C — sources personas + synthèses: **0 / 12** | **12 / 12** |
| Phase 1D — voix du client: **0 / 12** | **11 / 11** (10 `voc-*` + assembly) |
| Phase 1 — synthèses transverses: **0 / 2** | **2 / 2** (`gaps-opportunities-inspo.md`, roll-up) |
| Phase 2 — stratégie: **0 / 5** | **5 / 5** |
| Phase 3 — idées et briefs: **0 / 4** | **4 / 4** (26 entries, evaluation, sprint-plan, 4 briefs) |
| Contrat, vérification, sauvegarde: **0 / 4** | Contract stamped, INDEXes written, this verification run; save pending |

Every `[pending]` line in the Phase 1E, 1B, 1C, 1D, 1 synthesis, Phase 2 and Phase 3 ledger sections is stale. The `[blocked]` lines attributed to "limite de dépense atteinte le 2026-09-06 à 08:34 UTC" (Meta creative copy corpus, `operations-and-team`, `marketing-calendar-and-campaigns`, `category-and-market-research`, `competitive-landscape`, `customer-journey-and-persona-discovery`, `community-and-forums`) are all **resolved** — every one of those documents is on disk, and `source-pulls/meta-creatives-copy.md` is 2 093+ lines.

Two further errors to correct on close-out:

- The Phase 1B header names the third rival as **grumwise**; the build actually profiled `gillette-labs-body-intimate` and `philips-oneblade-intimate`. Grümwise ended up in the roster with no folder, correctly documented in `competitors/INDEX.md`.
- Phase 3 predicts output paths `idea-bank/evaluation-2026-09-06.md` and `sprints/2026-09-06-…/`; the real paths are dated **2026-09-07**.

Correct and worth carrying into the archived record: the `v15`-equals-`v14` tag note, the Parker-Desktop-absent / self-managed git note, and the one genuinely open item — **`strategy/strategic-roadmap.md` carries `status: drafted` with `approved_by:` empty**, awaiting the founder's approve/adjust/reject, which makes everything Phase 3 produced provisional. That gate is real, is recorded in three places (`BUILD-STATUS.md`, `running-notes/refresh-schedule.md`, every sprint brief's `provisional_note`), and is a legitimate open blocker rather than a build gap.

---

## What a fixer should do first

Ordered by blast radius. The first three are what make the brain misdescribe itself to its own next session.

1. **Rewrite the vault index in `sub-context-docs/brand-profile-narrative.md:94-97`.** It is the always-loaded first read and it currently tells Parker that `competitors/INDEX.md`, `audits/INDEX.md`, the open-loops roll-up and all of `strategy/` do not exist. Highest priority in the build.
2. **Rewrite `CLAUDE.md:206` ("What is not yet built").** Drop the four false claims — `working-thesis-synthesis.md`, `customer-review-audit.md`, `quarterly-whitespace-analysis.md` and the 26 idea-bank entries all exist. Keep the `briefs/_brief-template.md`, Thomyle-only-teardown, and empty-scaffold statements.
3. **Fix the freshness ledger, `running-notes/refresh-schedule.md`.** Flip the two "never generated" audit rows and the paragraph below them to their real 2026-09-07 dates; replace the "not yet run" open-loops row with the roll-up plus the twelve promoted loops and their **2026-09-21** due date; add the four external audits; add `working-thesis-synthesis.md`. The 2026-09-21 loop deadline is the nearest real date in the brain and nothing currently surfaces it.
4. **Regenerate `audits/INDEX.md` from the folder.** Eighteen audits, not twelve. Move `customer-review-audit.md` and `quarterly-whitespace-analysis.md` out of "Not generated"; add the four external cuts; replace the header's flat "163 Raselio ads / 6 purchases" with the reconciliation the underlying audits actually carry.
5. **Close out `BUILD-STATUS.md` against disk and move it into `prompts-run-log/`.** Mark 1E/1A/1B/1C/1D/synthesis/Phase 2/Phase 3 done, clear the spend-limit `[blocked]` lines, correct grumwise→gillette+philips and the 09-06→09-07 paths, keep the roadmap-approval gate as the one live open item, then archive it so the repo root carries no live status file.
6. **Backfill `prompts-run-log/2026-09-06-full-buildout.md`.** It stops at Phase 0. Even a reconstructed one-line-per-doc ledger (prompt path → output path → review verdict) is better than a build with no quality record; and if the per-prompt fidelity reviews genuinely never ran, that should be stated in the log rather than left ambiguous. Correct "20 craft skills" to 21 while there.
7. **Make `briefs/` survive a clone** — add a `README.md` (matching `dreaming/`, `workflows/`, `sprints/`) or a `.gitkeep`. Do the same for the empty `expert-insights/inbox|curation|context-update-candidates` that `CLAUDE.md:63` names, and for the `hypotheses/`, `validations/`, `re-validations/`, `open-loops/archived/` and `sprints/_unplanned/briefs/` subdirectories.
8. **Run `/setup-routines`** on the owner's account to arm the six schedules. Not a build defect — `list_triggers` returns empty and all six recipes say so honestly — but the brain does not refresh, dream or run its idea cycle until someone does this.
9. **Small stamps and one number.** Add `refresh_by` to `sprints/2026-09-07-sprint-1/retro.md`; convert `personas/voice-of-customer/voice-of-customer.md` from `last_updated` to `generated_on` so freshness walks see it; reconcile Instagram share at 28,2 % vs 28,1 % or state the re-pull; confirm against their generating prompts that `voc-corpus-profile.md`, `running-notes-on-competitor.md` and `_competitive-set.md` are genuinely exempt from the open-loops tail.

**Do not "fix":** the `parker-system (v14)` string from `git submodule status` — `v14` and `v15` are the same commit `b55c441`, both configured pins say `v15`, and the identity is documented in `running-notes/standard-sync.md`. And do not treat the pre-09:50-UTC "unreachable" notes as errors; they are a known recorded state with a priority re-run queue already written for them.

---

# Fixer pass — 2026-09-07

Run after the verification above, against the same filesystem. **Every number written below was counted on disk in this pass, not carried over from the verification report.** Where the verification's own count differed from what the walk found, the walk wins and the difference is named.

## What changed, file by file

### 1. `sub-context-docs/brand-profile-narrative.md` — the always-loaded first read

- **`foundation_gaps` frontmatter rewritten.** It named `working-thesis-synthesis.md`, five branch-E audits including `customer-review-audit` and `quarterly-whitespace-analysis`, and the open-loops roll-up as absent. All are on disk. The field now splits into what is genuinely missing (the nine Gillette and Philips slices, `briefs/_brief-template.md`, the four empty pipeline folders, the three empty scaffolds) and what is no longer missing, each with its date.
- **Vault index, four rows rewritten.** `competitors/INDEX.md` and `audits/INDEX.md` now read as written rather than "Pas encore générée", with what each actually covers. `open-loops/` now names the roll-up, the 12 promoted loops and the **2026-09-21** date. `strategy/` now names its five files and the `status: drafted` gate instead of "Vide au 2026-09-07".
- **Two further rows in the same table were also false and were fixed.** `idea-bank/`, `sprints/`, `briefs/` read "Vides au 2026-09-07"; the first two are not. That row is now split, one line for the Phase-3 artifacts as they exist and one for `briefs/`, which really is empty and never got a template. The `hypotheses/` row said those folders were empty "tant que le roll-up n'a pas tourné" — the roll-up has tourné, so the reason was corrected while keeping the true fact that the folders are empty.
- **One more stale claim found outside the passage named in the work order.** Line 55, under "Les vraies questions", said the canonical roll-up file "n'est pas encore écrit au 2026-09-07". Rewritten with the roll-up's own accounting read off its frontmatter: 233 collected, 23 killed, 210 consolidated, 12 promoted.
- **`working-thesis-synthesis.md` added to the vault index**, which had no line for it at all.

Every other claim and every piece of evidence in the doc was left untouched.

### 2. `CLAUDE.md`

- **"What is not yet built" rewritten and split in two.** The first paragraph is what is genuinely absent, checked in this pass. The second names what the old paragraph called missing and is on disk: `working-thesis-synthesis.md`, both branch-E audits, the 26 idea-bank entries, `strategy/`, the roll-up and its 12 loops.
- **"## The map" expanded.** `audits/` now names all four sub-folders and the 18-document count and points at the ad-count disagreement instead of implying one number. `competitors/` names the Thomyle-only teardown. `open-loops/` names the roll-up, the 12 loops and the 2026-09-21 date. `idea-bank/` names the 26 entries. `sprints/` names `2026-09-07-sprint-1/` and its contents. `strategy/` names its five files and the approval gate. `working-thesis-synthesis.md` got its own line; it had none.

### 3. `running-notes/refresh-schedule.md`

- **New section at the top, "The next three dates".** 2026-09-13 weekly snapshot, 2026-09-20 biweekly iterations, **2026-09-21 roll-up plus 12 loops**, each read off the file.
- **`working-thesis-synthesis.md` added** to the semi-annual table at its real dates, 2026-09-07 → 2026-10-07, with a paragraph on why it carries 30 days rather than the semi-annual default of its inputs.
- **Four external audits added** to the audit cadence table at the dates on their own frontmatter: `2026-Q3/external/90-day-diversity-audit-external.md` and `2026-Q3/external/single-competitor-ad-analysis-thomyle.md` (2026-09-07 → 2026-12-06), `2026-09/external/monthly-creative-landscape.md` and `2026-09/external/monthly-top-impressions-report.md` (2026-09-07 → **2026-10-07**).
- **The two "never generated" rows flipped** to 2026-09-07 → 2026-12-06, and the paragraph below the table, which repeated the error at length, was replaced with what each doc actually contains and why its emptiness is handled rather than hidden.
- **The open-loops row replaced.** "not yet run" became three rows: the roll-up at 2026-09-07 → 2026-09-21, the 12 promoted loops at the same dates, and a separate row for `hypotheses/`, `validations/`, `re-validations/` and `open-loops/archived/`, which are genuinely still empty and wait on the first `/research-loops` pass. A paragraph below the event-driven table explains why 2026-09-21 matters and is honest that 09-13 and 09-20 fall earlier on the calendar while being self-repeating cadence cuts.
- **A count line added** stating that eighteen documents live in `audits/` and all eighteen are now in the table.

### 4. `audits/INDEX.md` — regenerated from the folder

- **"Twelve audits exist" became eighteen**, counted as 6 + 4 + 6 + 2 across `2026-Q3/`, `2026-Q3/external/`, `2026-09/` and `2026-09/external/`. `INDEX.md` and `README.md` are excluded and said to be excluded.
- **The two audits under "Not generated, and why" moved into the real list** with real one-line reads taken from their own executive summaries. The "Not generated" heading now says the folder is complete and records that the earlier claim was wrong.
- **The four external cuts that had no line got one**, plus a new "2026-09 — monthly, external" section that did not exist.
- **The header's flat "163 Raselio ads, 6 Meta-attributed purchases" was replaced with the disagreement**, not a pick. Three ad totals with their scopes and their unexplained gaps (183/850,79 € Meta API account-wide, 173/771,64 € Parker, 163/684,82 € Raselio-only, with 677,81 € as the sum of the 163 ad lines and a 7,01 € gap the sources do not explain). Purchases are given as 6 Raselio-scope against 7 at Parker's account scope, since `quarterly-whitespace-analysis.md` works at that scope and reads 7. The 28,2 % vs 28,1 % Instagram split is stated as a disagreement and left unreconciled, as instructed.

### 5. `prompts-run-log/2026-09-06-full-buildout.md` — reconstructed

Was 15 lines and stopped at Phase 0. Now 208 lines.

- **The honesty statement is first, before the table.** It says plainly that the per-prompt fidelity review the runner specifies was not run on most documents, that the build ran through repeated session interruptions and a container restart, and that no contemporaneous review verdict exists for any document. It names what carried quality instead — the fidelity contract embedded in each prompt, and each doc's own `built_from` / `sources_read` / `data_limitations` frontmatter — and says the 2026-09-07 verification spot-checked twelve documents on a base of 116, which is a sample and not a review pass.
- **116 rows, one per document**, grouped into the eight phase branches: output path, generating prompt, `generated_on` date, review status. The review column reads **none logged** on every row, and the header says that is the honest value rather than a placeholder.
- **How the prompt column was resolved is stated.** No document in this brain carries a `prompt:` or `generated_by:` key, so the prompt is resolved from the runner's path convention; the two rows that do not follow it (`competitors/_competitive-set.md`, seeded by the runner's intake step, and `retro.md`, scaffolded by the sprint-plan prompt) are flagged in place. A note recommends stamping the prompt path into frontmatter so a future build never has to infer it.
- **The outputs with no `generated_on` are named rather than left invisible**: the 25 raw source pulls on `pulled_on`, `running-notes-on-competitor.md` on `log_started`, the 4 sprint briefs on `last_updated`, the two running notes on `last_updated`, and the contract and map files that carry no date key.
- **"20 craft skills" corrected to 21** in the Phase 0 block, with the correction shown rather than silently swapped, and the arithmetic that closes it: 21 mount skills + 5 routine-only = the 26 in `.claude/skills/`.

### 6. Empty directories

`.gitkeep` created in **15 directories**, every one confirmed empty first with `ls -A`:

`briefs/`, `expert-insights/inbox/`, `expert-insights/curation/`, `expert-insights/context-update-candidates/`, `hypotheses/tested/`, `hypotheses/awaiting-user/`, `hypotheses/denied/`, `validations/validated/`, `validations/invalidated/`, `validations/inconclusive/`, `validations/insufficient-evidence/`, `re-validations/scheduled/`, `re-validations/results/`, `open-loops/archived/`, `sprints/_unplanned/briefs/`.

`hypotheses/`, `validations/`, `re-validations/`, `dreaming/`, `workflows/` and `expert-insights/` were **not** empty at their own level — each holds a `README.md` — so the placeholder went into their empty children instead. After the pass, `find -type d -empty` outside `parker-system/` returns **nothing**.

### 7. The minor items

- **`sprints/2026-09-07-sprint-1/retro.md`** now carries `refresh_by: 2026-10-05` plus a `refresh_note` saying that date is a shipping estimate, not a calendar deadline, and that the real trigger stays the `due_when` field. The field exists so a freshness walk sees the document at all.
- **`personas/voice-of-customer/voice-of-customer.md`** changed from `last_updated: 2026-09-06` to `generated_on: 2026-09-06`, date unchanged, with a `frontmatter_note` recording the change and why. It is a standing synthesis listed in the semi-annual table and a walk keyed on `generated_on` did not see it. The `generated_on` document count therefore moved from 115 to **116**.
- **The three docs with no open-loops tail were checked against their generating prompts, and all three are exempt.** A note saying so, with the evidence, was added to each:
  - `personas/voice-of-customer/voc-corpus-profile.md` — its prompt is the only one of the eleven voice-of-customer prompts that does not embed `_open-loops-core-block.md`, and its output template ends at "Data limitations" with no loops section. Exempt by construction.
  - `competitors/thomyle/sub-context-docs/running-notes-on-competitor.md` — its prompt embeds the block but changes its form: loops belong "inline on the entry as the `Open loop, if any` field". The doc carries that field on eight entries, three with a live question and five pointing at the loop already held elsewhere rather than duplicating it. Conforming, not amputated.
  - `competitors/_competitive-set.md` — has no dedicated prompt in `parker-system/prompts/` at all. The roster is seeded by the founder intake at step 4 of `onboarding-runner.md`, which names it three times as a destination and never as a context doc. Exempt by nature; its one open question is question 4 of `running-notes/missing-context.md`.

## What was verified after the changes

Each of these was re-run against the filesystem after the edits, not assumed:

| Check | Result |
|---|---|
| Stale-state grep across `brand-profile-narrative.md` and `CLAUDE.md` ("pas encore générée", "vide au", "pas encore écrit", "does not exist", "are missing") | **clean** — the one remaining hit is `CLAUDE.md` correctly calling `retro.md` a deliberate empty scaffold |
| Every audit on disk has a row in `running-notes/refresh-schedule.md` | **18 / 18** |
| Every audit on disk has a line in `audits/INDEX.md` | **18 / 18** |
| Every prompt path written into the reconstructed build log resolves to a real file in the mount | **75 distinct prompt paths, all resolve** |
| Rows in the reconstructed build log | **116**, one per document carrying `generated_on`, none unmapped |
| Documents outside `parker-system/` carrying `generated_on` | **116** (115 before, plus `voice-of-customer.md` after the key change) |
| `.gitkeep` files created | **15** |
| Empty directories remaining outside `parker-system/` | **0** |
| `refresh_by` on `retro.md` | present, 2026-10-05 |
| Open-loops exemption note on the three docs | **3 / 3** |
| Skills in the mount, counted by name | **21** — the log's "20" was the error, the shipment was complete |

## Deliberately not touched

- **The 28,2 % vs 28,1 % Instagram split.** Both figures are carried, and `audits/INDEX.md` now states the disagreement where it used to be silent. Neither was changed to match the other.
- **The 183 / 173 / 163 ad-count disagreement.** Stated with its three scopes and its two unexplained gaps wherever a doc used to pick one silently. No number was reconciled, averaged or dropped.
- **The `parker-system (v14)` submodule string.** `v14` and `v15` are the same commit and both configured pins say `v15`, as the verification records.
- **`BUILD-STATUS.md`.** Item 5 of the verification's fixer list (close it out against disk, archive it into `prompts-run-log/`, clear the stale `[blocked]` lines) was **not in this pass's scope** and was not done. It is still frozen at 2026-09-07 05:30 UTC and still at the repo root, and every row of its dashboard is still wrong against disk. **This is the largest remaining known-false surface in the brain.**
- **`/setup-routines`.** Still not run; the six schedules are still un-armed, and all six recipes still say so honestly. It needs the account owner.
