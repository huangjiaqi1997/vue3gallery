<script setup>
import { observeVisible } from '@/utils/visible'
import { onMounted, useTemplateRef } from 'vue'

const { isLoading, isFinish } = defineProps(['isLoading', 'isFinish'])
const emits = defineEmits(['visibleChange'])

const loadingRef = useTemplateRef('loadingRef')

onMounted(() => {
  observeVisible(loadingRef.value, (isVisible) => {
    emits('visibleChange', isVisible)
    // if (isVisible) {
    //   loadingVisible.value = true

    //   if (!loading.value && !isFinish) emits('loadList')
    // } else {
    //   loadingVisible.value = false
    // }
  })
})
</script>

<template>
  <div>
    <!-- 列表 -->
    <slot></slot>

    <!-- loading 或 没有更多 -->
    <div ref="loadingRef" class="h-8 p-1 text-center">
      <m-svg-icon
        v-show="isLoading"
        class="h-4 w-4 animate-spin mx-auto"
        fillClass="fill-zinc-600"
        name="infinite-load"
      ></m-svg-icon>

      <span v-if="isFinish" class="text-sm leading-4 text-zinc-500"
        >没有更多了</span
      >
    </div>
  </div>
</template>

<style scoped></style>
