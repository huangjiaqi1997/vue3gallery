import { watch } from 'vue'
import store from '../store'

export const useThemeChange = () => {
  let htmlClass = ''
  let mql = null

  /* 监听 themeType 变更
  前两种基于 html 的 dark 类名
  后一种基于监听系统偏好的变更 */
  watch(
    () => store.getters.themeType,
    (newVal, oldVal) => {
      // tailwind.config.js darkMode: 'selector' (默认为 prefer-color-scheme跟随系统)
      switch (newVal) {
        case 'THEME_LIGHT':
          htmlClass = ''
          break
        case 'THEME_DARK':
          htmlClass = 'dark'
          break
        case 'THEME_SYSTEM':
          // mql: 判定系统是否是暗黑模式，或监听系统偏好变更
          if (!mql) mql = window.matchMedia('(prefers-color-scheme: dark)')

          htmlClass = mql.matches ? 'dark' : ''
          // 监听系统主题变更
          mql.addEventListener('change', handleMqlChange)
          break
      }

      changeHtmlClass()

      // 解除事件绑定
      if (oldVal === 'THEME_SYSTEM') {
        mql.removeEventListener('change', handleMqlChange)
      }
    },
    { immediate: true }
  )

  // 当监听到系统主题变更
  function handleMqlChange(e) {
    htmlClass = e.matches ? 'dark' : ''
    changeHtmlClass()
  }

  function changeHtmlClass() {
    document.documentElement.className = htmlClass
  }
}
