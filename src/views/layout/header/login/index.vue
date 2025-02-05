<script setup>
import Form from './form.vue'

const { visible } = defineProps(['visible'])
const emits = defineEmits(['close'])

const handleClose = () => emits('close')
</script>

<template>
  <m-dialog :visible="visible" @close="handleClose">
    <div class="w-[380px]">
      <!-- 表单 -->
      <Form @close="handleClose"></Form>
    </div>
  </m-dialog>
</template>

<style scoped></style>
