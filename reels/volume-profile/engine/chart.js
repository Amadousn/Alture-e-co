// The trading chart. One function draws it; a plain "state" object says which
// layers are showing and how far each animation has run. Scenes never draw the
// chart themselves: they only fill in the state for the moment t.
//
//   top          y of the chart's top edge (236 = full screen, 620 = under a caption)
//   plotRight    right edge of the candles (930 = full width, 640 = room for the profile)
//   volume       opacity of the volume-by-time bars; volumeLit / volumeSweep highlight them
//   sweep        null, or 0..1: a playhead crossing the candles while the profile builds
//   unseen       how far the candles the playhead has not reached yet are dimmed (0..1)
//   profile      opacity of the Volume Profile
//   poc, pocTag  Point of Control line (0..1 drawn) and its label
//   va, vaTags, vaCounter   Value Area growing out from the POC, its labels, its % counter
//   levels       opacity of the POC and Value Area lines once drawn
//   high, low    highlight of the high volume band and the low volume band
(function () {
  const REEL = window.REEL;
  const T = REEL.theme;
  const M = REEL.market;
  const { clamp, lerp, text, measure, ink, blush } = REEL;

  const L = { left: 48, right: 930, axis: 940, bottom: 1392, volumeBase: 1490, volumeHeight: 78, timeY: 1528, profileWidth: 270 };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const price = (p) => Math.round(p).toLocaleString("en-US");
  const mono = { family: T.font.mono, size: 24 };

  const n = M.candles.length;
  const maxVolume = Math.max(...M.candles.map((c) => c.v));
  const pad = (M.hi - M.lo) * 0.035;
  const first = new Date(M.candles[0].t);
  const last = new Date(M.candles[n - 1].t);
  const period =
    first.getUTCMonth() === last.getUTCMonth()
      ? `${first.getUTCDate()} to ${last.getUTCDate()} ${MONTHS[last.getUTCMonth()]} ${last.getUTCFullYear()}`
      : `${first.getUTCDate()} ${MONTHS[first.getUTCMonth()]} to ${last.getUTCDate()} ${MONTHS[last.getUTCMonth()]} ${last.getUTCFullYear()}`;
  const inBand = (band) => (band ? new Set(band.hours) : new Set());
  const highHours = inBand(M.highVolume);
  const lowHours = inBand(M.lowVolume);

  const DEFAULTS = {
    top: 620,
    plotRight: L.right,
    alpha: 1,
    volume: 0.34,
    volumeLit: 0,
    volumeSweep: 0,
    sweep: null,
    sweepLine: 0,
    unseen: 1,
    profile: 0,
    poc: 0,
    pocTag: 0,
    va: 0,
    vaTags: 0,
    vaCounter: 0,
    levels: 1,
    high: 0,
    low: 0,
  };

  // A solid or outlined badge, with an optional note beside it on a black backing.
  function tag(ctx, label, note, x, yMid, solid, alpha) {
    if (alpha <= 0.002) return;
    const o = { ...mono, weight: 500, tracking: 1 };
    const w = measure(ctx, label, o) + 26;
    const h = 40;
    ctx.save();
    ctx.globalAlpha *= alpha;
    if (note) {
      const noteWidth = measure(ctx, note, mono) + 28;
      ctx.fillStyle = "rgba(0,0,0,0.86)";
      ctx.fillRect(x + w, yMid - h / 2, noteWidth, h);
      text(ctx, note, x + w + 14, yMid + 1, { ...mono, baseline: "middle", color: ink(0.92) });
    }
    ctx.fillStyle = solid || "#000";
    ctx.fillRect(x, yMid - h / 2, w, h);
    if (!solid) {
      ctx.strokeStyle = ink(0.85);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 0.75, yMid - h / 2 + 0.75, w - 1.5, h - 1.5);
    }
    text(ctx, label, x + 13, yMid + 1, { ...o, baseline: "middle", color: solid ? "#000" : T.color.ink });
    ctx.restore();
  }

  function axisBox(ctx, value, yMid, solid, alpha) {
    if (alpha <= 0.002) return;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.fillStyle = solid || "#000";
    ctx.fillRect(L.axis, yMid - 18, 132, 36);
    if (!solid) {
      ctx.strokeStyle = ink(0.7);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(L.axis + 0.75, yMid - 17.25, 130.5, 34.5);
    }
    text(ctx, price(value), L.axis + 66, yMid + 1, { ...mono, weight: 500, align: "center", baseline: "middle", color: solid ? "#000" : T.color.ink });
    ctx.restore();
  }

  function draw(ctx, state) {
    const S = { ...DEFAULTS, ...state };
    const yTop = S.top + 76;
    const yBot = L.bottom;
    const y = (p) => yBot - ((p - (M.lo - pad)) / (M.hi - M.lo + 2 * pad)) * (yBot - yTop);
    const pitch = (S.plotRight - L.left) / n;
    const x = (i) => L.left + (i + 0.5) * pitch;
    const focus = Math.max(S.high, S.low);
    const played = S.sweep === null ? n : S.sweep * n;

    ctx.save();
    ctx.globalAlpha *= S.alpha;
    const whole = ctx.globalAlpha;

    // Header: what the chart is, and where the data comes from.
    let hx = L.left;
    hx += text(ctx, M.data.symbol, hx, S.top + 34, { size: 30, weight: 500 }) + 14;
    hx += text(ctx, M.data.market, hx, S.top + 34, { size: 30, weight: 400, color: ink(0.5) }) + 22;
    text(ctx, "1h", hx, S.top + 34, { ...mono, size: 26, color: ink(0.5) });
    text(ctx, `${M.data.exchange} · ${period} · Historical`, 1032, S.top + 33, { size: 24, color: ink(0.5), align: "right" });
    ctx.fillStyle = ink(0.14);
    ctx.fillRect(L.left, S.top + 54, 1032 - L.left, 1);

    // Price grid and scale.
    for (let p = Math.ceil((M.lo - pad) / 1000) * 1000; p <= M.hi + pad; p += 1000) {
      ctx.fillStyle = ink(0.07);
      ctx.fillRect(L.left, Math.round(y(p)), L.right - L.left, 1);
      text(ctx, price(p), 1066, y(p) + 1, { ...mono, align: "right", baseline: "middle", color: ink(0.42) });
    }
    ctx.fillStyle = ink(0.14);
    ctx.fillRect(L.right + 4, yTop, 1, L.volumeBase - yTop);

    // Days.
    for (let i = 0; i < n; i += 24) {
      const d = new Date(M.candles[i].t);
      const dx = L.left + i * pitch;
      if (i > 0) {
        ctx.fillStyle = ink(0.07);
        ctx.fillRect(Math.round(dx), yTop, 1, L.volumeBase - yTop);
      }
      text(ctx, `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`, dx + 8, L.timeY, { ...mono, color: ink(0.42) });
    }

    // Value Area band, behind the candles.
    let vaTop = M.poc;
    let vaBottom = M.poc;
    let vaShare = 0;
    let vaStep = M.growth[0];
    if (S.va > 0) {
      const g = S.va * (M.growth.length - 1);
      const k = Math.floor(g);
      const f = g - k;
      vaStep = M.growth[k];
      const next = M.growth[Math.min(k + 1, M.growth.length - 1)];
      vaTop = M.lo + lerp(vaStep.top + 1, next.top + 1, f) * M.step;
      vaBottom = M.lo + lerp(vaStep.bottom, next.bottom, f) * M.step;
      vaShare = lerp(vaStep.share, next.share, f);
      ctx.fillStyle = ink(0.06 * clamp(S.va * 8) * lerp(0.4, 1, S.levels));
      ctx.fillRect(L.left, y(vaTop), L.right - L.left, y(vaBottom) - y(vaTop));
    }

    // High and low volume bands.
    const bands = [
      [M.highVolume, S.high, false],
      [M.lowVolume, S.low, true],
    ];
    for (const [band, amount, dashed] of bands) {
      if (!band || amount <= 0.002) continue;
      const top = y(band.high);
      const height = y(band.low) - top;
      ctx.fillStyle = ink(0.09 * amount);
      ctx.fillRect(L.left, top, L.right - L.left, height);
      ctx.save();
      ctx.strokeStyle = ink(0.7 * amount);
      ctx.lineWidth = 1.5;
      if (dashed) ctx.setLineDash([10, 8]);
      ctx.strokeRect(L.left + 0.75, top, L.right - L.left - 1.5, height);
      ctx.restore();
    }

    // Volume by time.
    const bodyWidth = Math.max(2, pitch * 0.62);
    for (let i = 0; i < n; i++) {
      const c = M.candles[i];
      const seen = lerp(lerp(1, 0.25, S.unseen), 1, clamp(played - i));
      const lit = S.volumeLit * clamp((S.volumeSweep * (n + 10) - i) / 10);
      const h = (c.v / maxVolume) * L.volumeHeight;
      ctx.fillStyle = ink(lerp(S.volume, 0.95, lit) * seen);
      ctx.fillRect(x(i) - bodyWidth / 2, L.volumeBase - h, bodyWidth, h);
    }

    // Candles.
    for (let i = 0; i < n; i++) {
      const c = M.candles[i];
      const weight = Math.max(S.high * (highHours.has(i) ? 1 : 0), S.low * (lowHours.has(i) ? 1 : 0));
      const alpha = lerp(lerp(1, 0.16, S.unseen), 1, clamp(played - i)) * (1 - 0.8 * (focus - weight));
      ctx.globalAlpha = whole * alpha;
      ctx.fillStyle = c.c >= c.o ? T.color.ink : T.color.down;
      ctx.fillRect(x(i) - 0.75, y(c.h), 1.5, y(c.l) - y(c.h));
      const bodyTop = y(Math.max(c.o, c.c));
      ctx.fillRect(x(i) - bodyWidth / 2, bodyTop, bodyWidth, Math.max(1.5, y(Math.min(c.o, c.c)) - bodyTop));
    }
    ctx.globalAlpha = whole;

    // Playhead.
    if (S.sweepLine > 0.002 && S.sweep !== null) {
      ctx.fillStyle = ink(0.55 * S.sweepLine);
      ctx.fillRect(L.left + S.sweep * (S.plotRight - L.left), yTop, 1.5, L.volumeBase - yTop);
    }

    // Volume Profile: one bar per price row, growing left from the price scale.
    if (S.profile > 0.002) {
      const at = clamp(played, 0, n);
      const k = Math.floor(at);
      const before = k > 0 ? M.cumulative[k - 1] : null;
      const after = M.cumulative[Math.min(k, n - 1)];
      const rowHeight = y(M.lo) - y(M.lo + M.step);
      for (let j = 0; j < M.rows; j++) {
        const volume = k >= n ? after[j] : lerp(before ? before[j] : 0, after[j], at - k);
        const width = (volume / M.max) * L.profileWidth;
        if (width < 0.3) continue;
        const inside = S.va > 0 && j <= vaStep.top && j >= vaStep.bottom;
        const inFocus = Math.max(S.high * (j >= M.highVolume.from && j <= M.highVolume.to ? 1 : 0), M.lowVolume ? S.low * (j >= M.lowVolume.from && j <= M.lowVolume.to ? 1 : 0) : 0);
        const base = inside ? lerp(0.58, 0.92, clamp(S.va * 6)) : lerp(0.58, 0.27, S.va);
        const alpha = S.profile * (1 - 0.72 * (focus - inFocus)) * lerp(base, 0.95, inFocus);
        const barTop = y(M.lo + (j + 1) * M.step) + 1.25;
        ctx.fillStyle = ink(alpha);
        ctx.fillRect(L.right - width, barTop, width, rowHeight - 2.5);
        if (j === M.pocRow && S.poc > 0) {
          ctx.fillStyle = blush(clamp(S.poc * 4) * S.profile * (1 - 0.6 * (focus - inFocus)));
          ctx.fillRect(L.right - width, barTop, width, rowHeight - 2.5);
        }
      }
    }

    // Value Area edges.
    if (S.vaTags > 0.002) {
      ctx.save();
      ctx.strokeStyle = ink(0.8 * S.vaTags * S.levels);
      ctx.lineWidth = 1.5;
      ctx.setLineDash([9, 8]);
      for (const level of [M.vah, M.val]) {
        ctx.beginPath();
        ctx.moveTo(L.left, y(level));
        ctx.lineTo(L.right, y(level));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Point of Control.
    if (S.poc > 0.002) {
      ctx.fillStyle = blush(S.levels);
      ctx.fillRect(L.right - S.poc * (L.right - L.left), y(M.poc) - 1, S.poc * (L.right - L.left), 2);
    }

    // Labels sit on top of everything.
    const labels = clamp((S.levels - 0.4) / 0.6);
    if (S.vaCounter > 0.002) {
      const shown = Math.min(Math.round(M.vaTarget * 100), Math.round(vaShare * 100));
      text(ctx, `${shown}% of the volume`, 884, y(vaTop) - 16, { ...mono, size: 26, align: "right", color: ink(0.92), alpha: S.vaCounter * labels });
    }
    tag(ctx, "VAH", `Value Area High  ${price(M.vah)}`, L.left, y(M.vah), null, S.vaTags * labels);
    tag(ctx, "VAL", `Value Area Low  ${price(M.val)}`, L.left, y(M.val), null, S.vaTags * labels);
    tag(ctx, "POC", price(M.poc), L.left, y(M.poc), T.color.blush, S.pocTag * labels);
    axisBox(ctx, M.vah, y(M.vah), null, S.vaTags * labels);
    axisBox(ctx, M.val, y(M.val), null, S.vaTags * labels);
    axisBox(ctx, M.poc, y(M.poc), T.color.blush, S.pocTag * labels);

    const spent = (minutes) => (minutes >= 90 ? `about ${Math.round(minutes / 60)} hours here` : `${minutes} ${minutes === 1 ? "minute" : "minutes"} here`);
    const stat = (band) => `${Math.max(1, Math.round(band.share * 100))}% of the volume · ${spent(band.minutes)}`;
    tag(ctx, "HIGH VOLUME", stat(M.highVolume), L.left, y(M.highVolume.high) - 30, T.color.ink, clamp((S.high - 0.5) * 2));
    if (M.lowVolume) tag(ctx, "LOW VOLUME", stat(M.lowVolume), L.left, y(M.lowVolume.high) - 30, T.color.ink, clamp((S.low - 0.5) * 2));

    ctx.restore();
  }

  REEL.chart = { draw, layout: L, period };
})();
