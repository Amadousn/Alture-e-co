"use client";

import { useState } from "react";
import WorkspaceShell from "./workspace-shell";
import { ChecklistItem, DEFAULT_CHECKLIST, useWorkspaceSettings } from "@/utils/workspace-store";

const fieldClass = "!rounded-sm !bg-[#0c0c0c] !border-white/25 !text-sm !text-white px-3 py-2.5 focus:!border-white";
const labelClass = "text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]";

const WorkspaceSettings = () => {
    const [settings, setSettings, store] = useWorkspaceSettings();
    const [draft, setDraft] = useState("");
    const [confirmReset, setConfirmReset] = useState(false);

    const setChecklist = (update: (list: ChecklistItem[]) => ChecklistItem[]) => setSettings((current) => ({ ...current, checklist: update(current.checklist) }));

    const addItem = (event: React.FormEvent) => {
        event.preventDefault();
        const label = draft.trim();
        if (!label) return;
        setChecklist((list) => [...list, { id: `custom-${Date.now()}`, label, required: true }]);
        setDraft("");
    };

    return (
        <WorkspaceShell width="max-w-3xl">
            <h1 className="!text-3xl md:!text-4xl text-white mb-2">Settings</h1>
            <p className="text-sm text-[#9a9aa5] mb-10">Changes are saved as you make them, in this browser.</p>

            {!store.ready ? (
                <p className="text-sm text-[#7d7d87]">Loading your settings…</p>
            ) : (
                <>
                    <div className="rounded-sm border border-white/15 bg-black p-5 md:p-6 mb-6">
                        <label htmlFor="workspace-name" className={`${labelClass} block mb-2`}>
                            Name shown in your workspace
                        </label>
                        <input
                            id="workspace-name"
                            type="text"
                            maxLength={40}
                            value={settings.name}
                            onChange={(event) => setSettings((current) => ({ ...current, name: event.target.value }))}
                            className={`${fieldClass} max-w-xs`}
                        />
                    </div>

                    <div className="mb-10 max-w-xl">
                        <p className={`${labelClass} mb-2`}>When to stop for the day</p>
                        <p className="text-sm text-[#9a9aa5] mb-4">Your own limits. When one is reached, the workspace tells you so and puts your review first. It never blocks you. Leave a field empty for no limit.</p>
                        <div className="grid grid-cols-2 gap-4">
                            {(
                                [
                                    ["maxTrades", "Trades in a day"],
                                    ["maxLosses", "Losing trades in a day"],
                                ] as const
                            ).map(([key, text]) => (
                                <div key={key}>
                                    <label htmlFor={`limit-${key}`} className="block text-xs text-[#9a9aa5] mb-1.5">
                                        {text}
                                    </label>
                                    <input
                                        id={`limit-${key}`}
                                        type="number"
                                        inputMode="numeric"
                                        min="1"
                                        step="1"
                                        placeholder="No limit"
                                        value={settings.limits?.[key] ?? ""}
                                        onChange={(event) => {
                                            const value = Math.floor(Number(event.target.value));
                                            setSettings((current) => ({ ...current, limits: { ...current.limits, [key]: event.target.value !== "" && value >= 1 ? value : undefined } }));
                                        }}
                                        className={fieldClass}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-sm border border-white/15 bg-black overflow-hidden">
                        <div className="p-5 md:p-6 border-b border-white/15">
                            <p className={`${labelClass} mb-2`}>Pre-trade checklist</p>
                            <p className="text-sm text-[#9a9aa5]">
                                Your own rules. The seven standard ones appear as reminders under the three readiness checks in Prepare. Any rule you add yourself becomes its own check, and a required one must be confirmed before the trade is ready.
                            </p>
                        </div>

                        <ul className="divide-y divide-white/15">
                            {settings.checklist.map((item, index) => (
                                <li key={item.id} className="flex flex-wrap items-center gap-3 px-5 md:px-6 py-3">
                                    <span className="text-xs tabular-nums text-[#55555e] w-5">{String(index + 1).padStart(2, "0")}</span>
                                    <input
                                        type="text"
                                        aria-label={`Rule ${index + 1}`}
                                        value={item.label}
                                        onChange={(event) => setChecklist((list) => list.map((entry) => (entry.id === item.id ? { ...entry, label: event.target.value } : entry)))}
                                        className={`${fieldClass} flex-1 min-w-[180px] !w-auto`}
                                    />
                                    <label className="flex items-center gap-2 text-xs text-[#9a9aa5] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.required}
                                            onChange={(event) => setChecklist((list) => list.map((entry) => (entry.id === item.id ? { ...entry, required: event.target.checked } : entry)))}
                                            className="h-4 w-4 accent-white"
                                        />
                                        Required
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setChecklist((list) => list.filter((entry) => entry.id !== item.id))}
                                        aria-label={`Remove "${item.label}"`}
                                        className="text-xs text-[#7d7d87] hover:text-[#E955A8] transition-colors"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                            {settings.checklist.length === 0 && <li className="px-5 md:px-6 py-5 text-sm text-[#7d7d87]">Your checklist is empty. Add a rule below, or restore the defaults.</li>}
                        </ul>

                        <form onSubmit={addItem} className="flex flex-wrap items-center gap-3 p-5 md:p-6 border-t border-white/15 bg-[#080808]">
                            <input type="text" aria-label="New rule" placeholder="Add a rule, for example: No trade in the 15 minutes before news" value={draft} onChange={(event) => setDraft(event.target.value)} className={`${fieldClass} flex-1 min-w-[200px] !w-auto`} />
                            <button type="submit" disabled={!draft.trim()} className="h-10 px-5 rounded-sm bg-white text-black text-sm font-semibold hover:bg-[#e4e4e8] transition-colors disabled:opacity-30 disabled:hover:bg-white">
                                Add rule
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center gap-4 mt-5 text-xs">
                        {confirmReset ? (
                            <>
                                <span className="text-[#9a9aa5]">Replace your checklist with the seven default rules?</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setChecklist(() => DEFAULT_CHECKLIST);
                                        setConfirmReset(false);
                                    }}
                                    className="text-white border-b border-white/40 hover:border-white"
                                >
                                    Restore defaults
                                </button>
                                <button type="button" onClick={() => setConfirmReset(false)} className="text-[#7d7d87] hover:text-white">
                                    Keep mine
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setConfirmReset(true)} className="text-[#7d7d87] hover:text-white transition-colors">
                                Restore the default checklist
                            </button>
                        )}
                    </div>
                </>
            )}
        </WorkspaceShell>
    );
};

export default WorkspaceSettings;
