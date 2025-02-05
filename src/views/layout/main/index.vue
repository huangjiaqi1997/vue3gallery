<script setup>
import { isMobile } from '@/utils/flexible'
</script>

<template>
  <div
    :style="{
      height: isMobile ? '100vh' : 'calc(100vh - 1.57rem)'
    }"
  >
    <router-view> </router-view>
  </div>
</template>

<style scoped></style>
