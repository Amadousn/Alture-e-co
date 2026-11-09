"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// The terminal itself, shown the way the visitor would see it on their own
// device. Wide screens get the desktop capture, floating and turned toward
// the reader; phones get the chart alone, readable at their size.
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
                    <Image src="/images/alturelock/cockpit.jpg" alt="" width={2400} height={1500} priority className="block h-auto w-full" />
                </div>
            </div>

            {/* On a phone, only the chart: the symbol, its price and the trade on the candles. */}
            <figure className="lg:hidden mx-auto w-full max-w-[560px]">
                <Image src="/images/alturelock/cockpit-chart.jpg" alt="The AltureLock terminal chart: Bitcoin on Alture candles, with the entry, stop loss and take profit of the trade in progress" width={1200} height={1066} sizes="(max-width: 600px) 100vw, 560px" className="block h-auto w-full rounded-xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.9)]" />
                <figcaption className="mt-3 text-center text-[11px] text-white/40">{caption}</figcaption>
            </figure>
        </>
    );
};

export default ProductScreen;
