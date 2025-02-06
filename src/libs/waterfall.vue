<script setup>
// import { loadImage } from '@/utils/image'
// import { observeVisible } from '@/utils/visible'
import { nextTick, onMounted, useTemplateRef, watch, ref } from 'vue'
/**
 * 图片一定是一页图片同时显示出来，
 * 一页图片全部加载完成之后，才能开始计算定位
 * 列高度容器 item高度容器 图片容器
 */
const { list, columns, space, imagePreload } = defineProps([
  'list',
  'columns',
  'space', // 容器两端也有
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
const images = ref([])
const isLoadingImages = ref(false) // Promise.all 时会有较长时间白屏

// 获取 container 宽度
const setContainerWidth = () => {
  containerW.value = containerRef.value.offsetWidth
}

// 计算 container 高度
const setContainerHeight = () => {
  containerH.value = getColHeightsMax()
}

// 重置 container 高度
const initContainerHeight = () => {
  containerH.value = 0
}

// 计算 item 宽度
const setItemWidth = () => {
  itemW.value = (containerW.value - (columns + 1) * space) / columns
}

// 获取所有 item 高度 ------ 设置itemW => imageH 已自动计算
const setItemHeights = () => {
  itemsH.value = itemsRef.value.map((item) => {
    return item.offsetHeight
  })
}

// 获取 items 中 所有图片元素
const getItemImages = () =>
  itemsRef.value.map((item) => item.querySelector('img'))
// 监听所有图片加载完成
/* const preloadImages = (images) => {
  return Promise.all(
    images.map((image) => {
      return new Promise((resolve, reject) => {
        image.onload = () => resolve(image)
      })
    })
  )
} */

// 监听所有图片加载完成
const preloadImages = (list) => {
  isLoadingImages.value = true

  return Promise.all(
    list.map((item) => {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.src = item.photo
      })
    })
  ).then((res) => {
    emits('preloadFinished')
    isLoadingImages.value = false
    images.value = res
  })
}

// 获取高度容器最大值
const getColHeightsMax = () => Math.max(...columnsH.value)
// 获取高度容器最小值
const getColHeightsMin = () => Math.min(...columnsH.value)
// 获取高度容器最小值 index
const getColHeightsMinIndex = () =>
  columnsH.value.findIndex((h) => h === getColHeightsMin())

// 计算 item left
const computedItemLeft = () => {
  const minHIndex = getColHeightsMinIndex()
  return minHIndex * itemW.value + space * (minHIndex + 1) // 定位以子元素 border外为基准
}

// 计算 item top
const computedItemTop = () => getColHeightsMin()

// 高度容器自增
const increaseColHeights = (itemHeight) => {
  columnsH.value[getColHeightsMinIndex()] += itemHeight + space
}

// 初始化高度容器
const initColHeights = () => {
  columnsH.value = Array(columns).fill(0)
}

// 懒加载利用已知图片宽高计算图片高度
const getImageHeightByRatio = (imageH, imageW, itemW) =>
  imageH * ((itemW - 1.45) / imageW)

const computeImagesHeight = () => {
  list.forEach((item, index) => {
    // 预加载 计算图片的高度
    if (item.top === undefined) {
      let imageH = 0,
        imageW = 0
      if (imagePreload) {
        imageH = images.value[index].height
        imageW = images.value[index].width
      } else {
        imageH = item.photoHeight
        imageW = item.photoWidth
      }
      item.imageHeight = getImageHeightByRatio(imageH, imageW, itemW.value)
    }
  })
}

// 遍历 list 计算定位 并 赋值给 item
const computeItemsPosition = () => {
  list.forEach((item, index) => {
    // 避免重复计算
    if (item.top === undefined) {
      item.top = computedItemTop()
      item.left = computedItemLeft()
    }

    increaseColHeights(itemsH.value[index])

    // !imagePreload && imageLazy(getItemImages()[index])
  })

  setContainerHeight()
}

// 监听元素可见性，修改 src 实现懒加载
/* const imageLazy = (image) => {
  // const src = image.src
  // image.src = ''

  observeVisible(image, () => {
    // image.src = src
    image.src = image.dataset.src
  })
} */

// 挂载后，设置 container item 宽度
onMounted(() => {
  setContainerWidth()
  setItemWidth()

  // 执行顺序
  // 1. onMounted
  // 2. watch(immediate)nextTick
})

// 监听 list 数据变化，全部重新计算
watch(
  () => list,
  async () => {
    console.log('watch list', list.length)
    // 重置列高度容器
    initColHeights()

    // 开始预加载图片
    imagePreload && (await preloadImages(list))

    // 计算图片高度,应用到 DOM
    computeImagesHeight()

    // DOM需要更新
    await nextTick()

    // 设置 item 高度容器，记录每一项高度
    setItemHeights()

    // 计算每一个 item 的定位
    computeItemsPosition()
  }
)

// 监听列变化
watch(
  () => columns,
  async () => {
    initColHeights()

    // await nextTick()

    // setContainerWidth()
    // setItemWidth()
    imagePreload && (await preloadImages(list))

    // 处理浏览器中移动/PC切换时，DOM更新延迟
    setTimeout(async () => {
      setContainerWidth()
      setItemWidth()

      // 移除item上的计算
      list.forEach((item) => {
        delete item.top
        delete item.left
      })

      computeImagesHeight()

      await nextTick()

      setItemHeights()

      computeItemsPosition()
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
      class="absolute rounded border border-zinc-200 opacity-0 duration-500"
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
