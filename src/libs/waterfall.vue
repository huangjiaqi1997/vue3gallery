<script>
// 计算图片高度
export const getImageHeight = (imageH, imageW, itemW) =>
  imageH * ((itemW - 1.45) / imageW)
</script>

<script setup>
import { loadImage } from '@/utils/image'
import { observeVisible } from '@/utils/visible'
import { nextTick, onMounted, useTemplateRef, watch, ref } from 'vue'

const { list, columns, space, imagePreload } = defineProps([
  'list',
  'columns',
  'space', // 两端也有
  'imagePreload'
])
const emits = defineEmits(['preloadFinished'])

const columnsH = ref([]) // 高度容器
const itemsRef = useTemplateRef('itemsRef')
// const imagesRef = useTemplateRef('imagesRef')
const containerRef = useTemplateRef('containerRef') // todo: 监控容器宽度
const containerW = ref(0)
const containerH = ref(0)
const itemW = ref(0)
const itemsH = ref([])
const isLoadingImages = ref(false) // Promise.all 时会有较长时间白屏

// 获取 container 宽度
const getContainerW = () => {
  containerW.value = containerRef.value.offsetWidth
}

// 计算 container 高度
const computeContainerH = () => {
  containerH.value = Math.max(...columnsH.value)
}

// 重置 container 高度
const initContainerH = () => {
  containerH.value = 0
}

// 计算 item 宽度
const computeItemW = () => {
  itemW.value = (containerW.value - (columns + 1) * space) / columns
}

// 获取所有 item 高度 ------ 设置itemW => imageH 已自动计算
const getItemsHeight = () => {
  itemsH.value = itemsRef.value.map((item) => {
    return item.offsetHeight
  })
}

// 获取 items 中 所有图片元素
const getItemImages = () =>
  itemsRef.value.map((item) => item.querySelector('img'))

// 监听所有图片加载完成
// const loadImages = (images) => {
//   return Promise.all(
//     images.map((image) => {
//       return new Promise((resolve, reject) => {
//         image.onload = () => resolve(image)
//       })
//     })
//   )
// }
const loadImages = (list) => {
  isLoadingImages.value = true

  return Promise.all(
    list.map((item) => {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.src = item.photo
      })
    })
  ).then(() => {
    emits('preloadFinished')
    isLoadingImages.value = false
  })
}

// 获取高度容器最小值
const getColumnsHMin = () => Math.min(...columnsH.value)

// 获取高度容器最小值 index
const getColumnsHMinIndex = () =>
  columnsH.value.findIndex((h) => h === getColumnsHMin())

// 计算 item left
const computedItemLeft = () => {
  const minHIndex = getColumnsHMinIndex()
  return minHIndex * itemW.value + space * (minHIndex + 1) // 定位以子元素 border外为基准
}

// 计算 item top
const computedItemTop = () => getColumnsHMin()

// 高度容器自增
const columnsHIncrease = (itemHeight) => {
  columnsH.value[getColumnsHMinIndex()] += itemHeight + space
}

// 初始化高度容器
const initColumnsH = () => {
  columnsH.value = Array(columns).fill(0)
}

// 遍历 list 计算定位 并 赋值给 item
const computeItemsPos = () => {
  list.forEach((item, index) => {
    // 避免重复计算
    if (item.top === undefined) {
      item.top = computedItemTop()
      item.left = computedItemLeft()
    }

    columnsHIncrease(itemsH.value[index])

    // !imagePreload && imageLazy(getItemImages()[index])
  })

  computeContainerH()
}

// 监听元素可见性，修改 src 实现懒加载
const imageLazy = (image) => {
  // const src = image.src
  // image.src = ''

  observeVisible(image, () => {
    // image.src = src
    image.src = image.dataset.src
  })
}

// 计算 item 宽度
onMounted(() => {
  getContainerW()
  computeItemW()
})

// 监听 list 变化
watch(
  () => list,
  async () => {
    console.log('list.length', list.length)
    initColumnsH()

    // if (!list.length) return

    imagePreload && (await loadImages(list))

    await nextTick()

    getItemsHeight()
    computeItemsPos()
  }
)

// 监听列变化
watch(
  () => columns,
  async () => {
    initColumnsH()

    await nextTick()

    getContainerW()
    computeItemW()
    imagePreload && (await loadImages(list))

    // itemW变化  => itemH变化
    // await nextTick()
    // 处理浏览器模式 移动/PC切换
    setTimeout(() => {
      getItemsHeight()

      // 移除item上的计算
      list.forEach((item) => {
        delete item.top
        delete item.left
      })

      computeItemsPos()
    }, 300)
  }
)
</script>

<template>
  <!-- 预加载 Promise.all 进行时，未定位图片会显示 -->
  <div
    v-bind="$attrs"
    ref="containerRef"
    class="relative my-[10px] bg-white"
    :style="{
      height: containerH + 'px'
    }"
  >
    <div
      v-for="item in list"
      :key="item.id"
      ref="itemsRef"
      class="absolute rounded border border-zinc-200 opacity-0 duration-300"
      :style="{
        top: item.top + 'px',
        left: item.left + 'px',
        width: itemW + 'px',
        opacity: item.left ? 100 : 0
      }"
    >
      <slot
        :item="{
          ...item,
          itemW
        }"
      ></slot>
    </div>
  </div>

  <!-- <div v-if="isLoadingImages" class="h-8 p-2 text-center">
    <div> -->
  <!-- <m-svg-icon
        class="h-4 w-4 animate-spin mx-auto inline-block"
        fillClass="fill-zinc-600"
        name="infinite-load"
      ></m-svg-icon> -->
  <!-- <span class="text-sm align-middle">正在预加载图片。。。</span>
    </div>
  </div> -->
</template>

<style scoped></style>
