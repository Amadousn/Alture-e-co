// Everything that sets the look of the film lives here: size, colours, fonts,
// the Instagram safe zone and the Volume Profile settings. Change a value once
// and every scene follows.
(function () {
  const REEL = (window.REEL = window.REEL || {});

  REEL.theme = {
    W: 1080,
    H: 1920,
    FPS: 30,

    color: {
      bg: "#000000",
      ink: "#F4F1EC", // ivory white: text, up candles, value area
      blush: "#F2C1CB", // the one accent: the "&", the Point of Control
      down: "#63615E", // down candles
    },

    font: { sans: "Geist", mono: "Geist Mono", logo: "Outfit" },

    // Parts of a Reel that Instagram covers with its own interface.
    safe: { top: 230, bottom: 380, right: 150, rightFrom: 1010 },

    profile: {
      rows: 60, // price rows in the profile
      valueArea: 0.7, // share of volume inside the value area
      band: 5, // rows in the high and low volume bands that scene 5 compares
    },
  };

  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rgba = (h, a) => `rgba(${hex(h).join(",")},${a})`;
  REEL.rgba = rgba;
  REEL.ink = (a = 1) => rgba(REEL.theme.color.ink, a);
  REEL.blush = (a = 1) => rgba(REEL.theme.color.blush, a);
})();
