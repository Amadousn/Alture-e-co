"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TerminalBar from "./terminal-bar";
import TerminalSidebar, { SIDEBAR_WIDTH } from "./terminal-sidebar";
import TradeRecap from "@/app/components/altur/journal/trade-recap";
import Watchlist, { fmtPct, fmtPrice } from "./os/watchlist";
import { TIMEZONES, useSessions } from "./os/sessions";
import { useFullscreen } from "./os/fullscreen";
import BrandChart from "./os/brand-chart";
import FlowChart from "./os/flow-chart";
import TerminalChart from "./os/terminal-chart";
import { ENTER_KEY } from "@/utils/enter-flag";
import { useLanguage } from "@/app/i18n/language-context";
import { AdvancedChart, CHART_INTERVALS, EconomicCalendar, tradingViewUrl } from "./os/tv";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import { DEMO_BRIEFING, demoActiveTrade, demoPosition, demoTrades } from "@/utils/demo-cockpit";
import { assetFor, derivePlan } from "@/utils/trade-plan";
import { Briefing, News, useBriefing, useNews, useTickers } from "@/utils/use-market-intel";
import { useSession } from "@/utils/use-session";
import { ActiveTrade, normaliseActiveTrade, useActiveTrade, useImports, useRecordedTrades, useWatchlist, useWorkspaceSettings } from "@/utils/workspace-store";

const label = "text-[11px] uppercase tracking-[0.14em] text-white/45";
const DAY = 24 * 60 * 60 * 1000;
const STAGE = { prepare: "Preparing", execute: "Active", manage: "Active", review: "In review" } as const;

const money = (value: number) => `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const signed = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const tone = (value: number | null | undefined) => (value == null ? "text-white/45" : value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white");
const ago = (time: number, now: number) => {
    const minutes = Math.max(0, Math.round((now - time) / 60000));
    return minutes < 60 ? `${minutes}m ago` : minutes < 1440 ? `${Math.floor(minutes / 60)}h ago` : `${Math.floor(minutes / 1440)}d ago`;
};
const hhmm = (time: number) => new Date(time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

const Arrow = () => (
    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
    </span>
);

// The line along the bottom: the four sessions, the time they are read in, and where the data comes from.
const StatusLine = ({ source, demo }: { source: string; demo: boolean }) => {
    const sessions = useSessions();
    return (
        <footer className="hidden lg:flex flex-shrink-0 items-center gap-x-5 overflow-hidden whitespace-nowrap border-t border-white/10 px-4 py-1.5 text-[11px] text-white/45">
            {sessions.ready &&
                sessions.rows.map(({ session, state, next }) => (
                    <span key={session.id} title={next} className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${state.open ? "bg-[#20B8A8] cockpit-pulse" : state.soon ? "bg-[#FACC15]" : "bg-white/25"}`} aria-hidden="true" />
                        <span className={state.open ? "text-white" : "text-white/65"}>{session.name}</span>
                        <span className="tabular-nums">{next.replace(/ in .*, at /, " ").toLowerCase()}</span>
                    </span>
                ))}
            {sessions.ready && (
                <label>
                    <span className="sr-only">Timezone</span>
                    <select value={sessions.stored} onChange={(event) => sessions.setZone(event.target.value)} className="!w-auto !border-0 !bg-transparent !p-0 !pr-5 !text-[11px] !text-white/65">
                        {TIMEZONES.map((item) => (
                            <option key={item.id} value={item.id} className="bg-black">
                                {item.label} time
                            </option>
                        ))}
                    </select>
                </label>
            )}
            <span className="ml-auto">{source}</span>
            <span className="hidden xl:inline">{demo ? "Demo: no account is connected" : "AltureLock places no orders"}</span>
        </footer>
    );
};

// Arriving from "Explore AltureLock": a short curtain with the wordmark, then the terminal's panes rise into place.
// It never plays on a reload, on a direct visit or after logging in.
function useArrival(demo: boolean) {
    const [state, setState] = useState<"none" | "curtain" | "open">("none");
    useLayoutEffect(() => {
        if (!demo) return;
        let asked = false;
        try {
            asked = window.sessionStorage.getItem(ENTER_KEY) === "1";
            window.sessionStorage.removeItem(ENTER_KEY);
        } catch {
            // No storage: open directly.
        }
        if (!asked || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setState("curtain");
        const skip = () => setState("open");
        window.addEventListener("keydown", skip);
        return () => window.removeEventListener("keydown", skip);
    }, [demo]);
    return [state, () => setState("open")] as const;
}

const EnterCurtain = ({ onDone }: { onDone: () => void }) => {
    const { t } = useLanguage();
    return (
        <button type="button" onClick={onDone} onAnimationEnd={(event) => event.target === event.currentTarget && onDone()} aria-label="Skip" className="al-curtain al-curtain--short">
            <span className="al-curtain__mark flex w-full flex-col items-center">
                <span className="font-logo text-5xl sm:text-6xl text-white leading-none">
                    <span className="font-extralight">Alture</span>
                    <span className="font-normal">Lock</span>
                </span>
                <span className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-1 px-6 text-[11px] uppercase tracking-[0.12em] text-white/45" aria-hidden="true">
                    {t.entry.systems.map((name, i) => (
                        <span key={name} className="al-system" style={{ animationDelay: `${0.2 + i * 0.13}s` }}>
                            <span className="al-system__dot" style={{ animationDelay: `${0.2 + i * 0.13}s` }} />
                            {name}
                        </span>
                    ))}
                </span>
            </span>
        </button>
    );
};

// ---------- Left: the trade and the journal ----------

type Account = { active: ActiveTrade | null; positions: OpenPosition[]; positionsAt: number | null; trades: ClosedTrade[]; connected: boolean; ready: boolean };

// ---------- Right: intelligence ----------

const LEAN = { Bullish: "text-[#20B8A8]", Bearish: "text-[#E955A8]", Mixed: "text-[#FACC15]", Unclear: "text-white/55" } as const;

const BriefingPanel = ({ briefing }: { briefing: Briefing }) => {
    const [open, setOpen] = useState(0);
    return (
        <div>
            <p className={`${label} mb-3 flex items-baseline justify-between`}>
                <span className="text-accent">AI market briefing</span>
                {briefing.status === "ready" && <span className="normal-case tracking-normal">{briefing.sample ? "Example, not generated" : `${hhmm(briefing.generatedAt)} · ${briefing.headlinesRead} headlines read`}</span>}
            </p>

            {briefing.status === "ready" && (
                <ol>
                    {briefing.stories.map((story, i) => {
                        const expanded = open === i;
                        return (
                            <li key={story.headline} className="border-t border-white/15">
                                <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : i)} className="block w-full py-3 text-left">
                                    <span className="flex items-baseline gap-2 text-[10px] font-bold uppercase tracking-[0.1em]">
                                        <span className="text-white/55">{story.scope}</span>
                                        <span className={LEAN[story.lean]}>{story.lean === "Unclear" ? "Direction unclear" : `Leans ${story.lean.toLowerCase()}`}</span>
                                        <span className="font-mono font-normal normal-case tracking-normal text-accent">{story.assets.join(" ")}</span>
                                    </span>
                                    <span className="mt-1 block text-[15px] font-medium leading-snug text-white">{story.headline}</span>
                                </button>
                                {expanded && (
                                    <dl className="cockpit-rise space-y-2.5 pb-4 text-[13px] leading-relaxed">
                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.08em] text-white/40">What happened · reported</dt>
                                            <dd className="text-white/85">{story.whatHappened}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.08em] text-white/40">Why it may matter · interpretation</dt>
                                            <dd className="text-white/70">{story.whyItMatters}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.08em] text-white/40">What to watch</dt>
                                            <dd className="text-white/70">{story.watchNext}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.08em] text-white/40">Sources</dt>
                                            <dd className="space-y-0.5">
                                                {story.sources.map((source) =>
                                                    source.url ? (
                                                        <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="block truncate text-white/70 underline decoration-white/25 underline-offset-2 hover:text-white">
                                                            {source.source}: {source.title}
                                                        </a>
                                                    ) : (
                                                        <span key={source.title} className="block text-white/45">
                                                            {source.source}: {source.title}
                                                        </span>
                                                    )
                                                )}
                                            </dd>
                                        </div>
                                    </dl>
                                )}
                            </li>
                        );
                    })}
                    <li className="border-t border-white/15 pt-2 text-[11px] leading-relaxed text-white/35">
                        {briefing.sample ? "A hand-written example of the format. It describes no real event." : `Written by AI (${briefing.model}) from the headlines only. It can be wrong, and it is not trading advice.`}
                    </li>
                </ol>
            )}

            {briefing.status === "not-configured" && (
                <div className="text-[13px] leading-relaxed text-white/55">
                    <p className="text-[15px] font-medium text-white">Not switched on yet.</p>
                    <p className="mt-1.5">The briefing reads the real headlines below and explains what happened, why it may matter and what to watch, with its sources. It needs an AI service key on the server before it can run, so nothing is shown here until then.</p>
                </div>
            )}
            {briefing.status === "loading" && <p className="border-t border-white/15 pt-3 text-sm text-white/45">Preparing the briefing…</p>}
            {briefing.status === "unavailable" && <p className="border-t border-white/15 pt-3 text-sm text-white/55">The briefing could not be produced just now. The headlines below are unaffected.</p>}
        </div>
    );
};

const NewsPanel = ({ crypto, macro }: { crypto: News; macro: News }) => {
    const [desk, setDesk] = useState<"crypto" | "macro">("crypto");
    const [filter, setFilter] = useState("All");
    // A short list by default: the page stays a briefing, not a feed.
    const [more, setMore] = useState(false);
    const news = desk === "crypto" ? crypto : macro;
    const live = news.status === "live" ? news : null;
    const filters = desk === "crypto" ? ["All", "BTC", "ETH", "Altcoins", "Exchanges", "Regulation", "Crypto ETFs"] : ["All", "Central banks", "Inflation", "Jobs", "Tech stocks", "Markets"];
    const items = (live?.items ?? [])
        .filter((item) => (filter === "All" ? true : filter === "BTC" || filter === "ETH" ? item.assets.includes(filter) : filter === "Altcoins" ? item.assets.some((asset) => asset !== "BTC" && asset !== "ETH") : item.topics.includes(filter)))
        .slice(0, 30);
    const visible = more ? items : items.slice(0, 7);

    return (
        <div>
            <div className="mb-3 flex items-baseline gap-5" role="tablist" aria-label="News desk">
                {(
                    [
                        ["crypto", "Crypto news"],
                        ["macro", "Stocks and macro"],
                    ] as const
                ).map(([id, text]) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={desk === id}
                        onClick={() => {
                            setDesk(id);
                            setFilter("All");
                        }}
                        className={`nav-link pb-1 text-xs font-medium ${desk === id ? "is-active" : ""}`}
                    >
                        {text}
                    </button>
                ))}
            </div>
            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5" role="group" aria-label="Filter">
                {filters.map((item) => (
                    <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`text-xs transition-colors ${filter === item ? "text-white" : "text-white/40 hover:text-white"}`}>
                        {item}
                    </button>
                ))}
            </div>

            <ul>
                {visible.map((item) => (
                    <li key={item.id} className="border-t border-white/10">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block py-2.5">
                            <span className="block text-sm leading-snug text-white group-hover:underline underline-offset-4 decoration-white/40">{item.title}</span>
                            <span className="mt-1.5 flex flex-wrap items-center gap-x-2.5 text-xs text-white/40">
                                <span className="text-white/65">{item.source}</span>
                                <span className="tabular-nums" title={`Published ${new Date(item.publishedAt).toLocaleString()}`}>
                                    published {ago(item.publishedAt, live!.fetchedAt)}
                                </span>
                                {item.official && <span className="font-semibold uppercase tracking-[0.06em] text-white/65">Official</span>}
                                {item.kind === "Opinion" && <span className="font-semibold uppercase tracking-[0.06em] text-[#FACC15]">Opinion</span>}
                                {item.assets.map((asset) => (
                                    <span key={asset} className="font-mono text-accent">
                                        {asset}
                                    </span>
                                ))}
                                {desk === "macro" && item.topics.slice(0, 2).map((topic) => <span key={topic}>{topic}</span>)}
                            </span>
                        </a>
                    </li>
                ))}
                {live && items.length === 0 && <li className="border-t border-white/10 py-3 text-sm text-white/55">No headlines match this filter right now.</li>}
                {news.status === "loading" && <li className="border-t border-white/10 py-3 text-sm text-white/45">Loading headlines…</li>}
                {news.status === "unavailable" && <li className="border-t border-white/10 py-3 text-sm text-white/55">This desk is unavailable right now: none of its sources could be reached.</li>}
            </ul>
            {items.length > 7 && (
                <button type="button" onClick={() => setMore((value) => !value)} aria-expanded={more} className="group mt-1 w-full border-t border-white/15 py-3.5 text-left text-sm font-medium text-white/70 hover:text-white transition-colors">
                    {more ? "Show fewer" : `Show ${items.length - 7} more`}
                </button>
            )}
            {live && (
                <p className="mt-2 text-[11px] leading-relaxed text-white/30">
                    {live.sources.filter((source) => source.ok).map((source) => source.name).join(", ")}
                    {live.sources.some((source) => !source.ok) && ` (unreachable: ${live.sources.filter((source) => !source.ok).map((source) => source.name).join(", ")})`}. Checked {hhmm(live.fetchedAt)}. Times are when each piece was published.
                    {desk === "macro" && " Rate, inflation and jobs news often moves crypto as well."}
                </p>
            )}
        </div>
    );
};

// ---------- The cockpit ----------

type Tab = "trade" | "journal" | "news" | "calendar" | "markets";
type Item = { id: "trade" | "journal" | "orient" | "position"; title: string; note: string; action: string; href: string };

const HOUR = 60 * 60 * 1000;
const since = (ms: number) => (ms < HOUR ? `${Math.max(1, Math.round(ms / 60000))} minutes` : ms < DAY ? `${Math.round(ms / HOUR)} hours` : `${Math.round(ms / DAY)} days`);

const CockpitOS = ({ demo = false }: { demo?: boolean }) => {
    const params = useSearchParams();
    const router = useRouter();
    const tickers = useTickers();
    const cryptoNews = useNews("crypto");
    const macroNews = useNews("macro");
    const liveBriefing = useBriefing(!demo);
    const [list, , listStore] = useWatchlist();
    const [stored, , activeStore] = useActiveTrade();
    const [recorded, , tradesStore] = useRecordedTrades();
    const [imports, , importsStore] = useImports();
    const [settings, , settingsStore] = useWorkspaceSettings();
    const sessions = useSessions();
    const [interval, setIntervalId] = useState("15");
    const [highOnly, setHighOnly] = useState(true);
    // The chart in the centre: the terminal's own candles, live order flow from real trades, the plain line, or TradingView's tools.
    const [view, setView] = useState<"candles" | "flow" | "line" | "tools">("candles");
    const [tabChoice, setTabChoice] = useState<Tab | null>(null);
    const [indicatorOpen, setIndicatorOpen] = useState(false);
    const [desktop, setDesktop] = useState(true);
    useEffect(() => {
        const query = window.matchMedia("(min-width: 1024px)");
        const sync = () => setDesktop(query.matches);
        sync();
        query.addEventListener("change", sync);
        return () => query.removeEventListener("change", sync);
    }, []);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const screen = useFullscreen<HTMLDivElement>();
    const [arrival, arrived] = useArrival(demo);

    const base = demo ? "/alturelock/demo" : "/alturelock/workspace";
    const requested = (params.get("symbol") ?? "").toUpperCase();
    const symbol = /^[A-Z0-9]{2,20}USDT$/.test(requested) ? requested : listStore.ready && list.length > 0 ? list[0] : "BTCUSDT";
    const live = tickers.status === "live" ? tickers : null;
    const ticker = live?.bySymbol[symbol];
    const btc = live?.bySymbol.BTCUSDT?.price;

    // In the demo the account side is simulated; in the workspace it is whatever is really stored.
    const [demoNow] = useState(() => Date.now());
    // The simulated entry is fixed at the first real price seen, so the levels hold still while the price moves.
    const [demoRef, setDemoRef] = useState<number | null>(null);
    useEffect(() => {
        if (demo && btc && demoRef === null) setDemoRef(btc);
    }, [demo, btc, demoRef]);
    const account: Account = useMemo(() => {
        if (demo) return { active: demoRef ? demoActiveTrade(demoRef, demoNow) : null, positions: btc && demoRef ? [demoPosition(btc, demoNow, demoRef)] : [], positionsAt: btc ? Date.now() : null, trades: demoTrades(demoNow), connected: true, ready: true };
        const held = Object.values(imports);
        const active = stored ? normaliseActiveTrade(stored) : null;
        return {
            active: active && assetFor(active.plan.instrument) ? active : null,
            positions: held.flatMap((item) => item.positions),
            positionsAt: held.reduce<number | null>((latest, item) => (item.lastSyncAt && (!latest || item.lastSyncAt > latest) ? item.lastSyncAt : latest), null),
            trades: [...recorded, ...held.flatMap((item) => item.trades)],
            connected: held.some((item) => item.lastSyncAt !== null),
            ready: activeStore.ready && tradesStore.ready && importsStore.ready,
        };
    }, [demo, btc, demoRef, demoNow, imports, stored, recorded, activeStore.ready, tradesStore.ready, importsStore.ready]);

    const briefing: Briefing = demo ? { status: "ready", stories: DEMO_BRIEFING, generatedAt: demoNow, model: "", headlinesRead: 0, sample: true } : liveBriefing;

    // The trade in progress draws its levels on the chart of its own instrument.
    const activeAsset = account.active ? assetFor(account.active.plan.instrument) : null;
    const plan = account.active && activeAsset?.feed === symbol ? derivePlan(account.active.plan) : null;
    const levels = plan
        ? [
              ...(plan.target !== null ? [{ label: "Take profit", price: plan.target, color: "#20B8A8" }] : []),
              ...(plan.entry !== null ? [{ label: "Entry", price: plan.entry, color: "#FFFFFF" }] : []),
              ...(plan.stop !== null ? [{ label: "Stop loss", price: plan.stop, color: "#E955A8" }] : []),
          ]
        : [];

    // What the trader can do from here. The first item is always the one their real situation calls for.
    const closed = useMemo(() => [...account.trades].sort((a, b) => b.closedAt - a.closedAt), [account.trades]);
    const month = closed.filter((trade) => trade.closedAt >= Date.now() - 30 * DAY);
    const net = month.reduce((sum, trade) => sum + trade.profitLoss, 0);
    const rulesHref = demo ? "/alturelock/demo/trade" : "/alturelock/rules";
    const journalHref = demo ? "/alturelock/demo/journal" : "/alturelock/journal";
    const opened = account.active?.openedAt != null;
    const openNow = sessions.rows.filter((row) => row.state.open).map((row) => row.session.name);
    const now = Date.now();
    const stage = account.active?.stage;

    // Today, by the trader's own clock, and their own limits for a day.
    const dayStart = new Date(now).setHours(0, 0, 0, 0);
    const today = closed.filter((trade) => trade.closedAt >= dayStart);
    const lossesToday = today.filter((trade) => trade.profitLoss < 0).length;
    const limits = demo ? undefined : settings.limits;
    const limitReached = !demo && settingsStore.ready && ((limits?.maxTrades !== undefined && today.length >= limits.maxTrades) || (limits?.maxLosses !== undefined && lossesToday >= limits.maxLosses));
    const limitText = limitReached ? (limits?.maxLosses !== undefined && lossesToday >= limits.maxLosses ? `${lossesToday} losing ${lossesToday === 1 ? "trade" : "trades"} today, your limit` : `${today.length} ${today.length === 1 ? "trade" : "trades"} today, your limit`) : "";

    // A trade recorded as open long ago may have been closed since: ask, never assume.
    const openedAgo = opened ? now - account.active!.openedAt! : 0;
    const stale = openedAgo > DAY;
    const tradeItem: Item | null = !account.active || !activeAsset
        ? null
        : stage === "review"
          ? { id: "trade", title: "Finish your journal entry", note: `${activeAsset.name} ${account.active.plan.direction.toLowerCase()} is closed but not recorded yet`, action: "Finish the entry", href: rulesHref }
          : opened
            ? { id: "trade", title: stale ? "Check your open trade" : "Open trade", note: stale ? `${activeAsset.name} ${account.active.plan.direction.toLowerCase()}, opened ${since(openedAgo)} ago. Is it still open?` : `${activeAsset.name} ${account.active.plan.direction.toLowerCase()}, open for ${since(openedAgo)}`, action: stale ? "Check the trade" : "Open the trade", href: rulesHref }
            : { id: "trade", title: "Continue your plan", note: `${activeAsset.name} ${account.active.plan.direction.toLowerCase()}, not entered`, action: "Continue the plan", href: rulesHref };
    const prepareItem: Item = { id: "trade", title: "Prepare a setup", note: limitReached ? `${limitText}. Preparing is still allowed` : "Only when you see one. No trade is a position too", action: demo ? "Walk through a trade" : "Prepare a setup", href: rulesHref };

    // Positions the exchange itself reported at the last sync. Old readings are flagged, not trusted.
    const syncAge = account.positionsAt ? now - account.positionsAt : 0;
    const positionItem: Item | null = !demo && account.positions.length > 0 && !opened
        ? syncAge > HOUR
            ? { id: "position", title: "Verify your open positions", note: `${account.positions.length} at the exchange when last checked, ${since(syncAge)} ago`, action: "Sync and check", href: "/alturelock/connections" }
            : { id: "position", title: "Open position at your exchange", note: `${account.positions.length} reported ${since(syncAge)} ago, not in your journal yet`, action: "See the connection", href: "/alturelock/connections" }
        : null;

    const reviewItem: Item = limitReached
        ? { id: "journal", title: "Stop here for today", note: `${limitText}. Review instead`, action: "Review today", href: journalHref }
        : { id: "journal", title: today.length > 0 ? "Review today's trades" : closed.length > 0 ? "Review your trades" : "Trading Journal", note: closed.length > 0 ? `${closed.length} ${closed.length === 1 ? "trade" : "trades"}, ${signed(net)} in 30 days` : "Your results and trade recaps", action: "Open the journal", href: journalHref };
    const orientItem: Item = { id: "orient", title: "Read the market", note: sessions.ready ? `${openNow.length > 0 ? `${openNow.join(" and ")} open` : "No session open"}${btc !== undefined ? `, Bitcoin ${fmtPrice(btc)}` : ""}` : "Session, price, news and the calendar", action: "Open the market", href: `${base}?room=markets` };

    // The order follows the trader's real situation. Something unfinished comes first, then a
    // reached limit, then fresh trades to review; with nothing pending, the market comes first.
    const pending = tradeItem ?? positionItem;
    const items: Item[] = pending
        ? [pending, ...(pending.id === "position" ? [] : positionItem ? [positionItem] : []), orientItem, reviewItem, ...(tradeItem ? [] : [prepareItem])]
        : limitReached || today.length > 0
          ? [reviewItem, orientItem, prepareItem]
          : [orientItem, prepareItem, reviewItem];
    const first = items[0];
    const lastTrade = closed.find((trade) => trade.entryPrice > 0 && trade.exitPrice > 0);
    const name = settingsStore.ready ? settings.name.trim() : "";

    // The rail opens on what the situation calls for; after that the trader's own choice stands.
    const defaultTab: Tab = first.id === "journal" ? "journal" : first.id === "orient" ? (closed.length > 0 ? "journal" : "news") : "trade";
    const tab: Tab = tabChoice === "markets" && desktop ? defaultTab : tabChoice ?? defaultTab;
    const tabs: [Tab, string][] = [["trade", "Trade"], ["journal", "Journal"], ["news", "News"], ["calendar", "Calendar"], ["markets", "Markets"]];

    const tradePlan = account.active && activeAsset ? derivePlan(account.active.plan) : null;
    const tradePrice = activeAsset?.feed ? live?.bySymbol[activeAsset.feed]?.price : undefined;
    // An estimate from the public price and the recorded entry. Not an account figure.
    const estimate = tradePlan && opened && stage !== "review" && tradePrice !== undefined && tradePlan.entry !== null && tradePlan.quantity !== null ? (tradePrice - tradePlan.entry) * tradePlan.quantity * tradePlan.direction : null;
    const select = (next: string) => router.replace(`${base}?symbol=${next}`, { scroll: false });

    const big = (value: number) => (value >= 1e9 ? `$${(value / 1e9).toFixed(2)}B` : `$${(value / 1e6).toFixed(1)}M`);
    const facts: [string, string][] = ticker
        ? ([
              ["24h high", fmtPrice(ticker.high24h)],
              ["24h low", fmtPrice(ticker.low24h)],
              ["24h range", ticker.range24h != null ? `${ticker.range24h.toFixed(2)}%` : "—"],
              ["1h change", fmtPct(ticker.change1h)],
              ["24h volume", big(ticker.turnover24h)],
              ["Open interest", ticker.openInterest != null ? big(ticker.openInterest) : "—"],
              ["Mark price", ticker.markPrice != null ? fmtPrice(ticker.markPrice) : "—"],
              ["Funding", ticker.fundingRate != null ? `${ticker.fundingRate.toFixed(4)}%` : "—"],
              ["Next funding", ticker.nextFunding != null && ticker.nextFunding > now ? `in ${Math.floor((ticker.nextFunding - now) / HOUR)}h ${String(Math.floor(((ticker.nextFunding - now) % HOUR) / 60000)).padStart(2, "0")}m` : "—"],
          ] as [string, string][])
        : [];
    const factsList = facts.length > 0 && (
        <dl className="px-4 text-[13px] tabular-nums">
            {facts.map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-4 py-[5px]">
                    <dt className="text-white/45">{term}</dt>
                    <dd className="text-white">{value}</dd>
                </div>
            ))}
        </dl>
    );
    // The widest moves of the day among the perpetuals that actually trade: over $20M in 24 hours.
    const liquid = live ? live.all.filter((item) => item.turnover24h >= 2e7).sort((a, b) => b.change24h - a.change24h) : [];
    const movers = liquid.length >= 8 ? [...liquid.slice(0, 3), ...liquid.slice(-3)] : [];
    const moversList = movers.length > 0 && (
        <ul>
            {movers.map((item) => (
                <li key={item.symbol}>
                    <button type="button" onClick={() => select(item.symbol)} className={`grid w-full grid-cols-[1fr_auto_4.2rem] items-baseline gap-x-3 px-4 py-[5px] text-left text-[13px] tabular-nums transition-colors hover:bg-white/[0.05] ${item.symbol === symbol ? "bg-white/[0.06]" : ""}`}>
                        <span className="truncate text-white">{item.symbol.replace(/USDT$/, "")}</span>
                        <span className="text-white/55">{fmtPrice(item.price)}</span>
                        <span className={`text-right ${tone(item.change24h)}`}>{fmtPct(item.change24h)}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
    const quiet = "group inline-flex items-center gap-2 text-[13px] font-medium text-white/80 border-b border-white/25 pb-0.5 hover:text-white hover:border-white transition-colors";

    return (
        <div className={`flex min-h-[100dvh] flex-col bg-black text-white lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden ${SIDEBAR_WIDTH}`}>
            <TerminalSidebar demo={demo} />
            {arrival === "curtain" && <EnterCurtain onDone={arrived} />}
            <TerminalBar demo={demo} />
            {demo && (
                <p className="flex-shrink-0 border-b border-white/10 px-4 py-1.5 text-xs leading-relaxed text-white/55">
                    <span className="mr-2 font-semibold text-[#FACC15]">Demo environment.</span>
                    Prices, charts, news and the calendar are public and real. The account, the trade and the results are simulated.
                </p>
            )}

            <div className={`grid min-h-0 flex-1 lg:grid-cols-[248px_minmax(0,1fr)_340px] xl:grid-cols-[268px_minmax(0,1fr)_372px] ${arrival === "curtain" ? "al-reveal" : arrival === "open" ? "al-reveal al-reveal--now" : ""}`}>
                {/* Markets */}
                <aside className="hidden lg:flex min-h-0 flex-col gap-y-6 overflow-y-auto border-r border-white/10 py-4" aria-label="Markets">
                    <Watchlist tickers={tickers} compact selected={symbol} onSelect={select} />
                    {factsList && (
                        <div>
                            <p className={`${label} mb-2 px-4`}>{assetFor(symbol)?.name ?? symbol.replace(/USDT$/, "")} · perpetual</p>
                            {factsList}
                        </div>
                    )}
                    {moversList && (
                        <div>
                            <p className={`${label} mb-2 px-4`}>Movers · 24h</p>
                            {moversList}
                        </div>
                    )}
                </aside>

                {/* The chart */}
                <main ref={screen.ref} className={`flex min-h-0 min-w-0 flex-col bg-black px-4 pb-3 pt-3 ${screen.active ? "h-screen !p-5" : ""}`}>
                    {/* On a phone the watchlist is a strip above the chart. */}
                    <div className="lg:hidden -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
                        {listStore.ready &&
                            list.map((item) => {
                                const quote = live?.bySymbol[item];
                                return (
                                    <button key={item} type="button" aria-pressed={item === symbol} onClick={() => select(item)} className={`flex-shrink-0 rounded-sm border px-3 py-1.5 text-left text-xs tabular-nums transition-colors ${item === symbol ? "border-accent text-white" : "border-white/15 text-white/60"}`}>
                                        <span className="font-medium">{item.replace(/USDT$/, "")}</span>
                                        {quote && <span className={`ml-2 ${tone(quote.change24h)}`}>{fmtPct(quote.change24h)}</span>}
                                    </button>
                                );
                            })}
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                        <div className="flex items-baseline gap-x-3">
                            <h1 className="!text-xl md:!text-2xl text-white">{assetFor(symbol)?.name ?? symbol.replace(/USDT$/, "")}</h1>
                            <span className="text-xs text-white/40">{symbol} · Bybit perpetual</span>
                        </div>
                        <div className="flex items-baseline gap-x-4">
                            <span className="font-logo text-3xl md:text-4xl font-light leading-none tabular-nums text-white">{ticker ? fmtPrice(ticker.price) : tickers.status === "loading" ? "…" : "Unavailable"}</span>
                            {ticker && <span className={`text-sm tabular-nums ${tone(ticker.change24h)}`}>{fmtPct(ticker.change24h)} <span className="text-white/35">24h</span></span>}
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs font-medium">
                        <div className="flex gap-x-3.5 overflow-x-auto" role="group" aria-label="Timeframe">
                            {CHART_INTERVALS.map((item) => (
                                <button key={item.id} type="button" aria-pressed={interval === item.id} onClick={() => setIntervalId(item.id)} className={`nav-link flex-shrink-0 pb-0.5 tabular-nums ${interval === item.id ? "is-active" : ""}`}>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                            {/* Four ways to see the same market. The label says so: without it the row reads as one long phrase. */}
                            <div className="flex items-baseline gap-x-3.5" role="group" aria-label="Chart view">
                                <span className="font-normal text-white/40">View</span>
                                {(
                                    [
                                        ["candles", "Candles"],
                                        ["flow", "Order flow"],
                                        ["line", "Line"],
                                        ["tools", "TradingView chart"],
                                    ] as const
                                ).map(([id, text]) => (
                                    <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)} className={`nav-link pb-0.5 ${view === id ? "is-active" : ""}`}>
                                        {text}
                                    </button>
                                ))}
                            </div>
                            <span className="hidden sm:inline h-3 w-px bg-white/15" aria-hidden="true" />
                            <button type="button" aria-expanded={indicatorOpen} onClick={() => setIndicatorOpen((value) => !value)} className={`nav-link pb-0.5 ${indicatorOpen ? "is-active" : ""}`}>
                                Alture indicators
                            </button>
                            {screen.supported && (
                                <button type="button" onClick={screen.toggle} className="nav-link hidden pb-0.5 sm:block">
                                    {screen.active ? "Exit full screen" : "Full screen"}
                                </button>
                            )}
                        </div>
                    </div>

                    {indicatorOpen && (
                        <div className="cockpit-rise mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-white/[0.04] px-4 py-3 text-[13px] leading-relaxed text-white/70">
                            <p className="max-w-2xl">
                                <span className="text-white">The Alture &amp; Co. indicators are TradingView indicators.</span> They cannot be added to the charts of this terminal, and the TradingView chart embedded here does not load custom indicators either. To use them, open this market on TradingView and add them there from the Indicators menu.
                            </p>
                            <a href={tradingViewUrl(symbol, interval)} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 rounded-sm border border-white/35 px-3 py-1.5 text-xs font-medium text-white hover:border-white transition-colors">
                                Open {symbol.replace(/USDT$/, "")} on TradingView ↗
                            </a>
                        </div>
                    )}

                    <div className={`mt-3 min-w-0 ${view === "flow" ? "lg:min-h-0 lg:flex-1 lg:overflow-y-auto" : "h-[54vh] min-h-[320px] lg:h-auto lg:min-h-0 lg:flex-1"}`}>
                        {mounted &&
                            (view === "candles" ? (
                                <TerminalChart symbol={symbol} interval={interval} levels={levels.map((level) => ({ label: level.label, price: level.price, color: level.color }))} trades={demo ? [] : account.trades} />
                            ) : view === "flow" ? (
                                <FlowChart symbol={symbol} interval={interval} fill={desktop || screen.active} />
                            ) : view === "line" ? (
                                <BrandChart symbol={symbol} interval={interval} levels={levels} />
                            ) : (
                                <AdvancedChart symbol={symbol} interval={interval} timezone={sessions.zone} />
                            ))}
                    </div>
                </main>

                {/* What is yours: the next thing to do, the trade, the journal, and what to read */}
                <aside className="flex min-h-0 flex-col border-t border-white/10 lg:border-l lg:border-t-0" aria-label="Your workspace">
                    <div className="flex-shrink-0 px-4 pb-4 pt-4">
                        <p className={label}>{demo ? "Simulated account" : name ? `Welcome back, ${name}` : "Your workspace"}</p>
                        {first.id === "orient" ? (
                            <>
                                <p className="mt-2 text-[15px] font-medium text-white">{account.ready ? "Nothing pending." : " "}</p>
                                <p className="mt-1 text-[13px] leading-relaxed text-white/50">No trade is a position too. Prepare a setup only when you see one.</p>
                                <Link href={rulesHref} className={`${quiet} mt-3`}>
                                    {prepareItem.action} <Arrow />
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="mt-2 text-[15px] font-medium text-white">{first.title}</p>
                                <p className="mt-1 text-[13px] leading-relaxed text-white/50">{first.note}</p>
                                <Link href={first.href} className="group mt-3 inline-flex items-center gap-2.5 rounded-sm bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-[#e4e4e8] transition-colors lit">
                                    {first.action} <Arrow />
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex flex-shrink-0 gap-x-5 overflow-x-auto border-b border-white/10 px-4" role="tablist" aria-label="Workspace">
                        {tabs.map(([id, text]) => (
                            <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTabChoice(id)} className={`nav-link flex-shrink-0 pb-2 text-xs font-medium uppercase tracking-[0.06em] ${id === "markets" ? "lg:hidden" : ""} ${tab === id ? "is-active" : ""}`}>
                                {text}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-0 flex-1 px-4 pb-8 pt-4 lg:overflow-y-auto">
                        {tab === "trade" && (
                            <div className="space-y-6">
                                {account.active && activeAsset && tradePlan ? (
                                    <div>
                                        <p className="flex items-baseline justify-between gap-3">
                                            <span className="text-lg font-medium tracking-tight text-white">
                                                {activeAsset.name} <span className={account.active.plan.direction === "Long" ? "text-[#20B8A8]" : "text-[#E955A8]"}>{account.active.plan.direction.toLowerCase()}</span>
                                            </span>
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">{stage === "review" ? "Closed, not recorded" : STAGE[account.active.stage]}{demo ? " · simulated" : ""}</span>
                                        </p>
                                        <dl className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4 text-[13px] tabular-nums">
                                            {(
                                                [
                                                    [opened ? "Entry" : "Planned entry", tradePlan.entry !== null ? fmtPrice(tradePlan.entry) : "—", "text-white"],
                                                    ["Stop loss", tradePlan.stop !== null ? fmtPrice(tradePlan.stop) : "—", "text-[#E955A8]"],
                                                    ["Take profit", tradePlan.target !== null ? fmtPrice(tradePlan.target) : "—", "text-[#20B8A8]"],
                                                    ["Size", tradePlan.quantity !== null ? `${tradePlan.quantity} ${activeAsset.unit}` : "—", "text-white"],
                                                    ["Planned risk", tradePlan.risk !== null ? money(tradePlan.risk) : "—", "text-white"],
                                                    ["Exposure", tradePlan.notional !== null ? money(tradePlan.notional) : "—", "text-white"],
                                                ] as const
                                            ).map(([term, value, color]) => (
                                                <div key={term} className="min-w-0">
                                                    <dt className="text-[11px] text-white/40">{term}</dt>
                                                    <dd className={`truncate ${color}`}>{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                        {estimate !== null && (
                                            <p className="mt-4 text-[13px] leading-relaxed text-white/45">
                                                <span className={`mr-2 text-[15px] font-medium tabular-nums ${tone(estimate)}`}>{signed(estimate)}</span>
                                                unrealised, estimated from the Bybit price. Not an account figure.
                                            </p>
                                        )}
                                        {activeAsset.feed && activeAsset.feed !== symbol && (
                                            <button type="button" onClick={() => select(activeAsset.feed!)} className={`${quiet} mt-4`}>
                                                Show it on the chart
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-[13px] leading-relaxed text-white/55">{account.ready ? "No trade in progress." : " "}</p>
                                )}

                                {!demo && (today.length > 0 || limits?.maxTrades !== undefined || limits?.maxLosses !== undefined) && (
                                    <div>
                                        <p className={`${label} mb-2`}>Today</p>
                                        <p className="text-[13px] tabular-nums text-white/75">
                                            {today.length} {today.length === 1 ? "trade" : "trades"}
                                            {today.length > 0 && <span className={`ml-2 ${tone(today.reduce((sum, trade) => sum + trade.profitLoss, 0))}`}>{signed(today.reduce((sum, trade) => sum + trade.profitLoss, 0))}</span>}
                                        </p>
                                        {(limits?.maxTrades !== undefined || limits?.maxLosses !== undefined) && (
                                            <p className={`mt-1 text-[13px] ${limitReached ? "text-[#FACC15]" : "text-white/45"}`}>
                                                {limitReached ? `${limitText[0].toUpperCase()}${limitText.slice(1)}. This is where you said you would stop.` : `Your limits: ${[limits?.maxTrades !== undefined ? `${limits.maxTrades} trades` : "", limits?.maxLosses !== undefined ? `${limits.maxLosses} losses` : ""].filter(Boolean).join(", ")} a day.`}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <p className={`${label} mb-2 flex items-baseline justify-between`}>
                                        <span>Exchange positions{demo ? " · simulated" : ""}</span>
                                        {account.positionsAt && !demo && <span className="normal-case tracking-normal">{since(now - account.positionsAt)} ago</span>}
                                    </p>
                                    {account.positions.length > 0 ? (
                                        <ul className="space-y-2">
                                            {account.positions.map((position) => (
                                                <li key={`${position.instrument}-${position.direction}`} className="flex items-baseline justify-between gap-3 text-[13px] tabular-nums">
                                                    <span className="text-white">
                                                        {position.instrument.replace(/USDT$/, "")} <span className={position.direction === "Long" ? "text-[#20B8A8]" : "text-[#E955A8]"}>{position.direction.toLowerCase()}</span>
                                                        <span className="ml-2 text-white/40">
                                                            {position.quantity} at {fmtPrice(position.entryPrice)}
                                                        </span>
                                                    </span>
                                                    <span className={tone(position.unrealisedPnl)}>{signed(position.unrealisedPnl)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : account.connected ? (
                                        <p className="text-[13px] text-white/55">None at the last sync.</p>
                                    ) : (
                                        <p className="text-[13px] leading-relaxed text-white/55">
                                            No exchange account is connected, so positions, balance and account risk are not shown.{" "}
                                            <Link href="/alturelock/connections" className="text-white border-b border-white/30 hover:border-white">
                                                Connect one
                                            </Link>
                                        </p>
                                    )}
                                </div>

                                {/* At the trader's own limit for the day, the terminal does not offer another setup. */}
                                {(account.active || !limitReached) && (
                                    <Link href={rulesHref} className={quiet}>
                                        {account.active ? "Open Rules" : prepareItem.action} <Arrow />
                                    </Link>
                                )}
                            </div>
                        )}

                        {tab === "journal" && (
                            <div>
                                <p className={`${label} mb-2`}>{demo ? "Simulated results" : "Net result"} · last 30 days</p>
                                {month.length > 0 ? (
                                    <>
                                        <p className={`font-logo text-4xl font-light leading-none tabular-nums ${tone(net)}`}>{signed(net)}</p>
                                        <p className="mt-2 text-[13px] tabular-nums text-white/50">
                                            {month.length} {month.length === 1 ? "trade" : "trades"} · {Math.round((month.filter((trade) => trade.profitLoss > 0).length / month.length) * 100)}% won
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-[13px] leading-relaxed text-white/55">{account.ready ? (closed.length > 0 ? "No trades closed in the last 30 days." : "No trades yet. A trade appears here once it is reviewed in Rules or imported from a connection.") : " "}</p>
                                )}

                                {lastTrade && !demo && (
                                    <div className="mt-6">
                                        <p className={`${label} mb-1`}>
                                            Last trade · {assetFor(lastTrade.instrument)?.name ?? lastTrade.instrument} {lastTrade.direction.toLowerCase()} <span className={`normal-case tracking-normal ${tone(lastTrade.profitLoss)}`}>{signed(lastTrade.profitLoss)}</span>
                                        </p>
                                        <TradeRecap trade={lastTrade} bare />
                                    </div>
                                )}

                                {closed.length > 0 && (
                                    <ul className="mt-6">
                                        {closed.slice(0, 6).map((trade) => (
                                            <li key={trade.id}>
                                                <Link href={journalHref} className="grid grid-cols-[3.2rem_1fr_auto] items-baseline gap-x-3 py-1.5 text-[13px] hover:bg-white/[0.04] transition-colors">
                                                    <span className="text-[11px] tabular-nums text-white/40">{new Date(trade.closedAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
                                                    <span className="truncate text-white">
                                                        {assetFor(trade.instrument)?.name ?? trade.instrument} <span className={`text-xs ${trade.direction === "Long" ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{trade.direction.toLowerCase()}</span>
                                                    </span>
                                                    <span className={`tabular-nums ${tone(trade.profitLoss)}`}>{signed(trade.profitLoss)}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <Link href={journalHref} className={`${quiet} mt-6`}>
                                    Open the journal <Arrow />
                                </Link>
                            </div>
                        )}

                        {tab === "news" && (
                            <div className="space-y-8">
                                <BriefingPanel briefing={briefing} />
                                <NewsPanel crypto={cryptoNews} macro={macroNews} />
                            </div>
                        )}

                        {tab === "calendar" && (
                            <div>
                                <div className="mb-3 flex items-baseline justify-between gap-4">
                                    <div className="flex gap-x-4" role="group" aria-label="Importance">
                                        {(
                                            [
                                                [true, "High importance"],
                                                [false, "All events"],
                                            ] as const
                                        ).map(([value, text]) => (
                                            <button key={text} type="button" aria-pressed={highOnly === value} onClick={() => setHighOnly(value)} className={`nav-link pb-0.5 text-xs font-medium ${highOnly === value ? "is-active" : ""}`}>
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                    <a href="https://www.tradingview.com/economic-calendar/" target="_blank" rel="noopener noreferrer nofollow" className="text-[11px] text-white/35 hover:text-white transition-colors">
                                        by TradingView ↗
                                    </a>
                                </div>
                                <div className="-mx-2 h-[64vh] min-h-[420px]">{mounted && <EconomicCalendar highOnly={highOnly} />}</div>
                                <ul className="mt-5 space-y-1.5 lg:hidden">
                                    {sessions.rows.map(({ session, state, next }) => (
                                        <li key={session.id} className="flex items-baseline justify-between gap-4 text-[13px]">
                                            <span className={state.open ? "text-white" : "text-white/60"}>{session.name}</span>
                                            <span className="tabular-nums text-white/45">{next}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tab === "markets" && (
                            <div className="-mx-4 space-y-6">
                                <Watchlist tickers={tickers} compact selected={symbol} onSelect={select} />
                                {factsList}
                                {moversList && (
                                    <div>
                                        <p className={`${label} mb-2 px-4`}>Movers · 24h</p>
                                        {moversList}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            <StatusLine source={live ? `Bybit public data · ${hhmm(live.fetchedAt)}` : tickers.status === "loading" ? "Connecting to the market…" : "Market data unavailable"} demo={demo} />
        </div>
    );
};

export default CockpitOS;
