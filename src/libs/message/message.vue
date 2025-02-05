<script setup>
import SvgIcon from '../svg-icon.vue'
import { onMounted, ref, Transition } from 'vue'

const { type, message, duration, onClose } = defineProps([
  'type',
  'message',
  'duration',
  'onClose'
])

const visible = ref(false)

// TODO 动态属性
// const styles = {
//   warn: {icon. fillClass textClass containerClass}
// }
let bgColorClass = ''
let msgColorClass = ''
let borderColorClass = ''
let iconColorClass = ''
switch (type) {
  case 'info':
    bgColorClass = 'bg-zinc-50'
    msgColorClass = 'text-zinc-600'
    iconColorClass = 'fill-zinc-600'
    borderColorClass = 'border-zinc-200'
    break
  case 'success':
    bgColorClass = 'bg-green-50'
    msgColorClass = 'text-green-600'
    iconColorClass = 'fill-green-600'
    borderColorClass = 'border-green-100'
    break
  case 'error':
    bgColorClass = 'bg-red-50'
    msgColorClass = 'text-red-600'
    iconColorClass = 'fill-red-600'
    borderColorClass = 'border-red-100'
    break
  case 'warn':
    bgColorClass = 'bg-orange-50'
    msgColorClass = 'text-orange-600'
    iconColorClass = 'fill-orange-600'
    borderColorClass = 'border-orange-100'
    break
}

onMounted(() => {
  visible.value = true

  setTimeout(() => {
    visible.value = false
    setTimeout(() => {
      onClose()
    }, 200)
  }, duration)
})
</script>

<template>
  <Transition>
    <div
      v-if="visible"
      :class="[bgColorClass, msgColorClass, borderColorClass]"
      class="z-20 fixed top-2 left-1/2 -translate-x-1/2 w-[350px] border flex items-center text-sm rounded-sm px-1.5 py-1.5"
    >
      <SvgIcon
        :fillClass="iconColorClass"
        class="h-1.5 w-1.5 mr-1"
        :name="type"
      ></SvgIcon>
      {{ message }}
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -30px, 0);
}
</style>
