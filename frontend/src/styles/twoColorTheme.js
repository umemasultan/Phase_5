// Professional 2-Color Theme System
// Primary: Deep Purple (#210F37)
// Secondary: Pure White/Black (Monochrome)

export const twoColorTheme = {
  // Core Brand Colors (Only 2 Main Colors)
  brand: {
    primary: '#17153B',      // Deep Blue-Purple - Main brand color
    primaryLight: '#2E236C', // Light Blue-Purple - Hover states
    primaryDark: '#0D0B1F',  // Dark Blue-Purple - Active states
  },

  // Monochrome Scale (White to Black)
  mono: {
    white: '#ffffff',
    gray50: '#fafafa',
    gray100: '#f5f5f5',
    gray200: '#e5e5e5',
    gray300: '#d4d4d4',
    gray400: '#a3a3a3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',
    black: '#000000',
  },

  // Semantic Colors (Minimal, using purple tints)
  semantic: {
    success: '#17153B',      // Use primary for success
    warning: '#2E236C',      // Use primary light for warning
    danger: '#0D0B1F',       // Use primary dark for danger
    info: '#17153B',         // Use primary for info
  },

  // Dark Mode (Purple + Dark Grays)
  dark: {
    // Backgrounds
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 20%, #0D0B1F 40%, #17153B 60%, #1f1a4a 80%, #2E236C 100%)',
    surface: '#ffffff',
    surfaceElevated: '#fafafa',
    surfaceHover: '#f5f5f5',

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.85)',
    overlayLight: 'rgba(0, 0, 0, 0.6)',

    // Text
    text: {
      primary: '#ffffff',
      secondary: '#e5e5e5',
      tertiary: '#a3a3a3',
      disabled: '#737373',
      inverse: '#000000',
    },

    // Borders
    border: 'rgba(255, 255, 255, 0.1)',
    borderLight: 'rgba(255, 255, 255, 0.05)',
    borderStrong: 'rgba(255, 255, 255, 0.2)',

    // Dividers
    divider: 'rgba(255, 255, 255, 0.08)',
  },

  // Light Mode (Purple + Light Grays)
  light: {
    // Backgrounds
    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 20%, #f5f5f5 40%, #e5e5e5 60%, #d4d4d4 80%, #c4c4c4 100%)',
    surface: '#ffffff',
    surfaceElevated: '#fafafa',
    surfaceHover: '#f5f5f5',

    // Overlays
    overlay: 'rgba(255, 255, 255, 0.95)',
    overlayLight: 'rgba(255, 255, 255, 0.8)',

    // Text
    text: {
      primary: '#000000',
      secondary: '#404040',
      tertiary: '#737373',
      disabled: '#a3a3a3',
      inverse: '#ffffff',
    },

    // Borders
    border: 'rgba(0, 0, 0, 0.1)',
    borderLight: 'rgba(0, 0, 0, 0.05)',
    borderStrong: 'rgba(0, 0, 0, 0.2)',

    // Dividers
    divider: 'rgba(0, 0, 0, 0.08)',
  },

  // Gradients (Purple only)
  gradients: {
    primary: 'linear-gradient(135deg, #17153B 0%, #2E236C 100%)',
    primaryReverse: 'linear-gradient(135deg, #2E236C 0%, #17153B 100%)',
    primaryVertical: 'linear-gradient(180deg, #17153B 0%, #2E236C 100%)',
    primaryRadial: 'radial-gradient(circle, #2E236C 0%, #17153B 100%)',
    subtle: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
  },

  // Shadows (Monochrome + Purple tint)
  shadows: {
    // Standard shadows
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    base: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    md: '0 8px 16px 0 rgba(0, 0, 0, 0.12)',
    lg: '0 12px 24px 0 rgba(0, 0, 0, 0.15)',
    xl: '0 20px 40px 0 rgba(0, 0, 0, 0.2)',
    '2xl': '0 30px 60px 0 rgba(0, 0, 0, 0.25)',

    // Purple tinted shadows
    primary: '0 10px 40px -8px rgba(23, 21, 59, 0.4)',
    primaryLg: '0 20px 60px -12px rgba(23, 21, 59, 0.5)',
    primaryXl: '0 30px 80px -16px rgba(23, 21, 59, 0.6)',

    // Inner shadow
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Typography (Clean & Professional)
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },

  // Spacing (8px base)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.375rem',   // 6px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Component Specific
  components: {
    button: {
      primary: {
        background: 'linear-gradient(135deg, #17153B 0%, #2E236C 100%)',
        color: '#ffffff',
        hover: 'linear-gradient(135deg, #2E236C 0%, #17153B 100%)',
        active: '#0D0B1F',
      },
      secondary: {
        background: '#ffffff',
        color: '#17153B',
        border: '2px solid #17153B',
        hover: '#fafafa',
        active: '#f5f5f5',
      },
      ghost: {
        background: 'transparent',
        color: '#17153B',
        hover: 'rgba(23, 21, 59, 0.05)',
        active: 'rgba(23, 21, 59, 0.1)',
      },
    },
    card: {
      elevated: {
        background: '#ffffff',
        shadow: '0 12px 24px 0 rgba(0, 0, 0, 0.15)',
        hover: '0 20px 40px 0 rgba(0, 0, 0, 0.2)',
      },
      flat: {
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      },
      outlined: {
        background: 'transparent',
        border: '2px solid #17153B',
      },
    },
    input: {
      background: '#ffffff',
      border: '2px solid #e5e5e5',
      focus: '2px solid #17153B',
      placeholder: '#a3a3a3',
    },
  },

  // Status Colors (Using Purple Shades)
  status: {
    default: {
      bg: '#f5f5f5',
      text: '#404040',
      border: '#e5e5e5',
    },
    primary: {
      bg: '#17153B',
      text: '#ffffff',
      border: '#17153B',
    },
    light: {
      bg: '#fafafa',
      text: '#17153B',
      border: '#e5e5e5',
    },
    dark: {
      bg: '#0D0B1F',
      text: '#ffffff',
      border: '#0D0B1F',
    },
  },

  // Opacity Scale
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1',
  },

  // Z-Index
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
};

export default twoColorTheme;
