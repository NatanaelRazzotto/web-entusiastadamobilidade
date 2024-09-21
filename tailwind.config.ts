import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Habilita o suporte a classes para dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        primarybg: {
          light: '#f7fafc', // Cor clara
          dark: '#111827',  // Cor escura
        },
        secondarybg: {
          light: '#f7fafc', // Cor clara
          dark: '#030712',  // Cor escura
        },
        tertiarybg: {
          light: '#f7fafc', // Cor clara       
          dark: '#020617',  // Cor escura
        },
        text: {
          light: '#1a202c', // Texto escuro
          dark: '#f7fafc',  // Texto claro
        },
      },
      screens : {
        'xs': {'max': '399px'},
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
