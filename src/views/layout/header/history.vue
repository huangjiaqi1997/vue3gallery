<script setup>
const { history } = defineProps(['history'])
const emits = defineEmits(['search', 'remove', 'clear'])

const handleSearch = (item) => emits('search', item)

const handleRemoveHistory = (index) => emits('remove', index)

const handleClearHistory = () => emits('clear')
</script>

<template>
  <div class="p-1.5">
    <div>
      <span class="align-middle mr-0.5 text-sm">最近搜索</span>
      <m-svg-icon
        class="h-2.5 w-2.5 inline-block cursor-pointer p-0.5 rounded-sm hover:bg-zinc-200 duration-200"
        fillClass="fill-zinc-500"
        name="delete"
        v-show="history.length"
        @click="handleClearHistory"
      ></m-svg-icon>
    </div>
    <ul class="flex flex-wrap">
      <li
        class="py-0.5 px-1 mt-1 mr-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer duration-200 rounded-sm"
        v-for="(item, index) in history"
        :key="item"
        @click="() => handleSearch(item)"
      >
        {{ item }}
        <m-svg-icon
          class="h-2.5 w-2.5 inline-block cursor-pointer p-0.5 rounded-full hover:bg-zinc-100 duration-200"
          name="input-delete"
          v-show="history.length"
          @click.stop="() => handleRemoveHistory(index)"
        ></m-svg-icon>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
