<script setup>
import { onMounted, computed, onUnmounted } from 'vue'
import { second2Time } from '@/utils/formate'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duraton from 'dayjs/plugin/duration'

dayjs.locale('zh-cn')
dayjs.extend(duraton)

const time = defineModel()
const { format = 'HH:mm:ss' } = defineProps(['format'])
const emits = defineEmits(['finish', 'change'])
let timer = null

const showTime = computed(() => {
  // return second2Time(seconds)
  // return dayjs.duration(seconds.value, 'seconds').format(format)
  return dayjs.duration(time.value).format(format)
})

onMounted(() => {
  timer = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timer)
      return emits('finish')
    }
    time.value -= 1000
    emits('change')
  }, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <!-- <div> -->
  <!-- <slot :duraton> -->
  <span>{{ showTime }}</span>
  <!-- </slot> -->
  <!-- </div> -->
</template>

<style scoped></style>
