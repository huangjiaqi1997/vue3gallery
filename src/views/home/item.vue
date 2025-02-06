<script setup>
import { isMobile } from '@/utils/flexible'
import { observeVisible } from '@/utils/visible'

import { onMounted, ref, useTemplateRef } from 'vue'
// import Detail from './detail.vue'

const { item, imagePreload } = defineProps(['item', 'imagePreload'])
const emits = defineEmits(['share', 'like', 'download', 'full', 'view'])
const imageRef = useTemplateRef('imageRef')
// const detailVisible = ref(false)
// const clickPos = ref({})

// 懒加载实现
onMounted(() => {
  if (imagePreload) return

  // DOM 插入后，置空src
  const _src = imageRef.value.src
  imageRef.value.src = ''

  observeVisible(imageRef.value, (isVisiable) => {
    if (isVisiable) imageRef.value.src = _src
  })
})

const onItemClick = () => {
  emits('view', item, imageRef)
  // detailVisible.value = true

  // const { x: _x, y: _y } = imageRef.value.getBoundingClientRect()
  // const x = _x + item.itemW / 2
  // const y = _y + imageHeight / 2
  // clickPos.value = { x, y }
}

const onShareClick = () => {
  emits('share', item)
}
const onLikeClick = () => {
  emits('like', item)
}

const onDownlaodClick = () => {
  emits('download', item)
}

const onFullClick = () => {
  emits('full', imageRef)
}
</script>

<template>
  <div class="rounded bg-zinc-300">
    <!-- 图片和蒙版 -->
    <div @click="onItemClick">
      <!-- 图片 -->
      <!-- height: imagePreload ? 'auto' : imageHeight + 'px', -->
      <img
        :style="{
          height: item.imageHeight + 'px',
          width: item.itemW - 1.45 + 'px'
        }"
        ref="imageRef"
        class="rounded-t w-full"
        :src="item.photo"
      />
      <!-- 蒙版 -->
      <div
        v-if="!isMobile"
        class="cursor-zoom-in absolute left-0 top-0 rounded-t bg-zinc-800/40 opacity-0 hover:opacity-100 duration-300"
        :style="{
          height: item.imageHeight + 'px',
          width: item.itemW - 1.45 + 'px'
        }"
      >
        <m-button
          class="absolute top-1 left-1"
          type="primary"
          size="small"
          @click="onShareClick"
          >分享</m-button
        >
        <m-button
          class="absolute top-1 right-1"
          type="info"
          icon="heart"
          size="small"
          @click="onLikeClick"
        ></m-button>
        <m-button
          class="absolute bottom-1 left-1"
          type="info"
          icon="download"
          size="small"
          @click="onDownlaodClick"
        ></m-button>
        <m-button
          class="absolute bottom-1 right-1"
          type="info"
          icon="full"
          size="small"
          @click="onFullClick"
        ></m-button>
      </div>
    </div>
    <!-- 图片信息 -->
    <div class="text-sm py-1 bg-white rounded-b">
      <div
        :style="{ width: item.itemW + 'px' }"
        class="font-semibold px-1 overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {{ item.title }}
      </div>
      <div :style="{ width: item.itemW + 'px' }" class="px-1 mt-0.5">
        <img
          class="w-2 h-2 mr-0.5 rounded-full inline-block"
          :src="item.avatar"
        />
        <span
          :style="{ width: `calc(${item.itemW}px - 1.125rem)` }"
          class="align-middle text-zinc-600 overflow-hidden text-ellipsis whitespace-nowrap inline-block"
          >{{ item.author }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
