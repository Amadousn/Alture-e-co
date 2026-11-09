"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// The indicator floating in the dark, turned toward the reader and following the pointer,
// the same way the AltureLock page shows its terminal. Phones get the image flat.
const TiltScreen = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(min-width: 1024px)").matches) return;
        let frame = 0;
        const target = { x: 0, y: 0 };
        const now = { turn: -18, tip: 4 };
        const move = (event: PointerEvent) => {
            target.x = event.clientX / window.innerWidth - 0.5;
            target.y = event.clientY / window.innerHeight - 0.5;
        };
        const tick = () => {
            now.turn += (-18 + target.x * 9 - now.turn) * 0.06;
            now.tip += (4 - target.y * 6 - now.tip) * 0.06;
            node.style.setProperty("--turn", `${now.turn}deg`);
            node.style.setProperty("--tip", `${now.tip}deg`);
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
            <div ref={ref} className="al-screen al-screen--soft hidden lg:block">
                <div className="al-screen__body">
                    <Image src={src} alt={alt} width={width} height={height} priority sizes="(min-width: 1024px) 760px, 100vw" className="block h-auto w-full" />
                </div>
            </div>
            <div className="overflow-hidden rounded-sm border border-white/15 lg:hidden">
                <Image src={src} alt={alt} width={width} height={height} priority sizes="100vw" className="block h-auto w-full" />
            </div>
        </>
    );
};

export default TiltScreen;
