// The Volume Profile of the ALTURE & CO All-in-One indicator, reproduced from
// its Pine source with its default settings: 70 candles, 200 price rows, an
// 80% value area, and the same rules for high and low volume nodes.

export type ProfileCandle = { t: number; o: number; h: number; l: number; c: number; v: number };
export type Profile = {
    hi: number;
    lo: number;
    step: number;
    // Volume per price row, lowest row first: all candles, and up candles only.
    rows: number[];
    up: number[];
    poc: number;
    vah: number;
    val: number;
    // High volume nodes: prices, strongest first.
    hvn: number[];
    // Low volume nodes: areas, not single prices.
    lvn: { from: number; to: number }[];
};

export const PROFILE_DEFAULTS = { rows: 200, valueArea: 0.8, nodeWindow: 5, hvnPct: 55, lvnPct: 45, hvnMax: 3 };

function spread(candles: ProfileCandle[], hi: number, lo: number, rows: number, upOnly: boolean): number[] {
    const step = (hi - lo) / rows;
    const vols = new Array<number>(rows).fill(0);
    for (const candle of candles) {
        const volume = upOnly && candle.c < candle.o ? 0 : candle.v;
        const range = candle.h - candle.l;
        if (range === 0) {
            vols[Math.min(rows - 1, Math.floor((candle.h - lo) / step))] += volume;
            continue;
        }
        const first = Math.max(0, Math.floor((candle.l - lo) / step));
        const last = Math.min(rows - 1, Math.floor((candle.h - lo) / step));
        for (let j = first; j <= last; j++) {
            const overlap = Math.min(candle.h, lo + (j + 1) * step) - Math.max(candle.l, lo + j * step);
            if (overlap > 0) vols[j] += (volume * overlap) / range;
        }
    }
    return vols;
}

export function volumeProfile(candles: ProfileCandle[], options = PROFILE_DEFAULTS): Profile {
    const { rows, valueArea, nodeWindow, hvnPct, lvnPct, hvnMax } = options;
    const hi = Math.max(...candles.map((candle) => candle.h));
    const lo = Math.min(...candles.map((candle) => candle.l));
    const step = (hi - lo) / rows;
    const vols = spread(candles, hi, lo, rows, false);
    const up = spread(candles, hi, lo, rows, true);

    // Point of control, then the value area grown outward from it, taking the larger neighbour each time.
    const total = vols.reduce((sum, value) => sum + value, 0);
    const peak = Math.max(0, vols.indexOf(Math.max(...vols)));
    let top = peak;
    let bottom = peak;
    let held = vols[peak];
    while (held < total * valueArea && (top < rows - 1 || bottom > 0)) {
        const above = top < rows - 1 ? vols[top + 1] : -1;
        const below = bottom > 0 ? vols[bottom - 1] : -1;
        if (above >= below) held += vols[++top];
        else held += vols[--bottom];
    }
    const poc = lo + (peak + 0.5) * step;

    // Nodes are found on a smoothed copy of the profile, with a window that scales with the number of rows.
    const smooth = Math.max(1, Math.round(rows / 60));
    const window = Math.max(nodeWindow, Math.round(rows / 20));
    const soft = vols.map((_, i) => {
        let sum = 0;
        let count = 0;
        for (let k = Math.max(0, i - smooth); k <= Math.min(rows - 1, i + smooth); k++) {
            sum += vols[k];
            count++;
        }
        return sum / count;
    });
    const biggest = Math.max(...soft);
    const found: { price: number; size: number }[] = [];
    const lvn: Profile["lvn"] = [];
    let previous = 0;
    let lvnTop = -1;
    for (let j = 0; j < rows; j++) {
        const size = soft[j];
        let localMax = size;
        let localMin = size;
        let leftMax = 0;
        let rightMax = 0;
        for (let k = Math.max(0, j - window); k <= Math.min(rows - 1, j + window); k++) {
            localMax = Math.max(localMax, soft[k]);
            localMin = Math.min(localMin, soft[k]);
            if (k < j) leftMax = Math.max(leftMax, soft[k]);
            if (k > j) rightMax = Math.max(rightMax, soft[k]);
        }
        const mid = lo + (j + 0.5) * step;
        const isHvn = biggest > 0 && size >= localMax && size >= (hvnPct / 100) * biggest;
        const isLvn = biggest > 0 && size <= localMin && size <= (lvnPct / 100) * biggest && j > window && j < rows - 1 - window && leftMax > size && rightMax > size;
        // The POC already marks the biggest node, so a peak right next to it is not listed again.
        const nearPoc = Math.abs(mid - poc) <= window * step;
        const node = isHvn && !nearPoc ? 1 : isLvn ? 2 : 0;
        if (node === 1 && node !== previous) found.push({ price: mid, size });
        if (node === 2 && j > lvnTop) {
            // An LVN is an area: the floor of the low-volume valley around its lowest row.
            let a = Math.max(0, j - 1);
            let b = Math.min(rows - 1, j + 1);
            while (a > 0 && j - a < window && soft[a - 1] <= size * 1.3) a--;
            while (b < rows - 1 && b - j < window && soft[b + 1] <= size * 1.3) b++;
            lvnTop = b;
            lvn.push({ from: lo + a * step, to: lo + (b + 1) * step });
        }
        previous = node;
    }
    const hvn = found.sort((a, b) => b.size - a.size).slice(0, hvnMax).map((node) => node.price);

    return { hi, lo, step, rows: vols, up, poc, vah: lo + (top + 1) * step, val: lo + bottom * step, hvn, lvn };
}
