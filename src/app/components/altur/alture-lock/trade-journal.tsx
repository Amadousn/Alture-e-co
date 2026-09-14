"use client";

import { useState } from "react";

const SESSION_OPTIONS = [
    "Pre-Asia session (21:00–00:00 UTC)",
    "Asian session (00:00–09:00 UTC)",
    "London session (08:00–17:00 UTC)",
    "New York session (13:00–22:00 UTC)",
];

type Direction = "Long" | "Short";

type SyncedTrade = {
    instrument: string;
    direction: Direction;
    entryPrice: number;
    entryTime: string;
    exitPrice: number;
    exitTime: string;
    duration: string;
    capital: number;
    accountSize: number;
    leverage: number;
    stopLoss: number;
    profitLoss: number;
};

// Stand-in for a real Bybit sync: rotates through a few closed positions so
// the refresh action visibly does something. A real integration would fetch
// the latest closed position from the connected account instead. Snapshot 0
// is a real closed trade (BTCUSDT.P short, Sep 8 2026, order IDs 3502101015
// / 3502134567).
const SYNC_SNAPSHOTS: SyncedTrade[] = [
    { instrument: "BTCUSDT", direction: "Short", entryPrice: 79157.5, entryTime: "Sep 8, 2026, 01:35", exitPrice: 78653.1, exitTime: "Sep 8, 2026, 08:55", duration: "7h 20m", capital: 5000, accountSize: 25000, leverage: 25, stopLoss: -160, profitLoss: 796.36 },
    { instrument: "ETHUSDT", direction: "Long", entryPrice: 2480, entryTime: "Sep 5, 2026, 14:10", exitPrice: 2476.32, exitTime: "Sep 5, 2026, 19:45", duration: "5h 35m", capital: 3200, accountSize: 25000, leverage: 20, stopLoss: -95, profitLoss: -95 },
    { instrument: "SOLUSDT", direction: "Short", entryPrice: 108, entryTime: "Sep 2, 2026, 03:20", exitPrice: 106.62, exitTime: "Sep 2, 2026, 11:05", duration: "7h 45m", capital: 6000, accountSize: 25000, leverage: 15, stopLoss: -210, profitLoss: 1150 },
];

// Bybit's round-trip taker fee on perps runs close to 0.11% of position
// size (0.055% each way) - close enough for a synced preview.
const FEE_RATE = 0.0011;

type Recap = {
    id: string;
    instrument: string;
    direction: Direction;
    entryPrice: number;
    entryTime: string;
    exitPrice: number;
    exitTime: string;
    duration: string;
    capital: number;
    accountSize: number;
    leverage: number;
    positionSize: number;
    stopLoss: number;
    profitLoss: number;
    riskReward: number;
    fee: number;
    thesis: string;
    executionNotes: string;
    session: string;
    date: string;
};

const SEED_RECAP: Recap = {
    id: "seed",
    instrument: "BTCUSDT",
    direction: "Short",
    entryPrice: 79157.5,
    entryTime: "Sep 8, 2026, 01:35",
    exitPrice: 78653.1,
    exitTime: "Sep 8, 2026, 08:55",
    duration: "7h 20m",
    capital: 5000,
    accountSize: 25000,
    leverage: 25,
    positionSize: 125000,
    stopLoss: -160,
    profitLoss: 796.36,
    riskReward: 4.98,
    fee: 125000 * FEE_RATE,
    thesis: "Continuation setup, invalidated immediately if it fails to continue.",
    executionNotes: "Stop fixed at entry, no adjustment for drawdown or ranging — precision at entry means the stop rarely gets tested.",
    session: "Pre-Asia session (21:00–00:00 UTC)",
    date: "Sep 8, 2026",
};

// Recap entry/exit times are always "MMM D, YYYY, HH:mm" - pull the day
// number out for bucketing into the PnL calendar.
function getDayOfMonth(timeStr: string): number {
    const [monthDay] = timeStr.split(", ");
    return parseInt(monthDay.split(" ")[1], 10);
}

const MONTH_NUMBERS: Record<string, string> = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

// Bybit shows closed-order timestamps as "YYYY-MM-DD HH:MM:SS" - match that
// instead of the looser "MMM D, YYYY" label.
function formatBybitDate(timeStr: string): string {
    const [monthDay, year, time] = timeStr.split(", ");
    const [month, day] = monthDay.split(" ");
    return `${year}-${MONTH_NUMBERS[month]}-${day.padStart(2, "0")} ${time}:00`;
}

function formatSignedDollars(value: number): string {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Bybit's "Closed P&L(USDT)" field is a raw signed number, no $ sign, 4
// decimal places - e.g. "-28.1011" / "49.7007".
function formatClosedPnl(value: number): string {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}${Math.abs(value).toFixed(4)}`;
}

function formatDollars(value: number): string {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

// Bybit's own balance bar shows raw numbers, no currency symbol.
function formatPlain(value: number): string {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const RefreshIcon = ({ spinning }: { spinning: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" className={`w-3.5 h-3.5 ${spinning ? "trade-journal-spin" : ""}`} aria-hidden="true">
        <path
            d="M20 11A8 8 0 105.5 15.5M4 5v5h5M4 13a8 8 0 0014.5 4.5M20 19v-5h-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const PulseDot = ({ color }: { color: string }) => (
    <span className="relative flex h-1.5 w-1.5">
        <span className={`trade-journal-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${color}`} />
    </span>
);

const EyeIcon = ({ off }: { off: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        {off ? (
            <path
                d="M3 3l18 18M10.6 10.6a2.5 2.5 0 003.5 3.5M9.9 5.1A10.4 10.4 0 0112 5c5 0 9 4 10.5 7-.6 1.2-1.5 2.5-2.7 3.6M6.6 6.6C4.6 8 3.1 9.9 1.5 12 3 15 7 19 12 19c1.4 0 2.7-.3 3.9-.8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        ) : (
            <>
                <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7-10.5-7-10.5-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            </>
        )}
    </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CopyIcon = ({ done }: { done: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        {done ? (
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
            <>
                <rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 15V5a1 1 0 011-1h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
        )}
    </svg>
);

const MiniStat = ({ label, value, warn, masked }: { label: string; value: string; warn?: boolean; masked?: boolean }) => (
    <div>
        <p className="text-[10px] font-light text-gray-500 uppercase tracking-[0.1em] mb-0.5">{label}</p>
        <p className={`text-xs font-mono ${warn ? "text-red-400" : "text-gray-300"}`}>{masked ? "••••••" : value}</p>
    </div>
);

const TradeJournal = () => {
    const [snapshotIndex, setSnapshotIndex] = useState(0);
    const [syncing, setSyncing] = useState(false);
    const [recaps, setRecaps] = useState<Recap[]>([SEED_RECAP]);
    const [thesis, setThesis] = useState("");
    const [executionNotes, setExecutionNotes] = useState("");
    const [session, setSession] = useState("");
    const [thesisError, setThesisError] = useState(false);
    const [hideAccountSize, setHideAccountSize] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [expandedRecap, setExpandedRecap] = useState<string | null>(null);
    const [historyView, setHistoryView] = useState<"list" | "calendar">("list");
    const [copied, setCopied] = useState(false);

    const synced = SYNC_SNAPSHOTS[snapshotIndex];
    const positionSize = synced.capital * synced.leverage;
    const riskReward = Math.abs(synced.profitLoss / synced.stopLoss);
    const fee = positionSize * FEE_RATE;

    // Ratios, not dollar amounts - safe to show even with account size hidden.
    const accountUsedPct = (synced.capital / synced.accountSize) * 100;
    const riskPct = (Math.abs(synced.stopLoss) / synced.accountSize) * 100;
    const positionPct = (positionSize / synced.accountSize) * 100;
    // Bybit's ROI is return on margin (capital put up), not on position notional.
    const roi = (synced.profitLoss / synced.capital) * 100;

    const handleCopy = async () => {
        const summary = [
            `${synced.instrument} ${synced.direction} ${synced.leverage.toFixed(1)}X`,
            `ROI ${roi >= 0 ? "+" : ""}${roi.toFixed(2)}%`,
            `Closed P&L(USDT) ${formatClosedPnl(synced.profitLoss)}`,
            `Entry Price ${formatDollars(synced.entryPrice)}`,
            `Exit Price ${formatDollars(synced.exitPrice)}`,
        ].join("\n");
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard access denied or unavailable - nothing to recover here
        }
    };

    const handleRefresh = () => {
        setSyncing(true);
        setTimeout(() => {
            setSnapshotIndex((i) => (i + 1) % SYNC_SNAPSHOTS.length);
            setSyncing(false);
        }, 500);
    };

    const saveRecap = () => {
        if (!thesis.trim()) {
            setThesisError(true);
            return;
        }
        const recap: Recap = {
            id: `recap-${Date.now()}`,
            instrument: synced.instrument,
            direction: synced.direction,
            entryPrice: synced.entryPrice,
            entryTime: synced.entryTime,
            exitPrice: synced.exitPrice,
            exitTime: synced.exitTime,
            duration: synced.duration,
            capital: synced.capital,
            accountSize: synced.accountSize,
            leverage: synced.leverage,
            positionSize,
            stopLoss: synced.stopLoss,
            profitLoss: synced.profitLoss,
            riskReward,
            fee,
            thesis: thesis.trim(),
            executionNotes: executionNotes.trim(),
            session: session.trim(),
            date: "Just now",
        };
        setRecaps((r) => [recap, ...r]);
        setThesis("");
        setExecutionNotes("");
        setSession("");
        setThesisError(false);
    };

    const totalTrades = recaps.length;
    const wins = recaps.filter((r) => r.profitLoss >= 0).length;
    const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
    const totalPnl = recaps.reduce((sum, r) => sum + r.profitLoss, 0);

    // No open position is tracked in this panel (that lives in the Live
    // Account Preview above), so equity/margin fields sit at their at-rest
    // values - only realized P&L from saved recaps moves the balance.
    const accountBalance = synced.accountSize + totalPnl;

    // PnL calendar - buckets each recap's realized P&L onto its exit day.
    // All demo dates fall in September 2026, matching the rest of this file.
    // Bybit's own calendar only "activates" days up to today (0.00 if no
    // trade that day) and leaves days that haven't happened yet blank.
    const CALENDAR_YEAR = 2026;
    const CALENDAR_MONTH = 8; // September, 0-indexed
    const TODAY = 9;
    const daysInMonth = new Date(CALENDAR_YEAR, CALENDAR_MONTH + 1, 0).getDate();
    const firstWeekday = new Date(CALENDAR_YEAR, CALENDAR_MONTH, 1).getDay();
    const dailyPnl: Record<number, number> = {};
    recaps.forEach((r) => {
        const day = getDayOfMonth(r.exitTime);
        dailyPnl[day] = (dailyPnl[day] ?? 0) + r.profitLoss;
    });
    const calendarCells: (number | null)[] = [
        ...Array(firstWeekday).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
        <div className="relative max-w-2xl mx-auto text-left overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                <div className="w-[520px] h-[520px] max-w-full rounded-full bg-gradient-to-br from-[#D4AF37]/25 via-[#D4AF37]/10 to-transparent blur-[100px]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white text-center leading-snug mb-6">
                Trade Recap
            </h2>

            {/* Compact summary line */}
            <div className="flex items-center justify-center gap-3 text-sm mb-6 text-gray-400">
                <span>
                    Win Rate <span className={winRate >= 50 ? "text-primary" : "text-red-400"}>{winRate.toFixed(0)}%</span>
                </span>
                <span className="text-gray-700">·</span>
                <span>
                    Total P&amp;L <span className={totalPnl >= 0 ? "text-primary" : "text-red-400"}>{formatSignedDollars(totalPnl)}</span>
                </span>
            </div>

            {/* Sync card */}
            <div className="border border-white/10 bg-black/40 p-5 md:p-6 mb-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <PulseDot color="bg-emerald-400" />
                        <span className="uppercase tracking-[0.15em]">Synced from Bybit</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleCopy}
                            aria-label="Copy trade summary"
                            className={`transition-colors ${copied ? "text-emerald-400" : "text-gray-500 hover:text-primary"}`}
                        >
                            <CopyIcon done={copied} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setHideAccountSize((v) => !v)}
                            aria-label={hideAccountSize ? "Show account size" : "Hide account size"}
                            className="text-gray-500 hover:text-primary transition-colors"
                        >
                            <EyeIcon off={hideAccountSize} />
                        </button>
                        <button
                            type="button"
                            onClick={handleRefresh}
                            aria-label="Refresh sync"
                            className="text-gray-500 hover:text-primary transition-colors"
                        >
                            <RefreshIcon spinning={syncing} />
                        </button>
                    </div>
                </div>

                {/* Hero: symbol + PnL */}
                <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-light text-white font-mono">{synced.instrument}</span>
                        <span className={`text-[10px] font-mono tracking-[0.05em] px-1.5 py-0.5 rounded ${synced.direction === "Long" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            {synced.direction} {synced.leverage.toFixed(1)}X
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.05em] mb-0.5">Closed P&amp;L (USDT)</p>
                        <p
                            className={`flex items-center justify-end gap-1.5 text-xl font-mono ${synced.profitLoss >= 0 ? "text-emerald-400" : "text-red-400"}`}
                            style={synced.profitLoss >= 0 ? { textShadow: "0 0 20px rgba(52, 211, 153, 0.6)" } : undefined}
                        >
                            {synced.profitLoss >= 0 && <PulseDot color="bg-emerald-400" />}
                            {formatClosedPnl(synced.profitLoss)}
                        </p>
                    </div>
                </div>

                {/* Compact essentials */}
                <p className="text-xs text-gray-400 font-mono mb-1">
                    {formatDollars(synced.entryPrice)} → {formatDollars(synced.exitPrice)} · {synced.duration}
                </p>
                <p className="text-xs text-gray-600 font-mono mb-4">
                    {formatDollars(synced.capital)} margin · <span className="text-primary">{synced.leverage}×</span> · {formatDollars(positionSize)} position · 1:{riskReward.toFixed(2)} R:R
                </p>

                <button
                    type="button"
                    onClick={() => setShowDetails((v) => !v)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors mb-4"
                >
                    {showDetails ? "Hide details" : "Show details"}
                    <ChevronIcon open={showDetails} />
                </button>

                {showDetails && (
                    <div className="space-y-4 border-t border-white/10 pt-4 mb-4">
                        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                            <MiniStat label="Account Balance" value={formatPlain(accountBalance)} masked={hideAccountSize} />
                            <MiniStat label="Equity" value={formatPlain(accountBalance)} masked={hideAccountSize} />
                            <MiniStat label="Margin Buffer" value="100.00%" />
                            <MiniStat label="Account Used" value={`${accountUsedPct.toFixed(1)}%`} />
                            <MiniStat label="Leveraged Exposure" value={`${positionPct.toFixed(0)}%`} />
                            <MiniStat label="Risk % of Account" value={`${riskPct.toFixed(2)}%`} warn />
                            <MiniStat label="Stop Loss" value={formatSignedDollars(synced.stopLoss)} warn />
                            <MiniStat label="ROI" value={`${roi >= 0 ? "+" : ""}${roi.toFixed(2)}%`} />
                            <MiniStat label="Opening Fee" value={formatSignedDollars(-fee / 2)} warn masked={hideAccountSize} />
                            <MiniStat label="Closing Fee" value={formatSignedDollars(-fee / 2)} warn masked={hideAccountSize} />
                            <MiniStat label="Entry Time" value={formatBybitDate(synced.entryTime)} />
                            <MiniStat label="Exit Time" value={formatBybitDate(synced.exitTime)} />
                        </div>
                    </div>
                )}

                <p className="text-[10px] font-mono tracking-[0.2em] text-gray-600 uppercase mb-3">
                    Your Recap — not synced from Bybit
                </p>
                <div className="space-y-3">
                    <div>
                        <textarea
                            value={thesis}
                            onChange={(e) => {
                                setThesis(e.target.value);
                                if (thesisError) setThesisError(false);
                            }}
                            rows={2}
                            placeholder="Thesis — why this trade, the setup and invalidation."
                            className={`w-full bg-black border text-white text-sm px-3 py-2 focus:outline-none resize-none ${thesisError ? "border-red-400" : "border-white/15 focus:border-primary"}`}
                        />
                        {thesisError && (
                            <p className="text-red-400 text-xs mt-1.5">Add a thesis before saving</p>
                        )}
                    </div>
                    <textarea
                        value={executionNotes}
                        onChange={(e) => setExecutionNotes(e.target.value)}
                        rows={1}
                        placeholder="Execution notes (optional)"
                        className="w-full bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none resize-none"
                    />
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                            className="flex-1 bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none"
                        >
                            <option value="">Select a session</option>
                            {SESSION_OPTIONS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={saveRecap}
                            className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 whitespace-nowrap"
                        >
                            Save Recap
                        </button>
                    </div>
                </div>
            </div>

            {/* Trade history - list or PnL calendar */}
            <div className="flex items-center justify-end gap-1 mb-3">
                <button
                    type="button"
                    onClick={() => setHistoryView("list")}
                    className={`px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] border ${historyView === "list" ? "border-primary/50 text-primary" : "border-white/10 text-gray-500 hover:text-gray-300"}`}
                >
                    List
                </button>
                <button
                    type="button"
                    onClick={() => setHistoryView("calendar")}
                    className={`px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] border ${historyView === "calendar" ? "border-primary/50 text-primary" : "border-white/10 text-gray-500 hover:text-gray-300"}`}
                >
                    Calendar
                </button>
            </div>

            {historyView === "calendar" ? (
                <div className="border border-white/10 bg-black/40 p-5 md:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm font-light text-white">September 2026</p>
                        <p className={`text-sm font-mono ${totalPnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {formatSignedDollars(totalPnl)}
                        </p>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                            <p key={i} className="text-[10px] text-gray-600 text-center uppercase">{d}</p>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {calendarCells.map((day, i) => {
                            if (day === null) return <div key={i} />;
                            const pnl = dailyPnl[day];
                            const hasTrade = pnl !== undefined;
                            const isWinDay = hasTrade && pnl >= 0;
                            const hasPassed = day <= TODAY;
                            const isToday = day === TODAY;
                            return (
                                <div
                                    key={i}
                                    className={`aspect-square flex flex-col items-center justify-center border text-center ${
                                        hasTrade
                                            ? isWinDay
                                                ? "border-emerald-400/30 bg-emerald-500/5"
                                                : "border-red-400/30 bg-red-500/5"
                                            : hasPassed
                                                ? "border-white/10 bg-white/[0.02]"
                                                : "border-white/5"
                                    } ${isToday ? "ring-1 ring-primary/50" : ""}`}
                                >
                                    <span className="text-[10px] text-gray-500">{day}</span>
                                    {hasTrade ? (
                                        <span className={`text-[9px] font-mono ${isWinDay ? "text-emerald-400" : "text-red-400"}`}>
                                            {pnl >= 0 ? "+" : ""}{pnl.toFixed(0)}
                                        </span>
                                    ) : hasPassed ? (
                                        <span className="text-[9px] font-mono text-gray-700">0.00</span>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
            <div className="space-y-2">
                {recaps.map((r) => {
                    const isWin = r.profitLoss >= 0;
                    const isOpen = expandedRecap === r.id;
                    return (
                        <div key={r.id} className="border border-white/5 bg-black/20">
                            <button
                                type="button"
                                onClick={() => setExpandedRecap(isOpen ? null : r.id)}
                                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span
                                        className={`flex-shrink-0 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 border ${isWin ? "border-emerald-400/50 text-emerald-400" : "border-red-400/40 text-red-400"}`}
                                        style={isWin ? { textShadow: "0 0 12px rgba(52, 211, 153, 0.6)", boxShadow: "0 0 12px rgba(52, 211, 153, 0.15)" } : undefined}
                                    >
                                        {isWin ? "Win" : "Loss"}
                                    </span>
                                    <span className="text-xs text-white font-mono truncate">
                                        {r.instrument} {r.direction} {r.leverage.toFixed(1)}X
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className="text-xs text-gray-600 font-mono">{formatBybitDate(r.exitTime)}</span>
                                    <span
                                        className={`text-sm font-mono ${isWin ? "text-emerald-400" : "text-red-400"}`}
                                        style={isWin ? { textShadow: "0 0 12px rgba(52, 211, 153, 0.5)" } : undefined}
                                    >
                                        {formatClosedPnl(r.profitLoss)}
                                    </span>
                                    <ChevronIcon open={isOpen} />
                                </div>
                            </button>
                            {isOpen && (
                                <div className="px-4 pb-4 border-t border-white/5 pt-3">
                                    <p className="text-xs text-gray-600 font-mono mb-1">
                                        {formatDollars(r.entryPrice)} → {formatDollars(r.exitPrice)} · {r.duration}
                                    </p>
                                    <p className="text-xs text-gray-600 font-mono mb-2">
                                        {formatDollars(r.capital)} margin · <span className="text-primary">{r.leverage}×</span> · {formatDollars(r.positionSize)} position · 1:{r.riskReward.toFixed(2)} R:R · fee {formatDollars(r.fee)}
                                    </p>
                                    <p className="text-sm font-light text-gray-300 leading-relaxed mb-2">{r.thesis}</p>
                                    {r.executionNotes && (
                                        <p className="text-sm font-light text-gray-500 leading-relaxed mb-2">{r.executionNotes}</p>
                                    )}
                                    {r.session && (
                                        <p className="text-xs text-gray-600 uppercase tracking-[0.1em]">{r.session}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            )}

            <style jsx>{`
                @keyframes tradeJournalSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                :global(.trade-journal-spin) {
                    animation: tradeJournalSpin 600ms linear infinite;
                }
                @keyframes tradeJournalPing {
                    0% { transform: scale(1); opacity: 0.75; }
                    75%, 100% { transform: scale(2.2); opacity: 0; }
                }
                :global(.trade-journal-ping) {
                    animation: tradeJournalPing 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default TradeJournal;
