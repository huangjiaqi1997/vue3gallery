import { createApp, h, render } from 'vue'
import ConfirmComp from './confirm.vue'
/**
 * Promise vNode h render onMounted setTimeout
 */
export const Confirm = ({ title, content, confirmText, cancelText }) => {
  return new Promise((resolve, reject) => {
    // const confirmInstance = createApp(ConfirmComp, {
    const vNode = h(ConfirmComp, {
      title,
      content,
      confirmText,
      cancelText,

      onConfirm() {
        resolve()
      },

      onCancel() {
        reject(new Error('onCancel'))
      },

      onDestory() {
        render(null, document.body)
        // unmount()
      }
    })

    render(vNode, document.body)

    // const unmount = () => {
    //   confirmInstance.unmount()
    // }

    // const parentNode = document.createElement('div')
    // document.body.appendChild(parentNode)
    // confirmInstance.mount(parentNode)
  })
}
