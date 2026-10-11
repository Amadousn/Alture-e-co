"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrayBufferTarget, Muxer } from "mp4-muxer";
import type { ClosedTrade } from "@/utils/bybit";
import { computeJournalStats } from "@/utils/journal-stats";
import { drawShareCard, SHARE_FORMATS, ShareCardData, ShareFormat, SharePeriod, ShareTheme } from "./share-card";

// The animation itself, then a held final frame so the numbers can be read.
const ANIMATION_MS = 5200;
const HOLD_MS = 1600;

// Preferred export: every frame is drawn and encoded one by one, so the file
// is smooth and sharp no matter how busy the device is while it renders.
const ENCODE_FPS = 60;
const ENCODE_BITRATE = 18_000_000;
// H.264 High, then Main, then Baseline, at levels that allow 1080 x 1920.
const H264_CODECS = ["avc1.640033", "avc1.640032", "avc1.4d0033", "avc1.4d0032", "avc1.42003e", "avc1.420033"];

// Fallback for browsers without a frame-by-frame encoder: record the canvas
// live. Instagram and most social apps take MP4; WebM is the last resort.
const RECORD_FPS = 30;
const RECORD_BITRATE = 20_000_000;
const VIDEO_TYPES = ["video/mp4;codecs=avc1.42E01E", "video/mp4", "video/webm;codecs=vp9", "video/webm"];

async function pickEncoderCodec(width: number, height: number): Promise<string | null> {
    if (typeof VideoEncoder === "undefined" || typeof VideoFrame === "undefined") return null;
    for (const codec of H264_CODECS) {
        try {
            const { supported } = await VideoEncoder.isConfigSupported({ codec, width, height, bitrate: ENCODE_BITRATE, framerate: ENCODE_FPS });
            if (supported) return codec;
        } catch {
            // try the next profile
        }
    }
    return null;
}

type Props = {
    monthLabel: string;
    monthShort: string;
    year: number;
    // 0-indexed, as in Date.
    month: number;
    // Every closed trade of that month; the day and week cards are cut from it.
    trades: ClosedTrade[];
    // Opens straight on this day's card when the journal has a day selected.
    initialDay?: number | null;
    sample?: boolean;
    onClose: () => void;
};

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const PERIODS: { id: SharePeriod; label: string }[] = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
];

const utcDay = (trade: ClosedTrade) => new Date(trade.closedAt).getUTCDate();

function saveBlob(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const optionClass = (active: boolean) =>
    `flex-1 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-white text-black" : "text-[#9a9aa5] hover:text-white"}`;

const ShareMonth = ({ monthLabel, monthShort, year, month, trades, initialDay = null, sample = false, onClose }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef(0);
    const [format, setFormat] = useState<ShareFormat>("story");
    const [mode, setMode] = useState<"image" | "video">("image");
    const [showAmount, setShowAmount] = useState(true);
    const [theme, setTheme] = useState<ShareTheme>("dark");
    const [fonts, setFonts] = useState<{ sans: string; logo: string } | null>(null);
    const [recording, setRecording] = useState(false);
    const [note, setNote] = useState("");
    const [videoType, setVideoType] = useState<string | null>(null);
    const [canEncode, setCanEncode] = useState(false);
    const [renderProgress, setRenderProgress] = useState(0);

    const { width, height } = SHARE_FORMATS[format];

    // Days and calendar weeks of this month that actually have trades.
    const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const tradingDays = useMemo(() => Array.from(new Set(trades.map(utcDay))).sort((a, b) => a - b), [trades]);
    const weekOf = useCallback((day: number) => Math.floor((firstWeekday + day - 1) / 7), [firstWeekday]);
    const tradingWeeks = useMemo(() => Array.from(new Set(tradingDays.map(weekOf))).sort((a, b) => a - b), [tradingDays, weekOf]);

    const startDay = initialDay !== null && tradingDays.includes(initialDay) ? initialDay : tradingDays[tradingDays.length - 1];
    const [period, setPeriod] = useState<SharePeriod>(initialDay !== null && tradingDays.includes(initialDay) ? "day" : "month");
    const [day, setDay] = useState(startDay);
    const [week, setWeek] = useState(weekOf(startDay));

    const card = useMemo(() => {
        const ordered = [...trades].sort((a, b) => a.closedAt - b.closedAt);
        const inPeriod = period === "month" ? ordered : period === "week" ? ordered.filter((trade) => weekOf(utcDay(trade)) === week) : ordered.filter((trade) => utcDay(trade) === day);
        const stats = computeJournalStats(inPeriod);
        let running = 0;
        const perTrade = inPeriod.map((trade) => (running += trade.profitLoss));
        const weekStart = Math.max(1, week * 7 - firstWeekday + 1);
        const weekEnd = Math.min(daysInMonth, week * 7 - firstWeekday + 7);
        const shortUpper = monthShort.toUpperCase();
        const byDay = new Map(stats.daily.map((entry) => [Number(entry.date.slice(8)), entry.profitLoss]));

        if (period === "month") {
            return {
                slug: monthLabel,
                data: {
                    period,
                    headerLabel: monthLabel,
                    stats,
                    curve: stats.daily.map((entry) => entry.cumulative),
                    best: { label: "BEST DAY", value: stats.daily.reduce((best, entry) => Math.max(best, entry.profitLoss), stats.daily[0]?.profitLoss ?? 0) },
                    calendar: { year, month },
                },
            };
        }
        if (period === "week") {
            return {
                slug: `${monthShort} ${weekStart}-${weekEnd} ${year}`,
                data: {
                    period,
                    headerLabel: weekStart === weekEnd ? `${shortUpper} ${weekStart}, ${year}` : `${shortUpper} ${weekStart} – ${weekEnd}, ${year}`,
                    stats,
                    curve: perTrade,
                    best: { label: "BEST DAY", value: stats.daily.reduce((best, entry) => Math.max(best, entry.profitLoss), stats.daily[0]?.profitLoss ?? 0) },
                    week: WEEKDAYS.map((label, slot) => {
                        const number = week * 7 + slot - firstWeekday + 1;
                        const valid = number >= 1 && number <= daysInMonth;
                        return { label, day: valid ? number : null, value: valid ? byDay.get(number) : undefined };
                    }),
                },
            };
        }
        return {
            slug: `${monthShort} ${day} ${year}`,
            data: {
                period,
                headerLabel: `${WEEKDAYS[new Date(Date.UTC(year, month, day)).getUTCDay()]}, ${shortUpper} ${day}, ${year}`,
                stats,
                curve: perTrade,
                best: { label: "BEST TRADE", value: stats.bestTrade },
                trades: inPeriod.map((trade) => ({
                    instrument: trade.instrument,
                    direction: trade.direction,
                    profitLoss: trade.profitLoss,
                    time: `${new Date(trade.closedAt).toISOString().slice(11, 16)} UTC`,
                    entryPrice: trade.entryPrice,
                    exitPrice: trade.exitPrice,
                })),
            },
        };
    }, [trades, period, week, day, weekOf, firstWeekday, daysInMonth, monthLabel, monthShort, year, month]);

    const cardData = useMemo<ShareCardData | null>(() => (fonts ? { ...card.data, showAmount, theme, sample, fonts } : null), [card, showAmount, theme, sample, fonts]);
    const slug = `alture-${card.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${format}-${theme}`;

    const step = (direction: 1 | -1) => {
        if (period === "day") {
            const next = tradingDays[tradingDays.indexOf(day) + direction];
            if (next !== undefined) setDay(next);
        } else if (period === "week") {
            const next = tradingWeeks[tradingWeeks.indexOf(week) + direction];
            if (next !== undefined) setWeek(next);
        }
    };
    const stepIndex = period === "day" ? tradingDays.indexOf(day) : tradingWeeks.indexOf(week);
    const stepCount = period === "day" ? tradingDays.length : tradingWeeks.length;

    // The site's fonts have build-generated names, so read them off the page
    // and make sure the weights the card uses are loaded before drawing.
    useEffect(() => {
        const body = getComputedStyle(document.body);
        const sans = body.fontFamily;
        const logo = body.getPropertyValue("--font-logo").trim() || sans;
        Promise.all([
            document.fonts.load(`400 20px ${sans}`),
            document.fonts.load(`500 20px ${sans}`),
            document.fonts.load(`600 20px ${sans}`),
            document.fonts.load(`200 20px ${logo}`),
        ])
            .catch(() => undefined)
            .then(() => setFonts({ sans, logo }));
        setVideoType(typeof MediaRecorder === "undefined" ? null : VIDEO_TYPES.find((type) => MediaRecorder.isTypeSupported(type)) ?? null);
        pickEncoderCodec(1080, 1920).then((codec) => setCanEncode(codec !== null));
    }, []);

    const draw = useCallback(
        (progress: number) => {
            const ctx = canvasRef.current?.getContext("2d");
            if (!ctx || !cardData) return;
            drawShareCard(ctx, width, height, cardData, progress);
        },
        [cardData, width, height]
    );

    const play = useCallback(() => {
        cancelAnimationFrame(frameRef.current);
        const start = performance.now();
        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / ANIMATION_MS);
            draw(progress);
            if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
    }, [draw]);

    // Stills show the finished card; video previews by playing through once.
    useEffect(() => {
        if (recording) return;
        if (mode === "video") play();
        else {
            cancelAnimationFrame(frameRef.current);
            draw(1);
        }
        return () => cancelAnimationFrame(frameRef.current);
    }, [mode, draw, play, recording]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !recording) onClose();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose, recording]);

    // Stills are drawn at twice the on-screen size so they stay sharp when
    // the app they are posted to scales or crops them.
    const imageBlob = () =>
        new Promise<Blob | null>((resolve) => {
            if (!cardData) return resolve(null);
            const canvas = document.createElement("canvas");
            canvas.width = width * 2;
            canvas.height = height * 2;
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(null);
            drawShareCard(ctx, canvas.width, canvas.height, cardData, 1);
            canvas.toBlob(resolve, "image/png");
        });

    // Frame-by-frame H.264 into an MP4. Returns null where the browser has
    // no encoder for it, so the caller can fall back to live recording.
    const encodeVideo = async (): Promise<Blob | null> => {
        if (!cardData) return null;
        const codec = await pickEncoderCodec(width, height);
        if (!codec) return null;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        const data = cardData;

        const muxer = new Muxer({ target: new ArrayBufferTarget(), video: { codec: "avc", width, height, frameRate: ENCODE_FPS }, fastStart: "in-memory" });
        let failed = false;
        const encoder = new VideoEncoder({
            output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
            error: () => {
                failed = true;
            },
        });
        encoder.configure({ codec, width, height, bitrate: ENCODE_BITRATE, framerate: ENCODE_FPS });

        const totalFrames = Math.round(((ANIMATION_MS + HOLD_MS) / 1000) * ENCODE_FPS);
        const frameMicros = 1_000_000 / ENCODE_FPS;
        for (let i = 0; i < totalFrames && !failed; i++) {
            drawShareCard(ctx, width, height, data, Math.min(1, ((i / ENCODE_FPS) * 1000) / ANIMATION_MS));
            const frame = new VideoFrame(canvas, { timestamp: Math.round(i * frameMicros), duration: Math.round(frameMicros) });
            encoder.encode(frame, { keyFrame: i % ENCODE_FPS === 0 });
            frame.close();
            // Let the encoder drain and the progress label repaint.
            if (encoder.encodeQueueSize > 6 || i % 12 === 0) {
                setRenderProgress(i / totalFrames);
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        }
        if (failed) return null;
        await encoder.flush();
        encoder.close();
        muxer.finalize();
        return new Blob([muxer.target.buffer], { type: "video/mp4" });
    };

    const recordVideo = () =>
        new Promise<Blob | null>((resolve) => {
            const canvas = canvasRef.current;
            if (!canvas || !videoType) return resolve(null);
            cancelAnimationFrame(frameRef.current);
            draw(0);
            const recorder = new MediaRecorder(canvas.captureStream(RECORD_FPS), { mimeType: videoType, videoBitsPerSecond: RECORD_BITRATE });
            const chunks: Blob[] = [];
            recorder.ondataavailable = (event) => event.data.size > 0 && chunks.push(event.data);
            recorder.onstop = () => resolve(new Blob(chunks, { type: videoType.split(";")[0] }));
            recorder.onerror = () => resolve(null);
            recorder.start();
            const start = performance.now();
            // A timer, not requestAnimationFrame, so recording keeps its pace
            // even if the browser stops painting the page.
            const timer = setInterval(() => {
                const elapsed = performance.now() - start;
                draw(Math.min(1, elapsed / ANIMATION_MS));
                setRenderProgress(Math.min(1, elapsed / (ANIMATION_MS + HOLD_MS)));
                if (elapsed >= ANIMATION_MS + HOLD_MS) {
                    clearInterval(timer);
                    recorder.stop();
                }
            }, 1000 / RECORD_FPS);
        });

    const build = async (): Promise<File | null> => {
        setNote("");
        if (mode === "image") {
            const blob = await imageBlob();
            return blob ? new File([blob], `${slug}.png`, { type: "image/png" }) : null;
        }
        setRecording(true);
        setRenderProgress(0);
        let blob: Blob | null = null;
        try {
            blob = await encodeVideo();
        } catch {
            blob = null;
        }
        if (!blob) blob = await recordVideo();
        setRecording(false);
        if (!blob) return null;
        const extension = blob.type.includes("mp4") ? "mp4" : "webm";
        return new File([blob], `${slug}.${extension}`, { type: blob.type });
    };

    const download = async () => {
        const file = await build();
        if (!file) return setNote("Could not create the file in this browser.");
        saveBlob(file, file.name);
        setNote(file.name.endsWith(".webm") ? "Saved as WebM. Instagram needs MP4: record from Safari or a recent Chrome for that." : `Saved ${file.name}`);
    };

    const share = async () => {
        const file = await build();
        if (!file) return setNote("Could not create the file in this browser.");
        try {
            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ files: [file], title: `${card.data.headerLabel} with Alture & Co.` });
                return;
            }
        } catch {
            // dismissed or refused: fall through to a plain download
        }
        saveBlob(file, file.name);
        setNote("This device cannot share files directly, so the file was saved instead.");
    };

    const videoUnavailable = mode === "video" && !videoType && !canEncode;

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label="Share your results">
            <button type="button" aria-label="Close share" onClick={() => !recording && onClose()} className="absolute inset-0 bg-black/85 cursor-default" />

            <div className="relative w-full sm:max-w-[860px] max-h-[100dvh] overflow-y-auto bg-black border border-white/15 sm:rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/15">
                    <p className="text-lg font-semibold tracking-tight text-white">Share your results</p>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={recording}
                        aria-label="Close"
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-[#9a9aa5] hover:text-white hover:bg-white/10 transition-colors text-xl leading-none disabled:opacity-30"
                    >
                        ×
                    </button>
                </div>

                <div className="grid md:grid-cols-[1fr_300px]">
                    <div className="flex items-center justify-center bg-[#0c0c0c] p-5 md:p-8 min-h-[320px]">
                        <canvas
                            ref={canvasRef}
                            width={width}
                            height={height}
                            className="max-h-[56vh] md:max-h-[68vh] w-auto max-w-full border border-white/15"
                            style={{ aspectRatio: `${width} / ${height}` }}
                        />
                    </div>

                    <div className="border-t md:border-t-0 md:border-l border-white/15 p-5 flex flex-col gap-5">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">Period</p>
                            <div className="flex gap-1 rounded-sm border border-white/25 p-1">
                                {PERIODS.map((item) => (
                                    <button key={item.id} type="button" disabled={recording} aria-pressed={period === item.id} onClick={() => setPeriod(item.id)} className={optionClass(period === item.id)}>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center justify-between gap-2 mt-2 h-9">
                                {period === "month" ? (
                                    <span className="text-sm text-white">{monthLabel}</span>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => step(-1)}
                                            disabled={recording || stepIndex <= 0}
                                            aria-label={`Previous ${period}`}
                                            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/25 text-white hover:bg-white/10 transition-colors disabled:opacity-25 disabled:hover:bg-transparent"
                                        >
                                            ←
                                        </button>
                                        <span className="text-sm text-white tabular-nums text-center">{card.data.headerLabel}</span>
                                        <button
                                            type="button"
                                            onClick={() => step(1)}
                                            disabled={recording || stepIndex >= stepCount - 1}
                                            aria-label={`Next ${period}`}
                                            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/25 text-white hover:bg-white/10 transition-colors disabled:opacity-25 disabled:hover:bg-transparent"
                                        >
                                            →
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">Format</p>
                            <div className="flex gap-1 rounded-sm border border-white/25 p-1">
                                {(Object.keys(SHARE_FORMATS) as ShareFormat[]).map((key) => (
                                    <button key={key} type="button" disabled={recording} aria-pressed={format === key} onClick={() => setFormat(key)} className={optionClass(format === key)}>
                                        {SHARE_FORMATS[key].label}
                                        <span className={`block text-[10px] font-normal ${format === key ? "text-black/60" : "text-[#55555e]"}`}>{SHARE_FORMATS[key].hint}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">Type</p>
                            <div className="flex gap-1 rounded-sm border border-white/25 p-1">
                                <button type="button" disabled={recording} aria-pressed={mode === "image"} onClick={() => setMode("image")} className={optionClass(mode === "image")}>
                                    Image
                                </button>
                                <button type="button" disabled={recording} aria-pressed={mode === "video"} onClick={() => setMode("video")} className={optionClass(mode === "video")}>
                                    Video
                                </button>
                            </div>
                            {mode === "video" && (
                                <button type="button" disabled={recording} onClick={play} className="mt-2 text-xs text-[#9a9aa5] hover:text-white transition-colors disabled:opacity-40">
                                    Replay preview
                                </button>
                            )}
                        </div>

                        <div>
                            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-2">Theme</p>
                            <div className="flex gap-1 rounded-sm border border-white/25 p-1">
                                {(["dark", "light"] as ShareTheme[]).map((key) => (
                                    <button key={key} type="button" disabled={recording} aria-pressed={theme === key} onClick={() => setTheme(key)} className={`${optionClass(theme === key)} flex items-center justify-center gap-2`}>
                                        <span className={`h-3 w-3 rounded-full border ${key === "dark" ? "bg-[#050506] border-[#55555e]" : "bg-[#F7F4FA] border-[#c9c2d2]"}`} />
                                        {key === "dark" ? "Dark" : "Light"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <label className="flex items-center justify-between gap-4 cursor-pointer">
                            <span>
                                <span className="block text-sm font-medium text-white">Show P&amp;L amount</span>
                                <span className="block text-xs text-[#7d7d87]">Off leads with your win rate instead.</span>
                            </span>
                            <input type="checkbox" checked={showAmount} disabled={recording} onChange={(event) => setShowAmount(event.target.checked)} className="h-5 w-5 accent-[#FFFFFF]" />
                        </label>

                        <div className="mt-auto flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={download}
                                disabled={recording || !cardData || videoUnavailable}
                                className="h-11 rounded-sm bg-white text-black text-sm font-semibold hover:bg-[#e4e4e8] transition-colors disabled:opacity-40 disabled:hover:bg-white"
                            >
                                {recording ? `Rendering ${Math.round(renderProgress * 100)}%` : mode === "image" ? "Download image" : "Download video"}
                            </button>
                            <button
                                type="button"
                                onClick={share}
                                disabled={recording || !cardData || videoUnavailable}
                                className="h-11 rounded-sm border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-40"
                            >
                                Share…
                            </button>
                            <p className="text-xs text-[#7d7d87] min-h-[32px]" aria-live="polite">
                                {videoUnavailable ? "This browser cannot record video. Use the image, or try Chrome or Safari." : note || (mode === "video" ? "Full HD, 60 frames a second. Rendering takes a few seconds." : "2160 pixels wide, lossless PNG.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ShareMonth;
