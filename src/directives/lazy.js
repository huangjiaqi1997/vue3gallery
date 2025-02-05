import { observeVisible } from '@/utils/visible'

export default {
  mounted: (el) => {
    observeVisible(el, () => {
      el.src = el.dataset.src
    })
  }
}
