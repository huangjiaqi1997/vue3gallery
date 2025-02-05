import { PC_DIVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

// else if (includeScrollbar) {
//   width.value = window.innerWidth
//   height.value = window.innerHeight
// }
// else {
//   width.value = window.document.documentElement.clientWidth
//   height.value = window.document.documentElement.clientHeight
export const isMobile = computed(
  () => useWindowSize().width.value < PC_DIVICE_WIDTH
)

// 动态 html-fontSize，若不设置，默认16px
export const useREM = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    const fontSize = window.innerWidth / 10 > 40 ? 40 : window.innerWidth / 10
    html.style.fontSize = fontSize + 'px'
  })
}
