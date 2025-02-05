/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.42rem', '0.52rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem'],
        '2xl': ['0.75rem', '0.85rem']
      },
      colors: {
        main: '#41b883'
      },
      boxShadow: {
        l: '-8px 0 5px -5px white'
      }
      // variants: {
      //   scrollbar: ['dark']
      // }
    }
  },
  // plugins: [require('tailwind-scrollbar')],
  // 默认为 media
  // @media (prefers-color-scheme: dark) 跟随系统偏好的媒体查询
  darkMode: 'selector'
}
