<script setup>
import { onMounted, ref } from 'vue'
import driverObj from './guide'

const isToTopVisiable = ref(false)

let home = null
onMounted(() => {
  home = document.querySelector('.home')

  // 监听 scrollTop 控制icon显示
  home.onscroll = (e) => {
    if (e.target.scrollTop > 500) isToTopVisiable.value = true
    else isToTopVisiable.value = false
  }
})

const onToTopClick = () => {
  home.scrollTo({ top: 0, behavior: 'smooth' })
}

const onGuideClick = () => driverObj.drive()
</script>

<template>
  <div class="fixed right-2 bottom-4">
    <div
      :class="isToTopVisiable ? 'opacity-100 visible' : 'opacity-0 invisible'"
      class="driver-to-top group p-[0.2rem] rounded-full border border-zinc-200 hover:shadow cursor-pointer mb-1 duration-300"
      @click="onToTopClick"
    >
      <m-svg-icon
        class="w-2.5 h-2.5"
        fillClass="fill-zinc-800 group-hover:fill-main duration-300"
        name="to-top"
      ></m-svg-icon>
    </div>

    <div
      class="driver-guide group p-1 rounded-full border border-zinc-200 hover:shadow cursor-pointer mb-1"
      @click="onGuideClick"
    >
      <m-svg-icon
        class="w-2 h-2"
        fillClass="fill-zinc-800 group-hover:fill-main duration-300"
        name="guide"
      ></m-svg-icon>
    </div>

    <m-popover class="driver-feedback" placement="top-left">
      <template #trigger>
        <div
          class="group p-1 rounded-full border border-zinc-200 hover:shadow cursor-pointer"
        >
          <m-svg-icon
            class="w-2 h-2"
            fillClass="fill-zinc-800 group-hover:fill-main duration-300"
            name="feedback"
          ></m-svg-icon></div
      ></template>

      <template #menu>
        <div
          class="mr-1 text-sm w-[3rem] flex items-center py-1 px-1.5 border border-zinc-200 rounded hover:bg-zinc-100 duration-300"
        >
          <m-svg-icon
            name="feedback"
            class="h-1.5 w-1.5 mr-1"
            fillClass="fill-zinc-800"
          ></m-svg-icon>
          <span>立即吐槽</span>
        </div>
      </template>
    </m-popover>
  </div>
</template>

<style scoped></style>
