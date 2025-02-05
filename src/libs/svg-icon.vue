<script setup>
import { computed } from 'vue'

const { name, color, fillClass } = defineProps(['name', 'color', 'fillClass'])
const symbolId = computed(() => `#icon-${name}`)
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" :class="fillClass" />
  </svg>
</template>

<style scoped></style>
