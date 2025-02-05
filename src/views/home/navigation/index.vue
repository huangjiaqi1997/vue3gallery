<script setup>
import { isMobile } from '@/utils/flexible'
import MNav from './mobile/index.vue'
import PCNav from './pc/index.vue'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('getCategory')
</script>

<template>
  <MNav v-if="isMobile"></MNav>
  <PCNav v-else></PCNav>
</template>

<style scoped></style>
