import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
  },
  daisyui: {
    themes: [
      {
        zrs: {
          primary: '#2fc2f6',
          secondary: '#70d5fa',
          accent: '#5B7680',
          neutral: '#2b3440',
          'base-100': '#ffffff',
          info: '#a9d4e3',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
