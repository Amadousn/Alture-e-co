"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import TradeRecap from "./trade-recap";

export type TradeDetail = { kind: "closed"; trade: ClosedTrade } | { kind: "open"; position: OpenPosition };

function formatDollars(value: number): string {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatSigned(value: number, suffix = ""): string {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`;
}

function formatPrice(value: number): string {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 6 })}`;
}

function formatDuration(ms: number): string {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${seconds}s`;
}

const NOT_RECORDED = "Not recorded";

function formatDate(value: number): string {
    return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatClock(value: number): string {
    return new Date(value).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

const Cell = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-black px-5 py-3">
        <dt className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-1.5">{label}</dt>
        <dd className="text-[15px] font-medium tabular-nums text-white">{value}</dd>
    </div>
);

const TimePoint = ({ label, at, fallback, align }: { label: string; at: number | null | undefined; fallback: string; align: "left" | "right" }) => (
    <div className={align === "right" ? "text-right" : ""}>
        <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-1.5">{label}</p>
        {typeof at === "number" ? (
            <>
                <p className="text-[15px] font-medium tabular-nums text-white">{formatClock(at)}</p>
                <p className="text-xs tabular-nums text-[#7d7d87] mt-0.5">{formatDate(at)}</p>
            </>
        ) : (
            <p className="text-[15px] font-medium text-[#55555e]">{fallback}</p>
        )}
    </div>
);

type Props = {
    detail: TradeDetail;
    onClose: () => void;
    // Stepping through the list the trade was opened from.
    onPrevious?: () => void;
    onNext?: () => void;
    position?: { index: number; total: number };
};

const TradeDetails = ({ detail, onClose, onPrevious, onNext, position }: Props) => {
    const isOpen = detail.kind === "open";
    const [now, setNow] = useState(() => Date.now());
    const [copied, setCopied] = useState(false);

    // An open trade's duration keeps counting while the panel is up.
    useEffect(() => {
        if (!isOpen) return;
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, [isOpen]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowLeft") onPrevious?.();
            if (event.key === "ArrowRight") onNext?.();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose, onPrevious, onNext]);

    const source = detail.kind === "closed" ? detail.trade : detail.position;
    const pnl = detail.kind === "closed" ? detail.trade.profitLoss : detail.position.unrealisedPnl;
    const openedAt = source.openedAt;
    const closedAt = detail.kind === "closed" ? detail.trade.closedAt : null;

    // Percentage is the return on the margin put up, which is how the exchange
    // reports ROI. Without a leverage figure there is no margin to divide by.
    const margin = source.leverage > 0 ? source.positionSize / source.leverage : 0;
    const pnlPercent = margin > 0 ? (pnl / margin) * 100 : null;

    const duration = openedAt === undefined ? NOT_RECORDED : formatDuration((closedAt ?? now) - openedAt);

    // How far price travelled between entry and exit (or the current mark).
    const reference = detail.kind === "closed" ? detail.trade.exitPrice : detail.position.markPrice;
    const priceMove = ((reference - source.entryPrice) / source.entryPrice) * 100;

    const copySummary = async () => {
        const lines = [
            `${source.instrument} ${source.direction} ${source.leverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}x (${isOpen ? "open" : "closed"})`,
            `${isOpen ? "Unrealised P&L" : "P&L"}: ${formatSigned(pnl)} USDT${pnlPercent !== null ? ` (${formatSigned(pnlPercent, "%")})` : ""}`,
            `Entry ${formatPrice(source.entryPrice)} / ${isOpen ? "Mark" : "Exit"} ${formatPrice(reference)}`,
            `${isOpen ? "Open for" : "Duration"}: ${duration}`,
        ];
        try {
            await navigator.clipboard.writeText(lines.join("\n"));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard blocked: nothing to recover
        }
    };

    const up = pnl >= 0;
    const accent = up ? "#20B8A8" : "#E955A8";

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${source.instrument} trade details`}>
            <button type="button" aria-label="Close trade details" onClick={onClose} className="absolute inset-0 bg-black/80 cursor-default" />

            <div key={detail.kind === "closed" ? detail.trade.id : `open-${source.instrument}`} className="trade-details-panel relative w-full sm:max-w-[460px] max-h-[100dvh] sm:max-h-[88dvh] overflow-y-auto bg-black border border-white/15 sm:rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
                {/* Result strip along the top edge */}
                <div className="h-[3px] w-full" style={{ backgroundColor: accent }} />

                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/15">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <p className="text-lg font-semibold tracking-tight text-white">{source.instrument}</p>
                        <span className="text-[11px] font-semibold uppercase px-1.5 py-0.5 rounded-sm text-black" style={{ backgroundColor: source.direction === "Long" ? "#20B8A8" : "#E955A8" }}>
                            {source.direction} {source.leverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}×
                        </span>
                        <span className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase px-1.5 py-0.5 rounded-sm border ${isOpen ? "border-primary/60 text-primary" : "border-white/25 text-[#9a9aa5]"}`}>
                            {isOpen && <span className="trade-details-live h-1.5 w-1.5 rounded-full bg-primary" />}
                            {isOpen ? "Open" : "Closed"}
                        </span>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-sm text-[#9a9aa5] hover:text-white hover:bg-white/10 transition-colors text-xl leading-none">
                        ×
                    </button>
                </div>

                <div className="flex items-end justify-between gap-6 px-5 pt-4 pb-4">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">{isOpen ? "Unrealised P&L (USDT)" : "Realised P&L (USDT)"}</p>
                        <p className="text-[32px] leading-none font-semibold tracking-tight tabular-nums" style={{ color: accent }}>
                            {formatSigned(pnl)}
                        </p>
                    </div>
                    {pnlPercent !== null && (
                        <div className="text-right">
                            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">ROI</p>
                            <p className="text-2xl leading-none font-semibold tabular-nums" style={{ color: accent }}>
                                {formatSigned(pnlPercent, "%")}
                            </p>
                        </div>
                    )}
                </div>

                {detail.kind === "closed" && <TradeRecap trade={detail.trade} sample={detail.trade.id.startsWith("sample-")} />}

                {/* Opened, how long, closed */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 border-y border-white/15 bg-[#080808]">
                    <TimePoint label="Opened" at={openedAt} fallback={NOT_RECORDED} align="left" />
                    <div className="flex flex-col items-center min-w-[120px]">
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">{isOpen ? "Open for" : "Duration"}</p>
                        <div className="flex items-center w-full gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span className="h-px flex-1 bg-white/20" />
                            <span className={`text-[13px] font-semibold tabular-nums ${duration === NOT_RECORDED ? "text-[#55555e]" : "text-white"}`}>{duration}</span>
                            <span className="h-px flex-1 bg-white/20" />
                            <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "trade-details-live bg-primary" : "bg-white"}`} />
                        </div>
                    </div>
                    <TimePoint label="Closed" at={closedAt} fallback="Still open" align="right" />
                </div>

                <dl className="grid grid-cols-2 gap-px bg-white/15">
                    <Cell label="Entry price" value={formatPrice(source.entryPrice)} />
                    {detail.kind === "closed" ? (
                        <Cell label="Exit price" value={formatPrice(detail.trade.exitPrice)} />
                    ) : (
                        <Cell label="Mark price" value={formatPrice(detail.position.markPrice)} />
                    )}
                    <Cell label="Position size" value={formatDollars(source.positionSize)} />
                    <Cell label="Quantity" value={source.quantity.toLocaleString(undefined, { maximumFractionDigits: 6 })} />
                    <Cell label="Margin" value={margin > 0 ? formatDollars(margin) : NOT_RECORDED} />
                    {detail.kind === "closed" ? <Cell label="Trading fees" value={formatDollars(detail.trade.fee)} /> : <Cell label="Exit price" value="Not closed yet" />}
                </dl>

                {detail.kind === "closed" && (
                    <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/15">
                        <span className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Setup</span>
                        <span className={`text-[15px] font-medium ${detail.trade.setup ? "text-white" : "text-[#55555e]"}`}>
                            {detail.trade.setup ?? "Not recorded (placed outside the Trading Rules)"}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/15">
                    <span className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Price move</span>
                    <span className="text-[15px] font-medium tabular-nums text-white">
                        {formatPrice(source.entryPrice)} <span className="text-[#55555e]">→</span> {formatPrice(reference)}
                        <span className="ml-3" style={{ color: priceMove >= 0 ? "#20B8A8" : "#E955A8" }}>
                            {formatSigned(priceMove, "%")}
                        </span>
                    </span>
                </div>

                {detail.kind === "closed" && detail.trade.rulesFollowed !== undefined && (
                    <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/15">
                        <span className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Rules followed</span>
                        <span className="text-[15px] font-medium" style={{ color: detail.trade.rulesFollowed ? "#20B8A8" : "#E955A8" }}>
                            {detail.trade.rulesFollowed ? "Yes" : "No"}
                        </span>
                    </div>
                )}

                {detail.kind === "closed" && detail.trade.reflection && (
                    <div className="px-5 py-4 border-t border-white/15">
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">Reflection</p>
                        <p className="text-sm leading-relaxed text-white whitespace-pre-wrap">{detail.trade.reflection}</p>
                    </div>
                )}

                {/* How the result is made up, so the figures can be checked by hand */}
                {detail.kind === "closed" && (
                    <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/15">
                        <span className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Result</span>
                        <span className="text-[13px] tabular-nums text-[#9a9aa5] text-right">
                            Gross <span className="text-white font-medium">{formatSigned(pnl + detail.trade.fee)}</span>
                            <span className="mx-2">−</span>
                            Fees <span className="text-white font-medium">{formatSigned(detail.trade.fee).slice(1)}</span>
                            <span className="mx-2">=</span>
                            <span className="font-semibold" style={{ color: accent }}>
                                {formatSigned(pnl)}
                            </span>
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-white/15 bg-[#080808]">
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={onPrevious}
                            disabled={!onPrevious}
                            aria-label="Previous trade"
                            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/25 text-white hover:bg-white/10 transition-colors disabled:opacity-25 disabled:hover:bg-transparent"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={onNext}
                            disabled={!onNext}
                            aria-label="Next trade"
                            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/25 text-white hover:bg-white/10 transition-colors disabled:opacity-25 disabled:hover:bg-transparent"
                        >
                            →
                        </button>
                        {position && (
                            <span className="ml-3 text-xs tabular-nums text-[#7d7d87]">
                                {position.index + 1} / {position.total}
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={copySummary}
                        className={`h-9 px-4 rounded-sm text-xs font-semibold transition-colors ${copied ? "bg-[#20B8A8] text-black" : "bg-white text-black hover:bg-primary"}`}
                    >
                        {copied ? "Copied" : "Copy summary"}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes tradeDetailsIn {
                    from { transform: translateY(10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .trade-details-panel {
                    animation: tradeDetailsIn 160ms ease-out;
                }
                @keyframes tradeDetailsLive {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                .trade-details-live {
                    animation: tradeDetailsLive 1.4s ease-in-out infinite;
                }
            `}</style>
        </div>,
        document.body
    );
};

export default TradeDetails;
