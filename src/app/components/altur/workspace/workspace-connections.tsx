"use client";

import { FormEvent, useState } from "react";
import WorkspaceShell from "./workspace-shell";
import { SectionMark } from "@/app/components/altur/brand/desk-mark";
import { BRAND_MARKS, BrandMark } from "@/app/components/altur/brand/brand-marks";
import { PROVIDERS } from "@/integrations/registry";
import type { ConnectionStatus, ProviderCategory, ProviderDefinition, ProviderId } from "@/integrations/types";
import { useConnection } from "@/integrations/use-connection";
import { useAccountSlots, useImports } from "@/utils/workspace-store";

const CATEGORIES: ProviderCategory[] = ["Crypto exchanges", "Futures trading", "Forex / CFD trading", "Stocks and ETFs", "Charting and trading"];

const STATUS: Record<ConnectionStatus, { label: string; tone: string }> = {
    "not-connected": { label: "Not connected", tone: "text-white/55" },
    connecting: { label: "Connecting", tone: "text-white" },
    connected: { label: "Connected", tone: "text-[#4DD0E1]" },
    syncing: { label: "Syncing", tone: "text-white" },
    synced: { label: "Synced", tone: "text-[#4DD0E1]" },
    "sync-failed": { label: "Sync failed", tone: "text-[#E955A8]" },
};

const fieldClass = "!rounded-sm !bg-[#0c0c0c] !border-white/25 !text-sm !text-white px-3 py-2.5 focus:!border-white";
const primary = "h-10 px-5 rounded-sm bg-white text-black text-sm font-semibold hover:bg-[#e4e4e8] transition-colors lit disabled:opacity-30 disabled:shadow-none";
const quiet = "h-10 px-4 rounded-sm border border-white/25 text-sm font-medium text-white hover:bg-white/10 transition-colors disabled:opacity-30";
const dateTime = (time: number) => new Date(time).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

// The provider's brand mark where a verified one is available; otherwise a
// plain dashed square that cannot be mistaken for a real logo.
const LOGO_FILES = ["bitget", "hyperliquid", "ibkr", "metatrader5", "ninjatrader", "tradovate"];
const Logo = ({ provider }: { provider: ProviderDefinition }) =>
    LOGO_FILES.includes(provider.id) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/images/brokers/${provider.id}.png`} alt={`${provider.name} logo`} width={40} height={40} className="h-10 w-10 flex-shrink-0 rounded-sm object-contain" />
    ) : BRAND_MARKS[provider.id] ? (
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

// What differs between exchanges on the connection form.
type Guide = { steps: string[]; demo: string | null; secret: string; minLength: number; passphrase?: boolean; address?: boolean; note?: string };
const GUIDES: Partial<Record<ProviderId, Guide>> = {
    bybit: { steps: ["In Bybit, open API Management and create a new key.", "Choose Read-Only. Leave trading, transfers and withdrawals off.", "Paste the key and secret here."], demo: "Demo trading", secret: "API secret", minLength: 8 },
    binance: { steps: ["In Binance, open API Management and create a system-generated key.", "Keep only Enable Reading ticked. Leave futures, spot, margin, transfers and withdrawals off.", "Paste the API key and secret key here."], demo: "Futures testnet", secret: "Secret key", minLength: 16 },
    okx: { steps: ["In OKX, open API and create a new key.", "Choose Read only. Leave Trade and Withdraw off.", "Paste the API key, the secret key and the passphrase you chose."], demo: "Demo trading", secret: "Secret key", minLength: 8, passphrase: true },
    hyperliquid: { steps: ["Copy the wallet address you trade with on Hyperliquid.", "Paste it here. Nothing else is needed."], demo: null, secret: "", minLength: 0, address: true, note: "Hyperliquid's history is public on its chain. AltureLock only reads it: there is no key, nothing to sign, and nothing that could ever trade or move funds." },
};

const ExchangeRow = ({ provider, slot = "", label, onRemoved }: { provider: ProviderDefinition; slot?: string; label?: string; onRemoved?: () => void }) => {
    const guide = GUIDES[provider.id]!;
    const connection = useConnection(provider.id, slot);
    const [open, setOpen] = useState(false);
    const [environment, setEnvironment] = useState<"demo" | "live">("demo");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");
    const [passphrase, setPassphrase] = useState("");
    const [address, setAddress] = useState("");
    const [confirming, setConfirming] = useState(false);
    const { status, summary, failure } = connection;
    const connected = summary !== null;
    const busy = status === "connecting" || status === "syncing";

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const ok = await connection.connect(guide.address ? { address } : { environment, apiKey, apiSecret, passphrase });
        // The secret leaves this page as soon as it has been sent.
        setApiSecret("");
        setPassphrase("");
        if (ok) {
            setApiKey("");
            setAddress("");
            setOpen(false);
        }
    };

    return (
        <Row
            provider={label ? { ...provider, name: label } : provider}
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
                            ["Account", summary.accountHint ?? `Not reported by ${provider.name}`],
                            ["Access", summary.readOnlyVerified ? `Read-only, confirmed by ${provider.name}` : "Not confirmable on a test account"],
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
            {connected && status === "connected" && <p className="mt-3 text-sm text-white/55">{provider.name} accepted the key. Nothing has been imported yet: press Sync now to bring in your last 90 days.</p>}

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
                    <p className="text-sm text-white mb-1">Disconnect {provider.name}?</p>
                    <p className="text-sm text-white/55 mb-4 max-w-2xl">AltureLock forgets the key at once. To cancel the key itself, delete it in your {provider.name} account under API Management.</p>
                    <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => connection.disconnect(false).then(() => { setConfirming(false); onRemoved?.(); })} className={primary}>
                            Disconnect, keep imported trades
                        </button>
                        <button type="button" onClick={() => connection.disconnect(true).then(() => { setConfirming(false); onRemoved?.(); })} className={quiet}>
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
                        <p className="text-white font-medium mb-2">{guide.address ? `Connect your ${provider.name} wallet` : `Create a read-only key at ${provider.name}`}</p>
                        <ol className="list-decimal pl-5 space-y-1.5">
                            {guide.steps.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>
                        <p className="mt-4">{guide.note ?? "AltureLock refuses any key that can trade or move funds. The key is sent once to our server, sealed, and never shown again or stored in this page."}</p>
                    </div>
                    <div className="lg:col-span-7 space-y-4">
                        {guide.address ? (
                            <div>
                                <label htmlFor={`${provider.id}-address`} className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">
                                    Wallet address
                                </label>
                                <input id={`${provider.id}-address`} type="text" autoComplete="off" spellCheck={false} placeholder="0x…" value={address} onChange={(event) => setAddress(event.target.value)} className={fieldClass} />
                            </div>
                        ) : (
                            <>
                        {guide.demo && (
                        <div>
                            <span className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">Environment</span>
                            <div className="grid grid-cols-2 gap-1 rounded-sm border border-white/25 p-1 max-w-sm" role="group" aria-label="Environment">
                                {(["demo", "live"] as const).map((value) => (
                                    <button key={value} type="button" aria-pressed={environment === value} onClick={() => setEnvironment(value)} className={`rounded-sm py-2 text-sm font-semibold transition-colors ${environment === value ? "bg-white text-black" : "text-white/55 hover:text-white"}`}>
                                        {value === "demo" ? guide.demo : "Live"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        )}
                        <div>
                            <label htmlFor={`${provider.id}-key`} className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">
                                API key
                            </label>
                            <input id={`${provider.id}-key`} type="text" autoComplete="off" spellCheck={false} value={apiKey} onChange={(event) => setApiKey(event.target.value)} className={fieldClass} />
                        </div>
                        <div>
                            <label htmlFor={`${provider.id}-secret`} className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">
                                {guide.secret}
                            </label>
                            <input id={`${provider.id}-secret`} type="password" autoComplete="new-password" spellCheck={false} value={apiSecret} onChange={(event) => setApiSecret(event.target.value)} className={fieldClass} />
                        </div>
                        {guide.passphrase && (
                            <div>
                                <label htmlFor={`${provider.id}-passphrase`} className="block text-[11px] uppercase tracking-[0.08em] text-white/45 mb-1.5">
                                    Passphrase
                                </label>
                                <input id={`${provider.id}-passphrase`} type="password" autoComplete="new-password" spellCheck={false} value={passphrase} onChange={(event) => setPassphrase(event.target.value)} className={fieldClass} />
                            </div>
                        )}
                            </>
                        )}
                        <div className="flex flex-wrap gap-2 pt-1">
                            <button type="submit" disabled={status === "connecting" || (guide.address ? !/^0x[0-9a-fA-F]{40}$/.test(address.trim()) : apiKey.trim().length < guide.minLength || apiSecret.trim().length < guide.minLength || (!!guide.passphrase && !passphrase.trim()))} className={primary}>
                                {status === "connecting" ? `Checking with ${provider.name}…` : `Connect ${provider.name}`}
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
                    <li>{provider.id === "metatrader5" || provider.id === "ibkr" ? "No live connection: import the file from the Journal, with Import a file." : `No connection exists yet, so nothing can be imported from ${provider.name} today.`}</li>
                </ul>
            )}
        </Row>
    );
};

// A provider's accounts: the first one, then any the trader added and named.
const ExchangeAccounts = ({ provider }: { provider: ProviderDefinition }) => {
    const [slots, setSlots] = useAccountSlots();
    const [imports] = useImports();
    const [naming, setNaming] = useState(false);
    const [name, setName] = useState("");
    const extra = slots[provider.id] ?? [];
    const add = (event: FormEvent) => {
        event.preventDefault();
        const label = name.trim() || `${provider.name} ${extra.length + 2}`;
        setSlots((current) => ({ ...current, [provider.id]: [...(current[provider.id] ?? []), { slot: crypto.randomUUID().replace(/-/g, "").slice(0, 8), label }] }));
        setName("");
        setNaming(false);
    };
    const remove = (slot: string) => setSlots((current) => ({ ...current, [provider.id]: (current[provider.id] ?? []).filter((item) => item.slot !== slot) }));
    return (
        <>
            <ExchangeRow provider={provider} />
            {extra.map((item) => (
                <ExchangeRow key={item.slot} provider={provider} slot={item.slot} label={item.label} onRemoved={() => remove(item.slot)} />
            ))}
            {imports[provider.id] && (
                <li className="py-3 text-sm">
                    {naming ? (
                        <form onSubmit={add} className="flex flex-wrap items-center gap-2">
                            <input value={name} onChange={(event) => setName(event.target.value)} placeholder={`${provider.name} ${extra.length + 2}`} aria-label="Account name" className={`${fieldClass} max-w-xs`} />
                            <button type="submit" className={quiet}>Add</button>
                        </form>
                    ) : (
                        <button type="button" onClick={() => setNaming(true)} className="text-white/60 hover:text-white">+ Add another {provider.name} account</button>
                    )}
                </li>
            )}
        </>
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
                        {list.map((provider) => (GUIDES[provider.id] && provider.availability === "available" ? <ExchangeAccounts key={provider.id} provider={provider} /> : <PlannedRow key={provider.id} provider={provider} />))}
                        <li className="border-t border-white/15" aria-hidden="true" />
                    </ul>
                </section>
            );
        })}

        <p className="text-xs leading-relaxed text-white/40 max-w-3xl">
            Provider names are the property of their owners; listing a provider here does not mean it is connected or endorsed.
        </p>
    </WorkspaceShell>
);

export default WorkspaceConnections;
