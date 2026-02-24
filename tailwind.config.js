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
        // Michi Brand Colors
        michi: {
          primary: '#003366',    // 深藍 - 信任、專業
          secondary: '#FF69B4',  // 粉紅 - 溫暖、親切
          accent: '#FFD700',     // 金色 - 品質、精選
          light: '#F8F9FA',      // 淺灰 - 背景
          dark: '#666666',       // 深灰 - 次要文字
          border: '#E8E8E8',     // 邊框色
          success: '#4CAF50',    // 綠色 - 成功
          error: '#FF6B6B',      // 紅色 - 錯誤
        },
        // Alias for backward compatibility
        primary: '#FF69B4',      // Michi pink as default
        secondary: '#003366',    // Michi blue as secondary
        dark: '#003366',
        light: '#F8F9FA',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      gradients: {
        'michi': 'linear-gradient(135deg, #003366 0%, #FF69B4 100%)',
      },
    },
  },
  plugins: [],
};
