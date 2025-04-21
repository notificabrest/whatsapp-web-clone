import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'whatsapp-primary': '#128C7E',
        'whatsapp-secondary': '#075E54',
        'whatsapp-light': '#25D366',
        'whatsapp-chat-bg': '#E5DDD5',
      },
    },
  },
  plugins: [],
};

export default config;
