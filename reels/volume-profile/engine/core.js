// Timing and drawing helpers shared by every scene, and the scene registry.
// A scene is { id, title, duration, draw(ctx, t) } where t is seconds since the
// scene began. draw() must depend on t alone, so any frame can be rendered on
// its own: that is what makes scrubbing and frame-exact export possible.
(function () {
  const REEL = window.REEL;
  const T = REEL.theme;

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const ease = {
    linear: (x) => x,
    in: (x) => x * x * x,
    out: (x) => 1 - Math.pow(1 - x, 3),
    inOut: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    soft: (x) => x * x * (3 - 2 * x),
  };
  // 0 before `from`, 1 after `to`, eased in between.
  const ramp = (t, from, to, fn = ease.inOut) => fn(clamp((t - from) / (to - from)));
  // 1 while something is on screen, with a fade at each end.
  const span = (t, inAt, outAt, fadeIn = 0.6, fadeOut = 0.45) =>
    Math.min(ramp(t, inAt, inAt + fadeIn, ease.out), 1 - ramp(t, outAt - fadeOut, outAt, ease.in));

  function text(ctx, str, x, y, o = {}) {
    const alpha = o.alpha ?? 1;
    if (alpha <= 0.002) return 0;
    ctx.save();
    ctx.font = `${o.weight ?? 400} ${o.size ?? 36}px "${o.family ?? T.font.sans}"`;
    ctx.letterSpacing = `${o.tracking ?? 0}px`;
    ctx.textAlign = o.align ?? "left";
    ctx.textBaseline = o.baseline ?? "alphabetic";
    ctx.globalAlpha *= alpha;
    ctx.fillStyle = o.color ?? T.color.ink;
    if (o.glow) {
      ctx.shadowColor = o.glow;
      ctx.shadowBlur = o.glowBlur ?? 28;
    }
    ctx.fillText(str, x, y);
    const width = ctx.measureText(str).width;
    ctx.restore();
    return width;
  }

  function measure(ctx, str, o = {}) {
    ctx.save();
    ctx.font = `${o.weight ?? 400} ${o.size ?? 36}px "${o.family ?? T.font.sans}"`;
    ctx.letterSpacing = `${o.tracking ?? 0}px`;
    const width = ctx.measureText(str).width;
    ctx.restore();
    return width;
  }

  function wrap(ctx, str, maxWidth, o) {
    const lines = [];
    let line = "";
    for (const word of str.split(" ")) {
      const next = line ? `${line} ${word}` : word;
      if (line && measure(ctx, next, o) > maxWidth) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  }

  // The headline and one sentence above the chart. Every chart scene uses it,
  // so the words sit in exactly the same place from step to step.
  function caption(ctx, copy, alpha) {
    if (alpha <= 0.002) return;
    const rise = (1 - alpha) * 16;
    text(ctx, copy.title, 46, 432 + rise, { size: 78, weight: 300, tracking: -1.5, alpha });
    const body = { size: 38, weight: 400, color: REEL.ink(0.62) };
    wrap(ctx, copy.body, 960, body).forEach((line, i) => text(ctx, line, 48, 506 + i * 54 + rise, { ...body, alpha }));
  }

  // The small wordmark that stays at the top of the chart scenes.
  function brand(ctx, alpha) {
    if (alpha <= 0.002) return;
    const o = { size: 38, weight: 200, family: T.font.logo, alpha };
    let x = 48;
    x += text(ctx, "Alture ", x, 284, o);
    x += text(ctx, "& ", x, 284, { ...o, color: T.color.blush, glow: REEL.blush(0.55), glowBlur: 18 });
    text(ctx, "Co.", x, 284, o);
    text(ctx, "Education", 1032, 282, { size: 26, weight: 400, color: REEL.ink(0.5), align: "right", tracking: 1, alpha });
  }

  function mulberry(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  REEL.scenes = [];
  REEL.scene = (def) => REEL.scenes.push(def);
  REEL.timeline = () => {
    let at = 0;
    return REEL.scenes.map((scene) => {
      const entry = { scene, start: at, end: at + scene.duration };
      at += scene.duration;
      return entry;
    });
  };
  REEL.duration = () => REEL.scenes.reduce((sum, scene) => sum + scene.duration, 0);
  REEL.drawAt = (ctx, time) => {
    const line = REEL.timeline();
    const entry = line.find((e) => time < e.end) ?? line[line.length - 1];
    ctx.save();
    ctx.fillStyle = T.color.bg;
    ctx.fillRect(0, 0, T.W, T.H);
    entry.scene.draw(ctx, clamp(time - entry.start, 0, entry.scene.duration));
    ctx.restore();
    return entry;
  };

  Object.assign(REEL, { clamp, lerp, ease, ramp, span, text, measure, wrap, caption, brand, mulberry });
})();
