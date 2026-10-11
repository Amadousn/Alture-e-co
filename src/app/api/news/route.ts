import { NextResponse } from "next/server";
import { readDesk } from "@/utils/news-desk";

export const revalidate = 300;

export async function GET(request: Request) {
    const desk = new URL(request.url).searchParams.get("desk") === "macro" ? "macro" : "crypto";
    const { items, sources } = await readDesk(desk);
    if (items.length === 0) return NextResponse.json({ unavailable: true, sources }, { status: 503 });
    return NextResponse.json({ desk, items, sources, fetchedAt: Date.now() }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
