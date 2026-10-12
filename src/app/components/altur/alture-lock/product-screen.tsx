"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// The terminal itself, shown the way the visitor would see it on their own
// device. Wide screens get the desktop capture, floating and turned toward
// the reader; phones get the same desktop capture on a monitor, scaled to the
// screen. The terminal is a desktop workspace for now, and is shown as one.
const ProductScreen = ({ caption, leaving = false }: { caption: string; leaving?: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    // As the visitor enters, the screen turns to face them and comes forward.
    const away = useRef(false);
    away.current = leaving;

    useEffect(() => {
        const node = ref.current;
        if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(min-width: 1024px)").matches) return;
        let frame = 0;
        const target = { x: 0, y: 0 };
        const now = { turn: -24, tip: 5, zoom: 1 };
        const move = (event: PointerEvent) => {
            target.x = event.clientX / window.innerWidth - 0.5;
            target.y = event.clientY / window.innerHeight - 0.5;
        };
        const tick = () => {
            const to = away.current ? { turn: 0, tip: 0, zoom: 1.08 } : { turn: -24 + target.x * 9, tip: 5 - target.y * 6, zoom: 1 };
            const pace = away.current ? 0.16 : 0.06;
            now.turn += (to.turn - now.turn) * pace;
            now.tip += (to.tip - now.tip) * pace;
            now.zoom += (to.zoom - now.zoom) * pace;
            node.style.setProperty("--turn", `${now.turn}deg`);
            node.style.setProperty("--tip", `${now.tip}deg`);
            node.style.setProperty("--zoom", String(now.zoom));
            frame = requestAnimationFrame(tick);
        };
        window.addEventListener("pointermove", move, { passive: true });
        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", move);
        };
    }, []);

    return (
        <>
            <div ref={ref} className="al-screen hidden lg:block" aria-hidden="true">
                <div className="al-screen__body">
                    <Image src="/images/alturelock/cockpit.jpg" alt="" width={1440} height={900} priority className="block h-auto w-full" />
                </div>
            </div>

            {/* On a phone the terminal is still shown as what it is today: a desktop workspace, on a screen. */}
            <figure className="lg:hidden mx-auto w-full max-w-[560px]">
                <div className="rounded-[10px] border border-white/20 bg-[#0b0b0d] p-[5px] shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(227,161,247,0.06)]">
                    <Image src="/images/alturelock/cockpit.jpg" alt="The AltureLock terminal on a desktop screen: the watchlist, the chart and the trade in progress" width={1440} height={900} sizes="(max-width: 600px) 100vw, 560px" className="block h-auto w-full rounded-[5px]" />
                </div>
                <div className="mx-auto h-[10px] w-[22%] bg-gradient-to-b from-white/15 to-white/5" aria-hidden="true" />
                <div className="mx-auto h-[3px] w-[38%] rounded-full bg-white/20" aria-hidden="true" />
                <figcaption className="mt-3 text-center text-[11px] text-white/40">{caption}</figcaption>
            </figure>
        </>
    );
};

export default ProductScreen;
