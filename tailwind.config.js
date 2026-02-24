/** @type {import('tailwind-config').Config} */
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
          kachi: '#1A237E',    // 勝色 - 深靛藍
          red: '#B22222',      // 朱砂紅
          washi: '#F9F7F2',    // 和紙白
          sumi: '#1C1C1C',     // 墨黑
          gold: '#C5A059',     // 古銅金
          tape: '#FFD700',     // 封條黃
        }
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      animation: {
        'marquee': 'marquee 45s linear infinite',
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
}