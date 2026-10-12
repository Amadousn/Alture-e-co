"use client";

import { useMemo, useRef, useState } from "react";
import { compareCapital } from "@/utils/education-sim";
import { Step } from "./course";
import { ChartOf, Done, Feedback, NextOne, Prompt, retry, TRIES } from "./shared";

const usd = (value: number) => `${value < 0 ? "-" : ""}$${Math.abs(Math.round(value)).toLocaleString("en-US")}`;
const label = "text-[11px] uppercase tracking-[0.14em] text-white/45";
const BEIGE = "#E9DCC3";

const Check = ({ on, children }: { on: boolean; children: React.ReactNode }) => (
    <li className={`flex items-center gap-3 text-sm transition-colors ${on ? "text-white" : "text-white/40"}`}>
        <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${on ? "border-[#20B8A8]" : "border-white/25"}`} aria-hidden="true">
            {on && <span className="h-1.5 w-1.5 rounded-full bg-[#20B8A8]" />}
        </span>
        {children}
    </li>
);

// ---------- blocks: a small working model of a blockchain ----------

type Tx = { from: string; to: string; amount: number };
type Block = { txs: Tx[] };
// A short fingerprint of a block's contents and of the fingerprint before it. Not real cryptography: the same idea, small enough to watch.
const fingerprint = (block: Block, previous: string) => {
    let h = 7;
    for (const char of previous + JSON.stringify(block.txs)) h = (Math.imul(h, 31) + char.charCodeAt(0)) >>> 0;
    return h.toString(16).padStart(8, "0").slice(0, 6);
};
const START: Block[] = [{ txs: [{ from: "Ana", to: "Ben", amount: 0.5 }] }, { txs: [{ from: "Ben", to: "Chloe", amount: 0.2 }] }, { txs: [{ from: "Chloe", to: "Ana", amount: 0.1 }] }];

export const Blocks = ({ onDone }: { onDone: Done }) => {
    const [chain, setChain] = useState<Block[]>(START);
    const [pending, setPending] = useState<Tx[]>([]);
    const [open, setOpen] = useState<number | null>(null);
    const [did, setDid] = useState({ sent: false, added: false, changed: false });
    // The fingerprints as they were when each block was added: what the next block remembers.
    const [sealed, setSealed] = useState<string[]>(() => START.reduce<string[]>((list, block) => [...list, fingerprint(block, list[list.length - 1] ?? "000000")], []));

    const mark = (what: Partial<typeof did>) => {
        const next = { ...did, ...what };
        setDid(next);
        if (next.sent && next.added && next.changed && !(did.sent && did.added && did.changed)) onDone(1);
    };
    // What each block's fingerprint is now, given its contents and the block before it.
    const now = chain.reduce<string[]>((list, block, i) => [...list, fingerprint(block, i === 0 ? "000000" : sealed[i - 1])], []);
    const broken = chain.map((_, i) => now[i] !== sealed[i]);
    const firstBroken = broken.indexOf(true);

    const send = () => {
        setPending((list) => [...list, { from: "Ana", to: "Ben", amount: 0.01 }]);
        mark({ sent: true });
    };
    const add = () => {
        const block = { txs: pending };
        setChain((list) => [...list, block]);
        setSealed((list) => [...list, fingerprint(block, list[list.length - 1])]);
        setPending([]);
        mark({ added: true });
    };
    const tamper = (index: number) => {
        setChain((list) => list.map((block, i) => (i === index ? { txs: block.txs.map((tx, k) => (k === 0 ? { ...tx, amount: tx.amount === 50 ? START[index]?.txs[0].amount ?? 0.01 : 50 } : tx)) } : block)));
        mark({ changed: true });
    };
    const changed = (index: number) => chain[index].txs[0].amount === 50;

    return (
        <div>
            <div className="overflow-x-auto pb-2">
                <ol className="flex min-w-max items-stretch gap-0">
                    {chain.map((block, i) => (
                        <li key={i} className="flex items-center">
                            {i > 0 && <span className={`h-px w-8 transition-colors ${firstBroken !== -1 && i > firstBroken ? "bg-[#E955A8]" : "bg-white/35"}`} aria-hidden="true" />}
                            <button type="button" aria-pressed={open === i} onClick={() => setOpen(open === i ? null : i)} className={`cockpit-rise w-[150px] rounded-sm border px-3.5 py-3 text-left transition-colors ${open === i ? "border-white" : firstBroken !== -1 && i >= firstBroken ? "border-[#E955A8]/70" : "border-white/25 hover:border-white/60"}`}>
                                <span className="block text-xs text-white/45">Block {i + 1}</span>
                                <span className="mt-1.5 block text-[13px] text-white">
                                    {block.txs.length} {block.txs.length === 1 ? "payment" : "payments"}
                                </span>
                                <span className="mt-2 block font-mono text-[11px] text-white/45">
                                    before: <span className={firstBroken !== -1 && i > firstBroken ? "text-[#E955A8]" : "text-white/70"}>{i === 0 ? "none" : sealed[i - 1]}</span>
                                </span>
                                <span className="block font-mono text-[11px] text-white/45">
                                    print: <span className={broken[i] ? "text-[#E955A8]" : "text-white/70"}>{now[i]}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="mt-6 grid gap-x-12 gap-y-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    {open !== null ? (
                        <div key={open} className="cockpit-rise">
                            <p className={label}>Block {open + 1}</p>
                            <ul className="mt-3 space-y-1.5 text-[15px] text-white/85">
                                {chain[open].txs.map((tx, k) => (
                                    <li key={k} className="tabular-nums">
                                        {tx.from} pays {tx.to} <span className={k === 0 && changed(open) ? "text-[#E955A8]" : "text-white"}>{tx.amount} BTC</span>
                                    </li>
                                ))}
                            </ul>
                            <button type="button" onClick={() => tamper(open)} className="mt-4 rounded-sm border border-white/30 px-4 py-2 text-sm text-white hover:border-white transition-colors">
                                {changed(open) ? "Undo the change" : "Change the first payment to 50 BTC"}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className={label}>Waiting to be recorded</p>
                            {pending.length === 0 ? (
                                <p className="mt-3 text-[15px] text-white/50">No payments waiting.</p>
                            ) : (
                                <ul className="mt-3 space-y-1.5 text-[15px] tabular-nums text-white/85">
                                    {pending.map((tx, k) => (
                                        <li key={k} className="cockpit-rise">
                                            {tx.from} pays {tx.to} {tx.amount} BTC
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="mt-4 flex flex-wrap gap-2.5">
                                <button type="button" onClick={send} className="rounded-sm border border-white/30 px-4 py-2 text-sm text-white hover:border-white transition-colors">
                                    Send 0.01 BTC from Ana to Ben
                                </button>
                                <button type="button" onClick={add} disabled={pending.length === 0} className="rounded-sm bg-white px-4 py-2 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors disabled:bg-transparent disabled:text-white/30 disabled:border disabled:border-white/15">
                                    Add the next block
                                </button>
                            </div>
                        </div>
                    )}
                    {firstBroken !== -1 ? (
                        <Feedback tone="bad">{`Block ${firstBroken + 1} no longer has the print that ${firstBroken + 1 < chain.length ? `block ${firstBroken + 2} remembers` : "was recorded for it"}. Every block after it is now out of step, and anyone holding a copy of the chain can see it. That is why the past cannot be quietly rewritten.`}</Feedback>
                    ) : did.added ? (
                        <Feedback tone="good">Each block carries the print of the block before it. That is the chain.</Feedback>
                    ) : null}
                </div>
                <div className="lg:col-span-5">
                    <Prompt>Try the three things a blockchain is for.</Prompt>
                    <ul className="mt-4 space-y-2">
                        <Check on={did.sent}>Send a payment</Check>
                        <Check on={did.added}>Add it to the chain in a new block</Check>
                        <Check on={did.changed}>Open an older block and try to change it</Check>
                    </ul>
                    <p className="mt-5 text-[13px] leading-relaxed text-white/40">A simplified model. Real blocks hold thousands of payments, and are added by a network of computers that all keep a copy: for Bitcoin, about one block every ten minutes.</p>
                </div>
            </div>
        </div>
    );
};

// ---------- sort: put each statement where it belongs ----------

export const Sort = ({ step, onDone }: { step: Extract<Step, { kind: "sort" }>; onDone: Done }) => {
    const [index, setIndex] = useState(0);
    const [picked, setPicked] = useState<string[]>([]);
    const worst = useRef(1);
    const item = step.items[index];
    const last = index === step.items.length - 1;
    const wrongs = picked.filter((choice) => choice !== item.answer);
    const solved = picked.includes(item.answer);
    const shown = !solved && wrongs.length >= TRIES;
    const closed = solved || shown;

    const pick = (choice: string) => {
        if (closed || picked.includes(choice)) return;
        const next = [...picked, choice];
        setPicked(next);
        const misses = next.filter((value) => value !== item.answer).length;
        if (choice === item.answer) worst.current = Math.max(worst.current, misses === 0 ? 1 : 2);
        else if (misses >= TRIES) worst.current = 3;
        if ((choice === item.answer || misses >= TRIES) && last) onDone(worst.current);
    };

    return (
        <div className="max-w-3xl">
            <p className="mb-3 text-xs tabular-nums text-white/45">
                {index + 1} of {step.items.length}
            </p>
            <p key={index} className="cockpit-rise min-h-[4.5rem] font-logo text-2xl md:text-[28px] font-light leading-snug text-white">
                {item.text}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5" role="group" aria-label="Where it belongs">
                {step.categories.map((choice) => {
                    const chosen = picked.includes(choice);
                    const right = choice === item.answer;
                    const state = right && closed ? (chosen ? "border-[#20B8A8] text-white" : "border-accent text-white") : chosen ? "border-[#E955A8]/60 text-white/45" : closed ? "border-white/10 text-white/35" : "border-white/25 text-white hover:border-white";
                    return (
                        <button key={choice} type="button" disabled={closed || chosen} onClick={() => pick(choice)} className={`rounded-sm border px-4 py-2.5 text-sm transition-colors ${state}`}>
                            {choice}
                        </button>
                    );
                })}
            </div>
            {shown ? (
                <Feedback tone="shown" lead={`The answer: ${item.answer}.`}>
                    {item.why}
                </Feedback>
            ) : solved ? (
                <Feedback tone="good">{`Yes. ${item.why}`}</Feedback>
            ) : wrongs.length > 0 ? (
                <Feedback tone="bad">{retry(item.hint)}</Feedback>
            ) : null}
            {closed && !last && (
                <NextOne
                    onClick={() => {
                        setIndex(index + 1);
                        setPicked([]);
                    }}
                />
            )}
        </div>
    );
};

// ---------- browse: open each item and compare ----------

export const Browse = ({ step, onDone }: { step: Extract<Step, { kind: "browse" }>; onDone: Done }) => {
    const [open, setOpen] = useState(step.items[0].key);
    const [seen, setSeen] = useState<string[]>([step.items[0].key]);
    const item = step.items.find((entry) => entry.key === open)!;
    const show = (key: string) => {
        setOpen(key);
        if (seen.includes(key)) return;
        setSeen([...seen, key]);
        if (seen.length + 1 === step.items.length) onDone(1);
    };
    return (
        <div>
            <Prompt>{step.prompt}</Prompt>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2" role="tablist" aria-label="Markets">
                {step.items.map((entry) => (
                    <button key={entry.key} type="button" role="tab" aria-selected={open === entry.key} onClick={() => show(entry.key)} className={`nav-link flex items-center gap-2 pb-1 text-[15px] font-medium ${open === entry.key ? "is-active" : ""}`}>
                        {entry.label}
                        <span className={`h-1.5 w-1.5 rounded-full transition-colors ${seen.includes(entry.key) ? "bg-[#20B8A8]" : "bg-white/20"}`} aria-hidden="true" />
                    </button>
                ))}
            </div>
            <div key={open} className="cockpit-rise mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <p className="font-logo text-4xl font-light leading-none text-white">{item.label}</p>
                    <p className={`${label} mt-6`}>For example</p>
                    <p className="mt-2 text-[15px] leading-relaxed" style={{ color: BEIGE }}>
                        {item.example}
                    </p>
                </div>
                <dl className="lg:col-span-8 space-y-5">
                    {item.facts.map(([term, text]) => (
                        <div key={term} className="grid gap-x-6 gap-y-1 sm:grid-cols-[9rem_1fr]">
                            <dt className="text-sm text-white/45">{term}</dt>
                            <dd className="text-[15px] leading-relaxed text-white/85">{text}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <p className="mt-8 text-[13px] leading-relaxed text-white/40">
                {seen.length} of {step.items.length} opened. {step.note}
            </p>
        </div>
    );
};

// ---------- calculator: your own capital beside a prop firm's account ----------

// One hypothetical example, the same for every learner, so the three days can be compared.
const EXAMPLE = { own: 2000, account: 50000, fee: 300, splitPct: 80, drawdownPct: 10, dailyPct: 5 };
const DAYS = [
    { key: "good", label: "A good day", resultPct: 2 },
    { key: "bad", label: "A losing day", resultPct: -2 },
    { key: "mistake", label: "One big mistake", resultPct: -6 },
] as const;
type DayKey = (typeof DAYS)[number]["key"];

const DIFFERENCE: [string, string, string][] = [
    ["Whose money is it?", "Yours.", "The firm's. You pay a fee to be tested for it."],
    ["What do you risk?", "Your own money. Every loss is yours.", "The fee you paid, and the account itself. The trading loss is the firm's."],
    ["What do you keep?", "All of the profit.", "A share of the profit. The firm keeps the rest."],
    ["Whose rules?", "Your own. Nobody stops you but you.", "The firm's. Break one, and the account is closed."],
];
const OWN = "Your own capital";
const FIRM = "A funded account, from a prop firm";
const COLUMNS = "md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1.2fr)]";
const plus = (value: number) => `${value > 0 ? "+" : ""}${usd(value)}`;

export const Calculator = ({ onDone }: { onDone: Done }) => {
    const [day, setDay] = useState<DayKey | null>(null);
    const [seen, setSeen] = useState<DayKey[]>([]);
    const all = seen.length === DAYS.length;
    const chosen = DAYS.find((item) => item.key === day);
    const out = useMemo(() => (chosen ? compareCapital({ ...EXAMPLE, resultPct: chosen.resultPct }) : null), [chosen]);

    const open = (key: DayKey) => {
        setDay(key);
        if (seen.includes(key)) return;
        const next = [...seen, key];
        setSeen(next);
        if (next.length === DAYS.length) onDone(1);
    };
    const tone = (value: number) => (value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white");
    // What reaches the trader from the funded account on that day.
    const reaches = out ? (out.closedInADay ? -EXAMPLE.fee : out.share) : 0;

    return (
        <div className="max-w-4xl">
            <Prompt>You can trade with your own money, or with the money of a proprietary trading firm (a prop firm). Here is the difference.</Prompt>

            <div className="mt-6 border-t border-white/10" role="table" aria-label="Your own capital compared with a funded account">
                <div className={`hidden md:grid ${COLUMNS} gap-x-8 border-b border-white/10 py-3`} role="row">
                    <span role="columnheader" />
                    <span role="columnheader" className={label}>
                        {OWN}
                    </span>
                    <span role="columnheader" className={label}>
                        {FIRM}
                    </span>
                </div>
                {DIFFERENCE.map(([question, own, firm]) => (
                    <div key={question} className={`grid gap-x-8 gap-y-2 border-b border-white/10 py-4 ${COLUMNS}`} role="row">
                        <p role="rowheader" className="text-sm text-white/50">
                            {question}
                        </p>
                        <p role="cell" className="text-[15px] leading-relaxed text-white">
                            <span className={`${label} mb-1 block md:hidden`}>{OWN}</span>
                            {own}
                        </p>
                        <p role="cell" className="text-[15px] leading-relaxed text-white">
                            <span className={`${label} mb-1 block md:hidden`}>{FIRM}</span>
                            {firm}
                        </p>
                    </div>
                ))}
            </div>

            <p className="mt-10 text-lg font-medium tracking-tight text-white">Now one day, three ways. Open each one.</p>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-white/45">
                Hypothetical example: {usd(EXAMPLE.own)} of your own, or a {usd(EXAMPLE.account)} funded account with a {usd(EXAMPLE.fee)} fee, an {EXAMPLE.splitPct}% profit split, a daily loss limit of {EXAMPLE.dailyPct}% and a maximum drawdown of {EXAMPLE.drawdownPct}%.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5" role="group" aria-label="The day">
                {DAYS.map((item) => (
                    <button key={item.key} type="button" aria-pressed={day === item.key} onClick={() => open(item.key)} className={`inline-flex items-center gap-2.5 rounded-sm border px-4 py-2.5 text-sm transition-colors ${day === item.key ? "border-white text-white" : "border-white/25 text-white/75 hover:border-white hover:text-white"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${seen.includes(item.key) ? "bg-[#20B8A8]" : "bg-white/25"}`} aria-hidden="true" />
                        {item.label}
                        <span className="tabular-nums text-white/45">
                            {item.resultPct > 0 ? "+" : ""}
                            {item.resultPct}%
                        </span>
                    </button>
                ))}
            </div>

            {chosen && out && (
                <div key={chosen.key} className="cockpit-rise mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2" role="status">
                    <div>
                        <p className={label}>{OWN}</p>
                        <p className={`mt-3 font-logo text-5xl font-light leading-none tabular-nums ${tone(out.ownResult)}`}>{plus(out.ownResult)}</p>
                        <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                            {out.ownResult > 0 ? "All of the profit is yours." : "All of the loss is yours."} Your {usd(EXAMPLE.own)} becomes {usd(out.ownEnd)}
                            {chosen.key === "mistake" ? ", and nothing stops you from trading on to win it back." : "."}
                        </p>
                    </div>
                    <div>
                        <p className={label}>{FIRM}</p>
                        <p className={`mt-3 font-logo text-5xl font-light leading-none tabular-nums ${tone(reaches)}`}>{plus(reaches)}</p>
                        <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                            {out.closedInADay
                                ? `The account lost ${usd(-out.accountResult)} in one day, more than the ${usd(out.daily)} daily loss limit. It is closed. The loss was the firm's. What you lose is the ${usd(EXAMPLE.fee)} fee, and the account.`
                                : out.accountResult > 0
                                  ? `The account made ${usd(out.accountResult)}. Your ${EXAMPLE.splitPct}% share is ${usd(out.share)} and the firm keeps ${usd(out.accountResult - out.share)}. You paid a ${usd(EXAMPLE.fee)} fee to get this far.`
                                  : `The account lost ${usd(-out.accountResult)}. That loss is the firm's, not yours. But only ${usd(out.cushion)} more may be lost before the account is closed.`}
                        </p>
                    </div>
                </div>
            )}

            <p className="mt-6 text-[13px] leading-relaxed text-white/40">
                {seen.length} of {DAYS.length} opened. Real programmes differ from firm to firm, and an evaluation can be failed. Nothing here promises funding or profit.
            </p>

            {all && (
                <div className="cockpit-rise mt-10 border-t border-white/10 pt-8">
                    <p className="font-logo text-3xl md:text-4xl font-light leading-tight text-white">Either way, you need clear rules.</p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                        You are human, and emotion is part of every decision. One mistake can undo weeks of work, if not everything: your own money in one case, the fee and the account in the other. That is why we built AltureLock: to help you set your rules before the trade, and keep to them when emotion pulls the other way.
                    </p>
                    <a href="/alturelock" target="_blank" rel="noopener" className="group mt-5 inline-flex items-center gap-2 border-b border-white/30 pb-0.5 text-sm font-medium text-white hover:border-white transition-colors">
                        See AltureLock <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                </div>
            )}
        </div>
    );
};

// ---------- compare: two charts side by side ----------

export const Compare = ({ step, onDone }: { step: Extract<Step, { kind: "compare" }>; onDone: Done }) => {
    const [round, setRound] = useState(0);
    const [picked, setPicked] = useState<number[]>([]);
    const worst = useRef(1);
    const item = step.rounds[round];
    const last = round === step.rounds.length - 1;
    const solved = picked.includes(item.answer);
    const missed = picked.some((choice) => choice !== item.answer);

    const pick = (choice: number) => {
        if (solved || picked.includes(choice)) return;
        setPicked([...picked, choice]);
        if (choice !== item.answer) return void (worst.current = Math.max(worst.current, 2));
        if (last) onDone(worst.current);
    };

    return (
        <div>
            <p className="mb-3 text-xs tabular-nums text-white/45">
                {round + 1} of {step.rounds.length}
            </p>
            <Prompt>{item.prompt}</Prompt>
            <div key={round} className="mt-5 grid gap-x-10 gap-y-8 md:grid-cols-2">
                {item.stages.map((stage, i) => {
                    const chosen = picked.includes(i);
                    const right = i === item.answer;
                    return (
                        <div key={i}>
                            <ChartOf stage={stage} className="h-[30vh] min-h-[220px]" />
                            <button type="button" disabled={solved || chosen} onClick={() => pick(i)} className={`mt-1 rounded-sm border px-4 py-2.5 text-sm transition-colors ${chosen ? (right ? "border-[#20B8A8] text-white" : "border-[#E955A8]/60 text-white/45") : solved ? "border-white/10 text-white/35" : "border-white/25 text-white hover:border-white"}`}>
                                {i === 0 ? "The first chart" : "The second chart"}
                            </button>
                        </div>
                    );
                })}
            </div>
            {solved ? <Feedback tone="good">{item.right}</Feedback> : missed ? <Feedback tone="bad">{retry(item.wrong)}</Feedback> : null}
            {solved && !last && (
                <NextOne
                    onClick={() => {
                        setRound(round + 1);
                        setPicked([]);
                    }}
                />
            )}
        </div>
    );
};

// ---------- recap: what the topic covered, and its words ----------

export const Recap = ({ step }: { step: Extract<Step, { kind: "recap" }> }) => (
    <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
            <ul className="space-y-4">
                {step.learned.map((line) => (
                    <li key={line} className="flex gap-3.5 text-[15px] md:text-base leading-relaxed text-white/85">
                        <span className="mt-[11px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {line}
                    </li>
                ))}
            </ul>
        </div>
        <div className="lg:col-span-7">
            <p className={label}>Key terms</p>
            <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {step.terms.map(([term, text]) => (
                    <div key={term}>
                        <dt className="text-[15px] font-medium" style={{ color: BEIGE }}>
                            {term}
                        </dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-white/60">{text}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </div>
);
