<script setup>
import { ref } from 'vue'
import Pin from '../home/pin.vue'
import { useRoute } from 'vue-router'

const visible = ref(true)
const route = useRoute()
const id = route.params.id

const handleClose = () => {
  visible.value = false
  history.back()
}
</script>

<template>
  <div>
    <Pin
      :visible="visible"
      :item="{ id }"
      :clickPos="{ x: '50%', y: '50%' }"
      @close="handleClose"
      :withRequest="true"
    ></Pin>
  </div>
</template>

<style scoped></style>
