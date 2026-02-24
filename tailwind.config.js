/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        michi: {
          vermilion: '#B22222', // 朱砂紅
          navy: '#1A237E',      // 勝色
          washi: '#F9F7F2',     // 和紙白 (背景色)
          ink: '#1C1C1C',       // 墨黑
          gold: '#C5A059',      // 金色
          // 保留以下定義以修復編譯錯誤
          light: '#F9F7F2',
          primary: '#B22222',
          secondary: '#1A237E',
        },
      },
      fontFamily: {
        serif: ['Noto Serif JP', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};