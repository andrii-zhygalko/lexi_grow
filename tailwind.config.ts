import type { Config } from 'tailwindcss';
import { colors } from './src/lib/constants/colors';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1440px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1440px',
      },
    },
    extend: {
      backgroundImage: {
        'auth-gradient': `linear-gradient(to top left, ${colors.brand.primary}90 -10%, ${colors.background.page}80 20%, ${colors.background.page} 100%)`,
      },
      colors: {
        border: colors.border,
        background: colors.background,
        brand: colors.brand,
        text: colors.text,
        status: colors.status,
        progress: colors.progress,
        stroke: colors.brand,
        table: colors.table,
        radio: colors.radio,

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          primary: colors.brand.primary,
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        primary: ['MacPaw Fixel Display', 'system-ui', 'sans-serif'],
        secondary: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        scale: {
          '0%, 100%': { transform: 'translateY(-50%) scale(1)' },
          '50%': { transform: 'translateY(-50%) scale(1.2)' },
        },
      },
      animation: {
        scale: 'scale 1s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
} as const;

export default config;
