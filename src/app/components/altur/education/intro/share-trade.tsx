"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CARD_SIZE, drawTradeCard, TradeCardData } from "./trade-card";

function saveBlob(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// A card of one simulated trade, to save as an image or hand to the device's share sheet.
const ShareTrade = ({ card, onClose }: { card: Omit<TradeCardData, "fonts">; onClose: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fonts, setFonts] = useState<TradeCardData["fonts"] | null>(null);
    const [note, setNote] = useState("");
    // The finished image, made as soon as the card is drawn: a phone only opens its share sheet if it is called at once on the tap.
    const [image, setImage] = useState<{ file: File; url: string } | null>(null);

    // The site's fonts have build-generated names, so read them off the page
    // and make sure the weights the card uses are loaded before drawing.
    useEffect(() => {
        const body = getComputedStyle(document.body);
        const sans = body.fontFamily;
        const logo = body.getPropertyValue("--font-logo").trim() || sans;
        Promise.all([document.fonts.load(`400 20px ${sans}`), document.fonts.load(`500 20px ${sans}`), document.fonts.load(`600 20px ${sans}`), document.fonts.load(`200 20px ${logo}`)])
            .catch(() => undefined)
            .then(() => setFonts({ sans, logo }));
    }, []);

    const name = `alture-practice-${card.pair.replace("/", "").toLowerCase()}-${card.side.toLowerCase()}.png`;
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !fonts) return;
        drawTradeCard(ctx, CARD_SIZE.width, CARD_SIZE.height, { ...card, fonts });
        let url = "";
        canvas.toBlob((blob) => {
            if (!blob) return;
            url = URL.createObjectURL(blob);
            setImage({ file: new File([blob], name, { type: "image/png" }), url });
        }, "image/png");
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [card, fonts, name]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    const canShare = Boolean(image && typeof navigator !== "undefined" && navigator.canShare?.({ files: [image.file] }));
    const share = () => {
        if (!image) return setNote("The image is still being prepared. Try again in a moment.");
        if (!canShare) {
            saveBlob(image.file, name);
            return setNote("This device cannot share files directly, so the image was saved instead.");
        }
        // No awaiting before this call: the tap itself must open the share sheet.
        navigator.share({ files: [image.file], title: "My practice trade on Alture Education" }).catch((error: Error) => {
            if (error.name !== "AbortError") setNote("Sharing did not open. Press and hold the image to save it instead.");
        });
    };
    // On a phone a download link does not reach the photo library; the share sheet's "Save Image" does.
    const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const download = () => {
        if (!image) return setNote("The image is still being prepared. Try again in a moment.");
        if (touch && canShare) return share();
        saveBlob(image.file, name);
        setNote(`Saved ${name}`);
    };

    const action = "h-11 rounded-sm px-5 text-sm font-medium transition-colors";
    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Share your result">
            <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default bg-black/85" />
            <div className="relative max-h-[100dvh] w-full overflow-y-auto border border-white/15 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.8)] sm:max-w-[760px] sm:rounded-sm">
                <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-4">
                    <p className="text-lg font-semibold tracking-tight text-white">Share your result</p>
                    <button type="button" onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-sm text-xl leading-none text-[#9a9aa5] transition-colors hover:bg-white/10 hover:text-white">
                        ×
                    </button>
                </div>
                <div className="grid md:grid-cols-[1fr_260px]">
                    <div className="flex items-center justify-center bg-[#0c0c0c] p-5 md:p-7">
                        <canvas ref={canvasRef} width={CARD_SIZE.width} height={CARD_SIZE.height} className={image ? "hidden" : "max-h-[52vh] w-auto max-w-full border border-white/15 md:max-h-[66vh]"} style={{ aspectRatio: `${CARD_SIZE.width} / ${CARD_SIZE.height}` }} />
                        {/* A real image, so that pressing and holding it on a phone offers to save it. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {image && <img src={image.url} alt={`Practice trade: ${card.pair} ${card.side} ${card.leverage}x, simulated`} className="max-h-[52vh] w-auto max-w-full border border-white/15 md:max-h-[66vh]" />}
                    </div>
                    <div className="flex flex-col gap-3 border-t border-white/15 p-5 md:border-l md:border-t-0">
                        <p className="text-sm leading-relaxed text-white/60">An image of this practice trade, sized for a post. It says on its face that the trade was simulated.{touch ? " On a phone you can also press and hold the image to save it." : ""}</p>
                        <button type="button" onClick={share} disabled={!image} className={`${action} lit bg-white text-black hover:bg-[#e4e4e8]`}>
                            Share
                        </button>
                        <button type="button" onClick={download} disabled={!image} className={`${action} border border-white/30 text-white hover:border-white`}>
                            Save the image
                        </button>
                        <p className="min-h-[2.5rem] text-xs leading-relaxed text-white/45" role="status">
                            {note}
                        </p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ShareTrade;
