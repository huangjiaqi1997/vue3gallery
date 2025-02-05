<script setup>
import Button from '@/libs/button.vue'
import { onMounted, ref } from 'vue'

const {
  title,
  content,
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  onDestory
} = defineProps([
  'title',
  'content',
  'confirmText',
  'cancelText',
  'onConfirm',
  'onCancel',
  'onDestory'
])

const visible = ref(false)

onMounted(() => (visible.value = true))

const onConfirmClick = () => {
  onConfirm()
  close()
}

const onCancelClick = () => {
  onCancel()
  close()
}

const close = () => {
  visible.value = false
  setTimeout(() => onDestory(), 300)
}
</script>

<template>
  <!-- Transition 触发： v-if v-show <component> key -->
  <Transition name="fade">
    <div
      v-if="visible"
      @click="onCancelClick"
      class="z-20 bg-zinc-800/50 absolute top-0 left-0 w-screen h-screen border border-zinc-200"
    ></div>
  </Transition>

  <Transition name="up-30-3d">
    <div
      v-if="visible"
      class="rounded-sm z-20 w-[80%] xl:w-[30%] p-1.5 text-base absolute top-1/3 left-[50%] -translate-x-1/2 bg-white"
    >
      <div class="font-semibold mb-1">{{ title }}</div>
      <div class="">{{ content }}</div>
      <div class="flex justify-end">
        <Button class="mr-1" type="info" @click="onCancelClick">
          {{ cancelText }}
        </Button>
        <Button type="primary" @click="onConfirmClick">
          {{ confirmText }}
        </Button>
      </div>
    </div>
  </Transition>
</template>

<style></style>
