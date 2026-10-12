// The opening set: a trading office at dusk, a glass wall onto the Dubai
// skyline, a desk and one tall display showing the chart. It is an illustration
// drawn in code, not footage. The camera is a zoom toward the display: when the
// push-in ends, the display fills the frame exactly, so the cut to the
// full-screen chart is invisible.
//
// To use real footage instead, replace scenes 01 and 02 in an editor: the chart
// scenes start on a full-screen chart and need nothing from this file.
(function () {
  const REEL = window.REEL;
  const T = REEL.theme;
  const { clamp, lerp, ease, ink, blush, mulberry } = REEL;

  const TIMING = { wide: 4, push: 3.5 }; // seconds: scene 01, scene 02
  const DRIFT = 0.012; // slow creep of the camera during the wide shot (log zoom per second)

  // The display, in frame coordinates of the wide shot. 9:16, like the film.
  const SCREEN = { x: 410, y: 838, w: 260, h: (260 * 16) / 9 };
  const ZOOM_END = T.W / SCREEN.w;
  // The one point that stays still while everything grows toward the display.
  const FOCUS = { x: (SCREEN.x * ZOOM_END) / (ZOOM_END - 1), y: (SCREEN.y * ZOOM_END) / (ZOOM_END - 1) };

  const WALL = { top: 500, bottom: 1196 };
  const HORIZON = 1016;
  const MULLIONS = [60, 300, 540, 780, 1020];

  function zoomAt(seconds) {
    const total = TIMING.wide + TIMING.push;
    const push = seconds <= TIMING.wide ? 0 : ease.inOut(clamp((seconds - TIMING.wide) / TIMING.push));
    return Math.exp(DRIFT * seconds + (Math.log(ZOOM_END) - DRIFT * total) * push);
  }

  // ---------------------------------------------------------------- skyline
  // Drawn once at double size and reused: it is the far layer and never zooms much.
  let skyline = null;
  function buildSkyline() {
    const scale = 2;
    const c = document.createElement("canvas");
    c.width = T.W * scale;
    c.height = (WALL.bottom - WALL.top) * scale;
    const g = c.getContext("2d");
    g.scale(scale, scale);
    g.translate(0, -WALL.top);
    const rand = mulberry(20261012);

    // Dusk: near-black above, a low blush band at the horizon, the city floor below.
    const sky = g.createLinearGradient(0, WALL.top, 0, WALL.bottom);
    sky.addColorStop(0, "#06070A");
    sky.addColorStop(0.45, "#0D0E13");
    sky.addColorStop(0.66, "#1B1A20");
    sky.addColorStop(0.74, "#3A2F35");
    sky.addColorStop(0.76, "#14141A");
    sky.addColorStop(1, "#060608");
    g.fillStyle = sky;
    g.fillRect(0, WALL.top, T.W, WALL.bottom - WALL.top);
    const haze = g.createRadialGradient(540, HORIZON, 0, 540, HORIZON, 620);
    haze.addColorStop(0, blush(0.2));
    haze.addColorStop(1, blush(0));
    g.fillStyle = haze;
    g.fillRect(0, HORIZON - 260, T.W, 300);

    const lights = (x, top, w, bottom, density, bright) => {
      for (let yy = top + 6; yy < bottom - 4; yy += 7) {
        for (let xx = x + 3; xx < x + w - 3; xx += 5) {
          if (rand() > density) continue;
          g.fillStyle = rand() < 0.06 ? blush(bright) : ink(bright * (0.45 + rand() * 0.55));
          g.fillRect(xx, yy, 2, 3);
        }
      }
    };

    // Far rank of towers, hazed.
    for (let x = -20; x < T.W + 20; ) {
      const w = 26 + rand() * 40;
      const top = HORIZON - 60 - rand() * 150;
      g.fillStyle = "#17171D";
      g.fillRect(x, top, w, HORIZON + 30 - top);
      lights(x, top, w, HORIZON + 20, 0.1, 0.35);
      x += w + rand() * 14;
    }

    // Burj Khalifa: stepped tiers narrowing to a spire.
    const bx = 182;
    g.fillStyle = "#1E1E25";
    const tiers = [
      [34, HORIZON + 30, 0],
      [30, 930, -2],
      [25, 860, 2],
      [20, 795, -1],
      [15, 735, 1],
      [10, 680, 0],
      [6, 632, 0],
      [2.5, 590, 0],
      [1, 548, 0],
    ];
    for (let i = 0; i < tiers.length - 1; i++) {
      const [half, base, shift] = tiers[i];
      const top = tiers[i + 1][1];
      g.beginPath();
      g.moveTo(bx + shift - half, base);
      g.lineTo(bx + shift - half * 0.86, top);
      g.lineTo(bx + shift + half * 0.86, top);
      g.lineTo(bx + shift + half, base);
      g.fill();
    }
    g.fillStyle = ink(0.16);
    g.fillRect(bx - 0.5, 600, 1, HORIZON - 600);
    lights(bx - 22, 800, 44, HORIZON, 0.16, 0.5);
    lights(bx - 10, 650, 20, 800, 0.14, 0.5);

    // Near rank, darker and taller.
    for (let x = -30; x < T.W + 30; ) {
      const w = 34 + rand() * 54;
      const tall = rand() < 0.22;
      const top = HORIZON - 20 - rand() * (tall ? 250 : 120);
      if (Math.abs(x + w / 2 - bx) > 70) {
        g.fillStyle = "#0B0B0F";
        g.fillRect(x, top, w, WALL.bottom - top);
        if (tall && rand() < 0.5) g.fillRect(x + w / 2 - 1, top - 26, 2, 26);
        lights(x, top, w, HORIZON + 40, 0.17, 0.75);
      }
      x += w + 4 + rand() * 22;
    }

    // Twin towers with slanted crowns, right of centre.
    for (const [x, top, lean] of [
      [822, 742, 1],
      [876, 786, -1],
    ]) {
      g.fillStyle = "#101015";
      g.beginPath();
      g.moveTo(x, WALL.bottom);
      g.lineTo(x, top + (lean > 0 ? 46 : 0));
      g.lineTo(x + 38, top + (lean > 0 ? 0 : 46));
      g.lineTo(x + 38, WALL.bottom);
      g.fill();
      lights(x, top + 50, 38, HORIZON + 40, 0.2, 0.7);
    }

    // The city floor: streets and low roofs as scattered points, denser near the horizon.
    for (let i = 0; i < 900; i++) {
      const depth = Math.pow(rand(), 1.8);
      const yy = HORIZON + 44 + depth * (WALL.bottom - HORIZON - 44);
      g.fillStyle = rand() < 0.08 ? blush(0.5) : ink(0.12 + rand() * 0.4);
      g.fillRect(rand() * T.W, yy, 1.5 + depth * 2, 1.5);
    }
    return c;
  }

  // ----------------------------------------------------------------- grain
  let grain = null;
  function buildGrain() {
    return [1, 2, 3].map((seed) => {
      const c = document.createElement("canvas");
      c.width = 270;
      c.height = 480;
      const g = c.getContext("2d");
      const image = g.createImageData(c.width, c.height);
      const rand = mulberry(seed * 7919);
      for (let i = 0; i < image.data.length; i += 4) {
        const v = rand() < 0.5 ? 255 : 0;
        image.data[i] = image.data[i + 1] = image.data[i + 2] = v;
        image.data[i + 3] = rand() * 255;
      }
      g.putImageData(image, 0, 0);
      return c;
    });
  }

  // ------------------------------------------------------------- the room
  function room(ctx, screenImage, lit) {
    // Ceiling, with two recessed light lines running toward the glass.
    const ceiling = ctx.createLinearGradient(0, 0, 0, WALL.top);
    ceiling.addColorStop(0, "#020202");
    ceiling.addColorStop(1, "#0B0B0C");
    ctx.fillStyle = ceiling;
    ctx.fillRect(-2000, -2000, 5080, 2000 + WALL.top);
    for (const xb of [392, 688]) {
      const xf = 540 + (xb - 540) * ((HORIZON + 300) / (HORIZON - WALL.top + 300)) * 1.55;
      const strip = ctx.createLinearGradient(0, 0, 0, WALL.top);
      strip.addColorStop(0, ink(0));
      strip.addColorStop(0.55, ink(0.2));
      strip.addColorStop(1, ink(0.55));
      ctx.fillStyle = strip;
      ctx.beginPath();
      ctx.moveTo(xb - 1.5, WALL.top - 6);
      ctx.lineTo(xb + 1.5, WALL.top - 6);
      ctx.lineTo(xf + 5, 0);
      ctx.lineTo(xf - 5, 0);
      ctx.fill();
    }

    // Glass wall frame.
    ctx.fillStyle = "#070708";
    ctx.fillRect(-2000, WALL.top - 8, 5080, 12);
    ctx.fillRect(-2000, WALL.bottom - 5, 5080, 12);
    for (const mx of MULLIONS) ctx.fillRect(mx - 4, WALL.top, 8, WALL.bottom - WALL.top);
    ctx.fillStyle = ink(0.07);
    for (const mx of MULLIONS) ctx.fillRect(mx + 3, WALL.top, 1, WALL.bottom - WALL.top);

    // Floor: dark, polished, catching the light of the glass.
    const floor = ctx.createLinearGradient(0, WALL.bottom, 0, T.H);
    floor.addColorStop(0, "#111113");
    floor.addColorStop(0.3, "#09090A");
    floor.addColorStop(1, "#020202");
    ctx.fillStyle = floor;
    ctx.fillRect(-2000, WALL.bottom + 7, 5080, 3000);
    const sheen = ctx.createLinearGradient(0, WALL.bottom, 0, WALL.bottom + 330);
    sheen.addColorStop(0, blush(0.07));
    sheen.addColorStop(1, blush(0));
    ctx.fillStyle = sheen;
    for (let i = 0; i < MULLIONS.length - 1; i++) {
      const a = MULLIONS[i] + 12;
      const b = MULLIONS[i + 1] - 12;
      ctx.beginPath();
      ctx.moveTo(a, WALL.bottom + 7);
      ctx.lineTo(b, WALL.bottom + 7);
      ctx.lineTo(540 + (b - 540) * 1.75, WALL.bottom + 330);
      ctx.lineTo(540 + (a - 540) * 1.75, WALL.bottom + 330);
      ctx.fill();
    }
    ctx.strokeStyle = ink(0.035);
    ctx.lineWidth = 1;
    for (let xb = -900; xb <= 1980; xb += 180) {
      ctx.beginPath();
      ctx.moveTo(xb, WALL.bottom + 7);
      ctx.lineTo(540 + (xb - 540) * 4.9, T.H + 400);
      ctx.stroke();
    }

    // Light spilling from the display.
    const spill = ctx.createRadialGradient(540, 1090, 40, 540, 1090, 430);
    spill.addColorStop(0, ink(0.085 * lit));
    spill.addColorStop(1, ink(0));
    ctx.fillStyle = spill;
    ctx.fillRect(60, 640, 960, 900);

    // Desk legs, then the top.
    ctx.fillStyle = "#050505";
    ctx.fillRect(150, 1376, 20, 268);
    ctx.fillRect(910, 1376, 20, 268);
    const shadow = ctx.createLinearGradient(0, 1630, 0, 1700);
    shadow.addColorStop(0, "rgba(0,0,0,0.55)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadow;
    ctx.fillRect(100, 1630, 880, 70);
    const top = ctx.createLinearGradient(0, 1304, 0, 1362);
    top.addColorStop(0, "#151517");
    top.addColorStop(1, "#1F1F22");
    ctx.fillStyle = top;
    ctx.beginPath();
    ctx.moveTo(148, 1304);
    ctx.lineTo(932, 1304);
    ctx.lineTo(972, 1362);
    ctx.lineTo(108, 1362);
    ctx.fill();
    const pool = ctx.createRadialGradient(540, 1318, 0, 540, 1318, 250);
    pool.addColorStop(0, ink(0.2 * lit));
    pool.addColorStop(1, ink(0));
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(148, 1304);
    ctx.lineTo(932, 1304);
    ctx.lineTo(972, 1362);
    ctx.lineTo(108, 1362);
    ctx.clip();
    ctx.fillStyle = pool;
    ctx.fillRect(250, 1290, 580, 90);
    ctx.restore();
    ctx.fillStyle = "#0A0A0B";
    ctx.fillRect(108, 1362, 864, 15);
    ctx.fillStyle = ink(0.3);
    ctx.fillRect(108, 1361.5, 864, 1);

    // Two side screens, dimmed, turned slightly toward the seat.
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(540 + side * 262, 1228);
      ctx.transform(0.95, side * -0.05, 0, 1, 0, 0);
      ctx.fillStyle = "#040405";
      ctx.fillRect(-109, -68, 218, 136);
      ctx.fillStyle = "#0C0D10";
      ctx.fillRect(-105, -64, 210, 128);
      const rand = mulberry(side > 0 ? 41 : 17);
      for (let row = 0; row < 11; row++) {
        ctx.fillStyle = ink(0.07 + rand() * 0.1);
        ctx.fillRect(-94, -54 + row * 10, 30 + rand() * 60, 3);
        ctx.fillStyle = ink(0.05 + rand() * 0.07);
        ctx.fillRect(10, -54 + row * 10, 20 + rand() * 60, 3);
      }
      ctx.fillStyle = "#070708";
      ctx.fillRect(-6, 68, 12, 14);
      ctx.fillRect(-36, 80, 72, 4);
      ctx.restore();
    }

    // Keyboard.
    ctx.fillStyle = "#232326";
    ctx.beginPath();
    ctx.moveTo(474, 1338);
    ctx.lineTo(606, 1338);
    ctx.lineTo(612, 1352);
    ctx.lineTo(468, 1352);
    ctx.fill();

    // The display: stand, thin bezel, and the chart itself.
    ctx.fillStyle = "#08080A";
    ctx.fillRect(529, SCREEN.y + SCREEN.h, 22, 22);
    ctx.beginPath();
    ctx.ellipse(540, 1326, 66, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ink(0.16);
    ctx.fillRect(SCREEN.x - 5.5, SCREEN.y - 5.5, SCREEN.w + 11, SCREEN.h + 11);
    ctx.fillStyle = "#030303";
    ctx.fillRect(SCREEN.x - 4.5, SCREEN.y - 4.5, SCREEN.w + 9, SCREEN.h + 9);
    ctx.fillStyle = "#000";
    ctx.fillRect(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(screenImage, SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h);
  }

  function chair(ctx) {
    ctx.fillStyle = "#030303";
    ctx.beginPath();
    ctx.roundRect(424, 1500, 232, 520, [56, 56, 0, 0]);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(476, 1446, 128, 70, 22);
    ctx.fill();
    ctx.strokeStyle = ink(0.13);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(476, 1446, 128, 70, 22);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(424, 1700);
    ctx.lineTo(424, 1556);
    ctx.arcTo(424, 1500, 480, 1500, 56);
    ctx.lineTo(600, 1500);
    ctx.arcTo(656, 1500, 656, 1556, 56);
    ctx.lineTo(656, 1700);
    ctx.stroke();
  }

  // seconds: time since the wide shot began. screenImage: what the display shows.
  function draw(ctx, seconds, screenImage) {
    skyline = skyline || buildSkyline();
    grain = grain || buildGrain();
    const zoom = zoomAt(seconds);
    const arrived = clamp((Math.log(zoom) / Math.log(ZOOM_END) - 0.72) / 0.28); // 0 until late in the push, 1 on arrival
    const base = ctx.getTransform();
    const layer = (depth) => {
      const z = Math.pow(zoom, depth);
      ctx.setTransform(base);
      ctx.translate(FOCUS.x, FOCUS.y);
      ctx.scale(z, z);
      ctx.translate(-FOCUS.x, -FOCUS.y);
    };

    ctx.save();
    ctx.fillStyle = "#020202";
    ctx.fillRect(0, 0, T.W, T.H);

    // Far: the city, seen through the glass. It grows more slowly than the room.
    ctx.save();
    layer(1);
    ctx.beginPath();
    ctx.rect(-2000, WALL.top, 5080, WALL.bottom - WALL.top);
    ctx.clip();
    layer(0.42);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(skyline, 0, WALL.top, T.W, WALL.bottom - WALL.top);
    // A faint reflection of the room in the glass.
    layer(1);
    const glass = ctx.createLinearGradient(0, WALL.top, 1080, WALL.bottom);
    glass.addColorStop(0, ink(0.035));
    glass.addColorStop(0.5, ink(0));
    glass.addColorStop(1, ink(0.02));
    ctx.fillStyle = glass;
    ctx.fillRect(-2000, WALL.top, 5080, WALL.bottom - WALL.top);
    ctx.restore();

    // Middle: the room and the display.
    layer(1);
    room(ctx, screenImage, 1);

    // Near: the chair, which leaves the frame first.
    layer(1.28);
    chair(ctx);
    ctx.setTransform(base);

    // Lens: darker corners and a little grain, both gone by the time the chart fills the frame.
    const lens = 1 - arrived;
    if (lens > 0.002) {
      const vignette = ctx.createRadialGradient(540, 1000, 420, 540, 1000, 1180);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, `rgba(0,0,0,${0.62 * lens})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, T.W, T.H);
      const frame = Math.floor(seconds * T.FPS);
      ctx.globalAlpha = 0.05 * lens;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(grain[frame % 3], -((frame * 37) % 60), -((frame * 53) % 60), T.W + 60, T.H + 60);
    }
    ctx.restore();
  }

  REEL.office = { draw, TIMING, SCREEN, zoomAt };
})();
