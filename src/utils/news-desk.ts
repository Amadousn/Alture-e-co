
// Crypto headlines from publishers' own public RSS feeds. Only what the feed
// carries is passed on: headline, author, time, the publisher's own labels and
// a link to the original. Nothing is summarised, rewritten or scored.

type Source = { name: string; url: string; official?: boolean };

// Two desks. "macro" leads with the central banks' own press feeds.
const DESKS: Record<"crypto" | "macro", Source[]> = {
    crypto: [
        { name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
        { name: "Cointelegraph", url: "https://cointelegraph.com/rss" },
        { name: "Decrypt", url: "https://decrypt.co/feed" },
        { name: "The Block", url: "https://www.theblock.co/rss.xml" },
    ],
    macro: [
        { name: "Federal Reserve", url: "https://www.federalreserve.gov/feeds/press_all.xml", official: true },
        { name: "European Central Bank", url: "https://www.ecb.europa.eu/rss/press.html", official: true },
        { name: "CNBC Economy", url: "https://www.cnbc.com/id/20910258/device/rss/rss.html" },
        { name: "CNBC Markets", url: "https://www.cnbc.com/id/15839069/device/rss/rss.html" },
    ],
};

// Subjects worth a tag on the macro desk. Matching is on the headline only.
const TOPICS: [string, RegExp][] = [
    ["Central banks", /\b(fed|fomc|federal reserve|powell|ecb|lagarde|bank of (england|japan)|central bank|rate (cut|hike|decision)|interest rates?)\b/i],
    ["Inflation", /\b(inflation|cpi|ppi|consumer prices|producer prices|pce)\b/i],
    ["Jobs", /\b(jobs|payrolls?|nfp|unemployment|jobless|labor market|employment)\b/i],
    ["Tech stocks", /\b(nasdaq|nvidia|apple|microsoft|tesla|alphabet|google|amazon|meta|tech stocks?|chip(s|makers?)?|ai stocks?)\b/i],
    ["Markets", /\b(stocks?|s&p|dow|wall street|treasur(y|ies)|bonds?|yields?|dollar|oil|gold|earnings)\b/i],
    ["Crypto ETFs", /\b(etfs?)\b/i],
    ["Exchanges", /\b(binance|coinbase|bybit|okx|kraken|exchange)\b/i],
    ["Regulation", /\b(sec|cftc|regulat\w*|lawmakers?|congress|senate|bill|ban|lawsuit|court)\b/i],
];

const ASSETS: [string, RegExp][] = [
    ["BTC", /\b(bitcoin|btc)\b/i],
    ["ETH", /\b(ether|ethereum|eth)\b/i],
    ["SOL", /\b(solana|sol)\b/i],
    ["XRP", /\b(xrp|ripple)\b/i],
    ["HYPE", /\b(hyperliquid|hype)\b/i],
];

const decode = (text: string) =>
    text
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;|&#039;/g, "'")
        .trim();

const tag = (item: string, name: string) => {
    const match = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
    return match ? decode(match[1]) : "";
};

export type NewsItem = {
    id: string;
    title: string;
    url: string;
    source: string;
    author: string | null;
    publishedAt: number;
    // The publisher's own section labels.
    labels: string[];
    assets: string[];
    topics: string[];
    // True for a central bank's or agency's own announcement.
    official: boolean;
    // How the publisher itself files the piece. "Unlabelled" when the feed does not say.
    kind: "News" | "Opinion" | "Analysis" | "Unlabelled";
};

async function read(source: Source): Promise<NewsItem[]> {
    const res = await fetch(source.url, { headers: { "User-Agent": "Mozilla/5.0 (AltureLock news reader)" }, next: { revalidate: 300 } });
    if (!res.ok) throw new Error("feed");
    const xml = await res.text();
    return (xml.match(/<item[ >][\s\S]*?<\/item>/g) ?? []).flatMap((item) => {
        const title = tag(item, "title");
        const url = tag(item, "link").split(/[?&](utm_|mod=)/)[0].replace("europa.eu//", "europa.eu/");
        const publishedAt = Date.parse(tag(item, "pubDate"));
        if (!title || !/^https:\/\//.test(url) || !Number.isFinite(publishedAt)) return [];
        const labels = Array.from(new Set((item.match(/<category[^>]*>[\s\S]*?<\/category>/g) ?? []).map(decode).filter(Boolean))).slice(0, 4);
        const filed = `${labels.join(" ")} ${url}`;
        const kind: NewsItem["kind"] = /opinion|commentary|editorial/i.test(filed) ? "Opinion" : /analysis|research/i.test(filed) ? "Analysis" : /news/i.test(filed) ? "News" : "Unlabelled";
        const author = tag(item, "dc:creator").replace(/^Cointelegraph by /, "") || null;
        return [{ id: url, title, url, source: source.name, author, publishedAt, labels, assets: ASSETS.filter(([, pattern]) => pattern.test(title)).map(([asset]) => asset), topics: TOPICS.filter(([, pattern]) => pattern.test(title)).map(([topic]) => topic), official: Boolean(source.official), kind }];
    });
}

export async function readDesk(desk: "crypto" | "macro") {
    const list = DESKS[desk];
    const settled = await Promise.allSettled(list.map(read));
    const sources = list.map((source, i) => ({ name: source.name, ok: settled[i].status === "fulfilled" }));
    const cutoff = Date.now() - 4 * 24 * 60 * 60 * 1000;
    const items = settled
        .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
        .filter((item) => item.publishedAt >= cutoff && item.publishedAt <= Date.now() + 3600000)
        // The macro desk keeps only what bears on markets: official announcements and tagged subjects.
        .filter((item) => desk === "crypto" || item.official || item.topics.length > 0)
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, 80);
    return { items, sources };
}
