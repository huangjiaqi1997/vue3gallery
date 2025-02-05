<script setup>
import { computed } from 'vue'

const { hintList, inputValue } = defineProps(['hintList', 'inputValue'])
const emits = defineEmits(['search'])

const handleSearch = (hint) => emits('search', hint)

const hintText = (hint) =>
  computed(() =>
    hint.replace(inputValue, `<span class="text-zinc-800">${inputValue}</span>`)
  )
</script>

<template>
  <ul>
    <li
      class="text-zinc-400 px-1.5 py-1 cursor-pointer hover:bg-zinc-200 font-['Helvetica']"
      v-for="hint in hintList"
      :key="hint"
      @click="() => handleSearch(hint)"
      v-html="hintText(hint).value"
    ></li>
  </ul>
</template>

<style scoped></style>
