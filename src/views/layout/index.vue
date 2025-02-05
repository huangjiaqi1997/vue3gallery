<script setup>
import Header from './header/index.vue'
import Main from './main/index.vue'
import Float from './float/index.vue'
import { isMobile } from '@/utils/flexible'
</script>

<template>
  <div class="relative h-screen overflow-hidden">
    <Header v-if="!isMobile"></Header>
    <Main></Main>
    <Float></Float>
  </div>
</template>

<style scoped></style>
