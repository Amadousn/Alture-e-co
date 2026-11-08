"use client";

import { useEffect, useState } from "react";
import { fmtPrice } from "./watchlist";

// Position size from the trader's own figures: account, risk per trade, entry and stop.
// Account size and risk % are remembered in this browser; prices are typed per trade.
const KEY = "alturelock:risk-calc";

const num = (value: string) => {
    const parsed = parseFloat(value.replace(/,/g, "").replace(/\s/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
};
const usd = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const qty = (value: number) => (value >= 100 ? value.toFixed(1) : value >= 1 ? value.toFixed(3) : value.toPrecision(3));

const field = "w-full rounded-md border border-white/12 bg-white/[0.03] px-2.5 py-1.5 text-[13px] tabular-nums text-white outline-none focus:border-white/40 transition-colors";

const RiskCalculator = ({ asset, price }: { asset: string; price: number | null }) => {
    const [account, setAccount] = useState("");
    const [percent, setPercent] = useState("1");
    const [entry, setEntry] = useState("");
    const [stop, setStop] = useState("");
    const [target, setTarget] = useState("");

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(KEY) ?? "{}");
            if (typeof saved.account === "string") setAccount(saved.account);
            if (typeof saved.percent === "string") setPercent(saved.percent);
        } catch {}
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify({ account, percent }));
        } catch {}
    }, [account, percent]);
    // A new coin starts a new calculation.
    useEffect(() => {
        setEntry("");
        setStop("");
        setTarget("");
    }, [asset]);

    const a = num(account);
    const p = num(percent);
    const e = num(entry) ?? price;
    const s = num(stop);
    const t = num(target);

    const ready = a !== null && a > 0 && p !== null && p > 0 && e !== null && e > 0 && s !== null && s > 0 && s !== e;
    const risk = ready ? (a! * p!) / 100 : null;
    const distance = ready ? Math.abs(e! - s!) : null;
    const size = ready ? risk! / distance! : null;
    const exposure = size !== null ? size * e! : null;
    const direction = ready ? (s! < e! ? "Long" : "Short") : null;
    const targetValid = ready && t !== null && t > 0 && (direction === "Long" ? t > e! : t < e!);
    const reward = targetValid ? Math.abs(t! - e!) / distance! : null;
    const leverage = exposure !== null && a ? exposure / a : null;

    const row = (term: string, value: string, color = "text-white") => (
        <div className="min-w-0">
            <dt className="text-[11px] text-white/40">{term}</dt>
            <dd className={`truncate ${color}`}>{value}</dd>
        </div>
    );

    return (
        <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-white/45">Position size · {asset}</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <label className="block">
                    <span className="text-[11px] text-white/40">Account ($)</span>
                    <input className={field} inputMode="decimal" value={account} onChange={(event) => setAccount(event.target.value)} placeholder="10,000" />
                </label>
                <label className="block">
                    <span className="text-[11px] text-white/40">Risk per trade (%)</span>
                    <input className={field} inputMode="decimal" value={percent} onChange={(event) => setPercent(event.target.value)} placeholder="1" />
                </label>
                <label className="block">
                    <span className="text-[11px] text-white/40">Entry</span>
                    <input className={field} inputMode="decimal" value={entry} onChange={(event) => setEntry(event.target.value)} placeholder={price !== null ? fmtPrice(price) : "Price"} />
                </label>
                <label className="block">
                    <span className="text-[11px] text-white/40">Stop loss</span>
                    <input className={field} inputMode="decimal" value={stop} onChange={(event) => setStop(event.target.value)} placeholder="Price" />
                </label>
                <label className="col-span-2 block">
                    <span className="text-[11px] text-white/40">Take profit (optional)</span>
                    <input className={field} inputMode="decimal" value={target} onChange={(event) => setTarget(event.target.value)} placeholder="Price" />
                </label>
            </div>

            {ready ? (
                <>
                    <dl className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4 text-[13px] tabular-nums">
                        {row("Size", `${qty(size!)} ${asset}`)}
                        {row("Risk", usd(risk!), "text-[#E955A8]")}
                        {row("Direction", direction!, direction === "Long" ? "text-[#4DD0E1]" : "text-[#E955A8]")}
                        {row("Exposure", usd(exposure!))}
                        {row("Stop distance", `${((distance! / e!) * 100).toFixed(2)}%`)}
                        {row("Reward : risk", reward !== null ? `${reward.toFixed(2)} R` : "—", reward !== null ? (reward >= 2 ? "text-[#4DD0E1]" : "text-white") : "text-white/40")}
                    </dl>
                    {leverage !== null && leverage > 1 && <p className="mt-3 text-[12px] text-white/45">Exposure is {leverage.toFixed(1)}× the account: this needs leverage. The risk stays {usd(risk!)} if the stop holds.</p>}
                    {t !== null && !targetValid && <p className="mt-3 text-[12px] text-[#FACC15]">The take profit is on the wrong side of the entry.</p>}
                </>
            ) : (
                <p className="mt-3 text-[12px] text-white/45">{num(entry) === null && price !== null ? "Entry uses the live price until you type one. " : ""}Fill in the account, the risk and a stop to see the size.</p>
            )}
        </div>
    );
};

export default RiskCalculator;
