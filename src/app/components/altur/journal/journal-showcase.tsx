"use client";

// Interactive pieces of the Journal page. Each one is built from the real journal
// components (the same chart, score card, bars, trade panel and candle recap) fed
// with the public sample trades. Nothing here reads or writes a real account.

import { useMemo, useState } from "react";
import type { ClosedTrade } from "@/utils/bybit";
import { scoreOf, insightsOf, MIN_SCORE_TRADES } from "@/utils/journal-insights";
import { THEMES } from "@/app/components/altur/workspace/os/design";
import { useSample, SAMPLE_ACCOUNTS, SampleAccount } from "./journal-demo";
import { Chart, Mode, ScoreCard, Bars, group, IMPROVE, WEEK, SESSIONS } from "./journal-studio";
import TradeDetails, { TradeDetail } from "./trade-details";
import TradeRecap from "./trade-recap";
import { TAGS } from "./trade-review";
import type { TradeReview } from "@/utils/workspace-store";

const vars = THEMES.dark as unknown as React.CSSProperties;
const NO_REVIEWS = {};
const asset = (s: string) => s.replace(/USDT$/, "");
const usd = (v: number, d = 2) => `${v < 0 ? "−" : "+"}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;
const px = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: v >= 100 ? 1 : 4 });
const tone = (v: number) => (v > 0 ? "text-[var(--j-up)]" : v < 0 ? "text-[var(--j-dn)]" : "text-[var(--j-mu)]");
const when = (at: number) => new Date(at).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const held = (t: ClosedTrade) => {
    if (t.openedAt === undefined) return "–";
    const m = Math.round((t.closedAt - t.openedAt) / 60000);
    return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`;
};

// Fictional reviews for the sample trades, in the shape the journal stores them
// (strategy, tags, a 1 to 5 execution rating, notes). Shown only on this page.
const NOTES_WIN = [
    "Waited for the retest of the London high before entering. Took the full target.",
    "Clean break of structure on the 15 minute. Stop below the last swing, never touched.",
    "Entered on the pullback, not the first candle. Patience paid on this one.",
    "Followed the checklist line by line. Trailed the stop after 1R.",
];
const NOTES_LOSS = [
    "Entered before the candle closed. The level did not hold. Wait for the close next time.",
    "Took it against the higher time frame trend. The plan said no.",
    "Valid setup, the market simply went the other way. Stop respected.",
    "Moved the stop once. Small loss became a full one.",
];
export const sampleReview = (t: ClosedTrade): TradeReview => {
    const i = Number(t.id.replace(/\D/g, "")) || 0;
    const won = t.profitLoss > 0;
    const clean = won ? i % 4 !== 3 : i % 3 === 0;
    const tags = won ? (clean ? ["Followed the plan", "Patient entry"] : ["Exited early"]) : clean ? ["Followed the plan"] : [["FOMO", "Entered late"], ["Moved the stop"], ["Revenge trade", "Overtrading"]][i % 3];
    return {
        strategy: t.setup === "Reversal" ? "Liquidity sweep reversal" : "Trend continuation",
        tags: tags.filter((x) => TAGS.includes(x)),
        rating: clean ? (won ? 5 - (i % 2) : 4) : won ? 3 : 1 + (i % 2),
        notes: (won ? NOTES_WIN : clean ? [NOTES_LOSS[2]] : [NOTES_LOSS[0], NOTES_LOSS[1], NOTES_LOSS[3]])[i % (won ? 4 : clean ? 1 : 3)],
    };
};
const sessionOf = (t: ClosedTrade) => {
    const h = new Date(t.openedAt ?? t.closedAt).getUTCHours();
    return SESSIONS.find((s) => h >= s.from && h < s.to)?.name ?? "–";
};
const Stars = ({ n }: { n: number }) => (
    <span aria-label={`${n} of 5`} className="tracking-[0.15em]">
        <span className="text-[var(--j-ink)]">{"★".repeat(n)}</span>
        <span className="text-[var(--j-s3)]">{"★".repeat(5 - n)}</span>
    </span>
);

// The panel every demo sits in: the journal's own dark theme.
export const Frame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div style={vars} className={`overflow-hidden rounded-[10px] border border-white/10 bg-[var(--j-bg)] text-[var(--j-ink)] ${className}`}>{children}</div>
);

export const SampleTag = () => <span className="rounded-sm border border-[#FACC15]/50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#FACC15]">Sample data</span>;

const Loading = ({ h = 320 }: { h?: number }) => <div role="status" aria-label="Loading the sample" className="animate-pulse bg-[var(--j-s1)]" style={{ height: h }} />;

const Tabs = <T extends string>({ items, value, onChange, label }: { items: [T, string][]; value: T; onChange: (v: T) => void; label: string }) => (
    <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
        {items.map(([id, text]) => (
            <button key={id} role="tab" type="button" aria-selected={id === value} onClick={() => onChange(id)} className={`rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors ${id === value ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`}>
                {text}
            </button>
        ))}
    </div>
);

// ---------- Alture Score ----------

// What each factor reads, why it matters. The figures and the formula are the journal's own.
const FACTORS: Record<string, { measures: string; why: string }> = {
    "Win rate": { measures: "The share of your closed trades that ended in profit.", why: "On its own it says little: a high win rate with small wins can still lose money. Read it with Win / loss size." },
    "Profit factor": { measures: "What your winning trades earned for every dollar your losing trades lost.", why: "Under 1, the account shrinks. It is the quickest check that a strategy pays at all." },
    "Win / loss size": { measures: "Your average winning trade divided by your average losing trade.", why: "It shows whether winners are allowed to run and losers are cut short." },
    Consistency: { measures: "The share of your trading days that closed green.", why: "Steady days are easier to repeat than one big day that hides many small losses." },
    "Drawdown control": { measures: "How far your equity fell from its high, compared with what you made.", why: "A deep fall pushes you to take more risk to recover. A shallow one lets you keep trading calmly." },
    Discipline: { measures: "Your own 1 to 5 rating of how closely each trade followed your plan.", why: "It separates a strategy that does not work from a plan that was not followed." },
};
const band = (v: number) => (v >= 70 ? { text: "Strong", color: "var(--j-up)" } : v >= 45 ? { text: "Average", color: "var(--j-ink)" } : { text: "To work on", color: "var(--j-dn)" });

export const ScoreDemo = () => {
    const data = useSample();
    const trades = useMemo(() => (data ? [...data.trades].sort((a, b) => a.closedAt - b.closedAt) : []), [data]);
    const score = useMemo(() => (trades.length ? scoreOf(trades, NO_REVIEWS) : null), [trades]);
    const insights = useMemo(() => insightsOf(trades, NO_REVIEWS, (t) => t.setup), [trades]);
    const [pick, setPick] = useState<string | null>(null);
    if (!data) return <Frame><Loading h={420} /></Frame>;
    const parts = score?.parts ?? [];
    const active = parts.find((p) => p.label === pick) ?? parts[0];
    const b = active ? band(active.value) : null;
    return (
        <Frame>
            <div className="flex items-center justify-between border-b border-[var(--j-line)] px-5 py-3">
                <span className="text-[12.5px] text-[var(--j-mu)]">Alture Score · all sample trades</span>
                <SampleTag />
            </div>
            <ScoreCard score={score} insights={insights} count={trades.length} />
            {active && b && (
                <div className="border-t border-[var(--j-line)] px-5 py-5">
                    <p className="text-[12.5px] text-[var(--j-mu)]">Choose a factor to see what it means</p>
                    <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,15rem)_1fr]">
                        <ul role="tablist" aria-label="Score factors" className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
                            {parts.map((p) => (
                                <li key={p.label}>
                                    <button type="button" role="tab" aria-selected={p.label === active.label} onClick={() => setPick(p.label)} onMouseEnter={() => setPick(p.label)} className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-[13px] transition-colors ${p.label === active.label ? "bg-[var(--j-s2)] text-[var(--j-ink)]" : "text-[var(--j-mu)] hover:bg-[var(--j-s1)] hover:text-[var(--j-ink)]"}`}>
                                        <span className="truncate">{p.label}</span>
                                        <span className="font-logo tabular-nums" style={{ color: band(p.value).color }}>{Math.round(p.value)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <dl key={active.label} className="grid gap-x-8 gap-y-5 text-[13.5px] leading-relaxed sm:grid-cols-2" style={{ animation: "jp-in .35s both" }}>
                            <div>
                                <dt className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-mu)]">What it measures</dt>
                                <dd className="mt-1.5">{FACTORS[active.label]?.measures}</dd>
                            </div>
                            <div>
                                <dt className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-mu)]">Why it matters</dt>
                                <dd className="mt-1.5">{FACTORS[active.label]?.why}</dd>
                            </div>
                            <div>
                                <dt className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-mu)]">How to read it</dt>
                                <dd className="mt-1.5">
                                    <span style={{ color: b.color }}>{Math.round(active.value)} / 100 · {b.text}.</span> {active.detail}. 70 and above is strong, 45 to 69 average, under 45 the place to start.
                                </dd>
                            </div>
                            <div>
                                <dt className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-mu)]">What to improve</dt>
                                <dd className="mt-1.5">{(IMPROVE[active.label] ?? ((d: string) => d))(active.detail)}</dd>
                            </div>
                        </dl>
                    </div>
                    <p className="mt-5 text-[11.5px] text-[var(--j-fa)]">The score appears from {MIN_SCORE_TRADES} closed trades. Discipline is added once you rate your own trades.</p>
                </div>
            )}
        </Frame>
    );
};

// ---------- Trade explorer ----------

export const TradeExplorer = () => {
    const data = useSample();
    const list = useMemo(() => (data ? data.trades.slice(0, 10) : []), [data]);
    const [id, setId] = useState<string | null>(null);
    const [open, setOpen] = useState<TradeDetail | null>(null);
    if (!data) return <Frame><Loading h={460} /></Frame>;
    const t = list.find((x) => x.id === id) ?? list[0];
    if (!t) return null;
    const i = list.indexOf(t);
    const cells: [string, string, string?][] = [
        ["Asset", asset(t.instrument)],
        ["Side", `${t.direction} · ${t.leverage}×`],
        ["Entry", px(t.entryPrice)],
        ["Exit", px(t.exitPrice)],
        ["Result", usd(t.profitLoss), tone(t.profitLoss)],
        ["Fees", `$${t.fee.toFixed(2)}`],
        ["Held", held(t)],
        ["Session", sessionOf(t)],
        ["Strategy", sampleReview(t).strategy ?? "–"],
        ["Execution", `${sampleReview(t).rating} / 5`],
    ];
    return (
        <Frame>
            <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
                <div className="min-w-0 border-b border-[var(--j-line)] lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-[12.5px] text-[var(--j-mu)]">Recent trades</span>
                        <SampleTag />
                    </div>
                    <ul role="listbox" aria-label="Sample trades" className="flex overflow-x-auto [scrollbar-width:none] lg:block lg:max-h-[520px] lg:overflow-y-auto">
                        {list.map((x) => (
                            <li key={x.id} className="flex-shrink-0">
                                <button type="button" role="option" aria-selected={x.id === t.id} onClick={() => setId(x.id)} className={`flex w-[11rem] items-center justify-between gap-3 border-t border-[var(--j-line)] px-4 py-3 text-left transition-colors lg:w-full ${x.id === t.id ? "bg-[var(--j-s2)]" : "hover:bg-[var(--j-s1)]"}`}>
                                    <span>
                                        <span className="block text-[13.5px]">{asset(x.instrument)} <span className={x.direction === "Long" ? "text-[var(--j-up)]" : "text-[var(--j-dn)]"}>{x.direction}</span></span>
                                        <span className="block text-[11.5px] text-[var(--j-fa)]">{when(x.closedAt)} · {x.setup}</span>
                                    </span>
                                    <span className={`font-mono text-[12.5px] ${tone(x.profitLoss)}`}>{usd(x.profitLoss, 0)}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div key={t.id} className="min-w-0 p-4 md:p-5" style={{ animation: "jp-in .35s both" }}>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className="text-[18px] font-medium">
                            {asset(t.instrument)} <span className="text-[var(--j-mu)]">{t.direction}</span>
                        </p>
                        <p className={`font-logo text-[26px] font-extralight tabular-nums ${tone(t.profitLoss)}`}>{usd(t.profitLoss)}</p>
                    </div>
                    <div className="mt-3">
                        <TradeRecap trade={t} sample bare />
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[var(--j-line)] bg-[var(--j-line)] sm:grid-cols-4">
                        {cells.map(([k, v, c]) => (
                            <div key={k} className="bg-[var(--j-bg)] px-3 py-2.5">
                                <dt className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-fa)]">{k}</dt>
                                <dd className={`mt-1 truncate font-mono text-[13px] ${c ?? ""}`}>{v}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-3 rounded-md border border-[var(--j-line)] px-3 py-2.5">
                        <p className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-fa)]">Trader&apos;s note</p>
                        <p className="mt-1 text-[13px] leading-relaxed">{sampleReview(t).notes}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="max-w-md text-[12px] leading-relaxed text-[var(--j-fa)]">Screenshots can be added to every trade in your own journal.</p>
                        <button type="button" onClick={() => setOpen({ kind: "closed", trade: t })} className="rounded-sm bg-[var(--j-active)] px-4 py-2 text-[12.5px] font-medium text-[var(--j-activeink)] transition-opacity hover:opacity-90">
                            Open the trade
                        </button>
                    </div>
                </div>
            </div>
            {open && (
                <TradeDetails
                    detail={open}
                    colours={vars}
                    position={{ index: i, total: list.length }}
                    onClose={() => setOpen(null)}
                    onPrevious={i > 0 ? () => { setId(list[i - 1].id); setOpen({ kind: "closed", trade: list[i - 1] }); } : undefined}
                    onNext={i < list.length - 1 ? () => { setId(list[i + 1].id); setOpen({ kind: "closed", trade: list[i + 1] }); } : undefined}
                />
            )}
        </Frame>
    );
};

// ---------- Analytics ----------

const MODES: [Mode, string][] = [
    ["equity", "Equity"],
    ["drawdown", "Drawdown"],
    ["daily", "Daily P&L"],
    ["cumulative", "Cumulative P&L"],
    ["outcomes", "Trade outcomes"],
];
type Lens = "strategy" | "asset" | "weekday" | "session" | "side";
const LENSES: [Lens, string][] = [
    ["strategy", "Strategy"],
    ["asset", "Asset"],
    ["weekday", "Weekday"],
    ["session", "Session"],
    ["side", "Long / Short"],
];

export const AnalyticsDemo = () => {
    const data = useSample();
    const [mode, setMode] = useState<Mode>("equity");
    const [lens, setLens] = useState<Lens>("strategy");
    const trades = useMemo(() => (data ? [...data.trades].sort((a, b) => a.closedAt - b.closedAt) : []), [data]);
    const rows = useMemo(() => {
        if (lens === "strategy") return [...new Set(trades.map((t) => t.setup ?? "Other"))].map((s) => group(s, trades.filter((t) => (t.setup ?? "Other") === s)));
        if (lens === "asset") return [...new Set(trades.map((t) => t.instrument))].map((s) => group(asset(s), trades.filter((t) => t.instrument === s)));
        if (lens === "side") return (["Long", "Short"] as const).map((d) => group(d, trades.filter((t) => t.direction === d))).filter((g) => g.count);
        if (lens === "weekday") return [1, 2, 3, 4, 5, 6, 0].map((d, i) => group(WEEK[i], trades.filter((t) => new Date(t.closedAt).getUTCDay() === d))).filter((g) => g.count);
        return SESSIONS.map((s) => group(s.name, trades.filter((t) => { const h = new Date(t.openedAt ?? t.closedAt).getUTCHours(); return h >= s.from && h < s.to; }))).filter((g) => g.count);
    }, [trades, lens]);
    const sorted = lens === "weekday" || lens === "session" || lens === "side" ? rows : [...rows].sort((a, b) => b.total - a.total);
    if (!data) return <Frame><Loading h={460} /></Frame>;
    return (
        <Frame>
            <div className="grid grid-cols-[minmax(0,1fr)] xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <div className="min-w-0 border-b border-[var(--j-line)] p-4 md:p-5 xl:border-b-0 xl:border-r">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Tabs label="Chart" items={MODES} value={mode} onChange={setMode} />
                        <SampleTag />
                    </div>
                    <div className="mt-4">
                        <Chart trades={trades} mode={mode} />
                    </div>
                </div>
                <div className="min-w-0 p-4 md:p-5">
                    <Tabs label="Analysis by" items={LENSES} value={lens} onChange={setLens} />
                    <div key={lens} style={{ animation: "jp-in .35s both" }}>
                        <Bars rows={sorted} />
                        <ul className="mt-5 space-y-1.5 border-t border-[var(--j-line)] pt-4 text-[12px] text-[var(--j-mu)]">
                            {sorted.map((r) => (
                                <li key={r.label} className="flex justify-between">
                                    <span>{r.label}</span>
                                    <span className="tabular-nums">{r.count} trades · {Math.round((r.wins / Math.max(1, r.count)) * 100)}% won</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Frame>
    );
};

// ---------- Accounts ----------

type Pick = "all" | SampleAccount;
export const AccountsDemo = () => {
    const [pick, setPick] = useState<Pick>("all");
    const data = useSample(pick === "all" ? undefined : pick);
    const trades = useMemo(() => (data ? [...data.trades].sort((a, b) => a.closedAt - b.closedAt) : []), [data]);
    const net = trades.reduce((s, t) => s + t.profitLoss, 0);
    const wins = trades.filter((t) => t.profitLoss > 0);
    const gain = wins.reduce((s, t) => s + t.profitLoss, 0);
    const loss = -trades.filter((t) => t.profitLoss < 0).reduce((s, t) => s + t.profitLoss, 0);
    const figures: [string, string, string?][] = [
        ["Net result", usd(net), tone(net)],
        ["Trades", String(trades.length)],
        ["Win rate", trades.length ? `${Math.round((wins.length / trades.length) * 100)}%` : "–"],
        ["Profit factor", loss ? (gain / loss).toFixed(2) : "–"],
    ];
    const items: [Pick, string][] = [["all", "All accounts"], ...SAMPLE_ACCOUNTS.map((a) => [a.id, a.name] as [Pick, string])];
    return (
        <Frame>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--j-line)] px-4 py-3 md:px-5">
                <Tabs label="Accounts" items={items} value={pick} onChange={setPick} />
                <SampleTag />
            </div>
            {!data ? (
                <Loading h={330} />
            ) : (
                <div key={pick} className="p-4 md:p-5" style={{ animation: "jp-in .35s both" }}>
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[var(--j-line)] bg-[var(--j-line)] md:grid-cols-4">
                        {figures.map(([k, v, c]) => (
                            <div key={k} className="bg-[var(--j-bg)] px-4 py-3">
                                <dt className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-fa)]">{k}</dt>
                                <dd className={`mt-1.5 font-logo text-[22px] font-extralight tabular-nums ${c ?? ""}`}>{v}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-4">
                        <Chart trades={trades} mode="equity" />
                    </div>
                </div>
            )}
        </Frame>
    );
};

// ---------- Calendar: days into weeks into the month ----------

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WeeksDemo = () => {
    const data = useSample();
    const months = useMemo(() => {
        const out = new Map<string, ClosedTrade[]>();
        for (const t of data?.trades ?? []) {
            const d = new Date(t.closedAt);
            const k = `${d.getUTCFullYear()}-${String(d.getUTCMonth()).padStart(2, "0")}`;
            out.set(k, [...(out.get(k) ?? []), t]);
        }
        return [...out.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
    }, [data]);
    const [at, setAt] = useState<number | null>(null);
    const [week, setWeek] = useState<number | null>(null);
    if (!data || !months.length) return <Frame><Loading h={360} /></Frame>;
    const idx = at ?? months.length - 1;
    const [key, list] = months[idx];
    const [y, m] = key.split("-").map(Number);
    // Weeks run Monday to Sunday, as in the journal's calendar.
    const weekOf = (t: ClosedTrade) => {
        const d = new Date(t.closedAt).getUTCDate();
        const lead = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7;
        return Math.floor((d - 1 + lead) / 7);
    };
    const weeks = [...new Set(list.map(weekOf))].sort((a, b) => a - b).map((w) => {
        const tr = list.filter((t) => weekOf(t) === w);
        const days = new Map<number, number>();
        for (const t of tr) days.set(new Date(t.closedAt).getUTCDate(), (days.get(new Date(t.closedAt).getUTCDate()) ?? 0) + t.profitLoss);
        return { w, tr, total: tr.reduce((s, t) => s + t.profitLoss, 0), days: [...days.entries()].sort(([a], [b]) => a - b) };
    });
    const total = list.reduce((s, t) => s + t.profitLoss, 0);
    const largest = Math.max(1, ...weeks.map((x) => Math.abs(x.total)));
    const open = weeks.find((x) => x.w === week) ?? null;
    const shift = (by: number) => { setAt(Math.min(months.length - 1, Math.max(0, idx + by))); setWeek(null); };
    return (
        <Frame>
            <div className="flex items-center justify-between gap-3 border-b border-[var(--j-line)] px-4 py-3 md:px-5">
                <div className="flex items-center gap-2 text-[14px]">
                    <button type="button" aria-label="Previous month" disabled={idx === 0} onClick={() => shift(-1)} className="px-2 text-[var(--j-mu)] hover:text-[var(--j-ink)] disabled:opacity-30">‹</button>
                    <span className="min-w-[9rem] text-center font-medium">{MONTHS[m]} {y}</span>
                    <button type="button" aria-label="Next month" disabled={idx === months.length - 1} onClick={() => shift(1)} className="px-2 text-[var(--j-mu)] hover:text-[var(--j-ink)] disabled:opacity-30">›</button>
                </div>
                <SampleTag />
            </div>
            <div key={key} className="grid gap-5 p-4 md:grid-cols-[1.2fr_1fr] md:p-5" style={{ animation: "jp-in .35s both" }}>
                <div>
                    <ul className="space-y-1.5">
                        {weeks.map((x, n) => (
                            <li key={x.w}>
                                <button type="button" aria-pressed={week === x.w} onClick={() => setWeek(week === x.w ? null : x.w)} className={`grid w-full grid-cols-[4.5rem_1fr_6rem] items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] transition-colors ${week === x.w ? "bg-[var(--j-s2)]" : "hover:bg-[var(--j-s1)]"}`}>
                                    <span className="text-[var(--j-mu)]">Week {n + 1}</span>
                                    <span className="h-[6px] rounded-full bg-[var(--j-s2)]">
                                        <span className="block h-full rounded-full" style={{ width: `${(Math.abs(x.total) / largest) * 100}%`, background: x.total >= 0 ? "var(--j-up)" : "var(--j-dn)" }} />
                                    </span>
                                    <span className={`text-right font-mono ${tone(x.total)}`}>{usd(x.total, 0)}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between border-t border-[var(--j-line)] px-3 pt-3 text-[13px]">
                        <span className="text-[var(--j-mu)]">{MONTHS[m]} · {list.length} trades</span>
                        <span className={`font-mono ${tone(total)}`}>{usd(total, 0)}</span>
                    </div>
                </div>
                <div className="rounded-md border border-[var(--j-line)] p-4">
                    {open ? (
                        <>
                            <p className="text-[12.5px] text-[var(--j-mu)]">The days of that week</p>
                            <ul className="mt-3 space-y-2 text-[13px]">
                                {open.days.map(([d, v]) => (
                                    <li key={d} className="flex justify-between">
                                        <span>{d} {MONTHS[m].slice(0, 3)}</span>
                                        <span className={`font-mono ${tone(v)}`}>{usd(v, 0)}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 border-t border-[var(--j-line)] pt-3 text-[12px] text-[var(--j-fa)]">{open.tr.length} trades · {Math.round((open.tr.filter((t) => t.profitLoss > 0).length / open.tr.length) * 100)}% won</p>
                        </>
                    ) : (
                        <p className="text-[13px] leading-relaxed text-[var(--j-mu)]">Pick a week. Its days open here, and the weeks add up to the month below. A red week stands out at a glance.</p>
                    )}
                </div>
            </div>
        </Frame>
    );
};

// ---------- Notes and discipline ----------

export const NotesDemo = () => {
    const data = useSample();
    const list = useMemo(() => (data ? data.trades.slice(0, 8) : []), [data]);
    const [id, setId] = useState<string | null>(null);
    if (!data) return <Frame><Loading h={360} /></Frame>;
    const t = list.find((x) => x.id === id) ?? list[0];
    if (!t) return null;
    const r = sampleReview(t);
    const followed = r.tags?.includes("Followed the plan");
    const rated = list.map(sampleReview);
    const kept = rated.filter((x) => x.tags?.includes("Followed the plan")).length;
    return (
        <Frame>
            <div className="flex items-center justify-between border-b border-[var(--j-line)] px-4 py-3 md:px-5">
                <span className="text-[12.5px] text-[var(--j-mu)]">Your review of each trade</span>
                <SampleTag />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
                <ul className="flex overflow-x-auto border-b border-[var(--j-line)] [scrollbar-width:none] md:block md:border-b-0 md:border-r">
                    {list.map((x) => {
                        const ok = sampleReview(x).tags?.includes("Followed the plan");
                        return (
                            <li key={x.id} className="flex-shrink-0">
                                <button type="button" aria-pressed={x.id === t.id} onClick={() => setId(x.id)} className={`flex w-[10rem] items-center justify-between gap-2 border-t border-[var(--j-line)] px-4 py-3 text-left text-[13px] transition-colors md:w-full ${x.id === t.id ? "bg-[var(--j-s2)]" : "hover:bg-[var(--j-s1)]"}`}>
                                    <span>{asset(x.instrument)} <span className={`font-mono text-[12px] ${tone(x.profitLoss)}`}>{usd(x.profitLoss, 0)}</span></span>
                                    <span className={`h-2 w-2 rounded-full ${ok ? "bg-[var(--j-up)]" : "bg-[var(--j-dn)]"}`} title={ok ? "Plan followed" : "Plan not followed"} />
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div key={t.id} className="min-w-0 space-y-4 p-4 md:p-5" style={{ animation: "jp-in .35s both" }}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[16px] font-medium">{asset(t.instrument)} {t.direction} · {r.strategy}</p>
                        <p className={`text-[12.5px] ${followed ? "text-[var(--j-up)]" : "text-[var(--j-dn)]"}`}>{followed ? "Plan followed" : "Plan not followed"}</p>
                    </div>
                    <div>
                        <p className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-fa)]">Execution</p>
                        <p className="mt-1 text-[15px]"><Stars n={r.rating ?? 0} /> <span className="ml-2 text-[12px] text-[var(--j-mu)]">rated on how it was traded, not on the result</span></p>
                    </div>
                    <div>
                        <p className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-fa)]">Tags</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {TAGS.map((tag) => (
                                <span key={tag} className={`rounded-sm border px-2.5 py-1 text-[12px] ${r.tags?.includes(tag) ? "border-[var(--j-ink)] bg-[var(--j-active)] text-[var(--j-activeink)]" : "border-[var(--j-line)] text-[var(--j-fa)]"}`}>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--j-fa)]">Notes</p>
                        <p className="mt-1 text-[13.5px] leading-relaxed">{r.notes}</p>
                    </div>
                    <p className="border-t border-[var(--j-line)] pt-3 text-[12.5px] text-[var(--j-mu)]">Plan followed on {kept} of {list.length} trades. Your tags and ratings then feed the analysis: what your FOMO trades cost, what your patient entries earn.</p>
                </div>
            </div>
        </Frame>
    );
};

// ---------- Feature explorer: one tab per feature ----------

const FEATURES = [
    { id: "calendar", n: "01", title: "Your trading calendar", text: "Days add up to weeks, weeks to the month. Good and bad periods show at a glance.", Demo: WeeksDemo },
    { id: "score", n: "02", title: "Alture Score", text: "Five factors out of 100. Your strongest, your weakest, and what to improve.", Demo: ScoreDemo },
    { id: "strategies", n: "03", title: "Understand your strategies", text: "What pays and what costs, by strategy, asset, session, weekday, long or short.", Demo: AnalyticsDemo },
    { id: "review", n: "04", title: "Review your trades", text: "Each trade on the real candles of that day, entry, exit, stop and target marked.", Demo: TradeExplorer },
    { id: "accounts", n: "05", title: "Accounts and performance", text: "Every account together, or one at a time. The figures follow.", Demo: AccountsDemo },
    { id: "notes", n: "06", title: "Notes and discipline", text: "Tag each trade, rate its execution, write what happened. See if you kept your plan.", Demo: NotesDemo },
] as const;

export const FeatureExplorer = () => {
    const [pick, setPick] = useState<(typeof FEATURES)[number]["id"]>("calendar");
    const f = FEATURES.find((x) => x.id === pick)!;
    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-10">
            <div role="tablist" aria-label="Journal features" className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-1 lg:px-0">
                {FEATURES.map((x) => (
                    <button key={x.id} type="button" role="tab" aria-selected={x.id === pick} onClick={() => setPick(x.id)} className={`group flex-shrink-0 rounded-md border px-4 py-3 text-left transition-colors lg:w-full ${x.id === pick ? "border-white/25 bg-white/[0.05]" : "border-transparent hover:bg-white/[0.03]"}`}>
                        <span className="flex items-baseline gap-3">
                            <span className={`font-sans font-medium text-[12px] tabular-nums ${x.id === pick ? "text-[#4DD0E1]" : "text-white/30"}`}>{x.n}</span>
                            <span className={`whitespace-nowrap text-[14.5px] ${x.id === pick ? "text-white" : "text-white/55 group-hover:text-white"}`}>{x.title}</span>
                        </span>
                        <span className={`mt-1.5 hidden pl-7 text-[12.5px] leading-relaxed text-white/45 ${x.id === pick ? "lg:block" : ""}`}>{x.text}</span>
                    </button>
                ))}
            </div>
            <div key={f.id} className="min-w-0" style={{ animation: "jp-in .4s both" }}>
                <p className="mb-4 text-[14px] leading-relaxed text-white/60 lg:hidden">{f.text}</p>
                <f.Demo />
            </div>
        </div>
    );
};
