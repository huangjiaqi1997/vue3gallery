import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue3gallery',
  plugins: [
    vue(),
    // vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
      // '/prod-api': {
      //   target: 'https://imooc-front.lgdsunday.club',
      //   changeOrigin: true
      // }
      // '/images': {
      //   target: 'https://imooc-front.oss-cn-beijing.aliyuncs.com',
      //   changeOrigin: true
      // }
      // todo
      // '/200/200': {
      // target: 'https://picsum.photos',
      // target: 'https://fastly.picsum.photos/id/14',
      // changeOrigin: true
      // }
    }
  }
})
