<script setup>
import { watch } from 'vue'

const {
  visible,
  enableMaskClick = true,
  height
} = defineProps(['visible', 'enableMaskClick', 'height'])
const emits = defineEmits(['close'])

const handleMaskClick = () => enableMaskClick && emits('close')

// 锁定屏幕滚动
watch(
  () => visible,
  (val) => (val ? disableScroll() : enableScroll())
)
const disableScroll = () => (document.body.style.overflow = 'hidden')
const enableScroll = () => (document.body.style.overflow = 'auto')

// document.body.addEventListener(
//   'touchmove',
//   (event) => event.preventDefault(),
//   { passive: false }
// )

// const isLocked = useScrollLock(el)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="visible"
        class="z-20 fixed top-0 left-0 bg-zinc-800/50 w-screen h-screen"
        @click.self="handleMaskClick"
      ></div>
    </Transition>
    <Transition name="up-100">
      <div
        v-if="visible"
        :style="{ height }"
        class="z-20 fixed bottom-0 left-0 bg-white w-screen rounded-t"
      >
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped></style>
