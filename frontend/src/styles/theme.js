// Ultra Professional Theme Configuration
export const theme = {
  // Brand Colors - Deep Purple Professional
  brand: {
    primary: '#210F37',
    primaryLight: '#3a1a5c',
    primaryDark: '#150a24',
    accent: '#6366f1',
    accentLight: '#818cf8',
  },

  // Semantic Colors
  colors: {
    success: '#10b981',
    successLight: '#34d399',
    successDark: '#059669',
    warning: '#f59e0b',
    warningLight: '#fbbf24',
    warningDark: '#d97706',
    danger: '#ef4444',
    dangerLight: '#f87171',
    dangerDark: '#dc2626',
    info: '#3b82f6',
    infoLight: '#60a5fa',
    infoDark: '#2563eb',
  },

  // Neutral Palette
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Dark Mode
  dark: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #150a24 25%, #210F37 50%, #3a1a5c 75%, #4a2070 100%)',
    surface: 'rgba(255, 255, 255, 0.98)',
    surfaceHover: 'rgba(255, 255, 255, 1)',
    overlay: 'rgba(15, 12, 41, 0.85)',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.85)',
      tertiary: 'rgba(255, 255, 255, 0.65)',
      disabled: 'rgba(255, 255, 255, 0.4)',
    },
    border: 'rgba(255, 255, 255, 0.12)',
    divider: 'rgba(255, 255, 255, 0.08)',
  },

  // Light Mode
  light: {
    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 25%, #f5f5f5 50%, #e5e7eb 75%, #d1d5db 100%)',
    surface: '#ffffff',
    surfaceHover: '#fafafa',
    overlay: 'rgba(255, 255, 255, 0.95)',
    text: {
      primary: '#0a0a0a',
      secondary: '#404040',
      tertiary: '#737373',
      disabled: '#a3a3a3',
    },
    border: 'rgba(0, 0, 0, 0.12)',
    divider: 'rgba(0, 0, 0, 0.08)',
  },

  // Typography
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
    lineHeight: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing Scale (8px base)
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
    32: '8rem',     // 128px
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

  // Shadows
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 8px 16px -2px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.08)',
    lg: '0 12px 24px -4px rgba(0, 0, 0, 0.15), 0 6px 12px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 40px -8px rgba(0, 0, 0, 0.2), 0 10px 20px -8px rgba(0, 0, 0, 0.15)',
    '2xl': '0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 15px 30px -12px rgba(0, 0, 0, 0.2)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    // Colored shadows
    primary: '0 10px 40px -8px rgba(33, 15, 55, 0.4)',
    success: '0 10px 40px -8px rgba(16, 185, 129, 0.3)',
    warning: '0 10px 40px -8px rgba(245, 158, 11, 0.3)',
    danger: '0 10px 40px -8px rgba(239, 68, 68, 0.3)',
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Z-Index Scale
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

  // Breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component Specific
  components: {
    button: {
      height: {
        sm: '2rem',      // 32px
        base: '2.5rem',  // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem',    // 56px
      },
      padding: {
        sm: '0.5rem 1rem',
        base: '0.75rem 1.5rem',
        lg: '1rem 2rem',
        xl: '1.25rem 2.5rem',
      },
    },
    input: {
      height: {
        sm: '2rem',
        base: '2.75rem',
        lg: '3.25rem',
      },
      padding: {
        sm: '0.5rem 0.75rem',
        base: '0.75rem 1rem',
        lg: '1rem 1.25rem',
      },
    },
    card: {
      padding: {
        sm: '1rem',
        base: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #210F37 0%, #3a1a5c 100%)',
    primaryReverse: 'linear-gradient(135deg, #3a1a5c 0%, #210F37 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
  },

  // Blur Effects
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
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
};

export default theme;
