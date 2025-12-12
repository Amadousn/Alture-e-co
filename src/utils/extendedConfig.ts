export const extendedConfig = {
  boxShadow: {
    'property': '0 0px 30px #1817171a',
    'deatail_shadow': '0px 20px 80px 0px #68758D26',
    "darkmd": "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
  },
  keyframes: {
    scroll: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-50%)' },
    }
  },
  animation: {
    scroll: 'scroll 40s linear infinite',
  },
  transitionDuration: {
    '150': '150ms',
  },
  spacing: {
    '6.25': '6.25rem',
    '70%': '70%',
    '40%': '40%',
    '30%': '30%',
    '60%': '60%',
    8.5: '8.5rem',
    50: '50rem',
    25: '25rem',
    29: '28rem',
    120: '120rem',
    45: '45rem',
    94: '22.5rem',
    3.75: '3.75rem',
    37.5: '37.5rem',
    31.25: '31.25rem',
    43.75: '43.75rem',
  },
  maxWidth: {
    'screen-xl': '75rem',
    'screen-2xl': '83.75rem'
  },
  height: {
    150: '750px',
    6.25: '6.25rem',
  },
  lineHeight: {
    'extra-loose': '2.5',
    '2.5': '2.5rem',
  },
  inset: {
    '5%': '5%',
    '35%': '35%'
  },
  zIndex: {
    '1': '1',
    '2': '2',
    '999': '999'
  },
  colors: {
    // Primary - Gold for CTAs and accents
    primary: "#D4AF37",        // Classic gold
    primary_hover: "#F4D03F",  // Lighter gold for hover

    // Secondary - Darker gold for variety
    secondary: "#B8860B",      // Dark goldenrod
    secondary_hover: "#DAA520", // Goldenrod

    // Backgrounds - Pure black
    background: "#000000",     // Pure black
    darkmode: "#000000",       // Pure black
    semidark: "#0A0A0A",      // Almost black (for cards)
    darklight: "#1A1A1A",     // Very dark gray (for subtle contrast)

    // Text colors
    midnight_text: "#FFFFFF",  // White
    foreground: "#FFFFFF",     // White
    gray: "#A0A0A0",          // Light gray for secondary text
    muted_foreground: "#808080", // Medium gray

    // Borders
    border: "#2A2A2A",        // Dark gray
    dark_border: "#333333",   // Slightly lighter dark gray

    // Legacy colors (keeping for compatibility)
    light: "#F8FAFC",
    section: "#0A0A0A",
    herobg: "#0A0A0A",
    cyan: "#D4AF37",          // Using gold instead
    lightgray: "#e5e7eb",
    darkgray: "#374151",
    skyBlue: "#D4AF37"        // Using gold instead
  },
  borderRadius: {
    'lg': '0.625rem',
  },
  screens: {
    '5xl': '2100px',
  },
}