import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      padding: '2rem',
      center: true,
      screens: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  daisyui: {
    logs: false,
    themes: [
      {
        zrs: {
          primary: '#0896D4',
          'primary-content': '#ffffff',
          secondary: '#222831',
          accent: '#38BDF8',
          neutral: '#22272f',
          'base-100': '#ffffff',
          'base-200': '#f6f6f6',
          info: '#3abff8',
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
