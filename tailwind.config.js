/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Palette – Sovereign Navy
        'primary': '#0B2545',
        'primary-dark': '#001026',
        'primary-light': '#1E3A5F',
        'on-primary': '#ffffff',
        'primary-container': '#0B2545',
        'on-primary-container': '#778db2',
        // Secondary – Saffron / Amber
        'secondary': '#D97706',
        'secondary-bright': '#F59E0B',
        'secondary-container': '#FE932C',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#663500',
        // Tertiary – Sovereign Green
        'tertiary': '#047857',
        'tertiary-light': '#10B981',
        'tertiary-container': '#ECFDF5',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#065F46',
        // Surfaces
        'surface': '#F8F9FF',
        'surface-dim': '#CCDBF4',
        'surface-bright': '#F8F9FF',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#EFF4FF',
        'surface-container': '#E6EEFF',
        'surface-container-high': '#DDE9FF',
        'surface-container-highest': '#D5E3FD',
        'surface-variant': '#D5E3FD',
        // On-Surface
        'on-surface': '#0D1C2F',
        'on-surface-variant': '#44474E',
        // Inverse
        'inverse-surface': '#233144',
        'inverse-on-surface': '#EBF1FF',
        'inverse-primary': '#B1C7F0',
        // Outlines
        'outline': '#74777F',
        'outline-variant': '#C4C6CF',
        // Status
        'error': '#B91C1C',
        'error-bright': '#EF4444',
        'error-container': '#FEF2F2',
        'on-error': '#ffffff',
        'on-error-container': '#991B1B',
        // Background
        'background': '#F8F9FF',
        'on-background': '#0D1C2F',
        // Tricolor
        'tricolor-saffron': '#FF9933',
        'tricolor-green': '#138808',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      fontSize: {
        'headline-xl': ['36px', { lineHeight: '44px', fontWeight: '700', letterSpacing: '-0.01em' }],
        'headline-lg': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'headline-md': ['22px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-sm': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'title-md': ['16px', { lineHeight: '22px', fontWeight: '600', letterSpacing: '0.01em' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '18px', fontWeight: '600' }],
        'label-md': ['12px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.03em' }],
        'label-stamp': ['11px', { lineHeight: '14px', fontWeight: '700', letterSpacing: '0.08em' }],
        'code-dense': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      spacing: {
        '2xs': '0.125rem',
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '0.75rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
      boxShadow: {
        'institutional': '0 1px 3px 0 rgba(11,37,69,0.08), 0 1px 2px -1px rgba(11,37,69,0.06)',
        'modal': '0 4px 6px -1px rgba(11,37,69,0.12), 0 2px 4px -2px rgba(11,37,69,0.08)',
        'header': '0 1px 8px rgba(0,0,0,0.06)',
        'sidebar': '2px 0 12px rgba(11,37,69,0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
