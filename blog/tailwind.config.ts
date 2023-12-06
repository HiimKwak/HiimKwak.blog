import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          150: '#ededed',
          200: '#e5e5e5',
          250: '#dedede',
          300: '#d4d4d4',
          350: '#b5b5b5',
          400: '#a3a3a3',
          450: '#8a8a8a',
          470: '#808080',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          750: '#363636',
          800: '#262626',
          900: '#171717',
        },
        sunglow: {
          primary: '#E4AF08',
        },
        ghostwhite: {
          primary: '#F2F2F7',
        },
        platinum: {
          primary: '#e5e5e5',
        },
      },
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [typography],
} satisfies Config
