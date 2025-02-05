<script setup>
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

// 控制显示
const menuVisible = ref(false)
let timer = null

const handleMouseenter = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  menuVisible.value = true
}
const handleMouseleave = () => {
  timer = setTimeout(() => {
    clearTimeout(timer)
    timer = null

    menuVisible.value = false
  }, 300)
}

// 位置计算
const { placement } = defineProps({
  placement: { default: 'bottom-left' }
})
const menuPosStyle = ref({})
const triggerRef = useTemplateRef('triggerRef')
// const menuRef = useTemplateRef('menuRef')

watch(menuVisible, (val) => {
  if (!val) return
  if (Object.keys(menuPosStyle.value).length) return

  const triggerW = triggerRef.value.offsetWidth
  const triggerH = triggerRef.value.offsetHeight
  // nextTick(() => {
  //   const menuW = menuRef.value.offsetWidth
  //   const menuH = menuRef.value.offsetHeight

  switch (placement) {
    case 'top-left':
      menuPosStyle.value.right = triggerW + 'px'
      // menuPosStyle.value.bottom = triggerH + 'px'
      menuPosStyle.value.top = 0
      break
    case 'top-right':
      menuPosStyle.value.left = triggerW + 'px'
      // menuPosStyle.value.bottom = triggerH + 'px'
      menuPosStyle.value.top = 0
      break
    case 'bottom-left':
      menuPosStyle.value.right = triggerW + 'px'
      menuPosStyle.value.top = triggerH + 'px'
      break
    case 'bottom-right':
      menuPosStyle.value.left = triggerW + 'px'
      menuPosStyle.value.top = triggerH + 'px'
      break
  }
  // })
})
</script>

<template>
  <div
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    class="relative cursor-pointer"
  >
    <div ref="triggerRef"><slot name="trigger"></slot></div>

    <Transition
      ><div
        ref="menuRef"
        :style="menuPosStyle"
        v-show="menuVisible"
        class="absolute z-20"
      >
        <slot name="menu"></slot></div
    ></Transition>
  </div>
  <!-- <div class="group relative">
    <div><slot name="trigger"></slot></div>
    <div
      class="duration-200 absolute opacity-0 translate-y-10 invisible group-[:hover]:opacity-100 group-[:hover]:visible group-[:hover]:translate-y-0"
    >
      <slot name="menu"></slot>
    </div>
  </div> -->
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(20%);
}
</style>
