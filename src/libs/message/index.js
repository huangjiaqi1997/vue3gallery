import { h, render } from 'vue'
import MessageComp from './message.vue'

export const Message = ({ type, message, duration = 2000 }) => {
  const vNode = h(MessageComp, {
    type,
    message,
    duration,

    onClose() {
      render(null, document.body)
    }
  })

  render(vNode, document.body)
}
