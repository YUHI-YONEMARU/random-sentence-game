/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slot': 'spinSlot 0.1s linear infinite',
      },
      keyframes: {
        spinSlot: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' }, // スロットの動きを表現
        },
      },
    },
  },
  plugins: [],
};