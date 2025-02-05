<script setup>
import { watch } from 'vue'

const { visible, enableMaskClick } = defineProps(['visible', 'enableMaskClick'])
const emits = defineEmits(['close'])

const handleMaskClick = () => enableMaskClick && emits('close')
const handleClose = () => emits('close')

watch(
  () => visible,
  (val) => {
    val ? disableScroll() : enableScroll()
  }
)
const disableScroll = () => (document.body.style.overflow = 'hidden')
const enableScroll = () => (document.body.style.overflow = 'auto')
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

    <Transition name="up-30-3d">
      <div
        class="z-20 absolute rounded bg-white shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        v-if="visible"
      >
        <slot></slot>

        <!-- 关闭按钮 -->
        <m-svg-icon
          name="close"
          class="w-3 h-3 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100 absolute right-1.5 top-1.5"
          fillClass="fill-zinc-400"
          @click="handleClose()"
        ></m-svg-icon>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped></style>
