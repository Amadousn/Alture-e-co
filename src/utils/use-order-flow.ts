"use client";

import { useEffect, useRef, useState } from "react";
import { createFlowEngine, FlowEngine, FlowSettings, FlowSnapshot, INTERVAL_MS, Side, Trade } from "@/utils/order-flow";

const STREAM = "wss://stream.bybit.com/v5/public/linear";
const PING_MS = 20000;
// With no message at all for this long (pings are answered), the socket is treated as dead.
const SILENCE_MS = 45000;
const RETRY_MS = [1000, 2000, 5000, 10000];
const PUBLISH_MS = 300;

export type FlowStatus = "connecting" | "live" | "reconnecting";
export type OrderFlow = { status: FlowStatus; snapshot: FlowSnapshot | null; disconnects: number };

type StreamTrade = { T: number; S: string; v: string; p: string; i: string };

// Live order flow for one symbol and interval, straight from Bybit's public
// trade stream in the visitor's browser. No key, no server, no stored history:
// order flow exists from the moment of connection (plus the last 1,000 trades).
export function useOrderFlow(symbol: string, interval: string, settings: FlowSettings, enabled: boolean): OrderFlow {
    const [state, setState] = useState<OrderFlow>({ status: "connecting", snapshot: null, disconnects: 0 });
    const engine = useRef<FlowEngine | null>(null);
    const latest = useRef(settings);
    latest.current = settings;

    useEffect(() => {
        engine.current?.setSettings(settings);
    }, [settings]);

    useEffect(() => {
        if (!enabled) return;
        const flow = createFlowEngine(INTERVAL_MS[interval] ?? INTERVAL_MS["5"], latest.current);
        engine.current = flow;
        setState({ status: "connecting", snapshot: null, disconnects: 0 });

        let closed = false;
        let socket: WebSocket | null = null;
        let attempt = 0;
        let disconnects = 0;
        let dirty = false;
        let status: FlowStatus = "connecting";
        let lastMessage = 0;
        let retry: ReturnType<typeof setTimeout> | undefined;
        // Trades that arrive while the backfill is still loading wait here so order is kept.
        let buffer: Trade[] | null = null;

        const publish = () => {
            if (closed) return;
            dirty = false;
            setState({ status, snapshot: flow.snapshot(), disconnects });
        };
        const setStatus = (next: FlowStatus) => {
            status = next;
            publish();
        };

        const backfill = async () => {
            buffer = [];
            let seed: Trade[] = [];
            try {
                const res = await fetch(`/api/market/trades?symbol=${symbol}`, { cache: "no-store" });
                if (res.ok) seed = (await res.json()).trades ?? [];
            } catch {
                // Without the seed the view simply starts from the first streamed trade.
            }
            if (closed) return;
            flow.ingest(seed);
            flow.ingest(buffer);
            buffer = null;
            dirty = true;
        };

        const connect = () => {
            if (closed) return;
            const ws = new WebSocket(STREAM);
            socket = ws;
            ws.onopen = () => {
                attempt = 0;
                lastMessage = Date.now();
                ws.send(JSON.stringify({ op: "subscribe", args: [`publicTrade.${symbol}`] }));
                void backfill();
                setStatus("live");
            };
            ws.onmessage = (event) => {
                lastMessage = Date.now();
                let message: { topic?: string; data?: StreamTrade[] };
                try {
                    message = JSON.parse(String(event.data));
                } catch {
                    return;
                }
                if (message.topic !== `publicTrade.${symbol}` || !Array.isArray(message.data)) return;
                const trades: Trade[] = [];
                for (const row of message.data) {
                    const trade = { id: row.i, t: Number(row.T), p: Number(row.p), q: Number(row.v), side: row.S as Side };
                    if (trade.id && (trade.side === "Buy" || trade.side === "Sell") && Number.isFinite(trade.t) && Number.isFinite(trade.p) && Number.isFinite(trade.q)) trades.push(trade);
                }
                if (buffer) buffer.push(...trades);
                else {
                    flow.ingest(trades);
                    dirty = true;
                }
            };
            ws.onclose = () => {
                if (closed || socket !== ws) return;
                socket = null;
                // Whatever traded while disconnected is unknown, so coverage restarts.
                flow.gap();
                buffer = null;
                disconnects += 1;
                setStatus("reconnecting");
                retry = setTimeout(connect, RETRY_MS[Math.min(attempt++, RETRY_MS.length - 1)]);
            };
            ws.onerror = () => ws.close();
        };
        connect();

        const beat = setInterval(() => {
            if (!socket || socket.readyState !== WebSocket.OPEN) return;
            if (Date.now() - lastMessage > SILENCE_MS) socket.close();
            else socket.send(JSON.stringify({ op: "ping" }));
        }, PING_MS);
        const tick = setInterval(() => dirty && publish(), PUBLISH_MS);

        return () => {
            closed = true;
            clearInterval(beat);
            clearInterval(tick);
            clearTimeout(retry);
            socket?.close();
            engine.current = null;
        };
    }, [symbol, interval, enabled]);

    return state;
}
