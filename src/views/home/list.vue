<script setup>
import api from '@/api'
import { isMobile } from '@/utils/flexible'
import { ref, watch, nextTick, computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { Message } from '@/libs'
import { downloadFile } from '@/utils/download'
import Item from './item.vue'
import Pin from './pin.vue'

const store = useStore()

const list = ref([])
const payload = ref({})
const isLoading = ref(false)
const isFinish = ref(false)
const isPreloading = ref(false)
const columns = ref(0)
const waterfallWidth = ref(0)
const isProloadMode = ref(false)
const pinVisible = ref(false)
const clickPos = ref({})
const _item = ref({})

/**
 * 列表
 */
const searchText = computed(() => store.getters.searchText)
const categoryId = computed(() => store.getters.categoryId)

const resetListState = () => {
  list.value = []
  payload.value = {
    page: 1,
    size: 10,
    searchText: searchText.value,
    categoryId: categoryId.value
  }
  isFinish.value = false
}

// 监听 search category 变化触发加载
watch(
  [searchText, categoryId],
  () => {
    resetListState()
  },
  { immediate: true }
)

// 请求 list
const loadList = async () => {
  isProloadMode.value && (isPreloading.value = true)
  isLoading.value = true

  const res = await api.getList(payload.value)

  isLoading.value = false
  list.value = [...list.value, ...res.list]
  payload.value.page += 1
  if (res.list.length === res.total) isFinish.value = true

  // 加载后，存在列表没有铺满屏幕的情况
  // 此时 isLoading: false, isLoadingVisible: true
  // 预加载时不适用，因为需要等一页图片全部加载完成 才能判断是否未铺满
  // setTimeout(() => {
  //   if (isLoadingVisible.value) loadList()
  // }, 300)
}

// 监听无限滚动是否可见
const handleVisibleChange = (isVisible) => {
  if (isVisible && !isLoading.value && !isFinish.value && !isPreloading.value) {
    loadList()
  }

  isLoading.value = isVisible
}

// 当前页所有图片预加载完成
const handlePreloadFinished = () => (isPreloading.value = false)

const handleChangeMode = () => (isProloadMode.value = !isProloadMode.value)

/**
 * 瀑布流
 */
// 监控屏幕的变化，设置瀑布流 columns 和 waterfallWidth
watch(
  isMobile,
  (val) => {
    columns.value = val ? 2 : 5
    waterfallWidth.value = val ? '100vw' : '70vw'
  },
  { immediate: true }
)

/**
 * item
 */
// 按钮点击事件
const handleShare = (item) => {}
const handleLike = (item) => {}
const handleDownload = (item) => {
  Message({ type: 'success', message: '图片已开始下载' })

  // 延迟开始下载 以展示 Message
  setTimeout(() => {
    // FileSaver StreamSaver
    const url = `https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?cs=srgb&dl=pexels-ivan-samkov-${item.id}.jpg&fm=jpg`
    const fileName = item.title + '_' + item.id
    downloadFile(url, fileName)
  }, 500)
}
const handleFull = (imageRef) => {
  // useFullscreen
  imageRef.value.requestFullscreen()
}

const handleView = (item, imageRef) => {
  _item.value = item
  pinVisible.value = true

  // 计算图片的中心点
  const { x: _x, y: _y } = imageRef.value.getBoundingClientRect()
  const x = _x + (item.itemW - 1.45) / 2 + 'px'
  const y = _y + item.imageHeight / 2 + 'px'
  clickPos.value = { x, y }

  history.pushState({}, '', `/vue3gallery/pins/${item.id}`)
}

const handleClose = () => {
  pinVisible.value = false
  history.back()
}

// 后退就关闭弹窗
const handlePopstate = () => {
  // 只能获取到to的路径
  const matchs = location.pathname.match(/\/pins\/\d+/)
  if (!matchs) pinVisible.value = false
}
// 监听前进 后退
window.addEventListener('popstate', handlePopstate)
onUnmounted(() => window.removeEventListener('popstate', handlePopstate))
</script>

<template>
  <div>
    <div
      v-if="!isMobile"
      class="fixed z-10 top-13 right-10 text-xs flex items-center"
    >
      <span
        class="duration-300 text-zinc-600"
        :class="{ 'text-zinc-300': !isProloadMode }"
        >预加载</span
      >
      <m-switch
        class="mx-1"
        :isChecked="!isProloadMode"
        @change="handleChangeMode"
      ></m-switch
      ><span
        class="duration-300 text-zinc-600"
        :class="{ 'text-zinc-300': isProloadMode }"
        >懒加载</span
      >
    </div>
    <m-infinite-list
      :isLoading="isLoading || isPreloading"
      :isFinish="isFinish"
      @visibleChange="handleVisibleChange"
    >
      <m-waterfall
        v-slot="{ item }"
        :style="{ width: waterfallWidth }"
        :columns="columns"
        :space="8"
        :list="list"
        :imagePreload="isProloadMode"
        @preloadFinished="handlePreloadFinished"
        class="mx-auto"
      >
        <Item
          :item="item"
          :imagePreload="isProloadMode"
          @share="handleShare"
          @like="handleLike"
          @download="handleDownload"
          @full="handleFull"
          @view="handleView"
        >
        </Item>
      </m-waterfall>
    </m-infinite-list>

    <Pin
      :visible="pinVisible"
      :item="_item"
      :clickPos="clickPos"
      @close="handleClose"
    ></Pin>
  </div>
</template>

<style scoped></style>
