<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const {
  sticky = true,
  leftClick,
  rightClick
} = defineProps(['sticky', 'leftClick', 'rightClick'])
// const emits = defineEmits(['leftClick', 'rightClick'])
const router = useRouter()

const onLeftClick = () => {
  if (leftClick) return leftClick()

  router.back()
  store.commit('setType', 'back')
}
const onRightClick = () => rightClick && rightClick()
</script>

<template>
  <div
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
    class="z-10 h-5 border-b border-zinc-200 flex items-center justify-center bg-white text-base text-zinc-800"
  >
    <!-- 左 -->
    <div
      class="absolute left-0 h-full px-0.5 flex items-center"
      @click="onLeftClick"
    >
      <slot name="left">
        <m-svg-icon
          class="w-2 h-2 mr-0.5 inline-block"
          name="back"
        ></m-svg-icon>
        <span class="font-semibold">返回</span>
      </slot>
    </div>
    <!-- 中 -->
    <div class="flex items-center font-bold">
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      class="absolute right-0 h-full px-1 flex items-center"
      @click="onRightClick"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped></style>
