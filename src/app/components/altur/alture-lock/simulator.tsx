"use client";

import { useState } from "react";

const PRETRADE_QUESTIONS = [
    "Are you at your desk and ready to trade?",
    "Is your setup confirmed?",
    "Are all required confirmations present?",
    "Is your risk defined?",
    "Is your stop-loss defined?",
    "Is your position size correct?",
    "Are market conditions suitable for your strategy?",
];

type MonitorId = "setupValid" | "level1" | "level2" | "ranging" | "invalidation" | "tooLong";

const MONITOR_QUESTIONS: { id: MonitorId; text: string }[] = [
    { id: "setupValid", text: "Is the original setup still valid?" },
    { id: "level1", text: "Has Level 1 broken?" },
    { id: "level2", text: "Has Level 2 broken?" },
    { id: "ranging", text: "Is the trade ranging?" },
    { id: "invalidation", text: "Has the invalidation level been reached?" },
    { id: "tooLong", text: "Has the trade been open too long?" },
];

const SESSION_WINDOWS = ["New York session", "London session", "Asian session", "24 hour session"];

const BASE_CONFIRMATION_OPTIONS = ["VWAP reclaim", "Liquidity sweep", "Broken level", "Price reaching a zone", "CVD divergence"];

// Temporary. Lets us preview the full screen rule alarm without waiting for a real
// break to happen. Set to false or delete this block and its button once confirmed.
const SHOW_ALARM_PREVIEW = true;

const ACCOUNT_SIZE = 50000;
const ENTRY_PRICE = 1.10;
const INSTRUMENT = "XRPUSDT";
const DIRECTION = "Long";

function joinNatural(items: string[]): string {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function joinNaturalOr(items: string[]): string {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} or ${items[1]}`;
    return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

type Config = {
    minRR: number;
    maxConsecutiveLosses: number;
    sessionWindow: string;
    newsBlackoutMinutes: number;
    correlationLimit: number;
    riskPercent: number;
    stopDistancePercent: number;
    stopLossMandatory: boolean;
    confirmationTypes: string[];
};

const DEFAULT_CONFIG: Config = {
    minRR: 2,
    maxConsecutiveLosses: 3,
    sessionWindow: SESSION_WINDOWS[0],
    newsBlackoutMinutes: 15,
    correlationLimit: 1,
    riskPercent: 3,
    stopDistancePercent: 1,
    stopLossMandatory: true,
    confirmationTypes: ["VWAP reclaim", "Liquidity sweep"],
};

type ValidationIssue = { message: string; blocking: boolean };

function validateConfig(cfg: Config): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (cfg.stopLossMandatory && cfg.stopDistancePercent <= 0) {
        issues.push({ message: "Stop-loss is marked mandatory but the distance is set to zero. Set a distance greater than zero or turn off the mandatory rule.", blocking: true });
    }
    if (cfg.riskPercent <= 0) {
        issues.push({ message: "Account risk percent must be greater than zero.", blocking: true });
    }
    if (cfg.minRR < 1) {
        issues.push({ message: "Minimum risk to reward ratio should be at least 1 to 1.", blocking: true });
    }
    if (cfg.maxConsecutiveLosses < 1) {
        issues.push({ message: "Max consecutive losses should be at least 1.", blocking: true });
    }
    if (cfg.correlationLimit < 1) {
        issues.push({ message: "Correlation limit should allow at least one open position.", blocking: true });
    }
    if (cfg.riskPercent > 5) {
        issues.push({ message: "Risking more than 5 percent per trade is high for this account size.", blocking: false });
    }
    if (cfg.confirmationTypes.length === 0) {
        issues.push({ message: "Select at least one confirmation type before starting.", blocking: true });
    }
    return issues;
}

type Verdict = "HOLD" | "REDUCE" | "CLOSE";
type Answers = Partial<Record<MonitorId, "Yes" | "No">>;

type AlertSeverity = "red" | "amber";
type MonitorAlert = { title: string; message: string; severity: AlertSeverity };

function getMonitorAlert(id: MonitorId, value: "Yes" | "No"): MonitorAlert | null {
    if (id === "setupValid" && value === "No") {
        return { title: "SETUP NO LONGER VALID", message: "The original thesis for this trade is no longer valid.", severity: "red" };
    }
    if (id === "level1" && value === "Yes") {
        return { title: "LEVEL 1 BROKEN", message: "Level 1 has broken. This is a partial de-risk signal.", severity: "red" };
    }
    if (id === "level2" && value === "Yes") {
        return { title: "LEVEL 2 BROKEN", message: "Level 2 has broken. Market structure has failed.", severity: "red" };
    }
    if (id === "invalidation" && value === "Yes") {
        return { title: "INVALIDATION LEVEL REACHED", message: "Your predefined stop-loss condition has been triggered.", severity: "red" };
    }
    if (id === "tooLong" && value === "Yes") {
        return { title: "TRADE OPEN TOO LONG", message: "This trade has been open beyond your defined time limit.", severity: "amber" };
    }
    return null;
}

function playAlertSound(severity: AlertSeverity) {
    try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = severity === "red" ? 880 : 660;
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
    } catch {
        // audio is not available in this browser, fail silently
    }
}

function getVerdict(answers: Answers): { verdict: Verdict; reason: string } {
    if (answers.invalidation === "Yes") {
        return { verdict: "CLOSE", reason: "Invalidation level reached. Your predefined stop-loss condition has been triggered." };
    }
    if (answers.setupValid === "No") {
        return { verdict: "CLOSE", reason: "Original setup no longer valid. The thesis has been invalidated." };
    }
    if (answers.level2 === "Yes") {
        return { verdict: "CLOSE", reason: "Level 2 broken. Market structure has failed." };
    }
    if (answers.tooLong === "Yes") {
        return { verdict: "REDUCE", reason: "Trade open beyond your defined time limit. This is a time-based rule trigger." };
    }
    if (answers.level1 === "Yes") {
        return { verdict: "REDUCE", reason: "Level 1 broken. This is a partial de-risk signal." };
    }
    if (answers.ranging === "Yes") {
        return { verdict: "HOLD", reason: "Price is ranging. No rule has been triggered, so continue monitoring." };
    }
    return { verdict: "HOLD", reason: "All conditions remain valid. Continue holding per plan." };
}

const OUTCOMES: Record<Verdict, { pnlPct: number; duration: string }> = {
    CLOSE: { pnlPct: -2.1, duration: "1h 05m" },
    REDUCE: { pnlPct: -0.4, duration: "3h 40m" },
    HOLD: { pnlPct: 18.1818, duration: "6h 20m" },
};

const VIOLATION_OUTCOME = { pnlPct: -4.3, duration: "5h 50m" };

type Phase = "config" | "pretrade" | "entry" | "monitoring" | "verdict" | "journal";
const TRANSITION_MS = 200;

const AltureLockSimulator = () => {
    const [phase, setPhase] = useState<Phase>("config");
    const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
    const [confirmationOptions, setConfirmationOptions] = useState<string[]>(BASE_CONFIRMATION_OPTIONS);
    const [customConfirmationInput, setCustomConfirmationInput] = useState("");
    const [confirmedTypes, setConfirmedTypes] = useState<Record<string, boolean>>({});
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [entryTimestamp, setEntryTimestamp] = useState("");
    const [answers, setAnswers] = useState<Answers>({});
    const [followedSystem, setFollowedSystem] = useState<boolean | null>(null);
    const [activeAlert, setActiveAlert] = useState<MonitorAlert | null>(null);
    const [pendingAnswer, setPendingAnswer] = useState<{ id: MonitorId; value: "Yes" | "No" } | null>(null);

    const pretradeDone = step >= PRETRADE_QUESTIONS.length;
    const issues = validateConfig(config);
    const blockingIssues = issues.filter((i) => i.blocking);

    // Derived, rule-driven trade math. These numbers are set once in the config
    // panel and carried through every later phase without being recalculated ad hoc.
    const riskAmount = ACCOUNT_SIZE * (config.riskPercent / 100);
    const positionValue = config.stopDistancePercent > 0 ? riskAmount / (config.stopDistancePercent / 100) : 0;
    const positionUnits = positionValue / ENTRY_PRICE;
    const stopLossPrice = ENTRY_PRICE * (1 - config.stopDistancePercent / 100);
    const rewardTargetPrice = ENTRY_PRICE + (ENTRY_PRICE - stopLossPrice) * config.minRR;
    const positionSizeLabel = `${Math.round(positionUnits).toLocaleString()} XRP ($${Math.round(positionValue).toLocaleString()})`;

    const transition = (fn: () => void) => {
        setVisible(false);
        setTimeout(() => {
            fn();
            setVisible(true);
        }, TRANSITION_MS);
    };

    const confirmedTransition = (fn: () => void) => {
        setConfirming(true);
        setVisible(false);
        setTimeout(() => {
            fn();
            setConfirming(false);
            setVisible(true);
        }, TRANSITION_MS);
    };

    const updateConfig = <K extends keyof Config>(key: K, value: Config[K]) => {
        setConfig((c) => ({ ...c, [key]: value }));
    };

    const toggleConfirmationType = (type: string) => {
        setConfig((c) => ({
            ...c,
            confirmationTypes: c.confirmationTypes.includes(type)
                ? c.confirmationTypes.filter((t) => t !== type)
                : [...c.confirmationTypes, type],
        }));
    };

    const addCustomConfirmationType = () => {
        const label = customConfirmationInput.trim();
        if (!label) return;
        if (!confirmationOptions.includes(label)) {
            setConfirmationOptions((opts) => [...opts, label]);
        }
        if (!config.confirmationTypes.includes(label)) {
            setConfig((c) => ({ ...c, confirmationTypes: [...c.confirmationTypes, label] }));
        }
        setCustomConfirmationInput("");
    };

    const startChecklist = () => transition(() => setPhase("pretrade"));

    const advancePretrade = () => confirmedTransition(() => setStep((s) => s + 1));

    const toggleConfirmedType = (type: string) => {
        setConfirmedTypes((c) => ({ ...c, [type]: !c[type] }));
    };

    const anyConfirmationChecked = config.confirmationTypes.some((t) => confirmedTypes[t]);

    const continueFromConfirmations = () => confirmedTransition(() => setStep((s) => s + 1));

    const enterTrade = () => transition(() => {
        setEntryTimestamp(new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }));
        setPhase("entry");
    });

    const beginMonitoring = () => transition(() => {
        setPhase("monitoring");
        setStep(0);
    });

    const recordMonitorAnswer = (id: MonitorId, value: "Yes" | "No") => confirmedTransition(() => {
        const next = { ...answers, [id]: value };
        setAnswers(next);
        if (step + 1 >= MONITOR_QUESTIONS.length) {
            setPhase("verdict");
        } else {
            setStep((s) => s + 1);
        }
    });

    const answerMonitor = (value: "Yes" | "No") => {
        const id = MONITOR_QUESTIONS[step].id;
        const alert = getMonitorAlert(id, value);
        if (alert) {
            setPendingAnswer({ id, value });
            setActiveAlert(alert);
            playAlertSound(alert.severity);
            return;
        }
        recordMonitorAnswer(id, value);
    };

    const dismissAlert = () => {
        if (!pendingAnswer) {
            setActiveAlert(null);
            return;
        }
        const { id, value } = pendingAnswer;
        setActiveAlert(null);
        setPendingAnswer(null);
        recordMonitorAnswer(id, value);
    };

    // Temporary preview handler. Fires the same alarm a real Level 2 break would,
    // with no answer attached, so dismissing it just clears the screen.
    const previewAlarm = () => {
        const alert = getMonitorAlert("level2", "Yes");
        if (!alert) return;
        setActiveAlert(alert);
        playAlertSound(alert.severity);
    };

    const confirmFollowed = (value: boolean) => transition(() => {
        setFollowedSystem(value);
        setPhase("journal");
    });

    const restart = () => transition(() => {
        setPhase("config");
        setConfig(DEFAULT_CONFIG);
        setConfirmationOptions(BASE_CONFIRMATION_OPTIONS);
        setConfirmedTypes({});
        setStep(0);
        setAnswers({});
        setFollowedSystem(null);
        setActiveAlert(null);
        setPendingAnswer(null);
    });

    const { verdict, reason } = getVerdict(answers);
    const outcome = followedSystem === false ? VIOLATION_OUTCOME : OUTCOMES[verdict];
    const exitPrice = ENTRY_PRICE * (1 + outcome.pnlPct / 100);
    const pnlAmount = positionValue * (outcome.pnlPct / 100);
    const rMultiple = riskAmount > 0 ? pnlAmount / riskAmount : 0;

    const rulesRecap = (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-gray-500 mb-8">
            <span>Risk {config.riskPercent}%</span>
            <span>Stop {config.stopDistancePercent}%</span>
            <span>Min reward {config.minRR} to 1</span>
            <span>Max losses {config.maxConsecutiveLosses}</span>
            <span>{config.sessionWindow}</span>
            <span>News blackout {config.newsBlackoutMinutes}m</span>
            <span>Correlation limit {config.correlationLimit}</span>
        </div>
    );

    return (
        <>
            {activeAlert && (
                <div
                    onClick={dismissAlert}
                    className={`fixed inset-0 z-[100] flex items-center justify-center cursor-pointer text-center px-6 ${activeAlert.severity === "red" ? "alert-overlay-red" : "alert-overlay-amber"}`}
                >
                    <div className="alert-shake">
                        <p className="text-xs font-mono tracking-[0.3em] text-white/70 mb-4">
                            {activeAlert.severity === "red" ? "RULE TRIGGERED" : "WARNING"}
                        </p>
                        <p className={`text-4xl sm:text-6xl font-bold mb-6 ${activeAlert.severity === "red" ? "text-red-400" : "text-amber-400"}`}>
                            {activeAlert.title}
                        </p>
                        <p className="text-sm md:text-base font-light text-white/80 max-w-md mx-auto mb-10">
                            {activeAlert.message}
                        </p>
                        <div className="inline-block px-8 py-3 border border-white/40 text-white font-medium text-xs uppercase tracking-[0.2em]">
                            Tap to continue
                        </div>
                    </div>
                </div>
            )}
        <div className="border border-white/10 bg-black/40 p-8 md:p-14 max-w-2xl mx-auto text-center">
            <div
                className={`transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"} min-h-[140px] flex flex-col items-center justify-center`}
            >
                {/* PHASE 0: Your Rules configuration panel */}
                {phase === "config" && (
                    <div className="w-full">
                        <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-4">
                            YOUR RULES
                        </p>
                        <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed max-w-md mx-auto mb-10">
                            Set your rules before you trade. These numbers carry through the checklist, the trade, and the journal below.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-8">
                            <ConfigField label="Minimum risk to reward ratio">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 text-sm">1 to</span>
                                    <NumberInput value={config.minRR} step={0.1} min={0} onChange={(v) => updateConfig("minRR", v)} />
                                </div>
                            </ConfigField>

                            <ConfigField label="Max consecutive losses before cooldown">
                                <NumberInput value={config.maxConsecutiveLosses} step={1} min={0} onChange={(v) => updateConfig("maxConsecutiveLosses", v)} />
                            </ConfigField>

                            <ConfigField label="Trading session window">
                                <select
                                    value={config.sessionWindow}
                                    onChange={(e) => updateConfig("sessionWindow", e.target.value)}
                                    className="w-full bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none"
                                >
                                    {SESSION_WINDOWS.map((w) => (
                                        <option key={w} value={w}>{w}</option>
                                    ))}
                                </select>
                            </ConfigField>

                            <ConfigField label="News blackout window in minutes">
                                <NumberInput value={config.newsBlackoutMinutes} step={5} min={0} onChange={(v) => updateConfig("newsBlackoutMinutes", v)} />
                            </ConfigField>

                            <ConfigField label="Max correlated positions open at once">
                                <NumberInput value={config.correlationLimit} step={1} min={0} onChange={(v) => updateConfig("correlationLimit", v)} />
                            </ConfigField>

                            <ConfigField label="Account risk per trade, percent">
                                <NumberInput value={config.riskPercent} step={0.1} min={0} onChange={(v) => updateConfig("riskPercent", v)} />
                            </ConfigField>

                            <ConfigField label="Stop-loss distance from entry, percent">
                                <NumberInput value={config.stopDistancePercent} step={0.1} min={0} onChange={(v) => updateConfig("stopDistancePercent", v)} />
                            </ConfigField>

                            <ConfigField label="Stop-loss is mandatory">
                                <button
                                    type="button"
                                    onClick={() => updateConfig("stopLossMandatory", !config.stopLossMandatory)}
                                    className={`w-full text-left px-3 py-2 border text-sm transition-colors ${config.stopLossMandatory ? "border-primary/50 text-primary" : "border-white/15 text-gray-400"}`}
                                >
                                    {config.stopLossMandatory ? "On" : "Off"}
                                </button>
                            </ConfigField>
                        </div>

                        <div className="text-left mb-8">
                            <p className="text-xs font-light text-gray-500 uppercase tracking-[0.1em] mb-2">
                                Confirmation types you use
                            </p>
                            <p className="text-xs font-light text-gray-500 mb-3">
                                Choose the entry confirmations you rely on, or define your own. The checklist will ask you to confirm each one before you can enter a trade.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {confirmationOptions.map((type) => {
                                    const selected = config.confirmationTypes.includes(type);
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => toggleConfirmationType(type)}
                                            className={`px-3 py-2 border text-xs transition-colors ${selected ? "border-primary/60 text-primary" : "border-white/15 text-gray-400"}`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={customConfirmationInput}
                                    onChange={(e) => setCustomConfirmationInput(e.target.value)}
                                    placeholder="Define your own confirmation type"
                                    className="flex-1 bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={addCustomConfirmationType}
                                    className="px-4 py-2 border border-white/20 text-gray-300 text-xs uppercase tracking-[0.1em] hover:border-white/50 hover:text-white transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="text-left text-xs font-mono text-gray-500 mb-8">
                            Demo account size ${ACCOUNT_SIZE.toLocaleString()}. Calculated position size {positionSizeLabel}.
                        </div>

                        {issues.length > 0 && (
                            <div className="text-left border border-white/10 p-4 mb-8 space-y-2">
                                {issues.map((issue, i) => (
                                    <p key={i} className={`text-sm font-light ${issue.blocking ? "text-red-400" : "text-primary"}`}>
                                        {issue.blocking ? "Blocked. " : "Warning. "}{issue.message}
                                    </p>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={startChecklist}
                            disabled={blockingIssues.length > 0}
                            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#D4AF37]"
                        >
                            Start Checklist
                        </button>
                    </div>
                )}

                {/* PHASE A: Pre-trade checklist */}
                {phase === "pretrade" && !pretradeDone && (
                    <>
                        <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-8">
                            STEP {step + 1} OF {PRETRADE_QUESTIONS.length}
                        </p>
                        {confirming ? (
                            <Checkmark />
                        ) : step === 1 ? (
                            <div className="w-full max-w-md">
                                <p className="text-lg md:text-xl font-light text-white mb-6 leading-relaxed">
                                    {config.confirmationTypes.length > 1
                                        ? `Confirmation required. Confirm at least one: ${joinNaturalOr(config.confirmationTypes)}.`
                                        : `Confirmation required. ${joinNatural(config.confirmationTypes)}.`}
                                </p>
                                <div className="space-y-3 mb-8 text-left">
                                    {config.confirmationTypes.map((type) => {
                                        const checked = !!confirmedTypes[type];
                                        return (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => toggleConfirmedType(type)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 border text-sm transition-colors ${checked ? "border-primary/60 text-primary" : "border-white/15 text-gray-300 hover:border-white/40"}`}
                                            >
                                                <span className={`flex items-center justify-center w-5 h-5 border flex-shrink-0 ${checked ? "border-primary" : "border-white/30"}`}>
                                                    {checked && (
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </span>
                                                {type}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={continueFromConfirmations}
                                    disabled={!anyConfirmationChecked}
                                    className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#D4AF37]"
                                >
                                    Continue
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-lg md:text-xl font-light text-white mb-4 leading-relaxed max-w-md">
                                    {PRETRADE_QUESTIONS[step]}
                                </p>
                                {step === 3 && (
                                    <p className="text-xs font-mono text-gray-500 mb-6">
                                        Configured: {config.riskPercent}% of account (${Math.round(riskAmount).toLocaleString()})
                                    </p>
                                )}
                                {step === 4 && (
                                    <p className="text-xs font-mono text-gray-500 mb-6">
                                        Configured: {config.stopDistancePercent}% from entry (${stopLossPrice.toFixed(4)})
                                    </p>
                                )}
                                {step === 5 && (
                                    <p className="text-xs font-mono text-gray-500 mb-6">
                                        Calculated: {positionSizeLabel}
                                    </p>
                                )}
                                <button
                                    onClick={advancePretrade}
                                    className="mt-6 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                                >
                                    Yes, Next
                                </button>
                            </>
                        )}
                    </>
                )}

                {phase === "pretrade" && pretradeDone && (
                    <>
                        <p className="text-primary font-mono tracking-[0.2em] text-xs md:text-sm uppercase mb-4">
                            All conditions passed
                        </p>
                        <p className="text-2xl md:text-3xl font-light text-white mb-10">
                            Enter trade
                        </p>
                        <button
                            onClick={enterTrade}
                            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                        >
                            Enter Trade
                        </button>
                    </>
                )}

                {/* PHASE B: Trade entry summary */}
                {phase === "entry" && (
                    <div className="w-full">
                        <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-6">
                            POSITION OPENED
                        </p>
                        {rulesRecap}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left mb-10">
                            <Field label="Instrument" value={INSTRUMENT} />
                            <Field label="Direction" value={DIRECTION} accent />
                            <Field label="Entry Price" value={`$${ENTRY_PRICE.toFixed(4)}`} />
                            <Field label="Position Size" value={positionSizeLabel} />
                            <Field label="Stop-Loss" value={`$${stopLossPrice.toFixed(4)}`} />
                            <Field label="Reward Target" value={`$${rewardTargetPrice.toFixed(4)}`} />
                            <Field label="Risk % of Account" value={`${config.riskPercent}%`} />
                            <Field label="Timestamp" value={entryTimestamp} />
                        </div>
                        <button
                            onClick={beginMonitoring}
                            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                        >
                            Begin Monitoring
                        </button>
                    </div>
                )}

                {/* PHASE C: During-trade monitoring */}
                {phase === "monitoring" && (
                    <>
                        {SHOW_ALARM_PREVIEW && (
                            <button
                                onClick={previewAlarm}
                                className="mb-6 px-4 py-2 border border-dashed border-white/30 text-gray-400 text-xs uppercase tracking-[0.15em] hover:border-white/60 hover:text-white transition-colors"
                            >
                                Preview Alarm
                            </button>
                        )}
                        <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-6">
                            MONITORING, CHECK {step + 1} OF {MONITOR_QUESTIONS.length}
                        </p>
                        {confirming ? (
                            <Checkmark />
                        ) : (
                            <>
                                {rulesRecap}
                                <p className="text-lg md:text-xl font-light text-white mb-10 leading-relaxed max-w-md">
                                    {MONITOR_QUESTIONS[step].text}
                                </p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => answerMonitor("Yes")}
                                        className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => answerMonitor("No")}
                                        className="px-8 py-3 border border-white/20 text-gray-300 font-medium text-xs uppercase tracking-[0.2em] hover:border-white/50 hover:text-white transition-all duration-500"
                                    >
                                        No
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* PHASE D: Decision output */}
                {phase === "verdict" && (
                    <div className="w-full">
                        <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-6">
                            SYSTEM VERDICT
                        </p>
                        <p className={`alert-pulse text-3xl md:text-4xl font-light mb-6 ${verdict === "HOLD" ? "text-white" : verdict === "REDUCE" ? "text-primary" : "text-red-400"}`}>
                            {verdict}
                        </p>
                        <p className="text-sm md:text-base font-light text-gray-300 leading-relaxed max-w-md mx-auto mb-10">
                            {verdict === "HOLD" ? reason : `Rule triggered. ${reason}`}
                        </p>
                        <p className="text-sm font-light text-gray-400 mb-6">
                            Did you follow the system&apos;s call?
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => confirmFollowed(true)}
                                className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                            >
                                Yes, I followed it
                            </button>
                            <button
                                onClick={() => confirmFollowed(false)}
                                className="px-8 py-3 border border-white/20 text-gray-300 font-medium text-xs uppercase tracking-[0.2em] hover:border-white/50 hover:text-white transition-all duration-500"
                            >
                                No, I overrode it
                            </button>
                        </div>
                    </div>
                )}

                {/* PHASE E: Trade journal entry */}
                {phase === "journal" && (
                    <div className="w-full">
                        <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-6">
                            TRADE JOURNAL ENTRY
                        </p>
                        {rulesRecap}

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left mb-8">
                            <Field label="Entry Price" value={`$${ENTRY_PRICE.toFixed(4)}`} />
                            <Field label="Exit Price" value={`$${exitPrice.toFixed(4)}`} />
                            <Field label="Position Size" value={positionSizeLabel} />
                            <Field
                                label="P and L"
                                value={`${outcome.pnlPct >= 0 ? "+" : ""}${outcome.pnlPct.toFixed(1)}% (${pnlAmount >= 0 ? "+" : "-"}$${Math.abs(pnlAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`}
                                accent={outcome.pnlPct >= 0}
                                warn={outcome.pnlPct < 0}
                            />
                            <Field
                                label="R Multiple"
                                value={`${rMultiple >= 0 ? "+" : ""}${rMultiple.toFixed(1)}R`}
                                accent={rMultiple >= 0}
                                warn={rMultiple < 0}
                            />
                            <Field label="Duration Held" value={outcome.duration} />
                            <Field label="Risk Taken" value={`${config.riskPercent}% ($${Math.round(riskAmount).toLocaleString()})`} />
                        </div>

                        <div className="text-left border-t border-white/10 pt-6 space-y-3 mb-10">
                            <p className="text-sm font-light text-gray-400">
                                Checklist. <span className="text-white">7 of 7 pre-trade conditions confirmed.</span>
                            </p>
                            <p className="text-sm font-light text-gray-400">
                                Rules followed. <span className="text-white">{followedSystem ? "All rules followed. System call honored." : "Pre-trade checklist only."}</span>
                            </p>
                            <p className="text-sm font-light text-gray-400">
                                Rules violated.{" "}
                                <span className={followedSystem ? "text-white" : "text-red-400"}>
                                    {followedSystem ? "None." : `Overrode the ${verdict} call. ${reason}`}
                                </span>
                            </p>
                            <p className="text-sm font-light text-gray-400">
                                Exit trigger. <span className="text-white">{verdict === "HOLD" && followedSystem !== false ? "Not applicable. Held per plan." : reason}</span>
                            </p>
                        </div>

                        <button
                            onClick={restart}
                            className="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors"
                        >
                            Restart demo
                        </button>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div className="mt-10 h-px w-full bg-white/10 relative overflow-hidden">
                <div
                    className="h-px bg-primary transition-all duration-500"
                    style={{ width: `${progressPct(phase, step, pretradeDone)}%` }}
                />
            </div>

            <style jsx>{`
                @keyframes checkPop {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.15); }
                    100% { opacity: 1; transform: scale(1); }
                }
                :global(.check-pop) {
                    animation: checkPop 300ms ease-out;
                }
                @keyframes alertPulse {
                    0% { transform: scale(1); }
                    30% { transform: scale(1.06); }
                    60% { transform: scale(0.98); }
                    100% { transform: scale(1); }
                }
                :global(.alert-pulse) {
                    animation: alertPulse 500ms ease-out;
                }
                @keyframes alertFlashRed {
                    0% { background-color: rgba(220, 38, 38, 0.97); }
                    25% { background-color: rgba(220, 38, 38, 0.97); }
                    100% { background-color: rgba(0, 0, 0, 0.93); }
                }
                @keyframes alertFlashAmber {
                    0% { background-color: rgba(217, 119, 6, 0.97); }
                    25% { background-color: rgba(217, 119, 6, 0.97); }
                    100% { background-color: rgba(0, 0, 0, 0.93); }
                }
                :global(.alert-overlay-red) {
                    animation: alertFlashRed 700ms ease-out forwards;
                    border-top: 4px solid #dc2626;
                    border-bottom: 4px solid #dc2626;
                }
                :global(.alert-overlay-amber) {
                    animation: alertFlashAmber 700ms ease-out forwards;
                    border-top: 4px solid #d97706;
                    border-bottom: 4px solid #d97706;
                }
                @keyframes alertShakeIn {
                    0% { transform: translateX(0); opacity: 0; }
                    10% { transform: translateX(-10px); opacity: 1; }
                    20% { transform: translateX(10px); }
                    30% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    50% { transform: translateX(-4px); }
                    60% { transform: translateX(4px); }
                    70%, 100% { transform: translateX(0); }
                }
                :global(.alert-shake) {
                    animation: alertShakeIn 500ms ease-out;
                }
            `}</style>
        </div>
        </>
    );
};

function progressPct(phase: Phase, step: number, pretradeDone: boolean) {
    const phaseWeights: Record<Phase, number> = {
        config: 0,
        pretrade: 0,
        entry: 35,
        monitoring: 50,
        verdict: 85,
        journal: 100,
    };
    if (phase === "pretrade") {
        const total = PRETRADE_QUESTIONS.length;
        return (Math.min(step, total) / total) * 30 * (pretradeDone ? 1 : 0.9);
    }
    if (phase === "monitoring") {
        return 35 + (step / MONITOR_QUESTIONS.length) * 50;
    }
    return phaseWeights[phase];
}

const ConfigField = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
        <p className="text-xs font-light text-gray-500 uppercase tracking-[0.1em] mb-2">{label}</p>
        {children}
    </div>
);

const NumberInput = ({ value, onChange, step, min }: { value: number; onChange: (v: number) => void; step: number; min: number }) => (
    <input
        type="number"
        value={value}
        step={step}
        min={min}
        onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
        className="w-full bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none"
    />
);

const Checkmark = () => (
    <div className="check-pop flex items-center justify-center w-14 h-14 border border-primary text-primary">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    </div>
);

const Field = ({ label, value, accent, warn }: { label: string; value: string; accent?: boolean; warn?: boolean }) => (
    <div>
        <p className="text-xs font-mono tracking-[0.15em] text-gray-500 uppercase mb-1">{label}</p>
        <p className={`text-sm md:text-base font-light ${warn ? "text-red-400" : accent ? "text-primary" : "text-white"}`}>{value}</p>
    </div>
);

export default AltureLockSimulator;
