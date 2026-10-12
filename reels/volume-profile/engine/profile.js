// Turns the frozen 1-minute candles into everything the chart draws: hourly
// candles, the Volume Profile, the Point of Control, the Value Area and the two
// bands that scene 5 compares. Nothing here is typed in by hand; every level
// and every percentage on screen is computed from the candles.
//
// Method: the price range of the window is cut into equal rows. Each 1-minute
// candle's volume is spread evenly over the rows its high-low range covers.
// Candles do not record the price of each trade, so this is the usual
// approximation (the same one charting platforms use), not a tick-exact profile.
(function () {
  const REEL = window.REEL;
  const D = window.REEL_DATA;
  const { rows: ROWS, valueArea: VALUE_AREA, band: BAND } = REEL.theme.profile;

  const minutes = D.rows.map((r, i) => ({ t: D.start + i * D.stepMs, o: r[0], h: r[1], l: r[2], c: r[3], v: r[4] }));

  const candles = [];
  for (let i = 0; i < minutes.length; i += 60) {
    const part = minutes.slice(i, i + 60);
    candles.push({
      t: part[0].t,
      o: part[0].o,
      h: Math.max(...part.map((m) => m.h)),
      l: Math.min(...part.map((m) => m.l)),
      c: part[part.length - 1].c,
      v: part.reduce((sum, m) => sum + m.v, 0),
    });
  }

  const hi = Math.max(...candles.map((c) => c.h));
  const lo = Math.min(...candles.map((c) => c.l));
  const step = (hi - lo) / ROWS;
  const rowOf = (price) => Math.min(ROWS - 1, Math.max(0, Math.floor((price - lo) / step)));

  function spread(into, m) {
    const range = m.h - m.l;
    if (range === 0) {
      into[rowOf(m.h)] += m.v;
      return;
    }
    for (let j = rowOf(m.l); j <= rowOf(m.h); j++) {
      const overlap = Math.min(m.h, lo + (j + 1) * step) - Math.max(m.l, lo + j * step);
      if (overlap > 0) into[j] += (m.v * overlap) / range;
    }
  }

  // The profile as it stood after each hour, so it can be shown building up.
  const running = new Array(ROWS).fill(0);
  const cumulative = [];
  for (let i = 0; i < minutes.length; i++) {
    spread(running, minutes[i]);
    if (i % 60 === 59) cumulative.push(running.slice());
  }
  const vols = cumulative[cumulative.length - 1];
  const total = vols.reduce((sum, v) => sum + v, 0);
  const max = Math.max(...vols);
  const pocRow = vols.indexOf(max);

  // Value area: start at the Point of Control and keep adding whichever
  // neighbouring row holds more volume, until the chosen share is inside.
  let top = pocRow;
  let bottom = pocRow;
  let held = vols[pocRow];
  const growth = [{ top, bottom, share: held / total }];
  while (held < total * VALUE_AREA && (top < ROWS - 1 || bottom > 0)) {
    const above = top < ROWS - 1 ? vols[top + 1] : -1;
    const below = bottom > 0 ? vols[bottom - 1] : -1;
    if (above >= below) held += vols[++top];
    else held += vols[--bottom];
    growth.push({ top, bottom, share: held / total });
  }

  // Two bands of the same height: the busiest one, and the quietest one that
  // has a real peak of volume on each side of it (a gap, not just a thin edge).
  const bandSum = (from) => vols.slice(from, from + BAND).reduce((sum, v) => sum + v, 0);
  let hvFrom = 0;
  for (let j = 0; j + BAND <= ROWS; j++) if (bandSum(j) > bandSum(hvFrom)) hvFrom = j;
  let lvFrom = -1;
  for (let j = BAND; j + BAND <= ROWS - BAND; j++) {
    const below = Math.max(...vols.slice(0, j));
    const above = Math.max(...vols.slice(j + BAND));
    if (Math.min(below, above) < 0.4 * max) continue;
    if (lvFrom < 0 || bandSum(j) < bandSum(lvFrom)) lvFrom = j;
  }
  function band(from) {
    const low = lo + from * step;
    const high = lo + (from + BAND) * step;
    const touches = (c) => c.h > low && c.l < high;
    return {
      from,
      to: from + BAND - 1,
      low,
      high,
      share: bandSum(from) / total,
      hours: candles.map((c, i) => (touches(c) ? i : -1)).filter((i) => i >= 0),
      minutes: minutes.filter(touches).length,
    };
  }

  REEL.market = {
    data: D,
    minutes,
    candles,
    hi,
    lo,
    step,
    rows: ROWS,
    vols,
    total,
    max,
    cumulative,
    pocRow,
    poc: lo + (pocRow + 0.5) * step,
    vaTop: top,
    vaBottom: bottom,
    vah: lo + (top + 1) * step,
    val: lo + bottom * step,
    vaShare: held / total,
    vaTarget: VALUE_AREA,
    growth,
    highVolume: band(hvFrom),
    lowVolume: lvFrom < 0 ? null : band(lvFrom),
  };
})();
