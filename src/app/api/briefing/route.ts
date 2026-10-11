import { NextResponse } from "next/server";
import { readDesk } from "@/utils/news-desk";

// The AI Market Briefing. It reads the headlines the news desks have really
// retrieved and asks Claude to explain the most market-relevant ones. Every
// story must point back to headlines from that list: a story citing anything
// else is dropped before it reaches the page.
//
// It only runs when ANTHROPIC_API_KEY is set on the server. Without it the
// route says so; nothing is generated or imitated.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = process.env.ALTURELOCK_BRIEFING_MODEL || "claude-opus-5-5";
const REFRESH_MS = 20 * 60 * 1000;

type Story = { headline: string; whatHappened: string; whyItMatters: string; watchNext: string; scope: "Crypto" | "Macro"; lean: "Bullish" | "Bearish" | "Mixed" | "Unclear"; assets: string[]; sources: { title: string; url: string; source: string }[] };
let cache: { key: string; at: number; body: { stories: Story[]; generatedAt: number; model: string; headlinesRead: number } } | null = null;

const SYSTEM = `You write a short market briefing for crypto traders from a numbered list of real news headlines.
Rules:
- Use only what the headlines say. You have headlines, sources and times, not the articles. Never add facts, figures, quotes or prices that are not in a headline.
- Pick the 3 to 5 developments that matter most to someone trading Bitcoin, Ethereum and major altcoins. Include macro news (central banks, inflation, jobs, big stock-market moves) when it could affect crypto.
- Keep facts and interpretation apart: "whatHappened" restates the reported fact; "whyItMatters" and "watchNext" are your reading and must be worded as possibilities, never as certainties or as advice to buy or sell.
- "lean" is the likely direction of the implication for the named assets: Bullish, Bearish, Mixed, or Unclear. Use Unclear whenever a headline alone does not settle it.
- "sources" lists the numbers of the headlines the story is based on. Every story needs at least one.
Reply with JSON only, in this shape:
{"stories":[{"headline":"","whatHappened":"","whyItMatters":"","watchNext":"","scope":"Crypto|Macro","lean":"Bullish|Bearish|Mixed|Unclear","assets":["BTC"],"sources":[1,2]}]}
Each text field is one or two plain sentences.`;

export async function GET() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ configured: false }, { headers: { "Cache-Control": "no-store" } });

    const [crypto, macro] = await Promise.all([readDesk("crypto"), readDesk("macro")]);
    const headlines = [...crypto.items.slice(0, 18), ...macro.items.slice(0, 12)];
    if (headlines.length === 0) return NextResponse.json({ configured: true, error: "No headlines could be retrieved." }, { status: 503 });

    const key = headlines.slice(0, 8).map((item) => item.id).join("|");
    if (cache && (cache.key === key || Date.now() - cache.at < REFRESH_MS)) return NextResponse.json({ configured: true, ...cache.body }, { headers: { "Cache-Control": "no-store" } });

    const list = headlines.map((item, i) => `${i + 1}. [${item.source}, ${new Date(item.publishedAt).toISOString()}] ${item.title}`).join("\n");
    try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
            body: JSON.stringify({ model: MODEL, max_tokens: 2000, system: SYSTEM, messages: [{ role: "user", content: `Current time: ${new Date().toISOString()}\n\nHeadlines:\n${list}` }] }),
            cache: "no-store",
        });
        if (!res.ok) return NextResponse.json({ configured: true, error: res.status === 401 ? "The AI key was not accepted." : "The AI service did not answer." }, { status: 502 });
        const json = await res.json();
        const text: string = (json.content ?? []).map((part: { text?: string }) => part.text ?? "").join("");
        const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
        const clean = (value: unknown) => (typeof value === "string" ? value.trim().slice(0, 400) : "");
        const stories: Story[] = (Array.isArray(parsed.stories) ? parsed.stories : [])
            .map((story: Record<string, unknown>) => ({
                headline: clean(story.headline),
                whatHappened: clean(story.whatHappened),
                whyItMatters: clean(story.whyItMatters),
                watchNext: clean(story.watchNext),
                scope: story.scope === "Macro" ? "Macro" : "Crypto",
                lean: (["Bullish", "Bearish", "Mixed"] as const).find((value) => value === story.lean) ?? "Unclear",
                assets: (Array.isArray(story.assets) ? story.assets : []).filter((asset): asset is string => typeof asset === "string" && /^[A-Za-z0-9 &.]{1,12}$/.test(asset)).slice(0, 5),
                // Only headlines that were really in the list can be cited.
                sources: (Array.isArray(story.sources) ? story.sources : []).flatMap((n) => (Number.isInteger(n) && headlines[(n as number) - 1] ? [headlines[(n as number) - 1]] : [])).map((item) => ({ title: item.title, url: item.url, source: item.source })),
            }))
            .filter((story: Story) => story.headline && story.whatHappened && story.sources.length > 0)
            .slice(0, 5);
        if (stories.length === 0) return NextResponse.json({ configured: true, error: "The briefing came back empty." }, { status: 502 });
        const body = { stories, generatedAt: Date.now(), model: MODEL, headlinesRead: headlines.length };
        cache = { key, at: Date.now(), body };
        return NextResponse.json({ configured: true, ...body }, { headers: { "Cache-Control": "no-store" } });
    } catch {
        return NextResponse.json({ configured: true, error: "The briefing could not be produced." }, { status: 502 });
    }
}
