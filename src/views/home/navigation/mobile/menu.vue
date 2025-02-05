<script setup>
const { data } = defineProps(['data'])
const emits = defineEmits(['click'])

const handleClick = (id) => emits('click', id)
</script>

<template>
  <div class="text-xl p-1 font-semibold">所有分类</div>
  <ul style="height: calc(100% - 1.25rem)" class="text-lg overflow-y-auto">
    <li
      class="p-1 active:bg-zinc-200 duration-200"
      v-for="item in data"
      :key="item.id"
      @click="() => handleClick(item.id)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<style scoped></style>
