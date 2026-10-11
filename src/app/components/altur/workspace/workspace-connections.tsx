"use client";

import { FormEvent, useState } from "react";
import WorkspaceShell from "./workspace-shell";
import { SectionMark } from "@/app/components/altur/brand/desk-mark";
import { BRAND_MARKS, BrandMark } from "@/app/components/altur/brand/brand-marks";
import { PROVIDERS } from "@/integrations/registry";
import type { ConnectionStatus, ProviderCategory, ProviderDefinition } from "@/integrations/types";
import { useConnection } from "@/integrations/use-connection";

const CATEGORIES: ProviderCategory[] = ["Crypto exchanges", "Futures trading", "Forex / CFD trading", "Charting and trading"];

const STATUS: Record<ConnectionStatus, { label: string; tone: string }> = {
    "not-connected": { label: "Not connected", tone: "text-white/55" },
    connecting: { label: "Connecting", tone: "text-white" },
    connected: { label: "Connected", tone: "text-[#20B8A8]" },
    syncing: { label: "Syncing", tone: "text-white" },
    synced: { label: "Synced", tone: "text-[#20B8A8]" },
    "sync-failed": { label: "Sync failed", tone: "text-[#E955A8]" },
};

const fieldClass = "!rounded-sm !bg-[#0c0c0c] !border-white/25 !text-sm !text-white px-3 py-2.5 focus:!border-white";
const primary = "h-10 px-5 rounded-sm bg-white text-black text-sm font-semibold hover:bg-[#e4e4e8] transition-colors lit disabled:opacity-30 disabled:shadow-none";
const quiet = "h-10 px-4 rounded-sm border border-white/25 text-sm font-medium text-white hover:bg-white/10 transition-colors disabled:opacity-30";
const dateTime = (time: number) => new Date(time).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

// The provider's brand mark where a verified one is available; otherwise a
// plain dashed square that cannot be mistaken for a real logo.
const Logo = ({ provider }: { provider: ProviderDefinition }) =>
    BRAND_MARKS[provider.id] ? (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-white" role="img" aria-label={`${provider.name} logo`}>
            <BrandMark name={provider.id} className={provider.id === "bybit" ? "h-10 w-10" : "h-7 w-7"} />
        </span>
    ) : (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-dashed border-white/25 font-mono text-[8px] uppercase leading-tight text-center text-white/45" title="Official logo not added yet">
            Logo
            <br />
            pending
        </span>
    );

const Status = ({ status }: { status: ConnectionStatus }) => (
    <span role="status" className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${STATUS[status].tone}`}>
        <span className={`h-1.5 w-1.5 rounded-full bg-current ${status === "connecting" || status === "syncing" ? "cockpit-pulse" : ""}`} aria-hidden="true" />
        {STATUS[status].label}
    </span>
);

const Row = ({ provider, status, action, children }: { provider: ProviderDefinition; status: React.ReactNode; action?: React.ReactNode; children?: React.ReactNode }) => (
    <li className="border-t border-white/15 py-6">
        <div className="grid grid-cols-[auto_1fr] lg:grid-cols-12 gap-x-5 lg:gap-x-10 gap-y-3 items-start">
            <div className="lg:col-span-3 col-span-2 flex items-center gap-4">
                <Logo provider={provider} />
                <div>
                    <p className="text-xl font-medium tracking-tight text-white">{provider.name}</p>
                    <p className="text-xs text-white/45">{provider.access}</p>
                </div>
            </div>
            <div className="lg:col-span-2 col-span-2 lg:pt-2.5">{status}</div>
            <p className="lg:col-span-5 col-span-2 text-[15px] leading-relaxed text-white/55">{provider.summary}</p>
            <div className="lg:col-span-2 col-span-2 flex flex-wrap lg:justify-end gap-2">{action}</div>
        </div>
        {children}
    </li>
);

const BybitRow = ({ provider }: { provider: ProviderDefinition }) => {
    const connection = useConnection("bybit");
    const [open, setOpen] = useState(false);
    const [environment, setEnvironment] = useState<"demo" | "live">("demo");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");
    const [confirming, setConfirming] = useState(false);
    const { status, summary, failure } = connection;
    const connected = summary !== null;
    const busy = status === "connecting" || status === "syncing";

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const ok = await connection.connect({ environment, apiKey, apiSecret });
        // The secret leaves this page as soon as it has been sent.
        setApiSecret("");
        if (ok) {
            setApiKey("");
            setOpen(false);
        }
    };

    return (
        <Row
            provider={provider}
            status={!connection.ready ? <span className="text-xs text-white/45">Checking…</span> : !connection.available ? <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/55">Unavailable</span> : <Status status={status} />}
            action={
                !connection.ready || !connection.available ? null : connected ? (
                    <>
                        <button type="button" disabled={busy} onClick={connection.sync} className={primary}>
                            {status === "syncing" ? "Syncing…" : "Sync now"}
                        </button>
                        <button type="button" disabled={busy} onClick={() => setConfirming(true)} className={quiet}>
                            Disconnect
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className={primary}>
                        Connect
                    </button>
                )
            }
        >
            {connection.ready && !connection.available && <p className="mt-4 text-sm text-white/55 lg:pl-[calc(25%+0.6rem)]">Connections are not switched on for this site yet: the server is missing its vault key.</p>}

            {connected && (
                <dl className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-px bg-white/15 border border-white/15 text-sm">
                    {(
                        [
                            ["Environment", summary.environment],
                            ["API key", summary.keyHint],
                            ["Account", summary.accountHint ?? "Not reported by Bybit"],
                            ["Access", summary.readOnlyVerified ? "Read-only, confirmed by Bybit" : "Not confirmable on demo"],
                            ["Last successful sync", connection.lastSyncAt ? dateTime(connection.lastSyncAt) : "Not synced yet"],
                        ] as const
                    ).map(([label, value]) => (
                        <div key={label} className="bg-black px-4 py-3 min-w-0">
                            <dt className="text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1">{label}</dt>
                            <dd className="text-white truncate tabular-nums">{value}</dd>
                        </div>
                    ))}
                </dl>
            )}

            {connected && status === "synced" && (
                <p className="mt-3 text-sm text-white/55">
                    {connection.tradeCount} {connection.tradeCount === 1 ? "trade" : "trades"} imported into your Trading Journal.
                    {connection.lastResult && ` This sync read ${connection.lastResult.executions} ${connection.lastResult.executions === 1 ? "fill" : "fills"} and added ${connection.lastResult.added} new ${connection.lastResult.added === 1 ? "trade" : "trades"}.`}
                </p>
            )}
            {connected && status === "connected" && <p className="mt-3 text-sm text-white/55">Bybit accepted the key. Nothing has been imported yet: press Sync now to bring in your last 90 days.</p>}

            {failure && (
                <div role="alert" className="cockpit-rise mt-4 flex flex-wrap items-center justify-between gap-3 border-l-2 border-[#E955A8] pl-4 py-1">
                    <p className="text-sm text-white">{failure.message}</p>
                    {connected && failure.retryable && (
                        <button type="button" onClick={connection.sync} disabled={busy} className={`${quiet} !h-9 !text-xs`}>
                            Try again
                        </button>
                    )}
                    {connected && failure.reconnect && (
                        <button type="button" onClick={() => connection.disconnect(false).then(() => setOpen(true))} className={`${quiet} !h-9 !text-xs`}>
                            Reconnect with a new key
                        </button>
                    )}
                </div>
            )}

            {confirming && (
                <div className="cockpit-rise mt-4 border border-white/15 p-5">
                    <p className="text-sm text-white mb-1">Disconnect Bybit?</p>
                    <p className="text-sm text-white/55 mb-4 max-w-2xl">AltureLock forgets the key at once. To cancel the key itself, delete it in your Bybit account under API Management.</p>
                    <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => connection.disconnect(false).then(() => setConfirming(false))} className={primary}>
                            Disconnect, keep imported trades
                        </button>
                        <button type="button" onClick={() => connection.disconnect(true).then(() => setConfirming(false))} className={quiet}>
                            Disconnect and remove imported trades
                        </button>
                        <button type="button" onClick={() => setConfirming(false)} className="px-3 text-xs text-white/55 hover:text-white">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {open && !connected && (
                <form onSubmit={submit} className="cockpit-rise mt-5 grid lg:grid-cols-12 gap-x-10 gap-y-6 border border-white/15 p-5 md:p-7" autoComplete="off">
                    <div className="lg:col-span-5 text-sm leading-relaxed text-white/55">
                        <p className="text-white font-medium mb-2">Create a read-only key at Bybit</p>
                        <ol className="list-decimal pl-5 space-y-1.5">
                            <li>In Bybit, open API Management and create a new key.</li>
                            <li>Choose Read-Only. Leave trading, transfers and withdrawals off.</li>
                            <li>Paste the key and secret here.</li>
                        </ol>
                        <p className="mt-4">AltureLock refuses any key that can trade or move funds. The key is sent once to our server, sealed, and never shown again or stored in this page.</p>
                    </div>
                    <div className="lg:col-span-7 space-y-4">
                        <div>
                            <span className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">Environment</span>
                            <div className="grid grid-cols-2 gap-1 rounded-sm border border-white/25 p-1 max-w-sm" role="group" aria-label="Environment">
                                {(["demo", "live"] as const).map((value) => (
                                    <button key={value} type="button" aria-pressed={environment === value} onClick={() => setEnvironment(value)} className={`rounded-sm py-2 text-sm font-semibold transition-colors ${environment === value ? "bg-white text-black" : "text-white/55 hover:text-white"}`}>
                                        {value === "demo" ? "Demo trading" : "Live"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="bybit-key" className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">
                                API key
                            </label>
                            <input id="bybit-key" type="text" autoComplete="off" spellCheck={false} value={apiKey} onChange={(event) => setApiKey(event.target.value)} className={fieldClass} />
                        </div>
                        <div>
                            <label htmlFor="bybit-secret" className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">
                                API secret
                            </label>
                            <input id="bybit-secret" type="password" autoComplete="new-password" spellCheck={false} value={apiSecret} onChange={(event) => setApiSecret(event.target.value)} className={fieldClass} />
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                            <button type="submit" disabled={status === "connecting" || apiKey.trim().length < 8 || apiSecret.trim().length < 8} className={primary}>
                                {status === "connecting" ? "Checking with Bybit…" : "Connect Bybit"}
                            </button>
                            <button type="button" onClick={() => setOpen(false)} className={quiet}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Row>
    );
};

const PlannedRow = ({ provider }: { provider: ProviderDefinition }) => {
    const [open, setOpen] = useState(false);
    return (
        <Row
            provider={provider}
            status={<span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/45">Planned · not available</span>}
            action={
                <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className={quiet}>
                    {open ? "Hide" : "What it needs"}
                </button>
            }
        >
            {open && (
                <ul className="cockpit-rise mt-4 space-y-1.5 border-l border-white/25 pl-4 text-sm text-white/55">
                    {provider.requirements.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                    <li>No connection exists yet, so nothing can be imported from {provider.name} today.</li>
                </ul>
            )}
        </Row>
    );
};

const WorkspaceConnections = () => (
    <WorkspaceShell>
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-10 md:mb-14">
            <h1 className="lg:col-span-7 !text-3xl md:!text-5xl text-white">Connections</h1>
            <p className="lg:col-span-5 text-[15px] leading-relaxed text-white/55">Bring your trades into the journal from the platform you trade on. AltureLock only ever reads. It cannot place orders or move money.</p>
        </div>

        {CATEGORIES.map((category, i) => {
            const list = PROVIDERS.filter((provider) => provider.category === category);
            return (
                <section key={category} className="!py-0 mb-12 !bg-transparent">
                    <SectionMark label={category} className="!border-t-0 mb-3" />
                    <ul>
                        {list.map((provider) => (provider.id === "bybit" ? <BybitRow key={provider.id} provider={provider} /> : <PlannedRow key={provider.id} provider={provider} />))}
                        <li className="border-t border-white/15" aria-hidden="true" />
                    </ul>
                </section>
            );
        })}

        <p className="text-xs leading-relaxed text-white/40 max-w-3xl">
            Logos are shown where a verified brand mark is available; "Logo pending" marks the ones still to be added. Imported trades are kept in this browser, like the rest of your journal. Provider names are the property of their owners; listing a provider here does not mean it is connected or endorsed.
        </p>
    </WorkspaceShell>
);

export default WorkspaceConnections;
