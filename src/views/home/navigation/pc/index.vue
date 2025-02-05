<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const curCategoryId = ref('ALL_CATEGORY')
const isFold = ref(true)

const category = computed(() => store.getters.category)

const onItemClick = (id) => {
  curCategoryId.value = id
  store.commit('setCategoryId', id)
  store.commit('setSearchText', '')
}

const onFoldClick = () => (isFold.value = !isFold.value)
</script>

<template>
  <div class="z-10 bg-white sticky top-0 border-b border-zinc-200 py-1">
    <!-- 定义容器高度后，元素高度和位置被拉伸 => 定义 max-height 或者用外层 div height挡住 -->
    <ul
      :class="isFold ? 'max-h-[1.05rem]' : 'max-h-[5rem]'"
      class="relative flex flex-wrap justify-center w-[49vw] mx-auto overflow-hidden duration-300"
    >
      <li
        :class="{ 'bg-zinc-200': curCategoryId === item.id }"
        class="text-base p-1 mx-0.5 mb-0.5 font-semibold hover:bg-zinc-200 cursor-pointer duration-300 rounded"
        v-for="item in category"
        :key="item.id"
        @click="() => onItemClick(item.id)"
      >
        {{ item.name }}
      </li>
      <!-- 折叠按钮 -->
      <m-svg-icon
        @click="onFoldClick"
        :name="isFold ? 'unfold' : 'fold'"
        class="h-3 w-3 p-1 rounded hover:bg-zinc-200 cursor-pointer absolute top-[0.15rem] right-0 duration-300"
      ></m-svg-icon>
    </ul>
  </div>
</template>

<style scoped></style>
