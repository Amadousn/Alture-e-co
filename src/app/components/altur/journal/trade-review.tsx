"use client";

import { useState } from "react";
import { useStrategies, useTradeReviews, TradeReview as Review } from "@/utils/workspace-store";

// The trader's review of one closed trade: the strategy and which of its
// confluences were there, how it went in their own words, and a rating of the
// execution. Saved in this browser with the journal.

export const TAGS = ["Followed the plan", "Patient entry", "FOMO", "Revenge trade", "Overtrading", "Moved the stop", "Exited early", "Entered late", "News event"];
const label = "text-[11px] uppercase tracking-[0.08em] text-[var(--j-mu,#7d7d87)]";
const chip = (on: boolean) => `rounded-sm border px-2.5 py-1 text-xs transition-colors ${on ? "border-[var(--j-ink,#fff)] bg-[var(--j-active,#fff)] text-[var(--j-activeink,#000)]" : "border-[var(--j-line,rgba(255,255,255,0.2))] text-[var(--j-ink,rgba(255,255,255,0.8))] hover:border-[var(--j-mu,rgba(255,255,255,0.6))]"}`;

const TradeReview = ({ tradeId }: { tradeId: string }) => {
    const [reviews, setReviews, store] = useTradeReviews();
    const [strategies] = useStrategies();
    const [custom, setCustom] = useState("");
    const review: Review = reviews[tradeId] ?? {};
    const update = (change: Partial<Review>) => setReviews((all) => ({ ...all, [tradeId]: { ...(all[tradeId] ?? {}), ...change } }));
    const toggle = (list: string[] | undefined, item: string) => (list?.includes(item) ? list.filter((value) => value !== item) : [...(list ?? []), item]);
    const strategy = strategies.find((item) => item.name === review.strategy);
    const tags = [...TAGS, ...(review.tags ?? []).filter((tag) => !TAGS.includes(tag))];

    if (!store.ready) return null;
    return (
        <div className="border-t border-[var(--j-line,rgba(255,255,255,0.15))] px-5 py-4">
            <p className="text-sm font-semibold text-[var(--j-ink,#fff)]">Your review</p>

            <p className={`${label} mt-4 mb-2`}>Strategy</p>
            {strategies.length === 0 ? (
                <p className="text-xs leading-relaxed text-[var(--j-mu,rgba(255,255,255,0.45))]">Add your strategies in the journal, under Strategies, to tick their confluences here.</p>
            ) : (
                <div className="flex flex-wrap gap-1.5">
                    {strategies.map((item) => (
                        <button key={item.id} type="button" aria-pressed={review.strategy === item.name} onClick={() => update({ strategy: review.strategy === item.name ? undefined : item.name, confluences: [] })} className={chip(review.strategy === item.name)}>
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
            {strategy && strategy.confluences.length > 0 && (
                <div className="mt-3 space-y-1.5">
                    {strategy.confluences.map((item) => {
                        const on = review.confluences?.includes(item) ?? false;
                        return (
                            <label key={item} className="flex cursor-pointer items-center gap-2.5 text-sm text-[var(--j-ink,rgba(255,255,255,0.8))]">
                                <input type="checkbox" checked={on} onChange={() => update({ confluences: toggle(review.confluences, item) })} className="!h-4 !w-4 accent-white" />
                                {item}
                            </label>
                        );
                    })}
                </div>
            )}

            <p className={`${label} mt-5 mb-2`}>Execution</p>
            <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating of the execution">
                {[1, 2, 3, 4, 5].map((stars) => (
                    <button key={stars} type="button" role="radio" aria-checked={review.rating === stars} aria-label={`${stars} of 5`} onClick={() => update({ rating: review.rating === stars ? undefined : stars })} className={`text-xl leading-none transition-colors ${(review.rating ?? 0) >= stars ? "text-[var(--j-ink,#fff)]" : "text-[var(--j-fa,rgba(255,255,255,0.2))] hover:text-[var(--j-mu,rgba(255,255,255,0.45))]"}`}>
                        ★
                    </button>
                ))}
                <span className="ml-2 text-xs text-[var(--j-mu,rgba(255,255,255,0.45))]">How well you followed your plan, whatever the result.</span>
            </div>

            <p className={`${label} mt-5 mb-2`}>Tags</p>
            <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                    <button key={tag} type="button" aria-pressed={review.tags?.includes(tag) ?? false} onClick={() => update({ tags: toggle(review.tags, tag) })} className={chip(review.tags?.includes(tag) ?? false)}>
                        {tag}
                    </button>
                ))}
            </div>
            <form
                className="mt-2 flex gap-2"
                onSubmit={(event) => {
                    event.preventDefault();
                    const tag = custom.trim();
                    if (tag && !review.tags?.includes(tag)) update({ tags: [...(review.tags ?? []), tag] });
                    setCustom("");
                }}
            >
                <input value={custom} onChange={(event) => setCustom(event.target.value)} maxLength={30} placeholder="Your own tag" className="!h-8 !flex-1 !rounded-sm !border !border-[var(--j-line,rgba(255,255,255,0.2))] !bg-transparent !px-2.5 !text-xs !text-[var(--j-ink,#fff)] placeholder:!text-[var(--j-ink,#fff)]/30 focus:!border-[var(--j-ink,#fff)]" />
                <button type="submit" className="h-8 rounded-sm border border-[var(--j-line,rgba(255,255,255,0.25))] px-3 text-xs text-[var(--j-ink,#fff)] hover:border-white">
                    Add
                </button>
            </form>

            <p className={`${label} mt-5 mb-2`}>Notes</p>
            <textarea value={review.notes ?? ""} onChange={(event) => update({ notes: event.target.value })} rows={3} maxLength={1000} placeholder="What you saw, why you took it, what you would do differently." className="!block !w-full !rounded-sm !border !border-[var(--j-line,rgba(255,255,255,0.2))] !bg-transparent !px-3 !py-2 !text-sm !text-[var(--j-ink,#fff)] placeholder:!text-[var(--j-ink,#fff)]/30 focus:!border-[var(--j-ink,#fff)]" />
            <p className="mt-2 text-[11px] text-[var(--j-mu,rgba(255,255,255,0.45))]">{store.persistent ? "Saved as you go." : "This browser is blocking storage: the review will not be kept."}</p>
        </div>
    );
};

export default TradeReview;
