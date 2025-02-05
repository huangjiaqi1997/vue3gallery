<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const route = useRoute()
const { menu } = defineProps(['menu'])

const path = computed(() => route.path)

const onClick = (item) => {
  if (item.path === path) return
  store.commit('setType', 'push')
  router.push(item.path)
}
</script>

<template>
  <ul
    class="border border-zinc-200 shadow z-10 bg-white text-xs fixed bottom-4 left-1/2 -translate-x-1/2 p-1 flex rounded-3xl"
  >
    <li
      class="px-1 mx-1.5 text-center"
      v-for="item in menu"
      :key="item.id"
      @click="() => onClick(item)"
    >
      <m-svg-icon
        :name="item.icon"
        class="w-2 h-2 my-0.5 inline-block"
        :fillClass="path === item.path ? 'fill-zinc-800' : 'fill-zinc-400'"
      ></m-svg-icon>
      <span
        class="break-keep"
        :class="path === item.path ? 'text-zinc-800' : 'text-zinc-400'"
      >
        {{ item.name }}
      </span>
    </li>
  </ul>
</template>

<style scoped></style>
