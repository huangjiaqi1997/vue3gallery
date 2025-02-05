// import svgIcon from './svg-icon.vue'
// import popup from './popup.vue'
import { defineAsyncComponent } from 'vue'
export { Confirm } from './confirm'
export { Message } from './message'

export default {
  install(app) {
    // app.component('m-svg-icon', svgIcon)
    // app.component('m-popup', popup)

    const compnents = import.meta.glob('./*.vue')
    /* components:
    './dir/foo.js': () => import('./dir/foo.js'),
    './dir/bar.js': () => import('./dir/bar.js'), */
    for (const [path, fn] of Object.entries(compnents)) {
      app.component(
        `m-${path.replace('./', '').split('.')[0]}`,
        defineAsyncComponent(fn)
      )
    }
  }
}
