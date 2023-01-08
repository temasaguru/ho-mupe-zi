/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './drivers/views/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              // 長いURLをそのまま貼ると改行されないのを修正
              wordBreak: 'break-all',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
