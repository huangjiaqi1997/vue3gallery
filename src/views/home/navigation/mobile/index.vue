<script setup>
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useElementBounding, useScroll, useWindowSize } from '@vueuse/core'
import Menu from './menu.vue'
import { useStore } from 'vuex'

const liRefs = useTemplateRef('liRefs')
const ulRef = useTemplateRef('ulRef')
const sliderLeft = ref(0)
const sliderWidth = ref(0)
const popupVisiable = ref(false)
const { width: windowWidth } = useWindowSize()
const store = useStore()
const category = computed(() => store.getters.category)
const categoryId = computed(() => store.getters.categoryId)

// 根据选中分类计算滑块滚动距离
onMounted(() => {
  watch(
    categoryId,
    () => {
      const curIndex = category.value.findIndex(
        (item) => item.id === categoryId.value
      )
      // const { x, width } = useElementBounding(liRefs.value[index])
      // x: 距视口左边距
      const { x, width } = liRefs.value[curIndex].getBoundingClientRect()

      const ulScrollLeft = ulRef.value.scrollLeft
      sliderLeft.value = x + ulScrollLeft
      sliderWidth.value = width
    },
    { immediate: true }
  )
})

const setCategory = (id) => store.commit('setCategoryId', id)

const onItemClick = (id) => setCategory(id)

const onHamburgerClick = () => (popupVisiable.value = true)

const handleMenuClick = (id) => {
  setCategory(id)
  popupVisiable.value = false
  // 根据滑块位置计算 ul 滚动距离
  // 等待 DOM 更新，获取新的滑块定位
  nextTick(() => {
    computeUlScrollLeft()
  })
}
// 根据滑块位置计算 ul 滚动距离
const computeUlScrollLeft = () => {
  const _sliderLeft = sliderLeft.value
  const _windowWidth = windowWidth.value
  const ulScrollLeft = ulRef.value.scrollLeft
  if (_sliderLeft < ulScrollLeft) {
    ulRef.value.scrollLeft -= ulScrollLeft - _sliderLeft
  }
  if (_sliderLeft > ulScrollLeft + _windowWidth - 40) {
    ulRef.value.scrollLeft = _sliderLeft + sliderWidth.value - _windowWidth + 40
  }
}

const handleMenuClose = () => (popupVisiable.value = false)
</script>

<template>
  <div class="z-10 bg-white sticky top-0 left-0 border-b border-zinc-200">
    <!-- 汉堡按钮 -->
    <div
      class="z-10 absolute top-[0.05rem] right-0 p-[0.2rem] bg-white shadow-l"
      @click="onHamburgerClick"
    >
      <m-svg-icon class="h-1.5 w-1.5 z-10" name="hamburger"></m-svg-icon>
    </div>
    <ul ref="ulRef" class="relative overflow-x-auto flex text-sm">
      <!-- 滑块 -->
      <li
        ref="slider"
        class="bg-zinc-900 h-3 mt-[0.09rem] rounded-md absolute -z-10 duration-300"
        :style="{
          width: sliderWidth + 'px',
          left: sliderLeft + 'px'
        }"
      ></li>

      <!-- 分类 -->
      <li
        ref="liRefs"
        class="shrink-0 p-1 last:mr-3 duration-300"
        v-for="item in category"
        :class="{ 'text-white': item.id === categoryId }"
        :key="item.id"
        @click="onItemClick(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- 分类弹窗 -->
    <m-popup
      height="80vh"
      :visible="popupVisiable"
      @close="handleMenuClose"
      :enableMaskClick="true"
    >
      <Menu :data="category" @click="handleMenuClick"></Menu>
    </m-popup>
  </div>
</template>

<style></style>
